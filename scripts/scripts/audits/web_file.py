#!/usr/bin/env python3
"""
web_file.py
───────────
Starting from a source file, builds the full bidirectional connectivity web —
every file connected to it in any direction, and the specific named exports,
hooks, types, and functions that form each connection thread.

Goes both ways:
  OUTWARD  — files this file imports, files those import, and so on
  INWARD   — files that import this file, files that import those, and so on

At every edge, shows exactly WHAT is being passed: the named exports,
default exports, or types that link the two files together.

Keeps going until no new connected files remain.

Usage:
  python scripts/audits/web_file.py [--root PATH] [--file PATH] [--json PATH]

  --root   Repo root (default: current directory)
  --file   Source file to start from (prompts if not provided)
  --json   Write results to this JSON path
"""

import argparse
import json
import re
import sys
from pathlib import Path
from collections import deque
from datetime import datetime


# ── Output helpers ────────────────────────────────────────────────────────────

def out(msg: str = "") -> None:
    print(msg, flush=True)

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


# ── File resolution ───────────────────────────────────────────────────────────

def resolve_import(importer: Path, import_path: str) -> Path | None:
    """Resolve a relative import to an actual file on disk."""
    if not import_path.startswith(".") and not import_path.startswith("@/"):
        return None  # npm package — skip

    # Handle @/ alias (Next.js — maps to repo root or frontend/)
    if import_path.startswith("@/"):
        # Walk up from importer safely, try each parent as a possible root
        parents = list(importer.parents)
        for base_try in parents[1:min(len(parents), 12)]:
            for sub in ["", "frontend", "src"]:
                attempt = (base_try / sub / import_path[2:]).resolve()
                if attempt.exists():
                    return attempt
                for ext in [".ts", ".tsx", ".js", ".jsx"]:
                    p = Path(str(attempt) + ext)
                    if p.exists():
                        return p
                for ext in ["/index.ts", "/index.tsx", "/index.js", "/index.jsx"]:
                    p = Path(str(attempt) + ext)
                    if p.exists():
                        return p
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


# ── Import parsing ────────────────────────────────────────────────────────────

IMPORT_RE = re.compile(
    r"""^(?:import\s+(?:type\s+)?|@(?:import|use|forward)\s+)"""
    r"""(?:(?:\{([^}]*)\}|\*\s+as\s+(\w+)|(\w+))"""
    r"""(?:\s*,\s*\{([^}]*)\})?\s+from\s+)?"""
    r"""['"]((?:\./|\.\.\/|@\/|[^'"\n])*)['"]\s*;?""",
    re.MULTILINE
)

def parse_imports(file_path: Path) -> list[dict]:
    """Extract all imports from a file with resolved paths and named bindings."""
    try:
        text = file_path.read_text(encoding="utf-8", errors="replace")
    except Exception:
        return []

    imports = []
    for i, line in enumerate(text.splitlines(), 1):
        stripped = line.strip()
        if not (stripped.startswith("import") or stripped.startswith("@import")
                or stripped.startswith("@use") or stripped.startswith("@forward")):
            continue
        m = IMPORT_RE.match(stripped)
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
                if not part:
                    continue
                alias_m = re.match(r'(\w+)\s+as\s+(\w+)', part)
                if alias_m:
                    named.append({"original": alias_m.group(1), "alias": alias_m.group(2)})
                elif re.match(r'^\w+$', part):
                    named.append({"original": part, "alias": part})

        resolved = resolve_import(file_path, imp_path)
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
    """Extract all named and default exports from a file."""
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


# ── Codebase indexer ──────────────────────────────────────────────────────────

SKIP_DIRS = {"node_modules", ".git", "dist", "build", ".next", "__pycache__",
             ".vercel", "coverage", "out"}
SOURCE_EXT = {".ts", ".tsx", ".js", ".jsx"}

def index_codebase(root: Path) -> dict[str, list[dict]]:
    """
    Walk every source file in the repo and parse its imports.
    Returns: { file_path_str: [import_dicts] }
    Used to build the reverse index (who imports what).
    """
    out(f"  Indexing codebase at {root} ...")
    index = {}
    count = 0
    for f in root.rglob("*"):
        if any(skip in f.parts for skip in SKIP_DIRS):
            continue
        if f.suffix not in SOURCE_EXT:
            continue
        index[str(f)] = parse_imports(f)
        count += 1
    out(f"  Indexed {count} source files.")
    return index


def build_reverse_index(codebase: dict[str, list[dict]]) -> dict[str, list[dict]]:
    """
    Build reverse map: for each file, which other files import it and what they take.
    Returns: { imported_file: [ {importer, names, default, namespace, is_type, line} ] }
    """
    reverse: dict[str, list[dict]] = {}
    for importer, imports in codebase.items():
        for imp in imports:
            resolved = imp.get("resolved")
            if not resolved:
                continue
            if resolved not in reverse:
                reverse[resolved] = []
            reverse[resolved].append({
                "importer":  importer,
                "names":     imp["names"],
                "default":   imp["default"],
                "namespace": imp["namespace"],
                "is_type":   imp["is_type"],
                "line":      imp["line"],
                "raw":       imp["raw"],
            })
    return reverse


# ── Connectivity web builder ──────────────────────────────────────────────────

def build_web(start_file: Path, codebase: dict, reverse: dict) -> dict:
    """
    BFS in BOTH directions from start_file until the entire connected
    cluster is exhausted.

    Each edge records:
      - direction: "outward" (start imports target) or "inward" (target imports start)
      - names: the specific named exports passed across the edge
      - default: default export name if used
      - namespace: namespace import if used
      - is_type: whether it's a type-only import
      - line: line number in the importing file
    """
    start_key = str(start_file)
    visited:  set[str]  = set()
    edges:    list[dict] = []   # every connection found
    queue:    deque      = deque([start_key])

    while queue:
        current = queue.popleft()
        if current in visited:
            continue
        visited.add(current)
        current_path = Path(current)

        # ── OUTWARD: files this file imports ─────────────────────────────────
        for imp in codebase.get(current, []):
            resolved = imp.get("resolved")
            if not resolved:
                continue
            names_used = _format_names(imp)
            edges.append({
                "from":      current,
                "to":        resolved,
                "direction": "outward",
                "names":     imp["names"],
                "default":   imp["default"],
                "namespace": imp["namespace"],
                "is_type":   imp["is_type"],
                "line":      imp["line"],
                "raw":       imp["raw"],
                "label":     names_used,
            })
            if resolved not in visited:
                queue.append(resolved)

        # ── INWARD: files that import this file ───────────────────────────────
        for ref in reverse.get(current, []):
            importer = ref["importer"]
            names_used = _format_names(ref)
            edges.append({
                "from":      importer,
                "to":        current,
                "direction": "inward",
                "names":     ref["names"],
                "default":   ref["default"],
                "namespace": ref["namespace"],
                "is_type":   ref["is_type"],
                "line":      ref["line"],
                "raw":       ref["raw"],
                "label":     names_used,
            })
            if importer not in visited:
                queue.append(importer)

    return {
        "root_file": start_key,
        "nodes":     sorted(visited),
        "edges":     edges,
        "generated": datetime.now().__str__(),
    }


def _format_names(imp: dict) -> str:
    """Format the names being passed across an import edge into a readable label."""
    parts = []
    if imp.get("default"):
        parts.append(imp["default"])
    if imp.get("namespace"):
        parts.append(f"* as {imp['namespace']}")
    if imp.get("names"):
        named = [n["alias"] if n["alias"] != n["original"]
                 else n["original"]
                 for n in imp["names"]]
        parts.append("{ " + ", ".join(named) + " }")
    if not parts:
        return "(side-effect)"
    prefix = "type " if imp.get("is_type") else ""
    return prefix + ", ".join(parts)


# ── Report ────────────────────────────────────────────────────────────────────

def print_report(web: dict, root: Path) -> None:
    nodes = web["nodes"]
    edges = web["edges"]
    start = web["root_file"]

    # Build adjacency for display
    # outward_from[A] = [(B, label), ...]
    # inward_to[B]    = [(A, label), ...]
    outward_from: dict[str, list[tuple[str, str]]] = {}
    inward_to:    dict[str, list[tuple[str, str]]] = {}

    for e in edges:
        frm   = e["from"]
        to    = e["to"]
        label = e["label"]
        outward_from.setdefault(frm, [])
        inward_to.setdefault(to, [])
        # Deduplicate
        if (to, label) not in outward_from[frm]:
            outward_from[frm].append((to, label))
        if (frm, label) not in inward_to[to]:
            inward_to[to].append((frm, label))

    section(f"CONNECTIVITY WEB — {len(nodes)} files in cluster")
    out()
    out(f"  Root: {rel(start, root)}")
    out()

    # Print each file in the cluster with its connections
    # Start file first, then sort the rest
    ordered = [start] + sorted(n for n in nodes if n != start)

    for node in ordered:
        node_rel  = rel(node, root)
        is_root   = node == start
        marker    = "◉ ROOT" if is_root else "◌"
        out(f"  {marker}  {node_rel}")

        imports_from = outward_from.get(node, [])
        imported_by  = inward_to.get(node, [])

        if imports_from:
            out(f"       imports from:")
            for (target, label) in sorted(imports_from, key=lambda x: x[0]):
                out(f"         → {rel(target, root)}")
                out(f"              {label}")

        if imported_by:
            out(f"       imported by:")
            for (source, label) in sorted(imported_by, key=lambda x: x[0]):
                out(f"         ← {rel(source, root)}")
                out(f"              {label}")

        out()

    section("SUMMARY")
    out()
    out(f"  Files in connected cluster:  {len(nodes)}")
    out(f"  Total import connections:    {len(set((e['from'], e['to']) for e in edges))}")
    out()

    # Find the most connected files
    connection_count = {}
    for node in nodes:
        count = len(outward_from.get(node, [])) + len(inward_to.get(node, []))
        connection_count[node] = count

    top = sorted(connection_count.items(), key=lambda x: -x[1])[:5]
    out("  Most connected files:")
    for f, c in top:
        out(f"    {c:3d} connections  {rel(f, root)}")
    out()


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        description="Build the full bidirectional connectivity web from a source file."
    )
    parser.add_argument("--root", default=".", help="Repo root (default: current directory)")
    parser.add_argument("--file", default=None,  help="Source file to start from (prompts if not provided)")
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
            matches = [m for m in matches
                       if not any(s in m.parts for s in SKIP_DIRS)]
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
        f"CONNECTIVITY WEB: {target.relative_to(root)}",
        f"Root: {root}"
    )
    out()

    # ── Index entire codebase for reverse lookup ──────────────────────────────

    codebase = index_codebase(root)
    out()
    out("  Building reverse index (who imports what) ...")
    reverse  = build_reverse_index(codebase)
    out("  Done. Tracing bidirectional web ...")
    out()

    web = build_web(target, codebase, reverse)

    print_report(web, root)

    # ── JSON output ───────────────────────────────────────────────────────────

    ts = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")

    if args.json:
        out_path = Path(args.json).resolve()
    else:
        out_path = root / f"web-{target.stem}-{ts}.json"

    # Serialize with relative paths
    serializable = {
        "root_file":  rel(web["root_file"], root),
        "node_count": len(web["nodes"]),
        "nodes": [rel(n, root) for n in web["nodes"]],
        "edges": [
            {
                "from":      rel(e["from"], root),
                "to":        rel(e["to"], root),
                "direction": e["direction"],
                "label":     e["label"],
                "line":      e["line"],
                "is_type":   e["is_type"],
                "raw":       e["raw"],
            }
            for e in web["edges"]
        ],
        "generated": web["generated"],
    }

    out_path.write_text(json.dumps(serializable, indent=2), encoding="utf-8")
    out(f"  Results saved → {out_path}")
    out(f"  Run: python scripts/audits/web_file.py --root {root} --file {target.relative_to(root)}")
    out()


if __name__ == "__main__":
    main()