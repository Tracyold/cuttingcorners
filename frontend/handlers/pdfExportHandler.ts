// frontend/handlers/pdfExportHandler.ts
//
// Reusable handler for exporting data into PDF templates.
// Cloned from inline patterns in:
//   - pages/api/export/invoice.ts — invoice PDF generation endpoint
//   - lib/pdf/generateInvoicePDF.ts — invoice PDF pipeline
//   - lib/pdf/templates/invoice.ts — invoice HTML template
//   - lib/pdf/templates/work-order.ts — work order HTML template
//   - components/account/mobile/drawers/3InvoiceDrawer.tsx — inline PDF-style view
//
// This handler provides a unified interface for PDF export operations.

import { supabase } from '../lib/supabase'

// ── Types ──────────────────────────────────────────────────────────────────

export interface PdfExportResult {
  success: boolean
  url?: string
  error?: string
}

export interface InvoicePdfData {
  invoice_id: string
  invoice_number: string
  paid_at: string | null
  total_amount: number
  line_items: any[]
  account_snapshot: any
}

export interface WorkOrderPdfData {
  work_order_id: string
  status: string
  estimated_price: number | null
  description: string
  created_at: string
  account_user_id: string
}

// ── Fetch invoice data for PDF ─────────────────────────────────────────────

/**
 * Fetch full invoice data needed for PDF generation.
 * Exact from lib/pdf/generateInvoicePDF.ts — fetch step.
 */
export async function fetchInvoiceForPdf(invoiceId: string): Promise<InvoicePdfData | null> {
  const { data, error } = await supabase
    .from('invoices')
    .select('*')
    .eq('invoice_id', invoiceId)
    .single()

  if (error || !data) return null
  return data
}

// ── Fetch work order data for PDF ──────────────────────────────────────────

/**
 * Fetch full work order data needed for PDF generation.
 * Exact from work order detail patterns.
 */
export async function fetchWorkOrderForPdf(workOrderId: string): Promise<WorkOrderPdfData | null> {
  const { data, error } = await supabase
    .from('work_orders')
    .select('*')
    .eq('work_order_id', workOrderId)
    .single()

  if (error || !data) return null
  return data
}

// ── Request invoice PDF via API ────────────────────────────────────────────

/**
 * Request invoice PDF generation via the /api/export/invoice endpoint.
 * Exact from inline fetch calls in invoice drawer/detail components.
 */
export async function requestInvoicePdf(invoiceId: string): Promise<PdfExportResult> {
  try {
    const res = await fetch('/api/export/invoice', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ invoice_id: invoiceId }),
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'PDF generation failed' }))
      return { success: false, error: err.error }
    }

    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    return { success: true, url }
  } catch {
    return { success: false, error: 'PDF generation failed' }
  }
}

// ── Download PDF blob ──────────────────────────────────────────────────────

/**
 * Trigger a browser download from a blob URL.
 * Exact from inline download patterns in drawer components.
 */
export function downloadPdfBlob(blobUrl: string, filename: string): void {
  const a = document.createElement('a')
  a.href = blobUrl
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(blobUrl)
}

// ── Build invoice PDF filename ─────────────────────────────────────────────

/**
 * Build a filename for an invoice PDF.
 * Exact from inline patterns in invoice components.
 */
export function buildInvoicePdfFilename(invoiceId: string, invoiceNumber?: string): string {
  return `invoice-${invoiceNumber || invoiceId}.pdf`
}

// ── Build work order PDF filename ──────────────────────────────────────────

/**
 * Build a filename for a work order PDF.
 */
export function buildWorkOrderPdfFilename(workOrderId: string): string {
  return `work-order-${workOrderId}.pdf`
}
