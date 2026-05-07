// frontend/skins/pill.button.secondary.tsx
//
// Secondary pill button skin.
// Uses the same btn-secondary class as the public-facing pages.
// No logic. No imports. Extends native button attributes.

interface PillButtonSecondaryProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function PillButtonSecondary({ ...rest }: PillButtonSecondaryProps) {
  return <button className="btn-secondary" {...rest} />;
}