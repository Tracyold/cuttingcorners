---

# 📁 `/app/globals/Claude.md` (GLOBAL UI CONTRACT)

```md id="r3"
# GLOBAL APP CONTRACT

## PURPOSE
Defines global UI behavior across the entire application.

---

## WHAT BELONGS HERE

- global.css
- providers (theme/auth)
- root layout
- error boundaries
- loading fallback UI

---

## WHAT DOES NOT BELONG HERE

- domain logic
- module imports
- Supabase calls
- feature-specific UI

---

## RULE

GLOBAL LAYER = APPLICATION SHELL ONLY

---

## EXAMPLE

```ts
export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}

---

# 🧠 HOW ROUTES FIT INTO YOUR FULL SYSTEM

```text id="flow-route"
GLOBAL LAYOUT
   ↓
ROUTE PAGE (app/routes)
   ↓
ACTION CALL (modules/*.actions)
   ↓
SERVICE (business logic)
   ↓
DATA (Supabase)