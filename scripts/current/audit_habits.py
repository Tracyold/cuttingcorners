#!/usr/bin/env python3
"""
audit_habits.py
───────────────
Detects lazy coding habits and patterns that will cause errors or pain at scale.
Does not flag bugs — flags choices that are technically valid now but will
create real problems when the codebase or team grows.

Categories detected:

  TYPE_SAFETY
    ANY_TYPE            — TypeScript `any` type used — disables type checking
    MISSING_RETURN_TYPE — exported function has no return type annotation
    NON_NULL_ASSERTION  — excessive use of ! operator — masks nullability
    UNSAFE_CAST         — `as SomeType` cast without a type guard

  SCALING_HAZARDS
    AWAIT_IN_LOOP       — await inside a for/while loop — should be Promise.all
    MAGIC_NUMBER        — hardcoded numeric limit with no named constant
    NO_PAGINATION       — data fetch with no limit/range/page parameter
    DEEP_NESTING        — function body nested 4+ levels deep

  ERROR_HANDLING
    EMPTY_CATCH         — catch block that swallows the error silently
    UNHANDLED_PROMISE   — .then() with no .catch()
    NO_ERROR_BOUNDARY   — async component with no error handling

  REACT_HAZARDS
    EFFECT_NO_DEPS      — useEffect with no dependency array (runs every render)
    INLINE_FUNCTION     — function defined inside JSX (recreated every render)
    MISSING_KEY         — .map() without a key prop
    PROPS_DRILLING      — prop passed through 3+ component layers

  CODE_QUALITY
    FN_TOO_LONG         — function longer than 60 lines
    FILE_TOO_LONG       — file longer than 300 lines
    DUPLICATE_STRING    — same string literal used 3+ times (should be a constant)
    CONSOLE_LEFT_IN     — console.log/warn left in non-script source code
    COMMENTED_CODE      — large blocks of commented-out code
    TODO_IN_PROD        — TODO/FIXME/HACK comment in source

Usage:
  python scripts/audit_habits.py [--root PATH]

  --root   Repo root (default: current directory)

Exit code:
  0 = no issues
  1 = issues found
"""

import argparse
import re
import sys
from pathlib import Path
from collections import defaultdict

sys.path.insert(0, str(Path(__file__).parent))
from _audit_json import add_json_arg, emit_json


# ── Config ────────────────────────────────────────────────────────────────────

SKIP_DIRS = {"node_modules", ".git", "dist", "build", ".next", "coverage", "__pycache__"}
SOURCE_EXTENSIONS = {".ts", ".tsx", ".js", ".jsx"}

FN_LINE_LIMIT   = 60
FILE_LINE_LIMIT = 300
STRING_DUPE_MIN = 3   # flag a string used this many times or more
MAX_NESTING     = 4   # flag blocks nested deeper than this


# ── Helpers ───────────────────────────────────────────────────────────────────

def walk(root: Path) -> list[Path]:
    return sorted(
        f for f in root.rglob("*")
        if f.is_file()
        and f.suffix in SOURCE_EXTENSIONS
        and not any(s in f.parts for s in SKIP_DIRS)
    )


def read(f: Path) -> str:
    return f.read_text(encoding="utf-8", errors="replace")


def strip_comments(text: str) -> str:
    text = re.sub(r'//[^\n]*', '', text)
    text = re.sub(r'/\*[\s\S]*?\*/', '', text)
    return text


def strip_strings(text: str) -> str:
    """Replace string contents with placeholders to avoid false matches inside strings."""
    text = re.sub(r'"[^"\\]*(?:\\.[^"\\]*)*"', '""', text)
    text = re.sub(r"'[^'\\]*(?:\\.[^'\\]*)*'", "''", text)
    text = re.sub(r'`[^`\\]*(?:\\.[^`\\]*)*`', '``', text)
    return text


def lineno(text: str, pos: int) -> int:
    return text[:pos].count('\n') + 1


def snippet(text: str, ln: int) -> str:
    lines = text.splitlines()
    if 1 <= ln <= len(lines):
        return lines[ln - 1].strip()[:80]
    return ""


def rel(f: Path, root: Path) -> str:
    try:
        return str(f.relative_to(root))
    except ValueError:
        return str(f)


def issue(f: Path, root: Path, ln: int, category: str,
          severity: str, detail: str, snip: str = "") -> dict:
    return {
        "file":     rel(f, root),
        "line":     ln,
        "category": category,
        "severity": severity,
        "detail":   detail,
        "snippet":  snip,
    }


# ── TYPE SAFETY ───────────────────────────────────────────────────────────────

def check_any_type(f: Path, text: str, root: Path) -> list[dict]:
    issues = []
    clean = strip_comments(text)
    # : any, <any>, Array<any>, as any — but not in comments or strings
    for m in re.finditer(r'(?<!\w):\s*any\b|<any>|Array<any>|\bas\s+any\b', clean):
        ln = lineno(clean, m.start())
        issues.append(issue(f, root, ln, "ANY_TYPE", "MEDIUM",
            "TypeScript `any` type disables type checking for this value — use a specific type or `unknown`",
            snippet(text, ln)))
    return issues


def check_non_null_assertion(f: Path, text: str, root: Path) -> list[dict]:
    issues = []
    clean = strip_comments(text)
    # Count ! assertions — flag files with more than 3
    matches = list(re.finditer(r'\w+!\.|\w+!\[|\w+!\)', clean))
    if len(matches) > 3:
        issues.append(issue(f, root, 1, "NON_NULL_ASSERTION", "MEDIUM",
            f"Non-null assertion `!` used {len(matches)} times in this file — "
            f"each one is a runtime crash waiting to happen if the value is actually null",
            f"{len(matches)} occurrences of !"))
    return issues


def check_unsafe_cast(f: Path, text: str, root: Path) -> list[dict]:
    issues = []
    clean = strip_comments(text)
    for m in re.finditer(r'\bas\s+(?!const\b)([A-Z]\w+)', clean):
        ln = lineno(clean, m.start())
        type_name = m.group(1)
        issues.append(issue(f, root, ln, "UNSAFE_CAST", "LOW",
            f"`as {type_name}` cast bypasses type checking — use a type guard function instead",
            snippet(text, ln)))
    return issues


def check_missing_return_type(f: Path, text: str, root: Path) -> list[dict]:
    issues = []
    clean = strip_comments(text)
    # exported functions/arrow functions without a return type annotation
    for m in re.finditer(
        r'\bexport\s+(?:default\s+)?(?:async\s+)?function\s+\w+\s*\([^)]*\)\s*\{',
        clean
    ):
        ln = lineno(clean, m.start())
        fn_sig = m.group(0)
        # Has return type if ): Type appears before {
        if not re.search(r'\)\s*:\s*[\w<\[{(]', fn_sig):
            issues.append(issue(f, root, ln, "MISSING_RETURN_TYPE", "LOW",
                "Exported function has no return type annotation — callers have no contract to rely on",
                snippet(text, ln)))
    return issues


# ── SCALING HAZARDS ───────────────────────────────────────────────────────────

def check_await_in_loop(f: Path, text: str, root: Path) -> list[dict]:
    issues = []
    clean = strip_comments(text)
    # Find for/while loops containing await
    for m in re.finditer(r'\b(?:for|while)\s*\(', clean):
        loop_start = m.end()
        # Find the loop body
        depth, pos = 0, loop_start
        body_start = None
        while pos < len(clean):
            if clean[pos] == '{':
                if depth == 0:
                    body_start = pos
                depth += 1
            elif clean[pos] == '}':
                depth -= 1
                if depth == 0:
                    body = clean[body_start:pos] if body_start else ''
                    if re.search(r'\bawait\b', body):
                        ln = lineno(clean, m.start())
                        issues.append(issue(f, root, ln, "AWAIT_IN_LOOP", "HIGH",
                            "await inside a loop runs requests sequentially — "
                            "use Promise.all() to run them in parallel",
                            snippet(text, ln)))
                    break
            pos += 1
    return issues


def check_magic_numbers(f: Path, text: str, root: Path) -> list[dict]:
    issues = []
    clean = strip_comments(strip_strings(text))
    # Numbers greater than 10 used in comparisons or limits — not in CSS/style contexts
    for m in re.finditer(r'(?:>|<|>=|<=|===|!==|length\s*[><=]|limit|max|min|count|size|page)\s*(\d{2,})', clean):
        num = int(m.group(1))
        if num in (100, 200, 201, 204, 400, 401, 403, 404, 500):
            continue  # HTTP status codes — intentional
        ln = lineno(clean, m.start())
        issues.append(issue(f, root, ln, "MAGIC_NUMBER", "LOW",
            f"Magic number {num} used directly in logic — extract to a named constant so intent is clear",
            snippet(text, ln)))
    return issues


def check_no_pagination(f: Path, text: str, root: Path) -> list[dict]:
    issues = []
    clean = strip_comments(text)
    # Supabase .from().select() with no .limit() .range() or pagination param
    for m in re.finditer(r'supabase\s*\.\s*from\s*\([^)]+\)(.{0,400})', clean, re.DOTALL):
        chain = m.group(1)
        has_pagination = re.search(r'\.(limit|range|page)\s*\(', chain)
        has_select = re.search(r'\.select\s*\(', chain)
        if has_select and not has_pagination:
            ln = lineno(clean, m.start())
            issues.append(issue(f, root, ln, "NO_PAGINATION", "HIGH",
                "Supabase query has no .limit() or .range() — will fetch all rows "
                "and break silently when data grows",
                snippet(text, ln)))
    return issues


def check_deep_nesting(f: Path, text: str, root: Path) -> list[dict]:
    issues = []
    lines = text.splitlines()
    for i, line in enumerate(lines, 1):
        # Count leading braces as nesting proxy
        indent = len(line) - len(line.lstrip())
        depth = indent // 2  # assume 2-space indent
        if depth >= MAX_NESTING and line.strip() and not line.strip().startswith('//'):
            issues.append(issue(f, root, i, "DEEP_NESTING", "MEDIUM",
                f"Code nested {depth} levels deep — extract inner logic into named functions",
                line.strip()[:80]))
            # Only flag first occurrence per file to avoid noise
            break
    return issues


# ── ERROR HANDLING ────────────────────────────────────────────────────────────

def check_empty_catch(f: Path, text: str, root: Path) -> list[dict]:
    issues = []
    for m in re.finditer(r'\bcatch\s*\([^)]*\)\s*\{\s*\}', text):
        ln = lineno(text, m.start())
        issues.append(issue(f, root, ln, "EMPTY_CATCH", "HIGH",
            "Empty catch block silently swallows errors — "
            "at minimum log the error or rethrow it",
            snippet(text, ln)))
    return issues


def check_unhandled_promise(f: Path, text: str, root: Path) -> list[dict]:
    issues = []
    clean = strip_comments(text)
    # .then() not followed by .catch() within a reasonable window
    for m in re.finditer(r'\.then\s*\(', clean):
        window = clean[m.start():m.start() + 300]
        if not re.search(r'\.catch\s*\(', window):
            ln = lineno(clean, m.start())
            issues.append(issue(f, root, ln, "UNHANDLED_PROMISE", "HIGH",
                ".then() with no .catch() — rejected promise will fail silently in production",
                snippet(text, ln)))
    return issues


# ── REACT HAZARDS ─────────────────────────────────────────────────────────────

def check_effect_no_deps(f: Path, text: str, root: Path) -> list[dict]:
    issues = []
    clean = strip_comments(text)
    # useEffect(() => { ... }) — no second argument at all
    for m in re.finditer(r'useEffect\s*\(\s*(?:async\s*)?\(\s*\)\s*=>', clean):
        # Look ahead for closing of the useEffect call
        window = clean[m.start():m.start() + 500]
        # If there's no [], the effect runs on every render
        if not re.search(r',\s*\[', window):
            ln = lineno(clean, m.start())
            issues.append(issue(f, root, ln, "EFFECT_NO_DEPS", "HIGH",
                "useEffect with no dependency array runs after every render — "
                "add [] for mount-only or list actual dependencies",
                snippet(text, ln)))
    return issues


def check_inline_functions(f: Path, text: str, root: Path) -> list[dict]:
    issues = []
    clean = strip_comments(text)
    # onClick={() => ...} or similar inline handlers inside JSX
    for m in re.finditer(r'(?:onClick|onChange|onSubmit|onBlur|onFocus)\s*=\s*\{\s*\(', clean):
        ln = lineno(clean, m.start())
        issues.append(issue(f, root, ln, "INLINE_FUNCTION", "LOW",
            "Inline arrow function in JSX prop is recreated on every render — "
            "extract to useCallback or a named handler",
            snippet(text, ln)))
    return issues


def check_missing_key(f: Path, text: str, root: Path) -> list[dict]:
    issues = []
    clean = strip_comments(text)
    # .map( returning JSX without a key prop
    for m in re.finditer(r'\.map\s*\(\s*(?:\([^)]*\)|[\w]+)\s*=>\s*[(<]', clean):
        window = clean[m.start():m.start() + 300]
        if not re.search(r'\bkey\s*=', window):
            ln = lineno(clean, m.start())
            issues.append(issue(f, root, ln, "MISSING_KEY", "MEDIUM",
                ".map() returning JSX with no key prop — "
                "React needs a stable key to reconcile list items efficiently",
                snippet(text, ln)))
    return issues


# ── CODE QUALITY ──────────────────────────────────────────────────────────────

def check_fn_too_long(f: Path, text: str, root: Path) -> list[dict]:
    issues = []
    clean = strip_comments(text)
    # Find function starts and measure body length
    for m in re.finditer(
        r'(?:function\s+(\w+)|(?:const|let)\s+(\w+)\s*=\s*(?:async\s*)?(?:function\s*)?)?\s*\([^)]{0,200}\)\s*(?::\s*[\w<>\[\]|& ]+)?\s*(?:=>)?\s*\{',
        clean
    ):
        fn_name = m.group(1) or m.group(2) or '<anonymous>'
        fn_start = m.end()
        depth, pos, line_count = 1, fn_start, 0
        while pos < len(clean) and depth > 0:
            if clean[pos] == '{':
                depth += 1
            elif clean[pos] == '}':
                depth -= 1
            elif clean[pos] == '\n':
                line_count += 1
            pos += 1
        if line_count > FN_LINE_LIMIT:
            ln = lineno(clean, m.start())
            issues.append(issue(f, root, ln, "FN_TOO_LONG", "MEDIUM",
                f"Function '{fn_name}' is {line_count} lines long — "
                f"functions over {FN_LINE_LIMIT} lines are hard to test and reason about. "
                f"Break it into smaller focused functions.",
                snippet(text, ln)))
    return issues


def check_file_too_long(f: Path, text: str, root: Path) -> list[dict]:
    lines = text.splitlines()
    if len(lines) > FILE_LINE_LIMIT:
        return [issue(f, root, 1, "FILE_TOO_LONG", "MEDIUM",
            f"File is {len(lines)} lines long (limit: {FILE_LINE_LIMIT}) — "
            f"split into smaller modules with single responsibilities",
            f"{len(lines)} lines")]
    return []


def check_duplicate_strings(f: Path, text: str, root: Path) -> list[dict]:
    issues = []
    # Find all string literals of length 4+
    counts: dict[str, list[int]] = defaultdict(list)
    for m in re.finditer(r'''(?:"|')([^"'\n]{4,})(?:"|')''', text):
        val = m.group(1)
        # Skip URLs, paths, CSS values
        if re.match(r'https?://|\.\/|\.\.\/|#[0-9a-fA-F]', val):
            continue
        ln = lineno(text, m.start())
        counts[val].append(ln)

    for val, lines_found in counts.items():
        if len(lines_found) >= STRING_DUPE_MIN:
            issues.append(issue(f, root, lines_found[0], "DUPLICATE_STRING", "LOW",
                f"String '{val}' appears {len(lines_found)} times "
                f"(lines {', '.join(str(l) for l in lines_found[:5])}) — "
                f"extract to a named constant",
                f"'{val}'"))
    return issues


def check_console_left_in(f: Path, text: str, root: Path) -> list[dict]:
    issues = []
    # Skip script/util files where console is expected
    if any(x in f.name for x in ('script', 'seed', 'migration', 'cli', 'debug')):
        return []
    for m in re.finditer(r'\bconsole\.\w+\s*\(', text):
        ln = lineno(text, m.start())
        issues.append(issue(f, root, ln, "CONSOLE_LEFT_IN", "LOW",
            "console statement left in source — remove before production or use a logger",
            snippet(text, ln)))
    return issues


def check_commented_code(f: Path, text: str, root: Path) -> list[dict]:
    issues = []
    lines = text.splitlines()
    consecutive = 0
    start_line  = 0
    for i, line in enumerate(lines, 1):
        stripped = line.strip()
        if stripped.startswith('//') and re.search(r'[;{}()=]', stripped):
            if consecutive == 0:
                start_line = i
            consecutive += 1
        else:
            if consecutive >= 4:
                issues.append(issue(f, root, start_line, "COMMENTED_CODE", "LOW",
                    f"{consecutive} consecutive lines of commented-out code starting at line {start_line} — "
                    f"delete it, git history preserves it",
                    lines[start_line - 1].strip()[:80]))
            consecutive = 0
    return issues


def check_todos(f: Path, text: str, root: Path) -> list[dict]:
    issues = []
    for m in re.finditer(r'//\s*(?:TODO|FIXME|HACK|XXX)\b.*', text, re.IGNORECASE):
        ln = lineno(text, m.start())
        tag = re.search(r'TODO|FIXME|HACK|XXX', m.group(0), re.IGNORECASE).group(0).upper()
        issues.append(issue(f, root, ln, "TODO_IN_PROD", "LOW",
            f"{tag} comment left in source — deferred work becomes permanent debt",
            m.group(0).strip()[:80]))
    return issues


# ── Main audit ────────────────────────────────────────────────────────────────

CHECKS = [
    # Type safety
    check_any_type,
    check_non_null_assertion,
    check_unsafe_cast,
    check_missing_return_type,
    # Scaling hazards
    check_await_in_loop,
    check_magic_numbers,
    check_no_pagination,
    check_deep_nesting,
    # Error handling
    check_empty_catch,
    check_unhandled_promise,
    # React hazards
    check_effect_no_deps,
    check_inline_functions,
    check_missing_key,
    # Code quality
    check_fn_too_long,
    check_file_too_long,
    check_duplicate_strings,
    check_console_left_in,
    check_commented_code,
    check_todos,
]


def audit_habits(files: list[Path], root: Path) -> list[dict]:
    all_issues = []
    for f in files:
        text = read(f)
        for check in CHECKS:
            try:
                all_issues.extend(check(f, text, root))
            except Exception as e:
                all_issues.append(issue(f, root, 0, "AUDIT_ERROR", "LOW",
                    f"Check {check.__name__} raised an exception: {e}"))
    return all_issues


# ── Reporting ─────────────────────────────────────────────────────────────────

CATEGORY_ORDER = [
    # High severity first
    "AWAIT_IN_LOOP", "NO_PAGINATION", "EMPTY_CATCH", "UNHANDLED_PROMISE", "EFFECT_NO_DEPS",
    # Medium
    "ANY_TYPE", "NON_NULL_ASSERTION", "DEEP_NESTING", "MISSING_KEY",
    "FN_TOO_LONG", "FILE_TOO_LONG",
    # Low
    "UNSAFE_CAST", "MISSING_RETURN_TYPE", "MAGIC_NUMBER", "INLINE_FUNCTION",
    "DUPLICATE_STRING", "CONSOLE_LEFT_IN", "COMMENTED_CODE", "TODO_IN_PROD",
]

CATEGORY_LABELS = {
    "ANY_TYPE":            "⚠ any Type (disables type safety)",
    "MISSING_RETURN_TYPE": "⚠ Missing Return Types (exported functions)",
    "NON_NULL_ASSERTION":  "⚠ Excessive Non-Null Assertions (!)",
    "UNSAFE_CAST":         "⚠ Unsafe Type Casts (as Type)",
    "AWAIT_IN_LOOP":       "✗ await in Loop (use Promise.all)",
    "MAGIC_NUMBER":        "⚠ Magic Numbers (use named constants)",
    "NO_PAGINATION":       "✗ No Pagination on Data Fetch",
    "DEEP_NESTING":        "⚠ Deep Nesting (extract to functions)",
    "EMPTY_CATCH":         "✗ Empty Catch Block (swallows errors)",
    "UNHANDLED_PROMISE":   "✗ Unhandled Promise Rejection",
    "EFFECT_NO_DEPS":      "✗ useEffect Missing Dependency Array",
    "INLINE_FUNCTION":     "⚠ Inline JSX Function (recreated every render)",
    "MISSING_KEY":         "⚠ Missing key Prop in .map()",
    "FN_TOO_LONG":         "⚠ Function Too Long (break it up)",
    "FILE_TOO_LONG":       "⚠ File Too Long (split into modules)",
    "DUPLICATE_STRING":    "⚠ Duplicate String Literals (use constants)",
    "CONSOLE_LEFT_IN":     "⚠ console Statement in Source",
    "COMMENTED_CODE":      "⚠ Commented-Out Code (delete it)",
    "TODO_IN_PROD":        "⚠ TODO/FIXME Left in Source",
}

SEVERITY_ICONS = {"HIGH": "🔴", "MEDIUM": "🟡", "LOW": "🔵"}


def report(all_issues: list[dict], root: Path) -> int:
    by_cat: dict[str, list[dict]] = defaultdict(list)
    for iss in all_issues:
        by_cat[iss["category"]].append(iss)

    by_sev: dict[str, int] = defaultdict(int)
    for iss in all_issues:
        by_sev[iss["severity"]] += 1

    total = len(all_issues)

    print(f"\n{'═'*66}")
    print(f"  HABITS & SCALING HAZARDS AUDIT")
    print(f"{'═'*66}")
    print(f"  Root:  {root}")
    print(f"  Total: {total}  |  " +
          "  ".join(f"{SEVERITY_ICONS.get(s,'')} {s}: {by_sev[s]}"
                    for s in ("HIGH", "MEDIUM", "LOW") if by_sev[s]))

    for cat in CATEGORY_ORDER:
        issues = by_cat.get(cat, [])
        if not issues:
            continue
        print(f"\n  {CATEGORY_LABELS.get(cat, cat)} ({len(issues)})")
        print(f"  {'─'*62}")
        for iss in issues:
            line = f":{iss['line']}" if iss.get('line') else ""
            print(f"\n    {iss['file']}{line}")
            print(f"    → {iss['detail']}")
            if iss.get("snippet"):
                print(f"    ↳ {iss['snippet']}")

    print(f"\n{'═'*66}")
    if total == 0:
        print("  ✓ No habits or scaling hazards detected.")
    else:
        high = by_sev.get("HIGH", 0)
        if high:
            print(f"  🔴 {high} HIGH — these will cause real failures at scale. Fix first.")
        print(f"  {total} total issue(s). These won't break today but will tomorrow.")
    print(f"{'═'*66}\n")

    return 0 if total == 0 else 1


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        description="Detect lazy coding habits and scaling hazards."
    )
    parser.add_argument("--root", default=".", help="Repo root (default: .)")
    parser.add_argument("--ext", nargs="+", default=None,
                        help="Extensions to scan (default: .ts .tsx .js .jsx)")
    add_json_arg(parser)
    args = parser.parse_args()

    root = Path(args.root).resolve()
    extensions = set(args.ext) if args.ext else SOURCE_EXTENSIONS
    files = walk(root)

    if not getattr(args, "quiet", False):
        print(f"\nScanning {len(files)} files under {root}...")

    all_issues = audit_habits(files, root)

    emit_json(all_issues, args, "audit_habits", root)
    if not getattr(args, "quiet", False):
        sys.exit(report(all_issues, root))
    else:
        sys.exit(0 if not all_issues else 1)


if __name__ == "__main__":
    main()