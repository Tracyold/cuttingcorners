#!/bin/bash
# arch.sh - Frontend Migration & Architecture Automation
# 
# CRITICAL RULES:
# - /frontend = READ ONLY (source, immutable)
# - /newFrontend = WRITE ONLY (target, new architecture)
# - NO modifications to /frontend ever
# - ALL outputs go to /newFrontend

set -e

VERSION="2.0.0"
REFACTOR_DIR="refactor-map"

# CRITICAL PATHS
SOURCE_DIR="/frontend"              # READ ONLY - never modify
TARGET_DIR="/newFrontend"           # WRITE ONLY - all outputs
TARGET_SRC="/newFrontend/src"       # Application root

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m'

# ============================================================================
# HELPER FUNCTIONS
# ============================================================================

print_header() {
    echo ""
    echo "╔════════════════════════════════════════════════════════════╗"
    printf "║  %-58s║\n" "$1"
    echo "╚════════════════════════════════════════════════════════════╝"
    echo ""
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_step() {
    echo -e "${PURPLE}▶ $1${NC}"
}

check_required_files() {
    local files=(
        "CLAUDE.md"
        "ARCHITECTURE_CONTRACT.md"
        "ARCHITECTURE_LAYER_CLARIFICATION.md"
        "REFACTOR_PLAYBOOK.md"
        "MODULE_GENERATOR_PROMPT.md"
        "FRONTEND_RESTRUCTURE_MIGRATION_CONTRACT.md"
    )
    
    print_step "Checking required documentation..."
    
    for file in "${files[@]}"; do
        if [ ! -f "$file" ]; then
            print_warning "Missing: $file (optional)"
        fi
    done
    
    print_success "Documentation check complete"
}

check_system_separation() {
    print_step "Verifying source/target separation..."
    
    # Check source exists (read-only)
    if [ ! -d "$SOURCE_DIR" ]; then
        print_warning "Source directory not found: $SOURCE_DIR"
        print_info "This is OK if you're only generating new modules"
    else
        print_success "Source directory found: $SOURCE_DIR (READ ONLY)"
    fi
    
    # Check target exists (write-only)
    if [ ! -d "$TARGET_DIR" ]; then
        print_error "Target directory not found: $TARGET_DIR"
        print_info "Expected: $TARGET_DIR for all outputs"
        exit 1
    fi
    
    print_success "Target directory found: $TARGET_DIR (WRITE ONLY)"
    
    # Verify target/src exists
    if [ ! -d "$TARGET_SRC" ]; then
        print_warning "Creating $TARGET_SRC"
        mkdir -p "$TARGET_SRC"
    fi
}

# ============================================================================
# COMMAND: audit
# Audit newFrontend architecture (never touches /frontend)
# ============================================================================

cmd_audit() {
    print_header "ARCHITECTURE AUDIT - $TARGET_DIR"
    
    mkdir -p "$REFACTOR_DIR"
    
    print_info "Auditing ONLY the target system: $TARGET_DIR"
    print_warning "Source system ($SOURCE_DIR) is never modified"
    echo ""
    
    claude -p "
ARCHITECTURE AUDIT - TARGET SYSTEM ONLY

CRITICAL RULES:
- NEVER modify or analyze $SOURCE_DIR
- ONLY audit $TARGET_DIR
- Source is immutable reference only

Read documentation:
1. ARCHITECTURE_CONTRACT.md - Structure rules
2. ARCHITECTURE_LAYER_CLARIFICATION.md - Type placement
3. FRONTEND_RESTRUCTURE_MIGRATION_CONTRACT.md - Migration rules

PATHS TO AUDIT:
- Target root: $TARGET_SRC
- Modules: $TARGET_SRC/modules/
- Types: $TARGET_SRC/types/
- Services: $TARGET_SRC/services/
- Actions: $TARGET_SRC/actions/
- Data: $TARGET_SRC/data/
- App: $TARGET_SRC/app/

TASK: Audit $TARGET_SRC for architecture compliance

## 1. STRUCTURAL VALIDATION

Check each module in $TARGET_SRC/modules/:
- Required files present:
  - <domain>.types.ts
  - <domain>.data.ts
  - <domain>.service.ts
  - <domain>.actions.ts
- List missing files
- List any violations

## 2. LAYER SEPARATION CHECK

### Data Layer ($TARGET_SRC/modules/*/*.data.ts)
Find violations:
- [ ] Business logic (if/else beyond query building)
- [ ] Validation rules
- [ ] Service/UI imports
- [ ] Anything beyond Supabase queries

### Service Layer ($TARGET_SRC/modules/*/*.service.ts)
Find violations:
- [ ] Direct Supabase imports
- [ ] UI imports
- [ ] Missing business logic

### Action Layer ($TARGET_SRC/modules/*/*.actions.ts)
Find violations:
- [ ] Business logic (should be thin)
- [ ] Direct data layer calls (should call service)
- [ ] Validation (belongs in service)

### UI Layer ($TARGET_SRC/app/**)
Find violations:
- [ ] Direct Supabase access
- [ ] Service imports (should only call actions)
- [ ] Business logic

## 3. TYPE PLACEMENT CHECK

Per ARCHITECTURE_LAYER_CLARIFICATION.md:

### Global Types ($TARGET_SRC/types/)
Should ONLY contain:
- ID, UUID (identity primitives)
- ApiResponse, PaginatedResponse (wrappers)
- Timestamp, DateRange (time primitives)
- Generic error/result types

Should NOT contain:
- Domain entities (Invoice, Product, User)
- Domain enums (InvoiceStatus, OrderType)
- Business types

### Module Types ($TARGET_SRC/modules/*/*.types.ts)
Should contain:
- Domain-specific entities
- Domain enums
- Input/output types for that domain

Check for:
- [ ] Duplicate types (same type in global AND module)
- [ ] Cross-module imports (module A importing module B's types)
- [ ] Domain entities in global types

## 4. OUTPUT REPORT

Create: $REFACTOR_DIR/audit-report.md

Structure:
\`\`\`markdown
# Architecture Audit Report
Date: $(date)
Target: $TARGET_SRC

## Summary
- Total modules: X
- Violations found: X
- Critical issues: X
- Warnings: X

## Module Structure
[List each module and compliance status]

## Layer Violations
### Data Layer
[List violations with file:line]

### Service Layer
[List violations]

### Action Layer
[List violations]

### UI Layer
[List violations]

## Type Placement Issues
### Duplicates
[List any duplicate types]

### Misplaced Types
[Domain entities in global, etc.]

### Cross-Module Imports
[Modules importing from other modules]

## Recommendations
[Priority-ordered fixes]
\`\`\`

OUTPUT: Report saved to $REFACTOR_DIR/audit-report.md
" \
    --allowedTools "Read,Write" \
    --bare > /tmp/audit-output.json
    
    if [ -f "$REFACTOR_DIR/audit-report.md" ]; then
        print_success "Audit complete!"
        echo ""
        print_info "Report: $REFACTOR_DIR/audit-report.md"
        echo ""
        print_step "View report:"
        echo "  cat $REFACTOR_DIR/audit-report.md"
    else
        print_error "Audit failed - no report generated"
        exit 1
    fi
}

# ============================================================================
# COMMAND: extract
# Extract code from /frontend and rebuild in /newFrontend
# ============================================================================

cmd_extract() {
    local domain=$1
    
    if [ -z "$domain" ]; then
        print_error "Domain name required"
        print_info "Usage: arch extract <domain>"
        print_info "Example: arch extract invoices"
        exit 1
    fi
    
    print_header "EXTRACT & REBUILD: $domain"
    
    if [ ! -d "$SOURCE_DIR" ]; then
        print_error "Source directory not found: $SOURCE_DIR"
        exit 1
    fi
    
    print_warning "READ FROM: $SOURCE_DIR (immutable)"
    print_success "WRITE TO: $TARGET_SRC/modules/$domain/ (new architecture)"
    echo ""
    
    claude -p "
EXTRACT & REBUILD MODULE: $domain

Read documentation:
1. FRONTEND_RESTRUCTURE_MIGRATION_CONTRACT.md - Migration rules
2. ARCHITECTURE_CONTRACT.md - Target structure
3. MODULE_GENERATOR_PROMPT.md - Generation template

CRITICAL RULES:
- READ from $SOURCE_DIR (DO NOT MODIFY)
- WRITE to $TARGET_SRC/modules/$domain/
- NEVER change anything in $SOURCE_DIR

TASK: Migrate $domain module

## STEP 1: ANALYZE SOURCE (READ ONLY)

Scan $SOURCE_DIR for $domain-related code:
- Find all files related to $domain
- Identify:
  - UI components
  - Business logic
  - Data access
  - Type definitions
  - API calls
  - Utilities

Document findings but DO NOT modify source.

## STEP 2: MAP RESPONSIBILITIES

For each piece of code, determine:
- Is it UI? → Goes to types/components (will inform new UI)
- Is it business logic? → Extract to service layer
- Is it data access? → Extract to data layer
- Is it a type? → Determine if global or module-specific

## STEP 3: REBUILD IN TARGET

Create in $TARGET_SRC/modules/$domain/:

### 3.1: $domain.types.ts
Extract and rebuild type definitions:
- Domain entities
- Enums
- Input/output types
- Import shared primitives from $TARGET_SRC/types/

### 3.2: $domain.data.ts
Extract data access logic:
- Database queries
- API calls
- ONLY data retrieval
- NO business logic

### 3.3: $domain.service.ts
Extract business logic:
- Validation
- Calculations
- Transformations
- Workflows
- ALL business rules

### 3.4: $domain.actions.ts
Create UI entry points:
- Thin wrappers around services
- Get userId from session
- NO logic

## STEP 4: VERIFY SEPARATION

Check that:
- [ ] Source ($SOURCE_DIR) was not modified
- [ ] All code properly separated into layers
- [ ] No business logic in data layer
- [ ] No data access in service layer
- [ ] Types properly placed (global vs module)

## STEP 5: OUTPUT SUMMARY

Create: $REFACTOR_DIR/extract-$domain-report.md

Document:
- What was extracted from source
- How it was restructured
- Files created in target
- Any issues or decisions made

TARGET FILES TO CREATE:
- $TARGET_SRC/modules/$domain/$domain.types.ts
- $TARGET_SRC/modules/$domain/$domain.data.ts
- $TARGET_SRC/modules/$domain/$domain.service.ts
- $TARGET_SRC/modules/$domain/$domain.actions.ts
" \
    --allowedTools "Read,Write,Create" \
    --bare
    
    print_success "Extraction complete!"
    echo ""
    print_info "Check generated files:"
    echo "  ls -la $TARGET_SRC/modules/$domain/"
    echo ""
    print_info "Review extraction report:"
    echo "  cat $REFACTOR_DIR/extract-$domain-report.md"
}

# ============================================================================
# COMMAND: inventory
# Analyze /frontend to understand what exists (read-only analysis)
# ============================================================================

cmd_inventory() {
    print_header "SOURCE INVENTORY - READ ONLY"
    
    if [ ! -d "$SOURCE_DIR" ]; then
        print_error "Source directory not found: $SOURCE_DIR"
        exit 1
    fi
    
    mkdir -p "$REFACTOR_DIR"
    
    print_warning "Analyzing $SOURCE_DIR (READ ONLY - no modifications)"
    echo ""
    
    claude -p "
SOURCE SYSTEM INVENTORY

Read: FRONTEND_RESTRUCTURE_MIGRATION_CONTRACT.md

CRITICAL: This is READ-ONLY analysis
- Scan $SOURCE_DIR
- Document everything
- DO NOT modify anything
- DO NOT restructure anything

TASK: Create comprehensive inventory of source system

## 1. DIRECTORY STRUCTURE

Map the entire structure of $SOURCE_DIR:
- List all directories
- Note organization pattern
- Identify any existing structure

## 2. FILE INVENTORY

Categorize all files:
- Pages/components (UI)
- API routes/handlers
- Utility functions
- Type definitions
- Configuration files
- Styles

## 3. CODE ANALYSIS

For each significant file, identify:
- Responsibility (UI/logic/data)
- Dependencies
- Database/API calls
- Business logic location
- Shared utilities

## 4. DOMAIN DETECTION

Infer potential domains based on:
- File names
- Directory structure
- Database tables referenced
- API endpoints
- Related functionality

Suggest domain groupings like:
- invoices
- products
- users
- orders
- customers

## 5. COMPLEXITY ASSESSMENT

Identify:
- Deeply nested logic
- Scattered responsibilities
- Mixed concerns
- Duplicated code
- Tightly coupled components

## 6. MIGRATION PRIORITIES

Recommend extraction order:
1. Simple, standalone modules first
2. Modules with clear boundaries
3. Complex, interdependent modules last

## OUTPUT

Create: $REFACTOR_DIR/source-inventory.md

Structure:
\`\`\`markdown
# Source System Inventory
Date: $(date)
Source: $SOURCE_DIR

## Directory Structure
[Complete directory tree]

## File Categorization
### UI Components
[List with responsibilities]

### Business Logic
[List with location and purpose]

### Data Access
[List database/API calls]

### Utilities
[Shared functions]

## Suggested Domains
### Domain: invoices
- Files: [list]
- Responsibilities: [list]
- Complexity: Low/Medium/High

### Domain: products
...

## Migration Strategy
### Phase 1: Extract simple modules
- [domain1]
- [domain2]

### Phase 2: Extract core modules
- [domain3]

### Phase 3: Extract complex modules
- [domain4]

## Notes
[Any important observations]
\`\`\`

REMEMBER: This is analysis only - NO modifications to $SOURCE_DIR
" \
    --allowedTools "Read,Write" \
    --bare
    
    print_success "Inventory complete!"
    echo ""
    print_info "Review inventory:"
    echo "  cat $REFACTOR_DIR/source-inventory.md"
    echo ""
    print_step "Next steps:"
    echo "  1. Review suggested domains"
    echo "  2. Start extraction: ./arch.sh extract <domain>"
}

# ============================================================================
# COMMAND: generate
# Generate NEW module in /newFrontend (not extracted from /frontend)
# ============================================================================

cmd_generate() {
    local domain=$1
    shift
    local description="$*"
    
    if [ -z "$domain" ]; then
        print_error "Domain name required"
        print_info "Usage: arch generate <domain> [description]"
        print_info "Example: arch generate products 'Product catalog management'"
        exit 1
    fi
    
    print_header "GENERATE NEW MODULE: $domain"
    
    if [ -z "$description" ]; then
        description="Module for $domain"
    fi
    
    print_success "WRITE TO: $TARGET_SRC/modules/$domain/"
    print_info "Description: $description"
    echo ""
    
    claude -p "
GENERATE NEW MODULE: $domain

Read documentation:
1. MODULE_GENERATOR_PROMPT.md - Generation template
2. ARCHITECTURE_CONTRACT.md - Structure rules
3. ARCHITECTURE_LAYER_CLARIFICATION.md - Type placement

INPUT:
- Domain: $domain
- Description: $description
- Target: $TARGET_SRC/modules/$domain/

TASK: Generate complete module following strict architecture

## OUTPUT FILES

Create in $TARGET_SRC/modules/$domain/:

### 1. $domain.types.ts
Domain-specific types:
- Core entities
- Domain enums
- Input/output types
- Query/filter types
- Import shared primitives from @/types/common

### 2. $domain.data.ts
Supabase queries ONLY:
- CRUD operations
- Filtering/sorting
- Joins if needed
- NO business logic
- NO validation
- Return raw data

### 3. $domain.service.ts
ALL business logic:
- Validation functions
- Calculation helpers
- Business rules
- Transformations
- Calls data layer only
- NO direct Supabase

### 4. $domain.actions.ts
UI entry points:
- 'use server' directive
- Thin wrappers
- Get userId from session
- Call services only
- NO logic

## SELF-CHECK

Before output, verify:
- [ ] All files go to $TARGET_SRC/modules/$domain/
- [ ] Data layer has ONLY Supabase queries
- [ ] Service layer has ALL business logic
- [ ] Actions are thin wrappers
- [ ] Types properly placed (domain vs global)
- [ ] No layer mixing
- [ ] Imports use @ aliases correctly

## EXAMPLE STRUCTURE

Follow the same pattern as invoices module if it exists.

OUTPUT ALL FILES to $TARGET_SRC/modules/$domain/
" \
    --allowedTools "Read,Write,Create" \
    --bare
    
    print_success "Module generated: $TARGET_SRC/modules/$domain/"
    echo ""
    print_info "Files created:"
    ls -la "$TARGET_SRC/modules/$domain/" 2>/dev/null || print_warning "Directory not found - check generation output"
    echo ""
    print_step "Next steps:"
    echo "  1. Review generated files"
    echo "  2. Update imports if needed"
    echo "  3. Run: npm run build"
    echo "  4. Run: ./arch.sh audit"
}

# ============================================================================
# COMMAND: fix
# Auto-fix violations in /newFrontend (never touches /frontend)
# ============================================================================

cmd_fix() {
    print_header "AUTO-FIX VIOLATIONS"
    
    if [ ! -f "$REFACTOR_DIR/audit-report.md" ]; then
        print_error "No audit report found"
        print_info "Run audit first: ./arch.sh audit"
        exit 1
    fi
    
    print_warning "This will modify code in $TARGET_DIR ONLY"
    print_success "$SOURCE_DIR will NEVER be touched"
    echo ""
    read -p "Continue? (y/n) " -n 1 -r
    echo ""
    
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_info "Cancelled"
        exit 0
    fi
    
    claude -p "
AUTO-FIX ARCHITECTURE VIOLATIONS

Read:
1. $REFACTOR_DIR/audit-report.md - Violations found
2. ARCHITECTURE_CONTRACT.md - Correct structure
3. ARCHITECTURE_LAYER_CLARIFICATION.md - Type rules

CRITICAL RULES:
- ONLY modify files in $TARGET_DIR
- NEVER touch $SOURCE_DIR
- Fix violations one at a time
- Test after each fix

TASK: Fix all violations in audit report

## FIXING PATTERNS

### Pattern 1: Business Logic in Data Layer
MOVE to service layer:
- Validation → service
- Calculations → service  
- If/else rules → service

### Pattern 2: Supabase in Service Layer
MOVE to data layer:
- Extract query to data.ts
- Call from service

### Pattern 3: Duplicate Types
If type exists in both global AND module:
1. Determine correct location (1 module = module, 2+ = global)
2. Delete from wrong location
3. Update all imports

### Pattern 4: Cross-Module Imports
If module A imports from module B:
1. Promote shared type to $TARGET_SRC/types/
2. Update both modules to import from types
3. Delete from original module

## PROCESS

For each violation:
1. Identify correct layer
2. Move code
3. Update imports
4. Verify behavior preserved
5. Run: npm run build
6. Continue if successful

## OUTPUT

Create: $REFACTOR_DIR/fix-report.md

Document:
- Violations fixed
- Code moved
- Files modified
- Any remaining issues

ONLY MODIFY: $TARGET_DIR
NEVER TOUCH: $SOURCE_DIR
" \
    --allowedTools "Read,Write,Edit,Bash" \
    --bare
    
    print_success "Auto-fix complete!"
    echo ""
    print_info "Review changes and test:"
    echo "  npm run build"
    echo "  npm test"
    echo ""
    print_info "Check fix report:"
    echo "  cat $REFACTOR_DIR/fix-report.md"
}

# ============================================================================
# MAIN CLI ROUTER
# ============================================================================

show_help() {
    cat << EOF
arch - Frontend Migration & Architecture Automation v$VERSION

MIGRATION MODEL:
  $SOURCE_DIR  → READ ONLY  (source, immutable, never modified)
  $TARGET_DIR → WRITE ONLY (target, new architecture)

USAGE:
  arch <command> [options]

COMMANDS:
  inventory              Analyze source system (read-only)
  extract <domain>       Extract module from source → target
  generate <domain>      Generate NEW module in target
  audit                  Audit target architecture
  fix                    Auto-fix violations in target
  help                   Show this help

MIGRATION WORKFLOW:
  1. arch inventory                    # Understand source
  2. arch extract invoices             # Migrate one module
  3. arch audit                        # Check architecture
  4. arch fix                          # Fix any issues
  5. arch generate products            # Add new modules

EXAMPLES:
  # Analyze what exists in /frontend
  arch inventory

  # Extract invoices module from /frontend to /newFrontend
  arch extract invoices

  # Generate new products module in /newFrontend
  arch generate products "Product catalog"

  # Audit /newFrontend architecture
  arch audit

  # Fix violations in /newFrontend
  arch fix

CRITICAL RULES:
  ✅ /frontend is NEVER modified
  ✅ /newFrontend receives ALL outputs
  ✅ Extract reads source, writes target
  ✅ Generate creates new in target only

For more info: See FRONTEND_RESTRUCTURE_MIGRATION_CONTRACT.md
EOF
}

main() {
    # Print system info
    echo ""
    print_info "Frontend Migration System v$VERSION"
    print_warning "Source (READ ONLY): $SOURCE_DIR"
    print_success "Target (WRITE ONLY): $TARGET_DIR"
    echo ""
    
    # Check documentation
    check_required_files
    
    # Check system separation
    check_system_separation
    
    # Route command
    case "${1:-help}" in
        inventory)
            cmd_inventory
            ;;
        extract)
            cmd_extract "${2}"
            ;;
        generate)
            shift
            cmd_generate "$@"
            ;;
        audit)
            cmd_audit
            ;;
        fix)
            cmd_fix
            ;;
        help|--help|-h)
            show_help
            ;;
        *)
            print_error "Unknown command: $1"
            echo ""
            show_help
            exit 1
            ;;
    esac
}

main "$@"