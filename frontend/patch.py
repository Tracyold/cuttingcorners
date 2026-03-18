#!/usr/bin/env python3
path = 'pages/feasibility-check.tsx'
with open(path) as f:
    content = f.read()

# wiz-stage background should be bg-deep
content = content.replace(
    '.wiz-stage {\n          flex: 1; width: 100%; max-width: 520px;\n          margin: 0 auto; padding: 0 20px 80px; text-align: left;\n          animation: accordionDown 500ms cubic-bezier(0.16,1,0.3,1) 200ms both;\n        }',
    '.wiz-stage {\n          flex: 1; width: 100%; max-width: 520px;\n          margin: 0 auto; padding: 0 20px 80px; text-align: left;\n          background: var(--bg-deep);\n          animation: accordionDown 500ms cubic-bezier(0.16,1,0.3,1) 200ms both;\n        }'
)

# Input — underline only, no box
content = content.replace(
    '.wiz-input {\n          width: 100%; background: var(--bg-card); border: 0.5px solid var(--border);\n          color: var(--text); font-family: var(--font-body); font-size: clamp(16px,2vw,18px);\n          padding: 16px 18px; border-radius: 10px; transition: border-color 200ms ease; outline: none;\n        }\n        .wiz-input::placeholder { color: var(--text-muted); opacity: 0.4; }\n        .wiz-input:focus { border-color: var(--accent); }',
    '.wiz-input {\n          width: 100%; background: transparent; border: none;\n          border-bottom: 0.5px solid var(--border);\n          color: var(--text); font-family: var(--font-body); font-size: 15px; font-weight: 300;\n          padding: 10px 0; transition: border-color 200ms ease; outline: none; border-radius: 0;\n        }\n        .wiz-input::placeholder { color: var(--text-muted); opacity: 0.3; }\n        .wiz-input:focus { border-bottom-color: rgba(255,211,105,0.5); }'
)

# Add wizFlyIn keyframe
content = content.replace(
    '@keyframes completePop {',
    '@keyframes wizFlyIn {\n          from { opacity: 0; transform: translateY(10px); }\n          to   { opacity: 1; transform: translateY(0); }\n        }\n        @keyframes completePop {'
)

with open(path, 'w') as f:
    f.write(content)
print("Done.")
