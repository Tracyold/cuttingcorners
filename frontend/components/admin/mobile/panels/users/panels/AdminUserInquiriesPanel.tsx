// comp/admin/mobile/panels/users/panels/AdminUserInquiriesPanel.tsx
// Active/Archive tabs mirroring 3InquiriesPanel.tsx.
// Active: swipeable with Archive button (same mechanic as account side).
// Archive: clickable cards open AdminUserInquiryDrawer with Recover option.

import { useState } from 'react';
import { fmtDate, fmtTime } from '../../../../../../lib/utils';
import { useSwipeDownToClose } from '../../../../../account/shared/hooks/useSwipeDownToClose';
import { useAdminUserDetail } from '../hooks/useAdminUserDetail';
import { useAdminUserInquiries } from '../hooks/useAdminUserInquiries';
import AdminUserInquiryDrawer from '../drawers/AdminUserInquiryDrawer';
import { supabase } from '../../../../../../lib/supabase';

type InqTab = 'active' | 'archive';

// ── Swipeable active inquiry card — mirrors 3InquiriesPanel SwipeableInquiry ──
function SwipeableInquiry({ inq, onTap, onArchive }: { inq: any; onTap: () => void; onArchive: (id: string) => void }) {
  const [startX,    setStartX]    = useState(0);
  const [offsetX,   setOffsetX]   = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const threshold = -80;

  const handleTouchStart = (e: React.TouchEvent) => { setStartX(e.touches[0].clientX - offsetX); setIsSwiping(true); };
  const handleTouchMove  = (e: React.TouchEvent) => { if (!isSwiping) return; const diff = e.touches[0].clientX - startX; if (diff <= 0) setOffsetX(Math.max(diff, threshold - 20)); };
  const handleTouchEnd   = () => { setIsSwiping(false); setOffsetX(offsetX < threshold / 2 ? threshold : 0); };

  return (
    <div className="sr-card-wrap">
      <button className="sr-archive-btn" onClick={e => { e.stopPropagation(); onArchive(inq.account_inquiry_id); }}>Archive</button>
      <div
        onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}
        onClick={onTap}
        className="sr-card"
        style={{ minHeight: 'auto', cursor: 'pointer', display: 'flex', gap: 12, alignItems: 'flex-start', position: 'relative', zIndex: 2, transform: `translateX(${offsetX}px)`, transition: isSwiping ? 'none' : 'transform 300ms cubic-bezier(0.2,0.8,0.2,1)' }}
      >
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
  );
}

// ── Archived inquiry card — clickable, grayed ──
function ArchivedInquiryCard({ inq, onTap }: { inq: any; onTap: () => void }) {
  return (
    <div className="sr-card-wrap" onClick={onTap} style={{ cursor: 'pointer' }}>
      <div className="tile dim archived" style={{ minHeight: 'auto', padding: 'clamp(1rem,4.5vw,1.25rem)', borderRadius: 12, opacity: 0.55, filter: 'grayscale(0.6)' }}>
        <div className="sr-card-top">
          <div className="sr-card-stone">{inq.products?.title || 'Product Inquiry'}</div>
          <span className="sr-card-status" style={{ background: 'rgba(127,127,127,0.1)', color: 'var(--text-mob-muted)' }}>Archived</span>
        </div>
        <div className="sr-card-rec">"{inq.description}"</div>
        <div className="sr-card-date">{inq.created_at ? `${fmtDate(inq.created_at)} · ${fmtTime(inq.created_at)}` : '--'}</div>
      </div>
    </div>
  );
}

interface Props { open: boolean; id: string; session: any; onClose: () => void; }

export default function AdminUserInquiriesPanel({ open, id, session, onClose }: Props) {
  const { elementRef, touchHandlers } = useSwipeDownToClose({ onClose });
  const { inquiries, guestInquiries, setInquiries, user } = useAdminUserDetail(id, session);
  const { markInqRead, openInquiry, selectedInq, setSelectedInq, selectedInqProduct, setSelectedInqProduct, selectedArchivedInq, setSelectedArchivedInq, productUrl, isGuest, closeInquiry, sendReply, unarchiveInquiry } = useAdminUserInquiries(id, setInquiries);

  const [activeTab, setActiveTab] = useState<InqTab>('active');

  const activeList   = inquiries.filter(i => !i.is_archived);
  const archivedList = inquiries.filter(i =>  i.is_archived);
  const unread       = activeList.filter(i => !i.is_read).length;

  // Archive an inquiry (admin can archive on behalf of user or for admin view)
  const handleArchive = async (inqId: string) => {
    const prev = inquiries.find(i => i.account_inquiry_id === inqId);
    setInquiries(list => list.map(i => i.account_inquiry_id === inqId ? { ...i, is_archived: true } : i));
    const { error } = await supabase.from('account_inquiries').update({ is_archived: true }).eq('account_inquiry_id', inqId);
    if (error) setInquiries(list => list.map(i => i.account_inquiry_id === inqId ? { ...i, is_archived: prev?.is_archived ?? false } : i));
  };

  return (
    <>
      <div ref={elementRef} className={`slide-panel${open ? ' open' : ''}`}>
        <div className="panel-header" {...touchHandlers}>
          <span className="panel-title">Inquiries{unread > 0 ? ` · ${unread} new` : ''}</span>
          <button className="panel-close" onClick={onClose}>✕</button>
        </div>

        {/* Active / Archive tabs */}
        <div className="sr-tab-bar">
          <button className={`sr-tab${activeTab === 'active' ? ' active' : ''}`} onClick={() => setActiveTab('active')}>
            Active{activeList.length > 0 ? ` · ${activeList.length}` : ''}
          </button>
          <button className={`sr-tab${activeTab === 'archive' ? ' active' : ''}`} onClick={() => setActiveTab('archive')}>
            Archive{archivedList.length > 0 ? ` · ${archivedList.length}` : ''}
          </button>
        </div>

        <div className="sr-list">
          {activeTab === 'active' ? (
            <>
              {/* Guest inquiries — active tab only */}
              {isGuest && (
                <>
                  <div style={{ padding: 'clamp(0.75rem,3.5vw,1rem) clamp(1rem,4.5vw,1.25rem) 0', fontFamily: 'var(--font-mono-mob)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-mob-muted)' }}>
                    Anonymous Visitor Inquiries
                  </div>
                  {guestInquiries.filter(i => !i.is_archived).length === 0
                    ? <div className="sr-empty">No guest inquiries.</div>
                    : guestInquiries.filter(i => !i.is_archived).map(inq => (
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

              {activeList.length === 0
                ? <div className="sr-empty">No active inquiries.</div>
                : activeList.map(inq => (
                  <SwipeableInquiry
                    key={inq.account_inquiry_id}
                    inq={inq}
                    onTap={() => { markInqRead(inq); openInquiry(inq); }}
                    onArchive={handleArchive}
                  />
                ))
              }
            </>
          ) : (
            // Archive tab
            archivedList.length === 0
              ? <div className="sr-empty">Nothing archived yet.</div>
              : archivedList.map(inq => (
                <ArchivedInquiryCard
                  key={inq.account_inquiry_id}
                  inq={inq}
                  onTap={() => setSelectedArchivedInq(inq)}
                />
              ))
          )}
        </div>
      </div>

      {/* Active inquiry drawer */}
      <AdminUserInquiryDrawer
        open={!!selectedInq}
        selectedInq={selectedInq}
        selectedInqProduct={selectedInqProduct}
        productUrl={productUrl}
        user={user}
        isArchived={false}
        onRecover={undefined}
        onReply={(text) => sendReply(selectedInq, text)}
        onClose={closeInquiry}
      />

      {/* Archived inquiry drawer — has Recover button, no reply */}
      <AdminUserInquiryDrawer
        open={!!selectedArchivedInq}
        selectedInq={selectedArchivedInq}
        selectedInqProduct={null}
        productUrl={null}
        user={user}
        isArchived={true}
        onRecover={() => unarchiveInquiry(selectedArchivedInq)}
        onReply={undefined}
        onClose={() => setSelectedArchivedInq(null)}
      />
    </>
  );
}