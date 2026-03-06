module.exports = [
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/react-dom [external] (react-dom, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("react-dom", () => require("react-dom"));

module.exports = mod;
}),
"[project]/lib/supabase.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "createServiceClient",
    ()=>createServiceClient,
    "supabase",
    ()=>supabase
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$supabase$2f$supabase$2d$js__$5b$external$5d$__$2840$supabase$2f$supabase$2d$js$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$29$__ = __turbopack_context__.i("[externals]/@supabase/supabase-js [external] (@supabase/supabase-js, esm_import, [project]/node_modules/@supabase/supabase-js)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f40$supabase$2f$supabase$2d$js__$5b$external$5d$__$2840$supabase$2f$supabase$2d$js$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f40$supabase$2f$supabase$2d$js__$5b$external$5d$__$2840$supabase$2f$supabase$2d$js$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
const supabase = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$supabase$2f$supabase$2d$js__$5b$external$5d$__$2840$supabase$2f$supabase$2d$js$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$29$__["createClient"])(("TURBOPACK compile-time value", "https://jvbkcihypbjlnffsbohd.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2YmtjaWh5cGJqbG5mZnNib2hkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3MjkwMDMsImV4cCI6MjA4NzMwNTAwM30.ks3k6udociWxERV6LuDkZB_MOUbXyCxHyek2qtUHpfM"));
function createServiceClient() {
    return (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$supabase$2f$supabase$2d$js__$5b$external$5d$__$2840$supabase$2f$supabase$2d$js$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$29$__["createClient"])(("TURBOPACK compile-time value", "https://jvbkcihypbjlnffsbohd.supabase.co"), process.env.SUPABASE_SERVICE_ROLE_KEY, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    });
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/components/admin/AdminLayout.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "adminCss",
    ()=>adminCss,
    "default",
    ()=>AdminLayout
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase.ts [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
const NAV_ITEMS = [
    {
        id: 'dashboard',
        label: 'Dashboard',
        icon: '⬡',
        route: '/admin/dashboard'
    },
    {
        id: 'products',
        label: 'Products',
        icon: '◈',
        route: '/admin/products'
    },
    {
        id: 'portfolio',
        label: 'Portfolio',
        icon: '◻',
        route: '/admin/portfolio'
    },
    {
        id: 'users',
        label: 'User List',
        icon: '◯',
        route: '/admin/users'
    }
];
const adminCss = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,300;0,400;0,500;1,300&family=DM+Sans:wght@300;400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --k0:#060606;--k1:#0d0d0d;--k2:#131313;--k3:#191919;--k4:#202020;
  --ln:rgba(255,255,255,0.06);--ln2:rgba(255,255,255,0.11);
  --g:#b89a2a;--gl:#cfb040;--gbg:rgba(184,154,42,0.07);
  --tx:#ddd;--d1:#777;--d2:#444;--wh:#f0f0f0;--er:#b54040;
  --serif:'Cormorant',Georgia,serif;--sans:'DM Sans',system-ui,sans-serif;
}
.shell{display:flex;height:100vh;background:var(--k0);font-family:var(--sans);color:var(--tx);overflow:hidden}
.sb{width:220px;flex-shrink:0;background:var(--k1);border-right:1px solid var(--ln);display:flex;flex-direction:column}
.sb-brand{padding:30px 24px 26px;border-bottom:1px solid var(--ln)}
.sb-name{font-family:var(--serif);font-size:18px;font-weight:400;color:var(--wh);letter-spacing:.07em;line-height:1.3}
.sb-role{font-size:9px;letter-spacing:.28em;text-transform:uppercase;color:var(--d2);margin-top:6px}
.sb-nav{flex:1;padding:12px 0}
.ni{display:flex;align-items:center;gap:12px;padding:14px 24px;font-size:13px;font-weight:400;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,255,255,0.45);cursor:pointer;border:none;background:none;width:100%;text-align:left;transition:color .15s;position:relative;font-family:var(--sans)}
.ni::before{content:'';position:absolute;left:0;top:0;bottom:0;width:2px;background:var(--gl);opacity:0;transition:opacity .15s}
.ni.on{color:#d4af37}.ni.on::before{opacity:1}.ni:hover:not(.on){color:#aaa}
.ni-ic{display:none}
.ni-bell{position:relative;margin-left:auto}
.ni-badge{position:absolute;top:-6px;right:-8px;background:var(--gl);color:#000;font-size:7.5px;font-weight:700;min-width:14px;height:14px;border-radius:50%;display:flex;align-items:center;justify-content:center;padding:0 3px}
.sb-foot{padding:16px 24px;border-top:1px solid var(--ln);font-size:9px;letter-spacing:.18em;text-transform:uppercase;color:var(--d2);cursor:pointer;transition:color .15s}
.sb-foot:hover{color:var(--er)}
.main{flex:1;display:flex;flex-direction:column;overflow:hidden;background:var(--k0)}
.ph{display:flex;align-items:center;justify-content:space-between;padding:28px 40px;border-bottom:1px solid var(--ln);flex-shrink:0}
.ph-title{font-family:var(--serif);font-size:26px;font-weight:300;color:var(--wh);letter-spacing:.05em}
.ph-right{display:flex;align-items:center;gap:14px}
.ph-actions{display:flex;gap:8px;align-items:center}
.err-bar{font-size:9.5px;color:var(--er);letter-spacing:.08em;padding:6px 12px;border:1px solid rgba(181,64,64,.25);background:rgba(181,64,64,.07)}
.btn-add{display:flex;align-items:center;gap:8px;background:var(--gl);color:#000;border:none;padding:11px 20px;font-family:var(--sans);font-size:12px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;cursor:pointer;transition:background .15s}
.btn-add:hover:not(:disabled){background:#dcc056}.btn-add:disabled{opacity:.4;cursor:not-allowed}
.btn-sel{background:transparent;color:var(--d1);border:1px solid var(--ln2);padding:11px 20px;font-family:var(--sans);font-size:12px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;cursor:pointer;transition:all .15s}
.btn-sel:hover{border-color:var(--g);color:var(--gl)}
.btn-sel.on{border-color:rgba(207,176,64,.4);color:var(--gl);background:var(--gbg)}
.tabs{display:flex;gap:28px;padding:0 40px;border-bottom:1px solid var(--ln);flex-shrink:0}
.tab{padding:15px 0;font-size:14px;font-weight:400;letter-spacing:2.7px;text-transform:uppercase;color:var(--d1);cursor:pointer;border:none;background:none;border-bottom:1px solid transparent;position:relative;top:1px;transition:color .15s;font-family:var(--sans)}
.tab.on{color:var(--wh);border-bottom-color:var(--gl)}.tab:hover:not(.on){color:#aaa}
.tab-n{margin-left:6px;font-size:11px;color:var(--d2)}.tab.on .tab-n{color:var(--g)}
.pb{flex:1;overflow-y:auto;padding:0 40px}
.loading{display:flex;align-items:center;justify-content:center;padding:80px 0;font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:var(--d2)}
.empty{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:80px 0;color:var(--d2)}
.empty-ic{font-size:28px;opacity:.18;margin-bottom:10px}
.empty-tx{font-size:10px;letter-spacing:.22em;text-transform:uppercase}
.tbl{width:100%;border-collapse:collapse}
.tbl thead tr{border-bottom:1px solid var(--ln)}
.tbl th{font-size:11px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:var(--d2);padding:16px 0 12px;text-align:left}
.tbl th:last-child{text-align:right}
.tbl tbody tr{border-bottom:1px solid var(--ln);transition:background .1s;cursor:pointer}
.tbl tbody tr:hover{background:var(--k2)}
.tbl td{padding:16px 0;font-size:13px;color:var(--tx);vertical-align:middle}
.tbl td:last-child{text-align:right}
.td-name{font-family:var(--serif);font-size:17px;font-weight:400;color:var(--wh)}
.td-sub{font-size:13px;color:var(--d1);letter-spacing:.07em;margin-top:2px}
.td-price{font-family:var(--serif);font-size:17px;color:var(--gl)}
.pill{display:inline-block;font-size:9px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;padding:4px 9px}
.pill-A{background:rgba(207,176,64,.09);color:var(--gl)}
.pill-D{background:rgba(255,255,255,.04);color:var(--d1)}
.pill-I{background:rgba(181,64,64,.1);color:#c07070}
.ra{display:flex;align-items:center;justify-content:flex-end;gap:6px;opacity:0;transition:opacity .15s}
.tbl tbody tr:hover .ra{opacity:1}
.ab{font-size:11px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;padding:6px 12px;border:1px solid var(--ln2);background:none;color:var(--d1);cursor:pointer;transition:all .15s;font-family:var(--sans)}
.ab:hover{border-color:var(--g);color:var(--gl)}
.ab.pub{border-color:rgba(207,176,64,.25);color:var(--g)}.ab.pub:hover{background:var(--gbg)}
.ab.rem:hover{border-color:var(--er);color:#c07070}
.ab.arc:hover{border-color:var(--er);color:#c07070}
.ov{position:fixed;inset:0;background:rgba(0,0,0,.9);backdrop-filter:blur(8px);z-index:100;display:flex;align-items:stretch}
.qp{width:220px;flex-shrink:0;background:var(--k1);border-right:1px solid var(--ln);display:flex;flex-direction:column}
.qh{padding:20px 18px 15px;font-size:10px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:var(--d1);border-bottom:1px solid var(--ln)}
.ql{flex:1;overflow-y:auto;padding:8px}
.qi{padding:14px 16px;margin-bottom:2px;cursor:pointer;border-left:2px solid transparent;transition:all .12s}
.qi:hover{background:var(--k3)}.qi.cur{border-left-color:var(--gl);background:var(--k2)}
.qi-t{font-size:13px;color:var(--tx);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.qi-id{font-size:9.5px;color:var(--d2);margin-top:3px;font-family:monospace;letter-spacing:0}
.qi-s{font-size:8.5px;color:var(--g);margin-top:3px;letter-spacing:.1em;text-transform:uppercase}
.qi-year{font-family:var(--serif);font-size:13px;color:var(--gl)}
.qi-thumb{width:100%;aspect-ratio:1/1;object-fit:cover;background:var(--k3);margin-bottom:6px}
.qi-thumb-empty{width:100%;aspect-ratio:1/1;background:var(--k3);display:flex;align-items:center;justify-content:center;font-size:16px;opacity:.15;margin-bottom:6px}
.qadd{margin:7px;padding:8px;border:1px dashed var(--ln2);background:none;color:var(--d1);font-size:9.5px;font-family:var(--sans);letter-spacing:.12em;cursor:pointer;transition:all .15s;width:calc(100% - 14px)}
.qadd:hover:not(:disabled){border-color:var(--g);color:var(--gl)}.qadd:disabled{opacity:.22;cursor:not-allowed}
.fp{flex:1;display:flex;flex-direction:column;background:var(--k1);overflow:hidden}
.fh{display:flex;align-items:center;justify-content:space-between;padding:20px 30px;border-bottom:1px solid var(--ln);flex-shrink:0}
.fh-title{font-family:var(--serif);font-size:22px;font-weight:300;color:var(--wh)}
.fhr{display:flex;align-items:center;gap:13px}
.sf{font-size:8.5px;letter-spacing:.18em;text-transform:uppercase;color:var(--g);opacity:0;transition:opacity .4s}.sf.on{opacity:1}
.xb{width:28px;height:28px;border:1px solid var(--ln2);background:none;color:var(--d1);font-size:15px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .15s}.xb:hover{border-color:#c07070;color:#c07070}
.fb{flex:1;overflow-y:auto;padding:26px 30px}
.fg{display:flex;flex-direction:column;gap:5px}
.fg label{font-size:11px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:var(--d1)}
.fg input,.fg textarea{background:var(--k2);border:1px solid var(--ln);border-top-color:var(--ln2);color:var(--tx);padding:10px 12px;font-family:var(--sans);font-size:14px;letter-spacing:.02em;outline:none;transition:border-color .15s;width:100%;height:38px}
.fg input:focus,.fg textarea:focus{border-color:var(--g)}
.fg input::placeholder,.fg textarea::placeholder{color:var(--d2)}
.fg input[readonly]{opacity:.38;cursor:default;font-family:monospace;font-size:10px;letter-spacing:0}
.fg textarea{resize:vertical;min-height:80px;height:auto}
.fr{display:grid;gap:14px;margin-bottom:14px}
.fr1{grid-template-columns:1fr}.fr2{grid-template-columns:1fr 1fr}.fr3{grid-template-columns:1fr 1fr 1fr}
.gia-blk{background:var(--k2);border:1px solid var(--ln);padding:16px 18px;margin-bottom:14px}
.gia-l{font-size:11px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:var(--d1);margin-bottom:10px}
.gia-mr{display:flex;gap:0;margin-bottom:10px}
.gmb{padding:5px 13px;font-size:9.5px;font-weight:500;letter-spacing:.15em;text-transform:uppercase;border:1px solid var(--ln);background:none;color:var(--d1);cursor:pointer;margin-right:-1px;transition:all .12s;font-family:var(--sans)}
.gmb.on{background:var(--gbg);border-color:rgba(207,176,64,.35);color:var(--gl);z-index:1}
.uz{border:1px dashed var(--ln2);padding:18px;text-align:center;cursor:pointer;transition:all .15s;background:var(--k1)}
.uz:hover{border-color:var(--g)}.uz input{display:none}
.uz p{font-size:9.5px;color:var(--d1);letter-spacing:.1em}
.uz .ui{font-size:20px;opacity:.2;margin-bottom:5px}
.ufn{font-size:9.5px;color:var(--g);margin-top:5px;word-break:break-all}
.ff{display:flex;align-items:center;justify-content:space-between;padding:16px 30px;border-top:1px solid var(--ln);flex-shrink:0;background:var(--k1)}
.ff-note{font-size:10.5px;color:var(--d2);letter-spacing:.07em}
.ffa{display:flex;gap:7px}
.bg{padding:10px 16px;font-family:var(--sans);font-size:12px;font-weight:500;letter-spacing:.15em;text-transform:uppercase;border:1px solid var(--ln2);background:none;color:var(--d1);cursor:pointer;transition:all .15s}
.bg:hover:not(:disabled){border-color:var(--g);color:var(--gl)}.bg:disabled{opacity:.4;cursor:not-allowed}
.bg.arc:hover{border-color:var(--er);color:#c07070}
.bn{padding:10px 16px;font-family:var(--sans);font-size:12px;font-weight:500;letter-spacing:.15em;text-transform:uppercase;border:1px solid rgba(207,176,64,.28);background:var(--gbg);color:var(--gl);cursor:pointer;transition:all .15s}
.bn:hover{background:var(--gl);color:#000}
.bp{padding:10px 20px;font-family:var(--sans);font-size:12px;font-weight:500;letter-spacing:.15em;text-transform:uppercase;border:none;background:var(--gl);color:#000;cursor:pointer;transition:background .15s}
.bp:hover:not(:disabled){background:#dcc056}.bp:disabled{opacity:.4;cursor:not-allowed}
.photo-blk{background:var(--k2);border:1px solid var(--ln);padding:16px 18px;margin-bottom:14px}
.photo-l{font-size:11px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:var(--d1);margin-bottom:10px}
.photo-mr{display:flex;gap:0;margin-bottom:10px}
.photo-preview{width:100%;aspect-ratio:1/1;object-fit:cover;background:var(--k3);margin-top:9px;border:1px solid var(--ln)}
.photo-preview-empty{width:100%;aspect-ratio:1/1;background:var(--k3);display:flex;align-items:center;justify-content:center;font-size:32px;opacity:.08;margin-top:9px;border:1px solid var(--ln)}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.card{position:relative;cursor:pointer;background:var(--k2);border:1px solid var(--ln)}.card:hover{border-color:var(--ln2)}
.card.selected{border-color:rgba(207,176,64,.5);box-shadow:0 0 0 1px rgba(207,176,64,.2)}
.card-thumb{width:100%;aspect-ratio:1/1;object-fit:cover;display:block;background:var(--k3)}
.card-thumb-empty{width:100%;aspect-ratio:1/1;background:var(--k3);display:flex;align-items:center;justify-content:center;font-size:28px;opacity:.1}
.card-meta{padding:12px 14px;border-top:1px solid var(--ln)}
.card-year{font-family:var(--serif);font-size:17px;font-weight:400;color:var(--gl);letter-spacing:.04em;line-height:1.2}
.card-year.empty{color:var(--d2);font-style:italic;font-size:13px}
.card-caption{font-size:13px;color:var(--d2);letter-spacing:.04em;margin-top:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.sort-badge{position:absolute;top:7px;left:7px;background:rgba(0,0,0,0.72);padding:3px 7px;font-size:10px;font-family:monospace;color:var(--d1);cursor:text;min-width:22px;text-align:center;transition:color .15s}
.sort-badge:hover{color:var(--gl)}
.sort-input{position:absolute;top:7px;left:7px;width:42px;background:rgba(0,0,0,0.92);border:1px solid var(--gl);color:var(--gl);font-size:10px;font-family:monospace;padding:2px 6px;outline:none;text-align:center}
.pub-dot{position:absolute;top:10px;right:10px;width:7px;height:7px;border-radius:50%}
.pub-dot.live{background:var(--gl);box-shadow:0 0 6px rgba(207,176,64,.5)}
.pub-dot.draft{background:rgba(255,255,255,.18)}
.card-check{position:absolute;top:8px;left:8px;width:16px;height:16px;accent-color:var(--gl);cursor:pointer}
.card-ra{position:absolute;bottom:52px;right:8px;display:flex;gap:5px;opacity:0;transition:opacity .15s}
.card:hover .card-ra{opacity:1}
.bulk-bar{display:flex;align-items:center;gap:10px;padding:10px 32px;background:var(--k2);border-bottom:1px solid var(--ln);flex-shrink:0}
.bulk-count{font-size:10px;letter-spacing:.15em;text-transform:uppercase;color:var(--gl);margin-right:6px}
.bb{padding:6px 12px;font-family:var(--sans);font-size:9px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;border:1px solid var(--ln2);background:none;color:var(--d1);cursor:pointer;transition:all .15s}
.bb:hover{border-color:var(--g);color:var(--gl)}
.bb.pub{border-color:rgba(207,176,64,.25);color:var(--g)}.bb.pub:hover{background:var(--gbg)}
.bb.arc:hover{border-color:var(--er);color:#c07070}
.stat-card{background:var(--k1);border:1px solid var(--ln);padding:28px;min-height:100px}
.stat-val{font-family:var(--serif);font-size:32px;color:var(--gl);letter-spacing:.03em}
.stat-label{font-size:11px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,0.45);margin-top:6px}
.notif-row{display:flex;align-items:center;gap:12px;padding:14px 0;border-bottom:1px solid var(--ln);cursor:pointer;transition:background .1s}
.notif-row:hover{background:var(--k2)}
.notif-dot{width:7px;height:7px;border-radius:50%;background:var(--gl);flex-shrink:0}
.notif-icon{font-size:16px;opacity:.5;flex-shrink:0;width:22px;text-align:center}
.notif-body{flex:1;min-width:0}
.notif-msg{font-size:14px;color:var(--tx);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.notif-meta{font-size:11px;color:var(--d1);margin-top:3px}
.notif-time{font-size:10px;color:var(--d2);flex-shrink:0}
::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:var(--ln2)}

/* ── Mobile Top Bar + Hamburger ── */
.mob-topbar{display:none}
.mob-dropdown{display:none}

@media(max-width:767px){
  .sb{display:none!important}
  .shell{flex-direction:column}
  .main{margin-left:0}

  .mob-topbar{
    display:flex;align-items:center;justify-content:space-between;
    position:fixed;top:0;left:0;right:0;z-index:90;
    height:52px;padding:0 16px;
    background:#0a0a0a;border-bottom:1px solid rgba(255,255,255,0.06)
  }
  .mob-brand{font-family:var(--serif);font-size:15px;color:#d4af37;letter-spacing:.05em}
  .mob-burger{
    display:flex;flex-direction:column;justify-content:center;gap:5px;
    width:28px;height:28px;background:none;cursor:pointer;padding:5px;
    border:0.5px solid rgba(255,255,255,0.15);transition:border-color .2s
  }
  .mob-burger:hover{border-color:rgba(212,175,55,0.5)}
  .mob-burger .mb{width:100%;height:1px;background:rgba(255,255,255,0.7);transition:all .25s ease;transform-origin:center}
  .mob-burger.open .mb:nth-child(1){transform:translateY(6px) rotate(45deg)}
  .mob-burger.open .mb:nth-child(2){opacity:0;transform:scaleX(0)}
  .mob-burger.open .mb:nth-child(3){transform:translateY(-6px) rotate(-45deg)}

  .mob-dropdown{
    position:fixed;top:52px;left:0;right:0;z-index:89;
    background:rgba(8,8,8,0.97);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);
    border-bottom:1px solid rgba(255,255,255,0.06);
    flex-direction:column;
    transform:translateY(-8px);opacity:0;pointer-events:none;
    transition:opacity .22s ease,transform .22s ease
  }
  .mob-dropdown.open{display:flex;opacity:1;transform:translateY(0);pointer-events:auto}
  .mob-dropdown-item{
    display:block;
    font-family:var(--sans);font-size:11px;font-weight:500;
    letter-spacing:.22em;text-transform:uppercase;
    color:rgba(255,255,255,0.55);text-decoration:none;
    padding:15px 20px;
    border-bottom:1px solid rgba(255,255,255,0.05);
    transition:color .15s;cursor:pointer;background:none;border-left:none;border-right:none;border-top:none;
    width:100%;text-align:left
  }
  .mob-dropdown-item:last-child{border-bottom:none}
  .mob-dropdown-item:hover{color:#fff}
  .mob-dropdown-item.on{color:#d4af37}
  .mob-dropdown-signout{
    display:block;width:100%;text-align:left;
    font-family:var(--sans);font-size:10px;font-weight:400;
    letter-spacing:.18em;text-transform:uppercase;
    color:var(--d2);background:none;border:none;
    padding:14px 20px;cursor:pointer;transition:color .15s;
    border-top:1px solid rgba(255,255,255,0.05)
  }
  .mob-dropdown-signout:hover{color:var(--er)}

  .main{padding-top:52px;height:calc(100vh - 0px)}
  .ph{padding:16px 16px}
  .tabs{padding:0 16px;overflow-x:auto;flex-wrap:nowrap;white-space:nowrap}
  .pb{padding:0 16px}

  /* Form overlay: full screen, no queue panel */
  .ov{flex-direction:column}
  .qp{display:none}
  .fp{width:100%}
  .fh{padding:14px 16px}
  .fb{padding:16px}
  .ff{padding:12px 16px}
  .fr2,.fr3{grid-template-columns:1fr}

  /* Card grid: single column */
  .grid{grid-template-columns:1fr}

  /* Table: horizontal scroll */
  .tbl{display:block;overflow-x:auto}
  .ra{opacity:1}

  /* Dashboard: stack columns */
  .dash-grid{grid-template-columns:1fr!important}
}
`;
function AdminLayout({ children, activeNav }) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [checking, setChecking] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(true);
    const [bellCount, setBellCount] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(0);
    const [mobileMenuOpen, setMobileMenuOpen] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const menuRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    // Auth guard
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        async function check() {
            const { data: { session } } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.getSession();
            if (!session) {
                router.replace('/admin/login');
                return;
            }
            const { data: adminCheck } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].from('admin_users').select('admin_user_id').eq('admin_user_id', session.user.id).single();
            if (!adminCheck) {
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.signOut();
                router.replace('/admin/login');
                return;
            }
            setChecking(false);
            // Load unread notification count (stubbed — will be wired later)
            // TODO: Wire notification bell count from admin_notifications
            setBellCount(0);
        }
        check();
    }, [
        router
    ]);
    // Close mobile menu on outside click
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (!mobileMenuOpen) return;
        const close = (e)=>{
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMobileMenuOpen(false);
            }
        };
        document.addEventListener('click', close);
        return ()=>document.removeEventListener('click', close);
    }, [
        mobileMenuOpen
    ]);
    const handleSignOut = async ()=>{
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.signOut();
        router.push('/admin/login');
    };
    const handleMobileNav = (route)=>{
        setMobileMenuOpen(false);
        router.push(route);
    };
    if (checking) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        style: {
            background: '#060606',
            height: '100vh'
        }
    }, void 0, false, {
        fileName: "[project]/components/admin/AdminLayout.tsx",
        lineNumber: 314,
        columnNumber: 24
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("style", {
                children: adminCss
            }, void 0, false, {
                fileName: "[project]/components/admin/AdminLayout.tsx",
                lineNumber: 318,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "mob-topbar",
                ref: menuRef,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                        className: "mob-brand",
                        children: "CCG"
                    }, void 0, false, {
                        fileName: "[project]/components/admin/AdminLayout.tsx",
                        lineNumber: 322,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        className: `mob-burger${mobileMenuOpen ? ' open' : ''}`,
                        onClick: (e)=>{
                            e.stopPropagation();
                            setMobileMenuOpen((p)=>!p);
                        },
                        "aria-label": "Toggle admin menu",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                className: "mb"
                            }, void 0, false, {
                                fileName: "[project]/components/admin/AdminLayout.tsx",
                                lineNumber: 328,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                className: "mb"
                            }, void 0, false, {
                                fileName: "[project]/components/admin/AdminLayout.tsx",
                                lineNumber: 329,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                className: "mb"
                            }, void 0, false, {
                                fileName: "[project]/components/admin/AdminLayout.tsx",
                                lineNumber: 330,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/admin/AdminLayout.tsx",
                        lineNumber: 323,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/admin/AdminLayout.tsx",
                lineNumber: 321,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: `mob-dropdown${mobileMenuOpen ? ' open' : ''}`,
                children: [
                    NAV_ITEMS.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                            className: `mob-dropdown-item${activeNav === item.id ? ' on' : ''}`,
                            onClick: ()=>handleMobileNav(item.route),
                            children: item.label
                        }, item.id, false, {
                            fileName: "[project]/components/admin/AdminLayout.tsx",
                            lineNumber: 337,
                            columnNumber: 11
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        className: "mob-dropdown-signout",
                        onClick: handleSignOut,
                        children: "Sign Out"
                    }, void 0, false, {
                        fileName: "[project]/components/admin/AdminLayout.tsx",
                        lineNumber: 345,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/admin/AdminLayout.tsx",
                lineNumber: 335,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "shell",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "sb",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "sb-brand",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "sb-name",
                                        children: [
                                            "Cutting Corners",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                fileName: "[project]/components/admin/AdminLayout.tsx",
                                                lineNumber: 352,
                                                columnNumber: 53
                                            }, this),
                                            "Gems"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/admin/AdminLayout.tsx",
                                        lineNumber: 352,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "sb-role",
                                        children: "Admin"
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/AdminLayout.tsx",
                                        lineNumber: 353,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/admin/AdminLayout.tsx",
                                lineNumber: 351,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("nav", {
                                className: "sb-nav",
                                children: NAV_ITEMS.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        className: `ni ${activeNav === item.id ? 'on' : ''}`,
                                        onClick: ()=>router.push(item.route),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                className: "ni-ic",
                                                children: item.icon
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/AdminLayout.tsx",
                                                lineNumber: 362,
                                                columnNumber: 17
                                            }, this),
                                            item.label,
                                            item.id === 'dashboard' && bellCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                className: "ni-bell",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                    className: "ni-badge",
                                                    children: bellCount > 9 ? '9+' : bellCount
                                                }, void 0, false, {
                                                    fileName: "[project]/components/admin/AdminLayout.tsx",
                                                    lineNumber: 366,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/AdminLayout.tsx",
                                                lineNumber: 365,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, item.id, true, {
                                        fileName: "[project]/components/admin/AdminLayout.tsx",
                                        lineNumber: 357,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/admin/AdminLayout.tsx",
                                lineNumber: 355,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "sb-foot",
                                onClick: handleSignOut,
                                children: "Sign Out"
                            }, void 0, false, {
                                fileName: "[project]/components/admin/AdminLayout.tsx",
                                lineNumber: 372,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/admin/AdminLayout.tsx",
                        lineNumber: 350,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "main",
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/components/admin/AdminLayout.tsx",
                        lineNumber: 374,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/admin/AdminLayout.tsx",
                lineNumber: 348,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/lib/utils.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "cn",
    ()=>cn,
    "fmtDate",
    ()=>fmtDate,
    "fmtTime",
    ()=>fmtTime,
    "formatMoney",
    ()=>formatMoney,
    "relativeTime",
    ()=>relativeTime
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$clsx__$5b$external$5d$__$28$clsx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$clsx$29$__ = __turbopack_context__.i("[externals]/clsx [external] (clsx, esm_import, [project]/node_modules/clsx)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$tailwind$2d$merge__$5b$external$5d$__$28$tailwind$2d$merge$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$29$__ = __turbopack_context__.i("[externals]/tailwind-merge [external] (tailwind-merge, esm_import, [project]/node_modules/tailwind-merge)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$clsx__$5b$external$5d$__$28$clsx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$clsx$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$tailwind$2d$merge__$5b$external$5d$__$28$tailwind$2d$merge$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$clsx__$5b$external$5d$__$28$clsx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$clsx$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$tailwind$2d$merge__$5b$external$5d$__$28$tailwind$2d$merge$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$externals$5d2f$tailwind$2d$merge__$5b$external$5d$__$28$tailwind$2d$merge$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$externals$5d2f$clsx__$5b$external$5d$__$28$clsx$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$clsx$29$__["clsx"])(inputs));
}
function formatMoney(value) {
    if (value == null || isNaN(Number(value))) return '$0';
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    }).format(Number(value));
}
function fmtDate(timestamp) {
    if (!timestamp) return '—';
    const d = new Date(timestamp);
    return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}
function fmtTime(timestamp) {
    if (!timestamp) return '—';
    const d = new Date(timestamp);
    return d.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
}
function relativeTime(timestamp) {
    if (!timestamp) return '';
    const now = Date.now();
    const then = new Date(timestamp).getTime();
    const diff = now - then;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    if (seconds < 60) return 'just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return fmtDate(timestamp);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/components/admin/users/ChatWidget.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>ChatWidget
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
function ChatWidget({ chatThread, messages, setMessages, user, id, session }) {
    // Const block — lines 33–38 of [id].tsx
    const [chatInput, setChatInput] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [chatSending, setChatSending] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [chatExpanded, setChatExpanded] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const chatEndRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const chatFileRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const [chatUploading, setChatUploading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    // Scroll effect — line 130 of [id].tsx
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        chatEndRef.current?.scrollIntoView({
            behavior: 'smooth'
        });
    }, [
        messages,
        chatExpanded
    ]);
    // Mark chat read on expand — lines 275–280 of [id].tsx
    const expandChat = async ()=>{
        setChatExpanded(true);
        if (chatThread) {
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].from('chat_threads').update({
                admin_has_unread: false
            }).eq('chat_thread_id', chatThread.chat_thread_id);
        }
    };
    // Send chat (admin) — lines 230–272 of [id].tsx
    const sendChat = async ()=>{
        if (!chatInput.trim() || !chatThread || !session) return;
        const msgText = chatInput;
        setChatInput('');
        setChatSending(true);
        // Optimistic update
        const optimisticMsg = {
            chat_message_id: 'opt-' + Date.now(),
            chat_thread_id: chatThread.chat_thread_id,
            actor: 'ADMIN',
            actor_id: session.user.id,
            body: msgText,
            attachment_url: null,
            attachment_type: null,
            created_at: new Date().toISOString()
        };
        setMessages((prev)=>[
                ...prev,
                optimisticMsg
            ]);
        const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].from('chat_messages').insert({
            chat_thread_id: chatThread.chat_thread_id,
            actor: 'ADMIN',
            actor_id: session.user.id,
            body: msgText,
            attachment_url: null,
            attachment_type: null
        });
        if (error) {
            console.error('Chat insert failed:', error.message);
            setMessages((prev)=>prev.filter((m)=>m.chat_message_id !== optimisticMsg.chat_message_id));
            setChatInput(msgText);
            setChatSending(false);
            return;
        }
        // This is the ONLY place send-user-notification is called manually
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].functions.invoke('send-user-notification', {
            body: {
                event_type: 'chat',
                user_id: id
            }
        }).catch(()=>{});
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].from('chat_threads').update({
            admin_has_unread: false,
            account_has_unread: true
        }).eq('chat_thread_id', chatThread.chat_thread_id);
        setChatSending(false);
    };
    // Chat file upload (admin) — lines 283–303 of [id].tsx
    const handleChatFile = async (e)=>{
        const file = e.target.files?.[0];
        if (!file || !chatThread || !session) return;
        setChatUploading(true);
        const path = `admin/${Date.now()}_${file.name}`;
        const { data: uploadData, error: uploadErr } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].storage.from('ChatUploads').upload(path, file, {
            contentType: file.type
        });
        if (uploadErr) {
            console.error('Upload error:', uploadErr.message);
            setChatUploading(false);
            return;
        }
        const uploadedUrl = uploadData?.path || path;
        const uploadedType = file.type;
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].from('chat_messages').insert({
            chat_thread_id: chatThread.chat_thread_id,
            actor: 'ADMIN',
            actor_id: session.user.id,
            body: null,
            attachment_url: uploadedUrl,
            attachment_type: uploadedType
        });
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].functions.invoke('send-user-notification', {
            body: {
                event_type: 'chat',
                user_id: id
            }
        }).catch(()=>{});
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].from('chat_threads').update({
            admin_has_unread: false,
            account_has_unread: true
        }).eq('chat_thread_id', chatThread.chat_thread_id);
        setChatUploading(false);
        if (chatFileRef.current) chatFileRef.current.value = '';
    };
    // JSX block — lines 489–529 of [id].tsx (the <div> inside the chatThread && !isGuest conditional)
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        style: {
            position: 'fixed',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '479px',
            zIndex: 100
        },
        children: !chatExpanded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            onClick: expandChat,
            style: {
                height: '79px',
                background: 'var(--k1)',
                borderTop: '1px solid var(--ln)',
                border: '1px solid var(--ln)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 21px',
                cursor: 'pointer'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                    style: {
                        fontFamily: 'var(--sans)',
                        fontSize: '15px',
                        letterSpacing: '.15em',
                        textTransform: 'uppercase',
                        color: 'var(--gl)'
                    },
                    children: [
                        "Chat · ",
                        user?.name || 'User'
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/admin/users/ChatWidget.tsx",
                    lineNumber: 107,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                    style: {
                        color: 'var(--d1)',
                        fontSize: '17px'
                    },
                    children: "↑"
                }, void 0, false, {
                    fileName: "[project]/components/admin/users/ChatWidget.tsx",
                    lineNumber: 108,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/admin/users/ChatWidget.tsx",
            lineNumber: 106,
            columnNumber: 9
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            style: {
                height: '799px',
                background: 'var(--k1)',
                borderTop: '1px solid var(--ln)',
                border: '1px solid var(--ln)',
                display: 'flex',
                flexDirection: 'column'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '13px 21px',
                        borderBottom: '1px solid var(--ln)',
                        flexShrink: 0
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                            style: {
                                fontFamily: 'var(--sans)',
                                fontSize: '17px',
                                letterSpacing: '.15em',
                                textTransform: 'uppercase',
                                color: 'var(--gl)'
                            },
                            children: [
                                "Chat · ",
                                user?.name || 'User'
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/admin/users/ChatWidget.tsx",
                            lineNumber: 113,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                            onClick: ()=>setChatExpanded(false),
                            style: {
                                background: 'none',
                                border: 'none',
                                color: 'var(--d1)',
                                cursor: 'pointer',
                                fontSize: '19px'
                            },
                            children: "↓"
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/ChatWidget.tsx",
                            lineNumber: 114,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/admin/users/ChatWidget.tsx",
                    lineNumber: 112,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: {
                        flex: 1,
                        overflowY: 'auto',
                        padding: '13px 21px'
                    },
                    children: [
                        messages.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: m.actor === 'ADMIN' ? 'flex-end' : 'flex-start',
                                    marginBottom: '11px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        style: {
                                            maxWidth: '70%',
                                            padding: '11px 15px',
                                            borderRadius: '11px',
                                            background: m.actor === 'ADMIN' ? '#d4af37' : 'rgba(45,212,191,1)',
                                            color: '#050505',
                                            fontFamily: "'Comfortaa', sans-serif",
                                            fontSize: '15px'
                                        },
                                        children: [
                                            m.body && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                children: m.body
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/users/ChatWidget.tsx",
                                                lineNumber: 120,
                                                columnNumber: 30
                                            }, this),
                                            m.attachment_url && m.attachment_type?.startsWith('image/') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                                src: m.attachment_url.startsWith('http') ? m.attachment_url : __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].storage.from('ChatUploads').getPublicUrl(m.attachment_url).data.publicUrl,
                                                alt: "attachment",
                                                style: {
                                                    maxWidth: '200px',
                                                    maxHeight: '200px',
                                                    objectFit: 'cover',
                                                    marginTop: m.body ? '6px' : '0',
                                                    borderRadius: '6px'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/users/ChatWidget.tsx",
                                                lineNumber: 122,
                                                columnNumber: 21
                                            }, this),
                                            m.attachment_url && m.attachment_type === 'application/pdf' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                style: {
                                                    marginTop: m.body ? '7px' : '0',
                                                    fontSize: '17px'
                                                },
                                                children: [
                                                    "📄 ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                                        href: m.attachment_url.startsWith('http') ? m.attachment_url : __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].storage.from('ChatUploads').getPublicUrl(m.attachment_url).data.publicUrl,
                                                        target: "_blank",
                                                        rel: "noopener noreferrer",
                                                        style: {
                                                            color: '#050505',
                                                            textDecoration: 'underline'
                                                        },
                                                        children: "Download PDF"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/admin/users/ChatWidget.tsx",
                                                        lineNumber: 125,
                                                        columnNumber: 91
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/admin/users/ChatWidget.tsx",
                                                lineNumber: 125,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/admin/users/ChatWidget.tsx",
                                        lineNumber: 119,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: '10px',
                                            color: 'var(--d2)',
                                            marginTop: '5px'
                                        },
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["fmtTime"])(m.created_at)
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/users/ChatWidget.tsx",
                                        lineNumber: 128,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, m.chat_message_id, true, {
                                fileName: "[project]/components/admin/users/ChatWidget.tsx",
                                lineNumber: 118,
                                columnNumber: 15
                            }, this)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            ref: chatEndRef
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/ChatWidget.tsx",
                            lineNumber: 131,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/admin/users/ChatWidget.tsx",
                    lineNumber: 116,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: {
                        display: 'flex',
                        gap: '9px',
                        padding: '13px 21px',
                        borderTop: '.5px solid var(--ln)',
                        flexShrink: 0
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                            type: "file",
                            ref: chatFileRef,
                            accept: ".jpg,.jpeg,.png,.tiff,.tif,.dng,.heic,.pdf",
                            style: {
                                display: 'none'
                            },
                            onChange: handleChatFile
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/ChatWidget.tsx",
                            lineNumber: 134,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                            onClick: ()=>chatFileRef.current?.click(),
                            disabled: chatUploading,
                            style: {
                                background: 'none',
                                border: '1px solid var(--ln)',
                                color: 'var(--d1)',
                                padding: '10px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                flexShrink: 0
                            },
                            title: "Attach file",
                            children: chatUploading ? '...' : '📎'
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/ChatWidget.tsx",
                            lineNumber: 135,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                            value: chatInput,
                            onChange: (e)=>setChatInput(e.target.value),
                            placeholder: "Type a message...",
                            style: {
                                flex: 1,
                                background: 'var(--k2)',
                                border: '1px solid var(--ln)',
                                padding: '11px 13px',
                                color: 'var(--tx)',
                                fontFamily: 'var(--sans)',
                                fontSize: '15px',
                                outline: 'none',
                                height: '44px'
                            },
                            onKeyDown: (e)=>{
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    sendChat();
                                }
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/ChatWidget.tsx",
                            lineNumber: 136,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                            onClick: sendChat,
                            disabled: chatSending || !chatInput.trim(),
                            style: {
                                background: 'var(--gl)',
                                border: 'none',
                                color: '#000',
                                padding: '11px 17px',
                                cursor: 'pointer',
                                fontWeight: 700,
                                fontSize: '16px'
                            },
                            children: "→"
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/ChatWidget.tsx",
                            lineNumber: 139,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/admin/users/ChatWidget.tsx",
                    lineNumber: 133,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/admin/users/ChatWidget.tsx",
            lineNumber: 111,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/admin/users/ChatWidget.tsx",
        lineNumber: 104,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/components/admin/users/AddWorkOrderModal.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>AddWorkOrderModal
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase.ts [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
function AddWorkOrderModal({ showAddWO, setShowAddWO, user, id, session, setWO, setWoCount }) {
    // Const block — lines 50–51 of [id].tsx
    const [woForm, setWoForm] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({
        title: '',
        description: '',
        service_type: '',
        gem_type: '',
        estimated_price: '',
        estimated_turnaround: '',
        notes: ''
    });
    const [woSaving, setWoSaving] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    // inputStyle — line 320 of [id].tsx
    const inputStyle = {
        background: 'var(--k2)',
        border: '1px solid var(--ln)',
        color: 'var(--tx)',
        padding: '10px 12px',
        fontFamily: 'var(--sans)',
        fontSize: '15px',
        width: '100%',
        outline: 'none',
        height: '39px'
    };
    // Create work order — lines 156–178 of [id].tsx
    const createWO = async ()=>{
        if (!woForm.title || !woForm.description || !session || !id) return;
        setWoSaving(true);
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].from('work_orders').insert({
            account_user_id: id,
            created_by_admin_id: session.user.id,
            title: woForm.title,
            description: woForm.description,
            service_type: woForm.service_type || null,
            gem_type: woForm.gem_type || null,
            estimated_price: woForm.estimated_price ? parseFloat(woForm.estimated_price) : null,
            estimated_turnaround: woForm.estimated_turnaround || null,
            notes: woForm.notes || null,
            wo_shipping_address: user?.shipping_address || null,
            edit_history: [
                {
                    action: 'CREATED',
                    by: 'admin',
                    at: new Date().toISOString()
                }
            ],
            status: 'CREATED'
        });
        // DB triggers fire automatically — do NOT call edge functions
        setWoSaving(false);
        setShowAddWO(false);
        setWoForm({
            title: '',
            description: '',
            service_type: '',
            gem_type: '',
            estimated_price: '',
            estimated_turnaround: '',
            notes: ''
        });
        const { data: wo } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].from('work_orders').select('*').eq('account_user_id', id).order('created_at', {
            ascending: false
        });
        setWO(wo || []);
        setWoCount(wo?.length || 0);
    };
    // JSX block — lines 534–586 of [id].tsx
    if (!showAddWO) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "ov",
        onClick: (e)=>{
            if (e.target === e.currentTarget) setShowAddWO(false);
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            style: {
                margin: 'auto',
                background: 'var(--k1)',
                border: '.5px solid var(--ln)',
                padding: '29px',
                maxWidth: '479px',
                width: '90%'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: {
                        fontFamily: 'var(--serif)',
                        fontSize: '23px',
                        color: 'var(--wh)',
                        marginBottom: '21px'
                    },
                    children: "New Work Order"
                }, void 0, false, {
                    fileName: "[project]/components/admin/users/AddWorkOrderModal.tsx",
                    lineNumber: 53,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: {
                        marginBottom: '13px'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                            style: {
                                fontSize: '11px',
                                fontWeight: 500,
                                letterSpacing: '.2em',
                                textTransform: 'uppercase',
                                color: 'var(--d1)',
                                display: 'block',
                                marginBottom: '5px'
                            },
                            children: "Service Type"
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/AddWorkOrderModal.tsx",
                            lineNumber: 56,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                            value: woForm.service_type,
                            onChange: (e)=>setWoForm({
                                    ...woForm,
                                    service_type: e.target.value
                                }),
                            style: {
                                ...inputStyle,
                                background: 'var(--k2)'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                    value: "",
                                    children: "Select service type"
                                }, void 0, false, {
                                    fileName: "[project]/components/admin/users/AddWorkOrderModal.tsx",
                                    lineNumber: 59,
                                    columnNumber: 13
                                }, this),
                                [
                                    'Custom Rough Cut',
                                    'Re-Cut & Re-Polish',
                                    'Table Re-Polish',
                                    'Crown Re-Polish',
                                    'Pavilion Re-Polish',
                                    'Gemstone Material Cut Design',
                                    'Virtual Consultation'
                                ].map((st)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                        value: st,
                                        children: st
                                    }, st, false, {
                                        fileName: "[project]/components/admin/users/AddWorkOrderModal.tsx",
                                        lineNumber: 68,
                                        columnNumber: 25
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/admin/users/AddWorkOrderModal.tsx",
                            lineNumber: 57,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/admin/users/AddWorkOrderModal.tsx",
                    lineNumber: 55,
                    columnNumber: 9
                }, this),
                [
                    {
                        label: 'Title *',
                        key: 'title',
                        placeholder: 'Work order title'
                    },
                    {
                        label: 'Gem Type',
                        key: 'gem_type',
                        placeholder: 'e.g. Sapphire'
                    },
                    {
                        label: 'Estimated Price ($)',
                        key: 'estimated_price',
                        placeholder: '0.00'
                    },
                    {
                        label: 'Estimated Turnaround',
                        key: 'estimated_turnaround',
                        placeholder: 'e.g. 2-3 weeks after receiving stone'
                    },
                    {
                        label: 'Notes',
                        key: 'notes',
                        placeholder: 'Internal notes'
                    }
                ].map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            marginBottom: '13px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                style: {
                                    fontSize: '11px',
                                    fontWeight: 500,
                                    letterSpacing: '.2em',
                                    textTransform: 'uppercase',
                                    color: 'var(--d1)',
                                    display: 'block',
                                    marginBottom: '5px'
                                },
                                children: f.label
                            }, void 0, false, {
                                fileName: "[project]/components/admin/users/AddWorkOrderModal.tsx",
                                lineNumber: 79,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                value: woForm[f.key],
                                onChange: (e)=>setWoForm({
                                        ...woForm,
                                        [f.key]: e.target.value
                                    }),
                                placeholder: f.placeholder,
                                style: inputStyle
                            }, void 0, false, {
                                fileName: "[project]/components/admin/users/AddWorkOrderModal.tsx",
                                lineNumber: 80,
                                columnNumber: 13
                            }, this)
                        ]
                    }, f.key, true, {
                        fileName: "[project]/components/admin/users/AddWorkOrderModal.tsx",
                        lineNumber: 78,
                        columnNumber: 11
                    }, this)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: {
                        marginBottom: '13px'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                            style: {
                                fontSize: '11px',
                                fontWeight: 500,
                                letterSpacing: '.2em',
                                textTransform: 'uppercase',
                                color: 'var(--d1)',
                                display: 'block',
                                marginBottom: '5px'
                            },
                            children: "Description *"
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/AddWorkOrderModal.tsx",
                            lineNumber: 84,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("textarea", {
                            value: woForm.description,
                            onChange: (e)=>setWoForm({
                                    ...woForm,
                                    description: e.target.value
                                }),
                            placeholder: "Work order description",
                            style: {
                                ...inputStyle,
                                minHeight: '80px',
                                resize: 'vertical'
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/AddWorkOrderModal.tsx",
                            lineNumber: 85,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/admin/users/AddWorkOrderModal.tsx",
                    lineNumber: 83,
                    columnNumber: 9
                }, this),
                user?.shipping_address && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: {
                        marginBottom: '13px',
                        padding: '12px',
                        background: 'var(--k0)',
                        border: '.5px solid var(--ln)'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                fontSize: '10px',
                                letterSpacing: '.2em',
                                textTransform: 'uppercase',
                                color: 'var(--d2)',
                                marginBottom: '5px'
                            },
                            children: "Return Address (from user profile)"
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/AddWorkOrderModal.tsx",
                            lineNumber: 91,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                fontSize: '13px',
                                color: 'var(--tx)'
                            },
                            children: user.shipping_address
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/AddWorkOrderModal.tsx",
                            lineNumber: 92,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/admin/users/AddWorkOrderModal.tsx",
                    lineNumber: 90,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: {
                        display: 'flex',
                        gap: '9px'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                            className: "bp",
                            onClick: createWO,
                            disabled: woSaving || !woForm.title || !woForm.description,
                            children: woSaving ? 'Creating...' : 'Create'
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/AddWorkOrderModal.tsx",
                            lineNumber: 96,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                            className: "bg",
                            onClick: ()=>setShowAddWO(false),
                            children: "Cancel"
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/AddWorkOrderModal.tsx",
                            lineNumber: 97,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/admin/users/AddWorkOrderModal.tsx",
                    lineNumber: 95,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/admin/users/AddWorkOrderModal.tsx",
            lineNumber: 52,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/admin/users/AddWorkOrderModal.tsx",
        lineNumber: 51,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/components/admin/users/EditUserModal.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>EditUserModal
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase.ts [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
function EditUserModal({ showEditUser, setShowEditUser, user, id, setUser }) {
    // editUser state — lines 55 of [id].tsx (initialized from user, synced on open)
    const [editUser, setEditUser] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(user ? {
        ...user
    } : null);
    // Re-sync editUser each time the modal opens — mirrors line 352: setEditUser({ ...user })
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (showEditUser && user) setEditUser({
            ...user
        });
    }, [
        showEditUser
    ]);
    // inputStyle — line 320 of [id].tsx
    const inputStyle = {
        background: 'var(--k2)',
        border: '1px solid var(--ln)',
        color: 'var(--tx)',
        padding: '10px 12px',
        fontFamily: 'var(--sans)',
        fontSize: '15px',
        width: '100%',
        outline: 'none',
        height: '39px'
    };
    // Save user edit — lines 219–227 of [id].tsx
    const saveUser = async ()=>{
        if (!editUser || !id) return;
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].from('account_users').update({
            name: editUser.name,
            email: editUser.email,
            phone: editUser.phone,
            shipping_address: editUser.shipping_address,
            business_name: editUser.business_name,
            status: editUser.status
        }).eq('account_user_id', id);
        setUser({
            ...editUser
        });
        setShowEditUser(false);
    };
    // JSX block — lines 588–620 of [id].tsx
    if (!showEditUser || !editUser) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "ov",
        onClick: (e)=>{
            if (e.target === e.currentTarget) setShowEditUser(false);
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            style: {
                margin: 'auto',
                background: 'var(--k1)',
                border: '1px solid var(--ln)',
                padding: '29px',
                maxWidth: '480px',
                width: '90%'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: {
                        fontFamily: 'var(--serif)',
                        fontSize: '23px',
                        color: 'var(--wh)',
                        marginBottom: '21px'
                    },
                    children: "Edit User"
                }, void 0, false, {
                    fileName: "[project]/components/admin/users/EditUserModal.tsx",
                    lineNumber: 40,
                    columnNumber: 9
                }, this),
                [
                    {
                        label: 'Name',
                        key: 'name'
                    },
                    {
                        label: 'Email',
                        key: 'email'
                    },
                    {
                        label: 'Phone',
                        key: 'phone'
                    },
                    {
                        label: 'Business Name',
                        key: 'business_name'
                    }
                ].map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            marginBottom: '13px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                style: {
                                    fontSize: '15px',
                                    fontWeight: 500,
                                    letterSpacing: '.2em',
                                    textTransform: 'uppercase',
                                    color: 'var(--d1)',
                                    display: 'block',
                                    marginBottom: '5px'
                                },
                                children: f.label
                            }, void 0, false, {
                                fileName: "[project]/components/admin/users/EditUserModal.tsx",
                                lineNumber: 46,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                value: editUser[f.key] || '',
                                onChange: (e)=>setEditUser({
                                        ...editUser,
                                        [f.key]: e.target.value
                                    }),
                                style: inputStyle
                            }, void 0, false, {
                                fileName: "[project]/components/admin/users/EditUserModal.tsx",
                                lineNumber: 47,
                                columnNumber: 13
                            }, this)
                        ]
                    }, f.key, true, {
                        fileName: "[project]/components/admin/users/EditUserModal.tsx",
                        lineNumber: 45,
                        columnNumber: 11
                    }, this)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: {
                        marginBottom: '13px'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                            style: {
                                fontSize: '15px',
                                fontWeight: 500,
                                letterSpacing: '.3em',
                                textTransform: 'uppercase',
                                color: 'var(--d1)',
                                display: 'block',
                                marginBottom: '5px'
                            },
                            children: "Shipping Address"
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/EditUserModal.tsx",
                            lineNumber: 51,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("textarea", {
                            value: editUser.shipping_address || '',
                            onChange: (e)=>setEditUser({
                                    ...editUser,
                                    shipping_address: e.target.value
                                }),
                            style: {
                                ...inputStyle,
                                minHeight: '60px',
                                resize: 'vertical'
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/EditUserModal.tsx",
                            lineNumber: 52,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/admin/users/EditUserModal.tsx",
                    lineNumber: 50,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: {
                        marginBottom: '17px'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                            style: {
                                fontSize: '15px',
                                fontWeight: 500,
                                letterSpacing: '.3em',
                                textTransform: 'uppercase',
                                color: 'var(--d1)',
                                display: 'block',
                                marginBottom: '5px'
                            },
                            children: "Status"
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/EditUserModal.tsx",
                            lineNumber: 55,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                            value: editUser.status || 'ACTIVE',
                            onChange: (e)=>setEditUser({
                                    ...editUser,
                                    status: e.target.value
                                }),
                            style: {
                                ...inputStyle,
                                cursor: 'pointer'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                    value: "ACTIVE",
                                    children: "ACTIVE"
                                }, void 0, false, {
                                    fileName: "[project]/components/admin/users/EditUserModal.tsx",
                                    lineNumber: 58,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                    value: "SUSPENDED",
                                    children: "SUSPENDED"
                                }, void 0, false, {
                                    fileName: "[project]/components/admin/users/EditUserModal.tsx",
                                    lineNumber: 59,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/admin/users/EditUserModal.tsx",
                            lineNumber: 56,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/admin/users/EditUserModal.tsx",
                    lineNumber: 54,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: {
                        display: 'flex',
                        gap: '9px'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                            className: "bp",
                            onClick: saveUser,
                            children: "Save"
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/EditUserModal.tsx",
                            lineNumber: 63,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                            className: "bg",
                            onClick: ()=>setShowEditUser(false),
                            children: "Cancel"
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/EditUserModal.tsx",
                            lineNumber: 64,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/admin/users/EditUserModal.tsx",
                    lineNumber: 62,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/admin/users/EditUserModal.tsx",
            lineNumber: 39,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/admin/users/EditUserModal.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/components/admin/users/InquiryDetailModal.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>InquiryDetailModal
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
function InquiryDetailModal({ selectedInq, setSelectedInq, selectedInqProduct, setSelectedInqProduct, user }) {
    // JSX block — lines 622–698 of [id].tsx
    if (!selectedInq) return null;
    const onClose = ()=>{
        setSelectedInq(null);
        setSelectedInqProduct(null);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        style: {
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            background: 'rgba(0,0,0,0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
        },
        onClick: (e)=>{
            if (e.target === e.currentTarget) onClose();
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            style: {
                background: '#0A0A0A',
                border: '1px solid rgba(255,255,255,0.10)',
                padding: '31px',
                maxWidth: '560px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                borderRadius: '2px'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: {
                        marginBottom: '20px'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                fontFamily: 'var(--sans)',
                                fontSize: '10px',
                                letterSpacing: '.2em',
                                textTransform: 'uppercase',
                                color: 'var(--d1)',
                                marginBottom: '6px'
                            },
                            children: selectedInq.guest_inquiry_id ? 'Guest Inquiry' : 'Account Inquiry'
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/InquiryDetailModal.tsx",
                            lineNumber: 24,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                fontFamily: 'var(--serif)',
                                fontSize: '22px',
                                color: 'var(--wh)'
                            },
                            children: selectedInq.name || user?.name || 'Inquiry'
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/InquiryDetailModal.tsx",
                            lineNumber: 27,
                            columnNumber: 11
                        }, this),
                        selectedInq.email && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                fontSize: '13px',
                                color: 'var(--d1)',
                                marginTop: '3px'
                            },
                            children: selectedInq.email
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/InquiryDetailModal.tsx",
                            lineNumber: 30,
                            columnNumber: 33
                        }, this),
                        selectedInq.phone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                fontSize: '13px',
                                color: '#377da2',
                                marginTop: '2px'
                            },
                            children: selectedInq.phone
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/InquiryDetailModal.tsx",
                            lineNumber: 31,
                            columnNumber: 33
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/admin/users/InquiryDetailModal.tsx",
                    lineNumber: 23,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: {
                        height: '1px',
                        background: 'var(--ln)',
                        margin: '16px 0'
                    }
                }, void 0, false, {
                    fileName: "[project]/components/admin/users/InquiryDetailModal.tsx",
                    lineNumber: 34,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: {
                        marginBottom: '20px'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                fontFamily: 'var(--sans)',
                                fontSize: '10px',
                                letterSpacing: '.2em',
                                textTransform: 'uppercase',
                                color: 'var(--d1)',
                                marginBottom: '8px'
                            },
                            children: "Message"
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/InquiryDetailModal.tsx",
                            lineNumber: 38,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                            style: {
                                fontSize: '15px',
                                color: 'var(--tx)',
                                lineHeight: 1.7
                            },
                            children: selectedInq.description
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/InquiryDetailModal.tsx",
                            lineNumber: 39,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/admin/users/InquiryDetailModal.tsx",
                    lineNumber: 37,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: {
                        height: '1px',
                        background: 'var(--ln)',
                        margin: '16px 0'
                    }
                }, void 0, false, {
                    fileName: "[project]/components/admin/users/InquiryDetailModal.tsx",
                    lineNumber: 42,
                    columnNumber: 9
                }, this),
                selectedInqProduct ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                fontFamily: 'var(--sans)',
                                fontSize: '10px',
                                letterSpacing: '.2em',
                                textTransform: 'uppercase',
                                color: 'var(--d1)',
                                marginBottom: '12px'
                            },
                            children: "Product Inquired About"
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/InquiryDetailModal.tsx",
                            lineNumber: 47,
                            columnNumber: 13
                        }, this),
                        selectedInqProduct.photo_url && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                marginBottom: '16px',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                aspectRatio: '4/3',
                                maxHeight: '220px'
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                src: selectedInqProduct.photo_url.startsWith('http') ? selectedInqProduct.photo_url : `${"TURBOPACK compile-time value", "https://jvbkcihypbjlnffsbohd.supabase.co"}/storage/v1/object/public/product-photos/${selectedInqProduct.photo_url}`,
                                alt: selectedInqProduct.title,
                                style: {
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/admin/users/InquiryDetailModal.tsx",
                                lineNumber: 50,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/InquiryDetailModal.tsx",
                            lineNumber: 49,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                fontFamily: 'var(--serif)',
                                fontSize: '20px',
                                color: 'var(--wh)',
                                marginBottom: '4px'
                            },
                            children: selectedInqProduct.title
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/InquiryDetailModal.tsx",
                            lineNumber: 57,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                fontFamily: "'Courier New', monospace",
                                fontSize: '18px',
                                color: 'rgba(45,212,191,1)',
                                marginBottom: '14px'
                            },
                            children: selectedInqProduct.total_price ? '$' + Number(selectedInqProduct.total_price).toLocaleString() : ''
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/InquiryDetailModal.tsx",
                            lineNumber: 58,
                            columnNumber: 13
                        }, this),
                        [
                            {
                                label: 'Product ID',
                                val: selectedInqProduct.product_id
                            },
                            {
                                label: 'Gem Type',
                                val: selectedInqProduct.gem_type
                            },
                            {
                                label: 'Shape',
                                val: selectedInqProduct.shape
                            },
                            {
                                label: 'Weight',
                                val: selectedInqProduct.weight ? selectedInqProduct.weight + ' ct' : null
                            },
                            {
                                label: 'Color',
                                val: selectedInqProduct.color
                            },
                            {
                                label: 'Origin',
                                val: selectedInqProduct.origin
                            },
                            {
                                label: 'Treatment',
                                val: selectedInqProduct.treatment
                            },
                            {
                                label: 'GIA Report #',
                                val: selectedInqProduct.gia_report_number
                            },
                            {
                                label: 'Price / ct',
                                val: selectedInqProduct.price_per_carat ? '$' + Number(selectedInqProduct.price_per_carat).toLocaleString() : null
                            }
                        ].filter((r)=>r.val).map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginBottom: '7px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontFamily: 'var(--sans)',
                                            fontSize: '10px',
                                            letterSpacing: '.18em',
                                            textTransform: 'uppercase',
                                            color: 'var(--d1)'
                                        },
                                        children: r.label
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/users/InquiryDetailModal.tsx",
                                        lineNumber: 71,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: '13px',
                                            color: 'var(--tx)',
                                            textAlign: 'right',
                                            maxWidth: '60%',
                                            wordBreak: 'break-all'
                                        },
                                        children: r.val
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/users/InquiryDetailModal.tsx",
                                        lineNumber: 72,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, r.label, true, {
                                fileName: "[project]/components/admin/users/InquiryDetailModal.tsx",
                                lineNumber: 70,
                                columnNumber: 15
                            }, this)),
                        selectedInqProduct.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                            style: {
                                fontSize: '13px',
                                color: 'var(--d2)',
                                lineHeight: 1.7,
                                marginTop: '12px'
                            },
                            children: selectedInqProduct.description
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/InquiryDetailModal.tsx",
                            lineNumber: 76,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/admin/users/InquiryDetailModal.tsx",
                    lineNumber: 46,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: {
                        fontSize: '12px',
                        color: 'var(--d2)',
                        fontStyle: 'italic'
                    },
                    children: "No product linked to this inquiry"
                }, void 0, false, {
                    fileName: "[project]/components/admin/users/InquiryDetailModal.tsx",
                    lineNumber: 80,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: {
                        height: '1px',
                        background: 'var(--ln)',
                        margin: '20px 0 16px'
                    }
                }, void 0, false, {
                    fileName: "[project]/components/admin/users/InquiryDetailModal.tsx",
                    lineNumber: 83,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: {
                        fontSize: '11px',
                        color: 'var(--d2)'
                    },
                    children: [
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["fmtDate"])(selectedInq.created_at),
                        " · ",
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["fmtTime"])(selectedInq.created_at)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/admin/users/InquiryDetailModal.tsx",
                    lineNumber: 84,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                    onClick: onClose,
                    style: {
                        marginTop: '20px',
                        background: 'none',
                        border: '1px solid rgba(255,255,255,0.10)',
                        color: 'rgba(255,255,255,0.45)',
                        padding: '10px 20px',
                        fontFamily: 'var(--sans)',
                        fontSize: '10px',
                        letterSpacing: '.18em',
                        textTransform: 'uppercase',
                        cursor: 'pointer'
                    },
                    children: "Close"
                }, void 0, false, {
                    fileName: "[project]/components/admin/users/InquiryDetailModal.tsx",
                    lineNumber: 86,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/admin/users/InquiryDetailModal.tsx",
            lineNumber: 20,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/admin/users/InquiryDetailModal.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/components/admin/users/WorkOrderDetailModal.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>WorkOrderDetailModal
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
// STATUS_COLORS — lines 7–13 of [id].tsx
const STATUS_COLORS = {
    CREATED: {
        bg: 'rgba(184,154,42,0.08)',
        color: '#cfb040'
    },
    ACCEPTED: {
        bg: 'rgba(90,150,90,0.1)',
        color: '#7ec87e'
    },
    COMPLETED: {
        bg: 'rgba(80,120,200,0.1)',
        color: '#88aadd'
    },
    CONFIRMED: {
        bg: 'rgba(120,80,200,0.12)',
        color: '#b388ff'
    },
    CANCELLED: {
        bg: 'rgba(181,64,64,0.1)',
        color: '#c07070'
    }
};
function WorkOrderDetailModal({ selectedWO, setSelectedWO, user, session, adminInfo, setWO }) {
    // Addr edit state — lines 42–44 of [id].tsx
    const [editingWOAddr, setEditingWOAddr] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [woAdminAddrEdit, setWoAdminAddrEdit] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [woClientAddrEdit, setWoClientAddrEdit] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    // inputStyle — line 320 of [id].tsx
    const inputStyle = {
        background: 'var(--k2)',
        border: '1px solid var(--ln)',
        color: 'var(--tx)',
        padding: '10px 12px',
        fontFamily: 'var(--sans)',
        fontSize: '15px',
        width: '100%',
        outline: 'none',
        height: '39px'
    };
    // appendLog — lines 180–184 of [id].tsx
    const appendLog = (wo, action, by)=>{
        const prev = Array.isArray(wo.edit_history) ? wo.edit_history : [];
        return [
            ...prev,
            {
                action,
                by,
                at: new Date().toISOString()
            }
        ];
    };
    // confirmWO — lines 186–196 of [id].tsx
    const confirmWO = async (wo)=>{
        const log = appendLog(wo, 'CONFIRMED by admin', 'admin');
        const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].from('work_orders').update({
            status: 'CONFIRMED',
            confirmed_at: new Date().toISOString(),
            edit_history: log
        }).eq('work_order_id', wo.work_order_id);
        if (error) {
            console.error('Confirm WO error:', error.message);
            return;
        }
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].functions.invoke('send-user-notification', {
            body: {
                event_type: 'work_order_confirmed',
                work_order_id: wo.work_order_id,
                user_id: wo.account_user_id
            }
        }).catch(()=>{});
        setWO((prev)=>prev.map((w)=>w.work_order_id === wo.work_order_id ? {
                    ...w,
                    status: 'CONFIRMED',
                    confirmed_at: new Date().toISOString(),
                    edit_history: log
                } : w));
        setSelectedWO((prev)=>prev ? {
                ...prev,
                status: 'CONFIRMED',
                confirmed_at: new Date().toISOString(),
                edit_history: log
            } : prev);
    };
    // completeWO — lines 198–206 of [id].tsx
    const completeWO = async (wo)=>{
        const log = appendLog(wo, 'COMPLETE by admin', 'admin');
        const now = new Date().toISOString();
        const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].from('work_orders').update({
            status: 'COMPLETE',
            completed_at: now,
            edit_history: log
        }).eq('work_order_id', wo.work_order_id);
        if (error) {
            console.error('Complete WO error:', error.message);
            alert('Error: ' + error.message);
            return;
        }
        setWO((prev)=>prev.map((w)=>w.work_order_id === wo.work_order_id ? {
                    ...w,
                    status: 'COMPLETE',
                    completed_at: now,
                    edit_history: log
                } : w));
        setSelectedWO((prev)=>prev ? {
                ...prev,
                status: 'COMPLETE',
                completed_at: now,
                edit_history: log
            } : prev);
    };
    // cancelWO — lines 208–217 of [id].tsx
    const cancelWO = async (wo)=>{
        const reason = prompt('Cancel reason:');
        if (!reason) return;
        const log = appendLog(wo, 'CANCELLED by admin: ' + reason, 'admin');
        const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].from('work_orders').update({
            status: 'CANCELLED',
            cancelled_at: new Date().toISOString(),
            cancel_reason: reason,
            edit_history: log
        }).eq('work_order_id', wo.work_order_id);
        if (error) {
            console.error('Cancel WO error:', error.message);
            return;
        }
        setWO((prev)=>prev.map((w)=>w.work_order_id === wo.work_order_id ? {
                    ...w,
                    status: 'CANCELLED',
                    edit_history: log
                } : w));
        setSelectedWO((prev)=>prev ? {
                ...prev,
                status: 'CANCELLED',
                edit_history: log
            } : prev);
    };
    // JSX block — lines 700–892 of [id].tsx
    if (!selectedWO) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "ov",
        onClick: (e)=>{
            if (e.target === e.currentTarget) setSelectedWO(null);
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            style: {
                margin: 'auto',
                background: 'var(--k1)',
                border: '.5px solid var(--ln)',
                padding: '40px',
                maxWidth: '720px',
                width: '95%',
                maxHeight: '92vh',
                overflowY: 'auto'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: {
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: '24px'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: '10px',
                                        letterSpacing: '.3em',
                                        textTransform: 'uppercase',
                                        color: 'var(--d2)',
                                        marginBottom: '4px'
                                    },
                                    children: "Work Order"
                                }, void 0, false, {
                                    fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                                    lineNumber: 81,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontFamily: 'var(--serif)',
                                        fontSize: '22px',
                                        color: 'var(--wh)'
                                    },
                                    children: selectedWO.title
                                }, void 0, false, {
                                    fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                                    lineNumber: 82,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                            lineNumber: 80,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                            style: {
                                fontSize: '9px',
                                fontWeight: 500,
                                letterSpacing: '.17em',
                                textTransform: 'uppercase',
                                padding: '4px 9px',
                                background: STATUS_COLORS[selectedWO.status]?.bg,
                                color: STATUS_COLORS[selectedWO.status]?.color
                            },
                            children: selectedWO.status
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                            lineNumber: 84,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                    lineNumber: 79,
                    columnNumber: 9
                }, this),
                adminInfo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: {
                        marginBottom: '16px',
                        padding: '18px',
                        background: 'var(--k0)',
                        border: '.5px solid var(--ln)'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '10px'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: '11px',
                                        letterSpacing: '.2em',
                                        textTransform: 'uppercase',
                                        color: 'var(--d2)'
                                    },
                                    children: "Admin Address"
                                }, void 0, false, {
                                    fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                                    lineNumber: 91,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: '10px',
                                        fontWeight: 700,
                                        letterSpacing: '.15em',
                                        textTransform: 'uppercase',
                                        color: '#ffd700'
                                    },
                                    children: "← CLIENT SENDS ITEM HERE"
                                }, void 0, false, {
                                    fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                                    lineNumber: 92,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                            lineNumber: 90,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                fontSize: '15px',
                                color: 'rgba(255,255,255,0.72)',
                                lineHeight: 2
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        color: 'var(--gl)',
                                        fontWeight: 600,
                                        fontSize: '16px'
                                    },
                                    children: adminInfo.business_name
                                }, void 0, false, {
                                    fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                                    lineNumber: 95,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    children: adminInfo.full_name
                                }, void 0, false, {
                                    fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                                    lineNumber: 96,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontWeight: 600,
                                        color: 'rgba(255,255,255,0.85)'
                                    },
                                    children: adminInfo.address
                                }, void 0, false, {
                                    fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                                    lineNumber: 97,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    children: adminInfo.contact_email
                                }, void 0, false, {
                                    fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                                    lineNumber: 98,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    children: adminInfo.phone
                                }, void 0, false, {
                                    fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                                    lineNumber: 99,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                            lineNumber: 94,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                    lineNumber: 89,
                    columnNumber: 11
                }, this),
                user && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: {
                        marginBottom: '20px',
                        padding: '18px',
                        background: 'var(--k0)',
                        border: '.5px solid var(--ln)'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '10px'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: '11px',
                                        letterSpacing: '.2em',
                                        textTransform: 'uppercase',
                                        color: 'var(--d2)'
                                    },
                                    children: "Client Return Address"
                                }, void 0, false, {
                                    fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                                    lineNumber: 108,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: '10px',
                                                fontWeight: 700,
                                                letterSpacing: '.15em',
                                                textTransform: 'uppercase',
                                                color: '#ffd700'
                                            },
                                            children: "RETURN ITEM HERE →"
                                        }, void 0, false, {
                                            fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                                            lineNumber: 110,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                            onClick: ()=>{
                                                setEditingWOAddr(true);
                                                setWoClientAddrEdit(selectedWO.wo_shipping_address || user.shipping_address || '');
                                                setWoAdminAddrEdit(adminInfo?.address || '');
                                            },
                                            style: {
                                                fontSize: '10px',
                                                letterSpacing: '.15em',
                                                textTransform: 'uppercase',
                                                background: 'none',
                                                border: '1px solid rgba(255,255,255,0.15)',
                                                color: 'rgba(255,255,255,0.5)',
                                                padding: '3px 8px',
                                                cursor: 'pointer'
                                            },
                                            children: "Edit"
                                        }, void 0, false, {
                                            fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                                            lineNumber: 111,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                                    lineNumber: 109,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                            lineNumber: 107,
                            columnNumber: 13
                        }, this),
                        editingWOAddr ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        marginBottom: '8px'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                            style: {
                                                fontSize: '10px',
                                                letterSpacing: '.15em',
                                                textTransform: 'uppercase',
                                                color: 'var(--d2)',
                                                display: 'block',
                                                marginBottom: '4px'
                                            },
                                            children: "Admin Address (send to)"
                                        }, void 0, false, {
                                            fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                                            lineNumber: 120,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                            value: woAdminAddrEdit,
                                            onChange: (e)=>setWoAdminAddrEdit(e.target.value),
                                            style: {
                                                width: '100%',
                                                background: 'var(--k2)',
                                                border: '1px solid var(--ln)',
                                                color: 'var(--tx)',
                                                padding: '8px 10px',
                                                fontSize: '13px',
                                                fontFamily: 'var(--sans)',
                                                outline: 'none',
                                                marginBottom: '8px'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                                            lineNumber: 121,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                                    lineNumber: 119,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        marginBottom: '10px'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                            style: {
                                                fontSize: '10px',
                                                letterSpacing: '.15em',
                                                textTransform: 'uppercase',
                                                color: 'var(--d2)',
                                                display: 'block',
                                                marginBottom: '4px'
                                            },
                                            children: "Client Return Address"
                                        }, void 0, false, {
                                            fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                                            lineNumber: 125,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                            value: woClientAddrEdit,
                                            onChange: (e)=>setWoClientAddrEdit(e.target.value),
                                            style: {
                                                width: '100%',
                                                background: 'var(--k2)',
                                                border: '1px solid var(--ln)',
                                                color: 'var(--tx)',
                                                padding: '8px 10px',
                                                fontSize: '13px',
                                                fontFamily: 'var(--sans)',
                                                outline: 'none'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                                            lineNumber: 126,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                                    lineNumber: 124,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        gap: '8px'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                            className: "bp",
                                            onClick: async ()=>{
                                                const log = appendLog(selectedWO, 'Addresses updated by admin', 'admin');
                                                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].from('work_orders').update({
                                                    wo_shipping_address: woClientAddrEdit.trim(),
                                                    edit_history: log
                                                }).eq('work_order_id', selectedWO.work_order_id);
                                                if (woAdminAddrEdit.trim() !== adminInfo?.address) {
                                                    await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].from('admin_users').update({
                                                        address: woAdminAddrEdit.trim()
                                                    }).eq('admin_user_id', session?.user?.id);
                                                }
                                                setSelectedWO((prev)=>({
                                                        ...prev,
                                                        wo_shipping_address: woClientAddrEdit.trim(),
                                                        edit_history: log
                                                    }));
                                                setWO((prev)=>prev.map((w)=>w.work_order_id === selectedWO.work_order_id ? {
                                                            ...w,
                                                            wo_shipping_address: woClientAddrEdit.trim()
                                                        } : w));
                                                setEditingWOAddr(false);
                                            },
                                            children: "Save"
                                        }, void 0, false, {
                                            fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                                            lineNumber: 130,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                            className: "bg",
                                            onClick: ()=>setEditingWOAddr(false),
                                            children: "Cancel"
                                        }, void 0, false, {
                                            fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                                            lineNumber: 140,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                                    lineNumber: 129,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                            lineNumber: 118,
                            columnNumber: 15
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                fontSize: '15px',
                                color: 'rgba(255,255,255,0.72)',
                                lineHeight: 2
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        color: 'rgba(66,200,194,0.9)',
                                        fontSize: '16px'
                                    },
                                    children: user.name
                                }, void 0, false, {
                                    fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                                    lineNumber: 145,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    children: user.email
                                }, void 0, false, {
                                    fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                                    lineNumber: 146,
                                    columnNumber: 17
                                }, this),
                                user.phone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    children: user.phone
                                }, void 0, false, {
                                    fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                                    lineNumber: 147,
                                    columnNumber: 32
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontWeight: 600,
                                        color: 'rgba(255,255,255,0.85)'
                                    },
                                    children: selectedWO.wo_shipping_address || user.shipping_address || 'No address on file'
                                }, void 0, false, {
                                    fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                                    lineNumber: 148,
                                    columnNumber: 17
                                }, this),
                                selectedWO.wo_shipping_address && selectedWO.wo_shipping_address !== user.shipping_address && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: '11px',
                                        color: '#ffd700',
                                        marginTop: '4px',
                                        fontStyle: 'italic'
                                    },
                                    children: "* Custom address for this work order only"
                                }, void 0, false, {
                                    fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                                    lineNumber: 150,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                            lineNumber: 144,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                    lineNumber: 106,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: {
                        height: '1px',
                        background: 'var(--ln)',
                        margin: '14px 0'
                    }
                }, void 0, false, {
                    fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                    lineNumber: 157,
                    columnNumber: 9
                }, this),
                [
                    {
                        label: 'Service Type',
                        val: selectedWO.service_type
                    },
                    {
                        label: 'Gem Type',
                        val: selectedWO.gem_type
                    },
                    {
                        label: 'Est. Turnaround',
                        val: selectedWO.estimated_turnaround
                    },
                    {
                        label: 'Created',
                        val: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["fmtDate"])(selectedWO.created_at) + ' · ' + (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["fmtTime"])(selectedWO.created_at)
                    },
                    {
                        label: 'Accepted',
                        val: selectedWO.accepted_at ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["fmtDate"])(selectedWO.accepted_at) + ' · ' + (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["fmtTime"])(selectedWO.accepted_at) : null
                    },
                    {
                        label: 'Confirmed',
                        val: selectedWO.confirmed_at ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["fmtDate"])(selectedWO.confirmed_at) + ' · ' + (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["fmtTime"])(selectedWO.confirmed_at) : null
                    },
                    {
                        label: 'Completed',
                        val: selectedWO.completed_at ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["fmtDate"])(selectedWO.completed_at) + ' · ' + (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["fmtTime"])(selectedWO.completed_at) : null
                    },
                    {
                        label: 'Cancelled',
                        val: selectedWO.cancelled_at ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["fmtDate"])(selectedWO.cancelled_at) : null
                    }
                ].filter((r)=>r.val).map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '12px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: '12px',
                                    letterSpacing: '.17em',
                                    textTransform: 'uppercase',
                                    color: 'var(--d2)'
                                },
                                children: r.label
                            }, void 0, false, {
                                fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                                lineNumber: 171,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: '15px',
                                    color: 'rgba(255,255,255,0.72)'
                                },
                                children: r.val
                            }, void 0, false, {
                                fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                                lineNumber: 172,
                                columnNumber: 13
                            }, this)
                        ]
                    }, r.label, true, {
                        fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                        lineNumber: 170,
                        columnNumber: 11
                    }, this)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: {
                        marginTop: '16px'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                fontSize: '11px',
                                letterSpacing: '.1em',
                                textTransform: 'uppercase',
                                color: 'var(--d2)',
                                marginBottom: '8px'
                            },
                            children: "Description"
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                            lineNumber: 177,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                            style: {
                                fontSize: '15px',
                                color: 'rgba(255,255,255,0.72)',
                                lineHeight: 1.8
                            },
                            children: selectedWO.description
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                            lineNumber: 178,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                    lineNumber: 176,
                    columnNumber: 9
                }, this),
                selectedWO.notes && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: {
                        marginTop: '16px'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                fontSize: '11px',
                                letterSpacing: '.18em',
                                textTransform: 'uppercase',
                                color: 'var(--d2)',
                                marginBottom: '8px'
                            },
                            children: "Internal Notes"
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                            lineNumber: 183,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                            style: {
                                fontSize: '15px',
                                color: 'rgba(255,255,255,0.60)',
                                lineHeight: 1.8
                            },
                            children: selectedWO.notes
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                            lineNumber: 184,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                    lineNumber: 182,
                    columnNumber: 11
                }, this),
                selectedWO.estimated_price && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: {
                        marginTop: '19px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                        padding: '14px',
                        background: 'var(--k0)',
                        border: '1px solid var(--ln)'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                            style: {
                                fontSize: '11px',
                                letterSpacing: '.18em',
                                textTransform: 'uppercase',
                                color: 'var(--d2)'
                            },
                            children: "Quoted Price"
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                            lineNumber: 190,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                            style: {
                                fontFamily: "'Courier New', monospace",
                                fontSize: '22px',
                                color: 'rgb(34, 158, 114)'
                            },
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["formatMoney"])(selectedWO.estimated_price)
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                            lineNumber: 191,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                    lineNumber: 189,
                    columnNumber: 11
                }, this),
                selectedWO.status === 'COMPLETE' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: {
                        marginTop: '16px',
                        padding: '16px',
                        background: 'var(--k0)',
                        border: '.5px solid var(--ln)'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                fontSize: '11px',
                                letterSpacing: '.2em',
                                textTransform: 'uppercase',
                                color: 'var(--d2)',
                                marginBottom: '12px'
                            },
                            children: "Payment"
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                            lineNumber: 198,
                            columnNumber: 13
                        }, this),
                        selectedWO.paid_outside_site ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                fontSize: '13px',
                                color: '#7ec87e'
                            },
                            children: "✓ Marked as paid outside site"
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                            lineNumber: 200,
                            columnNumber: 15
                        }, this) : selectedWO.stripe_payment_link ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: '11px',
                                        color: 'var(--d2)',
                                        marginBottom: '6px'
                                    },
                                    children: "Stripe payment link:"
                                }, void 0, false, {
                                    fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                                    lineNumber: 203,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                    href: selectedWO.stripe_payment_link,
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    style: {
                                        color: 'var(--gl)',
                                        fontSize: '13px',
                                        wordBreak: 'break-all'
                                    },
                                    children: selectedWO.stripe_payment_link
                                }, void 0, false, {
                                    fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                                    lineNumber: 204,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                            lineNumber: 202,
                            columnNumber: 15
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                gap: '8px',
                                flexWrap: 'wrap'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        flex: 1,
                                        minWidth: '200px'
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                        placeholder: "Paste Stripe payment link...",
                                        style: {
                                            ...inputStyle,
                                            marginBottom: '8px'
                                        },
                                        onBlur: async (e)=>{
                                            if (e.target.value.trim()) {
                                                const log = appendLog(selectedWO, 'Payment link added', 'admin');
                                                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].from('work_orders').update({
                                                    stripe_payment_link: e.target.value.trim(),
                                                    edit_history: log
                                                }).eq('work_order_id', selectedWO.work_order_id);
                                                setSelectedWO((prev)=>({
                                                        ...prev,
                                                        stripe_payment_link: e.target.value.trim(),
                                                        edit_history: log
                                                    }));
                                                setWO((prev)=>prev.map((w)=>w.work_order_id === selectedWO.work_order_id ? {
                                                            ...w,
                                                            stripe_payment_link: e.target.value.trim()
                                                        } : w));
                                            }
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                                        lineNumber: 209,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                                    lineNumber: 208,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    className: "bg",
                                    style: {
                                        whiteSpace: 'nowrap'
                                    },
                                    onClick: async ()=>{
                                        const log = appendLog(selectedWO, 'Marked as paid outside site', 'admin');
                                        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].from('work_orders').update({
                                            paid_outside_site: true,
                                            edit_history: log
                                        }).eq('work_order_id', selectedWO.work_order_id);
                                        setSelectedWO((prev)=>({
                                                ...prev,
                                                paid_outside_site: true,
                                                edit_history: log
                                            }));
                                        setWO((prev)=>prev.map((w)=>w.work_order_id === selectedWO.work_order_id ? {
                                                    ...w,
                                                    paid_outside_site: true
                                                } : w));
                                    },
                                    children: "Paid Outside Site"
                                }, void 0, false, {
                                    fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                                    lineNumber: 222,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                            lineNumber: 207,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                    lineNumber: 197,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: {
                        display: 'flex',
                        gap: '7px',
                        marginTop: '25px',
                        flexWrap: 'wrap'
                    },
                    children: [
                        selectedWO.status === 'ACCEPTED' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                            className: "bp",
                            onClick: ()=>confirmWO(selectedWO),
                            children: "Confirm Order"
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                            lineNumber: 236,
                            columnNumber: 13
                        }, this),
                        selectedWO.status === 'CONFIRMED' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                            className: "bp",
                            onClick: ()=>completeWO(selectedWO),
                            children: "Mark Complete"
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                            lineNumber: 239,
                            columnNumber: 13
                        }, this),
                        (selectedWO.status === 'CREATED' || selectedWO.status === 'ACCEPTED' || selectedWO.status === 'CONFIRMED') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                            className: "bg arc",
                            onClick: ()=>{
                                cancelWO(selectedWO);
                            },
                            children: "Cancel Order"
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                            lineNumber: 242,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                            className: "bg",
                            onClick: ()=>setSelectedWO(null),
                            style: {
                                marginLeft: 'auto'
                            },
                            children: "Close"
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                            lineNumber: 244,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                    lineNumber: 234,
                    columnNumber: 9
                }, this),
                selectedWO.edit_history && selectedWO.edit_history.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: {
                        marginTop: '28px',
                        borderTop: '1px solid var(--ln)',
                        paddingTop: '16px'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                fontSize: '10px',
                                letterSpacing: '.2em',
                                textTransform: 'uppercase',
                                color: 'var(--d2)',
                                marginBottom: '10px'
                            },
                            children: "Activity Log"
                        }, void 0, false, {
                            fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                            lineNumber: 250,
                            columnNumber: 13
                        }, this),
                        [
                            ...selectedWO.edit_history
                        ].reverse().map((entry, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    padding: '8px 0',
                                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                                    gap: '12px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            flexWrap: 'wrap'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontSize: '10px',
                                                    fontWeight: 700,
                                                    letterSpacing: '.15em',
                                                    textTransform: 'uppercase',
                                                    padding: '2px 6px',
                                                    background: entry.by === 'admin' ? 'rgba(212,175,55,0.12)' : 'rgba(45,212,191,0.1)',
                                                    color: entry.by === 'admin' ? '#cfb040' : 'rgba(45,212,191,0.9)'
                                                },
                                                children: entry.by
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                                                lineNumber: 254,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontSize: '13px',
                                                    color: 'var(--tx)'
                                                },
                                                children: entry.action
                                            }, void 0, false, {
                                                fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                                                lineNumber: 255,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                                        lineNumber: 253,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: '10px',
                                            color: 'var(--d2)',
                                            whiteSpace: 'nowrap',
                                            flexShrink: 0
                                        },
                                        children: [
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["fmtDate"])(entry.at),
                                            " · ",
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["fmtTime"])(entry.at)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                                        lineNumber: 257,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                                lineNumber: 252,
                                columnNumber: 15
                            }, this))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
                    lineNumber: 249,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
            lineNumber: 76,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/admin/users/WorkOrderDetailModal.tsx",
        lineNumber: 75,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/pages/admin/users/[id].tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>AdminUserDetail
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$AdminLayout$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/admin/AdminLayout.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$users$2f$ChatWidget$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/admin/users/ChatWidget.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$users$2f$AddWorkOrderModal$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/admin/users/AddWorkOrderModal.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$users$2f$EditUserModal$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/admin/users/EditUserModal.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$users$2f$InquiryDetailModal$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/admin/users/InquiryDetailModal.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$users$2f$WorkOrderDetailModal$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/admin/users/WorkOrderDetailModal.tsx [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$AdminLayout$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$users$2f$ChatWidget$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$users$2f$AddWorkOrderModal$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$users$2f$EditUserModal$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$users$2f$InquiryDetailModal$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$users$2f$WorkOrderDetailModal$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$AdminLayout$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$users$2f$ChatWidget$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$users$2f$AddWorkOrderModal$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$users$2f$EditUserModal$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$users$2f$InquiryDetailModal$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$users$2f$WorkOrderDetailModal$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
;
;
;
;
const STATUS_COLORS = {
    CREATED: {
        bg: 'rgba(184,154,42,0.08)',
        color: '#cfb040'
    },
    ACCEPTED: {
        bg: 'rgba(90,150,90,0.1)',
        color: '#7ec87e'
    },
    COMPLETED: {
        bg: 'rgba(80,120,200,0.1)',
        color: '#88aadd'
    },
    CONFIRMED: {
        bg: 'rgba(120,80,200,0.12)',
        color: '#b388ff'
    },
    CANCELLED: {
        bg: 'rgba(181,64,64,0.1)',
        color: '#c07070'
    }
};
function AdminUserDetail() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { id } = router.query;
    const [session, setSession] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [checking, setChecking] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(true);
    // Data
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [adminInfo, setAdminInfo] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('dashboard');
    const [inquiries, setInquiries] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [serviceRequests, setSR] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [workOrders, setWO] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [invoices, setInvoices] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    // Chat
    const [chatThread, setChatThread] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    // Work order detail modal
    const [selectedWO, setSelectedWO] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [selectedInq, setSelectedInq] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [selectedInqProduct, setSelectedInqProduct] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [showAddWO, setShowAddWO] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    // Edit user
    const [showEditUser, setShowEditUser] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    // Stats
    const [woCount, setWoCount] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(0);
    const [invTotal, setInvTotal] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(0);
    const [inqCount, setInqCount] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(0);
    const [srCount, setSrCount] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(0);
    const [guestInquiries, setGuestInquiries] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    // Auth guard
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        async function check() {
            const { data: { session: s } } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.getSession();
            if (!s) {
                router.replace('/admin/login');
                return;
            }
            const { data: adminCheck } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].from('admin_users').select('admin_user_id').eq('admin_user_id', s.user.id).single();
            if (!adminCheck) {
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.signOut();
                router.replace('/admin/login');
                return;
            }
            setSession(s);
            setChecking(false);
        }
        check();
    }, [
        router
    ]);
    // Load all data
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (!id || !session) return;
        async function loadAll() {
            const uid = id;
            const { data: u } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].from('account_users').select('*').eq('account_user_id', uid).single();
            setUser(u);
            const { data: admin } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].from('admin_users').select('*').single();
            setAdminInfo(admin);
            const { data: inq } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].from('account_inquiries').select('*').eq('account_user_id', uid).order('created_at', {
                ascending: false
            });
            setInquiries(inq || []);
            setInqCount(inq?.length || 0);
            const guestId = ("TURBOPACK compile-time value", "18cf77dc-6e41-42bb-abb3-0ae8615bbc20");
            if (uid === guestId) {
                const { data: gInq } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].from('guest_inquiries').select('*').order('created_at', {
                    ascending: false
                });
                setGuestInquiries(gInq || []);
                setInqCount((gInq?.length || 0) + (inq?.length || 0));
            }
            const { data: sr } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].from('service_requests').select('*').eq('account_user_id', uid).order('created_at', {
                ascending: false
            });
            setSR(sr || []);
            setSrCount(sr?.length || 0);
            const { data: wo } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].from('work_orders').select('*').eq('account_user_id', uid).order('created_at', {
                ascending: false
            });
            setWO(wo || []);
            setWoCount(wo?.length || 0);
            const { data: inv } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].from('invoices').select('*').eq('account_user_id', uid).order('paid_at', {
                ascending: false
            });
            setInvoices(inv || []);
            setInvTotal(inv?.reduce((s, i)=>s + Number(i.total_amount || 0), 0) || 0);
            // Chat
            const { data: thread } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].from('chat_threads').select('*').eq('account_user_id', uid).single();
            setChatThread(thread);
            if (thread) {
                const { data: msgs } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].from('chat_messages').select('*').eq('chat_thread_id', thread.chat_thread_id).order('created_at', {
                    ascending: true
                });
                setMessages(msgs || []);
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].channel('admin-chat-' + thread.chat_thread_id).on('postgres_changes', {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'chat_messages',
                    filter: `chat_thread_id=eq.${thread.chat_thread_id}`
                }, (payload)=>{
                    const newMsg = payload.new;
                    setMessages((prev)=>{
                        const filtered = prev.filter((m)=>!m.chat_message_id.startsWith('opt-') || m.body !== newMsg.body);
                        if (filtered.some((m)=>m.chat_message_id === newMsg.chat_message_id)) return filtered;
                        return [
                            ...filtered,
                            newMsg
                        ];
                    });
                }).subscribe();
            }
        }
        loadAll();
    }, [
        id,
        session
    ]);
    // Mark inquiry read
    const openInquiry = async (item)=>{
        setSelectedInq(item);
        const productId = item.product_id || item.guest_inquiry_id && null;
        if (item.product_id) {
            const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].from('products').select('*').eq('product_id', item.product_id).single();
            setSelectedInqProduct(data || null);
        } else {
            setSelectedInqProduct(null);
        }
    };
    const markInqRead = async (item)=>{
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].from('account_inquiries').update({
            is_read: true,
            read_at: new Date().toISOString()
        }).eq('account_inquiry_id', item.account_inquiry_id);
        setInquiries((prev)=>prev.map((i)=>i.account_inquiry_id === item.account_inquiry_id ? {
                    ...i,
                    is_read: true
                } : i));
    };
    // Mark SR read
    const markSRRead = async (item)=>{
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].from('service_requests').update({
            is_read: true,
            read_at: new Date().toISOString()
        }).eq('service_request_id', item.service_request_id);
        setSR((prev)=>prev.map((i)=>i.service_request_id === item.service_request_id ? {
                    ...i,
                    is_read: true
                } : i));
    };
    // List-level WO actions (also called from WorkOrderDetailModal via props)
    const appendLog = (wo, action, by)=>{
        const prev = Array.isArray(wo.edit_history) ? wo.edit_history : [];
        return [
            ...prev,
            {
                action,
                by,
                at: new Date().toISOString()
            }
        ];
    };
    const completeWO = async (wo)=>{
        console.log('completeWO fired, status:', wo.status, 'id:', wo.work_order_id);
        const log = appendLog(wo, 'COMPLETE by admin', 'admin');
        const now = new Date().toISOString();
        const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].from('work_orders').update({
            status: 'COMPLETE',
            completed_at: now,
            edit_history: log
        }).eq('work_order_id', wo.work_order_id);
        if (error) {
            console.error('Complete WO error:', error.message);
            alert('Error: ' + error.message);
            return;
        }
        setWO((prev)=>prev.map((w)=>w.work_order_id === wo.work_order_id ? {
                    ...w,
                    status: 'COMPLETE',
                    completed_at: now,
                    edit_history: log
                } : w));
        setSelectedWO((prev)=>prev ? {
                ...prev,
                status: 'COMPLETE',
                completed_at: now,
                edit_history: log
            } : prev);
    };
    const cancelWO = async (wo)=>{
        const reason = prompt('Cancel reason:');
        if (!reason) return;
        const log = appendLog(wo, 'CANCELLED by admin: ' + reason, 'admin');
        const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].from('work_orders').update({
            status: 'CANCELLED',
            cancelled_at: new Date().toISOString(),
            cancel_reason: reason,
            edit_history: log
        }).eq('work_order_id', wo.work_order_id);
        if (error) {
            console.error('Cancel WO error:', error.message);
            return;
        }
        setWO((prev)=>prev.map((w)=>w.work_order_id === wo.work_order_id ? {
                    ...w,
                    status: 'CANCELLED',
                    edit_history: log
                } : w));
        setSelectedWO((prev)=>prev ? {
                ...prev,
                status: 'CANCELLED',
                edit_history: log
            } : prev);
    };
    if (checking) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        style: {
            background: '#060606',
            height: '100vh'
        }
    }, void 0, false, {
        fileName: "[project]/pages/admin/users/[id].tsx",
        lineNumber: 170,
        columnNumber: 24
    }, this);
    const isGuest = id === ("TURBOPACK compile-time value", "18cf77dc-6e41-42bb-abb3-0ae8615bbc20");
    const unreadInq = inquiries.some((i)=>!i.is_read);
    const unreadSR = serviceRequests.some((i)=>!i.is_read);
    const unreadWO = workOrders.some((w)=>w.status === 'CREATED');
    const TABS = [
        {
            id: 'dashboard',
            label: 'Dashboard'
        },
        {
            id: 'inquiries',
            label: 'Inquiries',
            dot: unreadInq
        },
        {
            id: 'service',
            label: 'Service Requests',
            dot: unreadSR
        },
        {
            id: 'workorders',
            label: 'Work Orders',
            dot: unreadWO
        },
        {
            id: 'invoices',
            label: 'Invoices'
        }
    ];
    const inputStyle = {
        background: 'var(--k2)',
        border: '1px solid var(--ln)',
        color: 'var(--tx)',
        padding: '10px 12px',
        fontFamily: 'var(--sans)',
        fontSize: '15px',
        width: '100%',
        outline: 'none',
        height: '39px'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("style", {
                children: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$AdminLayout$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["adminCss"]
            }, void 0, false, {
                fileName: "[project]/pages/admin/users/[id].tsx",
                lineNumber: 189,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "shell",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: {
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        height: '100vh',
                        overflow: 'hidden'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: '19px',
                                padding: '13px 25px',
                                borderBottom: '1px solid var(--ln)',
                                background: 'var(--k1)',
                                flexShrink: 0
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    onClick: ()=>router.push('/admin/users'),
                                    className: "hidden md:inline-block",
                                    style: {
                                        background: 'none',
                                        border: 'none',
                                        color: 'rgba(255,255,255,0.45)',
                                        cursor: 'pointer',
                                        fontSize: '13px',
                                        letterSpacing: '.09em',
                                        textTransform: 'uppercase',
                                        fontFamily: "'Montserrat'",
                                        transition: 'color .15s'
                                    },
                                    onMouseEnter: (e)=>e.currentTarget.style.color = 'rgba(255,255,255,0.75)',
                                    onMouseLeave: (e)=>e.currentTarget.style.color = 'rgba(255,255,255,0.45)',
                                    children: "← USER LIST"
                                }, void 0, false, {
                                    fileName: "[project]/pages/admin/users/[id].tsx",
                                    lineNumber: 194,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontFamily: 'Montserrat',
                                        fontSize: '17px',
                                        textTransform: 'uppercase',
                                        color: 'rgba(45,212,191,1)'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontSize: '5px',
                                                color: 'var(--d2)',
                                                textTransform: 'uppercase',
                                                letterSpacing: '.15em',
                                                marginRight: '11px'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/pages/admin/users/[id].tsx",
                                            lineNumber: 196,
                                            columnNumber: 15
                                        }, this),
                                        isGuest ? 'Guest Account' : user?.name || 'User'
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/admin/users/[id].tsx",
                                    lineNumber: 195,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        gap: '16px',
                                        marginLeft: '24px'
                                    },
                                    children: TABS.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setActiveTab(t.id),
                                            style: {
                                                padding: '13px 17px',
                                                fontFamily: 'var(--sans)',
                                                fontSize: '13px',
                                                letterSpacing: '.15em',
                                                textTransform: 'uppercase',
                                                background: 'none',
                                                border: 'none',
                                                borderBottom: activeTab === t.id ? '.5px solid var(--gl)' : '1px solid transparent',
                                                color: activeTab === t.id ? 'var(--wh)' : 'var(--d1)',
                                                cursor: 'pointer',
                                                position: 'relative'
                                            },
                                            children: [
                                                t.label,
                                                t.dot && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        position: 'absolute',
                                                        top: '5px',
                                                        right: '-7px',
                                                        width: '7px',
                                                        height: '7px',
                                                        borderRadius: '20%',
                                                        background: 'var(--er)'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/admin/users/[id].tsx",
                                                    lineNumber: 204,
                                                    columnNumber: 29
                                                }, this)
                                            ]
                                        }, t.id, true, {
                                            fileName: "[project]/pages/admin/users/[id].tsx",
                                            lineNumber: 201,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/pages/admin/users/[id].tsx",
                                    lineNumber: 199,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/admin/users/[id].tsx",
                            lineNumber: 193,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                flex: 1,
                                overflow: 'auto',
                                padding: '29px 41px'
                            },
                            children: [
                                activeTab === 'dashboard' && user && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'grid',
                                        gridTemplateColumns: '1fr 1fr',
                                        gap: '45px'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                        marginBottom: '19px'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                fontFamily: 'var(--serif)',
                                                                fontSize: '25px',
                                                                color: 'rgb(224, 187, 50)'
                                                            },
                                                            children: "Account Info"
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/admin/users/[id].tsx",
                                                            lineNumber: 216,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                            className: "ab",
                                                            onClick: ()=>setShowEditUser(true),
                                                            children: "Edit"
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/admin/users/[id].tsx",
                                                            lineNumber: 217,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/pages/admin/users/[id].tsx",
                                                    lineNumber: 215,
                                                    columnNumber: 19
                                                }, this),
                                                [
                                                    {
                                                        label: 'Name',
                                                        val: user.name
                                                    },
                                                    {
                                                        label: 'Email',
                                                        val: user.email
                                                    },
                                                    {
                                                        label: 'Phone',
                                                        val: user.phone || '—'
                                                    },
                                                    {
                                                        label: 'Address',
                                                        val: user.shipping_address || '—'
                                                    },
                                                    {
                                                        label: 'Business',
                                                        val: user.business_name || '—'
                                                    },
                                                    {
                                                        label: 'Member Since',
                                                        val: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["fmtDate"])(user.created_at)
                                                    }
                                                ].map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            marginBottom: '15px'
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    fontSize: '13px',
                                                                    fontWeight: 500,
                                                                    letterSpacing: '.2em',
                                                                    textTransform: 'uppercase',
                                                                    color: 'var(--d1)',
                                                                    marginBottom: '7px'
                                                                },
                                                                children: f.label
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/admin/users/[id].tsx",
                                                                lineNumber: 228,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    fontSize: '17px',
                                                                    color: f.label === 'Phone' ? '#377da2' : 'var(--tx)'
                                                                },
                                                                children: f.val
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/admin/users/[id].tsx",
                                                                lineNumber: 229,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, f.label, true, {
                                                        fileName: "[project]/pages/admin/users/[id].tsx",
                                                        lineNumber: 227,
                                                        columnNumber: 21
                                                    }, this)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        marginTop: '9px'
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                        className: `pill ${user.status === 'ACTIVE' ? 'pill-A' : 'pill-I'}`,
                                                        children: user.status
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/admin/users/[id].tsx",
                                                        lineNumber: 233,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/admin/users/[id].tsx",
                                                    lineNumber: 232,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/pages/admin/users/[id].tsx",
                                            lineNumber: 214,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'grid',
                                                gridTemplateColumns: '1fr 1fr',
                                                gap: '17px',
                                                alignContent: 'start'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: "stat-card",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                            className: "stat-val",
                                                            style: {
                                                                color: 'rgba(45,212,191,1)',
                                                                fontFamily: "'Courier New', monospace"
                                                            },
                                                            children: woCount
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/admin/users/[id].tsx",
                                                            lineNumber: 237,
                                                            columnNumber: 46
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                            className: "stat-label",
                                                            children: "Work Orders"
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/admin/users/[id].tsx",
                                                            lineNumber: 237,
                                                            columnNumber: 167
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/pages/admin/users/[id].tsx",
                                                    lineNumber: 237,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: "stat-card",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                            className: "stat-val",
                                                            style: {
                                                                color: 'rgba(45,212,191,1)',
                                                                fontFamily: "'Courier New', monospace"
                                                            },
                                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["formatMoney"])(invTotal)
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/admin/users/[id].tsx",
                                                            lineNumber: 238,
                                                            columnNumber: 46
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                            className: "stat-label",
                                                            children: "Total Invoiced"
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/admin/users/[id].tsx",
                                                            lineNumber: 238,
                                                            columnNumber: 181
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/pages/admin/users/[id].tsx",
                                                    lineNumber: 238,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: "stat-card",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                            className: "stat-val",
                                                            style: {
                                                                color: 'rgba(45,212,191,1)',
                                                                fontFamily: "'Courier New', monospace"
                                                            },
                                                            children: inqCount
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/admin/users/[id].tsx",
                                                            lineNumber: 239,
                                                            columnNumber: 46
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                            className: "stat-label",
                                                            children: "Inquiries"
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/admin/users/[id].tsx",
                                                            lineNumber: 239,
                                                            columnNumber: 168
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/pages/admin/users/[id].tsx",
                                                    lineNumber: 239,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: "stat-card",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                            className: "stat-val",
                                                            style: {
                                                                color: 'rgba(45,212,191,1)',
                                                                fontFamily: "'Courier New', monospace"
                                                            },
                                                            children: srCount
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/admin/users/[id].tsx",
                                                            lineNumber: 240,
                                                            columnNumber: 46
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                            className: "stat-label",
                                                            children: "Service Requests"
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/admin/users/[id].tsx",
                                                            lineNumber: 240,
                                                            columnNumber: 167
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/pages/admin/users/[id].tsx",
                                                    lineNumber: 240,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/pages/admin/users/[id].tsx",
                                            lineNumber: 236,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/admin/users/[id].tsx",
                                    lineNumber: 213,
                                    columnNumber: 15
                                }, this),
                                activeTab === 'inquiries' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                                    children: [
                                        isGuest && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        fontFamily: 'var(--sans)',
                                                        fontSize: '11px',
                                                        letterSpacing: '.2em',
                                                        textTransform: 'uppercase',
                                                        color: 'var(--d1)',
                                                        marginBottom: '12px'
                                                    },
                                                    children: "Anonymous Visitor Inquiries"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/admin/users/[id].tsx",
                                                    lineNumber: 250,
                                                    columnNumber: 21
                                                }, this),
                                                guestInquiries.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: "empty",
                                                    style: {
                                                        marginBottom: '24px'
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "empty-tx",
                                                        children: "No guest inquiries"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/admin/users/[id].tsx",
                                                        lineNumber: 252,
                                                        columnNumber: 81
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/admin/users/[id].tsx",
                                                    lineNumber: 252,
                                                    columnNumber: 25
                                                }, this) : guestInquiries.map((inq)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        onClick: ()=>openInquiry(inq),
                                                        style: {
                                                            background: 'var(--k1)',
                                                            border: '1px solid var(--ln)',
                                                            padding: '17px',
                                                            marginBottom: '9px',
                                                            cursor: 'pointer'
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    display: 'flex',
                                                                    justifyContent: 'space-between',
                                                                    alignItems: 'flex-start',
                                                                    marginBottom: '10px'
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                                style: {
                                                                                    fontSize: '15px',
                                                                                    color: 'var(--wh)',
                                                                                    marginBottom: '3px'
                                                                                },
                                                                                children: inq.name
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/pages/admin/users/[id].tsx",
                                                                                lineNumber: 257,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                                style: {
                                                                                    fontSize: '13px',
                                                                                    color: 'var(--d1)'
                                                                                },
                                                                                children: inq.email
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/pages/admin/users/[id].tsx",
                                                                                lineNumber: 258,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                                style: {
                                                                                    fontSize: '13px',
                                                                                    color: '#377da2'
                                                                                },
                                                                                children: inq.phone
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/pages/admin/users/[id].tsx",
                                                                                lineNumber: 259,
                                                                                columnNumber: 31
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/pages/admin/users/[id].tsx",
                                                                        lineNumber: 256,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    !inq.is_read && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            width: '7px',
                                                                            height: '7px',
                                                                            borderRadius: '50%',
                                                                            background: 'var(--gl)',
                                                                            marginTop: '4px'
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/pages/admin/users/[id].tsx",
                                                                        lineNumber: 261,
                                                                        columnNumber: 46
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/pages/admin/users/[id].tsx",
                                                                lineNumber: 255,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                                style: {
                                                                    fontSize: '15px',
                                                                    color: 'var(--tx)',
                                                                    marginBottom: '7px',
                                                                    lineHeight: 1.6
                                                                },
                                                                children: inq.description
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/admin/users/[id].tsx",
                                                                lineNumber: 263,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    fontSize: '13px',
                                                                    color: 'var(--d1)'
                                                                },
                                                                children: [
                                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["fmtDate"])(inq.created_at),
                                                                    " · ",
                                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["fmtTime"])(inq.created_at)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/pages/admin/users/[id].tsx",
                                                                lineNumber: 264,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, inq.guest_inquiry_id, true, {
                                                        fileName: "[project]/pages/admin/users/[id].tsx",
                                                        lineNumber: 254,
                                                        columnNumber: 25
                                                    }, this)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        height: '1px',
                                                        background: 'var(--ln)',
                                                        margin: '20px 0 16px'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/admin/users/[id].tsx",
                                                    lineNumber: 268,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        fontFamily: 'var(--sans)',
                                                        fontSize: '11px',
                                                        letterSpacing: '.2em',
                                                        textTransform: 'uppercase',
                                                        color: 'var(--d1)',
                                                        marginBottom: '12px'
                                                    },
                                                    children: "Account Inquiries"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/admin/users/[id].tsx",
                                                    lineNumber: 269,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true),
                                        inquiries.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "empty",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "empty-tx",
                                                children: "No inquiries"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/admin/users/[id].tsx",
                                                lineNumber: 273,
                                                columnNumber: 44
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/pages/admin/users/[id].tsx",
                                            lineNumber: 273,
                                            columnNumber: 21
                                        }, this) : inquiries.map((inq)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                onClick: ()=>{
                                                    markInqRead(inq);
                                                    openInquiry(inq);
                                                },
                                                style: {
                                                    background: 'var(--k1)',
                                                    border: '1px solid var(--ln)',
                                                    padding: '17px',
                                                    marginBottom: '9px',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    gap: '13px',
                                                    alignItems: 'flex-start'
                                                },
                                                children: [
                                                    !inq.is_read && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            width: '7px',
                                                            height: '9px',
                                                            borderRadius: '50%',
                                                            background: 'var(--gl)',
                                                            marginTop: '7px',
                                                            flexShrink: 0
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/admin/users/[id].tsx",
                                                        lineNumber: 277,
                                                        columnNumber: 40
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                                style: {
                                                                    fontSize: '19px',
                                                                    color: 'var(--tx)',
                                                                    marginBottom: '7px'
                                                                },
                                                                children: inq.description
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/admin/users/[id].tsx",
                                                                lineNumber: 279,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    fontSize: '17px',
                                                                    color: 'var(--d1)'
                                                                },
                                                                children: [
                                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["fmtDate"])(inq.created_at),
                                                                    " · ",
                                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["fmtTime"])(inq.created_at)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/pages/admin/users/[id].tsx",
                                                                lineNumber: 280,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/pages/admin/users/[id].tsx",
                                                        lineNumber: 278,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, inq.account_inquiry_id, true, {
                                                fileName: "[project]/pages/admin/users/[id].tsx",
                                                lineNumber: 275,
                                                columnNumber: 21
                                            }, this))
                                    ]
                                }, void 0, true),
                                activeTab === 'service' && (serviceRequests.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "empty",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "empty-tx",
                                        children: "No service requests"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/admin/users/[id].tsx",
                                        lineNumber: 290,
                                        columnNumber: 69
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/pages/admin/users/[id].tsx",
                                    lineNumber: 290,
                                    columnNumber: 46
                                }, this) : serviceRequests.map((sr)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        onClick: ()=>markSRRead(sr),
                                        style: {
                                            background: 'var(--k1)',
                                            border: '1px solid var(--ln)',
                                            padding: '17px',
                                            marginBottom: '9px',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            gap: '11px',
                                            alignItems: 'flex-start'
                                        },
                                        children: [
                                            !sr.is_read && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                style: {
                                                    width: '7px',
                                                    height: '7px',
                                                    borderRadius: '50%',
                                                    background: 'var(--gl)',
                                                    marginTop: '7px',
                                                    flexShrink: 0
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/pages/admin/users/[id].tsx",
                                                lineNumber: 294,
                                                columnNumber: 35
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            fontSize: '17px',
                                                            color: 'var(--gl)',
                                                            marginBottom: '7px'
                                                        },
                                                        children: sr.service_type
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/admin/users/[id].tsx",
                                                        lineNumber: 296,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            fontSize: '17px',
                                                            color: 'var(--tx)',
                                                            marginBottom: '7px'
                                                        },
                                                        children: sr.description
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/admin/users/[id].tsx",
                                                        lineNumber: 297,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontSize: '17px',
                                                            color: 'var(--d1)'
                                                        },
                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["fmtDate"])(sr.created_at)
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/admin/users/[id].tsx",
                                                        lineNumber: 298,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/pages/admin/users/[id].tsx",
                                                lineNumber: 295,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, sr.service_request_id, true, {
                                        fileName: "[project]/pages/admin/users/[id].tsx",
                                        lineNumber: 292,
                                        columnNumber: 17
                                    }, this))),
                                activeTab === 'workorders' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                marginBottom: '17px'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontFamily: 'var(--serif)',
                                                        fontSize: '24px',
                                                        color: 'var(--wh)'
                                                    },
                                                    children: "Work Orders"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/admin/users/[id].tsx",
                                                    lineNumber: 308,
                                                    columnNumber: 19
                                                }, this),
                                                !isGuest && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                    className: "btn-add",
                                                    onClick: ()=>setShowAddWO(true),
                                                    children: "+ Add Work Order"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/admin/users/[id].tsx",
                                                    lineNumber: 309,
                                                    columnNumber: 32
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/pages/admin/users/[id].tsx",
                                            lineNumber: 307,
                                            columnNumber: 17
                                        }, this),
                                        workOrders.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "empty",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "empty-tx",
                                                children: "No work orders"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/admin/users/[id].tsx",
                                                lineNumber: 311,
                                                columnNumber: 67
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/pages/admin/users/[id].tsx",
                                            lineNumber: 311,
                                            columnNumber: 44
                                        }, this) : workOrders.map((wo)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                style: {
                                                    background: 'var(--k1)',
                                                    border: '1px solid var(--ln)',
                                                    padding: '11px',
                                                    marginBottom: '9px',
                                                    cursor: 'pointer'
                                                },
                                                onClick: ()=>setSelectedWO(wo),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'center',
                                                            marginBottom: '7px'
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    fontFamily: 'var(--serif)',
                                                                    fontSize: '17px',
                                                                    color: 'var(--wh)'
                                                                },
                                                                children: wo.title
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/admin/users/[id].tsx",
                                                                lineNumber: 315,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    fontSize: '9px',
                                                                    fontWeight: 500,
                                                                    letterSpacing: '.2em',
                                                                    textTransform: 'uppercase',
                                                                    padding: '4px 9px',
                                                                    background: STATUS_COLORS[wo.status]?.bg,
                                                                    color: STATUS_COLORS[wo.status]?.color
                                                                },
                                                                children: wo.status
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/admin/users/[id].tsx",
                                                                lineNumber: 316,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/pages/admin/users/[id].tsx",
                                                        lineNumber: 314,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            fontSize: '13px',
                                                            color: 'var(--d1)',
                                                            marginBottom: '6px'
                                                        },
                                                        children: wo.description
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/admin/users/[id].tsx",
                                                        lineNumber: 318,
                                                        columnNumber: 21
                                                    }, this),
                                                    wo.estimated_price && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            fontSize: '15px',
                                                            color: 'rgba(45,212,191,1)',
                                                            fontFamily: "'Courier New', monospace"
                                                        },
                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["formatMoney"])(wo.estimated_price)
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/admin/users/[id].tsx",
                                                        lineNumber: 319,
                                                        columnNumber: 44
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            fontSize: '12px',
                                                            color: 'var(--d2)',
                                                            marginTop: '8px'
                                                        },
                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["fmtDate"])(wo.created_at)
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/admin/users/[id].tsx",
                                                        lineNumber: 320,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: 'flex',
                                                            gap: '9px',
                                                            marginTop: '11px'
                                                        },
                                                        onClick: (e)=>e.stopPropagation(),
                                                        children: [
                                                            (wo.status === 'ACCEPTED' || wo.status === 'CONFIRMED') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                                className: "ab pub",
                                                                onClick: ()=>completeWO(wo),
                                                                children: "Complete"
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/admin/users/[id].tsx",
                                                                lineNumber: 322,
                                                                columnNumber: 83
                                                            }, this),
                                                            (wo.status === 'CREATED' || wo.status === 'ACCEPTED') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                                className: "ab rem",
                                                                onClick: ()=>cancelWO(wo),
                                                                children: "Cancel"
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/admin/users/[id].tsx",
                                                                lineNumber: 323,
                                                                columnNumber: 81
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/pages/admin/users/[id].tsx",
                                                        lineNumber: 321,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, wo.work_order_id, true, {
                                                fileName: "[project]/pages/admin/users/[id].tsx",
                                                lineNumber: 313,
                                                columnNumber: 19
                                            }, this))
                                    ]
                                }, void 0, true),
                                activeTab === 'invoices' && (invoices.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "empty",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "empty-tx",
                                        children: "No invoices"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/admin/users/[id].tsx",
                                        lineNumber: 332,
                                        columnNumber: 62
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/pages/admin/users/[id].tsx",
                                    lineNumber: 332,
                                    columnNumber: 39
                                }, this) : invoices.map((inv)=>{
                                    const item = inv.line_items?.[0];
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        style: {
                                            background: 'var(--k1)',
                                            border: '1px solid var(--ln)',
                                            padding: '15px',
                                            marginBottom: '9px',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            fontFamily: 'var(--serif)',
                                                            fontSize: '25px',
                                                            color: 'var(--wh)'
                                                        },
                                                        children: item?.title || 'Product'
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/admin/users/[id].tsx",
                                                        lineNumber: 338,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            fontSize: '17px',
                                                            color: 'var(--d2)',
                                                            marginTop: '7px',
                                                            fontFamily: 'monospace'
                                                        },
                                                        children: [
                                                            inv.stripe_session_id?.slice(0, 20),
                                                            "..."
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/pages/admin/users/[id].tsx",
                                                        lineNumber: 339,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            fontSize: '21px',
                                                            color: 'var(--d1)',
                                                            marginTop: '5px'
                                                        },
                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["fmtDate"])(inv.paid_at)
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/admin/users/[id].tsx",
                                                        lineNumber: 340,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/pages/admin/users/[id].tsx",
                                                lineNumber: 337,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                style: {
                                                    textAlign: 'right'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            fontFamily: 'var(--serif)',
                                                            fontSize: '17px',
                                                            color: 'var(--gl)'
                                                        },
                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["formatMoney"])(inv.total_amount)
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/admin/users/[id].tsx",
                                                        lineNumber: 343,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                        className: "pill pill-A",
                                                        style: {
                                                            marginTop: '5px'
                                                        },
                                                        children: "PAID"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/admin/users/[id].tsx",
                                                        lineNumber: 344,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/pages/admin/users/[id].tsx",
                                                lineNumber: 342,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, inv.invoice_id, true, {
                                        fileName: "[project]/pages/admin/users/[id].tsx",
                                        lineNumber: 336,
                                        columnNumber: 19
                                    }, this);
                                }))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/admin/users/[id].tsx",
                            lineNumber: 210,
                            columnNumber: 11
                        }, this),
                        chatThread && !isGuest && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$users$2f$ChatWidget$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                            chatThread: chatThread,
                            messages: messages,
                            setMessages: setMessages,
                            user: user,
                            id: id,
                            session: session
                        }, void 0, false, {
                            fileName: "[project]/pages/admin/users/[id].tsx",
                            lineNumber: 354,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/pages/admin/users/[id].tsx",
                    lineNumber: 192,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/pages/admin/users/[id].tsx",
                lineNumber: 190,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$users$2f$AddWorkOrderModal$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                showAddWO: showAddWO,
                setShowAddWO: setShowAddWO,
                user: user,
                id: id,
                session: session,
                setWO: setWO,
                setWoCount: setWoCount
            }, void 0, false, {
                fileName: "[project]/pages/admin/users/[id].tsx",
                lineNumber: 360,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$users$2f$EditUserModal$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                showEditUser: showEditUser,
                setShowEditUser: setShowEditUser,
                user: user,
                id: id,
                setUser: setUser
            }, void 0, false, {
                fileName: "[project]/pages/admin/users/[id].tsx",
                lineNumber: 363,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$users$2f$InquiryDetailModal$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                selectedInq: selectedInq,
                setSelectedInq: setSelectedInq,
                selectedInqProduct: selectedInqProduct,
                setSelectedInqProduct: setSelectedInqProduct,
                user: user
            }, void 0, false, {
                fileName: "[project]/pages/admin/users/[id].tsx",
                lineNumber: 366,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$users$2f$WorkOrderDetailModal$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                selectedWO: selectedWO,
                setSelectedWO: setSelectedWO,
                user: user,
                session: session,
                adminInfo: adminInfo,
                setWO: setWO
            }, void 0, false, {
                fileName: "[project]/pages/admin/users/[id].tsx",
                lineNumber: 369,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__45e16462._.js.map