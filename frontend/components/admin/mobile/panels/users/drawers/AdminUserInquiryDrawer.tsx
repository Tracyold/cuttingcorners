// comp/admin/mobile/panels/users/drawers/AdminUserInquiryDrawer.tsx
// Pure UI. Admin can reply to active inquiries — reply writes to
// account_inquiries.reply and displays in user's 3InquiriesPanel card.

import { useState } from 'react';
import { fmtDate, fmtTime } from '../../../../../../lib/utils';
import { useSwipeToClose } from '../../../../../account/shared/hooks/useSwipeToClose';

interface Props {
  open:               boolean;
  selectedInq:        any;
  selectedInqProduct: any;
  productUrl:         string | null;
  user:               any;
  isArchived:         boolean;
  onRecover:          (() => void) | undefined;
  onReply:            ((text: string) => Promise<void>) | undefined;
  onClose:            () => void;
}

export default function AdminUserInquiryDrawer({ open, selectedInq, selectedInqProduct, productUrl, user, isArchived, onRecover, onReply, onClose }: Props) {
  const { elementRef, touchHandlers } = useSwipeToClose({ onClose });
  const [replyText,  setReplyText]  = useState('');
  const [replySending, setReplySending] = useState(false);

  const handleSendReply = async () => {
    if (!replyText.trim() || !onReply) return;
    setReplySending(true);
    await onReply(replyText.trim());
    setReplyText('');
    setReplySending(false);
  };

  if (!selectedInq) return null;

  return (
    <>
      <div className={`overlay${open ? ' open' : ''}`} onClick={onClose} />

      <div ref={elementRef} className={`wo-drawer${open ? ' open' : ''}`} {...touchHandlers}>
        <div className="wo-handle" />
        <div className="wo-body">

          <div className="wo-topbar">
            <span style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '3px 10px', borderRadius: 999, background: isArchived ? 'rgba(127,127,127,0.12)' : 'rgba(207,221,78,0.1)', color: isArchived ? 'var(--text-mob-muted)' : 'var(--gold)' }}>
              {isArchived ? 'Archived' : selectedInq.guest_inquiry_id ? 'Guest Inquiry' : 'Account Inquiry'}
            </span>
            <span style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 'clamp(0.8125rem,3.5vw,0.9375rem)', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-mob-muted)', flex: 1, marginLeft: 10 }}>
              {selectedInq.name || user?.name || 'Inquiry'}
            </span>
            <button className="wo-close" onClick={onClose}>✕</button>
          </div>

          <div className="wo-scroll">
            <div className="wo-content">

              {/* Recover banner — archived only */}
              {isArchived && onRecover && (
                <div style={{ background: 'rgba(45,212,191,0.06)', border: '0.5px solid rgba(45,212,191,0.25)', borderRadius: 8, padding: '12px 14px', marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#2dd4bf', marginBottom: 3 }}>Archived</div>
                    <div style={{ fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(13px,3.4vw,14px)', color: 'var(--text-mob-muted)', lineHeight: 1.5 }}>This inquiry was archived by the user. You can recover it to their active list.</div>
                  </div>
                  <button onClick={onRecover} className="wiz-btn-pill wiz-btn-pill-outline" style={{ fontSize: 11, color: '#2dd4bf', borderColor: 'rgba(45,212,191,0.4)', flexShrink: 0, padding: '8px 14px' }}>
                    Recover
                  </button>
                </div>
              )}

              {/* Contact info */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontFamily: 'var(--font-display-mob)', fontSize: 'clamp(1rem,4.5vw,1.125rem)', color: 'var(--text-mob)', marginBottom: 4 }}>
                  {selectedInq.name || user?.name || '—'}
                </div>
                {selectedInq.email && <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 11, color: 'var(--text-mob-muted)', marginTop: 2 }}>{selectedInq.email}</div>}
                {selectedInq.phone && <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 11, color: 'var(--text-mob-muted)', marginTop: 2 }}>{selectedInq.phone}</div>}
              </div>

              <div style={{ height: 1, background: 'var(--bdr2-mob)', margin: '16px 0' }} />

              {/* User message */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-mob-muted)', marginBottom: 8 }}>Message</div>
                <p style={{ fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(0.9375rem,4vw,1.0625rem)', color: 'var(--text-mob)', lineHeight: 1.7 }}>{selectedInq.description}</p>
              </div>

              {/* Existing reply — shown when already replied */}
              {selectedInq.reply && (
                <>
                  <div style={{ height: 1, background: 'var(--bdr2-mob)', margin: '12px 0 16px' }} />
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>
                      Your Reply{selectedInq.replied_at ? ` · ${fmtDate(selectedInq.replied_at)}` : ''}
                    </div>
                    <p style={{ fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(0.9375rem,4vw,1.0625rem)', color: 'var(--text-mob)', lineHeight: 1.7, background: 'rgba(207,221,78,0.04)', border: '0.5px solid rgba(207,221,78,0.15)', borderRadius: 8, padding: '12px 14px' }}>
                      "{selectedInq.reply}"
                    </p>
                  </div>
                </>
              )}

              <div style={{ height: 1, background: 'var(--bdr2-mob)', margin: '12px 0 16px' }} />

              {/* Product */}
              {selectedInqProduct ? (
                <div style={{ marginBottom: 20 }}>
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
                <div style={{ fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(0.875rem,3.8vw,1.0rem)', color: 'var(--text-mob-muted)', fontStyle: 'italic', marginBottom: 20 }}>
                  No product linked to this inquiry
                </div>
              )}

              <div style={{ height: 1, background: 'var(--bdr2-mob)', margin: '4px 0 16px' }} />
              <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 10, color: 'var(--text-mob-muted)', marginBottom: 24 }}>
                {selectedInq.created_at ? `${fmtDate(selectedInq.created_at)} · ${fmtTime(selectedInq.created_at)}` : '--'}
              </div>

              {/* ── Reply section — active inquiries only, not archived ── */}
              {!isArchived && onReply && (
                <div style={{ borderTop: '0.5px solid var(--bdr2-mob)', paddingTop: 20, paddingBottom: 32 }}>
                  <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 10 }}>
                    {selectedInq.reply ? 'Edit Reply' : 'Reply to Inquiry'}
                  </div>
                  <textarea
                    value={replyText}
                    onChange={e => setReplyText(e.target.value)}
                    placeholder={selectedInq.reply ? 'Update your reply...' : 'Type your reply to the customer...'}
                    rows={4}
                    style={{ width: '100%', background: 'var(--bg-mob-card)', border: '0.5px solid var(--bdr2-mob)', borderRadius: 8, color: 'var(--text-mob)', fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(0.875rem,3.8vw,1rem)', padding: '11px 14px', outline: 'none', resize: 'vertical', boxSizing: 'border-box', minHeight: 100, marginBottom: 10 }}
                    onFocus={e => { e.target.style.borderColor = 'var(--gold)'; }}
                    onBlur={e  => { e.target.style.borderColor = 'var(--bdr2-mob)'; }}
                  />
                  <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 9, color: 'var(--text-mob-muted)', marginBottom: 12, opacity: 0.7, letterSpacing: '0.06em' }}>
                    This reply will appear on the customer's inquiry card in their account.
                  </div>
                  <button
                    className="wiz-btn-pill wiz-btn-pill-gold"
                    onClick={handleSendReply}
                    disabled={replySending || !replyText.trim()}
                    style={{ opacity: replySending || !replyText.trim() ? 0.5 : 1 }}
                  >
                    {replySending ? 'Sending...' : selectedInq.reply ? 'Update Reply' : 'Send Reply'}
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
}