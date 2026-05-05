/**
 * LIB UTILITIES - INFRASTRUCTURE LAYER
 *
 * Generic, domain-agnostic helpers.
 * NO business logic. NO domain knowledge.
 */

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { supabase } from './supabase'

// ============================================================================
// STYLE UTILITIES
// ============================================================================

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

// ============================================================================
// MONEY FORMATTING
// DB prices are stored as NUMERIC(12,2) in dollars — never multiply or divide.
// ============================================================================

export function formatMoney(value: number | null | undefined): string {
  if (value == null || isNaN(Number(value))) return '$0'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(Number(value))
}

// ============================================================================
// DATE / TIME FORMATTING
// ============================================================================

export function fmtDate(timestamp: string | Date | null | undefined): string {
  if (!timestamp) return '—'
  const d = new Date(timestamp)
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function fmtTime(timestamp: string | Date | null | undefined): string {
  if (!timestamp) return '—'
  const d = new Date(timestamp)
  return d.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

export function relativeTime(timestamp: string | Date | null | undefined): string {
  if (!timestamp) return ''
  const now = Date.now()
  const then = new Date(timestamp).getTime()
  const diff = now - then
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (seconds < 60) return 'just now'
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7) return `${days}d ago`
  return fmtDate(timestamp)
}

// ============================================================================
// STORAGE URL RESOLUTION
// ============================================================================

/**
 * Resolves a storage path or full URL to a public URL.
 * Supabase paths are relative; external URLs are passed through.
 */
export function getStorageUrl(
  path: string | null,
  bucket = 'products'
): string | null {
  if (!path) return null
  if (path.startsWith('http')) return path
  return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl
}

// ============================================================================
// SAFE UUID GENERATION
// ============================================================================

/** Generates a UUID, falling back gracefully on older iOS Safari. */
export function generateId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

// ============================================================================
// FILE TYPE HELPERS
// ============================================================================

/** Maps a MIME type to a safe file extension for storage paths. */
export function extForMimeType(mime: string): string {
  const map: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/heic': 'heic',
    'image/tiff': 'tiff',
    'image/x-adobe-dng': 'dng',
    'application/pdf': 'pdf',
  }
  return map[mime] ?? 'bin'
}
