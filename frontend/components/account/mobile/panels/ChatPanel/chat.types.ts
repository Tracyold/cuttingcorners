// chat.types.ts
//
// Canonical domain types for the chat system.
// This is the single source of truth for ALL chat-related structures.
// No runtime logic. No Supabase calls. No React hooks.


// ─────────────────────────────────────────────────────────────
// CORE DOMAIN TYPES
// ─────────────────────────────────────────────────────────────

export type ActorType = 'ACCOUNT' | 'ADMIN' | 'SYSTEM';

export interface ChatMessage {
  chat_message_id: string;
  chat_thread_id: string;
  actor: ActorType;
  actor_id: string;
  body: string | null;
  attachment_url: string | null;
  attachment_type: string | null;
  created_at: string;
}

export interface ChatThread {
  chat_thread_id: string;
  account_user_id: string;
  account_has_unread: boolean;
  admin_has_unread: boolean;
}

// ─────────────────────────────────────────────────────────────
// CLIENT-SIDE UI STATE TYPES
// ─────────────────────────────────────────────────────────────

/**
 * Represents a file upload that exists ONLY on the client
 * before it is persisted in Supabase.
 */
export interface PendingUpload {
  tempId: string;
  objectUrl: string;
  fileType: string;
  uploading: boolean;
  error: string | null;
}

// ─────────────────────────────────────────────────────────────
// VIEW / COMPONENT PROPS
// ─────────────────────────────────────────────────────────────

export interface ChatPanelProps {
  open: boolean;

  messages: ChatMessage[];

  chatInput: string;
  chatSending: boolean;
  chatUploading: boolean;

  chatError?: string | null;
  clearChatError?: () => void;

  pendingUploads?: PendingUpload[];
  dismissPendingUpload?: (tempId: string) => void;

  chatEndRef: React.RefObject<HTMLDivElement>;
  chatFileRef: React.RefObject<HTMLInputElement>;

  setChatInput: (v: string) => void;

  sendChat: () => void;
  handleChatFile: (e: React.ChangeEvent<HTMLInputElement>) => void;

  onClose: () => void;
  onOpen: () => void;
}

// ─────────────────────────────────────────────────────────────
// UI DERIVED TYPES (READ-ONLY TRANSFORMS)
// ─────────────────────────────────────────────────────────────

export interface GroupedMessage {
  dateLabel: string;
  showDivider: boolean;
  message: ChatMessage;
}

// ─────────────────────────────────────────────────────────────
// HOOK RETURN TYPES (ENGINE LAYER)
// ─────────────────────────────────────────────────────────────

export interface ChatEngine {
  messages: ChatMessage[];

  chatInput: string;
  setChatInput: (v: string) => void;

  chatSending: boolean;
  chatUploading: boolean;

  chatError: string | null;
  clearChatError: () => void;

  pendingUploads: PendingUpload[];
  dismissPendingUpload: (tempId: string) => void;

  chatEndRef: React.RefObject<HTMLDivElement>;
  chatFileRef: React.RefObject<HTMLInputElement>;

  sendChat: () => void;
  handleChatFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// ─────────────────────────────────────────────────────────────
// SUPABASE-SAFE INSERT TYPES
// ─────────────────────────────────────────────────────────────

export interface CreateChatMessageInput {
  chat_thread_id: string;
  actor: ActorType;
  actor_id: string;
  body: string | null;
  attachment_url: string | null;
  attachment_type: string | null;
}