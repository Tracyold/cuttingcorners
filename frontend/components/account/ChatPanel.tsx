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

export default function ChatPanel({
  messages, chatInput, chatSending, chatUploading, chatOpen,
  chatEndRef, chatFileRef,
  setChatInput, setChatOpen, openChatDrawer, sendChat, handleChatFile,
}: Props) {
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = chatRef.current;
    if (!el) return;
    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        const size = Math.max(12, Math.min(20, w / 22));
        el.style.fontSize = size + 'px';
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Right panel — Chat (desktop) */}
      <div className="acc-right" ref={chatRef}>
        <div className="acc-chat-header">
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.75em', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--gold)' }}>Chat</span>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8em', color: 'var(--text-muted)', marginTop: '5px' }}>We're here to help — don't hesitate to reach out</p>
        </div>
        <div className="acc-chat-messages">
          {messages.map(m => (
            <div key={m.chat_message_id} style={{ display: 'flex', flexDirection: 'column', alignItems: m.actor === 'ACCOUNT' ? 'flex-end' : 'flex-start', marginBottom: '13px' }}>
              <div style={{
                maxWidth: '80%', padding: 'clamp(8px, 1vw, 14px) clamp(10px, 1.2vw, 18px)', borderRadius: '14px',
                background: m.actor === 'ACCOUNT' ? 'rgba(45,212,191,1)' : 'var(--gold)',
                color: 'var(--bg)', fontFamily: 'var(--font-body)', fontSize: '1em', lineHeight: 1.7,
              }}>
                {m.body && <div>{m.body}</div>}
                {m.attachment_url && m.attachment_type?.startsWith('image/') && (
                  <img src={m.attachment_url.startsWith('http') ? m.attachment_url : supabase.storage.from('ChatUploads').getPublicUrl(m.attachment_url).data.publicUrl} alt="attachment" style={{ maxWidth: 'clamp(120px, 15vw, 220px)', maxHeight: 'clamp(120px, 15vw, 220px)', objectFit: 'cover', marginTop: m.body ? '6px' : '0', borderRadius: '6px' }} />
                )}
                {m.attachment_url && m.attachment_type === 'application/pdf' && (
                  <div style={{ marginTop: m.body ? '7px' : '0', fontSize: '0.9em' }}>📄 <a href={m.attachment_url.startsWith('http') ? m.attachment_url : supabase.storage.from('ChatUploads').getPublicUrl(m.attachment_url).data.publicUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--bg)', textDecoration: 'underline' }}>Download PDF</a></div>
                )}
              </div>
              <span style={{ fontSize: '0.75em', color: 'var(--text-muted)', marginTop: '3px', fontFamily: 'var(--font-body)' }}>{fmtTime(m.created_at)}</span>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        <div className="acc-chat-input-bar">
          <input type="file" ref={chatFileRef} accept=".jpg,.jpeg,.png,.tiff,.tif,.dng,.heic,.pdf" style={{ display: 'none' }} onChange={handleChatFile} />
          <button onClick={() => chatFileRef.current?.click()} disabled={chatUploading} style={{ background: 'none', border: '1px solid var(--border)', color: 'var(--text-muted)', padding: 'clamp(8px, 0.9vw, 13px)', cursor: 'pointer', fontSize: '1.1em', flexShrink: 0 }} title="Attach file">{chatUploading ? '...' : '📎'}</button>
          <input value={chatInput} onChange={e => setChatInput(e.target.value)}
            placeholder="Type a message..." className="acc-chat-input"
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendChat(); } }} />
          <button onClick={sendChat} disabled={chatSending || !chatInput.trim()} className="acc-chat-send">
            {chatSending ? '...' : '→'}
          </button>
        </div>
      </div>

      {/* Mobile chat drawer */}
      <div className={`acc-chat-mobile-bar ${chatOpen ? 'hidden' : ''}`} onClick={openChatDrawer}>
        Chat with Admin
      </div>
      {chatOpen && (
        <div className="acc-chat-mobile-drawer">
          <div className="acc-chat-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.8em', textTransform: 'uppercase', letterSpacing: '0.3em', color: 'var(--gold)' }}>Chat</span>
            <button onClick={() => setChatOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.2em' }}>↓</button>
          </div>
          <div className="acc-chat-messages" style={{ flex: 1 }}>
            {messages.map(m => (
              <div key={m.chat_message_id} style={{ display: 'flex', flexDirection: 'column', alignItems: m.actor === 'ACCOUNT' ? 'flex-end' : 'flex-start', marginBottom: '13px' }}>
                <div style={{
                  maxWidth: '80%', padding: 'clamp(8px, 1vw, 14px) clamp(10px, 1.2vw, 18px)', borderRadius: '1.7px',
                  background: m.actor === 'ACCOUNT' ? 'rgba(45,212,191,1)' : 'var(--gold)',
                  color: 'var(--bg)', fontFamily: 'var(--font-body)', fontSize: '1em',
                }}>
                  {m.body && <div>{m.body}</div>}
                  {m.attachment_url && m.attachment_type?.startsWith('image/') && (
                    <img src={m.attachment_url.startsWith('http') ? m.attachment_url : supabase.storage.from('ChatUploads').getPublicUrl(m.attachment_url).data.publicUrl} alt="attachment" style={{ maxWidth: 'clamp(120px, 15vw, 220px)', maxHeight: 'clamp(120px, 15vw, 220px)', objectFit: 'cover', marginTop: m.body ? '6px' : '0', borderRadius: '6px' }} />
                  )}
                  {m.attachment_url && m.attachment_type === 'application/pdf' && (
                    <div style={{ marginTop: m.body ? '6px' : '0', fontSize: '0.8em' }}>📄 <a href={m.attachment_url.startsWith('http') ? m.attachment_url : supabase.storage.from('ChatUploads').getPublicUrl(m.attachment_url).data.publicUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--bg)', textDecoration: 'underline' }}>Download PDF</a></div>
                  )}
                </div>
                <span style={{ fontSize: '0.7em', color: 'var(--text-muted)', marginTop: '4px' }}>{fmtTime(m.created_at)}</span>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <div className="acc-chat-input-bar">
            <button onClick={() => chatFileRef.current?.click()} disabled={chatUploading} style={{ background: 'none', border: '1px solid var(--border)', color: 'var(--text-muted)', padding: 'clamp(8px, 0.9vw, 12px)', cursor: 'pointer', fontSize: '1em', flexShrink: 0 }}>{chatUploading ? '...' : '📎'}</button>
            <input value={chatInput} onChange={e => setChatInput(e.target.value)} placeholder="Type a message..." className="acc-chat-input"
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendChat(); } }} />
            <button onClick={sendChat} disabled={chatSending || !chatInput.trim()} className="acc-chat-send">{chatSending ? '...' : '→'}</button>
          </div>
        </div>
      )}
    </>
  );
}
