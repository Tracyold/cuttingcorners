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
"[project]/components/account/InvoiceList.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>InvoiceList
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
function InvoiceList({ invoices }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        style: {
            padding: '28px'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                style: {
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '24px',
                    color: '#FAFAFA',
                    marginBottom: '24px'
                },
                children: "Invoices"
            }, void 0, false, {
                fileName: "[project]/components/account/InvoiceList.tsx",
                lineNumber: 10,
                columnNumber: 7
            }, this),
            invoices.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                className: "acc-empty",
                children: "No invoices"
            }, void 0, false, {
                fileName: "[project]/components/account/InvoiceList.tsx",
                lineNumber: 11,
                columnNumber: 32
            }, this) : invoices.map((inv)=>{
                const item = inv.line_items?.[0];
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: {
                        background: '#0A0A0A',
                        border: '1px solid rgba(255,255,255,0.06)',
                        padding: '16px',
                        marginBottom: '12px'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontFamily: "'Montserrat', sans-serif",
                                            fontSize: '16px',
                                            color: '#FAFAFA'
                                        },
                                        children: item?.title || 'Product'
                                    }, void 0, false, {
                                        fileName: "[project]/components/account/InvoiceList.tsx",
                                        lineNumber: 18,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: '10px',
                                            color: 'rgba(255,255,255,0.35)',
                                            marginTop: '4px'
                                        },
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["fmtDate"])(inv.paid_at)
                                    }, void 0, false, {
                                        fileName: "[project]/components/account/InvoiceList.tsx",
                                        lineNumber: 19,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/account/InvoiceList.tsx",
                                lineNumber: 17,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    textAlign: 'right'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontFamily: "'Courier New', monospace",
                                            fontSize: '17px',
                                            color: 'rgb(48, 177, 98)'
                                        },
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["formatMoney"])(inv.total_amount)
                                    }, void 0, false, {
                                        fileName: "[project]/components/account/InvoiceList.tsx",
                                        lineNumber: 22,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: '8px',
                                            fontWeight: 500,
                                            letterSpacing: '0.2em',
                                            textTransform: 'uppercase',
                                            padding: '2px 6px',
                                            background: 'rgba(45,212,191,0.08)',
                                            color: 'rgba(45,212,191,0.8)'
                                        },
                                        children: "PAID"
                                    }, void 0, false, {
                                        fileName: "[project]/components/account/InvoiceList.tsx",
                                        lineNumber: 23,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/account/InvoiceList.tsx",
                                lineNumber: 21,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/account/InvoiceList.tsx",
                        lineNumber: 16,
                        columnNumber: 13
                    }, this)
                }, inv.invoice_id, false, {
                    fileName: "[project]/components/account/InvoiceList.tsx",
                    lineNumber: 15,
                    columnNumber: 11
                }, this);
            })
        ]
    }, void 0, true, {
        fileName: "[project]/components/account/InvoiceList.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/components/account/WorkOrderList.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>WorkOrderList
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
const STATUS_COLORS = {
    CREATED: {
        bg: 'rgba(212,175,55,0.12)',
        color: '#d4af37'
    },
    ACCEPTED: {
        bg: 'rgba(45,212,191,0.12)',
        color: 'rgba(45,212,191,1)'
    },
    COMPLETED: {
        bg: 'rgba(255,255,255,0.06)',
        color: 'rgba(255,255,255,0.45)'
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
function WorkOrderList({ workOrders, onSelect, onAccept }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        style: {
            padding: '28px'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                style: {
                    fontFamily: "'Oranienbaum', serif",
                    fontSize: '24px',
                    color: '#FAFAFA',
                    marginBottom: '24px'
                },
                children: "Work Orders"
            }, void 0, false, {
                fileName: "[project]/components/account/WorkOrderList.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this),
            workOrders.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                style: {
                    fontSize: '12px',
                    color: 'rgba(255,255,255,0.35)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.2em'
                },
                children: "No work orders"
            }, void 0, false, {
                fileName: "[project]/components/account/WorkOrderList.tsx",
                lineNumber: 22,
                columnNumber: 9
            }, this) : workOrders.map((wo)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: {
                        background: '#0A0A0A',
                        border: '1px solid rgba(255,255,255,0.06)',
                        padding: '16px',
                        marginBottom: '12px',
                        cursor: 'pointer'
                    },
                    onClick: ()=>onSelect(wo),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '8px'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontFamily: "'Montserrat', sans-serif",
                                        fontSize: '16px',
                                        color: '#FAFAFA'
                                    },
                                    children: wo.title
                                }, void 0, false, {
                                    fileName: "[project]/components/account/WorkOrderList.tsx",
                                    lineNumber: 26,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: '8px',
                                        fontWeight: 500,
                                        letterSpacing: '0.2em',
                                        textTransform: 'uppercase',
                                        padding: '3px 7px',
                                        background: STATUS_COLORS[wo.status]?.bg,
                                        color: STATUS_COLORS[wo.status]?.color
                                    },
                                    children: wo.status
                                }, void 0, false, {
                                    fileName: "[project]/components/account/WorkOrderList.tsx",
                                    lineNumber: 27,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/account/WorkOrderList.tsx",
                            lineNumber: 25,
                            columnNumber: 11
                        }, this),
                        wo.service_type && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                fontSize: '11px',
                                color: 'rgba(255,255,255,0.45)',
                                marginBottom: '4px'
                            },
                            children: wo.service_type
                        }, void 0, false, {
                            fileName: "[project]/components/account/WorkOrderList.tsx",
                            lineNumber: 30,
                            columnNumber: 31
                        }, this),
                        wo.estimated_price && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                fontSize: '19px',
                                color: 'rgb(48, 177, 98)',
                                fontFamily: "'Courier New', monospace"
                            },
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["formatMoney"])(wo.estimated_price)
                        }, void 0, false, {
                            fileName: "[project]/components/account/WorkOrderList.tsx",
                            lineNumber: 31,
                            columnNumber: 34
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                fontSize: '10px',
                                color: 'rgba(255,255,255,0.35)',
                                marginTop: '8px'
                            },
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["fmtDate"])(wo.created_at)
                        }, void 0, false, {
                            fileName: "[project]/components/account/WorkOrderList.tsx",
                            lineNumber: 32,
                            columnNumber: 11
                        }, this),
                        wo.status === 'CREATED' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                            onClick: (e)=>{
                                e.stopPropagation();
                                onAccept(wo);
                            },
                            className: "acc-btn-gold",
                            style: {
                                marginTop: '12px',
                                width: 'auto',
                                padding: '8px 16px'
                            },
                            children: "Accept Work Order"
                        }, void 0, false, {
                            fileName: "[project]/components/account/WorkOrderList.tsx",
                            lineNumber: 34,
                            columnNumber: 13
                        }, this)
                    ]
                }, wo.work_order_id, true, {
                    fileName: "[project]/components/account/WorkOrderList.tsx",
                    lineNumber: 24,
                    columnNumber: 9
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/components/account/WorkOrderList.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/components/account/InquiryList.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>InquiryList
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
const SERVICE_TYPES = [
    'Custom Rough Cut',
    'Re-Cut & Re-Polish — Starting Price: $249',
    'Table Re-Polish — Starting Price: $119',
    'Crown Re-Polish — Starting Price: $149',
    'Pavilion Re-Polish — Starting Price: $149',
    'Gemstone Material Cut Design — Starting Price: $99',
    'Virtual Consultation — Free 30 Minute Minimum Consultation'
];
function InquiryList({ inquiries, serviceRequests, inquiryTab, setInquiryTab, showSRForm, srType, srDesc, srSubmitting, srGateMsg, setSrType, setSrDesc, setShowSRForm, onOpenSRForm, onSubmitSR }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        style: {
            padding: '28px'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                style: {
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '24px',
                    color: '#FAFAFA',
                    marginBottom: '16px'
                },
                children: "Inquiries"
            }, void 0, false, {
                fileName: "[project]/components/account/InquiryList.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    gap: '20px',
                    marginBottom: '20px',
                    borderBottom: '1px solid rgba(255,255,255,0.06)'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        className: `acc-tab ${inquiryTab === 'inquiries' ? 'on' : ''}`,
                        onClick: ()=>setInquiryTab('inquiries'),
                        children: "Product Inquiries"
                    }, void 0, false, {
                        fileName: "[project]/components/account/InquiryList.tsx",
                        lineNumber: 39,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        className: `acc-tab ${inquiryTab === 'service' ? 'on' : ''}`,
                        onClick: ()=>setInquiryTab('service'),
                        children: "Service Requests"
                    }, void 0, false, {
                        fileName: "[project]/components/account/InquiryList.tsx",
                        lineNumber: 40,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/account/InquiryList.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            inquiryTab === 'inquiries' ? inquiries.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                className: "acc-empty",
                children: "No product inquiries"
            }, void 0, false, {
                fileName: "[project]/components/account/InquiryList.tsx",
                lineNumber: 44,
                columnNumber: 34
            }, this) : inquiries.map((inq)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: {
                        background: '#0A0A0A',
                        border: '1px solid rgba(255,255,255,0.06)',
                        padding: '14px',
                        marginBottom: '10px'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                            style: {
                                fontSize: '13px',
                                color: 'rgba(255,255,255,0.65)',
                                marginBottom: '6px'
                            },
                            children: inq.description
                        }, void 0, false, {
                            fileName: "[project]/components/account/InquiryList.tsx",
                            lineNumber: 47,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                            style: {
                                fontSize: '10px',
                                color: 'rgba(255,255,255,0.35)'
                            },
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["fmtDate"])(inq.created_at)
                        }, void 0, false, {
                            fileName: "[project]/components/account/InquiryList.tsx",
                            lineNumber: 48,
                            columnNumber: 13
                        }, this)
                    ]
                }, inq.account_inquiry_id, true, {
                    fileName: "[project]/components/account/InquiryList.tsx",
                    lineNumber: 46,
                    columnNumber: 11
                }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        className: "acc-btn-gold",
                        style: {
                            marginBottom: '16px',
                            width: 'auto',
                            padding: '10px 20px'
                        },
                        onClick: onOpenSRForm,
                        children: "Submit Service Request"
                    }, void 0, false, {
                        fileName: "[project]/components/account/InquiryList.tsx",
                        lineNumber: 53,
                        columnNumber: 11
                    }, this),
                    srGateMsg && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        style: {
                            fontSize: '12px',
                            color: 'rgba(255,255,255,0.55)',
                            background: 'rgba(214,180,70,0.08)',
                            padding: '12px',
                            marginBottom: '16px',
                            lineHeight: 1.6
                        },
                        children: srGateMsg
                    }, void 0, false, {
                        fileName: "[project]/components/account/InquiryList.tsx",
                        lineNumber: 56,
                        columnNumber: 25
                    }, this),
                    showSRForm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            background: '#0A0A0A',
                            border: '1px solid rgba(255,255,255,0.06)',
                            padding: '20px',
                            marginBottom: '16px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                className: "acc-label",
                                children: "Service Type *"
                            }, void 0, false, {
                                fileName: "[project]/components/account/InquiryList.tsx",
                                lineNumber: 60,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                value: srType,
                                onChange: (e)=>setSrType(e.target.value),
                                style: {
                                    width: '100%',
                                    background: '#0A0A0A',
                                    border: '1px solid rgba(255,255,255,0.10)',
                                    color: '#FAFAFA',
                                    padding: '10px',
                                    fontFamily: "'Comfortaa', sans-serif",
                                    fontSize: '13px',
                                    marginBottom: '12px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                        value: "",
                                        children: "Select service type"
                                    }, void 0, false, {
                                        fileName: "[project]/components/account/InquiryList.tsx",
                                        lineNumber: 63,
                                        columnNumber: 17
                                    }, this),
                                    SERVICE_TYPES.map((st)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                            value: st,
                                            children: st
                                        }, st, false, {
                                            fileName: "[project]/components/account/InquiryList.tsx",
                                            lineNumber: 64,
                                            columnNumber: 42
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/account/InquiryList.tsx",
                                lineNumber: 61,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                className: "acc-label",
                                children: "Description *"
                            }, void 0, false, {
                                fileName: "[project]/components/account/InquiryList.tsx",
                                lineNumber: 66,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("textarea", {
                                value: srDesc,
                                onChange: (e)=>setSrDesc(e.target.value),
                                placeholder: "Describe your request...",
                                style: {
                                    width: '100%',
                                    background: '#0A0A0A',
                                    border: '1px solid rgba(255,255,255,0.10)',
                                    color: '#FAFAFA',
                                    padding: '10px',
                                    fontFamily: "'Comfortaa', sans-serif",
                                    fontSize: '13px',
                                    minHeight: '96px',
                                    resize: 'vertical',
                                    marginBottom: '12px'
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/account/InquiryList.tsx",
                                lineNumber: 67,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                style: {
                                    fontFamily: "'Comfortaa', sans-serif",
                                    fontSize: '12px',
                                    color: 'rgba(255,255,255,0.45)',
                                    fontStyle: 'italic',
                                    marginBottom: '16px',
                                    lineHeight: 1.6
                                },
                                children: "All prices are estimated starting prices. Some gems may be less, some may be more. No work order prices are set in stone until I am able to inspect the piece and the customer accepts the work order through the website."
                            }, void 0, false, {
                                fileName: "[project]/components/account/InquiryList.tsx",
                                lineNumber: 69,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    gap: '8px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        className: "acc-btn-gold",
                                        onClick: onSubmitSR,
                                        disabled: srSubmitting || !srType || !srDesc.trim(),
                                        style: {
                                            width: 'auto',
                                            padding: '10px 20px'
                                        },
                                        children: srSubmitting ? 'Submitting...' : 'Submit'
                                    }, void 0, false, {
                                        fileName: "[project]/components/account/InquiryList.tsx",
                                        lineNumber: 73,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        className: "acc-btn-ghost",
                                        onClick: ()=>setShowSRForm(false),
                                        children: "Cancel"
                                    }, void 0, false, {
                                        fileName: "[project]/components/account/InquiryList.tsx",
                                        lineNumber: 76,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/account/InquiryList.tsx",
                                lineNumber: 72,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/account/InquiryList.tsx",
                        lineNumber: 59,
                        columnNumber: 13
                    }, this),
                    serviceRequests.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        className: "acc-empty",
                        children: "No service requests"
                    }, void 0, false, {
                        fileName: "[project]/components/account/InquiryList.tsx",
                        lineNumber: 81,
                        columnNumber: 43
                    }, this) : serviceRequests.map((sr)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                background: '#0A0A0A',
                                border: '1px solid rgba(255,255,255,0.06)',
                                padding: '14px',
                                marginBottom: '10px'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: '11px',
                                        color: '#d4af37',
                                        marginBottom: '4px'
                                    },
                                    children: sr.service_type
                                }, void 0, false, {
                                    fileName: "[project]/components/account/InquiryList.tsx",
                                    lineNumber: 84,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: '13px',
                                        color: 'rgba(255,255,255,0.65)',
                                        marginBottom: '6px'
                                    },
                                    children: sr.description
                                }, void 0, false, {
                                    fileName: "[project]/components/account/InquiryList.tsx",
                                    lineNumber: 85,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: '10px',
                                        color: 'rgba(255,255,255,0.35)'
                                    },
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["fmtDate"])(sr.created_at)
                                }, void 0, false, {
                                    fileName: "[project]/components/account/InquiryList.tsx",
                                    lineNumber: 86,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, sr.service_request_id, true, {
                            fileName: "[project]/components/account/InquiryList.tsx",
                            lineNumber: 83,
                            columnNumber: 13
                        }, this))
                ]
            }, void 0, true)
        ]
    }, void 0, true, {
        fileName: "[project]/components/account/InquiryList.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/components/account/HomeTab.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>HomeTab
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
const smToggles = [
    {
        label: 'Work Order Updates',
        col: 'opt_in_work_orders'
    },
    {
        label: 'Tracking Updates',
        col: 'opt_in_tracking'
    },
    {
        label: 'Chat Message Alerts',
        col: 'opt_in_chat'
    },
    {
        label: 'Purchase Confirmations',
        col: 'opt_in_purchases'
    },
    {
        label: 'New Gem Listings',
        col: 'opt_in_new_listings'
    }
];
function HomeTab({ editProfile, profile, profileSaving, profileFlash, hasProfileChanges, invoiceCount, invoiceTotal, smsPrefs, setEditProfile, saveProfile, toggleSms }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        style: {
            padding: '28px'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                style: {
                    fontFamily: "'comfortaa', serif",
                    fontSize: '24px',
                    color: '#FAFAFA',
                    marginBottom: '24px'
                },
                children: "Profile"
            }, void 0, false, {
                fileName: "[project]/components/account/HomeTab.tsx",
                lineNumber: 32,
                columnNumber: 17
            }, this),
            editProfile && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: {
                    display: 'grid',
                    gap: '12px',
                    maxWidth: '500px'
                },
                children: [
                    [
                        {
                            label: 'Name',
                            key: 'name',
                            placeholder: 'Full name'
                        },
                        {
                            label: 'Email',
                            key: 'email',
                            placeholder: 'Email'
                        },
                        {
                            label: 'Phone',
                            key: 'phone',
                            placeholder: 'Phone'
                        },
                        {
                            label: 'Shipping Address',
                            key: 'shipping_address',
                            placeholder: 'Address'
                        },
                        {
                            label: 'Business Name',
                            key: 'business_name',
                            placeholder: 'Add business name'
                        }
                    ].map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                    className: "acc-label",
                                    children: f.label
                                }, void 0, false, {
                                    fileName: "[project]/components/account/HomeTab.tsx",
                                    lineNumber: 43,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                    className: "acc-input",
                                    value: editProfile[f.key] || '',
                                    placeholder: f.placeholder,
                                    onChange: (e)=>setEditProfile({
                                            ...editProfile,
                                            [f.key]: e.target.value
                                        })
                                }, void 0, false, {
                                    fileName: "[project]/components/account/HomeTab.tsx",
                                    lineNumber: 44,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, f.key, true, {
                            fileName: "[project]/components/account/HomeTab.tsx",
                            lineNumber: 42,
                            columnNumber: 23
                        }, this)),
                    hasProfileChanges && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            gap: '8px',
                            marginTop: '8px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                className: "acc-btn-gold",
                                onClick: saveProfile,
                                disabled: profileSaving,
                                children: profileSaving ? 'Saving...' : 'Save'
                            }, void 0, false, {
                                fileName: "[project]/components/account/HomeTab.tsx",
                                lineNumber: 50,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                className: "acc-btn-ghost",
                                onClick: ()=>setEditProfile({
                                        ...profile
                                    }),
                                children: "Cancel"
                            }, void 0, false, {
                                fileName: "[project]/components/account/HomeTab.tsx",
                                lineNumber: 53,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/account/HomeTab.tsx",
                        lineNumber: 49,
                        columnNumber: 23
                    }, this),
                    profileFlash && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                        style: {
                            color: '#d4af37',
                            fontSize: '11px'
                        },
                        children: "✓ Saved"
                    }, void 0, false, {
                        fileName: "[project]/components/account/HomeTab.tsx",
                        lineNumber: 56,
                        columnNumber: 38
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/account/HomeTab.tsx",
                lineNumber: 34,
                columnNumber: 19
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: {
                    marginTop: '32px',
                    padding: '20px',
                    background: '#0A0A0A',
                    border: '1px solid rgba(255,255,255,0.06)'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                        style: {
                            fontFamily: "'Courier New', monospace",
                            fontSize: '19px',
                            color: 'rgb(48, 177, 98)'
                        },
                        children: invoiceCount
                    }, void 0, false, {
                        fileName: "[project]/components/account/HomeTab.tsx",
                        lineNumber: 62,
                        columnNumber: 19
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                        style: {
                            fontSize: '17px',
                            color: 'rgba(255,255,255,0.55)',
                            marginLeft: '8px'
                        },
                        children: "items purchased"
                    }, void 0, false, {
                        fileName: "[project]/components/account/HomeTab.tsx",
                        lineNumber: 63,
                        columnNumber: 19
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                        style: {
                            margin: '0 12px',
                            color: 'rgba(255,255,255,0.15)'
                        },
                        children: "|"
                    }, void 0, false, {
                        fileName: "[project]/components/account/HomeTab.tsx",
                        lineNumber: 64,
                        columnNumber: 19
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                        style: {
                            fontFamily: "'Courier New', monospace",
                            fontSize: '18px',
                            color: 'rgb(48, 177, 98)'
                        },
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["formatMoney"])(invoiceTotal)
                    }, void 0, false, {
                        fileName: "[project]/components/account/HomeTab.tsx",
                        lineNumber: 65,
                        columnNumber: 19
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                        style: {
                            fontSize: '12px',
                            color: 'rgba(255,255,255,0.55)',
                            marginLeft: '8px'
                        },
                        children: "total spent"
                    }, void 0, false, {
                        fileName: "[project]/components/account/HomeTab.tsx",
                        lineNumber: 66,
                        columnNumber: 19
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/account/HomeTab.tsx",
                lineNumber: 61,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: {
                    marginTop: '32px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                        style: {
                            fontFamily: "'Montserrat', sans-serif",
                            fontSize: '11px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.2em',
                            color: 'rgba(255,255,255,0.55)',
                            marginBottom: '16px'
                        },
                        children: "Notification Preferences"
                    }, void 0, false, {
                        fileName: "[project]/components/account/HomeTab.tsx",
                        lineNumber: 71,
                        columnNumber: 19
                    }, this),
                    smToggles.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '10px 0',
                                borderBottom: '1px solid rgba(255,255,255,0.06)'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: '13px',
                                        color: 'rgba(255,255,255,0.65)'
                                    },
                                    children: t.label
                                }, void 0, false, {
                                    fileName: "[project]/components/account/HomeTab.tsx",
                                    lineNumber: 74,
                                    columnNumber: 23
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    onClick: ()=>toggleSms(t.col, !smsPrefs?.[t.col]),
                                    style: {
                                        width: '40px',
                                        height: '22px',
                                        borderRadius: '11px',
                                        border: 'none',
                                        cursor: 'pointer',
                                        position: 'relative',
                                        background: smsPrefs?.[t.col] ? '#d4af37' : 'rgba(255,255,255,0.12)',
                                        transition: 'background 200ms'
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        style: {
                                            width: '16px',
                                            height: '16px',
                                            borderRadius: '50%',
                                            background: '#fff',
                                            position: 'absolute',
                                            top: '3px',
                                            left: smsPrefs?.[t.col] ? '21px' : '3px',
                                            transition: 'left 200ms'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/components/account/HomeTab.tsx",
                                        lineNumber: 82,
                                        columnNumber: 25
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/account/HomeTab.tsx",
                                    lineNumber: 75,
                                    columnNumber: 23
                                }, this)
                            ]
                        }, t.col, true, {
                            fileName: "[project]/components/account/HomeTab.tsx",
                            lineNumber: 73,
                            columnNumber: 21
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        style: {
                            fontSize: '11px',
                            color: 'rgba(255,255,255,0.35)',
                            marginTop: '12px',
                            fontStyle: 'italic'
                        },
                        children: "We'll send SMS alerts to your phone number on file"
                    }, void 0, false, {
                        fileName: "[project]/components/account/HomeTab.tsx",
                        lineNumber: 89,
                        columnNumber: 19
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/account/HomeTab.tsx",
                lineNumber: 70,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/account/HomeTab.tsx",
        lineNumber: 31,
        columnNumber: 15
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/components/account/WorkOrderDetailModal.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>WorkOrderDetailModal
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
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
const STATUS_COLORS = {
    CREATED: {
        bg: 'rgba(212,175,55,0.12)',
        color: '#d4af37'
    },
    ACCEPTED: {
        bg: 'rgba(45,212,191,0.12)',
        color: 'rgba(45,212,191,1)'
    },
    COMPLETED: {
        bg: 'rgba(255,255,255,0.06)',
        color: 'rgba(255,255,255,0.45)'
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
function WorkOrderDetailModal({ selectedWO, adminInfo, profile, showAddressEdit, tempAddress, addressConfirmed, setSelectedWO, setShowAddressEdit, setTempAddress, setAddressConfirmed, setWorkOrders, acceptWO }) {
    if (!selectedWO) return null;
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
            if (e.target === e.currentTarget) {
                setSelectedWO(null);
                setShowAddressEdit(false);
                setAddressConfirmed(false);
            }
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            style: {
                background: '#0A0A0A',
                border: '1px solid rgba(255,255,255,0.10)',
                padding: '40px',
                maxWidth: '680px',
                width: '100%',
                maxHeight: '92vh',
                overflowY: 'auto',
                borderRadius: '2px'
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
                                        fontFamily: "'Montserrat', sans-serif",
                                        fontSize: '10px',
                                        letterSpacing: '0.2em',
                                        textTransform: 'uppercase',
                                        color: 'rgba(255,255,255,0.35)',
                                        marginBottom: '4px'
                                    },
                                    children: "Work Order"
                                }, void 0, false, {
                                    fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                                    lineNumber: 43,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontFamily: "'Oranienbaum', serif",
                                        fontSize: '23px',
                                        color: 'rgba(255,255,255,0.88)'
                                    },
                                    children: selectedWO.title
                                }, void 0, false, {
                                    fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                                    lineNumber: 44,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                            lineNumber: 42,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                            style: {
                                fontSize: '9px',
                                fontWeight: 500,
                                letterSpacing: '0.2em',
                                textTransform: 'uppercase',
                                padding: '4px 9px',
                                background: STATUS_COLORS[selectedWO.status]?.bg,
                                color: STATUS_COLORS[selectedWO.status]?.color
                            },
                            children: selectedWO.status
                        }, void 0, false, {
                            fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                            lineNumber: 46,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                    lineNumber: 41,
                    columnNumber: 9
                }, this),
                adminInfo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: {
                        marginBottom: '16px',
                        padding: '17px',
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid rgba(255,255,255,0.06)'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '8px'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontFamily: "'Montserrat', sans-serif",
                                        fontSize: '11px',
                                        letterSpacing: '0.2em',
                                        textTransform: 'uppercase',
                                        color: 'rgba(255,255,255,0.35)'
                                    },
                                    children: "Send To"
                                }, void 0, false, {
                                    fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                                    lineNumber: 53,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontFamily: "'Montserrat', sans-serif",
                                        fontSize: '10px',
                                        fontWeight: 700,
                                        letterSpacing: '0.15em',
                                        textTransform: 'uppercase',
                                        color: '#ffd700'
                                    },
                                    children: "← SEND TO THIS ADDRESS"
                                }, void 0, false, {
                                    fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                                    lineNumber: 54,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                            lineNumber: 52,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                fontFamily: "'Comfortaa', sans-serif",
                                fontSize: '15px',
                                color: 'rgba(255,255,255,0.65)',
                                lineHeight: 2
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        color: '#d4af37',
                                        fontWeight: 600,
                                        fontSize: '16px'
                                    },
                                    children: adminInfo.business_name
                                }, void 0, false, {
                                    fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                                    lineNumber: 57,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    children: adminInfo.full_name
                                }, void 0, false, {
                                    fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                                    lineNumber: 58,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    children: adminInfo.address
                                }, void 0, false, {
                                    fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                                    lineNumber: 59,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    children: adminInfo.contact_email
                                }, void 0, false, {
                                    fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                                    lineNumber: 60,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    children: adminInfo.phone
                                }, void 0, false, {
                                    fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                                    lineNumber: 61,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                            lineNumber: 56,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                    lineNumber: 51,
                    columnNumber: 11
                }, this),
                profile && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: {
                        marginBottom: '21px',
                        padding: '17px',
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid rgba(255,255,255,0.06)'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '8px'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontFamily: "'Montserrat', sans-serif",
                                        fontSize: '11px',
                                        letterSpacing: '0.2em',
                                        textTransform: 'uppercase',
                                        color: 'rgba(255,255,255,0.35)'
                                    },
                                    children: "Return To"
                                }, void 0, false, {
                                    fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                                    lineNumber: 70,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontFamily: "'Montserrat', sans-serif",
                                                fontSize: '10px',
                                                fontWeight: 700,
                                                letterSpacing: '0.15em',
                                                textTransform: 'uppercase',
                                                color: '#ffd700'
                                            },
                                            children: "RETURN TO THIS ADDRESS →"
                                        }, void 0, false, {
                                            fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                                            lineNumber: 72,
                                            columnNumber: 17
                                        }, this),
                                        selectedWO.status === 'CREATED' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                            onClick: ()=>{
                                                setTempAddress(selectedWO.wo_shipping_address || profile.shipping_address || '');
                                                setShowAddressEdit(true);
                                            },
                                            style: {
                                                fontFamily: "'Montserrat', sans-serif",
                                                fontSize: '9px',
                                                letterSpacing: '0.15em',
                                                textTransform: 'uppercase',
                                                background: 'none',
                                                border: '1px solid rgba(255,255,255,0.15)',
                                                color: 'rgba(255,255,255,0.5)',
                                                padding: '4px 8px',
                                                cursor: 'pointer'
                                            },
                                            children: "Edit"
                                        }, void 0, false, {
                                            fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                                            lineNumber: 74,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                                    lineNumber: 71,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                            lineNumber: 69,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                fontFamily: "'Comfortaa', sans-serif",
                                fontSize: '15px',
                                color: 'rgba(255,255,255,0.65)',
                                lineHeight: 2
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        color: 'rgba(255,255,255,0.85)',
                                        fontSize: '16px'
                                    },
                                    children: profile.name
                                }, void 0, false, {
                                    fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                                    lineNumber: 82,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    children: profile.email
                                }, void 0, false, {
                                    fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                                    lineNumber: 83,
                                    columnNumber: 15
                                }, this),
                                profile.phone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    children: profile.phone
                                }, void 0, false, {
                                    fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                                    lineNumber: 84,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        color: '#FAFAFA'
                                    },
                                    children: selectedWO.wo_shipping_address || profile.shipping_address || 'No address on file'
                                }, void 0, false, {
                                    fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                                    lineNumber: 85,
                                    columnNumber: 15
                                }, this),
                                selectedWO.wo_shipping_address && selectedWO.wo_shipping_address !== profile.shipping_address && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: '10px',
                                        color: '#ffd700',
                                        marginTop: '4px',
                                        fontStyle: 'italic'
                                    },
                                    children: "* Custom address for this work order only"
                                }, void 0, false, {
                                    fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                                    lineNumber: 87,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                            lineNumber: 81,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                    lineNumber: 68,
                    columnNumber: 11
                }, this),
                showAddressEdit && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: {
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        padding: '16px',
                        marginBottom: '16px',
                        borderRadius: '4px'
                    },
                    children: !addressConfirmed ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                style: {
                                    fontFamily: "'Montserrat', sans-serif",
                                    fontSize: '10px',
                                    letterSpacing: '0.15em',
                                    textTransform: 'uppercase',
                                    color: '#ffd700',
                                    marginBottom: '8px'
                                },
                                children: "Update Return Address"
                            }, void 0, false, {
                                fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                                lineNumber: 98,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                style: {
                                    fontFamily: "'Comfortaa', sans-serif",
                                    fontSize: '12px',
                                    color: 'rgba(255,255,255,0.55)',
                                    marginBottom: '12px',
                                    lineHeight: 1.6
                                },
                                children: "This change applies to this work order only and does not update your profile. By confirming, you agree this is the address we will ship your item to upon completion."
                            }, void 0, false, {
                                fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                                lineNumber: 99,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                value: tempAddress,
                                onChange: (e)=>setTempAddress(e.target.value),
                                placeholder: "Enter address for this work order...",
                                style: {
                                    width: '100%',
                                    background: 'rgba(255,255,255,0.04)',
                                    border: '1px solid rgba(255,255,255,0.10)',
                                    padding: '10px 12px',
                                    color: '#FAFAFA',
                                    fontFamily: "'Comfortaa', sans-serif",
                                    fontSize: '13px',
                                    outline: 'none',
                                    marginBottom: '10px'
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                                lineNumber: 102,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    gap: '8px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        onClick: async ()=>{
                                            if (!tempAddress.trim()) return;
                                            const log = [
                                                ...Array.isArray(selectedWO.edit_history) ? selectedWO.edit_history : [],
                                                {
                                                    action: 'Return address updated by user',
                                                    by: 'user',
                                                    at: new Date().toISOString()
                                                }
                                            ];
                                            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].from('work_orders').update({
                                                wo_shipping_address: tempAddress.trim(),
                                                edit_history: log
                                            }).eq('work_order_id', selectedWO.work_order_id);
                                            setSelectedWO((prev)=>({
                                                    ...prev,
                                                    wo_shipping_address: tempAddress.trim(),
                                                    edit_history: log
                                                }));
                                            setWorkOrders((prev)=>prev.map((w)=>w.work_order_id === selectedWO.work_order_id ? {
                                                        ...w,
                                                        wo_shipping_address: tempAddress.trim(),
                                                        edit_history: log
                                                    } : w));
                                            setAddressConfirmed(true);
                                        },
                                        style: {
                                            fontFamily: "'Montserrat', sans-serif",
                                            fontSize: '10px',
                                            fontWeight: 600,
                                            letterSpacing: '0.15em',
                                            textTransform: 'uppercase',
                                            background: '#d4af37',
                                            color: '#050505',
                                            border: 'none',
                                            padding: '10px 16px',
                                            cursor: 'pointer'
                                        },
                                        children: "Confirm Address"
                                    }, void 0, false, {
                                        fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                                        lineNumber: 106,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowAddressEdit(false),
                                        style: {
                                            fontFamily: "'Montserrat', sans-serif",
                                            fontSize: '10px',
                                            letterSpacing: '0.15em',
                                            textTransform: 'uppercase',
                                            background: 'none',
                                            border: '1px solid rgba(255,255,255,0.10)',
                                            color: 'rgba(255,255,255,0.4)',
                                            padding: '10px 16px',
                                            cursor: 'pointer'
                                        },
                                        children: "Cancel"
                                    }, void 0, false, {
                                        fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                                        lineNumber: 117,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                                lineNumber: 105,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        style: {
                            fontFamily: "'Comfortaa', sans-serif",
                            fontSize: '13px',
                            color: 'rgba(45,212,191,1)'
                        },
                        children: "✓ Address updated for this work order."
                    }, void 0, false, {
                        fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                        lineNumber: 124,
                        columnNumber: 15
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                    lineNumber: 95,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: {
                        height: '1px',
                        background: 'rgba(255,255,255,0.06)',
                        margin: '16px 0'
                    }
                }, void 0, false, {
                    fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                    lineNumber: 129,
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
                    }
                ].filter((r)=>r.val).map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '8px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                style: {
                                    fontFamily: "'Montserrat', sans-serif",
                                    fontSize: '11px',
                                    letterSpacing: '0.18em',
                                    textTransform: 'uppercase',
                                    color: 'rgba(255,255,255,0.40)'
                                },
                                children: r.label
                            }, void 0, false, {
                                fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                                lineNumber: 142,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                style: {
                                    fontFamily: "'Comfortaa', sans-serif",
                                    fontSize: '15px',
                                    color: 'rgba(255,255,255,0.72)'
                                },
                                children: r.val
                            }, void 0, false, {
                                fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                                lineNumber: 143,
                                columnNumber: 13
                            }, this)
                        ]
                    }, r.label, true, {
                        fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                        lineNumber: 141,
                        columnNumber: 11
                    }, this)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: {
                        marginTop: '16px'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                fontFamily: "'Montserrat', sans-serif",
                                fontSize: '10px',
                                letterSpacing: '0.18em',
                                textTransform: 'uppercase',
                                color: 'rgba(255,255,255,0.35)',
                                marginBottom: '6px'
                            },
                            children: "Description"
                        }, void 0, false, {
                            fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                            lineNumber: 148,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                            style: {
                                fontFamily: "'Comfortaa', sans-serif",
                                fontSize: '15px',
                                color: 'rgba(255,255,255,0.68)',
                                lineHeight: 1.8
                            },
                            children: selectedWO.description
                        }, void 0, false, {
                            fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                            lineNumber: 149,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                    lineNumber: 147,
                    columnNumber: 9
                }, this),
                selectedWO.notes && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: {
                        marginTop: '16px'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                fontFamily: "'Montserrat', sans-serif",
                                fontSize: '10px',
                                letterSpacing: '0.18em',
                                textTransform: 'uppercase',
                                color: 'rgba(255,255,255,0.35)',
                                marginBottom: '6px'
                            },
                            children: "Notes"
                        }, void 0, false, {
                            fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                            lineNumber: 154,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                            style: {
                                fontFamily: "'Comfortaa', sans-serif",
                                fontSize: '13px',
                                color: 'rgba(255,255,255,0.45)',
                                lineHeight: 1.7
                            },
                            children: selectedWO.notes
                        }, void 0, false, {
                            fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                            lineNumber: 155,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                    lineNumber: 153,
                    columnNumber: 11
                }, this),
                selectedWO.estimated_price && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: {
                        marginTop: '20px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                        padding: '16px',
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid rgba(255,255,255,0.06)'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                            style: {
                                fontFamily: "'Montserrat', sans-serif",
                                fontSize: '10px',
                                letterSpacing: '0.18em',
                                textTransform: 'uppercase',
                                color: 'rgba(255,255,255,0.35)'
                            },
                            children: "Quoted Price"
                        }, void 0, false, {
                            fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                            lineNumber: 161,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                            style: {
                                fontFamily: "'Courier New', monospace",
                                fontSize: '22px',
                                color: 'rgba(45,212,191,1)'
                            },
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["formatMoney"])(selectedWO.estimated_price)
                        }, void 0, false, {
                            fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                            lineNumber: 162,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                    lineNumber: 160,
                    columnNumber: 11
                }, this),
                selectedWO.status === 'COMPLETED' && selectedWO.stripe_payment_link && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: {
                        marginTop: '16px',
                        padding: '16px',
                        background: 'rgba(212,175,55,0.06)',
                        border: '1px solid rgba(212,175,55,0.2)'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                fontFamily: "'Montserrat', sans-serif",
                                fontSize: '10px',
                                letterSpacing: '0.18em',
                                textTransform: 'uppercase',
                                color: 'rgba(255,255,255,0.35)',
                                marginBottom: '10px'
                            },
                            children: "Payment"
                        }, void 0, false, {
                            fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                            lineNumber: 169,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                            href: selectedWO.stripe_payment_link,
                            target: "_blank",
                            rel: "noopener noreferrer",
                            style: {
                                fontFamily: "'Montserrat', sans-serif",
                                fontSize: '11px',
                                fontWeight: 600,
                                letterSpacing: '0.15em',
                                textTransform: 'uppercase',
                                background: '#d4af37',
                                color: '#050505',
                                padding: '12px 20px',
                                textDecoration: 'none',
                                display: 'inline-block'
                            },
                            children: "Pay Now"
                        }, void 0, false, {
                            fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                            lineNumber: 170,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                    lineNumber: 168,
                    columnNumber: 11
                }, this),
                selectedWO.status === 'COMPLETED' && selectedWO.paid_outside_site && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: {
                        marginTop: '16px',
                        padding: '14px',
                        background: 'rgba(45,212,191,0.06)',
                        border: '1px solid rgba(45,212,191,0.15)'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                        style: {
                            fontFamily: "'Comfortaa', sans-serif",
                            fontSize: '13px',
                            color: 'rgba(45,212,191,1)'
                        },
                        children: "✓ Payment received — thank you!"
                    }, void 0, false, {
                        fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                        lineNumber: 178,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                    lineNumber: 177,
                    columnNumber: 11
                }, this),
                selectedWO.status === 'CONFIRMED' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: {
                        marginTop: '16px',
                        padding: '14px',
                        background: 'rgba(179,136,255,0.06)',
                        border: '1px solid rgba(179,136,255,0.2)'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        style: {
                            fontFamily: "'Comfortaa', sans-serif",
                            fontSize: '13px',
                            color: '#b388ff',
                            lineHeight: 1.6
                        },
                        children: "Your work order has been confirmed! Please send your item to the address above. We'll notify you when we receive it."
                    }, void 0, false, {
                        fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                        lineNumber: 185,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                    lineNumber: 184,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: {
                        display: 'flex',
                        gap: '8px',
                        marginTop: '24px'
                    },
                    children: [
                        selectedWO.status === 'CREATED' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                            className: "acc-btn-gold",
                            style: {
                                width: 'auto',
                                padding: '10px 20px'
                            },
                            onClick: ()=>{
                                acceptWO(selectedWO);
                            },
                            children: "Accept Work Order"
                        }, void 0, false, {
                            fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                            lineNumber: 194,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                            className: "acc-btn-ghost",
                            onClick: ()=>{
                                setSelectedWO(null);
                                setShowAddressEdit(false);
                                setAddressConfirmed(false);
                            },
                            style: {
                                marginLeft: 'auto'
                            },
                            children: "Close"
                        }, void 0, false, {
                            fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                            lineNumber: 198,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                    lineNumber: 192,
                    columnNumber: 9
                }, this),
                selectedWO.edit_history && selectedWO.edit_history.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: {
                        marginTop: '28px',
                        borderTop: '1px solid rgba(255,255,255,0.06)',
                        paddingTop: '16px'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                fontFamily: "'Montserrat', sans-serif",
                                fontSize: '10px',
                                letterSpacing: '0.2em',
                                textTransform: 'uppercase',
                                color: 'rgba(255,255,255,0.35)',
                                marginBottom: '10px'
                            },
                            children: "Activity Log"
                        }, void 0, false, {
                            fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                            lineNumber: 204,
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
                                                    fontFamily: "'Montserrat', sans-serif",
                                                    fontSize: '10px',
                                                    fontWeight: 700,
                                                    letterSpacing: '0.15em',
                                                    textTransform: 'uppercase',
                                                    padding: '2px 6px',
                                                    background: entry.by === 'admin' ? 'rgba(212,175,55,0.12)' : 'rgba(45,212,191,0.1)',
                                                    color: entry.by === 'admin' ? '#d4af37' : 'rgba(45,212,191,0.9)'
                                                },
                                                children: entry.by
                                            }, void 0, false, {
                                                fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                                                lineNumber: 208,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontFamily: "'Comfortaa', sans-serif",
                                                    fontSize: '13px',
                                                    color: 'rgba(255,255,255,0.65)'
                                                },
                                                children: entry.action
                                            }, void 0, false, {
                                                fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                                                lineNumber: 209,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                                        lineNumber: 207,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontFamily: "'Montserrat', sans-serif",
                                            fontSize: '10px',
                                            color: 'rgba(255,255,255,0.3)',
                                            whiteSpace: 'nowrap',
                                            flexShrink: 0
                                        },
                                        children: [
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["fmtDate"])(entry.at),
                                            " · ",
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["fmtTime"])(entry.at)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                                        lineNumber: 211,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                                lineNumber: 206,
                                columnNumber: 15
                            }, this))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                    lineNumber: 203,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
            lineNumber: 38,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/components/account/ChatPanel.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>ChatPanel
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
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
function ChatPanel({ messages, chatInput, chatSending, chatUploading, chatOpen, chatEndRef, chatFileRef, setChatInput, setChatOpen, openChatDrawer, sendChat, handleChatFile }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "acc-right",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "acc-chat-header",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                style: {
                                    fontFamily: "'Montserrat', sans-serif",
                                    fontSize: '11px',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                    color: '#d4af37'
                                },
                                children: "Chat"
                            }, void 0, false, {
                                fileName: "[project]/components/account/ChatPanel.tsx",
                                lineNumber: 29,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                style: {
                                    fontFamily: "'Comfortaa', sans-serif",
                                    fontSize: '13px',
                                    color: 'rgba(255,255,255,0.45)',
                                    marginTop: '5px'
                                },
                                children: "We're here to help — don't hesitate to reach out"
                            }, void 0, false, {
                                fileName: "[project]/components/account/ChatPanel.tsx",
                                lineNumber: 30,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/account/ChatPanel.tsx",
                        lineNumber: 28,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "acc-chat-messages",
                        children: [
                            messages.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: m.actor === 'ACCOUNT' ? 'flex-end' : 'flex-start',
                                        marginBottom: '13px'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            style: {
                                                maxWidth: '80%',
                                                padding: '11px 15px',
                                                borderRadius: '14px',
                                                background: m.actor === 'ACCOUNT' ? 'rgba(45,212,191,1)' : '#d4af37',
                                                color: '#050505',
                                                fontFamily: "'Comfortaa', sans-serif",
                                                fontSize: '15.9px',
                                                lineHeight: 1.7
                                            },
                                            children: [
                                                m.body && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    children: m.body
                                                }, void 0, false, {
                                                    fileName: "[project]/components/account/ChatPanel.tsx",
                                                    lineNumber: 40,
                                                    columnNumber: 28
                                                }, this),
                                                m.attachment_url && m.attachment_type?.startsWith('image/') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                                    src: m.attachment_url.startsWith('http') ? m.attachment_url : __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].storage.from('ChatUploads').getPublicUrl(m.attachment_url).data.publicUrl,
                                                    alt: "attachment",
                                                    style: {
                                                        maxWidth: '180px',
                                                        maxHeight: '180px',
                                                        objectFit: 'cover',
                                                        marginTop: m.body ? '6px' : '0',
                                                        borderRadius: '6px'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/components/account/ChatPanel.tsx",
                                                    lineNumber: 42,
                                                    columnNumber: 19
                                                }, this),
                                                m.attachment_url && m.attachment_type === 'application/pdf' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        marginTop: m.body ? '7px' : '0',
                                                        fontSize: '15.9px'
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
                                                            fileName: "[project]/components/account/ChatPanel.tsx",
                                                            lineNumber: 45,
                                                            columnNumber: 91
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/account/ChatPanel.tsx",
                                                    lineNumber: 45,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/account/ChatPanel.tsx",
                                            lineNumber: 35,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontSize: '13px',
                                                color: 'rgba(255,255,255,0.38)',
                                                marginTop: '3px',
                                                fontFamily: "'Montserrat', sans-serif"
                                            },
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["fmtTime"])(m.created_at)
                                        }, void 0, false, {
                                            fileName: "[project]/components/account/ChatPanel.tsx",
                                            lineNumber: 48,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, m.chat_message_id, true, {
                                    fileName: "[project]/components/account/ChatPanel.tsx",
                                    lineNumber: 34,
                                    columnNumber: 13
                                }, this)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                ref: chatEndRef
                            }, void 0, false, {
                                fileName: "[project]/components/account/ChatPanel.tsx",
                                lineNumber: 51,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/account/ChatPanel.tsx",
                        lineNumber: 32,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "acc-chat-input-bar",
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
                                fileName: "[project]/components/account/ChatPanel.tsx",
                                lineNumber: 54,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                onClick: ()=>chatFileRef.current?.click(),
                                disabled: chatUploading,
                                style: {
                                    background: 'none',
                                    border: '1px solid rgba(255,255,255,0.10)',
                                    color: 'rgba(255,255,255,0.45)',
                                    padding: '11px',
                                    cursor: 'pointer',
                                    fontSize: '17px',
                                    flexShrink: 0
                                },
                                title: "Attach file",
                                children: chatUploading ? '...' : '📎'
                            }, void 0, false, {
                                fileName: "[project]/components/account/ChatPanel.tsx",
                                lineNumber: 55,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                value: chatInput,
                                onChange: (e)=>setChatInput(e.target.value),
                                placeholder: "Type a message...",
                                className: "acc-chat-input",
                                onKeyDown: (e)=>{
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        sendChat();
                                    }
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/account/ChatPanel.tsx",
                                lineNumber: 56,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                onClick: sendChat,
                                disabled: chatSending || !chatInput.trim(),
                                className: "acc-chat-send",
                                children: chatSending ? '...' : '→'
                            }, void 0, false, {
                                fileName: "[project]/components/account/ChatPanel.tsx",
                                lineNumber: 59,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/account/ChatPanel.tsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/account/ChatPanel.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: `acc-chat-mobile-bar ${chatOpen ? 'hidden' : ''}`,
                onClick: openChatDrawer,
                children: "Chat with Admin"
            }, void 0, false, {
                fileName: "[project]/components/account/ChatPanel.tsx",
                lineNumber: 66,
                columnNumber: 7
            }, this),
            chatOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "acc-chat-mobile-drawer",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "acc-chat-header",
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                style: {
                                    fontFamily: "'Montserrat', sans-serif",
                                    fontSize: '13px',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.3em',
                                    color: '#d4af37'
                                },
                                children: "Chat"
                            }, void 0, false, {
                                fileName: "[project]/components/account/ChatPanel.tsx",
                                lineNumber: 72,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                onClick: ()=>setChatOpen(false),
                                style: {
                                    background: 'none',
                                    border: 'none',
                                    color: 'rgba(255,255,255,0.5)',
                                    cursor: 'pointer',
                                    fontSize: '19px'
                                },
                                children: "↓"
                            }, void 0, false, {
                                fileName: "[project]/components/account/ChatPanel.tsx",
                                lineNumber: 73,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/account/ChatPanel.tsx",
                        lineNumber: 71,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "acc-chat-messages",
                        style: {
                            flex: 1
                        },
                        children: [
                            messages.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: m.actor === 'ACCOUNT' ? 'flex-end' : 'flex-start',
                                        marginBottom: '13px'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            style: {
                                                maxWidth: '80%',
                                                padding: '11px 15px',
                                                borderRadius: '1.7px',
                                                background: m.actor === 'ACCOUNT' ? 'rgba(45,212,191,1)' : '#d4af37',
                                                color: '#050505',
                                                fontFamily: "'Comfortaa', sans-serif",
                                                fontSize: '17px'
                                            },
                                            children: [
                                                m.body && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    children: m.body
                                                }, void 0, false, {
                                                    fileName: "[project]/components/account/ChatPanel.tsx",
                                                    lineNumber: 83,
                                                    columnNumber: 30
                                                }, this),
                                                m.attachment_url && m.attachment_type?.startsWith('image/') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                                    src: m.attachment_url.startsWith('http') ? m.attachment_url : __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].storage.from('ChatUploads').getPublicUrl(m.attachment_url).data.publicUrl,
                                                    alt: "attachment",
                                                    style: {
                                                        maxWidth: '180px',
                                                        maxHeight: '180px',
                                                        objectFit: 'cover',
                                                        marginTop: m.body ? '6px' : '0',
                                                        borderRadius: '6px'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/components/account/ChatPanel.tsx",
                                                    lineNumber: 85,
                                                    columnNumber: 21
                                                }, this),
                                                m.attachment_url && m.attachment_type === 'application/pdf' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        marginTop: m.body ? '6px' : '0',
                                                        fontSize: '12px'
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
                                                            fileName: "[project]/components/account/ChatPanel.tsx",
                                                            lineNumber: 88,
                                                            columnNumber: 91
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/account/ChatPanel.tsx",
                                                    lineNumber: 88,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/account/ChatPanel.tsx",
                                            lineNumber: 78,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontSize: '10px',
                                                color: 'rgba(255,255,255,0.38)',
                                                marginTop: '4px'
                                            },
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["fmtTime"])(m.created_at)
                                        }, void 0, false, {
                                            fileName: "[project]/components/account/ChatPanel.tsx",
                                            lineNumber: 91,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, m.chat_message_id, true, {
                                    fileName: "[project]/components/account/ChatPanel.tsx",
                                    lineNumber: 77,
                                    columnNumber: 15
                                }, this)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                ref: chatEndRef
                            }, void 0, false, {
                                fileName: "[project]/components/account/ChatPanel.tsx",
                                lineNumber: 94,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/account/ChatPanel.tsx",
                        lineNumber: 75,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "acc-chat-input-bar",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                onClick: ()=>chatFileRef.current?.click(),
                                disabled: chatUploading,
                                style: {
                                    background: 'none',
                                    border: '1px solid rgba(255,255,255,0.10)',
                                    color: 'rgba(255,255,255,0.45)',
                                    padding: '10px',
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                    flexShrink: 0
                                },
                                children: chatUploading ? '...' : '📎'
                            }, void 0, false, {
                                fileName: "[project]/components/account/ChatPanel.tsx",
                                lineNumber: 97,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                value: chatInput,
                                onChange: (e)=>setChatInput(e.target.value),
                                placeholder: "Type a message...",
                                className: "acc-chat-input",
                                onKeyDown: (e)=>{
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        sendChat();
                                    }
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/account/ChatPanel.tsx",
                                lineNumber: 98,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                onClick: sendChat,
                                disabled: chatSending || !chatInput.trim(),
                                className: "acc-chat-send",
                                children: chatSending ? '...' : '→'
                            }, void 0, false, {
                                fileName: "[project]/components/account/ChatPanel.tsx",
                                lineNumber: 100,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/account/ChatPanel.tsx",
                        lineNumber: 96,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/account/ChatPanel.tsx",
                lineNumber: 70,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/pages/account.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>AccountPage
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/link.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$account$2f$InvoiceList$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/account/InvoiceList.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$account$2f$WorkOrderList$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/account/WorkOrderList.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$account$2f$InquiryList$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/account/InquiryList.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$account$2f$HomeTab$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/account/HomeTab.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$account$2f$WorkOrderDetailModal$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/account/WorkOrderDetailModal.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$account$2f$ChatPanel$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/account/ChatPanel.tsx [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$account$2f$InvoiceList$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$account$2f$WorkOrderList$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$account$2f$InquiryList$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$account$2f$HomeTab$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$account$2f$WorkOrderDetailModal$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$account$2f$ChatPanel$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$account$2f$InvoiceList$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$account$2f$WorkOrderList$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$account$2f$InquiryList$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$account$2f$HomeTab$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$account$2f$WorkOrderDetailModal$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$account$2f$ChatPanel$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
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
function AccountPage() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [session, setSession] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(true);
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('home');
    // Profile
    const [profile, setProfile] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [editProfile, setEditProfile] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [profileSaving, setProfileSaving] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [profileFlash, setProfileFlash] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    // SMS prefs
    const [smsPrefs, setSmsPrefs] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    // Purchase stats
    const [invoiceCount, setInvoiceCount] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(0);
    const [invoiceTotal, setInvoiceTotal] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(0);
    // Work orders
    const [workOrders, setWorkOrders] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    // Inquiries
    const [inquiries, setInquiries] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [serviceRequests, setServiceRequests] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [inquiryTab, setInquiryTab] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('inquiries');
    const [showSRForm, setShowSRForm] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [srType, setSrType] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [srDesc, setSrDesc] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [srSubmitting, setSrSubmitting] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [srGateMsg, setSrGateMsg] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    // Invoices
    const [invoices, setInvoices] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    // Chat
    const [chatThread, setChatThread] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [chatInput, setChatInput] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [chatSending, setChatSending] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [chatOpen, setChatOpen] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const chatEndRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const chatFileRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const [chatUploading, setChatUploading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    // Work order detail modal
    const [selectedWO, setSelectedWO] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [showAddressEdit, setShowAddressEdit] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [tempAddress, setTempAddress] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [addressConfirmed, setAddressConfirmed] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [adminInfo, setAdminInfo] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    // Auth
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const guestId = ("TURBOPACK compile-time value", "18cf77dc-6e41-42bb-abb3-0ae8615bbc20");
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.getSession().then(async ({ data: { session: s } })=>{
            const { data: adminCheck } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].from('admin_users').select('admin_user_id').eq('admin_user_id', s.user.id).single();
            if (!s || s.user.id === guestId || adminCheck) {
                router.replace('/login');
                return;
            }
            setSession(s);
        });
        const { data: { subscription } } = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.onAuthStateChange(async (_e, s)=>{
            if (!s || s.user.id === guestId) {
                router.replace('/login');
                return;
            }
            const { data: adminCheck } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].from('admin_users').select('admin_user_id').eq('admin_user_id', s.user.id).single();
            if (adminCheck) router.replace('/admin/dashboard');
            else setSession(s);
        });
        return ()=>subscription.unsubscribe();
    }, [
        router
    ]);
    // Load all data
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (!session) return;
        const uid = session.user.id;
        async function loadAll() {
            // Profile
            const { data: p } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].from('account_users').select('*').eq('account_user_id', uid).single();
            setProfile(p);
            setEditProfile(p ? {
                ...p
            } : null);
            // SMS prefs
            const { data: prefs } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].from('user_sms_preferences').select('*').eq('user_id', uid).single();
            setSmsPrefs(prefs);
            // Purchase stats
            const { data: invs } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].from('invoices').select('invoice_id, total_amount').eq('account_user_id', uid);
            if (invs) {
                setInvoiceCount(invs.length);
                setInvoiceTotal(invs.reduce((s, i)=>s + Number(i.total_amount || 0), 0));
            }
            // Work orders
            const { data: wo } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].from('work_orders').select('*').eq('account_user_id', uid).order('created_at', {
                ascending: false
            });
            setWorkOrders(wo || []);
            // Realtime work order updates
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].channel('user-wo-' + uid).on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'work_orders',
                filter: `account_user_id=eq.${uid}`
            }, (payload)=>{
                if (payload.eventType === 'INSERT') {
                    setWorkOrders((prev)=>[
                            payload.new,
                            ...prev
                        ]);
                } else if (payload.eventType === 'UPDATE') {
                    setWorkOrders((prev)=>prev.map((w)=>w.work_order_id === payload.new.work_order_id ? payload.new : w));
                }
            }).subscribe();
            // Admin info (for WO modal)
            const { data: admin } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].from('admin_users').select('business_name, full_name, address, phone, contact_email').single();
            setAdminInfo(admin);
            // Inquiries
            const { data: inq } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].from('account_inquiries').select('*').eq('account_user_id', uid).order('created_at', {
                ascending: false
            });
            setInquiries(inq || []);
            // Service requests
            const { data: sr } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].from('service_requests').select('*').eq('account_user_id', uid).order('created_at', {
                ascending: false
            });
            setServiceRequests(sr || []);
            // Invoices
            const { data: inv } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].from('invoices').select('*').eq('account_user_id', uid).order('paid_at', {
                ascending: false
            });
            setInvoices(inv || []);
            // Chat thread
            const { data: thread } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].from('chat_threads').select('*').eq('account_user_id', uid).single();
            setChatThread(thread);
            if (thread) {
                const { data: msgs } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].from('chat_messages').select('*').eq('chat_thread_id', thread.chat_thread_id).order('created_at', {
                    ascending: true
                });
                setMessages(msgs || []);
                // Mark as read on desktop
                if (("TURBOPACK compile-time value", "undefined") !== 'undefined' && window.innerWidth >= 768) //TURBOPACK unreachable
                ;
                // Realtime — dedup against optimistic messages
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].channel('user-chat-' + thread.chat_thread_id).on('postgres_changes', {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'chat_messages',
                    filter: `chat_thread_id=eq.${thread.chat_thread_id}`
                }, (payload)=>{
                    const newMsg = payload.new;
                    setMessages((prev)=>{
                        // Remove optimistic version if present, add real one
                        const filtered = prev.filter((m)=>!m.chat_message_id.startsWith('opt-') || m.body !== newMsg.body);
                        // Avoid exact duplicates by real ID
                        if (filtered.some((m)=>m.chat_message_id === newMsg.chat_message_id)) return filtered;
                        return [
                            ...filtered,
                            newMsg
                        ];
                    });
                }).subscribe();
            }
            setLoading(false);
        }
        loadAll();
    }, [
        session
    ]);
    // Scroll chat to bottom
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        chatEndRef.current?.scrollIntoView({
            behavior: 'smooth'
        });
    }, [
        messages,
        chatOpen
    ]);
    // Profile save
    const saveProfile = async ()=>{
        if (!editProfile || !session) return;
        setProfileSaving(true);
        const updates = {};
        if (editProfile.name !== profile.name) updates.name = editProfile.name;
        if (editProfile.email !== profile.email) updates.email = editProfile.email;
        if (editProfile.phone !== profile.phone) updates.phone = editProfile.phone;
        if (editProfile.shipping_address !== profile.shipping_address) updates.shipping_address = editProfile.shipping_address;
        if (editProfile.business_name !== profile.business_name) updates.business_name = editProfile.business_name;
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].from('account_users').update(updates).eq('account_user_id', session.user.id);
        // Phone sync: update user_sms_preferences too
        if (updates.phone) {
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].from('user_sms_preferences').update({
                phone: updates.phone
            }).eq('user_id', session.user.id);
        }
        setProfile({
            ...profile,
            ...updates
        });
        setProfileSaving(false);
        setProfileFlash(true);
        setTimeout(()=>setProfileFlash(false), 2000);
    };
    const hasProfileChanges = editProfile && profile && (editProfile.name !== profile.name || editProfile.email !== profile.email || editProfile.phone !== profile.phone || editProfile.shipping_address !== profile.shipping_address || editProfile.business_name !== profile.business_name);
    // SMS toggle
    const toggleSms = async (col, val)=>{
        if (!session) return;
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].from('user_sms_preferences').upsert({
            user_id: session.user.id,
            phone: profile?.phone || '',
            [col]: val
        }, {
            onConflict: 'user_id'
        });
        setSmsPrefs((prev)=>({
                ...prev,
                [col]: val
            }));
    };
    // Accept work order
    const acceptWO = async (wo)=>{
        const log = [
            ...Array.isArray(wo.edit_history) ? wo.edit_history : [],
            {
                action: 'ACCEPTED by user',
                by: 'user',
                at: new Date().toISOString()
            }
        ];
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].from('work_orders').update({
            status: 'ACCEPTED',
            accepted_at: new Date().toISOString(),
            edit_history: log
        }).eq('work_order_id', wo.work_order_id).eq('account_user_id', session.user.id);
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].functions.invoke('send-admin-notification', {
            body: {
                event_type: 'work_orders',
                work_order_id: wo.work_order_id
            }
        });
        setWorkOrders((prev)=>prev.map((w)=>w.work_order_id === wo.work_order_id ? {
                    ...w,
                    status: 'ACCEPTED',
                    accepted_at: new Date().toISOString(),
                    edit_history: log
                } : w));
        setSelectedWO((prev)=>prev ? {
                ...prev,
                status: 'ACCEPTED',
                accepted_at: new Date().toISOString(),
                edit_history: log
            } : prev);
    };
    // Service request gate check
    const openSRForm = async ()=>{
        const { data: prefs } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].from('user_sms_preferences').select('opt_in_work_orders').eq('user_id', session.user.id).single();
        const { data: p } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].from('account_users').select('phone').eq('account_user_id', session.user.id).single();
        if (!p?.phone || !prefs?.opt_in_work_orders) {
            setSrGateMsg('To submit a service request you must have a phone number on file and work order SMS notifications enabled. This keeps you informed every step of the way. Update your preferences in your profile.');
            return;
        }
        setSrGateMsg('');
        setShowSRForm(true);
    };
    // Submit service request
    const submitSR = async ()=>{
        if (!srType || !srDesc.trim()) return;
        setSrSubmitting(true);
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].from('service_requests').insert({
            account_user_id: session.user.id,
            service_type: srType,
            description: srDesc,
            photo_url: null
        });
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].functions.invoke('send-admin-notification', {
            body: {
                event_type: 'service_requests',
                user_id: session.user.id
            }
        });
        setSrSubmitting(false);
        setShowSRForm(false);
        setSrType('');
        setSrDesc('');
        // Reload
        const { data: sr } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].from('service_requests').select('*').eq('account_user_id', session.user.id).order('created_at', {
            ascending: false
        });
        setServiceRequests(sr || []);
    };
    // Send chat message
    const sendChat = async ()=>{
        if (!chatInput.trim() || !chatThread || !session) return;
        const msgText = chatInput;
        setChatInput('');
        setChatSending(true);
        // Optimistic update — show message immediately
        const optimisticMsg = {
            chat_message_id: 'opt-' + Date.now(),
            chat_thread_id: chatThread.chat_thread_id,
            actor: 'ACCOUNT',
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
            actor: 'ACCOUNT',
            actor_id: session.user.id,
            body: msgText,
            attachment_url: null,
            attachment_type: null
        });
        if (error) {
            console.error('Chat insert failed:', error.message);
            // Remove optimistic message on failure, restore input
            setMessages((prev)=>prev.filter((m)=>m.chat_message_id !== optimisticMsg.chat_message_id));
            setChatInput(msgText);
            setChatSending(false);
            return;
        }
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].functions.invoke('send-admin-notification', {
            body: {
                event_type: 'chat',
                thread_id: chatThread.chat_thread_id
            }
        }).catch(()=>{});
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].from('chat_threads').update({
            account_has_unread: false,
            admin_has_unread: true
        }).eq('chat_thread_id', chatThread.chat_thread_id);
        setChatSending(false);
    };
    // Mark chat read on mobile drawer open
    const openChatDrawer = async ()=>{
        setChatOpen(true);
        if (chatThread) {
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].from('chat_threads').update({
                account_has_unread: false
            }).eq('chat_thread_id', chatThread.chat_thread_id);
        }
    };
    // Chat file upload (account user)
    const handleChatFile = async (e)=>{
        const file = e.target.files?.[0];
        if (!file || !chatThread || !session) return;
        setChatUploading(true);
        const path = `user/${session.user.id}/${Date.now()}_${file.name}`;
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
            actor: 'ACCOUNT',
            actor_id: session.user.id,
            body: null,
            attachment_url: uploadedUrl,
            attachment_type: uploadedType
        });
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].functions.invoke('send-admin-notification', {
            body: {
                event_type: 'chat',
                thread_id: chatThread.chat_thread_id
            }
        }).catch(()=>{});
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].from('chat_threads').update({
            account_has_unread: false,
            admin_has_unread: true
        }).eq('chat_thread_id', chatThread.chat_thread_id);
        setChatUploading(false);
        if (chatFileRef.current) chatFileRef.current.value = '';
    };
    // Open WO detail
    const openWODetail = (wo)=>{
        setSelectedWO(wo);
    };
    if (loading) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        style: {
            background: '#1a1919',
            minHeight: '100vh'
        }
    }, void 0, false, {
        fileName: "[project]/pages/account.tsx",
        lineNumber: 327,
        columnNumber: 23
    }, this);
    const NAV = [
        {
            id: 'home',
            label: 'Home'
        },
        {
            id: 'workorders',
            label: 'Work Orders'
        },
        {
            id: 'inquiries',
            label: 'Inquiries'
        },
        {
            id: 'invoices',
            label: 'Invoices'
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("style", {
                dangerouslySetInnerHTML: {
                    __html: accountCss
                }
            }, void 0, false, {
                fileName: "[project]/pages/account.tsx",
                lineNumber: 339,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "acc-shell",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "acc-left",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "acc-nav",
                                children: [
                                    NAV.map((n)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                            className: `acc-nav-item ${activeTab === n.id ? 'on' : ''}`,
                                            onClick: ()=>setActiveTab(n.id),
                                            children: n.label
                                        }, n.id, false, {
                                            fileName: "[project]/pages/account.tsx",
                                            lineNumber: 346,
                                            columnNumber: 15
                                        }, this)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/shop",
                                        className: "acc-nav-item",
                                        style: {
                                            textDecoration: 'none',
                                            marginTop: 'auto'
                                        },
                                        children: "Browse Shop"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/account.tsx",
                                        lineNumber: 350,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/portfolio",
                                        className: "acc-nav-item",
                                        style: {
                                            textDecoration: 'none'
                                        },
                                        children: "See Portfolio"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/account.tsx",
                                        lineNumber: 353,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        className: "acc-nav-item",
                                        style: {
                                            color: 'var(--er, #b54040)'
                                        },
                                        onClick: async ()=>{
                                            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.signOut();
                                            router.push('/');
                                        },
                                        children: "Sign Out"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/account.tsx",
                                        lineNumber: 356,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/account.tsx",
                                lineNumber: 344,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "acc-content",
                                children: [
                                    activeTab === 'home' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$account$2f$HomeTab$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        editProfile: editProfile,
                                        profile: profile,
                                        profileSaving: profileSaving,
                                        profileFlash: profileFlash,
                                        hasProfileChanges: hasProfileChanges,
                                        invoiceCount: invoiceCount,
                                        invoiceTotal: invoiceTotal,
                                        smsPrefs: smsPrefs,
                                        setEditProfile: setEditProfile,
                                        saveProfile: saveProfile,
                                        toggleSms: toggleSms
                                    }, void 0, false, {
                                        fileName: "[project]/pages/account.tsx",
                                        lineNumber: 366,
                                        columnNumber: 15
                                    }, this),
                                    activeTab === 'workorders' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$account$2f$WorkOrderList$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        workOrders: workOrders,
                                        onSelect: openWODetail,
                                        onAccept: acceptWO
                                    }, void 0, false, {
                                        fileName: "[project]/pages/account.tsx",
                                        lineNumber: 382,
                                        columnNumber: 15
                                    }, this),
                                    activeTab === 'inquiries' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$account$2f$InquiryList$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        inquiries: inquiries,
                                        serviceRequests: serviceRequests,
                                        inquiryTab: inquiryTab,
                                        setInquiryTab: setInquiryTab,
                                        showSRForm: showSRForm,
                                        srType: srType,
                                        srDesc: srDesc,
                                        srSubmitting: srSubmitting,
                                        srGateMsg: srGateMsg,
                                        setSrType: setSrType,
                                        setSrDesc: setSrDesc,
                                        setShowSRForm: setShowSRForm,
                                        onOpenSRForm: openSRForm,
                                        onSubmitSR: submitSR
                                    }, void 0, false, {
                                        fileName: "[project]/pages/account.tsx",
                                        lineNumber: 387,
                                        columnNumber: 15
                                    }, this),
                                    activeTab === 'invoices' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$account$2f$InvoiceList$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        invoices: invoices
                                    }, void 0, false, {
                                        fileName: "[project]/pages/account.tsx",
                                        lineNumber: 406,
                                        columnNumber: 54
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/account.tsx",
                                lineNumber: 363,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/account.tsx",
                        lineNumber: 342,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$account$2f$ChatPanel$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                        messages: messages,
                        chatInput: chatInput,
                        chatSending: chatSending,
                        chatUploading: chatUploading,
                        chatOpen: chatOpen,
                        chatEndRef: chatEndRef,
                        chatFileRef: chatFileRef,
                        setChatInput: setChatInput,
                        setChatOpen: setChatOpen,
                        openChatDrawer: openChatDrawer,
                        sendChat: sendChat,
                        handleChatFile: handleChatFile
                    }, void 0, false, {
                        fileName: "[project]/pages/account.tsx",
                        lineNumber: 411,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/account.tsx",
                lineNumber: 340,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$account$2f$WorkOrderDetailModal$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                selectedWO: selectedWO,
                adminInfo: adminInfo,
                profile: profile,
                showAddressEdit: showAddressEdit,
                tempAddress: tempAddress,
                addressConfirmed: addressConfirmed,
                setSelectedWO: setSelectedWO,
                setShowAddressEdit: setShowAddressEdit,
                setTempAddress: setTempAddress,
                setAddressConfirmed: setAddressConfirmed,
                setWorkOrders: setWorkOrders,
                acceptWO: acceptWO
            }, void 0, false, {
                fileName: "[project]/pages/account.tsx",
                lineNumber: 427,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
const accountCss = `
.acc-shell { display: flex; height: 100vh; background: #050505; overflow: hidden; }
.acc-left { flex: 1; display: flex; min-height: 0; min-width: 0; }
.acc-nav { width: 180px; flex-shrink: 0; background: #0A0A0A; border-right: 1px solid rgba(255,255,255,0.06); display: flex; flex-direction: column; padding: 20px 0; overflow-y: auto; }
.acc-nav-item { display: block; width: 100%; text-align: left; padding: 10px 20px; font-family: 'Montserrat', sans-serif; font-size: 11px; font-weight: 400; letter-spacing: 0.20em; text-transform: uppercase; color: rgba(255,255,255,0.45); background: none; border: none; border-left: 2px solid transparent; cursor: pointer; transition: color 0.15s; }
.acc-nav-item.on { color: #d4af37; border-left-color: #d4af37; }
.acc-nav-item:hover:not(.on) { color: rgba(255,255,255,0.75); }
.acc-content { flex: 1; overflow-y: auto; min-height: 0; min-width: 0; }
.acc-right { width: 35%; min-width: 300px; max-width: 420px; border-left: 1px solid rgba(255,255,255,0.08); display: flex; flex-direction: column; background: #0A0A0A; }
.acc-chat-header { padding: 16px 20px; border-bottom: 1px solid rgba(255,255,255,0.06); }
.acc-chat-messages { flex: 1; overflow-y: auto; padding: 16px 20px; }
.acc-chat-input-bar { display: flex; gap: 8px; padding: 12px 20px; border-top: 1px solid rgba(255,255,255,0.06); }
.acc-chat-input { flex: 1; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.10); padding: 10px 12px; color: #FAFAFA; font-family: 'Comfortaa', sans-serif; font-size: 13px; outline: none; }
.acc-chat-input:focus { border-color: rgba(214,180,70,0.55); }
.acc-chat-send { background: #d4af37; border: none; color: #050505; padding: 10px 16px; font-size: 14px; cursor: pointer; font-weight: 700; }
.acc-chat-send:disabled { opacity: 0.4; cursor: not-allowed; }
.acc-label { font-family: 'Montserrat', sans-serif; font-size: 9px; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(255,255,255,0.38); display: block; margin-bottom: 5px; }
.acc-input { width: 100%; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.10); padding: 10px 12px; color: #FAFAFA; font-family: 'Comfortaa', sans-serif; font-size: 13px; outline: none; }
.acc-input:focus { border-color: rgba(214,180,70,0.55); }
.acc-btn-gold { background: #d4af37; color: #050505; border: none; padding: 12px 20px; font-family: 'Montserrat', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; cursor: pointer; width: 100%; }
.acc-btn-gold:disabled { opacity: 0.4; cursor: not-allowed; }
.acc-btn-ghost { background: none; border: 1px solid rgba(255,255,255,0.10); color: rgba(255,255,255,0.45); padding: 10px 16px; font-family: 'Montserrat', sans-serif; font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; cursor: pointer; }
.acc-tab { padding: 10px 0; font-family: 'Montserrat', sans-serif; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.45); background: none; border: none; border-bottom: 1px solid transparent; cursor: pointer; }
.acc-tab.on { color: #FAFAFA; border-bottom-color: #d4af37; }
.acc-empty { font-size: 11px; color: rgba(255,255,255,0.35); text-transform: uppercase; letter-spacing: 0.2em; }
.acc-chat-mobile-bar { display: none; position: fixed; bottom: 0; left: 0; right: 0; background: #d4af37; color: #050505; text-align: center; padding: 14px; font-family: 'Montserrat', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; cursor: pointer; z-index: 50; }
.acc-chat-mobile-bar.hidden { display: none !important; }
.acc-chat-mobile-drawer { display: none; position: fixed; inset: 0; background: #050505; z-index: 100; flex-direction: column; }
@media (max-width: 767px) {
  .acc-right { display: none; }
  .acc-chat-mobile-bar { display: block; }
  .acc-chat-mobile-drawer { display: flex; }
  .acc-nav { width: 100%; flex-direction: row; overflow-x: auto; padding: 0; border-right: none; border-bottom: 1px solid rgba(255,255,255,0.06); }
  .acc-nav-item { border-left: none; border-bottom: 2px solid transparent; white-space: nowrap; padding: 12px 16px; }
  .acc-nav-item.on { border-bottom-color: #d4af37; }
  .acc-left { flex-direction: column; }
}
`;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__7262d66b._.js.map