#!/usr/bin/env python3
"""
audit_svgs.py
─────────────
Finds SVG files that exist in the repo but are never imported, referenced,
or used anywhere in the source code.

An SVG file is considered "used" if its filename (with or without extension)
appears in any source file as:
  • an import path:        import Logo from './icons/logo.svg'
  • a src/href attribute:  src="./logo.svg"  href="/icons/logo.svg"
  • a CSS url():           url('../icons/logo.svg')
  • a <use> xlink:href:   xlink:href="#logo"  (inline SVG sprite reference)
  • a require() call:      require('./logo.svg')
  • a dynamic import:      import('./logo.svg')

Usage:
  python scripts/audit_svgs.py [--root PATH] [--strict]

  --root    Repo root (default: current directory)
  --strict  Fail (exit 1) even if only some SVGs are unused

Exit code:
  0 = all SVGs are used
  1 = unused SVGs found
"""

import argparse
import re
import sys
from pathlib import Path


# ── Config ────────────────────────────────────────────────────────────────────

SKIP_DIRS = {"node_modules", ".git", "dist", "build", ".next", "coverage", "__pycache__"}

# Source file extensions to search for SVG references
SOURCE_EXTENSIONS = {".ts", ".tsx", ".js", ".jsx", ".html", ".css", ".scss", ".json"}

# SVG reference patterns — each captures a path or filename fragment
REFERENCE_PATTERNS = [
    # import X from '...svg'   or   import '...svg'
    r"""(?:import\s+\w+\s+from\s+|import\s+)['"](.*?\.svg)['"]""",
    # require('...svg')
    r"""require\s*\(\s*['"](.*?\.svg)['"]\s*\)""",
    # dynamic import('...svg')
    r"""import\s*\(\s*['"](.*?\.svg)['"]\s*\)""",
    # src="...svg"  href="...svg"
    r"""(?:src|href)\s*=\s*['"](.*?\.svg)['"]""",
    # url('...svg')  or  url("...svg")
    r"""url\s*\(\s*['"](.*?\.svg)['"]\s*\)""",
    # xlink:href="#id" or href="#id" — inline sprite usage (matches fragment id, not file)
    r"""(?:xlink:href|href)\s*=\s*["']#([\w-]+)["']""",
    # JSX svgr-style: any word ending in Svg or Icon used as a component
    r"""<(\w+(?:Svg|Icon|Logo))\b""",
]

# Inline SVG sprite IDs: if an SVG file contains id="foo", a reference to #foo counts
ID_PATTERN = re.compile(r'\bid=["\'](\w[\w-]*)["\']')


# ── Helpers ───────────────────────────────────────────────────────────────────

def walk(root: Path, extensions: set[str]) -> list[Path]:
    return sorted(
        f for f in root.rglob("*")
        if f.is_file()
        and f.suffix in extensions
        and not any(skip in f.parts for skip in SKIP_DIRS)
    )


def find_svg_files(root: Path) -> list[Path]:
    return sorted(
        f for f in root.rglob("*.svg")
        if not any(skip in f.parts for skip in SKIP_DIRS)
    )


def extract_svg_ids(svg_path: Path) -> set[str]:
    """Extract id= values from an SVG file (for sprite reference detection)."""
    text = svg_path.read_text(encoding="utf-8", errors="replace")
    return set(ID_PATTERN.findall(text))


def build_reference_set(source_files: list[Path]) -> tuple[set[str], set[str]]:
    """
    Returns:
      file_refs  — set of SVG filenames (e.g. 'logo.svg', 'logo') referenced in source
      frag_refs  — set of SVG fragment IDs (e.g. 'icon-close') referenced via #id
      component_refs — set of component-style names (e.g. 'LogoSvg', 'CloseIcon')
    """
    file_refs: set[str] = set()
    frag_refs: set[str] = set()
    component_refs: set[str] = set()

    all_patterns = [re.compile(p, re.IGNORECASE) for p in REFERENCE_PATTERNS]

    for src in source_files:
        text = src.read_text(encoding="utf-8", errors="replace")
        for i, pattern in enumerate(all_patterns):
            for m in pattern.finditer(text):
                val = m.group(1)
                if i <= 4:  # file path patterns
                    # Store both the full path fragment and the bare filename
                    file_refs.add(val)
                    file_refs.add(Path(val).name)
                    file_refs.add(Path(val).stem)
                elif i == 5:  # #fragment references
                    frag_refs.add(val)
                else:  # JSX component name
                    component_refs.add(val)

    return file_refs, frag_refs, component_refs


def is_used(
    svg: Path,
    file_refs: set[str],
    frag_refs: set[str],
    component_refs: set[str],
    svg_ids: dict[Path, set[str]],
) -> tuple[bool, str]:
    """
    Returns (used: bool, reason: str).
    """
    name = svg.name        # logo.svg
    stem = svg.stem        # logo

    # Direct file reference
    if name in file_refs or stem in file_refs:
        return True, f"referenced by filename '{name}'"

    # Fragment ID reference (SVG sprite)
    ids = svg_ids.get(svg, set())
    matched_ids = ids & frag_refs
    if matched_ids:
        return True, f"used as sprite via #{', #'.join(sorted(matched_ids))}"

    # Component-name reference (svgr / import-as-component)
    # Heuristic: convert kebab/snake to PascalCase and check
    pascal = ''.join(w.capitalize() for w in re.split(r'[-_]', stem))
    variations = {pascal, pascal + 'Svg', pascal + 'Icon', pascal + 'Logo'}
    matched = variations & component_refs
    if matched:
        return True, f"used as component '{next(iter(matched))}'"

    return False, "no reference found in any source file"


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="Find SVG files that are never used.")
    parser.add_argument("--root", default=".", help="Repo root (default: current directory)")
    parser.add_argument("--strict", action="store_true",
                        help="Exit 1 even if only some SVGs are unused")
    args = parser.parse_args()

    root = Path(args.root).resolve()
    print(f"\nRepo root: {root}")

    svg_files = find_svg_files(root)
    source_files = walk(root, SOURCE_EXTENSIONS)

    print(f"Found {len(svg_files)} SVG file(s) and {len(source_files)} source file(s) to scan.\n")

    if not svg_files:
        print("✓ No SVG files in this repo.")
        sys.exit(0)

    # Pre-extract sprite IDs from each SVG
    svg_ids = {svg: extract_svg_ids(svg) for svg in svg_files}

    # Build reference index from all source files
    file_refs, frag_refs, component_refs = build_reference_set(source_files)

    # Check each SVG
    used = []
    unused = []

    for svg in svg_files:
        ok, reason = is_used(svg, file_refs, frag_refs, component_refs, svg_ids)
        rel = svg.relative_to(root)
        if ok:
            used.append((rel, reason))
        else:
            unused.append((rel, reason))

    # ── Report ────────────────────────────────────────────────────────────────
    print(f"{'═'*64}")
    print(f"  SVG USAGE AUDIT")
    print(f"{'═'*64}")

    if used:
        print(f"\n  ✓ Used SVGs ({len(used)})\n")
        for rel, reason in used:
            print(f"    • {rel}")
            print(f"      ↳ {reason}")

    if unused:
        print(f"\n  ✗ UNUSED SVGs ({len(unused)}) — safe to delete or investigate\n")
        for rel, reason in unused:
            print(f"    • {rel}")
            print(f"      ↳ {reason}")

    print(f"\n{'═'*64}")
    print(f"  Total: {len(svg_files)} SVGs — {len(used)} used, {len(unused)} unused")
    print(f"{'═'*64}\n")

    if unused:
        print("  Recommended actions:")
        print("  1. Confirm each unused SVG is not referenced dynamically (e.g. by string interpolation)")
        print("  2. Delete confirmed orphans — do not leave unreferenced assets in the repo")
        print("  3. If an SVG is intentionally kept (e.g. docs/readme), move it outside src/\n")
        sys.exit(1 if args.strict else 0)
    else:
        print("  ✓ All SVG files are referenced in source code.\n")
        sys.exit(0)


if __name__ == "__main__":
    main()