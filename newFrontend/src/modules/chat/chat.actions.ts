/**
 * CHAT MODULE - ACTIONS LAYER
 *
 * RULES:
 * - Thin wrappers ONLY — no business logic
 * - UI entry points that call the service layer
 * - 'use server' for Next.js server actions
 */

'use server'

import {
  getChatThreadService,
  getChatMessagesService,
  loadChatService,
  sendTextMessageService,
  sendFileMessageService,
  openChatService,
} from './chat.service'
import type {
  ChatThread,
  ChatMessage,
  UploadResult,
} from './chat.types'
import type { ID } from '@/src/types/common'

export async function getChatThreadAction(userId: ID): Promise<ChatThread | null> {
  return getChatThreadService(userId)
}

export async function getChatMessagesAction(threadId: ID): Promise<ChatMessage[]> {
  return getChatMessagesService(threadId)
}

export async function loadChatAction(userId: ID): Promise<{
  thread: ChatThread | null
  messages: ChatMessage[]
}> {
  return loadChatService(userId)
}

export async function sendTextMessageAction(
  threadId: ID,
  actorId: ID,
  body: string
): Promise<ChatMessage> {
  return sendTextMessageService(threadId, actorId, body)
}

export async function sendFileMessageAction(
  threadId: ID,
  actorId: ID,
  file: File
): Promise<UploadResult> {
  return sendFileMessageService(threadId, actorId, file)
}

export async function openChatAction(threadId: ID): Promise<void> {
  return openChatService(threadId)
}
