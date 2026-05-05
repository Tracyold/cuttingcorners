/**
 * AUTH MODULE - ACTIONS LAYER
 *
 * RULES:
 * - Thin wrappers ONLY — no business logic
 * - UI entry points that call the service layer
 * - 'use server' for Next.js server actions
 */

'use server'

import {
  getAccountSessionService,
  getRawSessionService,
  isAdminUserService,
  signOutService,
  resolveInitialAuthState,
} from './auth.service'
import type { AuthSession, AuthState } from './auth.types'
import type { ID } from '@/src/types/common'

export async function getAccountSessionAction(): Promise<AuthSession | null> {
  return getAccountSessionService()
}

export async function getRawSessionAction(): Promise<AuthSession | null> {
  return getRawSessionService()
}

export async function isAdminUserAction(userId: ID): Promise<boolean> {
  return isAdminUserService(userId)
}

export async function signOutAction(): Promise<void> {
  return signOutService()
}

export async function resolveInitialAuthStateAction(): Promise<AuthState> {
  return resolveInitialAuthState()
}
