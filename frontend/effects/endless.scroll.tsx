// frontend/effects/endless.scroll.tsx
//
// Renders a div that allows its children to scroll indefinitely.
// Parent must have a fixed height for this to work.
// No logic. Imports ReactNode only.

import type { ReactNode } from 'react';

interface EndlessScrollProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function EndlessScroll({ style, ...rest }: EndlessScrollProps) {
  return (
    <div
      style={{
        overflowY:               'auto',
        height:                  '100%',
        flex:                    1,
        WebkitOverflowScrolling: 'touch',
        ...style,
      }}
      {...rest}
    />
  );
}