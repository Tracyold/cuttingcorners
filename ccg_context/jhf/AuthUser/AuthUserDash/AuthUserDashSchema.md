# UserDashboardUserView — Emergent Build Spec

_Canonical version — February 23, 2026_
_File: `Website/AuthUser/AuthUserDash/AuthUserDash.md`_

## Auth

- Requires authenticated account user session
- Redirect to /login if no session
- Uses Supabase Auth with phone + OTP (not email/password)
- Admin cannot access this page — admin has a separate /admin route

---

## Prices — Critical

**All prices in the DB are stored in DOLLARS as NUMERIC(12,2).**
Use `formatMoney(value)` directly on DB values — do NOT multiply or divide by anything.

```javascript
// Correct
formatMoney(invoice.total_amount); // → "$41,040"
formatMoney(product.total_price); // → "$41,040"

// Wrong — do not do this
formatMoney(invoice.total_amount * 100);
formatMoney(invoice.total_amount / 100);
```

---

## Admin Info for PDFs — Always Fetch Dynamically

**Do NOT hardcode admin business info.** Always fetch from the `admin_users` table before generating any PDF (work order or invoice):

```javascript
const { data: adminInfo } = await supabase
    .from("admin_users")
    .select("business_name, full_name, address, phone, contact_email")
    .single();
```

This applies to both Work Order PDFs and Invoice PDFs.

---

## Layout — Split Panel

### Desktop

- Left panel: navigation menu + sub-page content (~65% width)
- Right panel: chat UI — always visible regardless of active sub-page (~35% width)
- Both panels full height, no page scroll — each panel scrolls independently
- Background: `#050505`
- Panel divider: `1px solid rgba(255,255,255,0.08)`

### Mobile

- Full width single column — left panel content takes full screen
- Chat is a **bottom drawer** — full screen width, fixed to bottom
- **Default state: collapsed** — shows a gold bar at the bottom reading “Chat with Admin” in Montserrat uppercase
- Tapping the bar expands chat to full screen
- When expanded: arrow at top left points down — tapping collapses back to bar
- Chat drawer transition: `300ms ease-out`
- Chat should feel approachable and always accessible — encourage users to reach out

---

## Left Panel — Navigation Menu

### Menu Items (top to bottom)

- Home
- Work Orders
- Inquiries
- Invoices

### Menu Style

- Active item: gold `#d4af37`, left border indicator
- Inactive item: `rgba(255,255,255,0.45)`
- Font: Montserrat, 11px, uppercase, `letter-spacing: 0.20em`
- Hover: `rgba(255,255,255,0.75)`

---

## Sub-Pages

---

### Home (Profile)

Displays account user profile info with inline editing.

#### Profile Fields (all editable)

- Name
- Phone
- Email
- Shipping Address
- Business Name (optional — show placeholder “Add business name” if null)

#### Edit Behavior

- Each field has an edit icon or tap-to-edit inline
- Save button appears when a field is modified
- On save:

```javascript
await supabase
    .from("account_users")
    .update({
        /* changed fields only */
    })
    .eq("account_user_id", session.user.id);
```

#### Purchase Stats (read only)

```javascript
const { data } = await supabase
    .from("invoices")
    .select("invoice_id, total_amount")
    .eq("account_user_id", session.user.id);

const count = data.length;
const total = data.reduce((sum, inv) => sum + inv.total_amount, 0);
```

- Display: **X items purchased** and **$X,XXX total spent**
- Font: Courier New, teal `rgba(45,212,191,1)` for the numbers
- If zero: still display — “0 items purchased, $0 total spent”
- `total_amount` is in dollars — use `formatMoney(total)` directly

#### SMS Notification Preferences

- Section title: “Notification Preferences” — Montserrat uppercase
- Reads from `user_sms_preferences` table where `user_id = auth.uid()`
- If no row exists yet: create one on first toggle

**Five toggles:**

| Toggle Label           | DB Column             |
| ---------------------- | --------------------- |
| Work Order Updates     | `opt_in_work_orders`  |
| Tracking Updates       | `opt_in_tracking`     |
| Chat Message Alerts    | `opt_in_chat`         |
| Purchase Confirmations | `opt_in_purchases`    |
| New Gem Listings       | `opt_in_new_listings` |

- Toggle style: gold when on, dim when off
- On toggle:

```javascript
await supabase
    .from("user_sms_preferences")
    .upsert({ user_id: session.user.id, [column]: newValue });
```

- Small note below toggles: “We’ll send SMS alerts to your phone number on file”

---

### Work Orders

Displays all work orders belonging to the account user. Work orders are **admin-created only** — there is no create UI here.

#### Query

```javascript
const { data } = await supabase
    .from("work_orders")
    .select("*")
    .eq("account_user_id", session.user.id)
    .order("created_at", { ascending: false });
```

#### Work Order Card

Each card shows:

- Title
- Service type
- Gem type
- Estimated price (if set) — use `formatMoney(value)` directly
- Status badge: CREATED / ACCEPTED / COMPLETED
- Created date

#### Status Badge Colors

| Status    | Color                     |
| --------- | ------------------------- |
| CREATED   | gold `#d4af37`            |
| ACCEPTED  | teal `rgba(45,212,191,1)` |
| COMPLETED | `rgba(255,255,255,0.45)`  |

#### Accept Button

- Shown only when `status = 'CREATED'`
- Label: “Accept Work Order”
- On click:

```javascript
await supabase
    .from("work_orders")
    .update({ status: "ACCEPTED", accepted_at: new Date().toISOString() })
    .eq("work_order_id", workOrder.work_order_id)
    .eq("account_user_id", session.user.id);

// Notify admin that user accepted
await supabase.functions.invoke("send-admin-notification", {
    body: { event_type: "work_orders", work_order_id: workOrder.work_order_id }
});

// Do NOT call send-user-notification here — user_notify_work_order DB trigger
// fires automatically on work_orders status change and sends the SMS confirmation.
// Calling it manually would double-fire the SMS.
```

- After: badge updates to ACCEPTED, button disappears

#### Work Order Detail View

Tapping a card expands a detail view or opens a modal showing all fields:

- Work Order ID
- Date created (date + time)
- Service Type
- Gem Type
- Description
- Estimated Price — `formatMoney(value)` directly
- Notes
- Status history:
    - CREATED: date + time
    - ACCEPTED: date + time (if reached)
    - COMPLETED: date + time (if reached)
- Show only statuses that have been reached — omit future statuses

#### Work Order PDF

Fetch admin info dynamically before generating:

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
Work Order ID: [work_order_id]
Date: [created_at date]
Time: [created_at time]

Service Type: [service_type]
Gem Type: [gem_type]
Estimated Price: [estimated_price formatted]

Description:
[description]

Notes:
[notes]

── Status ──
CREATED     [date] [time]
ACCEPTED    [date] [time]  — Confirmed by customer
COMPLETED   [date] [time]  — Confirmed by Cutting Corners Gems
```

- Generate client-side using react-pdf or jsPDF
- Filename: `WorkOrder_[work_order_id_short].pdf`
- Show only statuses that have been reached

---

### Inquiries

Two tabs within this sub-page:

- **Product Inquiries** — from `account_inquiries`
- **Service Requests** — from `service_requests`

#### Product Inquiries Tab

```javascript
const { data } = await supabase
    .from("account_inquiries")
    .select("*")
    .eq("account_user_id", session.user.id)
    .order("created_at", { ascending: false });
```

These are inquiries submitted from the public product page. Each card shows:

- Description preview
- Date submitted
- Photo thumbnail if `photo_url` is present

**Where these come from:** `ProductPageUserView` — when a signed-in user submits an inquiry on the shop page, it inserts into `account_inquiries` linked to `account_user_id`. The same row is also visible in `UserListDashAdminView`.

#### Service Requests Tab

```javascript
const { data } = await supabase
    .from("service_requests")
    .select("*")
    .eq("account_user_id", session.user.id)
    .order("created_at", { ascending: false });
```

Each card shows:

- Description preview
- Service type
- Date submitted
- Photo thumbnail if `photo_url` is present

#### New Service Request Button

- Gold button: “Submit Service Request”
- **SMS required before form opens** — check that user has a phone number AND `opt_in_work_orders = true` in `user_sms_preferences`:

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
    // Show message — do not open form
}
```

If blocked: show message — “To submit a service request you must have a phone number on file and work order SMS notifications enabled. This keeps you informed every step of the way. Update your preferences in your profile.”

If clear: open the service request modal form.

#### Service Request Modal Form

**Fields:**

1. **Service Type** — dropdown (required)

- Custom Rough Cut
- Re-Cut & Re-Polish — Starting Price: $249
- Table Re-Polish — Starting Price: $119
- Crown Re-Polish — Starting Price: $149
- Pavilion Re-Polish — Starting Price: $149
- Gemstone Material Cut Design — Starting Price: $99
- Virtual Consultation — Free 30 Minute Minimum Consultation

1. **Description** — textarea (required), min height 96px, placeholder: “Please describe your service request”
1. **Upload Photos** — file input (optional)

- Accept: `.jpg,.jpeg,.png,.tiff,.tif,.dng,.heic,.pdf`
- Max size: 25MB
- Upload to `ChatUploads` bucket before submitting
- Store returned path as `photo_url`

**Disclaimer (mandatory — always visible below form):**

> “All prices are estimated starting prices. Some gems may be less, some may be more. No work order prices are set in stone until I am able to inspect the piece and the customer accepts the work order through the website.”

Font: Comfortaa, 12px, `rgba(255,255,255,0.45)`, italic. Do not omit this.

**Submit:**

```javascript
// Upload photo first if attached
let uploadedPhotoUrl = null;
if (photoFile) {
    const { data } = await supabase.storage
        .from("ChatUploads")
        .upload(
            `service-requests/${session.user.id}/${Date.now()}_${photoFile.name}`,
            photoFile,
            {
                contentType: photoFile.type
            }
        );
    uploadedPhotoUrl = data?.path ?? null;
}

await supabase.from("service_requests").insert({
    account_user_id: session.user.id,
    service_type: selectedServiceType, // required — must be saved
    description: formDescription,
    photo_url: uploadedPhotoUrl ?? null
});

// Notify admin of new service request
await supabase.functions.invoke("send-admin-notification", {
    body: { event_type: "service_requests", user_id: session.user.id }
});
```

---

### Invoices

Displays all paid invoices for the account user. Invoices are created automatically by the Stripe webhook after a successful purchase — there is no create, edit, or delete UI here.

**How invoices arrive:** When the account user completes a Stripe checkout on the public product page, the Stripe webhook INSERTs a row into `invoices` linked to `account_user_id`. The product data is frozen inside `line_items` JSONB at purchase time. The `trigger_mark_products_sold` DB trigger then sets the product to INACTIVE automatically.

#### Query

```javascript
const { data } = await supabase
    .from("invoices")
    .select("*")
    .eq("account_user_id", session.user.id)
    .order("paid_at", { ascending: false });
```

#### Invoice Card

Shows:

- Invoice ID (short format)
- Product title — read from `line_items[0].title` (not a join — product data is frozen in JSONB)
- Total amount — `formatMoney(invoice.total_amount)` directly — Courier New, teal
- Paid date
- Download PDF button

#### Reading line_items

`line_items` is a JSONB array. Each element contains a full product snapshot frozen at purchase time:

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

Never attempt to join `line_items` to the `products` table — the product may be INACTIVE or deleted. `line_items` is the sole source of truth.

#### Invoice PDF

Fetch admin info dynamically before generating:

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
[account_snapshot.businessName]  — omit if null

Line Items:
  [line_items[0].title]
  [line_items[0].gem_type]  ·  [line_items[0].weight] ct  ·  [line_items[0].color]
  [line_items[0].shape]
  Origin: [line_items[0].origin]          — omit if null
  Treatment: [line_items[0].treatment]    — omit if null
  GIA Report #: [line_items[0].gia_report_number] — omit if null
  Price/ct: [formatMoney(line_items[0].price_per_carat)] — omit if null

Total Paid: [formatMoney(invoice.total_amount)]
Payment Method: Card via Stripe
Stripe Session: [stripe_session_id]
```

- Generate client-side using react-pdf or jsPDF
- Filename: `Invoice_[invoice_id_short].pdf`

---

## Right Panel — Chat UI

### Overview

- Persistent chat thread between account user and admin
- Real-time via Supabase Realtime
- One thread per account user — auto-created on signup via DB trigger
- Append-only — no edit or delete of messages ever

### Loading the Thread

```javascript
const { data: thread } = await supabase
    .from("chat_threads")
    .select("*")
    .eq("account_user_id", session.user.id)
    .single();

const { data: messages } = await supabase
    .from("chat_messages")
    .select("*")
    .eq("chat_thread_id", thread.chat_thread_id)
    .order("created_at", { ascending: true });
```

### Mark as Read on Open

When the chat panel becomes visible (on page load on desktop, or when drawer opens on mobile):

```javascript
await supabase
    .from("chat_threads")
    .update({ account_has_unread: false })
    .eq("chat_thread_id", thread.chat_thread_id);
```

### Real-time Subscription

```javascript
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
            // Append new message to local state instantly
        }
    )
    .subscribe();
```

### Message Bubbles

- Account user messages: right-aligned, teal background `rgba(45,212,191,1)`, dark text
- Admin messages: left-aligned, gold background `#d4af37`, dark text
- Font: Comfortaa, 13px
- Timestamp: Montserrat, 10px, `rgba(255,255,255,0.38)`, below bubble

### Attachments in Chat

- If `attachment_url` present and `attachment_type` starts with `image/`: render inline thumbnail
- If `attachment_type` is `application/pdf`: render PDF icon + filename + download link
- Tapping image opens full size in modal

### Message Input

```javascript
// On send:
await supabase.from("chat_messages").insert({
    chat_thread_id: thread.chat_thread_id,
    actor: "ACCOUNT", // field is 'actor' not 'sender_type'
    actor_id: session.user.id, // field is 'actor_id' not 'sender_id'
    body: messageText,
    attachment_url: uploadedUrl ?? null,
    attachment_type: uploadedMimeType ?? null
});

// Notify admin of new chat message
await supabase.functions.invoke("send-admin-notification", {
    body: { event_type: "chat", thread_id: thread.chat_thread_id }
});

// Mark thread: admin has unread, user does not
await supabase
    .from("chat_threads")
    .update({ account_has_unread: false, admin_has_unread: true })
    .eq("chat_thread_id", thread.chat_thread_id);
```

### File Upload in Chat

- Paperclip icon next to message input
- Accept: `.jpg,.jpeg,.png,.tiff,.tif,.dng,.heic,.pdf`
- Max size: 25MB
- Upload to `ChatUploads` bucket
- Show preview before sending
- Can send file with or without text

### Chat Panel Header

- Title: “Chat” — Montserrat uppercase, gold
- Subtitle: “We’re here to help — don’t hesitate to reach out” — Comfortaa, 12px, `rgba(255,255,255,0.45)`
- Collapse button on desktop: small arrow to hide/show panel

---

## Edge Functions Called On This Page

| Event                                    | Function                  | body                                           |
| ---------------------------------------- | ------------------------- | ---------------------------------------------- |
| Product inquiry submitted (account user) | `send-admin-notification` | `{ event_type: 'account_inquiries', user_id }` |
| Service request submitted                | `send-admin-notification` | `{ event_type: 'service_requests', user_id }`  |
| Work order accepted                      | `send-admin-notification` | `{ event_type: 'work_orders', work_order_id }` |
| Chat message sent                        | `send-admin-notification` | `{ event_type: 'chat', thread_id }`            |

> **Note:** `send-user-notification` is NOT called manually from this page for work order events. The `user_notify_work_order` DB trigger fires automatically on `work_orders` status changes and handles SMS delivery server-side. Calling it manually here would double-fire the SMS.

> **Note:** Product inquiry notifications fire from `PublicProductPage.tsx` at inquiry submit time, not from this dashboard. Guest inquiry notifications also fire from `PublicProductPage.tsx` with `event_type: 'guest_inquiries'`.

---

## Fonts

- Oranienbaum — section titles
- Montserrat — labels, nav, buttons, timestamps
- Comfortaa — body text, messages, descriptions
- Courier New — prices, invoice amounts

---

## Notes for Emergent

- Chat panel is the most important UI element — permanent panel, never a popup or modal
- The service request disclaimer is mandatory — always visible in the form, never omit it
- Work orders are admin-created only — no create UI on this page
- `service_type` is a required field on `service_requests` insert — always include it
- `business_name` on `account_users` is nullable — treat as optional throughout
- `attachment_url` and `attachment_type` on `chat_messages` were added via ALTER TABLE
- `chat_messages` uses `actor` and `actor_id` — not `sender_type` / `sender_id`
- Admin info for PDFs is always fetched dynamically from `admin_users` — never hardcoded
- DB prices are in dollars — use `formatMoney(value)` directly, no multiplication or division
- `line_items` is a JSONB array — read `line_items[0].title` etc — never join to `products` table
- Invoices arrive automatically via Stripe webhook after purchase — no frontend handling needed
- `trigger_mark_products_sold` sets product INACTIVE after purchase — no frontend handling needed
- SMS is required before submitting a service request — check phone + `opt_in_work_orders` first
- On desktop, mark chat as read on page load. On mobile, mark as read when drawer opens.
