// frontend/modules/ChatPanel/chat.engine.ts
//
// All chat logic for both account and admin sides.
// Imports from chat.types.ts, chat.props.ts, chat.helpers.ts, and chat.supabase.ts only.
// No design. No CSS. No hardcoded strings. No direct Supabase calls.
//
// Auth is validated once at hook initialization via getAuthUserId.
// If session is invalid the hook throws before any state or Supabase
// call is attempted. The parent component is responsible for ensuring
// a valid session exists before mounting any component that uses this engine.
//
// Produces processedMessages so the panel only ever renders, never processes.

import { useState, useEffect, useRef } from 'react';
import type {
  ChatMessage,
  ChatThread,
  PendingUpload,
  ChatOptimisticMessage,
  ChatProcessedMessage,
} from './chat.types';
import type { ChatEngineOutput } from './chat.props';
import {
  generateUid,
  groupMessagesByDate,
  isMyMessage,
  isImageAttachment,
  isPdfAttachment,
  isPendingImage,
  isPendingPdf,
} from './chat.helpers';
import {
  Session,
  getAuthUserId,
  fetchOrCreateChatThread,
  fetchChatMessages,
  insertChatMessage,
  insertChatAttachment,
  uploadAccountChatFile,
  uploadAdminChatFile,
  buildAccountStoragePath,
  buildAdminStoragePath,
  removeChatFile,
  updateChatUnreadFlags,
  notifyAdmin,
  notifyUser,
  subscribeToChatMessages,
  validateChatFile,
} from './chat.supabase';

// ── Message processor ─────────────────────────────────────────────────────────

// Takes raw ChatMessage[] and produces ChatProcessedMessage[] with all
// flags pre-computed so the panel never has to run any logic itself.
function processMessages(
  messages: ChatMessage[],
  actor: 'ADMIN' | 'ACCOUNT'
): ChatProcessedMessage[] {
  return groupMessagesByDate(messages).map(grouped => ({
    ...grouped,
    isMe:    isMyMessage(grouped.message, actor),
    isImage: isImageAttachment(grouped.message),
    isPdf:   isPdfAttachment(grouped.message),
  }));
}

// ── Shared internal hook ──────────────────────────────────────────────────────

// Contains all logic shared between account and admin engines.
// Not exported — consumed only by useAccountChat and useAdminChat.
//
// Throws immediately if session is invalid. The parent component must
// guard against mounting this hook without a valid session.
function useChatCore(
  session: Session | null,
  accountUserId: string,
  actor: 'ADMIN' | 'ACCOUNT',
): ChatEngineOutput {

  // ── Single auth check at initialization ──
  // If this throws, nothing below runs. No state, no subscriptions,
  // no Supabase calls. The entire hook fails cleanly.
  const authUserId = getAuthUserId(session);

  const [chatThread,        setChatThread]        = useState<ChatThread | null>(null);
  const [messages,          setMessages]          = useState<ChatMessage[]>([]);
  const [processedMessages, setProcessedMessages] = useState<ChatProcessedMessage[]>([]);
  const [chatInput,         setChatInput]         = useState('');
  const [chatSending,       setChatSending]       = useState(false);
  const [chatUploading,     setChatUploading]     = useState(false);
  const [chatOpen,          setChatOpen]          = useState(false);
  const [chatError,         setChatError]         = useState<string | null>(null);
  const [pendingUploads,    setPendingUploads]    = useState<PendingUpload[]>([]);

  const chatEndRef  = useRef<HTMLDivElement>(null);
  const chatFileRef = useRef<HTMLInputElement>(null);

  // ── Re-process messages whenever raw messages or actor changes ──
  useEffect(() => {
    setProcessedMessages(processMessages(messages, actor));
  }, [messages, actor]);

  // ── Load thread and messages on mount ──
  // Scoped to accountUserId so admin never loads the wrong user's messages.
  useEffect(() => {
    if (!accountUserId) return;
    let cancelled = false;
    (async () => {
      try {
        const thread = await fetchOrCreateChatThread(accountUserId, authUserId);
        if (cancelled) return;
        setChatThread(thread);
        const msgs = await fetchChatMessages(thread.chat_thread_id);
        if (cancelled) return;
        setMessages(msgs);
      } catch (err) {
        if (cancelled) return;
        if (err instanceof Error) setChatError(err.message);
      }
    })();
    return () => { cancelled = true; };
  }, [authUserId, accountUserId]);

  // ── Realtime subscription ──
  // Scoped to the thread so only messages for this user arrive.
  useEffect(() => {
    if (!chatThread) return;
    const unsubscribe = subscribeToChatMessages(
      chatThread.chat_thread_id,
      (newMessage) => {
        setMessages(prev => {
          if (prev.some(m => m.chat_message_id === newMessage.chat_message_id)) return prev;
          return [...prev, newMessage];
        });
      }
    );
    return unsubscribe;
  }, [chatThread?.chat_thread_id]);

  // ── Auto scroll ──
  useEffect(() => {
    if (chatOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [processedMessages, pendingUploads, chatOpen]);

  // ── Mark thread read ──
  const markThreadRead = async (): Promise<void> => {
    if (!chatThread) return;
    try {
      await updateChatUnreadFlags(
        chatThread.chat_thread_id,
        actor === 'ACCOUNT'
          ? { account_has_unread: false, admin_has_unread: chatThread.admin_has_unread }
          : { admin_has_unread: false, account_has_unread: chatThread.account_has_unread }
      );
    } catch (err) {
      if (err instanceof Error) setChatError(err.message);
    }
  };

  // ── Open chat drawer ──
  const openChatDrawer = async (): Promise<void> => {
    setChatOpen(true);
    await markThreadRead();
  };

  // ── Send text message ──
  const sendChat = async (): Promise<void> => {
    if (!chatInput.trim() || !chatThread) return;
    const msgText = chatInput.trim();
    setChatInput('');
    setChatSending(true);

    const optimistic: ChatOptimisticMessage = {
      chat_message_id: `opt-${generateUid()}`,
      chat_thread_id:  chatThread.chat_thread_id,
      actor,
      actor_id:        authUserId,
      body:            msgText,
      attachment_url:  null,
      attachment_type: null,
      created_at:      new Date().toISOString(),
    };
    setMessages(prev => [...prev, optimistic]);

    try {
      await insertChatMessage({
        chat_thread_id:  chatThread.chat_thread_id,
        actor,
        actor_id:        authUserId,
        body:            msgText,
        attachment_url:  null,
        attachment_type: null,
      });

      if (actor === 'ACCOUNT') {
        await updateChatUnreadFlags(chatThread.chat_thread_id, {
          account_has_unread: false,
          admin_has_unread:   true,
        });
        await notifyAdmin({
          event_type: 'chat',
          thread_id:  chatThread.chat_thread_id,
        });
      } else {
        await updateChatUnreadFlags(chatThread.chat_thread_id, {
          admin_has_unread:   false,
          account_has_unread: true,
        });
        await notifyUser({
          event_type: 'chat',
          user_id:    accountUserId,
        });
      }
    } catch (err) {
      setMessages(prev => prev.filter(m => m.chat_message_id !== optimistic.chat_message_id));
      setChatInput(msgText);
      if (err instanceof Error) setChatError(err.message);
    } finally {
      setChatSending(false);
    }
  };

  // ── Upload file ──
  const handleChatFile = async (
    e: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file = e.target.files?.[0];
    if (chatFileRef.current) chatFileRef.current.value = '';
    if (!file || !chatThread) return;

    try {
      validateChatFile(file);
    } catch (err) {
      if (err instanceof Error) setChatError(err.message);
      return;
    }

    const tempId    = generateUid();
    const objectUrl = URL.createObjectURL(file);

    setPendingUploads(prev => [
      ...prev,
      {
        tempId,
        objectUrl,
        fileType:  file.type,
        uploading: true,
        error:     null,
        isImage:   isPendingImage(file.type),
        isPdf:     isPendingPdf(file.type),
      },
    ]);
    setChatUploading(true);
    setChatError(null);

    const storagePath = actor === 'ACCOUNT'
      ? buildAccountStoragePath(authUserId, tempId, file.type)
      : buildAdminStoragePath(tempId, file.type);

    try {
      if (actor === 'ACCOUNT') {
        await uploadAccountChatFile(file, storagePath.path as `user/${string}/${string}`);
      } else {
        await uploadAdminChatFile(file, storagePath.path as `admin/${string}`);
      }

      await insertChatAttachment({
        chat_thread_id:  chatThread.chat_thread_id,
        actor,
        actor_id:        authUserId,
        body:            null,
        attachment_url:  storagePath.path,
        attachment_type: file.type,
      });

      if (actor === 'ACCOUNT') {
        await updateChatUnreadFlags(chatThread.chat_thread_id, {
          account_has_unread: false,
          admin_has_unread:   true,
        });
        await notifyAdmin({
          event_type: 'chat',
          thread_id:  chatThread.chat_thread_id,
        });
      } else {
        await updateChatUnreadFlags(chatThread.chat_thread_id, {
          admin_has_unread:   false,
          account_has_unread: true,
        });
        await notifyUser({
          event_type: 'chat',
          user_id:    accountUserId,
        });
      }

      setPendingUploads(prev => {
        const hit = prev.find(p => p.tempId === tempId);
        if (hit) { try { URL.revokeObjectURL(hit.objectUrl); } catch {} }
        return prev.filter(p => p.tempId !== tempId);
      });

    } catch (err) {
      const message = err instanceof Error ? err.message : 'Upload failed';
      setPendingUploads(prev =>
        prev.map(p => p.tempId === tempId
          ? { ...p, uploading: false, error: message }
          : p
        )
      );
      setChatError(message);
      try { await removeChatFile(storagePath.path); } catch {}
    } finally {
      setChatUploading(false);
    }
  };

  const clearChatError = () => setChatError(null);

  const dismissPendingUpload = (tempId: string) => {
    setPendingUploads(prev => {
      const hit = prev.find(p => p.tempId === tempId);
      if (hit) { try { URL.revokeObjectURL(hit.objectUrl); } catch {} }
      return prev.filter(p => p.tempId !== tempId);
    });
  };

  return {
    chatThread,
    messages,          setMessages,
    processedMessages,
    chatInput,         setChatInput,
    chatSending,
    chatUploading,
    chatOpen,          setChatOpen,
    chatError,         clearChatError,
    pendingUploads,    dismissPendingUpload,
    chatEndRef,        chatFileRef,
    sendChat,          handleChatFile,
    openChatDrawer,    markThreadRead,
  };
}

// ── Account engine ────────────────────────────────────────────────────────────

// Self-contained engine for the account-side panel.
// Actor is always ACCOUNT.
// Parent must ensure session is valid before calling this hook.
export function useAccountChat(
  session: Session | null,
  accountUserId: string,
): ChatEngineOutput {
  return useChatCore(session, accountUserId, 'ACCOUNT');
}

// ── Admin engine ──────────────────────────────────────────────────────────────

// Self-contained engine for the admin-side panel.
// Actor is always ADMIN.
// accountUserId scopes thread and messages to the specific user
// the admin is viewing — never leaks messages across users.
// Parent must ensure session is valid before calling this hook.
export function useAdminChat(
  session: Session | null,
  accountUserId: string,
): ChatEngineOutput {
  return useChatCore(session, accountUserId, 'ADMIN');
}