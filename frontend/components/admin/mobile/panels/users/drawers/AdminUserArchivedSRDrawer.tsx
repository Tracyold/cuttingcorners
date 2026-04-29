// comp/admin/mobile/panels/users/drawers/AdminUserArchivedSRDrawer.tsx
// Detail view for an archived service request.
// Shows all SR fields + linked wizard result + Recover button.
// Pure UI — all logic from useAdminUserServiceRequests via panel.

import { fmtDate, fmtTime } from '../../../../../../lib/utils';
import { useSwipeToClose } from '../../../../../account/shared/hooks/useSwipeToClose';

interface Props {
  open:      boolean;
  sr:        any;
  onRecover: () => void;
  onClose:   () => void;
}

export default function AdminUserArchivedSRDrawer({ open, sr, onRecover, onClose }: Props) {
  const { elementRef, touchHandlers } = useSwipeToClose({ onClose });

  if (!sr) return null;

  return (
    <>
      <div className={`overlay${open ? ' open' : ''}`} onClick={onClose} />

      <div ref={elementRef} className={`wo-drawer${open ? ' open' : ''}`} {...touchHandlers}>
        <div className="wo-handle" />
        <div className="wo-body">

          <div className="wo-topbar">
            <span style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '3px 10px', borderRadius: 999, background: 'rgba(127,127,127,0.12)', color: 'var(--text-mob-muted)' }}>
              Archived
            </span>
            <span style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 'clamp(0.8125rem,3.5vw,0.9375rem)', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-mob-muted)', flex: 1, marginLeft: 10 }}>
              {sr.service_type || 'Service Request'}
            </span>
            <button className="wo-close" onClick={onClose}>✕</button>
          </div>

          <div className="wo-scroll">
            <div className="wo-content">

              {/* Recover banner */}
              <div style={{ background: 'rgba(45,212,191,0.06)', border: '0.5px solid rgba(45,212,191,0.25)', borderRadius: 8, padding: '12px 14px', marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#2dd4bf', marginBottom: 3 }}>Archived by user</div>
                  <div style={{ fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(13px,3.4vw,14px)', color: 'var(--text-mob-muted)', lineHeight: 1.5 }}>Recover this service request to restore it to their active list.</div>
                </div>
                <button
                  onClick={onRecover}
                  className="wiz-btn-pill wiz-btn-pill-outline"
                  style={{ fontSize: 11, color: '#2dd4bf', borderColor: 'rgba(45,212,191,0.4)', flexShrink: 0, padding: '8px 14px' }}
                >
                  Recover
                </button>
              </div>

              {/* Service type + date */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontFamily: 'var(--font-display-mob)', fontSize: 'clamp(1rem,4.5vw,1.125rem)', color: 'var(--gold)', marginBottom: 6 }}>{sr.service_type || 'Service Request'}</div>
                <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 10, color: 'var(--text-mob-muted)', opacity: 0.7 }}>
                  {sr.created_at ? `${fmtDate(sr.created_at)} · ${fmtTime(sr.created_at)}` : '--'}
                </div>
              </div>

              <div style={{ height: 1, background: 'var(--bdr2-mob)', margin: '12px 0 16px' }} />

              {/* Description */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-mob-muted)', marginBottom: 8 }}>Description</div>
                <p style={{ fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(0.9375rem,4vw,1.0625rem)', color: 'var(--text-mob)', lineHeight: 1.7 }}>{sr.description}</p>
              </div>

              {/* Linked wizard result */}
              {sr.wizard_results && (
                <>
                  <div style={{ height: 1, background: 'var(--bdr2-mob)', margin: '12px 0 16px' }} />
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12 }}>Linked Wizard Result</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                      {[
                        { label: 'Stone',          val: [sr.wizard_results.stone_variety, sr.wizard_results.stone_species].filter(Boolean).join(' ') || '—' },
                        { label: 'Score',          val: `${Math.round(sr.wizard_results.feasibility_percent)}%` },
                        { label: 'Recommendation', val: sr.wizard_results.recommendation },
                        { label: 'Weight Loss',    val: sr.wizard_results.weight_loss },
                      ].map(f => (
                        <div key={f.label} style={{ padding: '10px 12px', background: 'var(--bg-mob-card)', border: '0.5px solid var(--bdr2-mob)', borderRadius: 8 }}>
                          <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-mob-muted)', marginBottom: 4 }}>{f.label}</div>
                          <div style={{ fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(0.875rem,3.8vw,1.0rem)', color: 'var(--text-mob)', fontWeight: 500 }}>{f.val}</div>
                        </div>
                      ))}
                    </div>
                    {sr.wizard_results.disclaimer1_confirmed_at && (
                      <div style={{ marginTop: 10, fontFamily: 'var(--font-mono-mob)', fontSize: 9, color: 'var(--text-mob-muted)', fontStyle: 'italic' }}>
                        Terms confirmed: {new Date(sr.wizard_results.disclaimer1_confirmed_at).toLocaleString()}
                      </div>
                    )}
                  </div>
                </>
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
}