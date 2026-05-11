#!/usr/bin/env python3
"""
find_unicode.py
───────────────
Scans a file or entire directory for invisible and suspicious Unicode
characters that can hide in source code and cause hard-to-find bugs.

Detects:
  - Zero-width spaces, joiners, non-joiners
  - Bidirectional control characters (Trojan Source attack vectors)
  - Non-breaking spaces masquerading as regular spaces
  - Homoglyph characters (look like ASCII but aren't)
  - Soft hyphens, word joiners, invisible separators
  - Any non-printable non-ASCII character

Reports exact file, line number, column, character name, and hex codepoint.

Usage:
  python scripts/audits/find_unicode.py [--root PATH] [--file PATH] [--dir PATH]

  --root   Repo root (default: current directory)
  --file   Single file to scan (prompts if not provided and --dir not given)
  --dir    Scan entire directory recursively
"""

import argparse
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


# ── Character definitions ─────────────────────────────────────────────────────

# Severity levels: CRITICAL, HIGH, MEDIUM, LOW
KNOWN_BAD: dict[int, tuple[str, str]] = {
    # ── Bidirectional control (Trojan Source — CRITICAL) ──────────────────────
    0x202A: ("CRITICAL", "LEFT-TO-RIGHT EMBEDDING — Trojan Source BiDi attack"),
    0x202B: ("CRITICAL", "RIGHT-TO-LEFT EMBEDDING — Trojan Source BiDi attack"),
    0x202C: ("CRITICAL", "POP DIRECTIONAL FORMATTING — Trojan Source BiDi attack"),
    0x202D: ("CRITICAL", "LEFT-TO-RIGHT OVERRIDE — Trojan Source BiDi attack"),
    0x202E: ("CRITICAL", "RIGHT-TO-LEFT OVERRIDE — Trojan Source BiDi attack"),
    0x2066: ("CRITICAL", "LEFT-TO-RIGHT ISOLATE — Trojan Source BiDi attack"),
    0x2067: ("CRITICAL", "RIGHT-TO-LEFT ISOLATE — Trojan Source BiDi attack"),
    0x2068: ("CRITICAL", "FIRST STRONG ISOLATE — Trojan Source BiDi attack"),
    0x2069: ("CRITICAL", "POP DIRECTIONAL ISOLATE — Trojan Source BiDi attack"),
    0x200F: ("CRITICAL", "RIGHT-TO-LEFT MARK — can reverse code rendering"),

    # ── Zero-width characters (HIGH) ─────────────────────────────────────────
    0x200B: ("HIGH",     "ZERO WIDTH SPACE — invisible, can break string comparisons"),
    0x200C: ("HIGH",     "ZERO WIDTH NON-JOINER — invisible character"),
    0x200D: ("HIGH",     "ZERO WIDTH JOINER — invisible character"),
    0x2060: ("HIGH",     "WORD JOINER — invisible, zero-width"),
    0xFEFF: ("HIGH",     "ZERO WIDTH NO-BREAK SPACE / BOM — unexpected BOM in middle of file"),
    0x00AD: ("HIGH",     "SOFT HYPHEN — invisible in most renderers"),

    # ── Non-breaking / special spaces (MEDIUM) ───────────────────────────────
    0x00A0: ("MEDIUM",   "NO-BREAK SPACE — looks like a space but isn't (U+00A0)"),
    0x1680: ("MEDIUM",   "OGHAM SPACE MARK — looks like a space"),
    0x2000: ("MEDIUM",   "EN QUAD — space-like"),
    0x2001: ("MEDIUM",   "EM QUAD — space-like"),
    0x2002: ("MEDIUM",   "EN SPACE — looks like a regular space"),
    0x2003: ("MEDIUM",   "EM SPACE — looks like a regular space"),
    0x2004: ("MEDIUM",   "THREE-PER-EM SPACE"),
    0x2005: ("MEDIUM",   "FOUR-PER-EM SPACE"),
    0x2006: ("MEDIUM",   "SIX-PER-EM SPACE"),
    0x2007: ("MEDIUM",   "FIGURE SPACE"),
    0x2008: ("MEDIUM",   "PUNCTUATION SPACE"),
    0x2009: ("MEDIUM",   "THIN SPACE"),
    0x200A: ("MEDIUM",   "HAIR SPACE"),
    0x200E: ("MEDIUM",   "LEFT-TO-RIGHT MARK"),
    0x202F: ("MEDIUM",   "NARROW NO-BREAK SPACE"),
    0x205F: ("MEDIUM",   "MEDIUM MATHEMATICAL SPACE"),
    0x3000: ("MEDIUM",   "IDEOGRAPHIC SPACE — full-width space"),

    # ── Homoglyphs — look like ASCII but cause bugs (HIGH) ───────────────────
    0x0060: ("LOW",      "GRAVE ACCENT — often confused with backtick"),
    0x02BB: ("HIGH",     "MODIFIER LETTER TURNED COMMA — looks like apostrophe"),
    0x02BC: ("HIGH",     "MODIFIER LETTER APOSTROPHE — looks like apostrophe"),
    0x2018: ("HIGH",     "LEFT SINGLE QUOTATION MARK — looks like apostrophe, breaks JS strings"),
    0x2019: ("HIGH",     "RIGHT SINGLE QUOTATION MARK — looks like apostrophe, breaks JS strings"),
    0x201A: ("HIGH",     "SINGLE LOW-9 QUOTATION MARK"),
    0x201B: ("HIGH",     "SINGLE HIGH-REVERSED-9 QUOTATION MARK"),
    0x201C: ("HIGH",     "LEFT DOUBLE QUOTATION MARK — looks like quote, breaks JS strings"),
    0x201D: ("HIGH",     "RIGHT DOUBLE QUOTATION MARK — looks like quote, breaks JS strings"),
    0x201E: ("HIGH",     "DOUBLE LOW-9 QUOTATION MARK"),
    0x2013: ("MEDIUM",   "EN DASH — looks like hyphen/minus"),
    0x2014: ("MEDIUM",   "EM DASH — looks like double hyphen"),
    0x2212: ("HIGH",     "MINUS SIGN — looks like hyphen-minus but isn't (breaks math)"),
    0x00B7: ("MEDIUM",   "MIDDLE DOT — looks like period"),
    0x2024: ("HIGH",     "ONE DOT LEADER — looks like period"),
    0x0589: ("HIGH",     "ARMENIAN FULL STOP — looks like colon"),
    0x05C3: ("HIGH",     "HEBREW PUNCTUATION SOF PASUQ — looks like colon"),
    0x0703: ("HIGH",     "SYRIAC SUPRALINEAR FULL STOP — looks like asterisk"),
    0xFF01: ("HIGH",     "FULLWIDTH EXCLAMATION MARK — fullwidth ASCII homoglyph"),
    0xFF08: ("HIGH",     "FULLWIDTH LEFT PARENTHESIS — fullwidth ASCII homoglyph"),
    0xFF09: ("HIGH",     "FULLWIDTH RIGHT PARENTHESIS — fullwidth ASCII homoglyph"),
    0xFF0C: ("HIGH",     "FULLWIDTH COMMA — fullwidth ASCII homoglyph"),
    0xFF0E: ("HIGH",     "FULLWIDTH FULL STOP — fullwidth ASCII homoglyph"),
    0xFF1A: ("HIGH",     "FULLWIDTH COLON — fullwidth ASCII homoglyph"),
    0xFF1B: ("HIGH",     "FULLWIDTH SEMICOLON — fullwidth ASCII homoglyph"),
    0xFF1D: ("HIGH",     "FULLWIDTH EQUALS SIGN — fullwidth ASCII homoglyph"),
    0xFF3B: ("HIGH",     "FULLWIDTH LEFT SQUARE BRACKET — fullwidth ASCII homoglyph"),
    0xFF3D: ("HIGH",     "FULLWIDTH RIGHT SQUARE BRACKET — fullwidth ASCII homoglyph"),
    0xFF5B: ("HIGH",     "FULLWIDTH LEFT CURLY BRACKET — fullwidth ASCII homoglyph"),
    0xFF5D: ("HIGH",     "FULLWIDTH RIGHT CURLY BRACKET — fullwidth ASCII homoglyph"),

    # ── Invisible separators / misc ───────────────────────────────────────────
    0x2061: ("MEDIUM",   "FUNCTION APPLICATION — invisible math operator"),
    0x2062: ("MEDIUM",   "INVISIBLE TIMES — invisible math operator"),
    0x2063: ("MEDIUM",   "INVISIBLE SEPARATOR — invisible"),
    0x2064: ("MEDIUM",   "INVISIBLE PLUS — invisible math operator"),
    0x115F: ("MEDIUM",   "HANGUL CHOSEONG FILLER — invisible"),
    0x1160: ("MEDIUM",   "HANGUL JUNGSEONG FILLER — invisible"),
    0x3164: ("MEDIUM",   "HANGUL FILLER — invisible space-like"),
    0xFFA0: ("MEDIUM",   "HALFWIDTH HANGUL FILLER — invisible"),
}

SKIP_DIRS = {"node_modules", ".git", "dist", "build", ".next", "__pycache__", ".vercel"}
SOURCE_EXT = {".ts", ".tsx", ".js", ".jsx", ".py", ".css", ".scss", ".json", ".md", ".env"}

SEVERITY_ORDER = {"CRITICAL": 0, "HIGH": 1, "MEDIUM": 2, "LOW": 3}
SEVERITY_ICON  = {"CRITICAL": "🚨", "HIGH": "⚠ ", "MEDIUM": "·  ", "LOW": "   "}


# ── Scanner ───────────────────────────────────────────────────────────────────

class Hit:
    def __init__(self, file: str, line: int, col: int,
                 char: str, codepoint: int, severity: str, description: str):
        self.file        = file
        self.line        = line
        self.col         = col
        self.char        = char
        self.codepoint   = codepoint
        self.severity    = severity
        self.description = description

    def to_dict(self) -> dict:
        return {
            "file":        self.file,
            "line":        self.line,
            "col":         self.col,
            "codepoint":   f"U+{self.codepoint:04X}",
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

            # Skip plain ASCII printable + common whitespace
            if cp < 128:
                continue

            # Known bad characters
            if cp in KNOWN_BAD:
                severity, description = KNOWN_BAD[cp]
                hits.append(Hit(
                    file        = str(file_path),
                    line        = line_no,
                    col         = col_no,
                    char        = ch,
                    codepoint   = cp,
                    severity    = severity,
                    description = description,
                ))
                continue

            # Any other non-ASCII — check Unicode category
            try:
                cat  = unicodedata.category(ch)
                name = unicodedata.name(ch, f"UNKNOWN U+{cp:04X}")
            except Exception:
                cat  = "??"
                name = f"UNKNOWN U+{cp:04X}"

            # Control characters (Cc) and format characters (Cf) are always suspicious
            if cat in ("Cc", "Cf"):
                hits.append(Hit(
                    file        = str(file_path),
                    line        = line_no,
                    col         = col_no,
                    char        = ch,
                    codepoint   = cp,
                    severity    = "HIGH",
                    description = f"{name} — Unicode control/format character (category {cat})",
                ))
            # Private use area
            elif 0xE000 <= cp <= 0xF8FF or 0xF0000 <= cp <= 0xFFFFF:
                hits.append(Hit(
                    file        = str(file_path),
                    line        = line_no,
                    col         = col_no,
                    char        = ch,
                    codepoint   = cp,
                    severity    = "MEDIUM",
                    description = f"{name} — Private Use Area character",
                ))

    return hits


def scan_directory(dir_path: Path, root: Path) -> list[Hit]:
    all_hits = []
    files    = []
    for f in dir_path.rglob("*"):
        if any(skip in f.parts for skip in SKIP_DIRS):
            continue
        if f.suffix not in SOURCE_EXT:
            continue
        if f.is_file():
            files.append(f)

    out(f"  Scanning {len(files)} source files...")
    for f in sorted(files):
        all_hits += scan_file(f, root)
    return all_hits


# ── Report ────────────────────────────────────────────────────────────────────

def print_report(hits: list[Hit], root: Path) -> None:
    if not hits:
        out()
        out("  ✓ No suspicious Unicode characters found.")
        return

    # Group by severity then file
    by_severity: dict[str, list[Hit]] = {"CRITICAL": [], "HIGH": [], "MEDIUM": [], "LOW": []}
    for h in hits:
        by_severity.setdefault(h.severity, []).append(h)

    total = len(hits)
    counts = {s: len(v) for s, v in by_severity.items() if v}
    summary = "  ".join(f"{SEVERITY_ICON[s]}{s}: {n}" for s, n in counts.items())

    section(f"INVISIBLE UNICODE FOUND — {total} hit(s)")
    out()
    out(f"  {summary}")
    out()

    for severity in ("CRITICAL", "HIGH", "MEDIUM", "LOW"):
        group = by_severity.get(severity, [])
        if not group:
            continue

        out(f"  {'─'*4} {severity} {'─'*4}")
        out()

        # Group by file within severity
        by_file: dict[str, list[Hit]] = {}
        for h in group:
            by_file.setdefault(h.file, []).append(h)

        for file_path, file_hits in sorted(by_file.items()):
            out(f"  {rel(file_path, root)}")
            for h in file_hits:
                icon = SEVERITY_ICON[h.severity]
                out(f"    {icon} Line {h.line:4d}  Col {h.col:3d}  U+{h.codepoint:04X}  {h.description}")
            out()


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        description="Find invisible and suspicious Unicode characters in source files."
    )
    parser.add_argument("--root", default=".", help="Repo root (default: current directory)")
    parser.add_argument("--file", default=None, help="Single file to scan (prompts if not provided)")
    parser.add_argument("--dir",  default=None, help="Scan entire directory recursively")
    parser.add_argument("--json", default=None, help="Write results to this JSON path")
    args = parser.parse_args()

    root = Path(args.root).resolve()

    # ── Locate target ─────────────────────────────────────────────────────────

    scan_dir  = None
    target    = None

    if args.dir:
        scan_dir = Path(args.dir).resolve()
    elif args.file:
        target = Path(args.file).resolve()
    else:
        print(f"\n  Scan a single file or entire directory?")
        print(f"  Enter file or directory (relative to {root}):")
        print(f"  > ", end="", flush=True)
        raw = input().strip()
        path = (root / raw).resolve()

        if not path.exists():
            # Fuzzy search by name
            matches = list(root.rglob(Path(raw).name))
            matches = [m for m in matches if not any(s in m.parts for s in SKIP_DIRS)]
            if len(matches) == 1:
                path = matches[0]
            elif len(matches) > 1:
                print(f"\n  Multiple matches:")
                for i, m in enumerate(matches):
                    print(f"  [{i}] {m.relative_to(root)}")
                print(f"  Choose [0-{len(matches)-1}]: ", end="", flush=True)
                idx  = int(input().strip())
                path = matches[idx]

        if not path.exists():
            print(f"\n  [ERROR] Not found: {path}")
            sys.exit(1)

        if path.is_dir():
            scan_dir = path
        else:
            target = path

    # ── Run ───────────────────────────────────────────────────────────────────

    if scan_dir:
        header(
            f"UNICODE SCANNER: {rel(str(scan_dir), root)}/",
            f"Root: {root}"
        )
        out()
        hits = scan_directory(scan_dir, root)
    else:
        header(
            f"UNICODE SCANNER: {rel(str(target), root)}",
            f"Root: {root}"
        )
        out()
        out(f"  Scanning {rel(str(target), root)} ...")
        hits = scan_file(target, root)

    out()
    print_report(hits, root)

    # ── JSON output ───────────────────────────────────────────────────────────

    import json
    ts = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")

    if args.json:
        out_path = Path(args.json).resolve()
    else:
        name     = scan_dir.name if scan_dir else target.stem
        out_path = root / f"unicode-{name}-{ts}.json"

    serializable = [h.to_dict() for h in hits]
    out_path.write_text(json.dumps(serializable, indent=2), encoding="utf-8")

    if hits:
        out(f"  Results saved → {out_path}")
    out()


if __name__ == "__main__":
    main()