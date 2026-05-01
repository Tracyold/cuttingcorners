// frontend/handlers/wizardFolderHandler.ts
//
// Reusable wizard folder CRUD + result-move handler.
// All folder logic was inline in 3WizardResultsPanel.tsx:
//   - fetchFolders, ensureDefaultFolder, handleAddFolder,
//     handleRenameFolder, handleDeleteFolder, handleMoveToFolder
//
// This handler extracts the shared DB mutations so they can be
// reused in desktop panels, admin views, or any future surface.

import { supabase } from '../lib/supabase'

// ── Types ──────────────────────────────────────────────────────────────────

export interface WizardFolder {
  id:         string
  name:       string
  is_default: boolean
  created_at: string
}

export interface FolderResult {
  success: boolean
  folder?: WizardFolder
  error?: string
}

// ── Fetch all folders for a user ───────────────────────────────────────────

/**
 * Fetch all wizard folders for a user, ordered by creation date.
 * Exact from 3WizardResultsPanel.fetchFolders().
 */
export async function fetchFolders(userId: string): Promise<WizardFolder[]> {
  const { data, error } = await supabase
    .from('wizard_folders')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: true })

  if (error) {
    console.error('fetchFolders:', error)
    return []
  }
  return data ?? []
}

// ── Ensure default folder exists ───────────────────────────────────────────

/**
 * Check if a default folder exists for the user; create one if not.
 * Exact from 3WizardResultsPanel.ensureDefaultFolder().
 */
export async function ensureDefaultFolder(userId: string): Promise<WizardFolder | null> {
  const { data: existing } = await supabase
    .from('wizard_folders')
    .select('*')
    .eq('user_id', userId)
    .eq('is_default', true)
    .single()

  if (existing) return existing

  const { data, error } = await supabase
    .from('wizard_folders')
    .insert({ user_id: userId, name: 'New Results', is_default: true })
    .select()
    .single()

  if (error) {
    console.error('ensureDefaultFolder:', error)
    return null
  }
  return data
}

// ── Create a new folder ────────────────────────────────────────────────────

/**
 * Create a new (non-default) wizard folder.
 * Exact from 3WizardResultsPanel.handleAddFolder().
 */
export async function createFolder(userId: string, name: string): Promise<FolderResult> {
  const { data, error } = await supabase
    .from('wizard_folders')
    .insert({ user_id: userId, name, is_default: false })
    .select()
    .single()

  if (error) {
    console.error('createFolder:', error)
    return { success: false, error: error.message }
  }
  return { success: true, folder: data }
}

// ── Rename a folder ────────────────────────────────────────────────────────

/**
 * Rename a wizard folder.
 * Exact from 3WizardResultsPanel.handleRenameFolder().
 */
export async function renameFolder(folderId: string, newName: string): Promise<{ error: string | null }> {
  const { error } = await supabase
    .from('wizard_folders')
    .update({ name: newName })
    .eq('id', folderId)

  return { error: error?.message ?? null }
}

// ── Delete a folder ────────────────────────────────────────────────────────

/**
 * Delete a wizard folder after moving its results to the default folder.
 * Exact from 3WizardResultsPanel.handleDeleteFolder().
 *
 * @param folderId       - The folder to delete
 * @param defaultFolderId - The default folder to move orphaned results into
 */
export async function deleteFolder(
  folderId: string,
  defaultFolderId: string | null,
): Promise<{ error: string | null }> {
  // Move results to default folder first
  if (defaultFolderId) {
    await supabase
      .from('wizard_results')
      .update({ folder_id: defaultFolderId })
      .eq('folder_id', folderId)
  }

  const { error } = await supabase
    .from('wizard_folders')
    .delete()
    .eq('id', folderId)

  return { error: error?.message ?? null }
}

// ── Move a result to a different folder ────────────────────────────────────

/**
 * Move a wizard result to a different folder.
 * Exact from 3WizardResultsPanel.handleMoveToFolder().
 */
export async function moveResultToFolder(
  resultId: string,
  folderId: string,
): Promise<{ error: string | null }> {
  const { error } = await supabase
    .from('wizard_results')
    .update({ folder_id: folderId })
    .eq('id', resultId)

  return { error: error?.message ?? null }
}

// ── Assign unfoldered results to default folder ────────────────────────────

/**
 * Move any results without a folder_id into the default folder.
 * Exact from 3WizardResultsPanel useEffect on open.
 */
export async function assignUnfolderedResults(
  resultIds: string[],
  defaultFolderId: string,
): Promise<void> {
  if (resultIds.length === 0) return

  await supabase
    .from('wizard_results')
    .update({ folder_id: defaultFolderId })
    .in('id', resultIds)
}
