// frontend/skins/input.field.tsx
//
// Generic text input field skin.
// No imports. No logic. No module-specific types.
// Extends native input attributes so onChange, onKeyDown and any
// other handler can be passed naturally from the panel.
// The gold focus ring effect is handled by .chat-input:focus in CSS.

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // All props come from native HTML input attributes.
  // No module-specific props needed.
}

export function InputField({ ...rest }: InputFieldProps) {
  return (
    <input
      className="chat-input"
      {...rest}
    />
  );
}