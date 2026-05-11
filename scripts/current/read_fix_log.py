#!/usr/bin/env python3
"""
read_fix_log.py
───────────────
Reads fix-log.json and displays a structured, human-readable history
of every fix run — what was changed, skipped, recovered, and why.

Usage:
  python scripts/read_fix_log.py [--root PATH] [--run-id ID] [--last N]

  --root      Repo root where fix-log.json lives (default: current directory)
  --run-id    Show only a specific run by ID
  --last N    Show only the last N runs (default: all)
  --files     Show file-level summary only (no per-fix detail)
  --json      Dump raw JSON of selected runs
"""

import argparse
import json
import sys
from pathlib import Path
from collections import defaultdict


ICONS = {
    "fix":     "✓",
    "skip":    "✗",
    "error":   "⚠",
    "write":   "💾",
    "recover": "↩",
}

SEVERITY_COLOR = {
    "CRITICAL": "🔴",
    "HIGH":     "🟠",
    "MEDIUM":   "🟡",
    "LOW":      "🔵",
}


def load_log(root: Path) -> dict:
    log_path = root / "fix-log.json"
    if not log_path.exists():
        print(f"\n  [error] fix-log.json not found at {log_path}")
        print("  Run fix.py at least once to generate a log.")
        sys.exit(1)
    try:
        return json.loads(log_path.read_text(encoding="utf-8"))
    except json.JSONDecodeError as e:
        print(f"\n  [error] fix-log.json is malformed: {e}")
        sys.exit(1)


def summarise_run(run: dict, detail: bool = True) -> None:
    run_id   = run.get("run_id", "unknown")
    dry_run  = run.get("dry_run", False)
    entries  = run.get("entries", [])

    fixes    = [e for e in entries if e.get("action") == "fix"]
    skips    = [e for e in entries if e.get("action") == "skip"]
    errors   = [e for e in entries if e.get("action") == "error"]
    writes   = [e for e in entries if e.get("action") == "write"]
    recovers = [e for e in entries if e.get("action") == "recover"]

    print(f"\n{'═'*66}")
    print(f"  Run: {run_id}{'  (DRY RUN)' if dry_run else ''}")
    print(f"  ✓ Applied: {len(fixes)}   ✗ Skipped: {len(skips)}   "
          f"⚠ Errors: {len(errors)}   💾 Written: {len(writes)}   ↩ Recovered: {len(recovers)}")
    print(f"{'═'*66}")

    if not entries:
        print("  (no entries)")
        return

    # Group fixes/skips/errors by file
    by_file: dict[str, list[dict]] = defaultdict(list)
    for e in entries:
        if e.get("action") in ("fix", "skip", "error"):
            by_file[e.get("file", "unknown")].append(e)

    for rel_path, file_entries in sorted(by_file.items()):
        file_fixes  = [e for e in file_entries if e["action"] == "fix"]
        file_skips  = [e for e in file_entries if e["action"] == "skip"]
        file_errors = [e for e in file_entries if e["action"] == "error"]

        print(f"\n  📄 {rel_path}")
        print(f"     Applied: {len(file_fixes)}   Skipped: {len(file_skips)}   Errors: {len(file_errors)}")

        if not detail:
            continue

        for e in file_entries:
            icon = ICONS.get(e["action"], "•")
            cat  = e.get("category", "")
            ln   = f"line {e['line']}" if e.get("line") else ""
            ts   = e.get("ts", "")[:19].replace("T", " ")

            if e["action"] == "fix":
                print(f"\n     {icon} [{cat}] {ln}  ({ts})")
                if e.get("before"):
                    print(f"       Before: {str(e['before'])[:70]}")
                if e.get("after"):
                    print(f"       After:  {str(e['after'])[:70]}")

            elif e["action"] == "skip":
                reason = e.get("reason", "")
                print(f"     {icon} SKIP [{cat}] {ln} — {reason}")

            elif e["action"] == "error":
                reason = e.get("reason", "")
                print(f"     {icon} ERROR [{cat}] {ln} — {reason}")

    # Write entries (files actually saved to disk)
    if writes:
        print(f"\n  💾 Files written to disk:")
        for e in writes:
            bak = e.get("backup")
            bak_note = f"  (backup: {Path(bak).name})" if bak else ""
            print(f"     • {e.get('file','?')}{bak_note}")

    # Recovery entries
    if recovers:
        print(f"\n  ↩ Files recovered:")
        for e in recovers:
            print(f"     • {e.get('file','?')}  ← from {Path(e.get('backup','?')).name}")


def main():
    parser = argparse.ArgumentParser(description="Display fix-log.json in human-readable form.")
    parser.add_argument("--root",   default=".", help="Repo root (default: .)")
    parser.add_argument("--run-id", default=None, help="Show only this run ID")
    parser.add_argument("--last",   type=int, default=None, metavar="N",
                        help="Show only the last N runs")
    parser.add_argument("--files",  action="store_true",
                        help="File-level summary only — no per-fix detail")
    parser.add_argument("--json",   action="store_true",
                        help="Dump raw JSON of selected runs")
    args = parser.parse_args()

    root = Path(args.root).resolve()
    data = load_log(root)
    runs = data.get("runs", [])

    if not runs:
        print("\n  fix-log.json exists but contains no runs yet.")
        sys.exit(0)

    # Filter
    if args.run_id:
        runs = [r for r in runs if r.get("run_id") == args.run_id]
        if not runs:
            print(f"\n  [error] No run found with ID '{args.run_id}'")
            print("\n  Available run IDs:")
            for r in data.get("runs", []):
                print(f"    • {r.get('run_id')}")
            sys.exit(1)

    if args.last:
        runs = runs[-args.last:]

    if args.json:
        print(json.dumps(runs, indent=2))
        sys.exit(0)

    print(f"\n  FIX LOG — {root / 'fix-log.json'}")
    print(f"  Total runs on record: {len(data.get('runs', []))}")
    print(f"  Showing: {len(runs)} run(s)")

    for run in runs:
        summarise_run(run, detail=not args.files)

    print(f"\n{'─'*66}")
    print(f"  To recover the most recent run:")
    print(f"    python scripts/fix.py --root . --recover")
    print(f"  To recover a specific run:")
    print(f"    python scripts/fix.py --root . --recover --run-id \"<run_id>\"")
    print(f"{'─'*66}\n")


if __name__ == "__main__":
    main()