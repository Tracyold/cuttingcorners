/**
 * ACCOUNTS MODULE - TYPE DEFINITIONS
 *
 * Covers: account_users, user_sms_preferences, admin_users, account deletion.
 *
 * RULES:
 * - Domain-specific types ONLY
 * - Import shared primitives from @/src/types/common
 * - NO runtime code, NO functions
 */

import type { ID, Timestamp } from '@/src/types/common'

// ============================================================================
// ACCOUNT USER
// ============================================================================

export interface AccountUser {
  account_user_id: ID
  name: string
  email: string
  phone?: string
  shipping_address?: string
  business_name?: string
  created_at: Timestamp
  updated_at?: Timestamp
}

export interface AccountUserUpdateInput {
  name?: string
  email?: string
  phone?: string
  shipping_address?: string
  business_name?: string
}

// ============================================================================
// SMS PREFERENCES
// ============================================================================

export interface SmsPreferences {
  user_id: ID
  phone: string
  opt_in_work_orders: boolean
  opt_in_invoices: boolean
  opt_in_service_requests?: boolean
  created_at?: Timestamp
  updated_at?: Timestamp
}

export type SmsPreferenceColumn = keyof Pick<
  SmsPreferences,
  'opt_in_work_orders' | 'opt_in_invoices' | 'opt_in_service_requests'
>

// ============================================================================
// ADMIN INFO (read-only snapshot for account dashboard)
// ============================================================================

export interface AdminInfo {
  business_name: string
  full_name: string
  address: string
  phone: string
  contact_email: string
}

// ============================================================================
// ACCOUNT SUMMARY (aggregated view)
// ============================================================================

export interface AccountSummary {
  profile: AccountUser
  smsPrefs: SmsPreferences | null
  adminInfo: AdminInfo | null
}

// ============================================================================
// DELETE ACCOUNT
// ============================================================================

export interface DeleteAccountResult {
  success: boolean
  error?: string
}
