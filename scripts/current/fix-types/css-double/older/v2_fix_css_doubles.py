#!/usr/bin/env python3
"""
fix_css_doubles.py
──────────────────
Finds duplicate CSS declarations across component files and consolidates them
into the existing shared.css without touching any component .tsx files.

Streams output live as each step completes.

Usage:
  python scripts/fix-types/fix_css_doubles.py --root PATH [--dry-run] [--scan-only]
  --shared   path to shared.css (default: src/css/shared.css)
"""

import argparse
import re
import sys
from pathlib import Path
from collections import defaultdict
from itertools import combinations

sys.path.insert(0, str(Path(__file__).parent))
from log_reader import (
    read_file, write_file, backup_file, find_files,
    parse_css_classes, make_shared_name,
    log_change, write_change_log
)

SKIP_FILES = {"App.css", "index.css", "tokens.css"}
SKIP_DIRS  = {"node_modules", ".git", "dist", "build", ".next"}

# ── Live output helpers ───────────────────────────────────────────────────────

def out(msg: str, indent: int = 0) -> None:
    print("  " * indent + msg, flush=True)

def step(msg: str) -> None:
    print(f"    → {msg}", end="", flush=True)

def done(msg: str = "✓") -> None:
    print(f"  {msg}", flush=True)

def ok() -> None:
    print("  ✓", flush=True)

def skip(reason: str) -> None:
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
            if not decls:
                continue
            # Skip single-property classes — not meaningful duplicates
            if len(decls) < 2:
                continue
            class_index[name].append((css_file, decls))
            decl_index[frozenset(decls.items())].append((name, css_file))

    print(flush=True)  # end progress bar line

    same_dupes, diff_dupes = [], []
    seen_pairs = set()

    for name, entries in class_index.items():
        if len(entries) > 1:
            same_dupes.append({
                "class_name":   name,
                "files":        [e[0] for e in entries],
                "declarations": entries[0][1],
            })

    for decl_key, entries in decl_index.items():
        decls = dict(decl_key)
        # Full block must match — skip trivial single-property matches
        if len(decls) < 2:
            continue
        if len(entries) < 2:
            continue
        for (na, fa), (nb, fb) in combinations(entries, 2):
            if na == nb:
                continue
            pair = tuple(sorted([(na, str(fa)), (nb, str(fb))]))
            if pair in seen_pairs:
                continue
            seen_pairs.add(pair)
            diff_dupes.append({
                "names": [na, nb],
                "files": [fa, fb],
                "declarations": decls,
            })

    return same_dupes, diff_dupes

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
        ok() if not dry_run else skip("dry run")

        imp = relative_import(other, owner)
        step(f"Adding @import '{imp}'...")
        new_text = add_import(new_text, imp)
        ok() if not dry_run else skip("dry run")

        if not dry_run:
            step(f"Writing {other.name}...")
            backup_file(other)
            write_file(other, new_text)
            ok()
            log_change("remove_duplicate", str(rel),
                       f"Removed duplicate {name}, added @import of owner",
                       before=name, after=f"@import '{imp}'")
            out(f"  ✓ Done: {rel}", 1)

def fix_diff_name(dupe: dict, shared_path: Path, root: Path, dry_run: bool) -> None:
    na, nb = dupe["names"]
    fa, fb = dupe["files"]
    decls  = dupe["declarations"]
    shared_name = make_shared_name(na, nb)
    decl_block  = format_decls(decls)

    out(f"\n▶ DIFFERENT NAMES: {na}  ↔  {nb}")
    out(f"  Trail name: {shared_name}", 1)
    out(f"  File A: {fa.relative_to(root)}", 1)
    out(f"  File B: {fb.relative_to(root)}", 1)

    # 1. Write to shared.css
    shared_text = read_file(shared_path) if shared_path.exists() else ""

    if shared_name in shared_text:
        out(f"  ~ {shared_name} already in shared.css", 1)
    else:
        addition = (
            f"\n\n"
            f"/* ── Shared from {fa.relative_to(root)} ({na})\n"
            f"        and     {fb.relative_to(root)} ({nb}) ── */\n"
            f"{shared_name} {{\n{decl_block}\n}}\n\n"
            f"/* Alias — original name from {fa.name} */\n"
            f"{na} {{\n{decl_block}\n}}\n\n"
            f"/* Alias — original name from {fb.name} */\n"
            f"{nb} {{\n{decl_block}\n}}\n"
        )
        step(f"Adding {shared_name} to shared.css...")
        if not dry_run:
            if not shared_path.parent.exists():
                shared_path.parent.mkdir(parents=True)
            backup_file(shared_path)
            write_file(shared_path, shared_text + addition)
            ok()
            log_change("add_to_shared", str(shared_path),
                       f"Added {shared_name} with aliases {na} and {nb}")
        else:
            skip("dry run")

        step(f"Adding aliases {na} and {nb}...")
        ok() if not dry_run else skip("dry run")

    # 2. Remove from component files and add @import
    shared_imp = relative_import(fa, shared_path)

    for file, name in [(fa, na), (fb, nb)]:
        rel  = file.relative_to(root)
        text = read_file(file)

        step(f"Removing {name} from {file.name}...")
        new_text = remove_class_block(text, name)
        ok() if not dry_run else skip("dry run")

        step(f"Adding @import shared.css to {file.name}...")
        new_text = add_import(new_text, shared_imp)
        ok() if not dry_run else skip("dry run")

        if not dry_run:
            step(f"Writing {file.name}...")
            backup_file(file)
            write_file(file, new_text)
            ok()
            log_change("remove_and_import", str(rel),
                       f"Removed {name} (now aliased in shared.css as {shared_name})",
                       before=name, after=f"alias in shared.css + @import")
            out(f"  ✓ Done: {rel}", 1)

# ── Summary ───────────────────────────────────────────────────────────────────

def print_summary(same: list[dict], diff: list[dict],
                  root: Path, applied: int, dry_run: bool) -> None:
    header("SUMMARY")
    out(f"Same-name duplicates found:      {len(same)}")
    out(f"Diff-name duplicates found:      {len(diff)}")
    out(f"Total fixes {'previewed' if dry_run else 'applied'}: {applied}")
    if not dry_run and applied:
        out(f"\nTo recover:  python3 $current/fix.py --root . --recover")
    print(flush=True)

# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        description="Consolidate duplicate CSS into shared.css. Streams output live."
    )
    parser.add_argument("--root",      default=".", help="Repo root (default: .)")
    parser.add_argument("--dry-run",   action="store_true")
    parser.add_argument("--shared",    default=None,
                        help="Path to shared.css (default: src/css/shared.css)")
    parser.add_argument("--scan-only", action="store_true",
                        help="Report duplicates only, do not fix")
    args = parser.parse_args()

    root        = Path(args.root).resolve()
    shared_path = Path(args.shared).resolve() if args.shared \
                  else root / "src" / "css" / "shared.css"
    dry_run     = args.dry_run

    header(
        f"FIX CSS DOUBLES {'(DRY RUN) ' if dry_run else ''}{'(SCAN ONLY) ' if args.scan_only else ''}",
        f"Root: {root}  |  Shared: {shared_path}"
    )

    same_dupes, diff_dupes = find_duplicates(root)

    section(f"RESULTS  —  {len(same_dupes)} same-name  |  {len(diff_dupes)} diff-name")

    if not same_dupes and not diff_dupes:
        out("✓ No CSS duplicates found.")
        sys.exit(0)

    # Print what was found
    if same_dupes:
        out(f"\nSame-name duplicates ({len(same_dupes)}):")
        for d in same_dupes:
            out(f"  {d['class_name']}", 1)
            for f in d["files"]:
                out(f"• {f.relative_to(root)}", 2)

    if diff_dupes:
        out(f"\nDiff-name duplicates ({len(diff_dupes)}):")
        for d in diff_dupes:
            out(f"  {d['names'][0]}  ↔  {d['names'][1]}", 1)
            out(f"  Shared props: {', '.join(d['declarations'].keys())}", 1)
            out(f"  • {d['files'][0].relative_to(root)}", 2)
            out(f"  • {d['files'][1].relative_to(root)}", 2)

    if args.scan_only:
        sys.exit(0 if not (same_dupes or diff_dupes) else 1)

    section("APPLYING FIXES")
    applied = 0

    for dupe in same_dupes:
        fix_same_name(dupe, root, dry_run)
        applied += 1

    for dupe in diff_dupes:
        fix_diff_name(dupe, shared_path, root, dry_run)
        applied += 1

    write_change_log(root, "fix_css_doubles", dry_run)
    print_summary(same_dupes, diff_dupes, root, applied, dry_run)
    sys.exit(0)


if __name__ == "__main__":
    main()