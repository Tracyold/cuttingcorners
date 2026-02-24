import React, { useEffect, useMemo, useRef, useState } from “react”;
import { X } from “lucide-react”;
import { createClient } from “@supabase/supabase-js”;

// ============================================================
// CUTTING CORNERS GEMS — Public Product / Shop Page
//
// This single file handles BOTH view types:
//
// GUEST VIEW (no session):
//   - Browse products freely
//   - Must enter name/email/phone/address before inquiry or purchase
//   - Inquiries → guest_inquiries table → GuestUserAdminView dashboard
//   - Purchases → /api/checkout/create-session (guest:true) → invoices
//     linked to GUEST_ACCOUNT_USER_ID
//
// USER VIEW (signed-in account user):
//   - Browse products freely
//   - Inquiries → account_inquiries table → UserListDashAdminView +
//     UserDashboardUserView (same DB row, different auth)
//   - Buy button visible — invoice preview popup before Stripe redirect
//   - Purchases → /api/checkout/create-session → invoices linked to
//     account_user_id
//
// DB prices are stored in DOLLARS as NUMERIC(12,2).
// Use formatMoney(value) directly — NO division or multiplication.
// ============================================================

const supabase = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL,
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// ── Helpers ───────────────────────────────────────────────────
// DB stores prices in dollars — format directly, no cents conversion
const formatMoney = (val) =>
new Intl.NumberFormat(“en-US”, {
style: “currency”,
currency: “USD”,
minimumFractionDigits: 0,
}).format(val);

// ── Shared styles ─────────────────────────────────────────────
const popupOverlayStyle = {
position: “fixed”,
inset: 0,
zIndex: 200,
backgroundColor: “rgba(0,0,0,0.85)”,
display: “flex”,
alignItems: “center”,
justifyContent: “center”,
padding: “20px”,
};

const popupBoxStyle = {
backgroundColor: “#0A0A0A”,
border: “1px solid rgba(255,255,255,0.10)”,
borderRadius: “16px”,
width: “100%”,
maxWidth: “480px”,
maxHeight: “90vh”,
overflowY: “auto”,
padding: “32px”,
};

const inputStyle = {
width: “100%”,
background: “rgba(255,255,255,0.04)”,
border: “1px solid rgba(255,255,255,0.10)”,
borderRadius: “8px”,
padding: “10px 12px”,
color: “#FAFAFA”,
fontFamily: “‘Comfortaa’, sans-serif”,
fontSize: “13px”,
outline: “none”,
marginBottom: “10px”,
};

const labelStyle = {
fontFamily: “‘Montserrat’, sans-serif”,
fontSize: “9px”,
fontWeight: 600,
textTransform: “uppercase”,
letterSpacing: “0.18em”,
color: “rgba(255,255,255,0.38)”,
display: “block”,
marginBottom: “5px”,
};

const goldBtnStyle = {
width: “100%”,
textAlign: “center”,
fontFamily: “‘Montserrat’, sans-serif”,
fontSize: “11px”,
fontWeight: 600,
textTransform: “uppercase”,
letterSpacing: “0.20em”,
backgroundColor: “#d4af37”,
color: “#050505”,
border: “none”,
borderRadius: “3px”,
padding: “14px 24px”,
cursor: “pointer”,
};

const ghostBtnStyle = {
width: “100%”,
textAlign: “center”,
fontFamily: “‘Montserrat’, sans-serif”,
fontSize: “10px”,
fontWeight: 500,
textTransform: “uppercase”,
letterSpacing: “0.18em”,
backgroundColor: “transparent”,
color: “rgba(255,255,255,0.38)”,
border: “none”,
cursor: “pointer”,
padding: “10px 0”,
marginTop: “8px”,
};

// ── Guest Info Popup ──────────────────────────────────────────
// Shown when guest attempts inquiry or purchase without having entered info yet.
// Once submitted, info persists in parent state for the session.
function GuestInfoPopup({ onSubmit, onClose }) {
const [name, setName]       = useState(””);
const [email, setEmail]     = useState(””);
const [phone, setPhone]     = useState(””);
const [address, setAddress] = useState(””);
const [err, setErr]         = useState(””);

function handleSubmit() {
if (!name.trim() || !email.trim() || !phone.trim() || !address.trim()) {
setErr(“All fields are required.”);
return;
}
onSubmit({ name: name.trim(), email: email.trim(), phone: phone.trim(), address: address.trim() });
}

return (
<div style={popupOverlayStyle}>
<div style={popupBoxStyle}>
<p style={{ fontFamily: “‘Montserrat’, sans-serif”, fontSize: “10px”, fontWeight: 600, textTransform: “uppercase”, letterSpacing: “0.20em”, color: “rgba(255,255,255,0.52)”, marginBottom: “6px” }}>
Your Information
</p>
<p style={{ fontFamily: “‘Comfortaa’, sans-serif”, fontSize: “12px”, color: “rgba(255,255,255,0.45)”, marginBottom: “20px”, lineHeight: 1.6 }}>
Please enter your details before continuing. This information will be used for your order or inquiry.
</p>

```
    <label style={labelStyle}>Full Name *</label>
    <input style={inputStyle} placeholder="Jane Smith" value={name} onChange={e => setName(e.target.value)} />

    <label style={labelStyle}>Email Address *</label>
    <input style={inputStyle} type="email" placeholder="jane@email.com" value={email} onChange={e => setEmail(e.target.value)} />

    <label style={labelStyle}>Phone Number *</label>
    <input style={inputStyle} type="tel" placeholder="+1 (555) 000-0000" value={phone} onChange={e => setPhone(e.target.value)} />

    <label style={labelStyle}>Shipping Address *</label>
    <input style={inputStyle} placeholder="123 Main St, City, State, ZIP" value={address} onChange={e => setAddress(e.target.value)} />

    {err && <p style={{ fontFamily: "'Comfortaa', sans-serif", fontSize: "11px", color: "#c07070", marginBottom: "10px" }}>{err}</p>}

    <button style={goldBtnStyle} onClick={handleSubmit}>Continue</button>
    <button style={ghostBtnStyle} onClick={onClose}>Cancel</button>
  </div>
</div>
```

);
}

// ── Invoice Preview Popup ─────────────────────────────────────
// Shown before Stripe redirect for both guest and account users.
// User reviews frozen invoice data then clicks Continue to proceed.
function InvoicePreviewPopup({ product, adminInfo, buyerInfo, onContinue, onCancel, loading }) {
const specRows = [
{ label: “Title”,        value: product.title },
{ label: “Gem Type”,     value: product.gem_type },
{ label: “Shape”,        value: product.shape },
{ label: “Weight”,       value: `${product.weight} ct` },
{ label: “Color”,        value: product.color },
…(product.origin        ? [{ label: “Origin”,      value: product.origin }]        : []),
…(product.treatment     ? [{ label: “Treatment”,   value: product.treatment }]     : []),
…(product.gia_report_number ? [{ label: “GIA Report #”, value: product.gia_report_number }] : []),
…(product.price_per_carat   ? [{ label: “Price / ct”,   value: formatMoney(product.price_per_carat) }] : []),
];

const rowStyle = { display: “flex”, justifyContent: “space-between”, alignItems: “baseline”, gap: “12px”, marginBottom: “8px” };
const rowLabel = { fontFamily: “‘Montserrat’, sans-serif”, fontSize: “9px”, textTransform: “uppercase”, letterSpacing: “0.18em”, color: “rgba(255,255,255,0.38)”, flexShrink: 0 };
const rowValue = { fontFamily: “‘Comfortaa’, sans-serif”, fontSize: “12px”, color: “rgba(255,255,255,0.70)”, textAlign: “right” };
const sectionLabel = { fontFamily: “‘Montserrat’, sans-serif”, fontSize: “9px”, fontWeight: 600, textTransform: “uppercase”, letterSpacing: “0.20em”, color: “rgba(255,255,255,0.30)”, marginBottom: “10px”, marginTop: “18px” };
const divider = { height: “1px”, backgroundColor: “rgba(255,255,255,0.06)”, margin: “16px 0” };

return (
<div style={popupOverlayStyle}>
<div style={{ …popupBoxStyle, maxWidth: “520px” }}>
<p style={{ fontFamily: “‘Montserrat’, sans-serif”, fontSize: “10px”, fontWeight: 600, textTransform: “uppercase”, letterSpacing: “0.20em”, color: “rgba(255,255,255,0.52)”, marginBottom: “18px” }}>
Invoice Preview
</p>

```
    {/* Admin header */}
    <p style={sectionLabel}>From</p>
    {adminInfo && (
      <div style={{ fontFamily: "'Comfortaa', sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.55)", lineHeight: 1.8 }}>
        <div style={{ color: "#d4af37", fontWeight: 700 }}>{adminInfo.business_name}</div>
        <div>{adminInfo.full_name}</div>
        <div>{adminInfo.address}</div>
        <div>{adminInfo.contact_email}</div>
        <div>{adminInfo.phone}</div>
      </div>
    )}

    <div style={divider} />

    {/* Bill To */}
    <p style={sectionLabel}>Bill To</p>
    <div style={{ fontFamily: "'Comfortaa', sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.55)", lineHeight: 1.8 }}>
      <div style={{ color: "rgba(255,255,255,0.80)" }}>{buyerInfo.name}</div>
      <div>{buyerInfo.email}</div>
      <div>{buyerInfo.phone}</div>
      <div>{buyerInfo.shippingAddress}</div>
      {buyerInfo.businessName && <div>{buyerInfo.businessName}</div>}
    </div>

    <div style={divider} />

    {/* Product specs */}
    <p style={sectionLabel}>Product</p>
    {specRows.map(({ label, value }) => (
      <div key={label} style={rowStyle}>
        <span style={rowLabel}>{label}</span>
        <span style={rowValue}>{value}</span>
      </div>
    ))}

    <div style={divider} />

    {/* Total */}
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "4px" }}>
      <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.18em", color: "rgba(255,255,255,0.38)" }}>Total</span>
      <span style={{ fontFamily: "'Courier New', monospace", fontSize: "20px", color: "rgba(45,212,191,1)" }}>{formatMoney(product.total_price)}</span>
    </div>
    <p style={{ fontFamily: "'Comfortaa', sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.25)", marginBottom: "24px" }}>
      Payment method: Card via Stripe
    </p>

    <button style={goldBtnStyle} onClick={onContinue} disabled={loading}>
      {loading ? "Redirecting…" : "Continue to Payment"}
    </button>
    <button style={ghostBtnStyle} onClick={onCancel}>Cancel</button>
  </div>
</div>
```

);
}

// ── Main Page Component ───────────────────────────────────────
export default function PublicProductPage() {
// ── Session & auth
const [session, setSession] = useState(null);

// ── Products
const [products, setProducts]     = useState([]);
const [loadingProducts, setLoadingProducts] = useState(true);

// ── UI state
const [focusedId, setFocusedId]   = useState(null);
const [mobileTapId, setMobileTapId] = useState(null);
const [modalProduct, setModalProduct] = useState(null);
const [veilActive, setVeilActive] = useState(false);
const [isMobile, setIsMobile]     = useState(false);

// ── Inquiry state
const [inquiryOpen, setInquiryOpen]       = useState(false);
const [inquiryMessage, setInquiryMessage] = useState(””);
const [inquiryFile, setInquiryFile]       = useState(null);
const [inquirySubmitting, setInquirySubmitting] = useState(false);
const [inquirySuccess, setInquirySuccess] = useState(false);
const inquiryFileUrlRef = useRef(null);

// ── Guest info (persists for session once entered)
const [guestInfo, setGuestInfo]           = useState(null); // { name, email, phone, address }
const [showGuestInfoPopup, setShowGuestInfoPopup] = useState(false);
const [pendingActionAfterGuestInfo, setPendingActionAfterGuestInfo] = useState(null); // “inquiry” | “buy”

// ── Invoice preview popup
const [showInvoicePreview, setShowInvoicePreview] = useState(false);
const [invoiceAdminInfo, setInvoiceAdminInfo]     = useState(null);
const [invoiceAccountUser, setInvoiceAccountUser] = useState(null);
const [invoiceLoading, setInvoiceLoading]         = useState(false);
const [checkoutLoading, setCheckoutLoading]       = useState(false);

// ── Get session on mount
useEffect(() => {
supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => setSession(session));
return () => subscription.unsubscribe();
}, []);

// ── Load active products from shop_active_products view
// Admin queries products table directly — public always uses this view
useEffect(() => {
async function loadProducts() {
setLoadingProducts(true);
const { data, error } = await supabase
.from(“shop_active_products”)
.select(”*”);
if (!error) setProducts(data || []);
setLoadingProducts(false);
}
loadProducts();
}, []);

// ── Mobile breakpoint
useEffect(() => {
const check = () => setIsMobile(window.innerWidth < 768);
check();
window.addEventListener(“resize”, check, { passive: true });
return () => window.removeEventListener(“resize”, check);
}, []);

// ── Escape key closes modal
useEffect(() => {
const handleKey = (e) => { if (e.key === “Escape”) closeModal(); };
window.addEventListener(“keydown”, handleKey);
return () => window.removeEventListener(“keydown”, handleKey);
}, [modalProduct]);

// ── Lock body scroll when modal open
useEffect(() => {
document.body.style.overflow = modalProduct ? “hidden” : “”;
return () => { document.body.style.overflow = “”; };
}, [modalProduct]);

// ── Cleanup object URLs
useEffect(() => {
return () => {
if (inquiryFileUrlRef.current) URL.revokeObjectURL(inquiryFileUrlRef.current);
};
}, []);

function closeModal() {
setInquiryOpen(false);
setInquiryMessage(””);
setInquiryFile(null);
setInquirySuccess(false);
if (inquiryFileUrlRef.current) {
URL.revokeObjectURL(inquiryFileUrlRef.current);
inquiryFileUrlRef.current = null;
}
setModalProduct(null);
setShowInvoicePreview(false);
}

// ── Card interaction handlers
const handleMouseEnter = (id) => { if (isMobile) return; setFocusedId(id); setVeilActive(true); };
const handleMouseLeave = () => { if (isMobile) return; setFocusedId(null); setVeilActive(false); };
const handleClick = (product) => { if (isMobile) return; setModalProduct(product); setInquiryOpen(false); };
const handleTap = (product) => {
if (!isMobile) return;
if (mobileTapId === product.product_id) {
setModalProduct(product); setInquiryOpen(false);
setMobileTapId(null); setFocusedId(null); setVeilActive(false);
} else {
setMobileTapId(product.product_id); setFocusedId(product.product_id); setVeilActive(true);
}
};
const handlePageTap = (e) => {
if (!isMobile) return;
if (!e.target.closest(”[data-product-card]”)) {
setMobileTapId(null); setFocusedId(null); setVeilActive(false);
}
};

// ── Hover flash effect (shared by Inquiry and Buy buttons)
const hoverEnterFlash = (e) => {
const el = e.currentTarget;
el.style.transition = “none”;
el.style.color = “rgba(45,212,191,1)”;
el.style.textShadow = “0 0 10px rgba(45,212,191,0.7), 0 0 22px rgba(45,212,191,0.3)”;
el.style.backgroundColor = “rgba(212,175,55,0.6)”;
window.setTimeout(() => {
el.style.transition = “all 380ms ease-out”;
el.style.backgroundColor = “rgba(255,255,255,0.12)”;
el.style.color = “#FAFAFA”;
el.style.textShadow = “none”;
}, 80);
};
const hoverLeaveReset = (e) => {
const el = e.currentTarget;
el.style.transition = “all 200ms ease-out”;
el.style.backgroundColor = “#d4af37”;
el.style.color = “#050505”;
el.style.textShadow = “none”;
};

// ── Inquiry button clicked
function handleInquiryClick() {
// Guest must have info collected first
if (!session && !guestInfo) {
setPendingActionAfterGuestInfo(“inquiry”);
setShowGuestInfoPopup(true);
return;
}
setInquiryOpen(v => !v);
}

// ── Submit inquiry
async function submitInquiry() {
if (!modalProduct) return;
setInquirySubmitting(true);

```
let uploadedPhotoUrl = null;

if (session) {
  // ── ACCOUNT USER INQUIRY ──────────────────────────────
  // Upload photo to account-inquiry-photos bucket if attached
  if (inquiryFile) {
    const { data, error } = await supabase.storage
      .from("account-inquiry-photos")
      .upload(`${session.user.id}/${Date.now()}_${inquiryFile.name}`, inquiryFile, {
        contentType: inquiryFile.type,
      });
    if (!error) uploadedPhotoUrl = data.path;
  }
  // Insert into account_inquiries — linked to this user's account
  // Appears in: UserListDashAdminView + UserDashboardUserView
  await supabase.from("account_inquiries").insert({
    account_user_id: session.user.id,
    description:     inquiryMessage || null,
    photo_url:       uploadedPhotoUrl,
  });

  // Notify admin of new product inquiry from account user
  await supabase.functions.invoke("send-admin-notification", {
    body: { event_type: "account_inquiries", user_id: session.user.id }
  });

} else {
  // ── GUEST INQUIRY ─────────────────────────────────────
  // Upload photo to guest-inquiry-photos bucket if attached (anon allowed)
  if (inquiryFile) {
    const { data, error } = await supabase.storage
      .from("guest-inquiry-photos")
      .upload(`guest/${Date.now()}_${inquiryFile.name}`, inquiryFile, {
        contentType: inquiryFile.type,
      });
    if (!error) uploadedPhotoUrl = data.path;
  }
  // Insert into guest_inquiries — routes to GuestUserAdminView dashboard only
  // Listed by guest name in admin dashboard, not by inquiry ID
  await supabase.from("guest_inquiries").insert({
    name:             guestInfo.name,
    email:            guestInfo.email,
    phone:            guestInfo.phone,
    shipping_address: guestInfo.address,
    description:      inquiryMessage || null,
    photo_url:        uploadedPhotoUrl,
  });

  // Notify admin of new product inquiry from guest
  await supabase.functions.invoke("send-admin-notification", {
    body: { event_type: "guest_inquiries", guest_name: guestInfo.name }
  });
}

setInquirySubmitting(false);
setInquirySuccess(true);
setInquiryMessage("");
setInquiryFile(null);
```

}

// ── Buy button clicked
async function handleBuyClick() {
if (!modalProduct) return;

```
// Guest must have info collected first
if (!session && !guestInfo) {
  setPendingActionAfterGuestInfo("buy");
  setShowGuestInfoPopup(true);
  return;
}

setInvoiceLoading(true);

// Fetch admin info for invoice preview header (frozen at purchase time)
const { data: adminInfo } = await supabase
  .from("admin_users")
  .select("business_name, full_name, address, phone, contact_email")
  .single();

setInvoiceAdminInfo(adminInfo);

if (session) {
  // Fetch account user info for invoice preview Bill To section
  const { data: accountUser } = await supabase
    .from("account_users")
    .select("name, email, phone, shipping_address, business_name")
    .eq("account_user_id", session.user.id)
    .single();
  setInvoiceAccountUser(accountUser);
}

setInvoiceLoading(false);
setShowInvoicePreview(true);
```

}

// ── Guest info popup submitted
function handleGuestInfoSubmit(info) {
setGuestInfo(info);
setShowGuestInfoPopup(false);
// Continue with whatever action was pending
if (pendingActionAfterGuestInfo === “inquiry”) {
setInquiryOpen(true);
} else if (pendingActionAfterGuestInfo === “buy”) {
handleBuyClick();
}
setPendingActionAfterGuestInfo(null);
}

// ── Continue to Stripe from invoice preview
async function handleCheckoutContinue() {
if (!modalProduct) return;
setCheckoutLoading(true);

```
try {
  let body;

  if (session) {
    // ── ACCOUNT USER PURCHASE ─────────────────────────
    // Invoice linked to account_user_id
    // Appears in: UserListDashAdminView + UserDashboardUserView
    body = {
      product_id:       modalProduct.product_id,
      account_user_id:  session.user.id,
      account_snapshot: {
        name:            invoiceAccountUser.name,
        email:           invoiceAccountUser.email,
        phone:           invoiceAccountUser.phone,
        shippingAddress: invoiceAccountUser.shipping_address,
        businessName:    invoiceAccountUser.business_name ?? null,
      },
      admin_snapshot: {
        businessName: invoiceAdminInfo.business_name,
        fullName:     invoiceAdminInfo.full_name,
        address:      invoiceAdminInfo.address,
        phone:        invoiceAdminInfo.phone,
        contactEmail: invoiceAdminInfo.contact_email,
      },
    };
  } else {
    // ── GUEST PURCHASE ────────────────────────────────
    // Invoice linked to GUEST_ACCOUNT_USER_ID (server-side env var)
    // Appears in: GuestUserAdminView only
    // Listed by buyer name (account_snapshot.name), not invoice ID
    body = {
      product_id: modalProduct.product_id,
      guest:      true,
      guest_info: {
        name:            guestInfo.name,
        email:           guestInfo.email,
        phone:           guestInfo.phone,
        shippingAddress: guestInfo.address,
      },
      admin_snapshot: {
        businessName: invoiceAdminInfo.business_name,
        fullName:     invoiceAdminInfo.full_name,
        address:      invoiceAdminInfo.address,
        phone:        invoiceAdminInfo.phone,
        contactEmail: invoiceAdminInfo.contact_email,
      },
    };
  }

  const res = await fetch("/api/checkout/create-session", {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify(body),
  });

  const { url } = await res.json();
  // Redirect to Stripe — buyer info pre-filled, only payment details needed
  // product_state → INACTIVE handled automatically by trigger_mark_products_sold
  // after invoice INSERT by webhook — never handle this in frontend
  window.location.href = url;

} catch (err) {
  console.error("Checkout error:", err);
  setCheckoutLoading(false);
}
```

}

// ── Modal specs rows
const modalSpecs = useMemo(() => {
if (!modalProduct) return [];
return [
{ label: “Gem Type”, value: modalProduct.gem_type },
{ label: “Weight”,   value: `${modalProduct.weight} ct` },
{ label: “Color”,    value: modalProduct.color },
{ label: “Shape”,    value: modalProduct.shape },
…(modalProduct.origin            ? [{ label: “Origin”,      value: modalProduct.origin }]            : []),
…(modalProduct.treatment         ? [{ label: “Treatment”,   value: modalProduct.treatment }]         : []),
…(modalProduct.gia_report_number ? [{ label: “GIA Report #”, value: modalProduct.gia_report_number }] : []),
…(modalProduct.gia_report_pdf_url ? [{ label: “GIA Report”, value: modalProduct.gia_report_pdf_url, kind: “link” }] : []),
…(modalProduct.price_per_carat   ? [{ label: “Price / ct”, value: formatMoney(modalProduct.price_per_carat) }] : []),
{ label: “Total Price”, value: formatMoney(modalProduct.total_price) },
];
}, [modalProduct]);

// ── Buyer info for invoice preview
const buyerInfoForPreview = session
? invoiceAccountUser
? {
name:            invoiceAccountUser.name,
email:           invoiceAccountUser.email,
phone:           invoiceAccountUser.phone,
shippingAddress: invoiceAccountUser.shipping_address,
businessName:    invoiceAccountUser.business_name ?? null,
}
: null
: guestInfo
? {
name:            guestInfo.name,
email:           guestInfo.email,
phone:           guestInfo.phone,
shippingAddress: guestInfo.address,
businessName:    null,
}
: null;

// ── Render ────────────────────────────────────────────────
return (
<>
<style>{`@import url('https://fonts.googleapis.com/css2?family=Oranienbaum&family=Montserrat:wght@400;500;600&family=Comfortaa:wght@400;700&display=swap'); @keyframes fadeInModal { from { opacity: 0; } to { opacity: 1; } } @keyframes scaleInModal { from { opacity: 0; transform: scale(0.985); } to { opacity: 1; transform: scale(1); } } @media (max-width: 767px) { .shop-header-inner { padding: 32px 16px 24px !important; } .shop-grid-inner { padding: 0 16px 60px !important; } }`}</style>

```
  {/* Guest Info Popup */}
  {showGuestInfoPopup && (
    <GuestInfoPopup
      onSubmit={handleGuestInfoSubmit}
      onClose={() => { setShowGuestInfoPopup(false); setPendingActionAfterGuestInfo(null); }}
    />
  )}

  {/* Invoice Preview Popup */}
  {showInvoicePreview && invoiceAdminInfo && buyerInfoForPreview && modalProduct && (
    <InvoicePreviewPopup
      product={modalProduct}
      adminInfo={invoiceAdminInfo}
      buyerInfo={buyerInfoForPreview}
      onContinue={handleCheckoutContinue}
      onCancel={() => setShowInvoicePreview(false)}
      loading={checkoutLoading}
    />
  )}

  {/* Focus veil */}
  <div
    aria-hidden="true"
    style={{
      position: "fixed", inset: 0, zIndex: 10,
      backgroundColor: "rgba(0,5,10,0.52)",
      opacity: veilActive ? 1 : 0,
      transition: veilActive ? "opacity 200ms ease-out" : "opacity 240ms ease-out",
      pointerEvents: "none",
    }}
  />

  {/* Page */}
  <div onClick={handlePageTap} style={{ minHeight: "100vh", backgroundColor: "#050505", color: "#FAFAFA" }}>

    {/* Header */}
    <div className="shop-header-inner" style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px 48px 32px" }}>
      <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "11px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.20em", color: "rgba(255,255,255,0.52)", marginBottom: "12px" }}>
        Collection
      </p>
      <h1 style={{ fontFamily: "'Oranienbaum', Georgia, serif", fontSize: "clamp(30px, 6vw, 60px)", fontWeight: 400, color: "#FAFAFA", letterSpacing: "0.02em", lineHeight: 1.1 }}>
        Shop
      </h1>
    </div>

    {/* Grid */}
    <div className="shop-grid-inner" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 48px 80px" }}>
      {loadingProducts ? (
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.22em", color: "rgba(255,255,255,0.25)", padding: "60px 0" }}>
          Loading…
        </p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
          {products.map((product) => {
            const isFocused = focusedId === product.product_id;
            return (
              <div
                key={product.product_id}
                data-product-card
                onMouseEnter={() => handleMouseEnter(product.product_id)}
                onMouseLeave={handleMouseLeave}
                onClick={() => isMobile ? handleTap(product) : handleClick(product)}
                style={{ cursor: "pointer", position: "relative", zIndex: isFocused ? 20 : 1 }}
              >
                <div style={{ aspectRatio: "1 / 1", borderRadius: "1.7px", overflow: "hidden", position: "relative" }}>
                  <img
                    src={product.photo_url}
                    alt={product.title}
                    loading="lazy"
                    style={{
                      width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block",
                      filter: isFocused ? "grayscale(0%) brightness(1)" : "grayscale(100%) brightness(0.85) contrast(1.04)",
                      transition: "filter 300ms ease-out",
                    }}
                  />
                  <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 18px 6px rgba(0,0,0,0.48)", pointerEvents: "none", borderRadius: "1.7px" }} />
                </div>
                <p style={{ fontFamily: "'Comfortaa', sans-serif", fontSize: "13px", fontWeight: 400, color: "#d4af37", letterSpacing: "0.7px", marginTop: "10px", textAlign: "left" }}>
                  {product.title}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  </div>

  {/* Product Modal */}
  {modalProduct && (
    <div
      onClick={closeModal}
      style={{ position: "fixed", inset: 0, zIndex: 100, backgroundColor: "rgba(0,0,0,0.75)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", animation: "fadeInModal 220ms ease-out forwards" }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{ backgroundColor: "#0A0A0A", border: "1px solid rgba(255,255,255,0.10)", borderRadius: "16px", boxShadow: "0 28px 90px rgba(0,0,0,0.70)", width: "100%", maxWidth: "920px", maxHeight: "92vh", overflowY: "auto", animation: "scaleInModal 220ms ease-out forwards", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", position: "relative" }}
      >
        {/* Image */}
        <div style={{ position: "relative", aspectRatio: "1 / 1", overflow: "hidden", borderRadius: isMobile ? "16px 16px 0 0" : "16px 0 0 16px" }}>
          <img
            src={modalProduct.photo_url}
            alt={modalProduct.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
          />
          <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 32px 10px rgba(0,0,0,0.55)", pointerEvents: "none" }} />
        </div>

        {/* Details */}
        <div style={{ padding: isMobile ? "28px 24px 32px" : "36px 36px", display: "flex", flexDirection: "column" }}>

          {/* Close button */}
          <button
            onClick={closeModal}
            aria-label="Close"
            style={{ position: "absolute", top: "14px", right: "14px", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.10)", borderRadius: "50%", width: "34px", height: "34px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "rgba(255,255,255,0.60)", transition: "all 200ms ease-out", zIndex: 10 }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.13)"; e.currentTarget.style.color = "#FAFAFA"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.color = "rgba(255,255,255,0.60)"; }}
          >
            <X size={14} />
          </button>

          <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "10px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.20em", color: "rgba(255,255,255,0.45)", marginBottom: "10px" }}>
            {modalProduct.gem_type}
          </p>

          <h2 style={{ fontFamily: "'Comfortaa', sans-serif", fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 400, color: "#d4af37", letterSpacing: "0.7px", lineHeight: 1.25, marginBottom: "20px" }}>
            {modalProduct.title}
          </h2>

          <div style={{ width: "36px", height: "1px", backgroundColor: "rgba(255,255,255,0.12)", marginBottom: "20px" }} />

          {/* Specs */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "16px" }}>
            {modalSpecs.map(({ label, value, kind }) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "12px" }}>
                <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.18em", color: "rgba(255,255,255,0.38)", flexShrink: 0 }}>
                  {label}
                </span>
                {kind === "link" ? (
                  <a href={value} target="_blank" rel="noreferrer" style={{ fontFamily: "'Comfortaa', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.75)", textAlign: "right", textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,0.14)" }}
                    onMouseEnter={e => e.currentTarget.style.borderBottomColor = "rgba(255,255,255,0.32)"}
                    onMouseLeave={e => e.currentTarget.style.borderBottomColor = "rgba(255,255,255,0.14)"}
                  >View</a>
                ) : (
                  <span style={{ fontFamily: "'Comfortaa', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.75)", textAlign: "right" }}>{value}</span>
                )}
              </div>
            ))}
          </div>

          {/* Description */}
          {modalProduct.description && (
            <p style={{ fontFamily: "'Comfortaa', sans-serif", fontSize: "13px", lineHeight: 1.75, color: "rgba(255,255,255,0.55)", marginBottom: "18px" }}>
              {modalProduct.description}
            </p>
          )}

          {/* Price */}
          <p style={{ fontFamily: "'Courier New', monospace", fontSize: "22px", letterSpacing: "0.7px", color: "rgba(45,212,191,1)", marginBottom: "14px" }}>
            {formatMoney(modalProduct.total_price)}
          </p>

          {/* Inquiry Button */}
          <button
            type="button"
            onClick={handleInquiryClick}
            style={{ display: "block", width: "100%", textAlign: "center", fontFamily: "'Montserrat', sans-serif", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.20em", backgroundColor: "#d4af37", color: "#050505", border: "none", borderRadius: "3px", padding: "14px 24px", cursor: "pointer", transition: "all 200ms ease-out", marginBottom: inquiryOpen ? "12px" : "10px" }}
            onMouseEnter={hoverEnterFlash}
            onMouseLeave={hoverLeaveReset}
          >
            Inquiry
          </button>

          {/* Inquiry Form */}
          {inquiryOpen && (
            <div style={{ border: "1px solid rgba(255,255,255,0.10)", borderRadius: "14px", background: "rgba(255,255,255,0.03)", padding: "14px", marginBottom: "14px" }}>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "10px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.20em", color: "rgba(255,255,255,0.52)", marginBottom: "10px" }}>
                Send an inquiry
              </p>

              {/* Guest-only fields — shown inside inquiry form if guest */}
              {!session && guestInfo && (
                <div style={{ marginBottom: "10px", padding: "10px 12px", background: "rgba(255,255,255,0.03)", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <p style={{ fontFamily: "'Comfortaa', sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.40)", lineHeight: 1.7 }}>
                    Submitting as: <span style={{ color: "rgba(255,255,255,0.65)" }}>{guestInfo.name}</span> · {guestInfo.email}
                  </p>
                </div>
              )}

              <textarea
                value={inquiryMessage}
                onChange={e => setInquiryMessage(e.target.value)}
                placeholder="Your message (optional)"
                style={{ width: "100%", minHeight: "96px", resize: "vertical", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.10)", background: "rgba(0,0,0,0.35)", padding: "12px", color: "#FAFAFA", fontFamily: "'Comfortaa', sans-serif", fontSize: "13px", lineHeight: 1.65, outline: "none", marginBottom: "10px" }}
              />

              {/* Photo attach */}
              <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", padding: "12px", border: "1px solid rgba(255,255,255,0.10)", borderRadius: "12px", background: "rgba(255,255,255,0.02)", cursor: "pointer", marginBottom: "12px" }}>
                <span style={{ fontFamily: "'Comfortaa', sans-serif", fontSize: "13px", color: inquiryFile ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.45)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {inquiryFile ? inquiryFile.name : "Attach image (optional)"}
                </span>
                <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "10px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.20em", color: "rgba(255,255,255,0.52)" }}>Choose</span>
                <input type="file" accept="image/*" style={{ display: "none" }} onChange={e => {
                  const f = e.target.files?.[0];
                  if (!f) return;
                  if (inquiryFileUrlRef.current) URL.revokeObjectURL(inquiryFileUrlRef.current);
                  inquiryFileUrlRef.current = URL.createObjectURL(f);
                  setInquiryFile(f);
                }} />
              </label>

              {inquirySuccess ? (
                <p style={{ fontFamily: "'Comfortaa', sans-serif", fontSize: "12px", color: "rgba(45,212,191,0.85)", textAlign: "center", padding: "10px 0" }}>
                  Inquiry sent successfully.
                </p>
              ) : (
                <button
                  type="button"
                  onClick={submitInquiry}
                  disabled={inquirySubmitting}
                  style={{ width: "100%", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.10)", background: "rgba(255,255,255,0.07)", color: "#FAFAFA", padding: "12px 14px", fontFamily: "'Montserrat', sans-serif", fontSize: "10px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.20em", cursor: "pointer", transition: "all 200ms ease-out" }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.12)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.07)"}
                >
                  {inquirySubmitting ? "Sending…" : "Send"}
                </button>
              )}
            </div>
          )}

          {/* Buy Button
              - Shown to BOTH guests and signed-in users
              - Opens invoice preview popup before Stripe redirect
              - Guest: routes to GUEST_ACCOUNT_USER_ID via server env var
              - User: routes to account_user_id
          */}
          <button
            type="button"
            onClick={handleBuyClick}
            disabled={invoiceLoading}
            style={{ display: "block", width: "100%", textAlign: "center", fontFamily: "'Montserrat', sans-serif", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.20em", backgroundColor: "#d4af37", color: "#050505", border: "none", borderRadius: "3px", padding: "14px 24px", cursor: "pointer", transition: "all 200ms ease-out", marginBottom: "10px" }}
            onMouseEnter={hoverEnterFlash}
            onMouseLeave={hoverLeaveReset}
          >
            {invoiceLoading ? "Loading…" : "Buy"}
          </button>

          {/* Close */}
          <button
            onClick={closeModal}
            style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "10px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.18em", backgroundColor: "transparent", color: "rgba(255,255,255,0.38)", border: "none", cursor: "pointer", padding: "10px 0", transition: "color 200ms ease-out", width: "100%", textAlign: "center" }}
            onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,0.70)"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.38)"}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )}
</>
```

);
}
