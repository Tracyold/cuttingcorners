/**
 * FAVORITES MODULE - DATA LAYER
 *
 * RULES:
 * - ONLY Supabase queries
 * - NO business logic
 * - NO validation
 * - Return raw data only
 */

import { supabase, withTimeout, TIMEOUT_MS } from '@/src/lib/supabase'
import type { UserFavorite } from './favorites.types'
import type { ID } from '@/src/types/common'

// ============================================================================
// READ OPERATIONS
// ============================================================================

export async function getFavoritesByUser(userId: ID): Promise<UserFavorite[]> {
  const { data, error } = await withTimeout(
    supabase
      .from('user_favorites')
      .select('product_id')
      .eq('user_id', userId),
    TIMEOUT_MS.REQUEST,
    'getFavoritesByUser'
  )
  if (error) throw error
  return (data as Array<{ product_id: ID }>).map(row => ({
    user_id: userId,
    product_id: row.product_id,
  }))
}

// ============================================================================
// CREATE OPERATIONS
// ============================================================================

export async function addFavorite(userId: ID, productId: ID): Promise<void> {
  const { error } = await withTimeout(
    supabase
      .from('user_favorites')
      .insert({ user_id: userId, product_id: productId }),
    TIMEOUT_MS.REQUEST,
    'addFavorite'
  )
  // Ignore duplicate key — PK violation (23505) means it's already favorited
  if (error && (error as { code?: string }).code !== '23505') throw error
}

// ============================================================================
// DELETE OPERATIONS
// ============================================================================

export async function removeFavorite(userId: ID, productId: ID): Promise<void> {
  const { error } = await withTimeout(
    supabase
      .from('user_favorites')
      .delete()
      .eq('user_id', userId)
      .eq('product_id', productId),
    TIMEOUT_MS.REQUEST,
    'removeFavorite'
  )
  if (error) throw error
}
