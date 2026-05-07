// frontend/skins/upload.button.tsx
//
// Generic file upload button skin.
// Uses existing CSS classes from MobileShell.css.
// No logic. No function props. No module-specific types.
// Extends native HTML attributes so all handlers are wired from the panel.

import type { RefObject } from 'react';

interface UploadButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  uploading: boolean;
  accept:    string;
  fileRef:   RefObject<HTMLInputElement>;
}

export function UploadButton({
  uploading,
  accept,
  fileRef,
  disabled,
  ...rest
}: UploadButtonProps) {
  return (
    <>
      {/* Hidden file input — panel wires onChange directly */}
      <input
        type="file"
        ref={fileRef}
        accept={accept}
        style={{ display: 'none' }}
      />

      {/* Visible attach button — panel wires onClick directly */}
      <button
        className="chat-attach"
        disabled={disabled || uploading}
        {...rest}
      >
        {uploading ? '…' : '⊕'}
      </button>
    </>
  );
}