# AdminDashboard — Emergent Build Spec

_Canonical version — February 23, 2026_
_File: `Website/Admin/AdminDash/AdminDash.md`_

## Auth

- Admin only — verify `is_admin()` on load
- Route: `/admin/dashboard` — redirect here after login
- Part of the admin shell — same sidebar design as AdminProductsPage and AdminPortfolioPage

---

## Required SQL (Already Run)

```sql
ALTER TABLE admin_users ADD COLUMN business_name TEXT;
ALTER TABLE admin_users ADD COLUMN full_name      TEXT;
ALTER TABLE admin_users ADD COLUMN address        TEXT;
ALTER TABLE admin_users ADD COLUMN phone          TEXT;
ALTER TABLE admin_users ADD COLUMN contact_email  TEXT;

UPDATE admin_users SET
  business_name = 'Cutting Corners Gems',
  full_name     = 'Michael Wall',
  address       = '850 S River Dr #2117, Tempe, AZ 85281',
  phone         = '480.286.4595',
  contact_email = 'mwall@cuttingcornersgems.com'
WHERE email = 'admin@cuttingcornersgems.com';
```

---

## Navigation (Admin Shell Sidebar)

```
Dashboard        ⬡
Products         ◈
Portfolio        ◻
User List        ◯
```

- Active item: gold `#d4af37`, left border indicator
- Same style as AdminProductsPage sidebar exactly
- **User List** links to AdminUserListPage (specced separately)
- When admin navigates into a specific user’s account dashboard, the nav changes — specced separately in AdminAccountUserPage

---

## Layout

Two-column layout inside the main panel:

- **Left column (~60%):** Admin profile info + editable fields
- **Right column (~40%):** Summary stats + notification feed
- Both columns scroll independently if content overflows
- Same `#060606` background, same panel/border system as other admin pages

---

## Left Column — Admin Profile

### Load Admin Info

```javascript
const { data: adminInfo } = await supabase
    .from("admin_users")
    .select("*")
    .single();
```

### Display & Edit Fields

All fields display as read-only by default with an edit icon. Clicking edit icon makes field inline-editable. Save button appears when any field is modified.

| Field         | DB Column       | Placeholder                           |
| ------------- | --------------- | ------------------------------------- |
| Business Name | `business_name` | Cutting Corners Gems                  |
| Full Name     | `full_name`     | Michael Wall                          |
| Address       | `address`       | 850 S River Dr #2117, Tempe, AZ 85281 |
| Phone         | `phone`         | 480.286.4595                          |
| Contact Email | `contact_email` | mwall@cuttingcornersgems.com          |
| Login Email   | `email`         | read-only — never editable            |

### Edit Behavior

- Click pencil icon next to any field — input appears inline
- Save button appears in the section footer when any field is dirty
- On save: `UPDATE admin_users SET [fields] WHERE admin_user_id = auth.uid()`
- On success: flash “✓ Saved” indicator same as product form auto-save
- Login email (`email`) is always read-only — changing it would break auth

### Section Header

- Title: “Business Info” — Cormorant serif, same `.ph-title` style
- Subtitle: “Used on work order and invoice PDFs” — DM Sans, 10px, dim

### PDF Reference Note

> “This information appears on all work order and invoice PDFs generated for customers.”

Font: DM Sans, 9.5px, `rgba(255,255,255,0.35)`, italic

---

## Right Column — Stats + Notifications

### Summary Stats

```javascript
// Shop sales
const { data: invoices } = await supabase
    .from("invoices")
    .select("total_amount");

const totalSold = invoices.length;
const totalRevenue = invoices.reduce((sum, inv) => sum + inv.total_amount, 0);

// Completed work orders
const { data: workOrders } = await supabase
    .from("work_orders")
    .select("estimated_price")
    .eq("status", "COMPLETED");

const totalWorkOrdersCompleted = workOrders.length;
const totalWorkOrderRevenue = workOrders.reduce(
    (sum, wo) => sum + (wo.estimated_price || 0),
    0
);
```

**Stat Cards (2x2 grid):**

| Label                 | Value                                         | Notes                      |
| --------------------- | --------------------------------------------- | -------------------------- |
| Items Sold            | count of invoices                             | Shop sales only            |
| Shop Revenue          | sum of `total_amount` — `fmtMoney()` directly | Dollars, no conversion     |
| Work Orders Completed | count of COMPLETED work orders                |                            |
| Work Order Revenue    | sum of `estimated_price` on COMPLETED         | Separate from shop revenue |

- Value: Cormorant serif, 22px, gold `#cfb040`
- Label: DM Sans, 8.5px, uppercase, dim `rgba(255,255,255,0.45)`, letter-spacing
- Card background: `#0d0d0d`, border: `1px solid rgba(255,255,255,0.06)`, padding: 16px

---

### Notification Feed

Below the stat cards. Shows all unread notifications from `admin_notifications`.

#### Load & Realtime

```javascript
// Initial load — join account_users to get name for account user notifications
const { data: notifications } = await supabase
    .from("admin_notifications")
    .select("*, account_users(name)")
    .eq("read", false)
    .order("created_at", { ascending: false });

// Realtime — prepend new notifications as they arrive
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
            // prepend new notification to feed
        }
    )
    .subscribe();
```

> Enable Supabase Realtime on `admin_notifications` in Supabase → Database → Replication

#### Notification Row

Each row shows:

- **Type icon** — small symbol per type
- **Message** — human readable description
- **Username** — from `account_users.name` join via `user_id`. For `guest_inquiries`, `user_id` will not match an account user — display “Guest” instead
- **Time** — relative e.g. “2m ago”, “1h ago”
- **Unread dot** — gold dot on left edge

| Type                | Icon | Display Message               |
| ------------------- | ---- | ----------------------------- |
| `account_inquiries` | ✉   | New inquiry from account user |
| `guest_inquiries`   | ✉   | New inquiry from guest        |
| `service_requests`  | ◈    | New service request submitted |
| `chat_messages`     | ◻   | New chat message              |
| `work_orders`       | ◇    | New work order created        |

#### Mark as Read

- “Mark all read” button at top right of notification section
- On click: `UPDATE admin_notifications SET read = true WHERE read = false`
- Individual row: clicking marks it read and navigates to the relevant user’s dashboard
- For `guest_inquiries` rows: clicking navigates to `GuestUserAdminView`

#### Empty State

- “No new notifications” — dim, uppercase, centered

#### Section Header

- Title: “Notifications” — same style as other section headers
- Unread count badge next to title — gold, shows total unread number

---

## Notification Bell in Sidebar

```javascript
const unreadCount = notifications.filter((n) => !n.read).length;
```

- Badge: small gold circle with white number, positioned top-right of bell icon
- Updates in real time via the same Realtime subscription
- Clicking bell scrolls to or focuses the notification feed on the dashboard

---

## User List Notification Bubbles

When admin navigates to AdminUserListPage, each user row shows a notification bubble if that user has unread notifications.

```javascript
const perUserCounts = notifications.reduce((acc, n) => {
    if (!n.read) acc[n.user_id] = (acc[n.user_id] || 0) + 1;
    return acc;
}, {});
```

- Pass `perUserCounts` to AdminUserListPage
- Each user row renders a gold bubble with the count if `perUserCounts[user.account_user_id] > 0`
- Guest inquiries will bucket under the `GUEST_ACCOUNT_USER_ID` — the Guest User Account row in the user list should show its own bubble count
- Bubble style: gold `#cfb040` background, `#000` text, 16px circle, DM Sans 8.5px bold

---

## Supabase Queries Summary

```javascript
// Admin info
supabase.from("admin_users").select("*").single();

// Update admin info
supabase
    .from("admin_users")
    .update({ business_name, full_name, address, phone, contact_email })
    .eq("admin_user_id", session.user.id);

// Stats
supabase.from("invoices").select("total_amount");
supabase
    .from("work_orders")
    .select("estimated_price")
    .eq("status", "COMPLETED");

// Notifications
supabase
    .from("admin_notifications")
    .select("*, account_users(name)")
    .eq("read", false)
    .order("created_at", { ascending: false });

// Mark all read
supabase.from("admin_notifications").update({ read: true }).eq("read", false);

// Mark one read
supabase
    .from("admin_notifications")
    .update({ read: true })
    .eq("id", notificationId);
```

---

## Notes for Emergent

- Same CSS design system as AdminProductsPage and AdminPortfolioPage — Cormorant + DM Sans, same color variables
- Admin info section is the source of truth for all PDFs — if admin updates their address here, all future PDFs reflect it
- Login email (`admin_users.email`) is never editable from the UI — it’s the Supabase Auth identifier
- Stats are read-only — no editable fields in the stats section
- Notification feed is real-time — enable Supabase Replication on `admin_notifications`
- Clicking a notification row navigates to that user’s admin dashboard and marks the notification read
- `guest_inquiries` notifications have no matching `account_users` row — display “Guest” for the username and navigate to `GuestUserAdminView`
- Work order revenue uses `estimated_price` — treat this as the settled price for completed orders
- `total_amount` on invoices is in dollars NUMERIC(12,2) — use `fmtMoney()` directly, no multiplication
