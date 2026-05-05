---

# 📁 `/app/layouts/Claude.md` (LAYOUT SYSTEM CONTRACT)

```md id="r2"
# LAYOUTS CONTRACT (APP LAYER)

## PURPOSE
Defines shared UI structure across multiple routes.

Examples:
- navigation bars
- sidebars
- global wrappers
- authentication guards (UI-level only)

---

## WHAT BELONGS HERE

- layout.tsx
- shared UI structure
- visual wrappers
- theme providers

---

## WHAT DOES NOT BELONG HERE

- business logic
- data fetching
- Supabase access
- module imports (except UI-related actions if needed)

---

## RULE

LAYOUTS = VISUAL STRUCTURE ONLY

No decision-making logic allowed.

---

## EXAMPLE

```ts
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <nav>App Navigation</nav>
      <main>{children}</main>
    </div>
  );
}