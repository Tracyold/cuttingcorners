#!/usr/bin/env python3
"""
fix_css_doubles.py
──────────────────
Step 1: Renames all .css files to .scss and updates imports across the codebase.
Step 2: Finds exact clone classes across component .scss files.
Step 3: Writes the shared base class to shared.scss named from first words of file names.
Step 4: Replaces the duplicate in each component .scss with @extend + original name.

Backups go to: <script_dir>/backups/YYYY-MM-DD_HH-MM-SS/

Usage:
  doubles                  run full pipeline
  doubles --dry-run        preview only
  doubles --scan-only      report clones, no changes
  doubles --recover        interactive recovery menu
  doubles --recover latest restore most recent backup
  doubles --skip-rename    skip the css→scss rename step
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
    parse_css_classes,
    log_change, write_change_log
)

SKIP_FILES = {"App.scss", "App.css", "index.scss", "index.css", "tokens.scss", "tokens.css", "shared.scss", "shared.css"}
SKIP_DIRS  = {"node_modules", ".git", "dist", "build", ".next", "backups"}
SOURCE_EXTENSIONS = {".ts", ".tsx", ".js", ".jsx"}

BACKUP_ROOT = Path(__file__).parent / "backups"
_BACKUP_DIR: Path | None = None


# ── Backup helpers ────────────────────────────────────────────────────────────

def create_backup_dir() -> Path:
    ts  = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
    bak = BACKUP_ROOT / ts
    bak.mkdir(parents=True, exist_ok=True)
    return bak


def backup(file_path: Path) -> None:
    if _BACKUP_DIR is None or not file_path.exists():
        return
    dest_name = f"{file_path.parent.name}__{file_path.name}"
    dest = _BACKUP_DIR / dest_name
    (dest.parent / (dest_name + ".origin")).write_text(str(file_path), encoding="utf-8")
    shutil.copy2(file_path, dest)


# ── Recovery ──────────────────────────────────────────────────────────────────

def list_backup_dirs() -> list[Path]:
    if not BACKUP_ROOT.exists():
        return []
    return sorted([d for d in BACKUP_ROOT.iterdir() if d.is_dir()], reverse=True)


def arrow_menu(title: str, options: list[str]) -> int:
    selected = 0

    def render():
        sys.stdout.write(f"\033[{len(options) + 2}A")
        sys.stdout.write(f"\r\033[K  {title}\n")
        for i, opt in enumerate(options):
            prefix = "  ▶ " if i == selected else "    "
            sys.stdout.write(f"\r\033[K{prefix}{opt}\n")
        sys.stdout.flush()

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
                    if ch3 == 'A':
                        selected = (selected - 1) % len(options)
                        render()
                    elif ch3 == 'B':
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


def recover(mode: str) -> None:
    backup_dirs = list_backup_dirs()
    if not backup_dirs:
        print("\n  No backups found.\n")
        sys.exit(0)

    if mode == "latest":
        target = backup_dirs[0]
        print(f"\n  Recovering latest: {target.name}")
    else:
        options = [d.name for d in backup_dirs]
        idx = arrow_menu("Select backup (↑↓ Enter, q to quit):", options)
        if idx < 0:
            print("\n  Cancelled.\n")
            sys.exit(0)
        target = backup_dirs[idx]
        print(f"\n  Recovering: {target.name}")

    origin_files = list(target.glob("*.origin"))
    if not origin_files:
        print("  No files in backup.")
        sys.exit(1)

    print(f"  Restoring {len(origin_files)} file(s)...\n")
    for of in sorted(origin_files):
        original = Path(of.read_text().strip())
        copy     = target / of.stem
        if not copy.exists():
            print(f"  [warn] Missing: {copy.name}")
            continue
        print(f"  ↩ {original.name}")
        shutil.copy2(copy, original)

    print(f"\n  ✓ Restored from {target.name}")
    print(f"  Delete this backup? (y/n) ", end="", flush=True)
    if input().strip().lower() == 'y':
        shutil.rmtree(target)
        print(f"  ✓ Deleted.")
    print()
    sys.exit(0)


# ── Output helpers ────────────────────────────────────────────────────────────

def out(msg: str, indent: int = 0) -> None:
    print("  " * indent + msg, flush=True)

def step(msg: str) -> None:
    print(f"    → {msg}", end="", flush=True)

def ok() -> None:
    print("  ✓", flush=True)

def skip_msg(reason: str = "dry run") -> None:
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
    if extra: print(f"  {extra}", flush=True)
    print(f"{'═'*66}", flush=True)


# ── Step 1: CSS → SCSS rename ─────────────────────────────────────────────────

def rename_css_to_scss(root: Path, dry_run: bool) -> None:
    section("STEP 1 — Renaming .css → .scss")

    css_files = [
        f for f in root.rglob("*.css")
        if not any(s in f.parts for s in SKIP_DIRS)
    ]

    if not css_files:
        out("✓ No .css files found — all already .scss")
        return

    out(f"Found {len(css_files)} .css file(s) to rename\n")

    # Rename each .css file to .scss
    renamed = []
    for i, css in enumerate(css_files, 1):
        bar(i, len(css_files), css.name)
        scss = css.with_suffix(".scss")
        if not dry_run:
            backup(css)
            css.rename(scss)
            renamed.append((css, scss))
        else:
            renamed.append((css, scss))

    print(flush=True)

    # Update all imports in source files and scss files
    all_source = find_files(root, SOURCE_EXTENSIONS | {".scss"})
    out(f"\nUpdating import references in {len(all_source)} source files...")

    updated = 0
    for src in all_source:
        text = read_file(src)
        new_text = text
        for old_css, new_scss in renamed:
            # Replace any import of the old .css name with .scss
            old_name = old_css.name
            new_name = new_scss.name
            old_stem = old_css.stem
            # Match import statements referencing this file
            new_text = re.sub(
                rf"""(import\s+['""][^'"]*){re.escape(old_name)}(['"])""",
                rf"\g<1>{new_name}\g<2>",
                new_text
            )
            # Also match imports without extension that might need updating
            new_text = re.sub(
                rf"""(@import\s+['"'][^'"]*){re.escape(old_name)}(['"])""",
                rf"\g<1>{new_name}\g<2>",
                new_text
            )
        if new_text != text:
            if not dry_run:
                backup(src)
                write_file(src, new_text)
            updated += 1

    out(f"  Updated {updated} file(s) with new import paths")
    out(f"  ✓ Renamed {len(renamed)} .css → .scss")


# ── Step 2: Find exact clone classes ─────────────────────────────────────────

def is_component_scss(path: Path) -> bool:
    return path.name not in SKIP_FILES and "components" in str(path)


def find_clones(root: Path) -> list[dict]:
    """
    Find classes that are EXACT clones — same properties, same values,
    same count. Not one property more or less.
    Groups them as families (2+ members).
    """
    scss_files = [f for f in find_files(root, {".scss", ".css"}) if is_component_scss(f)]

    out(f"\nScanning {len(scss_files)} component files...\n")

    # frozenset(decl items) → [(class_name, file)]
    decl_index: dict[frozenset, list[tuple[str, Path]]] = defaultdict(list)

    for i, f in enumerate(scss_files, 1):
        bar(i, len(scss_files), f.name)
        text    = read_file(f)
        classes = parse_css_classes(text)
        for name, data in classes.items():
            decls = data["declarations"]
            if not decls or len(decls) < 2:
                continue
            decl_index[frozenset(decls.items())].append((name, f))

    print(flush=True)

    families = []
    for decl_key, entries in decl_index.items():
        decls = dict(decl_key)
        if len(decls) < 2 or len(entries) < 2:
            continue
        # Deduplicate by class name
        unique, seen = [], set()
        for name, f in entries:
            if name not in seen:
                seen.add(name)
                unique.append((name, f))
        if len(unique) < 2:
            continue
        families.append({
            "names":        [e[0] for e in unique],
            "files":        [e[1] for e in unique],
            "declarations": decls,
            "count":        len(unique),
        })

    return families


# ── Step 3 & 4: Write shared + @extend ───────────────────────────────────────

def make_shared_name(files: list[Path]) -> str:
    """
    Build the shared class name from the first word of each file's stem.
    card.scss + tile.scss + button.scss → .card-tile-button
    """
    first_words = []
    for f in files:
        stem  = f.stem  # e.g. 'ButtonPill', 'card-thermo', 'InputText'
        # Split on hyphens, underscores, or camelCase
        words = re.sub(r'([A-Z])', r'-\1', stem).lower().strip('-').split('-')
        first_words.append(words[0])
    # Deduplicate while preserving order
    seen, unique = set(), []
    for w in first_words:
        if w not in seen:
            seen.add(w)
            unique.append(w)
    return '.' + '-'.join(unique)


def format_decls(decls: dict) -> str:
    return '\n'.join(f"  {p}: {v};" for p, v in sorted(decls.items()))


def remove_class_block(text: str, class_name: str) -> str:
    pattern = re.compile(re.escape(class_name) + r'\s*\{[^}]*\}', re.DOTALL)
    return pattern.sub('', text).strip() + '\n'


def relative_import(from_file: Path, to_file: Path) -> str:
    try:
        rel = str(to_file.relative_to(from_file.parent)).replace('\\', '/')
        # Remove extension for SCSS @use
        return rel.replace('.scss', '')
    except ValueError:
        from_parts = from_file.parent.parts
        to_parts   = to_file.parts
        common = sum(1 for a, b in zip(from_parts, to_parts) if a == b)
        ups    = len(from_parts) - common
        downs  = to_parts[common:]
        path   = '../' * ups + '/'.join(downs)
        return path.replace('.scss', '')


def fix_family(group: dict, shared_path: Path, root: Path, dry_run: bool) -> None:
    names  = group["names"]
    files  = group["files"]
    decls  = group["declarations"]
    count  = group["count"]

    shared_name = make_shared_name(files)
    decl_block  = format_decls(decls)
    members_str = "  ↔  ".join(names)

    out(f"\n▶ FAMILY ({count} members): {members_str}")
    out(f"  Shared class: {shared_name}", 1)
    for i, (name, f) in enumerate(zip(names, files)):
        out(f"  [{i+1}] {name}  →  {f.relative_to(root)}", 1)

    # ── Write to shared.scss ──────────────────────────────────────────────────
    shared_text = read_file(shared_path) if shared_path.exists() else ""

    if shared_name in shared_text:
        out(f"  ~ {shared_name} already in shared.scss", 1)
    else:
        origins = "\n".join(
            f"  //   {f.relative_to(root)} → {name}"
            for name, f in zip(names, files)
        )
        addition = (
            f"\n\n"
            f"// ── Shared skeleton from:\n"
            f"{origins}\n"
            f"// ──────────────────────────────────\n"
            f"{shared_name} {{\n{decl_block}\n}}\n"
        )
        step(f"Writing {shared_name} to shared.scss...")
        if not dry_run:
            if not shared_path.parent.exists():
                shared_path.parent.mkdir(parents=True)
            backup(shared_path)
            write_file(shared_path, shared_text + addition)
            ok()
            log_change("add_to_shared", str(shared_path),
                       f"Added {shared_name} from {', '.join(names)}")
        else:
            skip_msg()

    # ── Replace in each component file with @extend ───────────────────────────
    shared_use = relative_import(files[0], shared_path)

    for name, f in zip(names, files):
        rel  = f.relative_to(root)
        text = read_file(f)

        # Check if @use already present
        use_line = f"@use '{shared_use}' as *;"
        has_use  = use_line in text or f"@use '{shared_use}'" in text

        step(f"Removing {name} from {f.name}...")
        new_text = remove_class_block(text, name)
        ok() if not dry_run else skip_msg()

        # Add @extend block with original name preserved
        extend_block = (
            f"\n// Extended from {shared_name} in shared.scss\n"
            f"{name} {{\n"
            f"  @extend {shared_name};\n"
            f"  // Add {f.stem}-specific styles below\n"
            f"}}\n"
        )

        if not has_use:
            step(f"Adding @use shared to {f.name}...")
            new_text = use_line + "\n" + new_text
            ok() if not dry_run else skip_msg()

        step(f"Adding @extend block for {name}...")
        new_text = new_text.rstrip() + "\n" + extend_block
        ok() if not dry_run else skip_msg()

        if not dry_run:
            step(f"Writing {f.name}...")
            backup(f)
            write_file(f, new_text)
            ok()
            log_change("extend_shared", str(rel),
                       f"{name} now @extends {shared_name}",
                       before=name, after=f"@extend {shared_name}")
            out(f"  ✓ Done: {rel}", 1)


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    global _BACKUP_DIR

    parser = argparse.ArgumentParser(
        description="Rename CSS→SCSS, find clone classes, wire up @extend via shared.scss."
    )
    parser.add_argument("--root",        default=".", help="Repo root (default: .)")
    parser.add_argument("--dry-run",     action="store_true")
    parser.add_argument("--scan-only",   action="store_true")
    parser.add_argument("--skip-rename", action="store_true",
                        help="Skip the css→scss rename step")
    parser.add_argument("--shared",      default=None,
                        help="Path to shared.scss (default: src/css/shared.scss)")
    parser.add_argument("--recover",     nargs="?", const="menu", metavar="latest")
    args = parser.parse_args()

    if args.recover is not None:
        recover("latest" if args.recover == "latest" else "list")
        return

    root        = Path(args.root).resolve()
    shared_path = Path(args.shared).resolve() if args.shared \
                  else root / "src" / "css" / "shared.scss"
    dry_run     = args.dry_run

    header(
        f"FIX CSS DOUBLES {'(DRY RUN) ' if dry_run else ''}{'(SCAN ONLY) ' if args.scan_only else ''}",
        f"Root: {root}"
    )

    if not dry_run and not args.scan_only:
        _BACKUP_DIR = create_backup_dir()
        out(f"Backup: {_BACKUP_DIR}\n")

    # Step 1 — rename
    if not args.skip_rename:
        rename_css_to_scss(root, dry_run)

    # Step 2 — find clones
    section("STEP 2 — Finding exact clone classes")
    families = find_clones(root)

    if not families:
        out("✓ No exact clone classes found.")
        sys.exit(0)

    out(f"\nFound {len(families)} family group(s):\n")
    for g in families:
        out(f"  {'  ↔  '.join(g['names'])}", 1)
        out(f"  Props: {', '.join(g['declarations'].keys())}", 1)
        for f in g["files"]:
            out(f"  • {f.relative_to(root)}", 2)

    if args.scan_only:
        sys.exit(0 if not families else 1)

    # Step 3 & 4 — write shared + @extend
    section("STEP 3 & 4 — Writing shared.scss + @extend in components")
    for group in families:
        fix_family(group, shared_path, root, dry_run)

    write_change_log(root, "fix_css_doubles", dry_run)

    header("SUMMARY")
    out(f"Families processed: {len(families)}")
    if not dry_run and _BACKUP_DIR:
        out(f"Backup:  {_BACKUP_DIR}")
        out(f"Recover: doubles --recover")
    print(flush=True)
    sys.exit(0)


if __name__ == "__main__":
    main()