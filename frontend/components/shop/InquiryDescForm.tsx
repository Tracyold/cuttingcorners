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

function InquiryDescForm({ onSubmit, onClose, submitting }: { onSubmit: (desc: string) => void; onClose: () => void; submitting: boolean }) {
  const [desc, setDesc] = useState('');
  return (
    <>
      <label style={labelStyle}>Your Message *</label>
      <textarea
        style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }}
        placeholder="Tell us about your interest in this gem..."
        value={desc}
        onChange={e => setDesc(e.target.value)}
      />
      <button style={{ ...goldBtnStyle, opacity: submitting || !desc.trim() ? 0.5 : 1 }}
        onClick={() => { if (desc.trim()) onSubmit(desc.trim()); }}
        disabled={submitting || !desc.trim()}>
        {submitting ? 'Sending...' : 'Submit Inquiry'}
      </button>
      <button style={ghostBtnStyle} onClick={onClose}>Cancel</button>
    </>
  );
}

export default InquiryDescForm;
