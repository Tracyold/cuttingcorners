/**
 * INQUIRIES MODULE - ACTIONS LAYER
 *
 * RULES:
 * - Thin wrappers ONLY — no business logic
 * - UI entry points that call the service layer
 * - 'use server' for Next.js server actions
 */

'use server'

import {
  getInquiriesByUserService,
  getInquiryByIdService,
  getRepliedInquiriesService,
  createInquiryService,
} from './inquiries.service'
import type {
  Inquiry,
  InquiryWithProduct,
  CreateInquiryInput,
} from './inquiries.types'
import type { ID } from '@/src/types/common'

export async function getInquiriesByUserAction(userId: ID): Promise<InquiryWithProduct[]> {
  return getInquiriesByUserService(userId)
}

export async function getInquiryByIdAction(inquiryId: ID): Promise<Inquiry> {
  return getInquiryByIdService(inquiryId)
}

export async function getRepliedInquiriesAction(userId: ID): Promise<InquiryWithProduct[]> {
  return getRepliedInquiriesService(userId)
}

export async function createInquiryAction(
  input: CreateInquiryInput
): Promise<Inquiry> {
  return createInquiryService(input)
}
