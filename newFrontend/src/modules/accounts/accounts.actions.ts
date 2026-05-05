/**
 * ACCOUNTS MODULE - ACTIONS LAYER
 *
 * RULES:
 * - Thin wrappers ONLY — no business logic
 * - UI entry points that call the service layer
 * - 'use server' for Next.js server actions
 */

'use server'

import {
  getAccountSummaryService,
  getAccountUserService,
  getSmsPreferencesService,
  saveProfileService,
  toggleSmsPreferenceService,
  deleteAccountService,
} from './accounts.service'
import type {
  AccountUser,
  AccountUserUpdateInput,
  AccountSummary,
  SmsPreferences,
  SmsPreferenceColumn,
  DeleteAccountResult,
} from './accounts.types'
import type { ID } from '@/src/types/common'

export async function getAccountSummaryAction(userId: ID): Promise<AccountSummary> {
  return getAccountSummaryService(userId)
}

export async function getAccountUserAction(userId: ID): Promise<AccountUser> {
  return getAccountUserService(userId)
}

export async function getSmsPreferencesAction(userId: ID): Promise<SmsPreferences | null> {
  return getSmsPreferencesService(userId)
}

export async function saveProfileAction(
  userId: ID,
  current: AccountUser,
  edits: AccountUserUpdateInput
): Promise<AccountUser> {
  return saveProfileService(userId, current, edits)
}

export async function toggleSmsPreferenceAction(
  userId: ID,
  phone: string,
  column: SmsPreferenceColumn,
  value: boolean
): Promise<void> {
  return toggleSmsPreferenceService(userId, phone, column, value)
}

export async function deleteAccountAction(userId: ID): Promise<DeleteAccountResult> {
  return deleteAccountService(userId)
}
