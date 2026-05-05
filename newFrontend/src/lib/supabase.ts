/**
 * SUPABASE CLIENT - INFRASTRUCTURE LAYER
 *
 * Provides client-side and server-side Supabase clients with
 * cache settings and timeout configuration built in.
 */

import { createClient, type SupabaseClient } from '@supabase/supabase-js'

// ============================================================================
// CACHE CONFIGURATION
// ============================================================================

export const CACHE_TTL = {
  NONE: 0,        // no caching — real-time or write-heavy data
  SHORT: 60,      // 1 minute — frequently changing data
  MEDIUM: 300,    // 5 minutes — moderately stable data
  LONG: 3_600,    // 1 hour — rarely changing data
  DAY: 86_400,    // 24 hours — very stable reference data
} as const

export type CacheTTL = typeof CACHE_TTL[keyof typeof CACHE_TTL]

// ============================================================================
// TIMEOUT CONFIGURATION
// ============================================================================

export const TIMEOUT_MS = {
  REQUEST: 10_000,                    // 10 seconds — standard DB queries
  UPLOAD: 60_000,                     // 60 seconds — file uploads
  SESSION_INACTIVITY: 2 * 60 * 60_000, // 2 hours — session auto-logout
  REALTIME_CONNECT: 5_000,            // 5 seconds — realtime channel connect
} as const

export type TimeoutMs = typeof TIMEOUT_MS[keyof typeof TIMEOUT_MS]

// ============================================================================
// TIMEOUT UTILITY
// ============================================================================

/**
 * Races a promise against a timeout.
 * Rejects with a descriptive error if the timeout fires first.
 */
export async function withTimeout<T>(
  promise: Promise<T>,
  ms: number,
  label = 'request'
): Promise<T> {
  const timeoutPromise = new Promise<never>((_, reject) =>
    setTimeout(
      () => reject(new Error(`${label} timed out after ${ms}ms`)),
      ms
    )
  )
  return Promise.race([promise, timeoutPromise])
}

// ============================================================================
// CLIENT-SIDE SUPABASE CLIENT
// Respects Row Level Security. Use in React components and client hooks.
// ============================================================================

export const supabase: SupabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      persistSession: true,
      storage: typeof window !== 'undefined' ? window.localStorage : undefined,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
    global: {
      fetch: (url, options = {}) =>
        withTimeout(
          fetch(url, options),
          TIMEOUT_MS.REQUEST,
          'supabase-client'
        ),
    },
    db: {
      schema: 'public',
    },
    realtime: {
      params: {
        eventsPerSecond: 10,
      },
    },
  }
)

// ============================================================================
// SERVER-SIDE SUPABASE CLIENT
// Bypasses RLS using the service role key.
// ONLY use in server actions or API routes — NEVER import in client components.
// ============================================================================

export function createServerClient(): SupabaseClient {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
      global: {
        fetch: (url, options = {}) =>
          withTimeout(
            fetch(url, options),
            TIMEOUT_MS.REQUEST,
            'supabase-server'
          ),
      },
    }
  )
}

// ============================================================================
// CACHED QUERY HELPER (Next.js App Router)
// Uses Next.js revalidation semantics for static/ISR data fetching.
// ============================================================================

export function getCacheOptions(ttl: CacheTTL): RequestInit {
  if (ttl === CACHE_TTL.NONE) {
    return { cache: 'no-store' }
  }
  return { next: { revalidate: ttl } }
}
