/**
 * AUTH MODULE - SERVICE LAYER
 *
 * RULES:
 * - ALL business logic lives here
 * - Session validation, admin checks, timeout rules
 * - Call data layer only — NO direct Supabase
 * - NO UI logic
 */

import {
  getSession,
  signOut,
  getAdminRecord,
  subscribeToAuthChanges,
  type AuthChangeCallback,
} from './auth.data'
import type { AuthSession, AuthState, SessionTimeoutConfig } from './auth.types'
import type { ID } from '@/src/types/common'
import { TIMEOUT_MS } from '@/src/lib/supabase'

// ============================================================================
// SESSION TIMEOUT CONFIG
// Mirrors the 2-hour inactivity timeout from the original useAuth hook.
// ============================================================================

export const SESSION_TIMEOUT_CONFIG: SessionTimeoutConfig = {
  inactivityMs: TIMEOUT_MS.SESSION_INACTIVITY,
  activityEvents: ['mousedown', 'keydown', 'touchstart', 'scroll'],
}

// ============================================================================
// READ OPERATIONS
// ============================================================================

/**
 * Gets the current session, filtering out guest and admin sessions.
 * Returns null if the user is a guest, an admin, or unauthenticated.
 */
export async function getAccountSessionService(): Promise<AuthSession | null> {
  const session = await getSession()
  if (!session) return null

  const guestId = process.env.NEXT_PUBLIC_GUEST_ACCOUNT_USER_ID
  if (session.user.id === guestId) return null

  const adminRecord = await getAdminRecord(session.user.id)
  if (adminRecord) return null

  return session
}

/**
 * Returns raw session without filtering. Used for admin contexts.
 */
export async function getRawSessionService(): Promise<AuthSession | null> {
  return getSession()
}

export async function isAdminUserService(userId: ID): Promise<boolean> {
  const record = await getAdminRecord(userId)
  return record !== null
}

// ============================================================================
// SIGN OUT
// ============================================================================

export async function signOutService(): Promise<void> {
  await signOut()
}

// ============================================================================
// AUTH STATE SUBSCRIPTION
// ============================================================================

export function subscribeToAuthService(callback: AuthChangeCallback): () => void {
  return subscribeToAuthChanges(callback)
}

// ============================================================================
// INITIAL AUTH STATE BUILDER
// ============================================================================

export async function resolveInitialAuthState(): Promise<AuthState> {
  const session = await getAccountSessionService()
  return {
    session,
    status: session ? 'authenticated' : 'unauthenticated',
  }
}
