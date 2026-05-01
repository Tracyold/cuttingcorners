// frontend/handlers/chatHandler.ts
//
// Reusable chat message + file upload handler.
// The exact same send-text and upload-file logic is duplicated between:
//   - useChat (account side, actor: 'ACCOUNT')
//   - useAdminUserChat (admin side, actor: 'ADMIN')
//
// This handler extracts the shared logic so both hooks can call it
// with just the actor and notification target differing.

import { supabase } from '../lib/supabase'
import { notifyAdmin, notifyUser } from './notificationHandler'

// ── Types ──────────────────────────────────────────────────────────────────

export type ChatActor = 'ACCOUNT' | 'ADMIN'

export interface SendMessageParams {
  chatThreadId: string
  actorId: string
  actor: ChatActor
  body: string
  /** The user ID to notify (for admin→user or user→admin) */
  notifyUserId?: string
}

export interface UploadFileParams {
  chatThreadId: string
  actorId: string
  actor: ChatActor
  file: File
  /** The user ID to notify */
  notifyUserId?: string
}

export interface SendResult {
  success: boolean
  error?: string
}

export interface UploadResult {
  success: boolean
  storagePath?: string
  error?: string
}

// ── Helpers ────────────────────────────────────────────────────────────────

/** Lightweight UUID — crypto.randomUUID isn't universal on old iOS */
export function uid(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID()
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

/** Map MIME type to safe file extension */
export function extForMimeType(mime: string): string {
  if (mime === 'image/jpeg') return 'jpg'
  if (mime === 'image/png') return 'png'
  if (mime === 'image/heic') return 'heic'
  if (mime === 'image/tiff') return 'tiff'
  if (mime === 'image/x-adobe-dng') return 'dng'
  if (mime === 'application/pdf') return 'pdf'
  return 'bin'
}

// ── Send text message ──────────────────────────────────────────────────────

/**
 * Insert a chat message and update thread unread flags.
 * Exact logic from useChat.sendChat() and useAdminUserChat.sendChat().
 */
export async function sendMessage(params: SendMessageParams): Promise<SendResult> {
  const { chatThreadId, actorId, actor, body, notifyUserId } = params

  const { error } = await supabase.from('chat_messages').insert({
    chat_thread_id: chatThreadId,
    actor,
    actor_id: actorId,
    body,
    attachment_url: null,
    attachment_type: null,
  })

  if (error) {
    return { success: false, error: error.message || 'Could not send message.' }
  }

  // Notify + update thread unread flags
  if (actor === 'ACCOUNT') {
    await notifyAdmin({ event_type: 'chat', thread_id: chatThreadId })
    await supabase
      .from('chat_threads')
      .update({ account_has_unread: false, admin_has_unread: true })
      .eq('chat_thread_id', chatThreadId)
  } else {
    if (notifyUserId) {
      await notifyUser({ event_type: 'chat', user_id: notifyUserId })
    }
    await supabase
      .from('chat_threads')
      .update({ admin_has_unread: false, account_has_unread: true })
      .eq('chat_thread_id', chatThreadId)
  }

  return { success: true }
}

// ── Upload file + send as attachment ───────────────────────────────────────

/**
 * Upload a file to ChatUploads bucket, insert a chat message with the
 * attachment path, and update thread unread flags.
 *
 * Exact logic from useChat.handleChatFile() and useAdminUserChat.handleChatFile().
 * Includes the 60-second timeout race from the account-side hardened version.
 */
export async function uploadAndSend(params: UploadFileParams): Promise<UploadResult> {
  const { chatThreadId, actorId, actor, file, notifyUserId } = params

  // Build safe storage path with UUID filename
  const ext = extForMimeType(file.type)
  const prefix = actor === 'ADMIN' ? 'admin' : `user/${actorId}`
  const fileId = uid()
  const path = `${prefix}/${fileId}.${ext}`

  // Race upload against 60s timeout
  const uploadResult = await Promise.race([
    supabase.storage
      .from('ChatUploads')
      .upload(path, file, { contentType: file.type, upsert: false }),
    new Promise<{ data: null; error: { message: string } }>((resolve) =>
      setTimeout(
        () => resolve({ data: null, error: { message: 'Upload timed out after 60 seconds.' } }),
        60_000,
      ),
    ),
  ])

  const upErr = (uploadResult as any)?.error
  if (upErr) {
    return { success: false, error: upErr.message ?? 'Upload failed' }
  }

  // Insert chat message with attachment
  const { error: insertErr } = await supabase.from('chat_messages').insert({
    chat_thread_id: chatThreadId,
    actor,
    actor_id: actorId,
    body: null,
    attachment_url: path,
    attachment_type: file.type,
  })

  if (insertErr) {
    return { success: false, error: insertErr.message ?? 'Failed to save message.' }
  }

  // Notify + update thread unread flags
  if (actor === 'ACCOUNT') {
    await notifyAdmin({ event_type: 'chat', thread_id: chatThreadId })
    await supabase
      .from('chat_threads')
      .update({ account_has_unread: false, admin_has_unread: true })
      .eq('chat_thread_id', chatThreadId)
  } else {
    if (notifyUserId) {
      await notifyUser({ event_type: 'chat', user_id: notifyUserId })
    }
    await supabase
      .from('chat_threads')
      .update({ admin_has_unread: false, account_has_unread: true })
      .eq('chat_thread_id', chatThreadId)
  }

  return { success: true, storagePath: path }
}

// ── Mark thread read ───────────────────────────────────────────────────────

/**
 * Mark a chat thread as read for the given side.
 * Exact from useChat.openChatDrawer() and useAdminUserChat.markThreadRead().
 */
export async function markThreadRead(
  chatThreadId: string,
  side: 'account' | 'admin',
): Promise<void> {
  const field = side === 'account' ? 'account_has_unread' : 'admin_has_unread'
  await supabase
    .from('chat_threads')
    .update({ [field]: false })
    .eq('chat_thread_id', chatThreadId)
}

// ── Deduplicate optimistic messages ────────────────────────────────────────

/**
 * Merge a realtime INSERT payload into the messages array,
 * removing any matching optimistic message (prefixed 'opt-').
 * Exact from useAccountInfo and useAdminUserDetail chat channels.
 */
export function deduplicateMessage(
  prev: any[],
  newMsg: any,
): any[] {
  const filtered = prev.filter(
    (m) => !m.chat_message_id.startsWith('opt-') || m.body !== newMsg.body,
  )
  if (filtered.some((m) => m.chat_message_id === newMsg.chat_message_id)) {
    return filtered
  }
  return [...filtered, newMsg]
}
