/**
 * INVOICES MODULE - SERVICE LAYER
 * 
 * RULES:
 * - ALL business logic lives here
 * - Validation rules
 * - Authorization checks
 * - Transformations
 * - Conditional logic
 * - MUST call data layer only (NO direct Supabase)
 * - MUST NOT contain UI logic
 */

import {
  getInvoices,
  getInvoiceById,
  getInvoiceWithCustomer,
  getInvoiceWithLineItems,
  getInvoicesByCustomer,
  getOverdueInvoices,
  getInvoiceSummary,
  createInvoice,
  createInvoiceLineItems,
  createInvoicePayment,
  updateInvoice,
  updateInvoiceStatus,
  deleteInvoice,
  deleteInvoiceLineItem,
} from './invoices.data'
import type {
  Invoice,
  InvoiceCreateInput,
  InvoiceUpdateInput,
  InvoiceFilters,
  InvoiceSortOptions,
  InvoiceWithCustomer,
  InvoiceWithLineItems,
  InvoiceSummary,
  InvoiceLineItemInput,
  InvoicePaymentInput,
  InvoiceStatus,
} from './invoices.types'
import type { ID } from './types/common'

// ============================================================================
// VALIDATION HELPERS
// ============================================================================

function validateInvoiceCreateInput(input: InvoiceCreateInput): void {
  if (!input.customer_id) {
    throw new Error('Customer ID is required')
  }
  
  if (!input.due_date) {
    throw new Error('Due date is required')
  }
  
  if (!input.line_items || input.line_items.length === 0) {
    throw new Error('Invoice must have at least one line item')
  }
  
  // Validate due date is in the future
  const dueDate = new Date(input.due_date)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  if (dueDate < today) {
    throw new Error('Due date must be in the future')
  }
  
  // Validate line items
  input.line_items.forEach((item, index) => {
    if (!item.description || item.description.trim() === '') {
      throw new Error(`Line item ${index + 1}: Description is required`)
    }
    
    if (item.quantity <= 0) {
      throw new Error(`Line item ${index + 1}: Quantity must be greater than 0`)
    }
    
    if (item.unit_price < 0) {
      throw new Error(`Line item ${index + 1}: Unit price cannot be negative`)
    }
  })
}

function validateInvoiceUpdateInput(input: InvoiceUpdateInput): void {
  if (input.due_date) {
    const dueDate = new Date(input.due_date)
    if (isNaN(dueDate.getTime())) {
      throw new Error('Invalid due date format')
    }
  }
}

function validatePaymentAmount(invoice: Invoice, paymentAmount: number): void {
  if (paymentAmount <= 0) {
    throw new Error('Payment amount must be greater than 0')
  }
  
  if (paymentAmount > invoice.total) {
    throw new Error('Payment amount cannot exceed invoice total')
  }
}

// ============================================================================
// CALCULATION HELPERS
// ============================================================================

function calculateLineItemTotals(item: InvoiceLineItemInput) {
  const subtotal = item.quantity * item.unit_price
  const taxRate = item.tax_rate || 0
  const taxAmount = subtotal * (taxRate / 100)
  const total = subtotal + taxAmount
  
  return {
    subtotal: Number(subtotal.toFixed(2)),
    tax_amount: Number(taxAmount.toFixed(2)),
    total: Number(total.toFixed(2)),
  }
}

function calculateInvoiceTotals(lineItems: InvoiceLineItemInput[]) {
  const totals = lineItems.map(calculateLineItemTotals)
  
  const amount = totals.reduce((sum, item) => sum + item.subtotal, 0)
  const tax = totals.reduce((sum, item) => sum + item.tax_amount, 0)
  const total = totals.reduce((sum, item) => sum + item.total, 0)
  
  return {
    amount: Number(amount.toFixed(2)),
    tax: Number(tax.toFixed(2)),
    total: Number(total.toFixed(2)),
  }
}

function generateInvoiceNumber(): string {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
  
  return `INV-${year}${month}-${random}`
}

// ============================================================================
// READ OPERATIONS WITH BUSINESS LOGIC
// ============================================================================

export async function getInvoicesService(
  filters?: InvoiceFilters,
  sort?: InvoiceSortOptions
): Promise<Invoice[]> {
  // Business logic: Apply default sorting if not provided
  const defaultSort: InvoiceSortOptions = {
    field: 'issued_date',
    direction: 'desc',
  }
  
  return getInvoices(filters, sort || defaultSort)
}

export async function getInvoiceServiceById(id: ID): Promise<Invoice> {
  if (!id) {
    throw new Error('Invoice ID is required')
  }
  
  const invoice = await getInvoiceById(id)
  
  // Business logic: Check if invoice needs status update
  if (invoice.status === 'sent' && new Date(invoice.due_date) < new Date()) {
    // Update to overdue
    await updateInvoiceStatus(id, 'overdue')
    invoice.status = 'overdue'
  }
  
  return invoice
}

export async function getInvoiceWithCustomerService(id: ID): Promise<InvoiceWithCustomer> {
  if (!id) {
    throw new Error('Invoice ID is required')
  }
  
  return getInvoiceWithCustomer(id)
}

export async function getInvoiceWithLineItemsService(id: ID): Promise<InvoiceWithLineItems> {
  if (!id) {
    throw new Error('Invoice ID is required')
  }
  
  return getInvoiceWithLineItems(id)
}

export async function getInvoicesByCustomerService(customerId: ID): Promise<Invoice[]> {
  if (!customerId) {
    throw new Error('Customer ID is required')
  }
  
  return getInvoicesByCustomer(customerId)
}

export async function getOverdueInvoicesService(): Promise<Invoice[]> {
  // Business logic: Also update any sent invoices that are now overdue
  const overdueInvoices = await getOverdueInvoices()
  
  // Update statuses in parallel
  await Promise.all(
    overdueInvoices.map(invoice => 
      invoice.status !== 'overdue' 
        ? updateInvoiceStatus(invoice.id, 'overdue')
        : Promise.resolve()
    )
  )
  
  return overdueInvoices.map(inv => ({ ...inv, status: 'overdue' as InvoiceStatus }))
}

export async function getInvoiceSummaryService(filters?: InvoiceFilters): Promise<InvoiceSummary> {
  return getInvoiceSummary(filters)
}

// ============================================================================
// CREATE OPERATIONS WITH BUSINESS LOGIC
// ============================================================================

export async function createInvoiceService(
  input: InvoiceCreateInput,
  userId: ID
): Promise<InvoiceWithLineItems> {
  // Validation
  validateInvoiceCreateInput(input)
  
  // Business logic: Calculate totals
  const { amount, tax, total } = calculateInvoiceTotals(input.line_items)
  
  // Business logic: Generate invoice number
  const invoiceNumber = generateInvoiceNumber()
  
  // Business logic: Set issued date to today
  const issuedDate = new Date().toISOString().split('T')[0]
  
  // Prepare invoice data
  const invoiceData: Omit<Invoice, 'id' | 'created_at' | 'updated_at'> = {
    invoice_number: invoiceNumber,
    customer_id: input.customer_id,
    amount,
    tax,
    total,
    status: 'draft',
    due_date: input.due_date,
    issued_date: issuedDate,
    created_by: userId,
  }
  
  // Create invoice
  const invoice = await createInvoice(invoiceData)
  
  // Prepare line items
  const lineItemsData = input.line_items.map(item => {
    const { subtotal, total } = calculateLineItemTotals(item)
    
    return {
      invoice_id: invoice.id,
      description: item.description,
      quantity: item.quantity,
      unit_price: item.unit_price,
      subtotal,
      tax_rate: item.tax_rate || 0,
      total,
    }
  })
  
  // Create line items
  const lineItems = await createInvoiceLineItems(lineItemsData)
  
  return {
    ...invoice,
    line_items: lineItems,
  }
}

export async function sendInvoiceService(
  id: ID,
  userId: ID
): Promise<Invoice> {
  // Validation
  if (!id) {
    throw new Error('Invoice ID is required')
  }
  
  const invoice = await getInvoiceById(id)
  
  // Business logic: Can only send draft invoices
  if (invoice.status !== 'draft') {
    throw new Error('Can only send invoices in draft status')
  }
  
  // Business logic: Update status to sent
  return updateInvoiceStatus(id, 'sent')
}

export async function recordPaymentService(
  input: InvoicePaymentInput,
  userId: ID
): Promise<Invoice> {
  // Validation
  if (!input.invoice_id) {
    throw new Error('Invoice ID is required')
  }
  
  if (!input.amount || input.amount <= 0) {
    throw new Error('Payment amount must be greater than 0')
  }
  
  const invoice = await getInvoiceById(input.invoice_id)
  
  // Business logic: Can only pay sent or overdue invoices
  if (invoice.status !== 'sent' && invoice.status !== 'overdue') {
    throw new Error('Can only record payments for sent or overdue invoices')
  }
  
  // Business logic: Validate payment amount
  validatePaymentAmount(invoice, input.amount)
  
  // Record payment
  await createInvoicePayment({
    ...input,
    created_by: userId,
  })
  
  // Business logic: Update invoice status to paid
  return updateInvoiceStatus(invoice.id, 'paid')
}

// ============================================================================
// UPDATE OPERATIONS WITH BUSINESS LOGIC
// ============================================================================

export async function updateInvoiceService(
  id: ID,
  input: InvoiceUpdateInput,
  userId: ID
): Promise<Invoice> {
  // Validation
  if (!id) {
    throw new Error('Invoice ID is required')
  }
  
  validateInvoiceUpdateInput(input)
  
  const invoice = await getInvoiceById(id)
  
  // Business logic: Can only update draft invoices
  if (invoice.status !== 'draft') {
    throw new Error('Can only update invoices in draft status')
  }
  
  // Prepare updates
  const updates: Partial<Invoice> = {
    ...input,
    updated_at: new Date().toISOString(),
  }
  
  return updateInvoice(id, updates)
}

export async function cancelInvoiceService(
  id: ID,
  userId: ID
): Promise<Invoice> {
  // Validation
  if (!id) {
    throw new Error('Invoice ID is required')
  }
  
  const invoice = await getInvoiceById(id)
  
  // Business logic: Cannot cancel paid invoices
  if (invoice.status === 'paid') {
    throw new Error('Cannot cancel paid invoices. Use refund instead.')
  }
  
  return updateInvoiceStatus(id, 'cancelled')
}

export async function refundInvoiceService(
  id: ID,
  userId: ID
): Promise<Invoice> {
  // Validation
  if (!id) {
    throw new Error('Invoice ID is required')
  }
  
  const invoice = await getInvoiceById(id)
  
  // Business logic: Can only refund paid invoices
  if (invoice.status !== 'paid') {
    throw new Error('Can only refund paid invoices')
  }
  
  return updateInvoiceStatus(id, 'refunded')
}

// ============================================================================
// DELETE OPERATIONS WITH BUSINESS LOGIC
// ============================================================================

export async function deleteInvoiceService(
  id: ID,
  userId: ID
): Promise<void> {
  // Validation
  if (!id) {
    throw new Error('Invoice ID is required')
  }
  
  const invoice = await getInvoiceById(id)
  
  // Business logic: Can only delete draft invoices
  if (invoice.status !== 'draft') {
    throw new Error('Can only delete invoices in draft status. Use cancel instead.')
  }
  
  await deleteInvoice(id)
}