// frontend/skins/panel.frame.tsx
//
// Generic slide panel frame skin.
// Only imports useSwipeDownToClose (design interaction) and ReactNode (type only).
// No logic. No module-specific types.

import type { ReactNode } from 'react';
import { useSwipeDownToClose } from '../components/account/shared/hooks/useSwipeDownToClose';

interface PanelFrameProps {
  open:     boolean;
  title:    string;
  onClose:  () => void;
  children: ReactNode;
}

export function PanelFrame({ open, title, onClose, children }: PanelFrameProps) {
  const { elementRef, touchHandlers } = useSwipeDownToClose({ onClose });

  return (
    <div
      ref={elementRef}
      className={`slide-panel${open ? ' open' : ''}`}
    >
      <div className="panel-header" {...touchHandlers}>
        <span className="panel-title">{title}</span>
        <button className="panel-close" onClick={onClose}>✕</button>
      </div>
      {children}
    </div>
  );
}