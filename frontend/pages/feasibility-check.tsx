import { useState } from 'react'
import TopNav from '../components/shared/TopNav'
import FeasibilityWizard from '../components/feasibility-test/FeasibilityWizard'

export default function FeasibilityCheckPage() {
  const [modalOpen, setModalOpen] = useState(false)

  const openModal  = () => { setModalOpen(true);  document.body.style.overflow = 'hidden' }
  const closeModal = () => { setModalOpen(false); document.body.style.overflow = ''       }

  return (
    <>
      <div style={{ display: 'none' }}><TopNav /></div>

      <style>{`
        @keyframes fadeIn  { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes heroFade { from { opacity: 0; transform: translateY(20px) } to { opacity: 1; transform: translateY(0) } }

        /* ── Hero ── */
        .hero-eyebrow {
          font-family: var(--font-ui);
          font-size: 9px;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: var(--accent);
          margin: 0 0 20px;
          animation: heroFade 800ms 100ms ease both;
        }
        .hero-heading {
          font-family: var(--font-display);
          font-size: clamp(48px, 10vw, 88px);
          font-weight: 400;
          color: var(--text);
          line-height: 1.0;
          letter-spacing: 0.02em;
          margin: 0 0 28px;
          animation: heroFade 800ms 200ms ease both;
        }
        .hero-rule {
          width: 56px;
          height: 1px;
          background: var(--accent);
          margin: 0 0 32px;
          animation: heroFade 800ms 300ms ease both;
        }
        .hero-body {
          font-family: var(--font-body);
          font-size: clamp(15px, 2vw, 17px);
          line-height: 1.85;
          color: var(--text-muted);
          max-width: 520px;
          margin: 0 0 56px;
          animation: heroFade 800ms 400ms ease both;
        }

        /* ── How it works ── */
        .how-section {
          max-width: 580px;
          margin: 0 0 56px;
          animation: heroFade 800ms 500ms ease both;
        }
        .how-eyebrow {
          font-family: var(--font-ui);
          font-size: 9px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin: 0 0 28px;
        }
        .how-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        @media (max-width: 580px) {
          .how-grid { grid-template-columns: 1fr; }
        }
        .how-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          padding: 20px;
        }
        .how-num {
          font-family: var(--font-display);
          font-size: 32px;
          color: var(--accent);
          opacity: 0.4;
          line-height: 1;
          margin: 0 0 10px;
        }
        .how-text {
          font-family: var(--font-body);
          font-size: 13px;
          line-height: 1.7;
          color: var(--text-muted);
          margin: 0;
        }

        /* ── Note ── */
        .note-block {
          max-width: 580px;
          background: transparent;
          border-left: 2px solid var(--accent);
          padding: 4px 0 4px 20px;
          margin: 0 0 56px;
          animation: heroFade 800ms 600ms ease both;
        }
        .note-label {
          font-family: var(--font-ui);
          font-size: 9px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--accent);
          margin: 0 0 8px;
        }
        .note-text {
          font-family: var(--font-body);
          font-size: 13px;
          line-height: 1.7;
          color: var(--text-muted);
          margin: 0;
        }

        /* ── CTA ── */
        .cta-wrap {
          animation: heroFade 800ms 700ms ease both;
        }
        .eval-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: var(--accent);
          color: var(--bg);
          border: none;
          padding: 18px 44px;
          font-family: var(--font-ui);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 300ms ease;
          border-radius: 0;
          box-shadow: 0 4px 32px rgba(255,211,105,0.18);
        }
        .eval-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 40px rgba(255,211,105,0.28);
        }
        .eval-btn:active { transform: translateY(0); }

        /* ── Modal ── */
        .modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 200;
          background: var(--bg-gradient);
          animation: fadeIn 200ms ease both;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .modal-header {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 24px;
          border-bottom: 1px solid var(--border);
        }
        .modal-brand {
          font-family: var(--font-ui);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--text-muted);
        }
        .modal-close {
          width: 34px;
          height: 34px;
          background: transparent;
          border: 1px solid var(--border);
          color: var(--text-muted);
          font-size: 20px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 180ms ease;
          border-radius: 50%;
          line-height: 1;
        }
        .modal-close:hover {
          border-color: var(--text-muted);
          color: var(--text);
        }
        .modal-body {
          flex: 1;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          overscroll-behavior: contain;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .modal-body::-webkit-scrollbar { width: 3px; }
        .modal-body::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }
        .modal-inner {
          width: 100%;
          max-width: 480px;
          padding: 0 24px;
        }
      `}</style>

      {/* ── Hero page ── */}
      <main style={{ minHeight: '100vh', background: 'var(--bg-gradient)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

        {/* Large hero area */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', padding: 'clamp(80px, 12vw, 120px) clamp(24px, 6vw, 80px) 60px' }}>
          <div style={{ maxWidth: 760 }}>
            <p className="hero-eyebrow">Cutting Corners Gems</p>
            <h1 className="hero-heading">
              Stone<br />Feasibility<br />Evaluation
            </h1>
            <div className="hero-rule" />
            <p className="hero-body">
              A cutter's eye in your hands. Answer questions about your stone's current condition and receive a preliminary assessment of whether cutting or recutting is worthwhile — and what service it may need.
            </p>
          </div>
        </div>

        {/* How it works + note + CTA */}
        <div style={{ padding: '0 clamp(24px, 6vw, 80px) clamp(60px, 10vw, 100px)' }}>

          <div className="how-section">
            <p className="how-eyebrow">How it works</p>
            <div className="how-grid">
              {[
                { n: '01', text: 'Select all options that currently apply to your stone. Not what it was — what it is right now.' },
                { n: '02', text: "Some options may overlap. Don't skip them — select everything that applies." },
                { n: '03', text: 'Tap the info icon on any item for a plain-language explanation and how to assess it.' },
                { n: '04', text: 'Evaluate as many stones as you like. Export results as PDF at the end.' },
              ].map(item => (
                <div key={item.n} className="how-card">
                  <p className="how-num">{item.n}</p>
                  <p className="how-text">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="note-block">
            <p className="note-label">Please note</p>
            <p className="note-text">
              This is a <strong style={{ color: 'var(--text)', fontWeight: 500 }}>preliminary estimation only</strong>. It does not account for the gemstone's material, which can be a defining factor regardless of score.
            </p>
          </div>

          <div className="cta-wrap">
            <button className="eval-btn" onClick={openModal}>
              Begin Evaluation
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

        </div>
      </main>

      {/* ── Full screen modal ── */}
      {modalOpen && (
        <div className="modal-backdrop">

          <div className="modal-header">
            <span className="modal-brand">Stone Evaluation</span>
            <button className="modal-close" onClick={closeModal} aria-label="Close">×</button>
          </div>

          <div className="modal-body">
            <div className="modal-inner">
              <FeasibilityWizard onRequestQuote={closeModal} />
            </div>
          </div>

        </div>
      )}
    </>
  )
}
