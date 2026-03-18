import type { ScoreBreakdown } from '../logic/calculator'
import EstimateDisplay from './EstimateDisplay'

interface StoneInfo {
  species:    string
  variety:    string
  weightCt:   string
  dimensions: string
  cut:        string
}

interface ResultsDisplayProps {
  results:        ScoreBreakdown
  weightCt:       number
  stoneInfo:      StoneInfo
  onStartOver:    () => void
  onRequestQuote: () => void
}

const bandColor: Record<string, string> = {
  '80-100': '#a3c4a8',
  '60-79':  '#7dd3fc',
  '40-59':  '#a3e635',
  '18-39':  '#7e9ab5',
  '0-17':   '#9ea8b8',
}

export default function ResultsDisplay({ results, weightCt, stoneInfo, onStartOver, onRequestQuote }: ResultsDisplayProps) {
  const pct   = Math.max(0, Math.min(100, results.feasibilityPercent))
  const color = bandColor[results.band]

  const handleExport = () => window.print()

  const stoneFields = [
    { label: 'Species',    value: stoneInfo.species    },
    { label: 'Variety',    value: stoneInfo.variety    },
    { label: 'Weight',     value: stoneInfo.weightCt ? `${stoneInfo.weightCt} ct` : '' },
    { label: 'Dimensions', value: stoneInfo.dimensions },
    { label: 'Cut / Shape',value: stoneInfo.cut        },
  ].filter(f => f.value)

  return (
    <>
      <style>{`
        @media print {
          /* Hide everything */
          body * { visibility: hidden; }

          /* Show only the results card */
          .ccg-results, .ccg-results * { visibility: visible; }
          .ccg-results {
            position: fixed;
            inset: 0;
            padding: 40px 48px;
            background: #0c0a09 !important;
            color: #e7e5e4 !important;
            display: flex;
            flex-direction: column;
            gap: 24px;
          }
          .ccg-no-print { display: none !important; }

          /* Force colors to print */
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }

        .results-wrap {
          display: flex;
          flex-direction: column;
          gap: clamp(16px, 3vw, 24px);
          padding: clamp(16px, 4vw, 32px) 0;
          width: 100%;
        }

        /* Stone info block */
        .stone-info-block {
          border: 1px solid var(--border);
          padding: clamp(16px, 3vw, 24px);
        }
        .stone-info-label {
          font-family: var(--font-ui);
          font-size: clamp(9px, 1.2vw, 10px);
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--accent);
          margin: 0 0 14px;
        }
        .stone-info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px 20px;
        }
        @media (max-width: 400px) {
          .stone-info-grid { grid-template-columns: 1fr; }
        }
        .stone-info-field-label {
          font-family: var(--font-ui);
          font-size: clamp(8px, 1.2vw, 9px);
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin: 0 0 3px;
        }
        .stone-info-field-value {
          font-family: var(--font-body);
          font-size: clamp(14px, 2vw, 15px);
          color: var(--text);
          margin: 0;
        }

        /* Score box */
        .score-box {
          width: 100%;
          border: 2px solid var(--box-color);
          padding: clamp(28px, 6vw, 48px) clamp(20px, 5vw, 40px);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: clamp(12px, 2.5vw, 20px);
          box-shadow: 0 0 40px color-mix(in srgb, var(--box-color) 20%, transparent);
        }
        .score-eyebrow {
          font-family: var(--font-ui);
          font-size: clamp(10px, 1.5vw, 12px);
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin: 0;
        }
        .score-number {
          font-family: var(--font-display);
          font-size: clamp(72px, 18vw, 120px);
          font-weight: 400;
          line-height: 1;
          margin: 0;
        }
        .score-divider {
          width: 40px; height: 1px;
          background: var(--box-color);
          opacity: 0.6;
        }
        .score-service-label {
          font-family: var(--font-ui);
          font-size: clamp(10px, 1.5vw, 11px);
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin: 0;
        }
        .score-service {
          font-family: var(--font-display);
          font-size: clamp(22px, 5vw, 36px);
          font-weight: 400;
          color: var(--text);
          margin: 0;
          line-height: 1.2;
        }
        .score-weight {
          font-family: var(--font-body);
          font-size: clamp(14px, 2vw, 16px);
          color: var(--text-muted);
          margin: 0;
        }
        .score-bar-track {
          width: 100%; height: 3px;
          background: rgba(255,255,255,0.08);
          border-radius: 2px; overflow: hidden;
        }
        .score-bar-fill {
          height: 100%; border-radius: 2px;
          transition: width 900ms cubic-bezier(0.16,1,0.3,1);
        }

        /* Disclaimer */
        .disclaimer {
          border-left: 2px solid rgba(255,255,255,0.12);
          padding: clamp(12px, 2vw, 18px) clamp(14px, 2.5vw, 20px);
        }
        .disclaimer p {
          font-family: var(--font-body);
          font-size: clamp(13px, 1.8vw, 15px);
          line-height: 1.8;
          color: var(--text-muted);
          margin: 0 0 12px;
        }
        .disclaimer p:last-child { margin: 0; }

        /* Action buttons */
        .results-actions {
          display: flex; flex-direction: column;
          gap: clamp(8px, 1.5vw, 12px); width: 100%;
        }
        .btn-export {
          width: 100%; display: flex; align-items: center; justify-content: center; gap: 10px;
          background: transparent; color: var(--accent);
          border: 1px solid rgba(255,211,105,0.35);
          padding: clamp(14px, 2.5vw, 18px) 20px;
          font-family: var(--font-ui); font-size: clamp(11px, 1.5vw, 13px);
          font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase;
          cursor: pointer; border-radius: 14px; transition: all 220ms ease;
        }
        .btn-export:hover { background: rgba(255,211,105,0.06); border-color: rgba(255,211,105,0.6); }
        .btn-quote {
          width: 100%; display: flex; align-items: center; justify-content: center;
          background: var(--accent); color: var(--bg); border: none;
          padding: clamp(16px, 2.5vw, 20px) 20px;
          font-family: var(--font-ui); font-size: clamp(11px, 1.5vw, 13px);
          font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase;
          cursor: pointer; border-radius: 14px; transition: all 220ms ease;
          box-shadow: 0 4px 16px rgba(255,211,105,0.18);
        }
        .btn-quote:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(255,211,105,0.28); }
        .btn-restart {
          width: 100%; display: flex; align-items: center; justify-content: center;
          background: transparent; color: var(--text-muted);
          border: 1px solid var(--border);
          padding: clamp(14px, 2.5vw, 18px) 20px;
          font-family: var(--font-ui); font-size: clamp(11px, 1.5vw, 13px);
          font-weight: 500; letter-spacing: 0.15em; text-transform: uppercase;
          cursor: pointer; border-radius: 14px; transition: all 220ms ease;
        }
        .btn-restart:hover { border-color: var(--text-muted); color: var(--text); }
      `}</style>

      <div className="results-wrap ccg-results" style={{ '--box-color': color } as React.CSSProperties}>

        {/* ── Print header ── */}
        <div style={{ display: 'none' }} className="print-only">
          <p style={{ fontFamily: 'var(--font-ui)', fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--text-muted)', margin: '0 0 4px' }}>
            Cutting Corners Gems
          </p>
          <p style={{ fontFamily: 'var(--font-ui)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', margin: 0 }}>
            Stone Feasibility Evaluation
          </p>
        </div>

        {/* ── Stone info ── */}
        {stoneFields.length > 0 && (
          <div className="stone-info-block">
            <p className="stone-info-label">Stone Information</p>
            <div className="stone-info-grid">
              {stoneFields.map(f => (
                <div key={f.label}>
                  <p className="stone-info-field-label">{f.label}</p>
                  <p className="stone-info-field-value">{f.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Score box ── */}
        <div className="score-box">
          <p className="score-eyebrow">Feasibility Score</p>
          <p className="score-number" style={{ color }}>{pct}</p>
          <div className="score-bar-track">
            <div className="score-bar-fill" style={{ width: `${pct}%`, background: color }} />
          </div>
          <div className="score-divider" />
          <p className="score-service-label">Recommended Service</p>
          <p className="score-service">{results.recommendation}</p>
          <p className="score-weight">
            Estimated material loss:&nbsp;
            <span style={{ color: 'var(--text)', fontWeight: 500 }}>{results.weightLoss}</span>
          </p>
        </div>

        {/* ── Estimate ── */}
        <EstimateDisplay input={{ weightCt, recommendation: results.recommendation, feasibilityPercent: results.feasibilityPercent }} />

        {/* ── Disclaimer ── */}
        <div className="disclaimer">
          <p>
            All results should be followed by an in-person evaluation by a qualified gemstone cutter —
            including a no-cut recommendation. Result accuracy is entirely dependent on selection accuracy.
          </p>
          <p>
            This is an educational tool. There are many evaluation categories not included here — this
            represents only one type of assessment amongst many a cutter considers before making a decision.
          </p>
        </div>

        {/* ── Actions ── */}
        <div className="results-actions ccg-no-print">
          <button type="button" onClick={handleExport} className="btn-export">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1v8M4 6l3 3 3-3M2 10v1a1 1 0 001 1h8a1 1 0 001-1v-1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Export as PDF
          </button>
          <button type="button" onClick={onRequestQuote} className="btn-quote">Request a Quote</button>
          <button type="button" onClick={onStartOver} className="btn-restart">Start Over</button>
        </div>

      </div>
    </>
  )
}
