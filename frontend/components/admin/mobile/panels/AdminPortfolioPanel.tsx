// frontend/components/admin/panels/AdminPortfolioPanel.tsx
//
// Portfolio panel — consumes useAdminPortfolio hook.
// PhotoSection, SortBadge, PhotoForm preserved from portfolio.tsx.

import { useState, useEffect, useRef } from 'react';
import { supabase } from '../../../../lib/supabase';
import { useAdminPortfolio, PORTFOLIO_TAB_LABELS, PORTFOLIO_TABS } from '../../hooks/useAdminPortfolio';
import { fmtDate, fmtTime } from '../../../../lib/utils';

// ── PhotoSection (preserved) ──────────────────────────────────────────────────
function PhotoSection({ value, onChange }: { value: string; onChange: (f: string, v: string) => void }) {
  const [mode, setMode] = useState('upload');
  const fileRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState('');
  const handleFile = async (e: any) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFileName(f.name);
    const path = `${Date.now()}_${f.name}`;
    const { data, error } = await supabase.storage.from('portfolio-photos').upload(path, f, { contentType: f.type });
    if (!error && data) {
      const { data: urlData } = supabase.storage.from('portfolio-photos').getPublicUrl(data.path);
      onChange('photo_url', urlData.publicUrl);
    } else {
      onChange('photo_url', `[uploaded] ${f.name}`);
    }
  };
  return (
    <div className="photo-blk">
      <div className="photo-l">Photo</div>
      <div className="photo-mr">
        {[['upload', 'Upload'], ['url', 'URL']].map(([m, l]) => (
          <button key={m} type="button" className={`gmb ${mode === m ? 'on' : ''}`} onClick={() => setMode(m)}>{l}</button>
        ))}
      </div>
      {mode === 'upload' ? (
        <div className="uz" onClick={() => fileRef.current?.click()}>
          <input ref={fileRef} type="file" accept=".jpg,.jpeg,.png,.tiff,.tif,.dng,.heic" onChange={handleFile} />
          <div className="ui">↑</div><p>Click to upload photo</p>
          <p style={{ fontSize: 9, color: 'var(--d2)', marginTop: 4, letterSpacing: '.08em' }}>JPG · PNG · TIFF · DNG · HEIC · Max 25MB</p>
          {fileName && <div className="ufn">{fileName}</div>}
        </div>
      ) : (
        <input type="text" placeholder="https://... external image URL" value={value}
          onChange={e => onChange('photo_url', e.target.value)}
          style={{ background: 'var(--k1)', border: '1px solid var(--ln)', color: 'var(--tx)', padding: '8px 10px', fontFamily: 'var(--sans)', fontSize: '12px', width: '100%', outline: 'none' }}
        />
      )}
      {value && !value.startsWith('[uploaded]') ? (
        <img src={value} alt="" className="photo-preview" onError={(e: any) => (e.target.style.display = 'none')} />
      ) : (
        <div className="photo-preview-empty">◻</div>
      )}
    </div>
  );
}

// ── SortBadge (preserved) ─────────────────────────────────────────────────────
function SortBadge({ value, onCommit }: { value: number; onCommit: (n: number) => void }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(String(value));
  const inputRef = useRef<HTMLInputElement>(null);
  const startEdit = (e: any) => { e.stopPropagation(); setDraft(String(value)); setEditing(true); setTimeout(() => inputRef.current?.focus(), 0); };
  const commit = () => { const n = parseInt(draft, 10); if (!isNaN(n) && n > 0) onCommit(n); setEditing(false); };
  const handleKey = (e: any) => { if (e.key === 'Enter') commit(); if (e.key === 'Escape') setEditing(false); };
  if (editing) return <input ref={inputRef} className="sort-input" value={draft} onChange={e => setDraft(e.target.value)} onBlur={commit} onKeyDown={handleKey} onClick={e => e.stopPropagation()} />;
  return <div className="sort-badge" onClick={startEdit} title="Click to reposition">{value}</div>;
}

// ── PhotoForm (preserved) ─────────────────────────────────────────────────────
function PhotoForm({ queue, currentIndex, onCurrentChange, onClose, onAddToQueue, onPublishAll, onSaveDrafts, onSwitchIndex, onArchiveCurrent, isEdit }: any) {
  const current = queue[currentIndex];
  const [flash, setFlash] = useState(false);
  const timer = useRef<any>(null);
  const upd = (f: string, v: any) => onCurrentChange({ ...current, [f]: v });

  useEffect(() => {
    timer.current = setInterval(async () => {
      if (current.portfolio_photo_id && !current.portfolio_photo_id.startsWith('PPH-')) {
        await supabase.from('portfolio_photos').update({
          photo_url: current.photo_url || null,
          year: current.year || null,
          caption: current.caption || null,
          description: current.description || null,
          sort_order: current.sort_order ? parseInt(current.sort_order) : 0,
        }).eq('portfolio_photo_id', current.portfolio_photo_id);
      }
      setFlash(true); setTimeout(() => setFlash(false), 2000);
    }, 15000);
    return () => clearInterval(timer.current);
  }, [current]);

  return (
    <div className="ov">
      <div className="qp">
        <div className="qh">Queue ({queue.length}/10)</div>
        <div className="ql">
          {queue.map((item: any, i: number) => (
            <div key={item.portfolio_photo_id} className={`qi ${i === currentIndex ? 'cur' : ''}`} onClick={() => onSwitchIndex(i)}>
              {item.photo_url && !item.photo_url.startsWith('[uploaded]') ? (
                <img src={item.photo_url} alt="" className="qi-thumb" onError={(e: any) => (e.target.style.display = 'none')} />
              ) : <div className="qi-thumb-empty">◻</div>}
              <div className="qi-year">{item.year || '—'}</div>
              <div className="qi-t">{item.caption || '(New Photo)'}</div>
              <div className="qi-id">{item.portfolio_photo_id}</div>
              <div className="qi-s">{item._saved ? 'Draft saved' : 'Unsaved'}</div>
            </div>
          ))}
        </div>
        {!isEdit && <button className="qadd" onClick={onAddToQueue} disabled={queue.length >= 10}>+ Add Another</button>}
      </div>
      <div className="fp">
        <div className="fh">
          <div className="fh-title">
            {current.year ? <span style={{ fontFamily: 'var(--serif)', color: 'var(--gl)' }}>{current.year}</span> : 'New Photo'}
            {current.caption && <span style={{ fontSize: 13, color: 'var(--d1)', fontWeight: 300, marginLeft: 10 }}>{current.caption}</span>}
            <span style={{ fontSize: 12, color: 'var(--d2)', fontWeight: 300, marginLeft: 10 }}>{currentIndex + 1} / {queue.length}</span>
          </div>
          <div className="fhr"><span className={`sf ${flash ? 'on' : ''}`}>✓ Saved</span><button className="xb" onClick={onClose}>×</button></div>
        </div>
        <div className="fb">
          <div className="fr fr3">
            <div className="fg"><label>Photo ID</label><input readOnly value={current.portfolio_photo_id} /></div>
            <div className="fg"><label>Date</label><input readOnly value={fmtDate(current.created_at)} /></div>
            <div className="fg"><label>Time</label><input readOnly value={fmtTime(current.created_at)} /></div>
          </div>
          <PhotoSection value={current.photo_url} onChange={upd} />
          <div className="fr fr2">
            <div className="fg">
              <label>Year *</label>
              <input placeholder="e.g. 2024" maxLength={4} value={current.year} onChange={e => upd('year', e.target.value)} />
              <span style={{ fontSize: 9, color: 'var(--d2)', marginTop: 3, letterSpacing: '.06em', display: 'block' }}>Displayed in gold below each photo on the public portfolio</span>
            </div>
            <div className="fg"><label>Sort Order</label><input type="number" placeholder="Leave blank to append at end" value={current.sort_order} onChange={e => upd('sort_order', e.target.value)} /></div>
          </div>
          <div className="fr fr1"><div className="fg"><label>Caption</label><input placeholder="e.g. Kashmir Sapphire Collection" value={current.caption} onChange={e => upd('caption', e.target.value)} /></div></div>
          <div className="fr fr1"><div className="fg"><label>Description</label><textarea placeholder="Additional details about this piece or collection..." value={current.description} onChange={e => upd('description', e.target.value)} /></div></div>
        </div>
        <div className="ff">
          <div className="ff-note">{queue.length > 1 ? `${queue.length} photos in queue` : 'Up to 10 photos per session'}</div>
          <div className="ffa">
            {isEdit && <button className="bg arc" onClick={onArchiveCurrent}>Archive</button>}
            <button className="bg" onClick={onSaveDrafts}>{queue.length > 1 ? 'Save Drafts' : 'Save Draft'}</button>
            {currentIndex < queue.length - 1 && <button className="bn" onClick={() => onSwitchIndex(currentIndex + 1)}>Next →</button>}
            <button className="bp" onClick={onPublishAll}>{queue.length > 1 ? `Publish All (${queue.length})` : 'Publish'}</button>
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

export default function AdminPortfolioPanel({ open, onClose }: Props) {
  const p = useAdminPortfolio();

  return (
    <>
      <div className={`slide-panel${open ? ' open' : ''}`}>

        {/* Header */}
        <div className="panel-header">
          <span className="panel-title">Portfolio</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button
              className={`sr-tab${p.selectMode ? ' active' : ''}`}
              onClick={() => { p.setSelectMode(!p.selectMode); p.setSelected(new Set()); }}
              style={{ fontSize: 11 }}
            >
              {p.selectMode ? 'Cancel' : 'Select'}
            </button>
            <button
              onClick={p.openAdd}
              className="wiz-btn-pill wiz-btn-pill-gold"
              style={{ padding: '8px 16px', fontSize: 11 }}
            >
              + Add
            </button>
            <button className="panel-close" onClick={onClose}>✕</button>
          </div>
        </div>

        {/* Bulk action bar */}
        {p.selectMode && p.selected.size > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px clamp(1rem,4.5vw,1.25rem)', background: 'var(--bg-mob-card)', borderBottom: '0.5px solid var(--bdr2-mob)' }}>
            <span style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 11, color: 'var(--gold)', letterSpacing: '0.12em', marginRight: 6 }}>
              {p.selected.size} selected
            </span>
            <button onClick={p.bulkPublish}   className="wiz-btn-pill wiz-btn-pill-gold"    style={{ padding: '6px 14px', fontSize: 10 }}>Publish</button>
            <button onClick={p.bulkUnpublish} className="wiz-btn-pill wiz-btn-pill-outline" style={{ padding: '6px 14px', fontSize: 10 }}>Unpublish</button>
            <button onClick={p.bulkArchive}   className="wiz-btn-pill wiz-btn-pill-outline" style={{ padding: '6px 14px', fontSize: 10, color: '#f87171', borderColor: 'rgba(248,113,113,0.4)' }}>Archive</button>
          </div>
        )}

        {/* Tab row */}
        <div className="sr-tab-bar">
          {PORTFOLIO_TABS.map(t => (
            <button
              key={t}
              className={`sr-tab${p.tab === t ? ' active' : ''}`}
              onClick={() => p.setTab(t)}
            >
              {PORTFOLIO_TAB_LABELS[t]} · {p.filtered[t].length}
            </button>
          ))}
        </div>

        {/* Photo grid */}
        <div className="sr-list" style={{ padding: 'clamp(0.75rem,3.5vw,1rem)' }}>
          {p.loading ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 0' }}>
              <span style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 11, color: 'var(--text-mob-muted)', letterSpacing: '0.18em', textTransform: 'uppercase' }}>Loading...</span>
            </div>
          ) : p.currentTabPhotos.length === 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 0', opacity: 0.5 }}>
              <div style={{ fontSize: '1.75rem', marginBottom: 10 }}>◻</div>
              <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-mob-muted)' }}>
                No {PORTFOLIO_TAB_LABELS[p.tab].toLowerCase()} photos
              </div>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {p.currentTabPhotos.map(photo => (
                <div
                  key={photo.portfolio_photo_id}
                  onClick={() => p.openEdit(photo)}
                  style={{
                    position: 'relative', cursor: 'pointer',
                    background: 'var(--bg-mob-card)',
                    border: `0.5px solid ${p.selected.has(photo.portfolio_photo_id) ? 'var(--gold)' : 'var(--bdr2-mob)'}`,
                    borderRadius: 8, overflow: 'hidden',
                    boxShadow: p.selected.has(photo.portfolio_photo_id) ? '0 0 0 1px rgba(var(--gold-rgb),0.2)' : 'none',
                  }}
                >
                  {photo.photo_url && !photo.photo_url.startsWith('[uploaded]') ? (
                    <img src={photo.photo_url} alt={photo.caption || ''} style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block' }} onError={(e: any) => (e.target.style.display = 'none')} />
                  ) : (
                    <div style={{ width: '100%', aspectRatio: '1/1', background: 'var(--bg-mob)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', opacity: 0.1 }}>◻</div>
                  )}

                  {/* Select checkbox */}
                  {p.selectMode ? (
                    <input type="checkbox" style={{ position: 'absolute', top: 8, left: 8, width: 16, height: 16, accentColor: 'var(--gold)', cursor: 'pointer' }}
                      checked={p.selected.has(photo.portfolio_photo_id)}
                      onChange={e => p.toggleSelect(photo.portfolio_photo_id, e)}
                      onClick={e => e.stopPropagation()}
                    />
                  ) : p.tab !== 'archived' && (
                    <SortBadge value={photo.sort_order} onCommit={n => p.handleSortCommit(photo, n)} />
                  )}

                  {/* Published dot */}
                  <div style={{
                    position: 'absolute', top: 8, right: 8,
                    width: 7, height: 7, borderRadius: '50%',
                    background: photo.published ? 'var(--gold)' : 'var(--bdr2-mob)',
                    boxShadow: photo.published ? '0 0 6px rgba(var(--gold-rgb),0.5)' : 'none',
                  }} />

                  <div style={{ padding: '8px 10px', borderTop: '0.5px solid var(--bdr2-mob)' }}>
                    <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 'clamp(0.875rem,3.5vw,1rem)', color: photo.year ? 'var(--gold)' : 'var(--text-mob-muted)', fontStyle: photo.year ? 'normal' : 'italic' }}>
                      {photo.year || 'No year'}
                    </div>
                    {photo.caption && (
                      <div style={{ fontFamily: 'var(--font-ui-mob)', fontSize: 11, color: 'var(--text-mob-muted)', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {photo.caption}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Photo form overlay */}
      {p.showForm && (
        <PhotoForm
          queue={p.queue}
          currentIndex={p.curIdx}
          onCurrentChange={p.updateCurrent}
          onClose={p.closeForm}
          onAddToQueue={p.addToQueue}
          onPublishAll={p.publishAll}
          onSaveDrafts={p.saveDrafts}
          onSwitchIndex={p.setCurIdx}
          onArchiveCurrent={() => p.archiveOne(p.queue[p.curIdx].portfolio_photo_id)}
          isEdit={p.isEdit}
        />
      )}
    </>
  );
}
