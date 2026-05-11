#!/usr/bin/env python3
"""
find_unicode.py
───────────────
Scans source files for ALL invisible, non-printing, and suspicious Unicode
characters. Catches every invisible character available — not just a fixed
list.

Detection covers:
  - Every Unicode control character (Cc category)
  - Every Unicode format character (Cf category) — zero-width, BiDi, etc.
  - Every Unicode separator character (Zs, Zl, Zp) that isn't a plain space
  - Private Use Area characters (PUA)
  - Noncharacters (U+FDD0–U+FDEF, U+FFFE, U+FFFF, etc.)
  - Variation selectors (VS1–VS256)
  - Tag characters (U+E0000 block — invisible tags)
  - Surrogate characters
  - Known homoglyphs (look like ASCII punctuation but aren't)
  - ANY non-ASCII character whose Unicode category indicates non-printing

Reports exact file, line, column, hex codepoint, Unicode name, category,
and severity.

Usage:
  python scripts/audits/find_unicode.py [--root PATH] [--file PATH] [--dir PATH]

  --root   Repo root (default: current directory)
  --file   Single file to scan (prompts if not provided)
  --dir    Scan entire directory recursively
"""

import argparse
import json
import sys
import unicodedata
from pathlib import Path
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


# ── Severity classifier ───────────────────────────────────────────────────────

SEVERITY_ICON  = {"CRITICAL": "🚨", "HIGH": "⚠ ", "MEDIUM": "·  ", "LOW": "   "}
SEVERITY_ORDER = {"CRITICAL": 0, "HIGH": 1, "MEDIUM": 2, "LOW": 3}

# Known homoglyphs that look like ASCII punctuation — always HIGH
HOMOGLYPHS: set[int] = {
    0x2018, 0x2019, 0x201A, 0x201B,   # curly single quotes
    0x201C, 0x201D, 0x201E, 0x201F,   # curly double quotes
    0x2013, 0x2014, 0x2015,            # en/em dash (look like -)
    0x2212,                             # minus sign (looks like -)
    0x2024, 0x2025, 0x2026,            # dot leaders / ellipsis
    0x00B7, 0x22C5, 0x2219,            # middle dot variants
    0x0060, 0x02BB, 0x02BC, 0x02BD,   # grave / modifier apostrophes
    0x0589, 0x05C3, 0x0703,            # colon lookalikes
    # Fullwidth ASCII homoglyphs (FF01–FF5E)
    *range(0xFF01, 0xFF5F),
    # Halfwidth forms
    *range(0xFF61, 0xFFEF),
}

# Bidirectional control — Trojan Source attack vectors
BIDI_CONTROLS: set[int] = {
    0x200E, 0x200F,                    # LRM, RLM
    0x202A, 0x202B, 0x202C,            # LRE, RLE, PDF
    0x202D, 0x202E,                    # LRO, RLO
    0x2066, 0x2067, 0x2068, 0x2069,   # LRI, RLI, FSI, PDI
}

# Variation selectors — modify preceding character's appearance, invisible alone
VARIATION_SELECTORS: set[int] = {
    *range(0xFE00, 0xFE10),    # VS1–VS16
    *range(0xE0100, 0xE01F0),  # VS17–VS256
    0xFE0E, 0xFE0F,             # text/emoji presentation selectors
}

# Tag characters — completely invisible (U+E0000 block)
TAG_CHARS: set[int] = set(range(0xE0000, 0xE0080))

# Noncharacters — should never appear in text
NONCHARS: set[int] = (
    set(range(0xFDD0, 0xFDF0)) |
    {0xFFFE, 0xFFFF, 0x1FFFE, 0x1FFFF, 0x2FFFE, 0x2FFFF,
     0x3FFFE, 0x3FFFF, 0x4FFFE, 0x4FFFF, 0x5FFFE, 0x5FFFF,
     0x6FFFE, 0x6FFFF, 0x7FFFE, 0x7FFFF, 0x8FFFE, 0x8FFFF,
     0x9FFFE, 0x9FFFF, 0xAFFFE, 0xAFFFF, 0xBFFFE, 0xBFFFF,
     0xCFFFE, 0xCFFFF, 0xDFFFE, 0xDFFFF, 0xEFFFE, 0xEFFFF,
     0xFFFFE, 0xFFFFF, 0x10FFFE, 0x10FFFF}
)


def classify(cp: int) -> tuple[str, str] | None:
    """
    Returns (severity, description) if the codepoint is suspicious,
    or None if it's a normal printable character.
    """
    ch = chr(cp)

    # Plain ASCII — skip entirely
    if cp < 0x80:
        return None

    # ── Trojan Source BiDi (CRITICAL) ────────────────────────────────────────
    if cp in BIDI_CONTROLS:
        try:
            name = unicodedata.name(ch)
        except ValueError:
            name = f"U+{cp:04X}"
        return ("CRITICAL", f"{name} — Trojan Source bidirectional control character")

    # ── Noncharacters (CRITICAL) ──────────────────────────────────────────────
    if cp in NONCHARS:
        return ("CRITICAL", f"U+{cp:04X} — Unicode noncharacter, must never appear in text")

    # ── Tag characters (CRITICAL) ─────────────────────────────────────────────
    if cp in TAG_CHARS:
        try:
            name = unicodedata.name(ch)
        except ValueError:
            name = f"TAG CHARACTER U+{cp:04X}"
        return ("CRITICAL", f"{name} — invisible tag character (U+E0000 block)")

    # ── Surrogates (CRITICAL) ─────────────────────────────────────────────────
    if 0xD800 <= cp <= 0xDFFF:
        return ("CRITICAL", f"U+{cp:04X} — surrogate character, invalid in UTF-8 text")

    # Get Unicode metadata
    try:
        cat  = unicodedata.category(ch)
        name = unicodedata.name(ch, f"U+{cp:04X}")
    except Exception:
        cat  = "??"
        name = f"U+{cp:04X}"

    # ── Format characters Cf (HIGH) ───────────────────────────────────────────
    # Includes: zero-width space, joiners, soft hyphen, BOM, Arabic letter mark, etc.
    if cat == "Cf":
        return ("HIGH", f"{name} — Unicode format character (Cf), invisible or directional")

    # ── Control characters Cc (HIGH) ──────────────────────────────────────────
    # Anything other than standard ASCII controls (already skipped above)
    if cat == "Cc":
        return ("HIGH", f"{name} — Unicode control character (Cc)")

    # ── Variation selectors (HIGH) ────────────────────────────────────────────
    if cp in VARIATION_SELECTORS:
        return ("HIGH", f"{name} — variation selector, modifies glyph rendering invisibly")

    # ── Non-ASCII spaces / separators Zs, Zl, Zp (MEDIUM) ───────────────────
    if cat in ("Zs", "Zl", "Zp") and cp != 0x0020:
        return ("MEDIUM", f"{name} — non-standard space/separator character (category {cat})")

    # ── Private Use Area (MEDIUM) ─────────────────────────────────────────────
    if (0xE000 <= cp <= 0xF8FF or
        0xF0000 <= cp <= 0xFFFFF or
        0x100000 <= cp <= 0x10FFFF):
        return ("MEDIUM", f"{name} — Private Use Area character (U+{cp:04X})")

    # ── Homoglyphs (HIGH) ─────────────────────────────────────────────────────
    if cp in HOMOGLYPHS:
        return ("HIGH", f"{name} — homoglyph: looks like ASCII punctuation but isn't")

    # ── Unassigned / Other (LOW) ──────────────────────────────────────────────
    if cat in ("Cn",):  # unassigned
        return ("LOW", f"{name} — unassigned Unicode codepoint (category {cat})")

    # ── Anything else non-ASCII that is not a printable letter/number/mark ───
    # Categories: Ll, Lu, Lt, Lm, Lo = letters (fine)
    # Nd, Nl, No = numbers (fine)
    # Pc, Pd, Pe, Pf, Pi, Po, Ps = punctuation (fine if not homoglyphs)
    # Sm, Sc, Sk, So = symbols (flag as LOW — might be intentional)
    if cat.startswith("S"):
        # Symbols — only flag if they look like they could confuse
        if cat == "So":  # other symbols
            return ("LOW", f"{name} — other symbol (U+{cp:04X}, category So)")

    return None  # normal printable character, skip


# ── Scanner ───────────────────────────────────────────────────────────────────

class Hit:
    def __init__(self, file: str, line: int, col: int,
                 char: str, codepoint: int, severity: str, description: str, category: str):
        self.file        = file
        self.line        = line
        self.col         = col
        self.char        = char
        self.codepoint   = codepoint
        self.severity    = severity
        self.description = description
        self.category    = category

    def to_dict(self) -> dict:
        return {
            "file":        self.file,
            "line":        self.line,
            "col":         self.col,
            "codepoint":   f"U+{self.codepoint:04X}",
            "category":    self.category,
            "severity":    self.severity,
            "description": self.description,
        }


def scan_file(file_path: Path, root: Path) -> list[Hit]:
    hits = []
    try:
        text = file_path.read_text(encoding="utf-8", errors="replace")
    except Exception:
        return []

    for line_no, line in enumerate(text.splitlines(), 1):
        for col_no, ch in enumerate(line, 1):
            cp = ord(ch)
            if cp < 0x80:
                continue  # plain ASCII — fast path skip

            result = classify(cp)
            if result is None:
                continue

            severity, description = result
            try:
                cat = unicodedata.category(ch)
            except Exception:
                cat = "??"

            hits.append(Hit(
                file        = str(file_path),
                line        = line_no,
                col         = col_no,
                char        = ch,
                codepoint   = cp,
                severity    = severity,
                description = description,
                category    = cat,
            ))

    return hits


SKIP_DIRS = {"node_modules", ".git", "dist", "build", ".next", "__pycache__", ".vercel"}
SOURCE_EXT = {".ts", ".tsx", ".js", ".jsx", ".py", ".css", ".scss", ".json", ".md", ".env", ".txt"}


def scan_directory(dir_path: Path, root: Path) -> list[Hit]:
    files = [
        f for f in dir_path.rglob("*")
        if f.is_file()
        and f.suffix in SOURCE_EXT
        and not any(s in f.parts for s in SKIP_DIRS)
    ]
    out(f"  Scanning {len(files)} source files...")
    all_hits = []
    for f in sorted(files):
        all_hits += scan_file(f, root)
    return all_hits


# ── Report ────────────────────────────────────────────────────────────────────

def print_report(hits: list[Hit], root: Path) -> None:
    if not hits:
        out()
        out("  ✓ No invisible or suspicious Unicode characters found.")
        return

    by_severity: dict[str, list[Hit]] = {s: [] for s in SEVERITY_ORDER}
    for h in hits:
        by_severity.setdefault(h.severity, []).append(h)

    counts  = {s: len(v) for s, v in by_severity.items() if v}
    summary = "  ".join(f"{SEVERITY_ICON[s]}{s}: {n}" for s, n in counts.items())

    section(f"INVISIBLE UNICODE FOUND — {len(hits)} hit(s)")
    out()
    out(f"  {summary}")
    out()

    for severity in ("CRITICAL", "HIGH", "MEDIUM", "LOW"):
        group = by_severity.get(severity, [])
        if not group:
            continue

        out(f"  {'─'*4} {severity} ({len(group)}) {'─'*4}")
        out()

        by_file: dict[str, list[Hit]] = {}
        for h in group:
            by_file.setdefault(h.file, []).append(h)

        for file_path, file_hits in sorted(by_file.items()):
            out(f"  {rel(file_path, root)}")
            for h in sorted(file_hits, key=lambda x: (x.line, x.col)):
                icon = SEVERITY_ICON[h.severity]
                out(f"    {icon} Line {h.line:4d}  Col {h.col:3d}  U+{h.codepoint:04X}  [{h.category}]  {h.description}")
            out()


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        description="Find ALL invisible and suspicious Unicode characters in source files."
    )
    parser.add_argument("--root", default=".", help="Repo root (default: current directory)")
    parser.add_argument("--file", default=None, help="Single file to scan (prompts if not provided)")
    parser.add_argument("--dir",  default=None, help="Directory to scan recursively")
    parser.add_argument("--json", default=None, help="Write results to this JSON path")
    args = parser.parse_args()

    root     = Path(args.root).resolve()
    scan_dir = None
    target   = None

    if args.dir:
        scan_dir = Path(args.dir).resolve()
    elif args.file:
        target = Path(args.file).resolve()
    else:
        print(f"\n  Enter file or directory to scan (relative to {root}):")
        print(f"  > ", end="", flush=True)
        raw  = input().strip()
        path = (root / raw).resolve()

        if not path.exists():
            matches = list(root.rglob(Path(raw).name))
            matches = [m for m in matches if not any(s in m.parts for s in SKIP_DIRS)]
            if len(matches) == 1:
                path = matches[0]
            elif len(matches) > 1:
                print(f"\n  Multiple matches:")
                for i, m in enumerate(matches):
                    print(f"  [{i}] {m.relative_to(root)}")
                print(f"  Choose [0-{len(matches)-1}]: ", end="", flush=True)
                path = matches[int(input().strip())]

        if not path.exists():
            print(f"\n  [ERROR] Not found: {path}")
            sys.exit(1)

        if path.is_dir():
            scan_dir = path
        else:
            target = path

    if scan_dir:
        header(f"UNICODE SCANNER: {rel(str(scan_dir), root)}/", f"Root: {root}")
        out()
        hits = scan_directory(scan_dir, root)
    else:
        header(f"UNICODE SCANNER: {rel(str(target), root)}", f"Root: {root}")
        out()
        out(f"  Scanning {rel(str(target), root)} ...")
        hits = scan_file(target, root)

    out()
    print_report(hits, root)

    ts       = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
    out_path = Path(args.json).resolve() if args.json else (
        root / f"unicode-{(scan_dir or target).stem}-{ts}.json"
    )
    out_path.write_text(json.dumps([h.to_dict() for h in hits], indent=2), encoding="utf-8")
    if hits:
        out(f"  Results saved → {out_path}")
    out()


if __name__ == "__main__":
    main()