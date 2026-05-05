# ARCHITECTURE LAYER CLARIFICATION (CRITICAL RULE)

## PURPOSE
This document resolves ambiguity between:

1. GLOBAL ARCHITECTURE FOLDERS
2. MODULE-LOCAL FILES WITH SIMILAR NAMES

---

# 1. TWO DIFFERENT SYSTEMS EXIST

## A. GLOBAL LAYER FOLDERS (SYSTEM FRAMEWORK)

Located at:
```
/newFrontend/src/
  types/
  services/
  actions/
  data/
```

**CRITICAL:** All application code lives under `/newFrontend/src/`

### PURPOSE

These folders are:
- **STRICT shared type primitives ONLY**
- They MUST NOT contain domain concepts
- They exist ONLY to define reusable language primitives across modules

Examples of ALLOWED content:
- `ID`, `UUID` (identity primitives)
- `ApiResponse<T>`, `PaginatedResponse<T>` (response wrappers)
- `Timestamp`, `DateRange` (time primitives)
- `ErrorCode`, `Result<T, E>` (error primitives)

Examples of FORBIDDEN content:
- `Invoice`, `Product`, `User` (domain entities - these go in modules)
- `InvoiceStatus`, `OrderType` (domain enums - these go in modules)
- Business validation utilities
- Feature-specific helpers

### RULE

They are NOT the primary implementation target.

They are STRICT shared primitives only.

**If it contains ANY domain concept → it does NOT belong here.**

---

## B. MODULE LAYER (FEATURE SYSTEMS)

Located at:
```
/newFrontend/src/modules/<domain>/
  <domain>.types.ts
  <domain>.data.ts
  <domain>.service.ts
  <domain>.actions.ts
```

**Example:**
```
/newFrontend/src/modules/invoices/
  invoices.types.ts
  invoices.data.ts
  invoices.service.ts
  invoices.actions.ts
```

### PURPOSE

These files are:
- domain-specific implementation
- the actual application logic
- feature-level architecture

### RULE

This is the PRIMARY target for code reconstruction.

---

# 2. CRITICAL DISTINCTION

## GLOBAL FOLDERS
- generic
- reusable
- optional
- system-level

## MODULE FILES
- specific
- required
- feature-level
- actual application logic

---

# 3. IMPORTANT RULE (THIS IS THE SOURCE OF CONFUSION)

Even though names look similar:
```
/newFrontend/src/types/                              ← GLOBAL (shared)
AND
/newFrontend/src/modules/invoices/invoices.types.ts  ← MODULE (specific)
```

They are NOT the same thing.

---

# 4. EXPLANATION OF DUPLICATE NAMING

## GLOBAL /types

Represents:
- shared language primitives
- cross-module reusable definitions

Example:
- `ID`
- `ApiResponse<T>`
- `Timestamp`
- `PaginationParams`

---

## MODULE *.types.ts

Represents:
- business entity definitions
- feature-specific data shapes
- database models for that module

Example:
- `Invoice`
- `InvoiceLineItem`
- `InvoiceStatus` (if domain-specific)
- `InvoiceFilters`

---

# 5. PRIORITY RULE (VERY IMPORTANT)

When writing or migrating code:

## ALWAYS prioritize MODULE FILES first

Meaning:
```
/newFrontend/src/modules/invoices/invoices.types.ts  ← PRIMARY
/newFrontend/src/types/                              ← SECONDARY (only if shared)
```

---

# 6. CONFLICT RESOLUTION RULE

If a type seems like it could go in both places:

Decision rule:

- Used by ONE module → MODULE FILE
- Used by MULTIPLE modules → GLOBAL /types

Example:

```typescript
// WRONG - putting invoice-specific type in global
// /types/invoice.ts
export interface Invoice { ... }

// CORRECT - invoice-specific type in module
// /modules/invoices/invoices.types.ts
export interface Invoice { ... }

// CORRECT - shared primitive in global
// /types/common.ts
export type ID = string
export interface ApiResponse<T> {
  data: T
  error?: string
}
```

---

# 7. EXECUTION RULE FOR AI AGENTS

When generating or migrating code:

1. Check module first
2. Only use global folder if reuse is required
3. Never duplicate definitions across both layers unless explicitly shared

**Priority flow:**
```
1. Is this a domain concept? → MODULE FILE (always)
2. Is this a shared primitive (ID, ApiResponse)? → GLOBAL FOLDER
3. Uncertain? → ALWAYS start in MODULE FILE
   → Promote to /types ONLY after second module needs it
```

**STRICT RULE:**
- If uncertain → default to MODULE
- Promote to GLOBAL only when second usage appears
- NEVER "pre-optimize" by putting in /types speculatively

---

# 8. FINAL SYSTEM INTENT

The system is NOT duplicated.

It is a two-tier architecture:

```
GLOBAL (shared primitives)
    ↓
MODULES (feature implementations)
```

**Analogy:**
- `/types/` = standard library (shared across all features)
- `modules/*/*.types.ts` = application code (specific to each feature)

---

# 9. CONCRETE EXAMPLES

## Example 1: Invoice Type (MODULE-SPECIFIC)

```typescript
// ✅ CORRECT
// /newFrontend/src/modules/invoices/invoices.types.ts
export interface Invoice {
  id: string
  amount: number
  customer_id: string
  status: 'pending' | 'paid'
}

// ❌ WRONG - Don't put in global
// /newFrontend/src/types/invoice.ts
export interface Invoice { ... }
```

---

## Example 2: Shared ID Type (GLOBAL)

```typescript
// ✅ CORRECT
// /newFrontend/src/types/common.ts
export type ID = string
export type UUID = string

// Then import in modules:
// /newFrontend/src/modules/invoices/invoices.types.ts
import type { ID } from '@/types/common'

export interface Invoice {
  id: ID  // ← using shared primitive
  amount: number
}

// ❌ WRONG - Don't redefine in every module
// /newFrontend/src/modules/invoices/invoices.types.ts
export type ID = string  // ← Don't do this, import from /types
```

---

## Example 3: Shared API Response (GLOBAL)

```typescript
// ✅ CORRECT
// /newFrontend/src/types/api.ts
export interface ApiResponse<T> {
  data: T
  error?: string
  timestamp: string
}

// Then use in modules:
// /newFrontend/src/modules/invoices/invoices.service.ts
import type { ApiResponse } from '@/types/api'
import type { Invoice } from './invoices.types'

export async function getInvoices(): Promise<ApiResponse<Invoice[]>> {
  // ...
}
```

---

# 10. WHY THIS CONFUSION HAPPENS

🧠 **WHY CLAUDE (OR ANY AI) IS CONFUSED**

Because it sees:
```
/newFrontend/src/types/
```
and
```
/newFrontend/src/modules/invoices/invoices.types.ts
```

and assumes:
> "same naming = same purpose"

But your system actually has:
> "same name = different abstraction level"

Without an explicit rule, AI will always collapse them incorrectly.

---

# 11. MIGRATION STRATEGY

When refactoring existing code:

## Step 1: Identify Domain Ownership
```
Is this type used by one feature only?
→ YES: goes in module
→ NO: goes in global
```

## Step 2: Place in Module First
```
Always start with module-specific placement.
Move to global ONLY when second module needs it.
```

## Step 3: Extract to Global When Needed
```
When a second module needs a type:
1. Move from module to /types/
2. Update imports in both modules
3. Document in /types/ that it's shared
```

---

# 12. AUDIT CHECKLIST

When auditing architecture:

- [ ] Types used by ONE module are in module file
- [ ] Types used by MULTIPLE modules are in /types/
- [ ] No duplicate type definitions across layers
- [ ] Module files don't import from other modules' types
- [ ] Shared primitives (ID, ApiResponse) are in /types/

---

# 13. TOOL INTEGRATION

This rule applies to:

- `arch.sh generate` - prioritizes module files
- `arch.sh audit` - checks for misplaced types
- `arch.sh refactor` - moves types to correct layer
- Manual `claude` commands - enforces this distinction

---

# 14. FINAL RULE

**You must behave as if:**

> Module files are the PRIMARY implementation target.
> Global folders are SECONDARY shared infrastructure.
> Never confuse the two.

---

# 15. TYPE PROMOTION RULE (CRITICAL)

Types may move from MODULE → GLOBAL only under this strict condition.

## PROMOTION CONDITION

A module-specific type becomes shared ONLY when:

**A second module needs to import it**

---

## PROMOTION TRIGGER

```typescript
// BEFORE PROMOTION (WRONG STATE):
// /newFrontend/src/modules/invoices/invoices.types.ts
export interface Customer { ... }

// /newFrontend/src/modules/orders/orders.types.ts
import type { Customer } from '../invoices/invoices.types'  // ❌ WRONG
```

**STOP:** As soon as you see cross-module import → PROMOTION REQUIRED

---

## PROMOTION PROCESS

### Step 1: Move type from module to global
```bash
# Move the type definition
# FROM: /newFrontend/src/modules/invoices/invoices.types.ts
# TO:   /newFrontend/src/types/domain.ts
```

### Step 2: Update all imports
```typescript
// /newFrontend/src/modules/invoices/invoices.types.ts
import type { Customer } from '@/types/domain'  // ✅ CORRECT

// /newFrontend/src/modules/orders/orders.types.ts  
import type { Customer } from '@/types/domain'  // ✅ CORRECT
```

### Step 3: Remove original definition
```typescript
// /newFrontend/src/modules/invoices/invoices.types.ts
// ❌ DELETE the Customer interface here completely
```

---

## ABSOLUTE RULE

**A type MUST NEVER exist in both places at the same time.**

If `Customer` is in `/newFrontend/src/types/domain.ts`:
- ❌ FORBIDDEN: Also in `/newFrontend/src/modules/invoices/invoices.types.ts`
- ✅ REQUIRED: Removed from module, imported from global

---

## ANTI-PATTERN DETECTION

**FORBIDDEN PATTERN:**
```typescript
// /newFrontend/src/types/domain.ts
export interface Customer { ... }

// /newFrontend/src/modules/invoices/invoices.types.ts
export interface Customer { ... }  // ❌ DUPLICATE - VIOLATION
```

**CORRECT PATTERN:**
```typescript
// /newFrontend/src/types/domain.ts
export interface Customer { ... }

// /newFrontend/src/modules/invoices/invoices.types.ts
import type { Customer } from '@/types/domain'  // ✅ IMPORT ONLY
```

---

## PROMOTION DECISION TREE

```
Is a second module trying to use this type?
├─ NO → Keep in original module
└─ YES → PROMOTION REQUIRED
         ├─ Move to /newFrontend/src/types/
         ├─ Update all imports
         └─ Delete from module
```

---

## WHEN NOT TO PROMOTE

**DO NOT promote if:**
- Only ONE module uses it (keep it local)
- It's domain-specific to that module (even if used by UI)
- No other module needs to import it

**Example - NO PROMOTION NEEDED:**
```typescript
// /newFrontend/src/modules/invoices/invoices.types.ts
export interface InvoiceLineItem { ... }  // ✅ Invoice-specific, stays here

// /newFrontend/src/modules/invoices/components/InvoiceDetail.tsx
import type { InvoiceLineItem } from '../invoices.types'  // ✅ Same module
```

---

## PROMOTION CHECKLIST

Before promoting a type to `/types/`:

- [ ] Is it used by 2+ modules? (If NO → don't promote)
- [ ] Is it truly domain-agnostic? (If NO → reconsider)
- [ ] Have you removed ALL duplicate definitions? (MUST be YES)
- [ ] Have you updated ALL imports? (MUST be YES)
- [ ] Is there NO domain concept in the type? (MUST be YES)

---

# 16. ZERO-TOLERANCE VIOLATIONS

The following are CRITICAL ERRORS that break the system:

## Violation 1: Duplicate Type Definitions
```typescript
// ❌ CRITICAL ERROR
// /newFrontend/src/types/customer.ts
export interface Customer { ... }

// /newFrontend/src/modules/invoices/invoices.types.ts  
export interface Customer { ... }  // DUPLICATE - SYSTEM FAILURE
```

## Violation 2: Cross-Module Imports
```typescript
// ❌ CRITICAL ERROR
// /newFrontend/src/modules/orders/orders.types.ts
import type { Invoice } from '../invoices/invoices.types'  // WRONG LAYER
```

**FIX:** Promote `Invoice` to `/newFrontend/src/types/` or restructure

## Violation 3: Domain Concepts in Global
```typescript
// ❌ CRITICAL ERROR
// /newFrontend/src/types/invoice.ts
export interface Invoice { ... }  // Domain entity in global - WRONG
```

**FIX:** Move to `/newFrontend/src/modules/invoices/invoices.types.ts`

---

# 17. FINAL RULE

**You must behave as if:**

> Module files are the PRIMARY implementation target.
> Global folders are SECONDARY shared primitives only.
> Types exist in EXACTLY ONE place.
> Cross-module imports trigger immediate promotion.
> Violations are system failures, not warnings.

---

# 18. AGENT SELF-CHECK (MANDATORY BEFORE EVERY WRITE)

Before creating or modifying ANY type file, run this check:

## Pre-Write Checklist

```
[ ] Is this a domain concept? 
    → YES: Write to modules/<domain>/<domain>.types.ts
    → NO: Continue to next check

[ ] Is this a shared primitive (ID, ApiResponse, Timestamp)?
    → YES: Write to /types/
    → NO: Continue to next check

[ ] Is this used by multiple modules?
    → YES: Write to /types/
    → NO: Write to modules/<domain>/<domain>.types.ts

[ ] Does this type already exist elsewhere?
    → YES: STOP - Delete duplicate or import existing
    → NO: Safe to write

[ ] Am I about to create a cross-module import?
    → YES: STOP - Promote the type to /newFrontend/src/types/ first
    → NO: Safe to write
```

## Post-Write Validation

After writing a type, verify:

```
[ ] Type exists in EXACTLY ONE location (no duplicates)
[ ] No cross-module imports (modules don't import from other modules)
[ ] Domain concepts are in /newFrontend/src/modules/
[ ] Shared primitives are in /newFrontend/src/types/
[ ] All imports point to correct layer
```

---

# 19. DETERMINISTIC FILE ROUTING

This is the ABSOLUTE routing algorithm:

```
INPUT: A type definition needs to be written

STEP 1: Identify type category
├─ Domain entity (Invoice, Product, User) → ROUTE TO MODULE
├─ Domain enum (InvoiceStatus, OrderType) → ROUTE TO MODULE  
├─ Shared primitive (ID, UUID, ApiResponse) → ROUTE TO GLOBAL
└─ Business logic type → ROUTE TO MODULE

STEP 2: Check reuse
├─ Used by 1 module → ROUTE TO MODULE
└─ Used by 2+ modules → ROUTE TO GLOBAL

STEP 3: Verify no duplicates
├─ Type already exists → IMPORT, don't create
└─ Type doesn't exist → CREATE in determined location

STEP 4: Write to determined location
├─ MODULE: /newFrontend/src/modules/<domain>/<domain>.types.ts
└─ GLOBAL: /newFrontend/src/types/<category>.ts

OUTPUT: Type written to exactly ONE location
```

---

# 20. ZERO-AMBIGUITY GUARANTEE

This document provides:

✅ **Deterministic placement rules** (no interpretation needed)  
✅ **Explicit promotion triggers** (second usage = promotion)  
✅ **Zero-tolerance violations** (duplicates = critical error)  
✅ **Self-checking mechanism** (mandatory pre-write checks)  
✅ **Clear routing algorithm** (input → single output)

**Result:** An AI agent cannot improvise, guess, or create ambiguous structure.

---

# 21. ENFORCEMENT INTEGRATION

These rules are enforced by:

- `CLAUDE.md` - References this file for type placement
- `arch.sh audit` - Detects violations (duplicates, wrong layer)
- `arch.sh generate` - Follows routing algorithm automatically
- Manual `claude` commands - Self-checks before every write

**Every code generation must pass the Pre-Write Checklist from Section 18.**