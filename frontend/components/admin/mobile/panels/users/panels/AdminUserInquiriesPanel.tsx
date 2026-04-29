// comp/admin/mobile/panels/users/panels/AdminUserInquiriesPanel.tsx
// Calls useAdminUserInquiries once. Passes selectedInq and all state
// to AdminUserInquiryDrawer as props — drawer has no hook of its own.

import { fmtDate, fmtTime } from '../../../../../../lib/utils';
import { useSwipeDownToClose } from '../../../../../account/shared/hooks/useSwipeDownToClose';
import { useAdminUserDetail } from '../hooks/useAdminUserDetail';
import { useAdminUserInquiries } from '../hooks/useAdminUserInquiries';
import AdminUserInquiryDrawer from '../drawers/AdminUserInquiryDrawer';

interface Props {
  open:    boolean;
  id:      string;
  session: any;
  onClose: () => void;
}

export default function AdminUserInquiriesPanel({ open, id, session, onClose }: Props) {
  const { elementRef, touchHandlers } = useSwipeDownToClose({ onClose });
  const { inquiries, guestInquiries, setInquiries, user } = useAdminUserDetail(id, session);
  const {
    selectedInq, setSelectedInq,
    selectedInqProduct, setSelectedInqProduct,
    productUrl, isGuest,
    markInqRead, openInquiry, closeInquiry,
  } = useAdminUserInquiries(id, setInquiries);

  const unread = inquiries.filter(i => !i.is_read).length;

  return (
    <>
      <div ref={elementRef} className={`slide-panel${open ? ' open' : ''}`}>
        <div className="panel-header" {...touchHandlers}>
          <span className="panel-title">Inquiries{unread > 0 ? ` · ${unread} new` : ''}</span>
          <button className="panel-close" onClick={onClose}>✕</button>
        </div>

        <div className="sr-list">
          {isGuest && (
            <>
              <div style={{ padding: 'clamp(0.75rem,3.5vw,1rem) clamp(1rem,4.5vw,1.25rem) 0', fontFamily: 'var(--font-mono-mob)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-mob-muted)' }}>
                Anonymous Visitor Inquiries
              </div>
              {guestInquiries.length === 0
                ? <div className="sr-empty">No guest inquiries yet.</div>
                : guestInquiries.map(inq => (
                  <div key={inq.guest_inquiry_id} onClick={() => openInquiry(inq)} className="tile dim" style={{ margin: 'clamp(0.5rem,2.5vw,0.75rem)', borderRadius: 12, padding: 'clamp(1rem,4.5vw,1.25rem)', cursor: 'pointer' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                      <div>
                        <div style={{ fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(0.9375rem,4vw,1.0625rem)', color: 'var(--text-mob)', fontWeight: 600 }}>{inq.name || 'Anonymous'}</div>
                        <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 11, color: 'var(--text-mob-muted)', marginTop: 2 }}>{inq.email}{inq.phone ? ` · ${inq.phone}` : ''}</div>
                      </div>
                      {!inq.is_read && <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--gold)', flexShrink: 0 }} />}
                    </div>
                    <div style={{ fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(13px,3.4vw,14px)', color: 'var(--text-mob-muted)', lineHeight: 1.6 }}>"{inq.description}"</div>
                    <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 10, color: 'var(--text-mob-muted)', marginTop: 6, opacity: 0.6 }}>
                      {inq.created_at ? `${fmtDate(inq.created_at)} · ${fmtTime(inq.created_at)}` : '--'}
                    </div>
                  </div>
                ))
              }
              <div style={{ height: 1, background: 'var(--bdr2-mob)', margin: '8px 0' }} />
              <div style={{ padding: 'clamp(0.5rem,2.5vw,0.75rem) clamp(1rem,4.5vw,1.25rem) 0', fontFamily: 'var(--font-mono-mob)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-mob-muted)' }}>
                Account Inquiries
              </div>
            </>
          )}

          {inquiries.length === 0
            ? <div className="sr-empty">No inquiries yet.</div>
            : inquiries.map(inq => (
              <div key={inq.account_inquiry_id} onClick={() => { markInqRead(inq); openInquiry(inq); }} className="sr-card-wrap">
                <div className="sr-card" style={{ minHeight: 'auto', cursor: 'pointer', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  {!inq.is_read && <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--gold)', marginTop: 7, flexShrink: 0 }} />}
                  <div style={{ flex: 1 }}>
                    <div className="sr-card-top">
                      <div className="sr-card-stone">{inq.products?.title || 'Product Inquiry'}</div>
                      <span className="sr-card-status" style={{ background: inq.reply ? 'rgba(45,212,191,0.1)' : 'rgba(207,221,78,0.1)', color: inq.reply ? '#2dd4bf' : 'var(--gold)' }}>
                        {inq.reply ? 'Replied' : 'Pending'}
                      </span>
                    </div>
                    <div className="sr-card-rec">"{inq.description}"</div>
                    <div className="sr-card-date">{inq.created_at ? `${fmtDate(inq.created_at)} · ${fmtTime(inq.created_at)}` : '--'}</div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>

      {/* Drawer receives all state from the hook called above — no hook inside drawer */}
      <AdminUserInquiryDrawer
        open={!!selectedInq}
        selectedInq={selectedInq}
        selectedInqProduct={selectedInqProduct}
        productUrl={productUrl}
        user={user}
        onClose={closeInquiry}
      />
    </>
  );
}