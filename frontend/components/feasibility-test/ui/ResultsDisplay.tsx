import { useRef } from 'react'
import type { ScoreBreakdown } from '../logic/calculator'
import EstimateDisplay from './EstimateDisplay'

interface ResultsDisplayProps {
  results:        ScoreBreakdown
  weightCt:       number
  onStartOver:    () => void
  onRequestQuote: () => void
}

const bandColor: Record<string, string> = {
  '80-100': '#86efac',
  '60-79':  '#7dd3fc',
  '40-59':  '#fcd34d',
  '18-39':  '#fb923c',
  '0-17':   '#f87171',
}

export default function ResultsDisplay({ results, weightCt, onStartOver, onRequestQuote }: ResultsDisplayProps) {
  const pct   = Math.max(0, Math.min(100, results.feasibilityPercent))
  const color = bandColor[results.band]

  const handleExport = () => {
    window.print()
  }

  return (
    <>
      <style>{`
        @media print {
          /* Hide everything except the results */
          body * { visibility: hidden; }
          .ccg-results, .ccg-results * { visibility: visible; }
          .ccg-results {
            position: fixed;
            inset: 0;
            padding: 40px;
            background: #13161c !important;
            color: #eeeeee !important;
          }
          .ccg-no-print { display: none !important; }
        }
      `}</style>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* ── Results (printed) ── */}
        <div className="ccg-results" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Print header */}
          <div style={{ textAlign: 'center', paddingBottom: 20, borderBottom: '1px solid var(--border)', marginBottom: 4 }}>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--text-muted)', margin: '0 0 4px' }}>
              Cutting Corners Gems
            </p>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', margin: 0 }}>
              Stone Feasibility Evaluation
            </p>
          </div>

          {/* Score hero */}
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--text-muted)', margin: '0 0 12px' }}>
              Feasibility Score
            </p>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 80, fontWeight: 400, color, lineHeight: 1, margin: '0 0 14px' }}>
              {pct}%
            </p>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', margin: 0 }}>
              {results.recommendation}
            </p>
          </div>

          {/* Bar */}
          <div style={{ height: 3, background: 'var(--border)', borderRadius: 2 }}>
            <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 2, transition: 'width 900ms cubic-bezier(0.16,1,0.3,1)' }} />
          </div>

          {/* Net / Max */}
          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border)', paddingTop: 14 }}>
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              Net &nbsp;<strong style={{ color: 'var(--text)', fontWeight: 600 }}>{results.netScore}</strong>
            </span>
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              Max &nbsp;<strong style={{ color: 'var(--text)', fontWeight: 600 }}>{results.maxPossible}</strong>
            </span>
          </div>

          {/* Recommendation */}
          <div style={{ background: 'var(--bg-card)', border: `1px solid ${color}`, padding: '22px 24px', boxShadow: `0 0 28px ${color}18` }}>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--text-muted)', margin: '0 0 8px' }}>
              Recommended Service
            </p>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 30, color: 'var(--text)', margin: '0 0 6px' }}>
              {results.recommendation}
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-muted)', margin: 0 }}>
              Estimated material loss: <span style={{ color: 'var(--text)', fontWeight: 500 }}>{results.weightLoss}</span>
            </p>
          </div>

          <EstimateDisplay input={{ weightCt, recommendation: results.recommendation, feasibilityPercent: results.feasibilityPercent }} />

          {/* Disclaimer */}
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontStyle: 'italic', color: 'var(--text-muted)', opacity: 0.5, textAlign: 'center', lineHeight: 1.6, margin: 0 }}>
            Preliminary estimation only. Stone material is not factored into this result.
          </p>

        </div>

        {/* ── Buttons (hidden on print) ── */}
        <div className="ccg-no-print" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>

          <button
            type="button"
            onClick={handleExport}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              background: 'transparent',
              color: 'var(--accent)',
              border: '1px solid rgba(255,211,105,0.4)',
              padding: '16px 20px',
              fontFamily: 'var(--font-ui)',
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              borderRadius: 14,
              transition: 'all 220ms ease',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1v8M4 6l3 3 3-3M2 10v1a1 1 0 001 1h8a1 1 0 001-1v-1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Export as PDF
          </button>

          <button type="button" onClick={onRequestQuote} style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--accent)',
            color: 'var(--bg)',
            border: 'none',
            padding: '18px 20px',
            fontFamily: 'var(--font-ui)',
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            borderRadius: 14,
            transition: 'all 220ms ease',
            boxShadow: '0 4px 16px rgba(255,211,105,0.18)',
          }}>
            Request a Quote
          </button>

          <button type="button" onClick={onStartOver} style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'transparent',
            color: 'var(--text-muted)',
            border: '1px solid var(--border)',
            padding: '18px 20px',
            fontFamily: 'var(--font-ui)',
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            borderRadius: 14,
            transition: 'all 220ms ease',
          }}>
            Start Over
          </button>

        </div>

      </div>
    </>
  )
}
