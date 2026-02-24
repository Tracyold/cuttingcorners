# UserDashboardAdminView — Emergent Build Spec

_Canonical version — February 23, 2026_
_File: `Website/Admin/AdminDash/UsersListEntities/ULDA/UserListsSchema.md`_

## Auth

- Admin only — verify `is_admin()` on load
- Route: `/admin/users/[account_user_id]`
- Accessed only from AdminUserListPage — never linked publicly
- Load the specific `account_user_id` from route params on mount

---

## Prices — Critical

**All prices in the DB are stored in DOLLARS as NUMERIC(12,2).**
Use `fmtMoney(value)` directly — do NOT multiply or divide by anything.

```javascript
// Correct
fmtMoney(invoice.total_amount); // → "$41,040"
fmtMoney(workOrder.estimated_price); // → "$2,490"

// Wrong — do not do this
fmtMoney(invoice.total_amount * 100);
fmtMoney(invoice.total_amount / 100);
```

---

## Design Authority

- **TSX:** `AdminMobileDesktopUserDash.tsx` — both desktop AND mobile layouts, all panels, chat widget, all popups, mobile drawer, and mobile full-screen pages are authoritative for design and behavior
- `AdminUserAccountDashboard.tsx` is an earlier desktop-only draft — ignore it, use `AdminMobileDesktopUserDash.tsx` as the final reference
- **This spec:** authoritative for all Supabase API routes, data shapes, and mutation logic
- Same CSS design system: Cormorant serif + DM Sans, same CSS variables as all other admin pages

---

## Layout: Two Modes

### Desktop

- Full dashboard — top nav bar replaces the main admin sidebar entirely
- Left panel (268px): Inquiries / Service Requests
- Center: fills remaining space — used for Dashboard tab content
- Right panel (268px): Work Orders / Invoices
- Chat widget: fixed bottom bar, draggable left/right, collapses to 44px bar
- Panels show/hide based on active top nav tab
- Chat is always present regardless of active tab

### Mobile

- Breakpoint: `window.innerWidth < 768` — detected via `useIsMobile()` hook in TSX
- Top bar shows current page title + hamburger menu button (top right)
- Hamburger badge shows total unread count across all tabs
- Tapping hamburger opens right-side drawer (`MobileMenu` component in TSX)
- Drawer contains: user name + business name header, nav items with notification badges, back button at bottom
- Mobile nav items: Inquiries (combined with Service Requests), Work Orders, Invoices, Chat, User Info
- Each tab opens full screen — one at a time
- Tapping a list row opens a full-screen popup (`MobilePopupPage` component) — not a modal overlay
- Chat is full screen on mobile — input pinned to bottom
- User Info tab shows read-only user details — edit not available on mobile (desktop only via name click)
- Back button navigates to `/admin/users`
- All CSS classes, animations, and component structure defined in `AdminMobileDesktopUserDash.tsx` — follow exactly

---

## Top Nav Bar (Desktop + Mobile)

```
← Back   User [account_user.name]   Dashboard  Inquiries  Service Requests  Work Orders  Invoices
```

### Back Button

- Desktop: top left, before user name
- Mobile: bottom of drawer, gray, small, left-aligned
- On click: navigates to `/admin/users`
- Style: `.back` class from TSX — uppercase, 9.5px, dim, letter-spacing

### User Name (Desktop)

- Displays `account_users.name`
- Style: `.crumb` — Cormorant serif, 14px, white
- Small label "User" before name: `.crumb-sub` — 9px, dim, uppercase
- **Hover:** shows user info popup (read-only quick view)
- **Click:** opens user info edit popup

### Nav Tabs

| Tab              | Content                | Panel                   |
| ---------------- | ---------------------- | ----------------------- |
| Dashboard        | User account summary   | Center fills full width |
| Inquiries        | account_inquiries list | Left panel              |
| Service Requests | service_requests list  | Left panel              |
| Work Orders      | work_orders list       | Right panel             |
| Invoices         | invoices list          | Right panel             |

- Active tab: white text, gold bottom border
- Inactive: dim, flash gold on hover
- Notification dot (red `var(--er)`) appears on tab if unread items exist

---

## Notification Dots

```javascript
const unreadInq = inquiries.filter((i) => !i.is_read).length > 0;
const unreadSR = serviceRequests.filter((i) => !i.is_read).length > 0;
const unreadWO = workOrders.filter((w) => w.status === "CREATED").length > 0;
// Invoices dot not used — invoices are always PAID on arrival
```

Dots clear when admin opens that tab and views the content.
On mobile, dots appear on drawer tab labels.

---

## Dashboard Tab (Landing View)

First thing admin sees when entering a user's dashboard. Center panel fills full width.

### Load Data

```javascript
const { data: user } = await supabase
    .from("account_users")
    .select("*")
    .eq("account_user_id", params.account_user_id)
    .single();

const { data: woCount } = await supabase
    .from("work_orders")
    .select("work_order_id")
    .eq("account_user_id", params.account_user_id);

const { data: invData } = await supabase
    .from("invoices")
    .select("invoice_id, total_amount") // single string — not two arguments
    .eq("account_user_id", params.account_user_id);

const { data: inqCount } = await supabase
    .from("account_inquiries")
    .select("account_inquiry_id")
    .eq("account_user_id", params.account_user_id);

const { data: srCount } = await supabase
    .from("service_requests")
    .select("service_request_id")
    .eq("account_user_id", params.account_user_id);

const totalInvoiced = invData.reduce((sum, inv) => sum + inv.total_amount, 0);
```

### Dashboard Layout

Two columns side by side:

**Left — Account Info Card**

| Field         | DB Column          | Notes            |
| ------------- | ------------------ | ---------------- |
| Name          | `name`             |                  |
| Email         | `email`            |                  |
| Phone         | `phone`            | show "—" if null |
| Address       | `shipping_address` | show "—" if null |
| Business Name | `business_name`    | show "—" if null |
| Status        | `status`           | pill badge       |
| Member Since  | `created_at`       | fmtDate()        |

- Edit button top right of card — opens User Edit Popup
- Status pill: ACTIVE = gold, SUSPENDED = red muted

**Right — Activity Summary Cards (2x2 grid)**

| Label            | Value                                                  |
| ---------------- | ------------------------------------------------------ |
| Work Orders      | count of work_orders                                   |
| Total Invoiced   | `fmtMoney(totalInvoiced)` directly — Courier New, teal |
| Inquiries        | count of account_inquiries                             |
| Service Requests | count of service_requests                              |

- Same stat card style as AdminDashboardPage — Cormorant serif value in gold, DM Sans label dim uppercase

---

## User Info Popup (Hover on name — read only)

Small popover below name. Read-only, disappears on mouse leave.

```
Name:     Sophia Marchetti
Email:    sophia@marchetti.com
Phone:    +1 (305) 874-2210
Address:  142 Brickell Ave, Miami FL 33131
Business: Marchetti Fine Jewelers
Status:   ACTIVE
```

---

## User Edit Popup (Click name OR edit button on dashboard)

### Fields

| Label            | DB Column          | Input Type                 |
| ---------------- | ------------------ | -------------------------- |
| Name             | `name`             | text                       |
| Email            | `email`            | text                       |
| Phone            | `phone`            | text                       |
| Shipping Address | `shipping_address` | textarea                   |
| Business Name    | `business_name`    | text                       |
| Status           | `status`           | select: ACTIVE / SUSPENDED |

### Save

```javascript
await supabase
    .from("account_users")
    .update({ name, email, phone, shipping_address, business_name, status })
    .eq("account_user_id", params.account_user_id);
```

On success: flash "✓ Saved", update local user state, close modal.

> Changes to `account_users` affect all future PDFs — these pull live from `account_users` at time of generation. Past invoices are frozen in `account_snapshot` and are unaffected. Never update `account_snapshot` on edit.

---

## Left Panel — Inquiries Tab

### Load

```javascript
const { data: inquiries } = await supabase
    .from("account_inquiries")
    .select("*")
    .eq("account_user_id", params.account_user_id)
    .order("created_at", { ascending: false });
```

### List Rows

- Checkbox (bulk select)
- Inquiry ID (monospace)
- Date (fmtDate)
- Unread gold dot if `is_read = false`

### Bulk Actions

- Mark Read: `UPDATE account_inquiries SET is_read = true, read_at = now() WHERE account_inquiry_id IN [selected]`
- Export TXT: generates plain text file of selected inquiry descriptions

### Inquiry Detail Popup (click row)

Matches `InquiryPopup` from TSX exactly:

- From (user name)
- Date · Time
- Email · Phone · Address
- Message (description)
- Photo: if `photo_url` present, render from `account-inquiry-photos` bucket:

```javascript
// photo_url is a storage path — get signed URL to render
const { data } = await supabase.storage
    .from("account-inquiry-photos")
    .createSignedUrl(inquiry.photo_url, 3600);
```

- Footer: "Read-only · Reply via Chat"
- Export TXT button

On open: mark as read

```javascript
await supabase
    .from("account_inquiries")
    .update({ is_read: true, read_at: new Date().toISOString() })
    .eq("account_inquiry_id", item.account_inquiry_id);
```

---

## Left Panel — Service Requests Tab

### Load

```javascript
const { data: serviceRequests } = await supabase
    .from("service_requests")
    .select("*")
    .eq("account_user_id", params.account_user_id)
    .order("created_at", { ascending: false });
```

### List Rows

- Checkbox (bulk select)
- Service Request ID (monospace)
- Service type
- Date (fmtDate)
- Unread gold dot if `is_read = false`

### Bulk Actions

- Mark Read
- Export TXT

### Service Request Detail Popup (click row)

Matches `SRPopup` from TSX exactly:

- Subject
- Service Type
- Date · Time
- Description
- Photo: if `photo_url` present, render from `ChatUploads` bucket:

```javascript
const { data } = await supabase.storage
    .from("ChatUploads")
    .createSignedUrl(serviceRequest.photo_url, 3600);
```

- Footer: "Read-only · Reply via Chat"
- Export TXT button

On open: mark as read

```javascript
await supabase
    .from("service_requests")
    .update({ is_read: true, read_at: new Date().toISOString() })
    .eq("service_request_id", item.service_request_id);
```

---

## Right Panel — Work Orders Tab

### Load

```javascript
const { data: workOrders } = await supabase
    .from("work_orders")
    .select("*")
    .eq("account_user_id", params.account_user_id)
    .order("created_at", { ascending: false });
```

### List Rows

- Work Order ID (monospace)
- Status pill (CREATED / ACCEPTED / COMPLETED / CANCELLED)
- Date (fmtDate)

### + Add Button

- Top right of panel — `.btn-awo` style from TSX
- Opens Add Work Order Popup

### Work Order Detail Popup (click row)

Matches `WOPopup` from TSX exactly.

**Header — admin info pulled live from `admin_users`:**

```javascript
const { data: adminInfo } = await supabase
    .from("admin_users")
    .select("*")
    .single();
```

**Client section — pulled live from `account_users` (current info):**

- Name, email, phone, shipping_address
- Note: work order PDFs use live data at time of generation, not a snapshot

**Timeline:** CREATED → ACCEPTED → COMPLETED

**Fields:** title, service_type, gem_type, estimated_price, description, notes

**Edit mode:** only available when `status = 'CREATED'`

```javascript
await supabase
    .from("work_orders")
    .update({
        title,
        service_type,
        gem_type,
        estimated_price: parseFloat(estimated_price),
        description,
        notes
    })
    .eq("work_order_id", workOrder.work_order_id);
// Always parseFloat() estimated_price — stored as NUMERIC in DB
```

Append to `edit_history` on save:

```javascript
// edit_history is a jsonb array — always append, never overwrite
const newEntry = {
    edited_at: new Date().toISOString(),
    admin_id: session.user.id,
    changes: {}
};
await supabase
    .from("work_orders")
    .update({ edit_history: [...workOrder.edit_history, newEntry] })
    .eq("work_order_id", workOrder.work_order_id);
```

**Actions:**

- Cancel Order: `UPDATE work_orders SET status = 'CANCELLED', cancelled_at = now()` — show cancel reason input first
- Mark Complete: `UPDATE work_orders SET status = 'COMPLETED', completed_at = now()` — only when `status = 'ACCEPTED'`
- Export PDF: generates work order PDF using live `admin_users` + live `account_users`

**Status colors** (matches TSX `STATUS_COLORS`):

| Status    | Background            | Color   |
| --------- | --------------------- | ------- |
| CREATED   | rgba(184,154,42,0.08) | #cfb040 |
| ACCEPTED  | rgba(90,150,90,0.1)   | #7ec87e |
| COMPLETED | rgba(80,120,200,0.1)  | #88aadd |
| CANCELLED | rgba(181,64,64,0.1)   | #c07070 |

> The TSX mock data spells it `COMPLETE` — the actual DB enum value is `COMPLETED`. Always use `COMPLETED` in real code.

### Add Work Order Popup

Matches `AddWOPopup` from TSX exactly.

**Fields:**

| Field           | DB Column         | Required |
| --------------- | ----------------- | -------- |
| Title           | `title`           | YES      |
| Service Type    | `service_type`    | NO       |
| Gem Type        | `gem_type`        | NO       |
| Estimated Price | `estimated_price` | NO       |
| Description     | `description`     | YES      |
| Notes           | `notes`           | NO       |

**On Create:**

```javascript
await supabase.from("work_orders").insert({
    account_user_id: params.account_user_id,
    created_by_admin_id: session.user.id,
    title,
    description,
    service_type: service_type || null,
    gem_type: gem_type || null,
    estimated_price: estimated_price ? parseFloat(estimated_price) : null,
    notes: notes || null,
    status: "CREATED",
    edit_history: []
});
```

After insert, DB triggers fire automatically — no frontend calls needed:

- `admin_notify_work_order` → inserts into `admin_notifications`
- `user_notify_work_order` → sends SMS to user if `opt_in_work_orders = true`

Do NOT manually call `send-admin-notification` or `send-user-notification` after work order insert — the triggers handle it.

---

## Right Panel — Invoices Tab

### Load

```javascript
const { data: invoices } = await supabase
    .from("invoices")
    .select("*")
    .eq("account_user_id", params.account_user_id)
    .order("paid_at", { ascending: false });
```

### List Rows

- Invoice ID (monospace)
- Product title — from `line_items[0].title` (never join to `products` table)
- Total — `fmtMoney(invoice.total_amount)` directly
- PAID pill
- Date paid (fmtDate)

### Invoice Detail Popup (click row)

Matches `InvPopup` from TSX exactly.

**Header — from `admin_snapshot` (frozen at purchase time):**

```javascript
invoice.admin_snapshot.businessName;
invoice.admin_snapshot.fullName;
invoice.admin_snapshot.address;
invoice.admin_snapshot.contactEmail;
invoice.admin_snapshot.phone;
```

Never pull live `admin_users` for invoice display — use the frozen snapshot. Historical invoices must show the admin info that was current at time of sale.

**Bill To — from `account_snapshot` (frozen at purchase time):**

```javascript
invoice.account_snapshot.name;
invoice.account_snapshot.email;
invoice.account_snapshot.phone;
invoice.account_snapshot.shippingAddress;
invoice.account_snapshot.businessName; // omit if null
```

**Line Items — from `line_items` JSONB array:**

```javascript
const item = invoice.line_items[0];

// Available fields:
item.product_id;
item.title;
item.gem_type;
item.shape;
item.weight;
item.color;
item.origin; // may be null — omit from PDF if null
item.treatment; // may be null — omit from PDF if null
item.description; // may be null
item.price_per_carat; // may be null — omit from PDF if null
item.total_price;
item.gia_report_number; // may be null — omit from PDF if null
item.gia_report_pdf_url; // may be null
item.photo_url; // may be null
```

Never join `line_items` to the `products` table — the product is INACTIVE after purchase. `line_items` is the sole source of truth.

**Total:** `fmtMoney(invoice.total_amount)` directly
**Footer:** "Read-only · Stripe verified"
**Stripe Session:** `invoice.stripe_session_id` — display for reference

**Export PDF:** generates invoice PDF using `account_snapshot` and `admin_snapshot` (both frozen — do not pull live data for invoice PDFs)

---

## Chat Widget (Desktop)

Matches `ChatWidget` component from TSX exactly.

### Design

- Fixed bottom bar, positioned from left edge
- Collapsed: 44px tall — shows user name + status badge + expand button
- Expanded: 440px tall — full message thread + input
- Draggable left/right across bottom of screen
- Always present regardless of active tab

### Load Thread + Messages

```javascript
const { data: chatThread } = await supabase
    .from("chat_threads")
    .select("*")
    .eq("account_user_id", params.account_user_id)
    .single();

const { data: messages } = await supabase
    .from("chat_messages")
    .select("*")
    .eq("chat_thread_id", chatThread.chat_thread_id)
    .order("created_at", { ascending: true });
```

Chat thread is auto-created on user signup via `trigger_create_chat_thread` — it will always exist. Never create it manually.

### Send Message (Admin)

```javascript
await supabase.from("chat_messages").insert({
    chat_thread_id: chatThread.chat_thread_id,
    actor: "ADMIN", // field is 'actor' not 'sender_type'
    actor_id: session.user.id, // field is 'actor_id' not 'sender_id'
    body: messageText,
    attachment_url: uploadedUrl ?? null,
    attachment_type: uploadedMimeType ?? null
});

// Notify user of new admin message via SMS if opt_in_chat = true
await supabase.functions.invoke("send-user-notification", {
    body: { event_type: "chat", user_id: params.account_user_id }
});

// Mark thread: user has unread, admin does not
await supabase
    .from("chat_threads")
    .update({ admin_has_unread: false, account_has_unread: true })
    .eq("chat_thread_id", chatThread.chat_thread_id);
```

### File Upload in Chat (Admin)

- Paperclip icon next to message input
- Accept: `.jpg,.jpeg,.png,.tiff,.tif,.dng,.heic,.pdf`
- Max size: 25MB
- Upload to `ChatUploads` bucket before sending:

```javascript
const { data } = await supabase.storage
    .from("ChatUploads")
    .upload(`admin/${Date.now()}_${file.name}`, file, {
        contentType: file.type
    });
uploadedUrl = data.path;
uploadedMimeType = file.type;
```

### Attachments in Chat

- If `attachment_url` present and `attachment_type` starts with `image/`: render inline thumbnail
- If `attachment_type` is `application/pdf`: render PDF icon + filename + download link
- Tapping image opens full size

### Realtime

```javascript
supabase
    .channel("chat-" + chatThread.chat_thread_id)
    .on(
        "postgres_changes",
        {
            event: "INSERT",
            schema: "public",
            table: "chat_messages",
            filter: `chat_thread_id=eq.${chatThread.chat_thread_id}`
        },
        (payload) => {
            setMessages((p) => [...p, payload.new]);
            scrollToBottom();
        }
    )
    .subscribe();
```

### Mark as Read (on expand)

When chat widget is expanded:

```javascript
await supabase
    .from("chat_threads")
    .update({ admin_has_unread: false })
    .eq("chat_thread_id", chatThread.chat_thread_id);
```

---

## Chat — Mobile

Dedicated tab in drawer menu. Tapping opens full screen chat view:

- Full message thread scrollable
- Input bar pinned to bottom (above keyboard)
- Same send logic and realtime subscription as desktop
- Back arrow at top left returns to drawer
- Mark as read when tab opens

---

## Supabase Queries Summary

```javascript
// User info
supabase.from('account_users').select('*').eq('account_user_id', id).single()

// Update user info
supabase.from('account_users').update({...}).eq('account_user_id', id)

// Admin info (for work order popup header + PDF)
supabase.from('admin_users').select('*').single()

// Inquiries
supabase.from('account_inquiries').select('*').eq('account_user_id', id).order('created_at', { ascending: false })

// Mark inquiry read
supabase.from('account_inquiries').update({ is_read: true, read_at: now }).eq('account_inquiry_id', id)

// Service Requests
supabase.from('service_requests').select('*').eq('account_user_id', id).order('created_at', { ascending: false })

// Mark service request read
supabase.from('service_requests').update({ is_read: true, read_at: now }).eq('service_request_id', id)

// Work Orders
supabase.from('work_orders').select('*').eq('account_user_id', id).order('created_at', { ascending: false })

// Create work order
supabase.from('work_orders').insert({...})

// Update work order
supabase.from('work_orders').update({...}).eq('work_order_id', id)

// Invoices
supabase.from('invoices').select('*').eq('account_user_id', id).order('paid_at', { ascending: false })

// Chat thread
supabase.from('chat_threads').select('*').eq('account_user_id', id).single()

// Chat messages
supabase.from('chat_messages').select('*').eq('chat_thread_id', threadId).order('created_at', { ascending: true })

// Send message (admin)
supabase.from('chat_messages').insert({
  chat_thread_id, actor: 'ADMIN', actor_id: adminId,
  body, attachment_url, attachment_type
})

// Notify user of admin chat message
supabase.functions.invoke('send-user-notification', {
  body: { event_type: 'chat', user_id: params.account_user_id }
})

// Mark admin unread cleared + user unread set
supabase.from('chat_threads').update({ admin_has_unread: false, account_has_unread: true }).eq('chat_thread_id', threadId)

// Mark admin unread cleared (on expand)
supabase.from('chat_threads').update({ admin_has_unread: false }).eq('chat_thread_id', threadId)

// Signed URL for inquiry photo
supabase.storage.from('account-inquiry-photos').createSignedUrl(path, 3600)

// Signed URL for service request photo
supabase.storage.from('ChatUploads').createSignedUrl(path, 3600)
```

---

## State Variables

```javascript
const [user, setUser] = useState(null);
const [adminInfo, setAdminInfo] = useState(null);
const [inquiries, setInquiries] = useState([]);
const [serviceRequests, setSR] = useState([]);
const [workOrders, setWorkOrders] = useState([]);
const [invoices, setInvoices] = useState([]);
const [messages, setMessages] = useState([]);
const [chatThread, setChatThread] = useState(null);
const [activeNav, setActiveNav] = useState("dashboard");
const [leftTab, setLeftTab] = useState("inquiries");
const [rightTab, setRightTab] = useState("workorders");
const [popup, setPopup] = useState(null);
const [showAddWO, setShowAddWO] = useState(false);
const [showEditUser, setShowEditUser] = useState(false);
const [showUserHover, setShowUserHover] = useState(false);
const [chatCollapsed, setChatCollapsed] = useState(true);
const [loading, setLoading] = useState(true);
const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
```

---

## Notes for Emergent

- TSX file is the **design authority** — match all panels, chat widget, and popup components exactly
- This spec is the **API authority** — all Supabase queries and mutation logic come from here
- **Invoice PDFs** use frozen `account_snapshot` and `admin_snapshot` — never pull live data for historical invoices
- **Work order PDFs** use live `account_users` + live `admin_users` at time of PDF generation
- **Chat thread always exists** — created automatically by `trigger_create_chat_thread` on user signup. Never create manually.
- **Work order insert triggers fire automatically** — `admin_notify_work_order` and `user_notify_work_order`. Do NOT manually call edge functions after work order insert.
- **Chat send requires manual `send-user-notification` call** — no trigger handles this. Always call it after admin sends a message.
- **`attachment_url` and `attachment_type`** must be included in chat message INSERT — both admin and user sides support file attachments
- **Photo URLs are storage paths** — use `createSignedUrl` to render, not direct URLs. Inquiry photos from `account-inquiry-photos`, service request photos from `ChatUploads`
- `chat_messages` uses `actor` and `actor_id` — not `sender_type` / `sender_id`
- `estimated_price` is NUMERIC — always `parseFloat()` before insert/update
- `line_items` is JSONB — read `line_items[0].title` etc — never join to `products` table
- `edit_history` is a JSONB array — always append, never overwrite
- `COMPLETED` is the correct DB enum value — TSX mock uses `COMPLETE`, ignore it
- All prices in dollars — `fmtMoney(value)` directly, no multiplication or division
