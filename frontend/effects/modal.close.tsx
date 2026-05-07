// frontend/effects/modal.close.tsx
//
// Renders a div that fades out to dismiss a modal.
// No logic. Imports ReactNode only.

import type { ReactNode } from 'react';

interface ModalCloseProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  open:     boolean;
}

export function ModalClose({ open, style, ...rest }: ModalCloseProps) {
  return (
    <div
      style={{
        opacity:    open ? 0 : 1,
        visibility: open ? 'hidden' : 'visible',
        transition: 'opacity 200ms cubic-bezier(0.4, 0, 1, 1)',
        ...style,
      }}
      {...rest}
    />
  );
}