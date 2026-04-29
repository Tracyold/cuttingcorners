// comp/admin/mobile/panels/users/AdminUserMobileAccount.tsx
// Thin shell. Manages which panel is open. Mounts all panels.
// Each panel owns its hook, its data, and its drawer.

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
    <div className="mobile-shell">

      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 'clamp(10px,3vw,14px) clamp(1rem,4.5vw,1.25rem)', borderBottom: '0.5px solid var(--bdr2-mob)', background: 'var(--bg-mob)', flexShrink: 0, position: 'sticky', top: 0, zIndex: 10 }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: 'var(--text-mob-muted)', fontFamily: 'var(--font-mono-mob)', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer', padding: 0 }}>
          ← Users
        </button>
      </div>

      {/* Tab bar */}
      <div style={{ display: 'flex', overflowX: 'auto', flexShrink: 0, borderBottom: '0.5px solid var(--bdr2-mob)', background: 'var(--bg-mob)', WebkitOverflowScrolling: 'touch' as any }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => openPanel(t.id)} style={{ flex: '0 0 auto', padding: 'clamp(10px,2.5vw,13px) clamp(12px,3.5vw,16px)', fontFamily: 'var(--font-mono-mob)', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', background: 'none', border: 'none', borderBottom: activePanel === t.id ? '1.5px solid var(--gold)' : '1.5px solid transparent', color: activePanel === t.id ? 'var(--gold)' : 'var(--text-mob-muted)', cursor: 'pointer', whiteSpace: 'nowrap' }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Panels — each self-contained with its own hook and drawer */}
      <AdminUserDashboardPanel       open={activePanel === 'dashboard'}  id={id} session={session} onClose={closePanel} />
      <AdminUserInquiriesPanel       open={activePanel === 'inquiries'}  id={id} session={session} onClose={closePanel} />
      <AdminUserServiceRequestsPanel open={activePanel === 'servicereq'} id={id} session={session} onClose={closePanel} />
      <AdminUserWorkOrdersPanel      open={activePanel === 'workorders'} id={id} session={session} onClose={closePanel} />
      <AdminUserInvoicesPanel        open={activePanel === 'invoices'}   id={id} session={session} onClose={closePanel} />
      <AdminUserChatPanel            open={activePanel === 'chat'}       id={id} session={session} onClose={closePanel} />

    </div>
  );
}
