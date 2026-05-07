// frontend/skins/image.modal.tsx
//
// Generic image modal skin.
// Pure visual shell — dark overlay, rounded container, image, close button.
// Imports CloseButton skin only — no logic, no React, no module-specific types.
// The panel controls visibility with conditional rendering.
// Panel wires onClose via CloseButton's onClick.

import { CloseButton } from './close.button';

interface ImageModalProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  imageUrl: string;
}

export function ImageModal({ imageUrl, ...rest }: ImageModalProps) {
  return (
    <div className="img-modal-overlay">
      <div className="img-modal">
        <CloseButton
          style={{ position: 'absolute', top: 12, right: 12, zIndex: 10 }}
          {...rest}
        />
        <img
          src={imageUrl}
          alt="attachment"
          style={{
            width:        '100%',
            maxHeight:    '80vh',
            objectFit:    'contain',
            display:      'block',
            borderRadius: 21,
          }}
        />
      </div>
    </div>
  );
}