# ProductPageAdminView — Emergent Build Spec

_Canonical version — February 23, 2026_
_File: `Website/ProductPage/Admin/ProductPageAdmin.md`_

## Who This File Is For

This spec covers the **admin** experience for managing products. For what happens on the public-facing side when a user or guest views, inquires, or purchases, see:

- `ProductPageUserView.md` — signed-in account user
- `ProductPageGuestView.md` — guest (non-signed-in) user

---

## Auth

- Admin only — verify `is_admin()` on load
- Part of the admin shell — same sidebar as AdminPortfolioPage
- Supabase client initialized with `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Never hardcode credentials

---

## Design Reference

- `adminproductspage.tsx` — UI design, CSS, layout, queue/form pattern
- All mock data in TSX is for visual reference only — replace with live Supabase calls
- Match the TSX exactly for all visual behavior

---

## Product States

```
DRAFT    → created by admin, not visible on public shop
ACTIVE   → visible on public shop via shop_active_products view
INACTIVE → no longer visible on public shop
```

**State transition rules:**

- Admin can move: DRAFT → ACTIVE (publish), ACTIVE → INACTIVE (remove)
- ACTIVE → INACTIVE also fires automatically via `trigger_mark_products_sold` when a purchase invoice is created
- INACTIVE → ACTIVE is not supported from the UI — admin must use Supabase dashboard directly
- Never handle the ACTIVE → INACTIVE transition in frontend code — the DB trigger handles it

---

## Data Loading

```javascript
async function loadProducts() {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });
    if (error) setError(error.message);
    else setProducts(data || []);
    setLoading(false);
}

useEffect(() => {
    loadProducts();
}, []);
```

- Query `products` table directly — admin sees ALL states (DRAFT, ACTIVE, INACTIVE)
- Public side uses `shop_active_products` view — admin never uses that view

---

## Add Product Flow

### Step 1 — Insert Stub Row

```javascript
async function openAdd() {
    const np = {
        ...EMPTY_FORM,
        product_id: genId(),
        created_at: new Date().toISOString(),
        product_state: "DRAFT",
        _saved: false
    };
    const { error } = await supabase.from("products").insert({
        product_id: np.product_id,
        title: "",
        total_price: 0,
        product_state: "DRAFT"
    });
    if (error) {
        setError(error.message);
        return;
    }
    setQueue([np]);
    setCurIdx(0);
    setProducts((prev) => [np, ...prev]);
    setShowForm(true);
}
```

- Stub row inserted immediately so auto-save has a valid `product_id` to upsert against
- `total_price` defaults to `0` — never null (DB requires it)

### Step 2 — Auto-Save (every 15 seconds)

While form is open, auto-saves current item as DRAFT:

```javascript
useEffect(() => {
    const timer = setInterval(async () => {
        const { error } = await upsert(current, "DRAFT");
        if (!error) {
            setFlash(true);
            setTimeout(() => setFlash(false), 2000);
        }
    }, 15000);
    return () => clearInterval(timer);
}, [current]);
```

- Never auto-publishes — always saves as DRAFT
- Flash “✓ Saved” indicator on success

---

## Upsert Helper

```javascript
async function upsert(p, state) {
    return supabase.from("products").upsert(
        {
            product_id: p.product_id,
            title: p.title || "",
            gem_type: p.gem_type || null,
            color: p.color || null,
            shape: p.shape || null,
            weight: p.weight ? parseFloat(p.weight) : null,
            origin: p.origin || null,
            treatment: p.treatment || null,
            gia_report_number: p.gia_report_number || null,
            gia_report_pdf_url: p.gia_report_pdf_url || null,
            price_per_carat: p.price_per_carat
                ? parseFloat(p.price_per_carat)
                : null,
            total_price: p.total_price ? parseFloat(p.total_price) : 0,
            description: p.description || null,
            photo_url: p.photo_url || null,
            product_state: state
        },
        { onConflict: "product_id" }
    );
}
```

- `weight`, `price_per_carat`, `total_price` stored as NUMERIC — always `parseFloat()` before upsert
- `total_price` defaults to `0` if blank — never null

---

## Save Drafts

```javascript
async function saveDrafts() {
    setSaving(true);
    for (const p of queue) await upsert(p, "DRAFT");
    await loadProducts();
    setSaving(false);
    setShowForm(false);
}
```

---

## Publish Flow

### Publish All (queue)

```javascript
async function publishAll() {
    setSaving(true);
    for (const p of queue) await upsert(p, "ACTIVE");

    // Call edge function for each newly published product
    for (const p of queue) {
        await supabase.functions.invoke("send-new-listing-notification", {
            body: { product_id: p.product_id }
        });
    }

    await loadProducts();
    setSaving(false);
    setShowForm(false);
    setTab("active");
}
```

### Publish One (from row action)

```javascript
async function publishOne(product) {
    await upsert(product, "ACTIVE");
    await supabase.functions.invoke("send-new-listing-notification", {
        body: { product_id: product.product_id }
    });
    await loadProducts();
}
```

**What publishing does downstream:**

- Product `product_state` becomes `ACTIVE`
- Product immediately appears on the public shop page via `shop_active_products` view
- `send-new-listing-notification` edge function fires → sends SMS to all account users where `opt_in_new_listings = true`
- DB trigger `user_notify_new_product` fires automatically → inserts in-app notifications for all users — no frontend call needed for this

---

## Remove One (ACTIVE → INACTIVE)

```javascript
async function removeOne(product) {
    await supabase
        .from("products")
        .update({ product_state: "INACTIVE" })
        .eq("product_id", product.product_id);
    await loadProducts();
}
```

- Admin-initiated removal before any sale
- Product disappears from public shop immediately
- This is different from the automatic INACTIVE transition via purchase — both result in the same INACTIVE state

---

## Add to Queue

```javascript
async function addToQueue() {
    if (queue.length >= 10) return;
    const np = {
        ...EMPTY_FORM,
        product_id: genId(),
        created_at: new Date().toISOString(),
        product_state: "DRAFT",
        _saved: false
    };
    await supabase.from("products").insert({
        product_id: np.product_id,
        title: "",
        total_price: 0,
        product_state: "DRAFT"
    });
    const nq = [...queue, np];
    setQueue(nq);
    setCurIdx(nq.length - 1);
    setProducts((prev) => [np, ...prev]);
}
```

- Max 10 products per queue session
- Each queued product gets its own stub row inserted immediately

---

## Photo URL vs Upload

The product form has two ways to add a photo:

**URL input** — admin pastes a direct image URL. Stored as-is in `photo_url`.

**File upload** — admin uploads an image file. Upload to `product-photos` bucket first, then store the returned path in `photo_url`:

```javascript
const { data, error } = await supabase.storage
    .from("product-photos")
    .upload(`${product_id}/${Date.now()}_${file.name}`, file, {
        contentType: file.type
    });
if (!error) upd("photo_url", data.path);
```

> **Note:** `product-photos` bucket does not yet exist in Supabase — must be created before file upload works. URL input works without the bucket. See DBState for bucket creation SQL when ready.

**How the public page reads photos:**

- The public product page reads `photo_url` directly from the `shop_active_products` view
- If `photo_url` is a storage path, Emergent must use `supabase.storage.from('product-photos').getPublicUrl(path)` to render it
- If `photo_url` is a full external URL, render it directly
- Check: if `photo_url` starts with `http` → render directly. Otherwise → get public URL from storage

---

## GIA Report Section

Three modes toggled via `gmb` buttons (matches TSX):

| Mode      | Input                   | Stored in                            |
| --------- | ----------------------- | ------------------------------------ |
| PDF URL   | text input              | `gia_report_pdf_url`                 |
| Upload    | file picker (.pdf only) | `gia_report_pdf_url` as storage path |
| Photo URL | text input              | `gia_report_pdf_url`                 |

> GIA PDF upload bucket not yet configured — placeholder `[uploaded] filename` used until bucket exists. Same pattern as photo_url — check if value starts with `http` to determine how to render it on the public page.

---

## What Happens When a Product Is Purchased

The admin does NOT handle purchases — the Stripe webhook handles everything automatically. This section documents what the admin will see after a purchase occurs.

1. User or guest completes Stripe checkout
1. Stripe webhook fires → inserts row into `invoices` table with:

- `line_items` — full product snapshot frozen at purchase time (all 13 fields)
- `account_snapshot` — buyer info frozen at purchase time
- `admin_snapshot` — admin info frozen at purchase time
- `account_user_id` — either the buyer’s ID or `GUEST_ACCOUNT_USER_ID`

1. `trigger_mark_products_sold` fires automatically → sets product `product_state = 'INACTIVE'`
1. Product disappears from public shop immediately
1. Product moves to **Inactive** tab in admin Products page
1. Invoice appears in:

- `UserListDashAdminView` — if purchased by a signed-in account user
- `GuestUserAdminView` — if purchased by a guest

**Admin does not need to do anything** — the product state change and invoice creation are fully automatic.

---

## What Happens When a Product Is Inquired About

Inquiries from the public shop page route to different places depending on who submitted them:

| Who                    | Table               | Visible In                            |
| ---------------------- | ------------------- | ------------------------------------- |
| Signed-in account user | `account_inquiries` | `UserListDashAdminView` for that user |
| Guest                  | `guest_inquiries`   | `GuestUserAdminView` only             |

The admin sees all inquiries inside the respective user dashboards in the User List. There is no separate “inquiries” section on the Products page — the admin manages inquiries from the User List, not from here.

---

## Edge Functions Called On This Page

| Event                  | Function                        | Notes                                              |
| ---------------------- | ------------------------------- | -------------------------------------------------- |
| DRAFT → ACTIVE publish | `send-new-listing-notification` | SMS to all users with `opt_in_new_listings = true` |

DB trigger `user_notify_new_product` fires automatically on product INSERT/UPDATE to ACTIVE — no frontend call needed for in-app notifications.

---

## Form Fields

**Read-only:**

- Product ID
- Date created
- Time created

**Editable:**

| Field               | Input          | Required | Notes                                 |
| ------------------- | -------------- | -------- | ------------------------------------- |
| Title               | text           | Yes      | e.g. “Burmese Pigeon Blood Ruby”      |
| Gem Type            | text           | Yes      | e.g. “Ruby”                           |
| Color               | text           | Yes      | e.g. “Vivid Red”                      |
| Shape               | text           | Yes      | e.g. “Oval”                           |
| Weight (ct)         | text           | Yes      | parsed to float on save               |
| Origin              | text           | No       | e.g. “Burma” — omit if blank          |
| Treatment           | text           | No       | e.g. “Heat / No Heat” — omit if blank |
| GIA Report Number   | text           | No       | omit if blank                         |
| Photo URL or Upload | text/file      | No       | URL or storage path                   |
| GIA Report          | toggle section | No       | PDF URL / Upload / Photo URL          |
| Price Per Carat ($) | text           | No       | parsed to float on save               |
| Total Price ($)     | text           | Yes      | defaults to 0 if blank                |
| Description         | textarea       | No       | additional notes                      |

---

## State Variables

```javascript
const [activeNav, setActiveNav] = useState("products");
const [tab, setTab] = useState("active");
const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);
const [saving, setSaving] = useState(false);
const [error, setError] = useState(null);
const [showForm, setShowForm] = useState(false);
const [queue, setQueue] = useState([]);
const [curIdx, setCurIdx] = useState(0);
```

---

## Product ID Format

```javascript
function genId() {
    return "CCG-" + Date.now().toString(36).toUpperCase();
}
```

---

## EMPTY_FORM

```javascript
const EMPTY_FORM = {
    title: "",
    gem_type: "",
    color: "",
    shape: "",
    weight: "",
    origin: "",
    treatment: "",
    gia_report_number: "",
    gia_report_pdf_url: "",
    price_per_carat: "",
    total_price: "",
    description: "",
    photo_url: ""
};
```

---

## Notes for Emergent

- Match `adminproductspage.tsx` exactly for all UI, CSS, layout, and animations — it is the design authority
- Replace all mock data with live Supabase calls as documented above
- Admin queries `products` table directly — public side uses `shop_active_products` view
- `product_state` ACTIVE → INACTIVE via purchase is handled by DB trigger — never handle in frontend
- `total_price` is required by DB — always default to `0` if blank, never null
- `weight`, `price_per_carat`, `total_price` are NUMERIC — always `parseFloat()` before upsert
- Auto-save fires every 15 seconds as DRAFT — never auto-publishes
- `saving` state disables both Save Drafts and Publish buttons — prevents double-submit
- Photo URL vs upload: check if value starts with `http` to determine render method
- `product-photos` bucket does not yet exist — URL input works, file upload requires bucket creation
- Purchases and inquiries are NOT managed from this page — admin sees them in User List dashboards
- `send-new-listing-notification` must be called manually after each publish — DB trigger handles in-app notifications only, not SMS
