import { paths } from './shared-estimates';

export default function MobileEstimates() {
  const scrollToNext = (currentN: string) => {
    const currentIndex = paths.findIndex(p => p.n === currentN);
    const nextId = currentIndex < paths.length - 1
      ? `mob-est-${paths[currentIndex + 1].n}`
      : 'mob-est-footer';
    const el = document.getElementById(nextId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <style>{`
        .mest-card {
          padding: 56px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          scroll-margin-top: 80px;
        }
        .mest-num {
          font-family: 'Oranienbaum', serif;
          font-size: clamp(72px, 20vw, 100px);
          line-height: 1;
          color: rgba(212,175,55,0.25);
          margin-bottom: 16px;
          display: block;
        }
        .mest-tag {
          display: inline-block;
          padding: 4px 12px;
          background: rgba(212,175,55,0.12);
          border: 1px solid rgba(212,175,55,0.3);
          font-family: 'Montserrat', sans-serif;
          font-size: 9px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(212,175,55,0.9);
          margin-bottom: 14px;
        }
        .mest-title {
          font-family: 'Oranienbaum', serif;
          font-size: clamp(26px, 7vw, 34px);
          color: #FAFAFA;
          margin-bottom: 16px;
          line-height: 1.15;
        }
        .mest-warning {
          padding: 14px 16px;
          background: rgba(212,175,55,0.06);
          border-left: 2px solid rgba(212,175,55,0.4);
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          color: rgba(255,220,100,0.8);
          line-height: 1.7;
          margin-bottom: 18px;
        }
        .mest-body {
          font-family: 'Comfortaa', sans-serif;
          font-size: 14px;
          color: rgba(255,255,255,0.55);
          line-height: 1.85;
          margin-bottom: 24px;
        }
        .mest-details {
          list-style: none;
          padding: 0;
          margin: 0 0 28px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .mest-details li {
          display: flex;
          gap: 10px;
          align-items: flex-start;
          font-family: 'Comfortaa', sans-serif;
          font-size: 13px;
          color: rgba(255,255,255,0.45);
          line-height: 1.6;
        }
        .mest-details li::before {
          content: '';
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: rgba(212,175,55,0.5);
          flex-shrink: 0;
          margin-top: 7px;
        }
        .mest-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 22px;
          border: 1px solid rgba(212,175,55,0.35);
          background: transparent;
          color: rgba(212,175,55,0.85);
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          text-decoration: none;
          transition: background 200ms;
          margin-bottom: 32px;
        }
        .mest-scroll-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          border: 1px solid rgba(100,160,220,0.4);
          background: transparent;
          cursor: pointer;
          margin-top: 8px;
          transition: background 200ms;
          animation: mest-pulse 2s ease-in-out infinite;
        }
        .mest-scroll-btn:hover {
          background: rgba(100,160,220,0.1);
          animation: none;
        }
        .mest-scroll-arrow {
          width: 0;
          height: 0;
          border-left: 7px solid transparent;
          border-right: 7px solid transparent;
          border-top: 10px solid rgba(100,160,220,0.85);
          margin-top: 2px;
        }
        @keyframes mest-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(100,160,220,0.3); }
          50% { box-shadow: 0 0 0 8px rgba(100,160,220,0); }
        }
      `}</style>

      <div>
        {paths.map((p) => (
          <div key={p.n} id={`mob-est-${p.n}`} className="mest-card">
            <span className="mest-num">{p.n}</span>
            {p.tag && <div className="mest-tag">{p.tag}</div>}
            <h2 className="mest-title">{p.title}</h2>
            {p.warning && <div className="mest-warning">{p.warning}</div>}
            <p className="mest-body">{p.body}</p>
            <ul className="mest-details">
              {p.details.map((d, i) => <li key={i}>{d}</li>)}
            </ul>
            <a href={p.cta.href} className="mest-cta-btn">{p.cta.label} →</a>
            <button
              className="mest-scroll-btn"
              onClick={() => scrollToNext(p.n)}
              aria-label="Scroll to next"
            >
              <div className="mest-scroll-arrow" />
            </button>
          </div>
        ))}
        <div id="mob-est-footer" style={{ paddingTop: '32px' }} />
      </div>
    </>
  );
}
