/**
 * WORK ORDERS MODULE - ACTIONS LAYER
 *
 * RULES:
 * - Thin wrappers ONLY — no business logic
 * - UI entry points that call the service layer
 * - 'use server' for Next.js server actions
 */

'use server'

import {
  getWorkOrdersByUserService,
  getWorkOrderByIdService,
  acceptWorkOrderService,
  updateShippingAddressService,
} from './work_orders.service'
import type { WorkOrder } from './work_orders.types'
import type { ID } from '@/src/types/common'

export async function getWorkOrdersByUserAction(userId: ID): Promise<WorkOrder[]> {
  return getWorkOrdersByUserService(userId)
}

export async function getWorkOrderByIdAction(workOrderId: ID): Promise<WorkOrder> {
  return getWorkOrderByIdService(workOrderId)
}

export async function acceptWorkOrderAction(
  workOrderId: ID,
  userId: ID
): Promise<WorkOrder> {
  return acceptWorkOrderService(workOrderId, userId)
}

export async function updateShippingAddressAction(
  workOrderId: ID,
  address: string
): Promise<WorkOrder> {
  return updateShippingAddressService(workOrderId, address)
}
