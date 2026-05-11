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
import json
import re
import subprocess
import sys
import tempfile
from pathlib import Path
from collections import defaultdict
from difflib import SequenceMatcher

import sys as _sys
from pathlib import Path as _Path
_sys.path.insert(0, str(_Path(__file__).parent))
from _audit_json import add_json_arg, emit_json


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


# ── AST engine selection ──────────────────────────────────────────────────────
#
# Priority:
#   1. Node + TypeScript compiler API  → most accurate for .ts/.tsx
#   2. Node + acorn (built-in capable) → accurate for .js/.jsx
#   3. Regex fallback                  → lower accuracy, no Node required

# Inline Node.js script — uses TypeScript compiler API to extract
# all named exports and all imported symbols + their usage in the file body.
# Prints JSON to stdout. Works with any tsconfig-free invocation.
_NODE_AST_SCRIPT = r"""
const fs = require('fs');
const path = require('path');

const filePath = process.argv[2];
const src = fs.readFileSync(filePath, 'utf8');

let ts;
try {
  // Try project-local typescript first, then global
  const localTs = path.join(process.cwd(), 'node_modules', 'typescript', 'lib', 'typescript.js');
  ts = require(fs.existsSync(localTs) ? localTs : 'typescript');
} catch (e) {
  process.stdout.write(JSON.stringify({ error: 'typescript_not_found' }));
  process.exit(0);
}

const sf = ts.createSourceFile(filePath, src, ts.ScriptTarget.Latest, true);

const exports_ = [];
const imports = [];   // { symbol, alias, line }
const lines = src.split('\n');

function lineOf(pos) {
  return src.slice(0, pos).split('\n').length;
}

function visit(node) {
  // export function/class/const/enum/interface/type Foo
  if (
    (node.kind === ts.SyntaxKind.FunctionDeclaration ||
     node.kind === ts.SyntaxKind.ClassDeclaration    ||
     node.kind === ts.SyntaxKind.EnumDeclaration     ||
     node.kind === ts.SyntaxKind.InterfaceDeclaration ||
     node.kind === ts.SyntaxKind.TypeAliasDeclaration) &&
    node.modifiers && node.modifiers.some(m => m.kind === ts.SyntaxKind.ExportKeyword) &&
    node.name
  ) {
    exports_.push({ name: node.name.text, line: lineOf(node.pos) });
  }

  // export const/let/var Foo
  if (node.kind === ts.SyntaxKind.VariableStatement &&
      node.modifiers && node.modifiers.some(m => m.kind === ts.SyntaxKind.ExportKeyword)) {
    (node.declarationList.declarations || []).forEach(d => {
      if (d.name && d.name.text) exports_.push({ name: d.name.text, line: lineOf(node.pos) });
    });
  }

  // export { Foo, Bar as Baz }
  if (node.kind === ts.SyntaxKind.ExportDeclaration && node.exportClause) {
    (node.exportClause.elements || []).forEach(el => {
      exports_.push({ name: (el.propertyName || el.name).text, line: lineOf(node.pos) });
    });
  }

  // import { Foo, Bar as B } from '...'  /  import Foo from '...'  /  import type { Foo }
  if (node.kind === ts.SyntaxKind.ImportDeclaration) {
    const clause = node.importClause;
    if (!clause) { ts.forEachChild(node, visit); return; }

    // default import
    if (clause.name) {
      imports.push({ symbol: clause.name.text, alias: clause.name.text, line: lineOf(node.pos) });
    }
    // named imports
    if (clause.namedBindings) {
      if (clause.namedBindings.kind === ts.SyntaxKind.NamespaceImport) {
        // import * as Foo — never dead by itself, skip
      } else {
        (clause.namedBindings.elements || []).forEach(el => {
          const alias = el.name.text;
          imports.push({ symbol: (el.propertyName || el.name).text, alias, line: lineOf(node.pos) });
        });
      }
    }
  }

  ts.forEachChild(node, visit);
}

visit(sf);

// Check which imports are used in the file body (after stripping import declarations)
// Remove all import statement lines from the source before checking usage
const importLineNos = new Set(imports.map(i => i.line - 1));
const bodyLines = lines.filter((_, i) => !importLineNos.has(i));
const body = bodyLines.join('\n');

const deadImports = imports.filter(i => {
  const re = new RegExp('\\b' + i.alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b');
  return !re.test(body);
}).map(i => ({ ...i, dead: true }));

// ── Dead parameter detection ──────────────────────────────────────────────────
// Walk all function-like nodes, extract parameter names, check each is
// referenced in the function body. Skips:
//   • params prefixed with _  (conventional "intentionally unused" signal)
//   • destructured params     (too complex to analyse safely)
//   • rest params (...args)
//   • 'this' parameter        (TypeScript type annotation, not a real param)
//   • single-letter params in callbacks (e, i, k — typically intentional)

const FUNC_KINDS = new Set([
  ts.SyntaxKind.FunctionDeclaration,
  ts.SyntaxKind.FunctionExpression,
  ts.SyntaxKind.ArrowFunction,
  ts.SyntaxKind.MethodDeclaration,
  ts.SyntaxKind.Constructor,
  ts.SyntaxKind.GetAccessor,
  ts.SyntaxKind.SetAccessor,
]);

const deadParams = [];

function collectDeadParams(node) {
  if (FUNC_KINDS.has(node.kind) && node.body) {
    const bodyText = src.slice(node.body.pos, node.body.end);
    const bodyStart = node.body.pos;

    (node.parameters || []).forEach(param => {
      // Skip 'this' pseudo-param
      if (param.name.kind === ts.SyntaxKind.Identifier && param.name.text === 'this') return;
      // Skip rest params (...args)
      if (param.dotDotDotToken) return;
      // Skip destructured params ({ a, b }: Type) — binding patterns
      if (param.name.kind !== ts.SyntaxKind.Identifier) return;

      const name = param.name.text;
      // Skip _-prefixed (intentionally unused convention)
      if (name.startsWith('_')) return;

      const re = new RegExp('\\b' + name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b');
      if (!re.test(bodyText)) {
        // Get the enclosing function name for context
        let fnName = '<anonymous>';
        if (node.name && node.name.text) fnName = node.name.text;
        else if (node.parent && node.parent.name && node.parent.name.text) fnName = node.parent.name.text;

        deadParams.push({
          name,
          fnName,
          line: lineOf(param.name.pos),
        });
      }
    });
  }
  ts.forEachChild(node, collectDeadParams);
}

collectDeadParams(sf);

process.stdout.write(JSON.stringify({ exports: exports_, imports, deadImports, deadParams }));
"""


def _node_available() -> bool:
    try:
        subprocess.run(["node", "--version"], capture_output=True, timeout=5)
        return True
    except (FileNotFoundError, subprocess.TimeoutExpired):
        return False


_NODE_OK: bool | None = None  # cached after first check
_NODE_SCRIPT_PATH: Path | None = None


def _ensure_node_script() -> Path:
    global _NODE_SCRIPT_PATH
    if _NODE_SCRIPT_PATH is None or not _NODE_SCRIPT_PATH.exists():
        tmp = tempfile.NamedTemporaryFile(suffix=".js", delete=False, mode="w", encoding="utf-8")
        tmp.write(_NODE_AST_SCRIPT)
        tmp.close()
        _NODE_SCRIPT_PATH = Path(tmp.name)
    return _NODE_SCRIPT_PATH


def ast_parse_js(file_path: Path) -> dict | None:
    """
    Parse a JS/TS file using Node + TypeScript compiler API.
    Returns dict with keys: exports, imports, deadImports.
    Returns None if Node is unavailable or TypeScript not found in project.
    """
    global _NODE_OK
    if _NODE_OK is None:
        _NODE_OK = _node_available()
    if not _NODE_OK:
        return None

    script = _ensure_node_script()
    try:
        result = subprocess.run(
            ["node", str(script), str(file_path)],
            capture_output=True, text=True, timeout=15,
            cwd=file_path.parent  # so require('typescript') resolves from project root
        )
        if result.returncode != 0 or not result.stdout.strip():
            return None
        data = json.loads(result.stdout)
        if "error" in data:
            return None
        return data
    except (subprocess.TimeoutExpired, json.JSONDecodeError, Exception):
        return None


# ── 1. Dead exports ───────────────────────────────────────────────────────────

def _regex_find_exports(text: str) -> list[dict]:
    """Regex fallback for export extraction."""
    exports = []
    for m in re.finditer(
        r'\bexport\s+(?:default\s+)?(?:function\*?|const|let|var|class|type|interface|enum)\s+(\w+)', text
    ):
        exports.append({"name": m.group(1), "line": text[:m.start()].count('\n') + 1})
    for m in re.finditer(r'\bexport\s*\{([^}]+)\}', text):
        lineno = text[:m.start()].count('\n') + 1
        for part in m.group(1).split(','):
            name = part.strip().split(' as ')[0].strip()
            if name and name != 'default':
                exports.append({"name": name, "line": lineno})
    return exports


def _regex_find_imports(text: str) -> list[dict]:
    """Regex fallback for import extraction."""
    imports = []
    for m in re.finditer(r'import\s*\{([^}]+)\}\s*from', text):
        lineno = text[:m.start()].count('\n') + 1
        for part in m.group(1).split(','):
            parts = part.strip().split(' as ')
            symbol = parts[0].strip()
            alias = parts[-1].strip()
            if alias:
                imports.append({"symbol": symbol, "alias": alias, "line": lineno})
    for m in re.finditer(r'import\s+(\w+)\s+from', text):
        lineno = text[:m.start()].count('\n') + 1
        imports.append({"symbol": m.group(1), "alias": m.group(1), "line": lineno})
    return imports


def _regex_find_dead_imports(text: str, imports: list[dict]) -> list[dict]:
    import_lines = {i["line"] for i in imports}
    body = "\n".join(
        line for i, line in enumerate(text.splitlines(), 1)
        if i not in import_lines
    )
    return [
        {**i, "dead": True} for i in imports
        if not re.search(r'\b' + re.escape(i["alias"]) + r'\b', body)
    ]


def get_file_ast(f: Path) -> dict:
    """
    Return AST data for a file. Uses the best available engine:
      .ts/.tsx/.js/.jsx → Node + TypeScript compiler API, fallback to regex
    """
    result = ast_parse_js(f)
    if result:
        return result

    # Regex fallback
    text = read(f)
    imports = _regex_find_imports(text)
    return {
        "exports": _regex_find_exports(text),
        "imports": imports,
        "deadImports": _regex_find_dead_imports(text, imports),
        "via": "regex",
    }


def build_import_index(files: list[Path]) -> dict[str, list[str]]:
    """symbol_name → list of files that import it. Uses AST where available."""
    index: dict[str, list[str]] = defaultdict(list)
    for f in files:
        data = get_file_ast(f)
        for imp in data.get("imports", []):
            index[imp["symbol"]].append(str(f))
    return index


def audit_dead_exports(files: list[Path]) -> list[dict]:
    import_index = build_import_index(files)
    issues = []

    for f in files:
        data = get_file_ast(f)
        via = data.get("via", "AST")
        for exp in data.get("exports", []):
            name = exp["name"]
            consumers = [c for c in import_index.get(name, []) if c != str(f)]
            if not consumers:
                issues.append({
                    "file": str(f),
                    "line": exp.get("line"),
                    "symbol": name,
                    "category": "DEAD_EXPORT",
                    "detail": f"'{name}' is exported but never imported by any other file"
                              + (" (regex fallback — verify manually)" if via == "regex" else ""),
                })
    return issues


# ── 2. Dead imports ───────────────────────────────────────────────────────────

def audit_dead_imports(files: list[Path]) -> list[dict]:
    issues = []
    for f in files:
        data = get_file_ast(f)
        via = data.get("via", "AST")
        for imp in data.get("deadImports", []):
            issues.append({
                "file": str(f),
                "line": imp.get("line"),
                "symbol": imp["alias"],
                "category": "DEAD_IMPORT",
                "detail": f"'{imp['alias']}' is imported but never used in this file"
                          + (" (regex fallback — verify manually)" if via == "regex" else ""),
            })
    return issues


# ── 3. Dead parameters ───────────────────────────────────────────────────────

import ast as _ast  # used only for Python file param analysis


def _python_dead_params(file_path: Path) -> list[dict]:
    """
    Use stdlib ast to find unused parameters in Python files.
    Skips _-prefixed params and *args/**kwargs.
    """
    text = read(file_path)
    try:
        tree = _ast.parse(text, filename=str(file_path))
    except SyntaxError:
        return []

    issues = []
    for node in _ast.walk(tree):
        if not isinstance(node, (_ast.FunctionDef, _ast.AsyncFunctionDef)):
            continue

        fn_name = node.name
        args = node.args

        # Collect all simple parameter names (skip *args, **kwargs, _-prefixed)
        params = []
        for arg in (args.args + args.posonlyargs + args.kwonlyargs):
            if arg.arg == 'self' or arg.arg == 'cls':
                continue
            if arg.arg.startswith('_'):
                continue
            params.append((arg.arg, arg.col_offset, arg.lineno))
        if args.vararg and not args.vararg.arg.startswith('_'):
            pass  # *args — skip, always variadic
        if args.kwarg and not args.kwarg.arg.startswith('_'):
            pass  # **kwargs — skip

        if not params:
            continue

        # Get the source of the function body only
        body_lines = text.splitlines()[node.lineno:]  # lines after def line
        # Find end of function by walking child nodes
        last_line = max(
            (getattr(child, 'end_lineno', node.lineno) for child in _ast.walk(node)),
            default=node.lineno
        )
        body_text = '\n'.join(text.splitlines()[node.lineno:last_line])

        for param_name, _, lineno in params:
            pattern = r'\b' + re.escape(param_name) + r'\b'
            if not re.search(pattern, body_text):
                issues.append({
                    "name": param_name,
                    "fnName": fn_name,
                    "line": lineno,
                    "via": "ast",
                })

    return issues


def audit_dead_params(files: list[Path], root: Path) -> list[dict]:
    """
    Find function parameters that are declared but never referenced in the
    function body. Uses Node + TypeScript AST for .ts/.tsx/.js/.jsx,
    Python ast for .py files.
    """
    issues = []

    for f in files:
        dead = []

        if f.suffix == ".py":
            dead = _python_dead_params(f)
        else:
            data = ast_parse_js(f)
            if data:
                dead = data.get("deadParams", [])
            else:
                # Regex fallback — lower confidence, only flag obvious cases
                text = read(f)
                # Match function/arrow signatures and check params in body
                for m in re.finditer(
                    r'(?:function\s+(\w+)|(?:const|let|var)\s+(\w+)\s*=\s*(?:async\s*)?)'
                    r'\s*\(([^)]{1,200})\)\s*(?::\s*\w[\w<>, |&\[\]]*?)?\s*(?:=>)?\s*\{',
                    text
                ):
                    fn_name = m.group(1) or m.group(2) or '<anonymous>'
                    params_str = m.group(3)
                    fn_start = m.end()
                    # Find the matching closing brace (rough heuristic)
                    depth = 1
                    pos = fn_start
                    while pos < len(text) and depth > 0:
                        if text[pos] == '{':
                            depth += 1
                        elif text[pos] == '}':
                            depth -= 1
                        pos += 1
                    body = text[fn_start:pos]

                    for param in params_str.split(','):
                        # Strip type annotations, defaults, destructuring
                        name = re.split(r'[=:?{]', param.strip())[0].strip()
                        name = name.lstrip('.')  # remove ... from rest params
                        if not name or not re.match(r'^[a-zA-Z_]\w*$', name):
                            continue
                        if name.startswith('_'):
                            continue
                        if not re.search(r'\b' + re.escape(name) + r'\b', body):
                            lineno = text[:m.start()].count('\n') + 1
                            dead.append({"name": name, "fnName": fn_name, "line": lineno, "via": "regex"})

        rel = str(f.relative_to(root)) if root in f.parents else str(f)
        for d in dead:
            via_note = " (regex — verify manually)" if d.get("via") == "regex" else ""
            issues.append({
                "file": rel,
                "line": d.get("line"),
                "category": "DEAD_PARAM",
                "detail": (
                    f"Parameter '{d['name']}' in '{d['fnName']}' is never referenced "
                    f"in the function body{via_note}. "
                    f"Prefix with _ if intentionally unused."
                ),
                "snippet": f"{d['fnName']}(..., {d['name']}, ...)",
            })

    return issues

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
    "DEAD_EXPORT", "DEAD_IMPORT", "DEAD_PARAM", "DOUBLE_CODE",
    "CSS_DOUBLE_DECL", "OVERRIDE_RISK",
    "DISABLED_PROP", "ALWAYS_FALSE", "VOID_ASSIGN",
    "PASSTHROUGH_FN", "REDUNDANT_ARIA", "ESLINT_DISABLED_FILE",
]

CATEGORY_LABELS = {
    "DEAD_EXPORT":        "✗ Dead Exports (exported but never imported)",
    "DEAD_IMPORT":        "✗ Dead Imports (imported but never used)",
    "DEAD_PARAM":         "✗ Dead Parameters (declared but never used in function body)",
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
    add_json_arg(parser)
    args = parser.parse_args()

    root = Path(args.root).resolve()
    extensions = set(args.ext) if args.ext else DEFAULT_EXTENSIONS
    css_files = walk_files(root, CSS_EXTENSIONS)
    src_files = walk_files(root, extensions)

    if not getattr(args, "quiet", False):
        engine = "Node + TypeScript AST" if _node_available() else "regex fallback"
        print(f"\nScanning {len(src_files)} source files and {len(css_files)} CSS files under {root}...")
        print(f"JS/TS analysis engine: {engine}")

    all_issues = []
    all_issues += audit_dead_exports(src_files)
    all_issues += audit_dead_imports(src_files)
    all_issues += audit_dead_params(src_files, root)
    all_issues += audit_noop_patterns(src_files)
    all_issues += audit_css_doubles(css_files)
    all_issues += audit_duplicates(src_files)

    emit_json(all_issues, args, "audit_theatre", root)
    if not getattr(args, "quiet", False):
        sys.exit(report(all_issues, root))
    else:
        sys.exit(0 if not all_issues else 1)


if __name__ == "__main__":
    main()