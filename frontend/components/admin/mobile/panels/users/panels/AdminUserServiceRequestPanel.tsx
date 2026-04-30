// comp/admin/mobile/panels/users/panels/AdminUserServiceRequestsPanel.tsx
// Active/Archive tabs mirroring 3ServiceRequestPanel.tsx.
// Active: swipeable with Archive button.
// Archive: clickable cards open AdminUserArchivedSRDrawer with Recover option.

import { useState } from 'react';
import { fmtDate, fmtTime } from '../../../../../../lib/utils';
import { useSwipeDownToClose } from '../../../../../account/shared/hooks/useSwipeDownToClose';
import { useAdminUserDetail } from '../hooks/useAdminUserDetail';
import { useAdminUserServiceRequests } from '../hooks/useAdminUserServiceRequests';
import AdminUserArchivedSRDrawer from '../drawers/AdminUserArchivedSRDrawer';
import { supabase } from '../../../../../../lib/supabase';

type SRTab = 'active' | 'archive';

// ── Swipeable active SR card — mirrors 3ServiceRequestPanel SwipeableSR ──
function SwipeableSR({ sr, onTap, onArchive }: { sr: any; onTap: () => void; onArchive: (id: string) => void }) {
  const [startX,    setStartX]    = useState(0);
  const [offsetX,   setOffsetX]   = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const threshold = -80;

  const handleTouchStart = (e: React.TouchEvent) => { setStartX(e.touches[0].clientX - offsetX); setIsSwiping(true); };
  const handleTouchMove  = (e: React.TouchEvent) => { if (!isSwiping) return; const diff = e.touches[0].clientX - startX; if (diff <= 0) setOffsetX(Math.max(diff, threshold - 20)); };
  const handleTouchEnd   = () => { setIsSwiping(false); setOffsetX(offsetX < threshold / 2 ? threshold : 0); };

  return (
    <div className="sr-card-wrap">
      <button className="sr-archive-btn" onClick={e => { e.stopPropagation(); onArchive(sr.service_request_id); }}>Archive</button>
      <div
        onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}
        onClick={onTap}
        className="sr-card"
        style={{ minHeight: 140, display: 'flex', flexDirection: 'column', justifyContent: 'center', cursor: 'pointer', position: 'relative', zIndex: 2, transform: `translateX(${offsetX}px)`, transition: isSwiping ? 'none' : 'transform 300ms cubic-bezier(0.2,0.8,0.2,1)' }}
      >
        <div className="sr-card-top">
          <div className="sr-card-stone">{sr.service_type || 'Service Request'}</div>
          <span className="sr-card-status">{!sr.is_read ? 'New' : 'Pending'}</span>
        </div>
        <div className="sr-card-rec">{sr.description}</div>
        <div className="sr-card-date">{sr.created_at ? `${fmtDate(sr.created_at)} · ${fmtTime(sr.created_at)}` : '--'}</div>
      </div>
    </div>
  );
}

// ── Archived SR card — clickable, grayed ──
function ArchivedSRCard({ sr, onTap }: { sr: any; onTap: () => void }) {
  return (
    <div className="sr-card-wrap" onClick={onTap} style={{ cursor: 'pointer' }}>
      <div className="sr-card archived" style={{ minHeight: 140, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="sr-card-top">
          <div className="sr-card-stone">{sr.service_type || 'Service Request'}</div>
          <span className="sr-card-status">Archived</span>
        </div>
        <div className="sr-card-rec">{sr.description}</div>
        <div className="sr-card-date">{sr.created_at ? `${fmtDate(sr.created_at)} · ${fmtTime(sr.created_at)}` : '--'}</div>
      </div>
    </div>
  );
}

interface Props { open: boolean; id: string; session: any; onClose: () => void; onBack: () => void; onDashboard: () => void; }

export default function AdminUserServiceRequestsPanel({ open, id, session, onClose, onBack, onDashboard }: Props) {
  const { elementRef, touchHandlers } = useSwipeDownToClose({ onClose });
  const { serviceRequests, setSR } = useAdminUserDetail(id, session);
  const { markSRRead, selectedArchivedSR, setSelectedArchivedSR, unarchiveSR } = useAdminUserServiceRequests(setSR);

  const [activeTab, setActiveTab] = useState<SRTab>('active');

  const activeList   = serviceRequests.filter(s => !s.is_archived);
  const archivedList = serviceRequests.filter(s =>  s.is_archived);
  const unread       = activeList.filter(s => !s.is_read).length;

  const handleArchive = async (srId: string) => {
    const prev = serviceRequests.find(s => s.service_request_id === srId);
    setSR(list => list.map(s => s.service_request_id === srId ? { ...s, is_archived: true } : s));
    const { error } = await supabase.from('service_requests').update({ is_archived: true }).eq('service_request_id', srId);
    if (error) setSR(list => list.map(s => s.service_request_id === srId ? { ...s, is_archived: prev?.is_archived ?? false } : s));
  };

  return (
    <>
      <div ref={elementRef} className={`slide-panel${open ? ' open' : ''}`}>
        <div className="panel-header" {...touchHandlers}>
          <span className="panel-title">Service Requests{unread > 0 ? ` · ${unread} new` : ''}</span>
          <button className="panel-close" onClick={onClose}>✕</button>
        </div>

        {/* Nav pills */}
        <div className="sr-tab-bar" style={{ borderBottom: '0.5px solid var(--bdr2-mob)' }}>
          <button className="sr-tab" onClick={onBack}>← Users</button>
          <button className="sr-tab" onClick={onDashboard} style={{ marginLeft: 'auto' }}>Account Info</button>
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

        <div className="sr-list" style={{ flex: 1, overflowY: "auto", minHeight: 0 }}>
          {activeTab === 'active' ? (
            activeList.length === 0
              ? <div className="sr-empty">No active service requests.</div>
              : activeList.map(sr => (
                <SwipeableSR
                  key={sr.service_request_id}
                  sr={sr}
                  onTap={() => markSRRead(sr)}
                  onArchive={handleArchive}
                />
              ))
          ) : (
            archivedList.length === 0
              ? <div className="sr-empty">Nothing archived yet.</div>
              : archivedList.map(sr => (
                <ArchivedSRCard
                  key={sr.service_request_id}
                  sr={sr}
                  onTap={() => setSelectedArchivedSR(sr)}
                />
              ))
          )}
        </div>
      </div>

      {/* Archived SR drawer — admin can Recover */}
      <AdminUserArchivedSRDrawer
        open={!!selectedArchivedSR}
        sr={selectedArchivedSR}
        onRecover={() => unarchiveSR(selectedArchivedSR)}
        onClose={() => setSelectedArchivedSR(null)}
      />
    </>
  );
}