/**
 * AUTH MODULE - TYPE DEFINITIONS
 *
 * RULES:
 * - Domain-specific auth types ONLY
 * - Import shared primitives from @/src/types/common
 * - NO runtime code, NO functions
 */

import type { ID, Timestamp } from '@/src/types/common'

// ============================================================================
// SESSION & USER TYPES
// ============================================================================

export interface AuthUser {
  id: ID
  email?: string
  phone?: string
  created_at: Timestamp
}

export interface AuthSession {
  user: AuthUser
  access_token: string
  refresh_token: string
  expires_at?: number
  expires_in?: number
  token_type: string
}

// ============================================================================
// ADMIN TYPES
// ============================================================================

export interface AdminUserRecord {
  admin_user_id: ID
}

// ============================================================================
// STATE TYPES
// ============================================================================

export type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated'

export interface AuthState {
  session: AuthSession | null
  status: AuthStatus
}

// ============================================================================
// INPUT TYPES
// ============================================================================

export interface SignInInput {
  email: string
  password: string
}

export interface SignUpInput {
  email: string
  password: string
}

// ============================================================================
// SESSION TIMEOUT CONFIG (re-exported for use in hooks/components)
// ============================================================================

export interface SessionTimeoutConfig {
  inactivityMs: number
  activityEvents: string[]
}
