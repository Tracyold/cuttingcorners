#!/usr/bin/env python3
"""
setup_aliases.py
────────────────
Run this once when dropping the scripts into a new repo.

Does two things:
  1. Writes all script aliases (theatre, css, security, fix, etc.)
     pointing to wherever this script lives
  2. Scans the new repo's directories and creates $variable aliases
     using the last word of each directory name.
     Duplicate last-words get parent prefix: $adminmobile, $accountmobile

Usage:
  python3 setup_aliases.py

It will prompt for:
  - The repo root directory to scan for aliases
  - Confirmation before writing to ~/.bashrc
"""

import os
import subprocess
import sys
from pathlib import Path
from collections import defaultdict


SKIP_DIRS = {
    "node_modules", ".git", "dist", "build", ".next",
    "coverage", "__pycache__", ".turbo", "out", ".vercel",
    "backups",
}

BASHRC = Path.home() / ".bashrc"

# ── Script aliases ────────────────────────────────────────────────────────────
# These always point relative to where setup_aliases.py lives

def get_script_aliases(scripts_dir: Path) -> list[tuple[str, str]]:
    """
    Returns list of (alias_name, command) tuples for all known scripts.
    scripts_dir = the directory containing this setup_aliases.py file.
    """
    s = str(scripts_dir)
    return [
        # Audit scripts
        ("css",      f"python3 {s}/audit_css.py --root ."),
        ("code",     f"python3 {s}/audit_dead_code.py --root ."),
        ("passer",   f"python3 {s}/audit_prop_passer.py --root ."),
        ("security", f"python3 {s}/audit_security.py --root ."),
        ("theatre",  f"python3 {s}/audit_theatre.py --root ."),
        ("changed",  f"python3 {s}/audit_what_changed.py --root ."),
        ("habits",   f"python3 {s}/audit_habits.py --root ."),
        # Fix scripts
        ("log",      f"python3 {s}/read_fix_log.py --root ."),
        ("fix",      f"python3 {s}/fix.py"),
        ("doubles",  f"python3 {s}/fix-types/fix_css_doubles.py --root ."),
        # Shell helpers
        ("collect",  "mv"),
        ("newFolder","mkdir -p"),
        ("gitgo",    "git add -A && git commit -m 'new files' && git push"),
    ]


def get_script_exports(scripts_dir: Path) -> list[tuple[str, str]]:
    """Returns export variable name → path for script directories."""
    return [
        ("current",   str(scripts_dir)),
        ("scripts",   str(scripts_dir.parent)),
        ("older",     str(scripts_dir.parent / "older")),
        ("fixtypes",  str(scripts_dir / "fix-types")),
        ("cssdouble", str(scripts_dir / "fix-types" / "css-double")),
    ]


# ── Directory scanning ────────────────────────────────────────────────────────

def scan_directories(root: Path) -> dict[str, str]:
    """
    Scan all directories under root and return alias_name → abs_path.

    Rules:
    - Alias = last segment of path (hyphens → underscores)
    - If two dirs share the same last segment:
        prefix with parent name → parentchild (e.g. adminmobile, accountmobile)
    - Skip SKIP_DIRS
    """
    all_dirs: list[Path] = []

    for dirpath in sorted(root.rglob("*")):
        if not dirpath.is_dir():
            continue
        # Skip if any part of the path is in SKIP_DIRS
        if any(part in SKIP_DIRS for part in dirpath.parts):
            continue
        # Skip hidden directories
        if any(part.startswith(".") for part in dirpath.relative_to(root).parts):
            continue
        all_dirs.append(dirpath)

    # Group by last segment
    by_name: dict[str, list[Path]] = defaultdict(list)
    for d in all_dirs:
        name = d.name.replace("-", "_").replace(" ", "_").lower()
        by_name[name].append(d)

    aliases: dict[str, str] = {}

    for name, dirs in by_name.items():
        if len(dirs) == 1:
            aliases[name] = str(dirs[0])
        else:
            # Duplicate — prefix with parent name
            for d in dirs:
                parent_name = d.parent.name.replace("-", "_").replace(" ", "_").lower()
                combined = f"{parent_name}{name}"
                # Handle triple collision (rare)
                if combined in aliases:
                    grandparent = d.parent.parent.name.replace("-", "_").lower()
                    combined = f"{grandparent}{combined}"
                aliases[combined] = str(d)

    return aliases


# ── Writing ───────────────────────────────────────────────────────────────────

def write_to_bashrc(
    script_exports: list[tuple[str, str]],
    script_aliases: list[tuple[str, str]],
    dir_aliases: dict[str, str],
    repo_name: str,
) -> None:
    content = BASHRC.read_text(encoding="utf-8") if BASHRC.exists() else ""

    # Remove previous auto-generated block if it exists
    marker_start = f"# ── setup_aliases: {repo_name} START ──"
    marker_end   = f"# ── setup_aliases: {repo_name} END ──"

    if marker_start in content:
        start_idx = content.index(marker_start)
        end_idx   = content.index(marker_end) + len(marker_end)
        content   = content[:start_idx].rstrip() + "\n" + content[end_idx:].lstrip()

    lines = [
        "",
        marker_start,
        "",
        "# Script path exports",
    ]
    for name, path in script_exports:
        lines.append(f'export {name}="{path}"')

    lines += ["", "# Script aliases"]
    for name, cmd in script_aliases:
        lines.append(f'alias {name}="{cmd}"')

    lines += ["", f"# Directory aliases — {repo_name}"]
    for alias, path in sorted(dir_aliases.items()):
        lines.append(f'export {alias}="{path}"')

    lines += ["", marker_end, ""]

    BASHRC.write_text(content.rstrip() + "\n" + "\n".join(lines), encoding="utf-8")


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    scripts_dir = Path(__file__).parent.resolve()

    print(f"\n{'═'*60}")
    print(f"  SETUP ALIASES")
    print(f"{'═'*60}")
    print(f"  Scripts directory: {scripts_dir}")
    print()

    # Prompt for repo root
    default_root = scripts_dir.parents[1]  # two levels up from scripts/current
    print(f"  Enter the repo root to scan for directory aliases.")
    print(f"  Press Enter to use: {default_root}")
    user_input = input("  Repo root: ").strip()
    root = Path(user_input).resolve() if user_input else default_root

    if not root.exists():
        print(f"\n  [ERROR] Directory not found: {root}")
        sys.exit(1)

    repo_name = root.name
    print(f"\n  Scanning directories under: {root}")

    # Scan directories
    dir_aliases = scan_directories(root)
    script_exports = get_script_exports(scripts_dir)
    script_aliases = get_script_aliases(scripts_dir)

    print(f"  Found {len(dir_aliases)} directory aliases")
    print(f"  Found {len(script_aliases)} script aliases")

    # Preview
    print(f"\n{'─'*60}")
    print("  SCRIPT ALIASES (preview)")
    print(f"{'─'*60}")
    for name, cmd in script_aliases:
        print(f"  alias {name}=\"{cmd[:55]}{'...' if len(cmd) > 55 else ''}\"")

    print(f"\n{'─'*60}")
    print("  DIRECTORY ALIASES (preview — first 20)")
    print(f"{'─'*60}")
    for alias, path in sorted(dir_aliases.items())[:20]:
        rel = str(Path(path).relative_to(root))
        print(f"  ${alias:<25} → {rel}")
    if len(dir_aliases) > 20:
        print(f"  ... and {len(dir_aliases) - 20} more")

    # Confirm
    print(f"\n  Write to ~/.bashrc? (y/n) ", end="", flush=True)
    ans = input().strip().lower()
    if ans != "y":
        print("  Cancelled.\n")
        sys.exit(0)

    write_to_bashrc(script_exports, script_aliases, dir_aliases, repo_name)

    # Source it
    print(f"\n  Written to ~/.bashrc")
    print(f"  Activating...")
    subprocess.run(f"source {BASHRC}", shell=True, executable="/bin/bash")
    print(f"\n  ✓ Done. Run: source ~/.bashrc")
    print(f"  Then test with: echo $current\n")


if __name__ == "__main__":
    main()