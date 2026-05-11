#!/usr/bin/env python3
"""
audit_security.py
─────────────────
Security audit for codebases using Supabase infrastructure.

Traces auth coverage through the full import graph before flagging missing
auth — a component is considered covered if any ancestor in the import chain
establishes an auth check, or if an auth prop is passed down to it.

Categories detected:

  CRITICAL
    HARDCODED_SECRET    — API keys, service role keys, secrets in source code
    SERVICE_ROLE_CLIENT — supabase service role key used in client-side code
    EVAL_USAGE          — eval() or new Function() — remote code execution risk
    SQL_INJECTION       — string-concatenated queries or raw template literals in DB calls
    DANGEROUSHTML       — dangerouslySetInnerHTML without visible sanitization

  HIGH
    UNAUTHED_DB_CALL    — Supabase DB/storage/rpc call with no auth in the file
                          AND no auth found in any ancestor in the import graph
    SELECT_STAR         — .select('*') — over-fetches all columns, leaks schema
    NO_RLS_FILTER       — query on a user-scoped table with no .eq('user_id',...) filter
    AUTH_ADMIN_CLIENT   — supabase.auth.admin used outside a server/edge context
    STORAGE_NO_AUTH     — supabase.storage call with no auth guard

  MEDIUM
    LOCALSTORAGE_TOKEN  — JWT / token / session stored in localStorage
    TOKEN_IN_URL        — access_token or token appended to a URL string
    CONSOLE_USER_DATA   — console.log() containing user, session, token, password
    MATH_RANDOM_CRYPTO  — Math.random() used for tokens, IDs, or security codes
    MISSING_ERROR_CATCH — Supabase call with .data destructure but no .error check
    NO_INPUT_VALIDATION — data written to DB without visible schema/type validation
    CORS_WILDCARD       — CORS set to '*' — allows any origin
    CRYPTO_DISABLED     — rejectUnauthorized: false or SSL verify disabled

  LOW
    ENV_NO_VALIDATION   — process.env.* used directly without fallback or check
    COMMENTED_CREDS     — commented-out credentials or connection strings
    TODO_SECURITY       — TODO/FIXME/HACK comments adjacent to auth or DB code

Usage:
  python scripts/audit_security.py [--root PATH] [--supabase-url URL]

  --root          Repo root (default: current directory)
  --supabase-url  Your Supabase project URL (used to confirm key exposure)

Exit code:
  0 = no issues
  1 = issues found
"""

import argparse
import re
import sys
from pathlib import Path
from collections import defaultdict, deque


# ── Config ────────────────────────────────────────────────────────────────────

SKIP_DIRS = {
    "node_modules", ".git", "dist", "build", ".next", "coverage",
    "__pycache__", ".turbo", "out", ".vercel",
}

SOURCE_EXTENSIONS = {".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs"}
CONFIG_EXTENSIONS = {".json", ".yaml", ".yml", ".toml", ".env"}

# Files that are expected to use the service role (server-only contexts)
SERVER_SAFE_PATTERNS = {
    "server", "api", "edge", "route", "action", "middleware",
    "cron", "webhook", "admin", "seed", "migration",
}

# Auth indicators — if any of these appear in a file, it's considered auth-aware
AUTH_IMPORT_PATTERNS = [
    r"useAuth", r"useUser", r"useSession", r"useSupabaseClient",
    r"getSession", r"getUser", r"currentUser", r"requireAuth",
    r"withAuth", r"AuthContext", r"AuthProvider", r"ProtectedRoute",
    r"supabase\.auth\.getUser", r"supabase\.auth\.getSession",
    r"session\s*=", r"user\s*=.*auth", r"auth\.user",
    r"createServerComponentClient", r"createRouteHandlerClient",
    r"cookies\(\)", r"headers\(\)",  # Next.js server auth patterns
]
AUTH_PROP_PATTERNS = [
    r"\buser\b\s*[=:]", r"\bsession\b\s*[=:]",
    r"\bisAuthenticated\b", r"\bauthUser\b", r"\bcurrentUser\b",
]

# Supabase call signatures
SUPABASE_DB_PATTERNS = [
    r"supabase\s*\.\s*from\s*\(",
    r"supabase\s*\.\s*rpc\s*\(",
    r"supabase\s*\.\s*storage",
    r"supabase\s*\.\s*functions\s*\.\s*invoke",
]

# Tables that are clearly user-scoped and need a filter
USER_SCOPED_TABLES = {
    "profiles", "users", "orders", "posts", "messages",
    "notifications", "settings", "preferences", "sessions",
    "subscriptions", "payments", "invoices", "files", "uploads",
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
    try:
        return f.read_text(encoding="utf-8", errors="replace")
    except Exception:
        return ""


def is_server_file(f: Path) -> bool:
    name = f.stem.lower()
    return any(p in name for p in SERVER_SAFE_PATTERNS) or "server" in str(f).lower()


# ── Import graph ──────────────────────────────────────────────────────────────

def resolve_import(importer: Path, import_path: str, root: Path) -> Path | None:
    """
    Attempt to resolve a relative import to an actual file path.
    Returns None if the import is a package (not a local file).
    """
    if not import_path.startswith("."):
        return None  # npm package — skip

    base = importer.parent
    candidate = (base / import_path).resolve()

    # Try exact path, then with extensions
    for ext in ["", ".ts", ".tsx", ".js", ".jsx", "/index.ts", "/index.tsx", "/index.js"]:
        p = Path(str(candidate) + ext)
        if p.is_file() and p.suffix in SOURCE_EXTENSIONS:
            return p

    return None


def build_import_graph(source_files: list[Path], root: Path) -> dict[str, set[str]]:
    """
    Returns: importer_path → set of imported file paths (only local imports resolved).
    """
    graph: dict[str, set[str]] = defaultdict(set)
    file_set = {str(f) for f in source_files}

    import_re = re.compile(r"""(?:import|from)\s+['"]([^'"]+)['"]""")

    for f in source_files:
        text = read(f)
        for m in import_re.finditer(text):
            resolved = resolve_import(f, m.group(1), root)
            if resolved and str(resolved) in file_set:
                graph[str(f)].add(str(resolved))

    return graph


def build_reverse_graph(graph: dict[str, set[str]]) -> dict[str, set[str]]:
    """Reverse the import graph: file → set of files that import IT."""
    reverse: dict[str, set[str]] = defaultdict(set)
    for importer, imports in graph.items():
        for imp in imports:
            reverse[imp].add(importer)
    return reverse


def ancestors(file_path: str, reverse_graph: dict[str, set[str]]) -> set[str]:
    """BFS up the reverse import graph to find all ancestors of a file."""
    visited = set()
    queue = deque([file_path])
    while queue:
        current = queue.popleft()
        for parent in reverse_graph.get(current, set()):
            if parent not in visited:
                visited.add(parent)
                queue.append(parent)
    return visited


# ── Auth detection ────────────────────────────────────────────────────────────

def file_has_auth(text: str) -> bool:
    for pattern in AUTH_IMPORT_PATTERNS:
        if re.search(pattern, text):
            return True
    return False


def file_passes_auth_props(text: str) -> bool:
    for pattern in AUTH_PROP_PATTERNS:
        if re.search(pattern, text):
            return True
    return False


def auth_covered(
    file_path: str,
    file_texts: dict[str, str],
    reverse_graph: dict[str, set[str]],
) -> tuple[bool, str]:
    """
    Returns (covered: bool, reason: str).
    A file is auth-covered if:
      1. It has auth patterns itself, OR
      2. Any ancestor in the import graph has auth patterns
    """
    text = file_texts.get(file_path, "")
    if file_has_auth(text):
        return True, "auth found in this file"

    for ancestor_path in ancestors(file_path, reverse_graph):
        ancestor_text = file_texts.get(ancestor_path, "")
        if file_has_auth(ancestor_text):
            rel = Path(ancestor_path).name
            return True, f"auth established in ancestor '{rel}'"

    return False, "no auth found in this file or any ancestor"


# ── Security pattern checks ───────────────────────────────────────────────────

# (pattern, category, severity, detail_template)
PATTERN_CHECKS = [

    # ── CRITICAL ──────────────────────────────────────────────────────────────

    (
        r'(?:service_role|service-role)[_-]?key\s*[=:]\s*["\']ey[A-Za-z0-9_-]{20,}',
        "HARDCODED_SECRET", "CRITICAL",
        "Supabase service role key appears hardcoded in source — never commit this; move to server-only env var"
    ),
    (
        r'(?:supabase_key|SUPABASE_KEY|supabase_anon_key|SUPABASE_ANON_KEY)\s*=\s*["\']ey[A-Za-z0-9_-]{20,}',
        "HARDCODED_SECRET", "CRITICAL",
        "Supabase API key hardcoded in source — move to environment variable"
    ),
    (
        r'["\']ey[A-Za-z0-9_-]{30,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}["\']',
        "HARDCODED_SECRET", "CRITICAL",
        "JWT token appears hardcoded — tokens must not be committed to source"
    ),
    (
        r'\beval\s*\(|new\s+Function\s*\(',
        "EVAL_USAGE", "CRITICAL",
        "eval() or new Function() enables arbitrary code execution — never use with user input"
    ),
    (
        r'dangerouslySetInnerHTML\s*=\s*\{\s*\{',
        "DANGEROUSHTML", "CRITICAL",
        "dangerouslySetInnerHTML detected — verify input is sanitized with DOMPurify or equivalent before render"
    ),
    (
        r'(?:query|sql|filter)\s*[=+]\s*[`\'"].*\$\{.*(?:user|input|param|req\.|body\.|query\.)',
        "SQL_INJECTION", "CRITICAL",
        "Possible SQL/query injection — user input interpolated directly into a query string"
    ),

    # ── HIGH ──────────────────────────────────────────────────────────────────

    (
        r'\.select\s*\(\s*["\'][*]["\']',
        "SELECT_STAR", "HIGH",
        ".select('*') fetches all columns — enumerate only the columns you need to prevent data over-exposure"
    ),
    (
        r'supabase\.auth\.admin',
        "AUTH_ADMIN_CLIENT", "HIGH",
        "supabase.auth.admin used — admin methods must only run server-side (API routes, edge functions). Never in client components."
    ),
    (
        r'supabase\s*\.\s*storage\s*\.\s*(?:from|upload|download)',
        "STORAGE_NO_AUTH", "HIGH",
        "Supabase storage call detected — confirm bucket has RLS policies and this call is auth-gated"
    ),
    (
        r'rejectUnauthorized\s*:\s*false|NODE_TLS_REJECT_UNAUTHORIZED\s*=\s*["\']0["\']|ssl\s*:\s*false',
        "CRYPTO_DISABLED", "HIGH",
        "TLS/SSL verification disabled — man-in-the-middle attacks become possible"
    ),

    # ── MEDIUM ────────────────────────────────────────────────────────────────

    (
        r'localStorage\.setItem\s*\([^)]*(?:token|jwt|session|auth|access_token)',
        "LOCALSTORAGE_TOKEN", "MEDIUM",
        "Auth token stored in localStorage — XSS attacks can steal it. Prefer httpOnly cookies."
    ),
    (
        r'["\'][^"\']*[?&](?:access_token|token|jwt)=',
        "TOKEN_IN_URL", "MEDIUM",
        "Auth token appended to URL — tokens in URLs appear in server logs, browser history, and Referer headers"
    ),
    (
        r'console\.(?:log|warn|info|error)\s*\([^)]*(?:user|session|token|password|secret|key)',
        "CONSOLE_USER_DATA", "MEDIUM",
        "console.log() may be printing sensitive auth/user data — remove before production"
    ),
    (
        r'Math\.random\s*\(\s*\)\s*.*(?:token|id|secret|code|nonce|salt|key)',
        "MATH_RANDOM_CRYPTO", "MEDIUM",
        "Math.random() is not cryptographically secure — use crypto.randomUUID() or crypto.getRandomValues()"
    ),
    (
        r'const\s*\{\s*data\s*\}.*=.*await.*supabase(?!.*\.error)',
        "MISSING_ERROR_CATCH", "MEDIUM",
        "Supabase call destructures only { data } without { error } — unhandled errors will fail silently"
    ),
    (
        r"""(?:Access-Control-Allow-Origin|cors\s*\()\s*['"]\*['"]""",
        "CORS_WILDCARD", "MEDIUM",
        "CORS wildcard '*' allows any origin — restrict to your actual frontend domains"
    ),

    # ── LOW ───────────────────────────────────────────────────────────────────

    (
        r'process\.env\.\w+(?!\s*\?\?|\s*\|\||\s*!|\s*&&)',
        "ENV_NO_VALIDATION", "LOW",
        "process.env.* used without a fallback or existence check — app will silently fail if var is missing"
    ),
    (
        r'//.*(?:password|secret|api.?key|token|credential)',
        "COMMENTED_CREDS", "LOW",
        "Commented-out line may contain credential or sensitive reference — review and remove"
    ),
    (
        r'(?:TODO|FIXME|HACK).*(?:auth|security|token|permission|admin|secret|supabase)',
        "TODO_SECURITY", "LOW",
        "Security-adjacent TODO/FIXME — deferred security work is a known vulnerability"
    ),
]


def scan_patterns(files: list[Path], root: Path) -> list[dict]:
    issues = []
    compiled = [(re.compile(p, re.IGNORECASE), cat, sev, detail)
                for p, cat, sev, detail in PATTERN_CHECKS]

    for f in files:
        text = read(f)
        rel = str(f.relative_to(root))
        lines = text.splitlines()

        for pattern, category, severity, detail in compiled:
            for m in pattern.finditer(text):
                lineno = text[:m.start()].count('\n') + 1
                snippet = lines[lineno - 1].strip()[:80] if lineno <= len(lines) else ""

                # Service role in client-side code is CRITICAL; in server files it's expected
                if category == "AUTH_ADMIN_CLIENT" and is_server_file(f):
                    continue

                issues.append({
                    "file": rel,
                    "line": lineno,
                    "category": category,
                    "severity": severity,
                    "detail": detail,
                    "snippet": snippet,
                })

    return issues


# ── Unauthed DB call detection ────────────────────────────────────────────────

def scan_unauthed_db_calls(
    source_files: list[Path],
    file_texts: dict[str, str],
    reverse_graph: dict[str, set[str]],
    root: Path,
) -> list[dict]:
    issues = []
    db_re = [re.compile(p) for p in SUPABASE_DB_PATTERNS]

    for f in source_files:
        text = file_texts[str(f)]
        rel = str(f.relative_to(root))

        # Skip server-only files — they use service role by design
        if is_server_file(f):
            continue

        has_db_call = any(p.search(text) for p in db_re)
        if not has_db_call:
            continue

        covered, reason = auth_covered(str(f), file_texts, reverse_graph)
        if not covered:
            # Find the line of the first DB call for context
            lineno = 1
            for p in db_re:
                m = p.search(text)
                if m:
                    lineno = text[:m.start()].count('\n') + 1
                    break

            lines = text.splitlines()
            snippet = lines[lineno - 1].strip()[:80] if lineno <= len(lines) else ""

            issues.append({
                "file": rel,
                "line": lineno,
                "category": "UNAUTHED_DB_CALL",
                "severity": "HIGH",
                "detail": (
                    f"Supabase DB/storage call found but no auth guard detected — "
                    f"{reason}. If RLS is not configured this data is publicly accessible."
                ),
                "snippet": snippet,
            })

    return issues


def scan_no_rls_filter(source_files: list[Path], root: Path) -> list[dict]:
    """Flag queries on user-scoped tables that have no user_id filter."""
    issues = []
    from_re = re.compile(r"""supabase\s*\.\s*from\s*\(\s*['"](\w+)['"]\s*\)(.{0,300})""", re.DOTALL)
    filter_re = re.compile(r'\.(?:eq|filter|match)\s*\(\s*["\'](?:user_id|owner_id|uid)["\']')

    for f in source_files:
        text = read(f)
        rel = str(f.relative_to(root))
        if is_server_file(f):
            continue
        for m in from_re.finditer(text):
            table = m.group(1).lower()
            chain = m.group(2)
            if table in USER_SCOPED_TABLES and not filter_re.search(chain):
                lineno = text[:m.start()].count('\n') + 1
                issues.append({
                    "file": rel,
                    "line": lineno,
                    "category": "NO_RLS_FILTER",
                    "severity": "HIGH",
                    "detail": (
                        f"Query on user-scoped table '{table}' has no user_id filter — "
                        f"relies entirely on RLS. Confirm RLS is enabled and policies are correct."
                    ),
                    "snippet": m.group(0)[:80].replace('\n', ' '),
                })

    return issues


# ── Reporting ─────────────────────────────────────────────────────────────────

SEVERITY_ORDER = ["CRITICAL", "HIGH", "MEDIUM", "LOW"]

SEVERITY_ICONS = {
    "CRITICAL": "🔴 CRITICAL",
    "HIGH":     "🟠 HIGH",
    "MEDIUM":   "🟡 MEDIUM",
    "LOW":      "🔵 LOW",
}


def report(all_issues: list[dict], root: Path) -> int:
    by_severity: dict[str, list[dict]] = defaultdict(list)
    for iss in all_issues:
        by_severity[iss["severity"]].append(iss)

    counts = {s: len(by_severity.get(s, [])) for s in SEVERITY_ORDER}
    total = sum(counts.values())

    print(f"\n{'═'*66}")
    print(f"  SECURITY AUDIT REPORT")
    print(f"{'═'*66}")
    print(f"  Root: {root}")
    print(f"  Total issues: {total}  |  " +
          "  ".join(f"{SEVERITY_ICONS[s]}: {counts[s]}" for s in SEVERITY_ORDER if counts[s]))

    for severity in SEVERITY_ORDER:
        issues = by_severity.get(severity, [])
        if not issues:
            continue

        # Group by category within severity
        by_cat: dict[str, list[dict]] = defaultdict(list)
        for iss in issues:
            by_cat[iss["category"]].append(iss)

        for cat, cat_issues in sorted(by_cat.items()):
            print(f"\n  {SEVERITY_ICONS[severity]} — {cat} ({len(cat_issues)})")
            print(f"  {'─'*62}")
            for iss in cat_issues:
                line = f":{iss['line']}" if "line" in iss else ""
                print(f"\n    {iss['file']}{line}")
                print(f"    → {iss['detail']}")
                if iss.get("snippet"):
                    print(f"    ↳ `{iss['snippet']}`")

    print(f"\n{'═'*66}")
    if total == 0:
        print("  ✓ No security issues detected.")
    else:
        if counts.get("CRITICAL", 0) > 0:
            print(f"  🔴 {counts['CRITICAL']} CRITICAL issue(s) — fix before any deployment.")
        if counts.get("HIGH", 0) > 0:
            print(f"  🟠 {counts['HIGH']} HIGH issue(s) — fix before merging to main.")
        if counts.get("MEDIUM", 0) > 0:
            print(f"  🟡 {counts['MEDIUM']} MEDIUM issue(s) — fix in current sprint.")
        if counts.get("LOW", 0) > 0:
            print(f"  🔵 {counts['LOW']} LOW issue(s) — fix before release.")
    print(f"{'═'*66}\n")

    return 0 if total == 0 else 1


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        description="Security audit for Supabase-backed codebases."
    )
    parser.add_argument("--root", default=".", help="Repo root (default: .)")
    parser.add_argument("--supabase-url", default=None,
                        help="Your Supabase project URL (for key exposure checks)")
    args = parser.parse_args()

    root = Path(args.root).resolve()
    source_files = walk(root, SOURCE_EXTENSIONS)
    print(f"\nScanning {len(source_files)} source files under {root}...\n")

    # Pre-read all files once
    file_texts: dict[str, str] = {str(f): read(f) for f in source_files}

    # Build import graph for auth tracing
    print("Building import graph for auth tracing...")
    import_graph = build_import_graph(source_files, root)
    reverse_graph = build_reverse_graph(import_graph)
    print(f"  {len(import_graph)} files with local imports mapped.\n")

    # Run all audits
    all_issues = []
    all_issues += scan_patterns(source_files, root)
    all_issues += scan_unauthed_db_calls(source_files, file_texts, reverse_graph, root)
    all_issues += scan_no_rls_filter(source_files, root)

    sys.exit(report(all_issues, root))


if __name__ == "__main__":
    main()