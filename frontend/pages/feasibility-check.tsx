import React, { useState, useEffect, useCallback, Dispatch, SetStateAction, useMemo } from 'react'
import TopNav from '../components/shared/TopNav'
import { positiveItems, limitingItems, structuralItems, correctableRows } from '../components/feasibility-test/data/questions'
import type { CorrectableOption } from '../components/feasibility-test/data/questions'
import { calculateAll } from '../components/feasibility-test/logic/calculator'
import type { CorrectableSelections, ScoreBreakdown } from '../components/feasibility-test/logic/calculator'
import CheckItem from '../components/feasibility-test/ui/CheckItem'
import CorrectableRowComponent from '../components/feasibility-test/ui/CorrectableRow'
import ResultsDisplay from '../components/feasibility-test/ui/ResultsDisplay'
import { autoSelectAll } from '../components/feasibility-test/logic/autoSelect'


type IntroPhase =
  | 'line1' | 'line1exit'
  | 'line2' | 'line2exit'
  | 'line3' | 'line3exit'
  | 'disc1' | 'disc1exit'
  | 'disc2' | 'disc2exit'
  | 'begin' | 'wizard'

type StepKind =
  | { type: 'stone-info' }
  | { type: 'positive-group';    group: string }
  | { type: 'limiting-group';    group: string }
  | { type: 'structural-group';  group: string }
  | { type: 'correctable-row';   rowId: 'external' | 'light' | 'geometry' | 'structural' }
  | { type: 'category-complete'; phase: number; title: string; message: string; nextTitle: string; nextDescription: string; isLastBeforeResults?: boolean }
  | { type: 'results' }

const PHASES = ['Stone Information','Positive Characteristics','Limiting Characteristics','Structural Condition','Correctable Likelihood']

function groupBy<T extends { group: string }>(items: T[]): Record<string, T[]> {
  return items.reduce((acc, item) => { if (!acc[item.group]) acc[item.group] = []; acc[item.group].push(item); return acc }, {} as Record<string, T[]>)
}

const positiveGroups  = groupBy(positiveItems)
const limitingGroups  = groupBy(limitingItems)
const structuralGroup = groupBy(structuralItems)
const allItems = [
  ...positiveItems.map(i => ({ ...i, section: 'Positive' })),
  ...limitingItems.map(i => ({ ...i, section: 'Limiting' })),
  ...structuralItems.map(i => ({ ...i, section: 'Structural' })),
]

function buildSteps(): StepKind[] {
  const s: StepKind[] = []
  s.push({ type: 'stone-info' })
  s.push({ type: 'category-complete', phase: 1, title: 'Stone details saved.', message: "Now let's look at what your stone does well.", nextTitle: 'Positive Characteristics', nextDescription: 'Select everything that currently applies — even if it feels obvious.' })
  Object.keys(positiveGroups).forEach(g => s.push({ type: 'positive-group', group: g }))
  s.push({ type: 'category-complete', phase: 2, title: 'Positives recorded.', message: 'Now we look at what may be holding the stone back.', nextTitle: 'Limiting Characteristics', nextDescription: 'Select everything that currently applies — being accurate here is just as important as the positives.' })
  Object.keys(limitingGroups).forEach(g => s.push({ type: 'limiting-group', group: g }))
  s.push({ type: 'category-complete', phase: 3, title: 'Limitations noted.', message: 'One more section before the final step.', nextTitle: 'Structural Condition', nextDescription: 'This section looks at physical damage and internal features that affect whether the stone can safely be worked on.' })
  Object.keys(structuralGroup).forEach(g => s.push({ type: 'structural-group', group: g }))
  s.push({ type: 'category-complete', phase: 4, title: "You're almost done.", message: 'Only one more section to go!', nextTitle: 'Correctable Likelihood', nextDescription: "For each category you'll see your selections so far as a reference. One answer per row — this is the final step.", isLastBeforeResults: true })
  correctableRows.forEach(r => s.push({ type: 'correctable-row', rowId: r.id }))
  s.push({ type: 'results' })
  return s
}

function phaseOfStep(step: StepKind): number {
  switch (step.type) {
    case 'stone-info': return 0; case 'category-complete': return step.phase
    case 'positive-group': return 1; case 'limiting-group': return 2
    case 'structural-group': return 3; case 'correctable-row': return 4; case 'results': return 5
  }
}
function stepLabel(step: StepKind): string {
  switch (step.type) {
    case 'stone-info': return 'Stone Information'; case 'positive-group': return step.group
    case 'limiting-group': return step.group; case 'structural-group': return 'Structural Condition'
    case 'correctable-row': return correctableRows.find(r => r.id === step.rowId)?.label ?? step.rowId
    case 'category-complete': return ''; case 'results': return 'Results'
  }
}
function stepInstruction(step: StepKind): string {
  switch (step.type) {
    case 'stone-info': return 'Fill in what you know. Leave anything blank that you are unsure of.'
    case 'positive-group': case 'limiting-group': case 'structural-group':
      return 'Select ALL that currently apply to your stone. Leave the rest unmarked.'
    case 'correctable-row': return 'Select the ONE option that best describes this category.'
    default: return ''
  }
}

function SelectionReference({ positiveChecked, limitingChecked, structuralChecked }: { positiveChecked: Set<string>; limitingChecked: Set<string>; structuralChecked: Set<string> }) {
  const checked = allItems.filter(i => (i.section === 'Positive' && positiveChecked.has(i.id)) || (i.section === 'Limiting' && limitingChecked.has(i.id)) || (i.section === 'Structural' && structuralChecked.has(i.id)))
  const grouped = checked.reduce((acc, i) => { if (!acc[i.section]) acc[i.section] = []; acc[i.section].push(i.label); return acc }, {} as Record<string, string[]>)
  return (
    <div style={{ background: 'var(--bg-deep)', border: '1px solid var(--border)', borderRadius: 14, padding: '16px 18px', marginBottom: 24 }}>
      <p style={{ fontFamily: 'var(--font-ui)', fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--accent)', margin: '0 0 14px' }}>Your Selections</p>
      {checked.length === 0 && <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-muted)', opacity: 0.5, margin: 0, fontStyle: 'italic' }}>No items selected in previous sections.</p>}
      {Object.entries(grouped).map(([section, labels]) => (
        <div key={section} style={{ marginBottom: 14 }}>
          <p style={{ fontFamily: 'var(--font-ui)', fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', margin: '0 0 8px' }}>{section}</p>
          {labels.map(label => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent)', opacity: 0.6, flexShrink: 0 }} />
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text)', lineHeight: 1.4 }}>{label}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default function FeasibilityCheckPage() {
  const [introPhase, setIntroPhase] = useState<IntroPhase>('line1')
  const [check1, setCheck1] = useState(false)
  const [check2, setCheck2] = useState(false)

  const STEPS = useMemo(() => buildSteps(), [])
  const [stepIndex, setStepIndex] = useState(0)
  const [stoneInfo, setStoneInfo] = useState({ species: '', variety: '', weightCt: '', dimensions: '', cut: '' })
  const [positiveChecked, setPositiveChecked] = useState<Set<string>>(new Set())
  const [limitingChecked, setLimitingChecked] = useState<Set<string>>(new Set())
  const [structuralChecked, setStructuralChecked] = useState<Set<string>>(new Set())
  const [correctableSelections, setCorrectableSelections] = useState<CorrectableSelections>({ external: null, light: null, geometry: null, structural: null })
  const [results, setResults] = useState<ScoreBreakdown | null>(null)

  useEffect(() => {
    if (introPhase === 'line1')     { const t = setTimeout(() => setIntroPhase('line1exit'), 5000); return () => clearTimeout(t) }
    if (introPhase === 'line1exit') { const t = setTimeout(() => setIntroPhase('line2'),     700);  return () => clearTimeout(t) }
    if (introPhase === 'line2')     { const t = setTimeout(() => setIntroPhase('line2exit'), 5000); return () => clearTimeout(t) }
    if (introPhase === 'line2exit') { const t = setTimeout(() => setIntroPhase('line3'),     700);  return () => clearTimeout(t) }
    if (introPhase === 'line3')     { const t = setTimeout(() => setIntroPhase('line3exit'), 5000); return () => clearTimeout(t) }
    if (introPhase === 'line3exit') { const t = setTimeout(() => setIntroPhase('disc1'),     700);  return () => clearTimeout(t) }
    if (introPhase === 'disc1exit') { const t = setTimeout(() => setIntroPhase('disc2'),     700);  return () => clearTimeout(t) }
    if (introPhase === 'disc2exit') { const t = setTimeout(() => setIntroPhase('begin'),     700);  return () => clearTimeout(t) }
  }, [introPhase])

  const confirmDisc1 = () => { if (check1) setIntroPhase('disc1exit') }
  const confirmDisc2 = () => { if (check2) setIntroPhase('disc2exit') }

  const scrollTop = () => { const el = document.querySelector('.full-screen'); if (el) el.scrollTop = 0 }

  const handleNext = () => {
    const nextStep = STEPS[stepIndex + 1]
    // Auto-select correctable answers when entering correctable phase
    if (nextStep?.type === 'correctable-row' && STEPS[stepIndex]?.type === 'category-complete') {
      setCorrectableSelections({
        ...autoSelectAll(limitingChecked, structuralChecked),
      })
    }
    if (nextStep?.type === 'results') setResults(calculateAll(positiveChecked, limitingChecked, structuralChecked, correctableSelections))
    setStepIndex(i => Math.min(i + 1, STEPS.length - 1))
    scrollTop()
  }
  const handleBack = () => { setStepIndex(i => Math.max(i - 1, 0)); scrollTop() }
  const handleStartOver = () => {
    setStepIndex(0); setStoneInfo({ species: '', variety: '', weightCt: '', dimensions: '', cut: '' })
    setPositiveChecked(new Set()); setLimitingChecked(new Set()); setStructuralChecked(new Set())
    setCorrectableSelections({ external: null, light: null, geometry: null, structural: null })
    setResults(null); setIntroPhase('begin'); scrollTop()
  }
  const toggleChecked = useCallback(
    (setter: Dispatch<SetStateAction<Set<string>>>) => (id: string, checked: boolean) => {
      setter((prev: Set<string>) => { const next = new Set(prev); checked ? next.add(id) : next.delete(id); return next })
    }, []
  )
  const handleCorrectableChange = (row: keyof CorrectableSelections, value: CorrectableOption) =>
    setCorrectableSelections(prev => ({ ...prev, [row]: value }))

  const currentStep  = STEPS[stepIndex]
  const isResults    = currentStep.type === 'results'
  const isComplete   = currentStep.type === 'category-complete'
  const currentPhase = phaseOfStep(currentStep)
  const label        = stepLabel(currentStep)
  const instruction  = stepInstruction(currentStep)
  const phaseSteps   = STEPS.filter(s => phaseOfStep(s) === currentPhase && s.type !== 'category-complete')
  const phaseIndex   = phaseSteps.findIndex(s => s === currentStep)


  const canProceed   = currentStep.type !== 'correctable-row' || correctableSelections[currentStep.rowId] !== null
  const inWizard     = introPhase === 'wizard'

  return (
    <>
      <TopNav />
      <style>{`
        @keyframes flyInUp {
          from { opacity: 0; transform: translateY(70px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes flyOutUp {
          from { opacity: 1; transform: translateY(0); }
          to   { opacity: 0; transform: translateY(-90px); }
        }
        @keyframes titleFadeIn {
          from { opacity: 0; transform: translateY(-16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes accordionDown {
          from { opacity: 0; transform: translateY(-20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes completePop {
          0%   { opacity: 0; transform: scale(0.94) translateY(12px); }
          60%  { transform: scale(1.02) translateY(-2px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }

        .full-screen {
          position: fixed; inset: 0; z-index: 100;
          background: var(--bg);
          display: flex; flex-direction: column;
          overflow-y: auto; -webkit-overflow-scrolling: touch;
        }
        .full-screen::-webkit-scrollbar { width: 3px; }
        .full-screen::-webkit-scrollbar-thumb { background: var(--border); }

        .tool-title {
          text-align: center;
          font-family: var(--font-display);
          font-size: clamp(28px, 4vw, 42px);
          font-weight: 400; color: var(--text); letter-spacing: 0.04em;
          padding: clamp(70px, 10vh, 100px) 24px 0; flex-shrink: 0;
          animation: titleFadeIn 1000ms cubic-bezier(0.16,1,0.3,1) 200ms both;
        }
        .tool-rule {
          width: 32px; height: 1px; background: var(--accent);
          margin: 10px auto 0; flex-shrink: 0;
          animation: titleFadeIn 1000ms 500ms both;
        }

        /* Intro content area — centered */
        .center-stage {
          flex: 1; display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 40px 24px 60px; text-align: center;
        }

        /* Wizard content area — left-aligned, max-width */
        .wiz-stage {
          flex: 1;
          width: 100%; max-width: 520px;
          margin: 0 auto;
          padding: 0 20px 60px;
          text-align: left;
          animation: accordionDown 600ms cubic-bezier(0.16,1,0.3,1) 300ms both;
        }

        .intro-line {
          font-family: var(--font-body);
          font-size: clamp(22px, 3vw, 32px);
          color: var(--text-muted); line-height: 1.75;
          max-width: 600px; margin: 0;
        }
        .fly-in  { animation: flyInUp  900ms cubic-bezier(0.16,1,0.3,1) forwards; }
        .fly-out { animation: flyOutUp 650ms cubic-bezier(0.4,0,1,1)    forwards; }

        /* Wizard step fly-in — same motion, faster */
        .wiz-slide    { animation: flyInUp    240ms cubic-bezier(0.16,1,0.3,1) both; }
        .wiz-complete { animation: completePop 300ms cubic-bezier(0.16,1,0.3,1) both; }

        .disc-card {
          width: 100%; max-width: 560px;
          background: var(--bg-card); border: 1px solid var(--border);
          padding: 28px; text-align: left;
        }
        .disc-card.fly-in  { animation: flyInUp  900ms cubic-bezier(0.16,1,0.3,1) forwards; }
        .disc-card.fly-out { animation: flyOutUp 650ms cubic-bezier(0.4,0,1,1)    forwards; }
        .disc-label { font-family: var(--font-ui); font-size: 16px; letter-spacing: 0.25em; text-transform: uppercase; color: var(--accent); margin: 0 0 14px; }
        .disc-text  { font-family: var(--font-body); font-size: clamp(17px,2vw,20px); line-height: 1.8; color: var(--text-muted); margin: 0 0 22px; }
        .disc-check-row { display: flex; align-items: flex-start; gap: 14px; margin-bottom: 22px; cursor: pointer; }
        .disc-checkbox { flex-shrink: 0; width: 22px; height: 22px; border: 1.5px solid var(--border); border-radius: 6px; background: transparent; display: flex; align-items: center; justify-content: center; transition: all 200ms ease; margin-top: 2px; }
        .disc-checkbox.on { background: var(--accent); border-color: var(--accent); }
        .disc-check-label { font-family: var(--font-ui); font-size: 18px; font-weight: 500; letter-spacing: 0.05em; text-transform: uppercase; color: var(--text-muted); line-height: 1.5; margin: 0; }
        .disc-btn { width: 100%; display: flex; align-items: center; justify-content: center; gap: 10px; background: var(--accent); color: var(--bg); border: none; padding: 16px 24px; font-family: var(--font-ui); font-size: 14px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; transition: all 220ms ease; opacity: 0.28; cursor: not-allowed; }
        .disc-btn.on { opacity: 1; cursor: pointer; box-shadow: 0 4px 24px rgba(255,211,105,0.18); }
        .disc-btn.on:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(255,211,105,0.28); }

        .begin-btn {
          display: inline-flex; align-items: center; gap: 14px;
          background: var(--accent); color: var(--bg); border: none;
          padding: 22px 64px; font-family: var(--font-display);
          font-size: clamp(22px, 3vw, 32px); font-weight: 400; letter-spacing: 0.08em;
          cursor: pointer; transition: all 401ms ease;
          box-shadow: 0 4px 40px rgba(255,211,105,0.22);
          animation: flyInUp 1200ms cubic-bezier(0.16,1,0.3,1) forwards;
        }
        .begin-btn:hover { transform: translateY(-4px); box-shadow: 0 12px 48px rgba(255,211,105,0.32); }

        .wiz-input { width: 100%; background: var(--bg-card); border: 1px solid var(--border); color: var(--text); font-family: var(--font-body); font-size: 18px; padding: 16px 18px; border-radius: 10px; transition: border-color 200ms ease; outline: none; }
        .wiz-input::placeholder { color: var(--text-muted); opacity: 0.4; }
        .wiz-input:focus { border-color: var(--accent); }
        .wiz-btn-primary { flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px; background: var(--accent); color: var(--bg); border: none; padding: 18px 20px; font-family: var(--font-ui); font-size: 16px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; cursor: pointer; border-radius: 14px; transition: all 220ms ease; box-shadow: 0 4px 16px rgba(255,211,105,0.18); }
        .wiz-btn-primary:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(255,211,105,0.28); }
        .wiz-btn-primary:disabled { opacity: 0.25; cursor: not-allowed; }
        .wiz-btn-secondary { flex: 1; display: flex; align-items: center; justify-content: center; background: transparent; color: var(--text-muted); border: 1px solid var(--border); padding: 18px 20px; font-family: var(--font-ui); font-size: 16px; font-weight: 500; letter-spacing: 0.15em; text-transform: uppercase; cursor: pointer; border-radius: 14px; transition: all 220ms ease; }
        .wiz-btn-secondary:hover { border-color: var(--text-muted); color: var(--text); }
      `}</style>

      {/* ══ ONE CONTINUOUS SCREEN ════════════════════════════ */}
      <div className="full-screen">

        {/* Title — always present */}
        <p className="tool-title">The Cut Feasibility Wizard</p>
        <div className="tool-rule" />
        {introPhase !== 'wizard' && introPhase !== 'begin' && (
          <button
            onClick={() => setIntroPhase('begin')}
            style={{
              position: 'absolute',
              top: 'clamp(16px, 3vh, 24px)',
              right: 'clamp(16px, 3vw, 28px)',
              background: 'transparent',
              border: '1px solid var(--border)',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-ui)',
              fontSize: 10,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              padding: '8px 14px',
              cursor: 'pointer',
              borderRadius: 8,
              transition: 'all 180ms ease',
              zIndex: 10,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--text-muted)'
              e.currentTarget.style.color = 'var(--text)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.color = 'var(--text-muted)'
            }}
          >
            Skip
          </button>
        )}

        {/* ── Intro stage (centered) ── */}
        {!inWizard && (
          <div className="center-stage">

            {(introPhase === 'line1' || introPhase === 'line1exit') && (
              <p key={introPhase} className={`intro-line${introPhase === 'line1exit' ? ' fly-out' : ' fly-in'}`}>
                This guide is an immersive journey into stone evaluation from a gemstone cutter&#39;s perspective.
              </p>
            )}
            {(introPhase === 'line2' || introPhase === 'line2exit') && (
              <p key={introPhase} className={`intro-line${introPhase === 'line2exit' ? ' fly-out' : ' fly-in'}`}>
                It is designed with you in mind to bridge the gap between cutter and client communication.
              </p>
            )}
            {(introPhase === 'line3' || introPhase === 'line3exit') && (
              <p key={introPhase} className={`intro-line${introPhase === 'line3exit' ? ' fly-out' : ' fly-in'}`}>
                For clarity, each selection includes educational context accessed by clicking the information icon.
              </p>
            )}

            {(introPhase === 'disc1' || introPhase === 'disc1exit') && (
              <div key={introPhase} className={`disc-card${introPhase === 'disc1exit' ? ' fly-out' : ' fly-in'}`}>
                <p className="disc-label">Terms of Use &nbsp;·&nbsp; 1 of 2</p>
                <p className="disc-text">By choosing to use this tool you confirm and understand that this evaluation acts as a preliminary assessment that may or may not provide accurate information for your specific gemstone. Results are highly reliant on your selections. You hold harmless Cutting Corners Gems from any misinterpretation of results or otherwise educational information. Gemstones are a very nuanced field and depend on each individual situation.</p>
                <div className="disc-check-row" onClick={() => setCheck1(p => !p)}>
                  <div className={`disc-checkbox${check1 ? ' on' : ''}`}>{check1 && <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="var(--bg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}</div>
                  <p className="disc-check-label">I understand and agree to these terms</p>
                </div>
                <button className={`disc-btn${check1 ? ' on' : ''}`} onClick={confirmDisc1}>Next <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
              </div>
            )}

            {(introPhase === 'disc2' || introPhase === 'disc2exit') && (
              <div key={introPhase} className={`disc-card${introPhase === 'disc2exit' ? ' fly-out' : ' fly-in'}`}>
                <p className="disc-label">Scope of Evaluation &nbsp;·&nbsp; 2 of 2</p>
                <p className="disc-text">I understand this evaluation is intended for faceted gemstones with or without damage. It does not provide evaluation for rough material, preformed stones, or gemstones with excessive chemical or heat damage. Those situations require an in-person assessment.</p>
                <div className="disc-check-row" onClick={() => setCheck2(p => !p)}>
                  <div className={`disc-checkbox${check2 ? ' on' : ''}`}>{check2 && <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="var(--bg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}</div>
                  <p className="disc-check-label">I understand the scope of this evaluation</p>
                </div>
                <button className={`disc-btn${check2 ? ' on' : ''}`} onClick={confirmDisc2}>Confirm <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
              </div>
            )}

            {introPhase === 'begin' && (
              <button className="begin-btn" onClick={() => setIntroPhase('wizard')}>
                Begin
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            )}

          </div>
        )}

        {/* ── Wizard stage (left aligned, max-width) ── */}
        {inWizard && (
          <div className="wiz-stage">

            {!isResults && (
              <div style={{ marginBottom: 32 }}>
                <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
                  {PHASES.map((ph, i) => {
                    const filled = i < currentPhase || (i === currentPhase && !isComplete)
                    const active = i === currentPhase
                    return <div key={ph} style={{ flex: 1 }}><div style={{ height: 4, borderRadius: 3, background: filled ? 'var(--accent)' : active ? 'rgba(255,211,105,0.25)' : 'var(--border)', transition: 'background 400ms ease', opacity: filled ? 1 : active ? 1 : 0.35 }} /></div>
                  })}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'var(--font-ui)', fontSize: 14, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)' }}>{PHASES[currentPhase] ?? 'Results'}</span>
                  {phaseSteps.length > 1 && phaseIndex >= 0 && <span style={{ fontFamily: 'var(--font-ui)', fontSize: 14, color: 'var(--text-muted)' }}>{phaseIndex + 1} / {phaseSteps.length}</span>}
                </div>
              </div>
            )}

            {!isResults && !isComplete && label && (
              <div className="wiz-slide" key={`hdr-${stepIndex}`}>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px,5vw,32px)', fontWeight: 400, color: 'var(--text)', margin: '0 0 16px', letterSpacing: '0.02em', lineHeight: 1.2 }}>{label}</p>
                {instruction && <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(17px,2vw,18px)', color: 'var(--text-muted)', lineHeight: 1.75, margin: '0 0 28px', paddingBottom: 24, borderBottom: '1px solid var(--border)' }}>{instruction}</p>}
              </div>
            )}

            {currentStep.type === 'category-complete' && (
              <div className="wiz-complete" key={`cc-${stepIndex}`} style={{ paddingTop: 16 }}>
                <div style={{ textAlign: 'center', marginBottom: 40 }}>
                  <div style={{ fontSize: 44, marginBottom: 18 }}>✦</div>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px,5vw,38px)', fontWeight: 400, color: 'var(--text)', margin: '0 0 14px' }}>{currentStep.title}</h2>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(15px,2vw,17px)', color: currentStep.isLastBeforeResults ? 'var(--accent)' : 'var(--text-muted)', lineHeight: 1.7, margin: 0, fontStyle: currentStep.isLastBeforeResults ? 'normal' : 'italic', fontWeight: currentStep.isLastBeforeResults ? 600 : 400 }}>{currentStep.message}</p>
                </div>
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderLeft: '3px solid var(--accent)', padding: '22px 24px', marginBottom: 32 }}>
                  <p style={{ fontFamily: 'var(--font-ui)', fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--accent)', margin: '0 0 10px' }}>Up Next</p>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--text)', margin: '0 0 10px' }}>{currentStep.nextTitle}</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}>{currentStep.nextDescription}</p>
                </div>
                <button type="button" onClick={handleNext} className="wiz-btn-primary" style={{ width: '100%' }}>
                  {currentStep.isLastBeforeResults ? 'Begin Final Section' : 'Continue'}
                </button>
              </div>
            )}

            {currentStep.type === 'stone-info' && (
              <div className="wiz-slide" key={`si-${stepIndex}`} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                {[
                  { key: 'species', label: 'Species', placeholder: 'e.g. Corundum' },
                  { key: 'variety', label: 'Variety', placeholder: 'e.g. Blue Sapphire' },
                  { key: 'weightCt', label: 'Weight (ct)', placeholder: 'e.g. 2.4' },
                  { key: 'dimensions', label: 'Dimensions (mm)', placeholder: 'e.g. 9 x 7 x 5' },
                  { key: 'cut', label: 'Current Cut / Shape', placeholder: 'e.g. Oval Mixed Cut' },
                ].map(field => (
                  <div key={field.key}>
                    <label style={{ display: 'block', fontFamily: 'var(--font-ui)', fontSize: 13, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 8 }}>{field.label}</label>
                    <input type="text" className="wiz-input" value={stoneInfo[field.key as keyof typeof stoneInfo]} onChange={e => setStoneInfo(prev => ({ ...prev, [field.key]: e.target.value }))} placeholder={field.placeholder} />
                  </div>
                ))}
              </div>
            )}

            {currentStep.type === 'positive-group' && (
              <div className="wiz-slide" key={`pg-${stepIndex}`}>
                {positiveGroups[currentStep.group]?.map(item => <CheckItem key={item.id} item={item} checked={positiveChecked.has(item.id)} onChange={toggleChecked(setPositiveChecked)} />)}
              </div>
            )}
            {currentStep.type === 'limiting-group' && (
              <div className="wiz-slide" key={`lg-${stepIndex}`}>
                {limitingGroups[currentStep.group]?.map(item => <CheckItem key={item.id} item={item} checked={limitingChecked.has(item.id)} onChange={toggleChecked(setLimitingChecked)} />)}
              </div>
            )}
            {currentStep.type === 'structural-group' && (
              <div className="wiz-slide" key={`sg-${stepIndex}`}>
                {structuralGroup[currentStep.group]?.map(item => <CheckItem key={item.id} item={item} checked={structuralChecked.has(item.id)} onChange={toggleChecked(setStructuralChecked)} />)}
              </div>
            )}

            {currentStep.type === 'correctable-row' && (
              <div className="wiz-slide" key={`cr-${stepIndex}`}>
                  <CorrectableRowComponent
                  label={correctableRows.find(r => r.id === currentStep.rowId)?.label ?? ''}
                  required={correctableRows.find(r => r.id === currentStep.rowId)?.required}
                  rowId={currentStep.rowId}
                  selected={correctableSelections[currentStep.rowId]}
                  onChange={val => handleCorrectableChange(currentStep.rowId, val)}
                  limitingChecked={limitingChecked}
                  structuralChecked={structuralChecked}
                />
                {!canProceed && <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--accent)', opacity: 0.8, marginTop: 12 }}>Please make a selection to continue.</p>}
              </div>
            )}

            {currentStep.type === 'results' && results && (
              <div className="wiz-slide" key="results">
                <ResultsDisplay results={results} weightCt={parseFloat(stoneInfo.weightCt) || 0} stoneInfo={stoneInfo} onStartOver={handleStartOver} onRequestQuote={handleStartOver} />
              </div>
            )}

            {!isResults && !isComplete && (
              <div style={{ display: 'flex', gap: 10, marginTop: 36 }}>
                {stepIndex > 0 && <button type="button" onClick={handleBack} className="wiz-btn-secondary">Back</button>}
                <button type="button" onClick={handleNext} disabled={!canProceed} className="wiz-btn-primary">
                  {STEPS[stepIndex + 1]?.type === 'category-complete' ? 'Done' : 'Next'}
                </button>
              </div>
            )}

          </div>
        )}

      </div>
    </>
  )
}
