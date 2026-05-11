#!/usr/bin/env python3
"""
audit_css.py
────────────
Audits CSS files for waste, redundancy, and conflicts.

Categories detected:

  UNUSED_CLASS      — CSS class defined but never referenced in any TSX/JSX/HTML/TS file
  UNUSED_CSS_FILE   — CSS file that is never imported anywhere in source code
  DOUBLE_DECL       — Same property declared twice in the same rule block
  OVERRIDE          — Property declared, then immediately overridden later in the
                      same rule block (the second wins, the first is dead)
  DUPLICATE_RULE    — Two selectors with identical or near-identical property sets
  DEAD_VAR          — CSS custom property (--sv-*) defined but never referenced with var()
  UNUSED_VAR_REF    — var(--sv-*) referenced in CSS but the variable is never defined
  EMPTY_RULE        — Selector block with no declarations inside it

Usage:
  python scripts/audit_css.py [--root PATH] [--threshold 0.95]

  --root        Repo root (default: current directory)
  --threshold   Similarity ratio for duplicate rule detection, 0–1 (default: 0.95)

Exit code:
  0 = no issues
  1 = issues found
"""

import argparse
import re
import sys
from pathlib import Path
from collections import defaultdict
from difflib import SequenceMatcher


# ── Config ────────────────────────────────────────────────────────────────────

SKIP_DIRS = {"node_modules", ".git", "dist", "build", ".next", "coverage", "__pycache__"}
SOURCE_EXTENSIONS = {".ts", ".tsx", ".js", ".jsx", ".html"}
CSS_EXTENSIONS = {".css", ".scss"}

# Properties where double-declaration is intentional (browser fallbacks)
ALLOWED_DOUBLES = {
    "display",          # display: -webkit-flex; display: flex;
    "background",       # gradient fallbacks
    "color",            # fallback colors
    "-webkit-appearance",
}


# ── File walking ──────────────────────────────────────────────────────────────

def walk(root: Path, extensions: set[str]) -> list[Path]:
    return sorted(
        f for f in root.rglob("*")
        if f.is_file()
        and f.suffix in extensions
        and not any(s in f.parts for s in SKIP_DIRS)
    )


def read(f: Path) -> str:
    return f.read_text(encoding="utf-8", errors="replace")


# ── CSS Parsing ───────────────────────────────────────────────────────────────

def strip_comments(css: str) -> str:
    return re.sub(r'/\*.*?\*/', '', css, flags=re.DOTALL)


def parse_rules(css: str) -> list[dict]:
    """
    Returns list of rule dicts:
      { selector, declarations: [(prop, value, lineno)], start_line }
    Handles nested @media / @keyframes by parsing the inner blocks too.
    """
    css_clean = strip_comments(css)
    rules = []

    # Match selector { declarations }
    # We skip @keyframes blocks since double-decl there is normal
    pattern = re.compile(
        r'(?<!\w)'                        # not inside a word
        r'([^@{}][^{}]*?)'               # selector (not starting with @)
        r'\s*\{([^{}]*?)\}',             # { declarations }
        re.DOTALL
    )

    for m in pattern.finditer(css_clean):
        selector = m.group(1).strip()
        block = m.group(2)
        start_line = css_clean[:m.start()].count('\n') + 1

        if not selector or selector.startswith('@'):
            continue

        declarations = []
        for decl_match in re.finditer(r'([\w-]+)\s*:\s*([^;]+?)\s*(?:;|$)', block):
            prop = decl_match.group(1).strip()
            value = decl_match.group(2).strip()
            rel_line = block[:decl_match.start()].count('\n')
            declarations.append((prop, value, start_line + rel_line))

        rules.append({
            "selector": selector,
            "declarations": declarations,
            "start_line": start_line,
        })

    return rules


def extract_css_classes(css: str) -> set[str]:
    """Extract all class names defined in CSS (from .className selectors)."""
    clean = strip_comments(css)
    classes = set()
    for m in re.finditer(r'\.([\w][\w-]*)', clean):
        classes.add(m.group(1))
    return classes


def extract_data_attr_selectors(css: str) -> set[str]:
    """Extract [data-sv-style="value"] patterns."""
    clean = strip_comments(css)
    return set(re.findall(r'\[[\w-]+=["\']([^"\']+)["\']', clean))


def extract_css_vars_defined(css: str) -> set[str]:
    """Extract all --custom-property definitions."""
    clean = strip_comments(css)
    return set(re.findall(r'(--[\w-]+)\s*:', clean))


def extract_css_vars_used(css: str) -> set[str]:
    """Extract all var(--custom-property) references."""
    clean = strip_comments(css)
    return set(re.findall(r'var\(\s*(--[\w-]+)', clean))


# ── Source scanning ───────────────────────────────────────────────────────────

def extract_used_classes_from_source(source_files: list[Path]) -> set[str]:
    """
    Find all class names referenced in source files via:
      className="foo bar"
      className={styles.foo}
      className={clsx('foo', ...)}
      'foo' string literals that look like class names
      data-sv-style="sv-slate"
    """
    used = set()
    for f in source_files:
        text = read(f)
        # className="..." or className='...'
        for m in re.finditer(r'className\s*=\s*["\']([^"\']+)["\']', text):
            for cls in m.group(1).split():
                used.add(cls)
        # className={`... ${var} ...`} — extract literal parts
        for m in re.finditer(r'className\s*=\s*\{`([^`]+)`\}', text):
            for part in re.findall(r'[\w][\w-]*', m.group(1)):
                used.add(part)
        # styles.foo or styles['foo']
        for m in re.finditer(r'styles\.(\w[\w-]*)', text):
            used.add(m.group(1))
        for m in re.finditer(r'styles\[["\'](\w[\w-]*)["\']', text):
            used.add(m.group(1))
        # clsx / cx / cn / classNames calls — grab string literals inside
        for m in re.finditer(r'(?:clsx|cx|cn|classNames)\s*\(([^)]+)\)', text):
            for cls in re.findall(r'["\'](\w[\w-]*)["\']', m.group(1)):
                used.add(cls)
        # data-sv-style="sv-something"
        for m in re.finditer(r'data-[\w-]+\s*=\s*["\']([^"\']+)["\']', text):
            used.add(m.group(1))
        # Generic string literals that look like CSS class names (heuristic)
        for m in re.finditer(r'["\']([a-z][\w]*(?:--[\w]+|__[\w]+)*)["\']', text):
            used.add(m.group(1))

    return used


def extract_css_imports_from_source(source_files: list[Path]) -> set[str]:
    """Return set of CSS filenames (bare names) that are imported in source."""
    imported = set()
    for f in source_files:
        text = read(f)
        for m in re.finditer(r"""import\s+['"]([^'"]+\.css)['"]""", text):
            imported.add(Path(m.group(1)).name)
            imported.add(m.group(1))          # also store full relative path
    return imported


# ── Audit functions ───────────────────────────────────────────────────────────

def audit_unused_css_files(css_files: list[Path], source_files: list[Path], root: Path) -> list[dict]:
    imported = extract_css_imports_from_source(source_files)
    issues = []
    for css in css_files:
        rel = str(css.relative_to(root))
        if css.name not in imported and rel not in imported:
            # Also check if it's an index that imports others (barrel file)
            text = read(css)
            if "@import" in text or "index.css" in css.name:
                continue  # barrel file — skip
            issues.append({
                "file": rel,
                "category": "UNUSED_CSS_FILE",
                "detail": f"'{css.name}' is never imported in any source file",
            })
    return issues


def audit_unused_classes(css_files: list[Path], source_files: list[Path], root: Path) -> list[dict]:
    defined: dict[str, list[tuple[str, int]]] = defaultdict(list)  # class → [(file, approx_line)]
    for css in css_files:
        text = read(css)
        rel = str(css.relative_to(root))
        clean = strip_comments(text)
        for m in re.finditer(r'\.([\w][\w-]*)', clean):
            cls = m.group(1)
            lineno = clean[:m.start()].count('\n') + 1
            defined[cls].append((rel, lineno))

    used = extract_used_classes_from_source(source_files)

    issues = []
    for cls, locations in sorted(defined.items()):
        if cls not in used:
            for file_rel, lineno in locations:
                issues.append({
                    "file": file_rel,
                    "line": lineno,
                    "category": "UNUSED_CLASS",
                    "detail": f"'.{cls}' is defined in CSS but never referenced in any source file",
                    "snippet": f".{cls}",
                })
    return issues


def audit_double_and_override(css_files: list[Path], root: Path) -> list[dict]:
    issues = []
    for css in css_files:
        text = read(css)
        rel = str(css.relative_to(root))
        rules = parse_rules(text)

        for rule in rules:
            seen: dict[str, tuple[str, int]] = {}  # prop → (value, lineno)
            for prop, value, lineno in rule["declarations"]:
                if prop in ALLOWED_DOUBLES:
                    continue
                if prop in seen:
                    prev_value, prev_line = seen[prop]
                    if prev_value == value:
                        issues.append({
                            "file": rel,
                            "line": lineno,
                            "category": "DOUBLE_DECL",
                            "detail": (
                                f"'{prop}: {value}' declared twice in '{rule['selector']}' "
                                f"(first at line {prev_line}, repeated at line {lineno})"
                            ),
                            "snippet": f"{rule['selector']} {{ {prop}: {value} }}",
                        })
                    else:
                        issues.append({
                            "file": rel,
                            "line": lineno,
                            "category": "OVERRIDE",
                            "detail": (
                                f"'{prop}' in '{rule['selector']}' is set to '{prev_value}' "
                                f"at line {prev_line}, then overridden to '{value}' at line {lineno} "
                                f"— the first declaration is dead"
                            ),
                            "snippet": f"{rule['selector']} {{ {prop}: {prev_value} → {value} }}",
                        })
                seen[prop] = (value, lineno)
    return issues


def audit_duplicate_rules(css_files: list[Path], root: Path, threshold: float) -> list[dict]:
    """Find two selectors with near-identical property sets."""
    # Build fingerprint: selector → sorted "prop:value" strings
    all_rules: list[tuple[str, str, frozenset]] = []  # (file_rel, selector, props_set)

    for css in css_files:
        text = read(css)
        rel = str(css.relative_to(root))
        for rule in parse_rules(text):
            if not rule["declarations"]:
                continue
            props = frozenset(f"{p}:{v}" for p, v, _ in rule["declarations"])
            all_rules.append((rel, rule["selector"], props, rule["start_line"]))

    issues = []
    checked = set()
    for i, (fa, sa, pa, la) in enumerate(all_rules):
        for j, (fb, sb, pb, lb) in enumerate(all_rules):
            if i >= j:
                continue
            key = (fa, sa, fb, sb)
            if key in checked:
                continue
            checked.add(key)
            if not pa or not pb:
                continue
            union = pa | pb
            intersection = pa & pb
            if not union:
                continue
            ratio = len(intersection) / len(union)
            if ratio >= threshold and sa != sb:
                issues.append({
                    "file": fa,
                    "line": la,
                    "category": "DUPLICATE_RULE",
                    "detail": (
                        f"'{sa}' (line {la} in {Path(fa).name}) and '{sb}' "
                        f"(line {lb} in {Path(fb).name}) share {ratio:.0%} of their declarations — "
                        f"consider merging or extracting a shared rule"
                    ),
                    "snippet": f"{sa} ≈ {sb}  ({len(intersection)}/{len(union)} props identical)",
                })
    return issues


def audit_empty_rules(css_files: list[Path], root: Path) -> list[dict]:
    issues = []
    for css in css_files:
        text = read(css)
        rel = str(css.relative_to(root))
        clean = strip_comments(text)
        for m in re.finditer(r'([^{}@][^{}]*?)\{\s*\}', clean, re.DOTALL):
            selector = m.group(1).strip()
            if selector and not selector.startswith('@'):
                lineno = clean[:m.start()].count('\n') + 1
                issues.append({
                    "file": rel,
                    "line": lineno,
                    "category": "EMPTY_RULE",
                    "detail": f"Selector '{selector}' has an empty rule block — remove it",
                    "snippet": f"{selector[:60]} {{ }}",
                })
    return issues


def audit_css_vars(css_files: list[Path], root: Path) -> list[dict]:
    """Find --vars defined but never used, and var() calls referencing undefined vars."""
    all_defined: set[str] = set()
    all_used: set[str] = set()

    for css in css_files:
        text = read(css)
        all_defined |= extract_css_vars_defined(text)
        all_used |= extract_css_vars_used(text)

    issues = []

    dead_vars = all_defined - all_used
    for var in sorted(dead_vars):
        issues.append({
            "file": "tokens (across all CSS)",
            "category": "DEAD_VAR",
            "detail": f"'{var}' is defined but never referenced with var() anywhere",
            "snippet": var,
        })

    ghost_refs = all_used - all_defined
    for var in sorted(ghost_refs):
        issues.append({
            "file": "source (across all CSS)",
            "category": "UNUSED_VAR_REF",
            "detail": f"var('{var}') is referenced but this variable is never defined — will silently produce no value",
            "snippet": f"var({var})",
        })

    return issues


# ── Reporting ─────────────────────────────────────────────────────────────────

CATEGORY_ORDER = [
    "UNUSED_CSS_FILE",
    "DEAD_VAR",
    "UNUSED_VAR_REF",
    "UNUSED_CLASS",
    "DOUBLE_DECL",
    "OVERRIDE",
    "DUPLICATE_RULE",
    "EMPTY_RULE",
]

CATEGORY_LABELS = {
    "UNUSED_CSS_FILE": "✗  Unused CSS Files (imported nowhere)",
    "DEAD_VAR":        "✗  Dead CSS Variables (defined, never used)",
    "UNUSED_VAR_REF":  "✗  Ghost var() References (used, never defined)",
    "UNUSED_CLASS":    "⚠  Unused CSS Classes (defined, never referenced in source)",
    "DOUBLE_DECL":     "⚠  Double Declarations (same prop + same value, twice)",
    "OVERRIDE":        "⚠  Overrides (prop set then immediately overwritten — first is dead)",
    "DUPLICATE_RULE":  "⚠  Duplicate Rules (two selectors with near-identical declarations)",
    "EMPTY_RULE":      "⚠  Empty Rules (selector block with no declarations)",
}


def report(all_issues: list[dict], root: Path) -> int:
    by_cat: dict[str, list[dict]] = defaultdict(list)
    for iss in all_issues:
        by_cat[iss["category"]].append(iss)

    total = len(all_issues)

    print(f"\n{'═'*66}")
    print(f"  CSS AUDIT REPORT")
    print(f"{'═'*66}")
    print(f"  Root: {root}")
    print(f"  Total issues: {total}")

    for cat in CATEGORY_ORDER:
        issues = by_cat.get(cat, [])
        if not issues:
            continue
        print(f"\n  {CATEGORY_LABELS.get(cat, cat)} ({len(issues)})")
        print(f"  {'─'*62}")
        for iss in issues:
            line = f":{iss['line']}" if "line" in iss else ""
            print(f"\n    {iss['file']}{line}")
            print(f"    → {iss['detail']}")
            if iss.get("snippet"):
                print(f"    ↳ {iss['snippet'][:80]}")

    print(f"\n{'═'*66}")
    if total == 0:
        print("  ✓ No CSS waste, duplication, or conflicts detected.")
    else:
        print(f"  ✗ {total} issue(s). Resolve before shipping.")
    print(f"{'═'*66}\n")

    return 0 if total == 0 else 1


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="Audit CSS for unused, double-coded, and conflicting rules.")
    parser.add_argument("--root", default=".", help="Repo root (default: .)")
    parser.add_argument("--threshold", type=float, default=0.95,
                        help="Similarity ratio for duplicate rule detection (default: 0.95)")
    args = parser.parse_args()

    root = Path(args.root).resolve()
    css_files = walk(root, CSS_EXTENSIONS)
    source_files = walk(root, SOURCE_EXTENSIONS)

    print(f"\nScanning {len(css_files)} CSS file(s) and {len(source_files)} source file(s) under {root}...")

    all_issues = []
    all_issues += audit_unused_css_files(css_files, source_files, root)
    all_issues += audit_css_vars(css_files, root)
    all_issues += audit_double_and_override(css_files, root)
    all_issues += audit_empty_rules(css_files, root)
    all_issues += audit_duplicate_rules(css_files, root, args.threshold)
    all_issues += audit_unused_classes(css_files, source_files, root)

    sys.exit(report(all_issues, root))


if __name__ == "__main__":
    main()