/**
 * INVOICES MODULE - ACTIONS LAYER
 *
 * RULES:
 * - Thin wrappers ONLY — no business logic
 * - UI entry points that call the service layer
 * - 'use server' for Next.js server actions
 */

'use server'

import {
  getInvoicesService,
  getInvoiceByIdService,
  getInvoicesByUserService,
  getInvoiceSummaryService,
  getInvoiceWithLineItemsService,
  createInvoiceService,
  recordPaymentService,
  updateInvoiceService,
  cancelInvoiceService,
  deleteInvoiceService,
} from './invoices.service'
import type {
  Invoice,
  InvoiceCreateInput,
  InvoiceUpdateInput,
  InvoiceFilters,
  InvoiceSortOptions,
  InvoiceWithLineItems,
  InvoiceSummary,
  InvoicePaymentInput,
} from './invoices.types'
import type { ID } from '@/src/types/common'

async function getCurrentUserId(): Promise<ID> {
  // Wire to auth module when session is available
  // import { getAccountSessionAction } from '@/src/modules/auth/auth.actions'
  // const session = await getAccountSessionAction()
  // return session?.user.id ?? ''
  return ''
}

export async function getInvoicesAction(
  filters?: InvoiceFilters,
  sort?: InvoiceSortOptions
): Promise<Invoice[]> {
  return getInvoicesService(filters, sort)
}

export async function getInvoiceAction(id: ID): Promise<Invoice> {
  return getInvoiceByIdService(id)
}

export async function getInvoicesByUserAction(userId: ID): Promise<Invoice[]> {
  return getInvoicesByUserService(userId)
}

export async function getInvoiceSummaryAction(userId: ID): Promise<InvoiceSummary> {
  return getInvoiceSummaryService(userId)
}

export async function getInvoiceWithLineItemsAction(id: ID): Promise<InvoiceWithLineItems> {
  return getInvoiceWithLineItemsService(id)
}

export async function createInvoiceAction(
  input: InvoiceCreateInput
): Promise<Invoice> {
  const userId = await getCurrentUserId()
  return createInvoiceService(input, userId)
}

export async function recordPaymentAction(
  input: InvoicePaymentInput
): Promise<Invoice> {
  const userId = await getCurrentUserId()
  return recordPaymentService(input, userId)
}

export async function updateInvoiceAction(
  id: ID,
  input: InvoiceUpdateInput
): Promise<Invoice> {
  return updateInvoiceService(id, input)
}

export async function cancelInvoiceAction(id: ID): Promise<Invoice> {
  return cancelInvoiceService(id)
}

export async function deleteInvoiceAction(id: ID): Promise<void> {
  return deleteInvoiceService(id)
}
