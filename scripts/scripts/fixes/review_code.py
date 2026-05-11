#!/usr/bin/env python3
"""
review_code.py
──────────────
Reads the JSON output from trace_file.py and reviews the code quality
of the traced files using the Claude API.

For the root file — reviews ALL code.
For dependency files — reviews only the parts that the calling chain touches.

Outputs a detailed review per function/component/hook with specific suggestions.
Results written to review-<filename>-<date>.txt in the repo root.

Usage:
  python scripts/fixes/review_code.py --trace PATH [--root PATH] [--depth N]

  --trace   Path to trace JSON from trace_file.py (required)
  --root    Repo root (default: current directory)
  --depth   How many levels deep to review (default: all)
  --file    Review a single file only (skips tracing, uses Claude directly)
"""

import argparse
import json
import re
import sys
import urllib.request
import urllib.error
from datetime import datetime
from pathlib import Path


# ── Output helpers ────────────────────────────────────────────────────────────

def out(msg: str = "", indent: int = 0) -> None:
    print("  " * indent + msg, flush=True)

def section(title: str) -> None:
    print(f"\n{'─'*66}", flush=True)
    print(f"  {title}", flush=True)
    print(f"{'─'*66}", flush=True)

def header(title: str, extra: str = "") -> None:
    print(f"\n{'═'*66}", flush=True)
    print(f"  {title}", flush=True)
    if extra: print(f"  {extra}", flush=True)
    print(f"{'═'*66}", flush=True)


# ── Code extraction ───────────────────────────────────────────────────────────

def read_file(path: str) -> str:
    try:
        return Path(path).read_text(encoding="utf-8", errors="replace")
    except Exception:
        return ""


def extract_functions(text: str) -> list[dict]:
    """
    Extract individual functions, components, hooks, and classes from source.
    Returns list of {name, code, start_line, kind}
    """
    functions = []
    lines     = text.splitlines()

    # Patterns for top-level declarations
    patterns = [
        (r'^export\s+(?:default\s+)?(?:async\s+)?function\s+(\w+)', "function"),
        (r'^export\s+const\s+(\w+)\s*=\s*(?:async\s*)?\(', "arrow_function"),
        (r'^export\s+const\s+(\w+)\s*=\s*(?:React\.)?(?:memo|forwardRef|lazy)', "component"),
        (r'^export\s+(?:default\s+)?class\s+(\w+)', "class"),
        (r'^(?:const|function)\s+(use\w+)\s*[=(]', "hook"),
        (r'^export\s+const\s+(use\w+)\s*[=(]', "hook"),
    ]
    compiled = [(re.compile(p), k) for p, k in patterns]

    i = 0
    while i < len(lines):
        line = lines[i]
        for pattern, kind in compiled:
            m = pattern.match(line.strip())
            if m:
                name       = m.group(1)
                start_line = i
                # Find the end by tracking braces
                depth    = 0
                end_line = i
                found_open = False
                for j in range(i, min(i + 500, len(lines))):
                    for ch in lines[j]:
                        if ch == '{':
                            depth += 1
                            found_open = True
                        elif ch == '}':
                            depth -= 1
                    if found_open and depth == 0:
                        end_line = j
                        break

                code = '\n'.join(lines[start_line:end_line + 1])
                functions.append({
                    "name":       name,
                    "code":       code,
                    "start_line": start_line + 1,
                    "end_line":   end_line + 1,
                    "kind":       kind,
                    "lines":      end_line - start_line + 1,
                })
                i = end_line + 1
                break
        else:
            i += 1

    return functions


def extract_used_names(imports: list[dict]) -> set[str]:
    """Get all names imported by a file."""
    names = set()
    for imp in imports:
        if imp.get("default"):
            names.add(imp["default"])
        for n in imp.get("names", []):
            names.add(n["alias"])
        if imp.get("namespace"):
            names.add(imp["namespace"])
    return names


def filter_relevant_functions(
    functions: list[dict],
    used_names: set[str],
    file_path: str,
    root_file: str,
) -> list[dict]:
    """
    For non-root files, only return functions whose names appear
    in the set of names imported by the calling file.
    """
    if file_path == root_file:
        return functions  # review everything in root file

    relevant = []
    for fn in functions:
        if fn["name"] in used_names:
            relevant.append({**fn, "relevance": "directly imported"})
        elif any(name in fn["code"] for name in used_names):
            relevant.append({**fn, "relevance": "references imported names"})

    return relevant


# ── Claude API call ───────────────────────────────────────────────────────────

def call_claude(prompt: str) -> str:
    """Call Claude API and return the text response."""
    payload = json.dumps({
        "model": "claude-sonnet-4-20250514",
        "max_tokens": 1500,
        "messages": [{"role": "user", "content": prompt}]
    }).encode("utf-8")

    req = urllib.request.Request(
        "https://api.anthropic.com/v1/messages",
        data=payload,
        headers={"Content-Type": "application/json"},
        method="POST",
    )

    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            return "".join(
                block.get("text", "")
                for block in data.get("content", [])
                if block.get("type") == "text"
            )
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8", errors="replace")
        return f"[API ERROR {e.code}] {body[:200]}"
    except Exception as e:
        return f"[ERROR] {e}"


def build_review_prompt(
    fn: dict,
    file_path: str,
    connected_to: list[str],
    imports: list[dict],
    root: Path,
) -> str:
    rel_file = str(Path(file_path).relative_to(root)) if root in Path(file_path).parents else file_path
    connections = ", ".join(
        str(Path(c).relative_to(root)) if root in Path(c).parents else c
        for c in connected_to[:5]
    )

    import_summary = ""
    if imports:
        import_lines = [f"  - {i['path']} ({', '.join(n['alias'] for n in i['names'][:3])}{'...' if len(i['names']) > 3 else ''})"
                       for i in imports[:8] if i.get('names') or i.get('default')]
        import_summary = "\nImports used:\n" + "\n".join(import_lines)

    relevance = fn.get("relevance", "root file — review everything")

    return f"""You are reviewing TypeScript/React code for robustness, correctness, and best practices.

File: {rel_file}
Function/Component: {fn['name']} ({fn['kind']}) — lines {fn['start_line']}–{fn['end_line']}
Connected to: {connections or 'root file'}
Review scope: {relevance}
{import_summary}

Code to review:
```typescript
{fn['code'][:3000]}
```

Review this code and answer:
1. Is this the most robust implementation available? What could break?
2. Are there edge cases not handled?
3. Is there a simpler, safer, or more idiomatic pattern for this in React/TypeScript?
4. Are the connections to other files ({connections}) handled correctly?
5. Specific line-by-line suggestions if needed.

Be direct and specific. If the code is solid, say so briefly. Focus on real issues."""


# ── Main review ───────────────────────────────────────────────────────────────

def review_trace(trace_data: dict, root: Path, max_depth: int | None) -> list[dict]:
    """
    For each file in the trace, extract relevant functions and review them.
    Returns list of review results.
    """
    nodes     = trace_data["nodes"]
    root_file = trace_data["root_file"]
    order     = trace_data["order"]

    reviews = []

    for file_key in order:
        node  = nodes.get(file_key, {})
        depth = node.get("depth", 0)

        if max_depth is not None and depth > max_depth:
            continue

        # Skip files with no source
        text = read_file(file_key)
        if not text.strip():
            continue

        # Get all functions/components in this file
        functions = extract_functions(text)
        if not functions:
            continue

        # For non-root files, filter to only relevant functions
        imported_by = node.get("imported_by", [])
        used_names: set[str] = set()
        for parent_key in imported_by:
            parent_node = nodes.get(parent_key, {})
            for imp in parent_node.get("imports", []):
                if imp.get("resolved") == file_key:
                    used_names |= extract_used_names([imp])

        relevant = filter_relevant_functions(functions, used_names, file_key, root_file)

        if not relevant:
            continue

        rel_path = str(Path(file_key).relative_to(root)) if root in Path(file_key).parents else file_key

        section(f"REVIEWING: {rel_path}  (depth {depth})")
        out(f"  {len(relevant)} function(s) to review")

        file_reviews = []
        for fn in relevant:
            out(f"\n  → {fn['name']} ({fn['kind']}, {fn['lines']} lines)...", end="")
            sys.stdout.flush()

            prompt = build_review_prompt(
                fn, file_key, imported_by,
                node.get("imports", []), root
            )
            review_text = call_claude(prompt)
            out(f" done")

            file_reviews.append({
                "function":  fn["name"],
                "kind":      fn["kind"],
                "file":      rel_path,
                "depth":     depth,
                "lines":     f"{fn['start_line']}–{fn['end_line']}",
                "relevance": fn.get("relevance", "root"),
                "review":    review_text,
            })

        reviews.extend(file_reviews)

    return reviews


def format_report(reviews: list[dict], trace_data: dict, root: Path) -> str:
    root_file = Path(trace_data["root_file"])
    try:
        root_rel = str(root_file.relative_to(root))
    except ValueError:
        root_rel = str(root_file)

    lines = [
        f"CODE REVIEW REPORT",
        f"{'='*66}",
        f"Root file:  {root_rel}",
        f"Generated:  {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}",
        f"Files traced: {len(trace_data['nodes'])}",
        f"Functions reviewed: {len(reviews)}",
        f"{'='*66}",
        "",
    ]

    if trace_data.get("cycles"):
        lines += [
            "⚡ CIRCULAR IMPORTS DETECTED — fix these before trusting any review:",
        ]
        for cycle in trace_data["cycles"]:
            lines.append(f"  {' → '.join(cycle)}")
        lines.append("")

    if trace_data.get("broken"):
        lines += ["✗ BROKEN IMPORTS — these files cannot resolve their dependencies:"]
        for b in trace_data["broken"]:
            lines.append(f"  {b['file']}:{b['line']} → '{b['import_path']}'")
        lines.append("")

    # Group by file
    by_file: dict[str, list[dict]] = {}
    for r in reviews:
        by_file.setdefault(r["file"], []).append(r)

    for file_path, file_reviews in by_file.items():
        lines += [
            f"{'─'*66}",
            f"FILE: {file_path}  (depth {file_reviews[0]['depth']})",
            f"{'─'*66}",
            "",
        ]
        for r in file_reviews:
            lines += [
                f"  [{r['kind'].upper()}] {r['function']}  (lines {r['lines']})",
                f"  Scope: {r['relevance']}",
                "",
            ]
            for review_line in r["review"].splitlines():
                lines.append(f"  {review_line}")
            lines.append("")

    return "\n".join(lines)


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        description="Review code quality of a traced file dependency tree using Claude."
    )
    parser.add_argument("--trace", required=True,
                        help="Path to trace JSON from trace_file.py")
    parser.add_argument("--root",  default=".",
                        help="Repo root (default: .)")
    parser.add_argument("--depth", type=int, default=None,
                        help="Max depth to review (default: all)")
    args = parser.parse_args()

    root       = Path(args.root).resolve()
    trace_path = Path(args.trace)

    if not trace_path.exists():
        print(f"\n  [ERROR] Trace file not found: {trace_path}")
        print(f"  Run: python scripts/audits/trace_file.py --root . first")
        sys.exit(1)

    trace_data = json.loads(trace_path.read_text(encoding="utf-8"))
    root_file  = Path(trace_data["root_file"])

    try:
        root_rel = str(root_file.relative_to(root))
    except ValueError:
        root_rel = str(root_file)

    header(
        f"CODE REVIEW",
        f"Root file: {root_rel}  |  Files in tree: {len(trace_data['nodes'])}"
    )

    if trace_data.get("cycles"):
        out(f"\n  ⚡ WARNING: {len(trace_data['cycles'])} circular import(s) detected.")
        out(f"  Reviews may be incomplete until cycles are resolved.\n")

    reviews = review_trace(trace_data, root, args.depth)

    # Write report
    report  = format_report(reviews, trace_data, root)
    ts      = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
    out_path = root / f"review-{root_file.stem}-{ts}.txt"
    out_path.write_text(report, encoding="utf-8")

    section("DONE")
    out(f"  Reviewed {len(reviews)} function(s) across {len(trace_data['nodes'])} file(s)")
    out(f"  Report saved → {out_path}")
    print(flush=True)


if __name__ == "__main__":
    main()
