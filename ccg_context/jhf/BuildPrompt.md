# Cutting Corners Gems — Emergent Build Directive  
Authority-First · Deployment-Aware · Drift-Resistant  
Canonical Version — February 24, 2026  
Grounded in: `CCG_context.zip` (schemas + reference .tsx + system specs)

──────────────────────────────────────────────────────────────────────────────
0) AUTHORITY ORDER (CONFLICT RESOLUTION)

If any instruction conflicts, resolve strictly in this order:

1. THIS DOCUMENT  
2. `jhf/BuildPrompt/BuildPrompt.md`  
3. `jhf/FullBuildSchema.md`  
4. Schema references + per-page schemas  
   - `jhf/DatabaseSchema/DBSchema.md`  
   - `jhf/DatabaseIntro/Intro.md`  
   - `jhf/DatabaseIntro/DBConnectionsScheema.md`  
   - All `jhf/**/**Schema.md` files  
5. Canonical visual references (do not restyle):  
   - `jhf/LandingPage/LandingPage.tsx`  
   - `jhf/Navigation/TopNav/TopNav.tsx`  
   - `jhf/ProductPage/Public/tsx/ProductPage.tsx`  
   - `jhf/ProductPage/Admin/tsx/AdminProductPage.tsx`  
   - `jhf/PortfolioPage/Admin/tsx/AdminPortfolioPage.tsx`  
   - `jhf/Admin/AdminDash/AdminUsersList/UsersListEntities/ULDA/UserListsDash.tsx`

If you believe the database/schema is missing something, you are incorrect. Re-check the docs above. Do not “fix” the backend.

──────────────────────────────────────────────────────────────────────────────
1) AMBIGUITY RESOLUTION PROTOCOL (MANDATORY DEFAULTS)

If an implementation detail is ambiguous, default in this order:

A. Default to the documented DB schema (field names, types, RLS intent).  
B. Default to the closest canonical .tsx reference for layout + typography + spacing + palette.  
C. Default to least-privileged security behavior (anon client + RLS; server role only in server routes).  
D. Default to deterministic + idempotent server behavior (webhooks must be safe under retries).  
E. Never invent new tables/columns/enums/triggers/functions/policies.  
F. Never refactor provided reference files for style, aesthetics, or “cleanup.”

If ambiguity remains after consulting the authority set, stop and request clarification. Do not infer.

──────────────────────────────────────────────────────────────────────────────
2) PROJECT CLASSIFICATION

Build a production Next.js TypeScript web app for Cutting Corners Gems (Tempe, Arizona).  
Treat this as a live commerce system: strict secrets handling, strict auth boundaries, deterministic payment flow, and schema fidelity.

──────────────────────────────────────────────────────────────────────────────
3) NON-NEGOTIABLE DATABASE IMMUTABILITY

The Supabase database is complete.

ABSOLUTE PROHIBITIONS:
- Do not run SQL.
- Do not add/alter/drop tables/columns/enums/constraints.
- Do not change RLS policies.
- Do not create triggers/functions.
- Do not create Stripe support tables (no `stripe_webhook_events`, no `webhook_logs`, no normalized `stripe_*` tables).

Your job is to conform app code to the existing database.

──────────────────────────────────────────────────────────────────────────────
4) TYPE SYSTEM + FILE RULES

- All React component files are `.tsx`.  
- No `.js`, no `.jsx`, no `.ts` for component files.  
- Keep a single routing strategy across the codebase (do not mix conventions).  
- Place provided reference components into the chosen Next.js structure without rewriting their internal design system.

DRIFT GUARD:
- No new design language.
- No default UI library skins.
- No unstyled HTML pages.
- No “cleanup refactors” of reference files unless explicitly required by spec.

──────────────────────────────────────────────────────────────────────────────
5) VISUAL SYSTEM IS DEFINED BY EXISTING .TSX

The .tsx files in the bundle define the visual grammar (typography, palette, spacing, corner language, glows, interaction patterns).

RULE:
If a page/component has no reference file, match the closest reference exactly:
- Public pages: `LandingPage.tsx` + `ProductPage.tsx`
- Admin pages: `AdminProductPage.tsx` + `AdminPortfolioPage.tsx` + `UserListsDash.tsx`
- Account dashboard: `ProductPage.tsx` visual language

PROHIBITION:
Do not invent or migrate styling paradigms.

──────────────────────────────────────────────────────────────────────────────
6) ENVIRONMENT VARIABLES (SECRETS + BOUNDARY)

Use environment variables exactly as specified in `jhf/FullBuildSchema.md`.

Supabase:
- `NEXT_PUBLIC_SUPABASE_URL=`  
- `NEXT_PUBLIC_SUPABASE_ANON_KEY=`  
- `SUPABASE_SERVICE_ROLE_KEY=`        (SERVER ONLY — never expose to client)

Stripe:
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=`  
- `STRIPE_SECRET_KEY=`                (SERVER ONLY)  
- `STRIPE_WEBHOOK_SECRET=`            (SERVER ONLY — will be added AFTER Stripe webhook endpoint is created)

App:
- `NEXT_PUBLIC_GUEST_ACCOUNT_USER_ID=`  (UUID of pre-seeded Guest account user)

HARD PROHIBITIONS:
- Never hardcode any env var values.
- Never commit secrets.
- Never expose `SUPABASE_SERVICE_ROLE_KEY`, `STRIPE_SECRET_KEY`, or `STRIPE_WEBHOOK_SECRET` to the client bundle.
- Never use service role key in browser code.

IMPORTANT PRACTICE:
The builder must code against env var NAMES, not literal values. Secret values are provided in Render’s environment configuration.

──────────────────────────────────────────────────────────────────────────────
7) SUPABASE CLIENT RULES (DRIFT HOTSPOT)

Implement two Supabase clients:

Browser client:
- Uses anon key
- Subject to RLS

Server-only client:
- Uses service role key
- Used ONLY inside server routes (webhook, server actions/endpoints as specified)

RULES:
- Never “solve” permission errors by switching browser flows to service role.
- Admin authorization must be verified against `admin_users` after Auth login; session alone is insufficient.

──────────────────────────────────────────────────────────────────────────────
8) CORE INVOICE TRUTH (DATABASE FIELDS ARE AUTHORITATIVE)

Your `public.invoices` table fields (must be respected):

- `invoice_id` uuid (default uuid_generate_v4)
- `account_user_id` uuid NOT NULL
- `stripe_session_id` text NOT NULL
- `stripe_payment_intent_id` text NULLABLE
- `invoice_state` invoice_state NOT NULL default 'PAID'
- `paid_at` timestamptz NOT NULL default now()
- `line_items` jsonb NOT NULL default []
- `total_amount` numeric NOT NULL
- `account_snapshot` jsonb NOT NULL default {}
- `admin_snapshot` jsonb NOT NULL default {}
- `archived_at` nullable
- `updated_at` default now()

Invoice creation is performed by the Stripe webhook handler route (application layer), not manually by UI pages.

DRIFT GUARD:
- Invoice display must read from `invoices.line_items[0]` JSONB.
- Never join to `products` for invoice display.
- Admin identity on PDFs must be fetched dynamically from `admin_users` (never hardcode business info).

──────────────────────────────────────────────────────────────────────────────
9) PRICES (DOLLARS) VS STRIPE AMOUNTS (CENTS) — CRITICAL NUANCE

Database prices are stored as dollars in `NUMERIC(12,2)`.  
Use `formatMoney(value)` directly. Never convert DB prices.

Stripe amounts are in cents (smallest currency unit).  
When inserting into `invoices.total_amount` (numeric dollars), convert cents → dollars exactly once.

Never apply the “no conversion” rule to Stripe’s amount_total/amount_received values.

──────────────────────────────────────────────────────────────────────────────
10) STRIPE STATUS — NOT YET CONFIGURED IN STRIPE DASHBOARD (DEPLOYMENT-GATED)

Stripe is NOT currently hooked up in the Stripe Dashboard.

There is no configured webhook endpoint yet because the webhook URL must be the deployed HTTPS URL.

IMPLEMENTATION REQUIREMENT (NOW):
- Build the routes and code paths as specified, but do not assume Stripe is configured until after deployment.

CONFIGURATION TIMING (LATER):
- Stripe Dashboard configuration happens only AFTER the site is deployed on Render and has a stable HTTPS domain.

──────────────────────────────────────────────────────────────────────────────
11) STRIPE ROUTES (MUST EXIST BEFORE DEPLOYMENT)

These are Next.js server routes (not database objects):

A) `/api/checkout/create-session`
- Build per `jhf/BuildPrompt/BuildPrompt.md` Step 7.
- Handles authenticated users and guests.
- Returns Stripe Checkout Session URL.
- Prefills customer info from account or guest form.
- Passes `admin_snapshot` + `account_snapshot` (or enough metadata to reconstruct them deterministically).

B) `/api/webhooks/stripe`
- Build per `jhf/BuildPrompt/BuildPrompt.md` Step 8.
- Verify Stripe signature using `STRIPE_WEBHOOK_SECRET`.
- Read raw body before parsing.
- Listen for the success event as specified (BuildPrompt says `payment_intent.succeeded`).
- On success: insert into `public.invoices` with frozen:
  - `line_items`
  - `account_snapshot`
  - `admin_snapshot`
  - plus required fields (`account_user_id`, `stripe_session_id`, `total_amount`)
- For guests: use the Guest account ID from env (do not hardcode).

IDEMPOTENCY REQUIREMENT:
- Use `stripe_session_id` as the idempotency key (dedupe behavior must tolerate Stripe retries).
- Treat unique-violation on `stripe_session_id` as “already processed” and return a success response.

PROHIBITIONS IN WEBHOOK:
- Do not update product status (DB trigger handles it).
- Do not manually send invoice/work order/new listing user notifications (DB triggers handle these).

──────────────────────────────────────────────────────────────────────────────
12) STRIPE DASHBOARD SETUP (AFTER RENDER DEPLOYMENT ONLY)

After deployment to Render (onrender.com):

1. Confirm production domain is live over HTTPS.
2. In Stripe Dashboard → Developers → Webhooks:
   - Add endpoint URL:
     `https://<your-render-domain>/api/webhooks/stripe`
   - Select events required by the webhook implementation.
3. Copy the webhook Signing Secret (`whsec_...`).
4. Set `STRIPE_WEBHOOK_SECRET` in Render environment variables.
5. Redeploy/restart the service.
6. Test with Stripe “Send test event” and confirm invoice row creation in `public.invoices`.

Do not attempt webhook dashboard configuration before a real deployed URL exists.

──────────────────────────────────────────────────────────────────────────────
13) NOTIFICATIONS + SMS (DOUBLE-FIRING PREVENTION)

Never call `send-user-notification` manually for work orders, invoices, or new listings.  
DB triggers handle these automatically.

ONLY permitted manual call:
- Admin → User chat messages from the admin user dashboard view.

Do not add additional notification behaviors beyond the documented model.

──────────────────────────────────────────────────────────────────────────────
14) GUEST MODEL (STRICT)

Guests map to ONE pre-seeded guest account.

- Always read from `NEXT_PUBLIC_GUEST_ACCOUNT_USER_ID`.
- Never identify by email.
- Never create dynamic guest account rows.

──────────────────────────────────────────────────────────────────────────────
15) STORAGE BUCKETS (EXACT NAMES; DO NOT DRIFT)

Use only these bucket names (per `jhf/FullBuildSchema.md`):
- `portfolio-photos` (public)
- `ChatUploads` (private)
- `guest-inquiry-photos` (private)

Do not create new buckets. Do not rename buckets.

──────────────────────────────────────────────────────────────────────────────
16) REALTIME + REPLICATION (IMPLEMENTATION-SAFETY)

Where realtime is required, implement via Supabase Realtime per spec.
Do not replace with polling unless explicitly permitted.
Do not build custom websocket layers.

──────────────────────────────────────────────────────────────────────────────
17) BUILD SEQUENCE (ONE ITEM AT A TIME; NO PARALLEL SKIPPING)

Follow the phase order exactly as defined in:
- `jhf/BuildPrompt/BuildPrompt.md`
- `jhf/FullBuildSchema.md`

Complete each item fully before moving to the next. Do not skip ahead.

──────────────────────────────────────────────────────────────────────────────
18) IMPLEMENTATION START CONDITION

Before writing code, you must have read:
- `jhf/BuildPrompt/BuildPrompt.md`
- `jhf/FullBuildSchema.md`
- `jhf/DatabaseSchema/DBSchema.md`
- `jhf/DatabaseIntro/DBConnectionsScheema.md`
- All relevant per-page schemas under `jhf/**/**Schema.md`
- Canonical .tsx visual references (listed in Section 0)

Proceed with Phase 1 exactly as ordered.

END OF DIRECTIVE
