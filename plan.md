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
  - **Critical:** The raw request body is forwarded untouched to preserve Stripe webhook signature verification.
- No separate backend service. No Express. No FastAPI application logic.

### Updated Status Summary (as of current progress)
- ✅ Next.js + TypeScript running on port 3000
- ✅ `/api/*` passthrough on port 8001 forwarding to Next.js API routes works
- ✅ Shared utilities + Supabase client utilities implemented
- ✅ Footer built and correctly hidden on `/admin/*` and `/account`
- ✅ Landing page integrated with TopNav + Footer, fixed hrefs, replaced broken image URLs with `/public/assets/*`
- ✅ Public Portfolio page built (query + modal + mobile two-tap)
- ✅ Public Shop page built (query + product modal + guest info + invoice preview)
- ✅ Stripe API routes implemented:
  - `/api/checkout/create-session`
  - `/api/webhooks/stripe` (raw body, `checkout.session.completed`, idempotent invoice insert)
- ✅ Login pages implemented:
  - `/login` (phone + OTP)
  - `/admin/login` (email + password + admin_users verification)
- ✅ Placeholder shells present for `/account` and `/admin/dashboard`

### Known Blocking Issue (Auth)
- **Supabase Auth CAPTCHA is enabled**, causing auth failures in this environment.
  - Observed error: **"captcha verification process failed"** during `signInWithPassword`.
- Resolution options:
  1. **Preferred (fastest):** Disable CAPTCHA in Supabase Dashboard → **Authentication → Settings → Security**.
  2. **Alternative:** Integrate the configured CAPTCHA provider into the frontend auth flows (adds scope/complexity).

> Until CAPTCHA is disabled or integrated, **admin login and any user login flows may fail**.

---

## 2) Implementation Steps (Phased)

> **Mandatory build sequence:** Follow `jhf/BuildPrompt/BuildPrompt.md` Phases 1–6, Steps 1–26 **exactly**. Build one step at a time.

### Phase 1 — Foundation

#### Step 1 — Project Setup (Convert CRA → Next.js + TypeScript)
**Status:** ✅ Completed

Deliverables achieved:
- Next.js dev server running
- Tailwind configured
- Fonts loaded globally
- Backend passthrough in place and functioning

#### Step 2 — Shared Utilities
**Status:** ✅ Completed

Deliverables achieved:
- `formatMoney`, `fmtDate`, `fmtTime` utilities
- Supabase anon client + server-only service role client helper

#### Step 3 — Footer Component
**Status:** ✅ Completed

Deliverables achieved:
- `components/Footer.tsx` built per spec
- Footer hidden on `/admin/*` and `/account`

---

### Phase 2 — Public Pages

#### Step 4 — Landing Page
**Status:** ✅ Completed

Deliverables achieved:
- `<TopNav />` integrated at top of `<main>`
- href fixes applied: `/gallery` → `/portfolio`, `/booking` → `/shop`
- Broken `customer-assets.emergentagent.com` URLs replaced with `/assets/*.jpeg`
- `<Footer />` added
- `md:hidden` / `hidden md:*` classes preserved

#### Step 5 — Portfolio Page (Public)
**Status:** ✅ Completed

Deliverables achieved:
- Query: `portfolio_photos` where `published=true` and `archived=false`
- 2-column square grid, year + caption labels
- Desktop hover + mobile two-tap focus behavior
- Modal with Escape/outside-click close
- `<TopNav />` + `<Footer />`

#### Step 6 — Shop / Product Page (Public)
**Status:** ✅ Completed (UI + core flows)

Deliverables achieved:
- Query: `shop_active_products` view (fallback to `products` if needed)
- Product card grid + detail modal
- Guest info popup gate before inquiry/purchase
- Inquiry inserts:
  - Auth users → `account_inquiries`
  - Guests → `guest_inquiries`
- Invoice preview modal (UI-only, no DB writes)
- Initiates Stripe redirect via `/api/checkout/create-session`

Notes / future enhancements within spec:
- Add optional photo upload support for inquiries (buckets: `ChatUploads`, `guest-inquiry-photos`)

#### Step 7 — Stripe Checkout Endpoint (Next.js API Route)
**Status:** ✅ Completed

Deliverables achieved:
- `POST /api/checkout/create-session`
- Builds Checkout Session with authoritative product pricing
- Stores frozen `line_items`, `account_snapshot`, `admin_snapshot` in Stripe metadata

#### Step 8 — Stripe Webhook (Next.js API Route)
**Status:** ✅ Completed

Deliverables achieved:
- `POST /api/webhooks/stripe`
- Raw-body signature verification support (`bodyParser: false`)
- Listens for `checkout.session.completed`
- Inserts into `public.invoices` using Supabase **service role**
- Idempotency via unique constraint handling (23505)
- Does **not** update product state or send notifications (DB triggers handle)

---

### Phase 3 — Auth Pages

#### Step 9 — Account User Login
**Status:** ✅ Completed (implementation), ⚠️ Blocked by CAPTCHA config

Deliverables implemented:
- `/login` phone + OTP
- On success, ensures `account_users` row exists

Blocking:
- CAPTCHA enforcement may block OTP/auth flows depending on Supabase settings.

#### Step 10 — Admin Login
**Status:** ✅ Completed (implementation), ⚠️ Blocked by CAPTCHA config

Deliverables implemented:
- `/admin/login` email + password
- Verifies `admin_users` row exists for session user
- Signs out immediately if verification fails

Blocking:
- Supabase CAPTCHA currently prevents `signInWithPassword`.

---

### Phase 4 — Account User Dashboard
**Status:** ⏳ Pending (start after CAPTCHA resolved)

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
**Status:** ⏳ Pending (start after CAPTCHA resolved)

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
**Status:** ⏳ Pending

#### Steps 24–26
- Routing & Navigation audit (TopNav/Footer visibility rules)
- Realtime audit: ensure replication enabled for required tables
- Mobile audit across all pages

Deliverables:
- Production-ready QA pass complete.

---

## 3) Next Actions (Immediate)

1. **Resolve Supabase CAPTCHA block**:
   - Disable CAPTCHA in Supabase Dashboard (preferred), **or**
   - Provide CAPTCHA provider details for integration.
2. After CAPTCHA is resolved, proceed to:
   - Phase 4 Steps 11–16 (Account User Dashboard)
   - Phase 5 Steps 17–23 (Admin Portal)
3. Populate database with at least one PUBLISHED product and one published portfolio photo for full UI verification (no schema changes).
4. Run end-to-end flows:
   - Guest inquiry
   - Guest purchase → Stripe → webhook → invoice insert
   - Admin login → dashboard → user list
   - Account login → dashboard

---

## 4) Success Criteria

- **Architecture:** One Next.js TypeScript app in `/app/frontend` providing both UI + API routes; backend is passthrough only.
- **Payments:** Checkout session creation works; webhook verifies signature; invoice insert is idempotent.
- **Triggers:** Product transitions to INACTIVE after invoice insert via DB trigger; notifications fire via DB triggers/edge functions only.
- **Data rules:** Money formatting uses DB dollars directly; invoice rendering uses `line_items[0]` only; admin info for PDFs fetched dynamically.
- **UX:** Visual system consistent with canonical reference TSX files; responsive behavior intact (especially Landing `md:hidden` rules).
- **Auth:** Admin and account user auth flows function end-to-end (requires CAPTCHA resolution).