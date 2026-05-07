// frontend/modules/ServiceRequests/sr.helpers.ts
//
// Pure helper functions for the service requests module.
// Imports from sr.types.ts only.
// No React. No Supabase. No side effects.
// Can be imported by the engine, the panel, or any skin that needs them.

import type {
  ServiceRequestRow,
  SRPhotoItem,
  SRCustomField,
  SRSpecRow,
  SRContactRow,
  PhotoValidationResult,
} from './sr.types';
import {
  SR_ACCEPTED_EXTENSIONS,
  SR_MAX_PHOTO_BYTES,
} from './sr.types';

// ── UID generator ─────────────────────────────────────────────────────────────
// Generates a stable unique ID for photo items and custom fields.
// Falls back gracefully on older iOS where crypto.randomUUID may not exist.

export function generateUid(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

// ── List filters ──────────────────────────────────────────────────────────────
// Splits the flat list into active and archived buckets.
// Used by the panel to populate each tab without touching the engine state.

export function filterActive(items: ServiceRequestRow[]): ServiceRequestRow[] {
  return items.filter(s => !s.is_archived);
}

export function filterArchived(items: ServiceRequestRow[]): ServiceRequestRow[] {
  return items.filter(s => s.is_archived);
}

// Returns the number of unread active service requests.
// Used by the panel header and tile to show a badge count.
export function countUnread(items: ServiceRequestRow[]): number {
  return items.filter(s => !s.is_archived && !s.is_read).length;
}

// ── Photo resolution ──────────────────────────────────────────────────────────
// Returns the display photos for an SR.
// The new photo_urls array wins; falls back to the legacy single photo_url column.

export function resolveSRPhotos(sr: ServiceRequestRow): string[] {
  if (Array.isArray(sr.photo_urls) && sr.photo_urls.length > 0) {
    return sr.photo_urls.filter(u => typeof u === 'string' && u.length > 0);
  }
  return sr.photo_url ? [sr.photo_url] : [];
}

// ── Dimension string ──────────────────────────────────────────────────────────
// Returns a formatted dimension string or null if all values are absent.
// Outputs raw string — the panel formats for display.

export function formatDimensions(
  l: number | null,
  w: number | null,
  d: number | null
): string | null {
  if (l == null && w == null && d == null) return null;
  return `${l ?? '?'} × ${w ?? '?'} × ${d ?? '?'} mm`;
}

// ── Spec rows ─────────────────────────────────────────────────────────────────
// Builds the spec table rows for the SR detail drawer.
// Only includes rows where a value is present.

export function buildSpecRows(sr: ServiceRequestRow): SRSpecRow[] {
  const rows: SRSpecRow[] = [];
  if (sr.service_type)     rows.push({ label: 'Service Type', val: sr.service_type });
  if (sr.gem_type)         rows.push({ label: 'Gem Type',     val: sr.gem_type });
  if (sr.gem_color)        rows.push({ label: 'Gem Color',    val: sr.gem_color });
  if (sr.shape)            rows.push({ label: 'Shape',        val: sr.shape });
  if (sr.weight_ct != null) rows.push({ label: 'Weight',      val: `${sr.weight_ct} ct` });
  const dims = formatDimensions(sr.dim_length_mm, sr.dim_width_mm, sr.dim_depth_mm);
  if (dims) rows.push({ label: 'Dimensions', val: dims });
  if (sr.quantity != null && sr.quantity !== 1) {
    rows.push({ label: 'Quantity', val: String(sr.quantity) });
  }
  return rows;
}

// ── Contact rows ──────────────────────────────────────────────────────────────
// Builds the contact block rows for the SR detail drawer.
// Only includes rows where a value is present.

export function buildContactRows(sr: ServiceRequestRow): SRContactRow[] {
  const rows: SRContactRow[] = [];
  if (sr.contact_name)    rows.push({ label: 'Name',     val: sr.contact_name });
  if (sr.contact_email)   rows.push({ label: 'Email',    val: sr.contact_email });
  if (sr.contact_phone)   rows.push({ label: 'Phone',    val: sr.contact_phone });
  if (sr.contact_address) rows.push({ label: 'Shipping', val: sr.contact_address });
  return rows;
}

// ── Photo validation ──────────────────────────────────────────────────────────
// Validates a file before adding it to the upload queue.
// Returns a result shape — never throws.

export function validateSRPhoto(file: File): PhotoValidationResult {
  const ext = (file.name.split('.').pop() ?? '').toLowerCase();
  if (!(SR_ACCEPTED_EXTENSIONS as readonly string[]).includes(ext)) {
    return { valid: false, reason: `File type .${ext} is not accepted.` };
  }
  if (file.size > SR_MAX_PHOTO_BYTES) {
    return { valid: false, reason: `${file.name} exceeds the 25 MB limit.` };
  }
  return { valid: true, reason: null };
}

// ── Form value parsers ────────────────────────────────────────────────────────
// Parse raw string inputs from the form into typed values for the insert payload.

// Parses a quantity string into a safe integer (1–99).
export function parseQuantity(raw: string): number {
  const n = parseInt(raw, 10);
  return Number.isFinite(n) && n >= 1 && n <= 99 ? n : 1;
}

// Parses a decimal string into a number or null.
export function parseDecimalOrNull(raw: string): number | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  const n = parseFloat(trimmed);
  return Number.isFinite(n) ? n : null;
}

// ── Contact helpers ───────────────────────────────────────────────────────────
// Profile value wins over form value — if the profile has a value, use it.

export function resolveContact(
  profileVal: string | null | undefined,
  formVal:    string
): string {
  const pv = (profileVal ?? '').trim();
  return pv.length > 0 ? pv : formVal.trim();
}

// Returns true only if all four contact fields are non-empty.
export function contactIsComplete(
  name:    string,
  email:   string,
  phone:   string,
  address: string
): boolean {
  return name.length > 0 && email.length > 0 && phone.length > 0 && address.length > 0;
}

// Returns the labels of any missing contact fields.
// Used to build a human-readable error message.
export function missingContactFields(
  name:    string,
  email:   string,
  phone:   string,
  address: string
): string[] {
  const missing: string[] = [];
  if (!name)    missing.push('name');
  if (!email)   missing.push('email');
  if (!phone)   missing.push('phone');
  if (!address) missing.push('shipping address');
  return missing;
}

// ── Custom field helpers ──────────────────────────────────────────────────────
// Filters to only fields with a non-empty label — ready for DB insert.

export function validCustomFields(fields: SRCustomField[]): SRCustomField[] {
  return fields.filter(cf => cf.label.trim().length > 0);
}

// ── Photo URL helpers ─────────────────────────────────────────────────────────
// Collects the public URLs of successfully uploaded photos.
// Used by the engine when building the insert payload.

export function uploadedPhotoUrls(photos: SRPhotoItem[]): string[] {
  return photos
    .filter(p => p.uploaded && p.publicUrl !== null)
    .map(p => p.publicUrl as string);
}