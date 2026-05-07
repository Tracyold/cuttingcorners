// chat.components.tsx

import { useState, useEffect } from 'react';
import type { ChatMessage, PendingUpload, ChatPanelProps } from './chat.types';
import { useSwipeDownToClose } from '../../../shared/hooks/useSwipeDownToClose';
import ChatImageModal from './chat.ui';
import FirstTimeTips from '../ui/FirstTimeTips';
import { fmtTime } from '../../../lib/utils';

interface Props extends ChatPanelProps {}

export default function ChatPanel({
  open,
  messages,
  chatInput,
  chatSending,
  chatUploading,
  chatError,
  clearChatError,
  pendingUploads = [],
  dismissPendingUpload,
  chatEndRef,
  chatFileRef,
  setChatInput,
  sendChat,
  handleChatFile,
  onClose,
  onOpen,
}: Props) {

  const { elementRef, touchHandlers } = useSwipeDownToClose({ onClose });

  const [modalImageUrl, setModalImageUrl] = useState<string | null>(null);

  const openImageModal = (url: string) => setModalImageUrl(url);
  const closeImageModal = () => setModalImageUrl(null);

  // ── UI-only scroll effect ──
  useEffect(() => {
    if (open) chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, pendingUploads, open]);

  useEffect(() => {
    if (open) onOpen();
  }, [open]);

  let lastDate = '';

  return (
    <div ref={elementRef} className={`slide-panel${open ? ' open' : ''}`}>

      <FirstTimeTips type="panel-down" show={open} />

      {/* HEADER */}
      <div className="panel-header" {...touchHandlers}>
        <span className="panel-title">Messages</span>
        <button className="panel-close" onClick={onClose}>✕</button>
      </div>

      {/* MESSAGES */}
      <div className="chat-msgs">

        {messages.length === 0 && pendingUploads.length === 0 && (
          <p className="empty-state">
            No messages yet -- say hello!
          </p>
        )}

        {messages.map((m: ChatMessage) => {
          const msgDate = new Date(m.created_at).toDateString();
          const showDivider = msgDate !== lastDate;
          lastDate = msgDate;

          const isMe = m.actor === 'ACCOUNT';

          return (
            <div key={m.chat_message_id}>

              {showDivider && (
                <div className="date-divider">
                  <span>{msgDate}</span>
                </div>
              )}

              <div className={`msg-wrap ${isMe ? 'me' : 'them'}`}>
                <div className={`bubble ${isMe ? 'me' : 'them'}`}>

                  {m.body && <div>{m.body}</div>}

                  {m.attachment_url_resolved &&
                    m.attachment_type?.startsWith('image/') && (
                      <img
                        src={m.attachment_url_resolved}
                        onClick={() => openImageModal(m.attachment_url_resolved!)}
                        className="chat-image"
                      />
                    )}

                  {m.attachment_url_resolved &&
                    m.attachment_type === 'application/pdf' && (
                      <a
                        href={m.attachment_url_resolved}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Download PDF
                      </a>
                    )}
                </div>

                <div className="msg-time">
                  {fmtTime(m.created_at)}
                </div>
              </div>
            </div>
          );
        })}

        {/* PENDING UPLOADS */}
        {pendingUploads.map(p => (
          <div key={p.tempId} className="msg-wrap me">

            <div className={`bubble me ${p.error ? 'error' : ''}`}>

              {p.fileType.startsWith('image/') && (
                <img
                  src={p.objectUrl}
                  onClick={() => !p.uploading && !p.error && openImageModal(p.objectUrl)}
                  className="chat-image"
                  style={{ opacity: p.uploading ? 0.6 : 1 }}
                />
              )}

              {p.fileType === 'application/pdf' && (
                <div>PDF uploading…</div>
              )}

              {p.uploading && <div className="overlay">Uploading…</div>}

              {p.error && (
                <button onClick={() => dismissPendingUpload?.(p.tempId)}>
                  Dismiss
                </button>
              )}
            </div>

            <div className="msg-time">now</div>
          </div>
        ))}

        <div ref={chatEndRef} />
      </div>

      {/* ERROR */}
      {chatError && (
        <div className="error-banner">
          <span>{chatError}</span>
          <button onClick={clearChatError}>✕</button>
        </div>
      )}

      {/* INPUT BAR */}
      <div className="chat-input-bar">

        <input
          type="file"
          ref={chatFileRef}
          accept=".jpg,.jpeg,.png,.tiff,.heic,.pdf"
          hidden
          onChange={handleChatFile}
        />

        <button onClick={() => chatFileRef.current?.click()}>
          ⊕
        </button>

        <input
          value={chatInput}
          onChange={e => setChatInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' && !e.shiftKey) sendChat();
          }}
          placeholder="Message..."
        />

        <button
          onClick={sendChat}
          disabled={chatSending || !chatInput.trim()}
        >
          ↑
        </button>
      </div>

      {/* MODAL */}
      <ChatImageModal
        open={modalImageUrl !== null}
        imageUrl={modalImageUrl}
        onClose={closeImageModal}
      />

    </div>
  );
}