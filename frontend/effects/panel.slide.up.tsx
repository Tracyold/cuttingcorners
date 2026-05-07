// frontend/effects/panel.slide.up.tsx
//
// Renders a div that slides up from the bottom of the screen.
// open is passed in from the render file.
// No logic. Imports ReactNode only.

import type { ReactNode } from 'react';

interface PanelSlideUpProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  open:     boolean;
}

export function PanelSlideUp({ open, style, ...rest }: PanelSlideUpProps) {
  return (
    <div
      style={{
        transform:  open ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 350ms cubic-bezier(0.2, 0.8, 0.2, 1)',
        ...style,
      }}
      {...rest}
    />
  );
}