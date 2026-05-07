// frontend/skins/archive.btn.tsx
//
// Archive action button — sits behind a swipeable card and is revealed on swipe.
// Generic — works for any module that uses the swipe-to-archive pattern.
// onClick is wired from the render file.
// No logic. No module-specific types or imports.

interface ArchiveButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function ArchiveButton({ ...rest }: ArchiveButtonProps) {
  return <button className="sr-archive-btn" {...rest} />;
}