#!/usr/bin/env python3
"""
trace_file.py
─────────────
Prompts for a file, then recursively traces every import until
no new files remain. Detects circular imports and broken references.

Outputs:
  - Full dependency tree with depth indicators
  - Which exports each file provides and which are consumed
  - Circular import chains (flagged as bugs)
  - Broken imports (file not found / export not found)
  - A machine-readable JSON for review_code.py to consume

Usage:
  python scripts/audits/trace_file.py [--root PATH] [--file PATH] [--json PATH]

  --root   Repo root (default: current directory)
  --file   File to trace (prompts if not provided)
  --json   Write trace result to this JSON path for review_code.py
"""

import argparse
import json
import re
import sys
from pathlib import Path
from collections import defaultdict, deque
from datetime import datetime

SKIP_DIRS = {"node_modules", ".git", "dist", "build", ".next", "__pycache__"}
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


# ── File resolution ───────────────────────────────────────────────────────────

def resolve_import(importer: Path, import_path: str, root: Path) -> Path | None:
    """
    Resolve a relative or absolute import path to an actual file.
    Tries multiple extensions if none specified.
    """
    if not import_path.startswith("."):
        return None  # npm package — skip

    base = importer.parent
    candidate = (base / import_path).resolve()

    # Try exact path first
    if candidate.exists() and candidate.is_file():
        return candidate

    # Try with extensions
    for ext in [".ts", ".tsx", ".js", ".jsx", ".scss", ".css"]:
        p = Path(str(candidate) + ext)
        if p.exists():
            return p

    # Try as directory index
    for ext in ["/index.ts", "/index.tsx", "/index.js", "/index.jsx"]:
        p = Path(str(candidate) + ext)
        if p.exists():
            return p

    return None


# ── Import parsing ────────────────────────────────────────────────────────────

def parse_imports(file_path: Path, root: Path) -> list[dict]:
    """
    Extract all imports from a file.
    Returns list of dicts: {raw, path, resolved, names, default, is_type, line}
    """
    try:
        text = file_path.read_text(encoding="utf-8", errors="replace")
    except Exception:
        return []

    imports = []
    lines   = text.splitlines()

    patterns = [
        # import { A, B } from './foo'
        # import type { A } from './foo'
        # import A from './foo'
        # import * as A from './foo'
        # import './foo'
        r"^(?:import\s+(?:type\s+)?(?:\*\s+as\s+\w+|\{[^}]*\}|\w+)?\s*,?\s*(?:\{[^}]*\}|\w+)?\s+from\s+)?import\s+(?:type\s+)?['\"]([^'\"]+)['\"]",
        r"^import\s+(?:type\s+)?\{([^}]*)\}\s+from\s+['\"]([^'\"]+)['\"]",
        r"^import\s+(?:type\s+)?(\w+)(?:\s*,\s*\{([^}]*)\})?\s+from\s+['\"]([^'\"]+)['\"]",
        r"^import\s+\*\s+as\s+(\w+)\s+from\s+['\"]([^'\"]+)['\"]",
        r"^import\s+['\"]([^'\"]+)['\"]",
        # @import / @use in SCSS
        r"^@(?:import|use|forward)\s+['\"]([^'\"]+)['\"]",
    ]

    # Single unified regex approach for reliability
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

        named_str  = m.group(1) or m.group(4) or ""
        namespace  = m.group(2)
        default    = m.group(3)
        imp_path   = m.group(5)

        if not imp_path:
            continue

        # Parse named imports
        named = []
        if named_str:
            for part in named_str.split(","):
                part = part.strip()
                if part:
                    # Handle 'Foo as Bar' aliases
                    alias_m = re.match(r'(\w+)\s+as\s+(\w+)', part)
                    if alias_m:
                        named.append({"original": alias_m.group(1), "alias": alias_m.group(2)})
                    elif re.match(r'^\w+$', part):
                        named.append({"original": part, "alias": part})

        resolved = resolve_import(file_path, imp_path, root)
        is_type  = "type" in stripped[:20]

        imports.append({
            "raw":      stripped,
            "path":     imp_path,
            "resolved": str(resolved) if resolved else None,
            "names":    named,
            "default":  default,
            "namespace": namespace,
            "is_type":  is_type,
            "line":     i,
        })

    return imports


# ── Export parsing ────────────────────────────────────────────────────────────

def parse_exports(file_path: Path) -> list[dict]:
    """Extract all named and default exports from a file."""
    try:
        text = file_path.read_text(encoding="utf-8", errors="replace")
    except Exception:
        return []

    exports = []
    lines   = text.splitlines()

    for i, line in enumerate(lines, 1):
        s = line.strip()

        # export default
        if re.match(r'^export\s+default\b', s):
            exports.append({"name": "default", "line": i, "kind": "default"})

        # export function/class/const/let/var/type/interface/enum Foo
        m = re.match(
            r'^export\s+(?:default\s+)?'
            r'(?:async\s+)?(?:function\*?|class|const|let|var|type|interface|enum)\s+(\w+)',
            s
        )
        if m:
            exports.append({"name": m.group(1), "line": i, "kind": "named"})

        # export { Foo, Bar as Baz }
        m = re.match(r'^export\s*\{([^}]+)\}', s)
        if m:
            for part in m.group(1).split(","):
                part = part.strip()
                alias_m = re.match(r'(\w+)\s+as\s+(\w+)', part)
                name = alias_m.group(2) if alias_m else part
                if re.match(r'^\w+$', name):
                    exports.append({"name": name, "line": i, "kind": "named"})

        # export * from './foo'  (re-export)
        m = re.match(r'^export\s+\*\s+from\s+[\'"]([^\'"]+)[\'"]', s)
        if m:
            exports.append({"name": "*", "line": i, "kind": "reexport", "from": m.group(1)})

    return exports


# ── Recursive tracer ──────────────────────────────────────────────────────────

def trace(start_file: Path, root: Path) -> dict:
    """
    Recursively trace all imports from start_file.

    Returns:
    {
      "root_file": str,
      "nodes": {
        file_path_str: {
          "imports": [...],
          "exports": [...],
          "depth": int,
          "imported_by": [file_path_str, ...],
          "broken_imports": [...],
        }
      },
      "cycles": [[file_path_str, ...]],
      "broken": [{file, import_path, line}],
      "order": [file_path_str, ...]   # BFS order
    }
    """
    nodes:   dict[str, dict] = {}
    cycles:  list[list[str]] = []
    broken:  list[dict]      = []
    order:   list[str]       = []

    visited:  set[str] = set()
    in_stack: set[str] = set()  # for cycle detection

    queue: deque[tuple[Path, int, str | None]] = deque()
    queue.append((start_file, 0, None))

    while queue:
        file_path, depth, imported_by = queue.popleft()
        key = str(file_path)

        if key in visited:
            # Already processed — check if it creates a cycle back to start
            if key == str(start_file) and imported_by:
                cycles.append([imported_by, key, "↺ back to root"])
            continue

        visited.add(key)
        order.append(key)

        imports  = parse_imports(file_path, root)
        exports  = parse_exports(file_path)
        broken_f = []

        if key not in nodes:
            nodes[key] = {
                "imports":     imports,
                "exports":     exports,
                "depth":       depth,
                "imported_by": [],
                "broken_imports": [],
            }
        else:
            nodes[key]["depth"] = min(nodes[key]["depth"], depth)

        if imported_by:
            nodes[key]["imported_by"].append(imported_by)

        for imp in imports:
            if imp["resolved"]:
                child_key = imp["resolved"]
                if child_key in visited:
                    # Cycle detected
                    cycle_chain = [key, child_key]
                    cycles.append(cycle_chain)
                    out(f"  ⚠ CYCLE: {Path(key).name} → {Path(child_key).name}", 1)
                else:
                    child_path = Path(child_key)
                    if child_path not in [item[0] for item in queue]:
                        queue.append((child_path, depth + 1, key))
            elif imp["path"].startswith("."):
                # Relative import that didn't resolve — broken
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


# ── Report printing ───────────────────────────────────────────────────────────

def print_tree(trace_result: dict, root: Path) -> None:
    nodes     = trace_result["nodes"]
    root_file = trace_result["root_file"]
    order     = trace_result["order"]
    cycles    = trace_result["cycles"]
    broken    = trace_result["broken"]

    def rel(p: str) -> str:
        try:
            return str(Path(p).relative_to(root))
        except ValueError:
            return p

    section("DEPENDENCY TREE")
    out()

    # Print tree by depth
    for key in order:
        node  = nodes[key]
        depth = node["depth"]
        prefix = "  " * depth + ("▶ " if depth == 0 else "└─ ")
        imports_count = len([i for i in node["imports"] if i["resolved"]])
        exports_count = len(node["exports"])
        broken_count  = len(node["broken_imports"])

        flags = []
        if broken_count:  flags.append(f"⚠ {broken_count} broken import(s)")
        if key in [c[1] for c in cycles]: flags.append("⚡ in cycle")
        flag_str = "  " + "  ".join(flags) if flags else ""

        out(f"{prefix}{rel(key)}  [{imports_count} imports | {exports_count} exports]{flag_str}")

        # Show what this file imports and from where
        for imp in node["imports"]:
            if imp["resolved"]:
                names = []
                if imp["default"]:
                    names.append(imp["default"])
                if imp["names"]:
                    names += [n["alias"] for n in imp["names"]]
                if imp["namespace"]:
                    names.append(f"* as {imp['namespace']}")
                names_str = f"  ← {', '.join(names)}" if names else ""
                out(f"{'  ' * (depth+1)}  import {rel(imp['resolved'])}{names_str}  (line {imp['line']})")
            else:
                out(f"{'  ' * (depth+1)}  ✗ unresolved: {imp['path']}  (line {imp['line']})")

    # Cycles
    if cycles:
        section(f"CIRCULAR IMPORTS ({len(cycles)} found — these are bugs)")
        for cycle in cycles:
            out(f"  ⚡ {' → '.join(rel(c) for c in cycle)}")

    # Broken imports
    if broken:
        section(f"BROKEN IMPORTS ({len(broken)} found)")
        for b in broken:
            out(f"  ✗ {rel(b['file'])}:{b['line']}")
            out(f"     import '{b['import_path']}' — file not found", 1)

    # Summary
    section("SUMMARY")
    out(f"  Files traced:      {len(nodes)}")
    out(f"  Circular imports:  {len(cycles)}  {'← fix these first' if cycles else '✓'}")
    out(f"  Broken imports:    {len(broken)}  {'← fix these first' if broken else '✓'}")
    out(f"  Max depth:         {max((n['depth'] for n in nodes.values()), default=0)}")

    if not cycles and not broken:
        out(f"\n  ✓ All imports resolve correctly. Dependency tree is clean.")


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        description="Trace all imports from a file recursively. Detects cycles and broken refs."
    )
    parser.add_argument("--root", default=".", help="Repo root (default: .)")
    parser.add_argument("--file", default=None, help="File to trace (prompts if not set)")
    parser.add_argument("--json", default=None, help="Write trace JSON to this path")
    args = parser.parse_args()

    root = Path(args.root).resolve()

    # Prompt for file if not given
    if args.file:
        target = Path(args.file).resolve()
    else:
        print(f"\n  Enter file to trace (relative to {root}):")
        print(f"  > ", end="", flush=True)
        raw = input().strip()
        target = (root / raw).resolve()
        if not target.exists():
            # Try searching
            matches = list(root.rglob(raw))
            matches = [m for m in matches if "node_modules" not in str(m)]
            if len(matches) == 1:
                target = matches[0]
            elif len(matches) > 1:
                print(f"\n  Multiple matches:")
                for i, m in enumerate(matches):
                    print(f"  [{i}] {m.relative_to(root)}")
                print(f"  Choose [0-{len(matches)-1}]: ", end="", flush=True)
                idx = int(input().strip())
                target = matches[idx]

    if not target.exists():
        print(f"\n  [ERROR] File not found: {target}")
        sys.exit(1)

    header(
        f"TRACE: {target.relative_to(root)}",
        f"Root: {root}"
    )

    out(f"\n  Tracing all imports recursively...")
    out(f"  Cycles will be flagged and stopped immediately.\n")

    result = trace(target, root)

    print_tree(result, root)

    # Write JSON for review_code.py
    json_path = args.json
    if not json_path:
        ts        = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
        json_path = str(root / f"trace-{target.stem}-{ts}.json")

    Path(json_path).write_text(json.dumps(result, indent=2), encoding="utf-8")
    out(f"\n  Trace saved → {json_path}")
    out(f"  Run: python scripts/fixes/review_code.py --trace {json_path}")
    print(flush=True)


if __name__ == "__main__":
    main()
