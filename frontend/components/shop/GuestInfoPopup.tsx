import { useState } from 'react';

export interface GuestInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
}

const popupOverlayStyle: React.CSSProperties = {
  position: 'fixed', inset: 0, zIndex: 200,
  backgroundColor: 'rgba(0,0,0,0.85)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  padding: '20px',
};
const popupBoxStyle: React.CSSProperties = {
  backgroundColor: '#0A0A0A',
  border: '1px solid rgba(255,255,255,0.10)',
  borderRadius: '16px',
  width: '100%', maxWidth: '480px', maxHeight: '90vh',
  overflowY: 'auto', padding: '32px',
};
const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.10)',
  padding: '10px 12px',
  color: '#FAFAFA',
  fontFamily: "'Comfortaa', sans-serif",
  fontSize: '13px',
  outline: 'none',
  marginBottom: '10px',
};
const labelStyle: React.CSSProperties = {
  fontFamily: "'Montserrat', sans-serif",
  fontSize: '9px', fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.18em',
  color: 'rgba(255,255,255,0.38)',
  display: 'block', marginBottom: '5px',
};
const goldBtnStyle: React.CSSProperties = {
  width: '100%', textAlign: 'center',
  fontFamily: "'Montserrat', sans-serif",
  fontSize: '11px', fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.20em',
  backgroundColor: '#d4af37', color: '#050505',
  border: 'none', padding: '14px 24px',
  cursor: 'pointer',
};
const ghostBtnStyle: React.CSSProperties = {
  width: '100%', textAlign: 'center',
  fontFamily: "'Montserrat', sans-serif",
  fontSize: '10px', fontWeight: 500,
  textTransform: 'uppercase',
  letterSpacing: '0.18em',
  backgroundColor: 'transparent',
  color: 'rgba(255,255,255,0.38)',
  border: 'none', cursor: 'pointer',
  padding: '10px 0', marginTop: '8px',
};

// ── Guest Info Popup ────────────────────────────────────────
function GuestInfoPopup({ onSubmit, onClose }: { onSubmit: (info: GuestInfo) => void; onClose: () => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [err, setErr] = useState('');

  function handleSubmit() {
    if (!name.trim() || !email.trim() || !phone.trim() || !address.trim()) {
      setErr('All fields are required.');
      return;
    }
    onSubmit({ name: name.trim(), email: email.trim(), phone: phone.trim(), address: address.trim() });
  }

  return (
    <div style={popupOverlayStyle}>
      <div style={popupBoxStyle}>
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.20em', color: 'rgba(255,255,255,0.52)', marginBottom: '6px' }}>
          Your Information
        </p>
        <p style={{ fontFamily: "'Comfortaa', sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.45)', marginBottom: '20px', lineHeight: 1.6 }}>
          Please enter your details before continuing.
        </p>

        <label style={labelStyle}>Full Name *</label>
        <input style={inputStyle} placeholder="Jane Smith" value={name} onChange={e => setName(e.target.value)} />

        <label style={labelStyle}>Email Address *</label>
        <input style={inputStyle} type="email" placeholder="jane@email.com" value={email} onChange={e => setEmail(e.target.value)} />

        <label style={labelStyle}>Phone Number *</label>
        <input style={inputStyle} type="tel" placeholder="+1 (555) 000-0000" value={phone} onChange={e => setPhone(e.target.value)} />

        <label style={labelStyle}>Shipping Address *</label>
        <input style={inputStyle} placeholder="123 Main St, City, State, ZIP" value={address} onChange={e => setAddress(e.target.value)} />

        {err && <p style={{ fontFamily: "'Comfortaa', sans-serif", fontSize: '11px', color: '#c07070', marginBottom: '10px' }}>{err}</p>}

        <button style={goldBtnStyle} onClick={handleSubmit}>Continue</button>
        <button style={ghostBtnStyle} onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default GuestInfoPopup;
