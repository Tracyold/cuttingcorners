import type { CorrectableOption } from '../data/questions'
import { correctableOptions } from '../data/questions'

interface CorrectableRowProps {
  label:     string
  required?: boolean
  selected:  CorrectableOption | null
  onChange:  (value: CorrectableOption) => void
}

export default function CorrectableRow({ label, required, selected, onChange }: CorrectableRowProps) {
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
        <span style={{
          fontFamily: 'var(--font-ui)',
          fontSize: 9,
          fontWeight: 600,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'var(--text-muted)',
        }}>
          {label}
        </span>
        {required && (
          <span style={{
            fontFamily: 'var(--font-ui)',
            fontSize: 8,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'rgba(255,211,105,0.7)',
            border: '1px solid rgba(255,211,105,0.35)',
            borderRadius: 4,
            padding: '2px 7px',
          }}>
            Required
          </span>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {correctableOptions.map(opt => {
          const isSelected = selected === opt.value
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: 12,
                fontWeight: isSelected ? 600 : 400,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                padding: '20px 14px',
                background: isSelected ? 'rgba(255,211,105,0.1)' : 'var(--bg-card)',
                color: isSelected ? 'var(--text)' : 'var(--text-muted)',
                border: isSelected ? '1.5px solid rgba(255,211,105,0.45)' : '1.5px solid transparent',
                borderRadius: 16,
                cursor: 'pointer',
                transform: isSelected ? 'scale(1.04)' : 'scale(1)',
                boxShadow: isSelected
                  ? '0 4px 20px rgba(255,211,105,0.08)'
                  : '0 2px 12px rgba(0,0,0,0.1)',
                transition: 'all 240ms cubic-bezier(0.34,1.56,0.64,1)',
                WebkitTapHighlightColor: 'transparent',
                lineHeight: 1.4,
                minHeight: 72,
                textAlign: 'center',
              }}
            >
              {opt.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
