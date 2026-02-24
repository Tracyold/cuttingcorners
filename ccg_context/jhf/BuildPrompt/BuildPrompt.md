# Cutting Corners Gems — Emergent Build Prompt

*Canonical version — February 24, 2026*

-----

## WHO YOU ARE BUILDING FOR

You are building a production Next.js TypeScript web application for **Cutting Corners Gems**, a gemstone business in Tempe, Arizona run by Michael Wall. This is a real production site. Build accordingly.

-----

## BEFORE YOU WRITE A SINGLE LINE OF CODE — READ THIS ENTIRE DOCUMENT

### The database is complete. Do not touch it.

The Supabase database is fully built. All 16 tables exist. All columns exist. All RLS policies are in place. All DB triggers are confirmed running. All enums are defined. All constraints are set. All storage buckets exist.

**Do not run any SQL.**
**Do not add tables.**
**Do not add columns.**
**Do not add policies.**
**Do not drop anything.**
**Do not alter anything.**
**Do not create triggers.**
**Do not create functions.**

If you think something is missing from the database, you are wrong. Refer to the schema documentation and look again before touching anything.

-----

### All files are TypeScript. No exceptions.

Every file you create is `.tsx`. Never `.js`. Never `.jsx`. Never `.ts` for component files. If you create a non-TypeScript file by mistake, fix it immediately.

-----

### Design consistency rule — critical

Several pages already have complete, production-ready `.tsx` reference files provided to you:

- `LandingPage.tsx` — public landing page
- `TopNav.tsx` — top navigation
- `ProductPage.tsx` — public shop/product page
- `AdminProductPage.tsx` — admin products management
- `AdminPortfolioPage.tsx` — admin portfolio management
- `UserListsDash.tsx` — admin user list

**For any page or component that does NOT have a `.tsx` reference file, you must derive and match the design, layout, typography, color system, spacing, and component patterns from the existing `.tsx` files above.** The existing files are the design system. Every page you build from scratch must look and feel like it belongs to the same application. If a page has no reference file, look at the closest existing file and match it exactly in style — then apply the spec for that page’s specific content and functionality.

Do not invent a new design language. Do not use default component library styles. Do not use unstyled HTML. Everything must match the established visual system.

-----

### Core rules that apply everywhere

- **Prices:** All DB prices are dollars stored as `NUMERIC(12,2)`. Use `formatMoney(value)` directly. Never multiply or divide by anything. Never convert.
- **Admin info on PDFs:** Always fetch from `admin_users` table dynamically. Never hardcode business name, address, phone, or email.
- **line_items on invoices:** Read from `invoices.line_items[0]` JSONB. Never join to the `products` table for invoice display — the product may be INACTIVE or deleted.
- **SMS double-firing:** Never call `send-user-notification` manually for work orders, invoices, or new listings. DB triggers handle these automatically. The only manual call is for admin chat messages from the admin user dashboard.
- **Guest account ID:** Always read from `NEXT_PUBLIC_GUEST_ACCOUNT_USER_ID` env var. Never hardcode. Never identify by email.
- **Admin verification:** Always check `admin_users` table after Supabase Auth login. Session alone is not enough. Sign out immediately if check fails.
- **`service_type`:** Always required on `service_requests` inserts. Never omit.
- **Phone sync:** When user updates phone in profile, update both `account_users.phone` AND `user_sms_preferences.phone`.
- **`md:hidden` classes on LandingPage:** Never remove responsive visibility classes — they are load-bearing.
- **Stripe:** Never use per-product Payment Links. Always use Checkout Sessions via `/api/checkout/create-session`.
- **Product INACTIVE after purchase:** Never handle in frontend — `trigger_mark_products_sold` DB trigger handles it automatically.
- **Chat actor field:** Use `actor` and `actor_id` — not `sender_type` or `sender_id`.

-----

## BUILD SEQUENCE — Follow This Order Exactly

Build one item at a time. Complete each item fully before moving to the next. Do not skip ahead. Do not build multiple items simultaneously.

-----

### PHASE 1 — Foundation

**Step 1 — Project Setup**
Initialize Next.js with TypeScript. Configure Supabase client. Set up environment variables. Configure Tailwind. Load all Google Fonts globally: Oranienbaum, Montserrat, Comfortaa, Cormorant, DM Sans. Do not build any pages yet.

**Step 2 — Shared Utilities**
Build the shared utility file with:

- `formatMoney(value)` — formats dollar numeric values, e.g. `$41,040`
- `fmtDate(timestamp)` — formats date only
- `fmtTime(timestamp)` — formats time only
- Supabase client singleton (anon key for client, service role key for server)

**Step 3 — Footer Component**
Build `components/Footer.tsx` per the Footer spec. Fully static, no data fetching. Two-column layout with tagline. Not shown on `/admin/*` or `/account`.

-----

### PHASE 2 — Public Pages

**Step 4 — Landing Page**
Drop in `LandingPage.tsx` and `TopNav.tsx` exactly as provided. Your only jobs:

- Import and render `<TopNav />` as the first element inside `<main>`
- Replace the three broken `customer-assets.emergentagent.com` image URLs with correct asset paths
- Fix href `/gallery` → `/portfolio`
- Fix href `/booking` → `/shop`
- Add `<Footer />` at the bottom
  Do not rewrite, restructure, or reformat anything else in this file.

**Step 5 — Portfolio Page**
Build the public portfolio page per spec. Two-column grid, square thumbnails, year + caption labels, photo modal. Desktop hover + mobile two-tap behavior. Reads from `portfolio_photos` where `published = true AND archived = false`. Add `<TopNav />` and `<Footer />`.

**Step 6 — Shop / Product Page**
Drop in `ProductPage.tsx` as provided. Wire up Supabase queries to `shop_active_products` view. Implement:

- Product detail modal
- Inquiry flow for account users (→ `account_inquiries`)
- Inquiry flow for guests (guest info popup → `guest_inquiries`)
- Purchase flow for account users (invoice preview → Stripe session)
- Purchase flow for guests (guest info popup → invoice preview → Stripe session)
- `send-admin-notification` edge function calls after each inquiry
  Add `<TopNav />` and `<Footer />`.

**Step 7 — Stripe Checkout Endpoint**
Build `/api/checkout/create-session` server route. Handles both authenticated users and guests. Returns Stripe Checkout Session URL. Pre-fills customer info from account or guest data. Passes `admin_snapshot` and `account_snapshot` for invoice creation.

**Step 8 — Stripe Webhook**
Build `/api/webhooks/stripe` server route. Listens for `payment_intent.succeeded`. On success: inserts into `invoices` with frozen `line_items`, `account_snapshot`, `admin_snapshot`. For guests: uses `GUEST_ACCOUNT_USER_ID`. DB triggers handle the rest automatically — do not handle product state or notifications in this route.

-----

### PHASE 3 — Auth Pages

**Step 9 — Account User Login**
Build `/login` page. Phone + OTP via Supabase Auth. On success: check if `account_users` row exists for `auth.uid()`. If not, INSERT it. Redirect to `/account`. Match design from existing `.tsx` files — dark background, gold accents, sharp corners, Oranienbaum title, Montserrat inputs.

**Step 10 — Admin Login**
Build `/admin/login` per spec. Email + password via Supabase Auth. Always verify `admin_users` table after auth — session alone is not sufficient. Sign out if check fails. Dark page, single centered card, gold breathing glow animation. Redirect to `/admin/dashboard` on success.

-----

### PHASE 4 — Account User Dashboard

**Step 11 — Dashboard Shell**
Build the `/account` shell. Desktop: left panel (nav + content) + right panel (persistent chat). Mobile: full-width left panel + collapsible bottom drawer chat. Auth guard: redirect to `/login` if no session.

**Step 12 — Home Sub-page (Profile + Stats + SMS Preferences)**
Editable profile fields. Purchase stats (count + total from `invoices`). Five SMS opt-in toggles reading from/writing to `user_sms_preferences` via upsert.

**Step 13 — Work Orders Sub-page**
List of user’s work orders. Status badges. Accept button (CREATED status only). Work order detail expand/modal. Work order PDF generation (fetch admin info dynamically first).

**Step 14 — Inquiries Sub-page**
Two tabs: Product Inquiries + Service Requests. Service request form with SMS gate check, service type dropdown, mandatory disclaimer, photo upload to `ChatUploads` bucket. `send-admin-notification` call on submit.

**Step 15 — Invoices Sub-page**
List of user’s invoices. Invoice card with product title from `line_items[0].title`. Invoice PDF generation (fetch admin info dynamically first, read all product data from `line_items[0]` JSONB — never join to `products` table).

**Step 16 — Chat Panel**
Persistent chat panel. Real-time via Supabase Realtime. Message bubbles (teal = account user, gold = admin). File upload to `ChatUploads`. Mark thread as read on load (desktop) or drawer open (mobile). `send-admin-notification` call on every message sent.

-----

### PHASE 5 — Admin Portal

**Step 17 — Admin Shell**
Build the admin shell with sidebar. Navigation: Dashboard, Products, Portfolio, User List. Active item indicator. Notification bell with real-time unread count badge. `is_admin()` auth guard on all admin routes.

**Step 18 — Admin Dashboard**
Drop in and wire up per spec. Left column: editable admin profile. Right column: 2×2 stats grid + real-time notification feed. Mark as read. Click notification → navigate to relevant user dashboard. Enable Supabase Replication on `admin_notifications`.

**Step 19 — Admin Products Page**
Drop in `AdminProductPage.tsx` as provided. Wire up all Supabase queries. Implement add/edit modal with queue pattern (up to 10), GIA toggle, photo upload/URL toggle, auto-save every 15 seconds. Publish / Draft / Inactive tabs. Bulk actions.

**Step 20 — Admin Portfolio Page**
Drop in `AdminPortfolioPage.tsx` as provided. Wire up all Supabase queries. Implement add/edit modal with queue pattern, upload/URL toggle, sort order inline editing (swap on conflict), archive. Published / Drafts / Archived tabs. Bulk actions.

**Step 21 — Admin User List**
Drop in `UserListsDash.tsx` as provided. Wire up all Supabase queries. Guest User banner pinned at top (load by env var, never by email). Notification bubbles per user row. Sortable columns. Client-side search. Row click → `/admin/users/[id]`.

**Step 22 — Individual User Admin View**
Build `/admin/users/[id]` per spec. Admin view of a specific account user. Full access to their profile, work orders, invoices, service requests, inquiries. Create/manage work orders from here. Chat panel (admin side) — send message, call `send-user-notification` edge function manually after each admin message sent (this is the ONLY place this function is called manually).

**Step 23 — Guest User Admin View**
Build the guest user view at `/admin/users/[GUEST_ACCOUNT_USER_ID]`. Lists guest inquiries and guest invoices. Displays by buyer name from `guest_inquiries.name` and `invoices.account_snapshot.name` — not by ID.

-----

### PHASE 6 — Final Pass

**Step 24 — Routing & Navigation Audit**
Verify all hrefs are correct across every page. Confirm Footer and TopNav appear on all correct pages and are absent from admin and account routes.

**Step 25 — Real-time Audit**
Confirm Supabase Replication is enabled on: `admin_notifications`, `chat_messages`, `chat_threads`, `user_notifications`, `work_orders`.

**Step 26 — Mobile Audit**
Walk through every page on mobile viewport. Confirm responsive behavior matches spec. Confirm LandingPage `md:hidden` / `hidden md:*` classes are intact.

-----

## DESIGN REFERENCE SUMMARY

|Has `.tsx` reference file|Derive design from                                         |
|-------------------------|-----------------------------------------------------------|
|LandingPage ✅            |Use as-is                                                  |
|TopNav ✅                 |Use as-is                                                  |
|ProductPage (public) ✅   |Use as-is                                                  |
|AdminProductPage ✅       |Reference for all admin pages                              |
|AdminPortfolioPage ✅     |Reference for all admin pages                              |
|UserListsDash ✅          |Reference for admin user pages                             |
|Portfolio (public) ❌     |Match LandingPage + ProductPage visual style               |
|Account User Dashboard ❌ |Match ProductPage visual style — dark, gold, teal          |
|Admin Dashboard ❌        |Match AdminProductPage exactly                             |
|Admin Login ❌            |Match LandingPage typography, AdminProductPage dark palette|
|Account Login ❌          |Match LandingPage typography and color system              |
|Footer ❌                 |Spec provided — match LandingPage typography               |

-----

## DOCUMENTATION PROVIDED

You have been given the following reference documents. Read all of them before starting:

- **Schema Reference** — all 16 tables, columns, types, RLS policies
- **System Architecture** — table relationships, data flow, Supabase JS code patterns
- **Full Build Spec** — complete page-by-page feature spec with all Supabase queries
- **Footer Spec** — footer component spec

When in doubt about any query, field name, or behavior — refer to these documents first before making assumptions.
