# Cutting Corners Gems — Full Build Spec

**Stack:** Next.js · TypeScript · Supabase · Tailwind CSS · Stripe
**Last Updated:** February 2026

---

## Table of Contents

1. [Project Overview](#1-project-overview)
1. [Tech Stack & Environment](#2-tech-stack--environment)
1. [Routing Map](#3-routing-map)
1. [Auth Model](#4-auth-model)
1. [Design System](#5-design-system)
1. [Public Pages](#6-public-pages)
1. [Account User Dashboard](#7-account-user-dashboard)
1. [Admin Portal](#8-admin-portal)
1. [Notifications System](#9-notifications-system)
1. [Stripe & Payments](#10-stripe--payments)
1. [Edge Functions](#11-edge-functions)
1. [Database Triggers](#12-database-triggers)
1. [Storage Buckets](#13-storage-buckets)
1. [Environment Variables](#14-environment-variables)
1. [Critical Rules](#15-critical-rules)

---

## 1. Project Overview

Cutting Corners Gems is a gemstone business based in Tempe, Arizona run by Michael Wall. The site has three user tiers:

**Guests** — unauthenticated visitors. Can browse products and portfolio, submit guest inquiries, and purchase gems. All guest activity routes to the single Guest User Account in the admin portal.

**Account Users** — registered customers who log in via phone + OTP. Can chat with admin, submit inquiries and service requests, view work orders and invoices, and manage their SMS notification preferences.

**Admin** — Michael Wall. Single admin account, logs in via email + password. Manages products, portfolio, work orders, and all user activity through a separate admin portal.

---

## 2. Tech Stack & Environment

- **Framework:** Next.js with TypeScript — all files are `.tsx`, never `.js` or `.jsx`
- **Database & Auth:** Supabase (PostgreSQL + Supabase Auth)
- **Styling:** Tailwind CSS utility classes + inline styles where needed
- **Payments:** Stripe Checkout Sessions via server-side endpoint
- **PDF Generation:** react-pdf or jsPDF (client-side)
- **SMS:** Twilio via Supabase Edge Functions
- **Fonts:** Oranienbaum, Montserrat, Comfortaa, Cormorant, DM Sans, Courier New (all from Google Fonts)

---

## 3. Routing Map

```
/                          Landing Page (public, static)
/shop                      Product/Shop Page (public)
/portfolio                 Portfolio Page (public)
/login                     Account User Login (phone + OTP)
/account                   Account User Dashboard (auth required)

/admin                     Admin Login redirect
/admin/login               Admin Login (email + password)
/admin/dashboard           Admin Dashboard (admin only)
/admin/products            Admin Products Page (admin only)
/admin/portfolio           Admin Portfolio Page (admin only)
/admin/users               Admin User List (admin only)
/admin/users/[id]          Individual User Admin View (admin only)

/api/checkout/create-session  Stripe checkout session endpoint (server)
/api/webhooks/stripe          Stripe webhook handler (server)
```

---

## 4. Auth Model

### Account Users — Phone + OTP

- Login via Supabase Auth phone OTP — no email/password
- On first login: INSERT row into `account_users` matching `auth.uid()`
- On signup: DB trigger `trigger_create_chat_thread` automatically creates a `chat_threads` row
- Redirect to `/account` after auth
- If no session: redirect to `/login`

### Admin — Email + Password

```javascript
const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
});

// Always verify admin status against admin_users table — session alone is not enough
const { data: adminCheck } = await supabase
    .from("admin_users")
    .select("admin_user_id")
    .eq("admin_user_id", data.user.id)
    .single();

if (!adminCheck) {
    await supabase.auth.signOut();
    // show "Access denied."
}
// success → router.push('/admin/dashboard')
```

### `is_admin()` Function

- Used in RLS policies throughout the schema
- Set to `SECURITY DEFINER` — acceptable pattern, check periodically
- Never trust client-side admin checks — always enforce at DB level

### Guest User Account

- A single pre-seeded `account_users` row that acts as a bucket for all unauthenticated activity
- ID stored as `NEXT_PUBLIC_GUEST_ACCOUNT_USER_ID` environment variable
- Never hardcode this ID in frontend code
- All guest inquiries, guest purchases, and guest invoices link to this account

---

## 5. Design System

### Colors

```
Background:    #050505 / #060606
Card surface:  #0A0A0A / #0d0d0d / #111111
Gold primary:  #d4af37
Gold alt:      #cfb040
Teal accent:   rgba(45, 212, 191, 1)
Text primary:  #FAFAFA
Text dim:      rgba(255, 255, 255, 0.45)
Text dimmer:   rgba(255, 255, 255, 0.35)
Border subtle: rgba(255, 255, 255, 0.06) – 0.08
Border gold:   rgba(214, 180, 70, 0.45) – 0.55
```

### Fonts

- **Oranienbaum** — page titles, hero headlines, “Admin” login title
- **Montserrat** — nav links, labels, buttons (uppercase + letter-spacing)
- **Comfortaa** — body text, chat messages, descriptions, error messages
- **Cormorant** — serif detail labels (year on portfolio, invoice amounts)
- **DM Sans** — admin portal body text, table cells, subtitles
- **Courier New** — prices, invoice amounts (account user side)

### No border-radius on buttons or inputs — sharp corners throughout

### Gold glow on focus/hover: `box-shadow: 0 0 14px rgba(214,180,70,0.35)`

### Prices

**All prices in DB are stored as dollars in NUMERIC(12,2). Never multiply or divide.**

```javascript
// Correct
formatMoney(invoice.total_amount); // → "$41,040"
formatMoney(product.total_price); // → "$41,040"

// Wrong — never do this
formatMoney(invoice.total_amount * 100);
formatMoney(invoice.total_amount / 100);
```

---

## 6. Public Pages

### 6.1 Landing Page

**File:** `LandingPage/LandingPage.tsx` + `LandingPage/TopNav.tsx`
**Route:** `/`
**Auth:** None — fully static, zero Supabase queries

The landing page is a complete production `.tsx` file. It has five sections:

1. **Hero** — full viewport, background image + gold radial glow. Stat card (“13 Years / Cutting for Seven”) desktop only.
1. **Mobile Industry Section** (`md:hidden`) — full-screen “13 Years / Cutting for Seven” text with scroll-triggered gold glow animation. Never show on desktop.
1. **Philosophy (“My Four C’s”)** — Color / Conscious / Careful / Cutting with scroll-reveal.
1. **Services** — Desktop: 3-column grid of 6 service cards. Mobile: full-screen vertical scroll snap carousel with scroll lock/unlock behavior.
1. **About (“The Cutter”)** — Michael Wall bio + CTAs. Correct href: `/portfolio` (not `/gallery`), `/shop` (not `/booking`).

**TopNav** overlays the hero, absolutely positioned. Auth-aware — shows “Account” → `/account` if logged in, “Login” → `/login` if not. Frosted glass on scroll. Mobile hamburger drawer.

**Never remove `md:hidden` or `hidden md:*` classes — they are load-bearing.**

**Image URLs to replace:**

- Hero background: `yu1iknms_IMG_3821.jpeg`
- Philosophy/studio: `sqy5b97p_IMG_3573.jpeg`
- About/Michael Wall: `c2cwyfwb_IMG_5555.jpeg`

**Hardcoded values (do not change):**

- Business: “Cutting Corners Gems”
- Location: “Tempe, Arizona”
- Phone: `480-286-4595`
- Years: “13 Years / Cutting for Seven”

---

### 6.2 Shop / Product Page

**File:** `ProductPage/Public/tsx/ProductPage.tsx`
**Route:** `/shop`
**Auth:** None required — guests and account users see the same page

#### Reading Products

```javascript
const { data: products } = await supabase
    .from("shop_active_products") // view — published products only
    .select("*");
```

#### Product Card Layout

Each card shows: photo, title, gem type, shape, weight, color, total price. Clicking opens a detail modal.

#### Detail Modal

Full product details: all gem attributes, GIA report link/download if present, inquiry button, buy button.

#### Inquiry Flow — Account User

When a signed-in user submits an inquiry:

```javascript
await supabase.from("account_inquiries").insert({
    account_user_id: session.user.id,
    description: inquiryMessage,
    photo_url: uploadedPhotoUrl ?? null
});

// Notify admin
await supabase.functions.invoke("send-admin-notification", {
    body: { event_type: "account_inquiries", user_id: session.user.id }
});
```

Photo upload bucket: `ChatUploads`

#### Inquiry Flow — Guest

Guest must fill in name, email, phone, shipping address before submitting. Info held in local state for the session.

```javascript
await supabase.from("guest_inquiries").insert({
    name,
    email,
    phone,
    shipping_address,
    description: inquiryMessage,
    photo_url: uploadedPhotoUrl ?? null
});

await supabase.functions.invoke("send-admin-notification", {
    body: { event_type: "guest_inquiries", guest_name: guestName }
});
```

Photo upload bucket: `guest-inquiry-photos`

#### Purchase Flow — Account User

1. Show invoice preview popup (fetch admin info dynamically from `admin_users`)
1. POST to `/api/checkout/create-session` with `product_id`, `account_user_id`, `admin_snapshot`
1. Redirect to Stripe
1. On success: Stripe webhook creates invoice, DB trigger marks product INACTIVE, user notified automatically

#### Purchase Flow — Guest

1. Collect guest info if not already collected
1. Show invoice preview popup with guest info + product info
1. POST to `/api/checkout/create-session` with `product_id`, `guest: true`, `guest_info`, `admin_snapshot`
1. Redirect to Stripe (pre-filled with guest info)
1. On success: Stripe webhook creates invoice linked to `GUEST_ACCOUNT_USER_ID`

**Fetch admin info before any invoice preview:**

```javascript
const { data: adminInfo } = await supabase
    .from("admin_users")
    .select("business_name, full_name, address, phone, contact_email")
    .single();
```

---

### 6.3 Portfolio Page

**File:** `PortfolioPage/Public/`
**Route:** `/portfolio`
**Auth:** None — fully public

```javascript
const { data: photos } = await supabase
    .from("portfolio_photos")
    .select("*")
    .eq("published", true)
    .eq("archived", false)
    .order("sort_order", { ascending: true });
```

**Layout:** 2-column grid (desktop and mobile). Square `1:1` thumbnails. No filters, no categories.

**Thumbnail labels (below card, left-aligned):**

- Year — Cormorant serif, gold `#d4af37`. Primary label. Omit if null.
- Caption — Montserrat/Comfortaa, 11px, dim. Omit if null.

**Hover (desktop):** teal caption overlay, subtle lift, border brightens. No grayscale.

**Tap behavior (mobile):**

- Tap 1: focus state — teal caption, lifted shadow. Only one tile focused at a time.
- Tap 2 on same focused tile: open photo modal.

**Photo modal:** large image, year + caption + description if present. Close on click outside or Escape.

**`photo_url` is a public storage URL — render directly, no signed URL needed.**

---

## 7. Account User Dashboard

**File:** `AuthUser/AuthUserDash/AuthUserDash.md`
**Route:** `/account`
**Auth:** Requires authenticated account user session. Redirect to `/login` if no session. Admin cannot access this page.

### Layout

**Desktop:** Left panel (~65%, navigation + content) + Right panel (~35%, persistent chat). Both scroll independently. No page-level scroll.
**Mobile:** Full-width left panel. Chat is a bottom drawer — collapsed by default showing “Chat with Admin” gold bar. Tap to expand full screen.

### Left Panel — Navigation

Menu items: Home · Work Orders · Inquiries · Invoices

Active item: gold `#d4af37`, left border indicator. Montserrat, 11px, uppercase.

---

### Sub-page: Home (Profile)

Editable profile fields: Name, Phone, Email, Shipping Address, Business Name (optional).

```javascript
await supabase
    .from("account_users")
    .update({
        /* changed fields only */
    })
    .eq("account_user_id", session.user.id);
```

**Purchase stats (read only):**

```javascript
const { data } = await supabase
    .from("invoices")
    .select("invoice_id, total_amount")
    .eq("account_user_id", session.user.id);

const count = data.length;
const total = data.reduce((sum, inv) => sum + inv.total_amount, 0);
// Display: "X items purchased, $X,XXX total spent"
// Use formatMoney(total) directly — no multiplication
```

Numbers in Courier New, teal `rgba(45,212,191,1)`.

**SMS Notification Preferences:**
Five toggles reading from/writing to `user_sms_preferences`:

- Work Order Updates → `opt_in_work_orders`
- Tracking Updates → `opt_in_tracking`
- Chat Message Alerts → `opt_in_chat`
- Purchase Confirmations → `opt_in_purchases`
- New Gem Listings → `opt_in_new_listings`

```javascript
await supabase
    .from("user_sms_preferences")
    .upsert(
        { user_id: session.user.id, [column]: newValue },
        { onConflict: "user_id" }
    );
```

When user updates phone in profile, update both `account_users.phone` AND `user_sms_preferences.phone`.

---

### Sub-page: Work Orders

Work orders are admin-created only — no create UI here.

```javascript
const { data } = await supabase
    .from("work_orders")
    .select("*")
    .eq("account_user_id", session.user.id)
    .order("created_at", { ascending: false });
```

Status badge colors:

- CREATED → gold `#d4af37`
- ACCEPTED → teal `rgba(45,212,191,1)`
- COMPLETED → `rgba(255,255,255,0.45)`

**Accept button** (shown only when status = CREATED):

```javascript
await supabase
    .from("work_orders")
    .update({ status: "ACCEPTED", accepted_at: new Date().toISOString() })
    .eq("work_order_id", workOrder.work_order_id)
    .eq("account_user_id", session.user.id);

await supabase.functions.invoke("send-admin-notification", {
    body: { event_type: "work_orders", work_order_id: workOrder.work_order_id }
});
// Do NOT call send-user-notification here — user_notify_work_order DB trigger handles SMS automatically
```

**Work Order PDF** (client-side, react-pdf or jsPDF):
Always fetch admin info dynamically before generating. Filename: `WorkOrder_[short_id].pdf`.

---

### Sub-page: Inquiries

Two tabs: Product Inquiries (from `account_inquiries`) and Service Requests (from `service_requests`).

**New Service Request — SMS gate check required before form opens:**

```javascript
const { data: prefs } = await supabase
    .from("user_sms_preferences")
    .select("opt_in_work_orders")
    .eq("user_id", session.user.id)
    .single();

const { data: profile } = await supabase
    .from("account_users")
    .select("phone")
    .eq("account_user_id", session.user.id)
    .single();

if (!profile?.phone || !prefs?.opt_in_work_orders) {
    // Show: "To submit a service request you must have a phone number on file
    //        and work order SMS notifications enabled. This keeps you informed
    //        every step of the way. Update your preferences in your profile."
    // Block form — do not open
}
```

**Service Type dropdown options:**

- Custom Rough Cut
- Re-Cut & Re-Polish — Starting Price: $249
- Table Re-Polish — Starting Price: $119
- Crown Re-Polish — Starting Price: $149
- Pavilion Re-Polish — Starting Price: $149
- Gemstone Material Cut Design — Starting Price: $99
- Virtual Consultation — Free 30 Minute Minimum Consultation

**Mandatory disclaimer (always visible in form, never omit):**

> “All prices are estimated starting prices. Some gems may be less, some may be more. No work order prices are set in stone until I am able to inspect the piece and the customer accepts the work order through the website.”

Font: Comfortaa, 12px, `rgba(255,255,255,0.45)`, italic.

**Service request submit:**

```javascript
// Upload photo first if attached (bucket: ChatUploads)
await supabase.from("service_requests").insert({
    account_user_id: session.user.id,
    service_type: selectedServiceType, // required
    description: formDescription,
    photo_url: uploadedPhotoUrl ?? null
});

await supabase.functions.invoke("send-admin-notification", {
    body: { event_type: "service_requests", user_id: session.user.id }
});
```

---

### Sub-page: Invoices

Invoices arrive automatically via Stripe webhook — no create/edit/delete UI here.

```javascript
const { data } = await supabase
    .from("invoices")
    .select("*")
    .eq("account_user_id", session.user.id)
    .order("paid_at", { ascending: false });
```

**Reading line_items:** `invoice.line_items[0].title`, `.gem_type`, etc. Never join to `products` table — the product may be INACTIVE or deleted. `line_items` JSONB is the sole source of truth.

**Invoice PDF:** Always fetch admin info dynamically. Shows bill-to from `account_snapshot`, items from `line_items[0]`. Filename: `Invoice_[short_id].pdf`.

---

### Right Panel — Chat

One persistent thread per account user. Real-time via Supabase Realtime. Append-only — no edit or delete.

```javascript
// Load thread
const { data: thread } = await supabase
    .from("chat_threads")
    .select("*")
    .eq("account_user_id", session.user.id)
    .single();

// Load messages
const { data: messages } = await supabase
    .from("chat_messages")
    .select("*")
    .eq("chat_thread_id", thread.chat_thread_id)
    .order("created_at", { ascending: true });

// Real-time
supabase
    .channel("chat")
    .on(
        "postgres_changes",
        {
            event: "INSERT",
            schema: "public",
            table: "chat_messages",
            filter: `chat_thread_id=eq.${thread.chat_thread_id}`
        },
        (payload) => {
            /* append message */
        }
    )
    .subscribe();
```

**Mark as read:** On page load (desktop) or when drawer opens (mobile):

```javascript
await supabase
    .from("chat_threads")
    .update({ account_has_unread: false })
    .eq("chat_thread_id", thread.chat_thread_id);
```

**Message bubbles:**

- Account user: right-aligned, teal background, dark text
- Admin: left-aligned, gold `#d4af37` background, dark text
- Font: Comfortaa, 13px

**Send message:**

```javascript
await supabase.from("chat_messages").insert({
    chat_thread_id: thread.chat_thread_id,
    actor: "ACCOUNT",
    actor_id: session.user.id,
    body: messageText,
    attachment_url: uploadedUrl ?? null,
    attachment_type: uploadedMimeType ?? null
});

await supabase.functions.invoke("send-admin-notification", {
    body: { event_type: "chat", thread_id: thread.chat_thread_id }
});

await supabase
    .from("chat_threads")
    .update({ account_has_unread: false, admin_has_unread: true })
    .eq("chat_thread_id", thread.chat_thread_id);
```

**File upload:** paperclip icon, accept `.jpg,.jpeg,.png,.tiff,.tif,.dng,.heic,.pdf`, max 25MB. Bucket: `ChatUploads`.

**Attachment rendering:** image → inline thumbnail (tap to expand modal). PDF → icon + filename + download link.

---

## 8. Admin Portal

### 8.1 Admin Login

**Route:** `/admin/login`
**Auth:** Email + password via Supabase Auth. Verify `admin_users` table after auth.

Dark `#050505` page, single centered card (max 480px, `#111111` background, gold border with breathing glow keyframe animation). Sharp corners throughout. See section 4 for auth logic.

---

### 8.2 Admin Shell (Sidebar)

All admin pages share the same shell:

```
Dashboard     ⬡
Products      ◈
Portfolio     ◻
User List     ◯
```

Same CSS design system: Cormorant serif + DM Sans, `--k0`–`--k4` color variables, `--g`, `--gl`, `--ln`. Active nav item: gold `#d4af37`, left border indicator. Notification bell with unread badge.

---

### 8.3 Admin Dashboard

**Route:** `/admin/dashboard`

Two-column layout: Left (~60%) profile info, Right (~40%) stats + notification feed.

**Left — Admin Profile (editable):**

```javascript
const { data: adminInfo } = await supabase
    .from("admin_users")
    .select("*")
    .single();

// Update
await supabase
    .from("admin_users")
    .update({ business_name, full_name, address, phone, contact_email })
    .eq("admin_user_id", session.user.id);
```

Fields: Business Name, Full Name, Address, Phone, Contact Email. Login email is always read-only.

Section note: “This information appears on all work order and invoice PDFs generated for customers.”

**Right — Stats (2×2 grid):**

- Items Sold = count of invoices
- Shop Revenue = sum of `invoices.total_amount` — `fmtMoney()` directly
- Work Orders Completed = count of work_orders where `status = 'COMPLETED'`
- Work Order Revenue = sum of `estimated_price` on COMPLETED work orders

Value: Cormorant serif, 22px, gold `#cfb040`. Label: DM Sans, 8.5px, uppercase, dim.

**Right — Notification Feed:**

```javascript
const { data: notifications } = await supabase
    .from("admin_notifications")
    .select("*, account_users(name)")
    .eq("read", false)
    .order("created_at", { ascending: false });

// Real-time
supabase
    .channel("admin-notifications")
    .on(
        "postgres_changes",
        {
            event: "INSERT",
            schema: "public",
            table: "admin_notifications"
        },
        (payload) => {
            /* prepend */
        }
    )
    .subscribe();
```

Enable Supabase Replication on `admin_notifications`.

Each row: type icon, message, username (from `account_users.name` join — show “Guest” if no match), relative time, unread dot.

Clicking a row marks it read and navigates to the relevant user’s admin dashboard. Guest notifications navigate to the Guest User admin view.

---

### 8.4 Admin Products Page

**Route:** `/admin/products`
**Reference file:** `ProductPage/Admin/tsx/AdminProductPage.tsx`

Full CRUD for gem listings. Same shell and sidebar as all admin pages.

**States:** DRAFT → PUBLISHED → INACTIVE (after sale, set by DB trigger)

**Tabs:** Published · Drafts · Inactive

**Add Product modal** — queue pattern (up to 10 at once), with form fields:

- Title (required)
- Gem Type, Shape, Weight, Color, Origin, Treatment (all optional)
- Total Price (required), Price Per Carat (optional)
- Description (optional)
- GIA toggle: Upload PDF or enter Report Number + URL
- Photo: Upload or URL
- Auto-save every 15 seconds with “✓ Saved” flash

**Edit:** all fields editable. No delete — products become INACTIVE after sale.

**Publish:** `UPDATE products SET product_state = 'PUBLISHED'` — triggers `user_notify_new_product` DB trigger automatically.

---

### 8.5 Admin Portfolio Page

**Route:** `/admin/portfolio`
**Reference file:** `PortfolioPage/Admin/tsx/AdminPortfolioPage.tsx`

**Tabs:** Published · Drafts · Archived

**Photo grid:** 2 columns, square thumbnails, sort order overlay (inline editable by clicking number), published dot, hover actions (Edit / Archive).

**Sort order:** click number on card to edit inline. If position taken, swap sort_order values with the occupying photo.

**Add Photos modal** — queue pattern (up to 10):

- Photo: Upload or URL toggle
- Year (text, optional, max 4 chars) — primary label on public portfolio
- Caption (optional)
- Description (optional, shown in modal only)
- Sort Order (optional, auto-assigns if blank)

**Archive:** sets `archived = true, published = false`. Permanent from UI — no restore.

**Bulk actions:** Select mode → Publish / Unpublish / Archive selected.

**Storage bucket:** `portfolio-photos` (public, no signed URLs needed)

---

### 8.6 Admin User List

**Route:** `/admin/users`

**Guest User Banner** — pinned at top above table, gold left border, separate from regular users. Shows unread notification bubble. Clicking navigates to `/admin/users/[GUEST_ACCOUNT_USER_ID]`.

```javascript
// Load guest separately using env var — never identify by email
const { data: guestUser } = await supabase
    .from("account_users")
    .select("*")
    .eq("account_user_id", process.env.NEXT_PUBLIC_GUEST_ACCOUNT_USER_ID)
    .single();

// Load regular users (excluding guest)
const { data: users } = await supabase
    .from("account_users")
    .select("*")
    .neq("account_user_id", process.env.NEXT_PUBLIC_GUEST_ACCOUNT_USER_ID)
    .order("created_at", { ascending: false });
```

**Columns:** Name, Email, Phone, Address, Date, Time, Status (ACTIVE/SUSPENDED pill), Notifications bubble, Actions.

**Notification bubbles:**

```javascript
const { data: notifs } = await supabase
    .from("admin_notifications")
    .select("user_id")
    .eq("read", false);

const unreadCounts = notifs.reduce((acc, n) => {
    if (n.user_id) acc[n.user_id] = (acc[n.user_id] || 0) + 1;
    return acc;
}, {});
```

Bubble: gold `#cfb040` background, black text, 18px circle. Show nothing if count = 0. Show “9+” if > 9.

**Sort:** all columns sortable client-side (asc → desc → reset to default).

**Search:** client-side filter across name, email, phone.

**Row click:** navigate to `/admin/users/[account_user_id]`

---

### 8.7 Individual User Admin View (UserDashboardAdminSide)

**Route:** `/admin/users/[id]`
**Reference file:** `Admin/AdminDash/AdminUsersList/UsersListEntities/ULDA/UserListsDash.tsx`

Admin’s view of a specific user’s account. Full read access to all their data. Admin can:

- View and edit user profile
- Create and manage work orders
- View all their invoices, service requests, inquiries
- Chat with the user from the admin side

**Chat — admin sends message:**

```javascript
await supabase.from("chat_messages").insert({
    chat_thread_id: thread.chat_thread_id,
    actor: "ADMIN",
    actor_id: session.user.id,
    body: messageText,
    attachment_url: uploadedUrl ?? null,
    attachment_type: uploadedMimeType ?? null
});

// This is the ONLY place send-user-notification is called manually
await supabase.functions.invoke("send-user-notification", {
    body: { event_type: "chat", user_id: thread.account_user_id }
});

await supabase
    .from("chat_threads")
    .update({ admin_has_unread: false, account_has_unread: true })
    .eq("chat_thread_id", thread.chat_thread_id);
```

---

### 8.8 Guest User Admin View

**Route:** `/admin/users/[GUEST_ACCOUNT_USER_ID]`

Shows all guest_inquiries and guest invoices bucketed under the guest account. Lists by buyer name (from `account_snapshot.name` on invoices, from `name` on guest_inquiries) — not by ID — because multiple different people funnel in.

---

## 9. Notifications System

### Admin Notifications (automatic DB triggers)

These fire automatically server-side — no frontend code required:

| Trigger                      | Table             | Event  | What it logs                  |
| ---------------------------- | ----------------- | ------ | ----------------------------- |
| `admin_notify_inquiry`       | account_inquiries | INSERT | New inquiry from account user |
| `admin_notify_guest_inquiry` | guest_inquiries   | INSERT | New inquiry from guest        |
| `admin_notify_service`       | service_requests  | INSERT | New service request           |
| `admin_notify_chat`          | chat_messages     | INSERT | New chat message from user    |
| `admin_notify_work_order`    | work_orders       | INSERT | New work order created        |

### User Notifications (automatic DB triggers)

**Never call `send-user-notification` manually for these — DB triggers handle them. Manual calls double-fire SMS.**

| Trigger                   | Table             | Event         | Opt-in column                           |
| ------------------------- | ----------------- | ------------- | --------------------------------------- |
| `user_notify_work_order`  | work_orders       | INSERT/UPDATE | `opt_in_work_orders`, `opt_in_tracking` |
| `user_notify_invoice`     | invoices          | INSERT        | `opt_in_purchases`                      |
| `user_notify_new_product` | products          | INSERT        | `opt_in_new_listings`                   |
| `user_notify_inquiry`     | account_inquiries | INSERT        | (no gate — always fires)                |
| `user_notify_service`     | service_requests  | INSERT        | (no gate — always fires)                |

### Manual `send-user-notification` Call

Only one event requires manual call from frontend:

**Chat message from admin → user** (called from `AdminMobileDesktopUserDash.tsx` only):

```javascript
await supabase.functions.invoke("send-user-notification", {
    body: { event_type: "chat", user_id: chatThread.account_user_id }
});
```

The edge function checks `opt_in_chat` before sending and silently does nothing if opted out.

### Notification Types

**Admin notifications `type` values:**

- `account_inquiries` — new account user inquiry
- `guest_inquiries` — new guest inquiry
- `service_requests` — new service request
- `chat_messages` — new chat message from user
- `work_orders` — work order accepted by user

---

## 10. Stripe & Payments

### Checkout Session Endpoint (server-side)

**Route:** `POST /api/checkout/create-session`

Accepts: `product_id`, `guest` flag, `guest_info` (if guest), `account_user_id` (if authenticated), `admin_snapshot`.

Creates Stripe Checkout Session, pre-fills customer info. Returns `{ url }`.

**Never use per-product Stripe Payment Links. Always use Checkout Sessions.**

### Stripe Webhook

**Route:** `POST /api/webhooks/stripe`
**Event:** `payment_intent.succeeded`

On success:

1. INSERT into `invoices` with frozen `line_items`, `account_snapshot`, `admin_snapshot`
1. For guests: `account_user_id = GUEST_ACCOUNT_USER_ID`
1. DB trigger `trigger_mark_products_sold` fires automatically → sets product INACTIVE
1. DB trigger `user_notify_invoice` fires automatically → SMS to user if opted in
1. INSERT into `admin_notifications`

**`total_amount` is stored in dollars — no conversion.**

---

## 11. Edge Functions

| Function                  | Called From                           | Purpose                                                               |
| ------------------------- | ------------------------------------- | --------------------------------------------------------------------- |
| `send-admin-notification` | Various frontend files                | Sends SMS to admin phone. Checks `admin_notification_config` toggles. |
| `send-user-notification`  | `AdminMobileDesktopUserDash.tsx` only | Sends SMS to user. Checks `user_sms_preferences` opt-in.              |

### `send-admin-notification` Call Sites

| Caller                | `event_type`        | Additional body |
| --------------------- | ------------------- | --------------- |
| PublicProductPage.tsx | `account_inquiries` | `user_id`       |
| PublicProductPage.tsx | `guest_inquiries`   | `guest_name`    |
| UserDashboardUserView | `service_requests`  | `user_id`       |
| UserDashboardUserView | `work_orders`       | `work_order_id` |
| UserDashboardUserView | `chat`              | `thread_id`     |

---

## 12. Database Triggers

All triggers are confirmed present and running:

| Trigger                      | Table             | Event         | Purpose                                                     |
| ---------------------------- | ----------------- | ------------- | ----------------------------------------------------------- |
| `trigger_create_chat_thread` | account_users     | INSERT        | Auto-creates chat thread for new user                       |
| `trigger_update_chat_thread` | chat_messages     | INSERT        | Updates thread `last_message_at` and `last_message_preview` |
| `trigger_mark_products_sold` | invoices          | INSERT        | Sets product INACTIVE after purchase                        |
| `admin_notify_inquiry`       | account_inquiries | INSERT        | Logs to admin_notifications                                 |
| `admin_notify_guest_inquiry` | guest_inquiries   | INSERT        | Logs to admin_notifications                                 |
| `admin_notify_service`       | service_requests  | INSERT        | Logs to admin_notifications                                 |
| `admin_notify_chat`          | chat_messages     | INSERT        | Logs to admin_notifications                                 |
| `admin_notify_work_order`    | work_orders       | INSERT        | Logs to admin_notifications                                 |
| `user_notify_inquiry`        | account_inquiries | INSERT        | Notifies user of receipt (always)                           |
| `user_notify_service`        | service_requests  | INSERT        | Notifies user of receipt (always)                           |
| `user_notify_work_order`     | work_orders       | INSERT/UPDATE | SMS to user if opted in                                     |
| `user_notify_invoice`        | invoices          | INSERT        | SMS to user if opted in (`opt_in_purchases`)                |
| `user_notify_new_product`    | products          | INSERT        | SMS to opted-in users when new gem published                |

---

## 13. Storage Buckets

| Bucket                 | Public | Used For                                                         | Allowed Types                  | Max Size |
| ---------------------- | ------ | ---------------------------------------------------------------- | ------------------------------ | -------- |
| `portfolio-photos`     | YES    | Admin portfolio photos                                           | jpg, png, tiff, dng, heic      | 25MB     |
| `ChatUploads`          | NO     | Chat attachments, service request photos, product inquiry photos | jpg, png, tiff, dng, heic, pdf | 25MB     |
| `guest-inquiry-photos` | NO     | Guest inquiry photo uploads                                      | jpg, png, tiff, dng, heic      | 25MB     |

---

## 14. Environment Variables

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=          # Server only — never expose to client

# Stripe
STRIPE_SECRET_KEY=                  # Server only
STRIPE_WEBHOOK_SECRET=              # Server only
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# App
NEXT_PUBLIC_GUEST_ACCOUNT_USER_ID=  # Pre-seeded guest account UUID
```

**Never hardcode any of these values in frontend code or commit them to version control.**

---

## 15. Critical Rules

These are non-negotiable across the entire codebase:

**File types:** All files are `.tsx`. Never `.js` or `.jsx`.

**Prices:** All DB prices are dollars as `NUMERIC(12,2)`. Use `formatMoney(value)` directly. Never multiply or divide.

**Admin info on PDFs:** Always fetch from `admin_users` table dynamically. Never hardcode business name, address, phone, or email anywhere.

**line_items:** Read product data from `invoices.line_items[0]` JSONB. Never join to the `products` table for invoice display — the product may be INACTIVE or deleted.

**SMS double-firing:** Never call `send-user-notification` manually for work orders, invoices, or new listings — DB triggers handle these automatically. The only manual call is for admin chat messages from `AdminMobileDesktopUserDash.tsx`.

**Guest account ID:** Always read from `NEXT_PUBLIC_GUEST_ACCOUNT_USER_ID` env var. Never hardcode. Never identify the guest account by email.

**Admin verification:** Always verify `admin_users` table after Supabase Auth login. Session alone is not sufficient. Sign out immediately if admin check fails.

**`service_type`:** Always required on `service_requests` inserts. Never omit.

**Phone sync:** When user updates phone in profile, update both `account_users.phone` AND `user_sms_preferences.phone`.

**`md:hidden` classes:** Never remove responsive visibility classes on LandingPage — they are load-bearing.

**Stripe:** Never use per-product Payment Links. Always use Checkout Sessions via `/api/checkout/create-session`.

**Product INACTIVE:** Never handle product state transition after purchase in frontend — `trigger_mark_products_sold` DB trigger handles it automatically.

**Chat actor field:** Use `actor` and `actor_id` — not `sender_type` or `sender_id`.
