// frontend/handlers/storageHandler.ts
//
// Reusable Supabase storage URL handler.
// The same "is it a full URL or a storage path?" pattern is duplicated in:
//   - components/account/shared/utils/photoUrl.ts (getPhotoUrl)
//   - components/guest/shopTypes.ts (inline in shop.tsx)
//   - 1ChatView.ts (getAttachmentUrl)
//   - useAdminUserInquiries (productUrl derivation)
//
// This handler centralises all storage URL resolution.

import { supabase } from '../lib/supabase'

// ── Public URL resolution ──────────────────────────────────────────────────

/**
 * Resolve a storage path or full URL to a public URL.
 * If the input is already a full URL (starts with http), returns it as-is.
 * Otherwise, builds a Supabase storage public URL from the given bucket.
 *
 * @param url    - Full URL or Supabase storage path
 * @param bucket - Supabase storage bucket name (default: 'products')
 * @returns Full public URL or null if no URL provided
 */
export function getPublicUrl(url: string | null, bucket = 'products'): string | null {
  if (!url) return null
  if (url.startsWith('http')) return url
  return supabase.storage.from(bucket).getPublicUrl(url).data.publicUrl
}

/**
 * Resolve a product photo URL.
 * Uses the 'product-photos' bucket.
 * Exact from shop.tsx getPhotoUrl() and shared/utils/photoUrl.ts.
 */
export function getProductPhotoUrl(url: string | null): string | null {
  return getPublicUrl(url, 'product-photos')
}

/**
 * Resolve a chat attachment URL.
 * Uses the 'ChatUploads' bucket.
 * Exact from 1ChatView.ts getAttachmentUrl().
 */
export function getChatAttachmentUrl(url: string | null): string | null {
  return getPublicUrl(url, 'ChatUploads')
}

/**
 * Resolve a product photo URL using the Supabase URL env var directly.
 * Used by admin inquiry detail where the URL is built manually.
 * Exact from useAdminUserInquiries productUrl derivation.
 */
export function getProductPhotoUrlDirect(url: string | null): string | null {
  if (!url) return null
  if (url.startsWith('http')) return url
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/product-photos/${url}`
}
