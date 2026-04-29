// frontend/components/admin/panels/AdminUsersPanel.tsx
//
// Users panel — consumes useAdminUsers hook.
// Tapping a user navigates to /admin/users/[id] (existing detail page).

import { useState } from 'react';
import { useSwipeDownToClose } from '../../../account/shared/hooks/useSwipeDownToClose';
import { useAdminUsers } from '../../hooks/useAdminUsers';
import { fmtDate, fmtTime } from '../../../../lib/utils';
import AdminUserMobileAccount from './users/AdminUsersAccountShell';

interface Props {
  open:    boolean;
  session: any;
  onClose: () => void;
}

export default function AdminUsersPanel({ open, session, onClose }: Props) {
  const u = useAdminUsers();
  const { elementRef, touchHandlers } = useSwipeDownToClose({ onClose });
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  if (selectedUserId) {
    return (
      <AdminUserMobileAccount
        id={selectedUserId}
        session={session}
        onBack={() => setSelectedUserId(null)}
      />
    );
  }

  return (
    <div ref={elementRef} className={`slide-panel${open ? ' open' : ''}`}>

      {/* Header */}
      <div className="panel-header" {...touchHandlers}>
        <span className="panel-title">Users</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 11, color: 'var(--text-mob-muted)' }}>
            {u.users.length} active · {u.archivedUsers.length} archived
          </span>
          <button className="panel-close" onClick={onClose}>✕</button>
        </div>
      </div>

      {/* Active / Archived tabs */}
      <div className="sr-tab-bar">
        <button
          className={`sr-tab${u.activeTab === 'active' ? ' active' : ''}`}
          onClick={() => u.setActiveTab('active')}
        >
          Active · {u.users.length}
        </button>
        <button
          className={`sr-tab${u.activeTab === 'archived' ? ' active' : ''}`}
          onClick={() => u.setActiveTab('archived')}
        >
          Archived · {u.archivedUsers.length}
        </button>
      </div>

      {/* Restore message */}
      {u.restoreMsg && (
        <div style={{
          padding: '10px clamp(1rem,4.5vw,1.25rem)',
          background: 'rgba(100,200,120,0.08)',
          borderBottom: '0.5px solid rgba(100,200,120,0.2)',
          fontFamily: 'var(--font-ui-mob)', fontSize: 13,
          color: 'rgba(100,200,120,0.9)',
        }}>
          {u.restoreMsg}
        </div>
      )}

      {/* Search */}
      <div style={{ padding: '10px clamp(1rem,4.5vw,1.25rem)', borderBottom: '0.5px solid var(--bdr2-mob)' }}>
        <input
          value={u.search}
          onChange={e => u.setSearch(e.target.value)}
          placeholder="Search by name, email, or phone..."
          style={{
            width: '100%', background: 'var(--bg-mob-card)',
            border: '0.5px solid var(--bdr2-mob)', borderRadius: 8,
            padding: '10px 14px', color: 'var(--text-mob)',
            fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(0.875rem,3.8vw,1rem)',
            outline: 'none',
          }}
          onFocus={e => { e.target.style.borderColor = 'var(--gold)'; }}
          onBlur={e => { e.target.style.borderColor = 'var(--bdr2-mob)'; }}
        />
      </div>

      {/* List */}
      <div className="sr-list">

        {/* Guest account */}
        {u.activeTab === 'active' && u.guestUser && (
          <div
            onClick={() => setSelectedUserId(u.guestUser.account_user_id)}
            style={{
              padding: 'clamp(12px,3.5vw,16px) clamp(1rem,4.5vw,1.25rem)',
              borderBottom: '0.5px solid var(--bdr2-mob)',
              borderLeft: '2px solid rgba(var(--gold-rgb),0.3)',
              cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}
          >
            <div>
              <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-mob-muted)', marginBottom: 4 }}>
                Guest Account
              </div>
              <div style={{ fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(0.9375rem,4vw,1.0625rem)', color: 'var(--text-mob)', fontWeight: 600 }}>
                {u.guestUser.name || 'Guest User'}
              </div>
              <div style={{ fontFamily: 'var(--font-ui-mob)', fontSize: 11, color: 'var(--text-mob-muted)', fontStyle: 'italic', marginTop: 2, opacity: 0.7 }}>
                Receives all non-logged-in inquiries
              </div>
            </div>
            {u.guestUnread > 0 && (
              <div style={{
                background: 'var(--gold)', color: 'var(--bg-mob-deep)',
                fontSize: 11, fontWeight: 700, width: 20, height: 20,
                borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                {u.guestUnread > 9 ? '9+' : u.guestUnread}
              </div>
            )}
          </div>
        )}

        {/* User list */}
        {u.loading ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 0' }}>
            <span style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 11, color: 'var(--text-mob-muted)', letterSpacing: '0.18em', textTransform: 'uppercase' }}>Loading...</span>
          </div>
        ) : u.sorted.length === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 0', opacity: 0.5 }}>
            <div style={{ fontSize: '1.75rem', marginBottom: 10 }}>○</div>
            <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-mob-muted)' }}>
              {u.search ? `No results for '${u.search}'` : 'No accounts yet'}
            </div>
          </div>
        ) : u.activeTab === 'active' ? (
          u.sorted.map(user => {
            const uCount = u.unreadCounts[user.account_user_id] || 0;
            return (
              <div
                key={user.account_user_id}
                onClick={() => setSelectedUserId(user.account_user_id)}
                style={{
                  padding: 'clamp(12px,3.5vw,16px) clamp(1rem,4.5vw,1.25rem)',
                  borderBottom: '0.5px solid var(--bdr2-mob)',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12,
                }}
              >
                {/* Avatar */}
                <div style={{
                  width: 38, height: 38, borderRadius: '50%',
                  background: 'var(--bg-mob-card)', border: '0.5px solid var(--bdr2-mob)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-ui-mob)', fontSize: 15, fontWeight: 600,
                  color: 'var(--gold)', flexShrink: 0,
                }}>
                  {(user.name || '?')[0].toUpperCase()}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(0.9375rem,4vw,1.0625rem)', fontWeight: 600, color: 'var(--text-mob)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {user.name || '—'}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 11, color: 'var(--text-mob-muted)', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {user.email || '—'}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, flexShrink: 0 }}>
                  {uCount > 0 && (
                    <div style={{
                      background: 'var(--gold)', color: 'var(--bg-mob-deep)',
                      fontSize: 11, fontWeight: 700, width: 20, height: 20,
                      borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {uCount > 9 ? '9+' : uCount}
                    </div>
                  )}
                  <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 10, color: 'var(--text-mob-muted)' }}>
                    {fmtDate(user.created_at)}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          // Archived users
          u.sorted.map(user => (
            <div
              key={user.account_user_id}
              style={{
                padding: 'clamp(12px,3.5vw,16px) clamp(1rem,4.5vw,1.25rem)',
                borderBottom: '0.5px solid var(--bdr2-mob)',
                display: 'flex', alignItems: 'center', gap: 12, opacity: 0.6,
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(0.9375rem,4vw,1.0625rem)', fontWeight: 600, color: 'var(--text-mob)' }}>
                  {user.name || '—'}
                </div>
                <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 11, color: 'var(--text-mob-muted)', marginTop: 2 }}>
                  {user.email || '—'} · Deleted {fmtDate(user.deleted_at)}
                </div>
                {user.deleted_reason && (
                  <div style={{ fontFamily: 'var(--font-ui-mob)', fontSize: 11, color: 'var(--text-mob-muted)', marginTop: 2, fontStyle: 'italic' }}>
                    {user.deleted_reason}
                  </div>
                )}
              </div>
              <button
                disabled={u.restoring === user.account_user_id}
                onClick={e => { e.stopPropagation(); u.restoreAccount(user.account_user_id); }}
                className="wiz-btn-pill wiz-btn-pill-outline"
                style={{ padding: '6px 14px', fontSize: 10, color: 'rgba(100,200,120,0.9)', borderColor: 'rgba(100,200,120,0.3)', flexShrink: 0 }}
              >
                {u.restoring === user.account_user_id ? 'Restoring...' : 'Restore'}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}