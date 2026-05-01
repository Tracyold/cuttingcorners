// frontend/handlers/authHandler.ts
//
// Reusable auth / session handler.
// Auth logic is duplicated across:
//   - useAuth (account side: getSession, onAuthStateChange, signOut, timeout)
//   - shop.tsx (guest auto-signout, session detection)
//   - useAdminDashboard (getSession for admin)
//
// This handler extracts the shared patterns.

import { supabase } from '../lib/supabase'

// ── Constants ──────────────────────────────────────────────────────────────

export const GUEST_USER_ID = process.env.NEXT_PUBLIC_GUEST_ACCOUNT_USER_ID || ''
export const SESSION_TIMEOUT_MS = 2 * 60 * 60 * 1000 // 2 hours

// ── Session helpers ────────────────────────────────────────────────────────

/**
 * Get the current Supabase auth session.
 */
export async function getSession(): Promise<any | null> {
  const { data: { session } } = await supabase.auth.getSession()
  return session
}

/**
 * Sign out the current user.
 */
export async function signOut(): Promise<void> {
  await supabase.auth.signOut()
}

/**
 * Check if a session belongs to the guest account.
 */
export function isGuestSession(session: any): boolean {
  return session?.user?.id === GUEST_USER_ID
}

/**
 * Check if a session belongs to a real (non-guest) account user.
 */
export function isRealUser(session: any): boolean {
  return !!session && !isGuestSession(session)
}

/**
 * Check if a user ID is the guest account.
 */
export function isGuestUser(userId: string): boolean {
  return userId === GUEST_USER_ID
}

// ── Admin check ────────────────────────────────────────────────────────────

/**
 * Check if the current session user is an admin.
 * Exact from useAuth init() admin check.
 */
export async function isAdmin(userId: string): Promise<boolean> {
  const { data } = await supabase
    .from('admin_users')
    .select('admin_user_id')
    .eq('admin_user_id', userId)
    .single()

  return !!data
}

// ── Inactivity timeout ────────────────────────────────────────────────────

/**
 * Set up an inactivity timeout that calls onTimeout after SESSION_TIMEOUT_MS
 * of no user interaction. Returns a cleanup function.
 * Exact from useAuth useEffect timeout logic.
 */
export function setupInactivityTimeout(onTimeout: () => void): () => void {
  let timeoutId: ReturnType<typeof setTimeout>

  const resetTimeout = () => {
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(onTimeout, SESSION_TIMEOUT_MS)
  }

  const events = ['mousedown', 'keydown', 'touchstart', 'scroll']
  events.forEach((event) => window.addEventListener(event, resetTimeout))
  resetTimeout()

  return () => {
    if (timeoutId) clearTimeout(timeoutId)
    events.forEach((event) => window.removeEventListener(event, resetTimeout))
  }
}

// ── Auth state listener ────────────────────────────────────────────────────

/**
 * Subscribe to auth state changes. Returns an unsubscribe function.
 * Exact from useAuth onAuthStateChange pattern.
 */
export function onAuthChange(
  callback: (session: any | null) => void,
): () => void {
  const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session)
  })

  return () => subscription.unsubscribe()
}
