/**
 * INVOICES MODULE - TYPE DEFINITIONS
 * 
 * RULES:
 * - Domain-specific types ONLY
 * - Import shared primitives from /types/
 * - NO runtime code
 * - NO functions
 */

import type { ID, Timestamp } from '@/types/common'

// ============================================================================
// CORE DOMAIN ENTITIES
// ============================================================================

export interface Invoice {
  id: ID
  invoice_number: string
  customer_id: ID
  amount: number
  tax: number
  total: number
  status: InvoiceStatus
  due_date: string
  issued_date: string
  created_at: Timestamp
  updated_at: Timestamp
  created_by: ID
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
// INPUT TYPES (FOR CREATION/UPDATE)
// ============================================================================

export interface InvoiceCreateInput {
  customer_id: ID
  due_date: string
  line_items: InvoiceLineItemInput[]
  notes?: string
  payment_terms?: string
}

export interface InvoiceUpdateInput {
  customer_id?: ID
  due_date?: string
  status?: InvoiceStatus
  notes?: string
  payment_terms?: string
}

export interface InvoiceLineItemInput {
  description: string
  quantity: number
  unit_price: number
  tax_rate?: number
}

// ============================================================================
// QUERY TYPES (FOR FILTERING/SEARCHING)
// ============================================================================

export interface InvoiceFilters {
  status?: InvoiceStatus | InvoiceStatus[]
  customer_id?: ID
  date_from?: string
  date_to?: string
  min_amount?: number
  max_amount?: number
  search?: string
}

export interface InvoiceSortOptions {
  field: 'invoice_number' | 'issued_date' | 'due_date' | 'total' | 'status'
  direction: 'asc' | 'desc'
}

// ============================================================================
// COMPUTED/VIEW TYPES
// ============================================================================

export interface InvoiceWithCustomer extends Invoice {
  customer_name: string
  customer_email: string
}

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