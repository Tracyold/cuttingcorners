/**
 * WORK ORDERS MODULE - DATA LAYER
 *
 * RULES:
 * - ONLY Supabase queries
 * - NO business logic
 * - NO validation
 * - Return raw data only
 */

import { supabase, withTimeout, TIMEOUT_MS } from '@/src/lib/supabase'
import type {
  WorkOrder,
  WorkOrderStatus,
  WorkOrderHistoryEntry,
} from './work_orders.types'
import type { ID } from '@/src/types/common'

// ============================================================================
// READ OPERATIONS
// ============================================================================

export async function getWorkOrdersByUser(userId: ID): Promise<WorkOrder[]> {
  const { data, error } = await withTimeout(
    supabase
      .from('work_orders')
      .select('*')
      .eq('account_user_id', userId)
      .order('created_at', { ascending: false }),
    TIMEOUT_MS.REQUEST,
    'getWorkOrdersByUser'
  )
  if (error) throw error
  return data as WorkOrder[]
}

export async function getWorkOrderById(workOrderId: ID): Promise<WorkOrder> {
  const { data, error } = await withTimeout(
    supabase
      .from('work_orders')
      .select('*')
      .eq('work_order_id', workOrderId)
      .single(),
    TIMEOUT_MS.REQUEST,
    'getWorkOrderById'
  )
  if (error) throw error
  return data as WorkOrder
}

// ============================================================================
// UPDATE OPERATIONS
// ============================================================================

export async function updateWorkOrderStatus(
  workOrderId: ID,
  userId: ID,
  status: WorkOrderStatus,
  extraFields: Partial<WorkOrder>,
  historyEntry: WorkOrderHistoryEntry
): Promise<WorkOrder> {
  const { data: existing, error: fetchError } = await supabase
    .from('work_orders')
    .select('edit_history')
    .eq('work_order_id', workOrderId)
    .single()

  if (fetchError) throw fetchError

  const editHistory: WorkOrderHistoryEntry[] = [
    ...(Array.isArray(existing.edit_history) ? (existing.edit_history as WorkOrderHistoryEntry[]) : []),
    historyEntry,
  ]

  const { data, error } = await withTimeout(
    supabase
      .from('work_orders')
      .update({
        status,
        edit_history: editHistory,
        ...extraFields,
      })
      .eq('work_order_id', workOrderId)
      .eq('account_user_id', userId)
      .select()
      .single(),
    TIMEOUT_MS.REQUEST,
    'updateWorkOrderStatus'
  )
  if (error) throw error
  return data as WorkOrder
}

export async function updateWorkOrderShippingAddress(
  workOrderId: ID,
  address: string,
  historyEntry: WorkOrderHistoryEntry
): Promise<WorkOrder> {
  const { data: existing, error: fetchError } = await supabase
    .from('work_orders')
    .select('edit_history')
    .eq('work_order_id', workOrderId)
    .single()

  if (fetchError) throw fetchError

  const editHistory: WorkOrderHistoryEntry[] = [
    ...(Array.isArray(existing.edit_history) ? (existing.edit_history as WorkOrderHistoryEntry[]) : []),
    historyEntry,
  ]

  const { data, error } = await withTimeout(
    supabase
      .from('work_orders')
      .update({ wo_shipping_address: address.trim(), edit_history: editHistory })
      .eq('work_order_id', workOrderId)
      .select()
      .single(),
    TIMEOUT_MS.REQUEST,
    'updateWorkOrderShippingAddress'
  )
  if (error) throw error
  return data as WorkOrder
}

// ============================================================================
// ADMIN NOTIFICATION
// ============================================================================

export async function notifyAdminOfWorkOrder(workOrderId: ID): Promise<void> {
  await supabase.functions.invoke('send-admin-notification', {
    body: { event_type: 'work_orders', work_order_id: workOrderId },
  })
}
