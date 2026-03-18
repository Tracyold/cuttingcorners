import type { CorrectableOption } from '../data/questions'
import { correctableOptions, limitingItems, structuralItems } from '../data/questions'

const CATEGORY_ITEMS: Record<string, string[]> = {
  external:   ['light_surface_wear', 'shallow_abrasions'],
  light:      ['opaque_translucent', 'color_zoning', 'extinction', 'lack_luster', 'window'],
  geometry:   ['off_center_culet', 'excessive_depth', 'asymmetry'],
  structural: ['surface_reaching_inclusion', 'deep_abrasions', 'internal_fissure', 'internal_external_void', 'cleavage_plane_risk'],
}

const ALL_ITEMS = [...limitingItems, ...structuralItems]
const LABEL_MAP: Record<string, string> = ALL_ITEMS.reduce((acc, item) => {
  acc[item.id] = item.label; return acc
}, {} as Record<string, string>)

interface CorrectableRowProps {
  label:             string
  required?:         boolean
  rowId:             'external' | 'light' | 'geometry' | 'structural'
  selected:          CorrectableOption | null
  onChange:          (value: CorrectableOption) => void
  limitingChecked:   Set<string>
  structuralChecked: Set<string>
}

export default function CorrectableRow({
  rowId, selected, onChange, limitingChecked, structuralChecked
}: CorrectableRowProps) {
  const relevantIds   = CATEGORY_ITEMS[rowId] ?? []
  const selectedItems = relevantIds.filter(id => limitingChecked.has(id) || structuralChecked.has(id))

  return (
    <div style={{ marginBottom: 32 }}>

      {selectedItems.length > 0 && (
        <div style={{ marginBottom: 20, paddingBottom: 14, borderBottom: '0.5px solid var(--border)' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-muted)', opacity: 0.5, margin: '0 0 10px' }}>
            Your selections
          </p>
          {selectedItems.map(id => (
            <p key={id} style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 300, color: 'var(--text-muted)', margin: '0 0 4px' }}>
              — {LABEL_MAP[id] ?? id}
            </p>
          ))}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {correctableOptions.map(opt => {
          const isSelected = selected === opt.value
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 13,
                fontWeight: isSelected ? 400 : 300,
                color: isSelected ? 'var(--text)' : 'var(--text-muted)',
                padding: '18px 12px',
                background: isSelected ? 'rgba(255,211,105,0.04)' : 'rgba(255,255,255,0.015)',
                border: `0.5px solid ${isSelected ? 'rgba(255,211,105,0.28)' : 'rgba(255,255,255,0.07)'}`,
                borderRadius: 6,
                cursor: 'pointer',
                transition: 'all 200ms ease',
                WebkitTapHighlightColor: 'transparent',
                textAlign: 'center',
                lineHeight: 1.4,
                boxShadow: isSelected
                  ? '0 4px 20px rgba(0,0,0,0.14), 0 0 16px rgba(255,211,105,0.04)'
                  : '0 2px 10px rgba(0,0,0,0.1)',
                transform: isSelected ? 'translateY(-1px)' : 'translateY(0)',
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
