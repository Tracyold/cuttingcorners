# Silicon Vale Design System — Bug Audit Reference

This file is the authoritative bug list for the `silicon-vale` React + TypeScript + Vite
design system. Read this before touching any file.

---

## Repo Structure

```
src/
├── components/
│   ├── ui/              # UI components — each has .tsx, .css, .types.ts, use*.ts
│   ├── prop-passers/    # Context providers: SizeContext, StyleContext, DisabledContext,
│   │                   #   LoadingContext, SpacingContext, MotionContext
│   └── styles/          # 25 sv-[name].css files + index.css that imports all
└── tokens/
    └── tokens.css       # --sv-* CSS custom properties
```

---

## Execution Order

Fix bugs in this exact order (later bugs depend on earlier ones):

1. Bug 1 — svStyle as data-attr (isolated, CSS + JSX)
2. Bug 3 — AvatarCircle svStyle (isolated, same pattern as Bug 1)
3. Bug 4 — Remove redundant role="button" (isolated, 2 files)
4. Bug 6 — Font-size scale (isolated, CSS only)
5. Bug 5 — Disabled pattern (minor refactor, 2 files)
6. Bug 2 — Wire up prop-passer contexts (largest change — all component hooks)
7. Bug 8 — Remove dead withSize HOC (cleanup after Bug 2)
8. Bug 7 — Fix or delete forwardPropsTo utility
9. Bug 9 — Update ShowcasePage demo (depends on Bug 2 being done)
10. SpacingContext — wire up or delete

---

## CRITICAL BUG 1 — svStyle goes into className instead of data-sv-style

**Root cause:** `sv-[name].css` files use `[data-sv-style="sv-slate"]` attribute selectors,
but these components put `svStyle` into the `className` array. The CSS tokens never apply.

**Broken files:**
- `TileClickable.tsx` — svStyle spread into `classes` array
- `TileClickableIcon.tsx` — svStyle spread into `classes` array
- `TileClickableNav.tsx` — svStyle spread into `classes` array
- `AccordionTile.tsx` — svStyle spread into `wrapperClasses` array
- `ProgressBarMatte.tsx` — svStyle spread into `wrapperClasses` array

**Fix:** Remove svStyle from className. Add `data-sv-style={svStyle}` as a JSX prop on the root element.

```tsx
// WRONG
<div className={[classes, svStyle].join(' ')}>

// CORRECT
<div className={classes} data-sv-style={svStyle}>
```

---

## CRITICAL BUG 2 — All context providers are built but never consumed

**Verification grep (should return 0 results before fix):**
```bash
grep -r "useSizeContext\|useStyleContext\|useDisabledContext\|useLoadingContext\|useSpacingContext\|useMotionContext\|useMotionSafe" src/components/ui/ --include="*.ts"
```

**Fix:** Update each component's `use*.ts` hook to import and consume context as fallback.
Direct prop always wins with `??` operator.

**Component → Contexts mapping:**

| Component | Contexts to consume |
|-----------|-------------------|
| ButtonPill | SizeContext, DisabledContext, LoadingContext |
| ButtonPillIcon | SizeContext, DisabledContext, LoadingContext |
| ButtonPillGroup | SizeContext, DisabledContext |
| CardThermo | StyleContext, DisabledContext |
| CardThermoRaised | StyleContext, DisabledContext |
| CardThermoRecessed | StyleContext, DisabledContext |
| TileClickable | SizeContext, StyleContext, DisabledContext |
| TileClickableIcon | SizeContext, StyleContext, DisabledContext |
| TileClickableNav | SizeContext, StyleContext, DisabledContext |
| AccordionTile | SizeContext, StyleContext, DisabledContext |
| BadgePill | SizeContext, StyleContext |
| BadgeDot | SizeContext, StyleContext |
| InputText | SizeContext, DisabledContext, LoadingContext |
| InputTextarea | SizeContext, DisabledContext, LoadingContext |
| InputSelect | SizeContext, DisabledContext, LoadingContext |
| InputSearch | SizeContext, DisabledContext, LoadingContext |
| ToggleSwitch | SizeContext, DisabledContext |
| CheckboxThermo | SizeContext, DisabledContext |
| RadioThermo | SizeContext, DisabledContext |
| ProgressBarMatte | SizeContext, StyleContext |
| TextBody | SizeContext |
| TextDisplay | SizeContext |
| TextLabel | SizeContext |
| AvatarCircle | SizeContext, StyleContext |
| Divider | (none) |

**MotionContext note:** Any component with CSS transitions should call `useMotionSafe()`.
At minimum update: `withFadeIn`, `withLift`, `withBounceIn`, `withPulse`, `withShimmer`,
`RippleEffect`, `StaggerGroup`, `ScrollReveal`.

**SpacingContext decision:** Either wire to components with padding (cards, inputs, tiles)
or delete entirely. Do not leave as dead code.

---

## CRITICAL BUG 3 — AvatarCircle svStyle applied as broken inline style

**Root cause:**
```tsx
style={svStyle ? { background: `var(${svStyle})` } : undefined}
```
Missing `--` prefix → `var(sv-slate)` instead of `var(--sv-slate)`. Also wrong approach —
CSS uses `[data-sv-style]` selectors, not var references.

**Fix:** Remove the inline style. Use `data-sv-style={svStyle}` on the root div.

---

## MODERATE BUG 4 — role="button" on native button elements

**Affected:** `ButtonPill.tsx`, `ButtonPillIcon.tsx`

**Fix:** Remove `role="button"`. `<button>` already has implicit ARIA role of button.

---

## MODERATE BUG 5 — Contradictory disabled pattern

**Affected:** `ButtonPill.tsx`, `ButtonPillIcon.tsx`

**Current (wrong):**
```tsx
aria-disabled={isDisabled || isLoading}
tabIndex={isDisabled ? -1 : 0}
```

**Fix:**
```tsx
disabled={isDisabled || isLoading}
aria-busy={isLoading}
// Remove manual tabIndex and aria-disabled
```

---

## MODERATE BUG 6 — ButtonPill font-size values are broken

**Affected:** `ButtonPill.css`

**Current (wrong) — 25px minimum for "small" button:**
```css
.btn-pill--sm { font-size: clamp(25px, 1.8vw, 28px); }
```

**Fix:**
```css
.btn-pill--sm  { padding: 6px 14px;  font-size: 0.8125rem; }
.btn-pill--md  { padding: 10px 20px; font-size: 0.9375rem; }
.btn-pill--lg  { padding: 13px 26px; font-size: 1.0625rem; }
.btn-pill--xl  { padding: 16px 32px; font-size: 1.1875rem; }
```

---

## LOW BUG 7 — forwardPropsTo utility is a functional no-op

**Root cause:**
```tsx
return <Component {...props} {...forwarded} />
// forwarded ⊆ props — this is identical to spreading props alone
```

**Decision:** Determine actual intended use case:
- Strip certain props before passing → spread only keys NOT in `forwarded`
- Forward props to a child slot → needs a second target component argument
- No real use case → **delete it**

---

## LOW BUG 8 — withSize HOC in SizeContext is dead code

After Bug 2 is fixed (all components call `useSizeContext()` directly), the `withSize` HOC
in `SizeContext.tsx` is redundant. Delete it and remove from re-exports.

---

## LOW BUG 9 — ShowcasePage prop-passers demo is misleading

**Current problem:** Demo wraps components in `DisabledProvider isDisabled={false}` and
`LoadingProvider isLoading={false}` — nothing visually changes, demo proves nothing.
`SpacingProvider` is not demonstrated at all.

**Fix (after Bug 2):**
- Wrap `ButtonPill` + `InputText` in `DisabledProvider isDisabled={true}` → should visually disable
- Wrap `ButtonPill` in `LoadingProvider isLoading={true}` → should show loading state
- Wrap components in `SizeProvider size="lg"` without passing `size` prop → should inherit size
- Add `SpacingProvider` demo if SpacingContext is implemented
