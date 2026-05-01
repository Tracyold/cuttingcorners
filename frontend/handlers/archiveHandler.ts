// frontend/handlers/archiveHandler.ts
//
// Reusable optimistic archive handler.
// The same archive-with-optimistic-update-and-rollback pattern is duplicated in:
//   - 3InquiriesPanel.tsx (handleArchive for account_inquiries)
//   - 3ServiceRequestPanel.tsx (handleArchiveSR for service_requests)
//   - 3WizardResultsPanel.tsx (handleArchive for wizard_results)
//
// This handler extracts the shared DB mutation so panels just call one function.

import { supabase } from '../lib/supabase'

// ── Types ──────────────────────────────────────────────────────────────────

export interface ArchiveParams {
  /** Supabase table name (e.g. 'account_inquiries', 'service_requests', 'wizard_results') */
  table: string
  /** Primary key column name (e.g. 'account_inquiry_id', 'service_request_id', 'id') */
  idColumn: string
  /** The row's primary key value */
  id: string
  /** Set to true to archive, false to unarchive */
  archived?: boolean
}

export interface ArchiveResult {
  success: boolean
  error?: string
}

// ── Archive a single row ───────────────────────────────────────────────────

/**
 * Set is_archived on a row. Works for any table that has an is_archived column.
 * Panels handle optimistic state updates; this function handles the DB write.
 *
 * Exact DB mutation from 3InquiriesPanel.handleArchive(),
 * 3ServiceRequestPanel.handleArchiveSR(), and 3WizardResultsPanel.handleArchive().
 */
export async function archiveRow(params: ArchiveParams): Promise<ArchiveResult> {
  const { table, idColumn, id, archived = true } = params

  const { error } = await supabase
    .from(table)
    .update({ is_archived: archived })
    .eq(idColumn, id)

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true }
}

// ── Convenience wrappers ───────────────────────────────────────────────────

/** Archive an account inquiry. */
export async function archiveInquiry(inquiryId: string): Promise<ArchiveResult> {
  return archiveRow({
    table: 'account_inquiries',
    idColumn: 'account_inquiry_id',
    id: inquiryId,
  })
}

/** Archive a service request. */
export async function archiveServiceRequest(serviceRequestId: string): Promise<ArchiveResult> {
  return archiveRow({
    table: 'service_requests',
    idColumn: 'service_request_id',
    id: serviceRequestId,
  })
}

/** Archive a wizard result. */
export async function archiveWizardResult(resultId: string): Promise<ArchiveResult> {
  return archiveRow({
    table: 'wizard_results',
    idColumn: 'id',
    id: resultId,
  })
}
