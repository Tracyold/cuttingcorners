/**
 * CHAT MODULE - DATA LAYER
 *
 * RULES:
 * - ONLY Supabase queries and storage calls
 * - NO business logic
 * - NO validation beyond error propagation
 * - Return raw data only
 */

import { supabase, withTimeout, TIMEOUT_MS } from '@/src/lib/supabase'
import type {
  ChatThread,
  ChatMessage,
  SendMessageInput,
} from './chat.types'
import type { ID } from '@/src/types/common'

// ============================================================================
// THREAD QUERIES
// ============================================================================

export async function getChatThread(userId: ID): Promise<ChatThread | null> {
  const { data, error } = await withTimeout(
    supabase
      .from('chat_threads')
      .select('*')
      .eq('account_user_id', userId)
      .single(),
    TIMEOUT_MS.REQUEST,
    'getChatThread'
  )
  if (error && error.code !== 'PGRST116') throw error
  return (data as ChatThread | null)
}

export async function markThreadRead(threadId: ID): Promise<void> {
  const { error } = await withTimeout(
    supabase
      .from('chat_threads')
      .update({ account_has_unread: false })
      .eq('chat_thread_id', threadId),
    TIMEOUT_MS.REQUEST,
    'markThreadRead'
  )
  if (error) throw error
}

export async function markAdminUnread(threadId: ID): Promise<void> {
  const { error } = await withTimeout(
    supabase
      .from('chat_threads')
      .update({ account_has_unread: false, admin_has_unread: true })
      .eq('chat_thread_id', threadId),
    TIMEOUT_MS.REQUEST,
    'markAdminUnread'
  )
  if (error) throw error
}

// ============================================================================
// MESSAGE QUERIES
// ============================================================================

export async function getChatMessages(threadId: ID): Promise<ChatMessage[]> {
  const { data, error } = await withTimeout(
    supabase
      .from('chat_messages')
      .select('*')
      .eq('chat_thread_id', threadId)
      .order('created_at', { ascending: true }),
    TIMEOUT_MS.REQUEST,
    'getChatMessages'
  )
  if (error) throw error
  return (data as ChatMessage[])
}

export async function insertChatMessage(input: SendMessageInput): Promise<ChatMessage> {
  const { data, error } = await withTimeout(
    supabase
      .from('chat_messages')
      .insert({
        chat_thread_id: input.chat_thread_id,
        actor: input.actor,
        actor_id: input.actor_id,
        body: input.body,
        attachment_url: input.attachment_url,
        attachment_type: input.attachment_type,
      })
      .select()
      .single(),
    TIMEOUT_MS.REQUEST,
    'insertChatMessage'
  )
  if (error) throw error
  return data as ChatMessage
}

// ============================================================================
// FILE STORAGE
// ============================================================================

export async function uploadChatFile(
  path: string,
  file: File
): Promise<void> {
  const { error } = await withTimeout(
    supabase.storage
      .from('ChatUploads')
      .upload(path, file, { contentType: file.type, upsert: false }),
    TIMEOUT_MS.UPLOAD,
    'uploadChatFile'
  )
  if (error) throw error
}

export async function deleteChatFile(path: string): Promise<void> {
  await supabase.storage.from('ChatUploads').remove([path])
}

// ============================================================================
// ADMIN NOTIFICATION
// ============================================================================

export async function notifyAdminOfChatEvent(threadId: ID): Promise<void> {
  await supabase.functions.invoke('send-admin-notification', {
    body: { event_type: 'chat', thread_id: threadId },
  })
}
