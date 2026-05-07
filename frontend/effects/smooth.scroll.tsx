// frontend/effects/smooth.scroll.tsx
//
// Renders a div that scrolls its children smoothly with momentum.
// No logic. Imports ReactNode only.

import type { ReactNode } from 'react';

interface SmoothScrollProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function SmoothScroll({ style, ...rest }: SmoothScrollProps) {
  return (
    <div
      style={{
        overflowY:               'auto',
        WebkitOverflowScrolling: 'touch',
        scrollBehavior:          'smooth',
        overscrollBehaviorY:     'contain',
        ...style,
      }}
      {...rest}
    />
  );
}