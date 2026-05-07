// frontend/skins/ghost.btn.tsx
//
// Ghost secondary action button — matches the mobile account page secondary button style.
// No logic. No imports. Extends native button attributes.

interface GhostBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function GhostBtn({ ...rest }: GhostBtnProps) {
  return <button className="acc-btn-ghost" {...rest} />;
}