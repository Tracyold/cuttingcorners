/**
 * CHAT MODULE - SERVICE LAYER
 *
 * RULES:
 * - ALL business logic lives here
 * - Upload validation, optimistic message construction, unread management
 * - Call data layer only — NO direct Supabase
 * - NO UI logic
 */

import {
  getChatThread,
  getChatMessages,
  insertChatMessage,
  markThreadRead,
  markAdminUnread,
  uploadChatFile,
  deleteChatFile,
  notifyAdminOfChatEvent,
} from './chat.data'
import type {
  ChatThread,
  ChatMessage,
  SendMessageInput,
  UploadResult,
} from './chat.types'
import type { ID } from '@/src/types/common'
import { generateId, extForMimeType } from '@/src/lib/utils'
import { TIMEOUT_MS } from '@/src/lib/supabase'

// ============================================================================
// ALLOWED UPLOAD MIME TYPES
// ============================================================================

const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/heic',
  'image/tiff',
  'image/x-adobe-dng',
  'application/pdf',
])

const MAX_FILE_SIZE_BYTES = 20 * 1024 * 1024  // 20 MB

// ============================================================================
// VALIDATION
// ============================================================================

function validateFileUpload(file: File): void {
  if (!ALLOWED_MIME_TYPES.has(file.type)) {
    throw new Error(`File type '${file.type}' is not supported. Use JPEG, PNG, HEIC, TIFF, DNG, or PDF.`)
  }
  if (file.size > MAX_FILE_SIZE_BYTES) {
    throw new Error('File is too large. Maximum size is 20 MB.')
  }
}

// ============================================================================
// READ OPERATIONS
// ============================================================================

export async function getChatThreadService(userId: ID): Promise<ChatThread | null> {
  return getChatThread(userId)
}

export async function getChatMessagesService(threadId: ID): Promise<ChatMessage[]> {
  return getChatMessages(threadId)
}

export async function loadChatService(userId: ID): Promise<{
  thread: ChatThread | null
  messages: ChatMessage[]
}> {
  const thread = await getChatThread(userId)
  if (!thread) return { thread: null, messages: [] }

  const messages = await getChatMessages(thread.chat_thread_id)

  return { thread, messages }
}

// ============================================================================
// SEND TEXT MESSAGE
// ============================================================================

export async function sendTextMessageService(
  threadId: ID,
  actorId: ID,
  body: string
): Promise<ChatMessage> {
  if (!body.trim()) throw new Error('Message body cannot be empty')
  if (!threadId) throw new Error('Chat thread is required')

  const input: SendMessageInput = {
    chat_thread_id: threadId,
    actor: 'ACCOUNT',
    actor_id: actorId,
    body: body.trim(),
    attachment_url: null,
    attachment_type: null,
  }

  const message = await insertChatMessage(input)

  // Fire-and-forget: admin notification + unread flag
  notifyAdminOfChatEvent(threadId).catch(() => undefined)
  markAdminUnread(threadId).catch(() => undefined)

  return message
}

// ============================================================================
// SEND FILE (upload + insert message)
// ============================================================================

export async function sendFileMessageService(
  threadId: ID,
  actorId: ID,
  file: File
): Promise<UploadResult> {
  if (!threadId) throw new Error('Chat thread is required')
  validateFileUpload(file)

  const tempId = generateId()
  const ext = extForMimeType(file.type)
  const storagePath = `user/${actorId}/${tempId}.${ext}`

  // Race upload against timeout (data layer wraps with UPLOAD timeout)
  await uploadChatFile(storagePath, file)

  let inserted: ChatMessage
  try {
    inserted = await insertChatMessage({
      chat_thread_id: threadId,
      actor: 'ACCOUNT',
      actor_id: actorId,
      body: null,
      attachment_url: storagePath,
      attachment_type: file.type,
    })
  } catch (insertErr: unknown) {
    // Clean up orphaned storage file
    await deleteChatFile(storagePath).catch(() => undefined)
    throw insertErr
  }

  notifyAdminOfChatEvent(threadId).catch(() => undefined)
  markAdminUnread(threadId).catch(() => undefined)

  return {
    storagePath,
    publicUrl: storagePath,
  }
}

// ============================================================================
// UNREAD MANAGEMENT
// ============================================================================

export async function openChatService(threadId: ID): Promise<void> {
  await markThreadRead(threadId)
}
