// frontend/handlers/formatHandler.ts
//
// Reusable formatting handler.
// Re-exports and extends the formatting utilities from lib/utils.ts.
// The same formatting patterns are duplicated across:
//   - 1Dashboard.ts (getGreeting, getDateLabel, getFirstName)
//   - 1ChatView.ts (formatMessageDate, formatMessageTime)
//   - 1InvoiceList.ts (formatInvoiceAmount, formatInvoiceDate)
//   - 1WorkOrderList.ts (getFormattedPrice, getFormattedDate)
//   - 1WorkOrderDetail.ts (getDetailRows, getFormattedPrice)
//   - 1WizardResultsTab.ts (formatRowDate, getStoneLabel)
//   - 1WizardResultsModal.ts (formatResultDate)
//   - 1InquiryList.ts (formatInquiryDate, getProductSpecLine)
//
// This handler provides a single import for all formatting needs.

import { formatMoney, fmtDate, fmtTime, relativeTime } from '../lib/utils'

// ── Re-exports from lib/utils ──────────────────────────────────────────────

export { formatMoney, fmtDate, fmtTime, relativeTime }

// ── Date formatting ────────────────────────────────────────────────────────

/**
 * Format a date for chat message dividers (Today / Yesterday / full date).
 * Exact from 1ChatView.ts formatMessageDate().
 */
export function formatChatDate(iso: string): string {
  const d = new Date(iso)
  const today = new Date()
  const yesterday = new Date()
  yesterday.setDate(today.getDate() - 1)
  if (d.toDateString() === today.toDateString()) return 'Today'
  if (d.toDateString() === yesterday.toDateString()) return 'Yesterday'
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

/**
 * Format a date for wizard result rows (short format).
 * Exact from 1WizardResultsTab.ts formatRowDate().
 */
export function formatShortDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

/**
 * Format a date for wizard result detail modal (long format with time).
 * Exact from 1WizardResultsModal.ts formatResultDate().
 */
export function formatLongDateTime(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// ── Greeting ───────────────────────────────────────────────────────────────

/**
 * Get a time-of-day greeting.
 * Exact from 1Dashboard.ts getGreeting().
 */
export function getGreeting(): string {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 18) return 'Good afternoon'
  return 'Good evening'
}

/**
 * Get the current date as a readable label.
 * Exact from 1Dashboard.ts getDateLabel().
 */
export function getDateLabel(): string {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Extract first name from a profile.
 * Exact from 1Dashboard.ts getFirstName().
 */
export function getFirstName(profile: any): string {
  return profile?.name?.split(' ')[0] || 'there'
}

// ── Product / gem formatting ───────────────────────────────────────────────

/**
 * Build a spec line for an inquiry product (e.g. "2.5ct · Oval · $1,200").
 * Exact from 1InquiryList.ts getProductSpecLine().
 */
export function formatProductSpecLine(product: {
  weight?: number | null
  shape?: string | null
  total_price?: number | null
}): string {
  return [
    product.weight ? `${product.weight}ct` : null,
    product.shape ?? null,
    product.total_price ? `$${Number(product.total_price).toLocaleString()}` : null,
  ]
    .filter(Boolean)
    .join(' · ')
}

/**
 * Build a stone label from wizard result fields.
 * Exact from 1WizardResultsTab.ts getStoneLabel().
 */
export function getStoneLabel(result: {
  stone_variety?: string | null
  stone_species?: string | null
}): string {
  return [result.stone_variety, result.stone_species].filter(Boolean).join(' ') || 'Unnamed stone'
}

// ── Price formatting ───────────────────────────────────────────────────────

/**
 * Format a price for display, returning null if no price.
 * Exact from 1WorkOrderList.ts and 1WorkOrderDetail.ts getFormattedPrice().
 */
export function formatPrice(value: number | null | undefined): string | null {
  if (value == null) return null
  return formatMoney(value)
}

/**
 * Format a price with "Price on request" fallback.
 * Exact from 1ShopList.ts formatPrice().
 */
export function formatPriceOrRequest(value: number | null | undefined): string {
  if (typeof value !== 'number' || Number.isNaN(value)) return 'Price on request'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}
