#!/usr/bin/env python3
"""
audit_what_changed.py
─────────────────────
Figures out what fix.py actually changed — useful when a run was interrupted
mid-way and you don't know what was modified.

Three detection strategies, run in order:

  1. fix-log.json   — most precise: reads the structured log entries to show
                      exactly which fixes were applied and to which lines
  2. .bak files     — finds every .bak file in the repo, diffs it against the
                      current file to show exactly what changed
  3. git diff       — if the repo has git, shows all uncommitted changes

Usage:
  python scripts/audit_what_changed.py [--root PATH] [--strategy auto|log|bak|git]

  --root      Repo root (default: current directory)
  --strategy  Which detection method to use (default: auto = all three)
  --run-id    Focus on a specific fix.py run (log strategy only)

Exit code:
  0 = nothing changed (or nothing detectable)
  1 = changes found
"""

import argparse
import json
import subprocess
import sys
from difflib import unified_diff
from pathlib import Path
from collections import defaultdict


SKIP_DIRS = {"node_modules", ".git", "dist", "build", ".next", "coverage"}


def _read(p: Path) -> str:
    try:
        return p.read_text(encoding="utf-8", errors="replace")
    except Exception:
        return ""


# ── Strategy 1: fix-log.json ──────────────────────────────────────────────────

def strategy_log(root: Path, run_id: str | None) -> list[dict]:
    """Read fix-log.json and return all 'fix' entries from the target run(s)."""
    log_path = root / "fix-log.json"
    results = []

    if not log_path.exists():
        return results

    try:
        data = json.loads(log_path.read_text(encoding="utf-8"))
    except Exception:
        return results

    runs = data.get("runs", [])
    if run_id:
        runs = [r for r in runs if r.get("run_id") == run_id]
    # Default: inspect all runs (so interrupted partial runs are captured too)

    for run in runs:
        for entry in run.get("entries", []):
            if entry.get("action") == "fix":
                results.append({
                    "run_id":   run.get("run_id"),
                    "file":     entry.get("file"),
                    "category": entry.get("category"),
                    "line":     entry.get("line"),
                    "before":   entry.get("before", ""),
                    "after":    entry.get("after", ""),
                    "ts":       entry.get("ts", "")[:19].replace("T", " "),
                })

    return results


# ── Strategy 2: .bak file diff ────────────────────────────────────────────────

def strategy_bak(root: Path) -> list[dict]:
    """
    Find every .bak file, diff it against the current file.
    .bak = the original before fix.py ran.
    current = what fix.py wrote.
    """
    results = []

    for bak in sorted(root.rglob("*.bak")):
        if any(s in bak.parts for s in SKIP_DIRS):
            continue

        current = bak.with_suffix('')
        if not current.exists():
            results.append({
                "bak":     str(bak),
                "current": str(current),
                "status":  "current file missing — bak orphaned",
                "diff":    [],
            })
            continue

        bak_text     = _read(bak).splitlines(keepends=True)
        current_text = _read(current).splitlines(keepends=True)

        if bak_text == current_text:
            results.append({
                "bak":     str(bak),
                "current": str(current),
                "status":  "identical — fix may have been reverted",
                "diff":    [],
            })
            continue

        diff = list(unified_diff(
            bak_text, current_text,
            fromfile=f"BEFORE  {bak.name}",
            tofile=f"AFTER   {current.name}",
            lineterm='',
        ))

        results.append({
            "bak":     str(bak),
            "current": str(current),
            "status":  "changed",
            "diff":    diff,
        })

    return results


# ── Strategy 3: git diff ──────────────────────────────────────────────────────

def strategy_git(root: Path) -> str | None:
    """Run git diff and return the output. Returns None if git is unavailable."""
    try:
        result = subprocess.run(
            ["git", "diff", "--stat"],
            capture_output=True, text=True, cwd=root, timeout=10
        )
        if result.returncode != 0:
            return None
        stat = result.stdout.strip()

        detail = subprocess.run(
            ["git", "diff"],
            capture_output=True, text=True, cwd=root, timeout=10
        )
        return (stat, detail.stdout)
    except (FileNotFoundError, subprocess.TimeoutExpired):
        return None


# ── Reporting ─────────────────────────────────────────────────────────────────

def report_log(entries: list[dict]) -> None:
    print(f"\n  {'─'*62}")
    print(f"  STRATEGY 1 — fix-log.json")
    print(f"  {'─'*62}")

    if not entries:
        print("\n  No fix entries found in log.")
        return

    by_run: dict[str, list] = defaultdict(list)
    for e in entries:
        by_run[e.get("run_id", "unknown")].append(e)

    for run_id, run_entries in by_run.items():
        print(f"\n  Run: {run_id}  ({len(run_entries)} fix(es) applied)")
        by_file: dict[str, list] = defaultdict(list)
        for e in run_entries:
            by_file[e.get("file", "?")].append(e)
        for f, fe in sorted(by_file.items()):
            print(f"\n    📄 {f}  ({len(fe)} fix(es))")
            for e in fe:
                ln = f"line {e['line']}" if e.get("line") else ""
                print(f"       [{e['category']}] {ln}  @ {e['ts']}")
                if e.get("before"):
                    print(f"         Before: {str(e['before'])[:70]}")
                if e.get("after"):
                    print(f"         After:  {str(e['after'])[:70]}")


def report_bak(bak_results: list[dict], root: Path) -> None:
    print(f"\n  {'─'*62}")
    print(f"  STRATEGY 2 — .bak file diff")
    print(f"  {'─'*62}")

    if not bak_results:
        print("\n  No .bak files found. Either fix.py hasn't run or --no-backup was used.")
        return

    changed = [r for r in bak_results if r["status"] == "changed"]
    same    = [r for r in bak_results if r["status"] != "changed"]

    print(f"\n  Found {len(bak_results)} backup(s): {len(changed)} changed, {len(same)} identical/orphaned\n")

    for r in bak_results:
        bak = Path(r["bak"])
        cur = Path(r["current"])
        rel = cur.relative_to(root) if root in cur.parents else cur

        if r["status"] == "changed":
            print(f"  ✓ CHANGED: {rel}")
            print(f"    Backup:  {bak.name}")
            print()
            for line in r["diff"][:60]:   # cap diff output
                prefix = line[0] if line else ' '
                if prefix == '+':
                    print(f"    \033[32m{line}\033[0m")   # green
                elif prefix == '-':
                    print(f"    \033[31m{line}\033[0m")   # red
                else:
                    print(f"    {line}")
            if len(r["diff"]) > 60:
                print(f"    ... ({len(r['diff']) - 60} more lines)")
            print()
        else:
            print(f"  ~ {r['status'].upper()}: {rel}  ({bak.name})")


def report_git(git_result) -> None:
    print(f"\n  {'─'*62}")
    print(f"  STRATEGY 3 — git diff")
    print(f"  {'─'*62}")

    if git_result is None:
        print("\n  git not available or not a git repository.")
        return

    stat, detail = git_result
    if not stat.strip():
        print("\n  No uncommitted changes in git working tree.")
        return

    print(f"\n  Uncommitted changes:\n")
    for line in stat.splitlines():
        print(f"    {line}")

    if detail.strip():
        print(f"\n  Full diff (first 80 lines):\n")
        for line in detail.splitlines()[:80]:
            prefix = line[0] if line else ' '
            if prefix == '+' and not line.startswith('+++'):
                print(f"    \033[32m{line}\033[0m")
            elif prefix == '-' and not line.startswith('---'):
                print(f"    \033[31m{line}\033[0m")
            else:
                print(f"    {line}")
        total = len(detail.splitlines())
        if total > 80:
            print(f"\n    ... ({total - 80} more lines — run `git diff` for full output)")


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        description="Detect what fix.py changed — useful after an interrupted run."
    )
    parser.add_argument("--root",     default=".", help="Repo root (default: .)")
    parser.add_argument("--strategy", default="auto",
                        choices=["auto", "log", "bak", "git"],
                        help="Detection strategy (default: auto = all three)")
    parser.add_argument("--run-id",   default=None,
                        help="Focus on a specific run ID (log strategy)")
    args = parser.parse_args()

    root = Path(args.root).resolve()
    found_anything = False

    print(f"\n{'═'*66}")
    print(f"  WHAT CHANGED — {root}")
    print(f"{'═'*66}")

    use_log = args.strategy in ("auto", "log")
    use_bak = args.strategy in ("auto", "bak")
    use_git = args.strategy in ("auto", "git")

    if use_log:
        log_entries = strategy_log(root, args.run_id)
        report_log(log_entries)
        if log_entries:
            found_anything = True

    if use_bak:
        bak_results = strategy_bak(root)
        report_bak(bak_results, root)
        if any(r["status"] == "changed" for r in bak_results):
            found_anything = True

    if use_git:
        git_result = strategy_git(root)
        report_git(git_result)
        if git_result and git_result[0].strip():
            found_anything = True

    print(f"\n{'═'*66}")
    if found_anything:
        print("  Changes detected. See above for details.")
        print("  To undo:  python scripts/fix.py --root . --recover")
        print("  To view full log:  python scripts/read_fix_log.py --root .")
    else:
        print("  Nothing detected. No log entries, no .bak files, no git changes.")
    print(f"{'═'*66}\n")

    sys.exit(0 if not found_anything else 1)


if __name__ == "__main__":
    main()