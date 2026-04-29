// frontend/components/admin/users/mobile/panels/AdminUserServiceRequestsPanel.tsx
//
// Mirrors: account/mobile/panels/3ServiceRequestPanel.tsx
// Admin extras: markSRRead on tap, wizard result linked block.
// No archive action, no new request button — admin view only.

import { fmtDate, fmtTime } from '../../../../lib/utils';
import { useSwipeDownToClose } from '../../../account/shared/hooks/useSwipeDownToClose';

interface Props {
  open:            boolean;
  serviceRequests: any[];
  onMarkRead:      (item: any) => void;
  onClose:         () => void;
}

export default function AdminUserServiceRequestsPanel({
  open, serviceRequests, onMarkRead, onClose,
}: Props) {
  const { elementRef, touchHandlers } = useSwipeDownToClose({ onClose });

  const unreadCount = serviceRequests.filter(s => !s.is_read).length;

  return (
    <div ref={elementRef} className={`slide-panel${open ? ' open' : ''}`}>
      <div className="panel-header" {...touchHandlers}>
        <span className="panel-title">
          Service Requests{unreadCount > 0 ? ` · ${unreadCount} new` : ''}
        </span>
        <button className="panel-close" onClick={onClose}>✕</button>
      </div>

      <div className="sr-list">
        {serviceRequests.length === 0 ? (
          <div className="sr-empty">No service requests yet.</div>
        ) : (
          serviceRequests.map(sr => (
            <div
              key={sr.service_request_id}
              onClick={() => onMarkRead(sr)}
              style={{
                padding: 'clamp(12px,3.5vw,16px) clamp(1rem,4.5vw,1.25rem)',
                borderBottom: '0.5px solid var(--bdr2-mob)',
                cursor: 'pointer',
                display: 'flex', alignItems: 'flex-start', gap: 12,
              }}
            >
              {!sr.is_read && (
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--gold)', marginTop: 7, flexShrink: 0 }} />
              )}
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'var(--font-display-mob)', fontSize: 'clamp(14px,3.8vw,16px)', color: 'var(--gold)', marginBottom: 4 }}>
                  {sr.service_type || 'Service Request'}
                </div>
                <div style={{ fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(13px,3.4vw,14px)', color: 'var(--text-mob-muted)', lineHeight: 1.6, marginBottom: 6 }}>
                  {sr.description}
                </div>
                <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 10, color: 'var(--text-mob-muted)', opacity: 0.6 }}>
                  {sr.created_at ? `${fmtDate(sr.created_at)} · ${fmtTime(sr.created_at)}` : '--'}
                </div>

                {/* Linked wizard result block — same as [id].tsx */}
                {sr.wizard_results && (
                  <div style={{
                    marginTop: 12, padding: 12,
                    background: 'rgba(207,221,78,0.04)',
                    border: '0.5px solid rgba(207,221,78,0.2)',
                    borderRadius: 6,
                  }}>
                    <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>
                      Linked Wizard Result
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                      {[
                        { label: 'Stone',          val: [sr.wizard_results.stone_variety, sr.wizard_results.stone_species].filter(Boolean).join(' ') || '—' },
                        { label: 'Score',          val: `${Math.round(sr.wizard_results.feasibility_percent)}%` },
                        { label: 'Recommendation', val: sr.wizard_results.recommendation },
                        { label: 'Weight Loss',    val: sr.wizard_results.weight_loss },
                      ].map(f => (
                        <div key={f.label}>
                          <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 9, color: 'var(--text-mob-muted)', marginBottom: 2 }}>{f.label}</div>
                          <div style={{ fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(12px,3.2vw,13px)', color: 'var(--text-mob)' }}>{f.val}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
