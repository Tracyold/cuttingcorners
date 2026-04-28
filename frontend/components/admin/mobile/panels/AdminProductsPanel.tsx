// frontend/components/admin/panels/AdminProductsPanel.tsx
//
// Products panel — consumes useAdminProducts hook.
// ProductForm and GIASection are preserved exactly from products.tsx
// and re-exported here so the overlay renders above the panel.

import { useState, useEffect, useRef } from 'react';
import { useSwipeDownToClose } from '../../../account/shared/hooks/useSwipeDownToClose';
import { useAdminProducts, upsertProduct, PRODUCT_TAB_LABELS, PRODUCT_TABS } from '../../hooks/useAdminProducts';
import { formatMoney, fmtDate, fmtTime } from '../../../../lib/utils';

// ── GIASection (preserved from products.tsx) ──────────────────────────────────
function GIASection({ value, onChange }: { value: string; onChange: (f: string, v: string) => void }) {
  const [mode, setMode] = useState('url');
  const fileRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState('');
  const handleFile = async (e: any) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFileName(f.name);
    onChange('gia_report_pdf_url', `[uploaded] ${f.name}`);
  };
  return (
    <div className="gia-blk">
      <div className="gia-l">GIA Report</div>
      <div className="gia-mr">
        {[['url', 'PDF URL'], ['upload', 'Upload'], ['photo', 'Photo URL']].map(([m, l]) => (
          <button key={m} type="button" className={`gmb ${mode === m ? 'on' : ''}`} onClick={() => setMode(m)}>{l}</button>
        ))}
      </div>
      {mode === 'upload' ? (
        <div className="uz" onClick={() => fileRef.current?.click()}>
          <input ref={fileRef} type="file" accept=".pdf" onChange={handleFile} />
          <div className="ui">↑</div><p>Click to upload GIA PDF</p>
          {fileName && <div className="ufn">{fileName}</div>}
        </div>
      ) : (
        <input type="text"
          placeholder={mode === 'url' ? 'https://www.gia.edu/report-check/...' : 'https://... photo URL'}
          value={value} onChange={e => onChange('gia_report_pdf_url', e.target.value)}
          style={{ background: 'var(--k1)', border: '.5px solid var(--ln)', color: 'var(--tx)', padding: '8px 10px', fontFamily: 'var(--sans)', fontSize: '14px', width: '100%', outline: 'none' }}
        />
      )}
    </div>
  );
}

// ── ProductForm (preserved from products.tsx) ─────────────────────────────────
function ProductForm({ queue, currentIndex, onCurrentChange, onClose, onAddToQueue, onPublishAll, onSaveDrafts, onSwitchIndex, saving }: any) {
  const current = queue[currentIndex];
  const [flash, setFlash] = useState(false);
  const timerRef = useRef<any>(null);
  const upd = (f: string, v: string) => onCurrentChange({ ...current, [f]: v });

  useEffect(() => {
    timerRef.current = setInterval(async () => {
      const { error } = await upsertProduct(current, 'DRAFT');
      if (!error) { setFlash(true); setTimeout(() => setFlash(false), 2000); }
    }, 15000);
    return () => clearInterval(timerRef.current);
  }, [current]);

  return (
    <div className="ov">
      <div className="qp">
        <div className="qh">Queue ({queue.length}/10)</div>
        <div className="ql">
          {queue.map((item: any, i: number) => (
            <div key={item.product_id} className={`qi ${i === currentIndex ? 'cur' : ''}`} onClick={() => onSwitchIndex(i)}>
              <div className="qi-t">{item.title || '(New Product)'}</div>
              <div className="qi-id">{item.product_id}</div>
              <div className="qi-s">{item._saved ? 'Draft saved' : 'Unsaved'}</div>
            </div>
          ))}
        </div>
        <button className="qadd" onClick={onAddToQueue} disabled={queue.length >= 10}>+ Add Another</button>
      </div>
      <div className="fp">
        <div className="fh">
          <div className="fh-title">{current.title || 'New Product'}<span style={{ fontSize: 14, color: 'var(--d1)', fontWeight: 300, marginLeft: 10 }}>{currentIndex + 1} / {queue.length}</span></div>
          <div className="fhr"><span className={`sf ${flash ? 'on' : ''}`}>✓ Saved</span><button className="xb" onClick={onClose}>×</button></div>
        </div>
        <div className="fb">
          <div className="fr fr3">
            <div className="fg"><label>Product ID</label><input readOnly value={current.product_id} /></div>
            <div className="fg"><label>Date</label><input readOnly value={fmtDate(current.created_at)} /></div>
            <div className="fg"><label>Time</label><input readOnly value={fmtTime(current.created_at)} /></div>
          </div>
          <div className="fr fr1"><div className="fg"><label>Title</label><input placeholder="e.g. Burmese Pigeon Blood Ruby" value={current.title} onChange={e => upd('title', e.target.value)} /></div></div>
          <div className="fr fr3">
            <div className="fg"><input placeholder="GemType" value={current.gem_type} onChange={e => upd('gem_type', e.target.value)} /></div>
            <div className="fg"><input placeholder="Color" value={current.color} onChange={e => upd('color', e.target.value)} /></div>
            <div className="fg"><input placeholder="Shape" value={current.shape} onChange={e => upd('shape', e.target.value)} /></div>
          </div>
          <div className="fr fr3">
            <div className="fg"><input placeholder="weight" value={current.weight || ''} onChange={e => upd('weight', e.target.value)} /></div>
            <div className="fg"><input placeholder="origin" value={current.origin} onChange={e => upd('origin', e.target.value)} /></div>
            <div className="fg"><input placeholder="treatment" value={current.treatment} onChange={e => upd('treatment', e.target.value)} /></div>
          </div>
          <div className="fr fr2">
            <div className="fg"><label>GIA Report Number</label><input placeholder="2211234567" value={current.gia_report_number} onChange={e => upd('gia_report_number', e.target.value)} /></div>
            <div className="fg"><label>Photo URL</label><input placeholder="https://..." value={current.photo_url} onChange={e => upd('photo_url', e.target.value)} /></div>
          </div>
          <GIASection value={current.gia_report_pdf_url} onChange={upd} />
          <div className="fr fr2">
            <div className="fg"><label>Price Per Carat ($)</label><input placeholder="12000" value={current.price_per_carat || ''} onChange={e => upd('price_per_carat', e.target.value)} /></div>
            <div className="fg"><label>Total Price ($)</label><input placeholder="41040" value={current.total_price || ''} onChange={e => upd('total_price', e.target.value)} /></div>
          </div>
          <div className="fr fr1"><div className="fg"><label>Description</label><textarea placeholder="Additional notes..." value={current.description} onChange={e => upd('description', e.target.value)} /></div></div>
        </div>
        <div className="ff">
          <div className="ff-note">{queue.length > 1 ? `${queue.length} products in queue` : 'Up to 10 products per session'}</div>
          <div className="ffa">
            <button className="bg" onClick={onSaveDrafts} disabled={saving}>{saving ? 'Saving...' : 'Save Drafts'}</button>
            {currentIndex < queue.length - 1 && <button className="bn" onClick={() => onSwitchIndex(currentIndex + 1)}>Next →</button>}
            <button className="bp" onClick={onPublishAll} disabled={saving}>{saving ? 'Saving...' : queue.length > 1 ? `Publish All (${queue.length})` : 'Publish'}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Panel ─────────────────────────────────────────────────────────────────────
interface Props {
  open:    boolean;
  onClose: () => void;
}

export default function AdminProductsPanel({ open, onClose }: Props) {
  const p = useAdminProducts();
  const { elementRef, touchHandlers } = useSwipeDownToClose({ onClose });

  return (
    <>
      <div ref={elementRef} className={`slide-panel${open ? ' open' : ''}`}>

        {/* Header */}
        <div className="panel-header" {...touchHandlers}>
          <span className="panel-title">Products</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {p.error && <span style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 10, color: '#f87171' }}>{p.error}</span>}
            <button
              onClick={p.openAdd}
              disabled={p.loading}
              className="wiz-btn-pill wiz-btn-pill-gold"
              style={{ padding: '8px 16px', fontSize: 11 }}
            >
              + Add
            </button>
            <button className="panel-close" onClick={onClose}>✕</button>
          </div>
        </div>

        {/* Tab row */}
        <div className="sr-tab-bar">
          {PRODUCT_TABS.map(t => (
            <button
              key={t}
              className={`sr-tab${p.tab === t ? ' active' : ''}`}
              onClick={() => p.setTab(t)}
            >
              {PRODUCT_TAB_LABELS[t]} · {p.filtered[t].length}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="sr-list">
          {p.loading ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 0' }}>
              <span style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 11, color: 'var(--text-mob-muted)', letterSpacing: '0.18em', textTransform: 'uppercase' }}>Loading...</span>
            </div>
          ) : p.filtered[p.tab].length === 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 0', opacity: 0.5 }}>
              <div style={{ fontSize: '1.75rem', marginBottom: 10 }}>◈</div>
              <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-mob-muted)' }}>
                No {PRODUCT_TAB_LABELS[p.tab].toLowerCase()} products
              </div>
            </div>
          ) : (
            p.filtered[p.tab].map((prod: any) => (
              <div
                key={prod.product_id}
                onClick={() => p.openEdit(prod)}
                style={{
                  padding: 'clamp(12px,3.5vw,16px) clamp(1rem,4.5vw,1.25rem)',
                  borderBottom: '0.5px solid var(--bdr2-mob)',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12,
                }}
              >
                {/* Thumb */}
                {prod.photo_url ? (
                  <img src={prod.photo_url} alt="" style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 6, flexShrink: 0, border: '0.5px solid var(--bdr2-mob)' }} onError={(e: any) => (e.target.style.display = 'none')} />
                ) : (
                  <div style={{ width: 48, height: 48, background: 'var(--bg-mob-card)', borderRadius: 6, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', opacity: 0.2, border: '0.5px solid var(--bdr2-mob)' }}>◈</div>
                )}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(0.875rem,3.8vw,1rem)', fontWeight: 600, color: 'var(--text-mob)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {prod.title || '(New Product)'}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 11, color: 'var(--text-mob-muted)', marginTop: 2 }}>
                    {[prod.gem_type, prod.color, prod.origin].filter(Boolean).join(' · ') || '—'}
                  </div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 'clamp(0.875rem,3.5vw,1rem)', color: 'var(--gold)' }}>
                    {formatMoney(prod.total_price)}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 10, color: 'var(--text-mob-muted)', marginTop: 2 }}>
                    {prod.weight ? `${prod.weight} ct` : '—'}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Product form overlay — renders above everything */}
      {p.showForm && (
        <ProductForm
          queue={p.queue}
          currentIndex={p.curIdx}
          onCurrentChange={p.updateCurrent}
          onClose={p.closeForm}
          onAddToQueue={p.addToQueue}
          onPublishAll={p.publishAll}
          onSaveDrafts={p.saveDrafts}
          onSwitchIndex={p.setCurIdx}
          saving={p.saving}
        />
      )}
    </>
  );
}
