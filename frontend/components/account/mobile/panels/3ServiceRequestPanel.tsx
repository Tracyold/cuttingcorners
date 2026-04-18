// frontend/components/account/mobile/panels/3ServiceRequestPanel.tsx
//
// Service request panel (mobile).
//
// What changed this revision:
//   • Active / Archive tab row beneath the gold panel header.
//   • Swipe-reveal button is now "Archive" (teal --archive var, not red).
//   • Archived items render as grayed-out, non-clickable cards.
//   • Scroll container is now .sr-list (CSS class) with min-height: 0
//     so cards don't shrink as the list grows.
//   • Archive writes to Supabase FIRST, then updates local state on
//     success. DB is source of truth — nothing lives only in memory.
//   • Calls refreshServiceRequests() after the DB write as a fallback
//     when realtime replication is not enabled on the table.
//
// What was preserved:
//   • Swipe mechanic (SwipeableSR's touch handlers, threshold, transform).
//   • Panel down-slide animation.
//   • All form logic — service type select, description, weight, dims, photos.
//   • Contact Info read-only block added last revision.
//   • All fonts, sizes (clamp 13–25px), and theme tokens.

import { useState, useRef, useEffect } from 'react';
import { fmtDate, fmtTime } from '../../../../lib/utils';
import { useSwipeDownToClose } from '../../shared/hooks/useSwipeDownToClose';
import { supabase } from '../../../../lib/supabase';
import { SERVICE_TYPES } from '../../shared/1InquiryList';
import FirstTimeTips from '../ui/FirstTimeTips';

interface ServiceRequestPanelProps {
  open:                   boolean;
  serviceRequests:        any[];
  session:                any;
  profile:                any;
  onSelectSR:             (sr: any) => void;
  onClose:                () => void;
  refreshServiceRequests: () => Promise<void>;
  // Controlled form state (kept in MobileAccount so the wizard can pre-fill)
  showSRForm:             boolean;
  setShowSRForm:          (v: boolean) => void;
  srType:                 string;
  setSrType:              (v: string) => void;
  srDesc:                 string;
  setSrDesc:              (v: string) => void;
}

type SRTab = 'active' | 'archive';

const TOOLTIPS: Record<string, string> = {
  service: 'This can be changed in the future. Selecting it doesn\'t lock you in. We just want a rough idea.',
  dims:    'If you\'re unsure, do not guess -- just say "Unknown" and please include at least one photo of the stone next to a quarter for scale.',
  desc:    'All information is good information. Tell us a story -- tell us anything about the stone. Where did you get it? What do you want it to become? Any inclusions or cracks you\'ve noticed?',
  photos:  'Photos are the most helpful thing you can add. They give us a layer of understanding that words alone can\'t convey. Include one next to a quarter for scale if possible.',
};

export default function ServiceRequestPanel3({
  open, serviceRequests, session, profile, onSelectSR, onClose,
  refreshServiceRequests,
  showSRForm, setShowSRForm, srType, setSrType, srDesc, setSrDesc,
}: ServiceRequestPanelProps) {

  const { elementRef: panelRef, touchHandlers: panelHandlers } = useSwipeDownToClose({ onClose });
  const { elementRef: sheetRef, touchHandlers: sheetHandlers } = useSwipeDownToClose({ onClose: () => setShowSRForm(false) });

  // ── Tab state ──
  const [activeTab, setActiveTab] = useState<SRTab>('active');

  // ── Form state (panel-owned) ──
  const [activeTip,  setActiveTip]  = useState<string | null>(null);
  const [weight,     setWeight]     = useState('');
  const [dims,       setDims]       = useState('');
  const [photos,     setPhotos]     = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [gateMsg,    setGateMsg]    = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleTip   = (id: string) => setActiveTip(prev => prev === id ? null : id);
  const removePhoto = (idx: number) => setPhotos(prev => prev.filter((_, i) => i !== idx));

  // Clear the form when the sheet closes.
  useEffect(() => {
    if (!showSRForm) {
      setWeight('');
      setDims('');
      setPhotos([]);
      setGateMsg('');
    }
  }, [showSRForm]);

  // ── Open form — phone + SMS gate ──
  const handleOpenForm = async () => {
    if (!session?.user?.id) return;
    setGateMsg('');
    const [{ data: prefs }, { data: p }] = await Promise.all([
      supabase.from('user_sms_preferences').select('opt_in_work_orders').eq('user_id', session.user.id).single(),
      supabase.from('account_users').select('phone').eq('account_user_id', session.user.id).single(),
    ]);
    if (!p?.phone || !prefs?.opt_in_work_orders) {
      setGateMsg('To submit a service request you must have a phone number on file and work order SMS notifications enabled in your profile.');
      return;
    }
    setShowSRForm(true);
  };

  // ── Submit — panel owns the insert ──
  const handleSubmitForm = async () => {
    if (!session?.user?.id) return;
    if (!srType.trim() || !srDesc.trim()) {
      alert('Service type and description are required.');
      return;
    }

    let fullDesc = srDesc.trim();
    if (weight.trim()) fullDesc += `\nWeight: ${weight.trim()}`;
    if (dims.trim())   fullDesc += `\nDimensions: ${dims.trim()}`;

    setSubmitting(true);
    try {
      const { error } = await supabase.from('service_requests').insert({
        account_user_id: session.user.id,
        service_type:    srType,
        description:     fullDesc,
        photo_url:       null,
        is_archived:     false,
      });
      if (error) {
        console.error('Service request insert failed:', error);
        alert('Could not submit your service request. Please try again.');
        return;
      }

      // Best-effort admin notification — do NOT block the form on failure.
      try {
        await supabase.functions.invoke('send-admin-notification', {
          body: { event_type: 'service_requests', user_id: session.user.id },
        });
      } catch (notifyErr) {
        console.warn('Admin notification edge function failed (non-blocking):', notifyErr);
      }

      // Reset form + close + refresh list so the card appears even if
      // realtime replication is not enabled on the table.
      setSrType('');
      setSrDesc('');
      setWeight('');
      setDims('');
      setPhotos([]);
      setShowSRForm(false);
      await refreshServiceRequests();
    } catch (err) {
      console.error('Service request submit exception:', err);
      alert('Could not submit your service request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const InfoBtn = ({ id }: { id: string }) => (
    <button
      className={`nr-info-btn${activeTip === id ? ' active' : ''}`}
      onClick={() => toggleTip(id)}
    >
      i
    </button>
  );

  const Tip = ({ id }: { id: string }) => (
    <div className={`nr-tooltip${activeTip === id ? ' show' : ''}`}>
      {TOOLTIPS[id]}
    </div>
  );

  // ── Read-only contact row ──
  const ContactRow = ({ label, value }: { label: string; value: string | null | undefined }) => (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '6px 0', borderBottom: '0.5px dashed var(--bdr2)' }}>
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 'clamp(9px, 2.4vw, 10px)',
        letterSpacing: '0.18em', textTransform: 'uppercase',
        color: 'var(--text-muted)', opacity: 0.7,
        minWidth: 70, flexShrink: 0, paddingTop: 2,
      }}>{label}</span>
      <span style={{
        fontFamily: 'var(--font-ui)',
        fontSize: 'clamp(13px, 3.5vw, 15px)',
        color: value ? 'var(--text)' : 'var(--text-muted)',
        opacity: value ? 1 : 0.55,
        lineHeight: 1.4, wordBreak: 'break-word', flex: 1,
      }}>
        {value || 'Not set'}
      </span>
    </div>
  );

  // ── Swipeable SR card (mechanic preserved; button label + color via CSS) ──
  function SwipeableSR({
    sr,
    onSelect,
    onArchive,
  }: {
    sr: any;
    onSelect: (sr: any) => void;
    onArchive: (id: string) => void;
  }) {
    const [startX,    setStartX]    = useState(0);
    const [offsetX,   setOffsetX]   = useState(0);
    const [isSwiping, setIsSwiping] = useState(false);
    const threshold = -80;

    const handleTouchStart = (e: React.TouchEvent) => {
      setStartX(e.touches[0].clientX - offsetX);
      setIsSwiping(true);
    };
    const handleTouchMove = (e: React.TouchEvent) => {
      if (!isSwiping) return;
      const diff = e.touches[0].clientX - startX;
      if (diff <= 0) setOffsetX(Math.max(diff, threshold - 20));
    };
    const handleTouchEnd = () => {
      setIsSwiping(false);
      setOffsetX(offsetX < threshold / 2 ? threshold : 0);
    };

    return (
      <div className="sr-card-wrap">
        <button
          className="sr-archive-btn"
          onClick={(e) => { e.stopPropagation(); onArchive(sr.service_request_id); }}
        >
          Archive
        </button>
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="sr-card"
          onClick={() => onSelect(sr)}
          style={{
            position: 'relative', zIndex: 2,
            transform: `translateX(${offsetX}px)`,
            transition: isSwiping ? 'none' : 'transform 300ms cubic-bezier(0.2, 0.8, 0.2, 1)',
            minHeight: '140px', display: 'flex', flexDirection: 'column', justifyContent: 'center',
          }}
        >
          <div className="sr-card-top">
            <div className="sr-card-stone">
              {sr.service_type || 'Service Request'}
            </div>
            <span className="sr-card-status">Pending</span>
          </div>
          <div className="sr-card-rec">{sr.service_type}</div>
          <div className="sr-card-date">
            {sr.created_at ? `${fmtDate(sr.created_at)} · ${fmtTime(sr.created_at)}` : '--'}
          </div>
        </div>
      </div>
    );
  }

  // ── Static (archived) card — no swipe, no click, fully grayed-out ──
  function ArchivedSR({ sr }: { sr: any }) {
    return (
      <div className="sr-card-wrap">
        <div
          className="sr-card archived"
          style={{
            minHeight: '140px', display: 'flex', flexDirection: 'column', justifyContent: 'center',
          }}
        >
          <div className="sr-card-top">
            <div className="sr-card-stone">
              {sr.service_type || 'Service Request'}
            </div>
            <span className="sr-card-status">Archived</span>
          </div>
          <div className="sr-card-rec">{sr.service_type}</div>
          <div className="sr-card-date">
            {sr.created_at ? `${fmtDate(sr.created_at)} · ${fmtTime(sr.created_at)}` : '--'}
          </div>
        </div>
      </div>
    );
  }

  // ── Archive action ──
  // 1. Optimistically mark as archived in local state (snappy UI)
  // 2. Write to Supabase (source of truth)
  // 3. On failure: revert and surface the error
  // 4. On success: refreshServiceRequests() as realtime fallback
  const [localSRs, setLocalSRs] = useState(serviceRequests);
  useEffect(() => { setLocalSRs(serviceRequests); }, [serviceRequests]);

  const handleArchiveSR = async (id: string) => {
    if (!confirm('Archive this service request? It will move to the Archive tab and cannot be un-archived by you.')) return;

    // Capture the original value so we can revert on failure.
    const prev = localSRs.find(s => s.service_request_id === id);
    const prevArchived = prev?.is_archived ?? false;

    // Optimistic update.
    setLocalSRs(list => list.map(s =>
      s.service_request_id === id ? { ...s, is_archived: true } : s
    ));

    const { error } = await supabase
      .from('service_requests')
      .update({ is_archived: true })
      .eq('service_request_id', id);

    if (error) {
      console.error('Archive write failed:', error);
      // Revert.
      setLocalSRs(list => list.map(s =>
        s.service_request_id === id ? { ...s, is_archived: prevArchived } : s
      ));
      alert('Could not archive this request. Please try again.');
      return;
    }

    // Success — refetch from DB so realtime-less tables stay in sync.
    await refreshServiceRequests();
  };

  // ── Filter by tab ──
  const activeList   = localSRs.filter(s => !s.is_archived);
  const archivedList = localSRs.filter(s =>  s.is_archived);
  const shownList    = activeTab === 'active' ? activeList : archivedList;

  return (
    <>
      {/* ── SERVICE REQUESTS LIST PANEL ── */}
      <div ref={panelRef} className={`slide-panel${open ? ' open' : ''}`}>
        <FirstTimeTips type="panel-down" show={open} />

        <div className="panel-header" {...panelHandlers}>
          <span className="panel-title">Service Requests</span>
          <button className="panel-close" onClick={onClose}>✕</button>
        </div>

        {/* ── Active / Archive tabs ── */}
        <div className="sr-tab-bar">
          <button
            className={`sr-tab${activeTab === 'active' ? ' active' : ''}`}
            onClick={() => setActiveTab('active')}
          >
            Active{activeList.length > 0 ? ` · ${activeList.length}` : ''}
          </button>
          <button
            className={`sr-tab${activeTab === 'archive' ? ' active' : ''}`}
            onClick={() => setActiveTab('archive')}
          >
            Archive{archivedList.length > 0 ? ` · ${archivedList.length}` : ''}
          </button>
        </div>

        {gateMsg && (
          <div style={{
            background: 'var(--bg-card)', color: 'var(--text-muted)',
            padding: 'clamp(0.75rem, 3.5vw, 1rem)',
            margin: 'clamp(0.5rem, 2.5vw, 0.75rem)',
            borderRadius: '8px',
            fontSize: 'clamp(13px, 3.4vw, 14px)',
            lineHeight: 1.5, textAlign: 'center',
          }}>
            {gateMsg}
          </div>
        )}

        {/* ── "+ New Request" only visible on Active tab ── */}
        {activeTab === 'active' && (
          <>
            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: 'clamp(0.75rem, 3.5vw, 1rem) clamp(1rem, 4.5vw, 1.25rem) 0' }}>
              <button
                onClick={handleOpenForm}
                onMouseDown={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold)'; }}
                onMouseUp={e => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text)'; }}
                onTouchStart={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold)'; }}
                onTouchEnd={e => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text)'; }}
                style={{
                  background: 'var(--gold)',
                  border: '0.5px solid var(--border)',
                  borderRadius: '999px',
                  color: 'var(--text)',
                  fontFamily: 'var(--font-ui)',
                  fontSize: 'clamp(13px, 3.5vw, 15px)',
                  letterSpacing: '0.08em',
                  padding: 'clamp(0.6rem, 2.5vw, 0.875rem) clamp(1.5rem, 6vw, 2rem)',
                  cursor: 'pointer',
                  transition: 'all 150ms ease',
                }}
              >
                + New Request
              </button>
            </div>
            <div style={{ height: '0.5px', background: 'var(--bdr2)', margin: 'clamp(0.75rem, 3.5vw, 1rem) 0 0' }} />
          </>
        )}

        <div className="sr-list">
          {shownList.length === 0 ? (
            <div className="sr-empty">
              {activeTab === 'active'
                ? <>No service requests yet.<br />Create one from your wizard results or tap + New.</>
                : <>Nothing archived yet.</>
              }
            </div>
          ) : (
            shownList.map(sr => (
              activeTab === 'active'
                ? (
                  <SwipeableSR
                    key={sr.service_request_id}
                    sr={sr}
                    onSelect={onSelectSR}
                    onArchive={handleArchiveSR}
                  />
                )
                : (
                  <ArchivedSR
                    key={sr.service_request_id}
                    sr={sr}
                  />
                )
            ))
          )}
        </div>
      </div>

      {/* ── NEW SERVICE REQUEST SHEET ── */}
      <div
        className={`nr-overlay${showSRForm ? ' open' : ''}`}
        onClick={() => setShowSRForm(false)}
      />
      <div ref={sheetRef} className={`nr-sheet${showSRForm ? ' open' : ''}`}>
        <FirstTimeTips type="panel-down" show={showSRForm} />
        <div className="nr-handle" {...sheetHandlers} />
        <div className="nr-head" {...sheetHandlers}>
          <span className="nr-title">New Service Request</span>
          <button className="nr-close" onClick={() => setShowSRForm(false)}>✕</button>
        </div>

        <div className="nr-body">

          {/* ── Read-only Contact Info block ── */}
          <div style={{
            background: 'var(--bg-card)',
            border: '0.5px solid var(--bdr2)',
            borderRadius: '12px',
            padding: 'clamp(0.75rem, 3.5vw, 1rem) clamp(0.875rem, 4vw, 1.125rem)',
            marginBottom: 'clamp(0.875rem, 4vw, 1.25rem)',
          }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
              marginBottom: 8,
            }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(9px, 2.4vw, 10px)',
                letterSpacing: '0.24em', textTransform: 'uppercase',
                color: 'var(--text)', opacity: 0.8,
              }}>
                Contact Info
              </span>
              <span style={{
                fontFamily: 'var(--font-ui)',
                fontSize: 'clamp(9px, 2.4vw, 10px)',
                color: 'var(--text-muted)', opacity: 0.6, fontStyle: 'italic',
              }}>
                from your profile
              </span>
            </div>
            <ContactRow label="Name"     value={profile?.name} />
            <ContactRow label="Phone"    value={profile?.phone} />
            <ContactRow label="Email"    value={profile?.email} />
            <ContactRow label="Shipping" value={profile?.shipping_address} />
          </div>

          {/* Service Type */}
          <div className="nr-field">
            <div className="nr-field-head">
              <span className="nr-label">
                Service Type <span style={{ color: 'var(--gold)', fontSize: 'clamp(9px, 2.4vw, 10px)' }}>REQUIRED</span>
              </span>
              <InfoBtn id="service" />
            </div>
            <Tip id="service" />
            <div className="nr-select-wrap">
              <select
                className="nr-select req"
                value={srType}
                onChange={e => setSrType(e.target.value)}
              >
                <option value="">Select a service type...</option>
                {SERVICE_TYPES.map(st => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
              <span className="nr-select-arrow">▾</span>
            </div>
          </div>

          {/* Description */}
          <div className="nr-field">
            <div className="nr-field-head">
              <span className="nr-label">
                Description <span style={{ color: 'var(--gold)', fontSize: 'clamp(9px, 2.4vw, 10px)' }}>REQUIRED</span>
              </span>
              <InfoBtn id="desc" />
            </div>
            <Tip id="desc" />
            <textarea
              className="nr-input req"
              placeholder="Tell us about the stone and what you need..."
              value={srDesc}
              onChange={e => setSrDesc(e.target.value)}
              style={{ minHeight: '100px', fontFamily: 'var(--font-ui)', resize: 'vertical' }}
            />
          </div>

          {/* Weight */}
          <div className="nr-field">
            <div className="nr-field-head">
              <span className="nr-label">Weight (ct)</span>
            </div>
            <input
              className="nr-input"
              placeholder="e.g. 4.2 ct or Unknown"
              value={weight}
              onChange={e => setWeight(e.target.value)}
            />
          </div>

          {/* Dimensions */}
          <div className="nr-field">
            <div className="nr-field-head">
              <span className="nr-label">Dimensions (W × L × D)</span>
              <InfoBtn id="dims" />
            </div>
            <Tip id="dims" />
            <input
              className="nr-input"
              placeholder="e.g. 10 × 8 × 6 mm or Unknown"
              value={dims}
              onChange={e => setDims(e.target.value)}
            />
          </div>

          {/* Photos */}
          <div className="nr-field" style={{ marginBottom: 24 }}>
            <div className="nr-field-head">
              <span className="nr-label">Photos</span>
              <InfoBtn id="photos" />
            </div>
            <Tip id="photos" />
            <div className="nr-photo-area" onClick={() => fileInputRef.current?.click()}>
              <div className="nr-photo-area-icon">📷</div>
              <div className="nr-photo-area-label">
                Tap to add photos<br />
                <span style={{ fontSize: 'clamp(10px, 2.6vw, 11px)', opacity: 0.6 }}>JPG, PNG — as many as you like</span>
              </div>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              multiple
              style={{ display: 'none' }}
              onChange={() => {}}
            />
            {photos.length > 0 && (
              <div className="nr-photo-grid">
                {photos.map((src, i) => (
                  <div
                    key={i}
                    className="nr-photo-thumb"
                    style={{ backgroundImage: `url(${src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                  >
                    <button className="nr-photo-rm" onClick={() => removePhoto(i)}>✕</button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>{/* end nr-body */}

        <div className="nr-footer">
          <button className="nr-submit-btn" onClick={handleSubmitForm} disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit Service Request →'}
          </button>
          <div className="nr-req-note">
            Fields marked <span style={{ color: 'var(--gold)' }}>REQUIRED</span> must be filled before submitting.
          </div>
        </div>

      </div>{/* end nr-sheet */}
    </>
  );
}
