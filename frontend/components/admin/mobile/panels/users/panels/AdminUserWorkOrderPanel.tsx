// comp/admin/mobile/panels/users/panels/AdminUserWorkOrdersPanel.tsx
// Calls useAdminUserWorkOrders once. Passes selectedWO and all actions
// to AdminUserWorkOrderDrawer as props — drawer has no hook of its own.

import { formatMoney, fmtDate, fmtTime } from '../../../../../../lib/utils';
import { useSwipeDownToClose } from '../../../../../account/shared/hooks/useSwipeDownToClose';
import { useAdminUserDetail } from '../hooks/useAdminUserDetail';
import { useAdminUserWorkOrders } from '../hooks/useAdminUserWorkOrders';
import AdminUserWorkOrderDrawer from '../drawers/AdminUserWorkOrderDrawer';
import AdminUserAddWorkOrderDrawer from '../drawers/AdminUserAddWorkOrderDrawer';

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  CREATED:   { bg: 'rgba(207,221,78,0.12)',  color: 'var(--gold)'  },
  ACCEPTED:  { bg: 'rgba(45,212,191,0.12)',  color: '#2dd4bf'      },
  CONFIRMED: { bg: 'rgba(106,176,245,0.12)', color: '#6ab0f5'      },
  COMPLETE:  { bg: 'rgba(78,201,148,0.12)',  color: '#4ec994'      },
  CANCELLED: { bg: 'rgba(248,113,113,0.12)', color: '#f87171'      },
};

interface Props {
  open:      boolean;
  id:        string;
  session:   any;
  onClose:   () => void;
  onBack:    () => void;
  onDashboard: () => void;
}

export default function AdminUserWorkOrdersPanel({ open, id, session, onClose, onBack, onDashboard }: Props) {
  const { elementRef, touchHandlers } = useSwipeDownToClose({ onClose });
  const { user, workOrders, setWO, setWoCount } = useAdminUserDetail(id, session);
  const {
    selectedWO, setSelectedWO,
    showAddWO, setShowAddWO,
    isGuest, closeWO,
    editingWOAddr, setEditingWOAddr,
    woAdminAddrEdit, setWoAdminAddrEdit,
    woClientAddrEdit, setWoClientAddrEdit,
    openAddressEdit,
    createWO,
    confirmWO, completeWO, cancelWO,
    saveAddresses, savePaymentLink, markPaidOutside,
  } = useAdminUserWorkOrders(id, setWO, setWoCount, user, session);

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

        {/* Nav pills */}
        <div className="sr-tab-bar" style={{ borderBottom: '0.5px solid var(--bdr2-mob)' }}>
          <button className="sr-tab" onClick={onBack}>← Users</button>
          <button className="sr-tab" onClick={onDashboard} style={{ marginLeft: 'auto' }}>Account Info</button>
        </div>

        <div className="orders-list" style={{ padding: 'clamp(1rem,4.5vw,1.25rem)', display: 'flex', flexDirection: 'column', gap: 'clamp(0.875rem,4vw,1.125rem)', flex: 1, overflowY: 'auto', minHeight: 0 }}>
          {workOrders.length === 0
            ? <div className="sr-empty">No work orders yet.</div>
            : workOrders.map(wo => {
              const s = STATUS_STYLE[wo.status] ?? STATUS_STYLE.CREATED;
              const isLit = wo.status === 'CREATED' || wo.status === 'ACCEPTED';
              return (
                <div key={wo.work_order_id} className={`order-tile ${isLit ? 'lit' : 'dim'}`} onClick={() => setSelectedWO(wo)} style={{ minHeight: 120 }}>
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

      {/* Drawer receives all state and actions from the hook called above */}
      <AdminUserWorkOrderDrawer
        open={!!selectedWO}
        wo={selectedWO}
        user={user}
        adminInfo={null}
        session={session}
        editingWOAddr={editingWOAddr}
        setEditingWOAddr={setEditingWOAddr}
        woAdminAddrEdit={woAdminAddrEdit}
        setWoAdminAddrEdit={setWoAdminAddrEdit}
        woClientAddrEdit={woClientAddrEdit}
        setWoClientAddrEdit={setWoClientAddrEdit}
        openAddressEdit={openAddressEdit}
        onConfirm={confirmWO}
        onComplete={completeWO}
        onCancel={cancelWO}
        onSaveAddresses={saveAddresses}
        onSavePaymentLink={savePaymentLink}
        onMarkPaidOutside={markPaidOutside}
        onClose={closeWO}
      />

      <AdminUserAddWorkOrderDrawer
        open={showAddWO}
        user={user}
        onClose={() => setShowAddWO(false)}
        onSaved={() => setShowAddWO(false)}
        createWO={createWO}
      />
    </>
  );
}