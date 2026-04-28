// components/account/desktop/DesktopSmsConsentModal.tsx
//
// Desktop version of 3SmsConsentModal.tsx.
// Identical except the overlay and modal are scoped to the right 50%
// of the viewport so they don't bleed over the left dashboard column.

interface SmsToggle {
  label:        string;
  col:          string;
  description?: string;
  desc?:        string;
}

interface SmsConsentModalProps {
  toggle:           SmsToggle;
  hasOpenWorkOrder: boolean;
  onConfirm:        () => void;
  onCancel:         () => void;
}

export default function DesktopSmsConsentModal({
  toggle, hasOpenWorkOrder, onConfirm, onCancel,
}: SmsConsentModalProps) {
  return (
    <>
      {/* Overlay scoped to right 50% */}
      <div
        onClick={onCancel}
        style={{
          position: 'fixed', top: 0, left: '50%', right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', zIndex: 20000,
        }}
      />

      {/* Modal scoped to right 50% */}
      <div
        style={{
          position: 'fixed', top: 'auto', left: '50%', right: 0, bottom: 0,
          zIndex: 20001,
          background: 'var(--bg-mob-deep)',
          borderTop: '0.5px solid var(--bdr2-mob)',
          borderRadius: '0.875rem 0.875rem 0 0',
          transition: 'transform 750ms cubic-bezier(0.16, 1, 0.3, 1)',
          maxHeight: '93dvh',
          display: 'flex', flexDirection: 'column',
          paddingBottom: 'clamp(1.5rem, 7vw, 2.25rem)',
          overflowY: 'auto',
        }}
      >
        {/* Handle */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0 4px' }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: 'var(--bdr2-mob)' }} />
        </div>

        {/* Header */}
        <div className="sms-mhead">
          <span className="sms-mtitle">Enable SMS Alerts</span>
          <button className="sms-mclose" onClick={onCancel}>✕</button>
        </div>

        <div style={{ padding: '20px 20px 0' }}>
          <div style={{
            fontFamily: 'var(--font-display-mob)', fontSize: '1.25rem',
            fontStyle: 'italic', color: 'var(--text)', marginBottom: 8, lineHeight: 1.3,
          }}>
            {toggle.label}
          </div>
          <div style={{
            fontFamily: 'var(--font-ui-mob)', fontSize: '0.8125rem',
            color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 20,
          }}>
            {toggle.description || toggle.desc}
            {hasOpenWorkOrder && toggle.col === 'opt_in_work_orders' && (
              <span style={{ display: 'block', marginTop: 8, color: 'var(--gold)' }}>
                You have an active work order -- enabling this keeps you updated on its progress.
              </span>
            )}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingBottom: 32 }}>
            <button onClick={onConfirm} style={{
              background: 'var(--gold)', color: 'var(--bg-mob-deep)', border: 'none',
              padding: 14, fontFamily: 'var(--font-mono)', fontSize: '0.625rem',
              letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer',
              borderRadius: '999px',
            }}>
              Enable SMS Alerts
            </button>
            <button onClick={onCancel} style={{
              background: 'transparent', color: 'var(--text-muted)',
              border: '0.5px solid var(--bdr2)', padding: 13,
              fontFamily: 'var(--font-mono)', fontSize: '0.625rem',
              letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer',
              borderRadius: '999px',
            }}>
              Cancel
            </button>
          </div>
          <p style={{
            fontFamily: 'var(--font-ui-mob)', fontSize: '0.625rem',
            color: 'var(--text-muted)', lineHeight: 1.65, opacity: 0.7, paddingBottom: 20,
          }}>
            SMS alerts are sent to your phone number on file. Message &amp; data rates may apply.
            Reply STOP to opt out.
          </p>
        </div>
      </div>
    </>
  );
}