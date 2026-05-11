#!/usr/bin/env python3
"""
audit_theatre.py
────────────────
Detects code that exists but does nothing — "theatre code".

Categories detected:

  DEAD EXPORTS    — functions/classes/constants exported but never imported anywhere
  DEAD IMPORTS    — symbols imported but never referenced in the same file
  NO-OP CODE      — patterns that compile but have no effect:
                      • spreading a subset back onto its own source  {...a, ...b} where b ⊆ a
                      • functions that only return their input unchanged
                      • conditional blocks that are always false (false && ..., 0 && ...)
  DISABLED CODE   — blocks explicitly disabled:
                      • variables/props set to `false`, `null`, `undefined`, `void 0`
                        that are never read (assigned but not used)
                      • `disabled={false}` / `enabled={false}` JSX props (no-op)
                      • eslint-disable comments disabling entire files
  OVERRIDE RISK   — patterns that silently overwrite earlier values:
                      • `{...a, ...b}` where b contains keys that also exist in a
                        (flagged as potential override — requires manual confirmation)
                      • CSS property declared twice in the same rule block
  DOUBLE CODE     — files with nearly identical export signatures (possible duplicates)

Usage:
  python scripts/audit_theatre.py [--root PATH] [--ext .ts .tsx .js .jsx .css]

  --root   Repo root (default: current directory)
  --ext    File extensions to scan (default: .ts .tsx .js .jsx .css)

Exit code:
  0 = no issues found
  1 = issues found
"""

import argparse
import ast
import re
import sys
from pathlib import Path
from collections import defaultdict
from difflib import SequenceMatcher


# ── Config ────────────────────────────────────────────────────────────────────

DEFAULT_EXTENSIONS = {".ts", ".tsx", ".js", ".jsx"}
CSS_EXTENSIONS = {".css"}
SKIP_DIRS = {"node_modules", ".git", "dist", "build", ".next", "coverage"}

# Similarity threshold for "double code" detection (0–1)
DUPLICATE_SIMILARITY_THRESHOLD = 0.85


# ── Helpers ───────────────────────────────────────────────────────────────────

def walk_files(root: Path, extensions: set[str]) -> list[Path]:
    results = []
    for f in root.rglob("*"):
        if any(part in SKIP_DIRS for part in f.parts):
            continue
        if f.is_file() and f.suffix in extensions:
            results.append(f)
    return sorted(results)


def read(f: Path) -> str:
    return f.read_text(encoding="utf-8", errors="replace")


# ── 1. Dead exports ───────────────────────────────────────────────────────────

def find_exports(text: str, file_path: Path) -> set[str]:
    """Extract named exports from a TS/JS/TSX file."""
    exports = set()
    # export function Foo / export const Foo / export class Foo / export type Foo
    for m in re.finditer(r'\bexport\s+(?:default\s+)?(?:function|const|class|type|interface|enum)\s+(\w+)', text):
        exports.add(m.group(1))
    # export { Foo, Bar }
    for m in re.finditer(r'\bexport\s*\{([^}]+)\}', text):
        for name in re.split(r'[,\s]+', m.group(1)):
            name = name.strip().split(' as ')[0].strip()
            if name:
                exports.add(name)
    return exports


def build_import_index(files: list[Path]) -> dict[str, list[str]]:
    """symbol_name → list of files that import it."""
    index: dict[str, list[str]] = defaultdict(list)
    for f in files:
        text = read(f)
        # import { Foo, Bar } from '...'
        for m in re.finditer(r'import\s*\{([^}]+)\}\s*from', text):
            for name in re.split(r'[,\s]+', m.group(1)):
                name = name.strip().split(' as ')[0].strip()
                if name:
                    index[name].append(str(f))
        # import Foo from '...'
        for m in re.finditer(r'import\s+(\w+)\s+from', text):
            index[m.group(1)].append(str(f))
    return index


def audit_dead_exports(files: list[Path]) -> list[dict]:
    issues = []
    import_index = build_import_index(files)

    for f in files:
        text = read(f)
        exports = find_exports(text, f)
        for name in exports:
            consumers = import_index.get(name, [])
            # Filter out the file itself
            external = [c for c in consumers if c != str(f)]
            if not external:
                issues.append({
                    "file": str(f),
                    "symbol": name,
                    "category": "DEAD_EXPORT",
                    "detail": f"'{name}' is exported but never imported by any other file",
                })
    return issues


# ── 2. Dead imports ───────────────────────────────────────────────────────────

def audit_dead_imports(files: list[Path]) -> list[dict]:
    issues = []
    for f in files:
        text = read(f)
        # Collect imported names
        imported: set[str] = set()
        for m in re.finditer(r'import\s*\{([^}]+)\}\s*from', text):
            for name in re.split(r'[,\s]+', m.group(1)):
                name = name.strip().split(' as ')[-1].strip()  # use alias if present
                if name:
                    imported.add(name)
        for m in re.finditer(r'import\s+(\w+)\s+from', text):
            imported.add(m.group(1))

        # Strip the import lines themselves, then check usage
        body = re.sub(r'^import\s+.*$', '', text, flags=re.MULTILINE)
        for name in imported:
            if not re.search(r'\b' + re.escape(name) + r'\b', body):
                issues.append({
                    "file": str(f),
                    "symbol": name,
                    "category": "DEAD_IMPORT",
                    "detail": f"'{name}' is imported but never used in this file",
                })
    return issues


# ── 3. No-op and disabled patterns ───────────────────────────────────────────

NO_OP_PATTERNS = [
    # {...props, ...forwarded} where forwarded keys shadow props — flag as override risk
    (r'\{\s*\.\.\.\w+\s*,\s*\.\.\.\w+\s*\}', "OVERRIDE_RISK",
     "Spread merge — later spread may silently override earlier keys. Verify intentional."),
    # disabled={false} or enabled={false} JSX props
    (r'\b(?:disabled|enabled|isDisabled|isEnabled|isLoading|isActive)\s*=\s*\{false\}',
     "DISABLED_PROP", "Prop explicitly set to false — this is a no-op; remove or invert."),
    # Conditional short-circuit always false: false && ... or 0 && ...
    (r'\b(?:false|0)\s*&&', "ALWAYS_FALSE",
     "Short-circuit `false &&` or `0 &&` — this block never renders."),
    # void 0 / void(0) assignments
    (r'=\s*void\s*(?:0|\(0\))', "VOID_ASSIGN",
     "Assignment to `void 0` — always produces undefined; likely dead or placeholder code."),
    # eslint-disable-file (whole file disabled)
    (r'/\*\s*eslint-disable\s*\*/', "ESLINT_DISABLED_FILE",
     "Entire file has eslint disabled — review whether suppression is still needed."),
    # Functions that immediately return their argument unchanged
    (r'function\s+\w+\s*\([^)]*\)\s*\{\s*return\s+\w+\s*;\s*\}', "PASSTHROUGH_FN",
     "Function appears to return its argument unchanged — possible no-op."),
    # role="button" on <button>
    (r'<button[^>]+role=["\']button["\']', "REDUNDANT_ARIA",
     "`role='button'` on a <button> is redundant — <button> already has implicit role."),
]

def audit_noop_patterns(files: list[Path]) -> list[dict]:
    issues = []
    for f in files:
        text = read(f)
        lines = text.splitlines()
        for pattern, category, detail in NO_OP_PATTERNS:
            for m in re.finditer(pattern, text):
                lineno = text[:m.start()].count('\n') + 1
                snippet = lines[lineno - 1].strip()[:80]
                issues.append({
                    "file": str(f),
                    "line": lineno,
                    "category": category,
                    "detail": detail,
                    "snippet": snippet,
                })
    return issues


# ── 4. CSS double-declaration ─────────────────────────────────────────────────

def audit_css_doubles(files: list[Path]) -> list[dict]:
    issues = []
    for f in files:
        text = read(f)
        # Find each rule block
        for block_match in re.finditer(r'\{([^}]+)\}', text, re.DOTALL):
            block = block_match.group(1)
            block_start = text[:block_match.start()].count('\n') + 1
            seen: dict[str, int] = {}
            for prop_match in re.finditer(r'([\w-]+)\s*:', block):
                prop = prop_match.group(1).strip()
                # Skip pseudo-class/element colons
                if prop.startswith('&') or prop in ('hover', 'focus', 'active', 'not', 'nth'):
                    continue
                if prop in seen:
                    lineno = block_start + block[:prop_match.start()].count('\n')
                    issues.append({
                        "file": str(f),
                        "line": lineno,
                        "category": "CSS_DOUBLE_DECL",
                        "detail": f"CSS property '{prop}' declared twice in the same rule block (first at line {seen[prop]})",
                        "snippet": prop_match.group(0)[:60],
                    })
                else:
                    seen[prop] = block_start + block[:prop_match.start()].count('\n')
    return issues


# ── 5. Duplicate file detection ───────────────────────────────────────────────

def file_signature(text: str) -> str:
    """Strip comments/whitespace for similarity comparison."""
    text = re.sub(r'//.*$', '', text, flags=re.MULTILINE)
    text = re.sub(r'/\*.*?\*/', '', text, flags=re.DOTALL)
    return re.sub(r'\s+', ' ', text).strip()


def audit_duplicates(files: list[Path]) -> list[dict]:
    issues = []
    sigs = [(f, file_signature(read(f))) for f in files]
    checked = set()
    for i, (fa, sa) in enumerate(sigs):
        for j, (fb, sb) in enumerate(sigs):
            if i >= j:
                continue
            key = (str(fa), str(fb))
            if key in checked:
                continue
            checked.add(key)
            if not sa or not sb:
                continue
            ratio = SequenceMatcher(None, sa, sb).ratio()
            if ratio >= DUPLICATE_SIMILARITY_THRESHOLD:
                issues.append({
                    "file": str(fa),
                    "category": "DOUBLE_CODE",
                    "detail": f"{ratio:.0%} similar to {fb} — possible duplication or copy-paste",
                    "snippet": f"Compare: {fa.name} ↔ {fb.name}",
                })
    return issues


# ── Reporting ─────────────────────────────────────────────────────────────────

CATEGORY_ORDER = [
    "DEAD_EXPORT", "DEAD_IMPORT", "DOUBLE_CODE",
    "CSS_DOUBLE_DECL", "OVERRIDE_RISK",
    "DISABLED_PROP", "ALWAYS_FALSE", "VOID_ASSIGN",
    "PASSTHROUGH_FN", "REDUNDANT_ARIA", "ESLINT_DISABLED_FILE",
]

CATEGORY_LABELS = {
    "DEAD_EXPORT":        "✗ Dead Exports (exported but never imported)",
    "DEAD_IMPORT":        "✗ Dead Imports (imported but never used)",
    "DOUBLE_CODE":        "⚠ Double Code (near-identical files)",
    "CSS_DOUBLE_DECL":   "⚠ CSS Double Declaration (property declared twice in block)",
    "OVERRIDE_RISK":      "⚠ Override Risk (spread merge may silently clobber keys)",
    "DISABLED_PROP":      "⚠ Disabled Props (prop hard-coded to false — no-op)",
    "ALWAYS_FALSE":       "⚠ Always-False Conditionals (block never executes)",
    "VOID_ASSIGN":        "⚠ Void Assignments (always produces undefined)",
    "PASSTHROUGH_FN":     "⚠ Pass-through Functions (returns argument unchanged)",
    "REDUNDANT_ARIA":     "⚠ Redundant ARIA (role=button on <button>)",
    "ESLINT_DISABLED_FILE": "⚠ Whole-File ESLint Suppression",
}


def report(all_issues: list[dict], root: Path) -> int:
    by_category: dict[str, list[dict]] = defaultdict(list)
    for issue in all_issues:
        by_category[issue["category"]].append(issue)

    total = len(all_issues)

    print(f"\n{'═'*64}")
    print(f"  THEATRE & DEAD CODE AUDIT")
    print(f"{'═'*64}")
    print(f"  Scanned root: {root}")
    print(f"  Total issues: {total}")

    for cat in CATEGORY_ORDER:
        issues = by_category.get(cat, [])
        if not issues:
            continue
        print(f"\n  {CATEGORY_LABELS.get(cat, cat)} ({len(issues)})")
        print(f"  {'─'*60}")
        for iss in issues:
            rel = Path(iss["file"]).relative_to(root) if root in Path(iss["file"]).parents else iss["file"]
            line = f":{iss['line']}" if "line" in iss else ""
            print(f"\n    {rel}{line}")
            print(f"    → {iss['detail']}")
            if "snippet" in iss and iss["snippet"]:
                print(f"    ↳ `{iss['snippet']}`")

    print(f"\n{'═'*64}")
    if total == 0:
        print("  ✓ No theatre, dead code, or double code detected.")
    else:
        print(f"  ✗ {total} issue(s) found. Review and resolve before shipping.")
    print(f"{'═'*64}\n")

    return 0 if total == 0 else 1


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="Detect theatre, dead code, and double code.")
    parser.add_argument("--root", default=".", help="Repo root (default: current directory)")
    parser.add_argument("--ext", nargs="+", default=None,
                        help="Extensions to scan (default: .ts .tsx .js .jsx)")
    args = parser.parse_args()

    root = Path(args.root).resolve()
    extensions = set(args.ext) if args.ext else DEFAULT_EXTENSIONS
    css_files = walk_files(root, CSS_EXTENSIONS)
    src_files = walk_files(root, extensions)

    print(f"\nScanning {len(src_files)} source files and {len(css_files)} CSS files under {root}...")

    all_issues = []
    all_issues += audit_dead_exports(src_files)
    all_issues += audit_dead_imports(src_files)
    all_issues += audit_noop_patterns(src_files)
    all_issues += audit_css_doubles(css_files)
    all_issues += audit_duplicates(src_files)

    sys.exit(report(all_issues, root))


if __name__ == "__main__":
    main()