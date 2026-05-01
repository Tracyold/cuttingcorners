// frontend/components/account/mobile/drawers/3InquiryDrawer.tsx
// Slides in from right when user taps an inquiry tile.
// Shows: product photo, gem details, user message, admin reply (prominent).

import { fmtDate, fmtTime } from '../../../../lib/utils';
import { useSwipeToClose } from '../../shared/hooks/useSwipeToClose';
import { formatMoney } from '../../../../lib/utils';

interface Props {
  open:    boolean;
  inq:     any;
  onClose: () => void;
}

export default function InquiryDrawer3({ open, inq, onClose }: Props) {
  const { elementRef, touchHandlers } = useSwipeToClose({ onClose });

  if (!inq) return null;

  const product = inq.products;
  const isPending = !inq.reply;

  return (
    <>
      <div className={`overlay${open ? ' open' : ''}`} onClick={onClose} />
      <div ref={elementRef} className={`wo-drawer${open ? ' open' : ''}`} {...touchHandlers}>
        <div className="wo-handle" />
        <div className="wo-body">

          {/* Topbar */}
          <div className="wo-topbar">
            <span style={{
              fontFamily: 'var(--font-mono-mob)', fontSize: 9, letterSpacing: '0.18em',
              textTransform: 'uppercase', padding: '3px 10px', borderRadius: 999,
              background: isPending ? 'rgba(207,221,78,0.12)' : 'rgba(45,212,191,0.12)',
              color: isPending ? 'var(--gold)' : '#2dd4bf',
            }}>
              {isPending ? 'Pending' : 'Replied'}
            </span>
            <span style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 'clamp(0.8125rem,3.5vw,0.9375rem)', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-mob-muted)', flex: 1, marginLeft: 10 }}>
              Inquiry
            </span>
            <button className="wo-close" onClick={onClose}>✕</button>
          </div>

          <div className="wo-scroll">
            <div className="wo-content">

              {/* ── Product photo ── */}
              {product?.photo_url && (
                <img
                  src={product.photo_url}
                  alt={product.title || ''}
                  style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', borderRadius: 10, border: '0.5px solid var(--bdr2-mob)', display: 'block', marginBottom: 16 }}
                  onError={(e: any) => (e.target.style.display = 'none')}
                />
              )}

              {/* ── Product info ── */}
              {product && (
                <div style={{ background: 'var(--bg-mob-card)', border: '0.5px solid var(--bdr2-mob)', borderRadius: 10, padding: 14, marginBottom: 16 }}>
                  <div style={{ fontFamily: 'var(--font-display-mob)', fontSize: 'clamp(1rem,4.2vw,1.125rem)', color: 'var(--gold)', marginBottom: 8 }}>
                    {product.title || 'Product Inquiry'}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 12px' }}>
                    {[
                      { label: 'Gem Type',  val: product.gem_type  },
                      { label: 'Color',     val: product.color     },
                      { label: 'Shape',     val: product.shape     },
                      { label: 'Weight',    val: product.weight ? `${product.weight} ct` : null },
                      { label: 'Origin',    val: product.origin    },
                      { label: 'Treatment', val: product.treatment },
                      { label: 'Price',     val: product.total_price ? formatMoney(product.total_price) : null },
                      { label: 'GIA #',     val: product.gia_report_number },
                    ].filter(r => r.val).map(r => (
                      <div key={r.label}>
                        <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-mob-muted)', marginBottom: 2 }}>{r.label}</div>
                        <div style={{ fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(0.875rem,3.8vw,1rem)', color: 'var(--text-mob)' }}>{r.val}</div>
                      </div>
                    ))}
                  </div>
                  {product.description && (
                    <div style={{ marginTop: 12, paddingTop: 10, borderTop: '0.5px solid var(--bdr2-mob)' }}>
                      <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-mob-muted)', marginBottom: 4 }}>Description</div>
                      <div style={{ fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(0.875rem,3.8vw,1rem)', color: 'var(--text-mob-muted)', lineHeight: 1.6 }}>{product.description}</div>
                    </div>
                  )}
                </div>
              )}

              {/* ── Your message ── */}
              <div style={{ background: 'var(--bg-mob-card)', border: '0.5px solid var(--bdr2-mob)', borderRadius: 10, padding: 14, marginBottom: 16 }}>
                <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-mob-muted)', marginBottom: 6 }}>Your Message</div>
                <div style={{ fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(0.9375rem,4vw,1.0625rem)', color: 'var(--text-mob)', lineHeight: 1.7 }}>
                  "{inq.description}"
                </div>
                <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 9, color: 'var(--text-mob-muted)', marginTop: 8, opacity: 0.6 }}>
                  Submitted {inq.created_at ? `${fmtDate(inq.created_at)} · ${fmtTime(inq.created_at)}` : '--'}
                </div>
              </div>

              {/* ── Admin reply — prominent ── */}
              {inq.reply ? (
                <div style={{
                  background: 'rgba(207,221,78,0.06)',
                  border: '1px solid rgba(207,221,78,0.25)',
                  borderRadius: 10, padding: 16, marginBottom: 16,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(207,221,78,0.15)', border: '1px solid rgba(207,221,78,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.875rem', flexShrink: 0 }}>✉</div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 700 }}>
                        Reply from CCG
                      </div>
                      {inq.replied_at && (
                        <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 9, color: 'var(--text-mob-muted)', opacity: 0.7 }}>
                          {fmtDate(inq.replied_at)} · {fmtTime(inq.replied_at)}
                        </div>
                      )}
                    </div>
                  </div>
                  <div style={{ fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(0.9375rem,4vw,1.0625rem)', color: 'var(--text-mob)', lineHeight: 1.7 }}>
                    {inq.reply}
                  </div>
                </div>
              ) : (
                <div style={{ background: 'var(--bg-mob-card)', border: '0.5px solid var(--bdr2-mob)', borderRadius: 10, padding: 16, marginBottom: 16, textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 6 }}>Awaiting Reply</div>
                  <div style={{ fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(0.875rem,3.8vw,1rem)', color: 'var(--text-mob-muted)', lineHeight: 1.6 }}>
                    We'll get back to you soon. You'll receive a notification when we reply.
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
