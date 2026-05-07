// frontend/effects/modal.open.tsx
//
// Renders a div that fades in to display a modal.
// No logic. Imports ReactNode only.

import type { ReactNode } from 'react';

interface ModalOpenProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  open:     boolean;
}

export function ModalOpen({ open, style, ...rest }: ModalOpenProps) {
  return (
    <div
      style={{
        opacity:    open ? 1 : 0,
        visibility: open ? 'visible' : 'hidden',
        transition: 'opacity 250ms cubic-bezier(0.2, 0.8, 0.2, 1)',
        ...style,
      }}
      {...rest}
    />
  );
}