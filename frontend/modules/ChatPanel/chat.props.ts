// frontend/modules/ChatPanel/chat.props.ts
//
// All handoff interfaces for the chat module.
// Imports from chat.types.ts and React only.
// No Supabase. No logic. No design.
// These are the contracts between the engine and the render layer.

import type { RefObject, Dispatch, SetStateAction, ChangeEvent } from 'react';
import type {
  ChatMessage,
  ChatThread,
  PendingUpload,
  ChatActor,
  ChatProcessedMessage,
} from './chat.types';

// ── Engine output ─────────────────────────────────────────────────────────────

// Everything both useAccountChat and useAdminChat return.
// Chat.Panel.tsx and AdminChatPanel.tsx destructure from this.
export interface ChatEngineOutput {
  // Thread
  chatThread:    ChatThread | null;
  processedMessages: ChatProcessedMessage[];

  // Message state
  messages:      ChatMessage[];
  setMessages:   Dispatch<SetStateAction<ChatMessage[]>>;


  // Input state
  chatInput:     string;
  setChatInput:  (v: string) => void;

  // Status flags
  chatSending:   boolean;
  chatUploading: boolean;
  chatOpen:      boolean;
  setChatOpen:   (v: boolean) => void;

  // Error state
  chatError:      string | null;
  clearChatError: () => void;

  // Pending uploads
  pendingUploads:       PendingUpload[];
  dismissPendingUpload: (tempId: string) => void;

  // Refs
  chatEndRef:  RefObject<HTMLDivElement>;
  chatFileRef: RefObject<HTMLInputElement>;

  // Actions
  sendChat:        () => Promise<void>;
  handleChatFile:  (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
  openChatDrawer:  () => Promise<void>;
  markThreadRead:  () => Promise<void>;
}

// ── Account panel props ───────────────────────────────────────────────────────

// What Chat.Panel.tsx accepts.
// Extends ChatEngineOutput — everything from the engine plus UI-only props.
export interface ChatPanelProps extends ChatEngineOutput {
  open:    boolean;
  onClose: () => void;
  onOpen:  () => void; 
  actor:   ChatActor;
  title?:  string;
}

// ── Admin panel props ─────────────────────────────────────────────────────────

// What the admin version of the chat panel accepts.
// Extends ChatPanelProps and adds admin-specific props.
export interface AdminChatPanelProps extends ChatPanelProps {
  id:        string;   // account_user_id of the user being viewed
  userName?: string;   // displayed in the panel header e.g. "Messages · Jane"
}

// ── Modal props ───────────────────────────────────────────────────────────────

// What Chat.Modal.tsx accepts.
// Pure presentational — no engine output needed.
export interface ChatModalProps {
  open:     boolean;
  imageUrl: string | null;
  onClose:  () => void;
}

// ── Tile props ────────────────────────────────────────────────────────────────

// What the chat tile on the account dashboard accepts.
// Shows unread state and opens the panel on tap.
export interface ChatTileProps {
  hasUnread:     boolean;
  lastMessage:   string | null;
  lastMessageAt: string | null;
  onClick:       () => void;
}

// ── Header props ──────────────────────────────────────────────────────────────

// What the panel header section accepts.
// Title varies between account ("Messages") and admin ("Messages · Jane").
export interface ChatHeaderProps {
  title:   string;
  onClose: () => void;
}

// ── Input bar props ───────────────────────────────────────────────────────────

// What the chat input bar accepts.
// Shared between mobile and desktop panel renders.
export interface ChatInputBarProps {
  chatInput:      string;
  chatSending:    boolean;
  chatUploading:  boolean;
  chatFileRef:    RefObject<HTMLInputElement>;
  setChatInput:   (v: string) => void;
  sendChat:       () => Promise<void>;
  handleChatFile: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
}

// ── Message list props ────────────────────────────────────────────────────────

// What the full message list section accepts.
// Shared between mobile and desktop panel renders.
export interface ChatMessageListProps {
  messages:             ChatMessage[];
  pendingUploads:       PendingUpload[];
  actor:                ChatActor;
  chatEndRef:           RefObject<HTMLDivElement>;
  dismissPendingUpload: (tempId: string) => void;
  onImageClick:         (url: string) => void;
}

// ── Individual message bubble props ───────────────────────────────────────────

// What a single message bubble accepts.
// isMe is derived in the panel by comparing message.actor to the current actor.
export interface ChatBubbleProps {
  message:     ChatMessage;
  isMe:        boolean;
  onImageClick: (url: string) => void;
}

// ── Date divider props ────────────────────────────────────────────────────────

// What the date label divider between message groups accepts.
export interface ChatDateDividerProps {
  label: string;
}

// ── Pending upload bubble props ───────────────────────────────────────────────

// What a single pending upload bubble accepts.
// Covers uploading state, error state, and the dismiss action.
export interface ChatPendingUploadBubbleProps {
  upload:               PendingUpload;
  onDismiss:            (tempId: string) => void;
  onImageClick:         (url: string) => void;
}

// ── Image preview props ───────────────────────────────────────────────────────

// What the inline image preview inside a bubble accepts.
// Tapping it fires onImageClick to open the full modal.
export interface ChatImagePreviewProps {
  url:          string;
  uploading?:   boolean;
  error?:       string | null;
  onImageClick: (url: string) => void;
}

// ── Error banner props ────────────────────────────────────────────────────────

// What the error banner accepts.
export interface ChatErrorBannerProps {
  error:     string;
  onDismiss: () => void;
}