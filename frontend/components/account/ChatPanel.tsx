import { useRef, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { fmtTime } from '../../lib/utils';

interface Props {
  messages: any[];
  chatInput: string;
  chatSending: boolean;
  chatUploading: boolean;
  chatOpen: boolean;
  chatEndRef: React.RefObject<HTMLDivElement>;
  chatFileRef: React.RefObject<HTMLInputElement>;
  setChatInput: (v: string) => void;
  setChatOpen: (v: boolean) => void;
  openChatDrawer: () => void;
  sendChat: () => void;
  handleChatFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function getAttachmentUrl(url: string) {
  return url.startsWith('http')
    ? url
    : supabase.storage.from('ChatUploads').getPublicUrl(url).data.publicUrl;
}

function fmtDate(iso: string) {
  const d = new Date(iso);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  if (d.toDateString() === today.toDateString()) return 'Today';
  if (d.toDateString() === yesterday.toDateString()) return 'Yesterday';
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

function DateDivider({ label }: { label: string }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.6em',
      margin: '0.8em 0',
    }}>
      <div style={{ flex: 1, height: '1px', background: 'var(--bg-deep)' }} />
      <span style={{
        fontFamily: 'var(--font-ui)',
        fontSize: '0.62em',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'var(--text)',
        whiteSpace: 'nowrap',
      }}>
        {label}
      </span>
      <div style={{ flex: 1, height: '1px', background: 'var(--bg-deep)' }} />
    </div>
  );
}

function MessageBubble({ m }: { m: any }) {
  const isMe = m.actor === 'ACCOUNT';
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: isMe ? 'flex-end' : 'flex-start',
      marginBottom: '0.9em',
    }}>
      <div style={{
        maxWidth: '78%',
        padding: '0.65em 1em',
        borderRadius: isMe ? '1.2em 1.2em 0.25em 1.2em' : '1.2em 1.2em 1.2em 0.25em',
        background: isMe
          ? 'var(--chat-bubble-me, var(--accent))'
          : 'var(--chat-bubble-them, var(--primary))',
        color: 'var(--chat-bubble-text, var(--text))',
        fontFamily: 'var(--font-ui)',
        fontSize: '1em',
        lineHeight: 1.65,
        boxShadow: '0 1px 4px rgba(0,0,0,0.18)',
        wordBreak: 'break-word',
      }}>
        {m.body && <div>{m.body}</div>}
        {m.attachment_url && m.attachment_type?.startsWith('image/') && (
          <img
            src={getAttachmentUrl(m.attachment_url)}
            alt="attachment"
            style={{
              maxWidth: '100%',
              maxHeight: '12em',
              objectFit: 'cover',
              marginTop: m.body ? '0.4em' : '0',
              borderRadius: '0.6em',
              display: 'block',
            }}
          />
        )}
        {m.attachment_url && m.attachment_type === 'application/pdf' && (
          <div style={{ marginTop: m.body ? '0.4em' : '0', fontSize: '0.88em' }}>
            📄 <a
              href={getAttachmentUrl(m.attachment_url)}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'inherit', textDecoration: 'underline' }}
            >
              Download PDF
            </a>
          </div>
        )}
      </div>
      <span style={{
        fontSize: '0.68em',
        color: 'var(--muted)',
        marginTop: '0.25em',
        fontFamily: 'var(--font-body)',
        paddingLeft: isMe ? '0' : '0.4em',
        paddingRight: isMe ? '0.4em' : '0',
      }}>
        {fmtTime(m.created_at)}
      </span>
    </div>
  );
}

export default function ChatPanel({
  messages, chatInput, chatSending, chatUploading, chatOpen,
  chatEndRef, chatFileRef,
  setChatInput, setChatOpen, openChatDrawer, sendChat, handleChatFile,
}: Props) {
  const chatRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scale font with panel width
  useEffect(() => {
    const el = chatRef.current;
    if (!el) return;
    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        const size = Math.max(19, Math.min(83, w / 28));
        el.style.fontSize = size + 'px';
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Also scroll on drawer open
  useEffect(() => {
    if (chatOpen) {
      setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  }, [chatOpen]);

  const inputBar = (
    <div style={{
      display: 'flex',
      gap: '0.5em',
      padding: '0.7em 0.9em',
      borderTop: '1px solid var(--border)',
      background: 'var(--bg-card)',
      alignItems: 'center',
    }}>
      <input
        type="file"
        ref={chatFileRef}
        accept=".jpg,.jpeg,.png,.tiff,.tif,.dng,.heic,.pdf"
        style={{ display: 'none' }}
        onChange={handleChatFile}
      />
      <button
        onClick={() => chatFileRef.current?.click()}
        disabled={chatUploading}
        title="Attach file"
        style={{
          background: 'var(--bg)',
          border: '1px solid var(--border)',
          color: 'var(--muted)',
          width: '2.2em', height: '2.2em',
          borderRadius: '50%',
          cursor: 'pointer',
          fontSize: '1em',
          flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'border-color 150ms ease',
        }}
      >
        {chatUploading ? '…' : '📎'}
      </button>
      <input
        className="acc-chat-input"
        value={chatInput}
        onChange={e => setChatInput(e.target.value)}
        placeholder="Type a message..."
        style={{
          flex: 1,
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '1.4em',
          padding: '0.5em 0.9em',
          color: 'var(--text)',
          fontFamily: 'var(--font-body)',
          fontSize: '0.9em',
          outline: 'none',
          transition: 'border-color 150ms ease',
        }}
        onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendChat(); } }}
      />
      <button
        onClick={sendChat}
        disabled={chatSending || !chatInput.trim()}
        style={{
          background: chatInput.trim() ? 'var(--bg-button)' : 'var(--border)',
          border: 'none',
          borderRadius: '50%',
          width: '2.2em', height: '2.2em',
          color: chatInput.trim() ? '#050505' : 'var(--muted)',
          fontWeight: 700,
          cursor: chatSending || !chatInput.trim() ? 'not-allowed' : 'pointer',
          fontSize: '1em',
          flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background 150ms ease',
        }}
      >
        {chatSending ? '…' : '↑'}
      </button>
    </div>
  );

  const messageList = (endRef: React.RefObject<HTMLDivElement>) => {
    let lastDate = '';
    return (
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '1em 0.9em',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {messages.length === 0 && (
          <p style={{
            fontFamily: 'var(--font-body)',
            fontStyle: 'italic',
            fontSize: '0.85em',
            color: 'var(--muted)',
            textAlign: 'center',
            margin: 'auto',
            opacity: 0.6,
          }}>
            No messages yet. Say hello!
          </p>
        )}
        {messages.map(m => {
          const msgDate = fmtDate(m.created_at);
          const showDivider = msgDate !== lastDate;
          lastDate = msgDate;
          return (
            <div key={m.chat_message_id}>
              {showDivider && <DateDivider label={msgDate} />}
              <MessageBubble m={m} />
            </div>
          );
        })}
        <div ref={endRef} />
      </div>
    );
  };

  return (
    <>
      {/* ── Desktop chat panel ── */}
      <div
        ref={chatRef}
        className="acc-right"
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          ['--chat-bubble-me' as any]: 'rgba(45,212,191,0.88)',
          ['--chat-bubble-them' as any]: 'var(--gold)',
          ['--chat-bubble-text' as any]: '#0a0a0a',
        }}
      >
        <div style={{
          padding: '0.9em 1em',
          borderBottom: '1px solid var(--border)',
          flexShrink: 0,
        }}>
          <span style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '0.7em',
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            color: 'var(--gold)',
          }}>
            Chat
          </span>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontStyle: 'italic',
            fontSize: '0.8em',
            color: 'var(--muted)',
            margin: '0.3em 0 0',
          }}>
            We're here to help — don't hesitate to reach out
          </p>
        </div>
        {messageList(chatEndRef)}
        {inputBar}
      </div>

      {/* ── Mobile chat bar ── */}
      <div
        className={`acc-chat-mobile-bar ${chatOpen ? 'hidden' : ''}`}
        onClick={openChatDrawer}
      >
        Chat with Admin
      </div>

      {/* ── Mobile chat drawer ── */}
      {chatOpen && (
        <div className="acc-chat-mobile-drawer" style={{
          background: 'var(--bg)',
          display: 'flex',
          flexDirection: 'column',
          ['--chat-bubble-me' as any]: 'rgba(45,212,191,0.88)',
          ['--chat-bubble-them' as any]: 'var(--gold)',
          ['--chat-bubble-text' as any]: '#0a0a0a',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.9em 1em',
            borderBottom: '1px solid var(--border)',
            flexShrink: 0,
          }}>
            <span style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.3em',
              color: 'var(--gold)',
            }}>
              Chat
            </span>
            <button
              onClick={() => setChatOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text)',
                cursor: 'pointer',
                fontSize: '19px',
                lineHeight: 1,
              }}
            >
              ↓
            </button>
          </div>
          {messageList(chatEndRef)}
          {inputBar}
        </div>
      )}
    </>
  );
}
