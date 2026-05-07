// frontend/modules/ChatPanel/chat.types.ts
//
// Pure TypeScript declarations for the chat module.
// Zero imports. No React. No Supabase. No logic.

// ── Actor ─────────────────────────────────────────────────────────────────────

// The three possible values stored in the chat_messages.actor column.
export type ActorType = 'ADMIN' | 'ACCOUNT' | 'SYSTEM';

// Who is currently operating the chat panel.
// Passed into the engine to determine perspective, unread flags,
// and which notification edge function to fire.
export type ChatActor = 'ADMIN' | 'ACCOUNT';

// ── Attachment types ──────────────────────────────────────────────────────────

// Every MIME type the chat panel accepts for upload.
export type ChatAttachmentMimeType =
  | 'image/jpeg'
  | 'image/png'
  | 'image/heic'
  | 'image/tiff'
  | 'image/x-adobe-dng'
  | 'application/pdf';

// The accept string passed to the file input element.
// Declared here so it never gets hardcoded in multiple places.
export type ChatAcceptedFileExtensions =
  '.jpg,.jpeg,.png,.tiff,.tif,.dng,.heic,.pdf';

// ── Database row shapes ───────────────────────────────────────────────────────

// Matches the chat_messages table exactly.
export interface ChatMessage {
  chat_message_id: string;
  created_at:      string;
  chat_thread_id:  string;
  actor:           ActorType;
  actor_id:        string;
  body:            string | null;
  attachment_url:  string | null;
  attachment_type: string | null;
}

// Matches the chat_threads table exactly.
export interface ChatThread {
  chat_thread_id:       string;
  account_user_id:      string;
  auth_user_id:         string | null;
  admin_has_unread:     boolean;
  account_has_unread:   boolean;
  last_message_at:      string | null;
  last_message_preview: string | null;
  updated_at:           string;
  created_at:           string;
}

// ── Insert payload shapes ─────────────────────────────────────────────────────

// What gets inserted into chat_messages for a text message.
export interface ChatSendPayload {
  chat_thread_id:  string;
  actor:           ActorType;
  actor_id:        string;
  body:            string;
  attachment_url:  null;
  attachment_type: null;
}

// What gets inserted into chat_messages for a file attachment.
export interface ChatAttachmentPayload {
  chat_thread_id:  string;
  actor:           ActorType;
  actor_id:        string;
  body:            null;
  attachment_url:  string;
  attachment_type: string;
}

// ── Optimistic message ────────────────────────────────────────────────────────

// A temporary message inserted into local state immediately on send,
// before the DB insert confirms. Uses a prefixed ID so it can be
// identified and removed if the insert fails.
export interface ChatOptimisticMessage extends ChatMessage {
  chat_message_id: `opt-${string}`;
}

// ── Unread flags ──────────────────────────────────────────────────────────────

// The shape of the unread flag update sent to chat_threads.
export interface ChatUnreadFlags {
  admin_has_unread:   boolean;
  account_has_unread: boolean;
}

// ── Realtime ──────────────────────────────────────────────────────────────────

// The shape of the payload Supabase realtime pushes when a new
// chat_messages row is inserted.
export interface ChatRealtimePayload {
  eventType: 'INSERT' | 'UPDATE' | 'DELETE';
  new:       ChatMessage;
  old:       Partial<ChatMessage>;
}

// ── Storage ───────────────────────────────────────────────────────────────────

// The storage path shape for account-side uploads.
// Format: user/<auth_user_id>/<uuid>.<ext>
export interface ChatAccountStoragePath {
  bucket: 'ChatUploads';
  path:   `user/${string}/${string}`;
}

// The storage path shape for admin-side uploads.
// Format: admin/<uuid>.<ext>
export interface ChatAdminStoragePath {
  bucket: 'ChatUploads';
  path:   `admin/${string}`;
}

// ── Notification payload ──────────────────────────────────────────────────────

// The body sent to both send-admin-notification and send-user-notification
// edge functions.
export interface ChatNotificationPayload {
  event_type: 'chat';
  thread_id?: string;
  user_id?:   string;
}

// ── Client-side only ──────────────────────────────────────────────────────────

// A local placeholder shown immediately when a file is selected,
// before the upload completes. Merged with real messages in the engine
// so the user sees a preview bubble instantly.
export interface PendingUpload {
  tempId:    string;
  objectUrl: string;
  fileType:  string;
  uploading: boolean;
  error:     string | null;
}

// ── Grouped messages ──────────────────────────────────────────────────────────

// The shape returned by groupMessagesByDate in the engine.
// Used by the panel to render date dividers between messages.
export interface ChatGroupedMessage {
  dateLabel:   string;
  showDivider: boolean;
  message:     ChatMessage;
}

// ── Engine config ─────────────────────────────────────────────────────────────

// What the engine needs to know to operate.
// Passed in from the panel — never hardcoded inside the engine.
export interface ChatEngineConfig {
  actor:         ChatActor;
  accountUserId: string;
}

// ── Constants ─────────────────────────────────────────────────────────────────

export const CHAT_BUCKET = 'ChatUploads' as const;

export const CHAT_ACCEPTED_FILES = '.jpg,.jpeg,.png,.tiff,.tif,.dng,.heic,.pdf' as const;

export const CHAT_ACCEPTED_MIMES = [
  'image/jpeg',
  'image/png',
  'image/heic',
  'image/tiff',
  'image/x-adobe-dng',
  'application/pdf',
] as const;

export interface ChatProcessedMessage extends ChatGroupedMessage {
  isMe:    boolean;
  isImage: boolean;
  isPdf:   boolean;
}

export interface PendingUpload {
  tempId:    string;
  objectUrl: string;
  fileType:  string;
  uploading: boolean;
  error:     string | null;
  isImage:   boolean;  // ← add
  isPdf:     boolean;  // ← add
}