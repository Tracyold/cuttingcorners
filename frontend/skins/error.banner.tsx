// frontend/skins/error.banner.tsx
//
// Generic error banner skin.
// Uses existing CSS classes from MobileShell.css.
// Pure wrapper — no logic, no function props, no module-specific types.
// Panel wires onClick on the dismiss button via children or HTML attributes.

interface ErrorBannerProps {
  error:    string;
  children: React.ReactNode;
}

export function ErrorBanner({ error, children }: ErrorBannerProps) {
  return (
    <div className="srf-submit-error" style={{
      margin:      '0 clamp(0.75rem, 3.5vw, 1rem) clamp(0.5rem, 2.5vw, 0.75rem)',
      display:     'flex',
      alignItems:  'flex-start',
      gap:         8,
    }}>
      <span style={{ flex: 1 }}>{error}</span>
      {children}
    </div>
  );
}