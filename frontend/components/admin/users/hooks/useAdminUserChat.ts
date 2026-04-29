// frontend/components/admin/users/hooks/useAdminUserChat.ts
//
// Extracted from pages/admin/users/[id].tsx — the ChatWidget already handles
// its own send logic internally, but this hook owns the UI toggle state
// (showEditUser) and exposes it alongside the existing chat data so the
// page shell stays thin.
//
// Note: the chat realtime channel is set up inside useAdminUserDetail
// because it's part of loadAll(). This hook only manages the edit-user
// modal state, which was the only remaining local UI state in the page
// outside of activeTab.

import { useState } from 'react';

export interface AdminUserChatData {
  showEditUser:    boolean;
  setShowEditUser: (v: boolean) => void;
}

export function useAdminUserChat(): AdminUserChatData {
  const [showEditUser, setShowEditUser] = useState(false);

  return { showEditUser, setShowEditUser };
}
