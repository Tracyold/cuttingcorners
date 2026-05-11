#!/usr/bin/env python3
"""
audit_prop_passers.py
─────────────────────
Audits prop-passer context coverage across a component library.

What it does:
  1. Lists every file in src/components/prop-passers/
  2. For each prop-passer, counts how many files in src/components/ui/ import it
  3. Lists every component directory in src/components/ui/ (each dir = one component)
  4. Reports which components import ZERO prop-passers (completely unwired)
  5. Reports which prop-passers are imported by ZERO components (completely dead)

Usage:
  python scripts/audit_prop_passers.py [--root PATH]

  --root  Path to the repo root (default: current directory)

Exit code:
  0 = all prop-passers wired, no missing coverage
  1 = issues found (see output)
"""

import argparse
import os
import re
import sys
from pathlib import Path
from collections import defaultdict


# ── Config ────────────────────────────────────────────────────────────────────

PROP_PASSERS_DIR = "src/components/prop-passers"
UI_DIR = "src/components/ui"
COMPONENT_FILE_EXTENSIONS = {".ts", ".tsx", ".js", ".jsx"}

# Expected files per component directory. Audit warns if a dir has fewer.
EXPECTED_FILES_PER_COMPONENT = 4  # .tsx, .css, .types.ts, use*.ts


# ── Helpers ───────────────────────────────────────────────────────────────────

def find_source_files(directory: Path) -> list[Path]:
    """Recursively find all source files under a directory."""
    return [
        f for f in directory.rglob("*")
        if f.is_file() and f.suffix in COMPONENT_FILE_EXTENSIONS
    ]


def extract_imports(file_path: Path) -> list[str]:
    """Return all import paths found in a source file."""
    text = file_path.read_text(encoding="utf-8", errors="replace")
    # Match: import ... from '...' or import('...')
    return re.findall(r"""(?:import\s+.*?from\s+|import\s*\()\s*['"]([^'"]+)['"]""", text)


def resolve_prop_passer_name(passer_file: Path, prop_passers_dir: Path) -> str:
    """Return the import-path stem used to reference this prop-passer file."""
    return passer_file.stem  # e.g. 'SizeContext'


# ── Main ──────────────────────────────────────────────────────────────────────

def audit(root: Path) -> int:
    prop_passers_path = root / PROP_PASSERS_DIR
    ui_path = root / UI_DIR
    issues = 0

    # ── 1. Enumerate prop-passers ─────────────────────────────────────────────
    if not prop_passers_path.exists():
        print(f"[ERROR] Prop-passers directory not found: {prop_passers_path}")
        return 1

    passer_files = sorted(
        f for f in prop_passers_path.iterdir()
        if f.is_file() and f.suffix in COMPONENT_FILE_EXTENSIONS
    )

    if not passer_files:
        print(f"[WARN] No prop-passer files found in {prop_passers_path}")
        return 1

    print(f"\n{'═'*60}")
    print(f"  PROP-PASSER FILES ({len(passer_files)} found)")
    print(f"{'═'*60}")
    for pf in passer_files:
        print(f"  • {pf.name}")

    # ── 2. Enumerate component directories ────────────────────────────────────
    if not ui_path.exists():
        print(f"\n[ERROR] UI components directory not found: {ui_path}")
        return 1

    component_dirs = sorted(
        d for d in ui_path.iterdir() if d.is_dir()
    )

    print(f"\n{'═'*60}")
    print(f"  COMPONENT DIRECTORIES ({len(component_dirs)} found)")
    print(f"{'═'*60}")

    dirs_with_missing_files = []
    for cd in component_dirs:
        files = [f for f in cd.iterdir() if f.is_file()]
        count = len(files)
        flag = "" if count >= EXPECTED_FILES_PER_COMPONENT else f"  ⚠ only {count} files (expected {EXPECTED_FILES_PER_COMPONENT})"
        print(f"  • {cd.name:<35} {count} files{flag}")
        if count < EXPECTED_FILES_PER_COMPONENT:
            dirs_with_missing_files.append((cd.name, count))
            issues += 1

    # ── 3. Build import map ───────────────────────────────────────────────────
    # passer_name → list of component dirs that import it
    passer_consumers: dict[str, list[str]] = defaultdict(list)
    # component_dir → set of passer names it imports
    component_imports: dict[str, set[str]] = defaultdict(set)

    passer_names = {pf.stem: pf for pf in passer_files}

    for component_dir in component_dirs:
        src_files = find_source_files(component_dir)
        for src_file in src_files:
            for imp in extract_imports(src_file):
                for pname in passer_names:
                    # Match relative or absolute import containing the passer name
                    if pname in imp:
                        passer_consumers[pname].append(component_dir.name)
                        component_imports[component_dir.name].add(pname)

    # ── 4. Report: prop-passers with no consumers ─────────────────────────────
    print(f"\n{'═'*60}")
    print(f"  PROP-PASSER IMPORT COUNTS")
    print(f"{'═'*60}")

    dead_passers = []
    for pname in sorted(passer_names):
        consumers = sorted(set(passer_consumers.get(pname, [])))
        count = len(consumers)
        status = "✓" if count > 0 else "✗ DEAD — no component imports this"
        print(f"\n  {pname} ({count} consumers)  {status}")
        for c in consumers:
            print(f"    └─ {c}")
        if count == 0:
            dead_passers.append(pname)
            issues += 1

    # ── 5. Report: components with no prop-passer imports ─────────────────────
    print(f"\n{'═'*60}")
    print(f"  COMPONENTS WITH ZERO PROP-PASSER IMPORTS")
    print(f"{'═'*60}")

    unwired = [
        cd.name for cd in component_dirs
        if not component_imports.get(cd.name)
    ]

    if unwired:
        print(f"\n  ⚠  {len(unwired)} component(s) import no prop-passers at all:\n")
        for name in sorted(unwired):
            print(f"    • {name}")
        issues += len(unwired)
    else:
        print("\n  ✓  All components import at least one prop-passer.")

    # ── 6. Summary ────────────────────────────────────────────────────────────
    print(f"\n{'═'*60}")
    print(f"  SUMMARY")
    print(f"{'═'*60}")

    if dirs_with_missing_files:
        print(f"\n  ⚠  Dirs with fewer than {EXPECTED_FILES_PER_COMPONENT} files:")
        for name, count in dirs_with_missing_files:
            print(f"     • {name}: {count} files")

    if dead_passers:
        print(f"\n  ✗  Dead prop-passers (wire up or delete):")
        for p in dead_passers:
            print(f"     • {p}")

    if issues == 0:
        print("\n  ✓  All checks passed. No coverage gaps detected.")
    else:
        print(f"\n  ✗  {issues} issue(s) found. See above for details.")

    return 0 if issues == 0 else 1


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Audit prop-passer coverage across UI components.")
    parser.add_argument("--root", default=".", help="Path to repo root (default: current directory)")
    args = parser.parse_args()

    root = Path(args.root).resolve()
    print(f"\nRepo root: {root}")
    sys.exit(audit(root))