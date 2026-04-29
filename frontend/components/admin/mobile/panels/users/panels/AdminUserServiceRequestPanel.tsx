// comp/admin/mobile/panels/users/panels/AdminUserServiceRequestsPanel.tsx
// Imports useAdminUserDetail + useAdminUserServiceRequests.

import { fmtDate, fmtTime } from '../../../../../../lib/utils';
import { useSwipeDownToClose } from '../../../../../account/shared/hooks/useSwipeDownToClose';
import { useAdminUserDetail } from '../hooks/useAdminUserDetail';
import { useAdminUserServiceRequests } from '../hooks/useAdminUserServiceRequests';

interface Props {
  open:    boolean;
  id:      string;
  session: any;
  onClose: () => void;
}

export default function AdminUserServiceRequestsPanel({ open, id, session, onClose }: Props) {
  const { elementRef, touchHandlers } = useSwipeDownToClose({ onClose });
  const { serviceRequests, setSR } = useAdminUserDetail(id, session);
  const { markSRRead } = useAdminUserServiceRequests(setSR);

  const unread = serviceRequests.filter(s => !s.is_read).length;

  return (
    <div ref={elementRef} className={`slide-panel${open ? ' open' : ''}`}>
      <div className="panel-header" {...touchHandlers}>
        <span className="panel-title">Service Requests{unread > 0 ? ` · ${unread} new` : ''}</span>
        <button className="panel-close" onClick={onClose}>✕</button>
      </div>

      <div className="sr-list">
        {serviceRequests.length === 0
          ? <div className="sr-empty">No service requests yet.</div>
          : serviceRequests.map(sr => (
            <div key={sr.service_request_id} onClick={() => markSRRead(sr)} className="sr-card-wrap">
              <div className="sr-card" style={{ minHeight: 'auto', cursor: 'pointer', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                {!sr.is_read && <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--gold)', marginTop: 7, flexShrink: 0 }} />}
                <div style={{ flex: 1 }}>
                  <div className="sr-card-top">
                    <div className="sr-card-stone">{sr.service_type || 'Service Request'}</div>
                    <span className="sr-card-status">Pending</span>
                  </div>
                  <div className="sr-card-rec">{sr.description}</div>
                  <div className="sr-card-date">{sr.created_at ? `${fmtDate(sr.created_at)} · ${fmtTime(sr.created_at)}` : '--'}</div>
                  {sr.wizard_results && (
                    <div style={{ marginTop: 10, padding: 10, background: 'rgba(207,221,78,0.04)', border: '0.5px solid rgba(207,221,78,0.2)', borderRadius: 6 }}>
                      <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 6 }}>Linked Wizard Result</div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                        {[
                          { label: 'Stone', val: [sr.wizard_results.stone_variety, sr.wizard_results.stone_species].filter(Boolean).join(' ') || '—' },
                          { label: 'Score', val: `${Math.round(sr.wizard_results.feasibility_percent)}%` },
                          { label: 'Rec',   val: sr.wizard_results.recommendation },
                          { label: 'Loss',  val: sr.wizard_results.weight_loss },
                        ].map(f => (
                          <div key={f.label}>
                            <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 9, color: 'var(--text-mob-muted)', marginBottom: 2 }}>{f.label}</div>
                            <div style={{ fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(12px,3.2vw,13px)', color: 'var(--text-mob)' }}>{f.val}</div>
                          </div>
                        ))}
                      </div>
                      {sr.wizard_results.disclaimer1_confirmed_at && (
                        <div style={{ marginTop: 6, fontFamily: 'var(--font-mono-mob)', fontSize: 9, color: 'var(--text-mob-muted)', fontStyle: 'italic' }}>
                          Terms confirmed: {new Date(sr.wizard_results.disclaimer1_confirmed_at).toLocaleString()}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}
