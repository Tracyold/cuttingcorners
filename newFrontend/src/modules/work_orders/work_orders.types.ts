/**
 * WORK ORDERS MODULE - TYPE DEFINITIONS
 *
 * RULES:
 * - Domain-specific types ONLY
 * - Import shared primitives from @/src/types/common
 * - NO runtime code, NO functions
 */

import type { ID, Timestamp } from '@/src/types/common'

// ============================================================================
// CORE ENTITY
// ============================================================================

export interface WorkOrder {
  work_order_id: ID
  account_user_id: ID
  status: WorkOrderStatus
  accepted_at?: Timestamp
  wo_shipping_address?: string
  edit_history: WorkOrderHistoryEntry[]
  description?: string
  service_type?: string
  created_at: Timestamp
  updated_at?: Timestamp
}

// ============================================================================
// DOMAIN ENUMS
// ============================================================================

export type WorkOrderStatus =
  | 'PENDING'
  | 'ACCEPTED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED'

// ============================================================================
// AUDIT LOG
// ============================================================================

export interface WorkOrderHistoryEntry {
  action: string
  by: 'user' | 'admin'
  at: Timestamp
}

// ============================================================================
// INPUT TYPES
// ============================================================================

export interface AcceptWorkOrderInput {
  work_order_id: ID
  account_user_id: ID
}

export interface UpdateShippingAddressInput {
  work_order_id: ID
  address: string
}

// ============================================================================
// FILTER / SORT TYPES
// ============================================================================

export interface WorkOrderFilters {
  status?: WorkOrderStatus | WorkOrderStatus[]
  account_user_id?: ID
}

export type WorkOrderSortField = 'created_at' | 'updated_at' | 'accepted_at' | 'status'

export interface WorkOrderSortOptions {
  field: WorkOrderSortField
  direction: 'asc' | 'desc'
}
