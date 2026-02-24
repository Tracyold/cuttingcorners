# ProductPageGuestView — Emergent Build Spec

_Canonical version — February 23, 2026_
_File: `Website/ProductPage/Guest/GuestProductPage.md`_

## Who This File Is For

This spec covers the **guest (non-signed-in) user** experience on the product/shop page. For the signed-in account user experience see `ProductPageUserView.md`. For the admin product management experience see `ProductPageAdminView.md`.

---

## Auth

- No auth required — guests browse freely
- Guest has no session, no account, no saved info
- All data collected from guest must be entered manually before any action (inquiry or purchase)

---

## Design Reference

- `PublicProductPage.tsx` — match exactly for all layout, card behavior, modal, animations, typography, and button styles
- The visual page is identical to the UserView — the difference is entirely in data routing and required form fields

---

## Reading Products

```javascript
const { data: products } = await supabase
    .from("shop_active_products")
    .select("*");
```

- `anon` key — no auth required
- Same query as UserView — products are the same for everyone

---

## Guest Info Collection Popup

Because the guest has no account, their name, email, phone, and shipping address must be collected before they can submit an inquiry OR make a purchase. This popup appears whenever a guest attempts either action.

**Required Fields:**

- Full Name
- Email Address
- Phone Number
- Shipping Address

All four fields are required — form cannot be submitted with any field empty.

**Style:** matches the site design — dark background, gold accents, Comfortaa body text, Montserrat labels

This popup appears:

- When guest clicks the Inquiry button and opens the inquiry form
- When guest clicks the Buy button

Once filled in, the info is held in local state for the duration of the session — the guest does not need to re-enter it if they open another product modal.

---

## Inquiry — Guest User

When a guest submits an inquiry it is routed to the **Guest User Account Dashboard** in the admin portal. It is NOT linked to any personal account.

### Photo Upload (if attached)

```javascript
const { data, error } = await supabase.storage
    .from("guest-inquiry-photos")
    .upload(`guest/${Date.now()}_${file.name}`, file, {
        contentType: file.type
    });
const uploadedPhotoUrl = data?.path ?? null;
```

**Storage bucket:** `guest-inquiry-photos`

- Private — anon upload allowed via RLS
- Max file size: 25MB
- Allowed types: image/jpeg, image/png, image/tiff, image/x-adobe-dng, image/heic
- RLS policies confirmed in Supabase:
    - `guest_inquiry_photo_upload` — INSERT, anon
    - `admin_full_guest_inquiry_photos` — ALL, admin only

### Inquiry Insert

```javascript
await supabase.from("guest_inquiries").insert({
    name: guestName,
    email: guestEmail,
    phone: guestPhone,
    shipping_address: guestAddress,
    description: inquiryMessage,
    photo_url: uploadedPhotoUrl ?? null
});
```

- Upload photo first if attached, then insert with returned path
- All fields required except `photo_url` and `description`
- `anon` key — no auth required

**Inquiry form fields shown to guest (in addition to message and photo):**

- Full Name (required)
- Email (required)
- Phone (required)
- Shipping Address (required)
- Message (optional)
- Attach photo (optional)

### Where This Data Goes

- `guest_inquiries` table — not linked to any `account_user_id`
- Visible in: `GuestUserAdminView` only — the single dedicated guest dashboard in the admin portal
- In the guest dashboard, inquiries are listed by **guest name** (not inquiry ID) — multiple different people funnel into this single dashboard
- The guest themselves never sees this dashboard — it is admin-only

---

## Purchase Flow — Guest User

### Step 1 — Guest Clicks Buy

If guest info has not been collected yet, show the Guest Info Collection Popup first. Once info is confirmed, proceed.

### Step 2 — Invoice Preview Popup

A popup appears showing a complete invoice preview before the guest is sent to Stripe. Fields are populated from what the guest just entered plus the product data.

**Invoice Preview Layout:**

```
Header:
[adminInfo.business_name]
[adminInfo.full_name]
[adminInfo.address]
[adminInfo.contact_email]
[adminInfo.phone]

Bill To:
[guestName]
[guestEmail]
[guestPhone]
[guestAddress]

Product:
  Title:         [product.title]
  Gem Type:      [product.gem_type]
  Shape:         [product.shape]
  Weight:        [product.weight] ct
  Color:         [product.color]
  Origin:        [product.origin]          — omit if null
  Treatment:     [product.treatment]       — omit if null
  GIA Report #:  [product.gia_report_number] — omit if null
  Price/ct:      [product.price_per_carat formatted] — omit if null

Total:          [product.total_price formatted]
Payment Method: Card via Stripe (to be completed)
```

- Fetch admin info before rendering:

```javascript
const { data: adminInfo } = await supabase
    .from("admin_users")
    .select("business_name, full_name, address, phone, contact_email")
    .single();
```

- “Continue” button — proceeds to Stripe
- “Cancel” button — closes popup, returns to modal

### Step 3 — POST to Checkout Endpoint

```javascript
const res = await fetch("/api/checkout/create-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        product_id: product.product_id,
        guest: true,
        guest_info: {
            name: guestName,
            email: guestEmail,
            phone: guestPhone,
            shippingAddress: guestAddress
        },
        admin_snapshot: {
            businessName: adminInfo.business_name,
            fullName: adminInfo.full_name,
            address: adminInfo.address,
            phone: adminInfo.phone,
            contactEmail: adminInfo.contact_email
        }
    })
});
const { url } = await res.json();
window.location.href = url;
```

- Do NOT use hardcoded Stripe URLs
- Do NOT use per-product Stripe Payment Links
- Always use Stripe Checkout Sessions via the server endpoint

### Step 4 — Stripe Checkout

Guest is redirected to Stripe. Their name, email, phone, and shipping address are pre-filled from what they entered. They only fill in payment details.

### Step 5 — Stripe Webhook → Invoice Saved

When Stripe confirms payment the webhook fires and the server INSERTs into `invoices`:

```javascript
// account_user_id is set to the Guest User Account's ID
// This links the invoice to the Guest User Account dashboard in the admin portal
line_items: [
  {
    product_id:         product.product_id,
    title:              product.title,
    gem_type:           product.gem_type,
    shape:              product.shape,
    weight:             product.weight,
    color:              product.color,
    origin:             product.origin,
    treatment:          product.treatment,
    description:        product.description,
    price_per_carat:    product.price_per_carat,
    total_price:        product.total_price,
    gia_report_number:  product.gia_report_number,
    gia_report_pdf_url: product.gia_report_pdf_url,
    photo_url:          product.photo_url
  }
],
account_snapshot: {
  name:            guestName,
  email:           guestEmail,
  phone:           guestPhone,
  shippingAddress: guestAddress,
  businessName:    null
},
admin_snapshot: { /* frozen from above */ },
account_user_id:  GUEST_ACCOUNT_USER_ID, // the pre-existing Guest User Account ID
total_amount:     product.total_price,
paid_at:          now()
```

> **Important:** `GUEST_ACCOUNT_USER_ID` is the ID of the single pre-existing Guest User Account in the database. All guest purchases are linked to this account so the admin can find them in one place. This ID is stored as an environment variable on the server — never hardcode it in frontend code.

### Where This Data Goes

- `invoices` table → linked to `GUEST_ACCOUNT_USER_ID`
- Product marked INACTIVE automatically via `trigger_mark_products_sold` — do not handle in frontend
- Invoice visible in: `GuestUserAdminView` only — the single dedicated guest dashboard in the admin portal
- In the guest dashboard, invoices are listed by **buyer name** from `account_snapshot.name` — not by invoice ID — because multiple different people funnel into this single dashboard
- The guest themselves has no way to view their invoice after purchase — there is no guest-facing invoice page

---

## Notes for Emergent

- Design reference is `PublicProductPage.tsx` — match exactly for all visual behavior
- The page looks identical to UserView — the difference is entirely in routing and required fields
- Guest info popup must appear before inquiry form OR before invoice preview — collect info first, then proceed
- Once guest info is collected it persists in local state for the session — don’t ask again for a second product
- Buy button IS shown to guests — unlike some platforms, guests can purchase here
- All guest activity routes to the single Guest User Account dashboard — never to a personal account
- Guest dashboard lists by buyer name not invoice ID — `account_snapshot.name` is what identifies each guest transaction
- `GUEST_ACCOUNT_USER_ID` is a server-side environment variable — frontend never needs to know it
- Guest has no invoice download — there is no guest-facing invoice or account page
- `product_state` transitions to INACTIVE automatically after purchase — do not handle in frontend
- Inquiry goes to `guest_inquiries` — never `account_inquiries` for a guest
