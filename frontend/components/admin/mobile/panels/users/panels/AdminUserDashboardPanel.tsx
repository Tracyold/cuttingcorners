// comp/admin/mobile/panels/users/panels/AdminUserDashboardPanel.tsx
// Imports useAdminUserDashboard only — hook owns all dashboard data + showEditUser.
// Mounts EditUserModal internally.

import { formatMoney, fmtDate } from '../../../../../../lib/utils';
import { useSwipeDownToClose } from '../../../../../account/shared/hooks/useSwipeDownToClose';
import { useAdminUserDashboard } from '../hooks/useAdminUserDashboard';
import EditUserModal from '../../../../users/EditUserModal';

interface Props {
  open:    boolean;
  id:      string;
  session: any;
  onClose: () => void;
}

export default function AdminUserDashboardPanel({ open, id, session, onClose }: Props) {
  const { elementRef, touchHandlers } = useSwipeDownToClose({ onClose });
  const { user, setUser, woCount, invTotal, inqCount, srCount, showEditUser, setShowEditUser } = useAdminUserDashboard(id, session);

  const fields = [
    { label: 'Name',         val: user?.name             || '—' },
    { label: 'Email',        val: user?.email            || '—' },
    { label: 'Phone',        val: user?.phone            || '—' },
    { label: 'Address',      val: user?.shipping_address || '—' },
    { label: 'Business',     val: user?.business_name    || '—' },
    { label: 'Member Since', val: user?.created_at ? fmtDate(user.created_at) : '—' },
  ];

  return (
    <>
      <div ref={elementRef} className={`slide-panel${open ? ' open' : ''}`}>
        <div className="panel-header" {...touchHandlers}>
          <span className="panel-title">Account Info</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button onClick={() => setShowEditUser(true)} className="wo-edit-btn">Edit</button>
            <button className="panel-close" onClick={onClose}>✕</button>
          </div>
        </div>

        <div className="profile-body">
          {user && (
            <div style={{ marginBottom: 20 }}>
              <span className={`pill ${user.status === 'ACTIVE' ? 'on' : 'off'}`} style={{ borderRadius: 999, padding: '4px 12px' }}>
                {user.status || 'UNKNOWN'}
              </span>
            </div>
          )}

          {fields.map(f => (
            <div key={f.label} className="profile-field">
              <label className="profile-label">{f.label}</label>
              <div className="profile-input" style={{ color: f.label === 'Phone' ? '#6ab0f5' : 'var(--text-mob)' }}>
                {f.val}
              </div>
            </div>
          ))}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 24 }}>
            {[
              { label: 'Work Orders',    val: woCount              },
              { label: 'Total Invoiced', val: formatMoney(invTotal) },
              { label: 'Inquiries',      val: inqCount             },
              { label: 'Srvc Requests',  val: srCount              },
            ].map(s => (
              <div key={s.label} style={{ background: 'var(--bg-mob-card)', border: '0.5px solid var(--bdr2-mob)', borderRadius: 8, padding: '14px 12px' }}>
                <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 'clamp(1.125rem,5vw,1.375rem)', color: 'var(--gold)', marginBottom: 4 }}>{s.val}</div>
                <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-mob-muted)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <EditUserModal
        showEditUser={showEditUser}
        setShowEditUser={setShowEditUser}
        user={user}
        id={id}
        setUser={setUser}
      />
    </>
  );
}