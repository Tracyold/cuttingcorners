---

# 📁 3. `/modules/Claude.md` (DOMAIN SYSTEM CONTRACT)

```md id="modules-md"
# MODULES FOLDER CONTRACT (DOMAIN LAYER)

## PURPOSE
This folder contains ALL business domains in isolation.

Each subfolder is a fully independent feature system.

---

## WHAT BELONGS HERE

- domain folders (invoices, products, chat, users)
- each domain contains:
  - types
  - data
  - service
  - actions

---

## WHAT DOES NOT BELONG HERE

- UI components
- global utilities
- shared infrastructure
- cross-domain logic

---

## RULE

Each module MUST be self-contained.

No module should require internal knowledge of another module.

---

## IMPORT RULE

Modules MAY:
- import lib
- import other modules ONLY through actions layer (not internal files)

Modules MUST NOT:
- reach into other module internals



# DOMAIN MODULE CONTRACT

## PURPOSE
This folder defines ONE complete business feature system.

Example domains:
- invoices
- products
- chat
- users

---

## REQUIRED FILES

Every module MUST contain:

- <domain>.types.ts
- <domain>.data.ts
- <domain>.service.ts
- <domain>.actions.ts

---

## LAYER RESPONSIBILITY

### TYPES
- data shapes only

### DATA
- Supabase only
- raw queries only

### SERVICE
- business logic only
- calculations, validation, rules

### ACTIONS
- UI entry point
- calls service only

---

## DATA FLOW (STRICT)

UI → actions → services → data → database

NO SKIPS ALLOWED.

---

## RULE

A module is a COMPLETE MINI-SYSTEM.

It must be:
- independent
- isolated
- fully testable alone

---

## EXAMPLE STRUCTURE

```text
modules/invoices/
  invoices.types.ts
  invoices.data.ts
  invoices.service.ts
  invoices.actions.ts


example action:

  export async function getInvoiceAction(id: string) {
  return getInvoiceService(id);
}

---

# 🧠 SYSTEM-WIDE RESULT

Now the repo enforces:

```text id="flow2"
APP → MODULE ACTIONS → SERVICES → DATA → LIB → DB


Good — this is exactly where your system needs hard explicit contracts instead of implied understanding.

Below is a drop-in rule file you can place inside /modules/ that defines:

* global /types vs module types
* exact usage rules
* import direction rules
* when to create each type
* how AI agents must decide placement

⸻

📁 /modules/TYPE_ARCHITECTURE_CONTRACT.md

# TYPE ARCHITECTURE CONTRACT
## PURPOSE
This document defines strict rules for where TypeScript types MUST live in the system.
It removes ambiguity between:
- /types (global types)
- /modules/*/*.types.ts (domain types)
---
# 1. TWO TYPE SYSTEMS
## A. GLOBAL TYPES (/types)
### PURPOSE
Defines shared, cross-domain language primitives.
### SCOPE
System-wide. Not owned by any module.
### WHAT GOES HERE
- Primitive aliases
- Generic utility types
- Cross-module shared contracts
- Infrastructure-level shapes
### EXAMPLES
```ts
export type ID = string;
export type Timestamp = string;
export interface ApiResponse<T> {
  data: T;
  error?: string | null;
}

⸻

RULE

If more than ONE module uses it → it belongs here.

⸻

B. MODULE TYPES (/modules//*.types.ts)

PURPOSE

Defines domain-specific business entities.

SCOPE

Single module ownership only.

WHAT GOES HERE

* database row shapes
* feature-specific models
* domain entities
* module-specific DTOs

EXAMPLES (in invoices module)

export interface Invoice {
  id: string;
  user_id: string;
  total_amount: number;
  status: "paid" | "pending";
}

⸻

RULE

If ONLY ONE module owns it → it belongs here.

⸻

2. IMPORT RULES (CRITICAL)

MODULE TYPES MAY:

✔ import from /types
❌ NOT import from other modules

⸻

GLOBAL TYPES MUST:

✔ NOT depend on any module
✔ remain domain-agnostic

⸻

3. DECISION FLOW (MANDATORY FOR AI AGENTS)

When creating a type:

Does this type belong to more than one module?
    YES → /types
    NO  → /modules/<domain>/*.types.ts

⸻

4. NO DUPLICATION RULE

The system MUST NOT duplicate types.

If a type already exists in /types:

* modules MUST reuse it
* never redefine locally

⸻

5. EXAMPLES OF CORRECT PLACEMENT

GOOD

/types/ID.ts
/modules/invoices/invoices.types.ts

⸻

BAD

/modules/invoices/UserRole.ts ❌ (should be global)

⸻

6. ARCHITECTURAL INTENT

This separation ensures:

* global consistency (shared types)
* domain ownership (module types)
* no circular dependency
* AI-safe code generation
* deterministic structure enforcement

⸻

7. FINAL RULE

GLOBAL TYPES = LANGUAGE
MODULE TYPES = REALITY

They are NOT duplicates. They are different abstraction layers.

---
# 🧠 WHAT THIS DOES FOR YOUR SYSTEM
This file now becomes a **decision gate for any AI agent or developer**:
It forces a binary choice:
> shared concept → `/types`  
> domain concept → `/modules`
---
