// frontend/handlers/workOrderHandler.ts
//
// Reusable work order action handler.
// The same status-transition + edit_history append pattern is duplicated in:
//   - useWorkOrders (account side: accept, updateShippingAddress)
//   - useAdminUserWorkOrders (admin side: confirm, complete, cancel, addresses, payment)
//
// This handler extracts the shared DB mutation logic. Hooks still own state
// and call these functions, then update their local state from the result.

import { supabase } from '../lib/supabase'
import { notifyAdmin, notifyUser } from './notificationHandler'

// ── Types ──────────────────────────────────────────────────────────────────

export interface EditHistoryEntry {
  action: string
  by: string
  at: string
  detail?: string
}

export interface StatusTransitionResult {
  success: boolean
  editHistory: EditHistoryEntry[]
  timestamp: string
  error?: string
}

// ── Edit history helper ────────────────────────────────────────────────────

/**
 * Append an entry to a work order's edit_history array.
 * Exact from useAdminUserWorkOrders.appendLog() and useWorkOrders.acceptWO().
 */
export function appendEditHistory(
  existingHistory: any,
  action: string,
  by: string,
): EditHistoryEntry[] {
  const prev = Array.isArray(existingHistory) ? existingHistory : []
  return [...prev, { action, by, at: new Date().toISOString() }]
}

// ── Account-side actions ───────────────────────────────────────────────────

/**
 * User accepts a work order.
 * Exact from useWorkOrders.acceptWO().
 */
export async function acceptWorkOrder(
  workOrderId: string,
  userId: string,
  existingHistory: any,
): Promise<StatusTransitionResult> {
  const now = new Date().toISOString()
  const log = appendEditHistory(existingHistory, 'ACCEPTED by user', 'user')

  const { error } = await supabase
    .from('work_orders')
    .update({ status: 'ACCEPTED', accepted_at: now, edit_history: log })
    .eq('work_order_id', workOrderId)
    .eq('account_user_id', userId)

  if (error) return { success: false, editHistory: log, timestamp: now, error: error.message }

  await notifyAdmin({ event_type: 'work_orders', work_order_id: workOrderId })

  return { success: true, editHistory: log, timestamp: now }
}

/**
 * User updates the return shipping address on a work order.
 * Exact from useWorkOrders.updateShippingAddress().
 */
export async function updateShippingAddress(
  workOrderId: string,
  address: string,
  existingHistory: any,
): Promise<StatusTransitionResult> {
  const now = new Date().toISOString()
  const log = appendEditHistory(existingHistory, 'Return address updated by user', 'user')

  const { error } = await supabase
    .from('work_orders')
    .update({ wo_shipping_address: address.trim(), edit_history: log })
    .eq('work_order_id', workOrderId)

  if (error) return { success: false, editHistory: log, timestamp: now, error: error.message }

  return { success: true, editHistory: log, timestamp: now }
}

// ── Admin-side actions ─────────────────────────────────────────────────────

/**
 * Admin confirms a work order.
 * Exact from useAdminUserWorkOrders.confirmWO().
 */
export async function confirmWorkOrder(
  workOrderId: string,
  userId: string,
  existingHistory: any,
): Promise<StatusTransitionResult> {
  const now = new Date().toISOString()
  const log = appendEditHistory(existingHistory, 'CONFIRMED by admin', 'admin')

  const { error } = await supabase
    .from('work_orders')
    .update({ status: 'CONFIRMED', confirmed_at: now, edit_history: log })
    .eq('work_order_id', workOrderId)

  if (error) return { success: false, editHistory: log, timestamp: now, error: error.message }

  await notifyUser({
    event_type: 'work_order_confirmed',
    work_order_id: workOrderId,
    user_id: userId,
  })

  return { success: true, editHistory: log, timestamp: now }
}

/**
 * Admin completes a work order.
 * Exact from useAdminUserWorkOrders.completeWO().
 */
export async function completeWorkOrder(
  workOrderId: string,
  existingHistory: any,
): Promise<StatusTransitionResult> {
  const now = new Date().toISOString()
  const log = appendEditHistory(existingHistory, 'COMPLETE by admin', 'admin')

  const { error } = await supabase
    .from('work_orders')
    .update({ status: 'COMPLETE', completed_at: now, edit_history: log })
    .eq('work_order_id', workOrderId)

  if (error) return { success: false, editHistory: log, timestamp: now, error: error.message }

  return { success: true, editHistory: log, timestamp: now }
}

/**
 * Admin cancels a work order with a reason.
 * Exact from useAdminUserWorkOrders.cancelWO().
 */
export async function cancelWorkOrder(
  workOrderId: string,
  reason: string,
  existingHistory: any,
): Promise<StatusTransitionResult> {
  const now = new Date().toISOString()
  const log = appendEditHistory(existingHistory, 'CANCELLED by admin: ' + reason, 'admin')

  const { error } = await supabase
    .from('work_orders')
    .update({
      status: 'CANCELLED',
      cancelled_at: now,
      cancel_reason: reason,
      edit_history: log,
    })
    .eq('work_order_id', workOrderId)

  if (error) return { success: false, editHistory: log, timestamp: now, error: error.message }

  return { success: true, editHistory: log, timestamp: now }
}

/**
 * Admin updates both client and admin addresses on a work order.
 * Exact from useAdminUserWorkOrders.saveAddresses().
 */
export async function saveWorkOrderAddresses(
  workOrderId: string,
  clientAddress: string,
  adminAddress: string,
  adminUserId: string,
  currentAdminAddress: string | null,
  existingHistory: any,
): Promise<StatusTransitionResult> {
  const now = new Date().toISOString()
  const log = appendEditHistory(existingHistory, 'Addresses updated by admin', 'admin')

  const { error } = await supabase
    .from('work_orders')
    .update({ wo_shipping_address: clientAddress.trim(), edit_history: log })
    .eq('work_order_id', workOrderId)

  if (error) return { success: false, editHistory: log, timestamp: now, error: error.message }

  // Update admin address if changed
  if (adminAddress.trim() !== (currentAdminAddress || '')) {
    await supabase
      .from('admin_users')
      .update({ address: adminAddress.trim() })
      .eq('admin_user_id', adminUserId)
  }

  return { success: true, editHistory: log, timestamp: now }
}

/**
 * Admin saves a Stripe payment link on a work order.
 * Exact from useAdminUserWorkOrders.savePaymentLink().
 */
export async function savePaymentLink(
  workOrderId: string,
  link: string,
  existingHistory: any,
): Promise<StatusTransitionResult> {
  const now = new Date().toISOString()
  const log = appendEditHistory(existingHistory, 'Payment link added', 'admin')

  const { error } = await supabase
    .from('work_orders')
    .update({ stripe_payment_link: link.trim(), edit_history: log })
    .eq('work_order_id', workOrderId)

  if (error) return { success: false, editHistory: log, timestamp: now, error: error.message }

  return { success: true, editHistory: log, timestamp: now }
}

/**
 * Admin marks a work order as paid outside the site.
 * Exact from useAdminUserWorkOrders.markPaidOutside().
 */
export async function markPaidOutside(
  workOrderId: string,
  existingHistory: any,
): Promise<StatusTransitionResult> {
  const now = new Date().toISOString()
  const log = appendEditHistory(existingHistory, 'Marked as paid outside site', 'admin')

  const { error } = await supabase
    .from('work_orders')
    .update({ paid_outside_site: true, edit_history: log })
    .eq('work_order_id', workOrderId)

  if (error) return { success: false, editHistory: log, timestamp: now, error: error.message }

  return { success: true, editHistory: log, timestamp: now }
}

/**
 * Admin creates a new work order for a user.
 * Exact from useAdminUserWorkOrders.createWO().
 */
export async function createWorkOrder(params: {
  accountUserId: string
  adminUserId: string
  title: string
  description: string
  serviceType?: string
  gemType?: string
  estimatedPrice?: string
  estimatedTurnaround?: string
  notes?: string
  shippingAddress?: string
}): Promise<{ error: string | null }> {
  const { error } = await supabase.from('work_orders').insert({
    account_user_id: params.accountUserId,
    created_by_admin_id: params.adminUserId,
    title: params.title,
    description: params.description,
    service_type: params.serviceType || null,
    gem_type: params.gemType || null,
    estimated_price: params.estimatedPrice ? parseFloat(params.estimatedPrice) : null,
    estimated_turnaround: params.estimatedTurnaround || null,
    notes: params.notes || null,
    wo_shipping_address: params.shippingAddress || null,
    edit_history: [{ action: 'CREATED', by: 'admin', at: new Date().toISOString() }],
    status: 'CREATED',
  })

  return { error: error?.message ?? null }
}
