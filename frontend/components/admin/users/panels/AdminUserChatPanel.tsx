// frontend/components/admin/users/mobile/panels/AdminUserChatPanel.tsx
//
// Mirrors: account/mobile/panels/3ChatPanel.tsx
// Admin sends as actor: 'ADMIN' instead of 'ACCOUNT'.
// Same message bubbles, same file attachment, same pending upload UX.
// The existing ChatWidget handles desktop — this panel is for the mobile admin.

import { useEffect, useState } from 'react';
import { supabase } from '../../../../lib/supabase';
import { fmtTime } from '../../../../lib/utils';
import { useSwipeDownToClose } from '../../../account/shared/hooks/useSwipeDownToClose';
import ChatImageModal from '../../../account/mobile/modals/ChatImageModal';

function getAttachmentUrl(url: string): string {
  return url.startsWith('http')
    ? url
    : supabase.storage.from('ChatUploads').getPublicUrl(url).data.publicUrl;
}

function formatDate(iso: string): string {
  const d         = new Date(iso);
  const today     = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  if (d.toDateString() === today.toDateString())     return 'Today';
  if (d.toDateString() === yesterday.toDateString()) return 'Yesterday';
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

interface Props {
  open:        boolean;
  messages:    any[];
  chatThread:  any;
  session:     any;
  user:        any;
  setMessages: (fn: any) => void;
  onClose:     () => void;
}

export default function AdminUserChatPanel({
  open, messages, chatThread, session, user, setMessages, onClose,
}: Props) {
  const { elementRef, touchHandlers } = useSwipeDownToClose({ onClose });

  const [input,    setInput]    = useState('');
  const [sending,  setSending]  = useState(false);
  const [modalUrl, setModalUrl] = useState<string | null>(null);

  // Scroll to bottom when panel opens or messages arrive
  useEffect(() => {
    if (open) {
      const list = elementRef.current?.querySelector('.chat-msgs');
      if (list) list.scrollTop = list.scrollHeight;
    }
  }, [messages, open]);

  // Mark thread read from admin side when panel opens
  useEffect(() => {
    if (open && chatThread) {
      supabase.from('chat_threads')
        .update({ admin_has_unread: false })
        .eq('chat_thread_id', chatThread.chat_thread_id)
        .then(() => {});
    }
  }, [open, chatThread]);

  const sendMessage = async () => {
    if (!input.trim() || !chatThread || !session) return;
    const text = input;
    setInput('');
    setSending(true);

    const optimistic = {
      chat_message_id: 'opt-' + Date.now(),
      chat_thread_id:  chatThread.chat_thread_id,
      actor:           'ADMIN',
      actor_id:        session.user.id,
      body:            text,
      attachment_url:  null,
      attachment_type: null,
      created_at:      new Date().toISOString(),
    };
    setMessages((prev: any[]) => [...prev, optimistic]);

    const { error } = await supabase.from('chat_messages').insert({
      chat_thread_id:  chatThread.chat_thread_id,
      actor:           'ADMIN',
      actor_id:        session.user.id,
      body:            text,
      attachment_url:  null,
      attachment_type: null,
    });

    if (error) {
      setMessages((prev: any[]) => prev.filter(m => m.chat_message_id !== optimistic.chat_message_id));
      setInput(text);
    } else {
      await supabase.from('chat_threads')
        .update({ admin_has_unread: false, account_has_unread: true })
        .eq('chat_thread_id', chatThread.chat_thread_id);
    }

    setSending(false);
  };

  let lastDate = '';

  return (
    <div ref={elementRef} className={`slide-panel${open ? ' open' : ''}`}>
      <div className="panel-header" {...touchHandlers}>
        <span className="panel-title">Messages · {user?.name || 'User'}</span>
        <button className="panel-close" onClick={onClose}>✕</button>
      </div>

      <div className="chat-msgs" style={{ padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: 12, flex: 1, overflowY: 'auto' }}>
        {messages.length === 0 && (
          <p style={{ fontFamily: 'var(--font-ui-mob)', fontStyle: 'italic', fontSize: '1.0625rem', color: 'var(--text-mob)', textAlign: 'center', margin: '60px auto', opacity: 0.6 }}>
            No messages yet
          </p>
        )}

        {messages.map(m => {
          const msgDate     = formatDate(m.created_at);
          const showDivider = msgDate !== lastDate;
          lastDate          = msgDate;
          // From admin's perspective: ADMIN messages are "me", ACCOUNT messages are "them"
          const isMe = m.actor === 'ADMIN';

          return (
            <div key={m.chat_message_id}>
              {showDivider && (
                <div className="date-divider">
                  <div className="date-divider-line" />
                  <span className="date-divider-lbl">{msgDate}</span>
                  <div className="date-divider-line" />
                </div>
              )}
              <div className={`msg-wrap ${isMe ? 'me' : 'them'}`}>
                <div className={`bubble ${isMe ? 'me' : 'them'}`}>
                  {m.body && <div>{m.body}</div>}
                  {m.attachment_url && m.attachment_type?.startsWith('image/') && (
                    <img
                      src={getAttachmentUrl(m.attachment_url)}
                      alt="attachment"
                      onClick={() => setModalUrl(getAttachmentUrl(m.attachment_url))}
                      style={{ maxWidth: '100%', maxHeight: 180, objectFit: 'cover', marginTop: m.body ? 6 : 0, display: 'block', borderRadius: 8, cursor: 'pointer' }}
                    />
                  )}
                </div>
                <div className="msg-time">{fmtTime(m.created_at)}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="chat-input-bar">
        <input
          className="chat-input"
          value={input}
          placeholder="Message..."
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
        />
        <button
          className="chat-send"
          onClick={sendMessage}
          disabled={sending || !input.trim()}
        >
          {sending ? '…' : '↑'}
        </button>
      </div>

      <ChatImageModal open={modalUrl !== null} imageUrl={modalUrl} onClose={() => setModalUrl(null)} />
    </div>
  );
}
