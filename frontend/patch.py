#!/usr/bin/env python3
path = 'pages/feasibility-check.tsx'
with open(path, 'r') as f:
    content = f.read()

# 1. New title CSS — big intro size, small wizard size, smooth transition
old_title_css = (
    ".tool-title {\n"
    "          text-align: center;\n"
    "          font-family: var(--font-display);\n"
    "          font-size: clamp(32px, 6vw, 52px);\n"
    "          font-weight: 400; color: var(--text); letter-spacing: 0.04em;\n"
    "          margin: 0 0 12px;\n"
    "          animation: titleFadeIn 1000ms cubic-bezier(0.16,1,0.3,1) 200ms both;\n"
    "        }\n"
    "        .tool-rule {\n"
    "          width: 32px; height: 1px; background: var(--accent);\n"
    "          margin: 0 auto 44px;\n"
    "          animation: titleFadeIn 1000ms 500ms both;\n"
    "        }"
)
new_title_css = (
    ".tool-title {\n"
    "          text-align: center;\n"
    "          font-family: var(--font-display);\n"
    "          letter-spacing: 0.04em; font-weight: 400; color: var(--text);\n"
    "          transition: font-size 700ms cubic-bezier(0.16,1,0.3,1), margin 700ms cubic-bezier(0.16,1,0.3,1), padding 700ms cubic-bezier(0.16,1,0.3,1);\n"
    "          animation: titleFadeIn 1000ms cubic-bezier(0.16,1,0.3,1) 200ms both;\n"
    "        }\n"
    "        .tool-title.intro-size {\n"
    "          font-size: clamp(36px, 8vw, 64px);\n"
    "          margin: 0 0 16px; padding: 0;\n"
    "        }\n"
    "        .tool-title.wizard-size {\n"
    "          font-size: clamp(20px, 3.5vw, 30px);\n"
    "          margin: 0 0 8px;\n"
    "          padding: clamp(60px,10vh,90px) 0 0;\n"
    "        }\n"
    "        .tool-rule {\n"
    "          width: 32px; height: 1px; background: var(--accent);\n"
    "          transition: margin 700ms cubic-bezier(0.16,1,0.3,1);\n"
    "          animation: titleFadeIn 1000ms 500ms both;\n"
    "        }\n"
    "        .tool-rule.intro-rule { margin: 0 auto 48px; }\n"
    "        .tool-rule.wizard-rule { margin: 0 auto 24px; }"
)
content = content.replace(old_title_css, new_title_css, 1)

# 2. Add accordion keyframe
content = content.replace(
    "@keyframes completePop {",
    (
        "@keyframes accordionDown {\n"
        "          from { opacity: 0; transform: translateY(-20px); }\n"
        "          to   { opacity: 1; transform: translateY(0); }\n"
        "        }\n"
        "        @keyframes completePop {"
    ),
    1
)

# 3. wiz-stage gets accordion animation
content = content.replace(
    (
        ".wiz-stage {\n"
        "          flex: 1;\n"
        "          width: 100%; max-width: 520px;\n"
        "          margin: 0 auto;\n"
        "          padding: 0 20px 60px;\n"
        "          text-align: left;\n"
        "          animation: accordionDown 500ms cubic-bezier(0.16,1,0.3,1) both;\n"
        "        }"
    ),
    (
        ".wiz-stage {\n"
        "          flex: 1;\n"
        "          width: 100%; max-width: 520px;\n"
        "          margin: 0 auto;\n"
        "          padding: 0 20px 60px;\n"
        "          text-align: left;\n"
        "          animation: accordionDown 600ms cubic-bezier(0.16,1,0.3,1) 300ms both;\n"
        "        }"
    ),
    1
)

# Also handle if wiz-stage doesn't have accordion yet
content = content.replace(
    (
        ".wiz-stage {\n"
        "          flex: 1;\n"
        "          width: 100%; max-width: 520px;\n"
        "          margin: 0 auto;\n"
        "          padding: 32px 20px 60px;\n"
        "          text-align: left;\n"
        "        }"
    ),
    (
        ".wiz-stage {\n"
        "          flex: 1;\n"
        "          width: 100%; max-width: 520px;\n"
        "          margin: 0 auto;\n"
        "          padding: 0 20px 60px;\n"
        "          text-align: left;\n"
        "          animation: accordionDown 600ms cubic-bezier(0.16,1,0.3,1) 300ms both;\n"
        "        }"
    ),
    1
)

# 4. center-stage tighter padding
content = content.replace(
    (
        ".center-stage {\n"
        "          flex: 1; display: flex; flex-direction: column;\n"
        "          align-items: center; justify-content: center;\n"
        "          padding: 0 clamp(20px,6vw,60px) clamp(40px,8vh,80px);\n"
        "          text-align: center;\n"
        "        }"
    ),
    (
        ".center-stage {\n"
        "          flex: 1; display: flex; flex-direction: column;\n"
        "          align-items: center; justify-content: center;\n"
        "          padding: 0 clamp(20px,6vw,60px) clamp(20px,4vh,40px);\n"
        "          text-align: center;\n"
        "        }"
    ),
    1
)

# 5. Move title outside both stages as a shared element with conditional class
# Remove title from inside center-stage if it's there
content = content.replace(
    (
        "        {/* ── Intro stage — title + content centered together ── */}\n"
        "        {!inWizard && (\n"
        "          <div className=\"center-stage\">\n"
        "            <p className=\"tool-title\">The Cut Feasibility Tool</p>\n"
        "            <div className=\"tool-rule\" />"
    ),
    (
        "        {/* ── Intro stage ── */}\n"
        "        {!inWizard && (\n"
        "          <div className=\"center-stage\">"
    ),
    1
)

# Remove title from inside wizard stage if it's there
content = content.replace(
    (
        "        {/* ── Wizard stage ── */}\n"
        "        {inWizard && (\n"
        "          <div className=\"wiz-stage\">\n"
        "            <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px,4vw,36px)', fontWeight: 400, color: 'var(--text)', letterSpacing: '0.04em', textAlign: 'center', margin: '0 0 8px' }}>The Cut Feasibility Tool</p>\n"
        "            <div style={{ width: 32, height: 1, background: 'var(--accent)', margin: '0 auto 28px' }} />"
    ),
    (
        "        {/* ── Wizard stage ── */}\n"
        "        {inWizard && (\n"
        "          <div className=\"wiz-stage\">"
    ),
    1
)

# Remove standalone title block if already extracted
content = content.replace(
    (
        "        {/* Shared title — big during intro, small at top during wizard */}\n"
        "        <p className={`tool-title${inWizard ? ' wizard-size' : ' intro-size'}`}>The Cut Feasibility Tool</p>\n"
        "        <div className={`tool-rule${inWizard ? ' wizard-rule' : ' intro-rule'}`} />\n\n"
    ),
    "",
    1
)

# Now add single shared title before intro stage
content = content.replace(
    "        {/* ── Intro stage ── */}\n"
    "        {!inWizard && (\n"
    "          <div className=\"center-stage\">",
    (
        "        {/* Shared title — scales down on Begin */}\n"
        "        <p className={`tool-title${inWizard ? ' wizard-size' : ' intro-size'}`}>The Cut Feasibility Tool</p>\n"
        "        <div className={`tool-rule${inWizard ? ' wizard-rule' : ' intro-rule'}`} />\n\n"
        "        {/* ── Intro stage ── */}\n"
        "        {!inWizard && (\n"
        "          <div className=\"center-stage\">"
    ),
    1
)

# 6. Bigger fonts everywhere
content = content.replace("font-size: clamp(13px,1.8vw,27px);", "font-size: clamp(17px,2vw,20px);", 1)
content = content.replace(
    "font-size: 15px; font-weight: 500; letter-spacing: 0.08em",
    "font-size: 18px; font-weight: 500; letter-spacing: 0.05em",
    1
)
content = content.replace(
    "font-size: 14px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; transition: all 220ms ease; opacity: 0.28; cursor: not-allowed;",
    "font-size: 17px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; transition: all 220ms ease; opacity: 0.28; cursor: not-allowed;",
    1
)

with open(path, 'w') as f:
    f.write(content)

# Also bump CheckItem font
ci_path = 'components/feasibility-test/ui/CheckItem.tsx'
with open(ci_path, 'r') as f:
    ci = f.read()
ci = ci.replace("fontSize: checked ? 17 : 16,", "fontSize: checked ? 18 : 17,")
ci = ci.replace("fontSize: checked ? 13 : 12,", "fontSize: checked ? 18 : 17,")
with open(ci_path, 'w') as f:
    f.write(ci)

print("Done.")
