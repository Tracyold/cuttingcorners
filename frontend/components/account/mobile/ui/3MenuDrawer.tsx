// components/account/mobile/ui/3MenuDrawer.tsx

type PanelName = 'chat' | 'orders' | 'invoices' | 'servicereq'
  | 'inquiries' | 'wizard' | 'profile' | null;

interface MenuDrawerProps {
  open:       boolean;
  onClose:    () => void;
  onNavigate: (panel: PanelName) => void;
}

const ITEMS: { label: string; panel: PanelName }[] = [
  { label: 'Dashboard',        panel: null },
  { label: 'Messages',         panel: 'chat' },
  { label: 'Work Orders',      panel: 'orders' },
  { label: 'Invoices',         panel: 'invoices' },
  { label: 'Wizard Results',   panel: 'wizard' },
  { label: 'Service Requests', panel: 'servicereq' },
  { label: 'Inquiries',        panel: 'inquiries' },
  { label: 'Profile',          panel: 'profile' },
];

export default function MenuDrawer3({ open, onClose, onNavigate }: MenuDrawerProps) {
  return (
    <>
      <div
        className={`menu-overlay${open ? ' open' : ''}`}
        onClick={onClose}
      />
      <div className={`menu-drawer${open ? ' open' : ''}`}>
        <div className="menu-drawer-handle" />
        <div className="menu-drawer-head">
          <span className="menu-drawer-title">Navigate</span>
          <button className="menu-drawer-close" onClick={onClose}>✕</button>
        </div>
        <div className="menu-items">
          {ITEMS.map(item => (
            <div
              key={item.label}
              className="menu-item"
              onClick={() => onNavigate(item.panel)}
            >
              <div className="menu-item-dot" style={{ background: 'var(--accent, var(--gold))' }} />
              <span className="menu-item-label">{item.label}</span>
              <span className="menu-item-arrow">→</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}