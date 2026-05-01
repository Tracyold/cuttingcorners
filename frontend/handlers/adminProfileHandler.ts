// frontend/handlers/adminProfileHandler.ts
//
// Reusable handler for pulling admin profile info.
// Cloned from inline patterns in:
//   - useAdminDashboard (useAdminDashboard.ts) — loadAll() admin fetch
//   - useAdminUserDetail (useAdminUserDetail.ts) — admin info fetch
//   - profileHandler.ts — saveAdminProfile, toggleAdminSmsConfig
//
// This handler focuses on READ operations for admin profile data.
// Write operations remain in profileHandler.ts.

import { supabase } from '../lib/supabase'

// ── Types ──────────────────────────────────────────────────────────────────

export interface AdminProfile {
  admin_user_id: string
  business_name: string
  full_name: string
  address: string
  phone: string
  contact_email: string
  email: string
  [key: string]: any
}

export interface AdminSmsConfig {
  id: string
  notify_purchase: boolean
  notify_chat: boolean
  notify_inquiry: boolean
  notify_work_order: boolean
  notify_service_request: boolean
  [key: string]: any
}

export interface AdminPhone {
  id: string
  phone: string
  label: string | null
  active: boolean
  created_at: string
}

export interface AdminDashboardStats {
  itemsSold: number
  shopRevenue: number
  woCompleted: number
  woRevenue: number
}

// ── Fetch admin profile ────────────────────────────────────────────────────

/**
 * Fetch the admin user profile by session.
 * Exact from useAdminDashboard loadAll() — admin fetch.
 */
export async function fetchAdminProfile(adminUserId: string): Promise<AdminProfile | null> {
  const { data } = await supabase
    .from('admin_users')
    .select('*')
    .eq('admin_user_id', adminUserId)
    .single()

  return data ?? null
}

/**
 * Fetch the admin user profile (single row, no filter).
 * Exact from useAdminUserDetail loadAll() — admin info fetch.
 */
export async function fetchAdminInfo(): Promise<AdminProfile | null> {
  const { data } = await supabase
    .from('admin_users')
    .select('*')
    .single()

  return data ?? null
}

/**
 * Fetch admin public-facing info (business name, contact, etc).
 * Exact from useAccountData loadAll() — admin info for client view.
 */
export async function fetchAdminPublicInfo(): Promise<Pick<AdminProfile, 'business_name' | 'full_name' | 'address' | 'phone' | 'contact_email'> | null> {
  const { data } = await supabase
    .from('admin_users')
    .select('business_name, full_name, address, phone, contact_email')
    .single()

  return data ?? null
}

// ── Fetch admin SMS config ─────────────────────────────────────────────────

/**
 * Fetch admin notification config.
 * Exact from useAdminDashboard loadAll() — smsData fetch.
 */
export async function fetchAdminSmsConfig(): Promise<AdminSmsConfig | null> {
  const { data } = await supabase
    .from('admin_notification_config')
    .select('*')
    .limit(1)
    .single()

  return data ?? null
}

// ── Fetch admin phones ─────────────────────────────────────────────────────

/**
 * Fetch all admin phone numbers.
 * Exact from useAdminDashboard loadAll() — phonesData fetch.
 */
export async function fetchAdminPhones(): Promise<AdminPhone[]> {
  const { data } = await supabase
    .from('admin_phones')
    .select('*')
    .order('created_at', { ascending: true })

  return data || []
}

// ── Fetch admin dashboard stats ────────────────────────────────────────────

/**
 * Fetch dashboard stats (items sold, revenue, WOs completed).
 * Exact from useAdminDashboard loadAll() — invoices + wos fetch.
 */
export async function fetchAdminDashboardStats(): Promise<AdminDashboardStats> {
  const [{ data: invoices }, { data: wos }] = await Promise.all([
    supabase.from('invoices').select('total_amount'),
    supabase.from('work_orders').select('estimated_price').eq('status', 'COMPLETED'),
  ])

  return {
    itemsSold: invoices?.length || 0,
    shopRevenue: invoices?.reduce((s: number, i: any) => s + Number(i.total_amount || 0), 0) || 0,
    woCompleted: wos?.length || 0,
    woRevenue: wos?.reduce((s: number, w: any) => s + Number(w.estimated_price || 0), 0) || 0,
  }
}

// ── Fetch full admin profile data ──────────────────────────────────────────

/**
 * Fetch all admin profile data in parallel (profile, sms config, phones, stats).
 * Exact from useAdminDashboard loadAll() — combined fetch.
 */
export async function fetchFullAdminData(adminUserId: string) {
  const [profile, smsConfig, phones, stats] = await Promise.all([
    fetchAdminProfile(adminUserId),
    fetchAdminSmsConfig(),
    fetchAdminPhones(),
    fetchAdminDashboardStats(),
  ])

  return { profile, smsConfig, phones, stats }
}
