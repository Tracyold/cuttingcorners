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
"[project]/pages/admin/products.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>AdminProductsPage
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$AdminLayout$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/admin/AdminLayout.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$AdminLayout$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$AdminLayout$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
const TABS = [
    'active',
    'drafts',
    'inactive'
];
const TAB_LABELS = {
    active: 'Live',
    drafts: 'Drafts',
    inactive: 'Inactive'
};
const EMPTY_FORM = {
    title: '',
    gem_type: '',
    color: '',
    shape: '',
    weight: '',
    origin: '',
    treatment: '',
    gia_report_number: '',
    gia_report_pdf_url: '',
    price_per_carat: '',
    total_price: '',
    description: '',
    photo_url: ''
};
function genId() {
    return crypto.randomUUID();
}
async function upsertProduct(p, state) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].from('products').upsert({
        product_id: p.product_id,
        title: p.title || '',
        gem_type: p.gem_type || null,
        color: p.color || null,
        shape: p.shape || null,
        weight: p.weight ? parseFloat(p.weight) : null,
        origin: p.origin || null,
        treatment: p.treatment || null,
        gia_report_number: p.gia_report_number || null,
        gia_report_pdf_url: p.gia_report_pdf_url || null,
        price_per_carat: p.price_per_carat ? parseFloat(p.price_per_carat) : null,
        total_price: p.total_price ? parseFloat(p.total_price) : 0,
        description: p.description || null,
        photo_url: p.photo_url || null,
        product_state: state
    }, {
        onConflict: 'product_id'
    });
}
function GIASection({ value, onChange }) {
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('url');
    const fileRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const [fileName, setFileName] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const handleFile = async (e)=>{
        const f = e.target.files?.[0];
        if (!f) return;
        setFileName(f.name);
        onChange('gia_report_pdf_url', `[uploaded] ${f.name}`);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "gia-blk",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "gia-l",
                children: "GIA Report"
            }, void 0, false, {
                fileName: "[project]/pages/admin/products.tsx",
                lineNumber: 48,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "gia-mr",
                children: [
                    [
                        'url',
                        'PDF URL'
                    ],
                    [
                        'upload',
                        'Upload'
                    ],
                    [
                        'photo',
                        'Photo URL'
                    ]
                ].map(([m, l])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: `gmb ${mode === m ? 'on' : ''}`,
                        onClick: ()=>setMode(m),
                        children: l
                    }, m, false, {
                        fileName: "[project]/pages/admin/products.tsx",
                        lineNumber: 51,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/pages/admin/products.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            mode === 'upload' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "uz",
                onClick: ()=>fileRef.current?.click(),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                        ref: fileRef,
                        type: "file",
                        accept: ".pdf",
                        onChange: handleFile
                    }, void 0, false, {
                        fileName: "[project]/pages/admin/products.tsx",
                        lineNumber: 56,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "ui",
                        children: "↑"
                    }, void 0, false, {
                        fileName: "[project]/pages/admin/products.tsx",
                        lineNumber: 57,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        children: "Click to upload GIA PDF"
                    }, void 0, false, {
                        fileName: "[project]/pages/admin/products.tsx",
                        lineNumber: 57,
                        columnNumber: 38
                    }, this),
                    fileName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "ufn",
                        children: fileName
                    }, void 0, false, {
                        fileName: "[project]/pages/admin/products.tsx",
                        lineNumber: 58,
                        columnNumber: 24
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/admin/products.tsx",
                lineNumber: 55,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                type: "text",
                placeholder: mode === 'url' ? 'https://www.gia.edu/report-check/...' : 'https://... photo URL',
                value: value,
                onChange: (e)=>onChange('gia_report_pdf_url', e.target.value),
                style: {
                    background: 'var(--k1)',
                    border: '.5px solid var(--ln)',
                    color: 'var(--tx)',
                    padding: '8px 10px',
                    fontFamily: 'var(--sans)',
                    fontSize: '18px',
                    width: '100%',
                    outline: 'none'
                }
            }, void 0, false, {
                fileName: "[project]/pages/admin/products.tsx",
                lineNumber: 61,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/pages/admin/products.tsx",
        lineNumber: 47,
        columnNumber: 5
    }, this);
}
function ProductForm({ queue, currentIndex, onCurrentChange, onClose, onAddToQueue, onPublishAll, onSaveDrafts, onSwitchIndex, saving }) {
    const current = queue[currentIndex];
    const [flash, setFlash] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const timerRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const upd = (f, v)=>onCurrentChange({
            ...current,
            [f]: v
        });
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        timerRef.current = setInterval(async ()=>{
            const { error } = await upsertProduct(current, 'DRAFT');
            if (!error) {
                setFlash(true);
                setTimeout(()=>setFlash(false), 2000);
            }
        }, 15000);
        return ()=>clearInterval(timerRef.current);
    }, [
        current
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "ov",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "qp",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "qh",
                        children: [
                            "Queue (",
                            queue.length,
                            "/10)"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/admin/products.tsx",
                        lineNumber: 87,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "ql",
                        children: queue.map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: `qi ${i === currentIndex ? 'cur' : ''}`,
                                onClick: ()=>onSwitchIndex(i),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "qi-t",
                                        children: item.title || '(New Product)'
                                    }, void 0, false, {
                                        fileName: "[project]/pages/admin/products.tsx",
                                        lineNumber: 91,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "qi-id",
                                        children: item.product_id
                                    }, void 0, false, {
                                        fileName: "[project]/pages/admin/products.tsx",
                                        lineNumber: 92,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "qi-s",
                                        children: item._saved ? 'Draft saved' : 'Unsaved'
                                    }, void 0, false, {
                                        fileName: "[project]/pages/admin/products.tsx",
                                        lineNumber: 93,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, item.product_id, true, {
                                fileName: "[project]/pages/admin/products.tsx",
                                lineNumber: 90,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/pages/admin/products.tsx",
                        lineNumber: 88,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        className: "qadd",
                        onClick: onAddToQueue,
                        disabled: queue.length >= 10,
                        children: "+ Add Another"
                    }, void 0, false, {
                        fileName: "[project]/pages/admin/products.tsx",
                        lineNumber: 97,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/admin/products.tsx",
                lineNumber: 86,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "fp",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "fh",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "fh-title",
                                children: [
                                    current.title || 'New Product',
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: 18,
                                            color: 'var(--d1)',
                                            fontWeight: 300,
                                            marginLeft: 10
                                        },
                                        children: [
                                            currentIndex + 1,
                                            " / ",
                                            queue.length
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/admin/products.tsx",
                                        lineNumber: 101,
                                        columnNumber: 69
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/admin/products.tsx",
                                lineNumber: 101,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "fhr",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        className: `sf ${flash ? 'on' : ''}`,
                                        children: "✓ Saved"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/admin/products.tsx",
                                        lineNumber: 102,
                                        columnNumber: 32
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        className: "xb",
                                        onClick: onClose,
                                        children: "×"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/admin/products.tsx",
                                        lineNumber: 102,
                                        columnNumber: 90
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/admin/products.tsx",
                                lineNumber: 102,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/admin/products.tsx",
                        lineNumber: 100,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "fb",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "fr fr3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "fg",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                children: "Product ID"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/admin/products.tsx",
                                                lineNumber: 106,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                readOnly: true,
                                                value: current.product_id
                                            }, void 0, false, {
                                                fileName: "[project]/pages/admin/products.tsx",
                                                lineNumber: 106,
                                                columnNumber: 58
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/admin/products.tsx",
                                        lineNumber: 106,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "fg",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                children: "Date"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/admin/products.tsx",
                                                lineNumber: 107,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                readOnly: true,
                                                value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["fmtDate"])(current.created_at)
                                            }, void 0, false, {
                                                fileName: "[project]/pages/admin/products.tsx",
                                                lineNumber: 107,
                                                columnNumber: 52
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/admin/products.tsx",
                                        lineNumber: 107,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "fg",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                children: "Time"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/admin/products.tsx",
                                                lineNumber: 108,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                readOnly: true,
                                                value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["fmtTime"])(current.created_at)
                                            }, void 0, false, {
                                                fileName: "[project]/pages/admin/products.tsx",
                                                lineNumber: 108,
                                                columnNumber: 52
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/admin/products.tsx",
                                        lineNumber: 108,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/admin/products.tsx",
                                lineNumber: 105,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "fr fr1",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "fg",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                            children: "Title"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/admin/products.tsx",
                                            lineNumber: 110,
                                            columnNumber: 55
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                            placeholder: "e.g. Burmese Pigeon Blood Ruby",
                                            value: current.title,
                                            onChange: (e)=>upd('title', e.target.value)
                                        }, void 0, false, {
                                            fileName: "[project]/pages/admin/products.tsx",
                                            lineNumber: 110,
                                            columnNumber: 75
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/admin/products.tsx",
                                    lineNumber: 110,
                                    columnNumber: 35
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/pages/admin/products.tsx",
                                lineNumber: 110,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "fr fr3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "fg",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                            placeholder: "GemType",
                                            value: current.gem_type,
                                            onChange: (e)=>upd('gem_type', e.target.value)
                                        }, void 0, false, {
                                            fileName: "[project]/pages/admin/products.tsx",
                                            lineNumber: 112,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/pages/admin/products.tsx",
                                        lineNumber: 112,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "fg",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                            placeholder: "Color",
                                            value: current.color,
                                            onChange: (e)=>upd('color', e.target.value)
                                        }, void 0, false, {
                                            fileName: "[project]/pages/admin/products.tsx",
                                            lineNumber: 113,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/pages/admin/products.tsx",
                                        lineNumber: 113,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "fg",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                            placeholder: "Shape",
                                            value: current.shape,
                                            onChange: (e)=>upd('shape', e.target.value)
                                        }, void 0, false, {
                                            fileName: "[project]/pages/admin/products.tsx",
                                            lineNumber: 114,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/pages/admin/products.tsx",
                                        lineNumber: 114,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/admin/products.tsx",
                                lineNumber: 111,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "fr fr3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "fg",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                            placeholder: "weight",
                                            value: current.weight || '',
                                            onChange: (e)=>upd('weight', e.target.value)
                                        }, void 0, false, {
                                            fileName: "[project]/pages/admin/products.tsx",
                                            lineNumber: 117,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/pages/admin/products.tsx",
                                        lineNumber: 117,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "fg",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                            placeholder: "origin",
                                            value: current.origin,
                                            onChange: (e)=>upd('origin', e.target.value)
                                        }, void 0, false, {
                                            fileName: "[project]/pages/admin/products.tsx",
                                            lineNumber: 118,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/pages/admin/products.tsx",
                                        lineNumber: 118,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "fg",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                            placeholder: "treatment",
                                            value: current.treatment,
                                            onChange: (e)=>upd('treatment', e.target.value)
                                        }, void 0, false, {
                                            fileName: "[project]/pages/admin/products.tsx",
                                            lineNumber: 119,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/pages/admin/products.tsx",
                                        lineNumber: 119,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/admin/products.tsx",
                                lineNumber: 116,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "fr fr2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "fg",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                children: "GIA Report Number"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/admin/products.tsx",
                                                lineNumber: 122,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                placeholder: "2211234567",
                                                value: current.gia_report_number,
                                                onChange: (e)=>upd('gia_report_number', e.target.value)
                                            }, void 0, false, {
                                                fileName: "[project]/pages/admin/products.tsx",
                                                lineNumber: 122,
                                                columnNumber: 65
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/admin/products.tsx",
                                        lineNumber: 122,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "fg",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                children: "Photo URL"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/admin/products.tsx",
                                                lineNumber: 123,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                placeholder: "https://...",
                                                value: current.photo_url,
                                                onChange: (e)=>upd('photo_url', e.target.value)
                                            }, void 0, false, {
                                                fileName: "[project]/pages/admin/products.tsx",
                                                lineNumber: 123,
                                                columnNumber: 57
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/admin/products.tsx",
                                        lineNumber: 123,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/admin/products.tsx",
                                lineNumber: 121,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(GIASection, {
                                value: current.gia_report_pdf_url,
                                onChange: upd
                            }, void 0, false, {
                                fileName: "[project]/pages/admin/products.tsx",
                                lineNumber: 125,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "fr fr2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "fg",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                children: "Price Per Carat ($)"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/admin/products.tsx",
                                                lineNumber: 127,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                placeholder: "12000",
                                                value: current.price_per_carat || '',
                                                onChange: (e)=>upd('price_per_carat', e.target.value)
                                            }, void 0, false, {
                                                fileName: "[project]/pages/admin/products.tsx",
                                                lineNumber: 127,
                                                columnNumber: 67
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/admin/products.tsx",
                                        lineNumber: 127,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "fg",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                children: "Total Price ($)"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/admin/products.tsx",
                                                lineNumber: 128,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                placeholder: "41040",
                                                value: current.total_price || '',
                                                onChange: (e)=>upd('total_price', e.target.value)
                                            }, void 0, false, {
                                                fileName: "[project]/pages/admin/products.tsx",
                                                lineNumber: 128,
                                                columnNumber: 63
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/admin/products.tsx",
                                        lineNumber: 128,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/admin/products.tsx",
                                lineNumber: 126,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "fr fr1",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "fg",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                            children: "Description"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/admin/products.tsx",
                                            lineNumber: 130,
                                            columnNumber: 55
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("textarea", {
                                            placeholder: "Additional notes...",
                                            value: current.description,
                                            onChange: (e)=>upd('description', e.target.value)
                                        }, void 0, false, {
                                            fileName: "[project]/pages/admin/products.tsx",
                                            lineNumber: 130,
                                            columnNumber: 81
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/admin/products.tsx",
                                    lineNumber: 130,
                                    columnNumber: 35
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/pages/admin/products.tsx",
                                lineNumber: 130,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/admin/products.tsx",
                        lineNumber: 104,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "ff",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "ff-note",
                                children: queue.length > 1 ? `${queue.length} products in queue` : 'Up to 10 products per session'
                            }, void 0, false, {
                                fileName: "[project]/pages/admin/products.tsx",
                                lineNumber: 133,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "ffa",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        className: "bg",
                                        onClick: onSaveDrafts,
                                        disabled: saving,
                                        children: saving ? 'Saving...' : 'Save Drafts'
                                    }, void 0, false, {
                                        fileName: "[project]/pages/admin/products.tsx",
                                        lineNumber: 135,
                                        columnNumber: 13
                                    }, this),
                                    currentIndex < queue.length - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        className: "bn",
                                        onClick: ()=>onSwitchIndex(currentIndex + 1),
                                        children: "Next →"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/admin/products.tsx",
                                        lineNumber: 136,
                                        columnNumber: 49
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        className: "bp",
                                        onClick: onPublishAll,
                                        disabled: saving,
                                        children: saving ? 'Saving...' : queue.length > 1 ? `Publish All (${queue.length})` : 'Publish'
                                    }, void 0, false, {
                                        fileName: "[project]/pages/admin/products.tsx",
                                        lineNumber: 137,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/admin/products.tsx",
                                lineNumber: 134,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/admin/products.tsx",
                        lineNumber: 132,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/admin/products.tsx",
                lineNumber: 99,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/pages/admin/products.tsx",
        lineNumber: 85,
        columnNumber: 5
    }, this);
}
function AdminProductsPage() {
    const [tab, setTab] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('active');
    const [products, setProducts] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(true);
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [showForm, setShowForm] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [queue, setQueue] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [curIdx, setCurIdx] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(0);
    const filtered = {
        active: products.filter((p)=>p.product_state === 'ACTIVE'),
        drafts: products.filter((p)=>p.product_state === 'DRAFT'),
        inactive: products.filter((p)=>p.product_state === 'INACTIVE')
    };
    async function loadProducts() {
        setLoading(true);
        setError(null);
        const { data, error: e } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].from('products').select('*').order('created_at', {
            ascending: false
        });
        if (e) setError(e.message);
        else setProducts(data || []);
        setLoading(false);
    }
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        loadProducts();
    }, []);
    async function openAdd() {
        const np = {
            ...EMPTY_FORM,
            product_id: genId(),
            created_at: new Date().toISOString(),
            product_state: 'DRAFT',
            _saved: false
        };
        const { error: e } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].from('products').insert({
            product_id: np.product_id,
            title: '',
            total_price: 0,
            product_state: 'DRAFT'
        });
        if (e) {
            setError(e.message);
            return;
        }
        setQueue([
            np
        ]);
        setCurIdx(0);
        setProducts((prev)=>[
                np,
                ...prev
            ]);
        setShowForm(true);
    }
    function openEdit(product) {
        setQueue([
            {
                ...product,
                _saved: true
            }
        ]);
        setCurIdx(0);
        setShowForm(true);
    }
    function updateCurrent(updated) {
        const nq = [
            ...queue
        ];
        nq[curIdx] = updated;
        setQueue(nq);
        setProducts((prev)=>prev.map((p)=>p.product_id === updated.product_id ? updated : p));
    }
    async function addToQueue() {
        if (queue.length >= 10) return;
        const np = {
            ...EMPTY_FORM,
            product_id: genId(),
            created_at: new Date().toISOString(),
            product_state: 'DRAFT',
            _saved: false
        };
        const { error: e } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].from('products').insert({
            product_id: np.product_id,
            title: '',
            total_price: 0,
            product_state: 'DRAFT'
        });
        if (e) {
            setError(e.message);
            return;
        }
        const nq = [
            ...queue,
            np
        ];
        setQueue(nq);
        setCurIdx(nq.length - 1);
        setProducts((prev)=>[
                np,
                ...prev
            ]);
    }
    async function saveDrafts() {
        setSaving(true);
        for (const p of queue){
            const { error: e } = await upsertProduct(p, 'DRAFT');
            if (e) {
                setError(e.message);
                setSaving(false);
                return;
            }
        }
        await loadProducts();
        setSaving(false);
        setShowForm(false);
    }
    async function publishAll() {
        setSaving(true);
        for (const p of queue){
            const { error: e } = await upsertProduct(p, 'ACTIVE');
            if (e) {
                setError(e.message);
                setSaving(false);
                return;
            }
        }
        // TODO: Call send-new-listing-notification edge function for each published product
        // for (const p of queue) { await supabase.functions.invoke('send-new-listing-notification', { body: { product_id: p.product_id } }); }
        await loadProducts();
        setSaving(false);
        setShowForm(false);
        setTab('active');
    }
    async function publishOne(product) {
        const { error: e } = await upsertProduct(product, 'ACTIVE');
        if (e) {
            setError(e.message);
            return;
        }
        // TODO: await supabase.functions.invoke('send-new-listing-notification', { body: { product_id: product.product_id } });
        await loadProducts();
    }
    async function removeOne(product) {
        const { error: e } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].from('products').update({
            product_state: 'INACTIVE'
        }).eq('product_id', product.product_id);
        if (e) {
            setError(e.message);
            return;
        }
        await loadProducts();
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$AdminLayout$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
        activeNav: "products",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "ph",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "ph-title",
                        children: "Products"
                    }, void 0, false, {
                        fileName: "[project]/pages/admin/products.tsx",
                        lineNumber: 222,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "ph-right",
                        children: [
                            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "err-bar",
                                children: error
                            }, void 0, false, {
                                fileName: "[project]/pages/admin/products.tsx",
                                lineNumber: 224,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                className: "btn-add",
                                onClick: openAdd,
                                disabled: loading,
                                children: "+ Add Product"
                            }, void 0, false, {
                                fileName: "[project]/pages/admin/products.tsx",
                                lineNumber: 225,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/admin/products.tsx",
                        lineNumber: 223,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/admin/products.tsx",
                lineNumber: 221,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "tabs",
                children: TABS.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        className: `tab ${tab === t ? 'on' : ''}`,
                        onClick: ()=>setTab(t),
                        children: [
                            TAB_LABELS[t],
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                className: "tab-n",
                                children: filtered[t].length
                            }, void 0, false, {
                                fileName: "[project]/pages/admin/products.tsx",
                                lineNumber: 231,
                                columnNumber: 28
                            }, this)
                        ]
                    }, t, true, {
                        fileName: "[project]/pages/admin/products.tsx",
                        lineNumber: 230,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/pages/admin/products.tsx",
                lineNumber: 228,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "pb",
                children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "loading",
                    children: "Loading Products..."
                }, void 0, false, {
                    fileName: "[project]/pages/admin/products.tsx",
                    lineNumber: 237,
                    columnNumber: 11
                }, this) : filtered[tab].length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "empty",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "empty-ic",
                            children: "◈"
                        }, void 0, false, {
                            fileName: "[project]/pages/admin/products.tsx",
                            lineNumber: 239,
                            columnNumber: 34
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "empty-tx",
                            children: [
                                "No ",
                                TAB_LABELS[tab].toLowerCase(),
                                " products"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/admin/products.tsx",
                            lineNumber: 239,
                            columnNumber: 67
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/pages/admin/products.tsx",
                    lineNumber: 239,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("table", {
                    className: "tbl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("thead", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("tr", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                        children: "Product"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/admin/products.tsx",
                                        lineNumber: 242,
                                        columnNumber: 24
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                        children: "GIA"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/admin/products.tsx",
                                        lineNumber: 242,
                                        columnNumber: 40
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                        children: "Weight"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/admin/products.tsx",
                                        lineNumber: 242,
                                        columnNumber: 52
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                        children: "Status"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/admin/products.tsx",
                                        lineNumber: 242,
                                        columnNumber: 67
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                        children: "Date"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/admin/products.tsx",
                                        lineNumber: 242,
                                        columnNumber: 82
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                        children: "Total Price"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/admin/products.tsx",
                                        lineNumber: 242,
                                        columnNumber: 95
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {}, void 0, false, {
                                        fileName: "[project]/pages/admin/products.tsx",
                                        lineNumber: 242,
                                        columnNumber: 115
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/admin/products.tsx",
                                lineNumber: 242,
                                columnNumber: 20
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/pages/admin/products.tsx",
                            lineNumber: 242,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("tbody", {
                            children: filtered[tab].map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("tr", {
                                    onClick: ()=>openEdit(p),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: "td-name",
                                                    children: p.title || '(New Product)'
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/admin/products.tsx",
                                                    lineNumber: 246,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: "td-sub",
                                                    children: [
                                                        p.gem_type,
                                                        p.color,
                                                        p.origin
                                                    ].filter(Boolean).join(' · ')
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/admin/products.tsx",
                                                    lineNumber: 246,
                                                    columnNumber: 82
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/pages/admin/products.tsx",
                                            lineNumber: 246,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                            style: {
                                                fontSize: 11,
                                                color: 'var(--d1)'
                                            },
                                            children: p.gia_report_number || '--'
                                        }, void 0, false, {
                                            fileName: "[project]/pages/admin/products.tsx",
                                            lineNumber: 247,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                            style: {
                                                fontSize: 12
                                            },
                                            children: p.weight ? `${p.weight} ct` : '--'
                                        }, void 0, false, {
                                            fileName: "[project]/pages/admin/products.tsx",
                                            lineNumber: 248,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                className: `pill pill-${(p.product_state || 'D')[0]}`,
                                                children: p.product_state
                                            }, void 0, false, {
                                                fileName: "[project]/pages/admin/products.tsx",
                                                lineNumber: 249,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/pages/admin/products.tsx",
                                            lineNumber: 249,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                            style: {
                                                fontSize: 11,
                                                color: 'var(--d1)'
                                            },
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["fmtDate"])(p.created_at)
                                        }, void 0, false, {
                                            fileName: "[project]/pages/admin/products.tsx",
                                            lineNumber: 250,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                            className: "td-price",
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["formatMoney"])(p.total_price)
                                        }, void 0, false, {
                                            fileName: "[project]/pages/admin/products.tsx",
                                            lineNumber: 251,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "ra",
                                                onClick: (e)=>e.stopPropagation(),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                        className: "ab",
                                                        onClick: ()=>openEdit(p),
                                                        children: "Edit"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/admin/products.tsx",
                                                        lineNumber: 253,
                                                        columnNumber: 21
                                                    }, this),
                                                    p.product_state === 'DRAFT' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                        className: "ab pub",
                                                        onClick: ()=>publishOne(p),
                                                        children: "Publish"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/admin/products.tsx",
                                                        lineNumber: 254,
                                                        columnNumber: 53
                                                    }, this),
                                                    (p.product_state === 'PUBLISHED' || p.product_state === 'ACTIVE') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                        className: "ab rem",
                                                        onClick: ()=>removeOne(p),
                                                        children: "Remove"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/admin/products.tsx",
                                                        lineNumber: 255,
                                                        columnNumber: 91
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/pages/admin/products.tsx",
                                                lineNumber: 252,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/pages/admin/products.tsx",
                                            lineNumber: 252,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, p.product_id, true, {
                                    fileName: "[project]/pages/admin/products.tsx",
                                    lineNumber: 245,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/pages/admin/products.tsx",
                            lineNumber: 243,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/pages/admin/products.tsx",
                    lineNumber: 241,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/pages/admin/products.tsx",
                lineNumber: 235,
                columnNumber: 7
            }, this),
            showForm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(ProductForm, {
                queue: queue,
                currentIndex: curIdx,
                onCurrentChange: updateCurrent,
                onClose: ()=>setShowForm(false),
                onAddToQueue: addToQueue,
                onPublishAll: publishAll,
                onSaveDrafts: saveDrafts,
                onSwitchIndex: setCurIdx,
                saving: saving
            }, void 0, false, {
                fileName: "[project]/pages/admin/products.tsx",
                lineNumber: 263,
                columnNumber: 20
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/pages/admin/products.tsx",
        lineNumber: 220,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__9bc6493b._.js.map