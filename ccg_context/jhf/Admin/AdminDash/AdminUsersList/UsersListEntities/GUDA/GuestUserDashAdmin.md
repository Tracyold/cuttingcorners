# GuestUserAdminView -- Emergent Build Spec

_Canonical version -- February 23, 2026_
_File: `Website/Admin/AdminDash/UsersListEntities/GUDA/GuestUserDashAdmin.md`_

## What This Page Is

The Guest User Account is a single pre-seeded row in `account_users` that acts as a catch-all bucket for all non-signed-in activity. There is only one. Its `account_user_id` is stored as `GUEST_ACCOUNT_USER_ID` in the server environment.

This dashboard is the admin’s view into all guest activity -- product inquiries submitted by non-signed-in visitors, and purchases made by non-signed-in visitors. Because guests are anonymous, activity is identified by the name and contact info they entered at the time, not by a persistent account.

**This page is admin-only. Guests never see it. There is no guest-facing dashboard.**

---

## Auth

- Admin only -- verify `is_admin()` on load
- Route: `/admin/users/[GUEST_ACCOUNT_USER_ID]`
- Part of the admin shell -- same sidebar as all other admin pages
- Active nav item: `User List`

---

## Design Reference

- Same shell, sidebar, CSS variables, and font system as AdminProductsPage
- Cormorant serif + DM Sans sans
- Same color variables: `--k0` through `--k4`, `--g`, `--gl`, `--ln`, etc.

---

## Page Header

- Title: "Guest Account" -- Cormorant serif, same `.ph-title` style
- Subtitle below title: "All non-signed-in inquiries and purchases" -- DM Sans, 10px, dim
- No edit, suspend, or delete actions -- this is not a real user account
- No chat panel -- guests have no chat thread

---

## Layout

Single column -- no chat panel on the right. Full width content area.

Two tabs:

- **Inquiries** -- from `guest_inquiries` table
- **Invoices** -- from `invoices` table where `account_user_id = GUEST_ACCOUNT_USER_ID`

Tab style: same `.tabs` / `.tab` pattern as AdminProductsPage. Tab counts update from loaded data.

---

## Tab 1 -- Inquiries

All product inquiries submitted by guests from the public shop page.

### Query

```javascript
const { data: inquiries } = await supabase
    .from("guest_inquiries")
    .select("*")
    .order("created_at", { ascending: false });
```

No `account_user_id` filter -- all rows in `guest_inquiries` belong to this dashboard.

### Inquiry Card / Row

Each inquiry shows:

| Field            | DB Column          | Notes                                              |
| ---------------- | ------------------ | -------------------------------------------------- |
| Guest Name       | `name`             | Cormorant serif, 15px, white -- primary identifier |
| Email            | `email`            | DM Sans, 12px, dim                                 |
| Phone            | `phone`            | DM Sans, 12px, dim                                 |
| Shipping Address | `shipping_address` | DM Sans, 12px, dim -- truncate if long             |
| Message          | `description`      | Preview truncated -- expand on click               |
| Photo            | `photo_url`        | Thumbnail if present -- click to expand            |
| Date             | `created_at`       | fmtDate()                                          |
| Time             | `created_at`       | fmtTime()                                          |
| Read Status      | `is_read`          | Unread dot -- gold if `is_read = false`            |

### Mark as Read

- Clicking a row or expanding it marks the inquiry as read:

```javascript
await supabase
    .from("guest_inquiries")
    .update({ is_read: true, read_at: new Date().toISOString() })
    .eq("guest_inquiry_id", inquiry.guest_inquiry_id);
```

- Unread inquiries show a gold dot on the left edge of the row
- "Mark all read" button at top right of the tab:

```javascript
await supabase
    .from("guest_inquiries")
    .update({ is_read: true, read_at: new Date().toISOString() })
    .eq("is_read", false);
```

### Inquiry Detail Expand

Clicking a row expands or opens a modal showing full details:

- Full name, email, phone, shipping address
- Full description (not truncated)
- Full size photo if `photo_url` present -- render from `guest-inquiry-photos` bucket:

```javascript
// photo_url is stored as a storage path -- get signed URL to render
const { data } = await supabase.storage
    .from("guest-inquiry-photos")
    .createSignedUrl(inquiry.photo_url, 3600);
```

- Date and time submitted

### Empty State

- "No guest inquiries yet" -- dim, uppercase, centered

---

## Tab 2 -- Invoices

All purchases made by guests. Invoices are created automatically by the Stripe webhook and linked to `GUEST_ACCOUNT_USER_ID`. The guest’s identity is frozen inside `account_snapshot` at purchase time.

### Query

```javascript
const { data: invoices } = await supabase
    .from("invoices")
    .select("*")
    .eq("account_user_id", process.env.NEXT_PUBLIC_GUEST_ACCOUNT_USER_ID)
    .order("paid_at", { ascending: false });
```

### Invoice Card / Row

Each invoice shows:

| Field        | Source                   | Notes                                                          |
| ------------ | ------------------------ | -------------------------------------------------------------- |
| Buyer Name   | `account_snapshot.name`  | Cormorant serif, 15px, white -- primary identifier             |
| Buyer Email  | `account_snapshot.email` | DM Sans, 12px, dim                                             |
| Buyer Phone  | `account_snapshot.phone` | DM Sans, 12px, dim                                             |
| Product      | `line_items[0].title`    | Never join to `products` table -- use snapshot                 |
| Total        | `total_amount`           | `fmtMoney(invoice.total_amount)` directly -- Courier New, teal |
| Paid Date    | `paid_at`                | fmtDate()                                                      |
| Stripe ID    | `stripe_session_id`      | DM Sans, monospace, dim -- for reference                       |
| Download PDF | –                        | Generate client-side                                           |

**Prices are in dollars -- use `fmtMoney(value)` directly, no multiplication.**

### Reading line_items

`line_items` is a JSONB array. Read `line_items[0]` for all product data. Never join to the `products` table -- the product may be INACTIVE or deleted. `line_items` is the sole source of truth.

```javascript
const item = invoice.line_items[0];

// Available fields:
item.product_id;
item.title;
item.gem_type;
item.shape;
item.weight;
item.color;
item.origin; // may be null
item.treatment; // may be null
item.description; // may be null
item.price_per_carat; // may be null
item.total_price;
item.gia_report_number; // may be null
item.gia_report_pdf_url; // may be null
item.photo_url; // may be null
```

### Invoice PDF

Fetch admin info dynamically before generating -- never hardcode:

```javascript
const { data: adminInfo } = await supabase
    .from("admin_users")
    .select("business_name, full_name, address, phone, contact_email")
    .single();
```

PDF layout:

```
── Header ──
[adminInfo.business_name]
[adminInfo.full_name]
[adminInfo.address]
[adminInfo.contact_email]
[adminInfo.phone]

── Body ──
Invoice ID: [invoice_id]
Date: [paid_at date]
Time: [paid_at time]

Bill To:
[account_snapshot.name]
[account_snapshot.email]
[account_snapshot.phone]
[account_snapshot.shippingAddress]

Line Items:
  [line_items[0].title]
  [line_items[0].gem_type]  ·  [line_items[0].weight] ct  ·  [line_items[0].color]
  [line_items[0].shape]
  Origin: [line_items[0].origin]           -- omit if null
  Treatment: [line_items[0].treatment]     -- omit if null
  GIA Report #: [line_items[0].gia_report_number] -- omit if null
  Price/ct: [fmtMoney(line_items[0].price_per_carat)] -- omit if null

Total Paid: [fmtMoney(invoice.total_amount)]
Payment Method: Card via Stripe
Stripe Session: [stripe_session_id]
```

- Generate client-side using react-pdf or jsPDF
- Filename: `Invoice_[invoice_id_short].pdf`
- `account_snapshot.businessName` is null for guests -- omit from PDF

### Empty State

- "No guest purchases yet" -- dim, uppercase, centered

---

## Notification Badges

Unread notification counts for this dashboard come from `admin_notifications` where `user_id = GUEST_ACCOUNT_USER_ID`. These are passed in from `AdminUserListPage` via `unreadCounts[GUEST_ACCOUNT_USER_ID]`.

Show unread badge on the Inquiries tab if there are unread `guest_inquiries` rows (`is_read = false`). The tab count badge uses the live `is_read` field directly -- not the `admin_notifications` table.

---

## Supabase Queries Summary

```javascript
// Guest inquiries
supabase
    .from("guest_inquiries")
    .select("*")
    .order("created_at", { ascending: false });

// Mark one inquiry read
supabase
    .from("guest_inquiries")
    .update({ is_read: true, read_at: new Date().toISOString() })
    .eq("guest_inquiry_id", inquiryId);

// Mark all inquiries read
supabase
    .from("guest_inquiries")
    .update({ is_read: true, read_at: new Date().toISOString() })
    .eq("is_read", false);

// Guest invoices
supabase
    .from("invoices")
    .select("*")
    .eq("account_user_id", process.env.NEXT_PUBLIC_GUEST_ACCOUNT_USER_ID)
    .order("paid_at", { ascending: false });

// Admin info for PDF
supabase
    .from("admin_users")
    .select("business_name, full_name, address, phone, contact_email")
    .single();

// Photo URL for inquiry attachment
supabase.storage
    .from("guest-inquiry-photos")
    .createSignedUrl(inquiry.photo_url, 3600);
```

---

## State Variables

```javascript
const [tab, setTab] = useState("inquiries");
const [inquiries, setInquiries] = useState([]);
const [invoices, setInvoices] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [expandedId, setExpandedId] = useState(null);
```

---

## Notes for Emergent

- This is a read-only admin dashboard -- no edit, suspend, delete, or message actions
- No chat panel -- guests have no chat thread, do not render one
- Guest identity comes from `account_snapshot.name` for invoices and `name` for inquiries -- not from an `account_users` row
- Always use `NEXT_PUBLIC_GUEST_ACCOUNT_USER_ID` env var -- never hardcode the guest account ID
- `line_items` is JSONB -- read `line_items[0].title` etc -- never join to `products` table
- `photo_url` in `guest_inquiries` is a storage path -- use `createSignedUrl` to render, not a direct URL
- Admin info for PDFs always fetched dynamically from `admin_users` -- never hardcoded
- `account_snapshot.businessName` is null for all guest purchases -- omit from PDF Bill To section
- Prices are in dollars -- `fmtMoney(value)` directly, no multiplication
- Tab unread badge for Inquiries uses `is_read` from `guest_inquiries` directly -- not `admin_notifications`
- Invoices arrive automatically via Stripe webhook -- no frontend handling needed
- `trigger_mark_products_sold` sets product INACTIVE after purchase -- no frontend handling needed
