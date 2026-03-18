#!/usr/bin/env python3
import re

path = 'frontend/pages/feasibility-check.tsx'

with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# ── Strip any previous intro patches ─────────────────────────
patterns = [
    r'@keyframes flyInUp.*?\.hero-visible\s*\{[^}]+\}\s*\n',
    r'@keyframes introSlideUp.*?\.hero-visible\s*\{[^}]+\}\s*\n',
    r"const \[introPhase.*?}\s*}\s*\], \[introPhase\]\)",
    r"const \[introVisible.*?setIntroDone\(true\),\s+\d+\)\s*\}",
    r"\{introPhase !== 'done'.*?\}\)}\n+\s*<main",
    r"\{!introDone.*?\}\)}\n+\s*<main",
]
for p in patterns:
    content = re.sub(p, '<main' if 'main' in p else '', content, flags=re.DOTALL)

content = re.sub(r'className=\{`hero-wrap\$\{intro[^`]+`\}', 'className="hero-wrap"', content)
content = re.sub(r'const \[modalOpen.*?const \[modalOpen', 'const [modalOpen', content, flags=re.DOTALL)

# ── 1. Styles ─────────────────────────────────────────────────
new_styles = (
    '@keyframes flyInUp {\n'
    '          from { opacity: 0; transform: translateY(70px); }\n'
    '          to   { opacity: 1; transform: translateY(0); }\n'
    '        }\n'
    '        @keyframes flyOutUp {\n'
    '          from { opacity: 1; transform: translateY(0); }\n'
    '          to   { opacity: 0; transform: translateY(-90px); }\n'
    '        }\n'
    '        @keyframes heroReveal {\n'
    '          from { opacity: 0; }\n'
    '          to   { opacity: 1; }\n'
    '        }\n'
    '        .intro-overlay {\n'
    '          position: fixed; inset: 0; z-index: 300;\n'
    '          background: var(--bg);\n'
    '          display: flex; flex-direction: column;\n'
    '          align-items: center; justify-content: center;\n'
    '          padding: clamp(32px, 8vw, 80px);\n'
    '          text-align: center; pointer-events: none;\n'
    '        }\n'
    '        .intro-line {\n'
    '          font-family: var(--font-display);\n'
    '          font-size: clamp(22px, 4vw, 42px);\n'
    '          font-weight: 400; color: var(--text);\n'
    '          line-height: 1.4; letter-spacing: 0.02em;\n'
    '          max-width: 680px; margin: 0;\n'
    '        }\n'
    '        .intro-fly-in  { animation: flyInUp  900ms cubic-bezier(0.16,1,0.3,1) forwards; }\n'
    '        .intro-fly-out { animation: flyOutUp 650ms cubic-bezier(0.4,0,1,1)    forwards; }\n'
    '        .hero-hidden   { opacity: 0; pointer-events: none; }\n'
    '        .hero-visible  { animation: heroReveal 900ms ease forwards; }\n'
    '        '
)
content = content.replace('@keyframes heroFade', new_styles + '@keyframes heroFade', 1)

# ── 2. Add React namespace import if needed ───────────────────
if 'import React' not in content:
    content = content.replace('import { useState,', 'import React, { useState,', 1)

# ── 3. State + useEffect timing ───────────────────────────────
old_state = 'const [modalOpen, setModalOpen] = useState(false)'
new_state = (
    "const [modalOpen,  setModalOpen]  = useState(false)\n"
    "  const [introPhase, setIntroPhase] = React.useState<\n"
    "    'line1' | 'line1exit' | 'line2' | 'line2exit' | 'done'\n"
    "  >('line1')\n\n"
    "  React.useEffect(() => {\n"
    "    const t = setTimeout(() => setIntroPhase('line1exit'), 5000)\n"
    "    return () => clearTimeout(t)\n"
    "  }, [])\n\n"
    "  React.useEffect(() => {\n"
    "    if (introPhase === 'line1exit') {\n"
    "      const t = setTimeout(() => setIntroPhase('line2'), 700)\n"
    "      return () => clearTimeout(t)\n"
    "    }\n"
    "    if (introPhase === 'line2') {\n"
    "      const t = setTimeout(() => setIntroPhase('line2exit'), 3000)\n"
    "      return () => clearTimeout(t)\n"
    "    }\n"
    "    if (introPhase === 'line2exit') {\n"
    "      const t = setTimeout(() => setIntroPhase('done'), 700)\n"
    "      return () => clearTimeout(t)\n"
    "    }\n"
    "  }, [introPhase])"
)
content = content.replace(old_state, new_state, 1)

# ── 4. Overlay JSX ────────────────────────────────────────────
old_main = '<main className="hero-wrap">'
new_main = (
    "{introPhase !== 'done' && (\n"
    "        <div className=\"intro-overlay\">\n"
    "          {(introPhase === 'line1' || introPhase === 'line1exit') && (\n"
    "            <p className={`intro-line${introPhase === 'line1exit' ? ' intro-fly-out' : ' intro-fly-in'}`}>\n"
    "              This guide is an immersive, educational journey into stone evaluation\n"
    "              from a gemstone cutter&#39;s perspective.\n"
    "            </p>\n"
    "          )}\n"
    "          {(introPhase === 'line2' || introPhase === 'line2exit') && (\n"
    "            <p className={`intro-line${introPhase === 'line2exit' ? ' intro-fly-out' : ' intro-fly-in'}`}>\n"
    "              It is designed with you in mind to bridge the gap\n"
    "              between cutter and client communication.\n"
    "            </p>\n"
    "          )}\n"
    "        </div>\n"
    "      )}\n\n"
    "      <main className={`hero-wrap${introPhase === 'done' ? ' hero-visible' : ' hero-hidden'}`}>"
)
content = content.replace(old_main, new_main, 1)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Intro sequence applied successfully.")
