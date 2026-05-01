// frontend/handlers/photoUploadHandler.ts
//
// Reusable photo upload handler for Supabase storage.
// The upload-with-timeout + public-URL-resolution pattern is duplicated in:
//   - ServiceRequestForm.tsx (handleFilesPicked — service-request-photos bucket)
//   - chatHandler.ts (uploadAndSend — ChatUploads bucket)
//
// This handler extracts the shared upload logic so any component can
// upload files to any bucket with consistent timeout + error handling.

import { supabase } from '../lib/supabase'

// ── Types ──────────────────────────────────────────────────────────────────

export interface UploadPhotoParams {
  /** Supabase storage bucket name */
  bucket: string
  /** Full storage path including filename (e.g. 'user-id/uuid.jpg') */
  storagePath: string
  /** The File object to upload */
  file: File
  /** Upload timeout in ms (default: 60000) */
  timeoutMs?: number
}

export interface UploadPhotoResult {
  success: boolean
  publicUrl?: string | null
  error?: string
}

export interface RemovePhotoResult {
  success: boolean
  error?: string
}

// ── Helpers ────────────────────────────────────────────────────────────────

/** Lightweight UUID — crypto.randomUUID isn't universal on old iOS */
export function uid(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID()
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

/** Map file extension to safe lowercase */
export function safeExtension(fileName: string): string {
  return (fileName.split('.').pop() || 'bin').toLowerCase()
}

/** Validate file extension against an allow-list */
export function isAllowedExtension(fileName: string, allowed: string[]): boolean {
  return allowed.includes(safeExtension(fileName))
}

// ── Upload a file to Supabase storage ──────────────────────────────────────

/**
 * Upload a file to a Supabase storage bucket with a timeout race.
 * Returns the public URL on success.
 *
 * Exact timeout pattern from ServiceRequestForm.handleFilesPicked()
 * and chatHandler.uploadAndSend().
 */
export async function uploadPhoto(params: UploadPhotoParams): Promise<UploadPhotoResult> {
  const { bucket, storagePath, file, timeoutMs = 60_000 } = params

  const uploadResult = await Promise.race([
    supabase.storage
      .from(bucket)
      .upload(storagePath, file, { cacheControl: '3600', upsert: false }),
    new Promise<{ data: null; error: { message: string } }>((resolve) =>
      setTimeout(
        () => resolve({ data: null, error: { message: `Upload timed out after ${timeoutMs / 1000} seconds.` } }),
        timeoutMs,
      ),
    ),
  ])

  const upErr = (uploadResult as any)?.error
  if (upErr) {
    return { success: false, error: upErr.message ?? 'Upload failed' }
  }

  // Resolve public URL (non-fatal if it fails)
  let publicUrl: string | null = null
  try {
    const { data: pub } = supabase.storage
      .from(bucket)
      .getPublicUrl(storagePath)
    publicUrl = pub?.publicUrl ?? null
  } catch (urlErr) {
    console.warn('getPublicUrl threw (non-fatal):', urlErr)
  }

  return { success: true, publicUrl }
}

// ── Remove a file from Supabase storage ────────────────────────────────────

/**
 * Remove a file from a Supabase storage bucket.
 * Exact from ServiceRequestForm.removePhoto().
 */
export async function removePhoto(
  bucket: string,
  storagePath: string,
): Promise<RemovePhotoResult> {
  try {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([storagePath])

    if (error) return { success: false, error: error.message }
    return { success: true }
  } catch (e: any) {
    return { success: false, error: e?.message ?? 'Removal failed' }
  }
}

// ── Build a storage path for a user upload ─────────────────────────────────

/**
 * Build a deterministic storage path: userId/uuid.ext
 * Reusable across service request photos, chat uploads, etc.
 */
export function buildStoragePath(userId: string, fileName: string): string {
  const ext = safeExtension(fileName)
  return `${userId}/${uid()}.${ext}`
}
