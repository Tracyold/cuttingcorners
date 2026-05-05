/**
 * INQUIRIES MODULE - DATA LAYER
 *
 * RULES:
 * - ONLY Supabase queries
 * - NO business logic
 * - NO validation
 * - Return raw data only
 */

import { supabase, withTimeout, TIMEOUT_MS } from '@/src/lib/supabase'
import type {
  Inquiry,
  InquiryWithProduct,
  CreateInquiryInput,
  InquiryFilters,
} from './inquiries.types'
import type { ID } from '@/src/types/common'

// ============================================================================
// READ OPERATIONS
// ============================================================================

export async function getInquiriesByUser(userId: ID): Promise<InquiryWithProduct[]> {
  const { data, error } = await withTimeout(
    supabase
      .from('account_inquiries')
      .select(`
        *,
        products (
          title,
          weight,
          shape,
          total_price
        )
      `)
      .eq('account_user_id', userId)
      .order('created_at', { ascending: false }),
    TIMEOUT_MS.REQUEST,
    'getInquiriesByUser'
  )
  if (error) throw error
  return data as InquiryWithProduct[]
}

export async function getInquiryById(inquiryId: ID): Promise<Inquiry> {
  const { data, error } = await withTimeout(
    supabase
      .from('account_inquiries')
      .select('*')
      .eq('account_inquiry_id', inquiryId)
      .single(),
    TIMEOUT_MS.REQUEST,
    'getInquiryById'
  )
  if (error) throw error
  return data as Inquiry
}

// ============================================================================
// CREATE OPERATIONS
// ============================================================================

export async function insertInquiry(input: CreateInquiryInput): Promise<Inquiry> {
  const { data, error } = await withTimeout(
    supabase
      .from('account_inquiries')
      .insert({
        account_user_id: input.account_user_id,
        product_id: input.product_id ?? null,
        message: input.message,
      })
      .select()
      .single(),
    TIMEOUT_MS.REQUEST,
    'insertInquiry'
  )
  if (error) throw error
  return data as Inquiry
}
