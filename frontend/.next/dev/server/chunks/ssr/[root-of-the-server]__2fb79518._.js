module.exports = [
"[project]/components/home/MobileIndustrySection.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MobileIndustrySection
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
;
;
function MobileIndustrySection() {
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const yearsEl = document.getElementById('mobile-years');
        const sevenEl = document.getElementById('mobile-seven');
        const industrySection = document.getElementById('mobile-industry-section');
        if (!yearsEl || !sevenEl || !industrySection) return;
        let glowTriggered = false;
        const glowObserver = new IntersectionObserver((entries)=>{
            entries.forEach((entry)=>{
                if (entry.isIntersecting && !glowTriggered) {
                    glowTriggered = true;
                    yearsEl.style.transition = 'color 700ms ease-out, text-shadow 700ms ease-out';
                    yearsEl.style.color = '#d4af37';
                    yearsEl.style.textShadow = '0 0 10px rgba(212,175,55,0.55), 0 0 22px rgba(212,175,55,0.28), 0 0 44px rgba(212,175,55,0.14)';
                    setTimeout(()=>{
                        sevenEl.style.transition = 'color 700ms ease-out, text-shadow 700ms ease-out';
                        sevenEl.style.color = '#d4af37';
                        sevenEl.style.textShadow = '0 0 10px rgba(212,175,55,0.55), 0 0 22px rgba(212,175,55,0.28), 0 0 44px rgba(212,175,55,0.14)';
                    }, 250);
                }
            });
        }, {
            threshold: 0.65
        });
        glowObserver.observe(industrySection);
        return ()=>glowObserver.disconnect();
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
        id: "mobile-industry-section",
        className: "md:hidden text-center px-4 flex flex-col items-center justify-center",
        style: {
            background: '#050505',
            borderTop: '1px solid rgba(255,255,255,0.10)',
            minHeight: '100svh',
            paddingTop: '40px',
            paddingBottom: '40px'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                className: "uppercase mb-2",
                style: {
                    fontSize: '11px',
                    letterSpacing: '0.29em',
                    color: 'rgba(255,255,255,0.52)'
                },
                children: "Industry for"
            }, void 0, false, {
                fileName: "[project]/components/home/MobileIndustrySection.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                id: "mobile-years",
                style: {
                    fontSize: '24px',
                    fontWeight: 600,
                    color: 'rgba(255,255,255,0.75)'
                },
                children: "13 Years"
            }, void 0, false, {
                fileName: "[project]/components/home/MobileIndustrySection.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                style: {
                    fontSize: '12px',
                    color: 'rgba(255,255,255,0.52)',
                    marginTop: '4px'
                },
                children: [
                    "Cutting for ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                        id: "mobile-seven",
                        children: "Seven"
                    }, void 0, false, {
                        fileName: "[project]/components/home/MobileIndustrySection.tsx",
                        lineNumber: 67,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/home/MobileIndustrySection.tsx",
                lineNumber: 66,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/home/MobileIndustrySection.tsx",
        lineNumber: 35,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/home/homeData.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "services",
    ()=>services
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gem$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Gem$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/gem.js [ssr] (ecmascript) <export default as Gem>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [ssr] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$briefcase$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Briefcase$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/briefcase.js [ssr] (ecmascript) <export default as Briefcase>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shopping-bag.js [ssr] (ecmascript) <export default as ShoppingBag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/package.js [ssr] (ecmascript) <export default as Package>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/layers.js [ssr] (ecmascript) <export default as Layers>");
;
const services = [
    {
        title: 'Custom Cutting',
        description: "Receive a tailored cutting experience designed to reveal a gemstone's highest potential.",
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gem$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Gem$3e$__["Gem"]
    },
    {
        title: 'Re-Polish & Re-Cut',
        description: 'Breathe new life into existing cut stones and restore their beauty without compromising weight.',
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"]
    },
    {
        title: 'Jeweler Services',
        description: 'Online service requests and work orders  for industry professionals for quick turn arounds and shorter lead times.',
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$briefcase$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Briefcase$3e$__["Briefcase"]
    },
    {
        title: 'Sell Gemstones',
        description: 'An online shop with custom and flexible purchasing features, including pay now, pay later, inquiries and negotiations directly through the site.',
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__["ShoppingBag"]
    },
    {
        title: 'Buy Rough',
        description: 'Source quality rough gemstones for your cutting projects.',
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"]
    },
    {
        title: 'Buy Gems In Bulk',
        description: 'Wholesale purchasing from jewelers and dealers.',
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__["Layers"]
    }
];
}),
"[project]/components/home/MobileServicesCarousel.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MobileServicesCarousel
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$homeData$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/home/homeData.ts [ssr] (ecmascript)");
;
;
;
function computeSectionTopBottom(section) {
    const top = section.getBoundingClientRect().top + window.scrollY;
    const bottom = top + section.offsetHeight;
    return {
        top,
        bottom
    };
}
function MobileServicesCarousel() {
    const lockedRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(false);
    const unlockCooldownRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(false);
    const currentFocusIndexRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(-1);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (("TURBOPACK compile-time value", "undefined") === 'undefined' || window.innerWidth >= 768) return;
        //TURBOPACK unreachable
        ;
        const section = undefined;
        const scroller = undefined;
        const cards = undefined;
        const arrowEl = undefined;
        const defocus = undefined;
        const focus = undefined;
        const handleFocus = undefined;
        const inSection = undefined;
        const lock = undefined;
        const unlock = undefined;
        const atTop = undefined;
        const atBottom = undefined;
        const handleWindowScroll = undefined;
        const onWheel = undefined;
        let lastTouchY;
        const onTouchStart = undefined;
        const onTouchMove = undefined;
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "md:hidden flex flex-col relative",
        style: {
            height: 'calc(100vh - 90px)',
            marginTop: '8px',
            overflow: 'hidden'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "pointer-events-none",
                style: {
                    height: '80px',
                    background: 'linear-gradient(to bottom, rgba(5,5,5,1) 0%, rgba(5,5,5,0) 100%)',
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    zIndex: 10
                }
            }, void 0, false, {
                fileName: "[project]/components/home/MobileServicesCarousel.tsx",
                lineNumber: 175,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "pointer-events-none",
                style: {
                    height: '80px',
                    background: 'linear-gradient(to top, rgba(5,5,5,1) 0%, rgba(5,5,5,0) 100%)',
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 10
                }
            }, void 0, false, {
                fileName: "[project]/components/home/MobileServicesCarousel.tsx",
                lineNumber: 185,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                id: "mobile-services-scroll",
                className: "flex flex-col",
                style: {
                    gap: '32px',
                    flex: 1,
                    overflowY: 'auto',
                    scrollSnapType: 'y mandatory',
                    WebkitOverflowScrolling: 'touch',
                    paddingTop: '8px',
                    paddingBottom: '120px',
                    scrollbarWidth: 'none',
                    scrollPaddingTop: '0px'
                },
                children: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$homeData$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["services"].map((service, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        "data-service-card-mobile": true,
                        style: {
                            scrollSnapAlign: 'center',
                            scrollSnapStop: 'always',
                            minHeight: 'calc(100vh - 110px)',
                            padding: '32px',
                            paddingTop: '48px',
                            borderRadius: '16px',
                            backgroundColor: '#0A0A0A',
                            border: 'none',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            opacity: 0.55,
                            filter: 'blur(3px)',
                            transform: 'scale(0.98)',
                            willChange: 'opacity, filter, transform'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                "data-service-icon": true,
                                style: {
                                    marginBottom: '24px',
                                    transition: 'transform 520ms ease-out, filter 520ms ease-out, opacity 520ms ease-out',
                                    transitionDelay: `${35 + i * 18}ms`,
                                    transform: 'scale(0.98)',
                                    opacity: 0.9,
                                    filter: 'drop-shadow(0 0 0 rgba(212,175,55,0))'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(service.Icon, {
                                    size: 36,
                                    color: "#d4af37",
                                    strokeWidth: 1.5
                                }, void 0, false, {
                                    fileName: "[project]/components/home/MobileServicesCarousel.tsx",
                                    lineNumber: 243,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/home/MobileServicesCarousel.tsx",
                                lineNumber: 232,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                style: {
                                    fontFamily: 'var(--font-display)',
                                    fontSize: 'clamp(22px, 6vw, 26px)',
                                    fontWeight: 400,
                                    color: '#FAFAFA',
                                    marginBottom: '16px',
                                    textAlign: 'left'
                                },
                                children: service.title
                            }, void 0, false, {
                                fileName: "[project]/components/home/MobileServicesCarousel.tsx",
                                lineNumber: 245,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                style: {
                                    fontFamily: 'var(--font-body)',
                                    fontSize: '16px',
                                    lineHeight: 1.7,
                                    color: 'rgba(255,255,255,0.70)',
                                    textAlign: 'left'
                                },
                                children: service.description
                            }, void 0, false, {
                                fileName: "[project]/components/home/MobileServicesCarousel.tsx",
                                lineNumber: 257,
                                columnNumber: 13
                            }, this)
                        ]
                    }, service.title, true, {
                        fileName: "[project]/components/home/MobileServicesCarousel.tsx",
                        lineNumber: 211,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/home/MobileServicesCarousel.tsx",
                lineNumber: 195,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                id: "mobile-scroll-arrow",
                style: {
                    position: 'absolute',
                    bottom: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 30,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '6px',
                    opacity: 1,
                    transition: 'opacity 400ms ease',
                    pointerEvents: 'none'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                        style: {
                            fontFamily: 'var(--font-ui)',
                            fontSize: '10px',
                            letterSpacing: '0.18em',
                            textTransform: 'uppercase',
                            color: 'rgba(255,255,255,0.35)'
                        },
                        children: "Scroll"
                    }, void 0, false, {
                        fileName: "[project]/components/home/MobileServicesCarousel.tsx",
                        lineNumber: 289,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            width: '1px',
                            height: '32px',
                            background: 'linear-gradient(to bottom, rgba(212,175,55,0.6), rgba(212,175,55,0))',
                            animation: 'scrollPulse 1.6s ease-in-out infinite'
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/home/MobileServicesCarousel.tsx",
                        lineNumber: 300,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/home/MobileServicesCarousel.tsx",
                lineNumber: 272,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/home/MobileServicesCarousel.tsx",
        lineNumber: 167,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/home/DesktopServicesGrid.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DesktopServicesGrid
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$homeData$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/home/homeData.ts [ssr] (ecmascript)");
;
;
;
function DesktopServicesGrid() {
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const cards = document.querySelectorAll('[data-service-card]');
        // Set initial hidden state before any transition is applied
        cards.forEach((el, i)=>{
            const card = el;
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px)';
            const icon = card.querySelector('[data-service-icon]');
            if (icon) {
                icon.style.opacity = '0';
                icon.style.transform = 'translateY(30px)';
            }
            const title = card.querySelector('[data-service-title]');
            if (title) {
                title.style.opacity = '0';
                title.style.transform = 'translateY(16px)';
            }
            const desc = card.querySelector('[data-service-desc]');
            if (desc) {
                desc.style.opacity = '0';
                desc.style.transform = 'translateY(12px)';
            }
        });
        const observer = new IntersectionObserver((entries)=>{
            entries.forEach((entry)=>{
                if (entry.isIntersecting) {
                    const card = entry.target;
                    const i = parseInt(card.dataset.index || '0');
                    const base = i * 80;
                    // Card fades in
                    card.style.transition = `opacity 600ms ease-out ${base}ms, transform 600ms ease-out ${base}ms`;
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                    // Icon flies in from further below with more drama
                    const icon = card.querySelector('[data-service-icon]');
                    if (icon) {
                        icon.style.transition = `opacity 700ms ease-out ${base + 150}ms, transform 700ms cubic-bezier(0.22, 1, 0.36, 1) ${base + 150}ms, filter 1200ms ease-out ${base + 300}ms`;
                        icon.style.opacity = '1';
                        icon.style.transform = 'translateY(0)';
                        icon.style.filter = 'sepia(1) saturate(2) brightness(1.1) drop-shadow(0 0 8px rgba(212,175,55,0.6)) drop-shadow(0 0 20px rgba(212,175,55,0.3)) drop-shadow(0 0 50px rgba(180,140,30,0.15))';
                    }
                    // Title fades in softly after icon
                    const title = card.querySelector('[data-service-title]');
                    if (title) {
                        title.style.transition = `opacity 600ms ease-out ${base + 260}ms, transform 600ms ease-out ${base + 260}ms`;
                        title.style.opacity = '1';
                        title.style.transform = 'translateY(0)';
                    }
                    // Desc fades in last
                    const desc = card.querySelector('[data-service-desc]');
                    if (desc) {
                        desc.style.transition = `opacity 600ms ease-out ${base + 360}ms, transform 600ms ease-out ${base + 360}ms`;
                        desc.style.opacity = '1';
                        desc.style.transform = 'translateY(0)';
                    }
                    observer.unobserve(card);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px 180px 0px'
        });
        cards.forEach((el)=>observer.observe(el));
        return ()=>observer.disconnect();
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "hidden md:grid",
        style: {
            marginTop: '48px',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 'clamp(16px, 2vw, 48px)'
        },
        children: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$homeData$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["services"].map((service, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                "data-service-card": true,
                "data-index": `${i}`,
                className: "gem-card",
                style: {
                    aspectRatio: '1 / 1',
                    padding: 'clamp(24px, 3vw, 56px)',
                    borderRadius: '14px',
                    border: 'none',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.55)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        "data-service-icon": true,
                        style: {
                            marginBottom: 'clamp(16px, 2vw, 32px)',
                            filter: 'drop-shadow(0 0 0 rgba(212,175,55,0))',
                            transition: 'filter 1200ms ease-out, transform 250ms ease-out'
                        },
                        onMouseEnter: (e)=>{
                            e.currentTarget.style.transform = 'scale(1.05)';
                            e.currentTarget.style.filter = 'drop-shadow(0 0 10px rgba(212,175,55,0.18)) drop-shadow(0 0 22px rgba(212,175,55,0.10))';
                        },
                        onMouseLeave: (e)=>{
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.filter = 'sepia(1) saturate(2) brightness(1.1) drop-shadow(0 0 8px rgba(212,175,55,0.6)) drop-shadow(0 0 20px rgba(212,175,55,0.3)) drop-shadow(0 0 50px rgba(180,140,30,0.15))';
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(service.Icon, {
                            size: 48,
                            color: "#FAFAFA",
                            strokeWidth: 1.5
                        }, void 0, false, {
                            fileName: "[project]/components/home/DesktopServicesGrid.tsx",
                            lineNumber: 127,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/home/DesktopServicesGrid.tsx",
                        lineNumber: 109,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                        "data-service-title": true,
                        style: {
                            fontFamily: 'var(--font-display)',
                            fontSize: 'clamp(22px, 2.2vw, 36px)',
                            fontWeight: 400,
                            marginBottom: 'clamp(8px, 1vw, 20px)'
                        },
                        children: service.title
                    }, void 0, false, {
                        fileName: "[project]/components/home/DesktopServicesGrid.tsx",
                        lineNumber: 129,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        "data-service-desc": true,
                        style: {
                            fontFamily: 'var(--font-body)',
                            fontSize: 'clamp(12px, 1.1vw, 16px)',
                            lineHeight: 1.75,
                            color: 'rgba(255,255,255,0.65)',
                            flex: 1
                        },
                        children: service.description
                    }, void 0, false, {
                        fileName: "[project]/components/home/DesktopServicesGrid.tsx",
                        lineNumber: 140,
                        columnNumber: 11
                    }, this)
                ]
            }, service.title, true, {
                fileName: "[project]/components/home/DesktopServicesGrid.tsx",
                lineNumber: 93,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/home/DesktopServicesGrid.tsx",
        lineNumber: 84,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/home/PhilosophySection.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PhilosophySection
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
;
;
const lines = [
    {
        gold: 'Color',
        rest: ' is the goal.'
    },
    {
        gold: 'Conscious',
        rest: ' of the weight.'
    },
    {
        gold: 'Careful',
        rest: ' with my approach.'
    },
    {
        gold: 'Cutting',
        rest: ' is my craft.'
    }
];
function PhilosophySection() {
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const words = Array.from(document.querySelectorAll('[data-gold-word]'));
        let rafId;
        let mounted = true;
        const lerp = (a, b, t)=>a + (b - a) * t;
        const clamp = (v)=>Math.max(0, Math.min(1, v));
        const vals = words.map(()=>({
                t: 0
            }));
        const tick = ()=>{
            if (!mounted) return;
            words.forEach((el, i)=>{
                const rect = el.getBoundingClientRect();
                const vh = window.innerHeight;
                const center = rect.top + rect.height / 2;
                const dist = Math.abs(center - vh / 2) / (vh * 0.55);
                const target = clamp(1 - dist);
                vals[i].t = lerp(vals[i].t, target, 0.07);
                const t = vals[i].t;
                const r = Math.round(lerp(250, 212, t));
                const g = Math.round(lerp(250, 175, t));
                const b = Math.round(lerp(250, 55, t));
                el.style.color = `rgb(${r},${g},${b})`;
                el.style.filter = t > 0.05 ? `brightness(${1 + t * 0.2}) drop-shadow(0 0 ${t * 8}px rgba(212,175,55,${t * 0.5})) drop-shadow(0 0 ${t * 22}px rgba(255,255,255,${t * 0.15}))` : 'none';
            });
            rafId = requestAnimationFrame(tick);
        };
        rafId = requestAnimationFrame(tick);
        return ()=>{
            mounted = false;
            cancelAnimationFrame(rafId);
        };
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
        style: {
            minHeight: '100svh',
            display: 'flex',
            alignItems: 'center',
            padding: '6rem 0'
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "container-custom",
            style: {
                maxWidth: '1400px',
                width: '100%'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                    className: "uppercase text-gray-500 mb-4 text-center",
                    style: {
                        fontSize: '12px',
                        letterSpacing: '0.20em'
                    },
                    children: "Philosophy"
                }, void 0, false, {
                    fileName: "[project]/components/home/PhilosophySection.tsx",
                    lineNumber: 57,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                    "data-gold": "philo-title",
                    className: "title-xl tracking-tight mb-16 text-center",
                    style: {
                        color: 'rgba(255,255,255,0.35)'
                    },
                    children: "My Four C's"
                }, void 0, false, {
                    fileName: "[project]/components/home/PhilosophySection.tsx",
                    lineNumber: 63,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: {
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2.5rem'
                    },
                    children: lines.map(({ gold, rest })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                            style: {
                                fontFamily: 'var(--font-display)',
                                fontSize: 'clamp(1.875rem, 6vw, 5.5rem)',
                                fontWeight: 400,
                                lineHeight: 1.25,
                                color: '#FAFAFA'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                    "data-gold": "hero-word",
                                    "data-gold-word": true,
                                    style: {
                                        transition: 'filter 1400ms cubic-bezier(0.25, 0.1, 0.25, 1)',
                                        whiteSpace: 'nowrap'
                                    },
                                    children: gold
                                }, void 0, false, {
                                    fileName: "[project]/components/home/PhilosophySection.tsx",
                                    lineNumber: 77,
                                    columnNumber: 15
                                }, this),
                                rest
                            ]
                        }, gold, true, {
                            fileName: "[project]/components/home/PhilosophySection.tsx",
                            lineNumber: 67,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/home/PhilosophySection.tsx",
                    lineNumber: 65,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/home/PhilosophySection.tsx",
            lineNumber: 56,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/home/PhilosophySection.tsx",
        lineNumber: 48,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/home/StudioSection.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StudioSection
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
;
;
function StudioSection() {
    const sectionRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const photoRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const titleRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const labelRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const descRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const section = sectionRef.current;
        const photo = photoRef.current;
        const title = titleRef.current;
        const label = labelRef.current;
        const desc = descRef.current;
        if (!section || !photo || !title || !label || !desc) return;
        let rafId;
        let snapLocked = false;
        let snapUsed = false;
        let isPressed = false;
        const unlock = ()=>{
            if (snapLocked) {
                document.body.style.overflow = '';
                snapLocked = false;
            }
        };
        const onPointerDown = ()=>{
            isPressed = true;
            unlock();
        };
        const onPointerUp = ()=>{
            isPressed = false;
        };
        const lockScroll = ()=>{
            if (snapLocked || snapUsed || isPressed) return;
            snapLocked = true;
            snapUsed = true;
            document.body.style.overflow = 'hidden';
        };
        const onScrollReset = ()=>{
            const rect = section.getBoundingClientRect();
            const vh = window.innerHeight;
            if (rect.bottom < 0 || rect.top > vh) snapUsed = false;
        };
        const onScroll = ()=>{
            cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(()=>{
                const rect = section.getBoundingClientRect();
                const vh = window.innerHeight;
                const progress = Math.max(0, Math.min(1, (vh - rect.top) / (vh + rect.height)));
                const distFromCenter = Math.abs(progress - 0.5) * 2;
                const focusEased = Math.max(0, 1 - distFromCenter * 1.4);
                const eased = focusEased * focusEased * focusEased;
                if (distFromCenter < 0.04 && eased > 0.92) lockScroll();
                photo.style.opacity = String(0.04 + eased * 0.72);
                photo.style.filter = `grayscale(1) sepia(0.4) hue-rotate(180deg) blur(${(1 - eased) * 12}px) contrast(1.08) brightness(${0.65 + eased * 0.2})`;
                photo.style.transform = `scale(${1.12 - eased * 0.06})`;
                title.style.opacity = '1';
                const r = Math.round(250 + (212 - 250) * eased);
                const g = Math.round(250 + (175 - 250) * eased);
                const b = Math.round(250 + (55 - 250) * eased);
                title.style.color = `rgb(${r},${g},${b})`;
                title.style.filter = eased > 0.05 ? `brightness(${1 + eased * 0.2}) drop-shadow(0 0 ${eased * 8}px rgba(212,175,55,${eased * 0.5})) drop-shadow(0 0 ${eased * 22}px rgba(255,255,255,${eased * 0.15}))` : 'none';
                label.style.opacity = '1';
                desc.style.opacity = '1';
            });
        };
        window.addEventListener('scroll', onScroll, {
            passive: true
        });
        window.addEventListener('scroll', onScrollReset, {
            passive: true
        });
        window.addEventListener('wheel', unlock, {
            passive: true
        });
        window.addEventListener('pointerdown', onPointerDown);
        window.addEventListener('pointerup', onPointerUp);
        window.addEventListener('touchstart', onPointerDown);
        window.addEventListener('touchend', onPointerUp);
        onScroll();
        return ()=>{
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('scroll', onScrollReset);
            window.removeEventListener('wheel', unlock);
            window.removeEventListener('pointerdown', onPointerDown);
            window.removeEventListener('pointerup', onPointerUp);
            window.removeEventListener('touchstart', onPointerDown);
            window.removeEventListener('touchend', onPointerUp);
            cancelAnimationFrame(rafId);
            document.body.style.overflow = '';
        };
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        style: {
            position: 'relative'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '8px',
                    background: '#050505',
                    zIndex: 100
                }
            }, void 0, false, {
                fileName: "[project]/components/home/StudioSection.tsx",
                lineNumber: 103,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: {
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '8px',
                    background: '#050505',
                    zIndex: 100
                }
            }, void 0, false, {
                fileName: "[project]/components/home/StudioSection.tsx",
                lineNumber: 105,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: {
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    width: '8px',
                    background: '#050505',
                    zIndex: 100
                }
            }, void 0, false, {
                fileName: "[project]/components/home/StudioSection.tsx",
                lineNumber: 107,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: {
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    right: 0,
                    width: '8px',
                    background: '#050505',
                    zIndex: 100
                }
            }, void 0, false, {
                fileName: "[project]/components/home/StudioSection.tsx",
                lineNumber: 109,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                ref: sectionRef,
                style: {
                    position: 'relative',
                    height: '100svh',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    boxShadow: 'inset 0 0 0 8px #050505'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        ref: photoRef,
                        style: {
                            position: 'absolute',
                            inset: '-3%',
                            backgroundImage: 'url(/assets/Studio.jpeg)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            opacity: 0.04,
                            filter: 'grayscale(1) sepia(0.4) hue-rotate(180deg) blur(12px) contrast(1.08) brightness(0.65)',
                            transform: 'scale(1.12)',
                            transformOrigin: 'center center',
                            willChange: 'opacity, filter, transform',
                            transition: 'opacity 220ms ease-out, filter 220ms ease-out, transform 700ms ease-out'
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/home/StudioSection.tsx",
                        lineNumber: 117,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'absolute',
                            inset: 0,
                            zIndex: 1,
                            background: 'linear-gradient(to right, rgba(5,5,5,0.97) 0%, rgba(5,5,5,0.92) 22%, rgba(5,5,5,0.70) 38%, rgba(5,5,5,0.0) 55%)'
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/home/StudioSection.tsx",
                        lineNumber: 127,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'absolute',
                            inset: 0,
                            zIndex: 1,
                            background: 'linear-gradient(to bottom, #050505 0%, rgba(5,5,5,0.0) 20%, rgba(5,5,5,0.0) 80%, #050505 100%)'
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/home/StudioSection.tsx",
                        lineNumber: 132,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'absolute',
                            inset: 0,
                            zIndex: 2,
                            pointerEvents: 'none',
                            background: 'radial-gradient(ellipse at center, transparent 20%, rgba(5,5,5,0.4) 50%, rgba(5,5,5,0.88) 75%, rgba(5,5,5,1) 90%)'
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/home/StudioSection.tsx",
                        lineNumber: 137,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: '120px',
                            zIndex: 4,
                            pointerEvents: 'none',
                            background: 'linear-gradient(to bottom, #050505 0%, transparent 100%)'
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/home/StudioSection.tsx",
                        lineNumber: 142,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: '120px',
                            zIndex: 4,
                            pointerEvents: 'none',
                            background: 'linear-gradient(to top, #050505 0%, transparent 100%)'
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/home/StudioSection.tsx",
                        lineNumber: 148,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'absolute',
                            inset: 0,
                            zIndex: 5,
                            pointerEvents: 'none',
                            boxShadow: 'inset 0 0 0 10px #050505'
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/home/StudioSection.tsx",
                        lineNumber: 155,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'absolute',
                            inset: 0,
                            zIndex: 3,
                            pointerEvents: 'none',
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`,
                            backgroundRepeat: 'repeat',
                            backgroundSize: '180px 180px',
                            opacity: 0.35,
                            mixBlendMode: 'overlay'
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/home/StudioSection.tsx",
                        lineNumber: 160,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "container-custom",
                        style: {
                            position: 'relative',
                            zIndex: 10,
                            maxWidth: '380px',
                            marginLeft: '4vw',
                            marginRight: 'auto',
                            padding: '32px 36px',
                            background: 'rgba(5,5,5,0.25)',
                            backdropFilter: 'blur(6px)',
                            borderRadius: '12px',
                            textAlign: 'left'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                ref: labelRef,
                                className: "uppercase text-gray-400",
                                style: {
                                    fontSize: '12px',
                                    letterSpacing: '0.25em',
                                    marginBottom: '16px'
                                },
                                children: "Where It Happens"
                            }, void 0, false, {
                                fileName: "[project]/components/home/StudioSection.tsx",
                                lineNumber: 175,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                ref: titleRef,
                                "data-gold": "section-title",
                                className: "title-xl",
                                style: {
                                    marginBottom: '20px'
                                },
                                children: "The Studio"
                            }, void 0, false, {
                                fileName: "[project]/components/home/StudioSection.tsx",
                                lineNumber: 179,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                ref: descRef,
                                style: {
                                    fontFamily: 'var(--font-body)',
                                    fontSize: 'clamp(13px, 1.3vw, 17px)',
                                    lineHeight: 1.8,
                                    color: 'rgba(255,255,255,0.70)'
                                },
                                children: "Every stone passes through a focused, single-cutter environment — no outsourcing, no shortcuts. Just precise handwork from rough to finished gem."
                            }, void 0, false, {
                                fileName: "[project]/components/home/StudioSection.tsx",
                                lineNumber: 183,
                                columnNumber: 9
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/home/StudioSection.tsx",
                        lineNumber: 167,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/home/StudioSection.tsx",
                lineNumber: 111,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/home/StudioSection.tsx",
        lineNumber: 101,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/home/GoldThread.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GoldThread
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
;
function lerp(a, b, t) {
    return a + (b - a) * t;
}
function easeInOut(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}
function clamp(v, min = 0, max = 1) {
    return Math.max(min, Math.min(max, v));
}
function viewportCenteredness(el) {
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const dist = Math.abs(rect.top + rect.height / 2 - vh / 2) / (vh * 0.7);
    return clamp(1 - dist);
}
function scrolledAway(el) {
    const rect = el.getBoundingClientRect();
    return clamp(-rect.top / window.innerHeight);
}
function applyGold({ el, type }, t, t2, t3) {
    if (type === 'hero-word') {
        const r = Math.round(250 + (212 - 250) * t);
        const g = Math.round(250 + (175 - 250) * t);
        const b = Math.round(250 + (55 - 250) * t);
        el.style.color = `rgb(${r},${g},${b})`;
        el.style.filter = t > 0.05 ? `brightness(${1 + t * 0.2}) drop-shadow(0 0 ${t * 8}px rgba(212,175,55,${t * 0.5})) drop-shadow(0 0 ${t2 * 20}px rgba(255,255,255,${t2 * 0.15}))` : 'none';
    }
    if (type === 'hero-card') {
        el.style.borderColor = `rgba(212,175,55,${lerp(0.10, 0.65, t)})`;
        el.style.boxShadow = t > 0.05 ? [
            `0 0 ${t * 25}px rgba(212,175,55,${t * 0.22})`,
            `inset 0 0 ${t * 12}px rgba(212,175,55,${t * 0.07})`
        ].join(', ') : '';
    }
    if (type === 'philo-title') {
        el.style.filter = t > 0.05 ? `brightness(${1 + t * 0.18}) drop-shadow(0 0 ${t * 8}px rgba(212,175,55,${t * 0.45})) drop-shadow(0 0 ${t2 * 22}px rgba(255,255,255,${t2 * 0.12}))` : 'none';
    }
    if (type === 'section-title') {
        el.style.filter = t > 0.05 ? `brightness(${1 + t * 0.15}) drop-shadow(0 0 ${t * 7}px rgba(212,175,55,${t * 0.4})) drop-shadow(0 0 ${t2 * 18}px rgba(255,255,255,${t2 * 0.1}))` : 'none';
    }
    if (type === 'name') {
        el.style.color = t > 0.05 ? `rgb(${Math.round(lerp(250, 212, t))},${Math.round(lerp(250, 175, t))},${Math.round(lerp(250, 55, t))})` : '';
        el.style.filter = t > 0.08 ? `brightness(${1 + t * 0.2}) drop-shadow(0 0 ${t * 8}px rgba(212,175,55,${t * 0.5})) drop-shadow(0 0 ${t2 * 22}px rgba(255,255,255,${t2 * 0.15}))` : 'none';
    }
}
function GoldThread() {
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        let items = [];
        let rafId;
        let mounted = true;
        const init = ()=>{
            items = [];
            document.querySelectorAll('[data-gold]').forEach((el)=>{
                items.push({
                    el: el,
                    type: el.dataset.gold,
                    t: 0,
                    t2: 0,
                    t3: 0
                });
            });
        };
        const tick = ()=>{
            if (!mounted) return;
            items.forEach((item)=>{
                const { el, type } = item;
                let target = 0;
                if (type === 'hero-word') {
                    target = clamp(viewportCenteredness(el) - scrolledAway(el) * 1.5);
                }
                if (type === 'hero-card') {
                    const rect = el.getBoundingClientRect();
                    const vh = window.innerHeight;
                    const fromBottom = clamp(1 - rect.top / vh);
                    const notGone = clamp(1 - Math.max(0, -rect.bottom / vh));
                    target = clamp(fromBottom * notGone * 1.2);
                }
                if (type === 'philo-title' || type === 'section-title') {
                    target = clamp(viewportCenteredness(el) * 1.3);
                }
                if (type === 'name') {
                    target = clamp(viewportCenteredness(el) * 1.1);
                }
                item.t = lerp(item.t, target, 0.09);
                item.t2 = lerp(item.t2, item.t, 0.065);
                item.t3 = item.t2;
                applyGold(item, easeInOut(clamp(item.t)), easeInOut(clamp(item.t2)), easeInOut(clamp(item.t3)));
            });
            rafId = requestAnimationFrame(tick);
        };
        const timeout = setTimeout(()=>{
            init();
            rafId = requestAnimationFrame(tick);
        }, 800);
        // Re-init on first scroll to catch late-mounted elements
        let reinited = false;
        const onFirstScroll = ()=>{
            if (!reinited) {
                reinited = true;
                init();
            }
        };
        window.addEventListener('scroll', onFirstScroll, {
            passive: true
        });
        return ()=>{
            mounted = false;
            clearTimeout(timeout);
            window.removeEventListener('scroll', onFirstScroll);
            cancelAnimationFrame(rafId);
            items.forEach(({ el, type })=>{
                el.style.textShadow = '';
                if (type === 'hero-card') {
                    el.style.borderColor = '';
                    el.style.boxShadow = '';
                }
                if (type === 'name') el.style.color = '';
            });
        };
    }, []);
    return null;
}
}),
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
                                        href: "legal/index",
                                        className: "ccg-footer-link",
                                        children: "legal"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shared/Footer.tsx",
                                        lineNumber: 99,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                        href: "legal/sms-terms",
                                        className: "ccg-footer-link",
                                        children: "sms disclosure"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shared/Footer.tsx",
                                        lineNumber: 100,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                        href: "legal/privacy-policy",
                                        className: "ccg-footer-link",
                                        children: "privacy policy"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shared/Footer.tsx",
                                        lineNumber: 101,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                        href: "/shop",
                                        className: "ccg-footer-link",
                                        children: "shop"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shared/Footer.tsx",
                                        lineNumber: 102,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                        href: "/portfolio",
                                        className: "ccg-footer-link",
                                        children: "portfolio"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shared/Footer.tsx",
                                        lineNumber: 103,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                        href: "/login",
                                        className: "ccg-footer-link",
                                        children: "sign in / sign up"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shared/Footer.tsx",
                                        lineNumber: 104,
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
                                        lineNumber: 107,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                        href: "tel:4802864595",
                                        className: "ccg-footer-contact-link",
                                        children: "480.286.4595"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shared/Footer.tsx",
                                        lineNumber: 108,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                        href: "mailto:mwall@cuttingcornersgems.com",
                                        className: "ccg-footer-contact-link",
                                        children: "mwall@cuttingcornersgems.com"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shared/Footer.tsx",
                                        lineNumber: 109,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        className: "ccg-footer-welcome",
                                        children: "texts and emails welcome"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shared/Footer.tsx",
                                        lineNumber: 110,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shared/Footer.tsx",
                                lineNumber: 106,
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
"[project]/pages/index.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [ssr] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$MobileIndustrySection$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/home/MobileIndustrySection.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$MobileServicesCarousel$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/home/MobileServicesCarousel.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$DesktopServicesGrid$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/home/DesktopServicesGrid.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$PhilosophySection$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/home/PhilosophySection.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$StudioSection$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/home/StudioSection.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$GoldThread$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/home/GoldThread.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$TopNav$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/shared/TopNav.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$Footer$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/shared/Footer.tsx [ssr] (ecmascript)");
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
function GlobalStyles() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("style", {
        dangerouslySetInnerHTML: {
            __html: `
@import url('https://fonts.googleapis.com/css2?family=Oranienbaum&family=Comfortaa:wght@300;400&family=Montserrat:wght@400;500;600&display=swap');

:root {
  --font-display: 'Oranienbaum', Georgia, serif;
  --font-subtitle: 'Montserrat', sans-serif;
  --font-body: 'Comfortaa', sans-serif;
  --font-ui: 'Montserrat', sans-serif;
  --font-mono: 'Courier New', monospace;
}

html, body, #__next {
  font-family: var(--font-body);
  background-color: #050505;
  color: #FAFAFA;
  margin: 0;
  padding: 0;
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-subtitle);
}

.hero-glow {
  background: radial-gradient(
    circle at 50% 50%,
    rgba(56, 189, 248, 0.08) 0%,
    rgba(0, 0, 0, 0) 50%
  );
  pointer-events: none;
}

.delay-100 { animation-delay: 100ms; }
.delay-200 { animation-delay: 200ms; }
.delay-300 { animation-delay: 300ms; }
.delay-400 { animation-delay: 400ms; }
.delay-500 { animation-delay: 500ms; }

.title-xl {
  font-family: var(--font-display);
  font-size: 3rem;
  line-height: 1.2;
  letter-spacing: 0.04em;
  font-weight: 400;
}

.hero-title {
  font-family: var(--font-display);
  font-size: 4.5rem;
  line-height: 1.1;
  letter-spacing: 0.04em;
  font-weight: 400;
}

.title-sm {
  font-family: var(--font-subtitle);
  font-weight: 500;
}

.name-title {
  font-size: 7rem;
  font-family: var(--font-display);
  font-weight: 400;
}

.spec-text {
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.2em;
}

.page-title {
  font-family: var(--font-display);
}

.container-custom {
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

@media (min-width: 768px) {
  .container-custom {
    padding-left: 3rem;
    padding-right: 3rem;
  }
}

.section-spacing {
  padding-top: 6rem;
  padding-bottom: 6rem;
}

@media (min-width: 768px) {
  .section-spacing {
    padding-top: 8rem;
    padding-bottom: 8rem;
  }
}

.gem-card {
  background-color: #101010;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.5s ease;
  overflow: hidden;
  position: relative;
}

.gem-card:hover {
  border-color: rgba(255, 255, 255, 0.20);
  box-shadow: 0 0 30px rgba(255, 255, 255, 0.05);
}

@media (max-width: 767px) {
  .gem-card:active {
    border-color: rgba(245, 158, 11, 0.5);
  }
}

.hover-lift {
  transition: transform 0.3s ease;
}

.hover-lift:hover {
  transform: translateY(-6px);
}

.btn-primary {
  background-color: #ffffff;
  color: #000000;
  padding: 0.75rem 2rem;
  font-family: var(--font-ui);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  font-size: 0.875rem;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  border: none;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #e5e5e5;
}

.btn-secondary {
  background-color: transparent;
  color: #FAFAFA;
  padding: 0.75rem 2rem;
  font-family: var(--font-ui);
  text-transform: uppercase;
  letter-spacing: 0.15em;
  font-size: 0.875rem;
  border: 1px solid rgba(255, 255, 255, 0.20);
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
}

.btn-secondary:hover {
  border-color: rgba(255, 255, 255, 1);
  background-color: rgba(255, 255, 255, 0.05);
}

@media (max-width: 767px) {
  .hero-title {
    font-size: 2.4rem;
  }
  .page-title.title-xl {
    font-size: 2rem !important;
  }
  .name-title {
    font-size: 2rem !important;
  }
  .section-spacing {
    padding-top: 4rem;
    padding-bottom: 4rem;
  }
  .container-custom {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  #services-section {
    padding-top: 0 !important;
  }
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fade-in 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

@keyframes scrollPulse {
  0%, 100% { opacity: 0.4; transform: scaleY(1); }
  50% { opacity: 1; transform: scaleY(1.15); }
}
`
        }
    }, void 0, false, {
        fileName: "[project]/pages/index.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
function Home() {
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const groups = document.querySelectorAll('[data-reveal-group]');
        groups.forEach((group)=>{
            const elements = group.querySelectorAll('[data-scroll-reveal]');
            elements.forEach((el, i)=>{
                const h = el;
                h.style.opacity = '0';
                h.style.transform = 'translateY(80px)';
                h.dataset.revealIndex = String(i);
            });
        });
        const observer = new IntersectionObserver((entries)=>{
            entries.forEach((entry)=>{
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const index = parseInt(el.dataset.revealIndex || '0');
                    const delay = index * 100;
                    setTimeout(()=>{
                        el.style.transition = 'opacity 1100ms cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 1100ms cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                    }, delay);
                    observer.unobserve(el);
                }
            });
        }, {
            threshold: 0.05,
            rootMargin: '0px 0px 180px 0px'
        });
        document.querySelectorAll('[data-scroll-reveal]').forEach((el)=>observer.observe(el));
        return ()=>observer.disconnect();
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(GlobalStyles, {}, void 0, false, {
                fileName: "[project]/pages/index.tsx",
                lineNumber: 274,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("main", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$TopNav$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 276,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$GoldThread$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 277,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                        style: {
                            minHeight: '100svh',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            position: 'relative',
                            overflow: 'hidden'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 hero-glow"
                            }, void 0, false, {
                                fileName: "[project]/pages/index.tsx",
                                lineNumber: 291,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "absolute inset-1 bg-cover",
                                style: {
                                    backgroundImage: 'url(/assets/Chair.jpeg)',
                                    backgroundPosition: '62% 40%',
                                    opacity: '0.4',
                                    filter: 'grayscale(1) sepia(0.4) hue-rotate(180deg) brightness(0.85)'
                                }
                            }, void 0, false, {
                                fileName: "[project]/pages/index.tsx",
                                lineNumber: 292,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0",
                                style: {
                                    background: 'radial-gradient(ellipse at 50% 50%, transparent 0%, rgba(5,5,5,0.55) 20%, rgba(5,5,5,0.85) 90%, rgba(5,5,5,0.98) 100%)'
                                }
                            }, void 0, false, {
                                fileName: "[project]/pages/index.tsx",
                                lineNumber: 301,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0",
                                style: {
                                    background: 'linear-gradient(to bottom, rgba(5,5,5,0.75) 0%, rgba(5,5,5,0.20) 30%, rgba(5,5,5,0.20) 70%, rgba(5,5,5,0.98) 100%)'
                                }
                            }, void 0, false, {
                                fileName: "[project]/pages/index.tsx",
                                lineNumber: 302,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "container-custom relative z-10 text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "uppercase mb-6 opacity-0 animate-fade-in transition-all duration-1000 delay-500",
                                        style: {
                                            color: 'rgba(255,255,255,0.25)',
                                            fontSize: '14px',
                                            letterSpacing: '0.37em'
                                        },
                                        "data-scroll-reveal": true,
                                        children: "Tempe, Arizona"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.tsx",
                                        lineNumber: 305,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                                        className: "hero-title title-xl tracking-tight mb-9 opacity-10 animate-fade-in delay-1000 duration-2000",
                                        "data-scroll-reveal": true,
                                        style: {
                                            animationDelay: '92000ms'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                "data-gold": "hero-word",
                                                style: {
                                                    color: '#e8d99a',
                                                    transition: 'color 800ms ease, filter 800ms ease'
                                                },
                                                children: "Cutting"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.tsx",
                                                lineNumber: 314,
                                                columnNumber: 15
                                            }, this),
                                            " Corners -- Not the",
                                            ' ',
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                "data-gold": "hero-word",
                                                style: {
                                                    color: '#e8d99a',
                                                    transition: 'color 800ms ease, filter 800ms ease'
                                                },
                                                children: "Quality"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.tsx",
                                                lineNumber: 315,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/index.tsx",
                                        lineNumber: 313,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "text-gray-1000 tracking-tight max-w-3xl mx-auto mb-10 opacity-0 animate-drop-in delay-1000 duration-200",
                                        style: {
                                            fontSize: '23px',
                                            lineHeight: 1.6
                                        },
                                        children: "Professional gemstone cutter focused on color, yield, and stone potential for jewelry professionals nationwide."
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.tsx",
                                        lineNumber: 318,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/index.tsx",
                                lineNumber: 304,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "absolute bottom-05 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in delay-800",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "w-px h-16 bg-gradient-to-b from-white/0 via-white/30 to-white/0"
                                }, void 0, false, {
                                    fileName: "[project]/pages/index.tsx",
                                    lineNumber: 328,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/pages/index.tsx",
                                lineNumber: 327,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                "data-gold": "hero-card",
                                className: "absolute bottom-8 right-8 hidden md:flex flex-col justify-center",
                                style: {
                                    width: '12rem',
                                    height: '12rem',
                                    backgroundColor: '#0A0A0A',
                                    border: '1px solid rgba(255,255,255,0.10)',
                                    padding: '1.5rem'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "spec-text text-gray-500 mb-1",
                                        style: {
                                            fontSize: '11px'
                                        },
                                        children: "Industry for"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.tsx",
                                        lineNumber: 343,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "title-sm text-white",
                                        style: {
                                            fontSize: '1.875rem'
                                        },
                                        children: "13 Years"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.tsx",
                                        lineNumber: 346,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "text-gray-500",
                                        style: {
                                            fontSize: '0.875rem'
                                        },
                                        children: "Cutting for Seven"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.tsx",
                                        lineNumber: 349,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/index.tsx",
                                lineNumber: 332,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 280,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$MobileIndustrySection$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 356,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$PhilosophySection$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 359,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$StudioSection$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 362,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                        id: "services-section",
                        "data-reveal-group": true,
                        style: {
                            minHeight: "100svh",
                            display: "flex",
                            alignItems: "center",
                            paddingTop: "6rem",
                            paddingBottom: "6rem"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "container-custom",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    id: "services-sticky-header",
                                    className: "text-center",
                                    style: {
                                        position: 'sticky',
                                        top: 0,
                                        zIndex: 20,
                                        background: '#050505',
                                        paddingTop: '28px',
                                        paddingBottom: '3px'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                            className: "uppercase mb-3 text-center",
                                            style: {
                                                fontSize: '13px',
                                                letterSpacing: '0.20em',
                                                color: 'rgba(255,255,255,0.52)'
                                            },
                                            children: "What I Do"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/index.tsx",
                                            lineNumber: 379,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                            "data-gold": "section-title",
                                            className: "title-xl text-center",
                                            style: {
                                                fontSize: 'clamp(28px, 3.5vw, 56px)',
                                                letterSpacing: '-0.01em',
                                                marginBottom: '0px',
                                                color: 'rgba(255,255,255,0.35)'
                                            },
                                            children: "Services"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/index.tsx",
                                            lineNumber: 389,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/index.tsx",
                                    lineNumber: 367,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$DesktopServicesGrid$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                    fileName: "[project]/pages/index.tsx",
                                    lineNumber: 404,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$MobileServicesCarousel$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                    fileName: "[project]/pages/index.tsx",
                                    lineNumber: 407,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/index.tsx",
                            lineNumber: 366,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 365,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                        "data-reveal-group": true,
                        style: {
                            minHeight: "100svh",
                            display: "flex",
                            alignItems: "center",
                            paddingTop: "6rem",
                            paddingBottom: "6rem"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "container-custom",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                    className: "uppercase text-gray-500 mb-4 text-center",
                                    style: {
                                        fontSize: '12px',
                                        letterSpacing: '0.20em'
                                    },
                                    children: "About"
                                }, void 0, false, {
                                    fileName: "[project]/pages/index.tsx",
                                    lineNumber: 414,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                    "data-gold": "section-title",
                                    className: "title-xl tracking-tight mb-16 text-center",
                                    style: {
                                        color: 'rgba(255,255,255,0.35)'
                                    },
                                    children: "The Cutter"
                                }, void 0, false, {
                                    fileName: "[project]/pages/index.tsx",
                                    lineNumber: 420,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 lg:grid-cols-2 gap-16 items-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "opacity-0 transition-all duration-700",
                                            "data-scroll-reveal": true,
                                            style: {
                                                animationDelay: '100ms'
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                style: {
                                                    aspectRatio: '1 / 1',
                                                    overflow: 'hidden',
                                                    position: 'relative',
                                                    borderRadius: '18px'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                                        src: "/assets/Cutter.jpeg",
                                                        alt: "Michael Wall at work",
                                                        style: {
                                                            width: '100%',
                                                            height: '100%',
                                                            objectFit: 'cover',
                                                            objectPosition: 'center top',
                                                            transform: 'scale(1.1)',
                                                            display: 'block',
                                                            filter: 'grayscale(1) sepia(0.4) hue-rotate(180deg) brightness(0.65)'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/index.tsx",
                                                        lineNumber: 436,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            position: 'absolute',
                                                            inset: 0,
                                                            boxShadow: 'inset 0 0 30px 15px rgba(0,0,0,0.7)',
                                                            zIndex: 10,
                                                            pointerEvents: 'none'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/index.tsx",
                                                        lineNumber: 449,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/pages/index.tsx",
                                                lineNumber: 428,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/pages/index.tsx",
                                            lineNumber: 423,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                                    "data-gold": "name",
                                                    className: "page-title title-xl name-title mb-6 opacity-0 transition-all duration-700",
                                                    "data-scroll-reveal": true,
                                                    style: {
                                                        animationDelay: '100ms'
                                                    },
                                                    children: "Michael Wall"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/index.tsx",
                                                    lineNumber: 462,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                    className: "opacity-0 transition-all duration-700",
                                                    "data-scroll-reveal": true,
                                                    style: {
                                                        fontFamily: 'var(--font-body)',
                                                        fontSize: '17px',
                                                        lineHeight: 1.75,
                                                        color: 'rgba(255,255,255,0.68)',
                                                        maxWidth: '520px',
                                                        marginBottom: '24px',
                                                        animationDelay: '200ms'
                                                    },
                                                    children: "Based in Tempe, Arizona, I've been part of the gemstone industry since 2013, transitioning from amateur enthusiast to professional cutter in 2021. My focus is on med-high weight retention cuts that maximize both value and beauty."
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/index.tsx",
                                                    lineNumber: 471,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                    className: "opacity-0 transition-all duration-700",
                                                    "data-scroll-reveal": true,
                                                    style: {
                                                        fontFamily: 'var(--font-body)',
                                                        fontSize: '17px',
                                                        lineHeight: 1.75,
                                                        color: 'rgba(255,255,255,0.68)',
                                                        maxWidth: '520px',
                                                        marginBottom: '32px',
                                                        animationDelay: '231ms'
                                                    },
                                                    children: "I work closely with jewelers across the industry, specializing in natural colored gemstones including sapphires, tourmalines, emeralds, tanzanites, and more. Whether you need a custom cut, re-polish, or expert consultation, I'm here to deliver results that exceed expectations."
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/index.tsx",
                                                    lineNumber: 489,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-col sm:flex-row gap-4 mt-8",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                                            href: "/portfolio",
                                                            className: "btn-primary",
                                                            children: "View Portfolio"
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/index.tsx",
                                                            lineNumber: 510,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                                            href: "tel:4802864595",
                                                            className: "btn-secondary",
                                                            children: "Call 480-286-4595"
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/index.tsx",
                                                            lineNumber: 514,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/pages/index.tsx",
                                                    lineNumber: 508,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/pages/index.tsx",
                                            lineNumber: 461,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/index.tsx",
                                    lineNumber: 422,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/index.tsx",
                            lineNumber: 413,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 412,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                        className: "section-spacing relative overflow-hidden",
                        style: {
                            backgroundColor: '#0A0A0A'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 hero-glow pointer-events-none",
                                style: {
                                    opacity: 0.5
                                }
                            }, void 0, false, {
                                fileName: "[project]/pages/index.tsx",
                                lineNumber: 528,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "container-custom relative z-10 text-center",
                                style: {
                                    maxWidth: '880px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                        "data-gold": "section-title",
                                        className: "page-title title-xl mb-8 opacity-0 transition-all duration-700",
                                        "data-scroll-reveal": true,
                                        style: {
                                            animationDelay: '30ms'
                                        },
                                        children: "Ready to Start?"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.tsx",
                                        lineNumber: 531,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "mx-auto mb-12 opacity-0 transition-all duration-700",
                                        "data-scroll-reveal": true,
                                        style: {
                                            fontFamily: 'var(--font-body)',
                                            fontSize: '23px',
                                            lineHeight: 1.75,
                                            color: 'rgba(255,255,255,0.70)',
                                            maxWidth: '600px',
                                            animationDelay: '200ms'
                                        },
                                        children: "Whether you have a rough stone waiting to be transformed or need expert advice on your next project, I'm here to help."
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.tsx",
                                        lineNumber: 540,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                        href: "/shop",
                                        className: "btn-primary opacity-0 transition-all duration-700",
                                        "data-scroll-reveal": true,
                                        style: {
                                            borderRadius: '999px',
                                            padding: '16px 40px',
                                            fontSize: '14px',
                                            animationDelay: '300ms'
                                        },
                                        children: [
                                            "Browse Shop",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                size: 16
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.tsx",
                                                lineNumber: 569,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/index.tsx",
                                        lineNumber: 557,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/index.tsx",
                                lineNumber: 530,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 524,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$Footer$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 574,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/index.tsx",
                lineNumber: 275,
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

//# sourceMappingURL=%5Broot-of-the-server%5D__2fb79518._.js.map