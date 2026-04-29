// frontend/components/admin/users/mobile/panels/AdminUserInquiriesPanel.tsx
//
// Mirrors: account/mobile/panels/3InquiriesPanel.tsx
// Admin extras: markInqRead on tap, guest inquiries section at top,
//               no archive action (admin read-only on archive).
// No swipe-to-archive — admin doesn't archive user inquiries.

import { fmtDate, fmtTime } from '../../../../lib/utils';
import { useSwipeDownToClose } from '../../../account/shared/hooks/useSwipeDownToClose';

interface Props {
  open:            boolean;
  inquiries:       any[];
  guestInquiries:  any[];
  isGuest:         boolean;
  onOpen:          (item: any) => void;   // openInquiry + markInqRead combined
  onClose:         () => void;
}

export default function AdminUserInquiriesPanel({
  open, inquiries, guestInquiries, isGuest, onOpen, onClose,
}: Props) {
  const { elementRef, touchHandlers } = useSwipeDownToClose({ onClose });

  const unreadCount = inquiries.filter(i => !i.is_read).length;

  return (
    <div ref={elementRef} className={`slide-panel${open ? ' open' : ''}`}>
      <div className="panel-header" {...touchHandlers}>
        <span className="panel-title">
          Inquiries{unreadCount > 0 ? ` · ${unreadCount} new` : ''}
        </span>
        <button className="panel-close" onClick={onClose}>✕</button>
      </div>

      <div className="sr-list">
        {/* Guest inquiries section — only shown on the guest account */}
        {isGuest && (
          <>
            <div style={{
              padding: 'clamp(0.75rem,3.5vw,1rem) clamp(1rem,4.5vw,1.25rem) 0',
              fontFamily: 'var(--font-mono-mob)', fontSize: 10,
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'var(--text-mob-muted)',
            }}>
              Anonymous Visitor Inquiries
            </div>

            {guestInquiries.length === 0 ? (
              <div className="sr-empty">No guest inquiries yet.</div>
            ) : (
              guestInquiries.map(inq => (
                <div
                  key={inq.guest_inquiry_id}
                  onClick={() => onOpen(inq)}
                  style={{
                    padding: 'clamp(12px,3.5vw,16px) clamp(1rem,4.5vw,1.25rem)',
                    borderBottom: '0.5px solid var(--bdr2-mob)',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                    <div>
                      <div style={{ fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(0.9375rem,4vw,1.0625rem)', color: 'var(--text-mob)', fontWeight: 600 }}>
                        {inq.name || 'Anonymous'}
                      </div>
                      <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 11, color: 'var(--text-mob-muted)', marginTop: 2 }}>
                        {inq.email}{inq.phone ? ` · ${inq.phone}` : ''}
                      </div>
                    </div>
                    {!inq.is_read && (
                      <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--gold)', marginTop: 4, flexShrink: 0 }} />
                    )}
                  </div>
                  <div style={{ fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(13px,3.4vw,14px)', color: 'var(--text-mob-muted)', lineHeight: 1.6 }}>
                    "{inq.description}"
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 10, color: 'var(--text-mob-muted)', marginTop: 6, opacity: 0.6 }}>
                    {inq.created_at ? `${fmtDate(inq.created_at)} · ${fmtTime(inq.created_at)}` : '--'}
                  </div>
                </div>
              ))
            )}

            <div style={{ height: 1, background: 'var(--bdr2-mob)', margin: '8px 0' }} />
            <div style={{
              padding: 'clamp(0.5rem,2.5vw,0.75rem) clamp(1rem,4.5vw,1.25rem) 0',
              fontFamily: 'var(--font-mono-mob)', fontSize: 10,
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'var(--text-mob-muted)',
            }}>
              Account Inquiries
            </div>
          </>
        )}

        {/* Account inquiries */}
        {inquiries.length === 0 ? (
          <div className="sr-empty">No inquiries yet.</div>
        ) : (
          inquiries.map(inq => (
            <div
              key={inq.account_inquiry_id}
              onClick={() => onOpen(inq)}
              style={{
                padding: 'clamp(12px,3.5vw,16px) clamp(1rem,4.5vw,1.25rem)',
                borderBottom: '0.5px solid var(--bdr2-mob)',
                cursor: 'pointer',
                display: 'flex', alignItems: 'flex-start', gap: 12,
              }}
            >
              {!inq.is_read && (
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--gold)', marginTop: 7, flexShrink: 0 }} />
              )}
              <div style={{ flex: 1 }}>
                {inq.products?.title && (
                  <div style={{ fontFamily: 'var(--font-display-mob)', fontSize: 'clamp(14px,3.8vw,16px)', color: 'var(--text-mob)', marginBottom: 4 }}>
                    {inq.products.title}
                  </div>
                )}
                <div style={{ fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(13px,3.4vw,14px)', color: 'var(--text-mob-muted)', lineHeight: 1.6 }}>
                  "{inq.description}"
                </div>
                <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 10, color: 'var(--text-mob-muted)', marginTop: 6, opacity: 0.6 }}>
                  {inq.created_at ? `${fmtDate(inq.created_at)} · ${fmtTime(inq.created_at)}` : '--'}
                </div>
                {inq.reply && (
                  <div style={{
                    marginTop: 8, paddingTop: 8,
                    borderTop: '0.5px solid var(--bdr2-mob)',
                    fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(13px,3.4vw,14px)',
                    color: 'var(--text-mob)', lineHeight: 1.6,
                  }}>
                    <span style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 10, color: 'var(--gold)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>
                      Reply sent
                    </span>
                    "{inq.reply}"
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
