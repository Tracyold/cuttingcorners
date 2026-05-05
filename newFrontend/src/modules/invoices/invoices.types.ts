/**
 * INVOICES MODULE - TYPE DEFINITIONS
 *
 * RULES:
 * - Domain-specific types ONLY
 * - Import shared primitives from @/src/types/common
 * - NO runtime code, NO functions
 */

import type { ID, Timestamp } from '@/src/types/common'

// ============================================================================
// CORE DOMAIN ENTITIES
// ============================================================================

export interface Invoice {
  invoice_id: ID
  account_user_id: ID
  invoice_number?: string
  total_amount: number
  status: InvoiceStatus
  paid_at?: Timestamp
  due_date?: string
  issued_date?: string
  notes?: string
  created_at: Timestamp
  updated_at?: Timestamp
}

export interface InvoiceLineItem {
  id: ID
  invoice_id: ID
  description: string
  quantity: number
  unit_price: number
  subtotal: number
  tax_rate: number
  total: number
  created_at: Timestamp
}

// ============================================================================
// DOMAIN ENUMS
// ============================================================================

export type InvoiceStatus =
  | 'draft'
  | 'pending'
  | 'sent'
  | 'paid'
  | 'overdue'
  | 'cancelled'
  | 'refunded'

export type PaymentMethod =
  | 'credit_card'
  | 'bank_transfer'
  | 'cash'
  | 'check'
  | 'paypal'

// ============================================================================
// INPUT TYPES
// ============================================================================

export interface InvoiceCreateInput {
  account_user_id: ID
  total_amount: number
  due_date?: string
  notes?: string
}

export interface InvoiceUpdateInput {
  total_amount?: number
  status?: InvoiceStatus
  due_date?: string
  notes?: string
  paid_at?: Timestamp
}

export interface InvoiceLineItemInput {
  description: string
  quantity: number
  unit_price: number
  tax_rate?: number
}

// ============================================================================
// QUERY TYPES
// ============================================================================

export interface InvoiceFilters {
  status?: InvoiceStatus | InvoiceStatus[]
  account_user_id?: ID
  date_from?: string
  date_to?: string
  min_amount?: number
  max_amount?: number
}

export type InvoiceSortField = 'issued_date' | 'due_date' | 'total_amount' | 'status' | 'paid_at'

export interface InvoiceSortOptions {
  field: InvoiceSortField
  direction: 'asc' | 'desc'
}

// ============================================================================
// COMPUTED / VIEW TYPES
// ============================================================================

export interface InvoiceWithLineItems extends Invoice {
  line_items: InvoiceLineItem[]
}

export interface InvoiceSummary {
  total_invoices: number
  total_amount: number
  paid_amount: number
  pending_amount: number
  overdue_amount: number
}

// ============================================================================
// PAYMENT TYPES
// ============================================================================

export interface InvoicePayment {
  id: ID
  invoice_id: ID
  amount: number
  payment_method: PaymentMethod
  payment_date: string
  transaction_id?: string
  notes?: string
  created_at: Timestamp
  created_by: ID
}

export interface InvoicePaymentInput {
  invoice_id: ID
  amount: number
  payment_method: PaymentMethod
  payment_date: string
  transaction_id?: string
  notes?: string
}
