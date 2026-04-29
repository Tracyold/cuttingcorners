// comp/admin/mobile/panels/users/tiles/AdminUserMessagesTile.tsx
// Mirrors 3MessagesTile.tsx. Lit when admin_has_unread is true.

interface Props {
  chatThread: any;
  messages:   any[];
  onClick:    () => void;
}

export default function AdminUserMessagesTile({ chatThread, messages, onClick }: Props) {
  const hasUnread = !!chatThread?.admin_has_unread;

  return (
    <div
      className={`tile wide ${hasUnread ? 'lit' : 'dim'}`}
      style={{
        '--tc': 'var(--tile-chat)',
        minHeight: 100, gap: 18, padding: '22px 20px', cursor: 'pointer',
        background: hasUnread ? 'rgba(207,221,78,0.05)' : 'var(--bg-card)',
      } as React.CSSProperties}
      onClick={onClick}
    >
      {hasUnread && <div className="t-badge" />}
      <div style={{ fontSize: '2.0rem', flexShrink: 0, lineHeight: 1, color: hasUnread ? 'var(--gold)' : 'rgba(255,255,255,0.85)', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>✉︎</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
        {hasUnread ? (
          <>
            <span style={{ fontFamily: 'var(--font-mono-mob)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.18em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 999, background: 'rgba(207,221,78,0.12)' }}>
              New
            </span>
            <span style={{ fontFamily: 'var(--font-display-mob)', fontSize: '1.125rem', color: 'var(--text)', fontWeight: 500 }}>
              message from user
            </span>
          </>
        ) : (
          <span style={{ fontFamily: 'var(--font-display-mob)', fontSize: '1.125rem', color: 'var(--text)', opacity: 0.9 }}>
            Chat with {messages.length > 0 ? `${messages.length} message${messages.length !== 1 ? 's' : ''}` : 'user'}
          </span>
        )}
      </div>
    </div>
  );
}