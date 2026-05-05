/**
 * SERVICE REQUESTS MODULE - ACTIONS LAYER
 *
 * RULES:
 * - Thin wrappers ONLY — no business logic
 * - UI entry points that call the service layer
 * - 'use server' for Next.js server actions
 */

'use server'

import {
  getServiceRequestsByUserService,
  checkServiceRequestGateService,
  createServiceRequestService,
  buildWizardPrefill,
} from './service_requests.service'
import type {
  ServiceRequest,
  CreateServiceRequestInput,
  ServiceRequestGateResult,
  WizardPrefillData,
} from './service_requests.types'
import type { ID } from '@/src/types/common'

export async function getServiceRequestsByUserAction(userId: ID): Promise<ServiceRequest[]> {
  return getServiceRequestsByUserService(userId)
}

export async function checkServiceRequestGateAction(
  userId: ID
): Promise<ServiceRequestGateResult> {
  return checkServiceRequestGateService(userId)
}

export async function createServiceRequestAction(
  input: CreateServiceRequestInput
): Promise<ServiceRequest> {
  return createServiceRequestService(input)
}

export async function buildWizardPrefillAction(
  userId: ID,
  result: WizardPrefillData
): Promise<CreateServiceRequestInput> {
  return buildWizardPrefill(userId, result)
}
