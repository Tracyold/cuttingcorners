#!/usr/bin/env python3
"""
fix.py — verbose, logged, recoverable fixer.
Read audit JSON, apply safe fixes, log everything to fix-log.json.

  python scripts/fix.py --root . --run-all        # run all audits then fix
  python scripts/fix.py --root . --input a.json   # fix from saved JSON
  python scripts/fix.py --root . --dry-run        # preview only
  python scripts/fix.py --root . --recover        # undo last run via .bak
  python scripts/fix.py --root . --recover --run-id "2024-01-15 14:32"
"""

import argparse, json, re, shutil, subprocess, sys
from datetime import datetime, timezone
from pathlib import Path
from collections import defaultdict

sys.path.insert(0, str(Path(__file__).parent.parent))
from _audit_json import add_json_arg

SEVERITY_RANK = {"CRITICAL": 4, "HIGH": 3, "MEDIUM": 2, "LOW": 1}
_LOG: list[dict] = []
_LOG_PATH: Path | None = None
_RUN_ID = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S")


def _log(entry: dict) -> None:
    _LOG.append({**entry, "ts": datetime.now(timezone.utc).isoformat()})


def _flush_log(dry_run: bool) -> None:
    if not _LOG_PATH or dry_run:
        return
    runs = []
    if _LOG_PATH.exists():
        try:
            runs = json.loads(_LOG_PATH.read_text()).get("runs", [])
        except Exception:
            runs = []
    _LOG_PATH.write_text(json.dumps({
        "runs": runs + [{"run_id": _RUN_ID, "dry_run": dry_run, "entries": _LOG}]
    }, indent=2), encoding="utf-8")
    print(f"\n  [log] Written → {_LOG_PATH}")


def _read(p: Path) -> str:
    return p.read_text(encoding="utf-8", errors="replace")


def _write(path: Path, content: str, backup: bool, dry_run: bool) -> str | None:
    if dry_run:
        return None
    bak = None
    if backup and path.exists():
        bak = path.with_suffix(path.suffix + ".bak")
        shutil.copy2(path, bak)
    path.write_text(content, encoding="utf-8")
    _log({"action": "write", "file": str(path), "backup": str(bak) if bak else None, "run_id": _RUN_ID})
    return str(bak) if bak else None


def _line(text: str, n: int) -> str:
    ls = text.splitlines()
    return ls[n - 1] if 1 <= n <= len(ls) else ""


class R:
    def __init__(self, ok: bool, desc: str, before: str = "", after: str = ""):
        self.ok, self.desc, self.before, self.after = ok, desc, before, after


def fix_dead_import(text, issue):
    m = re.search(r"'(\w+)' is imported", issue.get("detail", ""))
    if not m:
        return text, R(False, "Could not identify symbol")
    sym = m.group(1)
    lines, out, removed, found = text.splitlines(keepends=True), [], "", False
    for line in lines:
        if re.search(r'\bimport\b', line) and re.search(r'\b' + re.escape(sym) + r'\b', line):
            named = re.match(r'^(\s*import\s*\{)([^}]+)(\}\s*from\s*.+)', line)
            found = True
            if named:
                names = [n.strip() for n in named.group(2).split(',')
                         if n.strip() and n.strip().split(' as ')[0].strip() != sym
                         and n.strip().split(' as ')[-1].strip() != sym]
                if names:
                    new = named.group(1) + ' ' + ', '.join(names) + ' ' + named.group(3)
                    out.append(new if new.endswith('\n') else new + '\n')
                    removed = line.rstrip()
                    continue
            removed = line.rstrip()
            continue
        out.append(line)
    if found:
        return ''.join(out), R(True, f"Removed import '{sym}'", before=removed, after="(removed)")
    return text, R(False, f"Import line for '{sym}' not found")


def fix_redundant_aria(text, issue):
    orig = text
    new = re.sub(r'''\s+role\s*=\s*["']button["']''', '', text)
    if new != orig:
        n = issue.get("line", 1)
        return new, R(True, 'Removed role="button"', _line(orig, n), _line(new, n))
    return text, R(False, 'Pattern not found')


def fix_disabled_prop(text, issue):
    m = re.search(r'\b(disabled|enabled|isDisabled|isEnabled|isLoading|isActive)\s*=\s*\{false\}',
                  issue.get("snippet","") + issue.get("detail",""))
    if not m:
        return text, R(False, "Could not identify prop")
    prop = m.group(1)
    orig = text
    new = re.sub(r'\s*\b' + re.escape(prop) + r'\s*=\s*\{false\}', '', text)
    if new != orig:
        n = issue.get("line", 1)
        return new, R(True, f"Removed {prop}={{false}}", _line(orig, n), _line(new, n))
    return text, R(False, f"{prop}={{false}} not found")


def fix_double_decl_css(text, issue):
    m = re.search(r"'([\w-]+):[^']+' declared twice.*first at line (\d+)", issue.get("detail",""))
    if not m:
        return text, R(False, "Could not parse details")
    prop, ln = m.group(1), int(m.group(2))
    lines = text.splitlines(keepends=True)
    if not (1 <= ln <= len(lines)):
        return text, R(False, f"Line {ln} out of range")
    target = lines[ln - 1]
    if re.search(r'^\s*' + re.escape(prop) + r'\s*:', target):
        removed = target.rstrip()
        lines[ln - 1] = ''
        return ''.join(lines), R(True, f"Removed duplicate '{prop}' at line {ln}", removed, "(removed)")
    return text, R(False, f"'{prop}' not at line {ln}")


def fix_empty_rule_css(text, issue):
    orig = text
    snip = issue.get("snippet", "")
    sel = snip.replace('{ }', '').strip()
    if sel:
        new = re.sub(re.escape(sel) + r'\s*\{\s*\}', '', orig, flags=re.MULTILINE)
        if new != orig:
            return new, R(True, "Removed empty rule", snip, "(removed)")
    return text, R(False, "Empty rule not found")


def fix_console_user_data(text, issue):
    ln = issue.get("line")
    if not ln:
        return text, R(False, "No line number")
    lines = text.splitlines(keepends=True)
    if not (1 <= ln <= len(lines)):
        return text, R(False, f"Line {ln} out of range")
    target = lines[ln - 1]
    if re.search(r'console\.\w+\s*\(', target):
        lines[ln - 1] = ''
        return ''.join(lines), R(True, f"Removed console.log at line {ln}", target.rstrip(), "(removed)")
    return text, R(False, "console.log not at expected line")


def fix_env_no_validation(text, issue):
    ln = issue.get("line")
    if not ln:
        return text, R(False, "No line number")
    lines = text.splitlines(keepends=True)
    if not (1 <= ln <= len(lines)):
        return text, R(False, f"Line {ln} out of range")
    orig = lines[ln - 1]
    new = re.sub(r'(process\.env\.\w+)(?!\s*(?:\?\?|\|\||!|\s*&&|\s*\?|\s*===|\s*!==))',
                 r"(\1 ?? '')", orig)
    if new != orig:
        lines[ln - 1] = new
        return ''.join(lines), R(True, f"Added ?? '' fallback at line {ln}", orig.rstrip(), new.rstrip())
    return text, R(False, "Pattern not found or already has fallback")


def fix_missing_error_catch(text, issue):
    ln = issue.get("line")
    if not ln:
        return text, R(False, "No line number")
    lines = text.splitlines(keepends=True)
    if not (1 <= ln <= len(lines)):
        return text, R(False, f"Line {ln} out of range")
    orig = lines[ln - 1]
    new = re.sub(r'const\s*\{\s*data\s*\}', 'const { data, error }', orig)
    if new != orig:
        lines[ln - 1] = new
        indent = re.match(r'^(\s*)', orig).group(1)
        if ln < len(lines) and lines[ln].strip() == '':
            lines.insert(ln + 1, f"{indent}if (error) console.error(error);\n")
        return ''.join(lines), R(True, f"Added error destructuring at line {ln}", orig.rstrip(), new.rstrip())
    return text, R(False, "{ data } pattern not found")


FIXERS = {
    "DEAD_IMPORT":        fix_dead_import,
    "REDUNDANT_ARIA":     fix_redundant_aria,
    "DISABLED_PROP":      fix_disabled_prop,
    "DOUBLE_DECL":        fix_double_decl_css,
    "EMPTY_RULE":         fix_empty_rule_css,
    "CONSOLE_USER_DATA":  fix_console_user_data,
    "ENV_NO_VALIDATION":  fix_env_no_validation,
    "MISSING_ERROR_CATCH":fix_missing_error_catch,
}


def recover(root: Path, run_id: str | None, dry_run: bool) -> int:
    log_path = root / "fix-log.json"
    print(f"\n{'═'*66}")
    print(f"  RECOVERY{'  (DRY RUN)' if dry_run else ''}")
    print(f"{'═'*66}")

    to_restore: list[tuple[Path, Path]] = []

    if log_path.exists():
        try:
            data = json.loads(log_path.read_text())
            runs = data.get("runs", [])
            if run_id:
                runs = [r for r in runs if r.get("run_id") == run_id]
                if not runs:
                    print(f"\n  [ERROR] No run found with ID '{run_id}'")
                    print("  Available run IDs:")
                    for r in data.get("runs", []):
                        n = len([e for e in r.get("entries",[]) if e.get("action")=="write"])
                        print(f"    • {r.get('run_id')}  ({n} file write(s))")
                    return 1
            else:
                runs = runs[-1:] if runs else []

            if runs:
                run = runs[0]
                print(f"\n  Recovering run: {run.get('run_id')}")
                for e in run.get("entries", []):
                    if e.get("action") == "write" and e.get("backup"):
                        cur, bak = Path(e["file"]), Path(e["backup"])
                        if bak.exists():
                            to_restore.append((cur, bak))
                        else:
                            print(f"  [warn] Backup missing: {bak}")
        except Exception as ex:
            print(f"  [warn] Could not read log: {ex} — scanning for .bak files...")

    if not to_restore:
        print("\n  Scanning for .bak files...")
        skip = {"node_modules", ".git", "dist", "build"}
        for bak in root.rglob("*.bak"):
            if any(s in bak.parts for s in skip):
                continue
            to_restore.append((bak.with_suffix(''), bak))

    if not to_restore:
        print("\n  Nothing to recover.")
        return 0

    print(f"\n  Restoring {len(to_restore)} file(s):\n")
    for cur, bak in to_restore:
        rel = cur.relative_to(root) if root in cur.parents else cur
        print(f"  {'~' if dry_run else '↩'} {rel}")
        print(f"      from: {bak.name}")
        if not dry_run:
            shutil.copy2(bak, cur)
            bak.unlink()
            print(f"      ✓ restored, backup deleted")
            _log({"action": "recover", "file": str(cur), "backup": str(bak), "run_id": _RUN_ID})

    print(f"\n{'═'*66}")
    if dry_run:
        print(f"  DRY RUN — {len(to_restore)} file(s) would be restored.")
    else:
        print(f"  ✓ {len(to_restore)} file(s) recovered.")
        _flush_log(False)
    print(f"{'═'*66}\n")
    return 0


def run_all_audits(root: Path) -> list[dict]:
    scripts_dir = Path(__file__).parent
    scripts = ["../audits/audit_theatre.py","../audits/audit_css.py","../audits/audit_security.py",
               "../audits/audit_dead_code.py","../audits/audit_prop_passers.py"]
    issues = []
    for s in scripts:
        p = scripts_dir / s
        if not p.exists():
            print(f"  [skip] {s} not found")
            continue
        print(f"\n  ▶ Running {s}...")
        r = subprocess.run([sys.executable, str(p), "--root", str(root), "--json", "-", "--quiet"],
                           capture_output=True, text=True)
        if r.stdout.strip():
            try:
                data = json.loads(r.stdout)
                found = data.get("issues", [])
                fixable = sum(1 for i in found if i.get("fixable"))
                print(f"    {len(found)} issue(s)  —  {fixable} auto-fixable")
                issues.extend(found)
            except json.JSONDecodeError:
                print(f"    [warn] {s} returned invalid JSON")
    return issues


def main():
    global _LOG_PATH
    parser = argparse.ArgumentParser(description="Verbose, logged, recoverable fixer.")
    parser.add_argument("--root",      default=".")
    parser.add_argument("--input",     default="-")
    parser.add_argument("--dry-run",   action="store_true")
    parser.add_argument("--only",      nargs="+", metavar="CAT")
    parser.add_argument("--severity",  choices=["CRITICAL","HIGH","MEDIUM","LOW"])
    parser.add_argument("--run-all",   action="store_true")
    parser.add_argument("--no-backup", action="store_true")
    parser.add_argument("--recover",   action="store_true")
    parser.add_argument("--run-id",    default=None)
    args = parser.parse_args()

    root      = Path(args.root).resolve()
    backup    = not args.no_backup
    dry_run   = args.dry_run
    _LOG_PATH = root / "fix-log.json"

    print(f"\n{'═'*66}")
    print(f"  FIX.PY  {'(DRY RUN) ' if dry_run else ''}{'(RECOVERY) ' if args.recover else ''}")
    print(f"  Repo:   {root}")
    print(f"  Run ID: {_RUN_ID}")
    print(f"{'═'*66}")

    if args.recover:
        sys.exit(recover(root, args.run_id, dry_run))

    if args.run_all:
        print("\n[1/2] Running all audit scripts...")
        all_issues = run_all_audits(root)
        print(f"\n[2/2] Applying fixes...")
    else:
        src = sys.stdin if args.input == "-" else open(args.input, encoding="utf-8")
        try:
            all_issues = json.load(src).get("issues", [])
        except json.JSONDecodeError as e:
            print(f"\n[ERROR] Bad JSON: {e}")
            sys.exit(1)
        finally:
            if args.input != "-": src.close()

    print(f"\n  Loaded {len(all_issues)} issue(s).")

    min_rank = SEVERITY_RANK.get(args.severity, 0)
    filtered = [i for i in all_issues
                if (not args.only or i["category"] in args.only)
                and SEVERITY_RANK.get(i["severity"], 0) >= min_rank]

    fixable = [i for i in filtered if i.get("fixable")]
    manual  = [i for i in filtered if not i.get("fixable")]
    print(f"  Auto-fixable: {len(fixable)}   Manual: {len(manual)}\n")

    print(f"{'─'*66}")
    print(f"  AUTO-FIXES")
    print(f"{'─'*66}")

    by_file: dict[str, list] = defaultdict(list)
    for i in fixable:
        by_file[i["file"]].append(i)

    applied = failed = 0

    for rel_path, issues in sorted(by_file.items()):
        abs_path = root / rel_path
        if not abs_path.exists():
            print(f"\n  [skip] {rel_path} — not found")
            _log({"action":"skip","file":rel_path,"reason":"not found"})
            continue

        cats = ', '.join(sorted(set(i['category'] for i in issues)))
        print(f"\n  {'─'*62}")
        print(f"  ▶ File:    {rel_path}")
        print(f"    Issues:  {len(issues)} ({cats})")
        if not dry_run and backup:
            print(f"    Backup:  {rel_path}.bak")

        text = orig = _read(abs_path)
        sorted_issues = sorted(issues, key=lambda i: i.get("line") or 0, reverse=True)

        for issue in sorted_issues:
            fixer = FIXERS.get(issue["category"])
            ln    = f"line {issue.get('line','?')}"
            print(f"\n    ┌ [{issue['category']}] {ln}")
            if issue.get("snippet"):
                print(f"    │ Found:  {issue['snippet'][:70]}")
            print(f"    │ Plan:   {issue.get('fix_hint','apply fixer')}")

            if not fixer:
                print(f"    └ ✗ SKIP — no fixer for this category")
                failed += 1
                _log({"action":"skip","file":rel_path,"category":issue["category"],
                      "line":issue.get("line"),"reason":"no fixer"})
                continue

            try:
                new_text, r = fixer(text, issue)
                if r.ok:
                    if r.before:
                        print(f"    │ Before: {r.before[:70]}")
                    if r.after:
                        print(f"    │ After:  {r.after[:70]}")
                    icon = "~" if dry_run else "✓"
                    print(f"    └ {icon} {r.desc}")
                    text = new_text
                    applied += 1
                    _log({"action":"fix","file":rel_path,"category":issue["category"],
                          "line":issue.get("line"),"before":r.before,"after":r.after,"run_id":_RUN_ID})
                else:
                    print(f"    └ ✗ SKIP — {r.desc}")
                    failed += 1
                    _log({"action":"skip","file":rel_path,"category":issue["category"],
                          "line":issue.get("line"),"reason":r.desc})
            except Exception as e:
                print(f"    └ ✗ ERROR — {e}")
                failed += 1
                _log({"action":"error","file":rel_path,"category":issue["category"],
                      "line":issue.get("line"),"reason":str(e)})

        if text != orig:
            bak = _write(abs_path, text, backup, dry_run)
            if not dry_run:
                print(f"\n    ✓ Saved: {rel_path}")
                if bak:
                    print(f"    ✓ Backup: {Path(bak).name}")

    if manual:
        print(f"\n{'─'*66}")
        print(f"  MANUAL REVIEW REQUIRED ({len(manual)})")
        icons = {"CRITICAL":"🔴","HIGH":"🟠","MEDIUM":"🟡","LOW":"🔵"}
        by_sev: dict[str, list] = defaultdict(list)
        for i in manual: by_sev[i["severity"]].append(i)
        for sev in ("CRITICAL","HIGH","MEDIUM","LOW"):
            for iss in by_sev.get(sev, []):
                print(f"\n  {icons.get(sev,'')} {iss['file']}"
                      + (f":{iss['line']}" if iss.get('line') else ""))
                print(f"     [{iss['category']}] {iss['detail']}")
                print(f"     → {iss.get('fix_hint','Manual review required')}")

    print(f"\n{'═'*66}")
    if dry_run: print("  DRY RUN — no files written.")
    print(f"  Applied : {applied}")
    print(f"  Skipped : {failed}")
    print(f"  Manual  : {len(manual)}")
    if not dry_run and backup and applied:
        print(f"  Recover : python scripts/fix.py --root . --recover")
    print(f"  Log     : {_LOG_PATH}")
    print(f"{'═'*66}\n")

    _flush_log(dry_run)
    sys.exit(0 if not (failed + len(manual)) else 1)


if __name__ == "__main__":
    main()
