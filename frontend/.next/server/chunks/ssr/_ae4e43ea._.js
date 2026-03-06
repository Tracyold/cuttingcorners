module.exports=[94490,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"useIntersection",{enumerable:!0,get:function(){return i}});let d=a.r(27669),e=a.r(26373),f="function"==typeof IntersectionObserver,g=new Map,h=[];function i({rootRef:a,rootMargin:b,disabled:c}){let i=c||!f,[j,k]=(0,d.useState)(!1),l=(0,d.useRef)(null),m=(0,d.useCallback)(a=>{l.current=a},[]);return(0,d.useEffect)(()=>{if(f){if(i||j)return;let c=l.current;if(c&&c.tagName)return function(a,b,c){let{id:d,observer:e,elements:f}=function(a){let b,c={root:a.root||null,margin:a.rootMargin||""},d=h.find(a=>a.root===c.root&&a.margin===c.margin);if(d&&(b=g.get(d)))return b;let e=new Map;return b={id:c,observer:new IntersectionObserver(a=>{a.forEach(a=>{let b=e.get(a.target),c=a.isIntersecting||a.intersectionRatio>0;b&&c&&b(c)})},a),elements:e},h.push(c),g.set(c,b),b}(c);return f.set(a,b),e.observe(a),function(){if(f.delete(a),e.unobserve(a),0===f.size){e.disconnect(),g.delete(d);let a=h.findIndex(a=>a.root===d.root&&a.margin===d.margin);a>-1&&h.splice(a,1)}}}(c,a=>a&&k(a),{root:a?.current,rootMargin:b})}else if(!j){let a=(0,e.requestIdleCallback)(()=>k(!0));return()=>(0,e.cancelIdleCallback)(a)}},[i,b,a,j,l.current]),[m,j,(0,d.useCallback)(()=>{k(!1)},[])]}("function"==typeof c.default||"object"==typeof c.default&&null!==c.default)&&void 0===c.default.__esModule&&(Object.defineProperty(c.default,"__esModule",{value:!0}),Object.assign(c.default,c),b.exports=c.default)},49681,(a,b,c)=>{"use strict";function d(a,b,c,d){return!1}Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"getDomainLocale",{enumerable:!0,get:function(){return d}}),a.r(40387),("function"==typeof c.default||"object"==typeof c.default&&null!==c.default)&&void 0===c.default.__esModule&&(Object.defineProperty(c.default,"__esModule",{value:!0}),Object.assign(c.default,c),b.exports=c.default)},52179,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"useMergedRef",{enumerable:!0,get:function(){return e}});let d=a.r(27669);function e(a,b){let c=(0,d.useRef)(null),e=(0,d.useRef)(null);return(0,d.useCallback)(d=>{if(null===d){let a=c.current;a&&(c.current=null,a());let b=e.current;b&&(e.current=null,b())}else a&&(c.current=f(a,d)),b&&(e.current=f(b,d))},[a,b])}function f(a,b){if("function"!=typeof a)return a.current=b,()=>{a.current=null};{let c=a(b);return"function"==typeof c?c:()=>a(null)}}("function"==typeof c.default||"object"==typeof c.default&&null!==c.default)&&void 0===c.default.__esModule&&(Object.defineProperty(c.default,"__esModule",{value:!0}),Object.assign(c.default,c),b.exports=c.default)},37005,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"errorOnce",{enumerable:!0,get:function(){return d}});let d=a=>{}},95344,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0});var d={default:function(){return x},useLinkStatus:function(){return w}};for(var e in d)Object.defineProperty(c,e,{enumerable:!0,get:d[e]});let f=a.r(50852),g=a.r(8171),h=f._(a.r(27669)),i=a.r(33180),j=a.r(8344),k=a.r(15058),l=a.r(54651),m=a.r(76044),n=a.r(53990),o=a.r(94490),p=a.r(49681),q=a.r(22902),r=a.r(52179);function s(a,b,c,d){}function t(a){return"string"==typeof a?a:(0,k.formatUrl)(a)}a.r(37005);let u=h.default.forwardRef(function(a,b){let c,d,{href:e,as:f,children:k,prefetch:u=null,passHref:v,replace:w,shallow:x,scroll:y,locale:z,onClick:A,onNavigate:B,onMouseEnter:C,onTouchStart:D,legacyBehavior:E=!1,...F}=a;c=k,E&&("string"==typeof c||"number"==typeof c)&&(c=(0,g.jsx)("a",{children:c}));let G=h.default.useContext(n.RouterContext),H=!1!==u,{href:I,as:J}=h.default.useMemo(()=>{if(!G){let a=t(e);return{href:a,as:f?t(f):a}}let[a,b]=(0,i.resolveHref)(G,e,!0);return{href:a,as:f?(0,i.resolveHref)(G,f):b||a}},[G,e,f]),K=h.default.useRef(I),L=h.default.useRef(J);E&&(d=h.default.Children.only(c));let M=E?d&&"object"==typeof d&&d.ref:b,[N,O,P]=(0,o.useIntersection)({rootMargin:"200px"}),Q=h.default.useCallback(a=>{(L.current!==J||K.current!==I)&&(P(),L.current=J,K.current=I),N(a)},[J,I,P,N]),R=(0,r.useMergedRef)(Q,M);h.default.useEffect(()=>{!G||O&&H&&s(G,I,J,{locale:z})},[J,I,O,z,H,G?.locale,G]);let S={ref:R,onClick(a){E||"function"!=typeof A||A(a),E&&d.props&&"function"==typeof d.props.onClick&&d.props.onClick(a),!G||a.defaultPrevented||function(a,b,c,d,e,f,g,h,i){let k,{nodeName:l}=a.currentTarget;if(!("A"===l.toUpperCase()&&((k=a.currentTarget.getAttribute("target"))&&"_self"!==k||a.metaKey||a.ctrlKey||a.shiftKey||a.altKey||a.nativeEvent&&2===a.nativeEvent.which)||a.currentTarget.hasAttribute("download"))){if(!(0,j.isLocalURL)(c)){e&&(a.preventDefault(),location.replace(c));return}a.preventDefault(),(()=>{if(i){let a=!1;if(i({preventDefault:()=>{a=!0}}),a)return}let a=g??!0;"beforePopState"in b?b[e?"replace":"push"](c,d,{shallow:f,locale:h,scroll:a}):b[e?"replace":"push"](d||c,{scroll:a})})()}}(a,G,I,J,w,x,y,z,B)},onMouseEnter(a){E||"function"!=typeof C||C(a),E&&d.props&&"function"==typeof d.props.onMouseEnter&&d.props.onMouseEnter(a),G&&s(G,I,J,{locale:z,priority:!0,bypassPrefetchedCheck:!0})},onTouchStart:function(a){E||"function"!=typeof D||D(a),E&&d.props&&"function"==typeof d.props.onTouchStart&&d.props.onTouchStart(a),G&&s(G,I,J,{locale:z,priority:!0,bypassPrefetchedCheck:!0})}};if((0,l.isAbsoluteUrl)(J))S.href=J;else if(!E||v||"a"===d.type&&!("href"in d.props)){let a=void 0!==z?z:G?.locale;S.href=G?.isLocaleDomain&&(0,p.getDomainLocale)(J,a,G?.locales,G?.domainLocales)||(0,q.addBasePath)((0,m.addLocale)(J,a,G?.defaultLocale))}return E?h.default.cloneElement(d,S):(0,g.jsx)("a",{...F,...S,children:c})}),v=(0,h.createContext)({pending:!1}),w=()=>(0,h.useContext)(v),x=u;("function"==typeof c.default||"object"==typeof c.default&&null!==c.default)&&void 0===c.default.__esModule&&(Object.defineProperty(c.default,"__esModule",{value:!0}),Object.assign(c.default,c),b.exports=c.default)},1257,(a,b,c)=>{b.exports=a.r(95344)},64375,a=>{"use strict";var b=a.i(27669);let c=a=>{let b=a.replace(/^([A-Z])|[\s-_]+(\w)/g,(a,b,c)=>c?c.toUpperCase():b.toLowerCase());return b.charAt(0).toUpperCase()+b.slice(1)},d=(...a)=>a.filter((a,b,c)=>!!a&&""!==a.trim()&&c.indexOf(a)===b).join(" ").trim();var e={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let f=(0,b.forwardRef)(({color:a="currentColor",size:c=24,strokeWidth:f=2,absoluteStrokeWidth:g,className:h="",children:i,iconNode:j,...k},l)=>(0,b.createElement)("svg",{ref:l,...e,width:c,height:c,stroke:a,strokeWidth:g?24*Number(f)/Number(c):f,className:d("lucide",h),...!i&&!(a=>{for(let b in a)if(b.startsWith("aria-")||"role"===b||"title"===b)return!0})(k)&&{"aria-hidden":"true"},...k},[...j.map(([a,c])=>(0,b.createElement)(a,c)),...Array.isArray(i)?i:[i]])),g=(a,e)=>{let g=(0,b.forwardRef)(({className:g,...h},i)=>(0,b.createElement)(f,{ref:i,iconNode:e,className:d(`lucide-${c(a).replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,`lucide-${a}`,g),...h}));return g.displayName=c(a),g};a.s(["default",()=>g],64375)},44722,a=>{"use strict";var b=a.i(8171),c=a.i(27669),d=a.i(1257);let e=[{label:"Shop",href:"/shop"},{label:"Portfolio",href:"/portfolio"}],f=`
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
`;function g(){let[g,h]=(0,c.useState)(!1),[i,j]=(0,c.useState)(!1),[k,l]=(0,c.useState)(!1);(0,c.useEffect)(()=>{let a=()=>h(window.scrollY>40);return window.addEventListener("scroll",a,{passive:!0}),a(),()=>window.removeEventListener("scroll",a)},[]),(0,c.useEffect)(()=>{let b;return async function(){try{let{createClient:c}=await a.A(84872),d=c("https://jvbkcihypbjlnffsbohd.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2YmtjaWh5cGJqbG5mZnNib2hkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3MjkwMDMsImV4cCI6MjA4NzMwNTAwM30.ks3k6udociWxERV6LuDkZB_MOUbXyCxHyek2qtUHpfM"),e="18cf77dc-6e41-42bb-abb3-0ae8615bbc20",{data:{session:f}}=await d.auth.getSession();l(!!f&&f.user.id!==e);let{data:{subscription:g}}=d.auth.onAuthStateChange((a,b)=>{l(!!b&&b.user.id!==e)});b=g}catch{l(!1)}}(),()=>{b&&b.unsubscribe()}},[]),(0,c.useEffect)(()=>{if(!i)return;let a=a=>{a.target.closest(".tnav")||j(!1)};return document.addEventListener("click",a),()=>document.removeEventListener("click",a)},[i]);let m=k?"/account":"/login",n=k?"Account":"Login",o=async b=>{if(!k){b.preventDefault();let{createClient:c}=await a.A(84872),d=c("https://jvbkcihypbjlnffsbohd.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2YmtjaWh5cGJqbG5mZnNib2hkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3MjkwMDMsImV4cCI6MjA4NzMwNTAwM30.ks3k6udociWxERV6LuDkZB_MOUbXyCxHyek2qtUHpfM");await d.auth.signOut(),window.location.href="/login"}};return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("style",{dangerouslySetInnerHTML:{__html:f}}),(0,b.jsxs)("nav",{className:`tnav${g?" scrolled":""}`,children:[(0,b.jsx)(d.default,{href:"/",className:"tnav-brand",children:"Cutting Corners Gems"}),(0,b.jsxs)("div",{className:"tnav-links",children:[e.map(a=>(0,b.jsx)(d.default,{href:a.href,className:"tnav-link",children:a.label},a.href)),(0,b.jsx)(d.default,{href:m,className:"tnav-auth tnav-auth-desktop",onClick:o,children:n})]}),(0,b.jsxs)("button",{className:`tnav-burger${i?" open":""}`,onClick:()=>j(a=>!a),"aria-label":"Toggle menu",children:[(0,b.jsx)("span",{className:"bar"}),(0,b.jsx)("span",{className:"bar"}),(0,b.jsx)("span",{className:"bar"})]})]}),(0,b.jsxs)("div",{className:`tnav-drawer${i?" open":""}`,children:[e.map(a=>(0,b.jsx)(d.default,{href:a.href,className:"tnav-drawer-link",onClick:()=>j(!1),children:a.label},a.href)),(0,b.jsx)("a",{href:m,className:"tnav-drawer-auth",onClick:a=>{j(!1),o(a)},children:n})]})]})}a.s(["default",()=>g])},92744,a=>{"use strict";var b=a.i(8171),c=a.i(41910);let d=`
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
`;function e(){let a=(0,c.useRouter)().pathname;return a.startsWith("/admin")||a.startsWith("/account")?null:(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("style",{dangerouslySetInnerHTML:{__html:d}}),(0,b.jsxs)("footer",{className:"ccg-footer",children:[(0,b.jsx)("div",{className:"ccg-footer-tagline",children:"COLOR CONSCIOUS CAREFUL CUTTING"}),(0,b.jsxs)("div",{className:"ccg-footer-content",children:[(0,b.jsxs)("div",{className:"ccg-footer-links",children:[(0,b.jsx)("a",{href:"legal/index",className:"ccg-footer-link",children:"legal"}),(0,b.jsx)("a",{href:"legal/sms-terms",className:"ccg-footer-link",children:"sms disclosure"}),(0,b.jsx)("a",{href:"legal/privacy-policy",className:"ccg-footer-link",children:"privacy policy"}),(0,b.jsx)("a",{href:"/shop",className:"ccg-footer-link",children:"shop"}),(0,b.jsx)("a",{href:"/portfolio",className:"ccg-footer-link",children:"portfolio"}),(0,b.jsx)("a",{href:"/login",className:"ccg-footer-link",children:"sign in / sign up"})]}),(0,b.jsxs)("div",{className:"ccg-footer-contact",children:[(0,b.jsx)("span",{className:"ccg-footer-contact-name",children:"Michael Wall"}),(0,b.jsx)("a",{href:"tel:4802864595",className:"ccg-footer-contact-link",children:"480.286.4595"}),(0,b.jsx)("a",{href:"mailto:mwall@cuttingcornersgems.com",className:"ccg-footer-contact-link",children:"mwall@cuttingcornersgems.com"}),(0,b.jsx)("span",{className:"ccg-footer-welcome",children:"texts and emails welcome"})]})]})]})]})}a.s(["default",()=>e])}];

//# sourceMappingURL=_ae4e43ea._.js.map