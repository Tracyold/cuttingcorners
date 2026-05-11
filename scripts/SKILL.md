---
name: repo-reproduction-ready
description: >
  Use this skill to audit, diagnose, and fix a repository so it is reproduction-ready:
  clean install works from scratch, all bugs are categorized and fixed in dependency order,
  dead code is removed, and a demo/showcase renders without errors. Trigger this skill
  whenever the user says "fix my repo", "make this reproduction ready", "audit this codebase",
  "clean up this project", "my design system is broken", "wire up my context providers",
  or shares a bug audit document for a UI component library, design system, or React/TypeScript
  project. Also trigger when the user uploads or pastes a list of bugs to fix across multiple
  files in a single codebase.
---

# Repo Reproduction-Ready Skill

This skill guides Claude through a structured, safe process for auditing a repository,
categorizing and prioritizing bugs, and applying fixes in dependency order — leaving the
repo in a clean, reproducible state with no dead code and a working demo.

---

## Audit Scripts — Run These First

Before reading individual files or making any fixes, run all three audit scripts from the repo root. They give you the full picture in 30 seconds and remove all guesswork.

```bash
# 1. Prop passer coverage — which components are unwired, which contexts are dead
python scripts/audit_prop_passers.py --root .

# 2. Theatre and dead code — dead exports/imports, no-ops, disabled props, CSS doubles, duplicates
python scripts/audit_theatre.py --root .

# 3. CSS waste — unused classes, dead vars, overrides, double declarations, duplicate rules
python scripts/audit_css.py --root .

# 4. Security — Supabase vulnerabilities, missing auth, insecure patterns
python scripts/audit_security.py --root .
```

Each script prints a categorized report and exits with code `1` if issues are found.
Pipe to a file to keep a record: `python scripts/audit_security.py --root . | tee security.txt`

**What each script catches:**

| Script | Catches |
|--------|---------|
| `audit_prop_passers.py` | Context providers never consumed · Components importing zero contexts · Component dirs missing expected files |
| `audit_theatre.py` | Dead exports · Dead imports · No-op spread merges · `disabled={false}` props · Always-false conditionals · `void` assignments · Pass-through functions · Redundant ARIA · Near-duplicate files |
| `audit_css.py` | Unused CSS files · Unused classes · Dead `--custom-properties` · Ghost `var()` references · Double declarations · Silent overrides · Duplicate rule blocks · Empty selectors |
| `audit_security.py` | Hardcoded secrets/keys · Service role on client · `eval()` · SQL injection · Unauthed DB calls (full import-graph auth tracing) · `select('*')` · Missing RLS filters · Admin API on client · Token in localStorage/URL · Missing error handling · CORS wildcard · TLS disabled · `Math.random()` for crypto |

These scripts do not modify any files. They are read-only auditors.

To **automatically fix** what's safe to fix, pipe any script's output into `fix.py`:

```bash
# Fix a single audit
python scripts/audit_theatre.py --root . --json - | python scripts/fix.py --root .

# Run all audits and fix in one command
python scripts/fix.py --root . --run-all

# See what would change without touching files
python scripts/fix.py --root . --run-all --dry-run

# Fix only specific categories
python scripts/audit_css.py --root . --json - | python scripts/fix.py --root . --only DOUBLE_DECL EMPTY_RULE
```

`fix.py` auto-applies safe mechanical fixes (dead imports, duplicate CSS declarations, redundant ARIA, no-op props, bare `process.env`, missing error destructuring) and prints annotated suggestions for everything that requires human judgment. Creates `.bak` backups before modifying any file.

---

## Phase 0: Read Before You Touch

**This is non-negotiable.** Before writing a single line of code:

1. List every file in `src/` (or the relevant source root) using `bash_tool` or `view`
2. Read every file that will be touched by any planned fix
3. Build a mental map of:
   - Which files own which concerns (components, hooks, contexts, styles, utilities)
   - Which files depend on which others (import graph)
   - Which CSS selectors match which JSX attributes (especially `className` vs `data-*` attributes)

If the user has provided a bug list or audit document, read it in full before starting. Do not start fixing Bug 3 before understanding Bug 7 — later bugs may change how earlier fixes should be written.

---

## Phase 1: Categorize All Bugs

Classify every bug by severity and dependency:

| Severity | Criteria | Examples |
|----------|----------|---------|
| **CRITICAL** | Feature is completely non-functional | CSS selectors never match, context never consumed, prop silently ignored |
| **MODERATE** | Feature works but incorrectly or inconsistently | Wrong ARIA pattern, contradictory disabled state, wrong scale |
| **LOW** | Dead code, cosmetic, misleading demos | Unused HOCs, no-op utilities, demo shows nothing |

Then build an **execution order** that respects dependencies:
- Isolated fixes first (touch one file, no ripple effects)
- Largest refactors (touching many files) in the middle
- Cleanup and demo updates last (depend on the refactors being done)

State this order explicitly to the user before starting. Get sign-off.

---

## Phase 2: Fix in Dependency Order

For each fix:

### 2a. Announce the fix
State the bug, root cause, and what you're changing. Example:
> **Bug 1 — svStyle applied as className instead of data attribute**
> Root cause: CSS uses `[data-sv-style]` selectors but components put `svStyle` in `className`.
> Fix: Remove from className array; add `data-sv-style={svStyle}` on root element.
> Affected files: TileClickable.tsx, TileClickableIcon.tsx, TileClickableNav.tsx, AccordionTile.tsx, ProgressBarMatte.tsx

### 2b. Apply the fix
Make the minimal change that resolves the bug. Do not refactor unrelated code while fixing.

### 2c. Verify no TypeScript errors introduced
After each fix, check that the files you touched still typecheck. Run:
```bash
npx tsc --noEmit 2>&1 | head -40
```
If errors appear, fix them before moving on.

### 2d. Spot-check the pattern is consistent
After fixing a pattern in one component, grep for the same broken pattern in others. Do not assume the bug is isolated.

```bash
# Example: find all places svStyle is spread into className
grep -r "svStyle" src/components/ui/ --include="*.tsx" -l
```

---

## Phase 3: Common Bug Patterns & Their Fixes

### Pattern A — CSS Attribute Selector vs className Mismatch

**Symptom:** CSS uses `[data-sv-style="value"]` selectors but component applies `svStyle` as a className or inline style. Tokens never apply.

**Fix:** Remove `svStyle` (or equivalent) from `className` or `style`. Add it as a `data-*` attribute on the root element:
```tsx
// WRONG
<div className={[classes, svStyle].join(' ')}>

// WRONG (missing -- prefix on custom property)
<div style={{ background: `var(${svStyle})` }}>

// CORRECT
<div className={classes} data-sv-style={svStyle}>
```

**Grep to find all instances:**
```bash
grep -r "svStyle" src/ --include="*.tsx" | grep -v "data-sv-style"
```

---

### Pattern B — Context Providers Built but Never Consumed

**Symptom:** `SomeContext.tsx` exports a provider and a `useSomeContext()` hook, but no component ever imports or calls the hook. The providers are inert wrappers.

**Fix:** In each component's hook file (`use*.ts`), import the relevant context hooks and use `prop ?? contextValue` so the direct prop always wins:

```ts
// useButtonPill.ts
import { useSizeContext } from '../../prop-passers/SizeContext'
import { useDisabledContext } from '../../prop-passers/DisabledContext'

export function useButtonPill(props: ButtonPillProps) {
  const contextSize = useSizeContext()
  const contextDisabled = useDisabledContext()

  const size = props.size ?? contextSize        // prop wins
  const isDisabled = props.isDisabled ?? contextDisabled
  // ...
}
```

**Verification grep before fix:**
```bash
# Should return 0 results if context is truly unwired
grep -r "useSizeContext\|useStyleContext\|useDisabledContext" src/components/ui/ --include="*.ts"
```

**After fix:** Re-run the grep. Every component listed in the bug spec should now appear.

---

### Pattern C — Redundant or Contradictory ARIA

**Symptom:** `role="button"` on a native `<button>` (redundant). Or `aria-disabled` + `tabIndex={-1}` used instead of native `disabled` (contradictory — same effect but more complex and error-prone).

**Fix for redundant role:**
```tsx
// Remove role="button" — <button> already has implicit role
<button type={type} {...rest}>
```

**Fix for contradictory disabled pattern:**
```tsx
// WRONG: aria-disabled + manual tabIndex
<button aria-disabled={isDisabled} tabIndex={isDisabled ? -1 : 0}>

// CORRECT: native disabled handles tab order and AT automatically
<button disabled={isDisabled || isLoading} aria-busy={isLoading}>
```

---

### Pattern D — Wildly Wrong CSS Units / Scale

**Symptom:** `font-size: clamp(25px, 2vw, 32px)` for a "small" button. Copy-paste error with wrong scale.

**Fix:** Replace with a rem-based typographic scale appropriate to the component's size variant. Do not use `clamp()` unless there is a genuine fluid-type design requirement.

Suggested button scale (adjust to match design intent):
```css
.btn--sm  { padding: 6px 14px;  font-size: 0.8125rem; }  /* ~13px */
.btn--md  { padding: 10px 20px; font-size: 0.9375rem; }  /* ~15px */
.btn--lg  { padding: 13px 26px; font-size: 1.0625rem; }  /* ~17px */
.btn--xl  { padding: 16px 32px; font-size: 1.1875rem; }  /* ~19px */
```

---

### Pattern E — Dead Code / No-Op Utilities

**Symptom:** A utility function or HOC that appears to do something but does nothing:
```tsx
// forwardPropsTo — spreads props then overwrites with a subset of the same props
return <Component {...props} {...forwarded} />
// forwarded ⊆ props, so this is identical to: return <Component {...props} />
```

**Decision tree:**
1. Is there a clear, real use case for this utility in the codebase? → Fix it properly
2. Is it partially implemented with no consumer? → Either finish it or delete it
3. Is it a dead HOC that was superseded by a hook? → Delete it

Do not leave no-op utilities. They create confusion and maintenance burden.

---

### Pattern F — Dead Context Option (e.g. SpacingContext)

**Symptom:** A context is defined and exported but: (a) no component consumes it, and (b) no demo wires it up.

**Decision tree:**
1. Does this context have a clear, concrete use case with affected components? → Wire it up (follow Pattern B)
2. Is the use case vague or deferred? → **Delete it.** Remove the provider, the hook, the re-export, and any demo references.

Do not leave dead context as "maybe later" code. It is confusion, not potential.

---

## Phase 4: Demo / Showcase Verification

After all fixes:

1. Ensure the showcase/demo page renders all sections without TypeScript errors
2. If context providers are now wired up, update the demo to actually demonstrate context propagation — use non-trivial values (`isDisabled={true}`, `isLoading={true}`, `size="lg"`) so the effect is visible
3. Run a final typecheck:
```bash
npx tsc --noEmit 2>&1
```
4. Run the dev server and do a visual check:
```bash
npm run dev
```

A "reproduction-ready" repo means: someone can clone it, run `npm install && npm run dev`, and see a fully functional, correctly styled showcase with no console errors.

---

## Phase 5: Reproduce Checklist

Before calling the repo done, verify each item:

- [ ] `npm install` runs without errors
- [ ] `npm run dev` starts without errors
- [ ] `npx tsc --noEmit` returns 0 errors
- [ ] All CSS attribute selectors match the JSX attributes that trigger them
- [ ] All context providers are consumed by at least one component
- [ ] No dead code (unused HOCs, no-op utilities, unwired contexts)
- [ ] Demo/showcase renders all sections and context demos show observable effects
- [ ] No redundant ARIA roles; disabled state uses native pattern
- [ ] CSS scale is sensible for the component's intended size

---

## Reference: Silicon Vale Design System Specifics

See `references/silicon-vale-bugs.md` for the full prioritized bug list specific to the
`silicon-vale` React + TypeScript + Vite design system, including exact file names,
affected components, and the prescribed execution order.

If working on a different codebase, use the patterns above and skip the reference file.
