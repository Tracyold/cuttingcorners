// frontend/components/admin/mobile/drawers/AdminPortfolioAddDrawer.tsx
//
// Add new portfolio photo drawer.
// Uses addSingle from useAdminPortfolio — no direct Supabase calls here.
// Storage upload is still here because it's UI-specific (progress, preview).
//
// Error codes:
//   100 — Internal/code error
//   200 — DB insert failed (from hook)
//   201 — Supabase Storage upload failed
//   202 — Supabase Storage public URL failed
//   400 — Validation error (year required)
//   503 — Network error

import { useState, useRef, useEffect } from 'react';
import { supabase } from '../../../../lib/supabase';
import { useSwipeToClose } from '../../../account/shared/hooks/useSwipeToClose';
import type { AddSinglePayload } from '../../hooks/useAdminPortfolio';

interface ErrorEntry {
  code:    number;
  message: string;
  time:    string;
}

interface Props {
  open:      boolean;
  onClose:   () => void;
  onSaved:   () => void;
  addSingle: (payload: AddSinglePayload) => Promise<{ error?: string }>;
}

export default function AdminPortfolioAddDrawer({ open, onClose, onSaved, addSingle }: Props) {
  const { elementRef, touchHandlers } = useSwipeToClose({ onClose });

  const [year,        setYear]        = useState('');
  const [caption,     setCaption]     = useState('');
  const [description, setDescription] = useState('');
  const [photoUrl,    setPhotoUrl]    = useState('');
  const [preview,     setPreview]     = useState('');
  const [uploadName,  setUploadName]  = useState('');
  const [uploading,   setUploading]   = useState(false);
  const [saving,      setSaving]      = useState(false);
  const [savedMsg,    setSavedMsg]    = useState('');
  const [errors,      setErrors]      = useState<ErrorEntry[]>([]);
  const [showErrors,  setShowErrors]  = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const logError = (code: number, message: string) => {
    setErrors(prev => [{
      code, message,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    }, ...prev]);
    console.error(`[CCG ERR-${code}]`, message);
  };

  // Reset on open
  useEffect(() => {
    if (!open) return;
    setYear(''); setCaption(''); setDescription('');
    setPhotoUrl(''); setPreview(''); setUploadName('');
    setSaving(false); setSavedMsg('');
    setErrors([]); setShowErrors(false);
  }, [open]);

  // ── Photo upload (storage only — logic stays in UI since it's upload-specific) ──
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const localUrl = URL.createObjectURL(file);
    setPreview(localUrl);
    setUploadName(file.name);
    setUploading(true);

    try {
      const ext  = file.name.split('.').pop()?.toLowerCase() || 'jpg';
      const path = `add_${Date.now()}.${ext}`;

      const { data, error: uploadErr } = await supabase.storage
        .from('portfolio-photos')
        .upload(path, file, { contentType: file.type });

      if (uploadErr) { logError(201, `Storage upload failed: ${uploadErr.message}`); setUploading(false); return; }

      let publicUrl = '';
      try {
        const { data: urlData } = supabase.storage.from('portfolio-photos').getPublicUrl(data.path);
        publicUrl = urlData?.publicUrl ?? '';
        if (!publicUrl) throw new Error('Empty public URL');
      } catch (urlErr: any) {
        logError(202, `Could not get public URL: ${urlErr?.message}`);
        setUploading(false);
        return;
      }

      setPhotoUrl(publicUrl);
      setPreview(publicUrl);
    } catch (err: any) {
      if (err instanceof TypeError || err?.message?.toLowerCase().includes('network')) {
        logError(503, `Network error: ${err?.message}`);
      } else {
        logError(100, `Unexpected upload error: ${err?.message}`);
      }
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  // ── Save via hook ──────────────────────────────────────────────────────────
  const handleSave = async (publishLive: boolean) => {
    if (!year.trim()) { logError(400, 'Year is required before saving.'); return; }
    if (saving) return;
    setSaving(true);
    setSavedMsg('');

    const result = await addSingle({ photoUrl, year, caption, description, publishLive });

    if (result.error) {
      logError(200, `DB insert failed: ${result.error}`);
      setSaving(false);
      return;
    }

    setSavedMsg(publishLive ? '✓ Published live' : '✓ Saved as draft');
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
              New Portfolio Photo
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

            {/* Photo upload */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 10, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-mob-muted)', marginBottom: 10 }}>
                Photo
              </div>

              {uploading ? (
                <div style={{ width: '100%', aspectRatio: '1/1', background: 'var(--bg-mob-card)', border: '0.5px solid var(--bdr2-mob)', borderRadius: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', border: '3px solid var(--bdr2-mob)', borderTopColor: 'var(--gold)', animation: 'spin 0.8s linear infinite' }} />
                  <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 11, color: 'var(--text-mob-muted)', letterSpacing: '0.1em' }}>
                    Uploading {uploadName}...
                  </div>
                </div>
              ) : preview ? (
                <div style={{ position: 'relative', marginBottom: 12 }}>
                  <img
                    src={preview}
                    alt="preview"
                    style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block', borderRadius: 8, border: '0.5px solid var(--bdr2-mob)' }}
                    onError={() => setPreview('')}
                  />
                  <div style={{ position: 'absolute', bottom: 8, left: 8, background: 'rgba(0,0,0,0.7)', borderRadius: 4, padding: '3px 8px', fontFamily: 'var(--font-mono-mob)', fontSize: 9, color: 'var(--gold)', letterSpacing: '0.1em' }}>
                    {photoUrl ? 'Uploaded ✓' : 'Preview only'}
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => fileRef.current?.click()}
                  style={{ width: '100%', aspectRatio: '1/1', background: 'var(--bg-mob-card)', border: '0.5px dashed var(--bdr2-mob)', borderRadius: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 12, cursor: 'pointer' }}
                >
                  <div style={{ fontSize: '2.5rem', opacity: 0.2 }}>◻</div>
                  <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 11, color: 'var(--text-mob-muted)', letterSpacing: '0.1em' }}>Tap to upload photo</div>
                </div>
              )}

              <button
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
                className="wiz-btn-pill wiz-btn-pill-outline"
                style={{ fontSize: 11, opacity: uploading ? 0.5 : 1 }}
              >
                {uploading ? 'Uploading...' : preview ? 'Replace Photo' : 'Upload Photo'}
              </button>
              <input ref={fileRef} type="file" accept=".jpg,.jpeg,.png,.tiff,.tif,.dng,.heic,.webp" style={{ display: 'none' }} onChange={handleFileChange} />
              <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 9, color: 'var(--text-mob-muted)', opacity: 0.6, marginTop: 6, letterSpacing: '0.06em' }}>
                JPG · PNG · TIFF · DNG · HEIC · WEBP · Max 25MB
              </div>
            </div>

            {/* Year */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 10, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-mob-muted)', display: 'block', marginBottom: 6 }}>
                Year <span style={{ color: '#f87171' }}>*</span>
              </label>
              <input
                value={year}
                onChange={e => setYear(e.target.value.replace(/\D/g, '').slice(0, 4))}
                placeholder="e.g. 2024"
                maxLength={4}
                inputMode="numeric"
                style={{ width: '100%', background: 'var(--bg-mob-card)', border: `0.5px solid ${errors.some(e => e.code === 400) ? 'rgba(248,113,113,0.5)' : 'var(--bdr2-mob)'}`, borderRadius: 8, color: 'var(--text-mob)', fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(0.9375rem,4vw,1.0625rem)', padding: '12px 14px', outline: 'none', boxSizing: 'border-box' }}
                onFocus={e => { e.target.style.borderColor = 'var(--gold)'; }}
                onBlur={e => { e.target.style.borderColor = errors.some(err => err.code === 400) ? 'rgba(248,113,113,0.5)' : 'var(--bdr2-mob)'; }}
              />
              <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 9, color: 'var(--text-mob-muted)', opacity: 0.6, marginTop: 4, letterSpacing: '0.06em' }}>
                Displayed in gold below each photo on the public portfolio
              </div>
            </div>

            {/* Caption */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 10, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-mob-muted)', display: 'block', marginBottom: 6 }}>
                Caption
              </label>
              <input
                value={caption}
                onChange={e => setCaption(e.target.value)}
                placeholder="e.g. Kashmir Sapphire Collection"
                style={{ width: '100%', background: 'var(--bg-mob-card)', border: '0.5px solid var(--bdr2-mob)', borderRadius: 8, color: 'var(--text-mob)', fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(0.9375rem,4vw,1.0625rem)', padding: '12px 14px', outline: 'none', boxSizing: 'border-box' }}
                onFocus={e => { e.target.style.borderColor = 'var(--gold)'; }}
                onBlur={e => { e.target.style.borderColor = 'var(--bdr2-mob)'; }}
              />
            </div>

            {/* Description */}
            <div style={{ marginBottom: 28 }}>
              <label style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 10, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-mob-muted)', display: 'block', marginBottom: 6 }}>
                Description
              </label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Additional details about this piece or collection..."
                rows={4}
                style={{ width: '100%', background: 'var(--bg-mob-card)', border: '0.5px solid var(--bdr2-mob)', borderRadius: 8, color: 'var(--text-mob)', fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(0.9375rem,4vw,1.0625rem)', padding: '12px 14px', outline: 'none', resize: 'vertical', boxSizing: 'border-box', minHeight: 100 }}
                onFocus={e => { e.target.style.borderColor = 'var(--gold)'; }}
                onBlur={e => { e.target.style.borderColor = 'var(--bdr2-mob)'; }}
              />
            </div>

            {/* Validation hint */}
            {errors.some(e => e.code === 400) && (
              <div style={{ fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(0.75rem,3.2vw,0.875rem)', color: '#f87171', marginBottom: 12, textAlign: 'center' }}>
                Year is required before saving.
              </div>
            )}

            {/* Success message */}
            {savedMsg && (
              <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 12, color: 'var(--gold)', marginBottom: 12, textAlign: 'center', letterSpacing: '0.1em' }}>
                {savedMsg}
              </div>
            )}

            {/* Action buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button
                className="wiz-btn-pill wiz-btn-pill-gold"
                onClick={() => handleSave(true)}
                disabled={saving || uploading}
                style={{ opacity: saving || uploading ? 0.6 : 1 }}
              >
                {saving ? 'Publishing...' : uploading ? 'Waiting for upload...' : 'Publish Live'}
              </button>
              <button
                className="wiz-btn-pill wiz-btn-pill-outline"
                onClick={() => handleSave(false)}
                disabled={saving || uploading}
                style={{ opacity: saving || uploading ? 0.6 : 1 }}
              >
                {saving ? 'Saving...' : 'Save as Draft'}
              </button>
            </div>

          </div>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </>
  );
}