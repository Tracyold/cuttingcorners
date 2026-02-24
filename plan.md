# Cutting Corners Gems — Full Build Plan (UPDATED)

## 1) Objectives

- Deliver a production-quality **single Next.js + TypeScript** web app for Cutting Corners Gems with three tiers: **Guest**, **Account User**, **Admin**.
- Preserve the **existing Supabase DB** (16 tables + RLS + triggers + buckets). **No SQL, no schema changes.**
- Implement **Stripe Checkout Sessions + Webhook** using **Next.js API routes** only.
- Match the established visual system from the canonical `.tsx` reference files (LandingPage, TopNav, ProductPage, AdminProductPage, AdminPortfolioPage, UserListsDash).
- Ensure all critical business rules are enforced:
  - DB prices are dollars `NUMERIC(12,2)` → `formatMoney(value)` directly (never multiply/divide)
  - Invoice display uses `invoices.line_items[0]` JSONB only (never join to `products`)
  - Admin verification via `admin_users` after auth login
  - Never double-fire SMS (do not manually call `send-user-notification` except admin→user chat)

### Architecture Objective (FINAL — NON-NEGOTIABLE)
- **Single Next.js TypeScript application** lives entirely in `/app/frontend/`
  - All pages/components: **`.tsx`**
  - All API routes: **`.ts`** in Next.js `/api/*`
- `/app/backend/server.py` is **transparent infrastructure passthrough only** (equivalent to `proxy_pass`), with **zero business logic**, using the **exact code provided**.
- No separate backend service. No Express. No FastAPI application logic.

### Progress / Completed So Far
- ✅ All core specs and schema documentation were read and indexed:
  - `jhf/BuildPrompt/BuildPrompt.md`
  - `jhf/FullBuildSchema.md`
  - `jhf/DatabaseSchema/DBSchema.md`
  - `jhf/DatabaseIntro/Intro.md`
  - `jhf/DatabaseIntro/DBConnectionsScheema.md`
  - Key page specs (Landing, Footer, Portfolio, Product flows, Admin pages)
- ✅ Critical runtime identifiers obtained:
  - Guest Account UUID (must be env-based): `NEXT_PUBLIC_GUEST_ACCOUNT_USER_ID=18cf77dc-6e41-42bb-abb3-0ae8615bbc20`
- ✅ Landing page image replacement policy confirmed:
  - Use local assets: `/public/assets/yu1iknms_IMG_3821.jpeg`, `/public/assets/sqy5b97p_IMG_3573.jpeg`, `/public/assets/c2cwyfwb_IMG_5555.jpeg`

---

## 2) Implementation Steps (Phased)

> **Mandatory build sequence:** Follow `jhf/BuildPrompt/BuildPrompt.md` Phases 1–6, Steps 1–26 **exactly**. Build one step at a time.

### Phase 1 — Foundation

#### Step 1 — Project Setup (Convert CRA → Next.js + TypeScript)
User stories:
1. As a developer, I have a single Next.js TypeScript app that runs on port 3000.
2. As a system, `/api/*` requests reach Next.js API routes via infrastructure passthrough.

Steps:
- Convert `/app/frontend/` from CRA/CRACO to **Next.js + TypeScript**.
- Configure Tailwind for Next.js.
- Load Google Fonts globally: **Oranienbaum, Montserrat, Comfortaa, Cormorant, DM Sans**.
- Add routing skeleton per FullBuild routing map.
- Implement `/app/backend/server.py` as the exact transparent passthrough provided (raw body forwarded untouched for Stripe signature verification).

Deliverables:
- Next.js dev server running.
- `/api/*` requests successfully reach Next.js API routes through passthrough.

#### Step 2 — Shared Utilities
User stories:
1. As a developer, I have standardized money/date utilities and Supabase clients.

Steps:
- Create shared utilities:
  - `formatMoney(value)` for DB dollars (`NUMERIC(12,2)`)
  - `fmtDate(timestamp)`
  - `fmtTime(timestamp)`
- Create Supabase client singleton(s):
  - Browser/client using anon key
  - Server-only client using service role key (API routes only)

Deliverables:
- Utility module(s) used across pages + API routes.

#### Step 3 — Footer Component
User stories:
1. As a visitor, I see a consistent footer on public pages.

Steps:
- Build `components/Footer.tsx` per Footer spec.
- Ensure it is not shown on `/admin/*` routes or `/account`.

Deliverables:
- Footer rendered on public pages only.

---

### Phase 2 — Public Pages

#### Step 4 — Landing Page
User stories:
1. As a visitor, I see the production landing page exactly as designed.

Steps:
- Drop in provided `LandingPage.tsx` and `TopNav.tsx` as-is (no redesign).
- Only allowed edits in LandingPage:
  - Add `<TopNav />` at top of `<main>`
  - Fix hrefs: `/gallery` → `/portfolio`, `/booking` → `/shop`
  - Replace broken image URLs with:
    - `/assets/yu1iknms_IMG_3821.jpeg`
    - `/assets/sqy5b97p_IMG_3573.jpeg`
    - `/assets/c2cwyfwb_IMG_5555.jpeg`
  - Add `<Footer />`
- **Never remove `md:hidden` / `hidden md:*` classes.**

Deliverables:
- Landing page matches reference behavior and layout.

#### Step 5 — Portfolio Page (Public)
User stories:
1. As a visitor, I can browse published portfolio photos and open a modal.

Steps:
- Build `/portfolio` using Landing + ProductPage visual style.
- Supabase query:
  - `portfolio_photos` where `published = true` and `archived = false`, order by `sort_order`.
- Implement:
  - 2-column square grid
  - year + caption labels
  - desktop hover behavior
  - mobile two-tap focus → open modal
  - modal with Escape/outside-click close
- Add `<TopNav />` and `<Footer />`.

Deliverables:
- Public portfolio fully functional.

#### Step 6 — Shop / Product Page (Public)
User stories:
1. As a visitor, I can browse active products, inquire, and purchase.

Steps:
- Drop in provided `ProductPage.tsx` (public shop) and wire to Supabase:
  - Read from `shop_active_products` view.
- Implement:
  - Product detail modal
  - Inquiry flows:
    - account users → `account_inquiries` + optional photo upload to `ChatUploads`
    - guests → guest info popup + `guest_inquiries` + optional photo upload to `guest-inquiry-photos`
  - Purchase flows:
    - invoice preview modal (UI only; no DB writes)
    - call `/api/checkout/create-session` and redirect to Stripe
  - Call `send-admin-notification` edge function after inquiries

Deliverables:
- Public shop flows match spec.

#### Step 7 — Stripe Checkout Endpoint (Next.js API Route)
User stories:
1. As a buyer, I can create a Checkout Session and be redirected to Stripe.

Steps:
- Implement `POST /api/checkout/create-session` in Next.js.
- Handles authenticated users + guests.
- Pre-fill Stripe customer info.
- Pass required snapshots via metadata (for webhook-time invoice insert).

Deliverables:
- Returns `{ url }` for Stripe Checkout.

#### Step 8 — Stripe Webhook (Next.js API Route)
User stories:
1. As a system, payment success creates exactly one invoice and triggers downstream DB triggers.

Steps:
- Implement `POST /api/webhooks/stripe` in Next.js.
- Verify Stripe signature using **raw body**.
- Listen for **`checkout.session.completed`**.
- Insert into `public.invoices` using server-only Supabase service role key.
- For guests: `account_user_id = NEXT_PUBLIC_GUEST_ACCOUNT_USER_ID` (env-driven, never hardcoded).
- Idempotency:
  - If insert conflicts on `stripe_session_id` or `stripe_payment_intent_id`, return `200` immediately.
- Do not update product state; do not send notifications (DB triggers handle).

Deliverables:
- Reliable, idempotent invoice creation via webhook.

---

### Phase 3 — Auth Pages

#### Step 9 — Account User Login
User stories:
1. As a customer, I can login with phone + OTP and reach `/account`.

Steps:
- Build `/login` per spec.
- On success:
  - ensure `account_users` row exists for `auth.uid()` (insert if missing)
  - redirect to `/account`

Deliverables:
- Account OTP login working end-to-end.

#### Step 10 — Admin Login
User stories:
1. As an admin, I can login with email + password and be verified against `admin_users`.

Steps:
- Build `/admin/login` per spec.
- Always verify `admin_users` row exists for the auth user id; sign out on failure.
- Redirect to `/admin/dashboard`.

Deliverables:
- Admin login guard enforced.

---

### Phase 4 — Account User Dashboard

#### Steps 11–16
User stories:
- Shell split-panel + mobile drawer chat
- Home: profile + stats + SMS preferences (upsert)
- Work Orders: list + accept + PDF (admin info fetched dynamically)
- Inquiries: product inquiries + service requests (SMS gate + required `service_type`)
- Invoices: list + PDF using `line_items[0]` only
- Chat: realtime, uploads to `ChatUploads`, mark read behavior, `send-admin-notification` on send

Deliverables:
- Full account dashboard per spec.

---

### Phase 5 — Admin Portal

#### Steps 17–23
User stories:
- Admin shell + sidebar + realtime notification bell
- Admin dashboard: profile edit + stats + realtime feed
- Admin products: queue pattern CRUD + auto-save
- Admin portfolio: queue pattern CRUD + sort swapping + archive
- Admin user list: guest banner pinned using env var; unread bubbles
- Individual user admin view: full user management + work orders + invoices + inquiries + SR + chat
  - Manual `send-user-notification` only for admin→user chat messages
- Guest user admin view: guest inquiries + guest invoices listed by buyer name snapshots

Deliverables:
- Full admin portal per spec.

---

### Phase 6 — Final Pass

#### Steps 24–26
- Routing & Navigation audit (TopNav/Footer visibility rules)
- Realtime audit: ensure replication enabled for required tables
- Mobile audit across all pages

Deliverables:
- Production-ready QA pass complete.

---

## 3) Next Actions (Immediate)

1. Replace `/app/backend/server.py` with the **exact passthrough code** provided (no deviations).
2. Convert `/app/frontend/` from CRA to **Next.js + TypeScript** (Step 1).
3. Add Next.js env vars in frontend `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `NEXT_PUBLIC_GUEST_ACCOUNT_USER_ID=18cf77dc-6e41-42bb-abb3-0ae8615bbc20`
   - `SUPABASE_SERVICE_ROLE_KEY` (server-only)
   - `STRIPE_SECRET_KEY` (server-only)
   - `STRIPE_WEBHOOK_SECRET` (server-only; set after deployment)
4. Proceed to Step 2 utilities, then Step 3 footer.

---

## 4) Success Criteria

- **Architecture:** One Next.js TypeScript app in `/app/frontend` providing both UI + API routes; backend is passthrough only.
- **Payments:** Checkout session creation works; webhook verifies signature; invoice insert is idempotent.
- **Triggers:** Product transitions to INACTIVE after invoice insert via DB trigger; notifications fire via DB triggers/edge functions only.
- **Data rules:** Money formatting uses DB dollars directly; invoice rendering uses `line_items[0]` only; admin info for PDFs fetched dynamically.
- **UX:** Visual system consistent with canonical reference TSX files; responsive behavior intact (especially Landing `md:hidden` rules).