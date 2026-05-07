// frontend/skins/tile.card.tsx
//
// Generic card shell for swipeable list tiles.
// Used by service requests, inquiries, or any module that needs a swipeable card.
// Transform and transition for the swipe effect come in via the native style prop.
// No logic. No module-specific types or imports.

interface TileCardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function TileCard({ ...rest }: TileCardProps) {
  return <div className="sr-card" {...rest} />;
}