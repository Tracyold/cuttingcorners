// comp/admin/mobile/panels/users/hooks/useAdminUserChat.ts
// ChatWidget (comp/admin/users/ChatWidget.tsx) already owns sendChat,
// handleChatFile, expandChat — all extracted from [id].tsx.
// This hook only owns markThreadRead which the panel calls on open.

import { supabase } from '../../../../../../lib/supabase';

export function useAdminUserChat(chatThread: any) {
  const markThreadRead = async () => {
    if (!chatThread) return;
    await supabase
      .from('chat_threads')
      .update({ admin_has_unread: false })
      .eq('chat_thread_id', chatThread.chat_thread_id);
  };

  return { markThreadRead };
}