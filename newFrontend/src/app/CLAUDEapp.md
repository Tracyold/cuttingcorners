# APP FOLDER CONTRACT (UI LAYER)

## PURPOSE
This folder defines ALL user-facing UI (Next.js App Router).

It is strictly presentation + action-calling only.

---

## WHAT BELONGS HERE

- pages (page.tsx)
- layouts
- UI components specific to routes
- server components for rendering
- calling actions layer ONLY

---

## WHAT DOES NOT BELONG HERE

- business logic
- Supabase queries
- data fetching logic
- validation rules
- direct service imports

---

## RULE

APP LAYER IS PURE PRESENTATION.

It must never decide business behavior.

---

## DATA FLOW RULE

UI → actions ONLY

Never:
UI → services ❌  
UI → data ❌  
UI → supabase ❌

---

## EXAMPLE

```ts
import { getInvoiceAction } from "@/modules/invoices/invoices.actions";

export default async function Page() {
  const invoice = await getInvoiceAction("123");

  return <div>{invoice.total}</div>;
}