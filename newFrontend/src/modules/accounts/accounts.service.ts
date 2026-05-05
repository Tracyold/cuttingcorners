/**
 * ACCOUNTS MODULE - SERVICE LAYER
 *
 * RULES:
 * - ALL business logic lives here
 * - Validation, rules, transformations
 * - Call data layer only — NO direct Supabase
 * - NO UI logic
 */

import {
  getAccountUser,
  getSmsPreferences,
  getAdminInfo,
  updateAccountUser,
  upsertSmsPreferences,
  updateSmsPhone,
  deleteAccountRpc,
} from './accounts.data'
import type {
  AccountUser,
  AccountUserUpdateInput,
  AccountSummary,
  SmsPreferences,
  SmsPreferenceColumn,
  DeleteAccountResult,
} from './accounts.types'
import type { ID } from '@/src/types/common'

// ============================================================================
// VALIDATION
// ============================================================================

function validateProfileUpdate(input: AccountUserUpdateInput): void {
  if (input.email !== undefined && input.email.trim() === '') {
    throw new Error('Email cannot be empty')
  }
  if (input.phone !== undefined && input.phone.trim() !== '') {
    const phoneRegex = /^\+?[\d\s\-().]{7,20}$/
    if (!phoneRegex.test(input.phone)) {
      throw new Error('Phone number format is invalid')
    }
  }
  if (input.name !== undefined && input.name.trim() === '') {
    throw new Error('Name cannot be empty')
  }
}

// ============================================================================
// READ OPERATIONS
// ============================================================================

export async function getAccountSummaryService(userId: ID): Promise<AccountSummary> {
  const [profile, smsPrefs, adminInfo] = await Promise.all([
    getAccountUser(userId),
    getSmsPreferences(userId),
    getAdminInfo(),
  ])
  return { profile, smsPrefs, adminInfo }
}

export async function getAccountUserService(userId: ID): Promise<AccountUser> {
  return getAccountUser(userId)
}

export async function getSmsPreferencesService(userId: ID): Promise<SmsPreferences | null> {
  return getSmsPreferences(userId)
}

// ============================================================================
// UPDATE OPERATIONS
// ============================================================================

/**
 * Saves only the fields that actually changed.
 * Also syncs phone changes to sms_preferences.
 */
export async function saveProfileService(
  userId: ID,
  current: AccountUser,
  edits: AccountUserUpdateInput
): Promise<AccountUser> {
  validateProfileUpdate(edits)

  const updates: AccountUserUpdateInput = {}
  if (edits.name !== undefined && edits.name !== current.name) updates.name = edits.name
  if (edits.email !== undefined && edits.email !== current.email) updates.email = edits.email
  if (edits.phone !== undefined && edits.phone !== current.phone) updates.phone = edits.phone
  if (edits.shipping_address !== undefined && edits.shipping_address !== current.shipping_address) {
    updates.shipping_address = edits.shipping_address
  }
  if (edits.business_name !== undefined && edits.business_name !== current.business_name) {
    updates.business_name = edits.business_name
  }

  if (Object.keys(updates).length === 0) return current

  const saved = await updateAccountUser(userId, updates)

  // Sync phone to sms_preferences when updated
  if (updates.phone) {
    await updateSmsPhone(userId, updates.phone)
  }

  return saved
}

/**
 * Toggles a single SMS preference column with upsert semantics.
 * Requires an existing phone number.
 */
export async function toggleSmsPreferenceService(
  userId: ID,
  phone: string,
  column: SmsPreferenceColumn,
  value: boolean
): Promise<void> {
  if (!phone || phone.trim() === '') {
    throw new Error('A phone number is required to change SMS preferences')
  }
  await upsertSmsPreferences(userId, phone, column, value)
}

// ============================================================================
// DELETE OPERATIONS
// ============================================================================

export async function deleteAccountService(userId: ID): Promise<DeleteAccountResult> {
  try {
    await deleteAccountRpc(userId)
    return { success: true }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Account deletion failed'
    return { success: false, error: message }
  }
}
