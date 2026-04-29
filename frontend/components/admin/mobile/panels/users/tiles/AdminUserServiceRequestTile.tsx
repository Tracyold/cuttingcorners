// comp/admin/mobile/panels/users/tiles/AdminUserServiceRequestsTile.tsx
// Mirrors 3ServiceRequestsTile.tsx. Shows unread count notification.

interface Props {
  serviceRequests: any[];
  onClick:         () => void;
}

export default function AdminUserServiceRequestsTile({ serviceRequests, onClick }: Props) {
  const unreadCount = serviceRequests.filter(s => !s.is_read).length;
  const lit         = unreadCount > 0;

  return (
    <div
      className={`tile ${lit ? 'lit' : 'dim'}`}
      style={{
        '--tc': 'var(--muted)',
        minHeight: 2, padding: '2em',
        flexDirection: 'row', alignItems: 'center', gap: 20, cursor: 'pointer',
      } as React.CSSProperties}
      onClick={onClick}
    >
      {lit && <div className="t-badge" />}
      <div style={{ flex: 2 }}>
        <div style={{ fontFamily: 'var(--font-ui)', fontSize: '1.33rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--background)', marginBottom: 8, fontWeight: 600, opacity: 0.9 }}>
          {lit ? 'New Service Requests' : 'Service Requests'}
        </div>
        <div style={{ fontFamily: 'var(--font-ui)', fontSize: '1.2rem', color: '0 4px 5px var(--text)', textTransform: 'uppercase', letterSpacing: '.1em', lineHeight: 1.5, opacity: 0.9 }}>
          {serviceRequests.length} total
        </div>
      </div>
      <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: '3.5rem', fontWeight: 800, color: lit ? 'var(--gold)' : 'var(--text-mob-muted)', letterSpacing: '-0.02em', lineHeight: 1, textShadow: '0 4px 12px rgba(0,0,0,0.4)', opacity: 0.9 }}>
        {lit ? unreadCount : serviceRequests.length}
      </div>
    </div>
  );
}