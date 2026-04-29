// comp/admin/mobile/panels/users/panels/AdminUserWorkOrdersPanel.tsx
// Imports useAdminUserDetail + useAdminUserWorkOrders.
// List only. Mounts AdminUserWorkOrderDrawer internally — opens when WO is tapped.
// Also mounts AddWorkOrderModal for the + Add button.

import { formatMoney, fmtDate, fmtTime } from '../../../../../../lib/utils';
import { useSwipeDownToClose } from '../../../../../account/shared/hooks/useSwipeDownToClose';
import { useAdminUserDetail } from '../hooks/useAdminUserDetail';
import { useAdminUserWorkOrders } from '../hooks/useAdminUserWorkOrders';
import AdminUserWorkOrderDrawer from '../drawers/AdminUserWorkOrderDrawer';
import AddWorkOrderModal from '../../../../users/AddWorkOrderModal';

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  CREATED:   { bg: 'rgba(207,221,78,0.12)',  color: 'var(--gold)'  },
  ACCEPTED:  { bg: 'rgba(45,212,191,0.12)',  color: '#2dd4bf'      },
  CONFIRMED: { bg: 'rgba(106,176,245,0.12)', color: '#6ab0f5'      },
  COMPLETE:  { bg: 'rgba(78,201,148,0.12)',  color: '#4ec994'      },
  CANCELLED: { bg: 'rgba(248,113,113,0.12)', color: '#f87171'      },
};

interface Props {
  open:    boolean;
  id:      string;
  session: any;
  onClose: () => void;
}

export default function AdminUserWorkOrdersPanel({ open, id, session, onClose }: Props) {
  const { elementRef, touchHandlers } = useSwipeDownToClose({ onClose });
  const { user, workOrders, setWO, setWoCount } = useAdminUserDetail(id, session);
  const { setSelectedWO, showAddWO, setShowAddWO, isGuest, completeWO, cancelWO, closeWO } = useAdminUserWorkOrders(id, setWO);

  const unread = workOrders.filter(w => w.status === 'CREATED').length;

  return (
    <>
      <div ref={elementRef} className={`slide-panel${open ? ' open' : ''}`}>
        <div className="panel-header" {...touchHandlers}>
          <span className="panel-title">Work Orders{unread > 0 ? ` · ${unread} new` : ''}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {!isGuest && (
              <button onClick={() => setShowAddWO(true)} className="order-accept" style={{ borderRadius: 4, padding: '5px 12px', fontSize: 11 }}>+ Add</button>
            )}
            <button className="panel-close" onClick={onClose}>✕</button>
          </div>
        </div>

        <div className="orders-list" style={{ padding: 'clamp(1rem,4.5vw,1.25rem)', display: 'flex', flexDirection: 'column', gap: 'clamp(0.875rem,4vw,1.125rem)', flex: 1, overflowY: 'auto' }}>
          {workOrders.length === 0
            ? <div className="sr-empty">No work orders yet.</div>
            : workOrders.map(wo => {
              const s = STATUS_STYLE[wo.status] ?? STATUS_STYLE.CREATED;
              const isLit = wo.status === 'CREATED' || wo.status === 'ACCEPTED';
              return (
                <div key={wo.work_order_id} className={`order-tile ${isLit ? 'lit' : 'dim'}`} onClick={() => setSelectedWO(wo)}>
                  <div className="order-status" style={{ background: s.bg, color: s.color }}>{wo.status}</div>
                  <div className="order-title">{wo.title}</div>
                  <div className="order-meta">#{String(wo.work_order_id).slice(-4)} · {fmtDate(wo.created_at)} · {fmtTime(wo.created_at)}</div>
                  {wo.estimated_price && <div className="order-price">{formatMoney(wo.estimated_price)}</div>}
                  <div style={{ display: 'flex', gap: 8, marginTop: 10 }} onClick={e => e.stopPropagation()}>
                    {(wo.status === 'ACCEPTED' || wo.status === 'CONFIRMED') && (
                      <button onClick={() => completeWO(wo)} className="order-accept" style={{ flex: 1, background: 'rgba(78,201,148,0.12)', borderColor: '#4ec994', color: '#4ec994' }}>Complete</button>
                    )}
                    {(wo.status === 'CREATED' || wo.status === 'ACCEPTED') && (
                      <button onClick={() => cancelWO(wo)} className="order-accept" style={{ flex: 1, background: 'rgba(248,113,113,0.12)', borderColor: '#f87171', color: '#f87171' }}>Cancel</button>
                    )}
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>

      {/* Drawer lives inside the panel — opens when selectedWO is set */}
      <AdminUserWorkOrderDrawer
        open={true}
        id={id}
        session={session}
        onClose={closeWO}
      />

      {/* Add WO modal */}
      <AddWorkOrderModal
        showAddWO={showAddWO}
        setShowAddWO={setShowAddWO}
        user={user}
        id={id}
        session={session}
        setWO={setWO}
        setWoCount={setWoCount}
      />
    </>
  );
}
