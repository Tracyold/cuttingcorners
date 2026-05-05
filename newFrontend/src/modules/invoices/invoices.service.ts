/**
 * INVOICES MODULE - SERVICE LAYER
 *
 * RULES:
 * - ALL business logic lives here
 * - Validation, status rules, calculations
 * - Call data layer only — NO direct Supabase
 * - NO UI logic
 */

import {
  getInvoices,
  getInvoiceById,
  getInvoicesByUser,
  getInvoiceSummaryForUser,
  getInvoiceWithLineItems,
  createInvoice,
  createInvoicePayment,
  updateInvoice,
  updateInvoiceStatus,
  softDeleteInvoice,
} from './invoices.data'
import type {
  Invoice,
  InvoiceCreateInput,
  InvoiceUpdateInput,
  InvoiceFilters,
  InvoiceSortOptions,
  InvoiceWithLineItems,
  InvoiceSummary,
  InvoicePaymentInput,
  InvoiceStatus,
} from './invoices.types'
import type { ID } from '@/src/types/common'

// ============================================================================
// VALIDATION
// ============================================================================

function validateCreateInput(input: InvoiceCreateInput): void {
  if (!input.account_user_id) throw new Error('Account user ID is required')
  if (input.total_amount == null || input.total_amount < 0) {
    throw new Error('Total amount must be zero or greater')
  }
  if (input.due_date) {
    const due = new Date(input.due_date)
    if (isNaN(due.getTime())) throw new Error('Invalid due date')
  }
}

function validatePaymentInput(invoice: Invoice, input: InvoicePaymentInput): void {
  if (input.amount <= 0) throw new Error('Payment amount must be greater than 0')
  if (input.amount > invoice.total_amount) {
    throw new Error('Payment amount cannot exceed invoice total')
  }
  if (invoice.status !== 'sent' && invoice.status !== 'overdue') {
    throw new Error('Can only record payments for sent or overdue invoices')
  }
}

// ============================================================================
// READ OPERATIONS
// ============================================================================

export async function getInvoicesService(
  filters?: InvoiceFilters,
  sort?: InvoiceSortOptions
): Promise<Invoice[]> {
  const defaultSort: InvoiceSortOptions = { field: 'issued_date', direction: 'desc' }
  return getInvoices(filters, sort ?? defaultSort)
}

export async function getInvoiceByIdService(id: ID): Promise<Invoice> {
  if (!id) throw new Error('Invoice ID is required')

  const invoice = await getInvoiceById(id)

  // Auto-update to overdue if past due date
  if (
    invoice.status === 'sent' &&
    invoice.due_date &&
    new Date(invoice.due_date) < new Date()
  ) {
    await updateInvoiceStatus(id, 'overdue')
    return { ...invoice, status: 'overdue' as InvoiceStatus }
  }

  return invoice
}

export async function getInvoicesByUserService(userId: ID): Promise<Invoice[]> {
  if (!userId) throw new Error('User ID is required')
  return getInvoicesByUser(userId)
}

export async function getInvoiceSummaryService(userId: ID): Promise<InvoiceSummary> {
  if (!userId) throw new Error('User ID is required')

  const invoices = await getInvoicesByUser(userId)

  return {
    total_invoices: invoices.length,
    total_amount: invoices.reduce((s, inv) => s + Number(inv.total_amount), 0),
    paid_amount: invoices
      .filter(inv => inv.status === 'paid')
      .reduce((s, inv) => s + Number(inv.total_amount), 0),
    pending_amount: invoices
      .filter(inv => inv.status === 'pending' || inv.status === 'sent')
      .reduce((s, inv) => s + Number(inv.total_amount), 0),
    overdue_amount: invoices
      .filter(inv => inv.status === 'overdue')
      .reduce((s, inv) => s + Number(inv.total_amount), 0),
  }
}

export async function getInvoiceWithLineItemsService(id: ID): Promise<InvoiceWithLineItems> {
  if (!id) throw new Error('Invoice ID is required')
  return getInvoiceWithLineItems(id)
}

// ============================================================================
// CREATE OPERATIONS
// ============================================================================

export async function createInvoiceService(
  input: InvoiceCreateInput,
  userId: ID
): Promise<Invoice> {
  validateCreateInput(input)

  const invoiceData: Omit<Invoice, 'invoice_id' | 'created_at' | 'updated_at'> = {
    account_user_id: input.account_user_id,
    total_amount: input.total_amount,
    status: 'pending',
    due_date: input.due_date,
    issued_date: new Date().toISOString().split('T')[0],
    notes: input.notes,
  }

  return createInvoice(invoiceData)
}

export async function recordPaymentService(
  input: InvoicePaymentInput,
  userId: ID
): Promise<Invoice> {
  if (!input.invoice_id) throw new Error('Invoice ID is required')

  const invoice = await getInvoiceById(input.invoice_id)
  validatePaymentInput(invoice, input)

  await createInvoicePayment({
    ...input,
    created_by: userId,
  })

  return updateInvoiceStatus(invoice.invoice_id, 'paid')
}

// ============================================================================
// UPDATE OPERATIONS
// ============================================================================

export async function updateInvoiceService(
  id: ID,
  input: InvoiceUpdateInput
): Promise<Invoice> {
  if (!id) throw new Error('Invoice ID is required')

  const invoice = await getInvoiceById(id)

  if (invoice.status !== 'draft' && invoice.status !== 'pending') {
    throw new Error('Can only update draft or pending invoices')
  }

  return updateInvoice(id, {
    ...input,
    updated_at: new Date().toISOString(),
  })
}

export async function cancelInvoiceService(id: ID): Promise<Invoice> {
  if (!id) throw new Error('Invoice ID is required')

  const invoice = await getInvoiceById(id)
  if (invoice.status === 'paid') throw new Error('Cannot cancel a paid invoice')

  return updateInvoiceStatus(id, 'cancelled')
}

// ============================================================================
// DELETE OPERATIONS
// ============================================================================

export async function deleteInvoiceService(id: ID): Promise<void> {
  if (!id) throw new Error('Invoice ID is required')

  const invoice = await getInvoiceById(id)
  if (invoice.status !== 'draft') {
    throw new Error('Can only delete draft invoices. Use cancel for others.')
  }

  await softDeleteInvoice(id)
}
