# LandingPage — Emergent Build Spec

*Canonical version — February 24, 2026*
*File: `CuttingCorners/LandingPage/LandingPage.tsx`*

-----

## CRITICAL — Read Before Touching This File

**`LandingPage.tsx` is a complete, production-ready TypeScript React component. Do NOT rewrite it. Do NOT convert it to `.js` or `.jsx`. Do NOT change the file extension. TypeScript is required.**

Your only jobs on this file are:

1. Import and render `<TopNav />` at the very top of the `<main>` block
1. Replace the three hardcoded `customer-assets.emergentagent.com` image URLs with the correct ones (see Image URLs section below)
1. Fix the two broken hrefs (`/gallery` → `/portfolio`, `/booking` → `/shop`)

That is all. Do not restructure, reformat, or rewrite any other part of this file.

-----

## File Location

```
CuttingCorners/LandingPage/LandingPage.tsx
```

-----

## What This File Is

The public-facing landing page for Cutting Corners Gems. It is a single scrolling page with five sections. It uses Tailwind utility classes plus inline styles. It has its own `<GlobalStyles />` component at the top that injects CSS via `dangerouslySetInnerHTML`.

**Tech stack in this file:**

- React with TypeScript
- Tailwind CSS (utility classes only — no config changes needed)
- Lucide React icons
- Google Fonts: Oranienbaum, Comfortaa, Montserrat
- Vanilla JS DOM manipulation via `useEffect` + `useRef` (for scroll behavior)
- No Supabase — this page is fully static, no data fetching

-----

## Section Map

The component renders these sections in order inside `<main>`:

### 1. Hero Section

- Full viewport height (`min-height: 100svh`)
- Background: faint hero image + radial glow overlay + gradient fade
- Center: large Oranienbaum headline + tagline + subtitle
- **Desktop only** (`hidden md:flex`): “13 Years / Cutting for Seven” stat card — bottom right corner, `#0A0A0A` box, sharp corners
- **Both**: scroll indicator line at bottom center

### 2. Mobile Industry Section (`id="mobile-industry-section"`)

- **Mobile only** (`md:hidden`) — this entire section is hidden on desktop
- Shows “Industry for 13 Years / Cutting for Seven” as a full-screen centered text block
- Has a scroll-triggered gold glow animation on the numbers (`id="mobile-years"`, `id="mobile-seven"`)
- **Do not render this section on desktop — the `md:hidden` class must stay**

### 3. Philosophy Section (`id="philosophy-section"`)

- **Both desktop and mobile**
- “My Four C’s” — four lines: Color / Conscious / Careful / Cutting, each with gold first word
- Left: the four lines with scroll-reveal animation
- Right: studio photo with hover overlay (desktop) / static display (mobile)

### 4. Services Section (`id="services-section"`)

- **Desktop** (`hidden md:grid`): 3-column grid of 6 service cards, hover lift + icon glow
- **Mobile** (`md:hidden`): full-screen vertical scroll snap carousel — one card at a time, blur/focus effect on scroll
- The mobile scroll carousel has complex lock/unlock scroll behavior handled entirely in `useEffect` — do not touch this logic
- Sticky header (`id="services-sticky-header"`) stays at top on both views while scrolling through services
- **Desktop and mobile render completely different markup for this section — both must be preserved**

### 5. About Section (“The Cutter”)

- **Both desktop and mobile**
- Photo of Michael Wall (left on desktop, stacked on mobile)
- Bio text + two CTA buttons
- **Fix**: `href="/gallery"` → `href="/portfolio"`
- **Fix**: `href="tel:4802854595"` → `href="tel:4802864595"` *(confirm correct number)*

### 6. CTA Section (“Ready to Start?”)

- **Both desktop and mobile**
- Dark `#0A0A0A` background, centered headline + paragraph + button
- **Fix**: `href="/booking"` → `href="/shop"`

-----

## Mobile vs Desktop — Quick Reference

|Element                                  |Mobile                     |Desktop               |
|-----------------------------------------|---------------------------|----------------------|
|Hero stat card (“13 Years”)              |❌ Hidden (`hidden md:flex`)|✅ Shown               |
|Industry section (full screen “13 Years”)|✅ Shown (`md:hidden`)      |❌ Hidden              |
|Services grid (3 columns)                |❌ Hidden (`hidden md:grid`)|✅ Shown               |
|Services scroll carousel                 |✅ Shown (`md:hidden`)      |❌ Hidden              |
|Philosophy section                       |✅ Shown                    |✅ Shown               |
|About section                            |✅ Shown (stacked)          |✅ Shown (side by side)|
|CTA section                              |✅ Shown                    |✅ Shown               |
|TopNav                                   |✅ Shown                    |✅ Shown               |

**Never remove or change the `md:hidden` or `hidden md:*` classes — they are load-bearing.**

-----

## TopNav Integration

Add `<TopNav />` as the very first element inside `<main>`, before the hero section:

```tsx
import TopNav from '../LandingPage/TopNav'

// Inside return:
<>
  <GlobalStyles />
  <main>
    <TopNav />          {/* ← ADD THIS LINE ONLY */}
    <section           {/* hero section — unchanged */}
      style={{ minHeight: '100svh', ... }}
    >
```

The `TopNav` component is specced separately in `TopNav.md`. It is absolutely positioned so it overlays the hero without affecting layout.

-----

## Image URLs — Replace These

The three hardcoded `customer-assets.emergentagent.com` URLs are temporary job assets that will break. Replace them with the correct Supabase Storage public URLs or local asset paths once images are uploaded.

|Location in file              |Current broken URL      |Replace with             |
|------------------------------|------------------------|-------------------------|
|Hero background (line ~593)   |`yu1iknms_IMG_3821.jpeg`|Hero/background gem image|
|Philosophy section (line ~736)|`sqy5b97p_IMG_3573.jpeg`|Studio/workshop photo    |
|About section (line ~1024)    |`c2cwyfwb_IMG_5555.jpeg`|Michael Wall portrait    |

Until real URLs are available, leave the broken URLs in place — the page degrades gracefully with the overlay still showing. Do not substitute placeholder images.

-----

## Hardcoded Values — Do Not Change Unless Instructed

These are intentional and correct:

- Business name: “Cutting Corners Gems”
- Location: “Tempe, Arizona”
- Years in industry: “13 Years” / “Cutting for Seven”
- Phone display: `480-286-4595`
- Bio copy: leave exactly as written
- Service titles and descriptions: leave exactly as written
- Font stack: Oranienbaum + Comfortaa + Montserrat — do not change

-----

## Scroll Behavior — Do Not Touch

The `useEffect` hooks handle two complex behaviors:

1. **Scroll reveal** — fades in elements with `data-scroll-reveal` as they enter the viewport
1. **Mobile services carousel lock** — locks page scroll when the services section is in view, hands control to the inner carousel, then unlocks when user scrolls past first or last card

Both behaviors are implemented entirely in vanilla DOM JS inside `useEffect`. They are complete and working. Do not modify, refactor, or “improve” them.

-----

## Notes for Emergent

- File extension is `.tsx` — keep it `.tsx`, never `.js` or `.jsx`
- This file has no Supabase queries — it is 100% static
- `<GlobalStyles />` injects all CSS — do not add a separate CSS file
- Tailwind classes are used alongside inline styles — both are intentional
- The only changes needed are: add `<TopNav />`, fix 2 hrefs, replace 3 image URLs
- Do not reformat, reorganize, or lint-fix this file — leave the code exactly as is
