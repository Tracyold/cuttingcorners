// comp/admin/mobile/panels/users/drawers/AdminUserAddWorkOrderDrawer.tsx
// UI matches AdminProductAddDrawer exactly — same Field, SectionLabel,
// res-drawer classes, error log, save state.
// Logic from AddWorkOrderModal.tsx createWO() via useAdminUserWorkOrders.

import { useState, useEffect } from 'react';
import { useSwipeToClose } from '../../../../../account/shared/hooks/useSwipeToClose';

const SERVICE_TYPES = [
  'Custom Rough Cut',
  'Re-Cut & Re-Polish',
  'Table Re-Polish',
  'Crown Re-Polish',
  'Pavilion Re-Polish',
  'Gemstone Material Cut Design',
  'Virtual Consultation',
];

// ── Field component — matches AdminProductAddDrawer ──
function Field({ label, value, onChange, placeholder, type = 'text', inputMode, required }: {
  label:       string;
  value:       string;
  onChange:    (v: string) => void;
  placeholder: string;
  type?:       string;
  inputMode?:  React.HTMLAttributes<HTMLInputElement>['inputMode'];
  required?:   boolean;
}) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 10, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-mob-muted)', display: 'block', marginBottom: 6 }}>
        {label}{required && <span style={{ color: '#f87171', marginLeft: 3 }}>*</span>}
      </label>
      <input
        type={type}
        inputMode={inputMode}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ width: '100%', background: 'var(--bg-mob-card)', border: '0.5px solid var(--bdr2-mob)', borderRadius: 8, color: 'var(--text-mob)', fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(0.875rem,3.8vw,1rem)', padding: '11px 14px', outline: 'none', boxSizing: 'border-box' }}
        onFocus={e => { e.target.style.borderColor = 'var(--gold)'; }}
        onBlur={e  => { e.target.style.borderColor = 'var(--bdr2-mob)'; }}
      />
    </div>
  );
}

function FieldRow({ children }: { children: React.ReactNode }) {
  return <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>{children}</div>;
}

function SectionLabel({ children }: { children: string }) {
  return (
    <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-mob-muted)', marginBottom: 12, marginTop: 20, paddingBottom: 6, borderBottom: '0.5px solid var(--bdr2-mob)' }}>
      {children}
    </div>
  );
}

interface WOForm {
  title:                string;
  description:          string;
  service_type:         string;
  gem_type:             string;
  estimated_price:      string;
  estimated_turnaround: string;
  notes:                string;
}

const EMPTY_FORM: WOForm = {
  title: '', description: '', service_type: '',
  gem_type: '', estimated_price: '', estimated_turnaround: '', notes: '',
};

interface Props {
  open:     boolean;
  user:     any;
  onClose:  () => void;
  onSaved:  () => void;
  createWO: (form: WOForm) => Promise<{ error: string | null }>;
}

export default function AdminUserAddWorkOrderDrawer({ open, user, onClose, onSaved, createWO }: Props) {
  const { elementRef, touchHandlers } = useSwipeToClose({ onClose });

  const [form,     setForm]     = useState<WOForm>(EMPTY_FORM);
  const [saving,   setSaving]   = useState(false);
  const [savedMsg, setSavedMsg] = useState('');
  const [errors,   setErrors]   = useState<{ code: number; message: string; time: string }[]>([]);
  const [showErrors, setShowErrors] = useState(false);

  const logError = (code: number, message: string) => {
    setErrors(prev => [{ code, message, time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) }, ...prev]);
  };

  // Reset on open
  useEffect(() => {
    if (!open) return;
    setForm(EMPTY_FORM);
    setSaving(false);
    setSavedMsg('');
    setErrors([]);
    setShowErrors(false);
  }, [open]);

  const setField = (key: keyof WOForm) => (v: string) => setForm(f => ({ ...f, [key]: v }));

  const handleCreate = async () => {
    if (!form.title.trim()) { logError(400, 'Title is required.'); return; }
    if (!form.description.trim()) { logError(400, 'Description is required.'); return; }
    if (saving) return;
    setSaving(true);
    setSavedMsg('');

    const result = await createWO(form);
    if (result.error) {
      logError(200, `Could not create work order: ${result.error}`);
      setSaving(false);
      return;
    }

    setSavedMsg('✓ Work order created');
    setTimeout(() => { onSaved(); onClose(); }, 700);
  };

  const errorCount = errors.length;

  return (
    <>
      <div className={`overlay${open ? ' open' : ''}`} onClick={onClose} />

      <div ref={elementRef} className={`res-drawer${open ? ' open' : ''}`} {...touchHandlers}>
        <div className="res-handle" />

        <div className="res-body">

          {/* Topbar */}
          <div className="res-topbar">
            <span style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 'clamp(0.75rem,3.2vw,0.875rem)', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-mob-muted)', flex: 1 }}>
              New Work Order
            </span>
            {errorCount > 0 && (
              <button
                onClick={() => setShowErrors(s => !s)}
                style={{ background: 'rgba(248,113,113,0.12)', border: '0.5px solid rgba(248,113,113,0.35)', color: '#f87171', borderRadius: 6, padding: '3px 10px', fontFamily: 'var(--font-mono-mob)', fontSize: 10, letterSpacing: '0.1em', cursor: 'pointer', marginRight: 10, display: 'flex', alignItems: 'center', gap: 5 }}
              >
                ⚠ {errorCount} {showErrors ? '▲' : '▼'}
              </button>
            )}
            <button className="res-close" onClick={onClose}>✕</button>
          </div>

          <div className="res-scroll">

            {/* Error log */}
            {showErrors && errors.length > 0 && (
              <div style={{ background: 'rgba(248,113,113,0.07)', border: '0.5px solid rgba(248,113,113,0.25)', borderRadius: 8, padding: '12px 14px', marginBottom: 20 }}>
                <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#f87171', marginBottom: 10 }}>Error Log</div>
                {errors.map((err, i) => (
                  <div key={i} style={{ marginBottom: 8, paddingBottom: 8, borderBottom: i < errors.length - 1 ? '0.5px solid rgba(248,113,113,0.15)' : 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                      <span style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 11, fontWeight: 700, color: '#f87171' }}>ERR-{err.code}</span>
                      <span style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 10, color: 'var(--text-mob-muted)', opacity: 0.6 }}>{err.time}</span>
                    </div>
                    <div style={{ fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(0.75rem,3.2vw,0.875rem)', color: 'var(--text-mob-muted)', lineHeight: 1.5 }}>{err.message}</div>
                  </div>
                ))}
                <button onClick={() => setErrors([])} style={{ background: 'none', border: 'none', color: 'var(--text-mob-muted)', fontFamily: 'var(--font-mono-mob)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', marginTop: 4 }}>Clear log</button>
              </div>
            )}

            {/* ── Service Type ── */}
            <SectionLabel>Service Type</SectionLabel>
            <div style={{ marginBottom: 14 }}>
              <select
                value={form.service_type}
                onChange={e => setField('service_type')(e.target.value)}
                style={{ width: '100%', background: 'var(--bg-mob-card)', border: '0.5px solid var(--bdr2-mob)', borderRadius: 8, color: 'var(--text-mob)', fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(0.875rem,3.8vw,1rem)', padding: '11px 14px', outline: 'none', boxSizing: 'border-box', appearance: 'none' }}
                onFocus={e => { e.target.style.borderColor = 'var(--gold)'; }}
                onBlur={e  => { e.target.style.borderColor = 'var(--bdr2-mob)'; }}
              >
                <option value="">Select service type</option>
                {SERVICE_TYPES.map(st => <option key={st} value={st}>{st}</option>)}
              </select>
            </div>

            {/* ── Basic Info ── */}
            <SectionLabel>Work Order Info</SectionLabel>

            <Field label="Title" value={form.title} onChange={setField('title')} placeholder="Work order title" required />
            <FieldRow>
              <Field label="Gem Type" value={form.gem_type} onChange={setField('gem_type')} placeholder="e.g. Sapphire" />
              <Field label="Est. Price ($)" value={form.estimated_price} onChange={setField('estimated_price')} placeholder="0.00" inputMode="decimal" />
            </FieldRow>
            <Field label="Est. Turnaround" value={form.estimated_turnaround} onChange={setField('estimated_turnaround')} placeholder="e.g. 2–3 weeks after receiving stone" />

            {/* ── Description ── */}
            <SectionLabel>Description</SectionLabel>
            <div style={{ marginBottom: 14 }}>
              <textarea
                value={form.description}
                onChange={e => setField('description')(e.target.value)}
                placeholder="Describe the work to be done..."
                rows={4}
                style={{ width: '100%', background: 'var(--bg-mob-card)', border: `0.5px solid ${errors.some(e => e.code === 400 && e.message.includes('Description')) ? 'rgba(248,113,113,0.5)' : 'var(--bdr2-mob)'}`, borderRadius: 8, color: 'var(--text-mob)', fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(0.875rem,3.8vw,1rem)', padding: '11px 14px', outline: 'none', resize: 'vertical', boxSizing: 'border-box', minHeight: 100 }}
                onFocus={e => { e.target.style.borderColor = 'var(--gold)'; }}
                onBlur={e  => { e.target.style.borderColor = 'var(--bdr2-mob)'; }}
              />
            </div>

            {/* ── Internal Notes ── */}
            <SectionLabel>Internal Notes</SectionLabel>
            <div style={{ marginBottom: 14 }}>
              <textarea
                value={form.notes}
                onChange={e => setField('notes')(e.target.value)}
                placeholder="Admin-only notes..."
                rows={3}
                style={{ width: '100%', background: 'var(--bg-mob-card)', border: '0.5px solid var(--bdr2-mob)', borderRadius: 8, color: 'var(--text-mob)', fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(0.875rem,3.8vw,1rem)', padding: '11px 14px', outline: 'none', resize: 'vertical', boxSizing: 'border-box', minHeight: 80 }}
                onFocus={e => { e.target.style.borderColor = 'var(--gold)'; }}
                onBlur={e  => { e.target.style.borderColor = 'var(--bdr2-mob)'; }}
              />
            </div>

            {/* ── Return Address Preview ── */}
            {user?.shipping_address && (
              <>
                <SectionLabel>Return Address</SectionLabel>
                <div style={{ background: 'var(--bg-mob-card)', border: '0.5px solid var(--bdr2-mob)', borderRadius: 8, padding: '12px 14px', marginBottom: 20 }}>
                  <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-mob-muted)', marginBottom: 6 }}>From user profile</div>
                  <div style={{ fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(0.875rem,3.8vw,1rem)', color: 'var(--text-mob)', lineHeight: 1.6 }}>{user.shipping_address}</div>
                </div>
              </>
            )}

            {/* Success message */}
            {savedMsg && (
              <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 12, color: 'var(--gold)', marginBottom: 12, textAlign: 'center', letterSpacing: '0.1em' }}>
                {savedMsg}
              </div>
            )}

            {/* Action buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 32 }}>
              <button
                className="wiz-btn-pill wiz-btn-pill-gold"
                onClick={handleCreate}
                disabled={saving}
                style={{ opacity: saving ? 0.6 : 1 }}
              >
                {saving ? 'Creating...' : 'Create Work Order'}
              </button>
              <button
                className="wiz-btn-pill wiz-btn-pill-outline"
                onClick={onClose}
                disabled={saving}
              >
                Cancel
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}