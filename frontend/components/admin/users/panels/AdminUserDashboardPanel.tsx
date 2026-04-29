// frontend/components/admin/users/mobile/panels/AdminUserDashboardPanel.tsx
//
// Mirrors: account/mobile/panels/3ProfilePanel.tsx (account info section)
// Admin extras: Edit button → opens EditUserModal, status pill, stat cards.

import { formatMoney, fmtDate } from '../../../../lib/utils';
import { useSwipeDownToClose } from '../../../account/shared/hooks/useSwipeDownToClose';

interface Props {
  open:       boolean;
  user:       any;
  woCount:    number;
  invTotal:   number;
  inqCount:   number;
  srCount:    number;
  onEditUser: () => void;
  onClose:    () => void;
}

export default function AdminUserDashboardPanel({
  open, user, woCount, invTotal, inqCount, srCount, onEditUser, onClose,
}: Props) {
  const { elementRef, touchHandlers } = useSwipeDownToClose({ onClose });

  const fields = [
    { label: 'Name',         val: user?.name             || '—' },
    { label: 'Email',        val: user?.email            || '—' },
    { label: 'Phone',        val: user?.phone            || '—' },
    { label: 'Address',      val: user?.shipping_address || '—' },
    { label: 'Business',     val: user?.business_name    || '—' },
    { label: 'Member Since', val: user?.created_at ? fmtDate(user.created_at) : '—' },
  ];

  const stats = [
    { label: 'Work Orders',   val: woCount               },
    { label: 'Total Invoiced',val: formatMoney(invTotal)  },
    { label: 'Inquiries',     val: inqCount              },
    { label: 'Srvc Requests', val: srCount               },
  ];

  return (
    <div ref={elementRef} className={`slide-panel${open ? ' open' : ''}`}>
      <div className="panel-header" {...touchHandlers}>
        <span className="panel-title">Account Info</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            onClick={onEditUser}
            style={{
              background: 'none', border: '0.5px solid var(--bdr2-mob)',
              color: 'var(--gold)', fontFamily: 'var(--font-mono-mob)',
              fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase',
              padding: '5px 12px', cursor: 'pointer', borderRadius: 4,
            }}
          >
            Edit
          </button>
          <button className="panel-close" onClick={onClose}>✕</button>
        </div>
      </div>

      <div className="profile-body">
        {user && (
          <div style={{ marginBottom: 20 }}>
            <span style={{
              fontFamily: 'var(--font-mono-mob)', fontSize: 10,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              padding: '4px 12px', borderRadius: 999,
              background: user.status === 'ACTIVE' ? 'rgba(78,201,148,0.12)' : 'rgba(248,113,113,0.12)',
              color:      user.status === 'ACTIVE' ? '#4ec994'               : '#f87171',
            }}>
              {user.status || 'UNKNOWN'}
            </span>
          </div>
        )}

        {fields.map(f => (
          <div key={f.label} className="profile-field">
            <div className="profile-label">{f.label}</div>
            <div style={{
              fontFamily: 'var(--font-ui-mob)',
              fontSize: 'clamp(0.9375rem,4vw,1.0625rem)',
              color: f.label === 'Phone' ? '#6ab0f5' : 'var(--text-mob)',
              padding: '10px 0',
              borderBottom: '0.5px solid var(--bdr2-mob)',
            }}>
              {f.val}
            </div>
          </div>
        ))}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 24 }}>
          {stats.map(s => (
            <div key={s.label} style={{
              background: 'var(--bg-mob-card)', border: '0.5px solid var(--bdr2-mob)',
              borderRadius: 8, padding: '14px 12px',
            }}>
              <div style={{
                fontFamily: 'var(--font-mono-mob)',
                fontSize: 'clamp(1.125rem,5vw,1.375rem)',
                color: 'var(--gold)', marginBottom: 4,
              }}>
                {s.val}
              </div>
              <div style={{
                fontFamily: 'var(--font-mono-mob)', fontSize: 10,
                letterSpacing: '0.15em', textTransform: 'uppercase',
                color: 'var(--text-mob-muted)',
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
