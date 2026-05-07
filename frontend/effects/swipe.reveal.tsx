// frontend/effects/swipe.reveal.tsx
//
// Renders a div that slides left to reveal an action button underneath.
// offsetX and isSwiping are computed in the render file and passed in.
// No logic. Imports ReactNode only.

import type { ReactNode } from 'react';

interface SwipeRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children:  ReactNode;
  offsetX:   number;
  isSwiping: boolean;
}

export function SwipeReveal({ offsetX, isSwiping, style, ...rest }: SwipeRevealProps) {
  return (
    <div
      style={{
        transform:  `translateX(${offsetX}px)`,
        transition: isSwiping ? 'none' : 'transform 300ms cubic-bezier(0.2, 0.8, 0.2, 1)',
        position:   'relative',
        zIndex:     2,
        ...style,
      }}
      {...rest}
    />
  );
}