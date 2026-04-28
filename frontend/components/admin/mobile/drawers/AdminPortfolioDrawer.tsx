// frontend/components/admin/mobile/drawers/AdminPortfolioDrawer.tsx
//
// Detail drawer for a portfolio photo.
// Tap "Edit Photo" → this closes, AdminPortfolioEditDrawer opens.

import { useState } from 'react';
import { useSwipeToClose } from '../../../account/shared/hooks/useSwipeToClose';
import AdminPortfolioEditDrawer from './AdminPortfolioEditDrawer';

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

interface Props {
  open:        boolean;
  photo:       Photo | null;
  onClose:     () => void;
  onPublish:   (photo: Photo) => void;
  onUnpublish: (photo: Photo) => void;
  onArchive:   (id: string) => void;
  onSaved:     () => void; // passed to edit drawer to refresh after save
}

export default function AdminPortfolioDrawer({
  open, photo, onClose, onPublish, onUnpublish, onArchive, onSaved,
}: Props) {
  const { elementRef, touchHandlers } = useSwipeToClose({ onClose });
  const [editOpen, setEditOpen] = useState(false);

  if (!photo) return null;

  const date = photo.created_at
    ? new Date(photo.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : '';

  return (
    <>
      <div className={`overlay${open ? ' open' : ''}`} onClick={onClose} />

      <div ref={elementRef} className={`res-drawer${open ? ' open' : ''}`} {...touchHandlers}>
        <div className="res-handle" />

        <div className="res-body">

          {/* Topbar */}
          <div className="res-topbar">
            <span style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 'clamp(0.75rem,3.2vw,0.875rem)', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-mob-muted)', flex: 1 }}>
              {photo.year || 'No Year'}{photo.caption ? ` · ${photo.caption}` : ''}
            </span>
            <span style={{
              fontFamily: 'var(--font-mono-mob)', fontSize: 9,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              color: photo.published ? 'var(--gold)' : 'var(--text-mob-muted)',
              border: `0.5px solid ${photo.published ? 'rgba(var(--gold-rgb),0.4)' : 'var(--bdr2-mob)'}`,
              padding: '3px 8px', borderRadius: 4, marginRight: 10,
            }}>
              {photo.published ? 'Live' : photo.archived ? 'Archived' : 'Draft'}
            </span>
            <button className="res-close" onClick={onClose}>✕</button>
          </div>

          <div className="res-scroll">

            {/* Photo preview */}
            {photo.photo_url && !photo.photo_url.startsWith('[uploaded]') ? (
              <img
                src={photo.photo_url}
                alt={photo.caption || ''}
                style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block', borderRadius: 8, marginBottom: 20, border: '0.5px solid var(--bdr2-mob)' }}
                onError={(e: any) => (e.target.style.display = 'none')}
              />
            ) : (
              <div style={{ width: '100%', aspectRatio: '1/1', background: 'var(--bg-mob-card)', border: '0.5px solid var(--bdr2-mob)', borderRadius: 8, marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', opacity: 0.15 }}>
                ◻
              </div>
            )}

            {/* Detail rows */}
            <div className="res-section">
              <div className="res-section-label" style={{ color: 'var(--text-mob-muted)' }}>Details</div>
              {[
                { label: 'Year',       val: photo.year        || '—' },
                { label: 'Caption',    val: photo.caption     || '—' },
                { label: 'Sort Order', val: String(photo.sort_order ?? '—') },
                { label: 'Added',      val: date              || '—' },
              ].map(row => (
                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '10px 0', borderBottom: '0.5px solid var(--bdr2-mob)', gap: 12 }}>
                  <span style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 'clamp(0.75rem,3.2vw,0.875rem)', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-mob-muted)', flexShrink: 0 }}>
                    {row.label}
                  </span>
                  <span style={{ fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(0.875rem,3.8vw,1rem)', color: 'var(--text-mob)', textAlign: 'right' }}>
                    {row.val}
                  </span>
                </div>
              ))}
            </div>

            {/* Description */}
            {photo.description && (
              <div className="res-section">
                <div className="res-section-label" style={{ color: 'var(--text-mob-muted)' }}>Description</div>
                <p style={{ fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(0.875rem,3.8vw,1rem)', color: 'var(--text-mob)', lineHeight: 1.6, margin: 0 }}>
                  {photo.description}
                </p>
              </div>
            )}

            {/* Action buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 8 }}>

              {/* Edit — closes this drawer, opens edit drawer */}
              <button
                className="wiz-btn-pill wiz-btn-pill-gold"
                onClick={() => setEditOpen(true)}
              >
                Edit Photo
              </button>

              {!photo.archived && (photo.published ? (
                <button className="wiz-btn-pill wiz-btn-pill-outline" onClick={() => { onUnpublish(photo); onClose(); }}>
                  Unpublish
                </button>
              ) : (
                <button className="wiz-btn-pill wiz-btn-pill-outline" onClick={() => { onPublish(photo); onClose(); }} style={{ color: 'var(--gold)', borderColor: 'rgba(var(--gold-rgb),0.4)' }}>
                  Publish
                </button>
              ))}

              {!photo.archived && (
                <button
                  className="wiz-btn-pill wiz-btn-pill-outline"
                  onClick={() => { if (confirm('Archive this photo? It will be hidden from the public portfolio.')) { onArchive(photo.portfolio_photo_id); onClose(); } }}
                  style={{ color: '#f87171', borderColor: 'rgba(248,113,113,0.3)' }}
                >
                  Archive
                </button>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Edit drawer — slides in over the detail drawer */}
      <AdminPortfolioEditDrawer
        open={editOpen}
        photo={photo}
        onClose={() => setEditOpen(false)}
        onSaved={() => {
          setEditOpen(false);
          onClose();
          onSaved();
        }}
      />
    </>
  );
}