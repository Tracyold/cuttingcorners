// comp/admin/mobile/panels/users/AdminUserMobileAccount.tsx
// Renders as a slide-panel (position: fixed, z-index: 10001) so it fully
// covers the admin shell when a user is selected from AdminUsersPanel.
// Each child panel is also a slide-panel that layers on top of this one.
// Drawers (wo-drawer, overlay) sit at z-index 10101 — above everything.

import { useState } from 'react';
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

  const TABS: { id: PanelName; label: string }[] = [
    { id: 'dashboard',  label: 'Account'     },
    { id: 'inquiries',  label: 'Inquiries'   },
    { id: 'servicereq', label: 'Service Req' },
    { id: 'workorders', label: 'Work Orders' },
    { id: 'invoices',   label: 'Invoices'    },
    { id: 'chat',       label: 'Chat'        },
  ];

  return (
    // Renders as slide-panel open — covers the admin shell completely
    <div className="slide-panel open" style={{ display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>

      {/* Top bar — back button */}
      <div className="panel-header" style={{ flexShrink: 0 }}>
        <button
          onClick={onBack}
          className="panel-close"
          style={{ fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'var(--font-mono-mob)' }}
        >
          ← Users
        </button>
      </div>

      {/* Tab bar */}
      <div className="sr-tab-bar" style={{ overflowX: 'auto', flexWrap: 'nowrap', WebkitOverflowScrolling: 'touch' as any }}>
        {TABS.map(t => (
          <button
            key={t.id}
            className={`sr-tab${activePanel === t.id ? ' active' : ''}`}
            onClick={() => openPanel(t.id)}
            style={{ whiteSpace: 'nowrap', flex: '0 0 auto' }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Panels — each is also a slide-panel, layers above this one */}
      <AdminUserDashboardPanel       open={activePanel === 'dashboard'}  id={id} session={session} onClose={closePanel} />
      <AdminUserInquiriesPanel       open={activePanel === 'inquiries'}  id={id} session={session} onClose={closePanel} />
      <AdminUserServiceRequestsPanel open={activePanel === 'servicereq'} id={id} session={session} onClose={closePanel} />
      <AdminUserWorkOrdersPanel      open={activePanel === 'workorders'} id={id} session={session} onClose={closePanel} />
      <AdminUserInvoicesPanel        open={activePanel === 'invoices'}   id={id} session={session} onClose={closePanel} />
      <AdminUserChatPanel            open={activePanel === 'chat'}       id={id} session={session} onClose={closePanel} />

    </div>
  );
}