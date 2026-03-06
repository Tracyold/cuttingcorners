module.exports=[16928,a=>a.a(async(b,c)=>{try{let b=await a.y("@supabase/supabase-js-13bdb2f0966edf07");a.n(b),c()}catch(a){c(a)}},!0),76165,a=>a.a(async(b,c)=>{try{var d=a.i(16928),e=b([d]);[d]=e.then?(await e)():e;let f=(0,d.createClient)("https://jvbkcihypbjlnffsbohd.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2YmtjaWh5cGJqbG5mZnNib2hkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3MjkwMDMsImV4cCI6MjA4NzMwNTAwM30.ks3k6udociWxERV6LuDkZB_MOUbXyCxHyek2qtUHpfM");a.s(["supabase",0,f]),c()}catch(a){c(a)}},!1),34637,a=>{"use strict";let b=(0,a.i(64375).default)("x",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);a.s(["X",()=>b],34637)},55257,a=>a.a(async(b,c)=>{try{var d=a.i(8171),e=a.i(27669),f=a.i(34637),g=a.i(44722),h=a.i(92744),i=a.i(76165),j=b([i]);function k(){let[a,b]=(0,e.useState)([]),[c,j]=(0,e.useState)(!0),[k,m]=(0,e.useState)(null),[n,o]=(0,e.useState)(null);(0,e.useEffect)(()=>{!async function(){let{data:a}=await i.supabase.from("portfolio_photos").select("*").eq("published",!0).eq("archived",!1).order("sort_order",{ascending:!0});b(a||[]),j(!1)}()},[]);let p=(0,e.useCallback)(a=>{o(a)},[k]);return(0,e.useEffect)(()=>{let a=a=>{a.target.closest("[data-portfolio-card]")||m(null)};return document.addEventListener("click",a),()=>document.removeEventListener("click",a)},[]),(0,e.useEffect)(()=>{if(!n)return;document.body.style.overflow="hidden";let a=a=>{"Escape"===a.key&&o(null)};return window.addEventListener("keydown",a),()=>{document.body.style.overflow="",window.removeEventListener("keydown",a)}},[n]),(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)("style",{dangerouslySetInnerHTML:{__html:l}}),(0,d.jsx)(g.default,{}),(0,d.jsxs)("main",{style:{background:"#050505",minHeight:"100vh",paddingTop:"56px"},children:[(0,d.jsxs)("div",{style:{maxWidth:"1200px",margin:"0 auto",padding:"48px 48px 80px"},children:[(0,d.jsx)("p",{style:{fontFamily:"'Montserrat', sans-serif",fontSize:"11px",textTransform:"uppercase",letterSpacing:"0.20em",color:"rgba(255,255,255,0.52)",marginBottom:"8px"},children:"Gallery"}),(0,d.jsx)("h1",{style:{fontFamily:"'Oranienbaum', serif",fontSize:"clamp(30px, 6vw, 60px)",fontWeight:400,color:"#FAFAFA",marginBottom:"48px"},children:"Portfolio"}),c?(0,d.jsx)("div",{style:{textAlign:"center",padding:"80px 0",color:"rgba(255,255,255,0.45)"},children:(0,d.jsx)("p",{style:{fontFamily:"'Montserrat', sans-serif",fontSize:"11px",textTransform:"uppercase",letterSpacing:"0.2em"},children:"Loading..."})}):0===a.length?(0,d.jsx)("div",{style:{textAlign:"center",padding:"80px 0",color:"rgba(255,255,255,0.45)"},children:(0,d.jsx)("p",{style:{fontFamily:"'Montserrat', sans-serif",fontSize:"11px",textTransform:"uppercase",letterSpacing:"0.2em"},children:"No photos yet"})}):(0,d.jsx)("div",{className:"portfolio-grid",children:a.map(a=>{let b=k===a.portfolio_photo_id;return(0,d.jsxs)("div",{"data-portfolio-card":!0,onClick:()=>p(a),className:`portfolio-card${b?" focused":""}`,style:{cursor:"pointer"},children:[(0,d.jsxs)("div",{className:"portfolio-thumb",children:[(0,d.jsx)("img",{src:a.photo_url,alt:a.caption||"Portfolio photo",style:{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"}}),(0,d.jsx)("div",{className:"portfolio-vignette"}),(0,d.jsx)("div",{className:`portfolio-caption-overlay${b?" visible":""}`,children:a.caption&&(0,d.jsx)("span",{style:{fontFamily:"'Comfortaa', sans-serif",fontSize:"12px",color:"rgba(45, 212, 191, 1)"},children:a.caption})})]}),(0,d.jsxs)("div",{style:{padding:"10px 4px 0"},children:[a.year&&(0,d.jsx)("p",{style:{fontFamily:"'Cormorant', serif",fontSize:"13px",color:"#d4af37",margin:0},children:a.year}),a.caption&&(0,d.jsx)("p",{style:{fontFamily:"'Montserrat', sans-serif",fontSize:"11px",color:"rgba(255,255,255,0.45)",margin:"2px 0 0"},children:a.caption})]})]},a.portfolio_photo_id)})})]}),(0,d.jsx)(h.default,{})]}),n&&(0,d.jsx)("div",{className:"portfolio-modal-overlay",onClick:a=>{a.target===a.currentTarget&&o(null)},children:(0,d.jsxs)("div",{className:"portfolio-modal",children:[(0,d.jsx)("button",{onClick:()=>o(null),className:"portfolio-modal-close","aria-label":"Close",children:(0,d.jsx)(f.X,{size:20})}),(0,d.jsx)("img",{src:n.photo_url,alt:n.caption||"Portfolio photo",style:{width:"100%",maxHeight:"60vh",objectFit:"cover",display:"block"}}),(0,d.jsxs)("div",{style:{padding:"24px"},children:[n.year&&(0,d.jsx)("p",{style:{fontFamily:"'Cormorant', serif",fontSize:"16px",color:"#d4af37",margin:"0 0 4px"},children:n.year}),n.caption&&(0,d.jsx)("p",{style:{fontFamily:"'Comfortaa', sans-serif",fontSize:"14px",color:"#d4af37",margin:"0 0 12px"},children:n.caption}),n.description&&(0,d.jsx)("p",{style:{fontFamily:"'Comfortaa', sans-serif",fontSize:"13px",lineHeight:1.75,color:"rgba(255,255,255,0.55)",margin:0},children:n.description})]})]})})]})}[i]=j.then?(await j)():j;let l=`
.portfolio-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 22px;
}
@media (max-width: 767px) {
  .portfolio-grid { gap: 14px; }
  main > div { padding: 16px 16px 60px !important; }
}
.portfolio-card {
  transition: transform 220ms ease-out, box-shadow 220ms ease-out;
}
.portfolio-card:hover, .portfolio-card.focused {
  transform: translateY(-2px);
}
.portfolio-card:hover .portfolio-caption-overlay,
.portfolio-card.focused .portfolio-caption-overlay {
  opacity: 1;
}
.portfolio-card:hover .portfolio-thumb,
.portfolio-card.focused .portfolio-thumb {
  border-color: rgba(255,255,255,0.16);
  box-shadow: 0 18px 48px rgba(0,0,0,0.65);
}
.portfolio-thumb {
  position: relative;
  aspect-ratio: 1 / 1;
  background: #0A0A0A;
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,0.06);
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.55);
  transition: border-color 220ms ease-out, box-shadow 220ms ease-out;
}
.portfolio-vignette {
  position: absolute;
  inset: 0;
  box-shadow: inset 0 0 26px 12px rgba(0,0,0,0.60);
  pointer-events: none;
  z-index: 2;
}
.portfolio-caption-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
  opacity: 0;
  transition: opacity 220ms ease-out;
  z-index: 3;
}
.portfolio-caption-overlay.visible {
  opacity: 1;
}
.portfolio-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.75);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: modalFadeIn 220ms ease-out;
}
@keyframes modalFadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
.portfolio-modal {
  background: #0A0A0A;
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 18px;
  box-shadow: 0 28px 90px rgba(0,0,0,0.70);
  max-width: 680px;
  max-height: 92vh;
  overflow-y: auto;
  position: relative;
  width: 90%;
  animation: modalScaleIn 220ms ease-out;
}
@keyframes modalScaleIn {
  from { opacity: 0; transform: scale(0.985); }
  to { opacity: 1; transform: scale(1); }
}
.portfolio-modal-close {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 10;
  background: rgba(0,0,0,0.5);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #FAFAFA;
  transition: all 200ms ease;
}
.portfolio-modal-close:hover {
  background: rgba(0,0,0,0.8);
  border-color: rgba(255,255,255,0.3);
}
`;a.s(["default",()=>k]),c()}catch(a){c(a)}},!1),11207,a=>a.a(async(b,c)=>{try{var d=a.i(79168),e=a.i(27068),f=a.i(32759),g=a.i(20935),h=a.i(67298),i=a.i(55257),j=a.i(9193),k=b([i]);[i]=k.then?(await k)():k;let l=(0,f.hoist)(i,"default"),m=(0,f.hoist)(i,"getStaticProps"),n=(0,f.hoist)(i,"getStaticPaths"),o=(0,f.hoist)(i,"getServerSideProps"),p=(0,f.hoist)(i,"config"),q=(0,f.hoist)(i,"reportWebVitals"),r=(0,f.hoist)(i,"unstable_getStaticProps"),s=(0,f.hoist)(i,"unstable_getStaticPaths"),t=(0,f.hoist)(i,"unstable_getStaticParams"),u=(0,f.hoist)(i,"unstable_getServerProps"),v=(0,f.hoist)(i,"unstable_getServerSideProps"),w=new d.PagesRouteModule({definition:{kind:e.RouteKind.PAGES,page:"/portfolio",pathname:"/portfolio",bundlePath:"",filename:""},distDir:".next",relativeProjectDir:"",components:{App:h.default,Document:g.default},userland:i}),x=(0,j.getHandler)({srcPage:"/portfolio",config:p,userland:i,routeModule:w,getStaticPaths:n,getStaticProps:m,getServerSideProps:o});a.s(["config",0,p,"default",0,l,"getServerSideProps",0,o,"getStaticPaths",0,n,"getStaticProps",0,m,"handler",0,x,"reportWebVitals",0,q,"routeModule",0,w,"unstable_getServerProps",0,u,"unstable_getServerSideProps",0,v,"unstable_getStaticParams",0,t,"unstable_getStaticPaths",0,s,"unstable_getStaticProps",0,r]),c()}catch(a){c(a)}},!1),84872,a=>{a.v(a=>Promise.resolve().then(()=>a(16928)))}];

//# sourceMappingURL=%5Broot-of-the-server%5D__749f372e._.js.map