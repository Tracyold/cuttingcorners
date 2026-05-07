// frontend/skins/gold.btn.tsx
//
// Gold primary action button — matches the mobile account page primary button style.
// No logic. No imports. Extends native button attributes.

interface GoldBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function GoldBtn({ ...rest }: GoldBtnProps) {
  return <button className="acc-btn-gold" {...rest} />;
}