import { useState, useCallback, Dispatch, SetStateAction, useMemo } from 'react'
import type { CorrectableOption } from './data/questions'
import { positiveItems, limitingItems, structuralItems, correctableRows } from './data/questions'
import { calculateAll } from './logic/calculator'
import type { CorrectableSelections, ScoreBreakdown } from './logic/calculator'
import CheckItem from './ui/CheckItem'
import CorrectableRowComponent from './ui/CorrectableRow'
import ResultsDisplay from './ui/ResultsDisplay'

interface StoneInfo {
  species: string; variety: string; weightCt: string; dimensions: string; cut: string
}

interface FeasibilityWizardProps {
  onRequestQuote?: () => void
}

// ── Build dynamic step list from grouped data ─────────────────
type StepKind =
  | { type: 'stone-info' }
  | { type: 'positive-group';   group: string }
  | { type: 'limiting-group';   group: string }
  | { type: 'structural-group'; group: string }
  | { type: 'correctable-row';  rowId: 'external' | 'light' | 'geometry' | 'structural' }
  | { type: 'results' }

function groupBy<T extends { group: string }>(items: T[]): Record<string, T[]> {
  return items.reduce((acc, item) => {
    if (!acc[item.group]) acc[item.group] = []
    acc[item.group].push(item)
    return acc
  }, {} as Record<string, T[]>)
}

const positiveGroups  = groupBy(positiveItems)
const limitingGroups  = groupBy(limitingItems)
const structuralGroup = groupBy(structuralItems)

function buildSteps(): StepKind[] {
  const steps: StepKind[] = [{ type: 'stone-info' }]
  Object.keys(positiveGroups).forEach(g  => steps.push({ type: 'positive-group',   group: g }))
  Object.keys(limitingGroups).forEach(g  => steps.push({ type: 'limiting-group',   group: g }))
  Object.keys(structuralGroup).forEach(g => steps.push({ type: 'structural-group', group: g }))
  correctableRows.forEach(r => steps.push({ type: 'correctable-row', rowId: r.id }))
  steps.push({ type: 'results' })
  return steps
}

// ── Step metadata ─────────────────────────────────────────────
function stepLabel(step: StepKind): string {
  switch (step.type) {
    case 'stone-info':       return 'Stone Information'
    case 'positive-group':   return step.group
    case 'limiting-group':   return step.group
    case 'structural-group': return 'Structural Condition'
    case 'correctable-row':  return correctableRows.find(r => r.id === step.rowId)?.label ?? step.rowId
    case 'results':          return 'Results'
  }
}

function stepCategory(step: StepKind): string {
  switch (step.type) {
    case 'stone-info':       return ''
    case 'positive-group':   return 'Positive Characteristics'
    case 'limiting-group':   return 'Limiting Characteristics'
    case 'structural-group': return 'Structural Condition'
    case 'correctable-row':  return 'Correctable Likelihood'
    case 'results':          return ''
  }
}

function stepInstruction(step: StepKind): string {
  switch (step.type) {
    case 'stone-info':       return 'Fill in what you know. Leave anything blank that you are unsure of.'
    case 'positive-group':   return "Select ALL that currently apply to your stone. Leave the rest unmarked."
    case 'limiting-group':   return "Select ALL that currently apply to your stone. Leave the rest unmarked."
    case 'structural-group': return "Select ALL that currently apply to your stone. Leave the rest unmarked."
    case 'correctable-row':  return 'Select the ONE option that best describes this category.'
    case 'results':          return ''
  }
}

export default function FeasibilityWizard({ onRequestQuote }: FeasibilityWizardProps) {
  const STEPS = useMemo(() => buildSteps(), [])

  const [stepIndex,         setStepIndex]         = useState(0)
  const [stoneInfo,         setStoneInfo]         = useState<StoneInfo>({ species: '', variety: '', weightCt: '', dimensions: '', cut: '' })
  const [positiveChecked,   setPositiveChecked]   = useState<Set<string>>(new Set())
  const [limitingChecked,   setLimitingChecked]   = useState<Set<string>>(new Set())
  const [structuralChecked, setStructuralChecked] = useState<Set<string>>(new Set())
  const [correctableSelections, setCorrectableSelections] = useState<CorrectableSelections>({
    external: null, light: null, geometry: null, structural: null,
  })
  const [results, setResults] = useState<ScoreBreakdown | null>(null)

  const currentStep = STEPS[stepIndex]
  const totalSteps  = STEPS.length - 1 // exclude results from count
  const isResults   = currentStep.type === 'results'

  // progress: exclude stone-info and results from bar
  const contentSteps  = STEPS.filter(s => s.type !== 'results')
  const contentIndex  = contentSteps.findIndex(s => s === currentStep)
  const progressPct   = isResults ? 100 : ((contentIndex) / (contentSteps.length - 1)) * 100

  const scrollTop = () => {
    const body = document.querySelector('.modal-body')
    if (body) body.scrollTop = 0
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleNext = () => {
    if (currentStep.type === 'correctable-row') {
      // If last correctable row, compute results next
      const lastCorr = STEPS.filter(s => s.type === 'correctable-row').at(-1)
      if (lastCorr === currentStep) {
        setResults(calculateAll(positiveChecked, limitingChecked, structuralChecked, correctableSelections))
      }
    }
    setStepIndex(i => Math.min(i + 1, STEPS.length - 1))
    scrollTop()
  }

  const handleBack = () => {
    setStepIndex(i => Math.max(i - 1, 0))
    scrollTop()
  }

  const handleStartOver = () => {
    setStepIndex(0)
    setStoneInfo({ species: '', variety: '', weightCt: '', dimensions: '', cut: '' })
    setPositiveChecked(new Set())
    setLimitingChecked(new Set())
    setStructuralChecked(new Set())
    setCorrectableSelections({ external: null, light: null, geometry: null, structural: null })
    setResults(null)
    scrollTop()
  }

  const toggleChecked = useCallback(
    (setter: Dispatch<SetStateAction<Set<string>>>) =>
      (id: string, checked: boolean) => {
        setter((prev: Set<string>) => {
          const next = new Set(prev)
          checked ? next.add(id) : next.delete(id)
          return next
        })
      }, []
  )

  const handleCorrectableChange = (row: keyof CorrectableSelections, value: CorrectableOption) => {
    setCorrectableSelections(prev => ({ ...prev, [row]: value }))
  }

  // Can proceed check
  const canProceed = (() => {
    if (currentStep.type === 'correctable-row') {
      return correctableSelections[currentStep.rowId] !== null
    }
    return true
  })()

  const category    = stepCategory(currentStep)
  const label       = stepLabel(currentStep)
  const instruction = stepInstruction(currentStep)

  return (
    <>
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .wiz-slide { animation: slideIn 260ms cubic-bezier(0.16,1,0.3,1) both; }
        .wiz-input::placeholder { color: var(--text-muted); opacity: 0.45; }
        .wiz-input:focus { outline: none; border-color: var(--accent) !important; }
        .wiz-btn-primary {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: var(--accent);
          color: var(--bg);
          border: none;
          padding: 16px 20px;
          font-family: var(--font-ui);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          cursor: pointer;
          border-radius: 12px;
          transition: all 220ms ease;
          box-shadow: 0 4px 16px rgba(255,211,105,0.2);
        }
        .wiz-btn-primary:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 6px 24px rgba(255,211,105,0.3);
        }
        .wiz-btn-primary:disabled { opacity: 0.25; cursor: not-allowed; }
        .wiz-btn-secondary {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-card);
          color: var(--text-muted);
          border: 1px solid var(--border);
          padding: 16px 20px;
          font-family: var(--font-ui);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          cursor: pointer;
          border-radius: 12px;
          transition: all 220ms ease;
        }
        .wiz-btn-secondary:hover {
          border-color: var(--text-muted);
          color: var(--text);
        }
      `}</style>

      <div style={{ padding: '24px 20px 48px' }}>

        {/* ── Progress bar ── */}
        {!isResults && (
          <div style={{ marginBottom: 28 }}>
            {/* Category + step count */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 10 }}>
              <div>
                {category && (
                  <p style={{ fontFamily: 'var(--font-ui)', fontSize: 8, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--text-muted)', margin: '0 0 3px' }}>
                    {category}
                  </p>
                )}
                <p style={{ fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', margin: 0 }}>
                  {label}
                </p>
              </div>
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: 9, color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
                {contentIndex + 1} / {contentSteps.length}
              </span>
            </div>

            {/* Segment bar */}
            <div style={{ display: 'flex', gap: 3 }}>
              {contentSteps.map((s, i) => (
                <div key={i} style={{
                  height: 3,
                  flex: 1,
                  borderRadius: 2,
                  background: i <= contentIndex ? 'var(--accent)' : 'var(--border)',
                  transition: 'background 300ms ease',
                }} />
              ))}
            </div>
          </div>
        )}

        {/* ── Instruction ── */}
        {!isResults && instruction && (
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 13,
            color: 'var(--text-muted)',
            lineHeight: 1.7,
            margin: '0 0 22px',
            paddingBottom: 18,
            borderBottom: '1px solid var(--border)',
          }}>
            {instruction}
          </p>
        )}

        {/* ── STONE INFO ── */}
        {currentStep.type === 'stone-info' && (
          <div className="wiz-slide" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { key: 'species',    label: 'Species',             placeholder: 'e.g. Corundum'       },
              { key: 'variety',    label: 'Variety',             placeholder: 'e.g. Blue Sapphire'  },
              { key: 'weightCt',   label: 'Weight (ct)',         placeholder: 'e.g. 2.4'            },
              { key: 'dimensions', label: 'Dimensions (mm)',     placeholder: 'e.g. 9 x 7 x 5'     },
              { key: 'cut',        label: 'Current Cut / Shape', placeholder: 'e.g. Oval Mixed Cut' },
            ].map(field => (
              <div key={field.key}>
                <label style={{ display: 'block', fontFamily: 'var(--font-ui)', fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 7 }}>
                  {field.label}
                </label>
                <input
                  type="text"
                  className="wiz-input"
                  value={stoneInfo[field.key as keyof StoneInfo]}
                  onChange={e => setStoneInfo(prev => ({ ...prev, [field.key]: e.target.value }))}
                  placeholder={field.placeholder}
                  style={{
                    width: '100%',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    color: 'var(--text)',
                    fontFamily: 'var(--font-body)',
                    fontSize: 15,
                    padding: '13px 16px',
                    borderRadius: 10,
                    transition: 'border-color 200ms ease',
                  }}
                />
              </div>
            ))}
          </div>
        )}

        {/* ── POSITIVE GROUP ── */}
        {currentStep.type === 'positive-group' && (
          <div className="wiz-slide">
            {positiveGroups[currentStep.group]?.map(item => (
              <CheckItem
                key={item.id}
                item={item}
                checked={positiveChecked.has(item.id)}
                onChange={toggleChecked(setPositiveChecked)}
              />
            ))}
          </div>
        )}

        {/* ── LIMITING GROUP ── */}
        {currentStep.type === 'limiting-group' && (
          <div className="wiz-slide">
            {limitingGroups[currentStep.group]?.map(item => (
              <CheckItem
                key={item.id}
                item={item}
                checked={limitingChecked.has(item.id)}
                onChange={toggleChecked(setLimitingChecked)}
              />
            ))}
          </div>
        )}

        {/* ── STRUCTURAL GROUP ── */}
        {currentStep.type === 'structural-group' && (
          <div className="wiz-slide">
            {structuralGroup[currentStep.group]?.map(item => (
              <CheckItem
                key={item.id}
                item={item}
                checked={structuralChecked.has(item.id)}
                onChange={toggleChecked(setStructuralChecked)}
              />
            ))}
          </div>
        )}

        {/* ── CORRECTABLE ROW ── */}
        {currentStep.type === 'correctable-row' && (
          <div className="wiz-slide">
            <CorrectableRowComponent
              label={correctableRows.find(r => r.id === currentStep.rowId)?.label ?? ''}
              required={correctableRows.find(r => r.id === currentStep.rowId)?.required}
              selected={correctableSelections[currentStep.rowId]}
              onChange={val => handleCorrectableChange(currentStep.rowId, val)}
            />
            {!canProceed && (
              <p style={{ fontFamily: 'var(--font-ui)', fontSize: 10, color: 'var(--accent)', letterSpacing: '0.08em', marginTop: 8 }}>
                Please make a selection to continue.
              </p>
            )}
          </div>
        )}

        {/* ── RESULTS ── */}
        {currentStep.type === 'results' && results && (
          <div className="wiz-slide">
            <ResultsDisplay
              results={results}
              weightCt={parseFloat(stoneInfo.weightCt) || 0}
              onStartOver={handleStartOver}
              onRequestQuote={onRequestQuote ?? (() => {})}
            />
          </div>
        )}

        {/* ── NAV ── */}
        {!isResults && (
          <div style={{ display: 'flex', gap: 10, marginTop: 32 }}>
            {stepIndex > 0 && (
              <button type="button" onClick={handleBack} className="wiz-btn-secondary">
                Back
              </button>
            )}
            <button
              type="button"
              onClick={handleNext}
              disabled={!canProceed}
              className="wiz-btn-primary"
            >
              {stepIndex === STEPS.length - 2 ? 'See Results' : 'Next'}
            </button>
          </div>
        )}

      </div>
    </>
  )
}

