// frontend/components/ModuleRenders/Chat.Panel.tsx
//
// Chat panel render file.
// Imports engine, skins, swipe hook, and display utilities.
// No Supabase calls. No type declarations. No business logic.
// Wires engine output to skins via HTML tags.

import { useState } from 'react';
import { useSwipeDownToClose }          from '../account/shared/hooks/useSwipeDownToClose';
import { useAccountChat }               from '../../modules/ChatPanel/chat.engine';
import { resolveChatAttachmentUrl }     from '../../modules/ChatPanel/chat.supabase';
import { CHAT_ACCEPTED_FILES }          from '../../modules/ChatPanel/chat.types';
import type { Session }                 from '../../modules/ChatPanel/chat.supabase';
import { fmtTime, fmtDate }             from '../../lib/utils';

import { PanelFrame }                   from '../../skins/panel.frame';
import { BubbleMe, BubbleMePending }    from '../../skins/bubble.me';
import { BubbleThem }                   from '../../skins/bubble.them';
import { DateDivider }                  from '../../skins/date.divider';
import { InputField }                   from '../../skins/input.field';
import { EnterButton }                  from '../../skins/enter.button';
import { UploadButton }                 from '../../skins/upload.button';
import { CloseButton }                  from '../../skins/close.button';
import { ErrorBanner }                  from '../../skins/error.banner';
import { ImageModal }                   from '../../skins/image.modal';
import FirstTimeTips                    from '../account/mobile/ui/FirstTimeTips';

interface ChatPanelProps {
  session:       Session | null;
  accountUserId: string;
  open:          boolean;
  onClose:       () => void;
}

export default function ChatPanel({ session, accountUserId, open, onClose }: ChatPanelProps) {
  const engine = useAccountChat(session, accountUserId);
  const { elementRef, touchHandlers } = useSwipeDownToClose({ onClose });

  // ── Image modal state — purely visual ──
  const [modalImageUrl, setModalImageUrl] = useState<string | null>(null);

  return (
    <>
      {/* ── Panel shell — open/close/swipe wired here not in skin ── */}
      <div
        ref={elementRef}
        className={`slide-panel${open ? ' open' : ''}`}
      >
        <FirstTimeTips type="panel-down" show={open} />

        {/* ── Header — touch handlers and close button wired here ── */}
        <div className="panel-header" {...touchHandlers}>
          <span className="panel-title">Messages</span>
          <CloseButton onClick={onClose} />
        </div>

        {/* ── Panel frame wraps all content ── */}
        <PanelFrame title="Messages">

          {/* ── Message list ── */}
          <div className="chat-msgs">

            {/* Empty state */}
            {engine.processedMessages.length === 0 && engine.pendingUploads.length === 0 && (
              <p style={{
                fontFamily: 'var(--font-ui-mob)',
                fontStyle:  'italic',
                fontSize:   '1.1875rem',
                color:      'var(--text-mob)',
                textAlign:  'center',
                margin:     '60px auto',
                opacity:    0.6,
              }}>
                No messages yet — say hello!
              </p>
            )}

            {/* Messages */}
            {engine.processedMessages.map(({ message, isMe, isImage, isPdf, showDivider, dateLabel }) => (
              <div key={message.chat_message_id}>

                {/* Date divider */}
                {showDivider && <DateDivider label={fmtDate(dateLabel)} />}

                {/* Me bubble */}
                {isMe && (
                  <BubbleMe timestamp={fmtTime(message.created_at)}>
                    {message.body && <div>{message.body}</div>}
                    {message.attachment_url && isImage && (
                      <img
                        src={resolveChatAttachmentUrl(message.attachment_url)}
                        alt="attachment"
                        onClick={() => setModalImageUrl(resolveChatAttachmentUrl(message.attachment_url!))}
                        style={{
                          maxWidth:     '100%',
                          maxHeight:    180,
                          objectFit:    'cover',
                          marginTop:    message.body ? 6 : 0,
                          display:      'block',
                          borderRadius: 8,
                          cursor:       'pointer',
                        }}
                      />
                    )}
                    {message.attachment_url && isPdf && (
                      <div style={{ marginTop: message.body ? 6 : 0, fontSize: '0.8125rem' }}>
                        📄{' '}
                        <a
                          href={resolveChatAttachmentUrl(message.attachment_url)}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: 'inherit', textDecoration: 'underline' }}
                        >
                          Download PDF
                        </a>
                      </div>
                    )}
                  </BubbleMe>
                )}

                {/* Them bubble */}
                {!isMe && (
                  <BubbleThem timestamp={fmtTime(message.created_at)}>
                    {message.body && <div>{message.body}</div>}
                    {message.attachment_url && isImage && (
                      <img
                        src={resolveChatAttachmentUrl(message.attachment_url)}
                        alt="attachment"
                        onClick={() => setModalImageUrl(resolveChatAttachmentUrl(message.attachment_url!))}
                        style={{
                          maxWidth:     '100%',
                          maxHeight:    180,
                          objectFit:    'cover',
                          marginTop:    message.body ? 6 : 0,
                          display:      'block',
                          borderRadius: 8,
                          cursor:       'pointer',
                        }}
                      />
                    )}
                    {message.attachment_url && isPdf && (
                      <div style={{ marginTop: message.body ? 6 : 0, fontSize: '0.8125rem' }}>
                        📄{' '}
                        <a
                          href={resolveChatAttachmentUrl(message.attachment_url)}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: 'inherit', textDecoration: 'underline' }}
                        >
                          Download PDF
                        </a>
                      </div>
                    )}
                  </BubbleThem>
                )}

              </div>
            ))}

            {/* Pending uploads */}
            {engine.pendingUploads.map(p => (
              <BubbleMePending key={p.tempId}>
                {p.isImage && (
                  <img
                    src={p.objectUrl}
                    alt="uploading"
                    style={{
                      maxWidth:     '100%',
                      maxHeight:    180,
                      objectFit:    'cover',
                      display:      'block',
                      borderRadius: 8,
                      opacity:      p.error ? 0.4 : p.uploading ? 0.55 : 1,
                      filter:       p.error ? 'grayscale(1)' : undefined,
                      cursor:       'default',
                    }}
                  />
                )}
                {p.isPdf && (
                  <div style={{ fontSize: '0.8125rem', opacity: p.error ? 0.5 : 0.85 }}>
                    📄 {p.error ? 'PDF failed to upload' : 'Uploading PDF…'}
                  </div>
                )}
                {(p.uploading || p.error) && (
                  <div style={{
                    position:       'absolute',
                    inset:          0,
                    display:        'flex',
                    flexDirection:  'column',
                    alignItems:     'center',
                    justifyContent: 'center',
                    background:     'rgba(0,0,0,0.25)',
                    borderRadius:   8,
                    fontFamily:     'var(--font-mob-mono)',
                    fontSize:       'clamp(10px, 2.8vw, 12px)',
                    letterSpacing:  '0.1em',
                    textTransform:  'uppercase',
                    color:          '#fff',
                    textAlign:      'center',
                    pointerEvents:  p.error ? 'auto' : 'none',
                    padding:        '0 12px',
                    gap:            6,
                  }}>
                    {p.error ? (
                      <>
                        <div>Upload failed</div>
                        <div style={{ fontSize: 'clamp(9px, 2.4vw, 10px)', opacity: 0.8, textTransform: 'none', letterSpacing: 'normal' }}>
                          {p.error}
                        </div>
                        <button
                          onClick={() => engine.dismissPendingUpload(p.tempId)}
                          style={{
                            background:    'transparent',
                            border:        '0.5px solid #fff',
                            color:         '#fff',
                            borderRadius:  999,
                            padding:       '4px 12px',
                            fontFamily:    'var(--font-mob-mono)',
                            fontSize:      'clamp(9px, 2.4vw, 10px)',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            cursor:        'pointer',
                          }}
                        >
                          Dismiss
                        </button>
                      </>
                    ) : 'Uploading…'}
                  </div>
                )}
              </BubbleMePending>
            ))}

            <div ref={engine.chatEndRef} />
          </div>

          {/* ── Error banner ── */}
          {engine.chatError && (
            <ErrorBanner error={engine.chatError}>
              <CloseButton onClick={engine.clearChatError} />
            </ErrorBanner>
          )}

          {/* ── Input bar ── */}
          <div className="chat-input-bar">
            <UploadButton
              uploading={engine.chatUploading}
              accept={CHAT_ACCEPTED_FILES}
              fileRef={engine.chatFileRef}
              onClick={() => engine.chatFileRef.current?.click()}
              onFileChange={engine.handleChatFile}            />
            <InputField
              value={engine.chatInput}
              placeholder="Message..."
              onChange={e => engine.setChatInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  engine.sendChat();
                }
              }}
            />
            <EnterButton
              sending={engine.chatSending}
              disabled={!engine.chatInput.trim()}
              onClick={engine.sendChat}
            />
          </div>

        </PanelFrame>
      </div>

      {/* ── Image modal ── */}
      {modalImageUrl && (
        <ImageModal
          imageUrl={modalImageUrl}
          onClick={() => setModalImageUrl(null)}
        />
      )}
    </>
  );
}