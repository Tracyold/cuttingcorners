// chat.ui.ts

import type { ChatMessage } from './chat.types';

// ─────────────────────────────────────────────────────────────
// DISPLAY CLASSIFICATION
// ─────────────────────────────────────────────────────────────

export function isMyMessage(message: ChatMessage): boolean {
  return message.actor === 'ACCOUNT';
}

export function isAdminMessage(message: ChatMessage): boolean {
  return message.actor === 'ADMIN';
}

// ─────────────────────────────────────────────────────────────
// ATTACHMENT CLASSIFICATION
// ─────────────────────────────────────────────────────────────

export function isImageAttachment(message: ChatMessage): boolean {
  return Boolean(
    message.attachment_url &&
    message.attachment_type?.startsWith('image/')
  );
}

export function isPdfAttachment(message: ChatMessage): boolean {
  return message.attachment_type === 'application/pdf';
}

export function hasAttachment(message: ChatMessage): boolean {
  return Boolean(message.attachment_url);
}

// ─────────────────────────────────────────────────────────────
// TIME / DATE DISPLAY LOGIC
// ─────────────────────────────────────────────────────────────

export function formatMessageTime(iso: string): string {
  const date = new Date(iso);

  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });
}

export function formatMessageDateLabel(iso: string): string {
  const d = new Date(iso);
  const today = new Date();

  const isToday =
    d.toDateString() === today.toDateString();

  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const isYesterday =
    d.toDateString() === yesterday.toDateString();

  if (isToday) return 'Today';
  if (isYesterday) return 'Yesterday';

  return d.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

// ─────────────────────────────────────────────────────────────
// GROUPING LOGIC (IMPORTANT FOR DIVIDERS)
// ─────────────────────────────────────────────────────────────

export type GroupedMessage = {
  message: ChatMessage;
  dateLabel: string;
  showDivider: boolean;
};

export function groupMessagesByDate(
  messages: ChatMessage[]
): GroupedMessage[] {
  let lastLabel = '';

  return messages.map((m) => {
    const label = formatMessageDateLabel(m.created_at);
    const showDivider = label !== lastLabel;

    lastLabel = label;

    return {
      message: m,
      dateLabel: label,
      showDivider,
    };
  });
}

// ─────────────────────────────────────────────────────────────
// UI STATE HELPERS (FOR RENDER DECISIONS)
// ─────────────────────────────────────────────────────────────

export function getMessageVariant(message: ChatMessage): 'me' | 'them' {
  return message.actor === 'ACCOUNT' ? 'me' : 'them';
}

export function getAttachmentKind(
  message: ChatMessage
): 'image' | 'pdf' | 'none' {
  if (isImageAttachment(message)) return 'image';
  if (isPdfAttachment(message)) return 'pdf';
  return 'none';
}