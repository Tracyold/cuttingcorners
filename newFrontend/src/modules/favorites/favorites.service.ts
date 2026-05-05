/**
 * FAVORITES MODULE - SERVICE LAYER
 *
 * RULES:
 * - ALL business logic lives here
 * - Optimistic toggle logic, set management
 * - Call data layer only — NO direct Supabase
 * - NO UI logic
 */

import {
  getFavoritesByUser,
  addFavorite,
  removeFavorite,
} from './favorites.data'
import type { UserFavorite } from './favorites.types'
import type { ID } from '@/src/types/common'

// ============================================================================
// READ OPERATIONS
// ============================================================================

export async function getFavoriteProductIdsService(userId: ID): Promise<Set<string>> {
  if (!userId) return new Set<string>()
  const favorites = await getFavoritesByUser(userId)
  return new Set(favorites.map(f => f.product_id))
}

export async function getFavoritesService(userId: ID): Promise<UserFavorite[]> {
  if (!userId) return []
  return getFavoritesByUser(userId)
}

// ============================================================================
// TOGGLE FAVORITE
// Returns the NEW state (true = now favorited, false = now unfavorited).
// Callers can apply this to optimistic UI.
// ============================================================================

export async function toggleFavoriteService(
  userId: ID,
  productId: ID,
  currentlyFavorited: boolean
): Promise<boolean> {
  if (!userId) throw new Error('User ID is required to save favorites')
  if (!productId) throw new Error('Product ID is required')

  if (currentlyFavorited) {
    await removeFavorite(userId, productId)
    return false
  } else {
    await addFavorite(userId, productId)
    return true
  }
}

// ============================================================================
// BULK CHECK
// ============================================================================

export function isFavoriteService(
  productIds: Set<string>,
  productId: ID
): boolean {
  return productIds.has(productId)
}
