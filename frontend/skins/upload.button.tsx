import type { RefObject, ChangeEvent } from 'react';

interface UploadButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  uploading:    boolean;
  accept:       string;
  fileRef:      RefObject<HTMLInputElement>;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function UploadButton({ uploading, disabled, accept, fileRef, onFileChange, ...rest }: UploadButtonProps) {
  return (
    <>
      <input
        type="file"
        ref={fileRef}
        accept={accept}
        style={{ display: 'none' }}
        onChange={onFileChange}
      />
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