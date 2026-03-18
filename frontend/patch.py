#!/usr/bin/env python3
import os, re

# Find globals css
css_path = None
for candidate in ['styles/globals.css', 'styles/global.css', 'styles/postcss.css']:
    if os.path.exists(candidate):
        css_path = candidate
        break

if not css_path:
    print("Could not find globals CSS file. Listing styles/:")
    os.system("ls styles/")
    exit(1)

print(f"Found: {css_path}")

with open(css_path) as f:
    content = f.read()

# ── 1. Add @font-face declarations at the very top ────────────
font_faces = """
@font-face {
  font-family: 'Freight Display';
  src: url('/fonts/freightdispbook-webfont.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Proxima Nova';
  src: url('/fonts/ProximaNova-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Proxima Nova';
  src: url('/fonts/ProximaNova-Semibold.ttf') format('truetype');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Proxima Nova';
  src: url('/fonts/ProximaNova-Bold.ttf') format('truetype');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Proxima Nova';
  src: url('/fonts/ProximaNova-Light.ttf') format('truetype');
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}

"""

# Add font faces at top if not already there
if 'Freight Display' not in content:
    content = font_faces + content
    print("Added @font-face declarations")
else:
    print("Font faces already present")

# ── 2. Update CSS variables ───────────────────────────────────
# Replace existing font variables
replacements = [
    # display font
    (r"--font-display:[^;]+;", "--font-display: 'Freight Display', Georgia, serif;"),
    # body font
    (r"--font-body:[^;]+;", "--font-body: 'Proxima Nova', -apple-system, sans-serif;"),
    # ui font — same as body
    (r"--font-ui:[^;]+;", "--font-ui: 'Proxima Nova', -apple-system, sans-serif;"),
]

import re
for pattern, replacement in replacements:
    if re.search(pattern, content):
        content = re.sub(pattern, replacement, content)
        print(f"Updated: {replacement[:50]}...")
    else:
        print(f"Pattern not found: {pattern}")

with open(css_path, 'w') as f:
    f.write(content)

print("\nDone. Run yarn build && yarn start to apply.")
