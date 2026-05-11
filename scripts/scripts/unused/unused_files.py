#!/usr/bin/env python3
"""
audit_unused_files.py
─────────────────────
Finds every file in the repo that is not imported, required, or referenced
anywhere in the codebase. Clones them to frontend/unused/<date>/ then
deletes from their original location.

What counts as "referenced":
  - import '...' / import X from '...'
  - require('...')
  - @import '...' / @use '...'
  - src="..." href="..." url("...")
  - Any string literal containing the filename

Usage:
  python scripts/audit_unused_files.py [--root PATH] [--dry-run] [--scan-only]

  --root       Repo root (default: current directory)
  --dry-run    Show what would change without writing
  --scan-only  Report only, do not move or delete

Exit code:
  0 = done
  1 = errors
"""

import argparse
import re
import sys
import shutil
from datetime import datetime
from pathlib import Path
from collections import defaultdict

SKIP_DIRS = {
    "node_modules", ".git", "dist", "build", ".next",
    "coverage", "__pycache__", "unused", "backups",
    ".scss-rename-backup",
}

# File types to check for being unused
CHECKABLE_EXTENSIONS = {
    ".ts", ".tsx", ".js", ".jsx",
    ".scss", ".css",
    ".json",
    ".svg", ".png", ".jpg", ".jpeg", ".gif", ".webp", ".ico",
    ".md",
}

# File types that contain import references to scan
SOURCE_EXTENSIONS = {
    ".ts", ".tsx", ".js", ".jsx",
    ".scss", ".css",
    ".html",
    ".json",  # for package.json main/exports fields
}

# Files that are always considered "used" regardless of imports
ALWAYS_USED = {
    "package.json", "package-lock.json", "tsconfig.json",
    "tsconfig.app.json", "tsconfig.node.json",
    "vite.config.ts", "vite.config.js",
    "eslint.config.js", ".eslintrc.js", ".eslintrc.json",
    "index.html", "index.tsx", "index.ts", "index.js",
    "main.tsx", "main.ts", "main.js",
    "App.tsx", "App.ts", "App.jsx", "App.js",
    "README.md", "LICENSE",
    "globals.css", "globals.scss",
    "shared.scss", "shared.css",
    "tokens.css", "tokens.scss",
}


# ── Output helpers ────────────────────────────────────────────────────────────

def out(msg: str = "", indent: int = 0) -> None:
    print("  " * indent + msg, flush=True)

def bar(current: int, total: int, label: str = "") -> None:
    width = 36
    filled = int(width * current / total) if total else width
    b = "█" * filled + "░" * (width - filled)
    print(f"\r  [{b}] {current}/{total}  {label[:28]:<28}", end="", flush=True)

def section(title: str) -> None:
    print(f"\n{'─'*66}", flush=True)
    print(f"  {title}", flush=True)
    print(f"{'─'*66}", flush=True)

def header(title: str, extra: str = "") -> None:
    print(f"\n{'═'*66}", flush=True)
    print(f"  {title}", flush=True)
    if extra: print(f"  {extra}", flush=True)
    print(f"{'═'*66}", flush=True)


# ── File walking ──────────────────────────────────────────────────────────────

def walk(root: Path, extensions: set[str] | None = None) -> list[Path]:
    results = []
    for f in root.rglob("*"):
        if not f.is_file():
            continue
        if any(s in f.parts for s in SKIP_DIRS):
            continue
        if any(part.startswith(".scss-rename-backup") for part in f.parts):
            continue
        if extensions is None or f.suffix in extensions:
            results.append(f)
    return sorted(results)


def read(f: Path) -> str:
    try:
        return f.read_text(encoding="utf-8", errors="replace")
    except Exception:
        return ""


# ── Reference scanning ────────────────────────────────────────────────────────

# Patterns that reference file paths
REFERENCE_PATTERNS = [
    # import X from './foo'  or  import './foo.scss'
    r"""import\s+(?:[\w\s{},*'"]+from\s+)?['"]([^'"]+)['"]""",
    # require('./foo')
    r"""require\s*\(\s*['"]([^'"]+)['"]\s*\)""",
    # @import 'foo'  @use 'foo'
    r"""@(?:import|use|forward)\s+['"]([^'"]+)['"]""",
    # src="..." href="..." url("...")
    r"""(?:src|href|url)\s*[=(]\s*['"]([^'"]+)['"]""",
    # Any string literal that looks like a file path
    r"""['"]([^'"]*\.[a-zA-Z]{1,5})['"]""",
]


def build_reference_set(source_files: list[Path]) -> set[str]:
    """
    Build a set of all referenced file paths/names across all source files.
    Returns a set of stems, names, and path fragments.
    """
    refs: set[str] = set()
    compiled = [re.compile(p) for p in REFERENCE_PATTERNS]

    for f in source_files:
        text = read(f)
        for pattern in compiled:
            for m in pattern.finditer(text):
                val = m.group(1).strip()
                if not val:
                    continue
                p = Path(val)
                # Add the full path fragment, the filename, and the stem
                refs.add(val)
                refs.add(p.name)
                refs.add(p.stem)
                # Also add without leading ./  ../
                clean = val.lstrip('./').lstrip('../')
                refs.add(clean)
                refs.add(Path(clean).name)
                refs.add(Path(clean).stem)

    return refs


def is_referenced(f: Path, refs: set[str], root: Path) -> bool:
    """Check if a file is referenced anywhere in the codebase."""
    name = f.name
    stem = f.stem

    # Always used files
    if name in ALWAYS_USED:
        return True

    # Check by filename and stem
    if name in refs or stem in refs:
        return True

    # Check by relative path fragments
    try:
        rel = str(f.relative_to(root)).replace('\\', '/')
        if rel in refs:
            return True
        # Check path fragments
        parts = rel.split('/')
        for i in range(len(parts)):
            fragment = '/'.join(parts[i:])
            if fragment in refs:
                return True
    except ValueError:
        pass

    return False


# ── Entry point detection ─────────────────────────────────────────────────────

def find_entry_points(root: Path) -> set[Path]:
    """
    Find files that are entry points — imported by index.html,
    listed in package.json main/exports, or are known entry file names.
    """
    entry_names = {
        "index.tsx", "index.ts", "index.jsx", "index.js",
        "main.tsx", "main.ts", "main.jsx", "main.js",
        "App.tsx", "App.ts", "App.jsx", "App.js",
    }
    entries = set()

    for f in walk(root):
        if f.name in entry_names:
            entries.add(f)

    # Parse index.html for script src
    index_html = root / "index.html"
    if index_html.exists():
        text = read(index_html)
        for m in re.finditer(r'src=["\']([^"\']+)["\']', text):
            p = root / m.group(1).lstrip('/')
            if p.exists():
                entries.add(p)

    return entries


# ── Main audit ────────────────────────────────────────────────────────────────

def audit_unused(root: Path) -> list[Path]:
    """Find all files not referenced anywhere in the codebase."""
    section("BUILDING REFERENCE INDEX")

    source_files = walk(root, SOURCE_EXTENSIONS)
    all_files    = walk(root, CHECKABLE_EXTENSIONS)

    out(f"\n  Scanning {len(source_files)} source files for references...")
    refs = build_reference_set(source_files)
    out(f"  Found {len(refs)} unique references\n")

    section("CHECKING FILES FOR USAGE")
    out()

    unused = []
    for i, f in enumerate(all_files, 1):
        bar(i, len(all_files), f.name)
        if not is_referenced(f, refs, root):
            unused.append(f)

    print(flush=True)
    return unused


# ── Clone and delete ──────────────────────────────────────────────────────────

def move_unused(unused: list[Path], root: Path, dry_run: bool) -> Path | None:
    """
    Clone unused files to frontend/unused/<date>/ preserving directory structure.
    Then delete from original locations.
    Returns the destination directory path.
    """
    ts      = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
    dest    = root / "frontend" / "unused" / ts
    errors  = []

    section(f"MOVING {len(unused)} UNUSED FILE(S)")
    out(f"\n  Destination: {dest}\n")

    for f in sorted(unused):
        rel = f.relative_to(root)
        out(f"  {'~' if dry_run else '→'} {rel}")

        if not dry_run:
            # Preserve directory structure inside unused/
            dest_file = dest / rel
            dest_file.parent.mkdir(parents=True, exist_ok=True)
            try:
                shutil.copy2(f, dest_file)
                f.unlink()
                out(f"     ✓ Moved to unused/{rel}")
            except Exception as e:
                out(f"     ✗ Error: {e}")
                errors.append((f, e))

    if errors:
        out(f"\n  ✗ {len(errors)} error(s) during move")
    else:
        if not dry_run:
            out(f"\n  ✓ All files moved to {dest}")

    return dest if not dry_run else None


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        description="Find unused files, clone to frontend/unused, delete originals."
    )
    parser.add_argument("--root",      default=".", help="Repo root (default: .)")
    parser.add_argument("--dry-run",   action="store_true",
                        help="Show what would change without writing")
    parser.add_argument("--scan-only", action="store_true",
                        help="Report only, do not move or delete")
    args = parser.parse_args()

    root    = Path(args.root).resolve()
    dry_run = args.dry_run

    header(
        f"UNUSED FILES AUDIT {'(DRY RUN)' if dry_run else ''}{'(SCAN ONLY)' if args.scan_only else ''}",
        f"Root: {root}"
    )

    unused = audit_unused(root)

    section("RESULTS")
    out(f"\n  {len(unused)} unused file(s) found:\n")

    by_ext: dict[str, list[Path]] = {}
    for f in unused:
        ext = f.suffix or "no extension"
        by_ext.setdefault(ext, []).append(f)

    for ext in sorted(by_ext.keys()):
        files = by_ext[ext]
        out(f"  {ext}  ({len(files)} file(s))")
        for f in sorted(files):
            out(f"    • {f.relative_to(root)}")

    if not unused:
        out("  ✓ No unused files found.")
        sys.exit(0)

    if args.scan_only:
        sys.exit(0)

    if not dry_run:
        print(f"\n  Move {len(unused)} file(s) to frontend/unused/ and delete originals? (y/n) ",
              end="", flush=True)
        if input().strip().lower() != 'y':
            out("  Cancelled.")
            sys.exit(0)

    dest = move_unused(unused, root, dry_run)

    header("DONE")
    if dry_run:
        out(f"DRY RUN — {len(unused)} file(s) would be moved to frontend/unused/")
    else:
        out(f"✓ {len(unused)} file(s) moved to {dest}")
        out(f"  Originals deleted.")
    print(flush=True)
    sys.exit(0)


if __name__ == "__main__":
    main()
