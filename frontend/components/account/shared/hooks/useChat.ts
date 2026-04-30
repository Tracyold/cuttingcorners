// frontend/components/account/shared/hooks/useChat.ts
//
// Chat state hook for both mobile and desktop account views.
//
// ─── What changed in this revision ─────────────────────────────────────────
//   • handleChatFile is hardened against silent failures. Every exit path
//     clears chatUploading so the ⊕ button can never get stuck disabled.
//   • A 60-second timeout races every upload so a hung request times out
//     cleanly instead of freezing the UI forever.
//   • File picker path uses a UUID filename instead of the user-provided
//     one. iOS photo filenames sometimes contain characters that break
//     storage paths (spaces, unicode, parens) and that was a silent fail.
//   • New `chatError` state exposes upload failures to the UI so we can
//     show the user what went wrong.
//   • New `pendingUploads` state exposes in-flight uploads to the UI so
//     a bubble appears in the chat IMMEDIATELY on file select, showing
//     the image with an "Uploading…" overlay — not just a spinner on a
//     button that looks like nothing is happening.
//   • sendChat is unchanged in behavior — only touched to coexist with
//     the new return surface.

import { useState, useRef } from 'react';
import { supabase } from '../../../../lib/supabase';

// ── Types ────────────────────────────────────────────────────────────────────

// A client-side placeholder for an upload currently in flight. The chat
// renderer merges these with the real messages list so the user sees
// their photo immediately, even before the upload finishes.
export interface PendingUpload {
  tempId:    string;        // stable React key
  objectUrl: string;        // local preview URL (URL.createObjectURL)
  fileType:  string;        // MIME type
  uploading: boolean;       // still uploading?
  error:     string | null; // if non-null, upload failed
}

// Lightweight UUID fallback — crypto.randomUUID isn't universal on old iOS
const uid = () => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

// Map a MIME type to a safe extension. Strips the raw filename entirely
// so weird characters in photo names (spaces, emoji, etc) can't break
// the storage path.
function extForMimeType(mime: string): string {
  if (mime === 'image/jpeg') return 'jpg';
  if (mime === 'image/png')  return 'png';
  if (mime === 'image/heic') return 'heic';
  if (mime === 'image/tiff') return 'tiff';
  if (mime === 'image/x-adobe-dng') return 'dng';
  if (mime === 'application/pdf')   return 'pdf';
  return 'bin';
}

// ── Hook ─────────────────────────────────────────────────────────────────────

export function useChat(
  session: any,
  chatThread: any,
  setMessages: (fn: any) => void,
  setChatThread?: (fn: any) => void,
) {
  const [chatInput,      setChatInput]      = useState('');
  const [chatSending,    setChatSending]    = useState(false);
  const [chatOpen,       setChatOpen]       = useState(false);
  const [chatUploading,  setChatUploading]  = useState(false);
  const [chatError,      setChatError]      = useState<string | null>(null);
  const [pendingUploads, setPendingUploads] = useState<PendingUpload[]>([]);
  const chatEndRef  = useRef<HTMLDivElement>(null);
  const chatFileRef = useRef<HTMLInputElement>(null);

  // ── Send text ─────────────────────────────────────────────────────────────
  const sendChat = async () => {
    if (!chatInput.trim() || !chatThread || !session) return;
    const msgText = chatInput;
    setChatInput('');
    setChatSending(true);

    const optimisticMsg = {
      chat_message_id: 'opt-' + Date.now(),
      chat_thread_id:  chatThread.chat_thread_id,
      actor:           'ACCOUNT',
      actor_id:        session.user.id,
      body:            msgText,
      attachment_url:  null,
      attachment_type: null,
      created_at:      new Date().toISOString(),
    };
    setMessages((prev: any[]) => [...prev, optimisticMsg]);

    const { error } = await supabase.from('chat_messages').insert({
      chat_thread_id:  chatThread.chat_thread_id,
      actor:           'ACCOUNT',
      actor_id:        session.user.id,
      body:            msgText,
      attachment_url:  null,
      attachment_type: null,
    });
    if (error) {
      setMessages((prev: any[]) => prev.filter(m => m.chat_message_id !== optimisticMsg.chat_message_id));
      setChatInput(msgText);
      setChatSending(false);
      setChatError(error.message || 'Could not send message. Please try again.');
      return;
    }
    await supabase.functions.invoke('send-admin-notification', {
      body: { event_type: 'chat', thread_id: chatThread.chat_thread_id },
    }).catch(() => {});
    await supabase.from('chat_threads')
      .update({ account_has_unread: false, admin_has_unread: true })
      .eq('chat_thread_id', chatThread.chat_thread_id);
    setChatSending(false);
  };

  const openChatDrawer = async () => {
    setChatOpen(true);
    if (chatThread) {
      // Optimistically clear the unread dot in local state immediately
      setChatThread?.((prev: any) => ({ ...prev, account_has_unread: false }));
      await supabase.from('chat_threads')
        .update({ account_has_unread: false })
        .eq('chat_thread_id', chatThread.chat_thread_id);
    }
  };

  // ── Upload a file (image or pdf) ──────────────────────────────────────────
  // Hardened vs the old version:
  //   1. Validates inputs and sets chatUploading early
  //   2. Adds the file to pendingUploads IMMEDIATELY so the user sees
  //      a local preview bubble with an "Uploading…" overlay
  //   3. Races the Supabase upload against a 60s timeout so it can
  //      never hang forever
  //   4. Every exit path clears chatUploading (finally + settled flag)
  //   5. Logs every state transition so bugs are visible in console
  //   6. Surfaces errors via setChatError so the UI can show them
  const handleChatFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    // ALWAYS reset the input so the same file can be re-selected later.
    if (chatFileRef.current) chatFileRef.current.value = '';

    if (!file) return;
    if (!chatThread || !session?.user?.id) {
      setChatError('Chat thread not ready. Please try again in a moment.');
      return;
    }

    // Local preview bubble — appears instantly.
    const tempId    = uid();
    const objectUrl = URL.createObjectURL(file);
    setPendingUploads(prev => [
      ...prev,
      { tempId, objectUrl, fileType: file.type, uploading: true, error: null },
    ]);
    setChatUploading(true);
    setChatError(null);
    console.log(`[chat upload ${tempId}] starting`, { size: file.size, type: file.type });

    // Build a safe storage path. Shape stays the same: user/<uid>/<...>
    // but the filename is now a UUID + extension, free of weird chars.
    const ext  = extForMimeType(file.type);
    const path = `user/${session.user.id}/${tempId}.${ext}`;

    let settled = false;
    try {
      const uploadRace = Promise.race([
        supabase.storage
          .from('ChatUploads')
          .upload(path, file, { contentType: file.type, upsert: false }),
        new Promise<{ data: null; error: { message: string } }>((resolve) =>
          setTimeout(() => resolve({
            data: null,
            error: { message: 'Upload timed out after 60 seconds. Please try again.' },
          }), 60_000),
        ),
      ]);

      const result = await uploadRace;
      const upErr = (result as any)?.error;
      if (upErr) {
        settled = true;
        console.error(`[chat upload ${tempId}] upload error`, upErr);
        setPendingUploads(prev => prev.map(p => p.tempId === tempId
          ? { ...p, uploading: false, error: upErr.message ?? 'Upload failed' }
          : p));
        setChatError(upErr.message || 'Photo upload failed. Please try again.');
        return;
      }

      // Insert the chat message (attachment_url = storage path).
      const { error: insErr } = await supabase.from('chat_messages').insert({
        chat_thread_id:  chatThread.chat_thread_id,
        actor:           'ACCOUNT',
        actor_id:        session.user.id,
        body:            null,
        attachment_url:  path,
        attachment_type: file.type,
      });
      if (insErr) {
        settled = true;
        console.error(`[chat upload ${tempId}] insert error`, insErr);
        // Best-effort: clean up the orphaned file in storage.
        try { await supabase.storage.from('ChatUploads').remove([path]); } catch {}
        setPendingUploads(prev => prev.map(p => p.tempId === tempId
          ? { ...p, uploading: false, error: insErr.message ?? 'Message insert failed' }
          : p));
        setChatError(insErr.message || 'Could not attach photo. Please try again.');
        return;
      }

      // Fire-and-forget: admin notification + unread flag flip.
      supabase.functions.invoke('send-admin-notification', {
        body: { event_type: 'chat', thread_id: chatThread.chat_thread_id },
      }).catch(() => {});
      supabase.from('chat_threads')
        .update({ account_has_unread: false, admin_has_unread: true })
        .eq('chat_thread_id', chatThread.chat_thread_id)
        .then(() => {});

      // Remove the pending entry — the real message will come in via
      // realtime subscription (or the next refresh). No need to keep
      // the local preview once the real row exists.
      settled = true;
      setPendingUploads(prev => {
        const hit = prev.find(p => p.tempId === tempId);
        if (hit) { try { URL.revokeObjectURL(hit.objectUrl); } catch {} }
        return prev.filter(p => p.tempId !== tempId);
      });
      console.log(`[chat upload ${tempId}] success`);
    } catch (err: any) {
      settled = true;
      console.error(`[chat upload ${tempId}] exception`, err);
      setPendingUploads(prev => prev.map(p => p.tempId === tempId
        ? { ...p, uploading: false, error: err?.message ?? 'Upload failed' }
        : p));
      setChatError(err?.message || 'Photo upload failed. Please try again.');
    } finally {
      // Belt-and-suspenders: whatever happens, make sure the button
      // can be tapped again.
      if (!settled) {
        console.warn(`[chat upload ${tempId}] exited without settling — forcing state reset`);
        setPendingUploads(prev => prev.map(p => p.tempId === tempId
          ? { ...p, uploading: false, error: 'Upload did not complete.' }
          : p));
      }
      setChatUploading(false);
    }
  };

  // Let the UI ask us to dismiss an error banner.
  const clearChatError = () => setChatError(null);

  // Let the UI ask us to dismiss a failed pending upload (so the red
  // bubble goes away when the user taps an X on it).
  const dismissPendingUpload = (tempId: string) => {
    setPendingUploads(prev => {
      const hit = prev.find(p => p.tempId === tempId);
      if (hit) { try { URL.revokeObjectURL(hit.objectUrl); } catch {} }
      return prev.filter(p => p.tempId !== tempId);
    });
  };

  return {
    chatInput, setChatInput,
    chatSending,
    chatOpen, setChatOpen,
    chatUploading,
    chatError,         clearChatError,
    pendingUploads,    dismissPendingUpload,
    chatEndRef, chatFileRef,
    sendChat, openChatDrawer, handleChatFile,
  };
}
