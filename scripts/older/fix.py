#!/usr/bin/env python3
"""
fix.py
──────
Reads JSON output from any audit_*.py script and applies fixes.

AUTO-FIX (applied automatically, with backup):
  DEAD_IMPORT         — removes unused import lines
  REDUNDANT_ARIA      — removes role="button" from <button>
  DISABLED_PROP       — removes prop={false} no-ops
  DOUBLE_DECL (CSS)   — removes duplicate property declarations
  EMPTY_RULE  (CSS)   — removes empty selector blocks
  CONSOLE_USER_DATA   — removes console.log lines with sensitive data
  ENV_NO_VALIDATION   — adds ?? '' fallback to bare process.env.*
  MISSING_ERROR_CATCH — adds { error } to Supabase destructures

SUGGEST-ONLY (printed as annotated diffs, not applied):
  Everything else — too risky or too context-dependent to touch automatically.

Usage:
  # Run an audit and pipe directly into fix.py
  python scripts/audit_theatre.py --root . --json - | python scripts/fix.py --root .

  # Or save JSON first, then fix
  python scripts/audit_css.py --root . --json audit.json
  python scripts/fix.py --root . --input audit.json

  # Dry run — show what would change without writing anything
  python scripts/fix.py --root . --input audit.json --dry-run

  # Fix only specific categories
  python scripts/fix.py --root . --input audit.json --only DEAD_IMPORT DOUBLE_DECL

  # Fix only issues at or below a severity level
  python scripts/fix.py --root . --input audit.json --severity MEDIUM

  # Run all four audits and fix everything possible in one pass
  python scripts/fix.py --root . --run-all

Flags:
  --root PATH       Repo root (default: current directory)
  --input PATH      Path to audit JSON file, or '-' for stdin (default: stdin)
  --dry-run         Show changes without writing files
  --only CATS...    Only process these categories
  --severity LEVEL  Only process issues at this severity or higher
                    (CRITICAL > HIGH > MEDIUM > LOW)
  --run-all         Run all four audit scripts first, then fix
  --backup          Create .bak files before modifying (default: True)
  --no-backup       Skip backup files

Exit code:
  0 = all fixable issues resolved (or nothing to fix)
  1 = some issues remain (manual review items always remain)
"""

import argparse
import json
import re
import shutil
import subprocess
import sys
from pathlib import Path
from collections import defaultdict


# ── Severity ordering ─────────────────────────────────────────────────────────

SEVERITY_RANK = {"CRITICAL": 4, "HIGH": 3, "MEDIUM": 2, "LOW": 1}


# ── File helpers ──────────────────────────────────────────────────────────────

def read(path: Path) -> str:
    return path.read_text(encoding="utf-8", errors="replace")


def write(path: Path, content: str, backup: bool, dry_run: bool) -> None:
    if dry_run:
        return
    if backup and path.exists():
        shutil.copy2(path, path.with_suffix(path.suffix + ".bak"))
    path.write_text(content, encoding="utf-8")


def line_of(text: str, lineno: int) -> str:
    lines = text.splitlines()
    if 1 <= lineno <= len(lines):
        return lines[lineno - 1]
    return ""


# ── Individual fixers ─────────────────────────────────────────────────────────

class FixResult:
    def __init__(self, applied: bool, description: str, diff: str = ""):
        self.applied = applied
        self.description = description
        self.diff = diff


def fix_dead_import(text: str, issue: dict) -> tuple[str, FixResult]:
    """Remove an unused import. Handles named, default, and type imports."""
    symbol = None
    # Extract symbol name from detail: "'SomeName' is imported but never used"
    m = re.search(r"'(\w+)' is imported", issue.get("detail", ""))
    if m:
        symbol = m.group(1)

    if not symbol:
        return text, FixResult(False, "Could not identify symbol to remove")

    lines = text.splitlines(keepends=True)
    new_lines = []
    removed = False

    for line in lines:
        # Check if this line is the import line for this symbol
        # Pattern: import { ..., Symbol, ... } from or import Symbol from
        if re.search(r'\bimport\b', line) and re.search(r'\b' + re.escape(symbol) + r'\b', line):
            # Named import in a multi-import line: { Foo, Bar, Baz }
            # If removing this symbol would leave other imports, keep the line minus the symbol
            named = re.match(r'^(\s*import\s*\{)([^}]+)(\}\s*from\s*.+)', line)
            if named:
                names = [n.strip() for n in named.group(2).split(',')]
                names = [n for n in names if n and n.split(' as ')[0].strip() != symbol
                         and n.split(' as ')[-1].strip() != symbol]
                if names:
                    new_line = named.group(1) + ' ' + ', '.join(names) + ' ' + named.group(3)
                    new_lines.append(new_line if new_line.endswith('\n') else new_line + '\n')
                    removed = True
                    continue
                else:
                    # Remove the whole line
                    removed = True
                    continue
            else:
                # Default import or import * as X — remove the whole line
                removed = True
                continue
        new_lines.append(line)

    if removed:
        new_text = ''.join(new_lines)
        diff = f"  - {line_of(text, issue.get('line', 1))}"
        return new_text, FixResult(True, f"Removed import of '{symbol}'", diff)
    return text, FixResult(False, f"Import line for '{symbol}' not found at expected location")


def fix_redundant_aria(text: str, issue: dict) -> tuple[str, FixResult]:
    """Remove role="button" or role='button' from <button> elements."""
    original = text
    text = re.sub(r'''\s+role\s*=\s*["']button["']''', '', text)
    if text != original:
        return text, FixResult(True, "Removed redundant role=\"button\"")
    return text, FixResult(False, "role=\"button\" pattern not found")


def fix_disabled_prop(text: str, issue: dict) -> tuple[str, FixResult]:
    """Remove JSX props hard-coded to {false}."""
    # Find the specific prop name from the snippet or detail
    m = re.search(r'\b(disabled|enabled|isDisabled|isEnabled|isLoading|isActive)\s*=\s*\{false\}',
                  issue.get("snippet", "") + issue.get("detail", ""))
    if not m:
        return text, FixResult(False, "Could not identify the prop to remove")

    prop = m.group(1)
    pattern = re.compile(r'\s*\b' + re.escape(prop) + r'\s*=\s*\{false\}')
    original = text
    text = pattern.sub('', text)
    if text != original:
        return text, FixResult(True, f"Removed no-op prop {prop}={{false}}")
    return text, FixResult(False, f"Prop {prop}={{false}} not found")


def fix_double_decl_css(text: str, issue: dict) -> tuple[str, FixResult]:
    """Remove duplicate CSS property declaration (keep the last one)."""
    detail = issue.get("detail", "")
    # Extract: 'prop: value' declared twice ... first at line N
    m = re.search(r"'([\w-]+):\s*([^']+)' declared twice.*first at line (\d+)", detail)
    if not m:
        return text, FixResult(False, "Could not parse duplicate declaration details")

    prop = m.group(1)
    first_line_no = int(m.group(3))

    lines = text.splitlines(keepends=True)
    if first_line_no < 1 or first_line_no > len(lines):
        return text, FixResult(False, f"Line {first_line_no} out of range")

    target = lines[first_line_no - 1]
    # Verify it's actually this property
    if re.search(r'^\s*' + re.escape(prop) + r'\s*:', target):
        removed_line = target.rstrip()
        lines[first_line_no - 1] = ''
        new_text = ''.join(lines)
        return new_text, FixResult(True, f"Removed duplicate '{prop}' at line {first_line_no}",
                                    diff=f"  - {removed_line}")
    return text, FixResult(False, f"Expected '{prop}' at line {first_line_no}, found: {target.strip()[:60]}")


def fix_empty_rule_css(text: str, issue: dict) -> tuple[str, FixResult]:
    """Remove empty CSS rule blocks: selector { }"""
    original = text
    # Remove selectors with only whitespace inside braces
    text = re.sub(r'[^{}@][^{}]*?\{\s*\}', lambda m: '' if '{' in m.group() else m.group(), text)
    # Cleaner targeted version
    snippet = issue.get("snippet", "")
    if snippet:
        selector = snippet.replace('{ }', '').strip()
        if selector:
            pattern = re.compile(re.escape(selector) + r'\s*\{\s*\}', re.MULTILINE)
            text = pattern.sub('', original)

    if text != original:
        return text, FixResult(True, f"Removed empty rule block")
    return text, FixResult(False, "Empty rule block not found at expected location")


def fix_console_user_data(text: str, issue: dict) -> tuple[str, FixResult]:
    """Remove console.log lines containing sensitive data."""
    lineno = issue.get("line")
    if not lineno:
        return text, FixResult(False, "No line number in issue")

    lines = text.splitlines(keepends=True)
    if lineno < 1 or lineno > len(lines):
        return text, FixResult(False, f"Line {lineno} out of range")

    target = lines[lineno - 1]
    if re.search(r'console\.\w+\s*\(', target):
        removed = target.rstrip()
        lines[lineno - 1] = ''
        return ''.join(lines), FixResult(True, f"Removed console.log at line {lineno}",
                                          diff=f"  - {removed}")
    return text, FixResult(False, "console.log not found at expected line")


def fix_env_no_validation(text: str, issue: dict) -> tuple[str, FixResult]:
    """Add ?? '' fallback to bare process.env.VAR_NAME accesses."""
    lineno = issue.get("line")
    if not lineno:
        return text, FixResult(False, "No line number in issue")

    lines = text.splitlines(keepends=True)
    if lineno < 1 or lineno > len(lines):
        return text, FixResult(False, f"Line {lineno} out of range")

    original_line = lines[lineno - 1]
    # Add ?? '' after process.env.VARNAME if not already followed by ?? or ||
    new_line = re.sub(
        r'(process\.env\.\w+)(?!\s*(?:\?\?|\|\||!|\s*&&|\s*\?|\s*===|\s*!==))',
        r'(\1 ?? \'\')',
        original_line
    )
    if new_line != original_line:
        lines[lineno - 1] = new_line
        return ''.join(lines), FixResult(
            True, f"Added ?? '' fallback to process.env at line {lineno}",
            diff=f"  - {original_line.rstrip()}\n  + {new_line.rstrip()}"
        )
    return text, FixResult(False, "process.env pattern not found at expected line or already has fallback")


def fix_missing_error_catch(text: str, issue: dict) -> tuple[str, FixResult]:
    """Add { error } to Supabase calls that only destructure { data }."""
    lineno = issue.get("line")
    if not lineno:
        return text, FixResult(False, "No line number in issue")

    lines = text.splitlines(keepends=True)
    if lineno < 1 or lineno > len(lines):
        return text, FixResult(False, f"Line {lineno} out of range")

    original_line = lines[lineno - 1]
    # Replace: const { data } = with: const { data, error } =
    new_line = re.sub(
        r'const\s*\{\s*data\s*\}',
        'const { data, error }',
        original_line
    )
    if new_line != original_line:
        lines[lineno - 1] = new_line
        # Also try to add an error check on the next line if it's blank
        insert_idx = lineno  # 0-based = lineno
        if insert_idx < len(lines) and lines[insert_idx].strip() == '':
            indent = re.match(r'^(\s*)', original_line).group(1)
            lines.insert(insert_idx + 1,
                f"{indent}if (error) console.error('{issue.get('file', 'supabase')} error:', error);\n")
        return ''.join(lines), FixResult(
            True, f"Added error destructuring at line {lineno}",
            diff=f"  - {original_line.rstrip()}\n  + {new_line.rstrip()}"
        )
    return text, FixResult(False, "{ data } destructure pattern not found at expected line")


# ── Fixer dispatch ────────────────────────────────────────────────────────────

FIXERS = {
    "DEAD_IMPORT":          fix_dead_import,
    "REDUNDANT_ARIA":       fix_redundant_aria,
    "DISABLED_PROP":        fix_disabled_prop,
    "DOUBLE_DECL":          fix_double_decl_css,
    "EMPTY_RULE":           fix_empty_rule_css,
    "CONSOLE_USER_DATA":    fix_console_user_data,
    "ENV_NO_VALIDATION":    fix_env_no_validation,
    "MISSING_ERROR_CATCH":  fix_missing_error_catch,
}


# ── Suggestion printer ────────────────────────────────────────────────────────

def print_suggestion(issue: dict, root: Path) -> None:
    print(f"\n  ── {issue['category']}  {issue['file']}"
          + (f":{issue['line']}" if issue.get('line') else ""))
    print(f"     Severity : {issue['severity']}")
    print(f"     Issue    : {issue['detail']}")
    if issue.get("snippet"):
        print(f"     Code     : {issue['snippet'][:80]}")
    print(f"     Action   : {issue.get('fix_hint', 'Manual review required')}")


# ── Run all audits helper ─────────────────────────────────────────────────────

def run_all_audits(root: Path) -> list[dict]:
    scripts_dir = Path(__file__).parent
    audit_scripts = [
        "audit_theatre.py",
        "audit_css.py",
        "audit_security.py",
        "audit_prop_passers.py",
    ]
    all_issues = []
    for script in audit_scripts:
        script_path = scripts_dir / script
        if not script_path.exists():
            print(f"  [skip] {script} not found")
            continue
        print(f"\n  Running {script}...")
        result = subprocess.run(
            [sys.executable, str(script_path), "--root", str(root), "--json", "-", "--quiet"],
            capture_output=True, text=True
        )
        if result.stdout.strip():
            try:
                data = json.loads(result.stdout)
                issues = data.get("issues", [])
                print(f"  → {len(issues)} issues found")
                all_issues.extend(issues)
            except json.JSONDecodeError:
                print(f"  [warn] {script} did not return valid JSON — run it standalone to see output")
    return all_issues


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        description="Apply fixes from audit JSON output.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    parser.add_argument("--root",     default=".", help="Repo root")
    parser.add_argument("--input",    default="-", help="Audit JSON file or '-' for stdin")
    parser.add_argument("--dry-run",  action="store_true", help="Show changes, don't write")
    parser.add_argument("--only",     nargs="+", metavar="CAT",
                        help="Only fix these categories (e.g. DEAD_IMPORT DOUBLE_DECL)")
    parser.add_argument("--severity", default=None,
                        choices=["CRITICAL", "HIGH", "MEDIUM", "LOW"],
                        help="Only fix issues at this severity or higher")
    parser.add_argument("--run-all",  action="store_true",
                        help="Run all audit scripts first, then fix")
    parser.add_argument("--no-backup", action="store_true", help="Skip .bak files")
    args = parser.parse_args()

    root = Path(args.root).resolve()
    backup = not args.no_backup
    dry_run = args.dry_run

    print(f"\n{'═'*66}")
    print(f"  FIX.PY {'(DRY RUN) ' if dry_run else ''}— Repo: {root}")
    print(f"{'═'*66}")

    # ── Load issues ───────────────────────────────────────────────────────────
    if args.run_all:
        print("\n[1/3] Running all audit scripts...")
        all_issues = run_all_audits(root)
    else:
        src = sys.stdin if args.input == "-" else open(args.input, encoding="utf-8")
        try:
            data = json.load(src)
            all_issues = data.get("issues", [])
        except json.JSONDecodeError as e:
            print(f"\n[ERROR] Could not parse JSON input: {e}")
            print("  → Run an audit script with --json flag first:")
            print("    python scripts/audit_theatre.py --root . --json audit.json")
            sys.exit(1)
        finally:
            if args.input != "-":
                src.close()

    print(f"\n  Loaded {len(all_issues)} issue(s) from audit output.")

    # ── Filter ────────────────────────────────────────────────────────────────
    min_rank = SEVERITY_RANK.get(args.severity, 0)
    filtered = [
        i for i in all_issues
        if (not args.only or i["category"] in args.only)
        and SEVERITY_RANK.get(i["severity"], 0) >= min_rank
    ]

    fixable   = [i for i in filtered if i.get("fixable")]
    manual    = [i for i in filtered if not i.get("fixable")]

    print(f"  After filters: {len(fixable)} auto-fixable, {len(manual)} require manual review.\n")

    # ── Apply auto-fixes ──────────────────────────────────────────────────────
    print(f"{'─'*66}")
    print(f"  AUTO-FIXES")
    print(f"{'─'*66}")

    # Group by file so we read/write each file once
    by_file: dict[str, list[dict]] = defaultdict(list)
    for issue in fixable:
        by_file[issue["file"]].append(issue)

    applied_count = 0
    failed_count = 0

    for rel_path, issues in sorted(by_file.items()):
        abs_path = root / rel_path
        if not abs_path.exists():
            print(f"\n  [skip] {rel_path} — file not found")
            continue

        text = read(abs_path)
        original_text = text
        file_applied = []
        file_failed = []

        # Sort issues by line descending so line numbers stay valid as we edit
        issues_sorted = sorted(issues, key=lambda i: i.get("line") or 0, reverse=True)

        for issue in issues_sorted:
            fixer = FIXERS.get(issue["category"])
            if not fixer:
                file_failed.append((issue, "No fixer implemented for this category"))
                continue

            try:
                new_text, result = fixer(text, issue)
                if result.applied:
                    text = new_text
                    file_applied.append((issue, result))
                else:
                    file_failed.append((issue, result.description))
            except Exception as e:
                file_failed.append((issue, f"Fixer raised exception: {e}"))

        if file_applied:
            print(f"\n  {rel_path}")
            for issue, result in file_applied:
                icon = "~" if dry_run else "✓"
                print(f"    {icon} [{issue['category']}] {result.description}")
                if result.diff:
                    for dline in result.diff.splitlines():
                        print(f"      {dline}")
                applied_count += 1

            if text != original_text:
                write(abs_path, text, backup=backup, dry_run=dry_run)
                if not dry_run and backup:
                    print(f"    → Backup saved as {rel_path}.bak")

        for issue, reason in file_failed:
            print(f"\n  [SKIP] {rel_path}:{issue.get('line', '?')} [{issue['category']}]")
            print(f"         {reason}")
            failed_count += 1

    # ── Manual review suggestions ─────────────────────────────────────────────
    if manual:
        print(f"\n{'─'*66}")
        print(f"  MANUAL REVIEW REQUIRED ({len(manual)} issues)")
        print(f"  These cannot be safely auto-fixed — human judgment needed.")
        print(f"{'─'*66}")

        # Group by severity
        by_sev: dict[str, list[dict]] = defaultdict(list)
        for i in manual:
            by_sev[i["severity"]].append(i)

        for sev in ("CRITICAL", "HIGH", "MEDIUM", "LOW"):
            issues = by_sev.get(sev, [])
            if not issues:
                continue
            icons = {"CRITICAL": "🔴", "HIGH": "🟠", "MEDIUM": "🟡", "LOW": "🔵"}
            print(f"\n  {icons.get(sev, '')} {sev} ({len(issues)})")
            for issue in issues:
                print_suggestion(issue, root)

    # ── Summary ───────────────────────────────────────────────────────────────
    print(f"\n{'═'*66}")
    if dry_run:
        print(f"  DRY RUN — no files were modified.")
    print(f"  Auto-fixed : {applied_count}")
    print(f"  Skipped    : {failed_count}  (pattern not matched at expected location)")
    print(f"  Manual     : {len(manual)}  (see suggestions above)")
    if applied_count > 0 and not dry_run and backup:
        print(f"  Backups    : .bak files created alongside each modified file")
    print(f"{'═'*66}\n")

    # Exit 0 only if everything is resolved
    remaining = failed_count + len(manual)
    sys.exit(0 if remaining == 0 else 1)


if __name__ == "__main__":
    main()