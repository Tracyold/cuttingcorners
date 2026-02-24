import { useState, useRef, useEffect, useCallback } from “react”;
import { createClient } from “@supabase/supabase-js”;

// ============================================================
// CUTTING CORNERS GEMS — AccountUserDashboardAdminSide
// Design authority: this file (layout, CSS, components, behavior)
// API authority: UserDashboardAdminView.md (all Supabase calls)
//
// Desktop: top nav + left panel + center + right panel + draggable chat
// Mobile:  top bar + hamburger drawer + full-screen pages
//
// DB prices are DOLLARS — fmtMoney(value) directly, no conversion
// chat_messages uses actor / actor_id (not sender_type / sender_id)
// ============================================================

const supabase = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL,
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// ── Helpers ───────────────────────────────────────────────────
function fmtDate(iso) {
if (!iso) return “”;
return new Date(iso).toLocaleDateString(“en-US”, { month: “short”, day: “numeric”, year: “numeric” });
}
function fmtTime(iso) {
if (!iso) return “”;
return new Date(iso).toLocaleTimeString(“en-US”, { hour: “2-digit”, minute: “2-digit” });
}
// DB stores prices in DOLLARS — format directly, no multiplication
function fmtMoney(v) {
if (v == null) return “–”;
return new Intl.NumberFormat(“en-US”, { style: “currency”, currency: “USD” }).format(v);
}

function useIsMobile() {
const [mob, setMob] = useState(typeof window !== “undefined” ? window.innerWidth < 768 : false);
useEffect(() => {
const fn = () => setMob(window.innerWidth < 768);
window.addEventListener(“resize”, fn);
return () => window.removeEventListener(“resize”, fn);
}, []);
return mob;
}

// Status pill colors — DB enum is COMPLETED (not COMPLETE)
const STATUS_COLORS = {
CREATED:   { bg: “rgba(184,154,42,0.08)”,  color: “#cfb040” },
ACCEPTED:  { bg: “rgba(90,150,90,0.1)”,    color: “#7ec87e” },
COMPLETED: { bg: “rgba(80,120,200,0.1)”,   color: “#88aadd” },
CANCELLED: { bg: “rgba(181,64,64,0.1)”,    color: “#c07070” },
PAID:      { bg: “rgba(90,150,90,0.1)”,    color: “#7ec87e” },
};

const CHAT_W = 300;
const CHAT_H_EXPANDED = 440;
const CHAT_H_COLLAPSED = 44;

// ── CSS ───────────────────────────────────────────────────────
const css = `
@import url(‘https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,300;0,400;0,500;1,300&family=DM+Sans:wght@300;400;500&display=swap’);
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
–k0:#060606;–k1:#0c0c0c;–k2:#111;–k3:#171717;–k4:#1c1c1c;
–ln:rgba(255,255,255,0.055);–ln2:rgba(255,255,255,0.1);
–g:#b89a2a;–gl:#cfb040;–gbg:rgba(184,154,42,0.07);
–tx:#d8d8d8;–d1:#666;–d2:#3a3a3a;–wh:#efefef;–er:#a84040;
–r:1.7px;
–serif:‘Cormorant’,Georgia,serif;–sans:‘DM Sans’,system-ui,sans-serif;
–glow:0 0 0 0.5px rgba(184,154,42,0.32),0 0 18px rgba(184,154,42,0.09);
}

.page{display:flex;flex-direction:column;height:100vh;background:var(–k0);font-family:var(–sans);color:var(–tx);overflow:hidden;position:relative}

@keyframes flashgold{0%{color:var(–gl)}50%{color:var(–gl)}100%{color:var(–d1)}}

.pill{display:inline-block;font-size:7.5px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;padding:2px 6px;border-radius:var(–r)}

.nbadge{display:inline-flex;align-items:center;justify-content:center;min-width:16px;height:16px;padding:0 4px;border-radius:8px;background:var(–er);font-size:8.5px;font-weight:500;color:#fff;letter-spacing:0;line-height:1}

/* shared popup */
.pov{position:fixed;inset:0;background:rgba(0,0,0,.86);backdrop-filter:blur(7px);z-index:200;display:flex;align-items:center;justify-content:center;padding:24px}
.popup{background:var(–k1);border:0.4px solid rgba(184,154,42,0.3);border-radius:var(–r);box-shadow:var(–glow);width:100%;max-width:540px;max-height:88vh;display:flex;flex-direction:column;overflow:hidden}
.popup.wide{max-width:600px}
.phdr{display:flex;align-items:center;justify-content:space-between;padding:14px 18px;border-bottom:0.4px solid var(–ln);flex-shrink:0}
.ptitle{font-family:var(–serif);font-size:19px;font-weight:300;color:var(–wh)}
.phdr-r{display:flex;align-items:center;gap:8px}
.pclose{width:26px;height:26px;border:0.4px solid var(–ln2);border-radius:var(–r);background:none;color:var(–d1);font-size:14px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .15s}
.pclose:hover{border-color:#c07070;color:#c07070}
.pbod{flex:1;overflow-y:auto;padding:18px}
.pftr{padding:11px 18px;border-top:0.4px solid var(–ln);display:flex;align-items:center;justify-content:space-between;flex-shrink:0}
.pftr-r{display:flex;gap:7px}
.ib{margin-bottom:14px}
.il{font-size:8px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:var(–d1);margin-bottom:4px}
.iv{font-size:12px;color:var(–tx);line-height:1.65}
.iv.serif{font-family:var(–serif);font-size:15px;color:var(–wh)}
.iv.money{font-family:var(–serif);font-size:18px;color:var(–gl)}
.div{height:0.4px;background:var(–ln);margin:14px 0}
.two{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.inv-hdr{display:flex;justify-content:space-between;margin-bottom:16px;align-items:flex-start}
.inv-brand{font-family:var(–serif);font-size:17px;font-weight:300;color:var(–wh);letter-spacing:.04em}
.inv-sub{font-size:9px;color:var(–d1);letter-spacing:.1em;margin-top:2px}
.inv-meta{text-align:right}
.inv-id{font-size:9px;color:var(–d1);letter-spacing:.14em;text-transform:uppercase;font-family:monospace}
.inv-date{font-size:11px;color:var(–tx);margin-top:2px}
.timeline{display:flex;align-items:center;margin:14px 0;padding:10px 14px;background:var(–k2);border:0.4px solid var(–ln);border-radius:var(–r)}
.tls{display:flex;align-items:center;gap:5px}
.tld{width:6px;height:6px;border-radius:50%;background:var(–d2);flex-shrink:0}
.tld.done{background:var(–gl)}.tld.cur{background:var(–gl);box-shadow:0 0 0 2px rgba(207,176,64,.2)}
.tll{font-size:8px;letter-spacing:.14em;text-transform:uppercase;color:var(–d2)}
.tll.done{color:rgba(207,176,64,.6)}.tll.cur{color:var(–wh)}
.tlline{flex:1;height:0.4px;background:var(–ln);margin:0 8px}
.tlline.done{background:rgba(207,176,64,.25)}
.litbl{width:100%;border-collapse:collapse;margin-bottom:14px}
.litbl th{font-size:8px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;color:var(–d2);padding:0 0 7px;text-align:left;border-bottom:0.4px solid var(–ln)}
.litbl td{padding:9px 0;font-size:12px;border-bottom:0.4px solid var(–ln)}
.litbl td:last-child{text-align:right;font-family:var(–serif);font-size:14px;color:var(–gl)}
.total-r{display:flex;justify-content:space-between;align-items:baseline}
.total-l{font-size:9px;letter-spacing:.16em;text-transform:uppercase;color:var(–d1)}
.total-v{font-family:var(–serif);font-size:22px;color:var(–gl)}
.efield{width:100%;background:var(–k2);border:0.4px solid var(–g);border-radius:var(–r);color:var(–tx);padding:7px 10px;font-family:var(–sans);font-size:12px;outline:none}
.etarea{width:100%;background:var(–k2);border:0.4px solid var(–g);border-radius:var(–r);color:var(–tx);padding:7px 10px;font-family:var(–sans);font-size:12px;outline:none;resize:vertical;min-height:60px}
.pthumb{width:72px;height:72px;object-fit:cover;border:0.4px solid var(–ln2);border-radius:var(–r);cursor:pointer;transition:border-color .15s}
.pthumb:hover{border-color:var(–gl)}
.btn-g{padding:7px 13px;font-family:var(–sans);font-size:8.5px;font-weight:500;letter-spacing:.15em;text-transform:uppercase;border:0.4px solid var(–ln2);border-radius:var(–r);background:none;color:var(–d1);cursor:pointer;transition:all .15s}
.btn-g:hover{border-color:var(–g);color:var(–gl)}
.btn-p{padding:7px 14px;font-family:var(–sans);font-size:8.5px;font-weight:500;letter-spacing:.15em;text-transform:uppercase;border:none;border-radius:var(–r);background:var(–gl);color:#000;cursor:pointer;transition:background .15s}
.btn-p:hover{background:#dcc056}
.btn-p:disabled{opacity:0.45;cursor:not-allowed}
.btn-d{padding:7px 13px;font-family:var(–sans);font-size:8.5px;font-weight:500;letter-spacing:.15em;text-transform:uppercase;border:0.4px solid rgba(168,64,64,.35);border-radius:var(–r);background:none;color:#c07070;cursor:pointer;transition:all .15s}
.btn-d:hover{background:rgba(168,64,64,.1)}
.btn-ex{padding:7px 13px;font-family:var(–sans);font-size:8.5px;font-weight:500;letter-spacing:.15em;text-transform:uppercase;border:0.4px solid var(–ln2);border-radius:var(–r);background:none;color:var(–d1);cursor:pointer;transition:all .15s}
.btn-ex:hover{border-color:var(–g);color:var(–gl)}
.fnote{font-size:9px;color:var(–d2);letter-spacing:.07em}

/* add work order form */
.awo-field{margin-bottom:12px}
.awo-label{font-size:8px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:var(–d1);margin-bottom:4px;display:block}
.awo-select{width:100%;background:var(–k2);border:0.4px solid var(–g);border-radius:var(–r);color:var(–tx);padding:7px 10px;font-family:var(–sans);font-size:12px;outline:none}

/* loading / error */
.loading-state{display:flex;align-items:center;justify-content:center;height:100%;font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:var(–d2)}
.error-state{display:flex;align-items:center;justify-content:center;height:100%;font-size:11px;color:#c07070;text-align:center;padding:24px}

::-webkit-scrollbar{width:3px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:rgba(255,255,255,.08);border-radius:2px}

/* ─────────────── DESKTOP ─────────────── */
.d-tnav{display:flex;align-items:center;height:44px;flex-shrink:0;background:var(–k1);border-bottom:0.4px solid var(–ln);padding:0 22px}
.d-back{display:flex;align-items:center;gap:5px;font-size:9.5px;letter-spacing:.16em;text-transform:uppercase;color:var(–d1);background:none;border:none;cursor:pointer;padding-right:18px;margin-right:18px;border-right:0.4px solid var(–ln2);transition:color .15s;font-family:var(–sans)}
.d-back:hover{color:var(–wh)}
.d-crumb{font-family:var(–serif);font-size:14px;font-weight:400;color:var(–wh);letter-spacing:.04em;margin-right:auto;cursor:pointer;position:relative}
.d-crumb-sub{font-family:var(–sans);font-size:9px;color:var(–d1);letter-spacing:.1em;margin-right:8px}
.d-ntab{display:flex;align-items:center;gap:7px;height:100%;padding:0 18px;font-size:9.5px;font-weight:400;letter-spacing:2.7px;text-transform:uppercase;color:var(–d1);background:none;border:none;cursor:pointer;border-bottom:1.5px solid transparent;transition:color .2s;font-family:var(–sans)}
.d-ntab.on{color:var(–wh);border-bottom-color:var(–gl)}
.d-ntab:not(.on):hover{animation:flashgold .5s ease forwards}
.d-body{display:flex;flex:1;overflow:hidden;position:relative}
.d-lpanel,.d-rpanel{width:268px;flex-shrink:0;background:var(–k1);display:flex;flex-direction:column;overflow:hidden;transition:width .28s ease,opacity .28s ease}
.d-lpanel{border-right:0.4px solid var(–ln)}
.d-rpanel{border-left:0.4px solid var(–ln)}
.d-lpanel.hidden,.d-rpanel.hidden{width:0;opacity:0;pointer-events:none}
.d-center{flex:1;background:var(–k0);min-width:0;overflow-y:auto}
.d-phead{padding:13px 16px 0;border-bottom:0.4px solid var(–ln);flex-shrink:0}
.d-ptabs{display:flex;gap:16px}
.d-ptab{padding:9px 0;font-size:9px;font-weight:500;letter-spacing:2.4px;text-transform:uppercase;color:var(–d1);background:none;border:none;cursor:pointer;border-bottom:1px solid transparent;position:relative;top:1px;transition:color .15s;font-family:var(–sans)}
.d-ptab.on{color:var(–wh);border-bottom-color:var(–gl)}
.d-ptab:not(.on):hover{animation:flashgold .5s ease forwards}
.d-paction{padding:10px 16px;border-bottom:0.4px solid var(–ln);flex-shrink:0;display:flex;justify-content:flex-end}
.btn-awo{padding:6px 13px;background:var(–gl);color:#000;border:none;border-radius:var(–r);font-family:var(–sans);font-size:9px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;cursor:pointer;transition:background .15s}
.btn-awo:hover{background:#dcc056}
.d-pbody{flex:1;overflow-y:auto}
.d-pempty{display:flex;align-items:center;justify-content:center;padding:40px 16px;color:var(–d2);font-size:9px;letter-spacing:.18em;text-transform:uppercase}
.d-row{display:flex;align-items:center;gap:10px;padding:10px 16px;border-bottom:0.4px solid var(–ln);cursor:pointer;transition:background .1s}
.d-row:hover{background:var(–k2)}
.d-row input[type=checkbox]{accent-color:var(–gl);flex-shrink:0;cursor:pointer;width:12px;height:12px}
.row-id{font-size:11px;color:var(–wh);font-family:monospace;letter-spacing:.03em;flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.row-date{font-size:9.5px;color:var(–d1);white-space:nowrap;flex-shrink:0}
.udot{width:4px;height:4px;border-radius:50%;background:var(–gl);flex-shrink:0;margin-left:6px}
.row-pill{margin-left:8px;flex-shrink:0}
.d-bulk{padding:7px 16px;background:var(–k2);border-bottom:0.4px solid var(–ln);display:flex;align-items:center;gap:7px;flex-shrink:0}
.d-bulk-ct{font-size:9px;color:var(–d1);letter-spacing:.07em;margin-right:auto}
.bbtn{padding:4px 10px;font-size:8.5px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;border:0.4px solid var(–ln2);border-radius:var(–r);background:none;color:var(–d1);cursor:pointer;transition:all .15s;font-family:var(–sans)}
.bbtn:hover{border-color:var(–g);color:var(–gl)}

/* dashboard tab */
.dash-body{padding:28px;display:flex;gap:24px}
.dash-card{background:var(–k1);border:0.4px solid var(–ln);border-radius:var(–r);padding:20px;flex:1}
.dash-card-title{font-size:8px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:var(–d1);margin-bottom:16px}
.dash-field{margin-bottom:12px}
.dash-label{font-size:8px;letter-spacing:.18em;text-transform:uppercase;color:var(–d1);margin-bottom:3px}
.dash-value{font-size:12px;color:var(–tx);line-height:1.5}
.dash-value.serif{font-family:var(–serif);font-size:16px;color:var(–wh)}
.stat-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.stat-card{background:var(–k2);border:0.4px solid var(–ln);border-radius:var(–r);padding:16px}
.stat-val{font-family:var(–serif);font-size:22px;color:var(–gl);letter-spacing:.02em}
.stat-lbl{font-size:8.5px;letter-spacing:.18em;text-transform:uppercase;color:var(–d1);margin-top:4px}
.dash-edit-btn{float:right;margin-top:-2px}

/* user info hover popover */
.user-hover-pop{position:absolute;top:44px;left:0;background:var(–k1);border:0.4px solid rgba(184,154,42,0.3);border-radius:var(–r);box-shadow:var(–glow);padding:14px 16px;min-width:220px;z-index:100;pointer-events:none}
.uhp-row{margin-bottom:8px}
.uhp-label{font-size:8px;letter-spacing:.18em;text-transform:uppercase;color:var(–d1);margin-bottom:2px}
.uhp-value{font-size:11px;color:var(–tx)}

/* chat widget */
.chat-widget{position:fixed;bottom:0;border-radius:var(–r) var(–r) 0 0;background:var(–k1);border:0.4px solid rgba(184,154,42,0.22);border-bottom:none;box-shadow:0 -4px 24px rgba(0,0,0,.5);z-index:50;overflow:hidden;transition:height .25s cubic-bezier(.4,0,.2,1);display:flex;flex-direction:column;user-select:none}
.chat-handle{display:flex;align-items:center;justify-content:space-between;height:44px;padding:0 14px;flex-shrink:0;cursor:grab;border-bottom:0.4px solid var(–ln);background:var(–k2)}
.chat-handle:active{cursor:grabbing}
.chat-handle-left{display:flex;align-items:center;gap:9px}
.chat-av{width:24px;height:24px;border-radius:50%;background:var(–k3);border:0.4px solid var(–ln2);display:flex;align-items:center;justify-content:center;font-family:var(–serif);font-size:12px;color:var(–gl);flex-shrink:0;pointer-events:none}
.chat-uname{font-family:var(–serif);font-size:13px;font-weight:400;color:var(–wh);pointer-events:none}
.chat-handle-right{display:flex;align-items:center;gap:8px}
.chat-toggle-btn{width:24px;height:24px;border:0.4px solid var(–ln2);border-radius:var(–r);background:none;color:var(–d1);font-size:12px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .15s;flex-shrink:0}
.chat-toggle-btn:hover{border-color:var(–gl);color:var(–gl)}
.chat-msgs{flex:1;overflow-y:auto;padding:14px 14px 6px;display:flex;flex-direction:column;gap:9px;background:var(–k0)}
.msg{display:flex;flex-direction:column;max-width:80%}
.msg.admin{align-self:flex-end;align-items:flex-end}
.msg.account{align-self:flex-start;align-items:flex-start}
.msg.admin .bubble{background:var(–gl);color:#111;border:0.4px solid rgba(207,176,64,.45);border-radius:var(–r) var(–r) 0 var(–r);padding:8px 12px;font-size:11.5px;line-height:1.6}
.msg.account .bubble{background:var(–k3);color:var(–tx);border:0.4px solid var(–ln2);border-radius:var(–r) var(–r) var(–r) 0;padding:8px 12px;font-size:11.5px;line-height:1.6}
.msg-t{font-size:8px;color:var(–d2);margin-top:3px;letter-spacing:.05em}
.chat-input-row{display:flex;padding:10px 14px;border-top:0.4px solid var(–ln);flex-shrink:0;background:var(–k1);gap:6px}
.cinput{flex:1;background:var(–k2);border:0.4px solid var(–ln);border-radius:var(–r);color:var(–tx);padding:8px 11px;font-family:var(–sans);font-size:11.5px;outline:none;transition:border-color .15s}
.cinput:focus{border-color:var(–g)}
.cinput::placeholder{color:var(–d2)}
.csend{padding:8px 14px;background:var(–gl);color:#000;border:none;border-radius:var(–r);font-family:var(–sans);font-size:9px;font-weight:500;letter-spacing:.16em;text-transform:uppercase;cursor:pointer;transition:background .15s}
.csend:hover{background:#dcc056}
.csend:disabled{opacity:0.45;cursor:not-allowed}
.cfile-btn{padding:8px 10px;background:none;border:0.4px solid var(–ln2);border-radius:var(–r);color:var(–d1);cursor:pointer;font-size:13px;transition:all .15s;flex-shrink:0}
.cfile-btn:hover{border-color:var(–g);color:var(–gl)}

/* ─────────────── MOBILE ─────────────── */
.m-page{display:flex;flex-direction:column;height:100vh;background:var(–k0);font-family:var(–sans);color:var(–tx);overflow:hidden}
.m-topbar{display:flex;align-items:center;justify-content:space-between;height:52px;flex-shrink:0;padding:0 18px;background:var(–k1);border-bottom:0.4px solid var(–ln);position:relative}
.m-crumb{font-family:var(–serif);font-size:15px;font-weight:400;color:var(–wh);letter-spacing:.03em}
.m-menu-btn{position:relative;width:38px;height:38px;border:0.4px solid var(–ln2);border-radius:var(–r);background:none;color:var(–wh);cursor:pointer;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:4px;transition:border-color .15s}
.m-menu-btn:hover{border-color:var(–gl)}
.m-menu-btn .bar{width:14px;height:1px;background:var(–tx);border-radius:1px}
.m-menu-total{position:absolute;top:-4px;right:-4px;min-width:15px;height:15px;padding:0 3px;border-radius:8px;background:var(–er);font-size:8px;font-weight:600;color:#fff;letter-spacing:0;display:flex;align-items:center;justify-content:center}
.m-menu-overlay{position:fixed;inset:0;z-index:100;background:rgba(0,0,0,.5);backdrop-filter:blur(4px)}
.m-menu{position:fixed;top:0;right:0;bottom:0;width:240px;background:var(–k1);border-left:0.4px solid rgba(184,154,42,0.25);box-shadow:var(–glow);z-index:101;display:flex;flex-direction:column;animation:slideIn .22s ease}
@keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}
.m-menu-hdr{padding:18px 18px 14px;border-bottom:0.4px solid var(–ln)}
.m-menu-name{font-family:var(–serif);font-size:16px;font-weight:400;color:var(–wh);letter-spacing:.04em}
.m-menu-meta{font-size:9px;color:var(–d1);letter-spacing:.1em;margin-top:3px}
.m-menu-items{flex:1;padding:8px 0}
.m-menu-item{display:flex;align-items:center;justify-content:space-between;padding:13px 18px;cursor:pointer;border:none;background:none;width:100%;text-align:left;font-family:var(–sans);transition:background .1s}
.m-menu-item:hover{background:var(–k2)}
.m-menu-item.on{background:var(–k2)}
.m-menu-item-label{font-size:10px;font-weight:400;letter-spacing:2.2px;text-transform:uppercase;color:var(–d1)}
.m-menu-item.on .m-menu-item-label{color:var(–wh)}
.m-menu-divider{height:0.4px;background:var(–ln);margin:8px 18px}
.m-menu-back{display:flex;align-items:center;gap:8px;padding:16px 18px;border-top:0.4px solid var(–ln);cursor:pointer;border:none;background:none;width:100%;text-align:left;font-family:var(–sans);transition:all .15s}
.m-menu-back-label{font-size:10px;font-weight:400;letter-spacing:2px;text-transform:uppercase;color:var(–d1)}
.m-menu-back:hover .m-menu-back-label{color:var(–wh)}
.m-menu-back-arrow{font-size:14px;color:var(–d1)}
.m-content{flex:1;overflow:hidden;display:flex;flex-direction:column}
.m-list-page{flex:1;overflow-y:auto}
.m-section-label{padding:14px 18px 8px;font-size:8.5px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:var(–d1)}
.m-row{display:flex;align-items:center;gap:12px;padding:13px 18px;border-bottom:0.4px solid var(–ln);cursor:pointer;transition:background .1s}
.m-row:hover{background:var(–k2)}
.m-row-id{font-size:12px;color:var(–wh);font-family:monospace;flex:1}
.m-row-date{font-size:9.5px;color:var(–d1);white-space:nowrap}
.m-row-udot{width:5px;height:5px;border-radius:50%;background:var(–gl);flex-shrink:0}
.m-row-chevron{font-size:11px;color:var(–d2);margin-left:4px}
.m-chat{flex:1;display:flex;flex-direction:column;overflow:hidden}
.m-chat-msgs{flex:1;overflow-y:auto;padding:16px 18px 8px;display:flex;flex-direction:column;gap:10px;background:var(–k0)}
.m-chat-input{display:flex;padding:12px 18px;border-top:0.4px solid var(–ln);background:var(–k1);flex-shrink:0;gap:6px}
.m-cinput{flex:1;background:var(–k2);border:0.4px solid var(–ln);border-radius:var(–r);color:var(–tx);padding:10px 13px;font-family:var(–sans);font-size:13px;outline:none;transition:border-color .15s}
.m-cinput:focus{border-color:var(–g)}
.m-cinput::placeholder{color:var(–d2)}
.m-csend{padding:10px 16px;background:var(–gl);color:#000;border:none;border-radius:var(–r);font-family:var(–sans);font-size:10px;font-weight:500;letter-spacing:.15em;text-transform:uppercase;cursor:pointer}
.m-user-info{flex:1;overflow-y:auto;padding:20px 18px}
.m-info-section{margin-bottom:22px}
.m-info-label{font-size:8px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:var(–d1);margin-bottom:6px}
.m-info-value{font-size:13px;color:var(–tx);line-height:1.6}
.m-info-value.serif{font-family:var(–serif);font-size:18px;color:var(–wh)}
.m-popup-page{position:fixed;inset:0;background:var(–k0);z-index:150;display:flex;flex-direction:column;overflow:hidden}
.m-popup-hdr{display:flex;align-items:center;justify-content:space-between;padding:0 18px;height:52px;flex-shrink:0;background:var(–k1);border-bottom:0.4px solid rgba(184,154,42,0.2)}
.m-popup-title{font-family:var(–serif);font-size:17px;font-weight:300;color:var(–wh)}
.m-popup-hdr-r{display:flex;align-items:center;gap:8px}
.m-popup-body{flex:1;overflow-y:auto;padding:20px 18px}
.m-popup-ftr{padding:14px 18px;border-top:0.4px solid var(–ln);display:flex;gap:8px;justify-content:flex-end;background:var(–k1);flex-shrink:0}
`;

// ── Shared Components ─────────────────────────────────────────
function Pill({ status }) {
const s = STATUS_COLORS[status] || { bg: “rgba(255,255,255,.04)”, color: “#555” };
return <span className=“pill” style={{ background: s.bg, color: s.color }}>{status}</span>;
}

function Timeline({ status }) {
const steps = [“CREATED”, “ACCEPTED”, “COMPLETED”];
const idx = steps.indexOf(status);
return (
<div className="timeline">
{steps.map((s, i) => (
<div key={s} style={{ display: “flex”, alignItems: “center”, flex: i < steps.length - 1 ? 1 : “none” }}>
<div className="tls">
<div className={`tld ${i < idx ? "done" : i === idx ? "cur" : ""}`} />
<span className={`tll ${i < idx ? "done" : i === idx ? "cur" : ""}`}>{s}</span>
</div>
{i < steps.length - 1 && <div className={`tlline ${i < idx ? "done" : ""}`} />}
</div>
))}
</div>
);
}

// ── Popup Bodies ──────────────────────────────────────────────
function InquiryBody({ item, user, photoUrl }) {
return (
<>
<div className="two">
<div className="ib"><div className="il">From</div><div className="iv">{user?.name}</div></div>
<div className="ib"><div className="il">Date · Time</div><div className="iv">{fmtDate(item.created_at)} · {fmtTime(item.created_at)}</div></div>
</div>
<div className=“two” style={{ marginTop: 14 }}>
<div className="ib"><div className="il">Email</div><div className="iv">{user?.email}</div></div>
<div className="ib"><div className="il">Phone</div><div className="iv">{user?.phone || “–”}</div></div>
</div>
<div className=“ib” style={{ marginTop: 14 }}><div className="il">Address</div><div className="iv">{user?.shipping_address || “–”}</div></div>
<div className="div" />
<div className="ib"><div className="il">Message</div><div className=“iv” style={{ lineHeight: 1.75 }}>{item.description || “–”}</div></div>
{/* photo_url is a storage path — rendered via signed URL */}
{photoUrl && (
<div className="ib">
<div className="il">Photo</div>
<img src={photoUrl} alt=”” className=“pthumb” onClick={() => window.open(photoUrl)} />
</div>
)}
</>
);
}

function SRBody({ item, photoUrl }) {
return (
<>
<div className="two">
<div className="ib"><div className="il">Subject</div><div className="iv serif">{item.description?.slice(0, 40) || “–”}</div></div>
<div className="ib"><div className="il">Service Type</div><div className="iv">{item.service_type || “–”}</div></div>
</div>
<div className=“ib” style={{ marginTop: 14 }}><div className="il">Date · Time</div><div className="iv">{fmtDate(item.created_at)} · {fmtTime(item.created_at)}</div></div>
<div className="div" />
<div className="ib"><div className="il">Description</div><div className=“iv” style={{ lineHeight: 1.75 }}>{item.description}</div></div>
{/* photo_url from ChatUploads bucket — rendered via signed URL */}
{photoUrl && (
<div className="ib">
<div className="il">Photo</div>
<img src={photoUrl} alt=”” className=“pthumb” onClick={() => window.open(photoUrl)} />
</div>
)}
</>
);
}

function WOBody({ item, user, adminInfo, editing, form, upd }) {
function F({ label, k, area }) {
return (
<div className="ib">
<div className="il">{label}</div>
{editing
? area
? <textarea className=“etarea” value={form[k] || “”} onChange={e => upd(k, e.target.value)} />
: <input className=“efield” value={form[k] || “”} onChange={e => upd(k, e.target.value)} />
: <div className="iv">{form[k] || “–”}</div>
}
</div>
);
}
return (
<>
{/* Admin header — live from admin_users, not snapshot */}
<div className="inv-hdr">
<div>
<div className="inv-brand">{adminInfo?.business_name}</div>
<div className="inv-sub">{adminInfo?.address}</div>
<div className="inv-sub">{adminInfo?.phone}</div>
</div>
<div className="inv-meta">
<div className="inv-id">{item.work_order_id}</div>
<div className="inv-date">{fmtDate(item.created_at)}</div>
</div>
</div>
<div className="div" />
{/* Client — live from account_users */}
<div className="ib">
<div className="il">Client</div>
<div className="iv">{user?.name}</div>
<div className=“iv” style={{ fontSize: 11, color: “var(–d1)” }}>{user?.email} · {user?.phone}</div>
<div className=“iv” style={{ fontSize: 11, color: “var(–d1)” }}>{user?.shipping_address}</div>
</div>
<div className="div" />
<Timeline status={item.status} />
<div className="div" />
<div className="two"><F label="Title" k="title" /><F label="Service Type" k="service_type" /></div>
<div className=“two” style={{ marginTop: 14 }}>
<F label="Gem Type" k="gem_type" />
<div className="ib">
<div className="il">Est. Price</div>
{editing
? <input className=“efield” value={form.estimated_price || “”} onChange={e => upd(“estimated_price”, e.target.value)} />
: <div className="iv money">{fmtMoney(form.estimated_price)}</div>
}
</div>
</div>
<div style={{ marginTop: 14 }}><F label="Description" k="description" area /></div>
<div style={{ marginTop: 14 }}><F label="Notes" k="notes" area /></div>
</>
);
}

function InvBody({ item }) {
// Invoice always uses frozen snapshots — never live admin_users or account_users
const admin = item.admin_snapshot || {};
const buyer = item.account_snapshot || {};
const lineItem = item.line_items?.[0] || {};

return (
<>
{/* Header from admin_snapshot — frozen at purchase time */}
<div className="inv-hdr">
<div>
<div className="inv-brand">{admin.businessName}</div>
<div className="inv-sub">{admin.fullName}</div>
<div className="inv-sub">{admin.address}</div>
<div className="inv-sub">{admin.contactEmail}</div>
<div className="inv-sub">{admin.phone}</div>
</div>
<div className="inv-meta">
<div className="inv-id">{item.invoice_id}</div>
<div className="inv-date">{fmtDate(item.paid_at)}</div>
</div>
</div>
<div className="div" />
{/* Bill To from account_snapshot — frozen at purchase time */}
<div className="ib">
<div className="il">Bill To</div>
<div className="iv">{buyer.name}</div>
<div className=“iv” style={{ fontSize: 11, color: “var(–d1)” }}>{buyer.email} · {buyer.phone}</div>
<div className=“iv” style={{ fontSize: 11, color: “var(–d1)” }}>{buyer.shippingAddress}</div>
{buyer.businessName && <div className=“iv” style={{ fontSize: 11, color: “var(–d1)” }}>{buyer.businessName}</div>}
</div>
<div className="div" />
{/* Line items from line_items JSONB — never join to products table */}
<table className="litbl">
<thead>
<tr>
<th>Item</th>
<th style={{ textAlign: “right” }}>Amount</th>
</tr>
</thead>
<tbody>
<tr>
<td>
<div>{lineItem.title}</div>
<div style={{ fontSize: 10, color: “var(–d1)”, marginTop: 2 }}>
{lineItem.gem_type} · {lineItem.weight} ct · {lineItem.color} · {lineItem.shape}
</div>
{lineItem.origin && <div style={{ fontSize: 10, color: “var(–d1)” }}>Origin: {lineItem.origin}</div>}
{lineItem.treatment && <div style={{ fontSize: 10, color: “var(–d1)” }}>Treatment: {lineItem.treatment}</div>}
{lineItem.gia_report_number && <div style={{ fontSize: 10, color: “var(–d1)” }}>GIA: {lineItem.gia_report_number}</div>}
</td>
{/* total_price in line_items is dollars — fmtMoney directly */}
<td>{fmtMoney(lineItem.total_price)}</td>
</tr>
</tbody>
</table>
<div className="div" />
{/* total_amount is dollars — fmtMoney directly */}
<div className="total-r">
<span className="total-l">Total Paid</span>
<span className="total-v">{fmtMoney(item.total_amount)}</span>
</div>
{item.stripe_session_id && (
<div style={{ marginTop: 8, fontSize: 9, color: “var(–d2)”, fontFamily: “monospace” }}>
Stripe: {item.stripe_session_id}
</div>
)}
</>
);
}

// ── Add Work Order Popup ──────────────────────────────────────
function AddWOPopup({ accountUserId, onClose, onCreated, session }) {
const [form, setForm] = useState({
title: “”, service_type: “”, gem_type: “”, estimated_price: “”, description: “”, notes: “”
});
const [saving, setSaving] = useState(false);
const [err, setErr] = useState(””);
const upd = (k, v) => setForm(p => ({ …p, [k]: v }));

async function handleCreate() {
if (!form.title.trim() || !form.description.trim()) { setErr(“Title and description are required.”); return; }
setSaving(true);
const { error } = await supabase.from(“work_orders”).insert({
account_user_id:     accountUserId,
created_by_admin_id: session.user.id,
title:               form.title.trim(),
description:         form.description.trim(),
service_type:        form.service_type || null,
gem_type:            form.gem_type || null,
// Always parseFloat — estimated_price is NUMERIC in DB
estimated_price:     form.estimated_price ? parseFloat(form.estimated_price) : null,
notes:               form.notes || null,
status:              “CREATED”,
edit_history:        [],
});
// DB triggers fire automatically after INSERT:
// - admin_notify_work_order → admin_notifications
// - user_notify_work_order → SMS to user if opt_in_work_orders = true
// Do NOT manually call edge functions here
setSaving(false);
if (error) { setErr(error.message); return; }
onCreated();
onClose();
}

const SERVICE_TYPES = [
“Custom Rough Cut”,
“Re-Cut & Re-Polish”,
“Table Re-Polish”,
“Crown Re-Polish”,
“Pavilion Re-Polish”,
“Gemstone Material Cut Design”,
“Virtual Consultation”,
];

return (
<div className="pov" onClick={onClose}>
<div className=“popup” onClick={e => e.stopPropagation()}>
<div className="phdr">
<div className="ptitle">Add Work Order</div>
<button className="pclose" onClick={onClose}>×</button>
</div>
<div className="pbod">
<div className="awo-field">
<label className="awo-label">Title *</label>
<input className=“efield” value={form.title} onChange={e => upd(“title”, e.target.value)} placeholder=“e.g. Platinum Band Resizing” />
</div>
<div className="awo-field">
<label className="awo-label">Service Type</label>
<select className=“awo-select” value={form.service_type} onChange={e => upd(“service_type”, e.target.value)}>
<option value="">— Select —</option>
{SERVICE_TYPES.map(s => <option key={s} value={s}>{s}</option>)}
</select>
</div>
<div className="two">
<div className="awo-field">
<label className="awo-label">Gem Type</label>
<input className=“efield” value={form.gem_type} onChange={e => upd(“gem_type”, e.target.value)} placeholder=“e.g. Sapphire” />
</div>
<div className="awo-field">
<label className="awo-label">Est. Price ($)</label>
<input className=“efield” type=“number” value={form.estimated_price} onChange={e => upd(“estimated_price”, e.target.value)} placeholder=“0.00” />
</div>
</div>
<div className="awo-field">
<label className="awo-label">Description *</label>
<textarea className=“etarea” value={form.description} onChange={e => upd(“description”, e.target.value)} placeholder=“Describe the work to be done” style={{ minHeight: 80 }} />
</div>
<div className="awo-field">
<label className="awo-label">Notes</label>
<textarea className=“etarea” value={form.notes} onChange={e => upd(“notes”, e.target.value)} placeholder=“Internal notes (optional)” />
</div>
{err && <div style={{ color: “#c07070”, fontSize: 11, marginTop: 8 }}>{err}</div>}
</div>
<div className="pftr">
<button className="btn-g" onClick={onClose}>Cancel</button>
<button className="btn-p" onClick={handleCreate} disabled={saving}>{saving ? “Creating…” : “Create Work Order”}</button>
</div>
</div>
</div>
);
}

// ── Desktop Popup ─────────────────────────────────────────────
function DesktopPopup({ popup, user, adminInfo, onClose, onWOUpdate, session }) {
const [editing, setEditing] = useState(false);
const [form, setForm] = useState(popup?.item ? { …popup.item } : {});
const [saving, setSaving] = useState(false);
const [photoUrl, setPhotoUrl] = useState(null);
const upd = (k, v) => setForm(p => ({ …p, [k]: v }));

// Fetch signed URL for photo attachments
useEffect(() => {
if (!popup) return;
async function fetchPhoto() {
const path = popup.item?.photo_url;
if (!path) return;
const bucket = popup.type === “inquiry” ? “account-inquiry-photos” : “ChatUploads”;
const { data } = await supabase.storage.from(bucket).createSignedUrl(path, 3600);
if (data?.signedUrl) setPhotoUrl(data.signedUrl);
}
fetchPhoto();
}, [popup]);

if (!popup) return null;
const item = popup.item;
const canEdit     = item?.status === “CREATED”;
const canComplete = item?.status === “ACCEPTED”;
const locked      = item?.status === “COMPLETED” || item?.status === “CANCELLED”;

async function handleSave() {
setSaving(true);
// Always parseFloat estimated_price — NUMERIC in DB
await supabase.from(“work_orders”).update({
title:           form.title,
service_type:    form.service_type,
gem_type:        form.gem_type,
estimated_price: form.estimated_price ? parseFloat(form.estimated_price) : null,
description:     form.description,
notes:           form.notes,
// edit_history is JSONB array — always append, never overwrite
edit_history: […(item.edit_history || []), {
edited_at: new Date().toISOString(),
admin_id:  session.user.id,
changes:   {}
}]
}).eq(“work_order_id”, item.work_order_id);
setSaving(false);
onWOUpdate();
setEditing(false);
onClose();
}

async function handleComplete() {
await supabase.from(“work_orders”)
.update({ status: “COMPLETED”, completed_at: new Date().toISOString() })
.eq(“work_order_id”, item.work_order_id);
onWOUpdate();
onClose();
}

async function handleCancel() {
await supabase.from(“work_orders”)
.update({ status: “CANCELLED”, cancelled_at: new Date().toISOString() })
.eq(“work_order_id”, item.work_order_id);
onWOUpdate();
onClose();
}

return (
<div className="pov" onClick={onClose}>
<div className={`popup ${popup.type === "wo" ? "wide" : ""}`} onClick={e => e.stopPropagation()}>
<div className="phdr">
<div className="ptitle">
{popup.type === “inquiry” && “Product Inquiry”}
{popup.type === “sr”      && “Service Request”}
{popup.type === “wo”      && “Work Order”}
{popup.type === “inv”     && “Invoice”}
</div>
<div className="phdr-r">
{popup.type === “wo”  && <Pill status={item.status} />}
{popup.type === “inv” && <Pill status="PAID" />}
<button className="btn-ex">{popup.type === “inquiry” || popup.type === “sr” ? “Export TXT” : “Export PDF”}</button>
<button className="pclose" onClick={onClose}>×</button>
</div>
</div>
<div className="pbod">
{popup.type === “inquiry” && <InquiryBody item={item} user={user} photoUrl={photoUrl} />}
{popup.type === “sr”      && <SRBody item={item} photoUrl={photoUrl} />}
{popup.type === “wo”      && <WOBody item={item} user={user} adminInfo={adminInfo} editing={editing && canEdit} form={form} upd={upd} />}
{popup.type === “inv”     && <InvBody item={item} />}
</div>
<div className="pftr">
{popup.type === “wo” && (
<>
<div>{!locked && <button className="btn-d" onClick={handleCancel}>Cancel Order</button>}</div>
<div className="pftr-r">
{canEdit && !editing && <button className=“btn-g” onClick={() => setEditing(true)}>Edit</button>}
{editing && <button className=“btn-g” onClick={() => setEditing(false)}>Discard</button>}
{editing && <button className="btn-p" onClick={handleSave} disabled={saving}>{saving ? “Saving…” : “Save”}</button>}
{canComplete && !editing && <button className="btn-p" onClick={handleComplete}>Mark Complete</button>}
</div>
</>
)}
{(popup.type === “inquiry” || popup.type === “sr”) && <span className="fnote">Read-only · Reply via Chat</span>}
{popup.type === “inv” && <span className="fnote">Read-only · Stripe verified</span>}
</div>
</div>
</div>
);
}

// ── Mobile Popup ──────────────────────────────────────────────
function MobilePopupPage({ popup, user, adminInfo, onClose, onWOUpdate, session }) {
const [editing, setEditing] = useState(false);
const [form, setForm] = useState(popup?.item ? { …popup.item } : {});
const [saving, setSaving] = useState(false);
const [photoUrl, setPhotoUrl] = useState(null);
const upd = (k, v) => setForm(p => ({ …p, [k]: v }));

useEffect(() => {
if (!popup) return;
async function fetchPhoto() {
const path = popup.item?.photo_url;
if (!path) return;
const bucket = popup.type === “inquiry” ? “account-inquiry-photos” : “ChatUploads”;
const { data } = await supabase.storage.from(bucket).createSignedUrl(path, 3600);
if (data?.signedUrl) setPhotoUrl(data.signedUrl);
}
fetchPhoto();
}, [popup]);

if (!popup) return null;
const item = popup.item;
const canEdit     = item?.status === “CREATED”;
const canComplete = item?.status === “ACCEPTED”;
const locked      = item?.status === “COMPLETED” || item?.status === “CANCELLED”;

async function handleSave() {
setSaving(true);
await supabase.from(“work_orders”).update({
title: form.title, service_type: form.service_type,
gem_type: form.gem_type,
estimated_price: form.estimated_price ? parseFloat(form.estimated_price) : null,
description: form.description, notes: form.notes,
edit_history: […(item.edit_history || []), { edited_at: new Date().toISOString(), admin_id: session.user.id, changes: {} }]
}).eq(“work_order_id”, item.work_order_id);
setSaving(false);
onWOUpdate();
setEditing(false);
onClose();
}

async function handleComplete() {
await supabase.from(“work_orders”).update({ status: “COMPLETED”, completed_at: new Date().toISOString() }).eq(“work_order_id”, item.work_order_id);
onWOUpdate();
onClose();
}

async function handleCancel() {
await supabase.from(“work_orders”).update({ status: “CANCELLED”, cancelled_at: new Date().toISOString() }).eq(“work_order_id”, item.work_order_id);
onWOUpdate();
onClose();
}

return (
<div className="m-popup-page">
<div className="m-popup-hdr">
<div className="m-popup-title">
{popup.type === “inquiry” && “Product Inquiry”}
{popup.type === “sr”      && “Service Request”}
{popup.type === “wo”      && “Work Order”}
{popup.type === “inv”     && “Invoice”}
</div>
<div className="m-popup-hdr-r">
{popup.type === “wo”  && <Pill status={item.status} />}
{popup.type === “inv” && <Pill status="PAID" />}
<button className=“btn-ex” style={{ fontSize: “8px”, padding: “5px 9px” }}>
{popup.type === “inquiry” || popup.type === “sr” ? “TXT” : “PDF”}
</button>
<button className="pclose" onClick={onClose}>×</button>
</div>
</div>
<div className="m-popup-body">
{popup.type === “inquiry” && <InquiryBody item={item} user={user} photoUrl={photoUrl} />}
{popup.type === “sr”      && <SRBody item={item} photoUrl={photoUrl} />}
{popup.type === “wo”      && <WOBody item={item} user={user} adminInfo={adminInfo} editing={editing && canEdit} form={form} upd={upd} />}
{popup.type === “inv”     && <InvBody item={item} />}
</div>
{popup.type === “wo” && (
<div className="m-popup-ftr">
{!locked && <button className="btn-d" onClick={handleCancel}>Cancel</button>}
{canEdit && !editing && <button className=“btn-g” onClick={() => setEditing(true)}>Edit</button>}
{editing && <button className=“btn-g” onClick={() => setEditing(false)}>Discard</button>}
{editing && <button className="btn-p" onClick={handleSave} disabled={saving}>{saving ? “Saving…” : “Save”}</button>}
{canComplete && !editing && <button className="btn-p" onClick={handleComplete}>Mark Complete</button>}
</div>
)}
</div>
);
}

// ── Chat Widget (Desktop) ─────────────────────────────────────
function ChatWidget({ user, messages, chatThread, onMessageSent, session }) {
const [collapsed, setCollapsed]   = useState(false);
const [posX, setPosX]             = useState(40);
const [chatMsg, setChatMsg]       = useState(””);
const [sending, setSending]       = useState(false);
const [uploadFile, setUploadFile] = useState(null);
const dragging     = useRef(false);
const dragStartX   = useRef(0);
const dragStartPos = useRef(0);
const endRef       = useRef(null);
const fileRef      = useRef(null);

useEffect(() => {
if (!collapsed) endRef.current?.scrollIntoView({ behavior: “smooth” });
}, [messages, collapsed]);

// Mark admin unread cleared when chat expands
useEffect(() => {
if (!collapsed && chatThread) {
supabase.from(“chat_threads”)
.update({ admin_has_unread: false })
.eq(“chat_thread_id”, chatThread.chat_thread_id);
}
}, [collapsed, chatThread]);

const onMouseDown = useCallback((e) => {
if (e.target.closest(“button”) || e.target.closest(“input”) || e.target.closest(“label”)) return;
dragging.current = true;
dragStartX.current = e.clientX;
dragStartPos.current = posX;
document.body.style.cursor = “grabbing”;
e.preventDefault();
}, [posX]);

useEffect(() => {
function onMove(e) {
if (!dragging.current) return;
const newX = dragStartPos.current + (e.clientX - dragStartX.current);
setPosX(Math.max(8, Math.min(newX, window.innerWidth - CHAT_W - 8)));
}
function onUp() { dragging.current = false; document.body.style.cursor = “”; }
window.addEventListener(“mousemove”, onMove);
window.addEventListener(“mouseup”, onUp);
return () => { window.removeEventListener(“mousemove”, onMove); window.removeEventListener(“mouseup”, onUp); };
}, []);

async function send() {
if (!chatMsg.trim() && !uploadFile) return;
if (!chatThread) return;
setSending(true);

```
let uploadedUrl  = null;
let uploadedMime = null;

// Upload file to ChatUploads if attached
if (uploadFile) {
  const { data } = await supabase.storage
    .from("ChatUploads")
    .upload(`admin/${Date.now()}_${uploadFile.name}`, uploadFile, { contentType: uploadFile.type });
  if (data) { uploadedUrl = data.path; uploadedMime = uploadFile.type; }
}

// Insert message — actor/actor_id (not sender_type/sender_id)
await supabase.from("chat_messages").insert({
  chat_thread_id:  chatThread.chat_thread_id,
  actor:           "ADMIN",
  actor_id:        session.user.id,
  body:            chatMsg.trim() || null,
  attachment_url:  uploadedUrl,
  attachment_type: uploadedMime,
});

// Notify user of new admin message via SMS if opt_in_chat = true
await supabase.functions.invoke("send-user-notification", {
  body: { event_type: "chat", user_id: chatThread.account_user_id }
});

// Mark thread: user has unread, admin does not
await supabase.from("chat_threads").update({
  admin_has_unread:   false,
  account_has_unread: true,
}).eq("chat_thread_id", chatThread.chat_thread_id);

setChatMsg("");
setUploadFile(null);
setSending(false);
onMessageSent();
```

}

const unreadCount = messages.filter(m => m.actor === “ACCOUNT”).length; // approximate indicator

return (
<div className=“chat-widget” style={{ left: posX, width: CHAT_W, height: collapsed ? CHAT_H_COLLAPSED : CHAT_H_EXPANDED }}>
<div className="chat-handle" onMouseDown={onMouseDown}>
<div className="chat-handle-left">
<div className="chat-av">{user?.name?.[0] || “?”}</div>
<div className="chat-uname">{user?.name}</div>
</div>
<div className="chat-handle-right">
{chatThread?.admin_has_unread && !collapsed && <span className="nbadge">!</span>}
<button className=“chat-toggle-btn” onClick={() => setCollapsed(p => !p)}>{collapsed ? “↑” : “↓”}</button>
</div>
</div>
{!collapsed && (
<>
<div className="chat-msgs">
{messages.map((m, i) => (
<div key={m.chat_message_id || i} className={`msg ${m.actor === "ADMIN" ? "admin" : "account"}`}>
<div className="bubble">{m.body}</div>
{/* Attachment rendering */}
{m.attachment_url && m.attachment_type?.startsWith(“image/”) && (
<img src={m.attachment_url} alt=”” style={{ maxWidth: 140, marginTop: 6, borderRadius: 3, cursor: “pointer” }} onClick={() => window.open(m.attachment_url)} />
)}
{m.attachment_url && m.attachment_type === “application/pdf” && (
<a href={m.attachment_url} target=”_blank” rel=“noreferrer” style={{ fontSize: 10, color: “var(–gl)”, marginTop: 4, display: “block” }}>📄 PDF</a>
)}
<div className="msg-t">{fmtTime(m.created_at)}</div>
</div>
))}
<div ref={endRef} />
</div>
<div className="chat-input-row">
{/* File attachment */}
<button className=“cfile-btn” onClick={() => fileRef.current?.click()} title=“Attach file”>📎</button>
<input ref={fileRef} type=“file” accept=”.jpg,.jpeg,.png,.tiff,.tif,.dng,.heic,.pdf” style={{ display: “none” }} onChange={e => setUploadFile(e.target.files?.[0] || null)} />
<input
className=“cinput”
placeholder={uploadFile ? `+ ${uploadFile.name}` : “Message…”}
value={chatMsg}
onChange={e => setChatMsg(e.target.value)}
onKeyDown={e => e.key === “Enter” && !e.shiftKey && send()}
/>
<button className="csend" onClick={send} disabled={sending}>{sending ? “…” : “Send”}</button>
</div>
</>
)}
</div>
);
}

// ── Mobile Menu ───────────────────────────────────────────────
function MobileMenu({ activePage, onSelect, onClose, user, notifs, onBack }) {
const items = [
{ id: “inquiries”,  label: “Inquiries”,      notif: notifs.inquiries + notifs.servicereqs },
{ id: “workorders”, label: “Work Orders”,     notif: notifs.workorders },
{ id: “invoices”,   label: “Invoices”,        notif: 0 },
{ id: “chat”,       label: “Chat”,            notif: notifs.chat },
{ id: “userinfo”,   label: “User Info”,       notif: 0 },
];
return (
<div className="m-menu-overlay" onClick={onClose}>
<div className=“m-menu” onClick={e => e.stopPropagation()}>
<div className="m-menu-hdr">
<div className="m-menu-name">{user?.name || “—”}</div>
{user?.business_name && <div className="m-menu-meta">{user.business_name}</div>}
</div>
<div className="m-menu-items">
{items.map(item => (
<button key={item.id} className={`m-menu-item ${activePage === item.id ? "on" : ""}`} onClick={() => { onSelect(item.id); onClose(); }}>
<div className="m-menu-item-label">{item.label}</div>
{item.notif > 0 && <span className="nbadge">{item.notif}</span>}
</button>
))}
</div>
<button className="m-menu-back" onClick={onBack}>
<span className="m-menu-back-arrow">←</span>
<span className="m-menu-back-label">Back to User List</span>
</button>
</div>
</div>
);
}

// ── Dashboard Tab (center panel landing view) ─────────────────
function DashboardTab({ user, inquiries, serviceRequests, workOrders, invoices, onEditUser }) {
const totalInvoiced = invoices.reduce((sum, inv) => sum + (inv.total_amount || 0), 0);
const statusColor = user?.status === “ACTIVE”
? { bg: “rgba(90,150,90,0.1)”, color: “#7ec87e” }
: { bg: “rgba(168,64,64,0.1)”, color: “#c07070” };

return (
<div className="dash-body">
{/* Left — account info */}
<div className="dash-card">
<div className="dash-card-title">
Account Info
<button className="btn-g dash-edit-btn" onClick={onEditUser}>Edit</button>
</div>
{[
{ label: “Name”,    value: user?.name,             serif: true },
{ label: “Email”,   value: user?.email },
{ label: “Phone”,   value: user?.phone || “—” },
{ label: “Address”, value: user?.shipping_address || “—” },
{ label: “Business”,value: user?.business_name || “—” },
{ label: “Member Since”, value: fmtDate(user?.created_at) },
].map(({ label, value, serif }) => (
<div key={label} className="dash-field">
<div className="dash-label">{label}</div>
<div className={`dash-value${serif ? " serif" : ""}`}>{value}</div>
</div>
))}
<div className="dash-field">
<div className="dash-label">Status</div>
<span className=“pill” style={{ background: statusColor.bg, color: statusColor.color }}>{user?.status}</span>
</div>
</div>
{/* Right — activity stats */}
<div className=“dash-card” style={{ maxWidth: 260 }}>
<div className="dash-card-title">Activity</div>
<div className="stat-grid">
<div className="stat-card">
<div className="stat-val">{workOrders.length}</div>
<div className="stat-lbl">Work Orders</div>
</div>
<div className="stat-card">
{/* total_amount is dollars — fmtMoney directly */}
<div className=“stat-val” style={{ fontSize: 16 }}>{fmtMoney(totalInvoiced)}</div>
<div className="stat-lbl">Total Invoiced</div>
</div>
<div className="stat-card">
<div className="stat-val">{inquiries.length}</div>
<div className="stat-lbl">Inquiries</div>
</div>
<div className="stat-card">
<div className="stat-val">{serviceRequests.length}</div>
<div className="stat-lbl">Service Requests</div>
</div>
</div>
</div>
</div>
);
}

// ── User Edit Popup ───────────────────────────────────────────
function UserEditPopup({ user, accountUserId, onClose, onSaved }) {
const [form, setForm] = useState({
name:             user?.name || “”,
email:            user?.email || “”,
phone:            user?.phone || “”,
shipping_address: user?.shipping_address || “”,
business_name:    user?.business_name || “”,
status:           user?.status || “ACTIVE”,
});
const [saving, setSaving] = useState(false);
const upd = (k, v) => setForm(p => ({ …p, [k]: v }));

async function handleSave() {
setSaving(true);
await supabase.from(“account_users”).update(form).eq(“account_user_id”, accountUserId);
// Note: changes affect future PDFs only — past invoices are frozen in account_snapshot
setSaving(false);
onSaved(form);
onClose();
}

return (
<div className="pov" onClick={onClose}>
<div className=“popup” onClick={e => e.stopPropagation()}>
<div className="phdr">
<div className="ptitle">Edit User</div>
<button className="pclose" onClick={onClose}>×</button>
</div>
<div className="pbod">
{[
{ label: “Name”,             k: “name” },
{ label: “Email”,            k: “email” },
{ label: “Phone”,            k: “phone” },
{ label: “Business Name”,    k: “business_name” },
].map(({ label, k }) => (
<div key={k} className="awo-field">
<label className="awo-label">{label}</label>
<input className=“efield” value={form[k]} onChange={e => upd(k, e.target.value)} />
</div>
))}
<div className="awo-field">
<label className="awo-label">Shipping Address</label>
<textarea className=“etarea” value={form.shipping_address} onChange={e => upd(“shipping_address”, e.target.value)} />
</div>
<div className="awo-field">
<label className="awo-label">Status</label>
<select className=“awo-select” value={form.status} onChange={e => upd(“status”, e.target.value)}>
<option value="ACTIVE">ACTIVE</option>
<option value="SUSPENDED">SUSPENDED</option>
</select>
</div>
</div>
<div className="pftr">
<button className="btn-g" onClick={onClose}>Cancel</button>
<button className="btn-p" onClick={handleSave} disabled={saving}>{saving ? “Saving…” : “Save Changes”}</button>
</div>
</div>
</div>
);
}

// ── Root Component ────────────────────────────────────────────
export default function AccountUserDashboardAdminSide({ accountUserId, onBack }) {
const isMobile = useIsMobile();

// ── Auth session
const [session, setSession] = useState(null);
useEffect(() => {
supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
}, []);

// ── Data state
const [user, setUser]                   = useState(null);
const [adminInfo, setAdminInfo]         = useState(null);
const [inquiries, setInquiries]         = useState([]);
const [serviceRequests, setSR]          = useState([]);
const [workOrders, setWorkOrders]       = useState([]);
const [invoices, setInvoices]           = useState([]);
const [messages, setMessages]           = useState([]);
const [chatThread, setChatThread]       = useState(null);
const [loading, setLoading]             = useState(true);
const [error, setError]                 = useState(null);

// ── UI state
const [activeNav, setActiveNav]           = useState(“dashboard”);
const [leftTab, setLeftTab]               = useState(“inquiries”);
const [rightTab, setRightTab]             = useState(“workorders”);
const [popup, setPopup]                   = useState(null);
const [showAddWO, setShowAddWO]           = useState(false);
const [showEditUser, setShowEditUser]     = useState(false);
const [showUserHover, setShowUserHover]   = useState(false);
const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
const [activeMobilePage, setActiveMobilePage] = useState(“inquiries”);
const [mobilePopup, setMobilePopup]       = useState(null);
const [selInq, setSelInq]                 = useState([]);
const [selSR, setSelSR]                   = useState([]);
const [mobileChatMsg, setMobileChatMsg]   = useState(””);

// ── Load all data
useEffect(() => {
if (!accountUserId) return;
async function load() {
setLoading(true);
try {
const [
{ data: userData },
{ data: adminData },
{ data: inqData },
{ data: srData },
{ data: woData },
{ data: invData },
{ data: threadData },
] = await Promise.all([
supabase.from(“account_users”).select(”*”).eq(“account_user_id”, accountUserId).single(),
supabase.from(“admin_users”).select(”*”).single(),
supabase.from(“account_inquiries”).select(”*”).eq(“account_user_id”, accountUserId).order(“created_at”, { ascending: false }),
supabase.from(“service_requests”).select(”*”).eq(“account_user_id”, accountUserId).order(“created_at”, { ascending: false }),
supabase.from(“work_orders”).select(”*”).eq(“account_user_id”, accountUserId).order(“created_at”, { ascending: false }),
supabase.from(“invoices”).select(”*”).eq(“account_user_id”, accountUserId).order(“paid_at”, { ascending: false }),
supabase.from(“chat_threads”).select(”*”).eq(“account_user_id”, accountUserId).single(),
]);
setUser(userData);
setAdminInfo(adminData);
setInquiries(inqData || []);
setSR(srData || []);
setWorkOrders(woData || []);
setInvoices(invData || []);
setChatThread(threadData);

```
    // Load messages if thread exists
    if (threadData) {
      const { data: msgData } = await supabase
        .from("chat_messages")
        .select("*")
        .eq("chat_thread_id", threadData.chat_thread_id)
        .order("created_at", { ascending: true });
      setMessages(msgData || []);

      // Mark admin unread cleared on page load (desktop — chat always visible)
      if (!isMobile) {
        await supabase.from("chat_threads")
          .update({ admin_has_unread: false })
          .eq("chat_thread_id", threadData.chat_thread_id);
      }
    }
  } catch (e) {
    setError(e.message);
  }
  setLoading(false);
}
load();
```

}, [accountUserId]);

// ── Realtime chat subscription
useEffect(() => {
if (!chatThread) return;
const sub = supabase
.channel(“chat-” + chatThread.chat_thread_id)
.on(“postgres_changes”, {
event: “INSERT”, schema: “public”, table: “chat_messages”,
filter: `chat_thread_id=eq.${chatThread.chat_thread_id}`,
}, payload => {
setMessages(p => […p, payload.new]);
})
.subscribe();
return () => sub.unsubscribe();
}, [chatThread]);

// ── Mark inquiry read on open
async function openInquiry(inq) {
setPopup({ type: “inquiry”, item: inq });
if (!inq.is_read) {
await supabase.from(“account_inquiries”)
.update({ is_read: true, read_at: new Date().toISOString() })
.eq(“account_inquiry_id”, inq.account_inquiry_id);
setInquiries(p => p.map(i => i.account_inquiry_id === inq.account_inquiry_id ? { …i, is_read: true } : i));
}
}

// ── Mark SR read on open
async function openSR(sr) {
setPopup({ type: “sr”, item: sr });
if (!sr.is_read) {
await supabase.from(“service_requests”)
.update({ is_read: true, read_at: new Date().toISOString() })
.eq(“service_request_id”, sr.service_request_id);
setSR(p => p.map(i => i.service_request_id === sr.service_request_id ? { …i, is_read: true } : i));
}
}

// ── Bulk mark read
async function bulkMarkInqRead() {
const ids = selInq;
await supabase.from(“account_inquiries”).update({ is_read: true, read_at: new Date().toISOString() }).in(“account_inquiry_id”, ids);
setInquiries(p => p.map(i => ids.includes(i.account_inquiry_id) ? { …i, is_read: true } : i));
setSelInq([]);
}
async function bulkMarkSRRead() {
const ids = selSR;
await supabase.from(“service_requests”).update({ is_read: true, read_at: new Date().toISOString() }).in(“service_request_id”, ids);
setSR(p => p.map(i => ids.includes(i.service_request_id) ? { …i, is_read: true } : i));
setSelSR([]);
}

// ── Reload work orders after create/update
async function reloadWO() {
const { data } = await supabase.from(“work_orders”).select(”*”).eq(“account_user_id”, accountUserId).order(“created_at”, { ascending: false });
setWorkOrders(data || []);
}

// ── Mobile chat send
async function mobileSend() {
if (!mobileChatMsg.trim() || !chatThread || !session) return;
await supabase.from(“chat_messages”).insert({
chat_thread_id: chatThread.chat_thread_id,
actor:          “ADMIN”,
actor_id:       session.user.id,
body:           mobileChatMsg.trim(),
attachment_url:  null,
attachment_type: null,
});
await supabase.functions.invoke(“send-user-notification”, {
body: { event_type: “chat”, user_id: accountUserId }
});
await supabase.from(“chat_threads”).update({
admin_has_unread: false, account_has_unread: true,
}).eq(“chat_thread_id”, chatThread.chat_thread_id);
setMobileChatMsg(””);
}

// ── Notification dot counts
const notifs = {
inquiries:   inquiries.filter(i => !i.is_read).length,
servicereqs: serviceRequests.filter(i => !i.is_read).length,
workorders:  workOrders.filter(w => w.status === “CREATED”).length,
chat:        chatThread?.admin_has_unread ? 1 : 0,
};
const totalNotifs = notifs.inquiries + notifs.servicereqs + notifs.workorders + notifs.chat;

if (loading) return <><style>{css}</style><div className="page"><div className="loading-state">Loading…</div></div></>;
if (error)   return <><style>{css}</style><div className="page"><div className="error-state">{error}</div></div></>;

// ── Desktop nav handler
function handleNav(id) {
setActiveNav(id);
if (id === “inquiries” || id === “servicerequests”) setLeftTab(id === “servicerequests” ? “servicerequests” : “inquiries”);
if (id === “workorders” || id === “invoices”) setRightTab(id);
}

const showLeft  = activeNav === “inquiries” || activeNav === “servicerequests”;
const showRight = activeNav === “workorders” || activeNav === “invoices”;
const showDash  = activeNav === “dashboard”;

const navItems = [
{ id: “dashboard”,        label: “Dashboard”,        notif: 0 },
{ id: “inquiries”,        label: “Inquiries”,        notif: notifs.inquiries },
{ id: “servicerequests”,  label: “Service Requests”, notif: notifs.servicereqs },
{ id: “workorders”,       label: “Work Orders”,      notif: notifs.workorders },
{ id: “invoices”,         label: “Invoices”,         notif: 0 },
];

// ── Mobile view
if (isMobile) {
const pageLabel = {
inquiries: “Inquiries”, workorders: “Work Orders”,
invoices: “Invoices”, chat: “Chat”, userinfo: “User Info”,
}[activeMobilePage] || “”;

```
return (
  <>
    <style>{css}</style>
    <div className="m-page">
      <div className="m-topbar">
        <div className="m-crumb">{pageLabel}</div>
        <button className="m-menu-btn" onClick={() => setMobileDrawerOpen(true)}>
          <div className="bar" /><div className="bar" /><div className="bar" />
          {totalNotifs > 0 && <span className="m-menu-total">{totalNotifs}</span>}
        </button>
      </div>

      <div className="m-content">
        {activeMobilePage === "inquiries" && (
          <div className="m-list-page">
            <div className="m-section-label">Inquiries</div>
            {inquiries.length === 0 && <div style={{ padding: "24px 18px", color: "var(--d2)", fontSize: 11 }}>No inquiries</div>}
            {inquiries.map(inq => (
              <div key={inq.account_inquiry_id} className="m-row" onClick={() => { setMobilePopup({ type: "inquiry", item: inq }); openInquiry(inq); }}>
                <div className="m-row-id">{inq.account_inquiry_id}</div>
                <span className="m-row-date">{fmtDate(inq.created_at)}</span>
                {!inq.is_read && <div className="m-row-udot" />}
                <span className="m-row-chevron">›</span>
              </div>
            ))}
            <div className="m-section-label" style={{ marginTop: 8 }}>Service Requests</div>
            {serviceRequests.length === 0 && <div style={{ padding: "24px 18px", color: "var(--d2)", fontSize: 11 }}>No service requests</div>}
            {serviceRequests.map(sr => (
              <div key={sr.service_request_id} className="m-row" onClick={() => { setMobilePopup({ type: "sr", item: sr }); openSR(sr); }}>
                <div className="m-row-id">{sr.service_request_id}</div>
                <span className="m-row-date">{fmtDate(sr.created_at)}</span>
                {!sr.is_read && <div className="m-row-udot" />}
                <span className="m-row-chevron">›</span>
              </div>
            ))}
          </div>
        )}

        {activeMobilePage === "workorders" && (
          <div className="m-list-page">
            <div style={{ padding: "12px 18px", display: "flex", justifyContent: "flex-end" }}>
              <button className="btn-awo" onClick={() => setShowAddWO(true)}>+ Add Work Order</button>
            </div>
            {workOrders.length === 0 && <div style={{ padding: "24px 18px", color: "var(--d2)", fontSize: 11 }}>No work orders</div>}
            {workOrders.map(wo => (
              <div key={wo.work_order_id} className="m-row" onClick={() => setMobilePopup({ type: "wo", item: wo })}>
                <div className="m-row-id">{wo.work_order_id}</div>
                <Pill status={wo.status} />
                <span className="m-row-date" style={{ marginLeft: 8 }}>{fmtDate(wo.created_at)}</span>
                <span className="m-row-chevron">›</span>
              </div>
            ))}
          </div>
        )}

        {activeMobilePage === "invoices" && (
          <div className="m-list-page">
            {invoices.length === 0 && <div style={{ padding: "24px 18px", color: "var(--d2)", fontSize: 11 }}>No invoices</div>}
            {invoices.map(inv => (
              <div key={inv.invoice_id} className="m-row" onClick={() => setMobilePopup({ type: "inv", item: inv })}>
                <div className="m-row-id">{inv.invoice_id}</div>
                <Pill status="PAID" />
                <span className="m-row-date" style={{ marginLeft: 8 }}>{fmtDate(inv.paid_at)}</span>
                <span className="m-row-chevron">›</span>
              </div>
            ))}
          </div>
        )}

        {activeMobilePage === "chat" && (
          <div className="m-chat">
            <div className="m-chat-msgs">
              {messages.map((m, i) => (
                <div key={m.chat_message_id || i} className={`msg ${m.actor === "ADMIN" ? "admin" : "account"}`}>
                  <div className="bubble">{m.body}</div>
                  <div className="msg-t">{fmtTime(m.created_at)}</div>
                </div>
              ))}
            </div>
            <div className="m-chat-input">
              <input className="m-cinput" placeholder="Message…" value={mobileChatMsg} onChange={e => setMobileChatMsg(e.target.value)} onKeyDown={e => e.key === "Enter" && mobileSend()} />
              <button className="m-csend" onClick={mobileSend}>Send</button>
            </div>
          </div>
        )}

        {activeMobilePage === "userinfo" && (
          <div className="m-user-info">
            <div className="m-info-section"><div className="m-info-label">Name</div><div className="m-info-value serif">{user?.name}</div></div>
            {user?.business_name && <div className="m-info-section"><div className="m-info-label">Business</div><div className="m-info-value">{user.business_name}</div></div>}
            <div className="m-info-section"><div className="m-info-label">Email</div><div className="m-info-value">{user?.email}</div></div>
            <div className="m-info-section"><div className="m-info-label">Phone</div><div className="m-info-value">{user?.phone || "—"}</div></div>
            <div className="m-info-section"><div className="m-info-label">Address</div><div className="m-info-value">{user?.shipping_address || "—"}</div></div>
            <div className="m-info-section"><div className="m-info-label">Member Since</div><div className="m-info-value">{fmtDate(user?.created_at)}</div></div>
            <div className="m-info-section"><div className="m-info-label">Status</div><Pill status={user?.status} /></div>
          </div>
        )}
      </div>

      {mobileDrawerOpen && (
        <MobileMenu
          activePage={activeMobilePage}
          onSelect={setActiveMobilePage}
          onClose={() => setMobileDrawerOpen(false)}
          user={user}
          notifs={notifs}
          onBack={onBack}
        />
      )}

      {mobilePopup && (
        <MobilePopupPage
          popup={mobilePopup}
          user={user}
          adminInfo={adminInfo}
          onClose={() => setMobilePopup(null)}
          onWOUpdate={reloadWO}
          session={session}
        />
      )}

      {showAddWO && session && (
        <AddWOPopup
          accountUserId={accountUserId}
          onClose={() => setShowAddWO(false)}
          onCreated={reloadWO}
          session={session}
        />
      )}
    </div>
  </>
);
```

}

// ── Desktop view
return (
<>
<style>{css}</style>
<div className="page">

```
    {/* Top Nav */}
    <div className="d-tnav">
      <button className="d-back" onClick={onBack}>← Back</button>
      {/* User name — hover shows popover, click opens edit */}
      <div
        className="d-crumb"
        onMouseEnter={() => setShowUserHover(true)}
        onMouseLeave={() => setShowUserHover(false)}
        onClick={() => setShowEditUser(true)}
      >
        <span className="d-crumb-sub">User</span>
        {user?.name}
        {showUserHover && (
          <div className="user-hover-pop">
            {[
              { label: "Name",    value: user?.name },
              { label: "Email",   value: user?.email },
              { label: "Phone",   value: user?.phone || "—" },
              { label: "Address", value: user?.shipping_address || "—" },
              { label: "Business",value: user?.business_name || "—" },
              { label: "Status",  value: user?.status },
            ].map(({ label, value }) => (
              <div key={label} className="uhp-row">
                <div className="uhp-label">{label}</div>
                <div className="uhp-value">{value}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {navItems.map(t => (
        <button key={t.id} className={`d-ntab ${activeNav === t.id ? "on" : ""}`} onClick={() => handleNav(t.id)}>
          {t.label}
          {t.notif > 0 && <span className="nbadge">{t.notif}</span>}
        </button>
      ))}
    </div>

    {/* Body */}
    <div className="d-body">

      {/* Left Panel — Inquiries / Service Requests */}
      <div className={`d-lpanel ${!showLeft ? "hidden" : ""}`}>
        <div className="d-phead">
          <div className="d-ptabs">
            <button className={`d-ptab ${leftTab === "inquiries" ? "on" : ""}`} onClick={() => setLeftTab("inquiries")}>
              Inquiries {notifs.inquiries > 0 && <span className="nbadge">{notifs.inquiries}</span>}
            </button>
            <button className={`d-ptab ${leftTab === "servicerequests" ? "on" : ""}`} onClick={() => setLeftTab("servicerequests")}>
              Svc Req. {notifs.servicereqs > 0 && <span className="nbadge">{notifs.servicereqs}</span>}
            </button>
          </div>
        </div>

        {/* Bulk actions */}
        {leftTab === "inquiries" && selInq.length > 0 && (
          <div className="d-bulk">
            <span className="d-bulk-ct">{selInq.length} selected</span>
            <button className="bbtn" onClick={bulkMarkInqRead}>Mark Read</button>
            <button className="bbtn">Export TXT</button>
          </div>
        )}
        {leftTab === "servicerequests" && selSR.length > 0 && (
          <div className="d-bulk">
            <span className="d-bulk-ct">{selSR.length} selected</span>
            <button className="bbtn" onClick={bulkMarkSRRead}>Mark Read</button>
            <button className="bbtn">Export TXT</button>
          </div>
        )}

        <div className="d-pbody">
          {leftTab === "inquiries" && (
            inquiries.length === 0
              ? <div className="d-pempty">No inquiries</div>
              : inquiries.map(inq => (
                <div key={inq.account_inquiry_id} className="d-row" onClick={() => openInquiry(inq)}>
                  <input type="checkbox" checked={selInq.includes(inq.account_inquiry_id)} onClick={e => e.stopPropagation()}
                    onChange={e => setSelInq(p => e.target.checked ? [...p, inq.account_inquiry_id] : p.filter(x => x !== inq.account_inquiry_id))} />
                  <span className="row-id">{inq.account_inquiry_id}</span>
                  <span className="row-date">{fmtDate(inq.created_at)}</span>
                  {!inq.is_read && <div className="udot" />}
                </div>
              ))
          )}
          {leftTab === "servicerequests" && (
            serviceRequests.length === 0
              ? <div className="d-pempty">No service requests</div>
              : serviceRequests.map(sr => (
                <div key={sr.service_request_id} className="d-row" onClick={() => openSR(sr)}>
                  <input type="checkbox" checked={selSR.includes(sr.service_request_id)} onClick={e => e.stopPropagation()}
                    onChange={e => setSelSR(p => e.target.checked ? [...p, sr.service_request_id] : p.filter(x => x !== sr.service_request_id))} />
                  <span className="row-id">{sr.service_request_id}</span>
                  <span className="row-date">{fmtDate(sr.created_at)}</span>
                  {!sr.is_read && <div className="udot" />}
                </div>
              ))
          )}
        </div>
      </div>

      {/* Center — Dashboard */}
      <div className="d-center">
        {showDash && (
          <DashboardTab
            user={user}
            inquiries={inquiries}
            serviceRequests={serviceRequests}
            workOrders={workOrders}
            invoices={invoices}
            onEditUser={() => setShowEditUser(true)}
          />
        )}
      </div>

      {/* Right Panel — Work Orders / Invoices */}
      <div className={`d-rpanel ${!showRight ? "hidden" : ""}`}>
        <div className="d-phead">
          <div className="d-ptabs">
            <button className={`d-ptab ${rightTab === "workorders" ? "on" : ""}`} onClick={() => setRightTab("workorders")}>
              Work Orders {notifs.workorders > 0 && <span className="nbadge">{notifs.workorders}</span>}
            </button>
            <button className={`d-ptab ${rightTab === "invoices" ? "on" : ""}`} onClick={() => setRightTab("invoices")}>
              Invoices
            </button>
          </div>
        </div>
        {rightTab === "workorders" && (
          <div className="d-paction">
            <button className="btn-awo" onClick={() => setShowAddWO(true)}>+ Add</button>
          </div>
        )}
        <div className="d-pbody">
          {rightTab === "workorders" && (
            workOrders.length === 0
              ? <div className="d-pempty">No work orders</div>
              : workOrders.map(wo => (
                <div key={wo.work_order_id} className="d-row" onClick={() => setPopup({ type: "wo", item: wo })}>
                  <span className="row-id">{wo.work_order_id}</span>
                  <div className="row-pill"><Pill status={wo.status} /></div>
                  <span className="row-date">{fmtDate(wo.created_at)}</span>
                </div>
              ))
          )}
          {rightTab === "invoices" && (
            invoices.length === 0
              ? <div className="d-pempty">No invoices</div>
              : invoices.map(inv => (
                <div key={inv.invoice_id} className="d-row" onClick={() => setPopup({ type: "inv", item: inv })}>
                  <span className="row-id">{inv.invoice_id}</span>
                  {/* line_items[0].title — never join to products table */}
                  <span className="row-id" style={{ color: "var(--d1)", fontSize: 10 }}>{inv.line_items?.[0]?.title}</span>
                  <div className="row-pill"><Pill status="PAID" /></div>
                  <span className="row-date">{fmtDate(inv.paid_at)}</span>
                </div>
              ))
          )}
        </div>
      </div>
    </div>

    {/* Draggable Chat Widget — always present on desktop */}
    {chatThread && session && (
      <ChatWidget
        user={user}
        messages={messages}
        chatThread={chatThread}
        onMessageSent={() => {}}
        session={session}
      />
    )}

    {/* Popups */}
    {popup && (
      <DesktopPopup
        popup={popup}
        user={user}
        adminInfo={adminInfo}
        onClose={() => setPopup(null)}
        onWOUpdate={reloadWO}
        session={session}
      />
    )}

    {showAddWO && session && (
      <AddWOPopup
        accountUserId={accountUserId}
        onClose={() => setShowAddWO(false)}
        onCreated={reloadWO}
        session={session}
      />
    )}

    {showEditUser && (
      <UserEditPopup
        user={user}
        accountUserId={accountUserId}
        onClose={() => setShowEditUser(false)}
        onSaved={(updated) => setUser(u => ({ ...u, ...updated }))}
      />
    )}
  </div>
</>
```

);
}