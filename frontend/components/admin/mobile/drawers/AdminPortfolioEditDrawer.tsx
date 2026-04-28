// frontend/components/admin/mobile/drawers/AdminPortfolioEditDrawer.tsx
//
// Edit drawer for a single portfolio photo.
// Opens after the detail drawer closes (tap Edit Photo → this slides in).
//
// Fields: Year, Caption, Description, Photo (upload or replace)
//
// Error code system:
//   100 — Internal/code error (unexpected exception, missing data)
//   200 — Supabase DB error (insert/update/select failed)
//   201 — Supabase Storage upload error
//   202 — Supabase Storage URL error
//   400 — Validation error (required field missing)
//   503 — Network error (fetch failed, timeout)

import { useState, useEffect, useRef } from 'react';
import { supabase } from '../../../../lib/supabase';
import { useSwipeToClose } from '../../../account/shared/hooks/useSwipeToClose';

interface Photo {
  portfolio_photo_id: string;
  photo_url:          string;
  year:               string;
  caption:            string;
  description:        string;
  sort_order:         number;
  published:          boolean;
  archived:           boolean;
  created_at:         string;
}

interface ErrorEntry {
  code:    number;
  message: string;
  time:    string;
}

interface Props {
  open:      boolean;
  photo:     Photo | null;
  onClose:   () => void;
  onSaved:   () => void; // called after successful save — triggers loadPhotos
}

export default function AdminPortfolioEditDrawer({ open, photo, onClose, onSaved }: Props) {
  const { elementRef, touchHandlers } = useSwipeToClose({ onClose });

  // ── Form state ────────────────────────────────────────────────────────────
  const [year,        setYear]        = useState('');
  const [caption,     setCaption]     = useState('');
  const [description, setDescription] = useState('');
  const [photoUrl,    setPhotoUrl]    = useState('');

  // ── Upload state ──────────────────────────────────────────────────────────
  const [uploading,   setUploading]   = useState(false);
  const [uploadName,  setUploadName]  = useState('');
  const [preview,     setPreview]     = useState(''); // local object URL or remote URL
  const fileRef = useRef<HTMLInputElement>(null);

  // ── Save state ────────────────────────────────────────────────────────────
  const [saving,  setSaving]  = useState(false);
  const [saved,   setSaved]   = useState(false);

  // ── Error log ─────────────────────────────────────────────────────────────
  const [errors, setErrors] = useState<ErrorEntry[]>([]);
  const [showErrors, setShowErrors] = useState(false);

  const logError = (code: number, message: string) => {
    const entry: ErrorEntry = {
      code,
      message,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    };
    setErrors(prev => [entry, ...prev]);
    console.error(`[CCG Error ${code}]`, message);
  };

  // ── Populate form when photo changes ─────────────────────────────────────
  useEffect(() => {
    if (!open || !photo) return;
    setYear(photo.year        || '');
    setCaption(photo.caption  || '');
    setDescription(photo.description || '');
    setPhotoUrl(photo.photo_url || '');
    setPreview(photo.photo_url && !photo.photo_url.startsWith('[uploaded]') ? photo.photo_url : '');
    setUploadName('');
    setSaved(false);
    setErrors([]);
    setShowErrors(false);
  }, [open, photo]);

  // ── Photo upload ──────────────────────────────────────────────────────────
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !photo) return;

    // Show local preview immediately
    const localUrl = URL.createObjectURL(file);
    setPreview(localUrl);
    setUploadName(file.name);
    setUploading(true);

    try {
      const ext  = file.name.split('.').pop()?.toLowerCase() || 'jpg';
      const path = `${photo.portfolio_photo_id}_${Date.now()}.${ext}`;

      const { data, error: uploadErr } = await supabase.storage
        .from('portfolio-photos')
        .upload(path, file, { contentType: file.type, upsert: true });

      if (uploadErr) {
        logError(201, `Storage upload failed: ${uploadErr.message}`);
        setUploading(false);
        return;
      }

      let publicUrl = '';
      try {
        const { data: urlData } = supabase.storage.from('portfolio-photos').getPublicUrl(data.path);
        publicUrl = urlData?.publicUrl ?? '';
        if (!publicUrl) throw new Error('Empty public URL returned');
      } catch (urlErr: any) {
        logError(202, `Could not get public URL: ${urlErr?.message}`);
        setUploading(false);
        return;
      }

      setPhotoUrl(publicUrl);
      setPreview(publicUrl);
    } catch (err: any) {
      if (err?.message?.toLowerCase().includes('network') || err instanceof TypeError) {
        logError(503, `Network error during upload: ${err?.message}`);
      } else {
        logError(100, `Unexpected upload error: ${err?.message}`);
      }
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  // ── Save ──────────────────────────────────────────────────────────────────
  const handleSave = async () => {
    if (!photo) { logError(100, 'handleSave called with no photo'); return; }

    // Validation
    if (!year.trim()) {
      logError(400, 'Year is required before saving.');
      return;
    }

    setSaving(true);
    try {
      const { error: dbErr } = await supabase
        .from('portfolio_photos')
        .update({
          year:        year.trim()        || null,
          caption:     caption.trim()     || null,
          description: description.trim() || null,
          photo_url:   photoUrl           || null,
        })
        .eq('portfolio_photo_id', photo.portfolio_photo_id);

      if (dbErr) {
        logError(200, `Supabase update failed: ${dbErr.message}`);
        setSaving(false);
        return;
      }

      setSaved(true);
      setTimeout(() => {
        onSaved();
        onClose();
      }, 800);
    } catch (err: any) {
      if (err?.message?.toLowerCase().includes('network') || err instanceof TypeError) {
        logError(503, `Network error during save: ${err?.message}`);
      } else {
        logError(100, `Unexpected save error: ${err?.message}`);
      }
      setSaving(false);
    }
  };

  if (!photo) return null;

  const hasPhoto     = !!preview && !preview.startsWith('blob:') || (!!preview && !uploading);
  const isNewUpload  = !!uploadName;
  const errorCount   = errors.length;

  return (
    <>
      <div className={`overlay${open ? ' open' : ''}`} onClick={onClose} />

      <div ref={elementRef} className={`res-drawer${open ? ' open' : ''}`} {...touchHandlers}>
        <div className="res-handle" />

        <div className="res-body">

          {/* Topbar */}
          <div className="res-topbar">
            <span style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 'clamp(0.75rem,3.2vw,0.875rem)', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-mob-muted)', flex: 1 }}>
              Edit Photo
            </span>

            {/* Error log button */}
            {errorCount > 0 && (
              <button
                onClick={() => setShowErrors(s => !s)}
                style={{
                  background: 'rgba(248,113,113,0.12)', border: '0.5px solid rgba(248,113,113,0.35)',
                  color: '#f87171', borderRadius: 6, padding: '3px 10px',
                  fontFamily: 'var(--font-mono-mob)', fontSize: 10,
                  letterSpacing: '0.1em', cursor: 'pointer', marginRight: 10,
                  display: 'flex', alignItems: 'center', gap: 5,
                }}
              >
                ⚠ {errorCount} {showErrors ? '▲' : '▼'}
              </button>
            )}

            <button className="res-close" onClick={onClose}>✕</button>
          </div>

          <div className="res-scroll">

            {/* ── Error log panel ── */}
            {showErrors && errors.length > 0 && (
              <div style={{
                background: 'rgba(248,113,113,0.07)', border: '0.5px solid rgba(248,113,113,0.25)',
                borderRadius: 8, padding: '12px 14px', marginBottom: 20,
              }}>
                <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#f87171', marginBottom: 10 }}>
                  Error Log
                </div>
                {errors.map((err, i) => (
                  <div key={i} style={{ marginBottom: 8, paddingBottom: 8, borderBottom: i < errors.length - 1 ? '0.5px solid rgba(248,113,113,0.15)' : 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                      <span style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 11, fontWeight: 700, color: '#f87171' }}>
                        ERR-{err.code}
                      </span>
                      <span style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 10, color: 'var(--text-mob-muted)', opacity: 0.6 }}>
                        {err.time}
                      </span>
                    </div>
                    <div style={{ fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(0.75rem,3.2vw,0.875rem)', color: 'var(--text-mob-muted)', lineHeight: 1.5 }}>
                      {err.message}
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => setErrors([])}
                  style={{ background: 'none', border: 'none', color: 'var(--text-mob-muted)', fontFamily: 'var(--font-mono-mob)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', marginTop: 4 }}
                >
                  Clear log
                </button>
              </div>
            )}

            {/* ── Photo upload area ── */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 10, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-mob-muted)', marginBottom: 10 }}>
                Photo
              </div>

              {/* Preview */}
              {uploading ? (
                <div style={{
                  width: '100%', aspectRatio: '1/1',
                  background: 'var(--bg-mob-card)', border: '0.5px solid var(--bdr2-mob)',
                  borderRadius: 8, display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 12,
                }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', border: '3px solid var(--bdr2-mob)', borderTopColor: 'var(--gold)', animation: 'spin 0.8s linear infinite' }} />
                  <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 11, color: 'var(--text-mob-muted)', letterSpacing: '0.12em' }}>
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
                  {isNewUpload && (
                    <div style={{
                      position: 'absolute', bottom: 8, left: 8,
                      background: 'rgba(0,0,0,0.7)', borderRadius: 4,
                      padding: '3px 8px', fontFamily: 'var(--font-mono-mob)',
                      fontSize: 9, color: 'var(--gold)', letterSpacing: '0.1em',
                    }}>
                      New upload
                    </div>
                  )}
                </div>
              ) : (
                <div style={{
                  width: '100%', aspectRatio: '1/1',
                  background: 'var(--bg-mob-card)', border: '0.5px dashed var(--bdr2-mob)',
                  borderRadius: 8, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '2.5rem', opacity: 0.15, marginBottom: 12,
                }}>
                  ◻
                </div>
              )}

              {/* Upload / Replace button */}
              <button
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
                className="wiz-btn-pill wiz-btn-pill-outline"
                style={{ fontSize: 11, opacity: uploading ? 0.5 : 1 }}
              >
                {uploading ? 'Uploading...' : preview ? 'Replace Photo' : 'Upload Photo'}
              </button>
              <input
                ref={fileRef}
                type="file"
                accept=".jpg,.jpeg,.png,.tiff,.tif,.dng,.heic,.webp"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 9, color: 'var(--text-mob-muted)', opacity: 0.6, marginTop: 6, letterSpacing: '0.06em' }}>
                JPG · PNG · TIFF · DNG · HEIC · WEBP · Max 25MB
              </div>
            </div>

            {/* ── Year ── */}
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

            {/* ── Caption ── */}
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

            {/* ── Description ── */}
            <div style={{ marginBottom: 24 }}>
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

            {/* ── Save button ── */}
            <button
              onClick={handleSave}
              disabled={saving || uploading || saved}
              className="wiz-btn-pill wiz-btn-pill-gold"
              style={{ opacity: saving || uploading || saved ? 0.7 : 1 }}
            >
              {saved ? '✓ Saved' : saving ? 'Saving...' : uploading ? 'Waiting for upload...' : 'Save Changes'}
            </button>

            {/* Validation hint */}
            {errors.some(e => e.code === 400) && (
              <div style={{ fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(0.75rem,3.2vw,0.875rem)', color: '#f87171', marginTop: 10, textAlign: 'center' }}>
                Year is required before saving.
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Spinner keyframe */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </>
  );
}