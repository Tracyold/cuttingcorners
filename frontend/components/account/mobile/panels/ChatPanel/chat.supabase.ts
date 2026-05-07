import { supabase } from '../../../../../lib/supabase';
import type { ChatMessage, CreateChatMessageInput } from './chat.types';

// ─────────────────────────────────────────────
// CONFIG (explicit, not hidden)
// ─────────────────────────────────────────────

const CHAT_BUCKET = 'ChatUploads';

// ─────────────────────────────────────────────
// MESSAGES
// ─────────────────────────────────────────────

export async function fetchMessages(threadId: string) {
  return supabase
    .from('chat_messages')
    .select('*')
    .eq('chat_thread_id', threadId)
    .order('created_at', { ascending: true });
}

export async function insertMessage(input: CreateChatMessageInput) {
  return supabase
    .from('chat_messages')
    .insert(input);
}

// ─────────────────────────────────────────────
// REALTIME
// ─────────────────────────────────────────────

export function subscribeToThread(
  threadId: string,
  onInsert: (msg: ChatMessage) => void
) {
  return supabase
    .channel(`chat:${threadId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'chat_messages',
        filter: `chat_thread_id=eq.${threadId}`,
      },
      (payload) => onInsert(payload.new as ChatMessage)
    )
    .subscribe();
}

export function removeChannel(channel: any) {
  return supabase.removeChannel(channel);
}

// ─────────────────────────────────────────────
// STORAGE (FIXED: explicit chat attachment logic)
// ─────────────────────────────────────────────

export async function uploadChatAttachment(params: {
  path: string;
  file: File;
  contentType: string;
}) {
  const { path, file, contentType } = params;

  return supabase.storage
    .from(CHAT_BUCKET)
    .upload(path, file, {
      contentType,
      upsert: false,
    });
}

export async function deleteChatAttachment(path: string) {
  return supabase.storage
    .from(CHAT_BUCKET)
    .remove([path]);
}

export function getChatAttachmentUrl(path: string) {
  return supabase.storage
    .from(CHAT_BUCKET)
    .getPublicUrl(path).data.publicUrl;
}