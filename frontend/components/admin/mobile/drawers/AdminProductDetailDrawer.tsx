// frontend/components/admin/mobile/drawers/AdminProductDetailDrawer.tsx
//
// Detail + edit drawer for an existing product.
// Opens when a product row is tapped in AdminProductsPanel.
// Actions: edit all fields, replace photo, publish, unpublish, make inactive.

import { useState, useRef, useEffect } from 'react';
import { supabase } from '../../../../lib/supabase';
import { useSwipeToClose } from '../../../account/shared/hooks/useSwipeToClose';
import { upsertProduct } from '../../hooks/useAdminProducts';
import { formatMoney, fmtDate } from '../../../../lib/utils';

interface Props {
  open:      boolean;
  product:   any;
  onClose:   () => void;
  onSaved:   () => void;
}

function Field({ label, value, onChange, placeholder, inputMode }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder: string; inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
}) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 10, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-mob-muted)', display: 'block', marginBottom: 6 }}>
        {label}
      </label>
      <input
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

function SectionLabel({ children }: { children: string }) {
  return (
    <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-mob-muted)', marginBottom: 12, marginTop: 20, paddingBottom: 6, borderBottom: '0.5px solid var(--bdr2-mob)' }}>
      {children}
    </div>
  );
}

export default function AdminProductDetailDrawer({ open, product, onClose, onSaved }: Props) {
  const { elementRef, touchHandlers } = useSwipeToClose({ onClose });

  // ── Form state ────────────────────────────────────────────────────────────
  const [title,         setTitle]         = useState('');
  const [gemType,       setGemType]       = useState('');
  const [color,         setColor]         = useState('');
  const [shape,         setShape]         = useState('');
  const [weight,        setWeight]        = useState('');
  const [origin,        setOrigin]        = useState('');
  const [treatment,     setTreatment]     = useState('');
  const [giaNumber,     setGiaNumber]     = useState('');
  const [giaPdfUrl,     setGiaPdfUrl]     = useState('');
  const [photoUrl,      setPhotoUrl]      = useState('');
  const [pricePerCarat, setPricePerCarat] = useState('');
  const [totalPrice,    setTotalPrice]    = useState('');
  const [description,   setDescription]  = useState('');

  // ── Photo upload ──────────────────────────────────────────────────────────
  const [photoMode,  setPhotoMode]  = useState<'view' | 'url' | 'upload'>('view');
  const [uploading,  setUploading]  = useState(false);
  const [uploadName, setUploadName] = useState('');
  const [preview,    setPreview]    = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  // ── Save state ────────────────────────────────────────────────────────────
  const [saving,   setSaving]   = useState(false);
  const [flash,    setFlash]    = useState('');
  const [error,    setError]    = useState('');

  // Populate form when product changes
  useEffect(() => {
    if (!product || !open) return;
    setTitle(product.title         || '');
    setGemType(product.gem_type    || '');
    setColor(product.color         || '');
    setShape(product.shape         || '');
    setWeight(product.weight       ? String(product.weight) : '');
    setOrigin(product.origin       || '');
    setTreatment(product.treatment || '');
    setGiaNumber(product.gia_report_number   || '');
    setGiaPdfUrl(product.gia_report_pdf_url  || '');
    setPhotoUrl(product.photo_url            || '');
    setPreview(product.photo_url             || '');
    setPricePerCarat(product.price_per_carat ? String(product.price_per_carat) : '');
    setTotalPrice(product.total_price        ? String(product.total_price)     : '');
    setDescription(product.description      || '');
    setPhotoMode('view');
    setUploading(false);
    setSaving(false);
    setFlash('');
    setError('');
  }, [product, open]);

  const buildProduct = () => ({
    ...product,
    title, gem_type: gemType, color, shape, weight, origin, treatment,
    gia_report_number: giaNumber, gia_report_pdf_url: giaPdfUrl,
    photo_url: photoUrl, price_per_carat: pricePerCarat,
    total_price: totalPrice, description,
  });

  // ── Photo upload ──────────────────────────────────────────────────────────
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setUploadName(file.name);
    setUploading(true);
    setError('');
    try {
      const path = `products/${Date.now()}_${file.name}`;
      const { data, error: upErr } = await supabase.storage
        .from('product-images')
        .upload(path, file, { contentType: file.type });
      if (upErr) { setError(`Upload failed: ${upErr.message}`); setUploading(false); return; }
      const { data: urlData } = supabase.storage.from('product-images').getPublicUrl(data.path);
      const url = urlData?.publicUrl || '';
      if (!url) { setError('Could not get public URL'); setUploading(false); return; }
      setPhotoUrl(url);
      setPreview(url);
      setPhotoMode('view');
    } catch (err: any) {
      setError(err?.message || 'Upload error');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  // ── Actions ───────────────────────────────────────────────────────────────
  const handleSave = async (state: string) => {
    if (!title.trim()) { setError('Title is required'); return; }
    setSaving(true); setError('');
    const { error: e } = await upsertProduct(buildProduct(), state);
    setSaving(false);
    if (e) { setError(e.message); return; }
    setFlash(state === 'ACTIVE' ? '✓ Published live' : state === 'INACTIVE' ? '✓ Moved to inactive' : '✓ Saved as draft');
    setTimeout(() => { onSaved(); onClose(); }, 700);
  };

  const stateLabel = product?.product_state === 'ACTIVE' ? 'Live'
    : product?.product_state === 'DRAFT' ? 'Draft' : 'Inactive';
  const stateColor = product?.product_state === 'ACTIVE' ? 'var(--gold)' : 'var(--text-mob-muted)';

  return (
    <>
      <div className={`overlay${open ? ' open' : ''}`} onClick={onClose} />
      <div ref={elementRef} className={`res-drawer${open ? ' open' : ''}`} {...touchHandlers}>
        <div className="res-handle" />
        <div className="res-body">

          {/* Topbar */}
          <div className="res-topbar">
            <span style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 'clamp(0.75rem,3.2vw,0.875rem)', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-mob-muted)', flex: 1 }}>
              {product?.title || 'Product'}
            </span>
            <span style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: stateColor, border: `0.5px solid ${stateColor}`, padding: '2px 8px', borderRadius: 4, marginRight: 10 }}>
              {stateLabel}
            </span>
            <button className="res-close" onClick={onClose}>✕</button>
          </div>

          <div className="res-scroll">

            {/* ── Photo ── */}
            <SectionLabel>Photo</SectionLabel>

            {photoMode === 'view' ? (
              <div style={{ marginBottom: 14 }}>
                {preview ? (
                  <img src={preview} alt="" style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', borderRadius: 10, border: '0.5px solid var(--bdr2-mob)', display: 'block', marginBottom: 10 }} onError={() => setPreview('')} />
                ) : (
                  <div style={{ width: '100%', aspectRatio: '1/1', background: 'var(--bg-mob-card)', border: '0.5px dashed var(--bdr2-mob)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', opacity: 0.15, marginBottom: 10 }}>◈</div>
                )}
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => setPhotoMode('upload')} className="wiz-btn-pill wiz-btn-pill-outline" style={{ flex: 1, fontSize: 11 }}>
                    {preview ? 'Replace Photo' : 'Upload Photo'}
                  </button>
                  <button onClick={() => setPhotoMode('url')} className="wiz-btn-pill wiz-btn-pill-outline" style={{ flex: 1, fontSize: 11 }}>
                    Use URL
                  </button>
                </div>
              </div>
            ) : photoMode === 'url' ? (
              <div style={{ marginBottom: 14 }}>
                <Field label="Photo URL" value={photoUrl} onChange={v => { setPhotoUrl(v); setPreview(v); }} placeholder="https://..." />
                <button onClick={() => setPhotoMode('view')} className="wiz-btn-pill wiz-btn-pill-outline" style={{ fontSize: 11 }}>← Back</button>
              </div>
            ) : (
              <div style={{ marginBottom: 14 }}>
                {uploading ? (
                  <div style={{ width: '100%', aspectRatio: '1/1', background: 'var(--bg-mob-card)', border: '0.5px solid var(--bdr2-mob)', borderRadius: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 10 }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', border: '3px solid var(--bdr2-mob)', borderTopColor: 'var(--gold)', animation: 'spin 0.8s linear infinite' }} />
                    <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 11, color: 'var(--text-mob-muted)', letterSpacing: '0.1em' }}>Uploading {uploadName}...</div>
                  </div>
                ) : (
                  <div onClick={() => fileRef.current?.click()} style={{ width: '100%', aspectRatio: '1/1', background: 'var(--bg-mob-card)', border: '0.5px dashed var(--bdr2-mob)', borderRadius: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 10, cursor: 'pointer' }}>
                    <div style={{ fontSize: '2.5rem', opacity: 0.2 }}>◈</div>
                    <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 11, color: 'var(--text-mob-muted)', letterSpacing: '0.1em' }}>Tap to upload photo</div>
                  </div>
                )}
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => fileRef.current?.click()} disabled={uploading} className="wiz-btn-pill wiz-btn-pill-gold" style={{ flex: 1, fontSize: 11 }}>
                    {uploading ? 'Uploading...' : 'Choose File'}
                  </button>
                  <button onClick={() => setPhotoMode('view')} className="wiz-btn-pill wiz-btn-pill-outline" style={{ fontSize: 11 }}>Cancel</button>
                </div>
                <input ref={fileRef} type="file" accept=".jpg,.jpeg,.png,.tiff,.tif,.dng,.heic,.webp" style={{ display: 'none' }} onChange={handleFileChange} />
              </div>
            )}

            {/* ── Basic Info ── */}
            <SectionLabel>Basic Info</SectionLabel>
            <Field label="Title *" value={title} onChange={setTitle} placeholder="e.g. Burmese Pigeon Blood Ruby" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <Field label="Gem Type"  value={gemType}   onChange={setGemType}   placeholder="e.g. Sapphire" />
              <Field label="Color"     value={color}     onChange={setColor}     placeholder="e.g. Cornflower" />
              <Field label="Shape"     value={shape}     onChange={setShape}     placeholder="e.g. Oval" />
              <Field label="Weight (ct)" value={weight}  onChange={setWeight}    placeholder="e.g. 4.20" inputMode="decimal" />
              <Field label="Origin"    value={origin}    onChange={setOrigin}    placeholder="e.g. Burma" />
              <Field label="Treatment" value={treatment} onChange={setTreatment} placeholder="e.g. Heated" />
            </div>

            {/* ── GIA ── */}
            <SectionLabel>GIA Report</SectionLabel>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <Field label="Report Number" value={giaNumber}  onChange={setGiaNumber}  placeholder="2211234567" />
              <Field label="PDF / Photo URL" value={giaPdfUrl} onChange={setGiaPdfUrl} placeholder="https://..." />
            </div>

            {/* ── Pricing ── */}
            <SectionLabel>Pricing</SectionLabel>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <Field label="Price Per Carat ($)" value={pricePerCarat} onChange={setPricePerCarat} placeholder="12000" inputMode="decimal" />
              <Field label="Total Price ($)"      value={totalPrice}   onChange={setTotalPrice}    placeholder="41040" inputMode="decimal" />
            </div>

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

            {/* Meta */}
            <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 9, color: 'var(--text-mob-muted)', opacity: 0.5, marginBottom: 20, letterSpacing: '0.1em' }}>
              ID: {product?.product_id} · Added {product?.created_at ? fmtDate(product.created_at) : '—'}
            </div>

            {/* Error */}
            {error && (
              <div style={{ fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(0.75rem,3.2vw,0.875rem)', color: '#f87171', marginBottom: 12, textAlign: 'center' }}>{error}</div>
            )}
            {flash && (
              <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 12, color: 'var(--gold)', marginBottom: 12, textAlign: 'center', letterSpacing: '0.1em' }}>{flash}</div>
            )}

            {/* ── Actions ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 32 }}>
              {product?.product_state !== 'ACTIVE' && (
                <button className="wiz-btn-pill wiz-btn-pill-gold" onClick={() => handleSave('ACTIVE')} disabled={saving || uploading}>
                  {saving ? 'Publishing...' : 'Publish Live'}
                </button>
              )}
              <button className="wiz-btn-pill wiz-btn-pill-outline" onClick={() => handleSave(product?.product_state === 'ACTIVE' ? 'ACTIVE' : 'DRAFT')} disabled={saving || uploading}>
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
              {product?.product_state === 'ACTIVE' && (
                <button className="wiz-btn-pill wiz-btn-pill-outline" onClick={() => handleSave('DRAFT')} disabled={saving} style={{ color: 'var(--text-mob-muted)' }}>
                  Unpublish to Draft
                </button>
              )}
              {product?.product_state !== 'INACTIVE' && (
                <button className="wiz-btn-pill wiz-btn-pill-outline" onClick={() => handleSave('INACTIVE')} disabled={saving} style={{ color: '#f87171', borderColor: 'rgba(248,113,113,0.3)' }}>
                  Move to Inactive
                </button>
              )}
              {product?.product_state === 'INACTIVE' && (
                <button className="wiz-btn-pill wiz-btn-pill-outline" onClick={() => handleSave('DRAFT')} disabled={saving}>
                  Restore to Draft
                </button>
              )}
            </div>

          </div>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </>
  );
}
