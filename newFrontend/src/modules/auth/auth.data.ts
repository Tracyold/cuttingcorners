/**
 * AUTH MODULE - DATA LAYER
 *
 * RULES:
 * - ONLY Supabase auth/DB calls
 * - NO business logic
 * - NO validation
 * - Return raw data only
 */

import { supabase, withTimeout, TIMEOUT_MS } from '@/src/lib/supabase'
import type { AuthSession, AdminUserRecord } from './auth.types'
import type { ID } from '@/src/types/common'

// ============================================================================
// SESSION QUERIES
// ============================================================================

export async function getSession(): Promise<AuthSession | null> {
  const { data, error } = await withTimeout(
    supabase.auth.getSession(),
    TIMEOUT_MS.REQUEST,
    'getSession'
  )
  if (error) throw error
  if (!data.session) return null

  return data.session as unknown as AuthSession
}

export async function signOut(): Promise<void> {
  const { error } = await withTimeout(
    supabase.auth.signOut(),
    TIMEOUT_MS.REQUEST,
    'signOut'
  )
  if (error) throw error
}

// ============================================================================
// ADMIN CHECK
// ============================================================================

export async function getAdminRecord(userId: ID): Promise<AdminUserRecord | null> {
  const { data, error } = await withTimeout(
    supabase
      .from('admin_users')
      .select('admin_user_id')
      .eq('admin_user_id', userId)
      .single(),
    TIMEOUT_MS.REQUEST,
    'getAdminRecord'
  )
  if (error && error.code !== 'PGRST116') throw error
  return (data as AdminUserRecord | null)
}

// ============================================================================
// AUTH STATE LISTENER
// ============================================================================

export type AuthChangeCallback = (session: AuthSession | null) => void

export function subscribeToAuthChanges(
  callback: AuthChangeCallback
): () => void {
  const { data: { subscription } } = supabase.auth.onAuthStateChange(
    (_event, session) => {
      callback(session as unknown as AuthSession | null)
    }
  )
  return () => subscription.unsubscribe()
}
