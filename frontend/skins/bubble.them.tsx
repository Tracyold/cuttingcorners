// frontend/skins/bubble.them.tsx
//
// Message bubble wrapper for the other party's messages.
// Uses .bubble.them CSS class from MobileShell.css.
// Left-aligned, card background, corner flipped bottom-left.
// Pure wrapper — no logic, no module-specific types.
// Panel decides what goes inside via children.

import type { ReactNode } from 'react';

interface BubbleThemProps {
  timestamp: string;
  children:  ReactNode;
}

export function BubbleThem({ timestamp, children }: BubbleThemProps) {
  return (
    <div className="msg-wrap them">
      <div className="bubble them">
        {children}
      </div>
      <div className="msg-time">{timestamp}</div>
    </div>
  );
}