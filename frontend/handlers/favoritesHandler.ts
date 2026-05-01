// frontend/handlers/favoritesHandler.ts
//
// Reusable favorites DB handler.
// Extracted from useFavorites — the hook still owns the optimistic Set<string>
// state, but the actual DB insert/delete is here so it can be reused.

import { supabase } from '../lib/supabase'

// ── Types ──────────────────────────────────────────────────────────────────

export interface ToggleFavoriteResult {
  success: boolean
  error?: string
}

// ── Load favorites ─────────────────────────────────────────────────────────

/**
 * Fetch all favorited product IDs for a user.
 * Exact from useFavorites useEffect.
 */
export async function loadFavorites(userId: string): Promise<Set<string>> {
  const { data, error } = await supabase
    .from('user_favorites')
    .select('product_id')
    .eq('user_id', userId)

  if (error) {
    console.error('loadFavorites error:', error)
    return new Set()
  }

  return new Set((data || []).map((r) => r.product_id as string))
}

// ── Add favorite ───────────────────────────────────────────────────────────

/**
 * Insert a favorite row. Treats duplicate PK (23505) as success.
 * Exact from useFavorites.toggleFavorite() add branch.
 */
export async function addFavorite(
  userId: string,
  productId: string,
): Promise<ToggleFavoriteResult> {
  const { error } = await supabase
    .from('user_favorites')
    .insert({ user_id: userId, product_id: productId })

  // Duplicate PK means it already exists — treat as success
  if (error && (error as any).code !== '23505') {
    return { success: false, error: error.message }
  }

  return { success: true }
}

// ── Remove favorite ────────────────────────────────────────────────────────

/**
 * Delete a favorite row.
 * Exact from useFavorites.toggleFavorite() remove branch.
 */
export async function removeFavorite(
  userId: string,
  productId: string,
): Promise<ToggleFavoriteResult> {
  const { error } = await supabase
    .from('user_favorites')
    .delete()
    .eq('user_id', userId)
    .eq('product_id', productId)

  if (error) return { success: false, error: error.message }

  return { success: true }
}
