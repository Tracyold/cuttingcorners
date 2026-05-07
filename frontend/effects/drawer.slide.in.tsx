// frontend/effects/drawer.slide.in.tsx
//
// Renders a div that slides in from the right of the screen.
// open is passed in from the render file.
// No logic. Imports ReactNode only.

import type { ReactNode } from 'react';

interface DrawerSlideInProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  open:     boolean;
}

export function DrawerSlideIn({ open, style, ...rest }: DrawerSlideInProps) {
  return (
    <div
      style={{
        transform:  open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 350ms cubic-bezier(0.2, 0.8, 0.2, 1)',
        ...style,
      }}
      {...rest}
    />
  );
}