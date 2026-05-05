/**
 * FAVORITES MODULE - TYPE DEFINITIONS
 *
 * Covers: user_favorites (persistent product favorites per user).
 *
 * RULES:
 * - Domain-specific types ONLY
 * - Import shared primitives from @/src/types/common
 * - NO runtime code, NO functions
 */

import type { ID, Timestamp } from '@/src/types/common'

// ============================================================================
// CORE ENTITY
// ============================================================================

export interface UserFavorite {
  user_id: ID
  product_id: ID
  created_at?: Timestamp
}

// ============================================================================
// INPUT TYPES
// ============================================================================

export interface ToggleFavoriteInput {
  user_id: ID
  product_id: ID
}

// ============================================================================
// RESULT TYPES
// ============================================================================

export interface FavoritesState {
  productIds: Set<string>
  loading: boolean
}
