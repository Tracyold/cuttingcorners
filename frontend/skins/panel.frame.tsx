// frontend/skins/panel.frame.tsx
//
// Generic slide panel frame skin.
// Full visual shell — slide-panel div, gold header, title, close button, children.
// CloseButton is included for visual consistency — onClick is wired in the render file
// via the swipe hook and open/close state which live outside the skin.
// No logic. No React import. Imports CloseButton and ReactNode type only.

import type { ReactNode } from 'react';
import { CloseButton } from './close.button';

interface PanelFrameProps {
  title:    string;
  children: ReactNode;
}

export function PanelFrame({ title, children }: PanelFrameProps) {
  return (
    <div className="slide-panel">
      <div className="panel-header">
        <span className="panel-title">{title}</span>
        <CloseButton />
      </div>
      {children}
    </div>
  );
}