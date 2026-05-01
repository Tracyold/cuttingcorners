// frontend/handlers/profileHandler.ts
//
// Reusable profile + SMS preferences handler.
// Profile save and SMS toggle logic is duplicated across:
//   - useProfile (account side: saveProfile, toggleSms)
//   - useDeleteAccount (account side: deleteAccount)
//   - useAdminDashboard (admin side: saveAll for admin_users)
//
// This handler extracts the shared DB mutations.

import { supabase } from '../lib/supabase'

// ── Types ──────────────────────────────────────────────────────────────────

export interface ProfileUpdates {
  name?: string
  email?: string
  phone?: string
  shipping_address?: string
  business_name?: string
  [key: string]: any
}

export interface SaveProfileResult {
  success: boolean
  updates: ProfileUpdates
  error?: string
}

// ── Save account user profile ──────────────────────────────────────────────

/**
 * Save changed profile fields for an account user.
 * Also syncs phone to user_sms_preferences if changed.
 * Exact from useProfile.saveProfile().
 */
export async function saveAccountProfile(
  userId: string,
  currentProfile: any,
  editedProfile: any,
): Promise<SaveProfileResult> {
  const updates: ProfileUpdates = {}

  if (editedProfile.name !== currentProfile.name) updates.name = editedProfile.name
  if (editedProfile.email !== currentProfile.email) updates.email = editedProfile.email
  if (editedProfile.phone !== currentProfile.phone) updates.phone = editedProfile.phone
  if (editedProfile.shipping_address !== currentProfile.shipping_address)
    updates.shipping_address = editedProfile.shipping_address
  if (editedProfile.business_name !== currentProfile.business_name)
    updates.business_name = editedProfile.business_name

  if (Object.keys(updates).length === 0) {
    return { success: true, updates }
  }

  const { error } = await supabase
    .from('account_users')
    .update(updates)
    .eq('account_user_id', userId)

  if (error) return { success: false, updates, error: error.message }

  // Sync phone to SMS preferences if changed
  if (updates.phone) {
    await supabase
      .from('user_sms_preferences')
      .update({ phone: updates.phone })
      .eq('user_id', userId)
  }

  return { success: true, updates }
}

// ── Toggle SMS preference ──────────────────────────────────────────────────

/**
 * Toggle a single SMS preference column.
 * Exact from useProfile.toggleSms().
 */
export async function toggleSmsPreference(
  userId: string,
  phone: string,
  column: string,
  value: boolean,
): Promise<{ error: string | null }> {
  const { error } = await supabase
    .from('user_sms_preferences')
    .upsert(
      { user_id: userId, phone: phone || '', [column]: value },
      { onConflict: 'user_id' },
    )

  return { error: error?.message ?? null }
}

// ── Delete account ─────────────────────────────────────────────────────────

/**
 * Soft-delete a user account via the delete_account RPC.
 * Exact from useDeleteAccount.deleteAccount().
 */
export async function deleteAccount(userId: string): Promise<{ error: string | null }> {
  const { error } = await supabase.rpc('delete_account', { user_id: userId })
  return { error: error?.message ?? null }
}

// ── Restore account (admin) ────────────────────────────────────────────────

/**
 * Restore a soft-deleted account via the restore_account RPC.
 * Exact from useAdminUsers.restoreAccount().
 */
export async function restoreAccount(userId: string): Promise<{ error: string | null }> {
  const { error } = await supabase.rpc('restore_account', { user_id: userId })
  return { error: error?.message ?? null }
}

// ── Save admin profile ─────────────────────────────────────────────────────

/**
 * Save admin user profile fields.
 * Exact from useAdminDashboard.saveAll().
 */
export async function saveAdminProfile(
  adminUserId: string,
  updates: Record<string, string>,
): Promise<{ error: string | null }> {
  const { error } = await supabase
    .from('admin_users')
    .update(updates)
    .eq('admin_user_id', adminUserId)

  return { error: error?.message ?? null }
}

// ── Admin SMS notification config ──────────────────────────────────────────

/**
 * Toggle an admin notification config field.
 * Exact from useAdminDashboard.saveSmsToggle().
 */
export async function toggleAdminSmsConfig(
  configId: string,
  field: string,
  value: boolean,
): Promise<{ error: string | null }> {
  const { error } = await supabase
    .from('admin_notification_config')
    .update({ [field]: value })
    .eq('id', configId)

  return { error: error?.message ?? null }
}
