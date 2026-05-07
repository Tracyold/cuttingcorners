// frontend/skins/pill.button.primary.tsx
//
// Primary pill button skin.
// Uses the same btn-primary class as the public-facing pages.
// No logic. No imports. Extends native button attributes.

interface PillButtonPrimaryProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function PillButtonPrimary({ ...rest }: PillButtonPrimaryProps) {
  return <button className="btn-primary" {...rest} />;
}