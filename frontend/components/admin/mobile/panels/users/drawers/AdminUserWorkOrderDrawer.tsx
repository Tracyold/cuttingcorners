// comp/admin/mobile/panels/users/drawers/AdminUserWorkOrderDrawer.tsx
// Pure UI. Imports useAdminUserWorkOrders + useAdminUserDetail for data.
// No logic lives here.

import { formatMoney, fmtDate, fmtTime } from '../../../../../../lib/utils';
import { useSwipeToClose } from '../../../../../account/shared/hooks/useSwipeToClose';
import { useAdminUserDetail } from '../hooks/useAdminUserDetail';
import { useAdminUserWorkOrders } from '../hooks/useAdminUserWorkOrders';

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  CREATED:   { bg: 'rgba(207,221,78,0.12)',  color: 'var(--gold)'  },
  ACCEPTED:  { bg: 'rgba(45,212,191,0.12)',  color: '#2dd4bf'      },
  CONFIRMED: { bg: 'rgba(106,176,245,0.12)', color: '#6ab0f5'      },
  COMPLETE:  { bg: 'rgba(78,201,148,0.12)',  color: '#4ec994'      },
  CANCELLED: { bg: 'rgba(248,113,113,0.12)', color: '#f87171'      },
};

interface Props {
  open:    boolean;
  id:      string;
  session: any;
  onClose: () => void;
}

export default function AdminUserWorkOrderDrawer({ open, id, session, onClose }: Props) {
  const { elementRef, touchHandlers } = useSwipeToClose({ onClose });
  const { user, adminInfo, workOrders, setWO } = useAdminUserDetail(id, session);
  const {
    selectedWO, closeWO,
    editingWOAddr, setEditingWOAddr,
    woAdminAddrEdit, setWoAdminAddrEdit,
    woClientAddrEdit, setWoClientAddrEdit,
    openAddressEdit,
    confirmWO, completeWO, cancelWO,
    saveAddresses, savePaymentLink, markPaidOutside,
  } = useAdminUserWorkOrders(id, setWO);

  if (!selectedWO) return null;

  const inputStyle: React.CSSProperties = {
    width: '100%', background: 'var(--bg-mob)', border: '0.5px solid var(--bdr2-mob)',
    color: 'var(--text-mob)', fontFamily: 'var(--font-ui-mob)',
    fontSize: 'clamp(0.875rem,3.8vw,1.0rem)', padding: '9px 11px', outline: 'none', marginBottom: 10,
  };

  const detailRows = [
    { label: 'Service Type',    val: selectedWO.service_type },
    { label: 'Gem Type',        val: selectedWO.gem_type },
    { label: 'Est. Turnaround', val: selectedWO.estimated_turnaround },
    { label: 'Created',         val: selectedWO.created_at    ? `${fmtDate(selectedWO.created_at)} · ${fmtTime(selectedWO.created_at)}`     : null },
    { label: 'Accepted',        val: selectedWO.accepted_at   ? `${fmtDate(selectedWO.accepted_at)} · ${fmtTime(selectedWO.accepted_at)}`   : null },
    { label: 'Confirmed',       val: selectedWO.confirmed_at  ? `${fmtDate(selectedWO.confirmed_at)} · ${fmtTime(selectedWO.confirmed_at)}` : null },
    { label: 'Completed',       val: selectedWO.completed_at  ? `${fmtDate(selectedWO.completed_at)} · ${fmtTime(selectedWO.completed_at)}` : null },
    { label: 'Cancelled',       val: selectedWO.cancelled_at  ? fmtDate(selectedWO.cancelled_at)                                           : null },
  ].filter(r => r.val);

  return (
    <>
      <div className={`overlay${open ? ' open' : ''}`} onClick={closeWO} />

      <div ref={elementRef} className={`wo-drawer${open ? ' open' : ''}`} {...touchHandlers}>
        <div className="wo-handle" />
        <div className="wo-body">

          <div className="wo-topbar">
            <span style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '3px 10px', borderRadius: 999, background: STATUS_STYLE[selectedWO.status]?.bg, color: STATUS_STYLE[selectedWO.status]?.color }}>
              {selectedWO.status}
            </span>
            <span style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 'clamp(0.8125rem,3.5vw,0.9375rem)', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-mob-muted)', flex: 1, marginLeft: 10 }}>
              #{String(selectedWO.work_order_id).slice(-4)} · {selectedWO.title}
            </span>
            <button className="wo-close" onClick={closeWO}>✕</button>
          </div>

          <div className="wo-scroll">
            <div className="wo-content">

              {/* Admin address */}
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

              {/* Client return address */}
              {user && (
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 'clamp(0.75rem,3.2vw,0.875rem)', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#2dd4bf', marginBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Return Item Here →</span>
                    <button onClick={() => openAddressEdit(selectedWO, adminInfo)} className="wo-edit-btn">Edit</button>
                  </div>

                  {editingWOAddr ? (
                    <div style={{ background: 'var(--bg-mob-card)', border: '0.5px solid var(--bdr2-mob)', padding: 14 }}>
                      <label style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-mob-muted)', display: 'block', marginBottom: 4 }}>Admin Address (send to)</label>
                      <input value={woAdminAddrEdit} onChange={e => setWoAdminAddrEdit(e.target.value)} style={inputStyle} />
                      <label style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-mob-muted)', display: 'block', marginBottom: 4 }}>Client Return Address</label>
                      <input value={woClientAddrEdit} onChange={e => setWoClientAddrEdit(e.target.value)} style={inputStyle} />
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button onClick={() => saveAddresses(selectedWO, session, adminInfo)} className="order-accept" style={{ flex: 1, background: 'var(--gold)', color: 'var(--bg-deep)', border: 'none' }}>Save</button>
                        <button onClick={() => setEditingWOAddr(false)} className="wo-edit-btn" style={{ flex: 1 }}>Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div style={{ background: 'var(--bg-mob-card)', border: '0.5px solid var(--bdr2-mob)', padding: 14, fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(0.875rem,3.8vw,1.0rem)', color: 'var(--text-mob-muted)', lineHeight: 2 }}>
                      <div style={{ color: '#2dd4bf', fontSize: 'clamp(0.9375rem,4vw,1.0625rem)' }}>{user.name}</div>
                      <div>{user.email}</div>
                      {user.phone && <div>{user.phone}</div>}
                      <div style={{ fontWeight: 600 }}>{selectedWO.wo_shipping_address || user.shipping_address || 'No address on file'}</div>
                      {selectedWO.wo_shipping_address && selectedWO.wo_shipping_address !== user.shipping_address && (
                        <div style={{ fontSize: 'clamp(0.8125rem,3.5vw,0.9375rem)', color: '#2dd4bf', marginTop: 4, fontStyle: 'italic' }}>* Custom address for this work order only</div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Detail rows */}
              <div style={{ marginBottom: 20 }}>
                {detailRows.map(row => (
                  <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '0.5px solid var(--bdr2-mob)' }}>
                    <span style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 'clamp(0.75rem,3.2vw,0.875rem)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-mob-muted)' }}>{row.label}</span>
                    <span style={{ fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(0.875rem,3.8vw,1.0rem)', color: 'var(--text-mob)', textAlign: 'right', maxWidth: '60%' }}>{row.val}</span>
                  </div>
                ))}
              </div>

              {selectedWO.description && (
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 'clamp(0.75rem,3.2vw,0.875rem)', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-mob-muted)', marginBottom: 6 }}>Description</div>
                  <p style={{ fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(0.9375rem,4vw,1.0625rem)', color: 'var(--text-mob)', lineHeight: 1.7 }}>{selectedWO.description}</p>
                </div>
              )}

              {selectedWO.notes && (
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 'clamp(0.75rem,3.2vw,0.875rem)', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-mob-muted)', marginBottom: 6 }}>Internal Notes</div>
                  <p style={{ fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(0.9375rem,4vw,1.0625rem)', color: 'var(--text-mob-muted)', lineHeight: 1.7 }}>{selectedWO.notes}</p>
                </div>
              )}

              {selectedWO.estimated_price && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: 14, background: 'var(--bg-mob-card)', border: '0.5px solid var(--bdr2-mob)', marginBottom: 16 }}>
                  <span style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 'clamp(0.75rem,3.2vw,0.875rem)', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-mob-muted)' }}>Quoted Price</span>
                  <span style={{ fontFamily: 'var(--font-mono-mob)', fontSize: '1.375rem', color: '#4ec994' }}>{formatMoney(selectedWO.estimated_price)}</span>
                </div>
              )}

              {/* Payment — COMPLETE only */}
              {selectedWO.status === 'COMPLETE' && (
                <div style={{ padding: 16, background: 'var(--bg-mob-card)', border: '0.5px solid var(--bdr2-mob)', marginBottom: 16 }}>
                  <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-mob-muted)', marginBottom: 12 }}>Payment</div>
                  {selectedWO.paid_outside_site
                    ? <div style={{ fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(0.9375rem,4vw,1.0625rem)', color: '#4ec994' }}>✓ Marked as paid outside site</div>
                    : selectedWO.stripe_payment_link
                      ? <div>
                          <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 10, color: 'var(--text-mob-muted)', marginBottom: 6 }}>Stripe payment link:</div>
                          <a href={selectedWO.stripe_payment_link} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)', fontSize: 'clamp(12px,3.2vw,13px)', wordBreak: 'break-all' }}>{selectedWO.stripe_payment_link}</a>
                        </div>
                      : <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                          <input placeholder="Paste Stripe payment link..." style={{ ...inputStyle, marginBottom: 0 }} onBlur={e => { if (e.target.value.trim()) savePaymentLink(selectedWO, e.target.value); }} />
                          <button onClick={() => markPaidOutside(selectedWO)} className="wo-edit-btn" style={{ width: '100%', padding: '9px 0', textAlign: 'center' }}>Paid Outside Site</button>
                        </div>
                  }
                </div>
              )}

              {/* Action buttons */}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
                {selectedWO.status === 'ACCEPTED' && (
                  <button onClick={() => confirmWO(selectedWO)} className="order-accept" style={{ flex: 1, background: 'rgba(106,176,245,0.12)', borderColor: '#6ab0f5', color: '#6ab0f5' }}>Confirm Order</button>
                )}
                {selectedWO.status === 'CONFIRMED' && (
                  <button onClick={() => completeWO(selectedWO)} className="order-accept" style={{ flex: 1, background: 'rgba(78,201,148,0.12)', borderColor: '#4ec994', color: '#4ec994' }}>Mark Complete</button>
                )}
                {(selectedWO.status === 'CREATED' || selectedWO.status === 'ACCEPTED' || selectedWO.status === 'CONFIRMED') && (
                  <button onClick={() => cancelWO(selectedWO)} className="order-accept" style={{ flex: 1, background: 'rgba(248,113,113,0.12)', borderColor: '#f87171', color: '#f87171' }}>Cancel Order</button>
                )}
              </div>

              {/* Activity log */}
              {selectedWO.edit_history && selectedWO.edit_history.length > 0 && (
                <div className="wo-log" style={{ marginTop: 24, borderTop: '0.5px solid var(--bdr2-mob)', paddingTop: 16 }}>
                  <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 'clamp(0.75rem,3.2vw,0.875rem)', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-mob-muted)', marginBottom: 10 }}>Activity Log</div>
                  {[...selectedWO.edit_history].reverse().map((entry: any, i: number) => (
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
