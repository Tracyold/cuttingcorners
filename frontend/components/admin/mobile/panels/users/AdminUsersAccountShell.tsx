// comp/admin/mobile/panels/users/AdminUserMobileAccount.tsx
// Renders as slide-panel open — covers the admin shell.
// Feed of tiles (same pattern as MobileAccount.tsx) with unread notifications.
// Each tile opens its panel. Panels own their hooks and drawers.

import { useState } from 'react';
import { useAdminUserDetail } from './hooks/useAdminUserDetail';

// Tiles
import AdminUserMessagesTile       from './tiles/AdminUserMessageTile';
import AdminUserWorkOrdersTile     from './tiles/AdminUserWorkOrderTile';
import AdminUserInvoicesTile       from './tiles/AdminUserInvoiceTile';
import AdminUserInquiriesTile      from './tiles/AdminUserInquiryTile';
import AdminUserServiceRequestsTile from './tiles/AdminUserServiceRequestTile';

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

  // Detail hook called once here for tile data — panels call their own hooks internally
  const {
    user, workOrders, invoices, invTotal,
    inquiries, guestInquiries,
    serviceRequests, chatThread, messages,
  } = useAdminUserDetail(id, session);

  const isGuest = id === process.env.NEXT_PUBLIC_GUEST_ACCOUNT_USER_ID;

  // Greeting
  const hour      = new Date().getHours();
  const greeting  = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  const dateLabel = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    // slide-panel open — position: fixed, z-index: 10001, covers admin shell
    <div className="slide-panel open" style={{ display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>

      {/* Top bar */}
      <div className="nav" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button
          onClick={onBack}
          style={{ background: 'none', border: 'none', color: 'var(--text-mob-muted)', fontFamily: 'var(--font-mono-mob)', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer', padding: 0 }}
        >
          ← Users
        </button>
        <button
          onClick={() => openPanel('dashboard')}
          style={{ background: 'none', border: '0.5px solid var(--bdr2-mob)', color: 'var(--text-mob-muted)', fontFamily: 'var(--font-mono-mob)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '6px 12px', cursor: 'pointer', borderRadius: 6 }}
        >
          Account Info
        </button>
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

        {/* Tile grid */}
        <div className="feed-block">

          {/* Messages tile — full width */}
          <AdminUserMessagesTile
            chatThread={chatThread}
            messages={messages}
            onClick={() => openPanel('chat')}
          />

          {/* Work Orders + Invoices — two column */}
          <div className="tile-row">
            <AdminUserWorkOrdersTile
              workOrders={workOrders}
              onClick={() => openPanel('workorders')}
            />
            <AdminUserInvoicesTile
              invoices={invoices}
              invTotal={invTotal}
              onClick={() => openPanel('invoices')}
            />
          </div>

          {/* Inquiries + Service Requests — two column */}
          <div className="tile-row">
            <AdminUserInquiriesTile
              inquiries={inquiries}
              guestInquiries={guestInquiries}
              isGuest={isGuest}
              onClick={() => openPanel('inquiries')}
            />
            <AdminUserServiceRequestsTile
              serviceRequests={serviceRequests}
              onClick={() => openPanel('servicereq')}
            />
          </div>

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