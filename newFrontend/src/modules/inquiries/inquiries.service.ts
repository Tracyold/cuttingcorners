/**
 * INQUIRIES MODULE - SERVICE LAYER
 *
 * RULES:
 * - ALL business logic lives here
 * - Input validation, reply detection
 * - Call data layer only — NO direct Supabase
 * - NO UI logic
 */

import {
  getInquiriesByUser,
  getInquiryById,
  insertInquiry,
} from './inquiries.data'
import type {
  Inquiry,
  InquiryWithProduct,
  CreateInquiryInput,
} from './inquiries.types'
import type { ID } from '@/src/types/common'

// ============================================================================
// VALIDATION
// ============================================================================

function validateCreateInput(input: CreateInquiryInput): void {
  if (!input.account_user_id) throw new Error('User ID is required')
  if (!input.message || input.message.trim().length < 5) {
    throw new Error('Inquiry message must be at least 5 characters')
  }
}

// ============================================================================
// READ OPERATIONS
// ============================================================================

export async function getInquiriesByUserService(userId: ID): Promise<InquiryWithProduct[]> {
  if (!userId) throw new Error('User ID is required')
  return getInquiriesByUser(userId)
}

export async function getInquiryByIdService(inquiryId: ID): Promise<Inquiry> {
  if (!inquiryId) throw new Error('Inquiry ID is required')
  return getInquiryById(inquiryId)
}

/**
 * Returns only inquiries that have received an admin reply.
 */
export async function getRepliedInquiriesService(userId: ID): Promise<InquiryWithProduct[]> {
  const all = await getInquiriesByUser(userId)
  return all.filter(inq => !!inq.admin_reply)
}

// ============================================================================
// CREATE OPERATIONS
// ============================================================================

export async function createInquiryService(
  input: CreateInquiryInput
): Promise<Inquiry> {
  validateCreateInput(input)
  return insertInquiry({
    ...input,
    message: input.message.trim(),
  })
}
