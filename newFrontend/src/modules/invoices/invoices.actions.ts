/**
 * INVOICES MODULE - ACTIONS LAYER
 * 
 * RULES:
 * - Thin wrappers ONLY
 * - Entry points for UI
 * - MUST call service layer only
 * - NO business logic
 * - NO validation (done in service)
 * - NO data access (done in data layer)
 */

'use server'

import {
  getInvoicesService,
  getInvoiceServiceById,
  getInvoiceWithCustomerService,
  getInvoiceWithLineItemsService,
  getInvoicesByCustomerService,
  getOverdueInvoicesService,
  getInvoiceSummaryService,
  createInvoiceService,
  sendInvoiceService,
  recordPaymentService,
  updateInvoiceService,
  cancelInvoiceService,
  refundInvoiceService,
  deleteInvoiceService,
} from './invoices.service'
import type {
  Invoice,
  InvoiceCreateInput,
  InvoiceUpdateInput,
  InvoiceFilters,
  InvoiceSortOptions,
  InvoiceWithCustomer,
  InvoiceWithLineItems,
  InvoiceSummary,
  InvoicePaymentInput,
} from './invoices.types'
import type { ID } from '../../types/common'

// ============================================================================
// HELPER: Get User ID from Session
// ============================================================================

async function getCurrentUserId(): Promise<ID> {
  // TODO: Implement session/auth logic
  // For now, return placeholder
  // import { getServerSession } from '@/lib/auth'
  // const session = await getServerSession()
  // return session.user.id
  
  return 'user_placeholder_id'
}

// ============================================================================
// READ ACTIONS
// ============================================================================

export async function getInvoicesAction(
  filters?: InvoiceFilters,
  sort?: InvoiceSortOptions
): Promise<Invoice[]> {
  return getInvoicesService(filters, sort)
}

export async function getInvoiceAction(id: ID): Promise<Invoice> {
  return getInvoiceServiceById(id)
}

export async function getInvoiceWithCustomerAction(id: ID): Promise<InvoiceWithCustomer> {
  return getInvoiceWithCustomerService(id)
}

export async function getInvoiceWithLineItemsAction(id: ID): Promise<InvoiceWithLineItems> {
  return getInvoiceWithLineItemsService(id)
}

export async function getInvoicesByCustomerAction(customerId: ID): Promise<Invoice[]> {
  return getInvoicesByCustomerService(customerId)
}

export async function getOverdueInvoicesAction(): Promise<Invoice[]> {
  return getOverdueInvoicesService()
}

export async function getInvoiceSummaryAction(filters?: InvoiceFilters): Promise<InvoiceSummary> {
  return getInvoiceSummaryService(filters)
}

// ============================================================================
// CREATE ACTIONS
// ============================================================================

export async function createInvoiceAction(
  input: InvoiceCreateInput
): Promise<InvoiceWithLineItems> {
  const userId = await getCurrentUserId()
  return createInvoiceService(input, userId)
}

export async function sendInvoiceAction(id: ID): Promise<Invoice> {
  const userId = await getCurrentUserId()
  return sendInvoiceService(id, userId)
}

export async function recordPaymentAction(
  input: InvoicePaymentInput
): Promise<Invoice> {
  const userId = await getCurrentUserId()
  return recordPaymentService(input, userId)
}

// ============================================================================
// UPDATE ACTIONS
// ============================================================================

export async function updateInvoiceAction(
  id: ID,
  input: InvoiceUpdateInput
): Promise<Invoice> {
  const userId = await getCurrentUserId()
  return updateInvoiceService(id, input, userId)
}

export async function cancelInvoiceAction(id: ID): Promise<Invoice> {
  const userId = await getCurrentUserId()
  return cancelInvoiceService(id, userId)
}

export async function refundInvoiceAction(id: ID): Promise<Invoice> {
  const userId = await getCurrentUserId()
  return refundInvoiceService(id, userId)
}

// ============================================================================
// DELETE ACTIONS
// ============================================================================

export async function deleteInvoiceAction(id: ID): Promise<void> {
  const userId = await getCurrentUserId()
  return deleteInvoiceService(id, userId)
}

// ============================================================================
// COMPOUND ACTIONS (orchestrate multiple service calls)
// ============================================================================

/**
 * Create and immediately send invoice
 */
export async function createAndSendInvoiceAction(
  input: InvoiceCreateInput
): Promise<Invoice> {
  const userId = await getCurrentUserId()
  
  // Create invoice
  const invoice = await createInvoiceService(input, userId)
  
  // Send it
  return sendInvoiceService(invoice.id, userId)
}

/**
 * Get customer's invoice summary
 */
export async function getCustomerInvoiceSummaryAction(customerId: ID): Promise<{
  invoices: Invoice[]
  summary: InvoiceSummary
}> {
  const invoices = await getInvoicesByCustomerService(customerId)
  const summary = await getInvoiceSummaryService({ customer_id: customerId })
  
  return {
    invoices,
    summary,
  }
}