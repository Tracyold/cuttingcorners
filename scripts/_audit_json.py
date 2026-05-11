#!/usr/bin/env python3
"""
_audit_json.py
──────────────
Shared utility: adds --json flag support to any audit script.

Usage in an audit script:
    from _audit_json import add_json_arg, emit_json

    parser = argparse.ArgumentParser(...)
    add_json_arg(parser)
    args = parser.parse_args()
    ...
    # After collecting all_issues:
    emit_json(all_issues, args)   # writes JSON if --json flag was passed
    sys.exit(report(all_issues))  # still prints human report to stdout

JSON schema emitted:
    {
      "schema": "audit-v1",
      "script": "audit_theatre",
      "root": "/abs/path/to/repo",
      "issues": [
        {
          "id":        "DEAD_IMPORT:src/foo.ts:12",   // unique stable key
          "file":      "src/foo.ts",                  // repo-relative
          "line":      12,                            // int or null
          "category":  "DEAD_IMPORT",
          "severity":  "LOW",                         // CRITICAL/HIGH/MEDIUM/LOW
          "detail":    "human readable explanation",
          "snippet":   "the offending code line",     // may be ""
          "fixable":   true,                          // can fix.py handle this?
          "fix_hint":  "remove the import"            // what fix.py will do
        }
      ]
    }
"""

import json
from pathlib import Path
from datetime import datetime, timezone


# ── Fixability metadata ───────────────────────────────────────────────────────
# Maps category → (fixable: bool, fix_hint: str)
# fixable=True means fix.py will attempt an automated patch.
# fixable=False means fix.py will emit a diff suggestion only.

FIXABILITY: dict[str, tuple[bool, str]] = {
    # audit_theatre categories
    "DEAD_IMPORT":          (True,  "Remove the unused import line"),
    "DEAD_PARAM":           (False, "Remove the parameter or prefix with _ if interface requires it"),
    "DEAD_VAR":             (False, "Remove the variable declaration"),
    "DEAD_BRANCH":          (False, "Remove the unreachable branch"),
    "DEAD_RETURN":          (False, "Remove the unreachable statements after return/throw"),
    "DEAD_FUNCTION":        (False, "Delete the function or export it if it belongs elsewhere"),
    "REDUNDANT_ARIA":       (True,  "Remove role=\"button\" from <button> element"),
    "DISABLED_PROP":        (True,  "Remove the prop hard-coded to false (no-op)"),
    "ALWAYS_FALSE":         (False, "Review and remove the dead conditional block"),
    "VOID_ASSIGN":          (False, "Review — likely placeholder; remove or replace"),
    "PASSTHROUGH_FN":       (False, "Review — may be intentional pass-through"),
    "ESLINT_DISABLED_FILE": (False, "Review whether the suppression is still needed"),
    "OVERRIDE_RISK":        (False, "Review spread merge — confirm override is intentional"),
    "DOUBLE_CODE":          (False, "Review — manually merge or delete the duplicate file"),
    "DEAD_EXPORT":          (False, "Verify no external consumers, then delete"),

    # audit_css categories
    "DOUBLE_DECL":          (True,  "Remove the duplicate CSS declaration (keep last)"),
    "EMPTY_RULE":           (True,  "Remove the empty CSS rule block"),
    "UNUSED_CLASS":         (False, "Verify not referenced dynamically, then delete"),
    "UNUSED_CSS_FILE":      (False, "Verify not imported dynamically, then delete"),
    "OVERRIDE":             (False, "Decide which value is intended; remove the dead one"),
    "DUPLICATE_RULE":       (False, "Merge selectors or extract a shared base rule"),
    "DEAD_VAR":             (False, "Remove the unused CSS custom property definition"),
    "UNUSED_VAR_REF":       (False, "Define the missing variable or fix the var() call"),

    # audit_security categories
    "CONSOLE_USER_DATA":    (True,  "Remove console.log() call containing sensitive data"),
    "ENV_NO_VALIDATION":    (True,  "Add ?? '' fallback to bare process.env.* access"),
    "REDUNDANT_ARIA":       (True,  "Remove redundant role attribute"),
    "TODO_SECURITY":        (False, "Address the deferred security concern"),
    "COMMENTED_CREDS":      (False, "Remove the commented credential line"),
    "HARDCODED_SECRET":     (False, "Move secret to environment variable"),
    "EVAL_USAGE":           (False, "Rewrite without eval() — no safe auto-fix"),
    "SQL_INJECTION":        (False, "Rewrite using parameterised queries"),
    "DANGEROUSHTML":        (False, "Add DOMPurify sanitization before setting innerHTML"),
    "SERVICE_ROLE_CLIENT":  (False, "Move to server-only file or API route"),
    "UNAUTHED_DB_CALL":     (False, "Add auth guard — architectural decision required"),
    "SELECT_STAR":          (False, "Replace * with explicit column list"),
    "NO_RLS_FILTER":        (False, "Add .eq('user_id', ...) filter or verify RLS policy"),
    "AUTH_ADMIN_CLIENT":    (False, "Move to server-side file only"),
    "STORAGE_NO_AUTH":      (False, "Add auth check before storage call"),
    "LOCALSTORAGE_TOKEN":   (False, "Replace localStorage with httpOnly cookie"),
    "TOKEN_IN_URL":         (False, "Remove token from URL — pass via header or cookie"),
    "MATH_RANDOM_CRYPTO":   (False, "Replace with crypto.randomUUID() or crypto.getRandomValues()"),
    "MISSING_ERROR_CATCH":  (True,  "Add { error } to the destructured Supabase response"),
    "CORS_WILDCARD":        (False, "Replace '*' with explicit allowed origin list"),
    "CRYPTO_DISABLED":      (False, "Remove rejectUnauthorized: false / enable SSL"),
}


def add_json_arg(parser) -> None:
    """Call this in any audit script's argparse setup."""
    parser.add_argument(
        "--json",
        metavar="PATH",
        default=None,
        help="Write issues as JSON to this path (e.g. --json audit-out.json). "
             "Use '-' for stdout. Human report still prints to stdout unless --quiet.",
    )
    parser.add_argument(
        "--quiet",
        action="store_true",
        help="Suppress human-readable report (useful when --json is set)",
    )


def enrich(issues: list[dict]) -> list[dict]:
    """Add id, fixable, fix_hint to each issue dict."""
    enriched = []
    for iss in issues:
        cat = iss.get("category", "UNKNOWN")
        fixable, fix_hint = FIXABILITY.get(cat, (False, "Manual review required"))
        line = iss.get("line")
        uid = f"{cat}:{iss.get('file', '')}:{line or 0}"
        enriched.append({
            "id":       uid,
            "file":     iss.get("file", ""),
            "line":     line,
            "category": cat,
            "severity": iss.get("severity", "LOW"),
            "detail":   iss.get("detail", ""),
            "snippet":  iss.get("snippet", ""),
            "fixable":  fixable,
            "fix_hint": fix_hint,
        })
    return enriched


def emit_json(issues: list[dict], args, script_name: str, root: Path) -> None:
    """If --json was passed, write enriched JSON. Always enriches in place."""
    enriched = enrich(issues)

    payload = {
        "schema":     "audit-v1",
        "script":     script_name,
        "root":       str(root),
        "generated":  datetime.now(timezone.utc).isoformat(),
        "issues":     enriched,
        "summary": {
            "total":    len(enriched),
            "fixable":  sum(1 for i in enriched if i["fixable"]),
            "manual":   sum(1 for i in enriched if not i["fixable"]),
            "by_severity": {
                s: sum(1 for i in enriched if i["severity"] == s)
                for s in ("CRITICAL", "HIGH", "MEDIUM", "LOW")
            },
        },
    }

    json_path = getattr(args, "json", None)
    if json_path:
        if json_path == "-":
            print(json.dumps(payload, indent=2))
        else:
            out = Path(json_path)
            out.parent.mkdir(parents=True, exist_ok=True)
            out.write_text(json.dumps(payload, indent=2), encoding="utf-8")
            print(f"\n[audit] JSON written to {out}  ({len(enriched)} issues)")

    # Replace the original list contents with enriched dicts
    # so the calling script's report() function gets fixable/fix_hint too
    issues.clear()
    issues.extend(enriched)