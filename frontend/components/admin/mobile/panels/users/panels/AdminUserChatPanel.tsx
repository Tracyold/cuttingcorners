// comp/admin/mobile/panels/users/panels/AdminUserChatPanel.tsx
// Mirrors 3ChatPanel.tsx exactly — same UI, same CSS classes, same features.
// Date dividers, pending uploads, image modal, PDF, error banner, attach button.
// Admin sends as actor: ADMIN. Uses ChatUploads bucket same as account side.

import { useEffect, useState } from 'react';
import { supabase } from '../../../../../../lib/supabase';
import { fmtTime } from '../../../../../../lib/utils';
import { useSwipeDownToClose } from '../../../../../account/shared/hooks/useSwipeDownToClose';
import { useAdminUserDetail } from '../hooks/useAdminUserDetail';
import { useAdminUserChat } from '../hooks/useAdminUserChat';
import ChatImageModal from '../../../../../account/mobile/modals/ChatImageModal';

function getAttachmentUrl(url: string): string {
  return url.startsWith('http')
    ? url
    : supabase.storage.from('ChatUploads').getPublicUrl(url).data.publicUrl;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  const today     = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  if (d.toDateString() === today.toDateString())     return 'Today';
  if (d.toDateString() === yesterday.toDateString()) return 'Yesterday';
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

interface Props {
  open:    boolean;
  id:      string;
  session: any;
  onClose: () => void;
}

export default function AdminUserChatPanel({ open, id, session, onClose }: Props) {
  const { elementRef, touchHandlers } = useSwipeDownToClose({ onClose });
  const { user, chatThread, messages, setMessages } = useAdminUserDetail(id, session);
  const {
    chatInput, setChatInput,
    chatSending, chatUploading,
    chatError, clearChatError,
    pendingUploads, dismissPendingUpload,
    chatEndRef, chatFileRef,
    sendChat, handleChatFile,
    markThreadRead,
  } = useAdminUserChat(chatThread, session, id, setMessages);

  const [modalImageUrl, setModalImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (open) chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, pendingUploads, open]);

  useEffect(() => {
    if (open) markThreadRead();
  }, [open]);

  let lastDate = '';

  return (
    <div ref={elementRef} className={`slide-panel${open ? ' open' : ''}`}>
      <div className="panel-header" {...touchHandlers}>
        <span className="panel-title">Messages · {user?.name || 'User'}</span>
        <button className="panel-close" onClick={onClose}>✕</button>
      </div>

      <div className="chat-msgs" style={{ padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: 12, flex: 1, overflowY: 'auto' }}>
        {messages.length === 0 && pendingUploads.length === 0 && (
          <p style={{ fontFamily: 'var(--font-ui-mob)', fontStyle: 'italic', fontSize: '1.1875rem', color: 'var(--text-mob)', textAlign: 'center', margin: '60px auto', opacity: 0.6 }}>
            No messages yet — say hello!
          </p>
        )}

        {messages.map(m => {
          const msgDate     = formatDate(m.created_at);
          const showDivider = msgDate !== lastDate;
          lastDate = msgDate;
          // Admin perspective: ADMIN = me, ACCOUNT = them
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
                      onClick={() => setModalImageUrl(getAttachmentUrl(m.attachment_url))}
                      style={{ maxWidth: '100%', maxHeight: 180, objectFit: 'cover', marginTop: m.body ? 6 : 0, display: 'block', borderRadius: 8, cursor: 'pointer' }}
                    />
                  )}
                  {m.attachment_url && m.attachment_type === 'application/pdf' && (
                    <div style={{ marginTop: m.body ? 6 : 0, fontSize: '0.8125rem' }}>
                      📄{' '}
                      <a href={getAttachmentUrl(m.attachment_url)} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>
                        Download PDF
                      </a>
                    </div>
                  )}
                </div>
                <div className="msg-time">{fmtTime(m.created_at)}</div>
              </div>
            </div>
          );
        })}

        {/* ── PENDING UPLOADS — mirrors 3ChatPanel.tsx exactly ── */}
        {pendingUploads.map(p => {
          const isImage = p.fileType.startsWith('image/');
          const isPdf   = p.fileType === 'application/pdf';
          return (
            <div key={p.tempId} className="msg-wrap me">
              <div className={`bubble me${p.error ? ' upload-failed' : ''}`} style={{ position: 'relative' }}>
                {isImage && (
                  <img
                    src={p.objectUrl}
                    alt="uploading"
                    onClick={() => { if (!p.uploading && !p.error) setModalImageUrl(p.objectUrl); }}
                    style={{ maxWidth: '100%', maxHeight: 180, objectFit: 'cover', display: 'block', borderRadius: 8, opacity: p.error ? 0.4 : (p.uploading ? 0.55 : 1), filter: p.error ? 'grayscale(1)' : undefined, cursor: (!p.uploading && !p.error) ? 'pointer' : 'default' }}
                  />
                )}
                {isPdf && (
                  <div style={{ fontSize: '0.8125rem', opacity: p.error ? 0.5 : 0.85 }}>
                    📄 {p.error ? 'PDF failed to upload' : 'Uploading PDF…'}
                  </div>
                )}
                {(p.uploading || p.error) && (
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.25)', borderRadius: 8, fontFamily: 'var(--font-mono-mob)', fontSize: 'clamp(10px,2.8vw,12px)', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff', textAlign: 'center', pointerEvents: p.error ? 'auto' : 'none', padding: '0 12px' }}>
                    {p.error ? (
                      <div>
                        <div style={{ marginBottom: 6 }}>Upload failed</div>
                        <div style={{ fontSize: 'clamp(9px,2.4vw,10px)', opacity: 0.8, textTransform: 'none', letterSpacing: 'normal', marginBottom: 8 }}>{p.error}</div>
                        <button
                          onClick={() => dismissPendingUpload(p.tempId)}
                          style={{ background: 'transparent', border: '0.5px solid #fff', color: '#fff', borderRadius: 999, padding: '4px 12px', fontFamily: 'var(--font-mono-mob)', fontSize: 'clamp(9px,2.4vw,10px)', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer' }}
                        >
                          Dismiss
                        </button>
                      </div>
                    ) : 'Uploading…'}
                  </div>
                )}
              </div>
              <div className="msg-time">now</div>
            </div>
          );
        })}

        <div ref={chatEndRef} />
      </div>

      {/* ── ERROR BANNER ── */}
      {chatError && (
        <div style={{ margin: '0 clamp(0.75rem,3.5vw,1rem) clamp(0.5rem,2.5vw,0.75rem)', padding: 'clamp(0.625rem,3vw,0.875rem) clamp(0.75rem,3.5vw,1rem)', background: 'rgba(239,68,68,0.08)', border: '0.5px solid rgba(239,68,68,0.35)', color: '#ef4444', borderRadius: 10, fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(13px,3.4vw,14px)', lineHeight: 1.5, display: 'flex', alignItems: 'flex-start', gap: 8 }}>
          <span style={{ flex: 1 }}>{chatError}</span>
          <button onClick={clearChatError} style={{ background: 'transparent', border: 'none', color: 'inherit', fontSize: '1.0rem', cursor: 'pointer', padding: 0, marginLeft: 4, lineHeight: 1 }} aria-label="Dismiss error">✕</button>
        </div>
      )}

      {/* ── INPUT BAR — mirrors 3ChatPanel.tsx ── */}
      <div className="chat-input-bar">
        <input
          type="file"
          ref={chatFileRef}
          accept=".jpg,.jpeg,.png,.tiff,.tif,.dng,.heic,.pdf"
          style={{ display: 'none' }}
          onChange={handleChatFile}
        />
        <button
          className="chat-attach"
          onClick={() => chatFileRef.current?.click()}
          disabled={chatUploading}
          title="Attach file"
        >
          {chatUploading ? '…' : '⊕'}
        </button>
        <input
          className="chat-input"
          value={chatInput}
          placeholder="Message..."
          onChange={e => setChatInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendChat(); } }}
        />
        <button
          className="chat-send"
          onClick={sendChat}
          disabled={chatSending || !chatInput.trim()}
        >
          {chatSending ? '…' : '↑'}
        </button>
      </div>

      {/* ── IMAGE MODAL — same component as account side ── */}
      <ChatImageModal
        open={modalImageUrl !== null}
        imageUrl={modalImageUrl}
        onClose={() => setModalImageUrl(null)}
      />
    </div>
  );
}