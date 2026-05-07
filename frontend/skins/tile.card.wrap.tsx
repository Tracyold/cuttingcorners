// frontend/skins/tile.card.wrap.tsx
//
// Wrapper that positions a swipeable tile card and its action button
// relative to each other. Generic — works for any module using the
// swipe-to-reveal pattern.
// No logic. No imports. Extends native div attributes.

import type { ReactNode } from 'react';

interface TileCardWrapProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function TileCardWrap({ ...rest }: TileCardWrapProps) {
  return <div className="sr-card-wrap" {...rest} />;
}