// comp/admin/mobile/panels/users/hooks/useAdminUserChat.ts
// Extracted from ChatWidget.tsx — all send, file upload, pending upload logic.
// Admin sends as actor: 'ADMIN'. Uses same ChatUploads bucket as account side.

import { useState, useRef } from 'react';
import { supabase } from '../../../../../../lib/supabase';

export interface PendingUpload {
  tempId:    string;
  objectUrl: string;
  fileType:  string;
  uploading: boolean;
  error:     string | null;
}

export function useAdminUserChat(
  chatThread: any,
  session:    any,
  id:         string,
  setMessages: (fn: (prev: any[]) => any[]) => void,
) {
  const [chatInput,      setChatInput]      = useState('');
  const [chatSending,    setChatSending]    = useState(false);
  const [chatUploading,  setChatUploading]  = useState(false);
  const [chatError,      setChatError]      = useState<string | null>(null);
  const [pendingUploads, setPendingUploads] = useState<PendingUpload[]>([]);
  const chatEndRef  = useRef<HTMLDivElement>(null);
  const chatFileRef = useRef<HTMLInputElement>(null);

  const clearChatError = () => setChatError(null);

  const dismissPendingUpload = (tempId: string) => {
    setPendingUploads(prev => {
      const p = prev.find(u => u.tempId === tempId);
      if (p) URL.revokeObjectURL(p.objectUrl);
      return prev.filter(u => u.tempId !== tempId);
    });
  };

  // Mark thread read on open — exact from ChatWidget.tsx expandChat()
  const markThreadRead = async () => {
    if (!chatThread) return;
    await supabase.from('chat_threads')
      .update({ admin_has_unread: false })
      .eq('chat_thread_id', chatThread.chat_thread_id);
  };

  // Send text message — exact from ChatWidget.tsx sendChat(), actor ADMIN
  const sendChat = async () => {
    if (!chatInput.trim() || !chatThread || !session) return;
    const msgText = chatInput.trim();
    setChatInput('');
    setChatSending(true);

    const optimistic = {
      chat_message_id: 'opt-' + Date.now(),
      chat_thread_id:  chatThread.chat_thread_id,
      actor:           'ADMIN',
      actor_id:        session.user.id,
      body:            msgText,
      attachment_url:  null,
      attachment_type: null,
      created_at:      new Date().toISOString(),
    };
    setMessages(prev => [...prev, optimistic]);

    const { error } = await supabase.from('chat_messages').insert({
      chat_thread_id:  chatThread.chat_thread_id,
      actor:           'ADMIN',
      actor_id:        session.user.id,
      body:            msgText,
      attachment_url:  null,
      attachment_type: null,
    });

    if (error) {
      setChatError('Failed to send message. Please try again.');
      setMessages(prev => prev.filter(m => m.chat_message_id !== optimistic.chat_message_id));
      setChatInput(msgText);
      setChatSending(false);
      return;
    }

    // Exact from ChatWidget.tsx — send-user-notification + mark thread
    await supabase.functions.invoke('send-user-notification', {
      body: { event_type: 'chat', user_id: id },
    }).catch(() => {});
    await supabase.from('chat_threads')
      .update({ admin_has_unread: false, account_has_unread: true })
      .eq('chat_thread_id', chatThread.chat_thread_id);

    setChatSending(false);
  };

  // File upload — exact from ChatWidget.tsx handleChatFile(), same ChatUploads bucket
  const handleChatFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !chatThread || !session) return;
    if (chatFileRef.current) chatFileRef.current.value = '';

    const tempId    = 'pending-' + Date.now();
    const objectUrl = URL.createObjectURL(file);

    // Add pending upload optimistically
    setPendingUploads(prev => [...prev, { tempId, objectUrl, fileType: file.type, uploading: true, error: null }]);
    setChatUploading(true);

    const path = `admin/${Date.now()}_${file.name}`;
    const { data: uploadData, error: uploadErr } = await supabase.storage
      .from('ChatUploads')
      .upload(path, file, { contentType: file.type });

    if (uploadErr) {
      setPendingUploads(prev => prev.map(p => p.tempId === tempId ? { ...p, uploading: false, error: uploadErr.message } : p));
      setChatUploading(false);
      return;
    }

    const uploadedUrl  = uploadData?.path || path;
    const uploadedType = file.type;

    const { error: insertErr } = await supabase.from('chat_messages').insert({
      chat_thread_id:  chatThread.chat_thread_id,
      actor:           'ADMIN',
      actor_id:        session.user.id,
      body:            null,
      attachment_url:  uploadedUrl,
      attachment_type: uploadedType,
    });

    if (insertErr) {
      setPendingUploads(prev => prev.map(p => p.tempId === tempId ? { ...p, uploading: false, error: insertErr.message } : p));
      setChatUploading(false);
      return;
    }

    await supabase.functions.invoke('send-user-notification', {
      body: { event_type: 'chat', user_id: id },
    }).catch(() => {});
    await supabase.from('chat_threads')
      .update({ admin_has_unread: false, account_has_unread: true })
      .eq('chat_thread_id', chatThread.chat_thread_id);

    // Remove pending once realtime picks it up
    setPendingUploads(prev => {
      const p = prev.find(u => u.tempId === tempId);
      if (p) URL.revokeObjectURL(p.objectUrl);
      return prev.filter(u => u.tempId !== tempId);
    });
    setChatUploading(false);
  };

  return {
    chatInput, setChatInput,
    chatSending,
    chatUploading,
    chatError, clearChatError,
    pendingUploads, dismissPendingUpload,
    chatEndRef, chatFileRef,
    sendChat, handleChatFile,
    markThreadRead,
  };
}