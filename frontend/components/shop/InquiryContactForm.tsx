import { useState } from 'react';

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

// ── Inquiry Sub-Forms ───────────────────────────────────────
function InquiryContactForm({ onSubmit, onClose }: { onSubmit: (info: any) => void; onClose: () => void }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [err, setErr] = useState('');
  return (
    <>
      <div style={{ display: 'flex', gap: '10px' }}>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>First Name *</label>
          <input style={inputStyle} placeholder="Jane" value={firstName} onChange={e => setFirstName(e.target.value)} />
        </div>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Last Name *</label>
          <input style={inputStyle} placeholder="Smith" value={lastName} onChange={e => setLastName(e.target.value)} />
        </div>
      </div>
      <label style={labelStyle}>Phone Number *</label>
      <input style={inputStyle} type="tel" placeholder="+1 (555) 000-0000" value={phone} onChange={e => setPhone(e.target.value)} />
      <label style={labelStyle}>Email Address *</label>
      <input style={inputStyle} type="email" placeholder="jane@email.com" value={email} onChange={e => setEmail(e.target.value)} />
      {err && <p style={{ fontSize: '11px', color: '#c07070', marginBottom: '10px' }}>{err}</p>}
      <button style={goldBtnStyle} onClick={() => {
        if (!firstName.trim() || !lastName.trim() || !phone.trim() || !email.trim()) { setErr('All fields are required.'); return; }
        onSubmit({ firstName: firstName.trim(), lastName: lastName.trim(), email: email.trim(), phone: phone.trim() });
      }}>Continue</button>
      <button style={ghostBtnStyle} onClick={onClose}>Cancel</button>
    </>
  );
}

export default InquiryContactForm;
