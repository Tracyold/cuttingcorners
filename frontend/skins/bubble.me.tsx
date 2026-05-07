// frontend/skins/bubble.me.tsx
//
// Message bubble skins for the current user's messages.
// Two exports — BubbleMe for sent messages, BubbleMePending for uploads in progress.
// Both use .bubble.me and .msg-wrap.me CSS classes from MobileShell.css.
// Pure wrappers — no logic, no module-specific types.
// Panel decides what goes inside via children.

import type { ReactNode } from 'react';

// ── Sent message bubble ───────────────────────────────────────────────────────

interface BubbleMeProps {
  timestamp: string;
  children:  ReactNode;
}

export function BubbleMe({ timestamp, children }: BubbleMeProps) {
  return (
    <div className="msg-wrap me">
      <div className="bubble me">
        {children}
      </div>
      <div className="msg-time">{timestamp}</div>
    </div>
  );
}

// ── Pending upload bubble ─────────────────────────────────────────────────────

interface BubbleMePendingProps {
  children: ReactNode;
}

export function BubbleMePending({ children }: BubbleMePendingProps) {
  return (
    <div className="msg-wrap me">
      <div className="bubble me" style={{ position: 'relative' }}>
        {children}
      </div>
      <div className="msg-time">now</div>
    </div>
  );
}