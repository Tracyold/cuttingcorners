/**
 * CHAT MODULE - TYPE DEFINITIONS
 *
 * Covers: chat_threads, chat_messages, file uploads (ChatUploads bucket).
 *
 * RULES:
 * - Domain-specific types ONLY
 * - Import shared primitives from @/src/types/common
 * - NO runtime code, NO functions
 */

import type { ID, Timestamp } from '@/src/types/common'

// ============================================================================
// CORE ENTITIES
// ============================================================================

export interface ChatThread {
  chat_thread_id: ID
  account_user_id: ID
  account_has_unread: boolean
  admin_has_unread: boolean
  created_at: Timestamp
  updated_at?: Timestamp
}

export type ChatActor = 'ACCOUNT' | 'ADMIN'

export interface ChatMessage {
  chat_message_id: ID
  chat_thread_id: ID
  actor: ChatActor
  actor_id: ID
  body: string | null
  attachment_url: string | null
  attachment_type: string | null
  created_at: Timestamp
}

// ============================================================================
// UPLOAD STATE (client-side only — not a DB row)
// ============================================================================

export interface PendingUpload {
  tempId: string
  objectUrl: string
  fileType: string
  uploading: boolean
  error: string | null
}

// ============================================================================
// INPUT TYPES
// ============================================================================

export interface SendMessageInput {
  chat_thread_id: ID
  actor: ChatActor
  actor_id: ID
  body: string
  attachment_url: string | null
  attachment_type: string | null
}

export interface SendFileInput {
  chat_thread_id: ID
  actor_id: ID
  storagePath: string
  mimeType: string
}

// ============================================================================
// UPLOAD RESULT
// ============================================================================

export interface UploadResult {
  storagePath: string
  publicUrl: string
}
