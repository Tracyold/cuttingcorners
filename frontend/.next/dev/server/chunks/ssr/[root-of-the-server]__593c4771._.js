module.exports = [
"[project]/components/shared/TopNav.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TopNav
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/link.js [ssr] (ecmascript)");
;
;
;
// ── TopNav — Cutting Corners Gems ────────────────────────────
// Absolutely positioned so it overlays the hero section.
// Transitions from transparent to solid dark on scroll.
// Mobile: hamburger drawer.
// Desktop: horizontal links.
// Auth-aware: shows "Account" if session exists, "Login" if not.
// ─────────────────────────────────────────────────────────────
const NAV_LINKS = [
    {
        label: 'Shop',
        href: '/shop'
    },
    {
        label: 'Portfolio',
        href: '/portfolio'
    }
];
const css = `
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&family=Oranienbaum&display=swap');

.tnav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 28px;
  transition: background 350ms ease, border-color 350ms ease, backdrop-filter 350ms ease;
  border-bottom: 0.5px solid transparent;
}
.tnav.scrolled {
  background: rgba(5,5,5,0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom-color: rgba(255,255,255,0.07);
}
.tnav-brand {
  font-family: 'Oranienbaum', Georgia, serif;
  font-size: 17px;
  font-weight: 400;
  color: #FAFAFA;
  text-decoration: none;
  letter-spacing: 0.04em;
  white-space: nowrap;
  transition: color 200ms ease;
}
.tnav-brand:hover { color: #d4af37; }
.tnav-links {
  display: flex;
  align-items: center;
  gap: 32px;
}
.tnav-link {
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.6);
  text-decoration: none;
  transition: color 200ms ease;
  position: relative;
}
.tnav-link::after {
  content: '';
  position: absolute;
  bottom: -3px; left: 0; right: 100%;
  height: 0.5px;
  background: #d4af37;
  transition: right 220ms ease;
}
.tnav-link:hover { color: #FAFAFA; }
.tnav-link:hover::after { right: 0; }
.tnav-auth {
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #d4af37;
  text-decoration: none;
  border: 0.5px solid rgba(212,175,55,0.45);
  padding: 6px 14px;
  transition: all 200ms ease;
}
.tnav-auth:hover {
  background: rgba(212,175,55,0.08);
  border-color: rgba(212,175,55,0.8);
  color: #e5c84a;
}
.tnav-burger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 36px;
  height: 36px;
  background: none;
  border: 0.5px solid rgba(255,255,255,0.15);
  cursor: pointer;
  padding: 8px;
  transition: border-color 200ms ease;
}
.tnav-burger:hover { border-color: rgba(212,175,55,0.5); }
.tnav-burger .bar {
  width: 100%;
  height: 1px;
  background: rgba(255,255,255,0.75);
  border-radius: 1px;
  transition: all 280ms ease;
  transform-origin: center;
}
.tnav-burger.open .bar:nth-child(1) { transform: translateY(6px) rotate(45deg); }
.tnav-burger.open .bar:nth-child(2) { opacity: 0; transform: scaleX(0); }
.tnav-burger.open .bar:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }
.tnav-drawer {
  position: fixed;
  top: 56px; left: 0; right: 0;
  background: rgba(5,5,5,0.97);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 0.5px solid rgba(255,255,255,0.07);
  z-index: 99;
  display: flex;
  flex-direction: column;
  padding: 20px 28px 28px;
  gap: 0;
  transform: translateY(-8px);
  opacity: 0;
  pointer-events: none;
  transition: opacity 240ms ease, transform 240ms ease;
}
.tnav-drawer.open {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}
.tnav-drawer-link {
  font-family: 'Montserrat', sans-serif;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.55);
  text-decoration: none;
  padding: 16px 0;
  border-bottom: 0.5px solid rgba(255,255,255,0.06);
  transition: color 180ms ease;
}
.tnav-drawer-link:hover { color: #FAFAFA; }
.tnav-drawer-link:last-child { border-bottom: none; }
.tnav-drawer-auth {
  font-family: 'Montserrat', sans-serif;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #d4af37;
  text-decoration: none;
  padding: 18px 0 4px;
  margin-top: 4px;
  transition: color 180ms ease;
}
.tnav-drawer-auth:hover { color: #e5c84a; }

@media (max-width: 767px) {
  .tnav-links { display: none; }
  .tnav-auth-desktop { display: none; }
  .tnav-burger { display: flex; }
  .tnav { padding: 0 18px; }
}
@media (min-width: 768px) {
  .tnav-drawer { display: none !important; }
}
`;
function TopNav() {
    const [scrolled, setScrolled] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [drawerOpen, setDrawerOpen] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [authed, setAuthed] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    // Scroll detection
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const onScroll = ()=>setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll, {
            passive: true
        });
        onScroll();
        return ()=>window.removeEventListener('scroll', onScroll);
    }, []);
    // Auth detection — check Supabase session
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        let subscription;
        async function checkAuth() {
            try {
                const { createClient } = await __turbopack_context__.A("[externals]/@supabase/supabase-js [external] (@supabase/supabase-js, esm_import, [project]/node_modules/@supabase/supabase-js, async loader)");
                const supabase = createClient(("TURBOPACK compile-time value", "https://jvbkcihypbjlnffsbohd.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2YmtjaWh5cGJqbG5mZnNib2hkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3MjkwMDMsImV4cCI6MjA4NzMwNTAwM30.ks3k6udociWxERV6LuDkZB_MOUbXyCxHyek2qtUHpfM"));
                const guestId = ("TURBOPACK compile-time value", "18cf77dc-6e41-42bb-abb3-0ae8615bbc20");
                const { data: { session } } = await supabase.auth.getSession();
                setAuthed(!!session && session.user.id !== guestId);
                const { data: { subscription: sub } } = supabase.auth.onAuthStateChange((_e, s)=>{
                    setAuthed(!!s && s.user.id !== guestId);
                });
                subscription = sub;
            } catch  {
                setAuthed(false);
            }
        }
        checkAuth();
        return ()=>{
            if (subscription) subscription.unsubscribe();
        };
    }, []);
    // Close drawer on outside click
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (!drawerOpen) return;
        const close = (e)=>{
            const target = e.target;
            if (!target.closest('.tnav')) setDrawerOpen(false);
        };
        document.addEventListener('click', close);
        return ()=>document.removeEventListener('click', close);
    }, [
        drawerOpen
    ]);
    const authHref = authed ? '/account' : '/login';
    const authLabel = authed ? 'Account' : 'Login';
    const handleAuthClick = async (e)=>{
        if (!authed) {
            e.preventDefault();
            const { createClient } = await __turbopack_context__.A("[externals]/@supabase/supabase-js [external] (@supabase/supabase-js, esm_import, [project]/node_modules/@supabase/supabase-js, async loader)");
            const supabase = createClient(("TURBOPACK compile-time value", "https://jvbkcihypbjlnffsbohd.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2YmtjaWh5cGJqbG5mZnNib2hkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3MjkwMDMsImV4cCI6MjA4NzMwNTAwM30.ks3k6udociWxERV6LuDkZB_MOUbXyCxHyek2qtUHpfM"));
            await supabase.auth.signOut();
            window.location.href = '/login';
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("style", {
                dangerouslySetInnerHTML: {
                    __html: css
                }
            }, void 0, false, {
                fileName: "[project]/components/shared/TopNav.tsx",
                lineNumber: 247,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("nav", {
                className: `tnav${scrolled ? ' scrolled' : ''}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: "/",
                        className: "tnav-brand",
                        children: "Cutting Corners Gems"
                    }, void 0, false, {
                        fileName: "[project]/components/shared/TopNav.tsx",
                        lineNumber: 251,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "tnav-links",
                        children: [
                            NAV_LINKS.map((l)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: l.href,
                                    className: "tnav-link",
                                    children: l.label
                                }, l.href, false, {
                                    fileName: "[project]/components/shared/TopNav.tsx",
                                    lineNumber: 256,
                                    columnNumber: 13
                                }, this)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: authHref,
                                className: "tnav-auth tnav-auth-desktop",
                                onClick: handleAuthClick,
                                children: authLabel
                            }, void 0, false, {
                                fileName: "[project]/components/shared/TopNav.tsx",
                                lineNumber: 258,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shared/TopNav.tsx",
                        lineNumber: 254,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        className: `tnav-burger${drawerOpen ? ' open' : ''}`,
                        onClick: ()=>setDrawerOpen((p)=>!p),
                        "aria-label": "Toggle menu",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                className: "bar"
                            }, void 0, false, {
                                fileName: "[project]/components/shared/TopNav.tsx",
                                lineNumber: 268,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                className: "bar"
                            }, void 0, false, {
                                fileName: "[project]/components/shared/TopNav.tsx",
                                lineNumber: 269,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                className: "bar"
                            }, void 0, false, {
                                fileName: "[project]/components/shared/TopNav.tsx",
                                lineNumber: 270,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shared/TopNav.tsx",
                        lineNumber: 263,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shared/TopNav.tsx",
                lineNumber: 249,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: `tnav-drawer${drawerOpen ? ' open' : ''}`,
                children: [
                    NAV_LINKS.map((l)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: l.href,
                            className: "tnav-drawer-link",
                            onClick: ()=>setDrawerOpen(false),
                            children: l.label
                        }, l.href, false, {
                            fileName: "[project]/components/shared/TopNav.tsx",
                            lineNumber: 277,
                            columnNumber: 11
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                        href: authHref,
                        className: "tnav-drawer-auth",
                        onClick: (e)=>{
                            setDrawerOpen(false);
                            handleAuthClick(e);
                        },
                        children: authLabel
                    }, void 0, false, {
                        fileName: "[project]/components/shared/TopNav.tsx",
                        lineNumber: 286,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shared/TopNav.tsx",
                lineNumber: 275,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
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
"[project]/components/shared/Footer.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Footer
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [ssr] (ecmascript)");
;
;
const footerCss = `
.ccg-footer {
  background: #000000;
  border-top: 1px solid rgba(255,255,255,0.08);
  padding: 40px 48px;
}
.ccg-footer-tagline {
  font-family: 'Montserrat', sans-serif;
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.55);
  margin-bottom: 28px;
}
.ccg-footer-content {
  display: flex;
  justify-content: space-between;
  gap: 32px;
}
.ccg-footer-links {
  display: flex;
  flex-direction: column;
}
.ccg-footer-link {
  font-family: 'Montserrat', sans-serif;
  font-size: 12px;
  letter-spacing: 0.04em;
  color: rgba(255,255,255,0.40);
  text-decoration: none;
  line-height: 2.0;
  transition: color 180ms ease, font-size 150ms ease;
}
.ccg-footer-link:hover {
  color: rgba(255,255,255,0.85);
  font-size: 12.5px;
}
.ccg-footer-contact {
  display: flex;
  flex-direction: column;
}
.ccg-footer-contact-name {
  font-family: 'Montserrat', sans-serif;
  font-size: 12px;
  letter-spacing: 0.04em;
  color: rgba(255,255,255,0.55);
  line-height: 2.0;
}
.ccg-footer-contact-link {
  font-family: 'Montserrat', sans-serif;
  font-size: 12px;
  letter-spacing: 0.04em;
  color: rgba(255,255,255,0.40);
  text-decoration: none;
  line-height: 2.0;
  transition: color 180ms ease, font-size 150ms ease;
}
.ccg-footer-contact-link:hover {
  color: rgba(255,255,255,0.85);
  font-size: 12.5px;
}
.ccg-footer-welcome {
  font-family: 'Comfortaa', sans-serif;
  font-size: 11px;
  color: rgba(255,255,255,0.40);
  font-style: italic;
  line-height: 2.0;
}

@media (max-width: 767px) {
  .ccg-footer {
    padding: 32px 24px;
  }
  .ccg-footer-tagline {
    margin-bottom: 24px;
  }
}
`;
function Footer() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const path = router.pathname;
    // Don't show footer on admin or account routes
    if (path.startsWith('/admin') || path.startsWith('/account')) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("style", {
                dangerouslySetInnerHTML: {
                    __html: footerCss
                }
            }, void 0, false, {
                fileName: "[project]/components/shared/Footer.tsx",
                lineNumber: 92,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("footer", {
                className: "ccg-footer",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "ccg-footer-tagline",
                        children: "COLOR CONSCIOUS CAREFUL CUTTING"
                    }, void 0, false, {
                        fileName: "[project]/components/shared/Footer.tsx",
                        lineNumber: 94,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "ccg-footer-content",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "ccg-footer-links",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                        href: "/legal",
                                        className: "ccg-footer-link",
                                        children: "legal"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shared/Footer.tsx",
                                        lineNumber: 99,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                        href: "/our-structure",
                                        className: "ccg-footer-link",
                                        children: "our structure"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shared/Footer.tsx",
                                        lineNumber: 100,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                        href: "/shop",
                                        className: "ccg-footer-link",
                                        children: "shop"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shared/Footer.tsx",
                                        lineNumber: 101,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                        href: "/portfolio",
                                        className: "ccg-footer-link",
                                        children: "portfolio"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shared/Footer.tsx",
                                        lineNumber: 102,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                        href: "/login",
                                        className: "ccg-footer-link",
                                        children: "sign in / sign up"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shared/Footer.tsx",
                                        lineNumber: 103,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shared/Footer.tsx",
                                lineNumber: 98,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "ccg-footer-contact",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        className: "ccg-footer-contact-name",
                                        children: "Michael Wall"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shared/Footer.tsx",
                                        lineNumber: 106,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                        href: "tel:4802864595",
                                        className: "ccg-footer-contact-link",
                                        children: "480.286.4595"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shared/Footer.tsx",
                                        lineNumber: 107,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                        href: "mailto:mwall@cuttingcornersgems.com",
                                        className: "ccg-footer-contact-link",
                                        children: "mwall@cuttingcornersgems.com"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shared/Footer.tsx",
                                        lineNumber: 108,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        className: "ccg-footer-welcome",
                                        children: "texts and emails welcome"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shared/Footer.tsx",
                                        lineNumber: 109,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shared/Footer.tsx",
                                lineNumber: 105,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shared/Footer.tsx",
                        lineNumber: 97,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shared/Footer.tsx",
                lineNumber: 93,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
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
"[project]/components/guest/shopTypes.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ghostBtnStyle",
    ()=>ghostBtnStyle,
    "goldBtnStyle",
    ()=>goldBtnStyle,
    "inputBlur",
    ()=>inputBlur,
    "inputFocus",
    ()=>inputFocus,
    "inputStyle",
    ()=>inputStyle,
    "labelStyle",
    ()=>labelStyle,
    "popupBoxStyle",
    ()=>popupBoxStyle,
    "popupOverlayStyle",
    ()=>popupOverlayStyle
]);
const popupOverlayStyle = {
    position: 'fixed',
    inset: 0,
    zIndex: 200,
    backgroundColor: 'rgba(0,0,0,0.85)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px'
};
const popupBoxStyle = {
    backgroundColor: '#0A0A0A',
    border: '1px solid rgba(255,255,255,0.10)',
    borderRadius: '16px',
    width: '100%',
    maxWidth: '480px',
    maxHeight: '90vh',
    overflowY: 'auto',
    padding: '32px'
};
const inputStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.10)',
    padding: '10px 12px',
    color: '#FAFAFA',
    fontFamily: "'Comfortaa', sans-serif",
    fontSize: '13px',
    outline: 'none',
    marginBottom: '10px'
};
const inputFocus = (e)=>{
    e.target.style.borderColor = 'rgba(214,180,70,0.55)';
    e.target.style.boxShadow = '0 0 10px rgba(214,180,70,0.15)';
};
const inputBlur = (e)=>{
    e.target.style.borderColor = 'rgba(255,255,255,0.10)';
    e.target.style.boxShadow = 'none';
};
const labelStyle = {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '9px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    color: 'rgba(255,255,255,0.38)',
    display: 'block',
    marginBottom: '5px'
};
const goldBtnStyle = {
    width: '100%',
    textAlign: 'center',
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '11px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.3em',
    background: 'transparent',
    color: '#d4af37',
    border: '1px solid rgba(214,180,70,0.9)',
    padding: '14px 24px',
    marginTop: '16px',
    cursor: 'pointer',
    boxShadow: '0 0 14px rgba(214,180,70,0.35)'
};
const ghostBtnStyle = {
    width: '100%',
    textAlign: 'center',
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '10px',
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    backgroundColor: 'transparent',
    color: 'rgba(255,255,255,0.38)',
    border: 'none',
    cursor: 'pointer',
    padding: '12px 0',
    marginTop: '12px'
};
}),
"[project]/components/guest/GuestInfoPopup.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GuestInfoPopup",
    ()=>GuestInfoPopup
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/guest/shopTypes.ts [ssr] (ecmascript)");
;
;
;
function GuestInfoPopup({ onSubmit, onClose }) {
    const [name, setName] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [phone, setPhone] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [address, setAddress] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [err, setErr] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    function handleSubmit() {
        if (!name.trim() || !email.trim() || !phone.trim() || !address.trim()) {
            setErr('All fields are required.');
            return;
        }
        onSubmit({
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim(),
            address: address.trim()
        });
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["popupOverlayStyle"],
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["popupBoxStyle"],
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                    style: {
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: '10px',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.20em',
                        color: 'rgba(255,255,255,0.52)',
                        marginBottom: '6px'
                    },
                    children: "Your Information"
                }, void 0, false, {
                    fileName: "[project]/components/guest/GuestInfoPopup.tsx",
                    lineNumber: 22,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                    style: {
                        fontFamily: "'Comfortaa', sans-serif",
                        fontSize: '12px',
                        color: 'rgba(255,255,255,0.45)',
                        marginBottom: '20px',
                        lineHeight: 1.6
                    },
                    children: "Please enter your details before continuing."
                }, void 0, false, {
                    fileName: "[project]/components/guest/GuestInfoPopup.tsx",
                    lineNumber: 25,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                    style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["labelStyle"],
                    children: "Full Name *"
                }, void 0, false, {
                    fileName: "[project]/components/guest/GuestInfoPopup.tsx",
                    lineNumber: 29,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                    style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["inputStyle"],
                    placeholder: "Jane Smith",
                    value: name,
                    onChange: (e)=>setName(e.target.value),
                    onFocus: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["inputFocus"],
                    onBlur: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["inputBlur"]
                }, void 0, false, {
                    fileName: "[project]/components/guest/GuestInfoPopup.tsx",
                    lineNumber: 30,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                    style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["labelStyle"],
                    children: "Email Address *"
                }, void 0, false, {
                    fileName: "[project]/components/guest/GuestInfoPopup.tsx",
                    lineNumber: 32,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                    style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["inputStyle"],
                    type: "email",
                    placeholder: "jane@email.com",
                    value: email,
                    onChange: (e)=>setEmail(e.target.value),
                    onFocus: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["inputFocus"],
                    onBlur: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["inputBlur"]
                }, void 0, false, {
                    fileName: "[project]/components/guest/GuestInfoPopup.tsx",
                    lineNumber: 33,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                    style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["labelStyle"],
                    children: "Phone Number *"
                }, void 0, false, {
                    fileName: "[project]/components/guest/GuestInfoPopup.tsx",
                    lineNumber: 35,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                    style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["inputStyle"],
                    type: "tel",
                    placeholder: "+1 (555) 000-0000",
                    value: phone,
                    onChange: (e)=>setPhone(e.target.value),
                    onFocus: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["inputFocus"],
                    onBlur: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["inputBlur"]
                }, void 0, false, {
                    fileName: "[project]/components/guest/GuestInfoPopup.tsx",
                    lineNumber: 36,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                    style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["labelStyle"],
                    children: "Shipping Address *"
                }, void 0, false, {
                    fileName: "[project]/components/guest/GuestInfoPopup.tsx",
                    lineNumber: 38,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                    style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["inputStyle"],
                    placeholder: "123 Main St, City, State, ZIP",
                    value: address,
                    onChange: (e)=>setAddress(e.target.value),
                    onFocus: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["inputFocus"],
                    onBlur: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["inputBlur"]
                }, void 0, false, {
                    fileName: "[project]/components/guest/GuestInfoPopup.tsx",
                    lineNumber: 39,
                    columnNumber: 9
                }, this),
                err && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                    style: {
                        fontFamily: "'Comfortaa', sans-serif",
                        fontSize: '11px',
                        color: '#c07070',
                        marginBottom: '10px'
                    },
                    children: err
                }, void 0, false, {
                    fileName: "[project]/components/guest/GuestInfoPopup.tsx",
                    lineNumber: 41,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                    style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["goldBtnStyle"],
                    onClick: handleSubmit,
                    children: "Continue"
                }, void 0, false, {
                    fileName: "[project]/components/guest/GuestInfoPopup.tsx",
                    lineNumber: 43,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                    style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["ghostBtnStyle"],
                    onClick: onClose,
                    children: "Cancel"
                }, void 0, false, {
                    fileName: "[project]/components/guest/GuestInfoPopup.tsx",
                    lineNumber: 44,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/guest/GuestInfoPopup.tsx",
            lineNumber: 21,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/guest/GuestInfoPopup.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
}),
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
"[project]/components/guest/InvoicePreviewPopup.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "InvoicePreviewPopup",
    ()=>InvoicePreviewPopup
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/guest/shopTypes.ts [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
function InvoicePreviewPopup({ product, adminInfo, buyerInfo, onContinue, onCancel, loading }) {
    const specRows = [
        {
            label: 'Title',
            value: product.title
        },
        {
            label: 'Gem Type',
            value: product.gem_type
        },
        {
            label: 'Shape',
            value: product.shape
        },
        {
            label: 'Weight',
            value: product.weight ? `${product.weight} ct` : null
        },
        {
            label: 'Color',
            value: product.color
        },
        ...product.origin ? [
            {
                label: 'Origin',
                value: product.origin
            }
        ] : [],
        ...product.treatment ? [
            {
                label: 'Treatment',
                value: product.treatment
            }
        ] : [],
        ...product.gia_report_number ? [
            {
                label: 'GIA Report #',
                value: product.gia_report_number
            }
        ] : [],
        ...product.price_per_carat ? [
            {
                label: 'Price / ct',
                value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["formatMoney"])(product.price_per_carat)
            }
        ] : []
    ].filter((r)=>r.value);
    const sectionLabel = {
        fontFamily: "'Montserrat', sans-serif",
        fontSize: '9px',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.20em',
        color: 'rgba(255,255,255,0.30)',
        marginBottom: '10px',
        marginTop: '18px'
    };
    const divider = {
        height: '1px',
        backgroundColor: 'rgba(255,255,255,0.06)',
        margin: '16px 0'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["popupOverlayStyle"],
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            style: {
                ...__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["popupBoxStyle"],
                maxWidth: '520px'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                    style: {
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: '10px',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.20em',
                        color: 'rgba(255,255,255,0.52)',
                        marginBottom: '18px'
                    },
                    children: "Invoice Preview"
                }, void 0, false, {
                    fileName: "[project]/components/guest/InvoicePreviewPopup.tsx",
                    lineNumber: 32,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                    style: sectionLabel,
                    children: "From"
                }, void 0, false, {
                    fileName: "[project]/components/guest/InvoicePreviewPopup.tsx",
                    lineNumber: 36,
                    columnNumber: 9
                }, this),
                adminInfo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: {
                        fontFamily: "'Comfortaa', sans-serif",
                        fontSize: '12px',
                        color: 'rgba(255,255,255,0.55)',
                        lineHeight: 1.8
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                color: '#d4af37',
                                fontWeight: 700
                            },
                            children: adminInfo.business_name
                        }, void 0, false, {
                            fileName: "[project]/components/guest/InvoicePreviewPopup.tsx",
                            lineNumber: 39,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            children: adminInfo.full_name
                        }, void 0, false, {
                            fileName: "[project]/components/guest/InvoicePreviewPopup.tsx",
                            lineNumber: 40,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            children: adminInfo.address
                        }, void 0, false, {
                            fileName: "[project]/components/guest/InvoicePreviewPopup.tsx",
                            lineNumber: 41,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            children: adminInfo.contact_email
                        }, void 0, false, {
                            fileName: "[project]/components/guest/InvoicePreviewPopup.tsx",
                            lineNumber: 42,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            children: adminInfo.phone
                        }, void 0, false, {
                            fileName: "[project]/components/guest/InvoicePreviewPopup.tsx",
                            lineNumber: 43,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/guest/InvoicePreviewPopup.tsx",
                    lineNumber: 38,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: divider
                }, void 0, false, {
                    fileName: "[project]/components/guest/InvoicePreviewPopup.tsx",
                    lineNumber: 47,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                    style: sectionLabel,
                    children: "Bill To"
                }, void 0, false, {
                    fileName: "[project]/components/guest/InvoicePreviewPopup.tsx",
                    lineNumber: 49,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: {
                        fontFamily: "'Comfortaa', sans-serif",
                        fontSize: '12px',
                        color: 'rgba(255,255,255,0.55)',
                        lineHeight: 1.8
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                color: 'rgba(255,255,255,0.80)'
                            },
                            children: buyerInfo.name
                        }, void 0, false, {
                            fileName: "[project]/components/guest/InvoicePreviewPopup.tsx",
                            lineNumber: 51,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            children: buyerInfo.email
                        }, void 0, false, {
                            fileName: "[project]/components/guest/InvoicePreviewPopup.tsx",
                            lineNumber: 52,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            children: buyerInfo.phone
                        }, void 0, false, {
                            fileName: "[project]/components/guest/InvoicePreviewPopup.tsx",
                            lineNumber: 53,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            children: buyerInfo.shippingAddress
                        }, void 0, false, {
                            fileName: "[project]/components/guest/InvoicePreviewPopup.tsx",
                            lineNumber: 54,
                            columnNumber: 11
                        }, this),
                        buyerInfo.businessName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            children: buyerInfo.businessName
                        }, void 0, false, {
                            fileName: "[project]/components/guest/InvoicePreviewPopup.tsx",
                            lineNumber: 55,
                            columnNumber: 38
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/guest/InvoicePreviewPopup.tsx",
                    lineNumber: 50,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: divider
                }, void 0, false, {
                    fileName: "[project]/components/guest/InvoicePreviewPopup.tsx",
                    lineNumber: 58,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                    style: sectionLabel,
                    children: "Product"
                }, void 0, false, {
                    fileName: "[project]/components/guest/InvoicePreviewPopup.tsx",
                    lineNumber: 60,
                    columnNumber: 9
                }, this),
                specRows.map(({ label, value })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'baseline',
                            gap: '12px',
                            marginBottom: '8px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                style: {
                                    fontFamily: "'Montserrat', sans-serif",
                                    fontSize: '9px',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.18em',
                                    color: 'rgba(255,255,255,0.38)',
                                    flexShrink: 0
                                },
                                children: label
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InvoicePreviewPopup.tsx",
                                lineNumber: 63,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                style: {
                                    fontFamily: "'Comfortaa', sans-serif",
                                    fontSize: '12px',
                                    color: 'rgba(255,255,255,0.70)',
                                    textAlign: 'right'
                                },
                                children: value
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InvoicePreviewPopup.tsx",
                                lineNumber: 64,
                                columnNumber: 13
                            }, this)
                        ]
                    }, label, true, {
                        fileName: "[project]/components/guest/InvoicePreviewPopup.tsx",
                        lineNumber: 62,
                        columnNumber: 11
                    }, this)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: divider
                }, void 0, false, {
                    fileName: "[project]/components/guest/InvoicePreviewPopup.tsx",
                    lineNumber: 68,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: {
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                        marginBottom: '4px'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                            style: {
                                fontFamily: "'Montserrat', sans-serif",
                                fontSize: '10px',
                                textTransform: 'uppercase',
                                letterSpacing: '0.18em',
                                color: 'rgba(255,255,255,0.38)'
                            },
                            children: "Total"
                        }, void 0, false, {
                            fileName: "[project]/components/guest/InvoicePreviewPopup.tsx",
                            lineNumber: 71,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                            style: {
                                fontFamily: "'Courier New', monospace",
                                fontSize: '20px',
                                color: 'rgba(45,212,191,1)'
                            },
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["formatMoney"])(product.total_price)
                        }, void 0, false, {
                            fileName: "[project]/components/guest/InvoicePreviewPopup.tsx",
                            lineNumber: 72,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/guest/InvoicePreviewPopup.tsx",
                    lineNumber: 70,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                    style: {
                        fontFamily: "'Comfortaa', sans-serif",
                        fontSize: '11px',
                        color: 'rgba(255,255,255,0.25)',
                        marginBottom: '24px'
                    },
                    children: "Payment method: Card via Stripe"
                }, void 0, false, {
                    fileName: "[project]/components/guest/InvoicePreviewPopup.tsx",
                    lineNumber: 74,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                    style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["goldBtnStyle"],
                    onClick: onContinue,
                    disabled: loading,
                    children: loading ? 'Redirecting...' : 'Continue to Payment'
                }, void 0, false, {
                    fileName: "[project]/components/guest/InvoicePreviewPopup.tsx",
                    lineNumber: 78,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                    style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["ghostBtnStyle"],
                    onClick: onCancel,
                    children: "Cancel"
                }, void 0, false, {
                    fileName: "[project]/components/guest/InvoicePreviewPopup.tsx",
                    lineNumber: 81,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/guest/InvoicePreviewPopup.tsx",
            lineNumber: 31,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/guest/InvoicePreviewPopup.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/components/guest/ProductDetailModal.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>ProductDetailModal
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shopping-cart.js [ssr] (ecmascript) <export default as ShoppingCart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/message-square.js [ssr] (ecmascript) <export default as MessageSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/guest/shopTypes.ts [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
function ProductDetailModal({ product: modalProduct, onClose, onBuy: handleBuyClick, onInquire: handleInquiryClick, getPhotoUrl }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["popupOverlayStyle"],
        onClick: (e)=>{
            if (e.target === e.currentTarget) {
                onClose();
            }
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            style: {
                ...__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["popupBoxStyle"],
                maxWidth: '560px'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                    onClick: ()=>{
                        onClose();
                    },
                    style: {
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        background: 'rgba(0,0,0,0.5)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        borderRadius: '50%',
                        width: '36px',
                        height: '36px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        color: '#FAFAFA',
                        zIndex: 10
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                        size: 18
                    }, void 0, false, {
                        fileName: "[project]/components/guest/ProductDetailModal.tsx",
                        lineNumber: 25,
                        columnNumber: 15
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/guest/ProductDetailModal.tsx",
                    lineNumber: 21,
                    columnNumber: 13
                }, this),
                modalProduct.photo_url && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: {
                        marginBottom: '20px',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        aspectRatio: '4/3'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                        src: getPhotoUrl(modalProduct.photo_url),
                        alt: modalProduct.title,
                        style: {
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/guest/ProductDetailModal.tsx",
                        lineNumber: 31,
                        columnNumber: 17
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/guest/ProductDetailModal.tsx",
                    lineNumber: 30,
                    columnNumber: 15
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                    style: {
                        fontFamily: "'Oranienbaum', serif",
                        fontSize: '24px',
                        fontWeight: 400,
                        color: '#FAFAFA',
                        marginBottom: '8px'
                    },
                    children: modalProduct.title
                }, void 0, false, {
                    fileName: "[project]/components/guest/ProductDetailModal.tsx",
                    lineNumber: 39,
                    columnNumber: 13
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                    style: {
                        fontFamily: "'Courier New', monospace",
                        fontSize: '22px',
                        color: 'rgba(45,212,191,1)',
                        marginBottom: '20px'
                    },
                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["formatMoney"])(modalProduct.total_price)
                }, void 0, false, {
                    fileName: "[project]/components/guest/ProductDetailModal.tsx",
                    lineNumber: 43,
                    columnNumber: 13
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: {
                        marginBottom: '20px'
                    },
                    children: [
                        {
                            label: 'Gem Type',
                            value: modalProduct.gem_type
                        },
                        {
                            label: 'Shape',
                            value: modalProduct.shape
                        },
                        {
                            label: 'Weight',
                            value: modalProduct.weight ? `${modalProduct.weight} ct` : null
                        },
                        {
                            label: 'Color',
                            value: modalProduct.color
                        },
                        {
                            label: 'Origin',
                            value: modalProduct.origin
                        },
                        {
                            label: 'Treatment',
                            value: modalProduct.treatment
                        },
                        {
                            label: 'Price/ct',
                            value: modalProduct.price_per_carat ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["formatMoney"])(modalProduct.price_per_carat) : null
                        }
                    ].filter((r)=>r.value).map(({ label, value })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: '6px'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontFamily: "'Montserrat', sans-serif",
                                        fontSize: '9px',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.18em',
                                        color: 'rgba(255,255,255,0.38)'
                                    },
                                    children: label
                                }, void 0, false, {
                                    fileName: "[project]/components/guest/ProductDetailModal.tsx",
                                    lineNumber: 59,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontFamily: "'Comfortaa', sans-serif",
                                        fontSize: '12px',
                                        color: 'rgba(255,255,255,0.70)'
                                    },
                                    children: value
                                }, void 0, false, {
                                    fileName: "[project]/components/guest/ProductDetailModal.tsx",
                                    lineNumber: 60,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, label, true, {
                            fileName: "[project]/components/guest/ProductDetailModal.tsx",
                            lineNumber: 58,
                            columnNumber: 17
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/guest/ProductDetailModal.tsx",
                    lineNumber: 48,
                    columnNumber: 13
                }, this),
                modalProduct.gia_report_number && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: {
                        marginBottom: '20px',
                        padding: '12px',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.06)'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                            style: {
                                fontFamily: "'Montserrat', sans-serif",
                                fontSize: '9px',
                                textTransform: 'uppercase',
                                letterSpacing: '0.18em',
                                color: 'rgba(255,255,255,0.38)'
                            },
                            children: "GIA Report"
                        }, void 0, false, {
                            fileName: "[project]/components/guest/ProductDetailModal.tsx",
                            lineNumber: 68,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                            style: {
                                fontFamily: "'Comfortaa', sans-serif",
                                fontSize: '13px',
                                color: 'rgba(255,255,255,0.70)',
                                margin: '4px 0 0'
                            },
                            children: [
                                "#",
                                modalProduct.gia_report_number,
                                modalProduct.gia_report_pdf_url && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                    href: modalProduct.gia_report_pdf_url,
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    style: {
                                        color: '#d4af37',
                                        marginLeft: '8px',
                                        fontSize: '11px'
                                    },
                                    children: "View Report"
                                }, void 0, false, {
                                    fileName: "[project]/components/guest/ProductDetailModal.tsx",
                                    lineNumber: 72,
                                    columnNumber: 21
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/guest/ProductDetailModal.tsx",
                            lineNumber: 69,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/guest/ProductDetailModal.tsx",
                    lineNumber: 67,
                    columnNumber: 15
                }, this),
                modalProduct.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                    style: {
                        fontFamily: "'Comfortaa', sans-serif",
                        fontSize: '13px',
                        lineHeight: 1.75,
                        color: 'rgba(255,255,255,0.55)',
                        marginBottom: '24px'
                    },
                    children: modalProduct.description
                }, void 0, false, {
                    fileName: "[project]/components/guest/ProductDetailModal.tsx",
                    lineNumber: 81,
                    columnNumber: 15
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: {
                        display: 'flex',
                        gap: '10px'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                            style: {
                                ...__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["goldBtnStyle"],
                                flex: 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px'
                            },
                            onClick: handleBuyClick,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__["ShoppingCart"], {
                                    size: 14
                                }, void 0, false, {
                                    fileName: "[project]/components/guest/ProductDetailModal.tsx",
                                    lineNumber: 91,
                                    columnNumber: 17
                                }, this),
                                " Buy Now"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/guest/ProductDetailModal.tsx",
                            lineNumber: 87,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                            style: {
                                flex: 1,
                                textAlign: 'center',
                                fontFamily: "'Montserrat', sans-serif",
                                fontSize: '11px',
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                letterSpacing: '0.20em',
                                backgroundColor: 'transparent',
                                color: 'rgba(255,255,255,0.65)',
                                border: '1px solid rgba(255,255,255,0.15)',
                                padding: '14px 24px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px'
                            },
                            onClick: handleInquiryClick,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"], {
                                    size: 14
                                }, void 0, false, {
                                    fileName: "[project]/components/guest/ProductDetailModal.tsx",
                                    lineNumber: 97,
                                    columnNumber: 17
                                }, this),
                                " Inquire"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/guest/ProductDetailModal.tsx",
                            lineNumber: 93,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/guest/ProductDetailModal.tsx",
                    lineNumber: 86,
                    columnNumber: 13
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/guest/ProductDetailModal.tsx",
            lineNumber: 20,
            columnNumber: 11
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/guest/ProductDetailModal.tsx",
        lineNumber: 16,
        columnNumber: 9
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/components/guest/InquiryContactForm.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InquiryContactForm",
    ()=>InquiryContactForm,
    "InquiryDescForm",
    ()=>InquiryDescForm
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/guest/shopTypes.ts [ssr] (ecmascript)");
;
;
;
function InquiryContactForm({ onSubmit, onClose }) {
    const [firstName, setFirstName] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [lastName, setLastName] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [phone, setPhone] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('+1 ');
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [addr1, setAddr1] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [addr2, setAddr2] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [city, setCity] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [addrState, setAddrState] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [country, setCountry] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [zip, setZip] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [err, setErr] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    gap: '10px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            flex: 1
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["labelStyle"],
                                children: "First Name *"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 20,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["inputStyle"],
                                placeholder: "Jane",
                                value: firstName,
                                onChange: (e)=>setFirstName(e.target.value),
                                onFocus: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["inputFocus"],
                                onBlur: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["inputBlur"]
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 21,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/guest/InquiryContactForm.tsx",
                        lineNumber: 19,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            flex: 1
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["labelStyle"],
                                children: "Last Name *"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 24,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["inputStyle"],
                                placeholder: "Smith",
                                value: lastName,
                                onChange: (e)=>setLastName(e.target.value),
                                onFocus: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["inputFocus"],
                                onBlur: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["inputBlur"]
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 25,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/guest/InquiryContactForm.tsx",
                        lineNumber: 23,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["labelStyle"],
                children: "Phone Number *"
            }, void 0, false, {
                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["inputStyle"],
                type: "tel",
                placeholder: "+1 (555) 000-0000",
                value: phone,
                onChange: (e)=>setPhone(e.target.value),
                onFocus: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["inputFocus"],
                onBlur: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["inputBlur"]
            }, void 0, false, {
                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["labelStyle"],
                children: "Email Address *"
            }, void 0, false, {
                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["inputStyle"],
                type: "email",
                placeholder: "jane@email.com",
                value: email,
                onChange: (e)=>setEmail(e.target.value),
                onFocus: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["inputFocus"],
                onBlur: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["inputBlur"]
            }, void 0, false, {
                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["labelStyle"],
                children: "Shipping Address"
            }, void 0, false, {
                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    gap: '8px',
                    marginBottom: '8px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                        style: {
                            ...__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["inputStyle"],
                            flex: 2,
                            marginBottom: 0
                        },
                        placeholder: "Address Line 1",
                        value: addr1,
                        onChange: (e)=>setAddr1(e.target.value),
                        onFocus: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["inputFocus"],
                        onBlur: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["inputBlur"]
                    }, void 0, false, {
                        fileName: "[project]/components/guest/InquiryContactForm.tsx",
                        lineNumber: 34,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                        style: {
                            ...__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["inputStyle"],
                            flex: 1,
                            marginBottom: 0
                        },
                        placeholder: "Apt / Suite",
                        value: addr2,
                        onChange: (e)=>setAddr2(e.target.value)
                    }, void 0, false, {
                        fileName: "[project]/components/guest/InquiryContactForm.tsx",
                        lineNumber: 35,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    gap: '8px',
                    marginBottom: '8px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                        style: {
                            ...__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["inputStyle"],
                            flex: 2,
                            marginBottom: 0
                        },
                        placeholder: "City",
                        value: city,
                        onChange: (e)=>setCity(e.target.value),
                        onFocus: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["inputFocus"],
                        onBlur: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["inputBlur"]
                    }, void 0, false, {
                        fileName: "[project]/components/guest/InquiryContactForm.tsx",
                        lineNumber: 38,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                        style: {
                            ...__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["inputStyle"],
                            flex: 1,
                            marginBottom: 0
                        },
                        placeholder: "State",
                        value: addrState,
                        onChange: (e)=>setAddrState(e.target.value),
                        onFocus: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["inputFocus"],
                        onBlur: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["inputBlur"]
                    }, void 0, false, {
                        fileName: "[project]/components/guest/InquiryContactForm.tsx",
                        lineNumber: 39,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    gap: '8px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                        style: {
                            ...__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["inputStyle"],
                            flex: 2,
                            marginBottom: 0
                        },
                        value: country,
                        onChange: (e)=>setCountry(e.target.value),
                        onFocus: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["inputFocus"],
                        onBlur: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["inputBlur"],
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "",
                                children: "Country"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 43,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Afghanistan",
                                children: "Afghanistan"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 44,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Albania",
                                children: "Albania"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 45,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Algeria",
                                children: "Algeria"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 46,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Andorra",
                                children: "Andorra"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 47,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Angola",
                                children: "Angola"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 48,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Argentina",
                                children: "Argentina"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 49,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Armenia",
                                children: "Armenia"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 50,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Australia",
                                children: "Australia"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 51,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Austria",
                                children: "Austria"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 52,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Azerbaijan",
                                children: "Azerbaijan"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 53,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Bahamas",
                                children: "Bahamas"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 54,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Bahrain",
                                children: "Bahrain"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 55,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Bangladesh",
                                children: "Bangladesh"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 56,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Belarus",
                                children: "Belarus"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 57,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Belgium",
                                children: "Belgium"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 58,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Belize",
                                children: "Belize"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 59,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Bolivia",
                                children: "Bolivia"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 60,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Bosnia and Herzegovina",
                                children: "Bosnia and Herzegovina"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 61,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Brazil",
                                children: "Brazil"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 62,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Bulgaria",
                                children: "Bulgaria"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 63,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Cambodia",
                                children: "Cambodia"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 64,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Canada",
                                children: "Canada"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 65,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Chile",
                                children: "Chile"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 66,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "China",
                                children: "China"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 67,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Colombia",
                                children: "Colombia"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 68,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Costa Rica",
                                children: "Costa Rica"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 69,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Croatia",
                                children: "Croatia"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 70,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Cuba",
                                children: "Cuba"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 71,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Cyprus",
                                children: "Cyprus"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 72,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Czech Republic",
                                children: "Czech Republic"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 73,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Denmark",
                                children: "Denmark"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 74,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Dominican Republic",
                                children: "Dominican Republic"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 75,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Ecuador",
                                children: "Ecuador"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 76,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Egypt",
                                children: "Egypt"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 77,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "El Salvador",
                                children: "El Salvador"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 78,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Estonia",
                                children: "Estonia"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 79,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Ethiopia",
                                children: "Ethiopia"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 80,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Finland",
                                children: "Finland"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 81,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "France",
                                children: "France"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 82,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Georgia",
                                children: "Georgia"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 83,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Germany",
                                children: "Germany"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 84,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Ghana",
                                children: "Ghana"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 85,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Greece",
                                children: "Greece"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 86,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Guatemala",
                                children: "Guatemala"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 87,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Honduras",
                                children: "Honduras"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 88,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Hungary",
                                children: "Hungary"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 89,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Iceland",
                                children: "Iceland"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 90,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "India",
                                children: "India"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 91,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Indonesia",
                                children: "Indonesia"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 92,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Iran",
                                children: "Iran"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 93,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Iraq",
                                children: "Iraq"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 94,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Ireland",
                                children: "Ireland"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 95,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Israel",
                                children: "Israel"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 96,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Italy",
                                children: "Italy"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 97,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Jamaica",
                                children: "Jamaica"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 98,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Japan",
                                children: "Japan"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 99,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Jordan",
                                children: "Jordan"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 100,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Kazakhstan",
                                children: "Kazakhstan"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 101,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Kenya",
                                children: "Kenya"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 102,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Kuwait",
                                children: "Kuwait"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 103,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Latvia",
                                children: "Latvia"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 104,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Lebanon",
                                children: "Lebanon"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 105,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Lithuania",
                                children: "Lithuania"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 106,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Luxembourg",
                                children: "Luxembourg"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 107,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Malaysia",
                                children: "Malaysia"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 108,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Mexico",
                                children: "Mexico"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 109,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Moldova",
                                children: "Moldova"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 110,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Monaco",
                                children: "Monaco"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 111,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Morocco",
                                children: "Morocco"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 112,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Nepal",
                                children: "Nepal"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 113,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Netherlands",
                                children: "Netherlands"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 114,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "New Zealand",
                                children: "New Zealand"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 115,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Nicaragua",
                                children: "Nicaragua"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 116,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Nigeria",
                                children: "Nigeria"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 117,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "North Korea",
                                children: "North Korea"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 118,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Norway",
                                children: "Norway"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 119,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Oman",
                                children: "Oman"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 120,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Pakistan",
                                children: "Pakistan"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 121,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Panama",
                                children: "Panama"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 122,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Paraguay",
                                children: "Paraguay"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 123,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Peru",
                                children: "Peru"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 124,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Philippines",
                                children: "Philippines"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 125,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Poland",
                                children: "Poland"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 126,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Portugal",
                                children: "Portugal"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 127,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Qatar",
                                children: "Qatar"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 128,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Romania",
                                children: "Romania"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 129,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Russia",
                                children: "Russia"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 130,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Saudi Arabia",
                                children: "Saudi Arabia"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 131,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Senegal",
                                children: "Senegal"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 132,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Serbia",
                                children: "Serbia"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 133,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Singapore",
                                children: "Singapore"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 134,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Slovakia",
                                children: "Slovakia"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 135,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "South Africa",
                                children: "South Africa"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 136,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "South Korea",
                                children: "South Korea"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 137,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Spain",
                                children: "Spain"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 138,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Sri Lanka",
                                children: "Sri Lanka"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 139,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Sweden",
                                children: "Sweden"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 140,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Switzerland",
                                children: "Switzerland"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 141,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Syria",
                                children: "Syria"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 142,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Taiwan",
                                children: "Taiwan"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 143,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Thailand",
                                children: "Thailand"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 144,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Trinidad and Tobago",
                                children: "Trinidad and Tobago"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 145,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Tunisia",
                                children: "Tunisia"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 146,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Turkey",
                                children: "Turkey"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 147,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Ukraine",
                                children: "Ukraine"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 148,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "United Arab Emirates",
                                children: "United Arab Emirates"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 149,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "United Kingdom",
                                children: "United Kingdom"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 150,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "United States",
                                children: "United States"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 151,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Uruguay",
                                children: "Uruguay"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 152,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Uzbekistan",
                                children: "Uzbekistan"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 153,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Venezuela",
                                children: "Venezuela"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 154,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Vietnam",
                                children: "Vietnam"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 155,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Yemen",
                                children: "Yemen"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 156,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "Zimbabwe",
                                children: "Zimbabwe"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 157,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/guest/InquiryContactForm.tsx",
                        lineNumber: 42,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                        style: {
                            ...__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["inputStyle"],
                            flex: 1,
                            marginBottom: 0
                        },
                        placeholder: "ZIP",
                        value: zip,
                        onChange: (e)=>setZip(e.target.value),
                        onFocus: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["inputFocus"],
                        onBlur: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["inputBlur"]
                    }, void 0, false, {
                        fileName: "[project]/components/guest/InquiryContactForm.tsx",
                        lineNumber: 159,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this),
            err && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                style: {
                    fontSize: '11px',
                    color: '#c07070',
                    marginBottom: '10px'
                },
                children: err
            }, void 0, false, {
                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                lineNumber: 161,
                columnNumber: 15
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["goldBtnStyle"],
                onClick: ()=>{
                    if (!firstName.trim() || !lastName.trim() || !phone.trim() || !email.trim()) {
                        setErr('All fields are required.');
                        return;
                    }
                    const shipping = [
                        addr1.trim(),
                        addr2.trim(),
                        city.trim(),
                        addrState.trim(),
                        zip.trim(),
                        country.trim()
                    ].filter(Boolean).join(', ');
                    onSubmit({
                        firstName: firstName.trim(),
                        lastName: lastName.trim(),
                        email: email.trim(),
                        phone: phone.trim(),
                        shipping_address: shipping
                    });
                },
                children: "Continue"
            }, void 0, false, {
                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                lineNumber: 162,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["ghostBtnStyle"],
                onClick: onClose,
                children: "Cancel"
            }, void 0, false, {
                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                lineNumber: 167,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
function InquiryDescForm({ onSubmit, onClose, submitting }) {
    const [desc, setDesc] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["labelStyle"],
                children: "Your Message *"
            }, void 0, false, {
                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                lineNumber: 176,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("textarea", {
                style: {
                    ...__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["inputStyle"],
                    minHeight: '100px',
                    resize: 'vertical'
                },
                placeholder: "Tell us about your interest in this gem...",
                value: desc,
                onChange: (e)=>setDesc(e.target.value),
                onFocus: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["inputFocus"],
                onBlur: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["inputBlur"]
            }, void 0, false, {
                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                lineNumber: 177,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                style: {
                    ...__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["goldBtnStyle"],
                    opacity: submitting || !desc.trim() ? 0.5 : 1
                },
                onClick: ()=>{
                    if (desc.trim()) onSubmit(desc.trim());
                },
                disabled: submitting || !desc.trim(),
                children: submitting ? 'Sending...' : 'Submit Inquiry'
            }, void 0, false, {
                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                lineNumber: 184,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["ghostBtnStyle"],
                onClick: onClose,
                children: "Cancel"
            }, void 0, false, {
                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                lineNumber: 189,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/components/guest/InquiryModal.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>InquiryModal
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/guest/shopTypes.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$InquiryContactForm$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/guest/InquiryContactForm.tsx [ssr] (ecmascript)");
;
;
;
function InquiryModal({ inquiryStep, product: modalProduct, guestCollected, accountUser, submitting: inquirySubmitting, onGuestInfoSubmit: handleGuestInfoForInquiry, onClose: closeInquiry, onDescSubmit: handleInquiryDescSubmit, onOK: handleInquiryOK }) {
    const displayName = guestCollected ? guestCollected.firstName + ' ' + guestCollected.lastName : accountUser?.name || '';
    const displayEmail = guestCollected?.email || accountUser?.email || '';
    const displayPhone = guestCollected?.phone || accountUser?.phone || '';
    if (inquiryStep === 'collect-info') return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["popupOverlayStyle"],
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["popupBoxStyle"],
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                    style: {
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: '10px',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.20em',
                        color: 'rgba(255,255,255,0.52)',
                        marginBottom: '6px'
                    },
                    children: "Inquire About This Gem"
                }, void 0, false, {
                    fileName: "[project]/components/guest/InquiryModal.tsx",
                    lineNumber: 24,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                    style: {
                        fontFamily: "'Comfortaa', sans-serif",
                        fontSize: '12px',
                        color: 'rgba(255,255,255,0.45)',
                        marginBottom: '20px',
                        lineHeight: 1.6
                    },
                    children: "Please share your contact details so we can follow up."
                }, void 0, false, {
                    fileName: "[project]/components/guest/InquiryModal.tsx",
                    lineNumber: 25,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$InquiryContactForm$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["InquiryContactForm"], {
                    onSubmit: handleGuestInfoForInquiry,
                    onClose: closeInquiry
                }, void 0, false, {
                    fileName: "[project]/components/guest/InquiryModal.tsx",
                    lineNumber: 26,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/guest/InquiryModal.tsx",
            lineNumber: 23,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/guest/InquiryModal.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
    if (inquiryStep === 'describe') return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["popupOverlayStyle"],
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["popupBoxStyle"],
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                    style: {
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: '10px',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.20em',
                        color: 'rgba(255,255,255,0.52)',
                        marginBottom: '6px'
                    },
                    children: [
                        "Inquiry — ",
                        modalProduct.title
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/guest/InquiryModal.tsx",
                    lineNumber: 34,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: {
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.07)',
                        borderRadius: '8px',
                        padding: '14px 16px',
                        marginBottom: '20px'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                fontFamily: "'Montserrat', sans-serif",
                                fontSize: '9px',
                                textTransform: 'uppercase',
                                letterSpacing: '0.18em',
                                color: 'rgba(255,255,255,0.30)',
                                marginBottom: '8px'
                            },
                            children: "Your Details"
                        }, void 0, false, {
                            fileName: "[project]/components/guest/InquiryModal.tsx",
                            lineNumber: 36,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                fontFamily: "'Comfortaa', sans-serif",
                                fontSize: '13px',
                                color: 'rgba(255,255,255,0.65)',
                                lineHeight: 1.7
                            },
                            children: [
                                displayName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    children: displayName
                                }, void 0, false, {
                                    fileName: "[project]/components/guest/InquiryModal.tsx",
                                    lineNumber: 38,
                                    columnNumber: 29
                                }, this),
                                displayEmail && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    children: displayEmail
                                }, void 0, false, {
                                    fileName: "[project]/components/guest/InquiryModal.tsx",
                                    lineNumber: 39,
                                    columnNumber: 30
                                }, this),
                                displayPhone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    children: displayPhone
                                }, void 0, false, {
                                    fileName: "[project]/components/guest/InquiryModal.tsx",
                                    lineNumber: 40,
                                    columnNumber: 30
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/guest/InquiryModal.tsx",
                            lineNumber: 37,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/guest/InquiryModal.tsx",
                    lineNumber: 35,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$InquiryContactForm$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["InquiryDescForm"], {
                    onSubmit: handleInquiryDescSubmit,
                    onClose: closeInquiry,
                    submitting: inquirySubmitting
                }, void 0, false, {
                    fileName: "[project]/components/guest/InquiryModal.tsx",
                    lineNumber: 43,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/guest/InquiryModal.tsx",
            lineNumber: 33,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/guest/InquiryModal.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, this);
    if (inquiryStep === 'success') return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["popupOverlayStyle"],
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            style: {
                ...__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["popupBoxStyle"],
                textAlign: 'center'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: {
                        fontSize: '32px',
                        marginBottom: '16px'
                    },
                    children: "✓"
                }, void 0, false, {
                    fileName: "[project]/components/guest/InquiryModal.tsx",
                    lineNumber: 51,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                    style: {
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: '12px',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.20em',
                        color: 'rgba(45,212,191,1)',
                        marginBottom: '10px'
                    },
                    children: "Inquiry Sent!"
                }, void 0, false, {
                    fileName: "[project]/components/guest/InquiryModal.tsx",
                    lineNumber: 52,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                    style: {
                        fontFamily: "'Comfortaa', sans-serif",
                        fontSize: '13px',
                        color: 'rgba(255,255,255,0.50)',
                        lineHeight: 1.7,
                        marginBottom: '28px'
                    },
                    children: [
                        "We've received your inquiry about ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                            style: {
                                color: 'rgba(255,255,255,0.75)'
                            },
                            children: modalProduct.title
                        }, void 0, false, {
                            fileName: "[project]/components/guest/InquiryModal.tsx",
                            lineNumber: 54,
                            columnNumber: 45
                        }, this),
                        " and will be in touch soon."
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/guest/InquiryModal.tsx",
                    lineNumber: 53,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                    style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["goldBtnStyle"],
                    onClick: handleInquiryOK,
                    children: "OK"
                }, void 0, false, {
                    fileName: "[project]/components/guest/InquiryModal.tsx",
                    lineNumber: 56,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/guest/InquiryModal.tsx",
            lineNumber: 50,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/guest/InquiryModal.tsx",
        lineNumber: 49,
        columnNumber: 5
    }, this);
    return null;
}
}),
"[project]/pages/shop.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>ShopPage
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$TopNav$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/shared/TopNav.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$Footer$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/shared/Footer.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$GuestInfoPopup$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/guest/GuestInfoPopup.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$InvoicePreviewPopup$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/guest/InvoicePreviewPopup.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$ProductDetailModal$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/guest/ProductDetailModal.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$InquiryModal$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/guest/InquiryModal.tsx [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$InvoicePreviewPopup$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$ProductDetailModal$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$InvoicePreviewPopup$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$ProductDetailModal$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
;
;
// ── Shared Styles ────────────────────────────────────────────
const popupOverlayStyle = {
    position: 'fixed',
    inset: 0,
    zIndex: 200,
    backgroundColor: 'rgba(0,0,0,0.85)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px'
};
const popupBoxStyle = {
    backgroundColor: '#0A0A0A',
    border: '1px solid rgba(255,255,255,0.10)',
    borderRadius: '16px',
    width: '100%',
    maxWidth: '480px',
    maxHeight: '90vh',
    overflowY: 'auto',
    padding: '32px'
};
const inputStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.10)',
    padding: '10px 12px',
    color: '#FAFAFA',
    fontFamily: "'Comfortaa', sans-serif",
    fontSize: '13px',
    outline: 'none',
    marginBottom: '10px'
};
const labelStyle = {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '9px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    color: 'rgba(255,255,255,0.38)',
    display: 'block',
    marginBottom: '5px'
};
const goldBtnStyle = {
    width: '100%',
    textAlign: 'center',
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '11px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.20em',
    backgroundColor: '#d4af37',
    color: '#050505',
    border: 'none',
    padding: '14px 24px',
    cursor: 'pointer'
};
const ghostBtnStyle = {
    width: '100%',
    textAlign: 'center',
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '10px',
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    backgroundColor: 'transparent',
    color: 'rgba(255,255,255,0.38)',
    border: 'none',
    cursor: 'pointer',
    padding: '10px 0',
    marginTop: '8px'
};
function ShopPage() {
    const [session, setSession] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [products, setProducts] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(true);
    const [modalProduct, setModalProduct] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [tappedProduct, setTappedProduct] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const handleCardClick = (product)=>{
        const isMobile = window.innerWidth < 768;
        if (!isMobile) {
            setModalProduct(product);
            return;
        }
        if (tappedProduct === product.product_id) {
            setModalProduct(product);
            setTappedProduct(null);
        } else {
            setTappedProduct(product.product_id);
        }
    };
    // Guest info
    const [guestInfo, setGuestInfo] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [showGuestPopup, setShowGuestPopup] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [pendingAction, setPendingAction] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    // Inquiry state
    const [inquiryStep, setInquiryStep] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [guestCollected, setGuestCollected] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [inquirySubmitting, setInquirySubmitting] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    // Invoice preview
    const [showInvoicePreview, setShowInvoicePreview] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [adminInfo, setAdminInfo] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [accountUser, setAccountUser] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [checkoutLoading, setCheckoutLoading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    // Auth — auto sign out if somehow logged in as guest on page load
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const guestId = ("TURBOPACK compile-time value", "18cf77dc-6e41-42bb-abb3-0ae8615bbc20");
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.getSession().then(async ({ data: { session: s } })=>{
            if (s && s.user.id === guestId) {
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.signOut();
                setSession(null);
            } else {
                setSession(s);
            }
        });
        const { data: { subscription } } = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.onAuthStateChange(async (_e, s)=>{
            if (s && s.user.id === guestId) {
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.signOut();
                setSession(null);
            } else {
                setSession(s);
            }
        });
        return ()=>subscription.unsubscribe();
    }, []);
    // Load products
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        async function load() {
            // Use shop_active_products view for public — shows only PUBLISHED products
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].from('shop_active_products').select('*');
            if (!error && data) {
                setProducts(data);
            } else {
                // Fallback: query products directly for PUBLISHED state
                const { data: fallback } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].from('products').select('*').eq('product_state', 'PUBLISHED').order('created_at', {
                    ascending: false
                });
                setProducts(fallback || []);
            }
            setLoading(false);
        }
        load();
    }, []);
    // Load account user info if authenticated
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (!session) {
            setAccountUser(null);
            return;
        }
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].from('account_users').select('*').eq('account_user_id', session.user.id).single().then(({ data })=>setAccountUser(data));
    }, [
        session
    ]);
    // Photo URL helper
    const getPhotoUrl = (url)=>{
        if (!url) return null;
        if (url.startsWith('http')) return url;
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].storage.from('product-photos').getPublicUrl(url).data.publicUrl;
    };
    // ── Inquiry Flow ────────────────────────────────────────
    const guestId = ("TURBOPACK compile-time value", "18cf77dc-6e41-42bb-abb3-0ae8615bbc20");
    const isRealUser = session && session.user.id !== guestId;
    const handleInquiryClick = ()=>{
        if (isRealUser) {
            setInquiryStep('describe');
        } else {
            setInquiryStep('collect-info');
        }
    };
    const handleGuestInfoForInquiry = async (info)=>{
        setGuestCollected(info);
        setInquiryStep('describe');
    };
    const handleInquiryDescSubmit = async (desc)=>{
        if (!modalProduct) return;
        setInquirySubmitting(true);
        try {
            if (isRealUser) {
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].from('account_inquiries').insert({
                    account_user_id: session.user.id,
                    description: desc,
                    product_id: modalProduct.product_id,
                    photo_url: null
                });
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].functions.invoke('send-admin-notification', {
                    body: {
                        event_type: 'account_inquiries',
                        user_id: session.user.id
                    }
                }).catch(()=>{});
            } else if (guestCollected) {
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].from('guest_inquiries').insert({
                    name: guestCollected.firstName + ' ' + guestCollected.lastName,
                    email: guestCollected.email,
                    phone: guestCollected.phone,
                    shipping_address: 'Not provided',
                    description: desc,
                    product_id: modalProduct.product_id,
                    photo_url: null
                });
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].functions.invoke('send-admin-notification', {
                    body: {
                        event_type: 'guest_inquiries',
                        guest_name: guestCollected.firstName + ' ' + guestCollected.lastName
                    }
                }).catch(()=>{});
            }
            setInquiryStep('success');
        } catch (e) {
            console.error('Inquiry error:', e);
        }
        setInquirySubmitting(false);
    };
    const handleInquiryOK = async ()=>{
        setInquiryStep(null);
        setGuestCollected(null);
        setModalProduct(null);
    };
    const closeInquiry = ()=>{
        setInquiryStep(null);
        setGuestCollected(null);
    };
    // ── Purchase Flow ───────────────────────────────────────
    const handleBuyClick = async ()=>{
        if (!session && !guestInfo) {
            setPendingAction('buy');
            setShowGuestPopup(true);
            return;
        }
        // Fetch admin info for invoice preview
        const { data: admin } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].from('admin_users').select('business_name, full_name, address, phone, contact_email').single();
        setAdminInfo(admin);
        setShowInvoicePreview(true);
    };
    const handleCheckout = async ()=>{
        if (!modalProduct) return;
        setCheckoutLoading(true);
        const isGuest = !session;
        const buyerInfo = isGuest && guestInfo ? {
            name: guestInfo.name,
            email: guestInfo.email,
            phone: guestInfo.phone,
            shippingAddress: guestInfo.address,
            businessName: null
        } : accountUser ? {
            name: accountUser.name,
            email: accountUser.email,
            phone: accountUser.phone,
            shippingAddress: accountUser.shipping_address,
            businessName: accountUser.business_name
        } : {
            name: '',
            email: '',
            phone: '',
            shippingAddress: '',
            businessName: null
        };
        try {
            const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || '';
            const res = await fetch(`${backendUrl}/api/checkout/create-session`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    product_id: modalProduct.product_id,
                    guest: isGuest,
                    guest_info: isGuest ? guestInfo : undefined,
                    account_user_id: session?.user?.id,
                    admin_snapshot: adminInfo ? {
                        businessName: adminInfo.business_name,
                        fullName: adminInfo.full_name,
                        address: adminInfo.address,
                        phone: adminInfo.phone,
                        contactEmail: adminInfo.contact_email
                    } : {},
                    account_snapshot: buyerInfo,
                    line_items: [
                        {
                            product_id: modalProduct.product_id,
                            title: modalProduct.title,
                            gem_type: modalProduct.gem_type,
                            shape: modalProduct.shape,
                            weight: modalProduct.weight,
                            color: modalProduct.color,
                            origin: modalProduct.origin,
                            treatment: modalProduct.treatment,
                            description: modalProduct.description,
                            price_per_carat: modalProduct.price_per_carat,
                            total_price: modalProduct.total_price,
                            gia_report_number: modalProduct.gia_report_number,
                            gia_report_pdf_url: modalProduct.gia_report_pdf_url,
                            photo_url: modalProduct.photo_url
                        }
                    ]
                })
            });
            const { url, error } = await res.json();
            if (url) {
                window.location.href = url;
            } else {
                console.error('Checkout error:', error);
                setCheckoutLoading(false);
            }
        } catch (e) {
            console.error('Checkout error:', e);
            setCheckoutLoading(false);
        }
    };
    // Guest info callback
    const handleGuestInfoSubmit = (info)=>{
        setGuestInfo(info);
        setShowGuestPopup(false);
        if (pendingAction === 'buy') {
            setPendingAction(null);
            // Trigger buy flow after setting guest info
            setTimeout(()=>handleBuyClick(), 100);
        }
        setPendingAction(null);
    };
    const buyerInfo = session && accountUser ? {
        name: accountUser.name || '',
        email: accountUser.email || '',
        phone: accountUser.phone || '',
        shippingAddress: accountUser.shipping_address || '',
        businessName: accountUser.business_name
    } : guestInfo ? {
        name: guestInfo.name,
        email: guestInfo.email,
        phone: guestInfo.phone,
        shippingAddress: guestInfo.address,
        businessName: null
    } : {
        name: '',
        email: '',
        phone: '',
        shippingAddress: '',
        businessName: null
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("style", {
                dangerouslySetInnerHTML: {
                    __html: shopCss
                }
            }, void 0, false, {
                fileName: "[project]/pages/shop.tsx",
                lineNumber: 335,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$TopNav$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/pages/shop.tsx",
                lineNumber: 336,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("main", {
                style: {
                    background: '#050505',
                    minHeight: '100vh',
                    paddingTop: '56px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            maxWidth: '1200px',
                            margin: '0 auto',
                            padding: '48px 48px 80px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                style: {
                                    fontFamily: "'Montserrat', sans-serif",
                                    fontSize: '11px',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.20em',
                                    color: 'rgba(255,255,255,0.52)',
                                    marginBottom: '8px'
                                },
                                children: "Gems for Sale"
                            }, void 0, false, {
                                fileName: "[project]/pages/shop.tsx",
                                lineNumber: 339,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                                style: {
                                    fontFamily: "'Montserrat', sans-serif",
                                    fontSize: 'clamp(30px, 6vw, 60px)',
                                    fontWeight: 400,
                                    color: '#FAFAFA',
                                    marginBottom: '48px'
                                },
                                children: "Shop"
                            }, void 0, false, {
                                fileName: "[project]/pages/shop.tsx",
                                lineNumber: 348,
                                columnNumber: 11
                            }, this),
                            loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    textAlign: 'center',
                                    padding: '80px 0',
                                    color: 'rgba(255,255,255,0.45)'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontFamily: "'Montserrat', sans-serif",
                                        fontSize: '11px',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.2em'
                                    },
                                    children: "Loading..."
                                }, void 0, false, {
                                    fileName: "[project]/pages/shop.tsx",
                                    lineNumber: 360,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/pages/shop.tsx",
                                lineNumber: 359,
                                columnNumber: 13
                            }, this) : products.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    textAlign: 'center',
                                    padding: '80px 0',
                                    color: 'rgba(255,255,255,0.45)'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontFamily: "'Montserrat', sans-serif",
                                        fontSize: '11px',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.2em'
                                    },
                                    children: "No products available"
                                }, void 0, false, {
                                    fileName: "[project]/pages/shop.tsx",
                                    lineNumber: 366,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/pages/shop.tsx",
                                lineNumber: 365,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "shop-grid",
                                children: products.map((product)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: `shop-card${tappedProduct === product.product_id ? " tapped" : ""}`,
                                        onClick: ()=>handleCardClick(product),
                                        "data-testid": `product-${product.product_id}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "shop-card-img",
                                                children: [
                                                    product.photo_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                                        src: getPhotoUrl(product.photo_url),
                                                        alt: product.title,
                                                        style: {
                                                            width: '100%',
                                                            height: '100%',
                                                            objectFit: 'cover',
                                                            transform: 'scale(1.0)',
                                                            transformOrigin: 'center'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/shop.tsx",
                                                        lineNumber: 381,
                                                        columnNumber: 23
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            width: '100%',
                                                            height: '100%',
                                                            background: '#111',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center'
                                                        },
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                color: 'rgba(255,255,255,0.2)',
                                                                fontFamily: "'Montserrat', sans-serif",
                                                                fontSize: '15px',
                                                                textTransform: 'uppercase',
                                                                letterSpacing: '0.2em'
                                                            },
                                                            children: "No Photo"
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/shop.tsx",
                                                            lineNumber: 388,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/shop.tsx",
                                                        lineNumber: 387,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "shop-card-vignette"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/shop.tsx",
                                                        lineNumber: 391,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/pages/shop.tsx",
                                                lineNumber: 379,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                style: {
                                                    padding: '0px 0px 0'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                                        style: {
                                                            fontFamily: "'Montserrat', sans-serif",
                                                            fontSize: '23px',
                                                            color: '#060606',
                                                            margin: '0 0 4px',
                                                            fontWeight: 700
                                                        },
                                                        children: product.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/shop.tsx",
                                                        lineNumber: 394,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "shop-card-mobile-title",
                                                        style: {
                                                            display: 'none'
                                                        },
                                                        children: product.title.split(' ')[0]
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/shop.tsx",
                                                        lineNumber: 397,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: 'flex',
                                                            gap: '13px',
                                                            flexWrap: 'wrap',
                                                            marginBottom: '9px'
                                                        },
                                                        children: [
                                                            product.gem_type && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                className: "shop-tag",
                                                                children: product.gem_type
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/shop.tsx",
                                                                lineNumber: 401,
                                                                columnNumber: 44
                                                            }, this),
                                                            product.weight && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                className: "shop-tag",
                                                                children: [
                                                                    product.weight,
                                                                    " ct"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/pages/shop.tsx",
                                                                lineNumber: 402,
                                                                columnNumber: 42
                                                            }, this),
                                                            product.color && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                className: "shop-tag",
                                                                children: product.color
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/shop.tsx",
                                                                lineNumber: 403,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/pages/shop.tsx",
                                                        lineNumber: 400,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/pages/shop.tsx",
                                                lineNumber: 393,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, product.product_id, true, {
                                        fileName: "[project]/pages/shop.tsx",
                                        lineNumber: 373,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/pages/shop.tsx",
                                lineNumber: 371,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/shop.tsx",
                        lineNumber: 338,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$Footer$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/pages/shop.tsx",
                        lineNumber: 412,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/shop.tsx",
                lineNumber: 337,
                columnNumber: 7
            }, this),
            modalProduct && !showInvoicePreview && !showGuestPopup && !inquiryStep && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$ProductDetailModal$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                product: modalProduct,
                onClose: ()=>setModalProduct(null),
                onBuy: handleBuyClick,
                onInquire: handleInquiryClick,
                getPhotoUrl: getPhotoUrl
            }, void 0, false, {
                fileName: "[project]/pages/shop.tsx",
                lineNumber: 417,
                columnNumber: 9
            }, this),
            inquiryStep && modalProduct && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$InquiryModal$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                inquiryStep: inquiryStep,
                product: modalProduct,
                guestCollected: guestCollected,
                accountUser: accountUser,
                submitting: inquirySubmitting,
                onGuestInfoSubmit: handleGuestInfoForInquiry,
                onClose: closeInquiry,
                onDescSubmit: handleInquiryDescSubmit,
                onOK: handleInquiryOK
            }, void 0, false, {
                fileName: "[project]/pages/shop.tsx",
                lineNumber: 428,
                columnNumber: 9
            }, this),
            showGuestPopup && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$GuestInfoPopup$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["GuestInfoPopup"], {
                onSubmit: handleGuestInfoSubmit,
                onClose: ()=>{
                    setShowGuestPopup(false);
                    setPendingAction(null);
                }
            }, void 0, false, {
                fileName: "[project]/pages/shop.tsx",
                lineNumber: 443,
                columnNumber: 9
            }, this),
            showInvoicePreview && modalProduct && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$InvoicePreviewPopup$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["InvoicePreviewPopup"], {
                product: modalProduct,
                adminInfo: adminInfo,
                buyerInfo: buyerInfo,
                onContinue: handleCheckout,
                onCancel: ()=>setShowInvoicePreview(false),
                loading: checkoutLoading
            }, void 0, false, {
                fileName: "[project]/pages/shop.tsx",
                lineNumber: 451,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
const shopCss = `
.shop-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}
.shop-card {
  cursor: pointer;
  transition: transform 400ms ease-out;
}
.shop-card:hover {
  transform: translateY(0px);
}
.shop-card:hover .shop-card-img {
  border-color: rgba(0, 0, 0, 0.16);
  box-shadow: 0 18px 48px rgba(0,0,0,0.65);
}
.shop-card-img {
  position: relative;
  aspect-ratio: 1 / 1;
  background: #ffffff20;
  border-radius: 1.7px;
  border: 1.7px solid rgba(20, 16, 16, 0.98);
  overflow: hidden;
  box-shadow: 0 0px 1px rgba(0,0,0,0.35);
  transition: border-color 10ms ease-out, box-shadow 50ms ease-in;
}
.shop-card-vignette {
  position: absolute;
  inset: 10px;
  box-shadow: inset 8 0 30px 12px rgba(0, 0, 0, 0.12);
  pointer-events: none;
  z-index: 2;
}
.shop-tag {
  font-family: 'Montserrat', sans-serif;
  font-size: 15px;
  text-transform: uppercase;
  letter-spacing: 0.13em;
  color: rgba(228, 182, 44, 0.82);
  background: rgba(34, 32, 32, 0.84);
  border: 1px solid rgba(255,255,255,0.06);
  padding: 0px 8px;
}
.shop-card-img img {
  filter: grayscale(100%) invert(90%) contrast(1.3) brightness(0.90);
  transition: filter 200ms cubic-bezier(0.05, 0.9, 0.1, 1);
}
.shop-grid .shop-card {
  opacity: 2;
  transition: transform 100ms ease-out, opacity 10ms ease;
}
.shop-grid:has(.shop-card:hover) .shop-card:not(:hover) {
  opacity: 0.20;
}
.shop-card:hover .shop-card-img img {
  filter: grayscale(0%) invert(0%) contrast(1.1) brightness(1.0);
  transition: filter 40ms ease-in;
}
.shop-card-img::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  pointer-events: none;
  z-index: 3;
  transition: background 2800ms cubic-bezier(0.05, 0.9, 0.1, 1);
}
.shop-card:hover .shop-card-img::before {
  background: rgba(0, 0, 0, 0.0);
  transition: background 40ms ease-in;
}
.shop-card-img::after {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(255, 240, 180, 0.0);
  pointer-events: none;
  z-index: 4;
  transition: background 2800ms cubic-bezier(0.05, 0.9, 0.1, 1);
}
.shop-card:hover .shop-card-img::after {
  background: rgba(255, 240, 180, 0.08);
  transition: background 40ms ease-in;
}
@media (max-width: 767px) {
  .shop-grid {
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    padding: 15px 15px;
  }
  .shop-card-img {
    border-radius: 8px;
  }
  .shop-card-title {
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    color: #d4af37;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 8px 0 0;
  }
  .shop-card .shop-tag { display: none; }
  .shop-card h3 { display: none; }
  .shop-card p { display: none; }
  .shop-card-mobile-title { display: block; }
  .shop-card-img img {
    transition: filter 80ms ease-in;
  }
  .shop-card.tapped .shop-card-img img {
    filter: grayscale(0%) invert(0%) contrast(1.0) brightness(1.0);
  }
  .shop-card.tapped .shop-card-img::before {
    background: rgba(0, 0, 0, 0.0);
  }
  .shop-card.tapped .shop-card-img::after {
    background: rgba(255, 240, 180, 0.08);
  }
}
`;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__593c4771._.js.map