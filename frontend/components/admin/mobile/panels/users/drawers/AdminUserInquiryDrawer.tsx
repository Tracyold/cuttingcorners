// comp/admin/mobile/panels/users/drawers/AdminUserInquiryDrawer.tsx
// Pure UI. Receives all state as props from AdminUserInquiriesPanel.
// No hooks called here.

import { fmtDate, fmtTime } from '../../../../../../lib/utils';
import { useSwipeToClose } from '../../../../../account/shared/hooks/useSwipeToClose';

interface Props {
  open:               boolean;
  selectedInq:        any;
  selectedInqProduct: any;
  productUrl:         string | null;
  user:               any;
  onClose:            () => void;
}

export default function AdminUserInquiryDrawer({ open, selectedInq, selectedInqProduct, productUrl, user, onClose }: Props) {
  const { elementRef, touchHandlers } = useSwipeToClose({ onClose });

  if (!selectedInq) return null;

  return (
    <>
      <div className={`overlay${open ? ' open' : ''}`} onClick={onClose} />

      <div ref={elementRef} className={`wo-drawer${open ? ' open' : ''}`} {...touchHandlers}>
        <div className="wo-handle" />
        <div className="wo-body">

          <div className="wo-topbar">
            <span style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '3px 10px', borderRadius: 999, background: 'rgba(207,221,78,0.1)', color: 'var(--gold)' }}>
              {selectedInq.guest_inquiry_id ? 'Guest Inquiry' : 'Account Inquiry'}
            </span>
            <span style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 'clamp(0.8125rem,3.5vw,0.9375rem)', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-mob-muted)', flex: 1, marginLeft: 10 }}>
              {selectedInq.name || user?.name || 'Inquiry'}
            </span>
            <button className="wo-close" onClick={onClose}>✕</button>
          </div>

          <div className="wo-scroll">
            <div className="wo-content">

              <div style={{ marginBottom: 20 }}>
                <div style={{ fontFamily: 'var(--font-display-mob)', fontSize: 'clamp(1rem,4.5vw,1.125rem)', color: 'var(--text-mob)', marginBottom: 4 }}>
                  {selectedInq.name || user?.name || '—'}
                </div>
                {selectedInq.email && <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 11, color: 'var(--text-mob-muted)', marginTop: 2 }}>{selectedInq.email}</div>}
                {selectedInq.phone && <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 11, color: 'var(--text-mob-muted)', marginTop: 2 }}>{selectedInq.phone}</div>}
              </div>

              <div style={{ height: 1, background: 'var(--bdr2-mob)', margin: '16px 0' }} />

              <div style={{ marginBottom: 20 }}>
                <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-mob-muted)', marginBottom: 8 }}>Message</div>
                <p style={{ fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(0.9375rem,4vw,1.0625rem)', color: 'var(--text-mob)', lineHeight: 1.7 }}>{selectedInq.description}</p>
              </div>

              <div style={{ height: 1, background: 'var(--bdr2-mob)', margin: '16px 0' }} />

              {selectedInqProduct ? (
                <div>
                  <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-mob-muted)', marginBottom: 12 }}>Product Inquired About</div>
                  {productUrl && (
                    <div style={{ marginBottom: 16, borderRadius: 8, overflow: 'hidden', aspectRatio: '4/3', maxHeight: 220 }}>
                      <img src={productUrl} alt={selectedInqProduct.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}
                  <div style={{ fontFamily: 'var(--font-display-mob)', fontSize: 'clamp(1rem,4.5vw,1.125rem)', color: 'var(--text-mob)', marginBottom: 4 }}>{selectedInqProduct.title}</div>
                  {selectedInqProduct.total_price && (
                    <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 'clamp(1.0rem,4.5vw,1.125rem)', color: 'var(--gold)', marginBottom: 14 }}>
                      ${Number(selectedInqProduct.total_price).toLocaleString()}
                    </div>
                  )}
                  {[
                    { label: 'Product ID', val: selectedInqProduct.product_id },
                    { label: 'Gem Type',   val: selectedInqProduct.gem_type },
                    { label: 'Shape',      val: selectedInqProduct.shape },
                    { label: 'Weight',     val: selectedInqProduct.weight ? selectedInqProduct.weight + ' ct' : null },
                    { label: 'Color',      val: selectedInqProduct.color },
                    { label: 'Origin',     val: selectedInqProduct.origin },
                    { label: 'Treatment',  val: selectedInqProduct.treatment },
                    { label: 'GIA Report', val: selectedInqProduct.gia_report_number },
                    { label: 'Price / ct', val: selectedInqProduct.price_per_carat ? '$' + Number(selectedInqProduct.price_per_carat).toLocaleString() : null },
                  ].filter(r => r.val).map(r => (
                    <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '0.5px solid var(--bdr2-mob)' }}>
                      <span style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 'clamp(0.75rem,3.2vw,0.875rem)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-mob-muted)' }}>{r.label}</span>
                      <span style={{ fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(0.875rem,3.8vw,1.0rem)', color: 'var(--text-mob)', textAlign: 'right', maxWidth: '60%', wordBreak: 'break-all' }}>{r.val}</span>
                    </div>
                  ))}
                  {selectedInqProduct.description && (
                    <p style={{ fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(0.8125rem,3.5vw,0.9375rem)', color: 'var(--text-mob-muted)', lineHeight: 1.7, marginTop: 12 }}>{selectedInqProduct.description}</p>
                  )}
                </div>
              ) : (
                <div style={{ fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(0.875rem,3.8vw,1.0rem)', color: 'var(--text-mob-muted)', fontStyle: 'italic' }}>No product linked to this inquiry</div>
              )}

              <div style={{ height: 1, background: 'var(--bdr2-mob)', margin: '20px 0 16px' }} />
              <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 10, color: 'var(--text-mob-muted)' }}>
                {selectedInq.created_at ? `${fmtDate(selectedInq.created_at)} · ${fmtTime(selectedInq.created_at)}` : '--'}
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}