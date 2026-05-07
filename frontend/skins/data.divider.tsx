// frontend/skins/date.divider.tsx
//
// Generic date divider skin.
// Used between message groups to show the date label.
// Uses existing CSS classes from MobileShell.css.
// Pure wrapper — no logic, no module-specific types or imports.

interface DateDividerProps {
  label: string;
}

export function DateDivider({ label }: DateDividerProps) {
  return (
    <div className="date-divider">
      <div className="date-divider-line" />
      <span className="date-divider-lbl">{label}</span>
      <div className="date-divider-line" />
    </div>
  );
}