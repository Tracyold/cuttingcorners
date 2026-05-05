/**
 * INVOICES MODULE - DATA LAYER
 *
 * RULES:
 * - ONLY Supabase queries
 * - NO business logic
 * - NO validation
 * - Return raw data only
 */

import { supabase, withTimeout, TIMEOUT_MS } from '@/src/lib/supabase'
import type {
  Invoice,
  InvoiceWithLineItems,
  InvoiceLineItem,
  InvoiceFilters,
  InvoiceSortOptions,
  InvoicePayment,
  InvoiceSummary,
} from './invoices.types'
import type { ID } from '@/src/types/common'

// ============================================================================
// READ OPERATIONS
// ============================================================================

export async function getInvoices(
  filters?: InvoiceFilters,
  sort?: InvoiceSortOptions
): Promise<Invoice[]> {
  let query = supabase.from('invoices').select('*')

  if (filters?.status) {
    if (Array.isArray(filters.status)) {
      query = query.in('status', filters.status)
    } else {
      query = query.eq('status', filters.status)
    }
  }

  if (filters?.account_user_id) {
    query = query.eq('account_user_id', filters.account_user_id)
  }

  if (filters?.date_from) {
    query = query.gte('issued_date', filters.date_from)
  }

  if (filters?.date_to) {
    query = query.lte('issued_date', filters.date_to)
  }

  if (filters?.min_amount) {
    query = query.gte('total_amount', filters.min_amount)
  }

  if (filters?.max_amount) {
    query = query.lte('total_amount', filters.max_amount)
  }

  if (sort) {
    query = query.order(sort.field, { ascending: sort.direction === 'asc' })
  } else {
    query = query.order('created_at', { ascending: false })
  }

  const { data, error } = await withTimeout(
    query,
    TIMEOUT_MS.REQUEST,
    'getInvoices'
  )
  if (error) throw error
  return data as Invoice[]
}

export async function getInvoiceById(id: ID): Promise<Invoice> {
  const { data, error } = await withTimeout(
    supabase.from('invoices').select('*').eq('invoice_id', id).single(),
    TIMEOUT_MS.REQUEST,
    'getInvoiceById'
  )
  if (error) throw error
  return data as Invoice
}

export async function getInvoicesByUser(userId: ID): Promise<Invoice[]> {
  const { data, error } = await withTimeout(
    supabase
      .from('invoices')
      .select('*')
      .eq('account_user_id', userId)
      .order('paid_at', { ascending: false }),
    TIMEOUT_MS.REQUEST,
    'getInvoicesByUser'
  )
  if (error) throw error
  return data as Invoice[]
}

export async function getInvoiceSummaryForUser(userId: ID): Promise<{
  count: number
  total: number
}> {
  const { data, error } = await withTimeout(
    supabase
      .from('invoices')
      .select('invoice_id, total_amount')
      .eq('account_user_id', userId),
    TIMEOUT_MS.REQUEST,
    'getInvoiceSummaryForUser'
  )
  if (error) throw error
  const rows = data as Array<{ invoice_id: ID; total_amount: number }>
  return {
    count: rows.length,
    total: rows.reduce((s, row) => s + Number(row.total_amount || 0), 0),
  }
}

export async function getInvoiceWithLineItems(id: ID): Promise<InvoiceWithLineItems> {
  const { data, error } = await withTimeout(
    supabase
      .from('invoices')
      .select('*, invoice_line_items(*)')
      .eq('invoice_id', id)
      .single(),
    TIMEOUT_MS.REQUEST,
    'getInvoiceWithLineItems'
  )
  if (error) throw error
  return data as unknown as InvoiceWithLineItems
}

export async function getInvoicePayments(invoiceId: ID): Promise<InvoicePayment[]> {
  const { data, error } = await withTimeout(
    supabase
      .from('invoice_payments')
      .select('*')
      .eq('invoice_id', invoiceId)
      .order('payment_date', { ascending: false }),
    TIMEOUT_MS.REQUEST,
    'getInvoicePayments'
  )
  if (error) throw error
  return data as InvoicePayment[]
}

// ============================================================================
// CREATE OPERATIONS
// ============================================================================

export async function createInvoice(
  invoice: Omit<Invoice, 'invoice_id' | 'created_at' | 'updated_at'>
): Promise<Invoice> {
  const { data, error } = await withTimeout(
    supabase.from('invoices').insert(invoice).select().single(),
    TIMEOUT_MS.REQUEST,
    'createInvoice'
  )
  if (error) throw error
  return data as Invoice
}

export async function createInvoiceLineItems(
  items: Omit<InvoiceLineItem, 'id' | 'created_at'>[]
): Promise<InvoiceLineItem[]> {
  const { data, error } = await withTimeout(
    supabase.from('invoice_line_items').insert(items).select(),
    TIMEOUT_MS.REQUEST,
    'createInvoiceLineItems'
  )
  if (error) throw error
  return data as InvoiceLineItem[]
}

export async function createInvoicePayment(
  payment: Omit<InvoicePayment, 'id' | 'created_at'>
): Promise<InvoicePayment> {
  const { data, error } = await withTimeout(
    supabase.from('invoice_payments').insert(payment).select().single(),
    TIMEOUT_MS.REQUEST,
    'createInvoicePayment'
  )
  if (error) throw error
  return data as InvoicePayment
}

// ============================================================================
// UPDATE OPERATIONS
// ============================================================================

export async function updateInvoice(
  id: ID,
  updates: Partial<Invoice>
): Promise<Invoice> {
  const { data, error } = await withTimeout(
    supabase
      .from('invoices')
      .update(updates)
      .eq('invoice_id', id)
      .select()
      .single(),
    TIMEOUT_MS.REQUEST,
    'updateInvoice'
  )
  if (error) throw error
  return data as Invoice
}

export async function updateInvoiceStatus(
  id: ID,
  status: Invoice['status']
): Promise<Invoice> {
  const { data, error } = await withTimeout(
    supabase
      .from('invoices')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('invoice_id', id)
      .select()
      .single(),
    TIMEOUT_MS.REQUEST,
    'updateInvoiceStatus'
  )
  if (error) throw error
  return data as Invoice
}

// ============================================================================
// DELETE OPERATIONS
// ============================================================================

export async function softDeleteInvoice(id: ID): Promise<void> {
  const { error } = await withTimeout(
    supabase
      .from('invoices')
      .update({ status: 'cancelled', updated_at: new Date().toISOString() })
      .eq('invoice_id', id),
    TIMEOUT_MS.REQUEST,
    'softDeleteInvoice'
  )
  if (error) throw error
}
