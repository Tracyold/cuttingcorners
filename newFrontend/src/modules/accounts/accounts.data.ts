/**
 * ACCOUNTS MODULE - DATA LAYER
 *
 * RULES:
 * - ONLY Supabase queries
 * - NO business logic
 * - NO validation
 * - Return raw data only
 */

import { supabase, withTimeout, TIMEOUT_MS } from '@/src/lib/supabase'
import type {
  AccountUser,
  AccountUserUpdateInput,
  SmsPreferences,
  AdminInfo,
} from './accounts.types'
import type { ID } from '@/src/types/common'

// ============================================================================
// READ OPERATIONS
// ============================================================================

export async function getAccountUser(userId: ID): Promise<AccountUser> {
  const { data, error } = await withTimeout(
    supabase
      .from('account_users')
      .select('*')
      .eq('account_user_id', userId)
      .single(),
    TIMEOUT_MS.REQUEST,
    'getAccountUser'
  )
  if (error) throw error
  return data as AccountUser
}

export async function getSmsPreferences(userId: ID): Promise<SmsPreferences | null> {
  const { data, error } = await withTimeout(
    supabase
      .from('user_sms_preferences')
      .select('*')
      .eq('user_id', userId)
      .single(),
    TIMEOUT_MS.REQUEST,
    'getSmsPreferences'
  )
  if (error && error.code !== 'PGRST116') throw error
  return (data as SmsPreferences | null)
}

export async function getAdminInfo(): Promise<AdminInfo | null> {
  const { data, error } = await withTimeout(
    supabase
      .from('admin_users')
      .select('business_name, full_name, address, phone, contact_email')
      .single(),
    TIMEOUT_MS.REQUEST,
    'getAdminInfo'
  )
  if (error && error.code !== 'PGRST116') throw error
  return (data as AdminInfo | null)
}

// ============================================================================
// UPDATE OPERATIONS
// ============================================================================

export async function updateAccountUser(
  userId: ID,
  updates: AccountUserUpdateInput
): Promise<AccountUser> {
  const { data, error } = await withTimeout(
    supabase
      .from('account_users')
      .update(updates)
      .eq('account_user_id', userId)
      .select()
      .single(),
    TIMEOUT_MS.REQUEST,
    'updateAccountUser'
  )
  if (error) throw error
  return data as AccountUser
}

export async function upsertSmsPreferences(
  userId: ID,
  phone: string,
  column: string,
  value: boolean
): Promise<void> {
  const { error } = await withTimeout(
    supabase
      .from('user_sms_preferences')
      .upsert(
        { user_id: userId, phone, [column]: value },
        { onConflict: 'user_id' }
      ),
    TIMEOUT_MS.REQUEST,
    'upsertSmsPreferences'
  )
  if (error) throw error
}

export async function updateSmsPhone(userId: ID, phone: string): Promise<void> {
  const { error } = await withTimeout(
    supabase
      .from('user_sms_preferences')
      .update({ phone })
      .eq('user_id', userId),
    TIMEOUT_MS.REQUEST,
    'updateSmsPhone'
  )
  if (error) throw error
}

// ============================================================================
// DELETE OPERATIONS
// ============================================================================

export async function deleteAccountRpc(userId: ID): Promise<void> {
  const { error } = await withTimeout(
    supabase.rpc('delete_account', { user_id: userId }),
    TIMEOUT_MS.REQUEST,
    'deleteAccountRpc'
  )
  if (error) throw error
}
