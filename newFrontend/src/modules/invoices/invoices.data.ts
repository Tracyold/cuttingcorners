/**
 * INVOICES MODULE - DATA LAYER
 * 
 * RULES:
 * - ONLY Supabase queries
 * - NO business logic
 * - NO validation
 * - NO transformations beyond minimal mapping
 * - Return raw or minimally shaped data
 */

import { createClient } from 'frontend/lib/supabase/server'
import type {
  Invoice,
  InvoiceWithCustomer,
  InvoiceWithLineItems,
  InvoiceLineItem,
  InvoiceCreateInput,
  InvoiceUpdateInput,
  InvoiceFilters,
  InvoiceSortOptions,
  InvoicePayment,
  InvoicePaymentInput,
  InvoiceSummary,
} from './invoices.types'
import type { ID } from '@/types/common'

// ============================================================================
// READ OPERATIONS
// ============================================================================

/**
 * Get all invoices with optional filtering and sorting
 */
export async function getInvoices(
  filters?: InvoiceFilters,
  sort?: InvoiceSortOptions
): Promise<Invoice[]> {
  const supabase = createClient()
  
  let query = supabase
    .from('invoices')
    .select('*')
  
  // Apply filters
  if (filters?.status) {
    if (Array.isArray(filters.status)) {
      query = query.in('status', filters.status)
    } else {
      query = query.eq('status', filters.status)
    }
  }
  
  if (filters?.customer_id) {
    query = query.eq('customer_id', filters.customer_id)
  }
  
  if (filters?.date_from) {
    query = query.gte('issued_date', filters.date_from)
  }
  
  if (filters?.date_to) {
    query = query.lte('issued_date', filters.date_to)
  }
  
  if (filters?.min_amount) {
    query = query.gte('total', filters.min_amount)
  }
  
  if (filters?.max_amount) {
    query = query.lte('total', filters.max_amount)
  }
  
  if (filters?.search) {
    query = query.or(`invoice_number.ilike.%${filters.search}%,notes.ilike.%${filters.search}%`)
  }
  
  // Apply sorting
  if (sort) {
    query = query.order(sort.field, { ascending: sort.direction === 'asc' })
  } else {
    query = query.order('created_at', { ascending: false })
  }
  
  const { data, error } = await query
  
  if (error) throw error
  return data as Invoice[]
}

/**
 * Get single invoice by ID
 */
export async function getInvoiceById(id: ID): Promise<Invoice> {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('invoices')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) throw error
  return data as Invoice
}

/**
 * Get invoice with customer details
 */
export async function getInvoiceWithCustomer(id: ID): Promise<InvoiceWithCustomer> {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('invoices')
    .select(`
      *,
      customer:customers(name, email)
    `)
    .eq('id', id)
    .single()
  
  if (error) throw error
  
  return {
    ...data,
    customer_name: data.customer.name,
    customer_email: data.customer.email,
  } as InvoiceWithCustomer
}

/**
 * Get invoice with line items
 */
export async function getInvoiceWithLineItems(id: ID): Promise<InvoiceWithLineItems> {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('invoices')
    .select(`
      *,
      line_items:invoice_line_items(*)
    `)
    .eq('id', id)
    .single()
  
  if (error) throw error
  return data as InvoiceWithLineItems
}

/**
 * Get invoices by customer ID
 */
export async function getInvoicesByCustomer(customerId: ID): Promise<Invoice[]> {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('invoices')
    .select('*')
    .eq('customer_id', customerId)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data as Invoice[]
}

/**
 * Get overdue invoices
 */
export async function getOverdueInvoices(): Promise<Invoice[]> {
  const supabase = createClient()
  
  const today = new Date().toISOString().split('T')[0]
  
  const { data, error } = await supabase
    .from('invoices')
    .select('*')
    .eq('status', 'sent')
    .lt('due_date', today)
  
  if (error) throw error
  return data as Invoice[]
}

/**
 * Get invoice summary statistics
 */
export async function getInvoiceSummary(filters?: InvoiceFilters): Promise<InvoiceSummary> {
  const supabase = createClient()
  
  let query = supabase
    .from('invoices')
    .select('total, status')
  
  // Apply same filters as getInvoices
  if (filters?.customer_id) {
    query = query.eq('customer_id', filters.customer_id)
  }
  
  if (filters?.date_from) {
    query = query.gte('issued_date', filters.date_from)
  }
  
  if (filters?.date_to) {
    query = query.lte('issued_date', filters.date_to)
  }
  
  const { data, error } = await query
  
  if (error) throw error
  
  // Calculate totals (minimal processing only)
  const summary: InvoiceSummary = {
    total_invoices: data.length,
    total_amount: data.reduce((sum, inv) => sum + inv.total, 0),
    paid_amount: data
      .filter(inv => inv.status === 'paid')
      .reduce((sum, inv) => sum + inv.total, 0),
    pending_amount: data
      .filter(inv => inv.status === 'pending' || inv.status === 'sent')
      .reduce((sum, inv) => sum + inv.total, 0),
    overdue_amount: data
      .filter(inv => inv.status === 'overdue')
      .reduce((sum, inv) => sum + inv.total, 0),
  }
  
  return summary
}

// ============================================================================
// CREATE OPERATIONS
// ============================================================================

/**
 * Create new invoice
 */
export async function createInvoice(
  invoice: Omit<Invoice, 'id' | 'created_at' | 'updated_at'>
): Promise<Invoice> {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('invoices')
    .insert(invoice)
    .select()
    .single()
  
  if (error) throw error
  return data as Invoice
}

/**
 * Create invoice line items
 */
export async function createInvoiceLineItems(
  lineItems: Omit<InvoiceLineItem, 'id' | 'created_at'>[]
): Promise<InvoiceLineItem[]> {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('invoice_line_items')
    .insert(lineItems)
    .select()
  
  if (error) throw error
  return data as InvoiceLineItem[]
}

/**
 * Record invoice payment
 */
export async function createInvoicePayment(
  payment: Omit<InvoicePayment, 'id' | 'created_at'>
): Promise<InvoicePayment> {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('invoice_payments')
    .insert(payment)
    .select()
    .single()
  
  if (error) throw error
  return data as InvoicePayment
}

// ============================================================================
// UPDATE OPERATIONS
// ============================================================================

/**
 * Update invoice
 */
export async function updateInvoice(
  id: ID,
  updates: Partial<Invoice>
): Promise<Invoice> {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('invoices')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data as Invoice
}

/**
 * Update invoice status
 */
export async function updateInvoiceStatus(
  id: ID,
  status: Invoice['status']
): Promise<Invoice> {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('invoices')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data as Invoice
}

// ============================================================================
// DELETE OPERATIONS
// ============================================================================

/**
 * Delete invoice (soft delete - set status to cancelled)
 */
export async function deleteInvoice(id: ID): Promise<void> {
  const supabase = createClient()
  
  const { error } = await supabase
    .from('invoices')
    .update({ status: 'cancelled', updated_at: new Date().toISOString() })
    .eq('id', id)
  
  if (error) throw error
}

/**
 * Hard delete invoice line item
 */
export async function deleteInvoiceLineItem(id: ID): Promise<void> {
  const supabase = createClient()
  
  const { error } = await supabase
    .from('invoice_line_items')
    .delete()
    .eq('id', id)
  
  if (error) throw error
}