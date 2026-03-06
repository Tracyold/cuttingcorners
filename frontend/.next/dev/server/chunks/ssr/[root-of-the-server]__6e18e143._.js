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
"[project]/pages/legal/index.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LegalPage
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/head.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [ssr] (ecmascript)");
;
;
;
const Section = ({ title, children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        style: {
            marginBottom: '48px'
        },
        children: [
            title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                style: {
                    fontFamily: "'Oranienbaum', serif",
                    fontSize: 'clamp(20px, 3vw, 28px)',
                    color: '#FAFAFA',
                    marginBottom: '20px',
                    paddingBottom: '12px',
                    borderBottom: '1px solid rgba(212,175,55,0.2)'
                },
                children: title
            }, void 0, false, {
                fileName: "[project]/pages/legal/index.tsx",
                lineNumber: 7,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/pages/legal/index.tsx",
        lineNumber: 5,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
const P = ({ children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
        style: {
            fontSize: '14px',
            lineHeight: 1.85,
            color: 'rgba(255,255,255,0.65)',
            marginBottom: '16px'
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/pages/legal/index.tsx",
        lineNumber: 16,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
const Li = ({ children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
        style: {
            fontSize: '14px',
            lineHeight: 1.85,
            color: 'rgba(255,255,255,0.65)',
            marginBottom: '6px'
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/pages/legal/index.tsx",
        lineNumber: 20,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
const Num = ({ n, title, children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        style: {
            marginBottom: '32px'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                style: {
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '11px',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'rgba(212,175,55,0.8)',
                    marginBottom: '12px'
                },
                children: [
                    n,
                    ". ",
                    title
                ]
            }, void 0, true, {
                fileName: "[project]/pages/legal/index.tsx",
                lineNumber: 25,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/pages/legal/index.tsx",
        lineNumber: 24,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
function LegalPage() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("title", {
                    children: "Legal & Policies — Cutting Corners Gems"
                }, void 0, false, {
                    fileName: "[project]/pages/legal/index.tsx",
                    lineNumber: 34,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/pages/legal/index.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: {
                    background: '#050505',
                    minHeight: '100vh',
                    color: '#FAFAFA'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            borderBottom: '1px solid rgba(255,255,255,0.06)',
                            padding: '20px 40px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                onClick: ()=>router.push('/'),
                                style: {
                                    background: 'none',
                                    border: 'none',
                                    color: 'rgba(255,255,255,0.4)',
                                    fontSize: '11px',
                                    letterSpacing: '0.25em',
                                    textTransform: 'uppercase',
                                    cursor: 'pointer'
                                },
                                children: "← Cutting Corners Gems"
                            }, void 0, false, {
                                fileName: "[project]/pages/legal/index.tsx",
                                lineNumber: 39,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    gap: '24px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        onClick: ()=>router.push('/legal/privacy-policy'),
                                        style: {
                                            background: 'none',
                                            border: 'none',
                                            color: 'rgba(255,255,255,0.35)',
                                            fontSize: '11px',
                                            letterSpacing: '0.15em',
                                            textTransform: 'uppercase',
                                            cursor: 'pointer'
                                        },
                                        children: "Privacy Policy"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/legal/index.tsx",
                                        lineNumber: 41,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        onClick: ()=>router.push('/legal/sms-terms'),
                                        style: {
                                            background: 'none',
                                            border: 'none',
                                            color: 'rgba(255,255,255,0.35)',
                                            fontSize: '11px',
                                            letterSpacing: '0.15em',
                                            textTransform: 'uppercase',
                                            cursor: 'pointer'
                                        },
                                        children: "SMS Disclosure"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/legal/index.tsx",
                                        lineNumber: 42,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/legal/index.tsx",
                                lineNumber: 40,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/legal/index.tsx",
                        lineNumber: 38,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            maxWidth: '1300px',
                            margin: '0 auto',
                            padding: '64px 40px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                style: {
                                    fontFamily: "'Montserrat', sans-serif",
                                    fontSize: '13px',
                                    letterSpacing: '0.3em',
                                    textTransform: 'uppercase',
                                    color: 'rgba(212,175,55,0.7)',
                                    marginBottom: '12px'
                                },
                                children: "Cutting Corners Gems"
                            }, void 0, false, {
                                fileName: "[project]/pages/legal/index.tsx",
                                lineNumber: 49,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                                style: {
                                    fontFamily: "'Oranienbaum', serif",
                                    fontSize: 'clamp(32px, 5vw, 52px)',
                                    color: '#FAFAFA',
                                    marginBottom: '16px',
                                    lineHeight: 1.15
                                },
                                children: "Legal & Policies"
                            }, void 0, false, {
                                fileName: "[project]/pages/legal/index.tsx",
                                lineNumber: 50,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: '17px',
                                    color: 'rgba(255,255,255,0.35)',
                                    marginBottom: '64px'
                                },
                                children: "Effective Date: March 4, 2026"
                            }, void 0, false, {
                                fileName: "[project]/pages/legal/index.tsx",
                                lineNumber: 51,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Section, {
                                title: "Why We Publish Our Policies",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(P, {
                                        children: "Cutting Corners Gems believes that clear communication builds trust. Because gemstone cutting involves natural materials, shipping, and specialized services, we provide written policies so customers know exactly how our services operate before sending in their gemstones."
                                    }, void 0, false, {
                                        fileName: "[project]/pages/legal/index.tsx",
                                        lineNumber: 54,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(P, {
                                        children: "These policies are not written to avoid responsibility. They exist to ensure that customers understand how the process works, what risks naturally exist with gemstone materials, and what procedures we follow to protect both the customer and the gemstone."
                                    }, void 0, false, {
                                        fileName: "[project]/pages/legal/index.tsx",
                                        lineNumber: 55,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(P, {
                                        children: "Our goal is simple: clarity, transparency, and fairness for everyone involved."
                                    }, void 0, false, {
                                        fileName: "[project]/pages/legal/index.tsx",
                                        lineNumber: 56,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/legal/index.tsx",
                                lineNumber: 53,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Section, {
                                title: "Customer Communication & Relationship Commitment",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(P, {
                                        children: "At Cutting Corners Gems, we believe that gemstone cutting is not simply a transaction — it is a collaborative process that works best when the cutter and the customer are able to communicate clearly and openly."
                                    }, void 0, false, {
                                        fileName: "[project]/pages/legal/index.tsx",
                                        lineNumber: 60,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(P, {
                                        children: "Customers may communicate with us through several avenues available on the website, including:"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/legal/index.tsx",
                                        lineNumber: 61,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("ul", {
                                        style: {
                                            paddingLeft: '20px',
                                            marginBottom: '16px'
                                        },
                                        children: [
                                            'Live chat within the customer account dashboard',
                                            'Chat notifications routed to SMS when enabled',
                                            'Product inquiry forms',
                                            'Service request submissions',
                                            'Work order messaging',
                                            'Email communication',
                                            'Direct text messaging',
                                            'Telephone calls'
                                        ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Li, {
                                                children: i
                                            }, i, false, {
                                                fileName: "[project]/pages/legal/index.tsx",
                                                lineNumber: 63,
                                                columnNumber: 266
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/pages/legal/index.tsx",
                                        lineNumber: 62,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(P, {
                                        children: "Work orders follow a structured process designed to ensure that both the customer and Cutting Corners Gems clearly understand the services being requested before work begins."
                                    }, void 0, false, {
                                        fileName: "[project]/pages/legal/index.tsx",
                                        lineNumber: 65,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/legal/index.tsx",
                                lineNumber: 59,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Section, {
                                title: "Legacy Customer & Annual Pricing Policy",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(P, {
                                        children: "Customers who complete fifty (50) fully completed and paid work orders may become eligible for Legacy Customer Pricing (grandfathered pricing). Once this milestone is reached, the base service price in effect at that time will remain associated with the qualifying account."
                                    }, void 0, false, {
                                        fileName: "[project]/pages/legal/index.tsx",
                                        lineNumber: 69,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(P, {
                                        children: "Legacy Customer Pricing applies only to the standard base service fee and does not apply to additional services, special materials, complex cutting projects, repairs, or other non-standard conditions. It is non-transferable."
                                    }, void 0, false, {
                                        fileName: "[project]/pages/legal/index.tsx",
                                        lineNumber: 70,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(P, {
                                        children: "Base service prices will not be increased more than once within any twelve (12) month period. Customers with Legacy Pricing are not affected by future base price adjustments within the scope of their qualifying services."
                                    }, void 0, false, {
                                        fileName: "[project]/pages/legal/index.tsx",
                                        lineNumber: 71,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/legal/index.tsx",
                                lineNumber: 68,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Section, {
                                title: "Gemstone Service Risk, Material Disclosure & Liability Agreement",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Num, {
                                        n: "1",
                                        title: "Nature of Natural Gemstones",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(P, {
                                            children: "Gemstones are natural crystalline materials that may contain inclusions, fractures, cleavage planes, internal stress, crystal growth irregularities, mineral inclusions, and structural discontinuities. These characteristics may not be fully visible prior to cutting."
                                        }, void 0, false, {
                                            fileName: "[project]/pages/legal/index.tsx",
                                            lineNumber: 76,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/pages/legal/index.tsx",
                                        lineNumber: 75,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Num, {
                                        n: "2",
                                        title: "Professional Standard of Care",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(P, {
                                            children: "Cutting Corners Gems performs all services using professional lapidary practices, reasonable skill, and careful handling. The Customer acknowledges that professional care does not eliminate the inherent risks associated with cutting natural gemstones."
                                        }, void 0, false, {
                                            fileName: "[project]/pages/legal/index.tsx",
                                            lineNumber: 79,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/pages/legal/index.tsx",
                                        lineNumber: 78,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Num, {
                                        n: "3",
                                        title: "Risk Disclosure and Customer Notification",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(P, {
                                            children: "Where reasonably identifiable, Cutting Corners Gems will inform the Customer of risks associated with the specific gemstone material, structural condition, visible fractures, inclusions, or potential structural weaknesses before approving a work order."
                                        }, void 0, false, {
                                            fileName: "[project]/pages/legal/index.tsx",
                                            lineNumber: 82,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/pages/legal/index.tsx",
                                        lineNumber: 81,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Num, {
                                        n: "4",
                                        title: "Documentation of Gemstone Condition",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(P, {
                                            children: "Cutting Corners Gems documents gemstone condition before and after service whenever reasonably possible, including photographic records, written notes, and post-service documentation."
                                        }, void 0, false, {
                                            fileName: "[project]/pages/legal/index.tsx",
                                            lineNumber: 85,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/pages/legal/index.tsx",
                                        lineNumber: 84,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Num, {
                                        n: "5",
                                        title: "Structural Failure and Inherent Material Risk",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(P, {
                                            children: "Despite professional care, gemstone materials may contain internal conditions that cannot be detected prior to cutting. During lapidary processes, these conditions may result in cracking, chipping, cleaving, structural fracture, or breakage. The Customer acknowledges that these outcomes may occur even when services are performed professionally."
                                        }, void 0, false, {
                                            fileName: "[project]/pages/legal/index.tsx",
                                            lineNumber: 88,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/pages/legal/index.tsx",
                                        lineNumber: 87,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Num, {
                                        n: "6",
                                        title: "Weight Reduction",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(P, {
                                            children: "Gemstone cutting necessarily involves removal of material. Final gemstone weight is not guaranteed unless explicitly agreed upon in writing."
                                        }, void 0, false, {
                                            fileName: "[project]/pages/legal/index.tsx",
                                            lineNumber: 91,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/pages/legal/index.tsx",
                                        lineNumber: 90,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Num, {
                                        n: "7",
                                        title: "Appearance and Optical Outcome",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(P, {
                                            children: "Lapidary services are craft-based professional processes. While performed with professional skill, final visual appearance cannot be guaranteed to meet subjective expectations due to factors including internal inclusions, refractive properties, crystal orientation, and structural limitations."
                                        }, void 0, false, {
                                            fileName: "[project]/pages/legal/index.tsx",
                                            lineNumber: 94,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/pages/legal/index.tsx",
                                        lineNumber: 93,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Num, {
                                        n: "8",
                                        title: "Pre-Existing Structural Conditions",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(P, {
                                            children: "Cutting Corners Gems shall not be responsible for damage resulting from pre-existing internal structural conditions that were not reasonably detectable prior to cutting."
                                        }, void 0, false, {
                                            fileName: "[project]/pages/legal/index.tsx",
                                            lineNumber: 97,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/pages/legal/index.tsx",
                                        lineNumber: 96,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Num, {
                                        n: "9",
                                        title: "Shipping and Custody",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(P, {
                                            children: "Risk of loss or damage during inbound shipping remains with the Customer until the gemstone has been received by Cutting Corners Gems. Cutting Corners Gems shall not be responsible for delays, loss, or damage occurring while items are in transit through third-party shipping providers."
                                        }, void 0, false, {
                                            fileName: "[project]/pages/legal/index.tsx",
                                            lineNumber: 100,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/pages/legal/index.tsx",
                                        lineNumber: 99,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Num, {
                                        n: "10",
                                        title: "Limitation of Liability",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(P, {
                                            children: "To the maximum extent permitted by law, any liability related to services performed shall be limited to the service fee paid for the work order."
                                        }, void 0, false, {
                                            fileName: "[project]/pages/legal/index.tsx",
                                            lineNumber: 103,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/pages/legal/index.tsx",
                                        lineNumber: 102,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Num, {
                                        n: "11",
                                        title: "Assumption of Risk",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(P, {
                                            children: "By submitting a gemstone for service, the Customer acknowledges and accepts the inherent risks associated with gemstone cutting and lapidary processes."
                                        }, void 0, false, {
                                            fileName: "[project]/pages/legal/index.tsx",
                                            lineNumber: 106,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/pages/legal/index.tsx",
                                        lineNumber: 105,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Num, {
                                        n: "12",
                                        title: "Governing Law",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(P, {
                                            children: "This Agreement shall be governed by the laws of the State of Arizona. Any disputes shall occur within Maricopa County, Arizona, unless otherwise required by law."
                                        }, void 0, false, {
                                            fileName: "[project]/pages/legal/index.tsx",
                                            lineNumber: 109,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/pages/legal/index.tsx",
                                        lineNumber: 108,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Num, {
                                        n: "13",
                                        title: "Acceptance",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(P, {
                                            children: "Submission of a gemstone, acceptance of a work order, or shipment of a gemstone to Cutting Corners Gems constitutes acceptance of this Agreement."
                                        }, void 0, false, {
                                            fileName: "[project]/pages/legal/index.tsx",
                                            lineNumber: 112,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/pages/legal/index.tsx",
                                        lineNumber: 111,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/legal/index.tsx",
                                lineNumber: 74,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    marginTop: '64px',
                                    padding: '32px',
                                    border: '1px solid rgba(212,175,55,0.15)',
                                    background: 'rgba(212,175,55,0.04)'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontFamily: "'Montserrat', sans-serif",
                                            fontSize: '10px',
                                            letterSpacing: '0.25em',
                                            textTransform: 'uppercase',
                                            color: 'rgba(212,175,55,0.6)',
                                            marginBottom: '16px'
                                        },
                                        children: "Contact"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/legal/index.tsx",
                                        lineNumber: 118,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontSize: '13px',
                                            color: 'rgba(255,255,255,0.6)',
                                            lineHeight: 2
                                        },
                                        children: [
                                            "Cutting Corners Gems",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                fileName: "[project]/pages/legal/index.tsx",
                                                lineNumber: 120,
                                                columnNumber: 35
                                            }, this),
                                            "850 S River Dr #2117, Tempe, Arizona 85281",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                fileName: "[project]/pages/legal/index.tsx",
                                                lineNumber: 121,
                                                columnNumber: 57
                                            }, this),
                                            "Website Admin: Tracy Young — admin@cuttingcornersgems.com",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                fileName: "[project]/pages/legal/index.tsx",
                                                lineNumber: 122,
                                                columnNumber: 72
                                            }, this),
                                            "Gemstone Cutter: Michael Wall — Mwall@cuttingcornersgems.com"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/legal/index.tsx",
                                        lineNumber: 119,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/legal/index.tsx",
                                lineNumber: 117,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    marginTop: '48px',
                                    display: 'flex',
                                    gap: '24px',
                                    justifyContent: 'center'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        onClick: ()=>router.push('/legal/privacy-policy'),
                                        style: {
                                            background: 'none',
                                            border: 'none',
                                            color: 'rgba(212,175,55,0.6)',
                                            fontSize: '11px',
                                            letterSpacing: '0.15em',
                                            textTransform: 'uppercase',
                                            cursor: 'pointer'
                                        },
                                        children: "Privacy Policy"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/legal/index.tsx",
                                        lineNumber: 129,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        style: {
                                            color: 'rgba(255,255,255,0.15)'
                                        },
                                        children: "|"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/legal/index.tsx",
                                        lineNumber: 130,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        onClick: ()=>router.push('/legal/sms-terms'),
                                        style: {
                                            background: 'none',
                                            border: 'none',
                                            color: 'rgba(212,175,55,0.6)',
                                            fontSize: '11px',
                                            letterSpacing: '0.15em',
                                            textTransform: 'uppercase',
                                            cursor: 'pointer'
                                        },
                                        children: "SMS Disclosure"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/legal/index.tsx",
                                        lineNumber: 131,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/legal/index.tsx",
                                lineNumber: 128,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/legal/index.tsx",
                        lineNumber: 46,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/legal/index.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__6e18e143._.js.map