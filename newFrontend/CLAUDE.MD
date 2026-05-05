# REPOSITORY STRUCTURE & FILE CREATION CONTRACT
## PURPOSE
This document defines strict rules for how any AI agent, developer, or automation system MUST interact with the existing repository structure.
It ensures:
- no duplicate folders
- no duplicate scaffold files
- correct use of pre-created empty files
- controlled creation of only missing files
---
# 1. EXISTING STRUCTURE IS PRE-DEFINED
## IMPORTANT RULE
The repository structure is already established.
This means:
- folders already exist
- some files already exist
- some files are intentionally EMPTY as placeholders
---
## PLACEHOLDER FILE MEANING
Empty files are NOT missing files.
They are intentional structure markers.
They represent:
- required architecture slots
- enforced module boundaries
- predefined system layout
---
# 2. CRITICAL BEHAVIOR RULE
## NEVER DO THE FOLLOWING
- ❌ create new folders if a folder already exists
- ❌ create duplicate files in existing structure
- ❌ rename existing structural files
- ❌ overwrite structure intent
---
## ALWAYS DO THE FOLLOWING
- ✔ detect existing folders first
- ✔ detect existing files first
- ✔ fill empty files with implementation
- ✔ only create new files if NO placeholder exists
---
# 3. FILE HANDLING PRIORITY ORDER
When implementing logic:
### STEP 1 — SCAN STRUCTURE
Check if:
- folder exists
- file exists (even if empty)
---
### STEP 2 — DECISION LOGIC
IF file exists AND is empty:
→ WRITE CODE INTO FILE
IF file exists AND has structure:
→ MODIFY ONLY WHAT IS NECESSARY
IF file does NOT exist:
→ CREATE FILE
---
# 4. MODULE STRUCTURE RULE
Each module is assumed to already exist in this form:

modules//
.types.ts
.data.ts
.service.ts
.actions.ts

Even if empty.
---
# 5. APP STRUCTURE RULE
App routes may already exist as empty shells:

app/
page.tsx
layout.tsx
(routes)/

These are NOT to be recreated.
They are to be populated.
---
# 6. LIB & INFRASTRUCTURE RULE
Existing infrastructure files such as:
- lib/supabase.ts
- lib/utils.ts
MUST NOT be duplicated.
They must be reused.
---
# 7. INTENT OF EMPTY FILES
Empty files exist to:
- enforce architecture consistency
- guarantee predictable code placement
- allow deterministic AI generation
- prevent structural drift
They are NOT placeholders to be replaced.
They are TARGET FILES for implementation.
---
# 8. CODE PLACEMENT RULE
All new logic MUST follow:
- place code into existing empty files first
- only expand structure if absolutely required
- never bypass predefined module slots
---
# 9. SAFETY RULE
If unsure:
→ DO NOT create new structure
→ default to existing file population
---
# 10. FINAL ARCHITECTURAL GUARANTEE
The repository structure is canonical.
AI systems must treat it as:
- fixed
- pre-approved
- non-expandable unless explicitly required
All implementation flows must respect existing file topology.