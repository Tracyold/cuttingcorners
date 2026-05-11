#!/usr/bin/env python3
"""
audit_dead_code.py
──────────────────
Finds code that is declared but never executed or referenced.
Distinct from audit_theatre.py (which catches no-op patterns and dead imports).
This script works at the scope level — inside functions and files.

Categories detected:

  DEAD_PARAM      — function parameter declared but never referenced in the
                    function body (comments stripped before checking)
  DEAD_VAR        — variable declared with const/let/var but never read after
                    assignment within its scope
  DEAD_BRANCH     — if/else branch whose condition is a literal (if (true),
                    if (false)) — one path is unreachable
  DEAD_RETURN     — code after a return/throw statement in the same block
                    (unreachable statements)
  DEAD_FUNCTION   — function defined but never called anywhere in the file
                    (local/non-exported functions only)

Usage:
  python scripts/audit_dead_code.py [--root PATH]

  --root   Repo root (default: current directory)

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

sys.path.insert(0, str(Path(__file__).parent.parent))
from _audit_json import add_json_arg, emit_json


# ── Config ────────────────────────────────────────────────────────────────────

DEFAULT_EXTENSIONS = {".ts", ".tsx", ".js", ".jsx"}
SKIP_DIRS = {"node_modules", ".git", "dist", "build", ".next", "coverage"}


# ── Helpers ───────────────────────────────────────────────────────────────────

def walk_files(root: Path, extensions: set[str]) -> list[Path]:
    return sorted(
        f for f in root.rglob("*")
        if f.is_file()
        and f.suffix in extensions
        and not any(s in f.parts for s in SKIP_DIRS)
    )


def read(f: Path) -> str:
    return f.read_text(encoding="utf-8", errors="replace")


def strip_comments(text: str) -> str:
    """Remove // and /* */ comments. Does not strip strings — good enough for usage checks."""
    text = re.sub(r'//[^\n]*', '', text)
    text = re.sub(r'/\*[\s\S]*?\*/', '', text)
    return text


# ── Node AST script ───────────────────────────────────────────────────────────
# Uses the TypeScript compiler API for accurate scope-aware analysis.
# Falls back to regex if Node/TypeScript is unavailable.

_NODE_SCRIPT = r"""
const fs = require('fs');
const path = require('path');

const filePath = process.argv[2];
const src = fs.readFileSync(filePath, 'utf8');

let ts;
try {
  const localTs = path.join(process.cwd(), 'node_modules', 'typescript', 'lib', 'typescript.js');
  ts = require(fs.existsSync(localTs) ? localTs : 'typescript');
} catch (e) {
  process.stdout.write(JSON.stringify({ error: 'typescript_not_found' }));
  process.exit(0);
}

const sf = ts.createSourceFile(filePath, src, ts.ScriptTarget.Latest, true);

function lineOf(pos) {
  return src.slice(0, pos).split('\n').length;
}

// Strip comments from a text block before checking identifier usage
function stripComments(text) {
  return text
    .replace(/\/\/[^\n]*/g, '')
    .replace(/\/\*[\s\S]*?\*\//g, '');
}

// Check if identifier `name` is referenced in `bodyText` (comments stripped)
function isUsed(name, bodyText) {
  const clean = stripComments(bodyText);
  const re = new RegExp('\\b' + name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b');
  return re.test(clean);
}

const FUNC_KINDS = new Set([
  ts.SyntaxKind.FunctionDeclaration,
  ts.SyntaxKind.FunctionExpression,
  ts.SyntaxKind.ArrowFunction,
  ts.SyntaxKind.MethodDeclaration,
  ts.SyntaxKind.Constructor,
  ts.SyntaxKind.GetAccessor,
  ts.SyntaxKind.SetAccessor,
]);

const deadParams   = [];
const deadVars     = [];
const deadBranches = [];
const deadReturns  = [];
const deadFns      = [];

// ── Track locally-defined non-exported function names ─────────────────────
const localFnNames = new Map(); // name → line
const calledNames  = new Set();

function collectFnNamesAndCalls(node) {
  // Local function declarations that are NOT exported
  if (node.kind === ts.SyntaxKind.FunctionDeclaration && node.name) {
    const isExported = node.modifiers &&
      node.modifiers.some(m => m.kind === ts.SyntaxKind.ExportKeyword);
    if (!isExported) {
      localFnNames.set(node.name.text, lineOf(node.pos));
    }
  }

  // Call expressions — record callee name
  if (node.kind === ts.SyntaxKind.CallExpression) {
    const expr = node.expression;
    if (expr.kind === ts.SyntaxKind.Identifier) {
      calledNames.add(expr.text);
    }
    // Also handle method calls: foo.bar() — record bar
    if (expr.kind === ts.SyntaxKind.PropertyAccessExpression && expr.name) {
      calledNames.add(expr.name.text);
    }
  }

  ts.forEachChild(node, collectFnNamesAndCalls);
}

// ── Dead parameters ───────────────────────────────────────────────────────
function checkDeadParams(node) {
  if (FUNC_KINDS.has(node.kind) && node.body) {
    const bodyText = src.slice(node.body.pos, node.body.end);

    (node.parameters || []).forEach(param => {
      // Skip 'this' — TypeScript type annotation, not a real parameter
      if (param.name.kind === ts.SyntaxKind.Identifier && param.name.text === 'this') return;
      // Skip rest params (...args) — consumed as an array implicitly
      if (param.dotDotDotToken) return;
      // Skip destructured params ({ a, b }: Type) — properties are used, not the binding itself
      if (param.name.kind !== ts.SyntaxKind.Identifier) return;

      const name = param.name.text;
      if (!isUsed(name, bodyText)) {
        let fnName = '<anonymous>';
        if (node.name && node.name.text) fnName = node.name.text;
        else if (node.parent && node.parent.name && node.parent.name.text) fnName = node.parent.name.text;
        deadParams.push({ name, fnName, line: lineOf(param.name.pos) });
      }
    });
  }
  ts.forEachChild(node, checkDeadParams);
}

// ── Dead variables ────────────────────────────────────────────────────────
// Finds const/let/var declarations whose name is never read after declaration.
function checkDeadVars(node) {
  if (
    node.kind === ts.SyntaxKind.VariableStatement &&
    node.declarationList
  ) {
    // Only check inside function bodies (not module-level — those could be exports)
    let parent = node.parent;
    const isInsideFunction = false;
    // Walk up to see if we're inside a function body
    let p = node.parent;
    let insideFn = false;
    while (p) {
      if (FUNC_KINDS.has(p.kind)) { insideFn = true; break; }
      p = p.parent;
    }
    if (!insideFn) { ts.forEachChild(node, checkDeadVars); return; }

    // Get the containing function body text (after this declaration)
    let fnBody = node.parent;
    while (fnBody && !FUNC_KINDS.has(fnBody.kind)) fnBody = fnBody.parent;
    if (!fnBody || !fnBody.body) { ts.forEachChild(node, checkDeadVars); return; }

    const fnBodyText = src.slice(node.end, fnBody.body.end);

    (node.declarationList.declarations || []).forEach(decl => {
      if (!decl.name || decl.name.kind !== ts.SyntaxKind.Identifier) return;
      const name = decl.name.text;
      if (name.startsWith('_')) return; // intentionally unused signal

      if (!isUsed(name, fnBodyText)) {
        deadVars.push({ name, line: lineOf(decl.pos) });
      }
    });
  }
  ts.forEachChild(node, checkDeadVars);
}

// ── Dead branches ─────────────────────────────────────────────────────────
function checkDeadBranches(node) {
  if (node.kind === ts.SyntaxKind.IfStatement) {
    const cond = node.expression;
    // Literal true/false conditions
    if (cond.kind === ts.SyntaxKind.TrueKeyword) {
      deadBranches.push({
        line: lineOf(node.pos),
        detail: 'if (true) — else branch is unreachable, condition is always true',
      });
    } else if (cond.kind === ts.SyntaxKind.FalseKeyword) {
      deadBranches.push({
        line: lineOf(node.pos),
        detail: 'if (false) — if branch is unreachable, condition is always false',
      });
    }
    // 0 && ... or false && ...
    if (
      cond.kind === ts.SyntaxKind.BinaryExpression &&
      cond.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken
    ) {
      const left = cond.left;
      if (left.kind === ts.SyntaxKind.FalseKeyword || (left.kind === ts.SyntaxKind.NumericLiteral && left.text === '0')) {
        deadBranches.push({
          line: lineOf(node.pos),
          detail: 'Condition left side is always falsy — right side never executes',
        });
      }
    }
  }
  ts.forEachChild(node, checkDeadBranches);
}

// ── Dead returns (unreachable code after return/throw) ────────────────────
function checkDeadReturns(node) {
  if (node.statements) {
    const stmts = Array.from(node.statements);
    for (let i = 0; i < stmts.length - 1; i++) {
      const s = stmts[i];
      if (
        s.kind === ts.SyntaxKind.ReturnStatement ||
        s.kind === ts.SyntaxKind.ThrowStatement
      ) {
        const next = stmts[i + 1];
        // Skip if the next statement is just a closing brace or another return (already flagged)
        if (next.kind !== ts.SyntaxKind.ReturnStatement) {
          deadReturns.push({
            line: lineOf(next.pos),
            detail: `Unreachable code after ${s.kind === ts.SyntaxKind.ReturnStatement ? 'return' : 'throw'} statement`,
          });
        }
        break; // Only flag the first unreachable statement per block
      }
    }
  }
  ts.forEachChild(node, checkDeadReturns);
}

// ── Run all checks ────────────────────────────────────────────────────────
collectFnNamesAndCalls(sf);
checkDeadParams(sf);
checkDeadVars(sf);
checkDeadBranches(sf);
checkDeadReturns(sf);

// ── Dead functions ────────────────────────────────────────────────────────
for (const [name, line] of localFnNames.entries()) {
  if (!calledNames.has(name)) {
    deadFns.push({ name, line });
  }
}

process.stdout.write(JSON.stringify({
  deadParams,
  deadVars,
  deadBranches,
  deadReturns,
  deadFns,
}));
"""

_NODE_OK: bool | None = None
_SCRIPT_PATH: Path | None = None


def _node_available() -> bool:
    global _NODE_OK
    if _NODE_OK is None:
        try:
            subprocess.run(["node", "--version"], capture_output=True, timeout=5)
            _NODE_OK = True
        except (FileNotFoundError, subprocess.TimeoutExpired):
            _NODE_OK = False
    return _NODE_OK


def _get_script_path() -> Path:
    global _SCRIPT_PATH
    if _SCRIPT_PATH is None or not _SCRIPT_PATH.exists():
        tmp = tempfile.NamedTemporaryFile(suffix=".js", delete=False, mode="w", encoding="utf-8")
        tmp.write(_NODE_SCRIPT)
        tmp.close()
        _SCRIPT_PATH = Path(tmp.name)
    return _SCRIPT_PATH


def run_node_analysis(file_path: Path) -> dict | None:
    if not _node_available():
        return None
    try:
        result = subprocess.run(
            ["node", str(_get_script_path()), str(file_path)],
            capture_output=True, text=True, timeout=15,
            cwd=file_path.parent,
        )
        if result.returncode != 0 or not result.stdout.strip():
            return None
        data = json.loads(result.stdout)
        return None if "error" in data else data
    except (subprocess.TimeoutExpired, json.JSONDecodeError, Exception):
        return None


# ── Regex fallbacks ───────────────────────────────────────────────────────────
# Lower confidence — used when Node is unavailable.

def _regex_dead_params(text: str, rel: str) -> list[dict]:
    issues = []
    clean = strip_comments(text)
    for m in re.finditer(
        r'(?:function\s+(\w+)|(?:const|let|var)\s+(\w+)\s*=\s*(?:async\s*)?(?:function\s*)?)'
        r'\s*\(([^)]{0,300})\)\s*(?::\s*[\w<>, \[\]|&.]+?)?\s*(?:=>)?\s*\{',
        clean
    ):
        fn_name = m.group(1) or m.group(2) or '<anonymous>'
        params_str = m.group(3)
        fn_start = m.end()
        depth, pos = 1, fn_start
        while pos < len(clean) and depth > 0:
            if clean[pos] == '{': depth += 1
            elif clean[pos] == '}': depth -= 1
            pos += 1
        body = clean[fn_start:pos]
        for param in params_str.split(','):
            name = re.split(r'[=:?{]', param.strip())[0].strip().lstrip('.')
            if not name or not re.match(r'^[a-zA-Z_]\w*$', name):
                continue
            if not re.search(r'\b' + re.escape(name) + r'\b', body):
                lineno = text[:m.start()].count('\n') + 1
                issues.append({"name": name, "fnName": fn_name, "line": lineno, "via": "regex"})
    return issues


def _regex_dead_branches(text: str) -> list[dict]:
    issues = []
    clean = strip_comments(text)
    for m in re.finditer(r'\bif\s*\(\s*(true|false|0)\s*\)', clean):
        val = m.group(1)
        lineno = clean[:m.start()].count('\n') + 1
        detail = (
            'if (true) — else branch is unreachable' if val == 'true'
            else 'if (false) — if branch is unreachable'
        )
        issues.append({"line": lineno, "detail": detail})
    return issues


def _regex_dead_returns(text: str) -> list[dict]:
    issues = []
    clean = strip_comments(text)
    lines = clean.splitlines()
    for i, line in enumerate(lines):
        stripped = line.strip()
        if re.match(r'^(?:return|throw)\b', stripped):
            for j in range(i + 1, len(lines)):
                next_line = lines[j].strip()
                if next_line and next_line not in ('}', ');', '};'):
                    issues.append({
                        "line": j + 1,
                        "detail": f"Unreachable code after {'return' if stripped.startswith('return') else 'throw'} statement",
                    })
                    break
    return issues


# ── Main audit function ───────────────────────────────────────────────────────

def audit_dead_code(files: list[Path], root: Path) -> list[dict]:
    issues = []

    for f in files:
        rel = str(f.relative_to(root)) if root in f.parents else str(f)
        data = run_node_analysis(f)

        if data:
            # ── Dead params
            for d in data.get("deadParams", []):
                issues.append({
                    "file": rel, "line": d.get("line"),
                    "category": "DEAD_PARAM",
                    "detail": f"Parameter '{d['name']}' in '{d['fnName']}' is never referenced in the function body",
                    "snippet": f"{d['fnName']}(..., {d['name']}, ...)",
                })
            # ── Dead vars
            for d in data.get("deadVars", []):
                issues.append({
                    "file": rel, "line": d.get("line"),
                    "category": "DEAD_VAR",
                    "detail": f"Variable '{d['name']}' is declared but never read after this point in its scope",
                    "snippet": d["name"],
                })
            # ── Dead branches
            for d in data.get("deadBranches", []):
                issues.append({
                    "file": rel, "line": d.get("line"),
                    "category": "DEAD_BRANCH",
                    "detail": d["detail"],
                })
            # ── Dead returns
            for d in data.get("deadReturns", []):
                issues.append({
                    "file": rel, "line": d.get("line"),
                    "category": "DEAD_RETURN",
                    "detail": d["detail"],
                })
            # ── Dead functions
            for d in data.get("deadFns", []):
                issues.append({
                    "file": rel, "line": d.get("line"),
                    "category": "DEAD_FUNCTION",
                    "detail": f"Function '{d['name']}' is defined but never called within this file",
                    "snippet": f"function {d['name']}()",
                })
        else:
            # Regex fallback
            text = read(f)
            for d in _regex_dead_params(text, rel):
                via = " (regex — verify manually)"
                issues.append({
                    "file": rel, "line": d.get("line"),
                    "category": "DEAD_PARAM",
                    "detail": f"Parameter '{d['name']}' in '{d['fnName']}' is never referenced in the function body{via}",
                    "snippet": f"{d['fnName']}(..., {d['name']}, ...)",
                })
            for d in _regex_dead_branches(text):
                issues.append({
                    "file": rel, "line": d.get("line"),
                    "category": "DEAD_BRANCH",
                    "detail": d["detail"] + " (regex)",
                })
            for d in _regex_dead_returns(text):
                issues.append({
                    "file": rel, "line": d.get("line"),
                    "category": "DEAD_RETURN",
                    "detail": d["detail"] + " (regex)",
                })

    return issues


# ── Reporting ─────────────────────────────────────────────────────────────────

CATEGORY_ORDER = ["DEAD_PARAM", "DEAD_VAR", "DEAD_FUNCTION", "DEAD_BRANCH", "DEAD_RETURN"]

CATEGORY_LABELS = {
    "DEAD_PARAM":    "✗ Dead Parameters (declared in signature, never used in body)",
    "DEAD_VAR":      "✗ Dead Variables (assigned but never read in scope)",
    "DEAD_FUNCTION": "✗ Dead Functions (defined but never called in this file)",
    "DEAD_BRANCH":   "⚠ Dead Branches (condition is a literal — one path unreachable)",
    "DEAD_RETURN":   "⚠ Dead Returns (unreachable code after return/throw)",
}


def report(all_issues: list[dict], root: Path) -> int:
    by_cat: dict[str, list[dict]] = defaultdict(list)
    for iss in all_issues:
        by_cat[iss["category"]].append(iss)

    total = len(all_issues)
    engine = "Node + TypeScript AST" if _node_available() else "regex fallback"

    print(f"\n{'═'*64}")
    print(f"  DEAD CODE AUDIT")
    print(f"{'═'*64}")
    print(f"  Root:   {root}")
    print(f"  Engine: {engine}")
    print(f"  Total:  {total} issue(s)")

    for cat in CATEGORY_ORDER:
        issues = by_cat.get(cat, [])
        if not issues:
            continue
        print(f"\n  {CATEGORY_LABELS.get(cat, cat)} ({len(issues)})")
        print(f"  {'─'*60}")
        for iss in issues:
            line = f":{iss['line']}" if iss.get('line') else ""
            rel = Path(iss["file"]).relative_to(root) if root in Path(iss["file"]).parents else iss["file"]
            print(f"\n    {rel}{line}")
            print(f"    → {iss['detail']}")
            if iss.get("snippet"):
                print(f"    ↳ `{iss['snippet']}`")

    print(f"\n{'═'*64}")
    if total == 0:
        print("  ✓ No dead code detected.")
    else:
        print(f"  ✗ {total} issue(s). Every item above is declared but goes nowhere.")
    print(f"{'═'*64}\n")

    return 0 if total == 0 else 1


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="Find declared-but-unused code at the scope level.")
    parser.add_argument("--root", default=".", help="Repo root (default: .)")
    parser.add_argument("--ext", nargs="+", default=None,
                        help="Extensions to scan (default: .ts .tsx .js .jsx)")
    add_json_arg(parser)
    args = parser.parse_args()

    root = Path(args.root).resolve()
    extensions = set(args.ext) if args.ext else DEFAULT_EXTENSIONS
    files = walk_files(root, extensions)

    if not getattr(args, "quiet", False):
        print(f"\nScanning {len(files)} files under {root}...")

    all_issues = audit_dead_code(files, root)

    emit_json(all_issues, args, "audit_dead_code", root)
    if not getattr(args, "quiet", False):
        sys.exit(report(all_issues, root))
    else:
        sys.exit(0 if not all_issues else 1)


if __name__ == "__main__":
    main()
