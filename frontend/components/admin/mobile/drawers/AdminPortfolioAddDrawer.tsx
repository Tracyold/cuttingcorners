// frontend/components/admin/mobile/drawers/AdminProductAddDrawer.tsx
//
// Add new product drawer — slides in from the right.
// All fields: title, gem type, color, shape, weight, origin, treatment,
//             GIA report number, photo (upload or URL), prices, description.
// Photo uploads go to the portfolio-photos bucket (same as portfolio).
// Logic via createDraft + saveDraft + publishOne from useAdminProducts hook.
// All CSS from MobileShell.css — no Admin.css class names.
//
// Error codes:
//   100 — Internal/code error
//   200 — DB insert/update failed (from hook)
//   201 — Storage upload failed
//   202 — Storage public URL failed
//   400 — Validation error (title required)
//   503 — Network error

import { useState, useRef, useEffect } from 'react';
import { supabase } from '../../../../lib/supabase';
import { useSwipeToClose } from '../../../account/shared/hooks/useSwipeToClose';
import { genProductId, EMPTY_PRODUCT } from '../../hooks/useAdminProducts';
import type { AdminProductsData } from '../../hooks/useAdminProducts';

interface ErrorEntry {
  code:    number;
  message: string;
  time:    string;
}

interface Props {
  open:          boolean;
  onClose:       () => void;
  onSaved:       () => void;
  createDraft:   AdminProductsData['createDraft'];
  saveDraft:     AdminProductsData['saveDraft'];
  publishOne:    AdminProductsData['publishOne'];
}

// ── Field component — label + input ──────────────────────────────────────────
function Field({ label, value, onChange, placeholder, type = 'text', inputMode }: {
  label:       string;
  value:       string;
  onChange:    (v: string) => void;
  placeholder: string;
  type?:       string;
  inputMode?:  React.HTMLAttributes<HTMLInputElement>['inputMode'];
}) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 10, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-mob-muted)', display: 'block', marginBottom: 6 }}>
        {label}
      </label>
      <input
        type={type}
        inputMode={inputMode}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ width: '100%', background: 'var(--bg-mob-card)', border: '0.5px solid var(--bdr2-mob)', borderRadius: 8, color: 'var(--text-mob)', fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(0.875rem,3.8vw,1rem)', padding: '11px 14px', outline: 'none', boxSizing: 'border-box' }}
        onFocus={e  => { e.target.style.borderColor = 'var(--gold)'; }}
        onBlur={e   => { e.target.style.borderColor = 'var(--bdr2-mob)'; }}
      />
    </div>
  );
}

// ── Row of two fields ─────────────────────────────────────────────────────────
function FieldRow({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
      {children}
    </div>
  );
}

// ── Section label ─────────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: string }) {
  return (
    <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-mob-muted)', marginBottom: 12, marginTop: 20, paddingBottom: 6, borderBottom: '0.5px solid var(--bdr2-mob)' }}>
      {children}
    </div>
  );
}

export default function AdminProductAddDrawer({ open, onClose, onSaved, createDraft, saveDraft, publishOne }: Props) {
  const { elementRef, touchHandlers } = useSwipeToClose({ onClose });

  // ── Form fields ───────────────────────────────────────────────────────────
  const [title,            setTitle]            = useState('');
  const [gemType,          setGemType]          = useState('');
  const [color,            setColor]            = useState('');
  const [shape,            setShape]            = useState('');
  const [weight,           setWeight]           = useState('');
  const [origin,           setOrigin]           = useState('');
  const [treatment,        setTreatment]        = useState('');
  const [giaNumber,        setGiaNumber]        = useState('');
  const [giaPdfUrl,        setGiaPdfUrl]        = useState('');
  const [photoUrl,         setPhotoUrl]         = useState('');
  const [pricePerCarat,    setPricePerCarat]    = useState('');
  const [totalPrice,       setTotalPrice]       = useState('');
  const [description,      setDescription]      = useState('');

  // ── Photo upload ──────────────────────────────────────────────────────────
  const [photoMode,        setPhotoMode]        = useState<'url' | 'upload'>('url');
  const [uploading,        setUploading]        = useState(false);
  const [uploadName,       setUploadName]       = useState('');
  const [preview,          setPreview]          = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  // ── Save state ────────────────────────────────────────────────────────────
  const [saving,           setSaving]           = useState(false);
  const [savedMsg,         setSavedMsg]         = useState('');
  const [productId,        setProductId]        = useState('');
  const [draftCreated,     setDraftCreated]     = useState(false);

  // ── Error log ─────────────────────────────────────────────────────────────
  const [errors,           setErrors]           = useState<ErrorEntry[]>([]);
  const [showErrors,       setShowErrors]       = useState(false);

  const logError = (code: number, message: string) => {
    setErrors(prev => [{ code, message, time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) }, ...prev]);
    console.error(`[CCG ERR-${code}]`, message);
  };

  // Reset on open
  useEffect(() => {
    if (!open) return;
    setTitle(''); setGemType(''); setColor(''); setShape('');
    setWeight(''); setOrigin(''); setTreatment('');
    setGiaNumber(''); setGiaPdfUrl('');
    setPhotoUrl(''); setPreview(''); setUploadName('');
    setPricePerCarat(''); setTotalPrice(''); setDescription('');
    setPhotoMode('url'); setUploading(false);
    setSaving(false); setSavedMsg('');
    setProductId(''); setDraftCreated(false);
    setErrors([]); setShowErrors(false);
  }, [open]);

  // ── Build product object from form state ──────────────────────────────────
  const buildProduct = (pid: string) => ({
    product_id:         pid,
    title,
    gem_type:           gemType,
    color,
    shape,
    weight,
    origin,
    treatment,
    gia_report_number:  giaNumber,
    gia_report_pdf_url: giaPdfUrl,
    photo_url:          photoUrl,
    price_per_carat:    pricePerCarat,
    total_price:        totalPrice,
    description,
    created_at:         new Date().toISOString(),
    product_state:      'DRAFT',
    _saved:             false,
  });

  // ── Ensure draft row exists before upload / save ───────────────────────────
  const ensureDraft = async (): Promise<string | null> => {
    if (draftCreated) return productId;
    const pid = genProductId();
    const result = await createDraft(pid);
    if (result.error) { logError(200, `Could not create draft: ${result.error}`); return null; }
    setProductId(pid);
    setDraftCreated(true);
    return pid;
  };

  // ── Photo upload ──────────────────────────────────────────────────────────
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const localUrl = URL.createObjectURL(file);
    setPreview(localUrl);
    setUploadName(file.name);
    setUploading(true);

    try {
      const ext  = file.name.split('.').pop()?.toLowerCase() || 'jpg';
      const path = `products/${Date.now()}_${file.name}`;

      const { data, error: uploadErr } = await supabase.storage
        .from('portfolio-photos')
        .upload(path, file, { contentType: file.type });

      if (uploadErr) { logError(201, `Upload failed: ${uploadErr.message}`); setUploading(false); return; }

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
  const handleSave = async (publish: boolean) => {
    if (!title.trim()) { logError(400, 'Title is required before saving.'); return; }
    if (saving) return;
    setSaving(true);
    setSavedMsg('');

    const pid = await ensureDraft();
    if (!pid) { setSaving(false); return; }

    const product = buildProduct(pid);

    let result: { error?: string };
    if (publish) {
      result = await publishOne(product);
    } else {
      result = await saveDraft(product);
    }

    if (result.error) {
      logError(200, `Save failed: ${result.error}`);
      setSaving(false);
      return;
    }

    setSavedMsg(publish ? '✓ Published live' : '✓ Saved as draft');
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
              New Product
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

            {/* ── Basic Info ── */}
            <SectionLabel>Basic Info</SectionLabel>

            <div style={{ marginBottom: 14 }}>
              <label style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 10, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-mob-muted)', display: 'block', marginBottom: 6 }}>
                Title <span style={{ color: '#f87171' }}>*</span>
              </label>
              <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. Burmese Pigeon Blood Ruby"
                style={{ width: '100%', background: 'var(--bg-mob-card)', border: `0.5px solid ${errors.some(e => e.code === 400) ? 'rgba(248,113,113,0.5)' : 'var(--bdr2-mob)'}`, borderRadius: 8, color: 'var(--text-mob)', fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(0.875rem,3.8vw,1rem)', padding: '11px 14px', outline: 'none', boxSizing: 'border-box' }}
                onFocus={e => { e.target.style.borderColor = 'var(--gold)'; }}
                onBlur={e  => { e.target.style.borderColor = errors.some(err => err.code === 400) ? 'rgba(248,113,113,0.5)' : 'var(--bdr2-mob)'; }}
              />
            </div>

            <FieldRow>
              <Field label="Gem Type"  value={gemType}  onChange={setGemType}  placeholder="e.g. Sapphire" />
              <Field label="Color"     value={color}    onChange={setColor}    placeholder="e.g. Cornflower" />
            </FieldRow>
            <FieldRow>
              <Field label="Shape"     value={shape}    onChange={setShape}    placeholder="e.g. Oval" />
              <Field label="Weight (ct)" value={weight} onChange={setWeight}   placeholder="e.g. 4.20" inputMode="decimal" />
            </FieldRow>
            <FieldRow>
              <Field label="Origin"    value={origin}   onChange={setOrigin}   placeholder="e.g. Burma" />
              <Field label="Treatment" value={treatment} onChange={setTreatment} placeholder="e.g. Heated" />
            </FieldRow>

            {/* ── Photo ── */}
            <SectionLabel>Photo</SectionLabel>

            {/* Mode toggle */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
              {(['url', 'upload'] as const).map(m => (
                <button
                  key={m}
                  onClick={() => setPhotoMode(m)}
                  className={photoMode === m ? 'wiz-btn-pill wiz-btn-pill-gold' : 'wiz-btn-pill wiz-btn-pill-outline'}
                  style={{ flex: 1, padding: '10px', fontSize: 11 }}
                >
                  {m === 'url' ? 'URL' : 'Upload'}
                </button>
              ))}
            </div>

            {photoMode === 'url' ? (
              <Field label="Photo URL" value={photoUrl} onChange={v => { setPhotoUrl(v); setPreview(v); }} placeholder="https://..." />
            ) : (
              <div style={{ marginBottom: 14 }}>
                {uploading ? (
                  <div style={{ width: '100%', aspectRatio: '1/1', background: 'var(--bg-mob-card)', border: '0.5px solid var(--bdr2-mob)', borderRadius: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', border: '3px solid var(--bdr2-mob)', borderTopColor: 'var(--gold)', animation: 'spin 0.8s linear infinite' }} />
                    <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 11, color: 'var(--text-mob-muted)', letterSpacing: '0.1em' }}>Uploading {uploadName}...</div>
                  </div>
                ) : preview ? (
                  <div style={{ position: 'relative', marginBottom: 12 }}>
                    <img src={preview} alt="preview" style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block', borderRadius: 8, border: '0.5px solid var(--bdr2-mob)' }} onError={() => setPreview('')} />
                    <div style={{ position: 'absolute', bottom: 8, left: 8, background: 'rgba(0,0,0,0.7)', borderRadius: 4, padding: '3px 8px', fontFamily: 'var(--font-mono-mob)', fontSize: 9, color: 'var(--gold)', letterSpacing: '0.1em' }}>
                      {photoUrl ? 'Uploaded ✓' : 'Preview only'}
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => fileRef.current?.click()}
                    style={{ width: '100%', aspectRatio: '1/1', background: 'var(--bg-mob-card)', border: '0.5px dashed var(--bdr2-mob)', borderRadius: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 12, cursor: 'pointer' }}
                  >
                    <div style={{ fontSize: '2.5rem', opacity: 0.2 }}>◈</div>
                    <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 11, color: 'var(--text-mob-muted)', letterSpacing: '0.1em' }}>Tap to upload photo</div>
                  </div>
                )}
                <button onClick={() => fileRef.current?.click()} disabled={uploading} className="wiz-btn-pill wiz-btn-pill-outline" style={{ fontSize: 11, opacity: uploading ? 0.5 : 1 }}>
                  {uploading ? 'Uploading...' : preview ? 'Replace Photo' : 'Upload Photo'}
                </button>
                <input ref={fileRef} type="file" accept=".jpg,.jpeg,.png,.tiff,.tif,.dng,.heic,.webp" style={{ display: 'none' }} onChange={handleFileChange} />
                <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 9, color: 'var(--text-mob-muted)', opacity: 0.6, marginTop: 6, letterSpacing: '0.06em' }}>
                  JPG · PNG · TIFF · DNG · HEIC · WEBP · Max 25MB
                </div>
              </div>
            )}

            {/* ── GIA Report ── */}
            <SectionLabel>GIA Report</SectionLabel>
            <FieldRow>
              <Field label="Report Number" value={giaNumber}  onChange={setGiaNumber}  placeholder="2211234567" />
              <Field label="PDF / Photo URL" value={giaPdfUrl} onChange={setGiaPdfUrl} placeholder="https://..." />
            </FieldRow>

            {/* ── Pricing ── */}
            <SectionLabel>Pricing</SectionLabel>
            <FieldRow>
              <Field label="Price Per Carat ($)" value={pricePerCarat} onChange={setPricePerCarat} placeholder="12000" inputMode="decimal" />
              <Field label="Total Price ($)"      value={totalPrice}   onChange={setTotalPrice}    placeholder="41040" inputMode="decimal" />
            </FieldRow>

            {/* ── Description ── */}
            <SectionLabel>Description</SectionLabel>
            <div style={{ marginBottom: 28 }}>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Additional notes about this stone..."
                rows={4}
                style={{ width: '100%', background: 'var(--bg-mob-card)', border: '0.5px solid var(--bdr2-mob)', borderRadius: 8, color: 'var(--text-mob)', fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(0.875rem,3.8vw,1rem)', padding: '11px 14px', outline: 'none', resize: 'vertical', boxSizing: 'border-box', minHeight: 100 }}
                onFocus={e => { e.target.style.borderColor = 'var(--gold)'; }}
                onBlur={e  => { e.target.style.borderColor = 'var(--bdr2-mob)'; }}
              />
            </div>

            {/* Validation hint */}
            {errors.some(e => e.code === 400) && (
              <div style={{ fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(0.75rem,3.2vw,0.875rem)', color: '#f87171', marginBottom: 12, textAlign: 'center' }}>
                Title is required before saving.
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
              <button className="wiz-btn-pill wiz-btn-pill-gold" onClick={() => handleSave(true)} disabled={saving || uploading} style={{ opacity: saving || uploading ? 0.6 : 1 }}>
                {saving ? 'Publishing...' : uploading ? 'Waiting for upload...' : 'Publish Live'}
              </button>
              <button className="wiz-btn-pill wiz-btn-pill-outline" onClick={() => handleSave(false)} disabled={saving || uploading} style={{ opacity: saving || uploading ? 0.6 : 1 }}>
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