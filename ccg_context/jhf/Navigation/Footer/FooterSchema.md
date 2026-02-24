# Footer — Emergent Build Spec

*Canonical version — February 24, 2026*
*File: `CuttingCorners/components/Footer.tsx`*

-----

## Overview

A minimal two-column footer. Black background, gray text, lowercase links. Used on all public-facing pages — Landing, Shop, and Portfolio. Not shown inside the admin portal or the account user dashboard.

-----

## Layout

### Desktop (≥ 768px)

Full width, black background, hairline top border. Three visual zones stacked vertically:

1. **Tagline row** — spans full width, top of footer
1. **Two-column content row** — links left, contact info right

```
─────────────────────────────────────────────────────────────
  COLOR CONSCIOUS CAREFUL CUTTING

  Legal                         Michael Wall
  Our Structure                 480.286.4595
  Shop                          mwall@cuttingcornersgems.com
  Portfolio                     texts and emails welcome
  Sign In / Sign Up
─────────────────────────────────────────────────────────────
```

- Outer padding: `48px` horizontal, `40px` vertical
- Top border: `1px solid rgba(255,255,255,0.08)` — hairline separator from page content
- Gap between tagline row and content row: `28px`

### Mobile (< 768px)

Same structure — tagline on top, two-column content row below. Keep left/right split on the content row. Do not collapse to a single column.

```
──────────────────────────────────
  COLOR CONSCIOUS CAREFUL CUTTING

  Legal           Michael Wall
  Our Structure   480.286.4595
  Shop            mwall@cuttingcornersgems.com
  Portfolio       texts and emails
  Sign In /       welcome
  Sign Up
──────────────────────────────────
```

- Outer padding: `24px` horizontal, `32px` vertical
- Gap between tagline and content: `24px`
- Left and right columns each take ~50% width, both left-aligned within their column
- Line wrapping is acceptable on narrow screens — never truncate or hide content
- Top border same as desktop

-----

## Tagline Row

Spans the full top of the footer content area, left-aligned.

```
COLOR CONSCIOUS CAREFUL CUTTING
```

- **All caps** — always uppercase, do not lowercase
- Font: Montserrat, 11px, `letter-spacing: 0.22em`
- Color: `rgba(255,255,255,0.55)` — slightly lighter gray than the links and contact info below
- No hover effect — this is decorative text, not a link
- Displayed on both desktop and mobile

-----

## Left Column — Navigation Links

Vertical list of links, left-aligned, no bullets.

|Label            |Href            |
|-----------------|----------------|
|legal            |`/legal`        |
|our structure    |`/our-structure`|
|shop             |`/shop`         |
|portfolio        |`/portfolio`    |
|sign in / sign up|`/login`        |

- All labels **lowercase** — intentional, do not capitalize
- Font: Montserrat, 12px, `letter-spacing: 0.04em`
- Color: `rgba(255,255,255,0.40)`
- Line height: `2.0` — generous vertical spacing
- Hover: color transitions to `rgba(255,255,255,0.85)`, font-size increases to `12.5px`
- Hover transition: `color 180ms ease, font-size 150ms ease`
- No underline on default or hover
- Active page link: same appearance as hover state

-----

## Right Column — Admin Contact Info

Static contact block, left-aligned, no bullets.

```
Michael Wall
480.286.4595
mwall@cuttingcornersgems.com
texts and emails welcome
```

- “Michael Wall” — title case, color `rgba(255,255,255,0.55)`, Montserrat 12px, `letter-spacing: 0.04em`
- “480.286.4595” — `<a href="tel:4802864595">` — color `rgba(255,255,255,0.40)`, same hover as nav links
- “mwall@cuttingcornersgems.com” — `<a href="mailto:mwall@cuttingcornersgems.com">` — same color and hover
- “texts and emails welcome” — plain text, not a link, `rgba(255,255,255,0.40)`, italic, Comfortaa 11px
- Line height: `2.0` — matching left column

-----

## Background & Border

- Background: `#000000`
- Top border: `1px solid rgba(255,255,255,0.08)`
- No bottom border
- No box shadow

-----

## Fonts

Both fonts are already loaded globally — no additional import needed:

- **Montserrat** — tagline, links, contact info
- **Comfortaa** — “texts and emails welcome” line

-----

## Notes for Emergent

- “COLOR CONSCIOUS CAREFUL CUTTING” is always all caps — brand tagline, do not change the case
- Tagline color `rgba(255,255,255,0.55)` is intentionally brighter than the link/info color `rgba(255,255,255,0.40)` — preserve this distinction
- All nav labels are lowercase — intentional brand style, do not auto-capitalize
- Mobile keeps the two-column layout — do not stack into a single column
- Phone and email are anchor tags with `tel:` and `mailto:` hrefs
- “texts and emails welcome” is Comfortaa italic — not Montserrat
- Do not show this footer inside `/admin/*` routes or `/account`
- Fetch no data — this component is fully static
