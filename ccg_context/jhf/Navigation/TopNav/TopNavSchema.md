# TopNav — Emergent Build Spec

*Canonical version — February 24, 2026*
*File: `CuttingCorners/LandingPage/TopNav.tsx`*

-----

## CRITICAL — Separate File, Drop In As-Is

**`TopNav.tsx` is a complete, production-ready component. Do NOT rewrite it. Do NOT modify `LandingPage.tsx` beyond adding the import and single `<TopNav />` line.**

Your only jobs:

1. Place `TopNav.tsx` at `CuttingCorners/LandingPage/TopNav.tsx`
1. Add one import line to `LandingPage.tsx`
1. Add one `<TopNav />` line to `LandingPage.tsx`

That is all.

-----

## Integration Into LandingPage.tsx

Add this import at the top of `LandingPage.tsx`:

```tsx
import TopNav from './TopNav'
```

Then add `<TopNav />` as the first element inside the return, before the hero `<section>`:

```tsx
return (
  <>
    <GlobalStyles />
    <main>
      <TopNav />     {/* ← ADD THIS LINE ONLY */}
      <section       {/* hero section — do not touch */}
        style={{ minHeight: '100svh', ... }}
      >
```

**Do not move, wrap, or reformat anything else in `LandingPage.tsx`.**

-----

## What TopNav Does

- Fixed position — overlays the hero without pushing content down
- Transparent background when at top of page → transitions to dark frosted glass (`rgba(5,5,5,0.92)` + `backdrop-filter: blur`) on scroll past 40px
- Bottom border appears on scroll (subtle `rgba(255,255,255,0.07)`)
- Auth-aware: checks Supabase session and shows “Account” → `/account` if logged in, or “Login” → `/login` if not
- Listens for auth state changes in real time

-----

## Nav Links

|Label               |Href                  |Notes                                    |
|--------------------|----------------------|-----------------------------------------|
|Cutting Corners Gems|`/`                   |Brand name — left side, Oranienbaum serif|
|Shop                |`/shop`               |Center links — desktop                   |
|Portfolio           |`/portfolio`          |Center links — desktop                   |
|Login / Account     |`/login` or `/account`|Right side — gold outlined button        |

-----

## Desktop Layout (≥ 768px)

- Height: 56px, fixed top
- Left: “Cutting Corners Gems” brand in Oranienbaum serif
- Center-right: Shop · Portfolio links — Montserrat, 10px, uppercase, `letter-spacing: 0.22em`
- Far right: Login/Account gold outlined button
- Links have underline-from-left hover animation in gold
- Mobile hamburger is hidden (`display: none`)
- Mobile drawer is hidden (`display: none !important`)

-----

## Mobile Layout (< 768px)

- Height: 56px, fixed top
- Left: “Cutting Corners Gems” brand
- Right: hamburger button (3 bars → X animation when open)
- Desktop links are hidden
- Tapping burger opens drawer below nav bar
- Drawer: full width, frosted dark background, links stacked vertically with gold Login/Account at bottom
- Tapping any drawer link closes the drawer
- Clicking outside the nav closes the drawer

-----

## Fonts

Both fonts are already loaded by `LandingPage.tsx` via `<GlobalStyles />`:

- Oranienbaum — brand name
- Montserrat — nav links, auth button

TopNav also loads them itself via `@import` in its own injected `<style>` block as a fallback — no additional font loading needed.

-----

## Design Details

- Brand hover: white → gold `#d4af37`, 200ms
- Link color: `rgba(255,255,255,0.6)` → white on hover
- Link underline: 0.5px gold line animates from left to right on hover
- Auth button: gold text `#d4af37`, `0.5px solid rgba(212,175,55,0.45)` border, no border-radius (sharp corners match brand)
- Auth button hover: subtle gold background tint + brighter border
- Burger bars: `rgba(255,255,255,0.75)`, animates to X on open
- Drawer links: `rgba(255,255,255,0.55)` → white on hover, separated by hairline borders

-----

## Notes for Emergent

- File extension is `.tsx` — keep it `.tsx`
- This component injects its own CSS via `dangerouslySetInnerHTML` — no separate CSS file needed
- Do not add this nav to any other page — each page manages its own nav
- The `@media (min-width: 768px)` breakpoint matches Tailwind’s `md:` breakpoint used in `LandingPage.tsx`
- Auth check uses dynamic import so the component works even before Supabase is configured
- Do not hardcode the auth state — always read from Supabase session
