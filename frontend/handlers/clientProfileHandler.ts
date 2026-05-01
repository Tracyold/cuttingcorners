// frontend/handlers/clientProfileHandler.ts
//
// Reusable handler for pulling client (account user) profile data.
// Cloned from inline patterns in:
//   - useAccountData (useAccountInfo.ts) — loadAll() profile + sms fetch
//   - useProfile (useProfile.ts) — saveProfile, toggleSms, hasProfileChanges
//   - profileHandler.ts — saveAccountProfile, toggleSmsPreference
//
// This handler focuses on READ operations for client profile data.
// Write operations remain in profileHandler.ts.

import { supabase } from '../lib/supabase'

// ── Types ──────────────────────────────────────────────────────────────────

export interface ClientProfile {
  account_user_id: string
  name: string
  email: string
  phone: string
  shipping_address: string
  business_name: string | null
  created_at: string
  status: string
  [key: string]: any
}

export interface ClientSmsPrefs {
  user_id: string
  phone: string
  opt_in_work_orders: boolean
  opt_in_chat: boolean
  opt_in_tracking: boolean
  opt_in_new_listings: boolean
  opt_in_purchases: boolean
  [key: string]: any
}

export interface ClientProfileData {
  profile: ClientProfile | null
  smsPrefs: ClientSmsPrefs | null
  error: string | null
}

// ── Fetch client profile ───────────────────────────────────────────────────

/**
 * Fetch a client's profile from account_users.
 * Exact from useAccountData loadAll() — profile fetch.
 */
export async function fetchClientProfile(userId: string): Promise<ClientProfile | null> {
  const { data } = await supabase
    .from('account_users')
    .select('*')
    .eq('account_user_id', userId)
    .single()

  return data ?? null
}

// ── Fetch client SMS preferences ───────────────────────────────────────────

/**
 * Fetch a client's SMS preferences.
 * Exact from useAccountData loadAll() — sms prefs fetch.
 */
export async function fetchClientSmsPrefs(userId: string): Promise<ClientSmsPrefs | null> {
  const { data } = await supabase
    .from('user_sms_preferences')
    .select('*')
    .eq('user_id', userId)
    .single()

  return data ?? null
}

// ── Fetch full client profile data ─────────────────────────────────────────

/**
 * Fetch both profile and SMS preferences in parallel.
 * Exact from useAccountData loadAll() — combined fetch.
 */
export async function fetchClientProfileData(userId: string): Promise<ClientProfileData> {
  const [{ data: profile, error: pErr }, { data: smsPrefs, error: sErr }] = await Promise.all([
    supabase.from('account_users').select('*').eq('account_user_id', userId).single(),
    supabase.from('user_sms_preferences').select('*').eq('user_id', userId).single(),
  ])

  return {
    profile: profile ?? null,
    smsPrefs: smsPrefs ?? null,
    error: pErr?.message || sErr?.message || null,
  }
}

// ── Detect profile changes ─────────────────────────────────────────────────

/**
 * Check if the edited profile differs from the current profile.
 * Exact from useProfile hasProfileChanges computed value.
 */
export function hasProfileChanges(current: any, edited: any): boolean {
  if (!current || !edited) return false
  return (
    edited.name !== current.name ||
    edited.email !== current.email ||
    edited.phone !== current.phone ||
    edited.shipping_address !== current.shipping_address ||
    edited.business_name !== current.business_name
  )
}

// ── Build profile diff ─────────────────────────────────────────────────────

/**
 * Build an object of only the changed fields.
 * Exact from useProfile saveProfile() — diff logic.
 */
export function buildProfileDiff(current: any, edited: any): Record<string, any> {
  const updates: Record<string, any> = {}
  if (edited.name !== current.name) updates.name = edited.name
  if (edited.email !== current.email) updates.email = edited.email
  if (edited.phone !== current.phone) updates.phone = edited.phone
  if (edited.shipping_address !== current.shipping_address)
    updates.shipping_address = edited.shipping_address
  if (edited.business_name !== current.business_name)
    updates.business_name = edited.business_name
  return updates
}
