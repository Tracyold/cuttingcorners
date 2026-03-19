import { useState } from 'react'
import { saveWizardResult } from '../../../lib/wizardResultsService'
import type { WizardResultPayload } from '../../../lib/wizardResultsService'

interface SaveToAccountButtonProps {
  payload:      WizardResultPayload
  isLoggedIn:   boolean
}

export default function SaveToAccountButton({ payload, isLoggedIn }: SaveToAccountButtonProps) {
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')

  const handleSave = async () => {
    if (!isLoggedIn) {
      window.location.href = '/login'
      return
    }
    setStatus('saving')
    const result = await saveWizardResult(payload)
    if (result) {
      setStatus('saved')
    } else {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  const label = {
    idle:   'Save to Account',
    saving: 'Saving...',
    saved:  '✓ Saved',
    error:  'Error — Try Again',
  }[status]

  const borderColor = {
    idle:   'rgba(255,211,105,0.45)',
    saving: 'rgba(255,211,105,0.25)',
    saved:  'rgba(163,196,168,0.6)',
    error:  'rgba(248,113,113,0.5)',
  }[status]

  const textColor = {
    idle:   'var(--accent)',
    saving: 'var(--text-muted)',
    saved:  '#a3c4a8',
    error:  '#f87171',
  }[status]

  return (
    <button
      type="button"
      onClick={handleSave}
      disabled={status === 'saving' || status === 'saved'}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        background: 'transparent',
        color: textColor,
        border: `0.5px solid ${borderColor}`,
        padding: 'clamp(14px, 2.5vw, 18px) 20px',
        fontFamily: 'var(--font-body)',
        fontSize: 'clamp(13px, 1.6vw, 15px)',
        fontWeight: 600,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        cursor: status === 'saving' || status === 'saved' ? 'default' : 'pointer',
        borderRadius: 3,
        transition: 'all 220ms ease',
        opacity: status === 'saving' ? 0.6 : 1,
        boxShadow: status === 'saved' ? '0 0 16px rgba(163,196,168,0.12)' : 'none',
      }}
    >
      {status === 'saving' ? (
        <span style={{ opacity: 0.7 }}>Saving...</span>
      ) : (
        <>
          {status !== 'saved' && (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1v8M4 6l3 3 3-3M2 10v1a1 1 0 001 1h8a1 1 0 001-1v-1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
          {label}
        </>
      )}
    </button>
  )
}
