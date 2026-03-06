module.exports = [
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
"[project]/pages/admin/login.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>AdminLoginPage
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
function AdminLoginPage() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [showPassword, setShowPassword] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [checkingSession, setCheckingSession] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(true);
    // Check if already logged in as admin
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        async function check() {
            const { data: { session } } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.getSession();
            if (session) {
                const { data: adminCheck } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].from('admin_users').select('admin_user_id').eq('admin_user_id', session.user.id).single();
                if (adminCheck) {
                    router.push('/admin/dashboard');
                    return;
                }
            }
            setCheckingSession(false);
        }
        check();
    }, [
        router
    ]);
    const handleLogin = async ()=>{
        if (!email.trim() || !password.trim()) {
            setError('Email and password are required');
            return;
        }
        setLoading(true);
        setError('');
        const { data, error: authError } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.signInWithPassword({
            email: email.trim(),
            password: password.trim()
        });
        if (authError) {
            setError('Invalid email or password.');
            setLoading(false);
            return;
        }
        // Verify admin status
        const { data: adminCheck } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].from('admin_users').select('admin_user_id').eq('admin_user_id', data.user.id).single();
        if (!adminCheck) {
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.signOut();
            setError('Access denied.');
            setLoading(false);
            return;
        }
        router.push('/admin/dashboard');
    };
    if (checkingSession) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            style: {
                background: '#050505',
                minHeight: '100vh'
            }
        }, void 0, false, {
            fileName: "[project]/pages/admin/login.tsx",
            lineNumber: 68,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        style: {
            background: '#050505',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            style: {
                background: '#111111',
                border: '0.5px solid rgba(214,180,70,0.55)',
                padding: '40px',
                maxWidth: '480px',
                width: '100%',
                animation: 'adminGlow 4s ease-in-out infinite'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("style", {
                    dangerouslySetInnerHTML: {
                        __html: `
          @keyframes adminGlow {
            0%, 100% { box-shadow: 0 0 40px rgba(214,180,70,0.08); }
            50% { box-shadow: 0 0 60px rgba(214,180,70,0.18); }
          }
          @keyframes adminFadeIn {
            from { opacity: 0; transform: translateY(12px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `
                    }
                }, void 0, false, {
                    fileName: "[project]/pages/admin/login.tsx",
                    lineNumber: 83,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: {
                        animation: 'adminFadeIn 400ms ease-out forwards'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                            style: {
                                fontFamily: "'Montserrat', sans-serif",
                                fontSize: '11px',
                                letterSpacing: '0.25em',
                                textTransform: 'uppercase',
                                color: 'rgba(255,255,255,0.55)',
                                marginBottom: '12px'
                            },
                            children: "CUTTING CORNERS GEMS"
                        }, void 0, false, {
                            fileName: "[project]/pages/admin/login.tsx",
                            lineNumber: 94,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                            style: {
                                fontFamily: "'Oranienbaum', serif",
                                fontSize: '28px',
                                color: '#FAFAFA',
                                marginBottom: '28px'
                            },
                            children: "Admin"
                        }, void 0, false, {
                            fileName: "[project]/pages/admin/login.tsx",
                            lineNumber: 97,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                            style: {
                                fontFamily: "'Montserrat', sans-serif",
                                fontSize: '11px',
                                letterSpacing: '0.2em',
                                textTransform: 'uppercase',
                                color: 'rgba(255,255,255,0.45)',
                                display: 'block',
                                marginBottom: '6px'
                            },
                            children: "EMAIL"
                        }, void 0, false, {
                            fileName: "[project]/pages/admin/login.tsx",
                            lineNumber: 101,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                            type: "email",
                            value: email,
                            onChange: (e)=>setEmail(e.target.value),
                            style: {
                                width: '100%',
                                background: '#0A0A0A',
                                border: '1px solid rgba(255,255,255,0.10)',
                                height: '40px',
                                padding: '0 10px',
                                color: '#d4af37',
                                fontFamily: "'Comfortaa', sans-serif",
                                fontSize: '14px',
                                marginBottom: '16px',
                                outline: 'none',
                                transition: 'border 200ms ease, box-shadow 200ms ease'
                            },
                            onFocus: (e)=>{
                                e.target.style.borderColor = 'rgba(214,180,70,0.55)';
                                e.target.style.boxShadow = '0 0 10px rgba(214,180,70,0.15)';
                            },
                            onBlur: (e)=>{
                                e.target.style.borderColor = 'rgba(255,255,255,0.10)';
                                e.target.style.boxShadow = 'none';
                            },
                            onKeyDown: (e)=>{
                                if (e.key === 'Enter') handleLogin();
                            }
                        }, void 0, false, {
                            fileName: "[project]/pages/admin/login.tsx",
                            lineNumber: 104,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                            style: {
                                fontFamily: "'Montserrat', sans-serif",
                                fontSize: '11px',
                                letterSpacing: '0.2em',
                                textTransform: 'uppercase',
                                color: 'rgba(255,255,255,0.45)',
                                display: 'block',
                                marginBottom: '6px'
                            },
                            children: "PASSWORD"
                        }, void 0, false, {
                            fileName: "[project]/pages/admin/login.tsx",
                            lineNumber: 114,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                position: 'relative',
                                marginBottom: '16px'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                    type: showPassword ? 'text' : 'password',
                                    value: password,
                                    onChange: (e)=>setPassword(e.target.value),
                                    style: {
                                        width: '100%',
                                        background: '#0A0A0A',
                                        border: '1px solid rgba(255,255,255,0.10)',
                                        height: '40px',
                                        padding: '0 40px 0 10px',
                                        color: '#d4af37',
                                        fontFamily: "'Comfortaa', sans-serif",
                                        fontSize: '14px',
                                        outline: 'none',
                                        transition: 'border 200ms ease, box-shadow 200ms ease'
                                    },
                                    onFocus: (e)=>{
                                        e.target.style.borderColor = 'rgba(214,180,70,0.55)';
                                        e.target.style.boxShadow = '0 0 10px rgba(214,180,70,0.15)';
                                    },
                                    onBlur: (e)=>{
                                        e.target.style.borderColor = 'rgba(255,255,255,0.10)';
                                        e.target.style.boxShadow = 'none';
                                    },
                                    onKeyDown: (e)=>{
                                        if (e.key === 'Enter') handleLogin();
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/pages/admin/login.tsx",
                                    lineNumber: 118,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setShowPassword((p)=>!p),
                                    style: {
                                        position: 'absolute',
                                        right: '10px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        background: 'none',
                                        border: 'none',
                                        color: 'rgba(255,255,255,0.35)',
                                        cursor: 'pointer',
                                        fontSize: '12px'
                                    },
                                    children: showPassword ? 'Hide' : 'Show'
                                }, void 0, false, {
                                    fileName: "[project]/pages/admin/login.tsx",
                                    lineNumber: 127,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/admin/login.tsx",
                            lineNumber: 117,
                            columnNumber: 11
                        }, this),
                        error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                            style: {
                                fontFamily: "'Comfortaa', sans-serif",
                                fontSize: '12px',
                                color: 'rgba(255,80,80,0.85)',
                                marginBottom: '16px'
                            },
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/pages/admin/login.tsx",
                            lineNumber: 136,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                            onClick: handleLogin,
                            disabled: loading,
                            style: {
                                width: '100%',
                                background: 'transparent',
                                border: '1px solid rgba(214,180,70,0.9)',
                                color: '#d4af37',
                                fontFamily: "'Montserrat', sans-serif",
                                fontSize: '11px',
                                letterSpacing: '0.3em',
                                textTransform: 'uppercase',
                                height: '44px',
                                cursor: 'pointer',
                                boxShadow: '0 0 14px rgba(214,180,70,0.35)',
                                transition: 'all 200ms ease'
                            },
                            children: loading ? '...' : 'SIGN IN'
                        }, void 0, false, {
                            fileName: "[project]/pages/admin/login.tsx",
                            lineNumber: 138,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/pages/admin/login.tsx",
                    lineNumber: 93,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/pages/admin/login.tsx",
            lineNumber: 73,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/pages/admin/login.tsx",
        lineNumber: 72,
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

//# sourceMappingURL=%5Broot-of-the-server%5D__b4bb605a._.js.map