import { formatMoney, fmtDate } from '../../../lib/utils'

// ── Types ────────────────────────────────────────────────────────────

export interface WorkOrderListItem {
  work_order_id:   string
  title:           string
  status:          'CREATED' | 'ACCEPTED' | 'COMPLETE' | 'CANCELLED' | 'CONFIRMED'
  service_type:    string | null
  estimated_price: number | null
  created_at:      string
}

export interface WorkOrderListProps {
  workOrders: WorkOrderListItem[]
  onSelect:   (wo: WorkOrderListItem) => void
  onAccept:   (wo: WorkOrderListItem) => void
}

// ── Derived Data Helpers ─────────────────────────────────────────────

export function getFormattedPrice(wo: WorkOrderListItem): string | null {
  return wo.estimated_price ? formatMoney(wo.estimated_price) : null
}

export function getFormattedDate(wo: WorkOrderListItem): string {
  return fmtDate(wo.created_at)
}
