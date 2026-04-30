// frontend/components/account/mobile/tiles/3ServiceRequestsTile.tsx
interface ServiceRequestsTileProps {
  serviceRequests: any[];
  onClick:         () => void;
}

export default function ServiceRequestsTile3({ serviceRequests, onClick }: ServiceRequestsTileProps) {
  const active    = serviceRequests.filter(sr => !sr.is_archived);
  const unread    = active.filter(sr => !sr.is_read).length;
  const hasUnread = unread > 0;

  return (
    <div
      className={`tile wide ${hasUnread ? 'lit' : 'dim'}`}
      style={{
        '--tc': 'var(--muted)',
        minHeight: 90, padding: '20px 22px',
        flexDirection: 'row', alignItems: 'center', gap: 20, cursor: 'pointer',
        background: hasUnread ? 'rgba(207,221,78,0.05)' : 'var(--bg-card)',
      } as React.CSSProperties}
      onClick={onClick}
    >
      {hasUnread && <div className="t-badge" />}
      <div style={{ fontSize: '2rem', lineHeight: 1, flexShrink: 0,
        color: hasUnread ? 'var(--gold)' : 'rgba(255,255,255,0.85)',
        textShadow: '0 2px 4px rgba(0,0,0,0.3)'
      }}>◈</div>
      <div style={{ flex: 1 }}>
        <div style={{
          fontFamily: 'var(--font-display-mob)', fontSize: '1.125rem',
          color: 'var(--text)', fontWeight: 500,
        }}>Service Requests</div>
        {hasUnread ? (
          <span style={{
            fontFamily: 'var(--font-mono-mob)', fontSize: '0.75rem', fontWeight: 700,
            color: 'var(--gold)', letterSpacing: '0.18em', textTransform: 'uppercase',
            padding: '2px 8px', borderRadius: 999,
            background: 'rgba(207,221,78,0.12)',
            marginTop: 4, display: 'inline-block',
          }}>
            {unread} new
          </span>
        ) : (
          <div style={{
            fontFamily: 'var(--font-mono-mob)', fontSize: '0.75rem',
            color: 'var(--text-mob-muted)', letterSpacing: '0.1em',
            marginTop: 4,
          }}>
            {active.length} active
          </div>
        )}
      </div>
      <div style={{
        fontFamily: 'var(--font-mono-mob)', fontSize: '3rem', fontWeight: 800,
        color: hasUnread ? 'var(--gold)' : 'var(--text-mob-muted)',
        letterSpacing: '-0.02em', lineHeight: 1,
        textShadow: '0 4px 12px rgba(0,0,0,0.4)', opacity: 0.9,
      }}>
        {active.length}
      </div>
    </div>
  );
}
