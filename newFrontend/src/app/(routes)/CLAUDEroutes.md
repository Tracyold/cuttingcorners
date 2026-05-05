# ROUTES FOLDER CONTRACT (APP ROUTER LAYER)

## PURPOSE
This folder defines ALL application routes (pages) using Next.js App Router.

Routes are responsible for organizing UI entry points only.

---

## WHAT BELONGS HERE

- route groups (e.g. (routes), (dashboard))
- page.tsx files
- layout.tsx files
- loading.tsx / error.tsx
- UI composition per route

---

## WHAT DOES NOT BELONG HERE

- business logic
- Supabase calls
- data fetching logic
- validation logic
- direct service imports
- cross-module logic

---

## RULE

ROUTES = ORCHESTRATION OF UI ONLY.

Routes do NOT compute anything meaningful.

---

## DATA FLOW RULE

Routes may ONLY call:

✔ actions layer  
❌ services directly  
❌ data layer  
❌ lib/database  

---

## EXAMPLE

```ts
import { getInvoiceAction } from "@/modules/invoices/invoices.actions";

export default async function InvoicePage() {
  const invoice = await getInvoiceAction("123");

  return (
    <div>
      <h1>Invoice</h1>
      <p>{invoice.total}</p>
    </div>
  );
}