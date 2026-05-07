// frontend/skins/close.button.tsx
//
// Universal close button skin.
// Matches the portfolio modal close button style — gold circle, bg text, muted on hover.
// Consistent across every panel, drawer, and modal on the site.
// No logic. No module-specific types or imports.
// Extends native button attributes so onClick is wired from the parent.

interface CloseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function CloseButton({ ...rest }: CloseButtonProps) {
  return (
    <button
      className="close-btn"
      aria-label="Close"
      {...rest}
    >
      ✕
    </button>
  );
}