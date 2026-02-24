import { useState, useEffect, useRef } from “react”;
import { createClient } from “@supabase/supabase-js”;

// ============================================================
// CUTTING CORNERS GEMS — Admin Products Page
// Schema: products table
// product_state: DRAFT | ACTIVE | INACTIVE
// ACTIVE → INACTIVE automatically via trigger_mark_products_sold
// on invoice INSERT — never handle that transition in frontend.
// ============================================================

const supabase = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL,
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const NAV_ITEMS = [
{ id: “dashboard”, label: “Dashboard”, icon: “⬡” },
{ id: “products”,  label: “Products”,  icon: “◈” },
{ id: “portfolio”, label: “Portfolio”, icon: “◻” },
{ id: “users”,     label: “User List”, icon: “◯” },
];

const TABS       = [“active”, “drafts”, “inactive”];
const TAB_LABELS = { active: “Live”, drafts: “Drafts”, inactive: “Inactive” };

const EMPTY_FORM = {
title: “”, gem_type: “”, color: “”, shape: “”, weight: “”,
origin: “”, treatment: “”, gia_report_number: “”, gia_report_pdf_url: “”,
price_per_carat: “”, total_price: “”, description: “”, photo_url: “”,
};

function fmtDate(iso) { if (!iso) return “”; return new Date(iso).toLocaleDateString(“en-US”, { month: “short”, day: “numeric”, year: “numeric” }); }
function fmtTime(iso) { if (!iso) return “”; return new Date(iso).toLocaleTimeString(“en-US”, { hour: “2-digit”, minute: “2-digit” }); }
function fmtMoney(val) { if (val == null || val === “”) return “–”; return new Intl.NumberFormat(“en-US”, { style: “currency”, currency: “USD” }).format(val); }
function genId() { return “CCG-” + Date.now().toString(36).toUpperCase(); }

// ── CSS ───────────────────────────────────────────────────────
const css = `@import url('https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,300;0,400;0,500;1,300&family=DM+Sans:wght@300;400;500&display=swap'); *,*::before,*::after{box-sizing:border-box;margin:0;padding:0} :root{ --k0:#060606;--k1:#0d0d0d;--k2:#131313;--k3:#191919;--k4:#202020; --ln:rgba(255,255,255,0.06);--ln2:rgba(255,255,255,0.11); --g:#b89a2a;--gl:#cfb040;--gbg:rgba(184,154,42,0.07); --tx:#ddd;--d1:#777;--d2:#444;--wh:#f0f0f0;--er:#b54040; --serif:'Cormorant',Georgia,serif;--sans:'DM Sans',system-ui,sans-serif; } .shell{display:flex;height:100vh;background:var(--k0);font-family:var(--sans);color:var(--tx);overflow:hidden} .sb{width:196px;flex-shrink:0;background:var(--k1);border-right:1px solid var(--ln);display:flex;flex-direction:column} .sb-brand{padding:26px 20px 22px;border-bottom:1px solid var(--ln)} .sb-name{font-family:var(--serif);font-size:14px;font-weight:400;color:var(--wh);letter-spacing:.07em;line-height:1.3} .sb-role{font-size:8.5px;letter-spacing:.28em;text-transform:uppercase;color:var(--d2);margin-top:4px} .sb-nav{flex:1;padding:10px 0} .ni{display:flex;align-items:center;gap:10px;padding:10px 20px;font-size:10.5px;font-weight:400;letter-spacing:.14em;text-transform:uppercase;color:var(--d1);cursor:pointer;border:none;background:none;width:100%;text-align:left;transition:color .15s;position:relative} .ni::before{content:'';position:absolute;left:0;top:0;bottom:0;width:2px;background:var(--gl);opacity:0;transition:opacity .15s} .ni.on{color:var(--wh)}.ni.on::before{opacity:1}.ni:hover:not(.on){color:#aaa} .ni-ic{font-size:12px;opacity:.55}.ni.on .ni-ic{opacity:1} .sb-foot{padding:14px 20px;border-top:1px solid var(--ln);font-size:8.5px;letter-spacing:.18em;text-transform:uppercase;color:var(--d2)} .main{flex:1;display:flex;flex-direction:column;overflow:hidden;background:var(--k0)} .ph{display:flex;align-items:center;justify-content:space-between;padding:22px 32px;border-bottom:1px solid var(--ln);flex-shrink:0} .ph-title{font-family:var(--serif);font-size:22px;font-weight:300;color:var(--wh);letter-spacing:.05em} .ph-right{display:flex;align-items:center;gap:12px} .err-bar{font-size:9.5px;color:var(--er);letter-spacing:.08em;padding:6px 12px;border:1px solid rgba(181,64,64,.25);background:rgba(181,64,64,.07)} .btn-add{display:flex;align-items:center;gap:7px;background:var(--gl);color:#000;border:none;padding:9px 17px;font-family:var(--sans);font-size:9.5px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;cursor:pointer;transition:background .15s} .btn-add:hover:not(:disabled){background:#dcc056}.btn-add:disabled{opacity:.4;cursor:not-allowed} .tabs{display:flex;gap:26px;padding:0 32px;border-bottom:1px solid var(--ln);flex-shrink:0} .tab{padding:13px 0;font-size:9.5px;font-weight:400;letter-spacing:2.7px;text-transform:uppercase;color:var(--d1);cursor:pointer;border:none;background:none;border-bottom:1px solid transparent;position:relative;top:1px;transition:color .15s} .tab.on{color:var(--wh);border-bottom-color:var(--gl)}.tab:hover:not(.on){color:#aaa} .tab-n{margin-left:5px;font-size:8.5px;color:var(--d2)}.tab.on .tab-n{color:var(--g)} .pb{flex:1;overflow-y:auto;padding:0 32px} .loading{display:flex;align-items:center;justify-content:center;padding:80px 0;font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:var(--d2)} .empty{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:80px 0;color:var(--d2)} .empty-ic{font-size:28px;opacity:.18;margin-bottom:10px} .empty-tx{font-size:10px;letter-spacing:.22em;text-transform:uppercase} .tbl{width:100%;border-collapse:collapse} .tbl thead tr{border-bottom:1px solid var(--ln)} .tbl th{font-size:8.5px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:var(--d2);padding:14px 0 10px;text-align:left} .tbl th:last-child{text-align:right} .tbl tbody tr{border-bottom:1px solid var(--ln);transition:background .1s;cursor:pointer} .tbl tbody tr:hover{background:var(--k2)} .tbl td{padding:13px 0;font-size:12px;color:var(--tx);vertical-align:middle} .tbl td:last-child{text-align:right} .td-name{font-family:var(--serif);font-size:15px;font-weight:400;color:var(--wh)} .td-sub{font-size:10px;color:var(--d1);letter-spacing:.07em;margin-top:1px} .td-price{font-family:var(--serif);font-size:15px;color:var(--gl)} .pill{display:inline-block;font-size:8px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;padding:3px 7px} .pill-A{background:rgba(207,176,64,.09);color:var(--gl)} .pill-D{background:rgba(255,255,255,.04);color:var(--d1)} .pill-I{background:rgba(181,64,64,.1);color:#c07070} .ra{display:flex;align-items:center;justify-content:flex-end;gap:6px;opacity:0;transition:opacity .15s} .tbl tbody tr:hover .ra{opacity:1} .ab{font-size:9px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;padding:5px 10px;border:1px solid var(--ln2);background:none;color:var(--d1);cursor:pointer;transition:all .15s;font-family:var(--sans)} .ab:hover{border-color:var(--g);color:var(--gl)} .ab.pub{border-color:rgba(207,176,64,.25);color:var(--g)}.ab.pub:hover{background:var(--gbg)} .ab.rem:hover{border-color:var(--er);color:#c07070} .ov{position:fixed;inset:0;background:rgba(0,0,0,.9);backdrop-filter:blur(8px);z-index:100;display:flex;align-items:stretch} .qp{width:196px;flex-shrink:0;background:var(--k1);border-right:1px solid var(--ln);display:flex;flex-direction:column} .qh{padding:18px 16px 13px;font-size:8.5px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:var(--d1);border-bottom:1px solid var(--ln)} .ql{flex:1;overflow-y:auto;padding:6px} .qi{padding:9px 11px;margin-bottom:2px;cursor:pointer;border-left:2px solid transparent;transition:all .12s} .qi:hover{background:var(--k3)}.qi.cur{border-left-color:var(--gl);background:var(--k2)} .qi-t{font-size:11.5px;color:var(--tx);white-space:nowrap;overflow:hidden;text-overflow:ellipsis} .qi-id{font-size:8.5px;color:var(--d2);margin-top:2px;font-family:monospace;letter-spacing:0} .qi-s{font-size:7.5px;color:var(--g);margin-top:2px;letter-spacing:.1em;text-transform:uppercase} .qadd{margin:7px;padding:8px;border:1px dashed var(--ln2);background:none;color:var(--d1);font-size:9.5px;font-family:var(--sans);letter-spacing:.12em;cursor:pointer;transition:all .15s;width:calc(100% - 14px)} .qadd:hover:not(:disabled){border-color:var(--g);color:var(--gl)}.qadd:disabled{opacity:.22;cursor:not-allowed} .fp{flex:1;display:flex;flex-direction:column;background:var(--k1);overflow:hidden} .fh{display:flex;align-items:center;justify-content:space-between;padding:16px 26px;border-bottom:1px solid var(--ln);flex-shrink:0} .fh-title{font-family:var(--serif);font-size:19px;font-weight:300;color:var(--wh)} .fhr{display:flex;align-items:center;gap:13px} .sf{font-size:8.5px;letter-spacing:.18em;text-transform:uppercase;color:var(--g);opacity:0;transition:opacity .4s}.sf.on{opacity:1} .xb{width:28px;height:28px;border:1px solid var(--ln2);background:none;color:var(--d1);font-size:15px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .15s}.xb:hover{border-color:#c07070;color:#c07070} .fb{flex:1;overflow-y:auto;padding:22px 26px} .fg{display:flex;flex-direction:column;gap:4px} .fg label{font-size:8.5px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:var(--d1)} .fg input,.fg textarea{background:var(--k2);border:1px solid var(--ln);border-top-color:var(--ln2);color:var(--tx);padding:8px 10px;font-family:var(--sans);font-size:12px;letter-spacing:.02em;outline:none;transition:border-color .15s;width:100%} .fg input:focus,.fg textarea:focus{border-color:var(--g)} .fg input::placeholder,.fg textarea::placeholder{color:var(--d2)} .fg input[readonly]{opacity:.38;cursor:default;font-family:monospace;font-size:10px;letter-spacing:0} .fg textarea{resize:vertical;min-height:68px} .fr{display:grid;gap:12px;margin-bottom:12px} .fr2{grid-template-columns:1fr 1fr}.fr3{grid-template-columns:1fr 1fr 1fr}.fr1{grid-template-columns:1fr} .gia-blk{background:var(--k2);border:1px solid var(--ln);padding:13px 15px;margin-bottom:12px} .gia-l{font-size:8.5px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:var(--d1);margin-bottom:9px} .gia-mr{display:flex;gap:0;margin-bottom:9px} .gmb{padding:4px 11px;font-size:8.5px;font-weight:500;letter-spacing:.15em;text-transform:uppercase;border:1px solid var(--ln);background:none;color:var(--d1);cursor:pointer;margin-right:-1px;transition:all .12s;font-family:var(--sans)} .gmb.on{background:var(--gbg);border-color:rgba(207,176,64,.35);color:var(--gl);z-index:1} .uz{border:1px dashed var(--ln2);padding:18px;text-align:center;cursor:pointer;transition:all .15s;background:var(--k1)} .uz:hover{border-color:var(--g)}.uz input{display:none} .uz p{font-size:9.5px;color:var(--d1);letter-spacing:.1em} .uz .ui{font-size:20px;opacity:.2;margin-bottom:5px} .ufn{font-size:9.5px;color:var(--g);margin-top:5px;word-break:break-all} .ff{display:flex;align-items:center;justify-content:space-between;padding:13px 26px;border-top:1px solid var(--ln);flex-shrink:0;background:var(--k1)} .ff-note{font-size:9.5px;color:var(--d2);letter-spacing:.07em} .ffa{display:flex;gap:7px} .bg{padding:8px 14px;font-family:var(--sans);font-size:9.5px;font-weight:500;letter-spacing:.15em;text-transform:uppercase;border:1px solid var(--ln2);background:none;color:var(--d1);cursor:pointer;transition:all .15s} .bg:hover:not(:disabled){border-color:var(--g);color:var(--gl)}.bg:disabled{opacity:.4;cursor:not-allowed} .bn{padding:8px 14px;font-family:var(--sans);font-size:9.5px;font-weight:500;letter-spacing:.15em;text-transform:uppercase;border:1px solid rgba(207,176,64,.28);background:var(--gbg);color:var(--gl);cursor:pointer;transition:all .15s} .bn:hover{background:var(--gl);color:#000} .bp{padding:8px 18px;font-family:var(--sans);font-size:9.5px;font-weight:500;letter-spacing:.15em;text-transform:uppercase;border:none;background:var(--gl);color:#000;cursor:pointer;transition:background .15s} .bp:hover:not(:disabled){background:#dcc056}.bp:disabled{opacity:.4;cursor:not-allowed} ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:var(--ln2)}`;

// ── Upsert Helper ─────────────────────────────────────────────
async function upsertProduct(p, state) {
return supabase.from(“products”).upsert({
product_id:         p.product_id,
title:              p.title || “”,
gem_type:           p.gem_type || null,
color:              p.color || null,
shape:              p.shape || null,
weight:             p.weight ? parseFloat(p.weight) : null,
origin:             p.origin || null,
treatment:          p.treatment || null,
gia_report_number:  p.gia_report_number || null,
gia_report_pdf_url: p.gia_report_pdf_url || null,
price_per_carat:    p.price_per_carat ? parseFloat(p.price_per_carat) : null,
total_price:        p.total_price ? parseFloat(p.total_price) : 0,
description:        p.description || null,
photo_url:          p.photo_url || null,
product_state:      state,
}, { onConflict: “product_id” });
}

// ── GIA Section ───────────────────────────────────────────────
function GIASection({ value, onChange }) {
const [mode, setMode] = useState(“url”);
const fileRef = useRef();
const [fileName, setFileName] = useState(””);

const handleFile = async (e) => {
const f = e.target.files?.[0];
if (!f) return;
setFileName(f.name);
// NOTE: GIA PDF upload bucket not yet configured in Supabase.
// When product-photos bucket is created, implement upload here.
// For now store placeholder so admin knows file was selected.
onChange(“gia_report_pdf_url”, `[uploaded] ${f.name}`);
};

return (
<div className="gia-blk">
<div className="gia-l">GIA Report</div>
<div className="gia-mr">
{[[“url”, “PDF URL”], [“upload”, “Upload”], [“photo”, “Photo URL”]].map(([m, l]) => (
<button key={m} type=“button” className={`gmb ${mode === m ? "on" : ""}`} onClick={() => setMode(m)}>{l}</button>
))}
</div>
{mode === “upload” ? (
<div className=“uz” onClick={() => fileRef.current?.click()}>
<input ref={fileRef} type="file" accept=".pdf" onChange={handleFile} />
<div className="ui">↑</div>
<p>Click to upload GIA PDF</p>
{fileName && <div className="ufn">{fileName}</div>}
</div>
) : (
<input
type=“text”
placeholder={mode === “url” ? “https://www.gia.edu/report-check/…” : “https://… photo URL”}
value={value}
onChange={e => onChange(“gia_report_pdf_url”, e.target.value)}
style={{ background: “var(–k1)”, border: “1px solid var(–ln)”, color: “var(–tx)”, padding: “8px 10px”, fontFamily: “var(–sans)”, fontSize: “12px”, width: “100%”, outline: “none” }}
/>
)}
</div>
);
}

// ── Form Modal ────────────────────────────────────────────────
function ProductForm({ queue, currentIndex, onCurrentChange, onClose, onAddToQueue, onPublishAll, onSaveDrafts, onSwitchIndex, saving }) {
const current = queue[currentIndex];
const [flash, setFlash] = useState(false);
const timerRef = useRef();

const upd = (f, v) => onCurrentChange({ …current, [f]: v });

// Auto-save every 15 seconds as DRAFT
useEffect(() => {
timerRef.current = setInterval(async () => {
const { error } = await upsertProduct(current, “DRAFT”);
if (!error) {
setFlash(true);
setTimeout(() => setFlash(false), 2000);
}
}, 15000);
return () => clearInterval(timerRef.current);
}, [current]);

return (
<div className="ov">
<div className="qp">
<div className="qh">Queue ({queue.length}/10)</div>
<div className="ql">
{queue.map((item, i) => (
<div key={item.product_id} className={`qi ${i === currentIndex ? "cur" : ""}`} onClick={() => onSwitchIndex(i)}>
<div className="qi-t">{item.title || “(New Product)”}</div>
<div className="qi-id">{item.product_id}</div>
<div className="qi-s">{item._saved ? “Draft saved” : “Unsaved”}</div>
</div>
))}
</div>
<button className="qadd" onClick={onAddToQueue} disabled={queue.length >= 10}>+ Add Another</button>
</div>

```
  <div className="fp">
    <div className="fh">
      <div className="fh-title">
        {current.title || "New Product"}
        <span style={{ fontSize: 12, color: "var(--d1)", fontWeight: 300, marginLeft: 10 }}>{currentIndex + 1} / {queue.length}</span>
      </div>
      <div className="fhr">
        <span className={`sf ${flash ? "on" : ""}`}>✓ Saved</span>
        <button className="xb" onClick={onClose}>×</button>
      </div>
    </div>

    <div className="fb">
      <div className="fr fr3">
        <div className="fg"><label>Product ID</label><input readOnly value={current.product_id} /></div>
        <div className="fg"><label>Date</label><input readOnly value={fmtDate(current.created_at)} /></div>
        <div className="fg"><label>Time</label><input readOnly value={fmtTime(current.created_at)} /></div>
      </div>
      <div className="fr fr1">
        <div className="fg"><label>Title</label><input placeholder="e.g. Burmese Pigeon Blood Ruby" value={current.title} onChange={e => upd("title", e.target.value)} /></div>
      </div>
      <div className="fr fr3">
        <div className="fg"><label>Gem Type</label><input placeholder="Ruby" value={current.gem_type} onChange={e => upd("gem_type", e.target.value)} /></div>
        <div className="fg"><label>Color</label><input placeholder="Vivid Red" value={current.color} onChange={e => upd("color", e.target.value)} /></div>
        <div className="fg"><label>Shape</label><input placeholder="Oval" value={current.shape} onChange={e => upd("shape", e.target.value)} /></div>
      </div>
      <div className="fr fr3">
        <div className="fg"><label>Weight (ct)</label><input placeholder="3.42" value={current.weight || ""} onChange={e => upd("weight", e.target.value)} /></div>
        <div className="fg"><label>Origin</label><input placeholder="Burma" value={current.origin} onChange={e => upd("origin", e.target.value)} /></div>
        <div className="fg"><label>Treatment</label><input placeholder="Heat / No Heat" value={current.treatment} onChange={e => upd("treatment", e.target.value)} /></div>
      </div>
      <div className="fr fr2">
        <div className="fg"><label>GIA Report Number</label><input placeholder="2211234567" value={current.gia_report_number} onChange={e => upd("gia_report_number", e.target.value)} /></div>
        <div className="fg"><label>Photo URL</label><input placeholder="https://..." value={current.photo_url} onChange={e => upd("photo_url", e.target.value)} /></div>
      </div>
      <GIASection value={current.gia_report_pdf_url} onChange={upd} />
      <div className="fr fr2">
        <div className="fg"><label>Price Per Carat ($)</label><input placeholder="12000" value={current.price_per_carat || ""} onChange={e => upd("price_per_carat", e.target.value)} /></div>
        <div className="fg"><label>Total Price ($)</label><input placeholder="41040" value={current.total_price || ""} onChange={e => upd("total_price", e.target.value)} /></div>
      </div>
      <div className="fr fr1">
        <div className="fg"><label>Description</label><textarea placeholder="Additional notes..." value={current.description} onChange={e => upd("description", e.target.value)} /></div>
      </div>
    </div>

    <div className="ff">
      <div className="ff-note">{queue.length > 1 ? `${queue.length} products in queue` : "Up to 10 products per session"}</div>
      <div className="ffa">
        <button className="bg" onClick={onSaveDrafts} disabled={saving}>{saving ? "Saving…" : "Save Drafts"}</button>
        {currentIndex < queue.length - 1 && <button className="bn" onClick={() => onSwitchIndex(currentIndex + 1)}>Next →</button>}
        <button className="bp" onClick={onPublishAll} disabled={saving}>{saving ? "Saving…" : queue.length > 1 ? `Publish All (${queue.length})` : "Publish"}</button>
      </div>
    </div>
  </div>
</div>
```

);
}

// ── Page ──────────────────────────────────────────────────────
export default function AdminProductsPage() {
const [activeNav, setActiveNav] = useState(“products”);
const [tab, setTab]             = useState(“active”);
const [products, setProducts]   = useState([]);
const [loading, setLoading]     = useState(true);
const [saving, setSaving]       = useState(false);
const [error, setError]         = useState(null);
const [showForm, setShowForm]   = useState(false);
const [queue, setQueue]         = useState([]);
const [curIdx, setCurIdx]       = useState(0);

const filtered = {
active:   products.filter(p => p.product_state === “ACTIVE”),
drafts:   products.filter(p => p.product_state === “DRAFT”),
inactive: products.filter(p => p.product_state === “INACTIVE”),
};

// ── Load all products (admin sees all states)
async function loadProducts() {
setLoading(true);
setError(null);
const { data, error } = await supabase
.from(“products”)
.select(”*”)
.order(“created_at”, { ascending: false });
if (error) setError(error.message);
else setProducts(data || []);
setLoading(false);
}

useEffect(() => { loadProducts(); }, []);

// ── Open Add — insert stub row immediately so auto-save has valid product_id
async function openAdd() {
const np = {
…EMPTY_FORM,
product_id:    genId(),
created_at:    new Date().toISOString(),
product_state: “DRAFT”,
_saved:        false,
};
const { error } = await supabase.from(“products”).insert({
product_id:    np.product_id,
title:         “”,
total_price:   0,
product_state: “DRAFT”,
});
if (error) { setError(error.message); return; }
setQueue([np]);
setCurIdx(0);
setProducts(prev => [np, …prev]);
setShowForm(true);
}

// ── Open Edit
function openEdit(product) {
setQueue([{ …product, _saved: true }]);
setCurIdx(0);
setShowForm(true);
}

// ── Update current queue item in local state
function updateCurrent(updated) {
const nq = […queue];
nq[curIdx] = updated;
setQueue(nq);
setProducts(prev => prev.map(p => p.product_id === updated.product_id ? updated : p));
}

// ── Add to queue — insert stub row immediately
async function addToQueue() {
if (queue.length >= 10) return;
const np = {
…EMPTY_FORM,
product_id:    genId(),
created_at:    new Date().toISOString(),
product_state: “DRAFT”,
_saved:        false,
};
const { error } = await supabase.from(“products”).insert({
product_id:    np.product_id,
title:         “”,
total_price:   0,
product_state: “DRAFT”,
});
if (error) { setError(error.message); return; }
const nq = […queue, np];
setQueue(nq);
setCurIdx(nq.length - 1);
setProducts(prev => [np, …prev]);
}

// ── Save Drafts
async function saveDrafts() {
setSaving(true);
for (const p of queue) {
const { error } = await upsertProduct(p, “DRAFT”);
if (error) { setError(error.message); setSaving(false); return; }
}
await loadProducts();
setSaving(false);
setShowForm(false);
}

// ── Publish All
async function publishAll() {
setSaving(true);
for (const p of queue) {
const { error } = await upsertProduct(p, “ACTIVE”);
if (error) { setError(error.message); setSaving(false); return; }
}
// Send SMS notification to all users with opt_in_new_listings = true
// DB trigger user_notify_new_product handles in-app notifications automatically
for (const p of queue) {
await supabase.functions.invoke(“send-new-listing-notification”, {
body: { product_id: p.product_id },
});
}
await loadProducts();
setSaving(false);
setShowForm(false);
setTab(“active”);
}

// ── Publish One (from row action)
async function publishOne(product) {
const { error } = await upsertProduct(product, “ACTIVE”);
if (error) { setError(error.message); return; }
await supabase.functions.invoke(“send-new-listing-notification”, {
body: { product_id: product.product_id },
});
await loadProducts();
}

// ── Remove One — ACTIVE → INACTIVE (admin-initiated, before any sale)
// Note: ACTIVE → INACTIVE also happens automatically via trigger_mark_products_sold
// when a purchase invoice is inserted. Do not duplicate that logic here.
async function removeOne(product) {
const { error } = await supabase
.from(“products”)
.update({ product_state: “INACTIVE” })
.eq(“product_id”, product.product_id);
if (error) { setError(error.message); return; }
await loadProducts();
}

return (
<>
<style>{css}</style>
<div className="shell">
<div className="sb">
<div className="sb-brand">
<div className="sb-name">Cutting Corners<br />Gems</div>
<div className="sb-role">Admin</div>
</div>
<nav className="sb-nav">
{NAV_ITEMS.map(item => (
<button key={item.id} className={`ni ${activeNav === item.id ? "on" : ""}`} onClick={() => setActiveNav(item.id)}>
<span className="ni-ic">{item.icon}</span>{item.label}
</button>
))}
</nav>
<div className="sb-foot">CCG · Admin</div>
</div>

```
    <div className="main">
      <div className="ph">
        <div className="ph-title">Products</div>
        <div className="ph-right">
          {error && <div className="err-bar">{error}</div>}
          <button className="btn-add" onClick={openAdd} disabled={loading}>+ Add Product</button>
        </div>
      </div>

      <div className="tabs">
        {TABS.map(t => (
          <button key={t} className={`tab ${tab === t ? "on" : ""}`} onClick={() => setTab(t)}>
            {TAB_LABELS[t]}<span className="tab-n">{filtered[t].length}</span>
          </button>
        ))}
      </div>

      <div className="pb">
        {loading ? (
          <div className="loading">Loading Products…</div>
        ) : filtered[tab].length === 0 ? (
          <div className="empty">
            <div className="empty-ic">◈</div>
            <div className="empty-tx">No {TAB_LABELS[tab].toLowerCase()} products</div>
          </div>
        ) : (
          <table className="tbl">
            <thead><tr>
              <th>Product</th><th>GIA</th><th>Weight</th><th>Status</th><th>Date</th><th>Total Price</th><th></th>
            </tr></thead>
            <tbody>
              {filtered[tab].map(p => (
                <tr key={p.product_id} onClick={() => openEdit(p)}>
                  <td>
                    <div className="td-name">{p.title || "(New Product)"}</div>
                    <div className="td-sub">{[p.gem_type, p.color, p.origin].filter(Boolean).join(" · ")}</div>
                  </td>
                  <td style={{ fontSize: 11, color: "var(--d1)" }}>{p.gia_report_number || "--"}</td>
                  <td style={{ fontSize: 12 }}>{p.weight ? `${p.weight} ct` : "--"}</td>
                  <td><span className={`pill pill-${p.product_state[0]}`}>{p.product_state}</span></td>
                  <td style={{ fontSize: 11, color: "var(--d1)" }}>{fmtDate(p.created_at)}</td>
                  <td className="td-price">{fmtMoney(p.total_price)}</td>
                  <td>
                    <div className="ra" onClick={e => e.stopPropagation()}>
                      <button className="ab" onClick={() => openEdit(p)}>Edit</button>
                      {p.product_state === "DRAFT"  && <button className="ab pub" onClick={() => publishOne(p)}>Publish</button>}
                      {p.product_state === "ACTIVE" && <button className="ab rem" onClick={() => removeOne(p)}>Remove</button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>

    {showForm && (
      <ProductForm
        queue={queue}
        currentIndex={curIdx}
        onCurrentChange={updateCurrent}
        onClose={() => setShowForm(false)}
        onAddToQueue={addToQueue}
        onPublishAll={publishAll}
        onSaveDrafts={saveDrafts}
        onSwitchIndex={setCurIdx}
        saving={saving}
      />
    )}
  </div>
</>
```

);
}
