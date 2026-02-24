# AdminUserListPage — Emergent Build Spec

_Canonical version — February 23, 2026_
_File: `Website/Admin/AdminDash/UsersListEntities/AdminUsersList.md`_

## Auth

- Admin only — verify `is_admin()` on load
- Route: `/admin/users`
- Part of the admin shell — same sidebar as all other admin pages
- Active nav item: `User List`

---

## Design Reference

- Same shell, sidebar, CSS variables, and font system as AdminProductsPage and AdminPortfolioPage
- Cormorant serif + DM Sans sans
- Same color variables: `--k0` through `--k4`, `--g`, `--gl`, `--ln`, etc.
- Table layout follows the same `.tbl` pattern as AdminProductsPage

---

## Sidebar Navigation

```
Dashboard        ⬡
Products         ◈
Portfolio        ◻
User List        ◯   ← active
```

---

## Page Header

- Title: “User List” — Cormorant serif, same `.ph-title` style
- Right side: user count — e.g. “14 accounts” — DM Sans, 10px, dim
- No add button — users are created through the signup flow, not manually

---

## Guest User Banner

At the very top of the page, above the table, a pinned special row for the Guest User Account.

- Label: “Guest Account” — dim uppercase, 8.5px, letter-spacing
- Shows as a distinct card/row separated from the regular user table
- Same columns as user rows: name, email, date created, etc.
- Clicking it navigates to the Guest User’s admin dashboard: `/admin/users/[GUEST_ACCOUNT_USER_ID]`
- Style: `#0d0d0d` background, gold left border `2px solid rgba(207,176,64,0.3)`
- Note below: “This account receives all non-logged-in inquiries and product invoices” — 9px, dim italic
- Show unread notification bubble on the banner if guest has unread notifications (see Notification Bubbles below)

**Load guest user by ID — always use the env var, never identify by email:**

```javascript
// GUEST_ACCOUNT_USER_ID is stored as an environment variable
// Never hardcode it — never identify the guest account by email
const { data: guestUser } = await supabase
    .from("account_users")
    .select("*")
    .eq("account_user_id", process.env.NEXT_PUBLIC_GUEST_ACCOUNT_USER_ID)
    .single();
```

---

## User Table

### Load All Users (excluding Guest User Account)

```javascript
const { data: users } = await supabase
    .from("account_users")
    .select("*")
    .neq("account_user_id", process.env.NEXT_PUBLIC_GUEST_ACCOUNT_USER_ID)
    .order("created_at", { ascending: false });
```

### Columns

| Column Header | DB Field           | Notes                                              |
| ------------- | ------------------ | -------------------------------------------------- |
| Name          | `name`             | Full name — Cormorant serif, 15px, white           |
| Email         | `email`            | DM Sans, 12px, dim                                 |
| Phone         | `phone`            | DM Sans, 12px — show “–” if null                   |
| Address       | `shipping_address` | Truncated with ellipsis if long — show “–” if null |
| Date          | `created_at`       | Date only — fmtDate()                              |
| Time          | `created_at`       | Time only — fmtTime()                              |
| Status        | `status`           | Pill badge — ACTIVE / SUSPENDED                    |
| Notifications | computed           | Gold bubble with unread count — see below          |
| Actions       | –                  | View button                                        |

### Status Pills

| Status    | Style                                                         |
| --------- | ------------------------------------------------------------- |
| ACTIVE    | gold tint background, gold text — same as ACTIVE product pill |
| SUSPENDED | red tint background, muted red text                           |

---

## Column Sort (Ascending / Descending)

Every column header is clickable and toggles sort direction. Active sort column shows a small arrow indicator (↑ or ↓).

**Sortable columns:** Name, Email, Phone, Address, Date Created, Status

**Sort behavior:**

- First click: ascending
- Second click: descending
- Third click: resets to default (date created desc)
- Sort is client-side — all users loaded once, sorted in memory

```javascript
const [sortField, setSortField] = useState("created_at");
const [sortDir, setSortDir] = useState("desc");

function handleSort(field) {
    if (sortField === field) {
        if (sortDir === "asc") setSortDir("desc");
        else if (sortDir === "desc") {
            setSortField("created_at");
            setSortDir("desc");
        }
    } else {
        setSortField(field);
        setSortDir("asc");
    }
}

const sorted = [...users].sort((a, b) => {
    const av = a[sortField] || "";
    const bv = b[sortField] || "";
    const cmp = av < bv ? -1 : av > bv ? 1 : 0;
    return sortDir === "asc" ? cmp : -cmp;
});
```

---

## Notification Bubbles

Each user row shows a gold notification bubble if that user has unread notifications in `admin_notifications`. The Guest User banner also shows a bubble for its unread count.

```javascript
// Load unread notifications
const { data: notifs } = await supabase
    .from("admin_notifications")
    .select("user_id")
    .eq("read", false);

// Build count map keyed by user_id
// admin_notifications.user_id matches account_users.account_user_id directly
// No email join needed
const unreadCounts = notifs.reduce((acc, n) => {
    if (n.user_id) acc[n.user_id] = (acc[n.user_id] || 0) + 1;
    return acc;
}, {});

// Guest unread count — guest_inquiries notifications bucket under GUEST_ACCOUNT_USER_ID
const guestUnreadCount =
    unreadCounts[process.env.NEXT_PUBLIC_GUEST_ACCOUNT_USER_ID] || 0;
```

**Bubble style:**

- Gold circle `#cfb040` background, `#000` text
- 18px diameter, DM Sans 8.5px bold
- Positioned in the Notifications column
- If count = 0: show nothing
- If count > 9: show “9+”

**Guest banner bubble:** same style, shown on the guest banner row if `guestUnreadCount > 0`

---

## Row Click / View Button

- Clicking anywhere on a row (or the View button) navigates to:
  `/admin/users/[account_user_id]`
- This opens the UserDashboardAdminSide for that specific user
- Guest banner click navigates to `/admin/users/[GUEST_ACCOUNT_USER_ID]`
- Row hover: same `.tbl tbody tr:hover` style as AdminProductsPage
- View button: same `.ab` style, appears on hover

---

## Search / Filter Bar

Simple text search input below the page header, above the table.

- Placeholder: “Search by name, email, or phone…”
- Filters displayed rows client-side in real time
- Searches across: `name`, `email`, `phone`
- Input style: `#131313` background, gold border on focus, DM Sans 12px
- Clears with × button when text is present

```javascript
const [search, setSearch] = useState("");

const filtered = sorted.filter((u) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
        (u.name || "").toLowerCase().includes(q) ||
        (u.email || "").toLowerCase().includes(q) ||
        (u.phone || "").toLowerCase().includes(q)
    );
});
```

---

## Loading & Empty States

- Loading: “Loading users…” — same `.loading` style as AdminProductsPage
- Empty (no users): centered icon + “No accounts yet” uppercase label
- Empty search: “No results for ‘[query]’” — dim, centered

---

## Realtime

Subscribe to `admin_notifications` inserts so notification bubbles update without page refresh:

```javascript
supabase
    .channel("user-list-notifs")
    .on(
        "postgres_changes",
        {
            event: "INSERT",
            schema: "public",
            table: "admin_notifications"
        },
        (payload) => {
            // Increment unreadCounts for payload.new.user_id
            // If payload.new.user_id === GUEST_ACCOUNT_USER_ID, increment guest bubble
        }
    )
    .subscribe();
```

---

## Supabase Queries Summary

```javascript
// All users excluding guest
supabase
    .from("account_users")
    .select("*")
    .neq("account_user_id", process.env.NEXT_PUBLIC_GUEST_ACCOUNT_USER_ID)
    .order("created_at", { ascending: false });

// Guest user for banner
supabase
    .from("account_users")
    .select("*")
    .eq("account_user_id", process.env.NEXT_PUBLIC_GUEST_ACCOUNT_USER_ID)
    .single();

// Unread notification counts per user
supabase.from("admin_notifications").select("user_id").eq("read", false);
```

---

## State Variables

```javascript
const [users, setUsers] = useState([]);
const [guestUser, setGuestUser] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [search, setSearch] = useState("");
const [sortField, setSortField] = useState("created_at");
const [sortDir, setSortDir] = useState("desc");
const [unreadCounts, setUnreadCounts] = useState({});
```

---

## Routes This Page Connects To

| Action                | Route                                                           |
| --------------------- | --------------------------------------------------------------- |
| Click user row / View | `/admin/users/[account_user_id]` → UserDashboardAdminSide       |
| Click Guest banner    | `/admin/users/[GUEST_ACCOUNT_USER_ID]` → UserDashboardAdminSide |

---

## Notes for Emergent

- Sort and search are entirely client-side — load all users once, sort and filter in memory
- Guest user is always pinned at the top in its own banner — never appears in the main table
- Always identify the guest account by `NEXT_PUBLIC_GUEST_ACCOUNT_USER_ID` env var — never by email
- `admin_notifications.user_id` matches `account_users.account_user_id` directly — no email join needed
- Guest inquiry notifications bucket under `GUEST_ACCOUNT_USER_ID` — the guest banner shows its own bubble count from this
- `unreadCounts` should be passed down to UserDashboardAdminSide subpages so notification bubbles appear on tabs too (specced separately)
- `shipping_address` is a single TEXT field — not split into components. Display as-is, truncate if too long
- Name column shows `name` from `account_users` — stored as full name string, not split first/last
- `business_name` is available in `account_users` but not shown in the table — visible inside the user dashboard
- Status `SUSPENDED` is an `account_status` enum value — admin sets this from inside a user’s dashboard (specced separately)
