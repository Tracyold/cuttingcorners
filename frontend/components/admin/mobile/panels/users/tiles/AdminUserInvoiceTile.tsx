// comp/admin/mobile/panels/users/tiles/AdminUserInvoicesTile.tsx
// Mirrors 3InvoicesTile.tsx.

interface Props {
  invoices:     any[];
  invTotal:     number;
  onClick:      () => void;
}

export default function AdminUserInvoicesTile({ invoices, invTotal, onClick }: Props) {
  const formatMoney = (n: number) => '$' + n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  return (
    <div
      className="tile dim"
      style={{
        '--tc': 'var(--tile-invoice)',
        minHeight: 120, cursor: 'pointer',
        flexDirection: 'row', alignItems: 'center', gap: 16, padding: '20px 18px',
        background: 'var(--bg-card)',
      } as React.CSSProperties}
      onClick={onClick}
    >
      <div style={{ fontFamily: 'var(--font-display-mob)', fontSize: '1.125rem', color: 'var(--text)', flex: 1, fontWeight: 500 }}>
        Invoices
        {invTotal > 0 && (
          <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: '0.75rem', color: 'var(--text-mob-muted)', marginTop: 4, letterSpacing: '0.1em' }}>
            {formatMoney(invTotal)} total
          </div>
        )}
      </div>
      <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: '3.0rem', fontWeight: 800, lineHeight: 1, color: 'var(--text)', textShadow: '0 4px 10px rgba(0,0,0,0.4)', opacity: 0.8 }}>
        {invoices.length}
      </div>
    </div>
  );
}