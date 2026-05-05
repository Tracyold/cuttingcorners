/**
 * FAVORITES MODULE - ACTIONS LAYER
 *
 * RULES:
 * - Thin wrappers ONLY — no business logic
 * - UI entry points that call the service layer
 * - 'use server' for Next.js server actions
 */

'use server'

import {
  getFavoriteProductIdsService,
  getFavoritesService,
  toggleFavoriteService,
} from './favorites.service'
import type { UserFavorite } from './favorites.types'
import type { ID } from '@/src/types/common'

export async function getFavoriteProductIdsAction(userId: ID): Promise<string[]> {
  const set = await getFavoriteProductIdsService(userId)
  return Array.from(set)
}

export async function getFavoritesAction(userId: ID): Promise<UserFavorite[]> {
  return getFavoritesService(userId)
}

export async function toggleFavoriteAction(
  userId: ID,
  productId: ID,
  currentlyFavorited: boolean
): Promise<boolean> {
  return toggleFavoriteService(userId, productId, currentlyFavorited)
}
