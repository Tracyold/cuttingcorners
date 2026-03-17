// @ts-nocheck
import { useState, useRef, useEffect, useCallback, createContext, useContext } from "react";

/* ─── Contexts ────────────────────────────────────────────── */
const PrintCtx  = createContext(false);
const PanelCtx  = createContext(null); // { open, setOpen, afterId, setAfterId }

/* ─── Palette ─────────────────────────────────────────────── */
const C = {
  ink:       '#0f1f3d', inkMid: '#2c3e5e', inkSoft: '#5a6a82',
  rule:      '#b0bdd0', ruleLight: '#dce3ed',
  parchment: '#ffffff', warm: '#f0f3f8',
  gold:      '#1a3560', goldLight: '#2e5299',
};

/* ─── uid helper ──────────────────────────────────────────── */
const uid = () => `s_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

/* ─── Component catalogue ─────────────────────────────────── */
const CATALOGUE = [
  {
    type: "table",
    label: "Table",
    desc: "Editable rows & columns with custom labels",
    thumb: (
      <svg viewBox="0 0 80 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="4" width="72" height="48" rx="1" stroke={C.rule} strokeWidth="1"/>
        <line x1="4" y1="16" x2="76" y2="16" stroke={C.rule} strokeWidth="1"/>
        <line x1="4" y1="28" x2="76" y2="28" stroke={C.rule} strokeWidth="0.5"/>
        <line x1="4" y1="40" x2="76" y2="40" stroke={C.rule} strokeWidth="0.5"/>
        <line x1="28" y1="4" x2="28" y2="52" stroke={C.rule} strokeWidth="0.5"/>
        <line x1="52" y1="4" x2="52" y2="52" stroke={C.rule} strokeWidth="0.5"/>
        <rect x="4" y="4" width="72" height="12" fill={C.warm}/>
        <line x1="4" y1="16" x2="76" y2="16" stroke={C.rule} strokeWidth="1"/>
      </svg>
    ),
    make: () => ({
      id: uid(), num: "", title: "New Table", type: "table",
      cols: [{ label: "Column A", w: "25%" }, { label: "Column B", w: "25%" }, { label: "Column C", w: "25%" }, { label: "Notes", w: "auto" }],
      rows: [["","","",""],["","","",""],["","","",""]],
    }),
  },
  {
    type: "impactTable",
    label: "Impact Table",
    desc: "Table with numbered impact level guide",
    thumb: (
      <svg viewBox="0 0 80 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="4" width="72" height="32" rx="1" stroke={C.rule} strokeWidth="1"/>
        <line x1="4" y1="14" x2="76" y2="14" stroke={C.rule} strokeWidth="1"/>
        <line x1="4" y1="23" x2="76" y2="23" stroke={C.rule} strokeWidth="0.5"/>
        <rect x="4" y="4" width="72" height="10" fill={C.warm}/>
        <rect x="4"  y="40" width="12" height="12" rx="1" fill={C.warm} stroke={C.ruleLight} strokeWidth="0.8"/>
        <rect x="18" y="40" width="12" height="12" rx="1" fill={C.warm} stroke={C.ruleLight} strokeWidth="0.8"/>
        <rect x="32" y="40" width="12" height="12" rx="1" fill={C.warm} stroke={C.ruleLight} strokeWidth="0.8"/>
        <rect x="46" y="40" width="12" height="12" rx="1" fill={C.warm} stroke={C.ruleLight} strokeWidth="0.8"/>
        <rect x="60" y="40" width="12" height="12" rx="1" fill={C.warm} stroke={C.ruleLight} strokeWidth="0.8"/>
        <text x="10"  y="49" fontSize="7" fill={C.gold} textAnchor="middle" fontFamily="serif">0</text>
        <text x="24"  y="49" fontSize="7" fill={C.gold} textAnchor="middle" fontFamily="serif">1</text>
        <text x="38"  y="49" fontSize="7" fill={C.gold} textAnchor="middle" fontFamily="serif">2</text>
        <text x="52"  y="49" fontSize="7" fill={C.gold} textAnchor="middle" fontFamily="serif">3</text>
        <text x="66"  y="49" fontSize="7" fill={C.gold} textAnchor="middle" fontFamily="serif">4</text>
      </svg>
    ),
    make: () => ({
      id: uid(), num: "", title: "Feature Assessment", type: "impactTable",
      cols: [{ label: "Feature Type", w: "20%" }, { label: "Location", w: "16%" }, { label: "Impact Level", w: "14%" }, { label: "Description / Notes", w: "auto" }],
      rows: [["","","",""],["","","",""],["","","",""]],
      guideLabel: "Impact Level Guide",
      guide: [
        { num: "0", desc: "Cosmetic only" }, { num: "1", desc: "Minor feature" },
        { num: "2", desc: "Moderate influence" }, { num: "3", desc: "Propagation risk" },
        { num: "4", desc: "High failure risk" },
      ],
    }),
  },
  {
    type: "photo",
    label: "Photo Frame",
    desc: "Square image upload with caption",
    thumb: (
      <svg viewBox="0 0 80 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="4" width="40" height="40" rx="1" fill={C.warm} stroke={C.rule} strokeWidth="1" strokeDasharray="3 2"/>
        <polygon points="28,14 36,22 30,28 24,22" fill="none" stroke={C.rule} strokeWidth="0.8"/>
        <line x1="28" y1="8" x2="28" y2="40" stroke={C.rule} strokeWidth="0.4" strokeDasharray="2 3"/>
        <line x1="8" y1="24" x2="48" y2="24" stroke={C.rule} strokeWidth="0.4" strokeDasharray="2 3"/>
        <rect x="54" y="18" width="18" height="8" rx="1" fill="white" stroke={C.rule} strokeWidth="0.8"/>
        <text x="63" y="24" fontSize="5" fill={C.gold} textAnchor="middle" fontFamily="monospace">⬆ add</text>
      </svg>
    ),
    make: () => ({
      id: uid(), num: "", title: "Reference Image", type: "photo",
      caption: "", photoData: "",
    }),
  },
  {
    type: "plots",
    label: "Inclusion Plot",
    desc: "Interactive SVG diagrams with markers",
    thumb: (
      <svg viewBox="0 0 80 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4"  y="4"  width="34" height="34" rx="1" fill="#eeebe6" stroke={C.rule} strokeWidth="0.8" strokeDasharray="2 2"/>
        <polygon points="21,10 30,17 30,27 21,34 12,27 12,17" fill="none" stroke={C.rule} strokeWidth="0.6"/>
        <rect x="42" y="4"  width="34" height="34" rx="1" fill="#eeebe6" stroke={C.rule} strokeWidth="0.8" strokeDasharray="2 2"/>
        <polygon points="59,10 68,22 59,34 50,22" fill="none" stroke={C.rule} strokeWidth="0.6"/>
        <text x="18" y="22" fontSize="6" fill={C.inkMid} textAnchor="middle">●</text>
        <text x="26" y="26" fontSize="6" fill={C.goldLight} textAnchor="middle">✕</text>
        <text x="56" y="20" fontSize="6" fill={C.inkMid} textAnchor="middle">○</text>
        <text x="10" y="44" fontSize="5" fill={C.inkSoft} fontFamily="monospace">TOP VIEW</text>
        <text x="48" y="44" fontSize="5" fill={C.inkSoft} fontFamily="monospace">SIDE VIEW</text>
      </svg>
    ),
    make: () => ({
      id: uid(), num: "", title: "Inclusion Plots", type: "plots",
      plots: [
        { title: "Top View",            hint: "Plot internal features" },
        { title: "Side / Profile View", hint: "Plot depth structure" },
      ],
    }),
  },
  {
    type: "obs",
    label: "Observations",
    desc: "Two-column labeled text fields",
    thumb: (
      <svg viewBox="0 0 80 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="4"  y1="12" x2="36" y2="12" stroke={C.rule} strokeWidth="0.8"/>
        <line x1="4"  y1="24" x2="36" y2="24" stroke={C.rule} strokeWidth="0.8"/>
        <line x1="4"  y1="36" x2="36" y2="36" stroke={C.rule} strokeWidth="0.8"/>
        <line x1="44" y1="12" x2="76" y2="12" stroke={C.rule} strokeWidth="0.8"/>
        <line x1="44" y1="24" x2="76" y2="24" stroke={C.rule} strokeWidth="0.8"/>
        <line x1="44" y1="36" x2="76" y2="36" stroke={C.rule} strokeWidth="0.8"/>
        <rect x="4"  y="4"  width="20" height="4" rx="1" fill={C.ruleLight}/>
        <rect x="4"  y="16" width="18" height="4" rx="1" fill={C.ruleLight}/>
        <rect x="4"  y="28" width="22" height="4" rx="1" fill={C.ruleLight}/>
        <rect x="44" y="4"  width="20" height="4" rx="1" fill={C.ruleLight}/>
        <rect x="44" y="16" width="18" height="4" rx="1" fill={C.ruleLight}/>
        <rect x="44" y="28" width="22" height="4" rx="1" fill={C.ruleLight}/>
      </svg>
    ),
    make: () => ({
      id: uid(), num: "", title: "Observations", type: "obs",
      fields: [
        { label: "Field One",   value: "" }, { label: "Field Two",   value: "" },
        { label: "Field Three", value: "" }, { label: "Field Four",  value: "" },
      ],
    }),
  },
  {
    type: "assessment",
    label: "Assessment",
    desc: "Summary cells with checklist",
    thumb: (
      <svg viewBox="0 0 80 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4"  y="8" width="22" height="32" rx="1" stroke={C.rule} strokeWidth="0.8"/>
        <rect x="29" y="8" width="22" height="32" rx="1" stroke={C.rule} strokeWidth="0.8"/>
        <rect x="54" y="8" width="22" height="32" rx="1" stroke={C.rule} strokeWidth="0.8"/>
        <rect x="4"  y="8" width="22" height="8" fill={C.warm}/>
        <rect x="29" y="8" width="22" height="8" fill={C.warm}/>
        <rect x="54" y="8" width="22" height="8" fill={C.warm}/>
        <rect x="57" y="20" width="5" height="5" rx="0.5" stroke={C.rule} strokeWidth="0.8"/>
        <rect x="57" y="28" width="5" height="5" rx="0.5" stroke={C.rule} strokeWidth="0.8"/>
        <rect x="57" y="36" width="5" height="5" rx="0.5" stroke={C.rule} strokeWidth="0.8" fill={C.warm}/>
      </svg>
    ),
    make: () => ({
      id: uid(), num: "", title: "Assessment Summary", type: "assessment",
      cells: [{ label: "Risk Level", value: "" }, { label: "Integrity Level", value: "" }],
      checksLabel: "Recommendation",
      checks: [{ label: "Approved", checked: false }, { label: "Conditional", checked: false }, { label: "Not Advised", checked: false }],
    }),
  },
  {
    type: "note",
    label: "Note / Text",
    desc: "Italic bordered note block",
    thumb: (
      <svg viewBox="0 0 80 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="8" width="72" height="36" rx="1" fill={C.warm} stroke={C.rule} strokeWidth="0.8"/>
        <line x1="4" y1="8" x2="4" y2="44" stroke={C.gold} strokeWidth="2.5"/>
        <line x1="10" y1="18" x2="68" y2="18" stroke={C.ruleLight} strokeWidth="0.8"/>
        <line x1="10" y1="25" x2="68" y2="25" stroke={C.ruleLight} strokeWidth="0.8"/>
        <line x1="10" y1="32" x2="55" y2="32" stroke={C.ruleLight} strokeWidth="0.8"/>
      </svg>
    ),
    make: () => ({
      id: uid(), type: "note",
      body: "Add your note here…",
    }),
  },
  {
    type: "structuralChange",
    label: "Structural Change Table",
    desc: "Feature observed · Action taken · Result badge",
    thumb: (
      <svg viewBox="0 0 80 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="4" width="72" height="48" rx="1" stroke={C.rule} strokeWidth="1"/>
        <rect x="4" y="4" width="72" height="11" fill={C.warm}/>
        <line x1="4"  y1="15" x2="76" y2="15" stroke={C.rule} strokeWidth="1"/>
        <line x1="4"  y1="25" x2="76" y2="25" stroke={C.rule} strokeWidth="0.5"/>
        <line x1="4"  y1="35" x2="76" y2="35" stroke={C.rule} strokeWidth="0.5"/>
        <line x1="4"  y1="45" x2="76" y2="45" stroke={C.rule} strokeWidth="0.5"/>
        <line x1="30" y1="4"  x2="30" y2="52" stroke={C.rule} strokeWidth="0.5"/>
        <line x1="56" y1="4"  x2="56" y2="52" stroke={C.rule} strokeWidth="0.5"/>
        <rect x="58" y="18" width="14" height="5" rx="1" fill="#e8f0e4" stroke="#b0cfa8" strokeWidth="0.6"/>
        <rect x="58" y="28" width="14" height="5" rx="1" fill="#f0ece0" stroke="#d4c078" strokeWidth="0.6"/>
        <rect x="58" y="38" width="14" height="5" rx="1" fill="#f0ece8" stroke="#C4B8B0" strokeWidth="0.6"/>
        <text x="65" y="22.5" fontSize="4" fill="#3a6b2a" textAnchor="middle" fontFamily="monospace">RESOLVED</text>
        <text x="65" y="32.5" fontSize="4" fill="#7a6020" textAnchor="middle" fontFamily="monospace">IMPROVED</text>
        <text x="65" y="42.5" fontSize="3.5" fill="#6B5F58" textAnchor="middle" fontFamily="monospace">LEFT INTACT</text>
      </svg>
    ),
    make: () => ({
      id: uid(), num: "", title: "Structural Change Table", type: "structuralChange",
      cols: [{ label: "Feature Observed" }, { label: "Action Taken" }, { label: "Result" }],
      rows: [
        ["Surface abrasion (table + crown)", "Full repolish — all crown facets", "RESOLVED"],
        ["Girdle chip, 7 o'clock", "Girdle re-establishment", "RESOLVED"],
        ["Poor pavilion angles", "Pavilion re-cut to correct angles", "RESOLVED"],
        ["Symmetry deviation", "Meet-point correction across all mains", "IMPROVED"],
        ["Needle inclusions", "No action — below risk threshold", "LEFT INTACT"],
      ],
    }),
  },
  {
    type: "opticalPerformance",
    label: "Optical Performance",
    desc: "Aspect · Rating badge · Observation note",
    thumb: (
      <svg viewBox="0 0 80 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="4" width="72" height="48" rx="1" stroke={C.rule} strokeWidth="1"/>
        <rect x="4" y="4" width="72" height="11" fill={C.warm}/>
        <line x1="4"  y1="15" x2="76" y2="15" stroke={C.rule} strokeWidth="1"/>
        <line x1="4"  y1="25" x2="76" y2="25" stroke={C.rule} strokeWidth="0.5"/>
        <line x1="4"  y1="35" x2="76" y2="35" stroke={C.rule} strokeWidth="0.5"/>
        <line x1="4"  y1="45" x2="76" y2="45" stroke={C.rule} strokeWidth="0.5"/>
        <line x1="26" y1="4"  x2="26" y2="52" stroke={C.rule} strokeWidth="0.5"/>
        <line x1="52" y1="4"  x2="52" y2="52" stroke={C.rule} strokeWidth="0.5"/>
        <rect x="27" y="18" width="23" height="5" rx="1" fill="#e8f0e4" stroke="#b0cfa8" strokeWidth="0.6"/>
        <rect x="27" y="28" width="23" height="5" rx="1" fill="#eef0e4" stroke="#c0cf98" strokeWidth="0.6"/>
        <rect x="27" y="38" width="23" height="5" rx="1" fill="#e8f0ee" stroke="#a8cfbe" strokeWidth="0.6"/>
        <text x="38.5" y="22.5" fontSize="3.5" fill="#3a6b2a" textAnchor="middle" fontFamily="monospace">SIGNIFICANTLY IMP.</text>
        <text x="38.5" y="32.5" fontSize="3.5" fill="#4a6a1a" textAnchor="middle" fontFamily="monospace">MAJOR IMPROVEMENT</text>
        <text x="38.5" y="42.5" fontSize="3.5" fill="#2a6b52" textAnchor="middle" fontFamily="monospace">ELIMINATED</text>
      </svg>
    ),
    make: () => ({
      id: uid(), num: "", title: "Optical Performance Observation", type: "opticalPerformance",
      cols: [{ label: "Aspect" }, { label: "Rating" }, { label: "Note" }],
      rows: [
        ["Brightness Change",          "Significantly Improved", "Strong light return across all viewing angles post-recut"],
        ["Symmetry",                   "Major Improvement",      "Minor deviation in two star facets — within acceptable tolerance"],
        ["Windowing",                  "Eliminated",             "Full extinction achieved at standard viewing angles"],
        ["Overall Optical Performance","Significantly Improved", "Corrective recut achieved intended optical result"],
      ],
    }),
  },
  {
    type: "beforeAfter",
    label: "Before & After",
    desc: "Side-by-side photo comparison with caption",
    thumb: (
      <svg viewBox="0 0 80 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4"  y="8" width="30" height="36" rx="1" fill={C.warm} stroke={C.rule} strokeWidth="1" strokeDasharray="2 2"/>
        <rect x="46" y="8" width="30" height="36" rx="1" fill={C.warm} stroke={C.rule} strokeWidth="1" strokeDasharray="2 2"/>
        <polygon points="19,18 25,26 19,34" fill="none" stroke={C.rule} strokeWidth="0.7"/>
        <polygon points="61,18 67,26 61,34" fill="none" stroke={C.rule} strokeWidth="0.7"/>
        <text x="8"  y="6"  fontSize="4.5" fill={C.gold} fontFamily="monospace" letterSpacing="1">BEFORE</text>
        <text x="50" y="6"  fontSize="4.5" fill={C.gold} fontFamily="monospace" letterSpacing="1">AFTER</text>
        <text x="40" y="28" fontSize="10" fill={C.gold} textAnchor="middle" opacity=".5">→</text>
      </svg>
    ),
    make: () => ({
      id: uid(), num: "", title: "Before & After", type: "beforeAfter",
      beforeLabel: "Before", afterLabel: "After",
      before: "", after: "", caption: "",
    }),
  },
  {
    type: "sig",
    label: "Signature",
    desc: "Signature line with organisation name",
    thumb: (
      <svg viewBox="0 0 80 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="6"  y1="40" x2="38" y2="40" stroke={C.rule} strokeWidth="1"/>
        <rect x="6"  y="30" width="16" height="4" rx="1" fill={C.ruleLight}/>
        <line x1="50" y1="28" x2="74" y2="28" stroke={C.ruleLight} strokeWidth="0.6"/>
        <line x1="50" y1="34" x2="74" y2="34" stroke={C.ruleLight} strokeWidth="0.6"/>
        <line x1="50" y1="40" x2="70" y2="40" stroke={C.ruleLight} strokeWidth="0.6"/>
      </svg>
    ),
    make: () => ({
      id: uid(), type: "sig",
      sigLabel: "Signature",
      org: "Cutting Corners Gems\nInternal Document",
    }),
  },
];

/* ─── Global Styles ───────────────────────────────────────── */
const G = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Mono:wght@300;400;500&family=Jost:wght@300;400;500&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: ${C.parchment}; font-family: 'Jost', sans-serif; color: ${C.ink}; margin: 0; }

    .page {
      background: ${C.parchment};
      min-height: 100vh; padding: 64px 76px 76px;
      position: relative;
    }
    .page::before, .page::after { content: ''; position: absolute; width: 22px; height: 22px; border-color: ${C.gold}; border-style: solid; }
    .page::before { top: 20px; left: 20px; border-width: 1px 0 0 1px; }
    .page::after  { top: 20px; right: 20px; border-width: 1px 1px 0 0; }
    .corner-bl, .corner-br { position: absolute; width: 22px; height: 22px; border-color: ${C.gold}; border-style: solid; }
    .corner-bl { bottom: 20px; left: 20px;  border-width: 0 0 1px 1px; }
    .corner-br { bottom: 20px; right: 20px; border-width: 0 1px 1px 0; }

    .et       { cursor: text; border-radius: 2px; display: inline; }
    .et:hover { background: rgba(78,62,38,.06); outline: 1px dashed ${C.goldLight}; outline-offset: 2px; }
    .et-block       { cursor: text; border-radius: 2px; display: block; }
    .et-block:hover { background: rgba(78,62,38,.06); outline: 1px dashed ${C.goldLight}; outline-offset: 2px; }

    .ei { background: transparent; border: none; font-family: inherit; color: inherit; font-size: inherit; font-weight: inherit; letter-spacing: inherit; width: 100%; padding: 0; line-height: inherit; }
    .ei:focus { outline: none; }

    .ei-line { background: ${C.warm}; border: 1px solid ${C.ruleLight}; border-radius: 2px; font-family: inherit; color: ${C.ink}; font-size: inherit; width: 100%; padding: 5px 8px; resize: none; overflow: hidden; line-height: 1.65; min-height: 32px; }
    .ei-line:focus { outline: none; border-color: ${C.gold}; background: white; }

    .ei-cell { background: ${C.warm}; border: 1px solid ${C.ruleLight}; border-radius: 2px; font-family: inherit; color: ${C.ink}; font-size: 13pt; width: 100%; padding: 4px 8px; resize: none; overflow: hidden; line-height: 1.5; min-height: 32px; }
    .ei-cell:focus { outline: none; border-color: ${C.gold}; background: white; }

    .slot       { display: inline-flex; align-items: center; justify-content: center; min-width: 26px; height: 22px; border: 1px solid ${C.ruleLight}; background: ${C.warm}; cursor: pointer; font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 13px; color: ${C.gold}; padding: 0 5px; flex-shrink: 0; transition: border-color .15s; }
    .slot:hover { border-color: ${C.gold}; }
    .slot-in       { width: 34px; height: 22px; border: 1px solid ${C.gold}; background: white; text-align: center; font-family: 'DM Mono', monospace; font-size: 13px; color: ${C.gold}; padding: 0; }
    .slot-in:focus { outline: none; }

    .btn-add-row       { margin-top: 10px; font-family: 'DM Mono', monospace; font-size: 11px; letter-spacing: .14em; text-transform: uppercase; color: ${C.gold}; background: none; border: 1px dashed ${C.ruleLight}; padding: 5px 14px; cursor: pointer; opacity: .5; transition: opacity .15s, border-color .15s; }
    .btn-add-row:hover { opacity: 1; border-color: ${C.gold}; }

    /* Add-component button beside each section */
    .btn-add-section {
      display: inline-flex; align-items: center; justify-content: center;
      width: 22px; height: 22px; border: 1px solid ${C.ruleLight};
      background: white; color: ${C.gold}; font-size: 15px; line-height: 1;
      cursor: pointer; flex-shrink: 0; transition: border-color .15s, background .15s;
      font-family: 'DM Mono', monospace; margin-left: 6px;
    }
    .btn-add-section:hover { border-color: ${C.gold}; background: ${C.warm}; }

    /* Slide-in panel */
    .add-panel-overlay {
      position: fixed; inset: 0; z-index: 300; background: rgba(72,44,16,.18);
      backdrop-filter: blur(2px);
    }
    .add-panel {
      position: fixed; top: 0; right: 0; bottom: 0; width: 320px;
      background: ${C.parchment}; border-left: 1px solid ${C.ruleLight};
      box-shadow: -8px 0 40px rgba(0,0,0,.12);
      display: flex; flex-direction: column; z-index: 301;
      animation: slideIn .2s ease;
    }
    @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }

    .add-panel-header {
      padding: 20px 20px 14px; border-bottom: 1px solid ${C.ruleLight};
      display: flex; align-items: center; justify-content: space-between;
      flex-shrink: 0;
    }
    .add-panel-title {
      font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: .22em;
      text-transform: uppercase; color: ${C.gold};
    }
    .add-panel-close {
      background: none; border: 1px solid ${C.ruleLight}; color: ${C.inkSoft};
      width: 24px; height: 24px; cursor: pointer; font-size: 13px;
      display: flex; align-items: center; justify-content: center;
      transition: border-color .15s;
    }
    .add-panel-close:hover { border-color: ${C.gold}; color: ${C.gold}; }

    .add-panel-scroll { flex: 1; overflow-y: auto; padding: 14px 16px 40px; }

    .component-card {
      display: flex; gap: 12px; align-items: center;
      padding: 12px 14px; margin-bottom: 8px;
      border: 1px solid ${C.ruleLight}; background: white; cursor: pointer;
      transition: border-color .15s, background .15s, box-shadow .15s;
    }
    .component-card:hover {
      border-color: ${C.gold}; background: ${C.warm};
      box-shadow: 0 2px 12px rgba(78,62,38,.08);
    }
    .component-thumb {
      width: 60px; height: 44px; flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
      background: #f5f2ee; border: 1px solid ${C.ruleLight};
    }
    .component-thumb svg { width: 52px; height: 38px; }
    .component-info { flex: 1; min-width: 0; }
    .component-name {
      font-family: 'DM Mono', monospace; font-size: 11px; letter-spacing: .12em;
      text-transform: uppercase; color: ${C.inkMid}; margin-bottom: 3px;
    }
    .component-desc {
      font-size: 11px; font-weight: 300; color: ${C.inkSoft}; line-height: 1.4;
    }

    .toolbar { position: fixed; bottom: 0; left: 0; right: 0; background: rgba(255,255,255,.97); backdrop-filter: blur(12px); border-top: 1px solid ${C.ruleLight}; padding: 12px 28px; display: flex; align-items: center; justify-content: space-between; z-index: 200; }
    .toolbar-hint { font-family: 'DM Mono', monospace; font-size: 11px; letter-spacing: .14em; text-transform: uppercase; color: ${C.inkSoft}; opacity: .6; }
    .btn-print       { background: ${C.gold}; color: white; border: none; padding: 10px 24px; font-family: 'DM Mono', monospace; font-size: 11px; letter-spacing: .18em; text-transform: uppercase; cursor: pointer; transition: background .15s; }
    .btn-print:hover { background: ${C.goldLight}; }

    input[type=checkbox] { accent-color: ${C.gold}; width: 14px; height: 14px; cursor: pointer; }
    .sec-rule { flex: 1; height: 1px; background: linear-gradient(to right, ${C.rule}, transparent); margin-left: 10px; }

    @media print {
      body { background: white; }
      .page { box-shadow: none; max-width: 100%; padding: 0.5in 0.55in; margin: 0; }
      .page::before, .page::after, .corner-bl, .corner-br { display: none; }
      .toolbar, .btn-add-row, .slot, .plot-upload-bar,
      .btn-print, .upload-btn, .remove-btn, .plot-marker-bar,
      .btn-add-section, .add-panel, .add-panel-overlay { display: none !important; }
      .et:hover, .et-block:hover { background: none; outline: none; }
      textarea, input { color: ${C.ink} !important; }
      .ei-line, .ei-cell {
        background: transparent !important;
        border: none !important;
        padding: 0 !important;
        min-height: 0 !important;
      }
      input[type=text] {
        background: transparent !important;
        border: none !important;
        padding: 0 !important;
      }
    }
  `}</style>
);

/* ─── Add Component Panel ─────────────────────────────────── */
function AddPanel({ onAdd, onClose }) {
  return (
    <>
      <div className="add-panel-overlay" onClick={onClose} />
      <div className="add-panel">
        <div className="add-panel-header">
          <span className="add-panel-title">Add Component</span>
          <button className="add-panel-close" onClick={onClose}>×</button>
        </div>
        <div className="add-panel-scroll">
          <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: C.inkSoft, marginBottom: 14, opacity: .7 }}>
            Select a component to insert below the current section
          </p>
          {CATALOGUE.map(item => (
            <div key={item.type} className="component-card" onClick={() => { onAdd(item.make()); onClose(); }}>
              <div className="component-thumb">{item.thumb}</div>
              <div className="component-info">
                <div className="component-name">{item.label}</div>
                <div className="component-desc">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* ─── EditText ────────────────────────────────────────────── */
function EditText({ val, set, placeholder = "…", style = {}, className = "", block = false, multiline = false }) {
  const [editing, setEditing] = useState(false);
  const ref = useRef();
  const printMode = useContext(PrintCtx);

  useEffect(() => {
    if (editing && ref.current) {
      ref.current.focus();
      if (multiline) autoResize(ref.current);
    }
  }, [editing]);

  const autoResize = el => { el.style.height = "auto"; el.style.height = el.scrollHeight + "px"; };
  const done  = () => setEditing(false);
  const onKey = e => { if (!multiline && e.key === "Enter") done(); if (e.key === "Escape") done(); };

  if (editing) {
    const shared = {
      ref, value: val, className: "ei",
      onChange: e => { set(e.target.value); if (multiline && ref.current) autoResize(ref.current); },
      onBlur: done, onKeyDown: onKey,
      style: { ...style, display: block ? "block" : "inline", width: block ? "100%" : "auto", minWidth: "20px" },
      placeholder,
    };
    return multiline ? <textarea rows={1} {...shared} /> : <input type="text" {...shared} />;
  }

  const Tag     = block ? "div" : "span";
  const display = printMode && !val ? "N/A" : val;
  return (
    <Tag className={`${block ? "et-block" : "et"} ${className}`} style={style} onClick={() => setEditing(true)} title="Click to edit">
      {display || <span style={{ opacity: .28, fontStyle: "italic", fontWeight: 300 }}>{placeholder}</span>}
    </Tag>
  );
}

/* ─── AutoField ───────────────────────────────────────────── */
function AutoField({ label, setLabel, val, set, placeholder = "—" }) {
  const ref = useRef();
  const printMode = useContext(PrintCtx);
  const auto = () => { if (ref.current) { ref.current.style.height = "auto"; ref.current.style.height = ref.current.scrollHeight + "px"; } };
  useEffect(auto, [val]);

  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ marginBottom: 5 }}>
        <EditText val={label} set={setLabel} placeholder="Field Label"
          style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: C.inkSoft }} />
      </div>
      <textarea ref={ref} rows={1} className="ei-line"
        value={printMode && !val.trim() ? "N/A" : val}
        onChange={e => { set(e.target.value); auto(); }}
        placeholder={placeholder}
        readOnly={printMode} />
    </div>
  );
}

/* ─── EditCell ────────────────────────────────────────────── */
function EditCell({ val, set, placeholder = "" }) {
  const ref = useRef();
  const printMode = useContext(PrintCtx);
  const auto = () => { if (ref.current) { ref.current.style.height = "auto"; ref.current.style.height = ref.current.scrollHeight + "px"; } };
  useEffect(auto, [val]);
  return (
    <textarea ref={ref} rows={1} className="ei-cell"
      value={printMode && !val.trim() ? "N/A" : val}
      onChange={e => { set(e.target.value); auto(); }}
      placeholder={placeholder}
      readOnly={printMode} />
  );
}

/* ─── SlotBadge ───────────────────────────────────────────── */
function SlotBadge({ slot, onSwap, total }) {
  const [editing, setEditing] = useState(false);
  const [inp, setInp] = useState("");
  const ref = useRef();
  useEffect(() => { if (editing && ref.current) { ref.current.focus(); ref.current.select(); } }, [editing]);

  const commit = () => {
    const n = parseInt(inp);
    if (n >= 1 && n <= total && n !== slot) onSwap(n);
    setEditing(false); setInp("");
  };

  if (editing) return (
    <input ref={ref} type="text" className="slot-in" value={inp}
      onChange={e => setInp(e.target.value)} onBlur={commit}
      onKeyDown={e => { if (e.key === "Enter") commit(); if (e.key === "Escape") { setEditing(false); setInp(""); } }}
      title={`Move to slot (1–${total})`} />
  );
  return (
    <div className="slot" onClick={() => { setInp(String(slot)); setEditing(true); }} title="Click to change slot">
      {slot}
    </div>
  );
}

/* ─── SectionHead ─────────────────────────────────────────── */
function SectionHead({ slot, total, onSwap, num, setNum, title, setTitle, sectionId, onDelete }) {
  const { setOpen, setAfterId } = useContext(PanelCtx);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
      <SlotBadge slot={slot} total={total} onSwap={onSwap} />
      <EditText val={num} set={setNum} placeholder="01"
        style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontSize: 15, color: C.gold, minWidth: 22, fontWeight: 500 }} />
      <EditText val={title} set={setTitle} placeholder="Section Title"
        style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: C.inkMid, whiteSpace: "nowrap", fontWeight: 500 }} />
      <div className="sec-rule" />
      <button className="btn-add-section" title="Add component below"
        onClick={() => { setAfterId(sectionId); setOpen(true); }}>+</button>
      <button className="btn-add-section" title="Delete this section"
        onClick={() => { if (window.confirm('Delete this section?')) onDelete(); }}
        style={{ borderColor: 'transparent', color: C.rule, fontSize: 13 }}>×</button>
    </div>
  );
}

/* ─── EditTable ───────────────────────────────────────────── */
function EditTable({ sec, update }) {
  const setCell   = (r, c, v) => update(s => {
    const rows = s.rows.map((row, ri) => ri === r ? row.map((cell, ci) => ci === c ? v : cell) : row);
    return { ...s, rows };
  });
  const setCol    = (c, v) => update(s => ({ ...s, cols: s.cols.map((col, i) => i === c ? { ...col, label: v } : col) }));
  const addRow    = () => update(s => ({ ...s, rows: [...s.rows, s.cols.map(() => "")] }));
  const removeRow = r  => update(s => ({ ...s, rows: s.rows.filter((_, i) => i !== r) }));
  const colStyles = sec.cols.map(c => ({ width: c.w || "auto" }));

  return (
    <div>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: `1px solid ${C.rule}` }}>
            {sec.cols.map((col, ci) => (
              <th key={ci} style={{ ...colStyles[ci], padding: "0 0 9px", textAlign: "left", fontWeight: 400 }}>
                <EditText val={col.label} set={v => setCol(ci, v)}
                  style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: C.gold }} />
              </th>
            ))}
            <th style={{ width: 20 }} />
          </tr>
        </thead>
        <tbody>
          {sec.rows.map((row, ri) => (
            <tr key={ri} style={{ borderBottom: `1px solid ${C.ruleLight}` }}>
              {row.map((cell, ci) => (
                <td key={ci} style={{ ...colStyles[ci], padding: "5px 0", verticalAlign: "top" }}>
                  <EditCell val={cell} set={v => setCell(ri, ci, v)} />
                </td>
              ))}
              <td style={{ verticalAlign: "middle", textAlign: "right" }}>
                <span onClick={() => removeRow(ri)} style={{ cursor: "pointer", color: C.ruleLight, fontSize: 14, lineHeight: 1 }} title="Remove row">×</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn-add-row" onClick={addRow}>+ Add Row</button>
    </div>
  );
}

/* ─── PhotoSection (standalone photo frame) ──────────────── */
function PhotoSection({ sec, update }) {
  const setCaption  = v => update(s => ({ ...s, caption: v }));
  const setPhoto    = v => update(s => ({ ...s, photoData: v }));

  return (
    <div>
      <div style={{ aspectRatio: "1 / 1", width: "60%", margin: "0 auto", position: "relative", overflow: "hidden", background: C.warm, border: `1px dashed ${C.rule}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
        <input id={`photo-${sec.id}`} type="file" accept="image/*" style={{ display: "none" }}
          onChange={e => {
            const file = e.target.files[0];
            if (file) { const r = new FileReader(); r.onload = ev => setPhoto(ev.target.result); r.readAsDataURL(file); }
          }} />
        {sec.photoData ? (
          <>
            <img src={sec.photoData} alt="Section photo" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain" }} />
            <button className="remove-btn" onClick={() => setPhoto("")}
              style={{ position: "absolute", top: 6, right: 6, zIndex: 2, background: "rgba(255,255,255,.92)", border: `1px solid ${C.rule}`, cursor: "pointer", padding: "3px 10px", fontSize: 11, color: C.inkSoft, fontFamily: "'DM Mono',monospace" }}>
              ✕ remove
            </button>
          </>
        ) : (
          <>
            <svg width={28} height={28} viewBox="0 0 48 48" fill="none" stroke={C.rule} strokeWidth={1}>
              <polygon points="24,4 40,14 40,34 24,44 8,34 8,14" />
              <line x1="24" y1="4" x2="24" y2="44" strokeDasharray="1 4" />
              <line x1="8" y1="24" x2="40" y2="24" strokeDasharray="1 4" />
            </svg>
            <button className="upload-btn" onClick={() => document.getElementById(`photo-${sec.id}`).click()}
              style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: C.gold, background: "white", border: `1px solid ${C.rule}`, padding: "5px 16px", cursor: "pointer" }}>
              ⬆ Upload Photo
            </button>
          </>
        )}
      </div>
      <div style={{ marginTop: 10, textAlign: "center" }}>
        <EditText val={sec.caption} set={setCaption} placeholder="Caption (optional)"
          style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, letterSpacing: "0.12em", color: C.inkSoft, fontStyle: "italic" }} />
      </div>
    </div>
  );
}

/* ─── WeightField & DimField ─────────────────────────────── */
function WeightField({ label, setLabel, val, set }) {
  const parts = (val || "").split("|");
  const w = parts[0] || "";
  const setW = v => set(v + "|" + (parts[1] || ""));
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ marginBottom: 5 }}>
        <EditText val={label} set={setLabel} placeholder="Field Label"
          style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: C.inkSoft }} />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <input type="text" value={w} onChange={e => setW(e.target.value)}
          placeholder="0.00"
          style={{ width: 80, border: `1px solid ${C.ruleLight}`, borderRadius: 2, background: C.warm,
            fontFamily: "'DM Mono',monospace", fontSize: 13, color: C.ink, padding: "5px 6px",
            textAlign: "center", outline: "none" }} />
        <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: C.inkSoft, letterSpacing: "0.1em" }}>ct</span>
      </div>
    </div>
  );
}

function DimField({ label, setLabel, val, set }) {
  const parts = (val || "||").split("|");
  const l = parts[0] || ""; const w = parts[1] || ""; const d = parts[2] || "";
  const upd = (i, v) => {
    const arr = [l, w, d]; arr[i] = v; set(arr.join("|"));
  };
  const inputStyle = {
    width: 56, border: `1px solid ${C.ruleLight}`, borderRadius: 2, background: C.warm,
    fontFamily: "'DM Mono',monospace", fontSize: 13, color: C.ink, padding: "5px 6px",
    textAlign: "center", outline: "none"
  };
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ marginBottom: 5 }}>
        <EditText val={label} set={setLabel} placeholder="Field Label"
          style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: C.inkSoft }} />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
        <input type="text" value={l} onChange={e => upd(0, e.target.value)} placeholder="L" style={inputStyle} />
        <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: C.inkSoft }}>mm ×</span>
        <input type="text" value={w} onChange={e => upd(1, e.target.value)} placeholder="W" style={inputStyle} />
        <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: C.inkSoft }}>mm ×</span>
        <input type="text" value={d} onChange={e => upd(2, e.target.value)} placeholder="D" style={inputStyle} />
        <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: C.inkSoft }}>mm</span>
      </div>
    </div>
  );
}

/* ─── StoneSection ────────────────────────────────────────── */
function StoneSection({ sec, update }) {
  const setF = k => v => update(s => ({ ...s, fields: { ...s.fields, [k]: v } }));
  const setL = k => v => update(s => ({ ...s, labels: { ...s.labels, [k]: v } }));
  const f = sec.fields; const l = sec.labels;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
      <div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>
          <AutoField label={l.type}   setLabel={setL("type")}   val={f.type}   set={setF("type")}   placeholder="e.g. Sapphire" />
          <WeightField label={l.weight} setLabel={setL("weight")} val={f.weight} set={setF("weight")} />
        </div>
        <div style={{ marginBottom: 14 }}>
          <div style={{ marginBottom: 5 }}>
            <EditText val={l.state} set={setL("state")}
              style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: C.inkSoft }} />
          </div>
          <div style={{ display: "flex", gap: 18, alignItems: "center", borderBottom: `1px solid ${C.rule}`, paddingBottom: 5, minHeight: 28 }}>
            <label style={{ display: "flex", gap: 6, alignItems: "center", fontSize: 13, fontWeight: 300, cursor: "pointer" }}>
              <input type="checkbox" checked={f.rough}   onChange={e => setF("rough")(e.target.checked)} />
              <EditText val={l.rough}   set={setL("rough")}   style={{ fontSize: 13, fontWeight: 300 }} />
            </label>
            <label style={{ display: "flex", gap: 6, alignItems: "center", fontSize: 13, fontWeight: 300, cursor: "pointer" }}>
              <input type="checkbox" checked={f.prevCut} onChange={e => setF("prevCut")(e.target.checked)} />
              <EditText val={l.prevCut} set={setL("prevCut")} style={{ fontSize: 13, fontWeight: 300 }} />
            </label>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>
          <AutoField label={l.dims}   setLabel={setL("dims")}   val={f.dims}   set={setF("dims")}   placeholder="L × W × D" />
          <AutoField label={l.origin} setLabel={setL("origin")} val={f.origin} set={setF("origin")} placeholder="if known" />
        </div>
      </div>
      <div>
        <div style={{ marginBottom: 5 }}>
          <EditText val={l.photo} set={setL("photo")}
            style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: C.inkSoft }} />
        </div>
        <div style={{ background: C.warm, border: `1px dashed ${C.rule}`, aspectRatio: "1 / 1", width: "100%", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <input id="stone-photo-upload" type="file" accept="image/*" style={{ display: "none" }}
            onChange={e => {
              const file = e.target.files[0];
              if (file) { const reader = new FileReader(); reader.onload = ev => setF("photoData")(ev.target.result); reader.readAsDataURL(file); }
            }} />
          {f.photoData ? (
            <>
              <img src={f.photoData} alt="Stone reference photo" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain" }} />
              <button className="remove-btn" onClick={() => setF("photoData")("")}
                style={{ position: "absolute", top: 6, right: 6, zIndex: 2, background: "rgba(255,255,255,.92)", border: `1px solid ${C.rule}`, cursor: "pointer", padding: "3px 10px", fontSize: 11, color: C.inkSoft, fontFamily: "'DM Mono',monospace" }}>
                ✕ remove
              </button>
            </>
          ) : (
            <>
              <svg width={32} height={32} viewBox="0 0 48 48" fill="none" stroke={C.rule} strokeWidth={1}>
                <polygon points="24,4 40,14 40,34 24,44 8,34 8,14" />
                <polygon points="24,10 35,17 35,31 24,38 13,31 13,17" strokeDasharray="2 2" />
                <line x1="24" y1="4"  x2="24" y2="44" strokeDasharray="1 4" />
                <line x1="8"  y1="24" x2="40" y2="24" strokeDasharray="1 4" />
              </svg>
              <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: C.rule }}>
                Attach or sketch stone reference
              </span>
              <button className="upload-btn" onClick={e => { e.stopPropagation(); document.getElementById("stone-photo-upload").click(); }}
                style={{ marginTop: 6, fontFamily: "'DM Mono',monospace", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: C.gold, background: "white", border: `1px solid ${C.rule}`, padding: "5px 16px", cursor: "pointer" }}>
                ⬆ Upload Photo
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── PlotsSection ────────────────────────────────────────── */
function PlotsSection({ sec, update }) {
  const [activeMarker, setActiveMarker] = useState("crystal");
  const setPlot = (i, k, v) => update(s => ({ ...s, plots: s.plots.map((p, pi) => pi === i ? { ...p, [k]: v } : p) }));

  const MARKERS = [
    { id: "crystal",  label: "Crystal",  symbol: "●", color: "#0f1f3d" },
    { id: "fracture", label: "Fracture", symbol: "✕", color: "#2e5299" },
    { id: "feather",  label: "Feather",  symbol: "≋", color: "#5a6a82" },
    { id: "cloud",    label: "Cloud",    symbol: "○", color: "#3a7abd" },
    { id: "needle",   label: "Needle",   symbol: "╱", color: "#1a3560" },
    { id: "pinpoint", label: "Pinpoint", symbol: "·", color: "#8aa0be" },
  ];

  const addMarker = (plotIdx, e) => {
    const svg = e.currentTarget; const rect = svg.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width  * 100).toFixed(1);
    const y = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1);
    const markers = [...(sec.plots[plotIdx].markers || []), { id: Date.now(), x: parseFloat(x), y: parseFloat(y), type: activeMarker }];
    setPlot(plotIdx, "markers", markers);
  };
  const removeMarker = (plotIdx, markerId) => {
    setPlot(plotIdx, "markers", (sec.plots[plotIdx].markers || []).filter(m => m.id !== markerId));
  };

  return (
    <div style={{ width: "100%" }}>
      <div className="plot-marker-bar" style={{ display: "flex", gap: 5, marginBottom: 14, flexWrap: "wrap", alignItems: "center" }}>
        <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: C.inkSoft, marginRight: 4 }}>Plot:</span>
        {MARKERS.map(m => (
          <button key={m.id} onClick={() => setActiveMarker(m.id)}
            style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, padding: "3px 10px", cursor: "pointer", background: activeMarker === m.id ? C.gold : "transparent", color: activeMarker === m.id ? "white" : C.inkSoft, border: `1px solid ${activeMarker === m.id ? C.gold : C.ruleLight}`, display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ fontSize: 13 }}>{m.symbol}</span>{m.label}
          </button>
        ))}
        <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: C.rule, marginLeft: 4 }}>click diagram to place · click marker to remove</span>
      </div>
      <div style={{ display: "flex", gap: 20, alignItems: "stretch" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, flex: 1, alignContent: "start" }}>
          {sec.plots.map((plot, i) => (
          <div key={i}>
            <div style={{ marginBottom: 7 }}>
              <EditText val={plot.title} set={v => setPlot(i, "title", v)}
                style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: C.inkSoft }} />
            </div>
            <div style={{ border: `1px dashed ${C.rule}`, position: "relative", aspectRatio: "1 / 1", overflow: "hidden", background: "#e8ecf2" }}>
              <input id={`plot-upload-${sec.id}-${i}`} type="file" accept="image/*" style={{ display: "none" }}
                onChange={e => {
                  const file = e.target.files[0];
                  if (file) { const r = new FileReader(); r.onload = ev => setPlot(i, "photoData", ev.target.result); r.readAsDataURL(file); }
                }} />
              {plot.photoData && (
                <img src={plot.photoData} alt="Plot photo"
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", pointerEvents: "none", zIndex: 0 }} />
              )}
              <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet"
                style={{ display: "block", cursor: "crosshair", position: "absolute", inset: 0, zIndex: 1 }}
                onClick={e => addMarker(i, e)}>
                {!plot.photoData && (i === 0
                  ? <>
                      <polygon points="50,8 88,28 88,72 50,92 12,72 12,28" fill="none" stroke={C.rule} strokeWidth="0.5" />
                      <polygon points="50,20 76,34 76,66 50,80 24,66 24,34" fill="none" stroke={C.rule} strokeWidth="0.3" strokeDasharray="1 1" />
                      <line x1="12" y1="50" x2="88" y2="50" stroke={C.rule} strokeWidth="0.3" strokeDasharray="1 2" />
                      <line x1="50" y1="8"  x2="50" y2="92" stroke={C.rule} strokeWidth="0.3" strokeDasharray="1 2" />
                    </>
                  : <>
                      <polygon points="50,8 88,50 50,92 12,50" fill="none" stroke={C.rule} strokeWidth="0.5" />
                      <line x1="12" y1="50" x2="88" y2="50" stroke={C.rule} strokeWidth="0.3" strokeDasharray="1 2" />
                      <line x1="50" y1="8"  x2="50" y2="92" stroke={C.rule} strokeWidth="0.3" strokeDasharray="1 2" />
                    </>
                )}
                {(plot.markers || []).map(m => {
                  const def = MARKERS.find(mk => mk.id === m.type) || MARKERS[0];
                  return (
                    <text key={m.id} x={`${m.x}%`} y={`${m.y}%`} textAnchor="middle" dominantBaseline="middle"
                      fontSize="8" fill={def.color} style={{ cursor: "pointer", userSelect: "none" }}
                      onClick={e => { e.stopPropagation(); removeMarker(i, m.id); }}>
                      {def.symbol}
                    </text>
                  );
                })}
              </svg>
              <div className="plot-upload-bar" style={{ position: "absolute", bottom: 0, left: 0, right: 0, display: "flex", gap: 6, padding: "5px 8px", background: "rgba(250,247,244,.93)", borderTop: `1px solid ${C.ruleLight}`, zIndex: 2 }}>
                <button onClick={e => { e.stopPropagation(); document.getElementById(`plot-upload-${sec.id}-${i}`).click(); }}
                  style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: C.gold, background: "white", border: `1px solid ${C.rule}`, padding: "3px 10px", cursor: "pointer" }}>
                  ⬆ {plot.photoData ? "Replace" : "Upload Photo"}
                </button>
                {plot.photoData && (
                  <button onClick={() => setPlot(i, "photoData", "")}
                    style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, textTransform: "uppercase", color: C.inkSoft, background: "white", border: `1px solid ${C.rule}`, padding: "3px 10px", cursor: "pointer" }}>
                    ✕ Remove
                  </button>
                )}
              </div>
            </div>
            <div style={{ marginTop: 6, textAlign: "center" }}>
              <EditText val={plot.hint} set={v => setPlot(i, "hint", v)}
                style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: C.rule }} />
            </div>
          </div>
        ))}
        </div>
        {/* Side legend */}
        <div style={{ width: 160, flexShrink: 0, border: `1px solid ${C.ruleLight}`, background: "#f0f3f8", display: "flex", flexDirection: "column", alignSelf: "flex-start" }}>
          <div style={{ padding: "10px 14px 8px", borderBottom: `1px solid ${C.ruleLight}` }}>
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: C.inkSoft }}>Legend</span>
          </div>
          <div style={{ padding: "10px 14px", display: "flex", flexDirection: "column", gap: 10 }}>
            {MARKERS.map(m => (
              <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 20, color: m.color, lineHeight: 1, minWidth: 22, textAlign: "center" }}>{m.symbol}</span>
                <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, color: C.inkMid, letterSpacing: "0.04em" }}>{m.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── ImpactTableSection ──────────────────────────────────── */
function ImpactTableSection({ sec, update }) {
  const setGuide = (i, k, v) => update(s => ({ ...s, guide: s.guide.map((g, gi) => gi === i ? { ...g, [k]: v } : g) }));
  return (
    <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
      <div style={{ flex: 1 }}>
        <EditTable sec={sec} update={update} />
      </div>
      <div style={{ width: 200, flexShrink: 0, border: `1px solid ${C.ruleLight}`, background: "#f0f3f8", display: "flex", flexDirection: "column", alignSelf: "flex-start" }}>
        <div style={{ padding: "10px 14px 8px", borderBottom: `1px solid ${C.ruleLight}` }}>
          <EditText val={sec.guideLabel || "Impact Level Guide"} set={v => update(s => ({ ...s, guideLabel: v }))}
            style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: C.inkSoft }} />
        </div>
        <div style={{ padding: "10px 14px", display: "flex", flexDirection: "column", gap: 10 }}>
          {sec.guide.map((g, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <EditText val={g.num} set={v => setGuide(i, "num", v)}
                style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontWeight: 400, color: C.gold, minWidth: 20, textAlign: "center", lineHeight: 1, flexShrink: 0 }} />
              <EditText val={g.desc} set={v => setGuide(i, "desc", v)}
                style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, fontWeight: 300, color: C.inkMid, lineHeight: 1.4 }} multiline />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── StructuralChangeTable ──────────────────────────────── */
const RESULT_OPTIONS = [
  { label: "RESOLVED",    bg: "#e8f0e4", color: "#3a6b2a", border: "#b0cfa8" },
  { label: "IMPROVED",    bg: "#f0ece0", color: "#7a6020", border: "#d4c078" },
  { label: "LEFT INTACT", bg: "#f0ece8", color: "#6B5F58", border: "#C4B8B0" },
  { label: "",            bg: "transparent", color: C.rule, border: C.ruleLight },
];

function ResultBadge({ val, set }) {
  const printMode = useContext(PrintCtx);
  const idx = RESULT_OPTIONS.findIndex(o => o.label === val);
  const current = RESULT_OPTIONS[idx >= 0 ? idx : 3];
  const next = () => set(RESULT_OPTIONS[(idx + 1) % RESULT_OPTIONS.length].label);
  if (printMode) {
    return (
      <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: "0.12em",
        padding: "3px 8px", background: current.bg, color: current.color,
        border: `1px solid ${current.border}` }}>
        {val || "—"}
      </span>
    );
  }
  return (
    <button onClick={next} title="Click to cycle"
      style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: "0.12em",
        padding: "3px 8px", background: current.bg, color: current.color,
        border: `1px solid ${current.border}`, cursor: "pointer", whiteSpace: "nowrap",
        transition: "all .15s" }}>
      {val || <span style={{ opacity: .4 }}>— set result</span>}
    </button>
  );
}

function StructuralChangeTable({ sec, update }) {
  const setCell   = (r, c, v) => update(s => {
    const rows = s.rows.map((row, ri) => ri === r ? row.map((cell, ci) => ci === c ? v : cell) : row);
    return { ...s, rows };
  });
  const setCol    = (ci, v) => update(s => ({ ...s, cols: s.cols.map((col, i) => i === ci ? { ...col, label: v } : col) }));
  const addRow    = () => update(s => ({ ...s, rows: [...s.rows, ["", "", ""]] }));
  const removeRow = r  => update(s => ({ ...s, rows: s.rows.filter((_, i) => i !== r) }));

  return (
    <div>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: `1px solid ${C.rule}` }}>
            {sec.cols.map((col, ci) => (
              <th key={ci} style={{ width: ci === 2 ? "16%" : ci === 0 ? "30%" : "auto", padding: "0 0 9px", textAlign: "left", fontWeight: 400 }}>
                <EditText val={col.label} set={v => setCol(ci, v)}
                  style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: C.gold }} />
              </th>
            ))}
            <th style={{ width: 20 }} />
          </tr>
        </thead>
        <tbody>
          {sec.rows.map((row, ri) => (
            <tr key={ri} style={{ borderBottom: `1px solid ${C.ruleLight}` }}>
              <td style={{ width: "30%", padding: "6px 0", verticalAlign: "top" }}>
                <EditCell val={row[0]} set={v => setCell(ri, 0, v)} />
              </td>
              <td style={{ padding: "6px 8px", verticalAlign: "top" }}>
                <EditCell val={row[1]} set={v => setCell(ri, 1, v)} />
              </td>
              <td style={{ width: "16%", padding: "6px 0", verticalAlign: "middle" }}>
                <ResultBadge val={row[2]} set={v => setCell(ri, 2, v)} />
              </td>
              <td style={{ verticalAlign: "middle", textAlign: "right" }}>
                <span onClick={() => removeRow(ri)} style={{ cursor: "pointer", color: C.ruleLight, fontSize: 14 }} title="Remove row">×</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn-add-row" onClick={addRow}>+ Add Row</button>
    </div>
  );
}

/* ─── OpticalPerformanceTable ────────────────────────────── */
const OPTICAL_RATINGS = [
  { label: "Significantly Improved", bg: "#e8f0e4", color: "#3a6b2a", border: "#b0cfa8" },
  { label: "Major Improvement",      bg: "#eef0e4", color: "#4a6a1a", border: "#c0cf98" },
  { label: "Minor Improvement",      bg: "#f0ece0", color: "#7a6020", border: "#d4c078" },
  { label: "Eliminated",             bg: "#e8f0ee", color: "#2a6b52", border: "#a8cfbe" },
  { label: "No Change",              bg: "#f0ece8", color: "#6B5F58", border: "#C4B8B0" },
  { label: "Declined",               bg: "#f0e8e8", color: "#7a2a2a", border: "#cfaaaa" },
  { label: "",                       bg: "transparent", color: C.rule, border: C.ruleLight },
];

function OpticalRatingBadge({ val, set }) {
  const printMode = useContext(PrintCtx);
  const idx = OPTICAL_RATINGS.findIndex(o => o.label === val);
  const current = OPTICAL_RATINGS[idx >= 0 ? idx : 6];
  const next = () => set(OPTICAL_RATINGS[(idx + 1) % OPTICAL_RATINGS.length].label);
  if (printMode) {
    return (
      <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: "0.1em",
        padding: "3px 8px", background: current.bg, color: current.color,
        border: `1px solid ${current.border}`, whiteSpace: "nowrap" }}>
        {val || "—"}
      </span>
    );
  }
  return (
    <button onClick={next} title="Click to cycle rating"
      style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: "0.1em",
        padding: "3px 8px", background: current.bg, color: current.color,
        border: `1px solid ${current.border}`, cursor: "pointer", whiteSpace: "nowrap",
        transition: "all .15s", textAlign: "left" }}>
      {val || <span style={{ opacity: .4 }}>— set rating</span>}
    </button>
  );
}

function OpticalPerformanceTable({ sec, update }) {
  const setCell   = (r, col, v) => update(s => {
    const rows = s.rows.map((row, ri) => ri === r ? row.map((cell, ci) => ci === col ? v : cell) : row);
    return { ...s, rows };
  });
  const setCol    = (ci, v) => update(s => ({ ...s, cols: s.cols.map((col, i) => i === ci ? { ...col, label: v } : col) }));
  const addRow    = () => update(s => ({ ...s, rows: [...s.rows, ["", "", ""]] }));
  const removeRow = r  => update(s => ({ ...s, rows: s.rows.filter((_, i) => i !== r) }));

  return (
    <div>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: `1px solid ${C.rule}` }}>
            {sec.cols.map((col, ci) => (
              <th key={ci} style={{ width: ci === 0 ? "26%" : ci === 1 ? "22%" : "auto", padding: "0 0 9px", textAlign: "left", fontWeight: 400 }}>
                <EditText val={col.label} set={v => setCol(ci, v)}
                  style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: C.gold }} />
              </th>
            ))}
            <th style={{ width: 20 }} />
          </tr>
        </thead>
        <tbody>
          {sec.rows.map((row, ri) => (
            <tr key={ri} style={{ borderBottom: `1px solid ${C.ruleLight}` }}>
              <td style={{ width: "26%", padding: "7px 0", verticalAlign: "middle" }}>
                <EditCell val={row[0]} set={v => setCell(ri, 0, v)} />
              </td>
              <td style={{ width: "22%", padding: "7px 8px", verticalAlign: "middle" }}>
                <OpticalRatingBadge val={row[1]} set={v => setCell(ri, 1, v)} />
              </td>
              <td style={{ padding: "7px 0", verticalAlign: "top" }}>
                <EditCell val={row[2]} set={v => setCell(ri, 2, v)} />
              </td>
              <td style={{ verticalAlign: "middle", textAlign: "right" }}>
                <span onClick={() => removeRow(ri)} style={{ cursor: "pointer", color: C.ruleLight, fontSize: 14 }} title="Remove row">×</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn-add-row" onClick={addRow}>+ Add Row</button>
    </div>
  );
}

/* ─── BeforeAfterSection ─────────────────────────────────── */
function BeforeAfterSection({ sec, update }) {
  const setPhoto   = (side, v) => update(s => ({ ...s, [side]: v }));
  const setLabel   = (side, v) => update(s => ({ ...s, [side + 'Label']: v }));
  const setCaption = v => update(s => ({ ...s, caption: v }));

  const PhotoSlot = ({ side }) => {
    const photoData = sec[side];
    const label = sec[side + 'Label'];
    const inputId = `ba-${sec.id}-${side}`;
    return (
      <div style={{ flex: 1 }}>
        <div style={{ marginBottom: 7, display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 28, height: 1, background: C.gold, opacity: .4 }} />
          <EditText val={label} set={v => setLabel(side, v)}
            style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: C.gold }} />
          <div style={{ width: 28, height: 1, background: C.gold, opacity: .4 }} />
        </div>
        <div style={{ aspectRatio: "1 / 1", position: "relative", overflow: "hidden",
          background: C.warm, border: `1px dashed ${C.rule}`,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <input id={inputId} type="file" accept="image/*" style={{ display: "none" }}
            onChange={e => {
              const file = e.target.files[0];
              if (file) { const r = new FileReader(); r.onload = ev => setPhoto(side, ev.target.result); r.readAsDataURL(file); }
            }} />
          {photoData ? (
            <>
              <img src={photoData} alt={`${label} photo`}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain" }} />
              <button className="remove-btn" onClick={() => setPhoto(side, "")}
                style={{ position: "absolute", top: 6, right: 6, zIndex: 2,
                  background: "rgba(255,255,255,.92)", border: `1px solid ${C.rule}`,
                  cursor: "pointer", padding: "3px 10px", fontSize: 11,
                  color: C.inkSoft, fontFamily: "'DM Mono',monospace" }}>
                ✕ remove
              </button>
            </>
          ) : (
            <>
              <svg width={28} height={28} viewBox="0 0 48 48" fill="none" stroke={C.rule} strokeWidth={1}>
                <polygon points="24,4 40,14 40,34 24,44 8,34 8,14" />
                <line x1="24" y1="4"  x2="24" y2="44" strokeDasharray="1 4" />
                <line x1="8"  y1="24" x2="40" y2="24" strokeDasharray="1 4" />
              </svg>
              <button className="upload-btn" onClick={() => document.getElementById(inputId).click()}
                style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, letterSpacing: "0.12em",
                  textTransform: "uppercase", color: C.gold, background: "white",
                  border: `1px solid ${C.rule}`, padding: "5px 16px", cursor: "pointer" }}>
                ⬆ Upload
              </button>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div style={{ display: "flex", gap: 6, alignItems: "stretch" }}>
        <PhotoSlot side="before" />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center",
          justifyContent: "center", gap: 6, paddingTop: 28, flexShrink: 0 }}>
          <div style={{ width: 1, flex: 1, background: C.ruleLight }} />
          <span style={{ fontSize: 18, color: C.gold, opacity: .6, lineHeight: 1 }}>→</span>
          <div style={{ width: 1, flex: 1, background: C.ruleLight }} />
        </div>
        <PhotoSlot side="after" />
      </div>
      <div style={{ marginTop: 10, textAlign: "center" }}>
        <EditText val={sec.caption} set={setCaption} placeholder="Caption (optional)"
          style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic",
            fontSize: 13, letterSpacing: "0.06em", color: C.inkSoft }} />
      </div>
    </div>
  );
}

/* ─── AssessmentSection ───────────────────────────────────── */
function AssessmentSection({ sec, update }) {
  const printMode = useContext(PrintCtx);
  const setCell  = (i, k, v) => update(s => ({ ...s, cells:  s.cells.map((c, ci)  => ci === i ? { ...c, [k]: v } : c) }));
  const setCheck = (i, k, v) => update(s => ({ ...s, checks: s.checks.map((c, ci) => ci === i ? { ...c, [k]: v } : c) }));

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", border: `1px solid ${C.rule}` }}>
      {sec.cells.map((cell, i) => (
        <div key={i} style={{ padding: "16px 18px", borderRight: `1px solid ${C.rule}` }}>
          <div style={{ marginBottom: 9 }}>
            <EditText val={cell.label} set={v => setCell(i, "label", v)}
              style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: C.gold }} />
          </div>
          <textarea rows={1} className="ei-line"
            style={{ background: C.warm, padding: "7px 9px", border: `1px solid ${C.ruleLight}`, borderBottom: `1px solid ${C.ruleLight}`, minHeight: 36 }}
            value={printMode && !cell.value.trim() ? "N/A" : cell.value}
            onChange={e => setCell(i, "value", e.target.value)}
            placeholder="—" readOnly={printMode} />
        </div>
      ))}
      <div style={{ padding: "16px 18px" }}>
        <div style={{ marginBottom: 11 }}>
          <EditText val={sec.checksLabel || "Cut Feasibility"} set={v => update(s => ({ ...s, checksLabel: v }))}
            style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: C.gold }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
          {sec.checks.map((chk, i) => (
            <label key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 300, cursor: "pointer" }}>
              <input type="checkbox" checked={chk.checked} onChange={e => setCheck(i, "checked", e.target.checked)} />
              <EditText val={chk.label} set={v => setCheck(i, "label", v)} style={{ fontSize: 13, fontWeight: 300 }} />
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── ObsSection ──────────────────────────────────────────── */
function ObsSection({ sec, update }) {
  const setF  = (i, k, v) => update(s => ({ ...s, fields: s.fields.map((f, fi) => fi === i ? { ...f, [k]: v } : f) }));
  const half  = Math.ceil(sec.fields.length / 2);
  const left  = sec.fields.slice(0, half);
  const right = sec.fields.slice(half);
  const render = (fields, offset) => fields.map((f, i) => (
    <AutoField key={i} label={f.label} setLabel={v => setF(i + offset, "label", v)} val={f.value} set={v => setF(i + offset, "value", v)} />
  ));
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
      <div>{render(left, 0)}</div>
      <div>{render(right, half)}</div>
    </div>
  );
}

/* ─── GenericTextSection ──────────────────────────────────── */
function GenericTextSection({ sec, update }) {
  return (
    <div style={{ background: C.warm, border: `1px solid ${C.rule}`, borderTop: `2px solid ${C.gold}`, padding: "16px 20px" }}>
      <EditText val={sec.body} set={v => update(s => ({ ...s, body: v }))} placeholder="Note text…"
        style={{ fontSize: 13, fontWeight: 300, fontStyle: "italic", color: C.inkSoft, lineHeight: 1.7 }} block multiline />
    </div>
  );
}

/* ─── SignatureSection ────────────────────────────────────── */
function SignatureSection({ sec, update }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", paddingTop: 18, borderTop: `1px solid ${C.rule}` }}>
      <div>
        <div style={{ marginBottom: 6 }}>
          <EditText val={sec.sigLabel} set={v => update(s => ({ ...s, sigLabel: v }))}
            style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: C.inkSoft }} />
        </div>
        <div style={{ borderBottom: `1px solid ${C.rule}`, width: 220, height: 28 }} />
      </div>
      <div style={{ textAlign: "right" }}>
        <EditText val={sec.org} set={v => update(s => ({ ...s, org: v }))}
          style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontSize: 12, color: C.rule, lineHeight: 1.7 }} block multiline />
      </div>
    </div>
  );
}

/* ─── Section Wrapper ─────────────────────────────────────── */
const SectionRenderers = {
  stone: StoneSection, plots: PlotsSection, photo: PhotoSection,
  table: ({ sec, update }) => <EditTable sec={sec} update={update} />,
  structuralChange: StructuralChangeTable,
  beforeAfter: BeforeAfterSection,
  opticalPerformance: OpticalPerformanceTable,
  impactTable: ImpactTableSection, assessment: AssessmentSection,
  obs: ObsSection, note: GenericTextSection, sig: SignatureSection,
};

function Section({ sec, slot, total, onSwap, update, onDelete }) {
  if (sec.type === "sig") return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 6 }}>
        <button className="btn-add-section" title="Delete this section"
          onClick={() => { if (window.confirm('Delete this section?')) onDelete(); }}
          style={{ borderColor: 'transparent', color: C.rule, fontSize: 13 }}>×</button>
      </div>
      <SignatureSection sec={sec} update={update} />
    </div>
  );
  if (sec.type === "note") return (
    <div style={{ marginBottom: 38 }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 14 }}>
        <div style={{ height: 1, background: C.rule, flex: 1 }} />
        <button className="btn-add-section" title="Delete this section"
          onClick={() => { if (window.confirm('Delete this section?')) onDelete(); }}
          style={{ marginLeft: 8, borderColor: 'transparent', color: C.rule, fontSize: 13 }}>×</button>
      </div>
      <GenericTextSection sec={sec} update={update} />
    </div>
  );

  const Renderer = SectionRenderers[sec.type];
  return (
    <div style={{ marginBottom: 38 }}>
      <SectionHead slot={slot} total={total} onSwap={onSwap} sectionId={sec.id} onDelete={onDelete}
        num={sec.num}     setNum={v   => update(s => ({ ...s, num: v }))}
        title={sec.title} setTitle={v => update(s => ({ ...s, title: v }))} />
      {Renderer && <Renderer sec={sec} update={update} />}
      {sec.hint !== undefined && (
        <p style={{ marginTop: 10, fontSize: 10, fontWeight: 300, fontStyle: "italic", color: C.inkSoft }}>
          <EditText val={sec.hint} set={v => update(s => ({ ...s, hint: v }))}
            style={{ fontSize: 10, fontWeight: 300, fontStyle: "italic", color: C.inkSoft }} />
        </p>
      )}
      <div style={{ height: 1, background: C.rule, marginTop: 20 }} />
    </div>
  );
}

/* ─── Initial State ───────────────────────────────────────── */
const initSections = [
  {
    id: "stone", num: "01", title: "Stone Information", type: "stone",
    fields: { type: "", weight: "", rough: false, prevCut: false, dims: "", origin: "", photoData: "" },
    labels: { type: "Stone Type / Species", weight: "Weight (ct)", state: "Current State", rough: "Rough", prevCut: "Previously Cut", dims: "Dimensions (mm)", origin: "Origin (if known)", photo: "Reference Photograph" },
  },
  {
    id: "surface", num: "02", title: "Surface Condition — External Features", type: "table",
    cols: [{ label: "Condition Type", w: "20%" }, { label: "Location", w: "16%" }, { label: "Severity", w: "14%" }, { label: "Notes", w: "auto" }],
    rows: [["","","",""],["","","",""],["","","",""],["","","",""]],
    hint: "Examples: chips · abrasions · damaged girdle · surface-reaching fracture · broken corners",
  },
  {
    id: "plots", num: "03", title: "Inclusion Plots", type: "plots",
    plots: [
      { title: "Top View",            hint: "Plot internal features affecting structure or cutting orientation" },
      { title: "Side / Profile View", hint: "Plot depth or vertical structure of inclusions or fractures" },
    ],
  },
  {
    id: "structural", num: "04", title: "Structural & Optical Features Affecting Cutting", type: "impactTable",
    cols: [{ label: "Feature Type", w: "20%" }, { label: "Location", w: "16%" }, { label: "Impact Level", w: "14%" }, { label: "Description / Notes", w: "auto" }],
    rows: [["","","",""],["","","",""],["","","",""],["","","",""]],
    guideLabel: "Impact Level Guide",
    guide: [
      { num: "0", desc: "Cosmetic only — omit" },     { num: "1", desc: "Minor internal feature" },
      { num: "2", desc: "Moderate cutting influence" }, { num: "3", desc: "Fracture propagation risk" },
      { num: "4", desc: "High structural failure risk" },
    ],
  },
  {
    id: "assess", num: "05", title: "Assessment Summary", type: "assessment",
    cells: [{ label: "Structural Risk Level", value: "" }, { label: "Stone Integrity Level", value: "" }],
    checksLabel: "Cut Feasibility",
    checks: [{ label: "Cutting Recommended", checked: false }, { label: "Conditional Cutting", checked: false }, { label: "Cutting Not Advised", checked: false }],
  },
  {
    id: "obs", num: "06", title: "Cutting Observations", type: "obs",
    fields: [
      { label: "Recommended Orientation",    value: "" },
      { label: "Estimated Weight Retention", value: "" },
      { label: "Potential Cutting Risks",    value: "" },
      { label: "Additional Notes",           value: "" },
    ],
  },
  {
    id: "note", type: "note",
    body: "This breakdown records only features that influence structural integrity, cutting safety, optical performance, or conditions requiring repair prior to cutting. Minor cosmetic inclusions are intentionally omitted from this document.",
  },
  {
    id: "sig", type: "sig",
    sigLabel: "Evaluator Signature",
    org: "Cutting Corners Gems\nInternal Evaluation Document",
  },
];

const initMeta = {
  eyebrow:  "Cutting Corners Gems · Internal Documentation",
  title:    "Gemstone Cut Feasibility Breakdown",
  subtitle: "Structural & Optical Evaluation for Cutting Potential",
};
const initMetaFields = [
  { label: "Breakdown ID",       value: "" },
  { label: "Date",               value: "" },
  { label: "Evaluated By",       value: "" },
  { label: "Client / Reference", value: "" },
];

/* ─── App ─────────────────────────────────────────────────── */
export default function GemDocBuilder() {
  const [meta,       setMeta]       = useState(initMeta);
  const [metaFields, setMetaFields] = useState(initMetaFields);
  const [sections,   setSections]   = useState(initSections);
  const [printMode,  setPrintMode]  = useState(false);
  const [panelOpen,  setPanelOpen]  = useState(false);
  const [afterId,    setAfterId]    = useState(null);

  const updateMeta      = k => v => setMeta(m => ({ ...m, [k]: v }));
  const updateMetaField = (i, k, v) => setMetaFields(fs => fs.map((f, fi) => fi === i ? { ...f, [k]: v } : f));
  const updateSection   = (id, fn) => setSections(ss => ss.map(s => s.id === id ? fn(s) : s));

  const deleteSection = (id) => setSections(ss => ss.filter(s => s.id !== id));

  const swapSlot = (id, targetSlot) => {
    setSections(ss => {
      const arr     = [...ss];
      const fromIdx = arr.findIndex(s => s.id === id);
      const toIdx   = targetSlot - 1;
      if (fromIdx < 0 || toIdx < 0 || toIdx >= arr.length || fromIdx === toIdx) return arr;
      [arr[fromIdx], arr[toIdx]] = [arr[toIdx], arr[fromIdx]];
      return arr;
    });
  };

  /* Insert a new section directly after the section with afterId */
  const addSectionAfter = useCallback((newSec) => {
    setSections(ss => {
      const idx = afterId ? ss.findIndex(s => s.id === afterId) : ss.length - 1;
      const arr = [...ss];
      arr.splice(idx + 1, 0, newSec);
      return arr;
    });
  }, [afterId]);

  const handlePrint = useCallback(() => {
    setPrintMode(true);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      window.print();
      setPrintMode(false);
    }));
  }, []);

  const panelCtxValue = { open: panelOpen, setOpen: setPanelOpen, afterId, setAfterId };

  const reorderable = sections.filter(s => s.type !== "note" && s.type !== "sig");
  const fixed       = sections.filter(s => s.type === "note" || s.type === "sig");

  return (
    <PrintCtx.Provider value={printMode}>
      <PanelCtx.Provider value={panelCtxValue}>
        <div style={{ paddingBottom: 80 }}>
          <G />

          {/* ── Add Component Panel ── */}
          {panelOpen && (
            <AddPanel
              onAdd={addSectionAfter}
              onClose={() => setPanelOpen(false)} />
          )}

          <div className="page">
            <div className="corner-bl" /><div className="corner-br" />

            {/* ── Header ── */}
            <div style={{ textAlign: "center", paddingBottom: 30, borderBottom: `1px solid ${C.rule}`, marginBottom: 34 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginBottom: 18 }}>
                <div style={{ height: 1, width: 44, background: C.gold, opacity: 0.45 }} />
                <EditText val={meta.eyebrow} set={updateMeta("eyebrow")}
                  style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", color: C.gold }} />
                <div style={{ height: 1, width: 44, background: C.gold, opacity: 0.45 }} />
              </div>
              <EditText val={meta.title} set={updateMeta("title")} placeholder="Document Title"
                style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 38, letterSpacing: "0.04em", color: C.ink, display: "block", lineHeight: 1.15, marginBottom: 11 }} block />
              <EditText val={meta.subtitle} set={updateMeta("subtitle")} placeholder="Subtitle"
                style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontWeight: 300, fontSize: 16, letterSpacing: "0.1em", color: C.inkSoft, display: "block" }} block />
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 9, marginTop: 18 }}>
                <div style={{ height: 1, width: 28, background: C.gold, opacity: 0.38 }} />
                <div style={{ width: 4, height: 4, background: C.gold, opacity: 0.55, transform: "rotate(45deg)" }} />
                <div style={{ height: 1, width: 28, background: C.gold, opacity: 0.38 }} />
              </div>
            </div>

            {/* ── Meta row ── */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", border: `1px solid ${C.rule}`, marginBottom: 34 }}>
              {metaFields.map((f, i) => (
                <div key={i} style={{ padding: "13px 16px", borderRight: i < 3 ? `1px solid ${C.rule}` : "none" }}>
                  <div style={{ marginBottom: 6 }}>
                    <EditText val={f.label} set={v => updateMetaField(i, "label", v)}
                      style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: C.gold }} />
                  </div>
                  <textarea rows={1} className="ei-line"
                    value={printMode && !f.value.trim() ? "N/A" : f.value}
                    onChange={e => updateMetaField(i, "value", e.target.value)}
                    placeholder="—" readOnly={printMode} />
                </div>
              ))}
            </div>

            {/* ── Sections ── */}
            {reorderable.map((sec, idx) => (
              <Section key={sec.id} sec={sec} slot={idx + 1} total={reorderable.length}
                onSwap={n => swapSlot(sec.id, n)}
                update={fn => updateSection(sec.id, fn)}
                onDelete={() => deleteSection(sec.id)} />
            ))}
            {fixed.map(sec => (
              <Section key={sec.id} sec={sec} slot={0} total={0} onSwap={() => {}} update={fn => updateSection(sec.id, fn)} onDelete={() => deleteSection(sec.id)} />
            ))}
          </div>

          {/* ── Toolbar ── */}
          <div className="toolbar">
            <span className="toolbar-hint">
              Click any text to edit &nbsp;·&nbsp; Click slot № to reorder &nbsp;·&nbsp; Click + to add a component &nbsp;·&nbsp; Click × to remove a row
            </span>
            <button className="btn-print" onClick={handlePrint}>⎙ &nbsp; Print / Export PDF</button>
          </div>
        </div>
      </PanelCtx.Provider>
    </PrintCtx.Provider>
  );
}