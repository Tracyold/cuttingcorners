// frontend/handlers/snapshotHandler.ts
//
// Reusable handler for taking snapshots of data.
// Cloned from inline patterns in:
//   - 1InvoiceList.ts — AccountSnapshot type + invoice snapshot data
//   - pages/api/checkout/create-session.ts — account snapshot at checkout
//   - pages/api/webhooks/index.ts — account snapshot in webhook
//   - useAccountData (useAccountInfo.ts) — full account data snapshot
//   - useAdminUserDetail.ts — admin user detail snapshot
//
// A "snapshot" captures the current state of data at a point in time,
// used for invoices, receipts, and audit trails.

import { supabase } from '../lib/supabase'

// ── Types ──────────────────────────────────────────────────────────────────

export interface AccountSnapshot {
  name: string
  email: string
  phone: string
  shippingAddress: string
  businessName: string | null
}

export interface FullAccountSnapshot {
  profile: any
  invoiceCount: number
  invoiceTotal: number
  workOrderCount: number
  inquiryCount: number
  serviceRequestCount: number
  snapshotAt: string
}

export interface AdminUserSnapshot {
  user: any
  woCount: number
  invTotal: number
  inqCount: number
  srCount: number
  snapshotAt: string
}

// ── Build account snapshot ─────────────────────────────────────────────────

/**
 * Build an account snapshot from a profile object.
 * Exact from pages/api/checkout/create-session.ts — finalAccountSnapshot.
 */
export function buildAccountSnapshot(profile: any): AccountSnapshot {
  return {
    name: profile?.name || '',
    email: profile?.email || '',
    phone: profile?.phone || '',
    shippingAddress: profile?.shipping_address || '',
    businessName: profile?.business_name || null,
  }
}

// ── Parse account snapshot ─────────────────────────────────────────────────

/**
 * Parse an account snapshot from a JSON string.
 * Exact from pages/api/webhooks/index.ts — accountSnapshot parse.
 */
export function parseAccountSnapshot(json: string): AccountSnapshot {
  try {
    return JSON.parse(json || '{}')
  } catch {
    return { name: '', email: '', phone: '', shippingAddress: '', businessName: null }
  }
}

// ── Take full account data snapshot ────────────────────────────────────────

/**
 * Take a snapshot of all account data for a user.
 * Exact from useAccountData loadAll() — aggregated counts.
 */
export async function takeAccountSnapshot(userId: string): Promise<FullAccountSnapshot> {
  const [
    { data: profile },
    { data: invoices },
    { data: workOrders },
    { data: inquiries },
    { data: serviceRequests },
  ] = await Promise.all([
    supabase.from('account_users').select('*').eq('account_user_id', userId).single(),
    supabase.from('invoices').select('invoice_id, total_amount').eq('account_user_id', userId),
    supabase.from('work_orders').select('work_order_id').eq('account_user_id', userId),
    supabase.from('account_inquiries').select('account_inquiry_id').eq('account_user_id', userId),
    supabase.from('service_requests').select('service_request_id').eq('account_user_id', userId),
  ])

  return {
    profile: profile ?? null,
    invoiceCount: invoices?.length || 0,
    invoiceTotal: invoices?.reduce((s: number, i: any) => s + Number(i.total_amount || 0), 0) || 0,
    workOrderCount: workOrders?.length || 0,
    inquiryCount: inquiries?.length || 0,
    serviceRequestCount: serviceRequests?.length || 0,
    snapshotAt: new Date().toISOString(),
  }
}

// ── Take admin user detail snapshot ────────────────────────────────────────

/**
 * Take a snapshot of admin user detail data.
 * Exact from useAdminUserDetail loadAll() — aggregated counts.
 */
export async function takeAdminUserSnapshot(userId: string): Promise<AdminUserSnapshot> {
  const [
    { data: user },
    { data: workOrders },
    { data: invoices },
    { data: inquiries },
    { data: serviceRequests },
  ] = await Promise.all([
    supabase.from('account_users').select('*').eq('account_user_id', userId).single(),
    supabase.from('work_orders').select('work_order_id').eq('account_user_id', userId),
    supabase.from('invoices').select('total_amount').eq('account_user_id', userId),
    supabase.from('account_inquiries').select('account_inquiry_id').eq('account_user_id', userId),
    supabase.from('service_requests').select('service_request_id').eq('account_user_id', userId),
  ])

  return {
    user: user ?? null,
    woCount: workOrders?.length || 0,
    invTotal: invoices?.reduce((s: number, i: any) => s + Number(i.total_amount || 0), 0) || 0,
    inqCount: inquiries?.length || 0,
    srCount: serviceRequests?.length || 0,
    snapshotAt: new Date().toISOString(),
  }
}
