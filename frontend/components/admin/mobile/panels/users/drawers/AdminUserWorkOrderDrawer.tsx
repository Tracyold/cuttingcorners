// comp/admin/mobile/panels/users/drawers/AdminUserWorkOrderDrawer.tsx
// Pure UI. Receives all state and actions as props from AdminUserWorkOrdersPanel.
// Two separate address blocks — Admin and Client — each with their own Edit form.
// All edits save to work_orders columns only, never to admin_users or account_users.

import { useState, useEffect } from 'react';
import { supabase } from '../../../../../../lib/supabase';
import { formatMoney, fmtDate, fmtTime } from '../../../../../../lib/utils';
import { useSwipeToClose } from '../../../../../account/shared/hooks/useSwipeToClose';

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  CREATED:   { bg: 'rgba(207,221,78,0.12)',  color: 'var(--gold)'  },
  ACCEPTED:  { bg: 'rgba(45,212,191,0.12)',  color: '#2dd4bf'      },
  CONFIRMED: { bg: 'rgba(106,176,245,0.12)', color: '#6ab0f5'      },
  COMPLETE:  { bg: 'rgba(78,201,148,0.12)',  color: '#4ec994'      },
  CANCELLED: { bg: 'rgba(248,113,113,0.12)', color: '#f87171'      },
};

const inputStyle: React.CSSProperties = {
  width: '100%', background: 'var(--bg-mob)', border: '0.5px solid var(--bdr2-mob)',
  color: 'var(--text-mob)', fontFamily: 'var(--font-ui-mob)',
  fontSize: 'clamp(0.875rem,3.8vw,1.0rem)', padding: '9px 11px', outline: 'none',
  marginBottom: 8, borderRadius: 6, boxSizing: 'border-box' as const,
};

function AddressBlock({
  title, direction, color, fields, onEdit,
}: {
  title: string; direction: string; color: string;
  fields: { label: string; val: string }[];
  onEdit: () => void;
}) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 'clamp(0.75rem,3.2vw,0.875rem)', letterSpacing: '0.18em', textTransform: 'uppercase', color }}>
          {direction}
        </div>
        <button onClick={onEdit} className="wo-edit-btn">Edit</button>
      </div>
      <div style={{ background: 'var(--bg-mob-card)', border: '0.5px solid var(--bdr2-mob)', padding: 14, fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(0.875rem,3.8vw,1.0rem)', color: 'var(--text-mob-muted)', lineHeight: 2 }}>
        <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-mob-muted)', marginBottom: 6, opacity: 0.6 }}>{title}</div>
        {fields.map(f => (
          <div key={f.label} style={{ color: f.label === 'name' ? color : 'var(--text-mob-muted)', fontWeight: f.label === 'address' ? 600 : 400 }}>
            {f.val || <span style={{ opacity: 0.4, fontStyle: 'italic' }}>No {f.label} on file</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

function EditForm({
  title, fields, values, onChange, onSave, onCancel, saving,
}: {
  title: string;
  fields: { key: string; label: string; placeholder: string }[];
  values: Record<string, string>;
  onChange: (k: string, v: string) => void;
  onSave: () => void;
  onCancel: () => void;
  saving: boolean;
}) {
  return (
    <div style={{ background: 'var(--bg-mob-card)', border: '0.5px solid var(--bdr2-mob)', padding: 14, marginBottom: 16, borderRadius: 8 }}>
      <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-mob-muted)', marginBottom: 12 }}>
        Edit {title} — this work order only
      </div>
      {fields.map(f => (
        <div key={f.key}>
          <label style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-mob-muted)', display: 'block', marginBottom: 3 }}>{f.label}</label>
          <input value={values[f.key] || ''} onChange={e => onChange(f.key, e.target.value)} placeholder={f.placeholder} style={inputStyle} />
        </div>
      ))}
      <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
        <button onClick={onSave} disabled={saving} className="order-accept" style={{ flex: 1, background: 'var(--gold)', color: 'var(--bg-mob-deep)', border: 'none' }}>
          {saving ? 'Saving...' : 'Save'}
        </button>
        <button onClick={onCancel} className="wo-edit-btn" style={{ flex: 1 }}>Cancel</button>
      </div>
    </div>
  );
}

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
  onSaved?:            () => void;
}

export default function AdminUserWorkOrderDrawer({
  open, wo, user, adminInfo, session,
  onConfirm, onComplete, onCancel,
  onSavePaymentLink, onMarkPaidOutside,
  onClose,
}: Props) {
  const { elementRef, touchHandlers } = useSwipeToClose({ onClose });

  // ── Admin edit state ──
  const [editingAdmin, setEditingAdmin] = useState(false);
  const [adminEdit,    setAdminEdit]    = useState<Record<string,string>>({});
  const [savingAdmin,  setSavingAdmin]  = useState(false);

  // ── Client edit state ──
  const [editingClient, setEditingClient] = useState(false);
  const [clientEdit,    setClientEdit]    = useState<Record<string,string>>({});
  const [savingClient,  setSavingClient]  = useState(false);

  // ── Local WO state (optimistic updates) ──
  const [localWO, setLocalWO] = useState<any>(null);

  useEffect(() => {
    if (wo) setLocalWO(wo);
    setEditingAdmin(false);
    setEditingClient(false);
  }, [wo?.work_order_id]);

  if (!wo || !localWO) return null;

  // ── Resolved display values ──
  // Admin: prefer per-WO values, fall back to adminInfo
  const adminName    = localWO.wo_admin_name    || adminInfo?.business_name || adminInfo?.full_name || '';
  const adminAddress = localWO.wo_admin_address || adminInfo?.address       || '';
  const adminPhone   = localWO.wo_admin_phone   || adminInfo?.phone         || '';
  const adminEmail   = localWO.wo_admin_email   || adminInfo?.contact_email || '';

  // Client: prefer per-WO values, fall back to user profile
  const clientName    = localWO.wo_client_name  || localWO.wo_recipient_name || user?.name            || '';
  const clientAddress = localWO.wo_shipping_address                           || user?.shipping_address || '';
  const clientPhone   = localWO.wo_client_phone                               || user?.phone            || '';
  const clientEmail   = localWO.wo_client_email                               || user?.email            || '';

  // ── Open edit forms ──
  const openAdminEdit = () => {
    setAdminEdit({ name: adminName, address: adminAddress, phone: adminPhone, email: adminEmail });
    setEditingAdmin(true);
    setEditingClient(false);
  };

  const openClientEdit = () => {
    setClientEdit({ name: clientName, address: clientAddress, phone: clientPhone, email: clientEmail });
    setEditingClient(true);
    setEditingAdmin(false);
  };

  // ── Save admin (WO only) ──
  const saveAdmin = async () => {
    setSavingAdmin(true);
    const log = [...(Array.isArray(localWO.edit_history) ? localWO.edit_history : []),
      { action: 'Admin contact info updated', by: 'admin', at: new Date().toISOString() }];
    const { error } = await supabase.from('work_orders').update({
      wo_admin_name:    adminEdit.name    || null,
      wo_admin_address: adminEdit.address || null,
      wo_admin_phone:   adminEdit.phone   || null,
      wo_admin_email:   adminEdit.email   || null,
      edit_history:     log,
    }).eq('work_order_id', localWO.work_order_id);
    setSavingAdmin(false);
    if (!error) {
      setLocalWO((prev: any) => ({ ...prev, wo_admin_name: adminEdit.name, wo_admin_address: adminEdit.address, wo_admin_phone: adminEdit.phone, wo_admin_email: adminEdit.email, edit_history: log }));
      setEditingAdmin(false);
    }
  };

  // ── Save client (WO only) ──
  const saveClient = async () => {
    setSavingClient(true);
    const log = [...(Array.isArray(localWO.edit_history) ? localWO.edit_history : []),
      { action: 'Client contact info updated', by: 'admin', at: new Date().toISOString() }];
    const { error } = await supabase.from('work_orders').update({
      wo_client_name:    clientEdit.name    || null,
      wo_shipping_address: clientEdit.address || null,
      wo_client_phone:   clientEdit.phone   || null,
      wo_client_email:   clientEdit.email   || null,
      edit_history:      log,
    }).eq('work_order_id', localWO.work_order_id);
    setSavingClient(false);
    if (!error) {
      setLocalWO((prev: any) => ({ ...prev, wo_client_name: clientEdit.name, wo_shipping_address: clientEdit.address, wo_client_phone: clientEdit.phone, wo_client_email: clientEdit.email, edit_history: log }));
      setEditingClient(false);
    }
  };

  const detailRows = [
    { label: 'Service Type',    val: localWO.service_type },
    { label: 'Gem Type',        val: localWO.gem_type },
    { label: 'Est. Turnaround', val: localWO.estimated_turnaround },
    { label: 'Created',         val: localWO.created_at   ? `${fmtDate(localWO.created_at)} · ${fmtTime(localWO.created_at)}`     : null },
    { label: 'Accepted',        val: localWO.accepted_at  ? `${fmtDate(localWO.accepted_at)} · ${fmtTime(localWO.accepted_at)}`   : null },
    { label: 'Confirmed',       val: localWO.confirmed_at ? `${fmtDate(localWO.confirmed_at)} · ${fmtTime(localWO.confirmed_at)}` : null },
    { label: 'Completed',       val: localWO.completed_at ? `${fmtDate(localWO.completed_at)} · ${fmtTime(localWO.completed_at)}` : null },
    { label: 'Cancelled',       val: localWO.cancelled_at ? fmtDate(localWO.cancelled_at)                                         : null },
  ].filter(r => r.val);

  return (
    <>
      <div className={`overlay${open ? ' open' : ''}`} onClick={onClose} />
      <div ref={elementRef} className={`wo-drawer${open ? ' open' : ''}`} {...touchHandlers}>
        <div className="wo-handle" />
        <div className="wo-body">

          <div className="wo-topbar">
            <span style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '3px 10px', borderRadius: 999, background: STATUS_STYLE[localWO.status]?.bg, color: STATUS_STYLE[localWO.status]?.color }}>
              {localWO.status}
            </span>
            <span style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 'clamp(0.8125rem,3.5vw,0.9375rem)', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-mob-muted)', flex: 1, marginLeft: 10 }}>
              #{String(localWO.work_order_id).slice(-4)} · {localWO.title}
            </span>
            <button className="wo-close" onClick={onClose}>✕</button>
          </div>

          <div className="wo-scroll">
            <div className="wo-content">

              {/* ── Admin Block ── */}
              {editingAdmin ? (
                <EditForm
                  title="Admin Info"
                  fields={[
                    { key: 'name',    label: 'Business / Name', placeholder: 'CCG Gems' },
                    { key: 'address', label: 'Street Address',  placeholder: '123 Main St, City, AZ 85001' },
                    { key: 'phone',   label: 'Phone',           placeholder: '+1 480 000 0000' },
                    { key: 'email',   label: 'Email',           placeholder: 'admin@example.com' },
                  ]}
                  values={adminEdit}
                  onChange={(k, v) => setAdminEdit(prev => ({ ...prev, [k]: v }))}
                  onSave={saveAdmin}
                  onCancel={() => setEditingAdmin(false)}
                  saving={savingAdmin}
                />
              ) : (
                <AddressBlock
                  title="Admin"
                  direction="← Client Sends Item Here"
                  color="#2dd4bf"
                  fields={[
                    { label: 'name',    val: adminName    },
                    { label: 'address', val: adminAddress },
                    { label: 'phone',   val: adminPhone   },
                    { label: 'email',   val: adminEmail   },
                  ]}
                  onEdit={openAdminEdit}
                />
              )}

              {/* ── Client Block ── */}
              {editingClient ? (
                <EditForm
                  title="Client Info"
                  fields={[
                    { key: 'name',    label: 'Name',           placeholder: 'Client Name' },
                    { key: 'address', label: 'Return Address', placeholder: '123 Main St, City, AZ 85001' },
                    { key: 'phone',   label: 'Phone',          placeholder: '+1 480 000 0000' },
                    { key: 'email',   label: 'Email',          placeholder: 'client@example.com' },
                  ]}
                  values={clientEdit}
                  onChange={(k, v) => setClientEdit(prev => ({ ...prev, [k]: v }))}
                  onSave={saveClient}
                  onCancel={() => setEditingClient(false)}
                  saving={savingClient}
                />
              ) : (
                <AddressBlock
                  title="Client"
                  direction="Return Item Here →"
                  color="#6ab0f5"
                  fields={[
                    { label: 'name',    val: clientName    },
                    { label: 'address', val: clientAddress },
                    { label: 'phone',   val: clientPhone   },
                    { label: 'email',   val: clientEmail   },
                  ]}
                  onEdit={openClientEdit}
                />
              )}

              {/* ── Detail rows ── */}
              <div style={{ marginBottom: 20 }}>
                {detailRows.map(row => (
                  <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '0.5px solid var(--bdr2-mob)' }}>
                    <span style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 'clamp(0.75rem,3.2vw,0.875rem)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-mob-muted)' }}>{row.label}</span>
                    <span style={{ fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(0.875rem,3.8vw,1.0rem)', color: 'var(--text-mob)', textAlign: 'right', maxWidth: '60%' }}>{row.val}</span>
                  </div>
                ))}
              </div>

              {localWO.description && (
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 'clamp(0.75rem,3.2vw,0.875rem)', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-mob-muted)', marginBottom: 6 }}>Description</div>
                  <p style={{ fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(0.9375rem,4vw,1.0625rem)', color: 'var(--text-mob)', lineHeight: 1.7 }}>{localWO.description}</p>
                </div>
              )}

              {localWO.notes && (
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 'clamp(0.75rem,3.2vw,0.875rem)', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-mob-muted)', marginBottom: 6 }}>Internal Notes</div>
                  <p style={{ fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(0.9375rem,4vw,1.0625rem)', color: 'var(--text-mob-muted)', lineHeight: 1.7 }}>{localWO.notes}</p>
                </div>
              )}

              {localWO.estimated_price && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: 14, background: 'var(--bg-mob-card)', border: '0.5px solid var(--bdr2-mob)', marginBottom: 16 }}>
                  <span style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 'clamp(0.75rem,3.2vw,0.875rem)', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-mob-muted)' }}>Quoted Price</span>
                  <span style={{ fontFamily: 'var(--font-mono-mob)', fontSize: '1.375rem', color: '#4ec994' }}>{formatMoney(localWO.estimated_price)}</span>
                </div>
              )}

              {localWO.status === 'COMPLETE' && (
                <div style={{ padding: 16, background: 'var(--bg-mob-card)', border: '0.5px solid var(--bdr2-mob)', marginBottom: 16 }}>
                  <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-mob-muted)', marginBottom: 12 }}>Payment</div>
                  {localWO.paid_outside_site
                    ? <div style={{ fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(0.9375rem,4vw,1.0625rem)', color: '#4ec994' }}>✓ Marked as paid outside site</div>
                    : localWO.stripe_payment_link
                      ? <div>
                          <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 10, color: 'var(--text-mob-muted)', marginBottom: 6 }}>Stripe payment link:</div>
                          <a href={localWO.stripe_payment_link} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)', fontSize: 'clamp(12px,3.2vw,13px)', wordBreak: 'break-all' }}>{localWO.stripe_payment_link}</a>
                        </div>
                      : <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                          <input placeholder="Paste Stripe payment link..." style={{ ...inputStyle, marginBottom: 0 }} onBlur={e => { if (e.target.value.trim()) onSavePaymentLink(localWO, e.target.value); }} />
                          <button onClick={() => onMarkPaidOutside(localWO)} className="wo-edit-btn" style={{ width: '100%', padding: '9px 0', textAlign: 'center' }}>Paid Outside Site</button>
                        </div>
                  }
                </div>
              )}

              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
                {localWO.status === 'ACCEPTED' && (
                  <button onClick={() => onConfirm(localWO)} className="order-accept" style={{ flex: 1, background: 'rgba(106,176,245,0.12)', borderColor: '#6ab0f5', color: '#6ab0f5' }}>Confirm Order</button>
                )}
                {localWO.status === 'CONFIRMED' && (
                  <button onClick={() => onComplete(localWO)} className="order-accept" style={{ flex: 1, background: 'rgba(78,201,148,0.12)', borderColor: '#4ec994', color: '#4ec994' }}>Mark Complete</button>
                )}
                {(localWO.status === 'CREATED' || localWO.status === 'ACCEPTED' || localWO.status === 'CONFIRMED') && (
                  <button onClick={() => onCancel(localWO)} className="order-accept" style={{ flex: 1, background: 'rgba(248,113,113,0.12)', borderColor: '#f87171', color: '#f87171' }}>Cancel Order</button>
                )}
              </div>

              {localWO.edit_history && localWO.edit_history.length > 0 && (
                <div className="wo-log" style={{ marginTop: 24, borderTop: '0.5px solid var(--bdr2-mob)', paddingTop: 16 }}>
                  <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 'clamp(0.75rem,3.2vw,0.875rem)', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-mob-muted)', marginBottom: 10 }}>Activity Log</div>
                  {[...localWO.edit_history].reverse().map((entry: any, i: number) => (
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
