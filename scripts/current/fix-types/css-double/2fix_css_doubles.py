#!/usr/bin/env python3
"""
fix_css_doubles.py
──────────────────
Finds duplicate CSS declarations across component files and consolidates them
into the existing shared.css without touching any component .tsx files.

Backups go to: <script_dir>/backups/YYYY-MM-DD_HH-MM-SS/
Each file that will be modified is copied there before any change is made.

Usage:
  doubles                  run fixes
  doubles --dry-run        preview only
  doubles --scan-only      report duplicates, no fixes
  doubles --recover        interactive recovery menu
  doubles --recover latest restore most recent backup automatically
"""

import argparse
import re
import sys
import shutil
import termios
import tty
from datetime import datetime
from pathlib import Path
from collections import defaultdict
from itertools import combinations

sys.path.insert(0, str(Path(__file__).parent))
from log_reader import (
    read_file, write_file, find_files,
    parse_css_classes, make_shared_name,
    log_change, write_change_log
)

SKIP_FILES = {"App.css", "index.css", "tokens.css"}
SKIP_DIRS  = {"node_modules", ".git", "dist", "build", ".next"}

# Backup directory lives next to this script
BACKUP_ROOT = Path(__file__).parent / "backups"

# Current run's backup directory — set in main() before any fixes run
_BACKUP_DIR: Path | None = None


# ── Backup helpers ────────────────────────────────────────────────────────────

def create_backup_dir() -> Path:
    """Create a timestamped backup directory for this run."""
    ts  = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
    bak = BACKUP_ROOT / ts
    bak.mkdir(parents=True, exist_ok=True)
    return bak


def backup(file_path: Path) -> Path | None:
    """
    Copy file_path into the current run's backup directory,
    preserving enough path context to restore it later.
    Returns the backup copy path, or None if dry_run.
    """
    if _BACKUP_DIR is None:
        return None
    # Preserve the filename + immediate parent folder name so collisions are unlikely
    dest_name = f"{file_path.parent.name}__{file_path.name}"
    dest = _BACKUP_DIR / dest_name
    # Store the original absolute path in a sidecar .origin file
    (dest.parent / (dest_name + ".origin")).write_text(str(file_path), encoding="utf-8")
    shutil.copy2(file_path, dest)
    return dest


def list_backup_dirs() -> list[Path]:
    """Return all backup directories, newest first."""
    if not BACKUP_ROOT.exists():
        return []
    dirs = sorted(
        [d for d in BACKUP_ROOT.iterdir() if d.is_dir()],
        reverse=True
    )
    return dirs


# ── Interactive arrow-key menu ────────────────────────────────────────────────

def arrow_menu(title: str, options: list[str]) -> int:
    """
    Show an interactive arrow-key selection menu.
    Returns the index of the selected option.
    """
    selected = 0

    def render():
        # Clear previously rendered lines
        sys.stdout.write(f"\033[{len(options) + 2}A")
        sys.stdout.write(f"\r\033[K  {title}\n")
        for i, opt in enumerate(options):
            prefix = "  ▶ " if i == selected else "    "
            sys.stdout.write(f"\r\033[K{prefix}{opt}\n")
        sys.stdout.flush()

    # Initial render
    print(f"\n  {title}")
    for i, opt in enumerate(options):
        prefix = "  ▶ " if i == 0 else "    "
        print(f"{prefix}{opt}")
    sys.stdout.flush()

    fd = sys.stdin.fileno()
    old_settings = termios.tcgetattr(fd)
    try:
        tty.setraw(fd)
        while True:
            ch = sys.stdin.read(1)
            if ch == '\x1b':
                ch2 = sys.stdin.read(1)
                ch3 = sys.stdin.read(1)
                if ch2 == '[':
                    if ch3 == 'A':  # up
                        selected = (selected - 1) % len(options)
                        render()
                    elif ch3 == 'B':  # down
                        selected = (selected + 1) % len(options)
                        render()
            elif ch in ('\r', '\n'):
                break
            elif ch == 'q':
                selected = -1
                break
    finally:
        termios.tcsetattr(fd, termios.TCSADRAIN, old_settings)

    print()
    return selected


# ── Recovery ──────────────────────────────────────────────────────────────────

def recover(mode: str) -> None:
    """
    Restore files from a backup directory.
    mode: 'latest' or 'list'
    """
    backup_dirs = list_backup_dirs()

    if not backup_dirs:
        print("\n  No backups found in:", BACKUP_ROOT)
        print("  Nothing to recover.\n")
        sys.exit(0)

    if mode == "latest":
        target = backup_dirs[0]
        print(f"\n  Recovering latest backup: {target.name}")
    else:
        # Interactive list
        options = [d.name for d in backup_dirs]
        idx = arrow_menu("Select backup to recover (↑↓ to move, Enter to select, q to quit):", options)
        if idx < 0:
            print("\n  Cancelled.\n")
            sys.exit(0)
        target = backup_dirs[idx]
        print(f"\n  Recovering: {target.name}")

    # Find all backed-up files and their origins
    origin_files = list(target.glob("*.origin"))
    if not origin_files:
        print("  No files found in this backup.")
        sys.exit(1)

    print(f"  Files to restore: {len(origin_files)}\n")

    restored = 0
    for origin_file in sorted(origin_files):
        original_path = Path(origin_file.read_text(encoding="utf-8").strip())
        backup_copy   = target / origin_file.stem  # strip .origin

        if not backup_copy.exists():
            print(f"  [warn] Backup copy missing: {backup_copy.name}")
            continue

        print(f"  ↩ {original_path.relative_to(original_path.parents[3]) if len(original_path.parts) > 3 else original_path}")
        shutil.copy2(backup_copy, original_path)
        restored += 1

    print(f"\n  ✓ Restored {restored} file(s) from {target.name}")
    print(f"\n  Delete this backup? (y/n) ", end="", flush=True)
    ans = input().strip().lower()
    if ans == 'y':
        shutil.rmtree(target)
        print(f"  ✓ Backup {target.name} deleted.")
    print()
    sys.exit(0)


# ── Live output helpers ───────────────────────────────────────────────────────

def out(msg: str, indent: int = 0) -> None:
    print("  " * indent + msg, flush=True)

def step(msg: str) -> None:
    print(f"    → {msg}", end="", flush=True)

def ok() -> None:
    print("  ✓", flush=True)

def skip_msg(reason: str) -> None:
    print(f"  ~ {reason}", flush=True)

def bar(current: int, total: int, label: str = "") -> None:
    width = 36
    filled = int(width * current / total) if total else width
    b = "█" * filled + "░" * (width - filled)
    print(f"\r  [{b}] {current}/{total}  {label[:30]:<30}", end="", flush=True)

def section(title: str) -> None:
    print(f"\n{'─'*66}", flush=True)
    print(f"  {title}", flush=True)
    print(f"{'─'*66}", flush=True)

def header(title: str, extra: str = "") -> None:
    print(f"\n{'═'*66}", flush=True)
    print(f"  {title}", flush=True)
    if extra:
        print(f"  {extra}", flush=True)
    print(f"{'═'*66}", flush=True)


# ── CSS helpers ───────────────────────────────────────────────────────────────

def is_component_css(path: Path) -> bool:
    return path.name not in SKIP_FILES and "components" in str(path)

def has_import(text: str, path: str) -> bool:
    return path in text

def add_import(text: str, import_path: str) -> str:
    if has_import(text, import_path):
        return text
    return f"@import '{import_path}';\n" + text

def remove_class_block(text: str, class_name: str) -> str:
    pattern = re.compile(re.escape(class_name) + r'\s*\{[^}]*\}', re.DOTALL)
    return pattern.sub('', text).strip() + '\n'

def relative_import(from_file: Path, to_file: Path) -> str:
    try:
        return str(to_file.relative_to(from_file.parent)).replace('\\', '/')
    except ValueError:
        from_parts = from_file.parent.parts
        to_parts   = to_file.parts
        common = sum(1 for a, b in zip(from_parts, to_parts) if a == b)
        ups    = len(from_parts) - common
        downs  = to_parts[common:]
        return '../' * ups + '/'.join(downs)

def format_decls(decls: dict) -> str:
    return '\n'.join(f"  {p}: {v};" for p, v in sorted(decls.items()))


# ── Scanning ──────────────────────────────────────────────────────────────────

def find_duplicates(root: Path) -> tuple[list[dict], list[dict]]:
    css_files = [f for f in find_files(root, {".css"}) if is_component_css(f)]

    out(f"Scanning {len(css_files)} component CSS files...\n")

    class_index: dict[str, list[tuple[Path, dict]]] = defaultdict(list)
    decl_index:  dict[frozenset, list[tuple[str, Path]]] = defaultdict(list)

    for i, css_file in enumerate(css_files, 1):
        bar(i, len(css_files), css_file.name)
        text    = read_file(css_file)
        classes = parse_css_classes(text)
        for name, data in classes.items():
            decls = data["declarations"]
            if not decls or len(decls) < 2:
                continue
            class_index[name].append((css_file, decls))
            decl_index[frozenset(decls.items())].append((name, css_file))

    print(flush=True)

    same_dupes, diff_groups = [], []

    for name, entries in class_index.items():
        if len(entries) > 1:
            same_dupes.append({
                "class_name":   name,
                "files":        [e[0] for e in entries],
                "declarations": entries[0][1],
            })

    for decl_key, entries in decl_index.items():
        decls = dict(decl_key)
        if len(decls) < 2 or len(entries) < 2:
            continue
        unique_entries, seen_names = [], set()
        for name, file in entries:
            if name not in seen_names:
                seen_names.add(name)
                unique_entries.append((name, file))
        if len(unique_entries) < 2:
            continue
        diff_groups.append({
            "names":        [e[0] for e in unique_entries],
            "files":        [e[1] for e in unique_entries],
            "declarations": decls,
            "count":        len(unique_entries),
        })

    return same_dupes, diff_groups


# ── Fixers ────────────────────────────────────────────────────────────────────

def fix_same_name(dupe: dict, root: Path, dry_run: bool) -> None:
    name   = dupe["class_name"]
    files  = dupe["files"]
    owner  = min(files, key=lambda f: len(f.parts))
    others = [f for f in files if f != owner]

    out(f"\n▶ SAME NAME: {name}")
    out(f"  Owner: {owner.relative_to(root)}", 1)

    for other in others:
        rel = other.relative_to(root)
        out(f"  Removing from: {rel}", 1)
        text = read_file(other)

        step(f"Removing {name} from {other.name}...")
        new_text = remove_class_block(text, name)
        ok() if not dry_run else skip_msg("dry run")

        imp = relative_import(other, owner)
        step(f"Adding @import '{imp}'...")
        new_text = add_import(new_text, imp)
        ok() if not dry_run else skip_msg("dry run")

        if not dry_run:
            step(f"Backing up {other.name}...")
            backup(other)
            ok()
            step(f"Writing {other.name}...")
            write_file(other, new_text)
            ok()
            log_change("remove_duplicate", str(rel),
                       f"Removed duplicate {name}, added @import of owner",
                       before=name, after=f"@import '{imp}'")
            out(f"  ✓ Done: {rel}", 1)


def fix_diff_name(group: dict, shared_path: Path, root: Path, dry_run: bool) -> None:
    names  = group["names"]
    files  = group["files"]
    decls  = group["declarations"]
    count  = group["count"]

    shared_name = make_shared_name(names[0], names[1])
    decl_block  = format_decls(decls)
    members_str = "  ↔  ".join(names)

    out(f"\n▶ FAMILY ({count} members): {members_str}")
    out(f"  Trail name: {shared_name}", 1)
    for i, (name, file) in enumerate(zip(names, files)):
        out(f"  [{i+1}] {name}  →  {file.relative_to(root)}", 1)

    # 1. Write to shared.css
    shared_text = read_file(shared_path) if shared_path.exists() else ""

    if shared_name in shared_text:
        out(f"  ~ {shared_name} already in shared.css", 1)
    else:
        origins = "\n".join(
            f"        {file.relative_to(root)} ({name})"
            for name, file in zip(names, files)
        )
        aliases = "\n\n".join(
            f"/* Alias — original name from {file.name} */\n"
            f"{name} {{\n{decl_block}\n}}"
            for name, file in zip(names, files)
        )
        addition = (
            f"\n\n"
            f"/* ── Family shared from:\n"
            f"{origins}\n"
            f"   ── */\n"
            f"{shared_name} {{\n{decl_block}\n}}\n\n"
            f"{aliases}\n"
        )
        step(f"Adding {shared_name} + {count} aliases to shared.css...")
        if not dry_run:
            if not shared_path.parent.exists():
                shared_path.parent.mkdir(parents=True)
            backup(shared_path)
            write_file(shared_path, shared_text + addition)
            ok()
            log_change("add_to_shared", str(shared_path),
                       f"Added {shared_name} with aliases: {', '.join(names)}")
        else:
            skip_msg("dry run")

    # 2. Remove from component files and add @import
    shared_imp = relative_import(files[0], shared_path)

    for name, file in zip(names, files):
        rel  = file.relative_to(root)
        text = read_file(file)

        step(f"Removing {name} from {file.name}...")
        new_text = remove_class_block(text, name)
        ok() if not dry_run else skip_msg("dry run")

        step(f"Adding @import shared.css to {file.name}...")
        new_text = add_import(new_text, shared_imp)
        ok() if not dry_run else skip_msg("dry run")

        if not dry_run:
            step(f"Backing up {file.name}...")
            backup(file)
            ok()
            step(f"Writing {file.name}...")
            write_file(file, new_text)
            ok()
            log_change("remove_and_import", str(rel),
                       f"Removed {name} (now aliased in shared.css as {shared_name})",
                       before=name, after=f"alias in shared.css + @import")
            out(f"  ✓ Done: {rel}", 1)


# ── Summary ───────────────────────────────────────────────────────────────────

def print_summary(same: list[dict], diff: list[dict],
                  applied: int, dry_run: bool) -> None:
    header("SUMMARY")
    out(f"Same-name duplicates:  {len(same)}")
    out(f"Family groups:         {len(diff)}")
    out(f"Fixes {'previewed' if dry_run else 'applied'}: {applied}")
    if not dry_run and applied and _BACKUP_DIR:
        out(f"\nBackup saved to: {_BACKUP_DIR}")
        out(f"To recover:      doubles --recover")
    print(flush=True)


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    global _BACKUP_DIR

    parser = argparse.ArgumentParser(
        description="Consolidate duplicate CSS into shared.css. Streams output live."
    )
    parser.add_argument("--root",      default=".", help="Repo root (default: .)")
    parser.add_argument("--dry-run",   action="store_true")
    parser.add_argument("--shared",    default=None,
                        help="Path to shared.css (default: src/css/shared.css)")
    parser.add_argument("--scan-only", action="store_true")
    parser.add_argument("--recover",   nargs="?", const="menu",
                        metavar="latest",
                        help="Recover from backup. Use 'latest' to skip menu.")
    args = parser.parse_args()

    # ── Recovery mode ─────────────────────────────────────────────────────────
    if args.recover is not None:
        mode = "latest" if args.recover == "latest" else "list"
        recover(mode)
        return

    root        = Path(args.root).resolve()
    shared_path = Path(args.shared).resolve() if args.shared \
                  else root / "src" / "css" / "shared.css"
    dry_run     = args.dry_run

    header(
        f"FIX CSS DOUBLES {'(DRY RUN) ' if dry_run else ''}{'(SCAN ONLY) ' if args.scan_only else ''}",
        f"Root: {root}  |  Shared: {shared_path}"
    )

    if not dry_run and not args.scan_only:
        _BACKUP_DIR = create_backup_dir()
        out(f"Backup directory: {_BACKUP_DIR}\n")

    same_dupes, diff_dupes = find_duplicates(root)

    section(f"RESULTS  —  {len(same_dupes)} same-name  |  {len(diff_dupes)} families")

    if not same_dupes and not diff_dupes:
        out("✓ No CSS duplicates found.")
        sys.exit(0)

    if same_dupes:
        out(f"\nSame-name duplicates ({len(same_dupes)}):")
        for d in same_dupes:
            out(f"  {d['class_name']}", 1)
            for f in d["files"]:
                out(f"• {f.relative_to(root)}", 2)

    if diff_dupes:
        out(f"\nFamilies ({len(diff_dupes)}):")
        for d in diff_dupes:
            out(f"  {' ↔ '.join(d['names'])}", 1)
            out(f"  Props: {', '.join(d['declarations'].keys())}", 1)

    if args.scan_only:
        sys.exit(0 if not (same_dupes or diff_dupes) else 1)

    section("APPLYING FIXES")
    applied = 0

    for dupe in same_dupes:
        fix_same_name(dupe, root, dry_run)
        applied += 1

    for group in diff_dupes:
        fix_diff_name(group, shared_path, root, dry_run)
        applied += 1

    write_change_log(root, "fix_css_doubles", dry_run)
    print_summary(same_dupes, diff_dupes, applied, dry_run)
    sys.exit(0)


if __name__ == "__main__":
    main()