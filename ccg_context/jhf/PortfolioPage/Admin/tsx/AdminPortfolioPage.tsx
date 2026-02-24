import { useState, useEffect, useRef } from “react”;

// ============================================================
// CUTTING CORNERS GEMS – Admin Shell + AdminPortfolioPage
// Schema: portfolio_photos table v5
// Columns: photo_url, year, caption, description, sort_order,
//          published, archived (all added or confirmed)
// year = TEXT e.g. “2024” – gold title on public portfolio
// archived = soft delete, never restored
// sort_order = inline click-to-edit, swap on conflict
// ============================================================

const NAV_ITEMS = [
{ id: “dashboard”, label: “Dashboard”, icon: “⬡” },
{ id: “products”,  label: “Products”,  icon: “◈” },
{ id: “portfolio”, label: “Portfolio”, icon: “◻” },
{ id: “users”,     label: “User List”, icon: “◯” },
];

const TABS       = [“published”, “drafts”, “archived”];
const TAB_LABELS = { published: “Published”, drafts: “Drafts”, archived: “Archived” };

const EMPTY_FORM = {
photo_url: “”, year: “”, caption: “”, description: “”,
sort_order: “”, photoMode: “upload”,
};

const MOCK_PHOTOS = [
{ portfolio_photo_id: “ph-001”, created_at: “2026-01-10T14:30:00Z”, photo_url: “”, year: “2024”, caption: “Kashmir Sapphire Collection”, description: “A selection of Kashmir sapphires cut and polished in-house.”, sort_order: 1, published: true,  archived: false },
{ portfolio_photo_id: “ph-002”, created_at: “2026-01-12T09:15:00Z”, photo_url: “”, year: “2023”, caption: “Burmese Ruby · Custom Cut”,   description: “Custom recut Burmese pigeon blood ruby for a private client.”, sort_order: 2, published: true,  archived: false },
{ portfolio_photo_id: “ph-003”, created_at: “2026-01-15T11:00:00Z”, photo_url: “”, year: “2023”, caption: “Emerald Recut · Colombia”,    description: “”, sort_order: 3, published: true,  archived: false },
{ portfolio_photo_id: “ph-004”, created_at: “2026-02-01T08:00:00Z”, photo_url: “”, year: “”,     caption: “”,                          description: “”, sort_order: 4, published: false, archived: false },
{ portfolio_photo_id: “ph-005”, created_at: “2026-01-05T08:00:00Z”, photo_url: “”, year: “2022”, caption: “Old listing”,                description: “”, sort_order: 5, published: false, archived: true  },
];

function fmtDate(iso) { if (!iso) return “”; return new Date(iso).toLocaleDateString(“en-US”, { month: “short”, day: “numeric”, year: “numeric” }); }
function fmtTime(iso) { if (!iso) return “”; return new Date(iso).toLocaleTimeString(“en-US”, { hour: “2-digit”, minute: “2-digit” }); }
function genId()      { return “PPH-” + Date.now().toString(36).toUpperCase(); }

// ── CSS ───────────────────────────────────────────────────────
const css = `
@import url(‘https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,300;0,400;0,500;1,300&family=DM+Sans:wght@300;400;500&display=swap’);
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
–k0:#060606;–k1:#0d0d0d;–k2:#131313;–k3:#191919;–k4:#202020;
–ln:rgba(255,255,255,0.06);–ln2:rgba(255,255,255,0.11);
–g:#b89a2a;–gl:#cfb040;–gbg:rgba(184,154,42,0.07);
–tx:#ddd;–d1:#777;–d2:#444;–wh:#f0f0f0;–er:#b54040;
–serif:‘Cormorant’,Georgia,serif;–sans:‘DM Sans’,system-ui,sans-serif;
}
.shell{display:flex;height:100vh;background:var(–k0);font-family:var(–sans);color:var(–tx);overflow:hidden}

/* sidebar */
.sb{width:196px;flex-shrink:0;background:var(–k1);border-right:1px solid var(–ln);display:flex;flex-direction:column}
.sb-brand{padding:26px 20px 22px;border-bottom:1px solid var(–ln)}
.sb-name{font-family:var(–serif);font-size:14px;font-weight:400;color:var(–wh);letter-spacing:.07em;line-height:1.3}
.sb-role{font-size:8.5px;letter-spacing:.28em;text-transform:uppercase;color:var(–d2);margin-top:4px}
.sb-nav{flex:1;padding:10px 0}
.ni{display:flex;align-items:center;gap:10px;padding:10px 20px;font-size:10.5px;font-weight:400;letter-spacing:.14em;text-transform:uppercase;color:var(–d1);cursor:pointer;border:none;background:none;width:100%;text-align:left;transition:color .15s;position:relative}
.ni::before{content:’’;position:absolute;left:0;top:0;bottom:0;width:2px;background:var(–gl);opacity:0;transition:opacity .15s}
.ni.on{color:var(–wh)}.ni.on::before{opacity:1}.ni:hover:not(.on){color:#aaa}
.ni-ic{font-size:12px;opacity:.55}.ni.on .ni-ic{opacity:1}
.sb-foot{padding:14px 20px;border-top:1px solid var(–ln);font-size:8.5px;letter-spacing:.18em;text-transform:uppercase;color:var(–d2)}

/* main */
.main{flex:1;display:flex;flex-direction:column;overflow:hidden;background:var(–k0)}
.ph{display:flex;align-items:center;justify-content:space-between;padding:22px 32px;border-bottom:1px solid var(–ln);flex-shrink:0}
.ph-title{font-family:var(–serif);font-size:22px;font-weight:300;color:var(–wh);letter-spacing:.05em}
.ph-actions{display:flex;gap:8px;align-items:center}
.btn-add{display:flex;align-items:center;gap:7px;background:var(–gl);color:#000;border:none;padding:9px 17px;font-family:var(–sans);font-size:9.5px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;cursor:pointer;transition:background .15s}
.btn-add:hover{background:#dcc056}
.btn-sel{background:transparent;color:var(–d1);border:1px solid var(–ln2);padding:9px 17px;font-family:var(–sans);font-size:9.5px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;cursor:pointer;transition:all .15s}
.btn-sel:hover{border-color:var(–g);color:var(–gl)}
.btn-sel.on{border-color:rgba(207,176,64,.4);color:var(–gl);background:var(–gbg)}

/* bulk bar */
.bulk-bar{display:flex;align-items:center;gap:10px;padding:10px 32px;background:var(–k2);border-bottom:1px solid var(–ln);flex-shrink:0}
.bulk-count{font-size:10px;letter-spacing:.15em;text-transform:uppercase;color:var(–gl);margin-right:6px}
.bb{padding:6px 12px;font-family:var(–sans);font-size:9px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;border:1px solid var(–ln2);background:none;color:var(–d1);cursor:pointer;transition:all .15s}
.bb:hover{border-color:var(–g);color:var(–gl)}
.bb.pub{border-color:rgba(207,176,64,.25);color:var(–g)}.bb.pub:hover{background:var(–gbg)}
.bb.arc:hover{border-color:var(–er);color:#c07070}

/* tabs */
.tabs{display:flex;gap:26px;padding:0 32px;border-bottom:1px solid var(–ln);flex-shrink:0}
.tab{padding:13px 0;font-size:9.5px;font-weight:400;letter-spacing:2.7px;text-transform:uppercase;color:var(–d1);cursor:pointer;border:none;background:none;border-bottom:1px solid transparent;position:relative;top:1px;transition:color .15s}
.tab.on{color:var(–wh);border-bottom-color:var(–gl)}.tab:hover:not(.on){color:#aaa}
.tab-n{margin-left:5px;font-size:8.5px;color:var(–d2)}.tab.on .tab-n{color:var(–g)}

/* grid */
.pb{flex:1;overflow-y:auto;padding:28px 32px}
.empty{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:80px 0;color:var(–d2)}
.empty-ic{font-size:28px;opacity:.18;margin-bottom:10px}
.empty-tx{font-size:10px;letter-spacing:.22em;text-transform:uppercase}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}

/* card */
.card{position:relative;cursor:pointer;background:var(–k2);border:1px solid var(–ln)}
.card:hover{border-color:var(–ln2)}
.card.selected{border-color:rgba(207,176,64,.5);box-shadow:0 0 0 1px rgba(207,176,64,.2)}
.card-thumb{width:100%;aspect-ratio:1/1;object-fit:cover;display:block;background:var(–k3)}
.card-thumb-empty{width:100%;aspect-ratio:1/1;background:var(–k3);display:flex;align-items:center;justify-content:center;font-size:28px;opacity:.1}
.card-meta{padding:9px 10px;border-top:1px solid var(–ln)}
.card-year{font-family:var(–serif);font-size:14px;font-weight:400;color:var(–gl);letter-spacing:.04em;line-height:1.2}
.card-year.empty{color:var(–d2);font-style:italic;font-size:11px}
.card-caption{font-size:10px;color:var(–d2);letter-spacing:.04em;margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}

/* overlays */
.sort-badge{position:absolute;top:7px;left:7px;background:rgba(0,0,0,0.72);padding:3px 7px;font-size:10px;font-family:monospace;color:var(–d1);cursor:text;min-width:22px;text-align:center;transition:color .15s}
.sort-badge:hover{color:var(–gl)}
.sort-input{position:absolute;top:7px;left:7px;width:42px;background:rgba(0,0,0,0.92);border:1px solid var(–gl);color:var(–gl);font-size:10px;font-family:monospace;padding:2px 6px;outline:none;text-align:center}
.pub-dot{position:absolute;top:10px;right:10px;width:7px;height:7px;border-radius:50%}
.pub-dot.live{background:var(–gl);box-shadow:0 0 6px rgba(207,176,64,.5)}
.pub-dot.draft{background:rgba(255,255,255,.18)}
.card-check{position:absolute;top:8px;left:8px;width:16px;height:16px;accent-color:var(–gl);cursor:pointer}
.card-ra{position:absolute;bottom:52px;right:8px;display:flex;gap:5px;opacity:0;transition:opacity .15s}
.card:hover .card-ra{opacity:1}
.ab{font-size:9px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;padding:5px 10px;border:1px solid var(–ln2);background:rgba(6,6,6,0.85);color:var(–d1);cursor:pointer;transition:all .15s;font-family:var(–sans)}
.ab:hover{border-color:var(–g);color:var(–gl)}
.ab.arc:hover{border-color:var(–er);color:#c07070}

/* modal */
.ov{position:fixed;inset:0;background:rgba(0,0,0,.9);backdrop-filter:blur(8px);z-index:100;display:flex;align-items:stretch}

/* queue */
.qp{width:196px;flex-shrink:0;background:var(–k1);border-right:1px solid var(–ln);display:flex;flex-direction:column}
.qh{padding:18px 16px 13px;font-size:8.5px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:var(–d1);border-bottom:1px solid var(–ln)}
.ql{flex:1;overflow-y:auto;padding:6px}
.qi{padding:9px 11px;margin-bottom:2px;cursor:pointer;border-left:2px solid transparent;transition:all .12s}
.qi:hover{background:var(–k3)}.qi.cur{border-left-color:var(–gl);background:var(–k2)}
.qi-thumb{width:100%;aspect-ratio:1/1;object-fit:cover;background:var(–k3);margin-bottom:6px}
.qi-thumb-empty{width:100%;aspect-ratio:1/1;background:var(–k3);display:flex;align-items:center;justify-content:center;font-size:16px;opacity:.15;margin-bottom:6px}
.qi-year{font-family:var(–serif);font-size:13px;color:var(–gl)}
.qi-t{font-size:10.5px;color:var(–tx);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:1px}
.qi-id{font-size:8px;color:var(–d2);margin-top:2px;font-family:monospace}
.qi-s{font-size:7.5px;color:var(–g);margin-top:2px;letter-spacing:.1em;text-transform:uppercase}
.qadd{margin:7px;padding:8px;border:1px dashed var(–ln2);background:none;color:var(–d1);font-size:9.5px;font-family:var(–sans);letter-spacing:.12em;cursor:pointer;transition:all .15s;width:calc(100% - 14px)}
.qadd:hover:not(:disabled){border-color:var(–g);color:var(–gl)}.qadd:disabled{opacity:.22;cursor:not-allowed}

/* form */
.fp{flex:1;display:flex;flex-direction:column;background:var(–k1);overflow:hidden}
.fh{display:flex;align-items:center;justify-content:space-between;padding:16px 26px;border-bottom:1px solid var(–ln);flex-shrink:0}
.fh-title{font-family:var(–serif);font-size:19px;font-weight:300;color:var(–wh)}
.fhr{display:flex;align-items:center;gap:13px}
.sf{font-size:8.5px;letter-spacing:.18em;text-transform:uppercase;color:var(–g);opacity:0;transition:opacity .4s}.sf.on{opacity:1}
.xb{width:28px;height:28px;border:1px solid var(–ln2);background:none;color:var(–d1);font-size:15px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .15s}.xb:hover{border-color:#c07070;color:#c07070}
.fb{flex:1;overflow-y:auto;padding:22px 26px}
.fg{display:flex;flex-direction:column;gap:4px}
.fg label{font-size:8.5px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:var(–d1)}
.fg input,.fg textarea{background:var(–k2);border:1px solid var(–ln);border-top-color:var(–ln2);color:var(–tx);padding:8px 10px;font-family:var(–sans);font-size:12px;letter-spacing:.02em;outline:none;transition:border-color .15s;width:100%}
.fg input:focus,.fg textarea:focus{border-color:var(–g)}
.fg input::placeholder,.fg textarea::placeholder{color:var(–d2)}
.fg input[readonly]{opacity:.38;cursor:default;font-family:monospace;font-size:10px;letter-spacing:0}
.fg textarea{resize:vertical;min-height:80px}
.fr{display:grid;gap:12px;margin-bottom:12px}
.fr1{grid-template-columns:1fr}.fr2{grid-template-columns:1fr 1fr}.fr3{grid-template-columns:1fr 1fr 1fr}

/* photo block */
.photo-blk{background:var(–k2);border:1px solid var(–ln);padding:13px 15px;margin-bottom:12px}
.photo-l{font-size:8.5px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:var(–d1);margin-bottom:9px}
.photo-mr{display:flex;gap:0;margin-bottom:9px}
.gmb{padding:4px 11px;font-size:8.5px;font-weight:500;letter-spacing:.15em;text-transform:uppercase;border:1px solid var(–ln);background:none;color:var(–d1);cursor:pointer;margin-right:-1px;transition:all .12s;font-family:var(–sans)}
.gmb.on{background:var(–gbg);border-color:rgba(207,176,64,.35);color:var(–gl);z-index:1}
.uz{border:1px dashed var(–ln2);padding:18px;text-align:center;cursor:pointer;transition:all .15s;background:var(–k1)}
.uz:hover{border-color:var(–g)}.uz input{display:none}
.uz p{font-size:9.5px;color:var(–d1);letter-spacing:.1em}
.uz .ui{font-size:20px;opacity:.2;margin-bottom:5px}
.ufn{font-size:9.5px;color:var(–g);margin-top:5px;word-break:break-all}
.photo-preview{width:100%;aspect-ratio:1/1;object-fit:cover;background:var(–k3);margin-top:9px;border:1px solid var(–ln)}
.photo-preview-empty{width:100%;aspect-ratio:1/1;background:var(–k3);display:flex;align-items:center;justify-content:center;font-size:32px;opacity:.08;margin-top:9px;border:1px solid var(–ln)}

/* footer */
.ff{display:flex;align-items:center;justify-content:space-between;padding:13px 26px;border-top:1px solid var(–ln);flex-shrink:0;background:var(–k1)}
.ff-note{font-size:9.5px;color:var(–d2);letter-spacing:.07em}
.ffa{display:flex;gap:7px}
.bg{padding:8px 14px;font-family:var(–sans);font-size:9.5px;font-weight:500;letter-spacing:.15em;text-transform:uppercase;border:1px solid var(–ln2);background:none;color:var(–d1);cursor:pointer;transition:all .15s}
.bg:hover{border-color:var(–g);color:var(–gl)}
.bg.arc:hover{border-color:var(–er);color:#c07070}
.bn{padding:8px 14px;font-family:var(–sans);font-size:9.5px;font-weight:500;letter-spacing:.15em;text-transform:uppercase;border:1px solid rgba(207,176,64,.28);background:var(–gbg);color:var(–gl);cursor:pointer;transition:all .15s}
.bn:hover{background:var(–gl);color:#000}
.bp{padding:8px 18px;font-family:var(–sans);font-size:9.5px;font-weight:500;letter-spacing:.15em;text-transform:uppercase;border:none;background:var(–gl);color:#000;cursor:pointer;transition:background .15s}
.bp:hover{background:#dcc056}
::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:var(–ln2)}
`;

// ── Photo Section ─────────────────────────────────────────────
function PhotoSection({ value, onChange }) {
const [mode, setMode] = useState(“upload”);
const fileRef = useRef();
const [fileName, setFileName] = useState(””);

const handleFile = e => {
const f = e.target.files?.[0];
if (f) {
setFileName(f.name);
// Emergent: upload to portfolio-photos bucket, store returned path as photo_url
onChange(“photo_url”, `[uploaded] ${f.name}`);
}
};

return (
<div className="photo-blk">
<div className="photo-l">Photo</div>
<div className="photo-mr">
{[[“upload”, “Upload”], [“url”, “URL”]].map(([m, l]) => (
<button key={m} type=“button”
className={`gmb ${mode === m ? "on" : ""}`}
onClick={() => setMode(m)}>{l}</button>
))}
</div>
{mode === “upload” ? (
<div className=“uz” onClick={() => fileRef.current?.click()}>
<input ref={fileRef} type="file"
accept=".jpg,.jpeg,.png,.tiff,.tif,.dng,.heic"
onChange={handleFile} />
<div className="ui">↑</div>
<p>Click to upload photo</p>
<p style={{ fontSize: 8.5, color: “var(–d2)”, marginTop: 4, letterSpacing: “.08em” }}>
JPG · PNG · TIFF · DNG · HEIC · Max 25MB
</p>
{fileName && <div className="ufn">{fileName}</div>}
</div>
) : (
<input type=“text”
placeholder=“https://… external image URL”
value={value}
onChange={e => onChange(“photo_url”, e.target.value)}
style={{ background: “var(–k1)”, border: “1px solid var(–ln)”, color: “var(–tx)”, padding: “8px 10px”, fontFamily: “var(–sans)”, fontSize: “12px”, width: “100%”, outline: “none” }}
/>
)}
{value && !value.startsWith(”[uploaded]”) ? (
<img src={value} alt=”” className=“photo-preview”
onError={e => (e.target.style.display = “none”)} />
) : (
<div className="photo-preview-empty">◻</div>
)}
</div>
);
}

// ── Sort Badge (inline edit) ──────────────────────────────────
function SortBadge({ value, onCommit }) {
const [editing, setEditing] = useState(false);
const [draft, setDraft] = useState(String(value));
const inputRef = useRef();

const startEdit = e => {
e.stopPropagation();
setDraft(String(value));
setEditing(true);
setTimeout(() => inputRef.current?.focus(), 0);
};

const commit = () => {
const n = parseInt(draft, 10);
if (!isNaN(n) && n > 0) onCommit(n);
setEditing(false);
};

const handleKey = e => {
if (e.key === “Enter”) commit();
if (e.key === “Escape”) setEditing(false);
};

if (editing) {
return (
<input ref={inputRef} className=“sort-input”
value={draft}
onChange={e => setDraft(e.target.value)}
onBlur={commit}
onKeyDown={handleKey}
onClick={e => e.stopPropagation()} />
);
}

return (
<div className="sort-badge" onClick={startEdit} title="Click to reposition">
{value}
</div>
);
}

// ── Form Modal ────────────────────────────────────────────────
function PhotoForm({ queue, currentIndex, onCurrentChange, onClose,
onAddToQueue, onPublishAll, onSaveDrafts, onSwitchIndex,
onArchiveCurrent, isEdit }) {

const current = queue[currentIndex];
const [flash, setFlash] = useState(false);
const timer = useRef();

const upd = (f, v) => onCurrentChange({ …current, [f]: v });

useEffect(() => {
timer.current = setInterval(() => {
setFlash(true);
setTimeout(() => setFlash(false), 2000);
// Emergent: upsert current item to portfolio_photos with published = false
}, 15000);
return () => clearInterval(timer.current);
}, [current]);

return (
<div className="ov">
{/* Queue panel */}
<div className="qp">
<div className="qh">Queue ({queue.length}/10)</div>
<div className="ql">
{queue.map((item, i) => (
<div key={item.portfolio_photo_id}
className={`qi ${i === currentIndex ? "cur" : ""}`}
onClick={() => onSwitchIndex(i)}>
{item.photo_url && !item.photo_url.startsWith(”[uploaded]”) ? (
<img src={item.photo_url} alt=”” className=“qi-thumb”
onError={e => (e.target.style.display = “none”)} />
) : (
<div className="qi-thumb-empty">◻</div>
)}
<div className="qi-year">{item.year || “—”}</div>
<div className="qi-t">{item.caption || “(New Photo)”}</div>
<div className="qi-id">{item.portfolio_photo_id}</div>
<div className="qi-s">{item._saved ? “Draft saved” : “Unsaved”}</div>
</div>
))}
</div>
{!isEdit && (
<button className="qadd" onClick={onAddToQueue}
disabled={queue.length >= 10}>+ Add Another</button>
)}
</div>

```
  {/* Form panel */}
  <div className="fp">
    <div className="fh">
      <div className="fh-title">
        {current.year
          ? <span style={{ fontFamily: "var(--serif)", color: "var(--gl)" }}>{current.year}</span>
          : "New Photo"}
        {current.caption && (
          <span style={{ fontSize: 13, color: "var(--d1)", fontWeight: 300, marginLeft: 10 }}>
            {current.caption}
          </span>
        )}
        <span style={{ fontSize: 12, color: "var(--d2)", fontWeight: 300, marginLeft: 10 }}>
          {currentIndex + 1} / {queue.length}
        </span>
      </div>
      <div className="fhr">
        <span className={`sf ${flash ? "on" : ""}`}>✓ Saved</span>
        <button className="xb" onClick={onClose}>×</button>
      </div>
    </div>

    <div className="fb">
      {/* IDs */}
      <div className="fr fr3">
        <div className="fg"><label>Photo ID</label><input readOnly value={current.portfolio_photo_id} /></div>
        <div className="fg"><label>Date</label><input readOnly value={fmtDate(current.created_at)} /></div>
        <div className="fg"><label>Time</label><input readOnly value={fmtTime(current.created_at)} /></div>
      </div>

      {/* Photo upload/url */}
      <PhotoSection value={current.photo_url} onChange={upd} />

      {/* Year + Sort Order */}
      <div className="fr fr2">
        <div className="fg">
          <label>Year *</label>
          <input
            placeholder="e.g. 2024"
            maxLength={4}
            value={current.year}
            onChange={e => upd("year", e.target.value)} />
          <span style={{ fontSize: 8.5, color: "var(--d2)", marginTop: 3, letterSpacing: ".06em" }}>
            Displayed in gold below each photo on the public portfolio
          </span>
        </div>
        <div className="fg">
          <label>Sort Order</label>
          <input
            type="number"
            placeholder="Leave blank to append at end"
            value={current.sort_order}
            onChange={e => upd("sort_order", e.target.value)} />
        </div>
      </div>

      {/* Caption */}
      <div className="fr fr1">
        <div className="fg">
          <label>Caption</label>
          <input
            placeholder="e.g. Kashmir Sapphire Collection"
            value={current.caption}
            onChange={e => upd("caption", e.target.value)} />
        </div>
      </div>

      {/* Description */}
      <div className="fr fr1">
        <div className="fg">
          <label>Description</label>
          <textarea
            placeholder="Additional details about this piece or collection..."
            value={current.description}
            onChange={e => upd("description", e.target.value)} />
        </div>
      </div>
    </div>

    <div className="ff">
      <div className="ff-note">
        {queue.length > 1 ? `${queue.length} photos in queue` : "Up to 10 photos per session"}
      </div>
      <div className="ffa">
        {isEdit && (
          <button className="bg arc" onClick={onArchiveCurrent}>Archive</button>
        )}
        <button className="bg" onClick={onSaveDrafts}>
          {queue.length > 1 ? "Save Drafts" : "Save Draft"}
        </button>
        {currentIndex < queue.length - 1 && (
          <button className="bn" onClick={() => onSwitchIndex(currentIndex + 1)}>Next →</button>
        )}
        <button className="bp" onClick={onPublishAll}>
          {queue.length > 1 ? `Publish All (${queue.length})` : "Publish"}
        </button>
      </div>
    </div>
  </div>
</div>
```

);
}

// ── Page ──────────────────────────────────────────────────────
export default function AdminPortfolioPage() {
const [activeNav, setActiveNav]   = useState(“portfolio”);
const [tab, setTab]               = useState(“published”);
const [photos, setPhotos]         = useState(MOCK_PHOTOS);
const [showForm, setShowForm]     = useState(false);
const [isEdit, setIsEdit]         = useState(false);
const [queue, setQueue]           = useState([]);
const [curIdx, setCurIdx]         = useState(0);
const [selectMode, setSelectMode] = useState(false);
const [selected, setSelected]     = useState(new Set());

const filtered = {
published: photos.filter(p => p.published && !p.archived),
drafts:    photos.filter(p => !p.published && !p.archived),
archived:  photos.filter(p => p.archived),
};

// Sort swap
function handleSortCommit(photo, newOrder) {
const conflict = photos.find(p =>
p.sort_order === newOrder &&
p.portfolio_photo_id !== photo.portfolio_photo_id
);
setPhotos(prev => prev.map(p => {
if (p.portfolio_photo_id === photo.portfolio_photo_id) return { …p, sort_order: newOrder };
if (conflict && p.portfolio_photo_id === conflict.portfolio_photo_id) return { …p, sort_order: photo.sort_order };
return p;
}));
// Emergent: batch UPDATE both rows in portfolio_photos
}

// Open add
function openAdd() {
const maxOrder = photos.length > 0 ? Math.max(…photos.map(p => p.sort_order)) : 0;
const np = {
…EMPTY_FORM,
portfolio_photo_id: genId(),
created_at: new Date().toISOString(),
published: false, archived: false,
sort_order: maxOrder + 1, _saved: false,
};
setQueue([np]); setCurIdx(0); setIsEdit(false); setShowForm(true);
}

// Open edit
function openEdit(photo) {
if (selectMode) return;
setQueue([{ …photo, _saved: true }]);
setCurIdx(0); setIsEdit(true); setShowForm(true);
}

function updateCurrent(updated) {
const nq = […queue]; nq[curIdx] = updated; setQueue(nq);
}

function addToQueue() {
if (queue.length >= 10) return;
const maxOrder = photos.length > 0 ? Math.max(…photos.map(p => p.sort_order)) : 0;
const np = {
…EMPTY_FORM,
portfolio_photo_id: genId(),
created_at: new Date().toISOString(),
published: false, archived: false,
sort_order: maxOrder + queue.length + 1, _saved: false,
};
const nq = […queue, np]; setQueue(nq); setCurIdx(nq.length - 1);
}

function saveDrafts() {
if (isEdit) {
const u = { …queue[0], published: false, _saved: true };
setPhotos(prev => prev.map(p => p.portfolio_photo_id === u.portfolio_photo_id ? u : p));
} else {
const newPhotos = queue.map(q => ({ …q, published: false, _saved: true }));
const ids = new Set(newPhotos.map(p => p.portfolio_photo_id));
setPhotos(prev => […prev.filter(p => !ids.has(p.portfolio_photo_id)), …newPhotos]);
}
setShowForm(false);
// Emergent: upsert all to portfolio_photos with published = false
}

function publishAll() {
if (isEdit) {
const u = { …queue[0], published: true };
setPhotos(prev => prev.map(p => p.portfolio_photo_id === u.portfolio_photo_id ? u : p));
} else {
const newPhotos = queue.map(q => ({ …q, published: true }));
const ids = new Set(newPhotos.map(p => p.portfolio_photo_id));
setPhotos(prev => […prev.filter(p => !ids.has(p.portfolio_photo_id)), …newPhotos]);
}
setShowForm(false); setTab(“published”);
// Emergent: upsert all to portfolio_photos with published = true
}

function archiveOne(id) {
setPhotos(prev => prev.map(p =>
p.portfolio_photo_id === id ? { …p, archived: true, published: false } : p
));
setShowForm(false);
// Emergent: UPDATE portfolio_photos SET archived=true, published=false WHERE id=id
}

function toggleSelect(id, e) {
e.stopPropagation();
setSelected(prev => {
const next = new Set(prev);
next.has(id) ? next.delete(id) : next.add(id);
return next;
});
}

function bulkPublish()   { setPhotos(prev => prev.map(p => selected.has(p.portfolio_photo_id) ? { …p, published: true } : p)); setSelected(new Set()); setSelectMode(false); }
function bulkUnpublish() { setPhotos(prev => prev.map(p => selected.has(p.portfolio_photo_id) ? { …p, published: false } : p)); setSelected(new Set()); setSelectMode(false); }
function bulkArchive()   { setPhotos(prev => prev.map(p => selected.has(p.portfolio_photo_id) ? { …p, archived: true, published: false } : p)); setSelected(new Set()); setSelectMode(false); }

const currentTabPhotos = […filtered[tab]].sort((a, b) => a.sort_order - b.sort_order);

return (
<>
<style>{css}</style>
<div className="shell">

```
    {/* Sidebar */}
    <div className="sb">
      <div className="sb-brand">
        <div className="sb-name">Cutting Corners<br />Gems</div>
        <div className="sb-role">Admin</div>
      </div>
      <nav className="sb-nav">
        {NAV_ITEMS.map(item => (
          <button key={item.id}
            className={`ni ${activeNav === item.id ? "on" : ""}`}
            onClick={() => setActiveNav(item.id)}>
            <span className="ni-ic">{item.icon}</span>{item.label}
          </button>
        ))}
      </nav>
      <div className="sb-foot">CCG · Admin v5</div>
    </div>

    {/* Main */}
    <div className="main">

      {/* Header */}
      <div className="ph">
        <div className="ph-title">Portfolio</div>
        <div className="ph-actions">
          <button
            className={`btn-sel ${selectMode ? "on" : ""}`}
            onClick={() => { setSelectMode(s => !s); setSelected(new Set()); }}>
            {selectMode ? "Cancel" : "Select"}
          </button>
          <button className="btn-add" onClick={openAdd}>+ Add Photos</button>
        </div>
      </div>

      {/* Bulk bar */}
      {selectMode && selected.size > 0 && (
        <div className="bulk-bar">
          <span className="bulk-count">{selected.size} selected</span>
          <button className="bb pub" onClick={bulkPublish}>Publish</button>
          <button className="bb" onClick={bulkUnpublish}>Unpublish</button>
          <button className="bb arc" onClick={bulkArchive}>Archive</button>
        </div>
      )}

      {/* Tabs */}
      <div className="tabs">
        {TABS.map(t => (
          <button key={t} className={`tab ${tab === t ? "on" : ""}`} onClick={() => setTab(t)}>
            {TAB_LABELS[t]}<span className="tab-n">{filtered[t].length}</span>
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="pb">
        {currentTabPhotos.length === 0 ? (
          <div className="empty">
            <div className="empty-ic">◻</div>
            <div className="empty-tx">No {TAB_LABELS[tab].toLowerCase()} photos</div>
          </div>
        ) : (
          <div className="grid">
            {currentTabPhotos.map(photo => (
              <div key={photo.portfolio_photo_id}
                className={`card ${selected.has(photo.portfolio_photo_id) ? "selected" : ""}`}
                onClick={() => openEdit(photo)}>

                {/* Thumbnail */}
                {photo.photo_url && !photo.photo_url.startsWith("[uploaded]") ? (
                  <img src={photo.photo_url} alt={photo.caption || ""}
                    className="card-thumb"
                    onError={e => (e.target.style.display = "none")} />
                ) : (
                  <div className="card-thumb-empty">◻</div>
                )}

                {/* Sort or checkbox */}
                {selectMode ? (
                  <input type="checkbox" className="card-check"
                    checked={selected.has(photo.portfolio_photo_id)}
                    onChange={e => toggleSelect(photo.portfolio_photo_id, e)}
                    onClick={e => e.stopPropagation()} />
                ) : tab !== "archived" && (
                  <SortBadge value={photo.sort_order}
                    onCommit={n => handleSortCommit(photo, n)} />
                )}

                {/* Published dot */}
                <div className={`pub-dot ${photo.published ? "live" : "draft"}`} />

                {/* Hover actions */}
                {tab !== "archived" && !selectMode && (
                  <div className="card-ra" onClick={e => e.stopPropagation()}>
                    <button className="ab" onClick={() => openEdit(photo)}>Edit</button>
                    <button className="ab arc"
                      onClick={() => archiveOne(photo.portfolio_photo_id)}>Archive</button>
                  </div>
                )}

                {/* Meta — year (gold) + caption */}
                <div className="card-meta">
                  <div className={`card-year ${!photo.year ? "empty" : ""}`}>
                    {photo.year || "No year"}
                  </div>
                  {photo.caption && (
                    <div className="card-caption">{photo.caption}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>

    {/* Modal */}
    {showForm && (
      <PhotoForm
        queue={queue}
        currentIndex={curIdx}
        onCurrentChange={updateCurrent}
        onClose={() => setShowForm(false)}
        onAddToQueue={addToQueue}
        onPublishAll={publishAll}
        onSaveDrafts={saveDrafts}
        onSwitchIndex={setCurIdx}
        onArchiveCurrent={() => archiveOne(queue[curIdx].portfolio_photo_id)}
        isEdit={isEdit}
      />
    )}
  </div>
</>
```

);
}
