/**
 * SERVICE REQUESTS MODULE - TYPE DEFINITIONS
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

export interface ServiceRequest {
  service_request_id: ID
  account_user_id: ID
  service_type: string
  description: string
  photo_url?: string
  status: ServiceRequestStatus
  admin_notes?: string
  created_at: Timestamp
  updated_at?: Timestamp
}

// ============================================================================
// DOMAIN ENUMS
// ============================================================================

export type ServiceRequestStatus =
  | 'PENDING'
  | 'REVIEWING'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED'

// ============================================================================
// INPUT TYPES
// ============================================================================

export interface CreateServiceRequestInput {
  account_user_id: ID
  service_type: string
  description: string
  photo_url?: string
}

// ============================================================================
// GATE CHECK RESULT
// ============================================================================

export interface ServiceRequestGateResult {
  allowed: boolean
  reason?: string
}

// ============================================================================
// WIZARD PREFILL (from feasibility wizard result)
// ============================================================================

export interface WizardPrefillData {
  recommendation: string
  stone_variety?: string
  stone_species?: string
  feasibility_percent: number
  weight_loss: string
}
