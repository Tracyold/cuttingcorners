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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* Score hero */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        padding: '28px 24px',
        textAlign: 'center',
      }}>
        <p style={{ fontFamily: 'var(--font-ui)', fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--text-muted)', margin: '0 0 12px' }}>
          Feasibility Score
        </p>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: 72, fontWeight: 400, color, lineHeight: 1, margin: '0 0 12px' }}>
          {pct}%
        </p>
        <p style={{ fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', margin: 0 }}>
          {results.recommendation}
        </p>
      </div>

      {/* Progress bar */}
      <div style={{ height: 2, background: 'var(--border)', overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          width: `${pct}%`,
          background: color,
          transition: 'width 800ms cubic-bezier(0.16,1,0.3,1)',
        }} />
      </div>

      {/* Score breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {[
          { label: 'Positive',    value: results.positiveScore    },
          { label: 'Limiting',    value: results.limitingScore    },
          { label: 'Structural',  value: results.structuralScore  },
          { label: 'Correctable', value: results.correctableScore },
        ].map(row => (
          <div key={row.label} style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            padding: '14px 16px',
          }}>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', margin: '0 0 6px' }}>
              {row.label}
            </p>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: 26,
              fontWeight: 400,
              color: row.value >= 0 ? 'var(--text)' : '#f87171',
              margin: 0,
            }}>
              {row.value >= 0 ? '+' : ''}{row.value}
            </p>
          </div>
        ))}
      </div>

      {/* Net / Max */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        borderTop: '1px solid var(--border)',
        paddingTop: 16,
      }}>
        <span style={{ fontFamily: 'var(--font-ui)', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
          Net Score &nbsp;<strong style={{ color: 'var(--text)' }}>{results.netScore}</strong>
        </span>
        <span style={{ fontFamily: 'var(--font-ui)', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
          Max &nbsp;<strong style={{ color: 'var(--text)' }}>{results.maxPossible}</strong>
        </span>
      </div>

      {/* Recommendation card */}
      <div style={{
        background: 'var(--bg-card)',
        border: `1px solid ${color}`,
        padding: '20px 24px',
        boxShadow: `0 0 24px ${color}18`,
      }}>
        <p style={{ fontFamily: 'var(--font-ui)', fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--text-muted)', margin: '0 0 8px' }}>
          Recommended Service
        </p>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 400, color: 'var(--text)', margin: '0 0 6px' }}>
          {results.recommendation}
        </p>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-muted)', margin: 0 }}>
          Estimated material loss: <span style={{ color: 'var(--text)', fontWeight: 500 }}>{results.weightLoss}</span>
        </p>
      </div>

      {/* Estimate */}
      <EstimateDisplay input={{ weightCt, recommendation: results.recommendation, feasibilityPercent: results.feasibilityPercent }} />

      {/* Actions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 8 }}>
        <button
          type="button"
          onClick={onRequestQuote}
          className="btn-primary"
          style={{ width: '100%', justifyContent: 'center' }}
        >
          Request a Quote
        </button>
        <button
          type="button"
          onClick={onStartOver}
          className="btn-secondary"
          style={{ width: '100%', justifyContent: 'center' }}
        >
          Start Over
        </button>
      </div>

    </div>
  )
}
