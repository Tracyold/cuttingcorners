---

# 📁 2. `/lib/Claude.md` (INFRASTRUCTURE LAYER)

```md id="lib-md"
# LIB FOLDER CONTRACT (INFRASTRUCTURE LAYER)

## PURPOSE
This folder contains low-level reusable infrastructure utilities.

It is NOT domain-aware.

---

## WHAT BELONGS HERE

- Supabase client initialization
- API clients
- generic helpers
- formatters
- validators (generic, not business-specific)
- logging utilities

---

## WHAT DOES NOT BELONG HERE

- business logic
- domain rules
- feature-specific logic
- actions/services/modules

---

## RULE

LIB = RAW TOOLS ONLY.

No understanding of application meaning.

---

## EXAMPLE

```ts
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);