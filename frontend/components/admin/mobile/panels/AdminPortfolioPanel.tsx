// frontend/components/admin/mobile/panels/AdminPortfolioPanel.tsx
//
// Portfolio panel — all logic via useAdminPortfolio hook.
// Tap card → AdminPortfolioDrawer (detail + actions)
// "+ Add" → AdminPortfolioAddDrawer
// All CSS classes from MobileShell.css / Admin.css

import { useState, useRef } from 'react';
import { useAdminPortfolio, PORTFOLIO_TAB_LABELS, PORTFOLIO_TABS } from '../../hooks/useAdminPortfolio';
import { useSwipeDownToClose } from '../../../account/shared/hooks/useSwipeDownToClose';
import AdminPortfolioDrawer from '../drawers/AdminPortfolioDrawer';
import AdminPortfolioAddDrawer from '../drawers/AdminPortfolioAddDrawer';

// ── SortBadge — inline sort order editor on each card ────────────────────────
function SortBadge({ value, onCommit }: { value: number; onCommit: (n: number) => void }) {
  const [editing, setEditing] = useState(false);
  const [draft,   setDraft]   = useState(String(value));
  const inputRef = useRef<HTMLInputElement>(null);

  const startEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDraft(String(value));
    setEditing(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  };
  const commit = () => {
    const n = parseInt(draft, 10);
    if (!isNaN(n) && n > 0) onCommit(n);
    setEditing(false);
  };
  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') commit();
    if (e.key === 'Escape') setEditing(false);
  };

  if (editing) {
    return (
      <input
        ref={inputRef}
        className="sort-input"
        value={draft}
        onChange={e => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={handleKey}
        onClick={e => e.stopPropagation()}
      />
    );
  }
  return (
    <div className="sort-badge" onClick={startEdit} title="Click to reposition">
      {value}
    </div>
  );
}

// ── Panel ─────────────────────────────────────────────────────────────────────
interface Props { open: boolean; onClose: () => void; }

export default function AdminPortfolioPanel({ open, onClose }: Props) {
  const p = useAdminPortfolio();
  const { elementRef, touchHandlers } = useSwipeDownToClose({ onClose });

  // Which photo is open in the detail drawer
  const [drawerPhoto,   setDrawerPhoto]   = useState<any>(null);
  // Whether the add drawer is open
  const [addDrawerOpen, setAddDrawerOpen] = useState(false);

  return (
    <>
      {/* ── Panel ── */}
      <div ref={elementRef} className={`slide-panel${open ? ' open' : ''}`}>

        {/* Header — title + close only */}
        <div className="panel-header" {...touchHandlers}>
          <span className="panel-title">Portfolio</span>
          <button className="panel-close" onClick={onClose}>✕</button>
        </div>

        {/* ── Action buttons row ── */}
        <div className="sr-tab-bar" style={{ borderBottom: '0.5px solid var(--bdr2-mob)' }}>
          <button
            className={`btn-sel${p.selectMode ? ' on' : ''}`}
            onClick={() => { p.setSelectMode(!p.selectMode); p.setSelected(new Set()); }}
          >
            {p.selectMode ? 'Cancel' : 'Select'}
          </button>
          <button
            className="btn-add"
            onClick={() => setAddDrawerOpen(true)}
            style={{ marginLeft: 'auto' }}
          >
            + Add
          </button>
        </div>

        {/* ── Bulk action bar (only when items selected) ── */}
        {p.selectMode && p.selected.size > 0 && (
          <div className="sr-tab-bar" style={{ borderBottom: '0.5px solid var(--bdr2-mob)' }}>
            <span style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 11, color: 'var(--gold)', letterSpacing: '0.12em', marginRight: 4 }}>
              {p.selected.size} selected
            </span>
            <button className="btn-add" style={{ fontSize: 10, padding: '6px 14px' }} onClick={p.bulkPublish}>Publish</button>
            <button className="btn-sel" style={{ fontSize: 10, padding: '6px 14px' }} onClick={p.bulkUnpublish}>Unpublish</button>
            <button className="btn-sel" style={{ fontSize: 10, padding: '6px 14px', color: '#f87171', borderColor: 'rgba(248,113,113,0.3)' }} onClick={p.bulkArchive}>Archive</button>
          </div>
        )}

        {/* ── Tab filter row ── */}
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

        {/* ── Photo grid ── */}
        <div className="sr-list" style={{ padding: 'clamp(0.75rem,3.5vw,1rem)' }}>
          {p.loading ? (

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 0' }}>
              <span style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 11, color: 'var(--text-mob-muted)', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                Loading...
              </span>
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
                  className="tile"
                  onClick={() => p.selectMode ? void 0 : setDrawerPhoto(photo)}
                  style={{
                    position: 'relative',
                    cursor: 'pointer',
                    border: `0.5px solid ${p.selected.has(photo.portfolio_photo_id) ? 'var(--gold)' : 'var(--bdr2-mob)'}`,
                    borderRadius: 10,
                    overflow: 'hidden',
                    padding: 0,
                    boxShadow: p.selected.has(photo.portfolio_photo_id) ? '0 0 0 1px rgba(var(--gold-rgb),0.2)' : 'none',
                  }}
                >
                  {/* Photo */}
                  {photo.photo_url && !photo.photo_url.startsWith('[uploaded]') ? (
                    <img
                      src={photo.photo_url}
                      alt={photo.caption || ''}
                      style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block' }}
                      onError={(e: any) => (e.target.style.display = 'none')}
                    />
                  ) : (
                    <div style={{ width: '100%', aspectRatio: '1/1', background: 'var(--bg-mob)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', opacity: 0.1 }}>
                      ◻
                    </div>
                  )}

                  {/* Select checkbox */}
                  {p.selectMode ? (
                    <input
                      type="checkbox"
                      style={{ position: 'absolute', top: 8, left: 8, width: 16, height: 16, accentColor: 'var(--gold)', cursor: 'pointer' }}
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

                  {/* Caption row */}
                  <div style={{ padding: '8px 10px', borderTop: '0.5px solid var(--bdr2-mob)' }}>
                    <div style={{
                      fontFamily: 'var(--font-mono-mob)',
                      fontSize: 'clamp(0.875rem,3.5vw,1rem)',
                      color: photo.year ? 'var(--gold)' : 'var(--text-mob-muted)',
                      fontStyle: photo.year ? 'normal' : 'italic',
                    }}>
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

      {/* ── Detail drawer ── */}
      <AdminPortfolioDrawer
        open={!!drawerPhoto}
        photo={drawerPhoto}
        onClose={() => setDrawerPhoto(null)}
        onPublish={p.publishOne}
        onUnpublish={p.unpublishOne}
        onArchive={id => { p.archiveOne(id); setDrawerPhoto(null); }}
        onSaved={p.loadPhotos}
      />

      {/* ── Add drawer ── */}
      <AdminPortfolioAddDrawer
        open={addDrawerOpen}
        onClose={() => setAddDrawerOpen(false)}
        onSaved={() => { setAddDrawerOpen(false); }}
        addSingle={p.addSingle}
      />
    </>
  );
}