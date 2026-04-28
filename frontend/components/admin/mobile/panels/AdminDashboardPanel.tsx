import { useSwipeDownToClose } from '../../../account/shared/hooks/useSwipeDownToClose';
// frontend/components/admin/panels/AdminDashboardPanel.tsx
//
// Dashboard panel — consumes useAdminDashboard hook, pure UI.
// Mirrors the account panel pattern: slide-up from bottom, same CSS vars.

import { useAdminDashboard } from '../../hooks/useAdminDashboard';
import { formatMoney } from '../../../../lib/utils';

const ICON_MAP: Record<string, string> = {
  account_inquiries: '✉',
  guest_inquiries:   '✉',
  service_requests:  '◈',
  chat_messages:     '◻',
  work_orders:       '◇',
};

const FIELDS = [
  { key: 'business_name',  label: 'Business Name' },
  { key: 'full_name',      label: 'Full Name' },
  { key: 'address',        label: 'Address' },
  { key: 'phone',          label: 'Phone' },
  { key: 'contact_email',  label: 'Contact Email' },
];

const SMS_TOGGLES = [
  { key: 'notify_purchase',        label: 'Shop Purchase' },
  { key: 'notify_chat',            label: 'New Chat Message' },
  { key: 'notify_inquiry',         label: 'New Inquiry' },
  { key: 'notify_work_order',      label: 'Work Order Update' },
  { key: 'notify_service_request', label: 'Service Request' },
];

interface Props {
  open:    boolean;
  onClose: () => void;
}

export default function AdminDashboardPanel({ open, onClose }: Props) {
  const d = useAdminDashboard();
  const { elementRef, touchHandlers } = useSwipeDownToClose({ onClose });

  return (
    <div ref={elementRef} className={`slide-panel${open ? ' open' : ''}`}>

      {/* Header */}
      <div className="panel-header" {...touchHandlers}>
        <span className="panel-title">Dashboard</span>
        <button className="panel-close" onClick={onClose}>✕</button>
      </div>

      <div className="sr-list" style={{ flex: 1, overflowY: 'auto', padding: 'clamp(1rem,4.5vw,1.5rem)' }}>

        {/* ── Stats ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>
          {[
            { val: d.itemsSold,             label: 'Items Sold' },
            { val: formatMoney(d.shopRevenue), label: 'Shop Revenue' },
            { val: d.woCompleted,           label: 'WOs Completed' },
            { val: formatMoney(d.woRevenue),   label: 'WO Revenue' },
          ].map(s => (
            <div key={s.label} style={{
              background: 'var(--bg-mob-card)', border: '0.5px solid var(--bdr2-mob)',
              borderRadius: 10, padding: 'clamp(12px,3.5vw,16px)',
            }}>
              <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 'clamp(1.25rem,5vw,1.75rem)', color: 'var(--gold)', letterSpacing: '0.03em' }}>
                {s.val}
              </div>
              <div style={{ fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(0.625rem,2.5vw,0.75rem)', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-mob-muted)', marginTop: 4 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* ── Notifications ── */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontFamily: 'var(--font-display-mob)', fontSize: 'clamp(1rem,4vw,1.25rem)', color: 'var(--text-mob)' }}>
                Notifications
              </span>
              {d.notifications.length > 0 && (
                <span style={{ background: 'var(--gold)', color: 'var(--bg-mob-deep)', fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 8 }}>
                  {d.notifications.length}
                </span>
              )}
            </div>
            {d.notifications.length > 0 && (
              <button onClick={d.markAllRead} style={{ background: 'none', border: 'none', color: 'var(--text-mob-muted)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'var(--font-mono-mob)' }}>
                Mark all read
              </button>
            )}
          </div>

          {d.notifications.length === 0 ? (
            <div style={{ padding: '32px 0', textAlign: 'center', fontFamily: 'var(--font-mono-mob)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-mob-muted)', opacity: 0.5 }}>
              No new notifications
            </div>
          ) : (
            d.notifications.slice(0, 20).map(n => (
              <div
                key={n.id}
                onClick={() => d.markOneRead(n.id, n.user_id, n.type)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '12px 0', borderBottom: '0.5px solid var(--bdr2-mob)',
                  cursor: 'pointer',
                }}
              >
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)', flexShrink: 0 }} />
                <div style={{ fontSize: '1rem', opacity: 0.5, flexShrink: 0, width: 20, textAlign: 'center' }}>
                  {ICON_MAP[n.type] || '○'}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(0.8125rem,3.5vw,0.9375rem)', color: 'var(--text-mob)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {n.message}
                  </div>
                  <div style={{ fontFamily: 'var(--font-ui-mob)', fontSize: 11, color: 'var(--text-mob-muted)', marginTop: 2 }}>
                    {n.account_users?.name || (n.type === 'guest_inquiries' ? 'Guest' : '—')}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* ── Business Info ── */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontFamily: 'var(--font-display-mob)', fontSize: 'clamp(1rem,4vw,1.25rem)', color: 'var(--text-mob)', marginBottom: 4 }}>
            Business Info
          </div>
          <div style={{ fontFamily: 'var(--font-ui-mob)', fontSize: 11, color: 'var(--text-mob-muted)', marginBottom: 16, letterSpacing: '0.05em' }}>
            Appears on work order and invoice PDFs
          </div>

          {d.adminInfo && FIELDS.map(f => (
            <div key={f.key} style={{ marginBottom: 16 }}>
              <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 10, fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-mob-muted)', marginBottom: 6 }}>
                {f.label}
              </div>
              {d.editing[f.key] ? (
                <input
                  value={d.editValues[f.key] || ''}
                  onChange={e => d.setEditValues({ ...d.editValues, [f.key]: e.target.value })}
                  autoFocus
                  style={{ background: 'var(--bg-mob-card)', border: '1px solid var(--gold)', color: 'var(--text-mob)', padding: '10px 12px', fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(0.875rem,3.8vw,1rem)', width: '100%', outline: 'none', borderRadius: 6 }}
                />
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(0.875rem,3.8vw,1rem)', color: 'var(--text-mob)' }}>
                    {d.adminInfo[f.key] || '—'}
                  </span>
                  <button onClick={() => d.startEdit(f.key)} style={{ background: 'none', border: 'none', color: 'var(--text-mob-muted)', cursor: 'pointer', fontSize: 13 }} title="Edit">
                    ✎
                  </button>
                </div>
              )}
            </div>
          ))}

          {/* Login email read-only */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 10, fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-mob-muted)', marginBottom: 6 }}>
              Login Email
            </div>
            <span style={{ fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(0.875rem,3.8vw,1rem)', color: 'var(--text-mob-muted)' }}>
              {d.adminInfo?.email || '—'}
            </span>
            <span style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 9, color: 'var(--text-mob-muted)', marginLeft: 8, opacity: 0.6 }}>
              (read-only)
            </span>
          </div>

          {d.hasDirty && (
            <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
              <button
                onClick={d.saveAll}
                disabled={d.saving}
                className="wiz-btn-pill wiz-btn-pill-gold"
                style={{ flex: 1 }}
              >
                {d.saving ? 'Saving...' : 'Save'}
              </button>
              <button
                onClick={() => d.cancelEdit(Object.keys(d.editing).find(k => d.editing[k]) || '')}
                className="wiz-btn-pill wiz-btn-pill-outline"
                style={{ flex: 1 }}
              >
                Cancel
              </button>
            </div>
          )}
          {d.flash && (
            <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 10, color: 'var(--gold)', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: 8 }}>
              ✓ Saved
            </div>
          )}
        </div>

        {/* ── SMS Config ── */}
        {d.smsConfig && (
          <div style={{ marginBottom: 28 }}>
            <div style={{ fontFamily: 'var(--font-display-mob)', fontSize: 'clamp(1rem,4vw,1.25rem)', color: 'var(--text-mob)', marginBottom: 4 }}>
              SMS Notifications
            </div>
            <div style={{ fontFamily: 'var(--font-ui-mob)', fontSize: 11, color: 'var(--text-mob-muted)', marginBottom: 16 }}>
              Receive text alerts when events occur
            </div>

            {/* Phones */}
            <div style={{ marginBottom: 16 }}>
              {d.adminPhones.map(p => (
                <div key={p.id} style={{
                  display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8,
                  padding: '10px 14px', background: 'var(--bg-mob-card)',
                  border: '0.5px solid var(--bdr2-mob)', borderRadius: 8,
                }}>
                  {/* Toggle */}
                  <div
                    onClick={() => d.togglePhone(p.id, !p.active)}
                    style={{
                      width: 36, height: 20, borderRadius: 10, position: 'relative', flexShrink: 0, cursor: 'pointer',
                      background: p.active ? 'var(--gold)' : 'var(--bdr2-mob)', transition: 'background 300ms',
                    }}
                  >
                    <div style={{ position: 'absolute', top: 3, left: p.active ? 18 : 3, width: 14, height: 14, borderRadius: '50%', background: '#fff', transition: 'left 300ms' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 13, color: 'var(--text-mob)', display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span>{p.revealed ? p.phone : p.phone.slice(0, 3) + '•••••' + p.phone.slice(-4)}</span>
                      <button
                        onClick={() => d.togglePhone(p.id, p.active)}
                        style={{ background: 'none', border: 'none', color: 'var(--text-mob-muted)', cursor: 'pointer', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-mono-mob)' }}
                      >
                        {p.revealed ? 'hide' : 'show'}
                      </button>
                    </div>
                    {p.label && <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 10, color: 'var(--text-mob-muted)', letterSpacing: '0.1em' }}>{p.label}</div>}
                  </div>
                  <button onClick={() => d.deletePhone(p.id)} style={{ background: 'none', border: 'none', color: 'rgba(248,113,113,0.6)', cursor: 'pointer', fontSize: 14, padding: '2px 6px' }}>✕</button>
                </div>
              ))}

              {/* Add phone */}
              <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
                <input
                  value={d.newPhone}
                  onChange={e => d.setNewPhone(e.target.value)}
                  placeholder="+1 480 000 0000"
                  style={{ background: 'var(--bg-mob-card)', border: '0.5px solid var(--bdr2-mob)', color: 'var(--text-mob)', padding: '8px 12px', fontFamily: 'var(--font-mono-mob)', fontSize: 13, borderRadius: 6, flex: '1 1 120px', outline: 'none' }}
                />
                <input
                  value={d.newLabel}
                  onChange={e => d.setNewLabel(e.target.value)}
                  placeholder="Label (optional)"
                  style={{ background: 'var(--bg-mob-card)', border: '0.5px solid var(--bdr2-mob)', color: 'var(--text-mob)', padding: '8px 12px', fontFamily: 'var(--font-ui-mob)', fontSize: 13, borderRadius: 6, flex: '1 1 100px', outline: 'none' }}
                />
                <button onClick={d.addPhone} className="wiz-btn-pill wiz-btn-pill-gold" style={{ padding: '8px 18px', fontSize: 11 }}>
                  {d.phoneAdding ? '...' : '+ Add'}
                </button>
              </div>
            </div>

            {/* SMS toggles */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {SMS_TOGGLES.map(({ key, label }) => (
                <div
                  key={key}
                  onClick={() => d.saveSmsToggle(key, !d.smsConfig[key])}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '12px 14px', background: 'var(--bg-mob-card)',
                    border: '0.5px solid var(--bdr2-mob)', borderRadius: 8, cursor: 'pointer',
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(0.8125rem,3.5vw,0.9375rem)', color: 'var(--text-mob)' }}>
                    {label}
                  </span>
                  <div style={{
                    width: 36, height: 20, borderRadius: 10, position: 'relative',
                    background: d.smsConfig[key] ? 'var(--gold)' : 'var(--bdr2-mob)',
                    transition: 'background 300ms ease', flexShrink: 0,
                  }}>
                    <div style={{
                      position: 'absolute', top: 3,
                      left: d.smsConfig[key] ? 18 : 3,
                      width: 14, height: 14, borderRadius: '50%',
                      background: '#fff', transition: 'left 300ms ease',
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
