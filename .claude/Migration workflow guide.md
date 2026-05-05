# FRONTEND MIGRATION WORKFLOW GUIDE

## 🎯 CRITICAL UNDERSTANDING

This is a **ONE-WAY MIGRATION** system:

```
/frontend (SOURCE)          /newFrontend (TARGET)
    ↓ READ ONLY                  ↑ WRITE ONLY
    ↓ Analyze                    ↑ Rebuild
    ↓ Extract                    ↑ Generate
    └─────────→──────────────────┘
         NEVER GOES BACK
```

**RULES ENFORCED BY arch.sh:**
- ✅ `/frontend` is IMMUTABLE (never modified)
- ✅ `/newFrontend` receives ALL outputs
- ✅ Migration is READ → ANALYZE → REBUILD → WRITE
- ✅ NO backwards contamination

---

## 📋 STEP-BY-STEP MIGRATION WORKFLOW

### **Phase 1: Setup**

```bash
# 1. Make arch.sh executable
chmod +x arch-migration.sh

# 2. Verify directory structure
ls -la /frontend      # Should exist (source)
ls -la /newFrontend   # Should exist (target)

# 3. Verify documentation exists
ls FRONTEND_RESTRUCTURE_MIGRATION_CONTRACT.md
ls ARCHITECTURE_CONTRACT.md
ls ARCHITECTURE_LAYER_CLARIFICATION.md
```

---

### **Phase 2: Inventory (Understand What Exists)**

```bash
# Analyze source system (READ ONLY)
./arch-migration.sh inventory
```

**What This Does:**
- ✅ Scans `/frontend` (READ ONLY, no modifications)
- ✅ Documents all files and structure
- ✅ Detects potential domains
- ✅ Suggests extraction order
- ✅ Creates: `refactor-map/source-inventory.md`

**Output Example:**
```markdown
# Source System Inventory

## Suggested Domains
### Domain: invoices
- Files: /frontend/pages/invoices/*.tsx, /frontend/lib/invoices.ts
- Responsibilities: Invoice management, PDF generation
- Complexity: Medium

### Domain: products
- Files: /frontend/components/products/*, /frontend/api/products.ts
- Responsibilities: Product catalog
- Complexity: Low

## Migration Strategy
Phase 1: products (simple)
Phase 2: invoices (medium)
Phase 3: orders (complex dependencies)
```

**Review:**
```bash
cat refactor-map/source-inventory.md
```

---

### **Phase 3: Extract Module (Migrate from Source to Target)**

```bash
# Extract one module at a time
./arch-migration.sh extract invoices
```

**What This Does:**

1. **READ** from `/frontend` (immutable):
   - Finds all invoice-related code
   - Analyzes responsibilities
   - Maps: UI vs logic vs data vs types

2. **ANALYZE** structure:
   - Identifies business logic
   - Identifies data access
   - Identifies validations
   - Identifies types

3. **REBUILD** in `/newFrontend/src/modules/invoices/`:
   ```
   invoices.types.ts    ← Domain types from source
   invoices.data.ts     ← Extracted data access
   invoices.service.ts  ← Extracted business logic
   invoices.actions.ts  ← New UI entry points
   ```

4. **WRITE** to target:
   - All files go to `/newFrontend/src/modules/invoices/`
   - Proper layer separation enforced
   - Creates: `refactor-map/extract-invoices-report.md`

**Verify Extraction:**
```bash
# Check files were created
ls -la /newFrontend/src/modules/invoices/

# Review extraction report
cat refactor-map/extract-invoices-report.md

# Verify source untouched
git status /frontend  # Should show no changes
```

**CRITICAL:** `/frontend` is NEVER modified!

---

### **Phase 4: Generate New Module (Not from Source)**

```bash
# Create a brand new module (not extracted from /frontend)
./arch-migration.sh generate products "Product catalog management"
```

**What This Does:**
- ✅ Creates NEW module in `/newFrontend/src/modules/products/`
- ✅ Follows same architecture as extracted modules
- ✅ Does NOT touch `/frontend` at all
- ✅ Generated from scratch following ARCHITECTURE_CONTRACT.md

**Output:**
```
/newFrontend/src/modules/products/
  ├── products.types.ts
  ├── products.data.ts
  ├── products.service.ts
  └── products.actions.ts
```

---

### **Phase 5: Audit Target System**

```bash
# Check architecture compliance in /newFrontend ONLY
./arch-migration.sh audit
```

**What This Does:**
- ✅ Scans `/newFrontend/src/` ONLY
- ✅ Checks layer separation
- ✅ Checks type placement (global vs module)
- ✅ Detects violations
- ✅ Creates: `refactor-map/audit-report.md`

**NEVER touches `/frontend`!**

**Review Report:**
```bash
cat refactor-map/audit-report.md
```

**Example Report:**
```markdown
# Architecture Audit Report

## Summary
- Total modules: 2 (invoices, products)
- Violations found: 3
- Critical issues: 1

## Violations

### CRITICAL: Business Logic in Data Layer
File: /newFrontend/src/modules/invoices/invoices.data.ts:45
Issue: Validation logic found in data layer
Fix: Move to invoices.service.ts

### WARNING: Type Misplacement
File: /newFrontend/src/types/invoice.ts
Issue: Domain entity in global types
Fix: Move to /newFrontend/src/modules/invoices/invoices.types.ts
```

---

### **Phase 6: Fix Violations**

```bash
# Auto-fix violations in /newFrontend
./arch-migration.sh fix
```

**What This Does:**
- ✅ Reads `refactor-map/audit-report.md`
- ✅ Fixes violations in `/newFrontend` ONLY
- ✅ Moves code between layers correctly
- ✅ Updates imports
- ✅ Creates: `refactor-map/fix-report.md`

**NEVER touches `/frontend`!**

**Verify Fixes:**
```bash
# Check fix report
cat refactor-map/fix-report.md

# Test build
npm run build

# Re-audit to verify
./arch-migration.sh audit
```

---

## 🔄 COMPLETE MIGRATION EXAMPLE

### **Migrate Invoices Module:**

```bash
# Step 1: Understand source
./arch-migration.sh inventory
cat refactor-map/source-inventory.md

# Step 2: Extract invoices
./arch-migration.sh extract invoices

# Step 3: Verify extraction
ls -la /newFrontend/src/modules/invoices/
cat refactor-map/extract-invoices-report.md

# Step 4: Check source untouched
git status /frontend  # Should be clean

# Step 5: Audit target
./arch-migration.sh audit

# Step 6: Fix violations if any
./arch-migration.sh fix

# Step 7: Test
npm run build
npm test

# Step 8: Review
cat refactor-map/audit-report.md
```

---

## 🎯 WORKFLOW PATTERNS

### **Pattern 1: Extract All Existing Modules**

```bash
# Run inventory first
./arch-migration.sh inventory

# Extract in order of complexity (simple → complex)
./arch-migration.sh extract products
./arch-migration.sh extract customers
./arch-migration.sh extract invoices
./arch-migration.sh extract orders

# Audit after each
./arch-migration.sh audit
./arch-migration.sh fix
```

---

### **Pattern 2: Mix Extract + Generate**

```bash
# Extract existing module
./arch-migration.sh extract invoices

# Generate new module not in source
./arch-migration.sh generate payments "Payment processing"

# Generate another new module
./arch-migration.sh generate notifications "Email notifications"

# Audit all together
./arch-migration.sh audit
```

---

### **Pattern 3: Incremental Migration**

```bash
# Week 1: Extract one module
./arch-migration.sh extract products
./arch-migration.sh audit
./arch-migration.sh fix

# Test & deploy /newFrontend/products
npm run build
npm run test:products

# Week 2: Extract next module
./arch-migration.sh extract invoices
./arch-migration.sh audit
./arch-migration.sh fix

# Continue incrementally...
```

---

## 🚨 CRITICAL SAFETY CHECKS

### **Before Any Command:**

```bash
# Verify source is protected
ls -la /frontend/.git  # Should exist
git status /frontend   # Should be clean

# Verify target exists
ls -la /newFrontend/src/
```

### **After Extract/Generate:**

```bash
# 1. Verify source untouched
git status /frontend
# Expected: "nothing to commit, working tree clean"

# 2. Check target received files
ls -la /newFrontend/src/modules/

# 3. Run audit
./arch-migration.sh audit

# 4. Test build
npm run build
```

---

## 📁 DIRECTORY STRUCTURE AFTER MIGRATION

```
project/
├── frontend/                    ← SOURCE (READ ONLY)
│   ├── pages/                  ← Never modified
│   ├── components/             ← Never modified
│   ├── lib/                    ← Never modified
│   └── ...                     ← Never modified
│
├── newFrontend/                ← TARGET (WRITE ONLY)
│   └── src/
│       ├── modules/            ← Extracted + Generated
│       │   ├── invoices/
│       │   │   ├── invoices.types.ts
│       │   │   ├── invoices.data.ts
│       │   │   ├── invoices.service.ts
│       │   │   └── invoices.actions.ts
│       │   ├── products/
│       │   └── customers/
│       ├── types/              ← Shared primitives
│       │   └── common.ts
│       ├── services/           ← Global services
│       ├── actions/            ← Global actions
│       └── app/                ← UI (Next.js)
│
├── refactor-map/               ← Migration tracking
│   ├── source-inventory.md
│   ├── extract-invoices-report.md
│   ├── audit-report.md
│   └── fix-report.md
│
└── arch-migration.sh           ← Migration tool
```

---

## 🎓 UNDERSTANDING THE WORKFLOW

### **READ → ANALYZE → REBUILD → WRITE**

```mermaid
graph LR
    A[/frontend<br/>READ ONLY] -->|arch inventory| B[Analyze]
    B -->|arch extract| C[Rebuild]
    C -->|Write| D[/newFrontend<br/>WRITE ONLY]
    
    style A fill:#f99
    style D fill:#9f9
```

1. **READ** from `/frontend` (immutable)
   - Scan files
   - Understand structure
   - Map responsibilities

2. **ANALYZE** what exists
   - Identify domains
   - Detect layers (UI/logic/data)
   - Plan extraction

3. **REBUILD** with clean architecture
   - Separate concerns
   - Create proper layers
   - Apply conventions

4. **WRITE** to `/newFrontend`
   - Generate files
   - Enforce structure
   - Never touch source

---

## ✅ VERIFICATION CHECKLIST

After each migration step:

```bash
# ✓ Source unchanged
git status /frontend  # Should be clean

# ✓ Target has new files
ls -la /newFrontend/src/modules/<domain>/

# ✓ Architecture compliant
./arch-migration.sh audit

# ✓ Builds successfully
npm run build

# ✓ Tests pass
npm test

# ✓ Reports generated
ls -la refactor-map/
```

---

## 🔒 SAFETY GUARANTEES

**arch-migration.sh enforces:**

1. ✅ `/frontend` is NEVER modified
   - All commands are read-only for source
   - Write permissions ignored
   - Violations detected immediately

2. ✅ `/newFrontend` receives ALL outputs
   - Extract writes here
   - Generate writes here
   - Fix writes here
   - Nothing writes to source

3. ✅ Clean separation
   - Source analysis is isolated
   - Target generation is independent
   - No cross-contamination

4. ✅ Audit tracks compliance
   - Verifies target only
   - Never touches source
   - Reports violations

---

## 🚀 QUICK START

```bash
# 1. Setup
chmod +x arch-migration.sh

# 2. Understand what exists
./arch-migration.sh inventory

# 3. Start migration
./arch-migration.sh extract <domain-from-inventory>

# 4. Verify quality
./arch-migration.sh audit

# 5. Fix issues
./arch-migration.sh fix

# 6. Test
npm run build && npm test

# 7. Repeat for next module
```

---

## 📞 COMMAND REFERENCE

```bash
# Analyze source (read-only)
./arch-migration.sh inventory

# Extract from source to target
./arch-migration.sh extract <domain>

# Generate new in target
./arch-migration.sh generate <domain> [description]

# Audit target only
./arch-migration.sh audit

# Fix violations in target
./arch-migration.sh fix

# Help
./arch-migration.sh help
```

---

## ⚠️ WHAT NOT TO DO

❌ **NEVER run refactoring tools on `/frontend`**
❌ **NEVER manually edit `/frontend`**
❌ **NEVER copy `/frontend` structure to `/newFrontend`**
❌ **NEVER modify source during extraction**
❌ **NEVER backport changes to `/frontend`**

✅ **ALWAYS use arch-migration.sh**
✅ **ALWAYS verify source unchanged**
✅ **ALWAYS write to target**
✅ **ALWAYS follow READ → REBUILD workflow**

---

## 🎉 SUCCESS CRITERIA

You know migration is successful when:

1. ✅ `/frontend` has ZERO modifications (git status clean)
2. ✅ `/newFrontend` has complete, layered modules
3. ✅ `./arch-migration.sh audit` shows 0 violations
4. ✅ `npm run build` succeeds
5. ✅ All tests pass
6. ✅ Original behavior preserved in new structure

**The goal: Clean architecture in `/newFrontend` while `/frontend` remains pristine.**