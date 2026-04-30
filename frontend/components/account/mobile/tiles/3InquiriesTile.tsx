// components/account/mobile/tiles/3InquiriesTile.tsx
interface InquiriesTileProps {
  inquiries: any[];
  onClick:   () => void;
}

export default function InquiriesTile3({ inquiries, onClick }: InquiriesTileProps) {
  const unread = inquiries.filter(i => !i.is_read && !i.is_archived).length;
  const hasUnread = unread > 0;

  return (
    <div
      className={`tile ${hasUnread ? 'lit' : 'dim'}`}
      style={{
        '--tc': 'var(--tile-est)',
        minHeight: 110, cursor: 'pointer', padding: '20px 18px',
        justifyContent: 'center', flexDirection: 'row', alignItems: 'center',
        background: hasUnread ? 'rgba(207,221,78,0.05)' : 'var(--bg-card)',
      } as React.CSSProperties}
      onClick={onClick}
    >
      {hasUnread && <div className="t-badge" />}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, flex: 1 }}>
        <div style={{
          fontSize: '2.0rem', lineHeight: 1,
          color: hasUnread ? 'var(--gold)' : 'rgba(255,255,255,0.85)',
          flexShrink: 0, textShadow: '0 2px 4px rgba(0,0,0,0.3)'
        }}>✎</div>
        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily: 'var(--font-display-mob)',
            fontSize: '1.125rem',
            color: 'var(--text)',
            fontWeight: 500,
          }}>Inquiries</div>
          {hasUnread && (
            <span style={{
              fontFamily: 'var(--font-mono-mob)', fontSize: '0.75rem', fontWeight: 700,
              color: 'var(--gold)', letterSpacing: '0.18em', textTransform: 'uppercase',
              padding: '2px 8px', borderRadius: 999,
              background: 'rgba(207,221,78,0.12)',
              marginTop: 4, display: 'inline-block',
            }}>
              {unread} new
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
