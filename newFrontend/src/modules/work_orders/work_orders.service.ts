/**
 * WORK ORDERS MODULE - SERVICE LAYER
 *
 * RULES:
 * - ALL business logic lives here
 * - Status transition rules, address validation
 * - Call data layer only — NO direct Supabase
 * - NO UI logic
 */

import {
  getWorkOrdersByUser,
  getWorkOrderById,
  updateWorkOrderStatus,
  updateWorkOrderShippingAddress,
  notifyAdminOfWorkOrder,
} from './work_orders.data'
import type {
  WorkOrder,
  WorkOrderHistoryEntry,
  WorkOrderFilters,
} from './work_orders.types'
import type { ID } from '@/src/types/common'

// ============================================================================
// VALIDATION
// ============================================================================

const ACCEPTABLE_ACCEPT_STATUSES = new Set(['PENDING'])
const ACCEPTABLE_ADDRESS_UPDATE_STATUSES = new Set(['PENDING', 'ACCEPTED', 'IN_PROGRESS'])

function validateCanAccept(status: WorkOrder['status']): void {
  if (!ACCEPTABLE_ACCEPT_STATUSES.has(status)) {
    throw new Error(`Work order cannot be accepted in status '${status}'`)
  }
}

function validateCanUpdateAddress(status: WorkOrder['status']): void {
  if (!ACCEPTABLE_ADDRESS_UPDATE_STATUSES.has(status)) {
    throw new Error(`Cannot update shipping address for work order in status '${status}'`)
  }
}

function validateAddress(address: string): void {
  if (!address || address.trim().length < 5) {
    throw new Error('A valid shipping address is required (minimum 5 characters)')
  }
}

// ============================================================================
// READ OPERATIONS
// ============================================================================

export async function getWorkOrdersByUserService(userId: ID): Promise<WorkOrder[]> {
  if (!userId) throw new Error('User ID is required')
  return getWorkOrdersByUser(userId)
}

export async function getWorkOrderByIdService(workOrderId: ID): Promise<WorkOrder> {
  if (!workOrderId) throw new Error('Work order ID is required')
  return getWorkOrderById(workOrderId)
}

// ============================================================================
// ACCEPT WORK ORDER
// ============================================================================

export async function acceptWorkOrderService(
  workOrderId: ID,
  userId: ID
): Promise<WorkOrder> {
  if (!workOrderId) throw new Error('Work order ID is required')

  const workOrder = await getWorkOrderById(workOrderId)
  validateCanAccept(workOrder.status)

  const historyEntry: WorkOrderHistoryEntry = {
    action: 'ACCEPTED by user',
    by: 'user',
    at: new Date().toISOString(),
  }

  const updated = await updateWorkOrderStatus(
    workOrderId,
    userId,
    'ACCEPTED',
    { accepted_at: new Date().toISOString() },
    historyEntry
  )

  notifyAdminOfWorkOrder(workOrderId).catch(() => undefined)

  return updated
}

// ============================================================================
// UPDATE SHIPPING ADDRESS
// ============================================================================

export async function updateShippingAddressService(
  workOrderId: ID,
  address: string
): Promise<WorkOrder> {
  if (!workOrderId) throw new Error('Work order ID is required')
  validateAddress(address)

  const workOrder = await getWorkOrderById(workOrderId)
  validateCanUpdateAddress(workOrder.status)

  const historyEntry: WorkOrderHistoryEntry = {
    action: 'Return address updated by user',
    by: 'user',
    at: new Date().toISOString(),
  }

  return updateWorkOrderShippingAddress(workOrderId, address, historyEntry)
}
