// frontend/components/admin/users/mobile/panels/AdminUserWorkOrdersPanel.tsx
//
// Mirrors: account/mobile/panels/3OrdersPanel.tsx
// Admin extras: Complete + Cancel action buttons per card,
//               + Add Work Order button at top (hidden for guest).

import { formatMoney, fmtDate, fmtTime } from '../../../../lib/utils';
import { useSwipeDownToClose } from '../../../account/shared/hooks/useSwipeDownToClose';


const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  CREATED:   { bg: 'rgba(207,221,78,0.12)',  color: 'var(--gold)'  },
  ACCEPTED:  { bg: 'rgba(45,212,191,0.12)',  color: '#2dd4bf'      },
  CONFIRMED: { bg: 'rgba(106,176,245,0.12)', color: '#6ab0f5'      },
  COMPLETE:  { bg: 'rgba(78,201,148,0.12)',  color: '#4ec994'      },
  CANCELLED: { bg: 'rgba(248,113,113,0.12)', color: '#f87171'      },
};

interface Props {
  open:       boolean;
  workOrders: any[];
  isGuest:    boolean;
  onSelectWO: (wo: any) => void;
  onComplete: (wo: any) => void;
  onCancel:   (wo: any) => void;
  onAddWO:    () => void;
  onClose:    () => void;
}

export default function AdminUserWorkOrdersPanel({
  open, workOrders, isGuest, onSelectWO, onComplete, onCancel, onAddWO, onClose,
}: Props) {
  const { elementRef, touchHandlers } = useSwipeDownToClose({ onClose });

  const unreadCount = workOrders.filter(w => w.status === 'CREATED').length;

  return (
    <div ref={elementRef} className={`slide-panel${open ? ' open' : ''}`}>
      <div className="panel-header" {...touchHandlers}>
        <span className="panel-title">
          Work Orders{unreadCount > 0 ? ` · ${unreadCount} new` : ''}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {!isGuest && (
            <button
              onClick={onAddWO}
              style={{
                background: 'var(--gold)', border: 'none',
                color: 'var(--bg-deep)', fontFamily: 'var(--font-mono-mob)',
                fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase',
                padding: '5px 12px', cursor: 'pointer', borderRadius: 4,
              }}
            >
              + Add
            </button>
          )}
          <button className="panel-close" onClick={onClose}>✕</button>
        </div>
      </div>

      <div className="orders-list" style={{
        padding: 'clamp(1rem,4.5vw,1.25rem)',
        display: 'flex', flexDirection: 'column',
        gap: 'clamp(0.875rem,4vw,1.125rem)',
        flex: 1, overflowY: 'auto',
      }}>
        {workOrders.length === 0 ? (
          <div style={{
            padding: '60px 20px', textAlign: 'center',
            fontFamily: 'var(--font-ui-mob)', fontSize: '1.0625rem',
            color: 'var(--text-mob-muted)', fontStyle: 'italic',
          }}>
            No work orders yet
          </div>
        ) : (
          workOrders.map(wo => {
            const s = STATUS_STYLE[wo.status] ?? STATUS_STYLE.CREATED;
            const isLit = wo.status === 'CREATED' || wo.status === 'ACCEPTED';
            return (
              <div
                key={wo.work_order_id}
                className={`order-tile ${isLit ? 'lit' : 'dim'}`}
                onClick={() => onSelectWO(wo)}
              >
                <div className="order-status" style={{ background: s.bg, color: s.color }}>
                  {wo.status}
                </div>
                <div className="order-title">{wo.title}</div>
                <div className="order-meta">
                  #{String(wo.work_order_id).slice(-4)} · {fmtDate(wo.created_at)} · {fmtTime(wo.created_at)}
                </div>
                {wo.estimated_price && (
                  <div className="order-price">{formatMoney(wo.estimated_price)}</div>
                )}

                {/* Admin action buttons — stop propagation so they don't open the detail */}
                <div style={{ display: 'flex', gap: 8, marginTop: 10 }} onClick={e => e.stopPropagation()}>
                  {(wo.status === 'ACCEPTED' || wo.status === 'CONFIRMED') && (
                    <button
                      onClick={() => onComplete(wo)}
                      style={{
                        flex: 1, padding: '8px 0',
                        background: 'rgba(78,201,148,0.12)', border: '0.5px solid #4ec994',
                        color: '#4ec994', fontFamily: 'var(--font-mono-mob)',
                        fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase',
                        cursor: 'pointer', borderRadius: 6,
                      }}
                    >
                      Complete
                    </button>
                  )}
                  {(wo.status === 'CREATED' || wo.status === 'ACCEPTED') && (
                    <button
                      onClick={() => onCancel(wo)}
                      style={{
                        flex: 1, padding: '8px 0',
                        background: 'rgba(248,113,113,0.12)', border: '0.5px solid #f87171',
                        color: '#f87171', fontFamily: 'var(--font-mono-mob)',
                        fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase',
                        cursor: 'pointer', borderRadius: 6,
                      }}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
