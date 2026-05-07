// frontend/modules/ChatPanel/chat.helpers.ts
//
// Pure helper functions for the chat module.
// Imports from chat.types.ts only.
// No React. No Supabase. No side effects.
// Can be imported by the engine, the panel, or any skin that needs them.

import type {
  ChatMessage,
  ChatGroupedMessage,
} from './chat.types';

// ── UID generator ─────────────────────────────────────────────────────────────

// Generates a stable unique ID for optimistic messages and pending uploads.
// Falls back gracefully on older iOS where crypto.randomUUID may not exist.
export function generateUid(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

// ── Message grouping ──────────────────────────────────────────────────────────

// Groups messages by date label for rendering date dividers.
// Outputs raw YYYY-MM-DD strings — the panel or skin formats them for display.
// Each item knows whether to show a divider above it.
export function groupMessagesByDate(
  messages: ChatMessage[]
): ChatGroupedMessage[] {
  let lastDate = '';
  return messages.map(m => {
    const dateLabel   = m.created_at.slice(0, 10);
    const showDivider = dateLabel !== lastDate;
    lastDate = dateLabel;
    return { dateLabel, showDivider, message: m };
  });
}

// ── Actor helpers ─────────────────────────────────────────────────────────────

// Determines if a message belongs to the current actor.
// Used by the panel to decide bubble alignment — left or right.
export function isMyMessage(
  message: ChatMessage,
  actor: 'ADMIN' | 'ACCOUNT'
): boolean {
  return message.actor === actor;
}

// ── Attachment helpers ────────────────────────────────────────────────────────

// Returns true if the message has an image attachment.
export function isImageAttachment(message: ChatMessage): boolean {
  return (
    !!message.attachment_url &&
    !!message.attachment_type?.startsWith('image/')
  );
}

// Returns true if the message has a PDF attachment.
export function isPdfAttachment(message: ChatMessage): boolean {
  return (
    !!message.attachment_url &&
    message.attachment_type === 'application/pdf'
  );
}

// Returns true if a pending upload file type is an image.
export function isPendingImage(fileType: string): boolean {
  return fileType.startsWith('image/');
}

// Returns true if a pending upload file type is a PDF.
export function isPendingPdf(fileType: string): boolean {
  return fileType === 'application/pdf';
}