// comp/admin/mobile/panels/users/panels/AdminUserChatPanel.tsx
// Imports useAdminUserDetail for chatThread, messages, setMessages, user.
// Uses existing ChatWidget from comp/admin/users/ChatWidget.tsx directly —
// it already has all send, file upload, expand logic extracted from [id].tsx.

import { useSwipeDownToClose } from '../../../../../account/shared/hooks/useSwipeDownToClose';
import { useAdminUserDetail } from '../hooks/useAdminUserDetail';
import ChatWidget from '../../../../users/ChatWidget';

interface Props {
  open:    boolean;
  id:      string;
  session: any;
  onClose: () => void;
}

export default function AdminUserChatPanel({ open, id, session, onClose }: Props) {
  const { elementRef, touchHandlers } = useSwipeDownToClose({ onClose });
  const { user, chatThread, messages, setMessages } = useAdminUserDetail(id, session);

  return (
    <div ref={elementRef} className={`slide-panel${open ? ' open' : ''}`}>
      <div className="panel-header" {...touchHandlers}>
        <span className="panel-title">Messages · {user?.name || 'User'}</span>
        <button className="panel-close" onClick={onClose}>✕</button>
      </div>

      <div style={{ flex: 1, position: 'relative' }}>
        {chatThread && (
          <ChatWidget
            chatThread={chatThread}
            messages={messages}
            setMessages={setMessages}
            user={user}
            id={id}
            session={session}
          />
        )}
        {!chatThread && (
          <div className="sr-empty">No chat thread for this user yet.</div>
        )}
      </div>
    </div>
  );
}