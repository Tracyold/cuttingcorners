// frontend/handlers/csvExportHandler.ts
//
// Reusable handler for exporting data into CSV files.
// Cloned from inline patterns in:
//   - 1InvoiceList.ts — invoice data formatting
//   - 1WorkOrderList.ts — work order data formatting
//   - 1InquiryList.ts — inquiry data formatting
//   - useAdminUserDetail.ts — admin user data aggregation
//   - useAccountData (useAccountInfo.ts) — account data aggregation
//
// This handler provides CSV export for all major data types.

import { formatMoney, fmtDate } from '../lib/utils'

// ── Types ──────────────────────────────────────────────────────────────────

export interface CsvColumn {
  header: string
  key: string
  formatter?: (value: any, row: any) => string
}

// ── Core CSV builder ───────────────────────────────────────────────────────

/**
 * Convert an array of objects to a CSV string.
 * Generic utility used by all export functions below.
 */
export function buildCsv(rows: any[], columns: CsvColumn[]): string {
  const header = columns.map(c => `"${c.header}"`).join(',')
  const body = rows.map(row =>
    columns.map(c => {
      const raw = c.formatter ? c.formatter(row[c.key], row) : row[c.key]
      const val = raw == null ? '' : String(raw).replace(/"/g, '""')
      return `"${val}"`
    }).join(',')
  ).join('\n')

  return header + '\n' + body
}

// ── Trigger CSV download ───────────────────────────────────────────────────

/**
 * Trigger a browser download of a CSV string.
 * Exact from inline download patterns.
 */
export function downloadCsv(csvContent: string, filename: string): void {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

// ── Invoice CSV export ─────────────────────────────────────────────────────

/**
 * Export invoices to CSV.
 * Columns match the inline invoice list display patterns from 1InvoiceList.ts.
 */
export const INVOICE_CSV_COLUMNS: CsvColumn[] = [
  { header: 'Invoice ID',   key: 'invoice_id' },
  { header: 'Item',         key: 'line_items', formatter: (v) => v?.[0]?.title || 'Product' },
  { header: 'Amount',       key: 'total_amount', formatter: (v) => formatMoney(v) },
  { header: 'Paid Date',    key: 'paid_at', formatter: (v) => v ? fmtDate(v) : '--' },
  { header: 'Status',       key: 'invoice_state', formatter: (v) => v || 'PAID' },
]

export function exportInvoicesCsv(invoices: any[], filename = 'invoices.csv'): void {
  const csv = buildCsv(invoices, INVOICE_CSV_COLUMNS)
  downloadCsv(csv, filename)
}

// ── Work Order CSV export ──────────────────────────────────────────────────

/**
 * Export work orders to CSV.
 * Columns match the inline work order list display patterns from 1WorkOrderList.ts.
 */
export const WORK_ORDER_CSV_COLUMNS: CsvColumn[] = [
  { header: 'Work Order ID', key: 'work_order_id' },
  { header: 'Status',        key: 'status' },
  { header: 'Description',   key: 'description' },
  { header: 'Price',         key: 'estimated_price', formatter: (v) => v != null ? formatMoney(v) : '' },
  { header: 'Created',       key: 'created_at', formatter: (v) => v ? fmtDate(v) : '' },
]

export function exportWorkOrdersCsv(workOrders: any[], filename = 'work-orders.csv'): void {
  const csv = buildCsv(workOrders, WORK_ORDER_CSV_COLUMNS)
  downloadCsv(csv, filename)
}

// ── Inquiry CSV export ─────────────────────────────────────────────────────

/**
 * Export inquiries to CSV.
 * Columns match the inline inquiry list display patterns from 1InquiryList.ts.
 */
export const INQUIRY_CSV_COLUMNS: CsvColumn[] = [
  { header: 'Inquiry ID',  key: 'account_inquiry_id' },
  { header: 'Product',     key: 'products', formatter: (v) => v?.title || 'Unknown' },
  { header: 'Message',     key: 'message' },
  { header: 'Reply',       key: 'admin_reply' },
  { header: 'Status',      key: 'status' },
  { header: 'Created',     key: 'created_at', formatter: (v) => v ? fmtDate(v) : '' },
]

export function exportInquiriesCsv(inquiries: any[], filename = 'inquiries.csv'): void {
  const csv = buildCsv(inquiries, INQUIRY_CSV_COLUMNS)
  downloadCsv(csv, filename)
}

// ── Service Request CSV export ─────────────────────────────────────────────

/**
 * Export service requests to CSV.
 */
export const SERVICE_REQUEST_CSV_COLUMNS: CsvColumn[] = [
  { header: 'Request ID',  key: 'service_request_id' },
  { header: 'Type',        key: 'type' },
  { header: 'Description', key: 'description' },
  { header: 'Status',      key: 'status' },
  { header: 'Created',     key: 'created_at', formatter: (v) => v ? fmtDate(v) : '' },
]

export function exportServiceRequestsCsv(serviceRequests: any[], filename = 'service-requests.csv'): void {
  const csv = buildCsv(serviceRequests, SERVICE_REQUEST_CSV_COLUMNS)
  downloadCsv(csv, filename)
}
