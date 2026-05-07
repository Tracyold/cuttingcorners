// frontend/effects/archive.tap.tsx
//
// Renders a button with a tap transition effect for archive actions.
// No logic. Imports ReactNode only.

import type { ReactNode } from 'react';

interface ArchiveTapProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function ArchiveTap({ style, ...rest }: ArchiveTapProps) {
  return (
    <button
      style={{
        transition: 'opacity 150ms ease, transform 150ms ease',
        ...style,
      }}
      {...rest}
    />
  );
}