// frontend/skins/enter.button.tsx
//
// Generic send/submit button skin.
// No imports. No logic. No module-specific types.
// Extends native button attributes so onClick and any other
// handler can be passed naturally from the panel.

interface EnterButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  sending: boolean;
}

export function EnterButton({ sending, disabled, ...rest }: EnterButtonProps) {
  return (
    <button
      className="enter-btn"
      disabled={disabled || sending}
      {...rest}
    >
      {sending ? '…' : '↑'}
    </button>
  );
}