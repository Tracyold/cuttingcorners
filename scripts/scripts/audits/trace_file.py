#!/usr/bin/env python3
"""
find_redundant_imports.py
─────────────────────────
Prompts for a source file, traces all its imports (same as trace_file.py),
then finds redundant imports — where file A directly imports X, but A also
imports B which already imports X transitively. So A's direct import of X
is unnecessary because it already cascades in through B.

This catches "logic folding back" — the same dependency flowing into a file
through multiple paths when only one path is needed.

Usage:
  python scripts/audits/find_redundant_imports.py [--root PATH] [--file PATH] [--json PATH]

  --root   Repo root (default: current directory)
  --file   Source file to analyse (prompts if not provided)
  --json   Write results to this JSON path
"""

import argparse
import json
import re
import sys
from pathlib import Path
from collections import deque
from datetime import datetime

SKIP_DIRS         = {"node_modules", ".git", "dist", "build", ".next", "__pycache__"}
SOURCE_EXTENSIONS = {".ts", ".tsx", ".js", ".jsx", ".scss", ".css"}


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

def rel(path: str, root: Path) -> str:
    try:
        return str(Path(path).relative_to(root))
    except ValueError:
        return Path(path).name


# ── File resolution (mirrored from trace_file.py) ────────────────────────────

def resolve_import(importer: Path, import_path: str, root: Path) -> Path | None:
    if not import_path.startswith("."):
        return None
    base      = importer.parent
    candidate = (base / import_path).resolve()
    if candidate.exists() and candidate.is_file():
        return candidate
    for ext in [".ts", ".tsx", ".js", ".jsx", ".scss", ".css"]:
        p = Path(str(candidate) + ext)
        if p.exists():
            return p
    for ext in ["/index.ts", "/index.tsx", "/index.js", "/index.jsx"]:
        p = Path(str(candidate) + ext)
        if p.exists():
            return p
    return None


def parse_imports(file_path: Path, root: Path) -> list[dict]:
    try:
        text = file_path.read_text(encoding="utf-8", errors="replace")
    except Exception:
        return []

    imports   = []
    lines     = text.splitlines()
    import_re = re.compile(
        r"""^(?:import\s+(?:type\s+)?|@(?:import|use|forward)\s+)"""
        r"""(?:(?:\{([^}]*)\}|\*\s+as\s+(\w+)|(\w+))"""
        r"""(?:\s*,\s*\{([^}]*)\})?\s+from\s+)?"""
        r"""['"]((?:\./|\.\.\/|[^'"\n])*)['"]\s*;?""",
        re.MULTILINE
    )

    for i, line in enumerate(lines, 1):
        stripped = line.strip()
        if not (stripped.startswith("import") or stripped.startswith("@import")
                or stripped.startswith("@use") or stripped.startswith("@forward")):
            continue
        m = import_re.match(stripped)
        if not m:
            continue
        named_str = m.group(1) or m.group(4) or ""
        namespace = m.group(2)
        default   = m.group(3)
        imp_path  = m.group(5)
        if not imp_path:
            continue
        named = []
        if named_str:
            for part in named_str.split(","):
                part = part.strip()
                if part:
                    alias_m = re.match(r'(\w+)\s+as\s+(\w+)', part)
                    if alias_m:
                        named.append({"original": alias_m.group(1), "alias": alias_m.group(2)})
                    elif re.match(r'^\w+$', part):
                        named.append({"original": part, "alias": part})
        resolved = resolve_import(file_path, imp_path, root)
        is_type  = "type" in stripped[:20]
        imports.append({
            "raw":       stripped,
            "path":      imp_path,
            "resolved":  str(resolved) if resolved else None,
            "names":     named,
            "default":   default,
            "namespace": namespace,
            "is_type":   is_type,
            "line":      i,
        })
    return imports


def parse_exports(file_path: Path) -> list[dict]:
    try:
        text = file_path.read_text(encoding="utf-8", errors="replace")
    except Exception:
        return []
    exports = []
    for i, line in enumerate(text.splitlines(), 1):
        s = line.strip()
        if re.match(r'^export\s+default\b', s):
            exports.append({"name": "default", "line": i, "kind": "default"})
        m = re.match(
            r'^export\s+(?:default\s+)?'
            r'(?:async\s+)?(?:function\*?|class|const|let|var|type|interface|enum)\s+(\w+)', s)
        if m:
            exports.append({"name": m.group(1), "line": i, "kind": "named"})
        m = re.match(r'^export\s*\{([^}]+)\}', s)
        if m:
            for part in m.group(1).split(","):
                part = part.strip()
                alias_m = re.match(r'(\w+)\s+as\s+(\w+)', part)
                name = alias_m.group(2) if alias_m else part
                if re.match(r'^\w+$', name):
                    exports.append({"name": name, "line": i, "kind": "named"})
        m = re.match(r"^export\s+\*\s+from\s+['\"]([^'\"]+)['\"]", s)
        if m:
            exports.append({"name": "*", "line": i, "kind": "reexport", "from": m.group(1)})
    return exports


def run_trace(start_file: Path, root: Path) -> dict:
    """Recursive BFS trace — same logic as trace_file.py."""
    nodes:   dict = {}
    cycles:  list = []
    broken:  list = []
    order:   list = []
    visited: set  = set()
    queue: deque  = deque()
    queue.append((start_file, 0, None))

    while queue:
        file_path, depth, imported_by = queue.popleft()
        key = str(file_path)
        if key in visited:
            if key == str(start_file) and imported_by:
                cycles.append([imported_by, key, "back to root"])
            continue
        visited.add(key)
        order.append(key)
        imports  = parse_imports(file_path, root)
        exports  = parse_exports(file_path)
        broken_f = []
        if key not in nodes:
            nodes[key] = {
                "imports":        imports,
                "exports":        exports,
                "depth":          depth,
                "imported_by":    [],
                "broken_imports": [],
            }
        else:
            nodes[key]["depth"] = min(nodes[key]["depth"], depth)
        if imported_by:
            nodes[key]["imported_by"].append(imported_by)
        for imp in imports:
            if imp["resolved"]:
                child_key  = imp["resolved"]
                child_path = Path(child_key)
                if child_key in visited:
                    cycles.append([key, child_key])
                else:
                    queue.append((child_path, depth + 1, key))
            elif imp["path"].startswith("."):
                broken_f.append({
                    "file":        key,
                    "import_path": imp["path"],
                    "line":        imp["line"],
                    "raw":         imp["raw"],
                })
                broken.append(broken_f[-1])
        nodes[key]["broken_imports"] = broken_f

    return {
        "root_file": str(start_file),
        "nodes":     nodes,
        "cycles":    cycles,
        "broken":    broken,
        "order":     order,
        "generated": datetime.now().__str__(),
    }


# ── Transitive import map ─────────────────────────────────────────────────────

def build_transitive_map(nodes: dict) -> tuple[dict, dict]:
    direct: dict[str, set[str]] = {}
    for file_key, node in nodes.items():
        direct[file_key] = set()
        for imp in node.get("imports", []):
            resolved = imp.get("resolved")
            if resolved and resolved in nodes:
                direct[file_key].add(resolved)

    transitive: dict[str, set[str]] = {}
    for start in nodes:
        visited = set()
        queue   = deque(direct.get(start, []))
        while queue:
            current = queue.popleft()
            if current in visited or current == start:
                continue
            visited.add(current)
            for child in direct.get(current, []):
                if child not in visited:
                    queue.append(child)
        transitive[start] = visited

    return transitive, direct


# ── Redundancy detection ──────────────────────────────────────────────────────

def find_redundant_imports(nodes: dict, transitive: dict, direct: dict) -> dict:
    results = {}
    for file_key, node in nodes.items():
        file_directs = direct.get(file_key, set())
        if len(file_directs) < 2:
            continue
        redundant = []
        for imp in node.get("imports", []):
            x = imp.get("resolved")
            if not x or x not in nodes:
                continue
            providers = [
                other for other in file_directs
                if other != x and x in transitive.get(other, set())
            ]
            if providers:
                redundant.append({
                    "redundant_import":    x,
                    "already_provided_by": providers,
                    "line":                imp.get("line"),
                    "raw":                 imp.get("raw", ""),
                    "names":               imp.get("names", []),
                    "default":             imp.get("default"),
                    "is_type":             imp.get("is_type", False),
                })
        if redundant:
            results[file_key] = redundant
    return results


# ── Named export conflict check ───────────────────────────────────────────────

def check_name_conflicts(redundant_entry: dict, nodes: dict) -> str:
    x              = redundant_entry["redundant_import"]
    names          = [n["alias"] for n in redundant_entry.get("names", [])]
    default        = redundant_entry.get("default")
    imported_names = names + ([default] if default else [])
    if not imported_names:
        return ""
    providers = redundant_entry["already_provided_by"]
    all_provider_exports = set()
    for p in providers:
        for e in nodes.get(p, {}).get("exports", []):
            all_provider_exports.add(e["name"])
    missing = [n for n in imported_names if n not in all_provider_exports and n != "*"]
    if missing:
        return f"  names not re-exported by provider: {', '.join(missing)} — keep or refactor"
    return ""


# ── Report ────────────────────────────────────────────────────────────────────

def print_report(redundant_map: dict, nodes: dict, root: Path) -> None:
    if not redundant_map:
        out()
        out("  No redundant imports found.")
        return

    total = sum(len(v) for v in redundant_map.values())
    section(f"REDUNDANT IMPORTS FOUND — {total} across {len(redundant_map)} file(s)")
    out()
    out("  A 'redundant' import is one your file imports directly, but")
    out("  already receives transitively through another direct import.")
    out("  Removing it won't change behavior — the value cascades in anyway.")
    out()

    for file_key, entries in sorted(redundant_map.items(), key=lambda x: -len(x[1])):
        out(f"┌─ {rel(file_key, root)}  ({len(entries)} redundant import(s))")
        for e in entries:
            x_rel     = rel(e["redundant_import"], root)
            providers = [rel(p, root) for p in e["already_provided_by"]]
            warning   = check_name_conflicts(e, nodes)
            out(f"│")
            out(f"│  ✗ Line {e['line']}:  {e['raw']}")
            out(f"│     {x_rel}")
            out(f"│     already flows in through:")
            for p in providers:
                out(f"│       └─ {p}")
            if warning:
                out(f"│    ⚠{warning}")
            else:
                out(f"│     → safe to remove this direct import")
        out(f"└{'─'*62}")
        out()

    section("WHAT THIS MEANS")
    out()
    out("  These imports aren't bugs — your app works fine.")
    out("  But each redundant import:")
    out("    • Makes the file's dependency surface larger than needed")
    out("    • Can mislead future devs into thinking logic lives here")
    out("    • Inflates the import tree (what you saw in trace_file.py)")
    out()
    out("  SAFE TO REMOVE: imports with no warning above.")
    out("  MANUAL REVIEW:  imports with a  warning — check re-exports first.")
    out()


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        description="Find redundant transitive imports starting from a source file."
    )
    parser.add_argument("--root", default=".", help="Repo root (default: current directory)")
    parser.add_argument("--file", default=None,  help="Source file to analyse (prompts if not provided)")
    parser.add_argument("--json", default=None,  help="Write results to this JSON path")
    args = parser.parse_args()

    root = Path(args.root).resolve()

    # ── Locate source file (same pattern as trace_file.py) ───────────────────

    if args.file:
        target = Path(args.file).resolve()
    else:
        print(f"\n  Enter file to analyse (relative to {root}):")
        print(f"  > ", end="", flush=True)
        raw    = input().strip()
        target = (root / raw).resolve()
        if not target.exists():
            matches = list(root.rglob(raw))
            matches = [m for m in matches if "node_modules" not in str(m)]
            if len(matches) == 1:
                target = matches[0]
            elif len(matches) > 1:
                print(f"\n  Multiple matches:")
                for i, m in enumerate(matches):
                    print(f"  [{i}] {m.relative_to(root)}")
                print(f"  Choose [0-{len(matches)-1}]: ", end="", flush=True)
                idx    = int(input().strip())
                target = matches[idx]

    if not target.exists():
        print(f"\n  [ERROR] File not found: {target}")
        sys.exit(1)

    header(
        f"REDUNDANT IMPORT FINDER: {target.relative_to(root)}",
        f"Root: {root}"
    )
    out()
    out(f"  Tracing all imports recursively...")
    out(f"  Cycles will be flagged and stopped immediately.")
    out()

    trace_data = run_trace(target, root)
    nodes      = trace_data["nodes"]

    out(f"  Files traced:    {len(nodes)}")
    if trace_data["cycles"]:
        out(f"  Cycles found:    {len(trace_data['cycles'])} — results may be incomplete")
    if trace_data["broken"]:
        out(f"  Broken refs:     {len(trace_data['broken'])}")
    out()
    out("  Building transitive import map...")

    transitive, direct = build_transitive_map(nodes)

    out("  Scanning for redundant imports...")
    out()

    redundant_map = find_redundant_imports(nodes, transitive, direct)

    print_report(redundant_map, nodes, root)

    # ── JSON output ───────────────────────────────────────────────────────────

    ts = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")

    if args.json:
        out_path = Path(args.json).resolve()
    else:
        out_path = root / f"redundant-{target.stem}-{ts}.json"

    serializable = {}
    for file_key, entries in redundant_map.items():
        serializable[rel(file_key, root)] = [
            {
                "redundant_import":    rel(e["redundant_import"], root),
                "already_provided_by": [rel(p, root) for p in e["already_provided_by"]],
                "line":                e["line"],
                "raw":                 e["raw"],
                "warning":             check_name_conflicts(e, nodes),
            }
            for e in entries
        ]

    out_path.write_text(json.dumps(serializable, indent=2), encoding="utf-8")
    out(f"  Results saved → {out_path}")
    out(f"  Run: python scripts/audits/find_redundant_imports.py --file {target.relative_to(root)}")
    out()


if __name__ == "__main__":
    main()