// frontend/modules/ChatPanel/chat.supabase.ts
//
// Every Supabase communication for the chat module.
// Imports types and constants from chat.types.ts.
// No React. No useEffect. No useState.
// Each function does exactly one thing so the engine can combine them freely.

import { supabase } from '../../lib/supabase';
import type {
  ChatMessage,
  ChatThread,
  ChatSendPayload,
  ChatAttachmentPayload,
  ChatUnreadFlags,
  ChatNotificationPayload,
  ChatRealtimePayload,
  ChatAccountStoragePath,
  ChatAdminStoragePath,
} from './chat.types';
import {
  CHAT_BUCKET,
  CHAT_ACCEPTED_MIMES,
} from './chat.types';
import type { Session } from '@supabase/supabase-js';
// export type
export type { Session };

// ── Auth guard ────────────────────────────────────────────────────────────────

// Validates the session and returns the auth user ID.
// Throws if the session is missing or invalid.
// Called at the top of every engine action that requires authorization.
export function getAuthUserId(session: Session | null): string {
  if (!session?.user?.id) {
    throw new Error('No active session. Please log in again.');
  }
  return session.user.id;
}


// ── Upload timeout ────────────────────────────────────────────────────────────

// Races any upload promise against a 60 second timeout.
// If the upload hangs, the timeout resolves with an error so the UI
// never gets stuck in a permanent uploading state.
const UPLOAD_TIMEOUT_MS = 60_000;

function withUploadTimeout<T>(
  promise: Promise<T>
): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(
        () => reject(new Error('Upload timed out after 60 seconds. Please try again.')),
        UPLOAD_TIMEOUT_MS
      )
    ),
  ]);
}

// ── File validation ───────────────────────────────────────────────────────────

// Validates that a file's MIME type is in the accepted list before upload.
// Throws if the file type is not accepted.
export function validateChatFile(file: File): void {
  const accepted = CHAT_ACCEPTED_MIMES as readonly string[];
  if (!accepted.includes(file.type)) {
    throw new Error(
      `File type ${file.type} is not accepted. Please upload a JPG, PNG, HEIC, TIFF, DNG, or PDF.`
    );
  }
}

// ── Storage path builders ─────────────────────────────────────────────────────

// Builds a safe storage path for an account user upload.
// Uses a UUID filename so special characters in photo names can't break the path.
// Format: user/<auth_user_id>/<uuid>.<ext>
export function buildAccountStoragePath(
  authUserId: string,
  uuid: string,
  mimeType: string
): ChatAccountStoragePath {
  const ext = extForMimeType(mimeType);
  return {
    bucket: CHAT_BUCKET,
    path:   `user/${authUserId}/${uuid}.${ext}`,
  };
}

// Builds a safe storage path for an admin user upload.
// Format: admin/<uuid>.<ext>
export function buildAdminStoragePath(
  uuid: string,
  mimeType: string
): ChatAdminStoragePath {
  const ext = extForMimeType(mimeType);
  return {
    bucket: CHAT_BUCKET,
    path:   `admin/${uuid}.${ext}`,
  };
}

// Maps a MIME type to a safe file extension.
// Strips the original filename entirely so weird characters can't break paths.
function extForMimeType(mime: string): string {
  if (mime === 'image/jpeg')          return 'jpg';
  if (mime === 'image/png')           return 'png';
  if (mime === 'image/heic')          return 'heic';
  if (mime === 'image/tiff')          return 'tiff';
  if (mime === 'image/x-adobe-dng')   return 'dng';
  if (mime === 'application/pdf')     return 'pdf';
  return 'bin';
}

// ── Storage uploads ───────────────────────────────────────────────────────────

// Upload a file to the ChatUploads bucket for an account user.
// Validates the file type, races against a 60s timeout.
// Returns the typed storage path on success.
export async function uploadAccountChatFile(
  file: File,
  path: ChatAccountStoragePath['path']
): Promise<ChatAccountStoragePath> {
  validateChatFile(file);
  const { error } = await withUploadTimeout(
    supabase.storage
      .from(CHAT_BUCKET)
      .upload(path, file, { contentType: file.type, upsert: false })
  );
  if (error) throw new Error(error.message);
  return { bucket: CHAT_BUCKET, path };
}

// Upload a file to the ChatUploads bucket for an admin user.
// Validates the file type, races against a 60s timeout.
// Returns the typed storage path on success.
export async function uploadAdminChatFile(
  file: File,
  path: ChatAdminStoragePath['path']
): Promise<ChatAdminStoragePath> {
  validateChatFile(file);
  const { error } = await withUploadTimeout(
    supabase.storage
      .from(CHAT_BUCKET)
      .upload(path, file, { contentType: file.type, upsert: false })
  );
  if (error) throw new Error(error.message);
  return { bucket: CHAT_BUCKET, path };
}

// Remove a file from the ChatUploads bucket.
// Called to clean up orphaned files if the message insert fails after upload.
export async function removeChatFile(path: string): Promise<void> {
  const { error } = await supabase.storage
    .from(CHAT_BUCKET)
    .remove([path]);
  if (error) throw new Error(error.message);
}

// Resolve a storage path to a full public URL.
// Passes through full URLs unchanged so it's safe to call on any attachment_url.
export function resolveChatAttachmentUrl(url: string): string {
  return url.startsWith('http')
    ? url
    : supabase.storage.from(CHAT_BUCKET).getPublicUrl(url).data.publicUrl;
}

// ── Thread ────────────────────────────────────────────────────────────────────

// Fetch the chat thread for a given account_user_id.
// Returns null if no thread exists yet.
export async function fetchChatThread(
  accountUserId: string
): Promise<ChatThread | null> {
  const { data, error } = await supabase
    .from('chat_threads')
    .select('*')
    .eq('account_user_id', accountUserId)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data ?? null;
}

// Fetch a chat thread by its ID.
// Used by the admin side where the thread ID is already known.
export async function fetchChatThreadById(
  chatThreadId: string
): Promise<ChatThread | null> {
  const { data, error } = await supabase
    .from('chat_threads')
    .select('*')
    .eq('chat_thread_id', chatThreadId)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data ?? null;
}

// Create a new chat thread for a given account user.
// Returns the created thread row.
export async function createChatThread(
  accountUserId: string,
  authUserId: string
): Promise<ChatThread> {
  const { data, error } = await supabase
    .from('chat_threads')
    .insert({ account_user_id: accountUserId, auth_user_id: authUserId })
    .select('*')
    .single();
  if (error) throw new Error(error.message);
  return data;
}

// Fetch or create a chat thread for a given account user.
// Returns the existing thread if found, otherwise creates and returns a new one.
export async function fetchOrCreateChatThread(
  accountUserId: string,
  authUserId: string
): Promise<ChatThread> {
  const existing = await fetchChatThread(accountUserId);
  if (existing) return existing;
  return createChatThread(accountUserId, authUserId);
}

// ── Messages ──────────────────────────────────────────────────────────────────

// Fetch all messages for a thread, ordered oldest first.
export async function fetchChatMessages(
  chatThreadId: string
): Promise<ChatMessage[]> {
  const { data, error } = await supabase
    .from('chat_messages')
    .select('*')
    .eq('chat_thread_id', chatThreadId)
    .order('created_at', { ascending: true });
  if (error) throw new Error(error.message);
  return data ?? [];
}

// Insert a text message into chat_messages.
// Returns the inserted row.
export async function insertChatMessage(
  payload: ChatSendPayload
): Promise<ChatMessage> {
  const { data, error } = await supabase
    .from('chat_messages')
    .insert(payload)
    .select('*')
    .single();
  if (error) throw new Error(error.message);
  return data;
}

// Insert an attachment message into chat_messages.
// Returns the inserted row.
export async function insertChatAttachment(
  payload: ChatAttachmentPayload
): Promise<ChatMessage> {
  const { data, error } = await supabase
    .from('chat_messages')
    .insert(payload)
    .select('*')
    .single();
  if (error) throw new Error(error.message);
  return data;
}

// ── Unread flags ──────────────────────────────────────────────────────────────

// Update the unread flags on a chat thread.
export async function updateChatUnreadFlags(
  chatThreadId: string,
  flags: ChatUnreadFlags
): Promise<void> {
  const { error } = await supabase
    .from('chat_threads')
    .update(flags)
    .eq('chat_thread_id', chatThreadId);
  if (error) throw new Error(error.message);
}

// ── Notifications ─────────────────────────────────────────────────────────────

// Fire the send-admin-notification edge function.
// Called when an account user sends a message.
// Errors are swallowed — notification failure should never break the send flow.
export async function notifyAdmin(
  payload: ChatNotificationPayload
): Promise<void> {
  await supabase.functions
    .invoke('send-admin-notification', { body: payload })
    .catch(() => {});
}

// Fire the send-user-notification edge function.
// Called when an admin sends a message.
// Errors are swallowed — notification failure should never break the send flow.
export async function notifyUser(
  payload: ChatNotificationPayload
): Promise<void> {
  await supabase.functions
    .invoke('send-user-notification', { body: payload })
    .catch(() => {});
}

// ── Realtime subscription ─────────────────────────────────────────────────────

// Subscribe to new INSERT events on chat_messages for a given thread.
// Calls onMessage with each new ChatMessage as it arrives in realtime.
// Returns an unsubscribe function — the engine calls this on unmount
// inside the useEffect cleanup.
export function subscribeToChatMessages(
  chatThreadId: string,
  onMessage: (message: ChatMessage) => void
): () => void {
  const channel = supabase
    .channel(`chat_thread_${chatThreadId}`)
    .on(
      'postgres_changes',
      {
        event:  'INSERT',
        schema: 'public',
        table:  'chat_messages',
        filter: `chat_thread_id=eq.${chatThreadId}`,
      },
      (payload: ChatRealtimePayload) => {
        onMessage(payload.new);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}