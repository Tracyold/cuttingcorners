// comp/admin/mobile/panels/users/drawers/AdminUserWorkOrderDrawer.tsx
// Pure UI. Receives all state and actions as props from AdminUserWorkOrdersPanel.
// No hooks called here.

import { formatMoney, fmtDate, fmtTime } from '../../../../../../lib/utils';
import { useSwipeToClose } from '../../../../../account/shared/hooks/useSwipeToClose';

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  CREATED:   { bg: 'rgba(207,221,78,0.12)',  color: 'var(--gold)'  },
  ACCEPTED:  { bg: 'rgba(45,212,191,0.12)',  color: '#2dd4bf'      },
  CONFIRMED: { bg: 'rgba(106,176,245,0.12)', color: '#6ab0f5'      },
  COMPLETE:  { bg: 'rgba(78,201,148,0.12)',  color: '#4ec994'      },
  CANCELLED: { bg: 'rgba(248,113,113,0.12)', color: '#f87171'      },
};

interface Props {
  open:                boolean;
  wo:                  any;
  user:                any;
  adminInfo:           any;
  session:             any;
  editingWOAddr:       boolean;
  setEditingWOAddr:    (v: boolean) => void;
  woAdminAddrEdit:     string;
  setWoAdminAddrEdit:  (v: string) => void;
  woClientAddrEdit:    string;
  setWoClientAddrEdit: (v: string) => void;
  openAddressEdit:     (wo: any, adminInfo: any) => void;
  onConfirm:           (wo: any) => void;
  onComplete:          (wo: any) => void;
  onCancel:            (wo: any) => void;
  onSaveAddresses:     (wo: any, session: any, adminInfo: any) => void;
  onSavePaymentLink:   (wo: any, link: string) => void;
  onMarkPaidOutside:   (wo: any) => void;
  onClose:             () => void;
}

export default function AdminUserWorkOrderDrawer({
  open, wo, user, adminInfo, session,
  editingWOAddr, setEditingWOAddr,
  woAdminAddrEdit, setWoAdminAddrEdit,
  woClientAddrEdit, setWoClientAddrEdit,
  openAddressEdit,
  onConfirm, onComplete, onCancel,
  onSaveAddresses, onSavePaymentLink, onMarkPaidOutside,
  onClose,
}: Props) {
  const { elementRef, touchHandlers } = useSwipeToClose({ onClose });

  if (!wo) return null;

  const inputStyle: React.CSSProperties = {
    width: '100%', background: 'var(--bg-mob)', border: '0.5px solid var(--bdr2-mob)',
    color: 'var(--text-mob)', fontFamily: 'var(--font-ui-mob)',
    fontSize: 'clamp(0.875rem,3.8vw,1.0rem)', padding: '9px 11px', outline: 'none', marginBottom: 10,
  };

  const detailRows = [
    { label: 'Service Type',    val: wo.service_type },
    { label: 'Gem Type',        val: wo.gem_type },
    { label: 'Est. Turnaround', val: wo.estimated_turnaround },
    { label: 'Created',         val: wo.created_at    ? `${fmtDate(wo.created_at)} · ${fmtTime(wo.created_at)}`     : null },
    { label: 'Accepted',        val: wo.accepted_at   ? `${fmtDate(wo.accepted_at)} · ${fmtTime(wo.accepted_at)}`   : null },
    { label: 'Confirmed',       val: wo.confirmed_at  ? `${fmtDate(wo.confirmed_at)} · ${fmtTime(wo.confirmed_at)}` : null },
    { label: 'Completed',       val: wo.completed_at  ? `${fmtDate(wo.completed_at)} · ${fmtTime(wo.completed_at)}` : null },
    { label: 'Cancelled',       val: wo.cancelled_at  ? fmtDate(wo.cancelled_at)                                    : null },
  ].filter(r => r.val);

  return (
    <>
      <div className={`overlay${open ? ' open' : ''}`} onClick={onClose} />

      <div ref={elementRef} className={`wo-drawer${open ? ' open' : ''}`} {...touchHandlers}>
        <div className="wo-handle" />
        <div className="wo-body">

          <div className="wo-topbar">
            <span style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '3px 10px', borderRadius: 999, background: STATUS_STYLE[wo.status]?.bg, color: STATUS_STYLE[wo.status]?.color }}>
              {wo.status}
            </span>
            <span style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 'clamp(0.8125rem,3.5vw,0.9375rem)', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-mob-muted)', flex: 1, marginLeft: 10 }}>
              #{String(wo.work_order_id).slice(-4)} · {wo.title}
            </span>
            <button className="wo-close" onClick={onClose}>✕</button>
          </div>

          <div className="wo-scroll">
            <div className="wo-content">

              {adminInfo && (
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 'clamp(0.75rem,3.2vw,0.875rem)', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#2dd4bf', marginBottom: 8 }}>← Client Sends Item Here</div>
                  <div style={{ background: 'var(--bg-mob-card)', border: '0.5px solid var(--bdr2-mob)', padding: 14, fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(0.875rem,3.8vw,1.0rem)', color: 'var(--text-mob-muted)', lineHeight: 2 }}>
                    <div style={{ color: 'var(--gold)', fontSize: 'clamp(0.9375rem,4vw,1.0625rem)' }}>{adminInfo.business_name}</div>
                    <div>{adminInfo.full_name}</div>
                    <div style={{ fontWeight: 600 }}>{adminInfo.address}</div>
                    <div>{adminInfo.contact_email}</div>
                    <div>{adminInfo.phone}</div>
                  </div>
                </div>
              )}

              {user && (
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 'clamp(0.75rem,3.2vw,0.875rem)', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#2dd4bf', marginBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Return Item Here →</span>
                    <button onClick={() => openAddressEdit(wo, adminInfo)} className="wo-edit-btn">Edit</button>
                  </div>

                  {editingWOAddr ? (
                    <div style={{ background: 'var(--bg-mob-card)', border: '0.5px solid var(--bdr2-mob)', padding: 14 }}>
                      <label style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-mob-muted)', display: 'block', marginBottom: 4 }}>Admin Address (send to)</label>
                      <input value={woAdminAddrEdit} onChange={e => setWoAdminAddrEdit(e.target.value)} style={inputStyle} />
                      <label style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-mob-muted)', display: 'block', marginBottom: 4 }}>Client Return Address</label>
                      <input value={woClientAddrEdit} onChange={e => setWoClientAddrEdit(e.target.value)} style={inputStyle} />
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button onClick={() => onSaveAddresses(wo, session, adminInfo)} className="order-accept" style={{ flex: 1, background: 'var(--gold)', color: 'var(--bg-deep)', border: 'none' }}>Save</button>
                        <button onClick={() => setEditingWOAddr(false)} className="wo-edit-btn" style={{ flex: 1 }}>Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div style={{ background: 'var(--bg-mob-card)', border: '0.5px solid var(--bdr2-mob)', padding: 14, fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(0.875rem,3.8vw,1.0rem)', color: 'var(--text-mob-muted)', lineHeight: 2 }}>
                      <div style={{ color: '#2dd4bf', fontSize: 'clamp(0.9375rem,4vw,1.0625rem)' }}>{user.name}</div>
                      <div>{user.email}</div>
                      {user.phone && <div>{user.phone}</div>}
                      <div style={{ fontWeight: 600 }}>{wo.wo_shipping_address || user.shipping_address || 'No address on file'}</div>
                      {wo.wo_shipping_address && wo.wo_shipping_address !== user.shipping_address && (
                        <div style={{ fontSize: 'clamp(0.8125rem,3.5vw,0.9375rem)', color: '#2dd4bf', marginTop: 4, fontStyle: 'italic' }}>* Custom address for this work order only</div>
                      )}
                    </div>
                  )}
                </div>
              )}

              <div style={{ marginBottom: 20 }}>
                {detailRows.map(row => (
                  <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '0.5px solid var(--bdr2-mob)' }}>
                    <span style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 'clamp(0.75rem,3.2vw,0.875rem)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-mob-muted)' }}>{row.label}</span>
                    <span style={{ fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(0.875rem,3.8vw,1.0rem)', color: 'var(--text-mob)', textAlign: 'right', maxWidth: '60%' }}>{row.val}</span>
                  </div>
                ))}
              </div>

              {wo.description && (
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 'clamp(0.75rem,3.2vw,0.875rem)', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-mob-muted)', marginBottom: 6 }}>Description</div>
                  <p style={{ fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(0.9375rem,4vw,1.0625rem)', color: 'var(--text-mob)', lineHeight: 1.7 }}>{wo.description}</p>
                </div>
              )}

              {wo.notes && (
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 'clamp(0.75rem,3.2vw,0.875rem)', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-mob-muted)', marginBottom: 6 }}>Internal Notes</div>
                  <p style={{ fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(0.9375rem,4vw,1.0625rem)', color: 'var(--text-mob-muted)', lineHeight: 1.7 }}>{wo.notes}</p>
                </div>
              )}

              {wo.estimated_price && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: 14, background: 'var(--bg-mob-card)', border: '0.5px solid var(--bdr2-mob)', marginBottom: 16 }}>
                  <span style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 'clamp(0.75rem,3.2vw,0.875rem)', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-mob-muted)' }}>Quoted Price</span>
                  <span style={{ fontFamily: 'var(--font-mono-mob)', fontSize: '1.375rem', color: '#4ec994' }}>{formatMoney(wo.estimated_price)}</span>
                </div>
              )}

              {wo.status === 'COMPLETE' && (
                <div style={{ padding: 16, background: 'var(--bg-mob-card)', border: '0.5px solid var(--bdr2-mob)', marginBottom: 16 }}>
                  <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-mob-muted)', marginBottom: 12 }}>Payment</div>
                  {wo.paid_outside_site
                    ? <div style={{ fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(0.9375rem,4vw,1.0625rem)', color: '#4ec994' }}>✓ Marked as paid outside site</div>
                    : wo.stripe_payment_link
                      ? <div>
                          <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 10, color: 'var(--text-mob-muted)', marginBottom: 6 }}>Stripe payment link:</div>
                          <a href={wo.stripe_payment_link} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)', fontSize: 'clamp(12px,3.2vw,13px)', wordBreak: 'break-all' }}>{wo.stripe_payment_link}</a>
                        </div>
                      : <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                          <input placeholder="Paste Stripe payment link..." style={{ ...inputStyle, marginBottom: 0 }} onBlur={e => { if (e.target.value.trim()) onSavePaymentLink(wo, e.target.value); }} />
                          <button onClick={() => onMarkPaidOutside(wo)} className="wo-edit-btn" style={{ width: '100%', padding: '9px 0', textAlign: 'center' }}>Paid Outside Site</button>
                        </div>
                  }
                </div>
              )}

              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
                {wo.status === 'ACCEPTED' && (
                  <button onClick={() => onConfirm(wo)} className="order-accept" style={{ flex: 1, background: 'rgba(106,176,245,0.12)', borderColor: '#6ab0f5', color: '#6ab0f5' }}>Confirm Order</button>
                )}
                {wo.status === 'CONFIRMED' && (
                  <button onClick={() => onComplete(wo)} className="order-accept" style={{ flex: 1, background: 'rgba(78,201,148,0.12)', borderColor: '#4ec994', color: '#4ec994' }}>Mark Complete</button>
                )}
                {(wo.status === 'CREATED' || wo.status === 'ACCEPTED' || wo.status === 'CONFIRMED') && (
                  <button onClick={() => onCancel(wo)} className="order-accept" style={{ flex: 1, background: 'rgba(248,113,113,0.12)', borderColor: '#f87171', color: '#f87171' }}>Cancel Order</button>
                )}
              </div>

              {wo.edit_history && wo.edit_history.length > 0 && (
                <div className="wo-log" style={{ marginTop: 24, borderTop: '0.5px solid var(--bdr2-mob)', paddingTop: 16 }}>
                  <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 'clamp(0.75rem,3.2vw,0.875rem)', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-mob-muted)', marginBottom: 10 }}>Activity Log</div>
                  {[...wo.edit_history].reverse().map((entry: any, i: number) => (
                    <div key={i} className={`wo-log-entry ${entry.by === 'admin' ? 'admin' : 'user'}`}>
                      <div className="wo-log-stamp">
                        <span className="wo-log-who">{entry.by}</span>
                        <span>{fmtDate(entry.at)} · {fmtTime(entry.at)}</span>
                      </div>
                      <div className="wo-log-change">{entry.action}</div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
}