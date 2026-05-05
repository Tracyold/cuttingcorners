/**
 * SERVICE REQUESTS MODULE - SERVICE LAYER
 *
 * RULES:
 * - ALL business logic lives here
 * - Gate checks, input validation, wizard prefill building
 * - Call data layer only — NO direct Supabase
 * - NO UI logic
 */

import {
  getServiceRequestsByUser,
  getSmsOptInForUser,
  insertServiceRequest,
  notifyAdminOfServiceRequest,
} from './service_requests.data'
import type {
  ServiceRequest,
  CreateServiceRequestInput,
  ServiceRequestGateResult,
  WizardPrefillData,
} from './service_requests.types'
import type { ID } from '@/src/types/common'

// ============================================================================
// VALIDATION
// ============================================================================

const VALID_SERVICE_TYPES = [
  'cleaning',
  'repair',
  'polishing',
  'fabrication',
  'restoration',
  'assessment',
  'other',
] as const

type ServiceType = typeof VALID_SERVICE_TYPES[number]

function validateServiceType(serviceType: string): asserts serviceType is ServiceType {
  if (!VALID_SERVICE_TYPES.includes(serviceType as ServiceType) && serviceType.trim() === '') {
    throw new Error('Service type is required')
  }
}

function validateDescription(description: string): void {
  if (!description || description.trim().length < 10) {
    throw new Error('Description must be at least 10 characters')
  }
}

// ============================================================================
// READ OPERATIONS
// ============================================================================

export async function getServiceRequestsByUserService(userId: ID): Promise<ServiceRequest[]> {
  if (!userId) throw new Error('User ID is required')
  return getServiceRequestsByUser(userId)
}

// ============================================================================
// GATE CHECK
// Validates user has phone and SMS opt-in before allowing SR submission.
// ============================================================================

export async function checkServiceRequestGateService(
  userId: ID
): Promise<ServiceRequestGateResult> {
  const prefs = await getSmsOptInForUser(userId)

  if (!prefs?.phone || !prefs.opt_in_work_orders) {
    return {
      allowed: false,
      reason:
        'To submit a service request you must have a phone number on file and work order SMS notifications enabled.',
    }
  }

  return { allowed: true }
}

// ============================================================================
// CREATE OPERATIONS
// ============================================================================

export async function createServiceRequestService(
  input: CreateServiceRequestInput
): Promise<ServiceRequest> {
  if (!input.account_user_id) throw new Error('User ID is required')
  validateServiceType(input.service_type)
  validateDescription(input.description)

  // Gate check before inserting
  const gate = await checkServiceRequestGateService(input.account_user_id)
  if (!gate.allowed) throw new Error(gate.reason)

  const created = await insertServiceRequest(input)

  notifyAdminOfServiceRequest(input.account_user_id).catch(() => undefined)

  return created
}

// ============================================================================
// WIZARD PREFILL BUILDER
// Builds a CreateServiceRequestInput from a wizard result.
// ============================================================================

export function buildWizardPrefill(
  userId: ID,
  result: WizardPrefillData
): CreateServiceRequestInput {
  const stone = [result.stone_variety, result.stone_species].filter(Boolean).join(' ')
  const description = [
    stone ? `Stone: ${stone}` : '',
    `Wizard Score: ${Math.round(result.feasibility_percent)}%`,
    `Recommendation: ${result.recommendation}`,
    `Weight Loss Estimate: ${result.weight_loss}`,
  ]
    .filter(Boolean)
    .join('\n')

  return {
    account_user_id: userId,
    service_type: result.recommendation ?? 'other',
    description,
  }
}
