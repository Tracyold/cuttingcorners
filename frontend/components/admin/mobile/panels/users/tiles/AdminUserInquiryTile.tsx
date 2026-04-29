// comp/admin/mobile/panels/users/tiles/AdminUserInquiriesTile.tsx
// Mirrors 3InquiriesTile.tsx. Shows unread count + notification.

interface Props {
  inquiries:      any[];
  guestInquiries: any[];
  isGuest:        boolean;
  onClick:        () => void;
}

export default function AdminUserInquiriesTile({ inquiries, guestInquiries, isGuest, onClick }: Props) {
  const unread    = inquiries.filter(i => !i.is_read).length;
  const gUnread   = isGuest ? guestInquiries.filter(i => !i.is_read).length : 0;
  const totalUnread = unread + gUnread;
  const lit       = totalUnread > 0;

  return (
    <div
      className={`tile ${lit ? 'lit' : 'dim'}`}
      style={{
        '--tc': 'var(--tile-est)',
        minHeight: 110, cursor: 'pointer', padding: '20px 18px',
        justifyContent: 'center', flexDirection: 'row', alignItems: 'center',
        background: lit ? 'rgba(207,221,78,0.04)' : 'var(--bg-card)',
      } as React.CSSProperties}
      onClick={onClick}
    >
      {lit && <div className="t-badge" />}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, flex: 1 }}>
        <div style={{ fontSize: '2.0rem', lineHeight: 1, color: lit ? 'var(--gold)' : 'rgba(255,255,255,0.85)', flexShrink: 0, textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>✎</div>
        <div style={{ fontFamily: 'var(--font-display-mob)', fontSize: '1.125rem', color: 'var(--text)', fontWeight: 500 }}>
          {lit ? (
            <><span style={{ color: 'var(--gold)', fontWeight: 700 }}>{totalUnread} new</span>{' '}inquiry{totalUnread !== 1 ? 's' : ''}</>
          ) : (
            <>Inquiries{inquiries.length > 0 ? ` · ${inquiries.length}` : ''}</>
          )}
        </div>
      </div>
    </div>
  );
}