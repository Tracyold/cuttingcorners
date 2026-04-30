// comp/admin/mobile/panels/users/AdminUsersAccountShell.tsx
// Renders as slide-panel open — covers the admin shell.
// Wide tiles matching main admin home screen style.

import { useState } from 'react';
import { useAdminUserDetail } from './hooks/useAdminUserDetail';

// Panels
import AdminUserDashboardPanel       from './panels/AdminUserDashboardPanel';
import AdminUserInquiriesPanel       from './panels/AdminUserInquiriesPanel';
import AdminUserServiceRequestsPanel from './panels/AdminUserServiceRequestPanel';
import AdminUserWorkOrdersPanel      from './panels/AdminUserWorkOrderPanel';
import AdminUserInvoicesPanel        from './panels/AdminUserInvoicePanel';
import AdminUserChatPanel            from './panels/AdminUserChatPanel';

type PanelName = 'dashboard' | 'inquiries' | 'servicereq' | 'workorders' | 'invoices' | 'chat' | null;

interface Props {
  id:      string;
  session: any;
  onBack:  () => void;
}

export default function AdminUserMobileAccount({ id, session, onBack }: Props) {
  const [activePanel, setActivePanel] = useState<PanelName>(null);
  const openPanel  = (name: PanelName) => setActivePanel(name);
  const closePanel = ()                => setActivePanel(null);

  const {
    user, workOrders, invoices, invTotal,
    inquiries, guestInquiries,
    serviceRequests, chatThread, messages,
  } = useAdminUserDetail(id, session);

  const isGuest = id === process.env.NEXT_PUBLIC_GUEST_ACCOUNT_USER_ID;
  const dateLabel = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  const unreadInq = inquiries.filter(i => !i.is_read).length + (guestInquiries?.filter((i: any) => !i.is_read).length ?? 0);
  const unreadSR  = serviceRequests.filter(s => !s.is_read).length;
  const unreadWO  = workOrders.filter(w => w.status === 'CREATED').length;
  const unreadMsg = messages.filter((m: any) => !m.is_read && m.sender_role !== 'admin').length;

  const TILES = [
    {
      id:    'chat' as PanelName,
      icon:  '◻',
      label: 'Messages',
      sub:   unreadMsg > 0 ? `${unreadMsg} unread` : 'Chat thread',
      color: '#38bdf8',
    },
    {
      id:    'workorders' as PanelName,
      icon:  '◇',
      label: 'Work Orders',
      sub:   unreadWO > 0 ? `${unreadWO} new · ${workOrders.length} total` : `${workOrders.length} total`,
      color: 'var(--gold)',
    },
    {
      id:    'invoices' as PanelName,
      icon:  '◈',
      label: 'Invoices',
      sub:   `${invoices.length} paid`,
      color: '#4ec994',
    },
    {
      id:    'inquiries' as PanelName,
      icon:  '✉',
      label: 'Inquiries',
      sub:   unreadInq > 0 ? `${unreadInq} unread · ${inquiries.length} total` : `${inquiries.length} total`,
      color: '#a3e635',
    },
    {
      id:    'servicereq' as PanelName,
      icon:  '⬡',
      label: 'Service Requests',
      sub:   unreadSR > 0 ? `${unreadSR} new · ${serviceRequests.length} total` : `${serviceRequests.length} total`,
      color: '#c084fc',
    },
  ];

  return (
    <div className="slide-panel open" style={{ display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>

      {/* Top bar — CCG Admin label only, no nav links */}
      <div className="nav" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontFamily: 'var(--font-display-mob)', fontSize: 'clamp(0.9375rem,4vw,1.125rem)', color: 'var(--gold)', letterSpacing: '0.07em' }}>
          CCG · Admin
        </div>
      </div>

      {/* Feed */}
      <div className="feed">

        {/* Welcome block */}
        <div className="welcome">
          <div className="welcome-name">{isGuest ? 'Guest Account' : user?.name || '—'}</div>
          <div className="welcome-meta">{dateLabel}</div>
          {user?.email && (
            <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 'clamp(0.5625rem,2.2vw,0.625rem)', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-mob-muted)', marginTop: 6, opacity: 0.6 }}>
              {user.email}{user.phone ? ` · ${user.phone}` : ''}
            </div>
          )}
        </div>

        {/* Tile grid — wide tiles matching main admin home */}
        <div className="feed-block">

          {/* ← Users + Account Info as first two pills */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
            <button
              onClick={onBack}
              className="admin-tile"
              style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: '10px 16px', gap: 6 }}
            >
              <span style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-mob-muted)' }}>← Users</span>
            </button>
            <button
              onClick={() => openPanel('dashboard')}
              className="admin-tile"
              style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: '10px 16px', gap: 6 }}
            >
              <span style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)' }}>Account Info</span>
            </button>
          </div>

          {/* Section tiles */}
          {TILES.map(tile => (
            <button
              key={tile.id}
              className="admin-tile"
              onClick={() => openPanel(tile.id)}
            >
              <div className="admin-tile-icon" style={{ color: tile.color }}>{tile.icon}</div>
              <div style={{ flex: 1 }}>
                <div className="admin-tile-label">{tile.label}</div>
                <div className="admin-tile-sub">{tile.sub}</div>
              </div>
              <div className="admin-tile-arrow" style={{ color: tile.color }}>→</div>
            </button>
          ))}

        </div>
      </div>

      {/* Panels */}
      <AdminUserDashboardPanel       open={activePanel === 'dashboard'}  id={id} session={session} onClose={closePanel} />
      <AdminUserInquiriesPanel       open={activePanel === 'inquiries'}  id={id} session={session} onClose={closePanel} onBack={onBack} onDashboard={() => openPanel('dashboard')} />
      <AdminUserServiceRequestsPanel open={activePanel === 'servicereq'} id={id} session={session} onClose={closePanel} onBack={onBack} onDashboard={() => openPanel('dashboard')} />
      <AdminUserWorkOrdersPanel      open={activePanel === 'workorders'} id={id} session={session} onClose={closePanel} onBack={onBack} onDashboard={() => openPanel('dashboard')} />
      <AdminUserInvoicesPanel        open={activePanel === 'invoices'}   id={id} session={session} onClose={closePanel} onBack={onBack} onDashboard={() => openPanel('dashboard')} />
      <AdminUserChatPanel            open={activePanel === 'chat'}       id={id} session={session} onClose={closePanel} />

    </div>
  );
}
