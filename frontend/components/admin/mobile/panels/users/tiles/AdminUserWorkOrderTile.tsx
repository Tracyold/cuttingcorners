// comp/admin/mobile/panels/users/tiles/AdminUserWorkOrdersTile.tsx
// Mirrors 3WorkOrderTile.tsx. Shows new/active WO count + notification.

interface Props {
  workOrders: any[];
  onClick:    () => void;
}

export default function AdminUserWorkOrdersTile({ workOrders, onClick }: Props) {
  const hasNew     = workOrders.some(w => w.status === 'CREATED');
  const hasActive  = workOrders.some(w => w.status === 'ACCEPTED' || w.status === 'CONFIRMED');
  const lit        = hasNew || hasActive;
  const activeCount = workOrders.filter(w => !['COMPLETE','CANCELLED'].includes(w.status)).length;

  return (
    <div
      className={`tile ${lit ? 'lit' : 'dim'}`}
      style={{
        '--tc': 'var(--tile-orders)',
        minHeight: 120, cursor: 'pointer',
        padding: '20px 18px', justifyContent: 'center',
        background: lit ? 'rgba(106,176,245,0.05)' : 'var(--bg-card)',
      } as React.CSSProperties}
      onClick={onClick}
    >
      {lit && <div className="t-badge" />}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, flex: 1 }}>
        <div style={{ fontSize: '2.0rem', lineHeight: 1, color: lit ? 'var(--tile-orders)' : 'rgba(255,255,255,0.85)', flexShrink: 0, textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>✓</div>
        <div style={{ fontFamily: 'var(--font-mob-display)', fontSize: '1.125rem', color: 'var(--text-mob)', lineHeight: 1.4, fontWeight: 500 }}>
          {hasNew ? (
            <><span style={{ color: 'var(--gold)', fontWeight: 700 }}>New</span>{' '}work order!</>
          ) : hasActive ? (
            <><strong style={{ color: 'var(--tile-orders)' }}>{activeCount}</strong> active</>
          ) : workOrders.length > 0 ? (
            <span style={{ fontSize: '1.25rem', fontWeight: 600 }}>{workOrders.length} order{workOrders.length !== 1 ? 's' : ''}</span>
          ) : (
            'No active orders'
          )}
        </div>
      </div>
    </div>
  );
}