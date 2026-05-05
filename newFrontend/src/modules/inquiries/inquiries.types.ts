/**
 * INQUIRIES MODULE - TYPE DEFINITIONS
 *
 * Covers: account_inquiries (user submits product inquiries, admin replies).
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

export interface Inquiry {
  account_inquiry_id: ID
  account_user_id: ID
  product_id?: ID
  message: string
  admin_reply?: string
  replied_at?: Timestamp
  created_at: Timestamp
  updated_at?: Timestamp
}

// ============================================================================
// JOINED VIEW (with product info)
// ============================================================================

export interface InquiryProduct {
  title: string
  weight?: string
  shape?: string
  total_price?: number
}

export interface InquiryWithProduct extends Inquiry {
  products?: InquiryProduct
}

// ============================================================================
// INPUT TYPES
// ============================================================================

export interface CreateInquiryInput {
  account_user_id: ID
  product_id?: ID
  message: string
}

// ============================================================================
// FILTER TYPES
// ============================================================================

export interface InquiryFilters {
  account_user_id?: ID
  has_reply?: boolean
}
