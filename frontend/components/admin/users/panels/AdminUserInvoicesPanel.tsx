// frontend/components/admin/users/mobile/panels/AdminUserInvoicesPanel.tsx
//
// Mirrors: account/mobile/panels/3InvoicesPanel.tsx
// Admin view only — no export button, same date filter, same invoice grid.

import { useState } from 'react';
import { formatMoney, fmtDate } from '../../../../lib/utils';
import { useSwipeDownToClose } from '../../../account/shared/hooks/useSwipeDownToClose';

const INPUT_STYLE: React.CSSProperties = {
  width: '100%', background: 'var(--bg-card)',
  border: '1px solid var(--bdr2-mob)', color: 'var(--text-mob)',
  fontFamily: 'var(--font-mono-mob)', fontSize: '1.0rem',
  padding: '12px 16px', outline: 'none',
  appearance: 'none', WebkitAppearance: 'none',
  transition: 'all 200ms ease', borderRadius: 8,
};

interface Props {
  open:            boolean;
  invoices:        any[];
  onSelectInvoice: (inv: any) => void;
  onClose:         () => void;
}

export default function AdminUserInvoicesPanel({
  open, invoices, onSelectInvoice, onClose,
}: Props) {
  const { elementRef, touchHandlers } = useSwipeDownToClose({ onClose });
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo,   setDateTo]   = useState('');

  const filtered = invoices.filter(inv => {
    if (!inv.paid_at) return true;
    const d = new Date(inv.paid_at).toISOString().slice(0, 10);
    if (dateFrom && d < dateFrom) return false;
    if (dateTo   && d > dateTo)   return false;
    return true;
  });

  return (
    <div ref={elementRef} className={`slide-panel${open ? ' open' : ''}`}>
      <div className="panel-header" {...touchHandlers}>
        <span className="panel-title">Invoices</span>
        <button className="panel-close" onClick={onClose}>✕</button>
      </div>

      {/* Date filter */}
      <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--bdr2-mob)', display: 'flex', flexDirection: 'column', gap: 16, background: 'var(--bg-deep)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontFamily: 'var(--font-mono-mob)', fontSize: '0.6875rem', color: 'var(--gold)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.1em' }}>From</label>
            <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} style={INPUT_STYLE}
              onFocus={e => { e.currentTarget.style.borderColor = 'var(--gold)'; }}
              onBlur={e  => { e.currentTarget.style.borderColor = 'var(--bdr2-mob)'; }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontFamily: 'var(--font-mono-mob)', fontSize: '0.6875rem', color: 'var(--gold)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.1em' }}>To</label>
            <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} style={INPUT_STYLE}
              onFocus={e => { e.currentTarget.style.borderColor = 'var(--gold)'; }}
              onBlur={e  => { e.currentTarget.style.borderColor = 'var(--bdr2-mob)'; }} />
          </div>
          <button onClick={() => { setDateFrom(''); setDateTo(''); }} style={{
            background: 'rgba(255,255,255,0.05)', border: '1px solid var(--bdr2-mob)',
            color: 'var(--text-mob)', fontSize: '1.0rem', width: 44, height: 44,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', flexShrink: 0, borderRadius: 8, marginTop: 20,
          }}>✕</button>
        </div>
        <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: '0.8125rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-mob-muted)' }}>
          {filtered.length} invoice{filtered.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Invoice grid */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        {filtered.length === 0 ? (
          <div className="inv-empty">
            <div className="inv-empty-title">No invoices</div>
            <div className="inv-empty-sub">Paid invoices will appear here</div>
          </div>
        ) : (
          <div className="inv-grid">
            {filtered.map((inv, idx) => {
              const item  = inv.line_items?.[0];
              const emoji = ['💎', '🟢', '🔴', '💛', '🔵'][idx % 5];
              return (
                <div key={inv.invoice_id} className="inv-thumb" onClick={() => onSelectInvoice(inv)}>
                  <div className="inv-photo">{emoji}</div>
                  <div className="inv-overlay">
                    <div className="inv-price">{formatMoney(inv.total_amount)}</div>
                    <div className="inv-date">Paid {inv.paid_at ? fmtDate(inv.paid_at) : '--'}</div>
                    <div className="inv-tap-hint">{item?.title || 'View Invoice'}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
