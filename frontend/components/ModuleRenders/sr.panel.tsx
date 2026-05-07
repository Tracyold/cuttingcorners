// frontend/components/ModuleRenders/ServiceRequests.Panel.tsx
//
// Wires the service requests engine to the skins.
// This is the ONLY file the rest of the app imports.
// No business logic. No Supabase calls. No type declarations.
//
// Renders two things:
//   1. The list panel (active/archive tabs, swipeable cards, + New button)
//   2. The form panel (slide-up sheet for submitting a new SR)
//
// Admin usage: pass actor="ADMIN" — unarchive/recover and mark-read are active.
// Account usage: pass actor="ACCOUNT" (default) — archive only.

import { useState, useRef, useEffect, useCallback } from 'react';

import { useSwipeDownToClose } from '../account/shared/hooks/useSwipeDownToClose';
import { useSwipeToClose }     from '../account/shared/hooks/useSwipeToClose';
import FirstTimeTips            from '../account/mobile/ui/FirstTimeTips';

import { useAccountServiceRequests, useAdminServiceRequests } from '../../modules/ServiceRequests/sr.engine';
import {
  uploadSRPhoto,
  getSRPhotoPublicUrl,
  deleteSRPhoto,
  buildSRStoragePath,
} from '../../modules/ServiceRequests/sr.engine';
import type { Session }            from '../../modules/ServiceRequests/sr.supabase';
import type { ServiceRequestRow }  from '../../modules/ServiceRequests/sr.types';
import type { SubmitSRPayload }    from '../../modules/ServiceRequests/sr.props';
import {
  SERVICE_TYPES,
  SR_MAX_PHOTOS,
  SR_MAX_PHOTO_BYTES,
  SR_ACCEPTED_EXTENSIONS,
  SR_ACCEPTED_MIME_HINT,
  SR_MAX_CUSTOM_FIELDS,
  SR_FORM_TOOLTIPS,
} from '../../modules/ServiceRequests/sr.types';
import type { SRPhotoItem, SRCustomField } from '../../modules/ServiceRequests/sr.types';
import {
  filterActive,
  filterArchived,
  countUnread,
  resolveSRPhotos,
  buildSpecRows,
  buildContactRows,
  validateSRPhoto,
  contactIsComplete,
  missingContactFields,
  generateUid,
} from '../../modules/ServiceRequests/sr.helpers';

import { CloseButton } from '../../skins/close.button';
import { ErrorBanner }  from '../../skins/error.banner';

import { fmtDate, fmtTime } from '../../lib/utils';

// ─────────────────────────────────────────────────────────────────────────────
// PANEL PROPS
// ─────────────────────────────────────────────────────────────────────────────

interface ServiceRequestsPanelProps {
  session:       Session | null;
  accountUserId: string;
  actor?:        'ADMIN' | 'ACCOUNT';
  open:          boolean;
  onClose:       () => void;
  onSelectSR?:   (sr: ServiceRequestRow) => void;
  // Admin nav callbacks
  onBack?:       () => void;
  onDashboard?:  () => void;
  // Profile data for contact prefill
  profileName?:    string | null;
  profileEmail?:   string | null;
  profilePhone?:   string | null;
  profileAddress?: string | null;
}

// ─────────────────────────────────────────────────────────────────────────────
// SWIPEABLE ACTIVE SR CARD
// ─────────────────────────────────────────────────────────────────────────────

function SwipeableSR({
  sr,
  onSelect,
  onArchive,
  showUnread,
}: {
  sr:         ServiceRequestRow;
  onSelect:   (sr: ServiceRequestRow) => void;
  onArchive:  (id: string) => void;
  showUnread: boolean;
}) {
  const [startX,    setStartX]    = useState(0);
  const [offsetX,   setOffsetX]   = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const threshold = -80;

  return (
    <div className="sr-card-wrap">
      <button
        className="sr-archive-btn"
        onClick={e => { e.stopPropagation(); onArchive(sr.service_request_id); }}
      >
        Archive
      </button>
      <div
        onTouchStart={e => { setStartX(e.touches[0].clientX - offsetX); setIsSwiping(true); }}
        onTouchMove={e => {
          if (!isSwiping) return;
          const diff = e.touches[0].clientX - startX;
          if (diff <= 0) setOffsetX(Math.max(diff, threshold - 20));
        }}
        onTouchEnd={() => {
          setIsSwiping(false);
          setOffsetX(offsetX < threshold / 2 ? threshold : 0);
        }}
        className="sr-card"
        onClick={() => onSelect(sr)}
        style={{
          position: 'relative', zIndex: 2,
          transform: `translateX(${offsetX}px)`,
          transition: isSwiping ? 'none' : 'transform 300ms cubic-bezier(0.2, 0.8, 0.2, 1)',
          minHeight: 140, display: 'flex', flexDirection: 'column', justifyContent: 'center',
        }}
      >
        <div className="sr-card-top">
          <div className="sr-card-stone">{sr.service_type || 'Service Request'}</div>
          <span className="sr-card-status">{showUnread && !sr.is_read ? 'New' : 'Pending'}</span>
        </div>
        <div className="sr-card-rec">{sr.description}</div>
        <div className="sr-card-date">
          {sr.created_at ? `${fmtDate(sr.created_at)} · ${fmtTime(sr.created_at)}` : '--'}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ARCHIVED SR CARD
// ─────────────────────────────────────────────────────────────────────────────

function ArchivedSRCard({
  sr,
  onTap,
}: {
  sr:    ServiceRequestRow;
  onTap: (sr: ServiceRequestRow) => void;
}) {
  return (
    <div className="sr-card-wrap" onClick={() => onTap(sr)} style={{ cursor: 'pointer' }}>
      <div className="sr-card archived" style={{ minHeight: 140, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="sr-card-top">
          <div className="sr-card-stone">{sr.service_type || 'Service Request'}</div>
          <span className="sr-card-status">Archived</span>
        </div>
        <div className="sr-card-rec">{sr.description}</div>
        <div className="sr-card-date">
          {sr.created_at ? `${fmtDate(sr.created_at)} · ${fmtTime(sr.created_at)}` : '--'}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SR FORM (slide-up sheet)
// ─────────────────────────────────────────────────────────────────────────────

function ServiceRequestForm({
  open,
  existingConsent,
  srType,      setSrType,
  srDesc,      setSrDesc,
  onClose,
  onSubmit,
  submitting,
  submitError,
  clearError,
  profileName,
  profileEmail,
  profilePhone,
  profileAddress,
  session,
}: {
  open:            boolean;
  existingConsent: { consented: boolean; consentedAt: string | null };
  srType:          string;
  setSrType:       (v: string) => void;
  srDesc:          string;
  setSrDesc:       (v: string) => void;
  onClose:         () => void;
  onSubmit:        (payload: SubmitSRPayload) => Promise<void>;
  submitting:      boolean;
  submitError:     string | null;
  clearError:      () => void;
  profileName?:    string | null;
  profileEmail?:   string | null;
  profilePhone?:   string | null;
  profileAddress?: string | null;
  session:         Session | null;
}) {
  const { elementRef, touchHandlers } = useSwipeDownToClose({ onClose });

  // ── Contact ──
  const [contactName,    setContactName]    = useState('');
  const [contactEmail,   setContactEmail]   = useState('');
  const [contactPhone,   setContactPhone]   = useState('');
  const [contactAddress, setContactAddress] = useState('');

  // ── Stone details ──
  const [gemType,  setGemType]  = useState('');
  const [gemColor, setGemColor] = useState('');
  const [shape,    setShape]    = useState('');
  const [weightCt, setWeightCt] = useState('');
  const [dimL,     setDimL]     = useState('');
  const [dimW,     setDimW]     = useState('');
  const [dimD,     setDimD]     = useState('');
  const [quantity, setQuantity] = useState('1');

  // ── Custom fields ──
  const [customFields, setCustomFields] = useState<SRCustomField[]>([]);

  // ── Photos ──
  const [photos,      setPhotos]      = useState<SRPhotoItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── SMS consent ──
  const [consentChecked, setConsentChecked] = useState(false);

  // ── UI ──
  const [activeTip, setActiveTip] = useState<string | null>(null);
  const errorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (submitError && errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [submitError]);

  // Reset all transient state when sheet closes.
  useEffect(() => {
    if (!open) {
      setContactName(''); setContactEmail(''); setContactPhone(''); setContactAddress('');
      setGemType(''); setGemColor(''); setShape(''); setWeightCt('');
      setDimL(''); setDimW(''); setDimD(''); setQuantity('1');
      setCustomFields([]);
      photos.forEach(p => { try { URL.revokeObjectURL(p.objectUrl); } catch {} });
      setPhotos([]);
      setConsentChecked(false);
      setActiveTip(null);
      clearError();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // ── Contact resolution ──
  const pName    = (profileName    ?? '').trim();
  const pEmail   = (profileEmail   ?? '').trim();
  const pPhone   = (profilePhone   ?? '').trim();
  const pAddress = (profileAddress ?? '').trim();
  const finalName    = pName    || contactName.trim();
  const finalEmail   = pEmail   || contactEmail.trim();
  const finalPhone   = pPhone   || contactPhone.trim();
  const finalAddress = pAddress || contactAddress.trim();

  // ── Custom field helpers ──
  const addCustomField = () => {
    if (customFields.length >= SR_MAX_CUSTOM_FIELDS) return;
    setCustomFields(prev => [...prev, { id: generateUid(), label: `Custom field ${prev.length + 1}`, value: '', editingLabel: true }]);
  };
  const updateCustomField = (id: string, patch: Partial<SRCustomField>) => {
    setCustomFields(prev => prev.map(cf => cf.id === id ? { ...cf, ...patch } : cf));
  };
  const removeCustomField = (id: string) => {
    setCustomFields(prev => prev.filter(cf => cf.id !== id));
  };

  // ── Photo upload ──
  const handleFilesPicked = async (files: FileList | null) => {
    if (!files || !session?.user?.id) return;
    const remaining = SR_MAX_PHOTOS - photos.length;
    if (remaining <= 0) return;
    const toProcess = Array.from(files).slice(0, remaining);

    for (const file of toProcess) {
      const validation = validateSRPhoto(file);
      if (!validation.valid) { console.warn('Photo rejected:', validation.reason); continue; }

      const tempId      = generateUid();
      const objectUrl   = URL.createObjectURL(file);
      const ext         = (file.name.split('.').pop() ?? '').toLowerCase();
      const storagePath = buildSRStoragePath(session.user.id, tempId, ext);

      setPhotos(prev => [...prev, {
        tempId, fileName: file.name, objectUrl,
        storagePath, publicUrl: null,
        uploading: true, uploaded: false,
        showSuccessPill: false, error: null,
      }]);

      (async () => {
        try {
          await uploadSRPhoto(storagePath, file);
          const publicUrl = getSRPhotoPublicUrl(storagePath);
          setPhotos(prev => prev.map(p => p.tempId === tempId
            ? { ...p, uploading: false, uploaded: true, publicUrl, showSuccessPill: true, error: null }
            : p
          ));
          setTimeout(() => {
            setPhotos(prev => prev.map(p => p.tempId === tempId ? { ...p, showSuccessPill: false } : p));
          }, 2000);
        } catch (err: unknown) {
          const msg = err instanceof Error ? err.message : 'Upload failed.';
          setPhotos(prev => prev.map(p => p.tempId === tempId
            ? { ...p, uploading: false, error: msg }
            : p
          ));
        }
      })();
    }

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removePhoto = async (tempId: string) => {
    const target = photos.find(p => p.tempId === tempId);
    if (!target) return;
    try { URL.revokeObjectURL(target.objectUrl); } catch {}
    setPhotos(prev => prev.filter(p => p.tempId !== tempId));
    if (target.uploaded && target.storagePath) {
      await deleteSRPhoto(target.storagePath);
    }
  };

  const anyPhotoUploading = photos.some(p => p.uploading);

  // ── Validation + submit ──
  const handleSubmit = async () => {
    clearError();
    if (submitting) return;
    if (anyPhotoUploading) {
      // error surfaced via submitError from engine — but engine doesn't know about photos.
      // We set a local note via onSubmit which will pass through.
    }
    const complete = contactIsComplete(finalName, finalEmail, finalPhone, finalAddress);
    const missing  = !complete ? missingContactFields(finalName, finalEmail, finalPhone, finalAddress) : [];
    const consentOk = existingConsent.consented || consentChecked;

    // Build payload — engine handles all validation gating and errors.
    await onSubmit({
      srType, srDesc,
      gemType, gemColor, shape,
      weightCt, dimL, dimW, dimD, quantity,
      photos,
      customFields,
      contactName: finalName,
      contactEmail: finalEmail,
      contactPhone: finalPhone,
      contactAddress: finalAddress,
      consentChecked,
      existingConsent,
    });
  };

  // ── Info tip toggles ──
  const InfoBtn = ({ id }: { id: string }) => (
    <button
      className={`nr-info-btn${activeTip === id ? ' active' : ''}`}
      onClick={() => setActiveTip(prev => prev === id ? null : id)}
      type="button"
    >i</button>
  );
  const Tip = ({ id }: { id: string }) => (
    <div className={`nr-tooltip${activeTip === id ? ' show' : ''}`}>
      {SR_FORM_TOOLTIPS[id as keyof typeof SR_FORM_TOOLTIPS]}
    </div>
  );

  // ── Contact row helpers ──
  const ReadContact = ({ label, value }: { label: string; value: string }) => (
    <div className="srf-contact-row">
      <span className="srf-contact-label">{label}</span>
      <span className="srf-contact-value">{value}</span>
    </div>
  );
  const EditContact = ({ label, value, onChange, type = 'text', placeholder }: {
    label: string; value: string; onChange: (v: string) => void; type?: string; placeholder: string;
  }) => (
    <div className="srf-contact-row required">
      <span className="srf-contact-label">{label} <span className="srf-required-tag">REQUIRED</span></span>
      <input className="nr-input" type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
    </div>
  );

  return (
    <>
      <div className={`nr-overlay${open ? ' open' : ''}`} onClick={onClose} />
      <div ref={elementRef} className={`nr-sheet${open ? ' open' : ''}`}>
        <FirstTimeTips type="panel-down" show={open} />
        <div className="nr-handle" {...touchHandlers} />
        <div className="nr-head" {...touchHandlers}>
          <span className="nr-title">New Service Request</span>
          <CloseButton onClick={onClose} />
        </div>

        <div className="nr-body">

          {/* ── CONTACT ── */}
          <div className="srf-section">
            <div className="srf-section-title">Contact Info</div>
            <div className="srf-contact-block">
              {pName    ? <ReadContact label="Name"     value={pName}    /> : <EditContact label="Name"     value={contactName}    onChange={setContactName}    placeholder="Your full name"       />}
              {pEmail   ? <ReadContact label="Email"    value={pEmail}   /> : <EditContact label="Email"    value={contactEmail}   onChange={setContactEmail}   placeholder="you@example.com"      type="email" />}
              {pPhone   ? <ReadContact label="Phone"    value={pPhone}   /> : <EditContact label="Phone"    value={contactPhone}   onChange={setContactPhone}   placeholder="(555) 555-5555"       type="tel"   />}
              {pAddress ? <ReadContact label="Shipping" value={pAddress} /> : <EditContact label="Shipping" value={contactAddress} onChange={setContactAddress} placeholder="Street, City, State, ZIP" />}
            </div>
          </div>

          {/* ── STONE DETAILS ── */}
          <div className="srf-section">
            <div className="srf-section-title">Stone Details</div>

            {/* Row 1: Gem Type | Gem Color */}
            <div className="srf-pair">
              <div className="srf-pair-cell">
                <div className="nr-field-head"><span className="nr-label">Gem Type</span></div>
                <input className="nr-input" value={gemType} onChange={e => setGemType(e.target.value)} placeholder="e.g. Sapphire, Tourmaline..." />
              </div>
              <div className="srf-pair-cell">
                <div className="nr-field-head"><span className="nr-label">Gem Color</span></div>
                <input className="nr-input" value={gemColor} onChange={e => setGemColor(e.target.value)} placeholder="e.g. Cornflower blue..." />
              </div>
            </div>

            {/* Row 2: Weight | Shape */}
            <div className="srf-pair">
              <div className="srf-pair-cell">
                <div className="nr-field-head"><span className="nr-label">Weight</span></div>
                <div className="srf-weight-row">
                  <input className="nr-input srf-weight-input" inputMode="decimal" value={weightCt} onChange={e => setWeightCt(e.target.value.replace(/[^0-9.]/g, ''))} placeholder="4.20" />
                  <span className="srf-unit-suffix">ct</span>
                </div>
              </div>
              <div className="srf-pair-cell">
                <div className="nr-field-head"><span className="nr-label">Shape</span></div>
                <input className="nr-input" value={shape} onChange={e => setShape(e.target.value)} placeholder="e.g. Oval, Round, Cushion..." />
              </div>
            </div>

            {/* Row 3: Qty | L × W × D */}
            <div className="srf-pair srf-pair-tight">
              <div className="srf-pair-cell srf-pair-qty">
                <div className="nr-field-head"><span className="nr-label">Qty</span></div>
                <input className="nr-input sq" inputMode="numeric" value={quantity} onChange={e => setQuantity(e.target.value.replace(/[^0-9]/g, ''))} placeholder="1" />
              </div>
              <div className="srf-pair-cell srf-pair-size">
                <div className="nr-field-head"><span className="nr-label">Size (L × W × D)</span><InfoBtn id="dims" /></div>
                <Tip id="dims" />
                <div className="srf-size-row">
                  <div className="srf-size-box"><input className="nr-input sq" inputMode="decimal" value={dimL} onChange={e => setDimL(e.target.value.replace(/[^0-9.]/g, ''))} placeholder="L" /><span className="srf-unit-suffix">mm</span></div>
                  <span className="srf-size-sep" aria-hidden>×</span>
                  <div className="srf-size-box"><input className="nr-input sq" inputMode="decimal" value={dimW} onChange={e => setDimW(e.target.value.replace(/[^0-9.]/g, ''))} placeholder="W" /><span className="srf-unit-suffix">mm</span></div>
                  <span className="srf-size-sep" aria-hidden>×</span>
                  <div className="srf-size-box"><input className="nr-input sq" inputMode="decimal" value={dimD} onChange={e => setDimD(e.target.value.replace(/[^0-9.]/g, ''))} placeholder="D" /><span className="srf-unit-suffix">mm</span></div>
                </div>
              </div>
            </div>

            {/* Row 4: Service type (full width) */}
            <div className="nr-field">
              <div className="nr-field-head"><span className="nr-label">Service Type</span><InfoBtn id="service" /></div>
              <Tip id="service" />
              <div className="nr-select-wrap">
                <select className="nr-select" value={srType} onChange={e => setSrType(e.target.value)}>
                  <option value="">Select a service type (optional)...</option>
                  {SERVICE_TYPES.map(st => <option key={st} value={st}>{st}</option>)}
                </select>
                <span className="nr-select-arrow">▾</span>
              </div>
            </div>
          </div>

          {/* ── CUSTOM FIELDS ── */}
          <div className="srf-section">
            <div className="srf-section-title">Custom Fields</div>
            {customFields.map(cf => (
              <div key={cf.id} className="srf-custom-row">
                {cf.editingLabel ? (
                  <input
                    className="srf-custom-label-input"
                    value={cf.label}
                    autoFocus
                    onChange={e => updateCustomField(cf.id, { label: e.target.value })}
                    onBlur={() => updateCustomField(cf.id, { editingLabel: false, label: cf.label.trim() || 'Custom field' })}
                    onKeyDown={e => { if (e.key === 'Enter') (e.target as HTMLInputElement).blur(); }}
                  />
                ) : (
                  <button className="srf-custom-label-btn" onClick={() => updateCustomField(cf.id, { editingLabel: true })} type="button" title="Click to edit label">{cf.label}</button>
                )}
                <input className="nr-input" value={cf.value} onChange={e => updateCustomField(cf.id, { value: e.target.value })} placeholder="Value" />
                <button className="srf-custom-remove" onClick={() => removeCustomField(cf.id)} type="button" aria-label="Remove custom field">✕</button>
              </div>
            ))}
            {customFields.length < SR_MAX_CUSTOM_FIELDS && (
              <button className="srf-custom-add" onClick={addCustomField} type="button">+ Add custom field</button>
            )}
          </div>

          {/* ── DESCRIPTION ── */}
          <div className="srf-section">
            <div className="nr-field">
              <div className="nr-field-head">
                <span className="nr-label">Description <span className="srf-required-tag">REQUIRED</span></span>
                <InfoBtn id="desc" />
              </div>
              <Tip id="desc" />
              <textarea
                className="nr-input req"
                placeholder="Tell us about the stone and what you need..."
                value={srDesc}
                onChange={e => setSrDesc(e.target.value)}
                style={{ minHeight: 100, fontFamily: 'var(--font-ui-mob)', resize: 'vertical' }}
              />
            </div>
          </div>

          {/* ── PHOTOS ── */}
          <div className="srf-section">
            <div className="nr-field-head"><span className="nr-label">Photos</span><InfoBtn id="photos" /></div>
            <Tip id="photos" />
            {photos.length < SR_MAX_PHOTOS && (
              <div className="nr-photo-area" onClick={() => fileInputRef.current?.click()}>
                <div className="nr-photo-area-icon">📷</div>
                <div className="nr-photo-area-label">
                  Tap to add photos<br />
                  <span style={{ fontSize: 'clamp(10px,2.6vw,11px)', opacity: 0.6 }}>PNG · JPG · HEIC · WEBP · max 25MB · up to 3</span>
                </div>
              </div>
            )}
            <input type="file" ref={fileInputRef} accept={SR_ACCEPTED_MIME_HINT} multiple style={{ display: 'none' }} onChange={e => handleFilesPicked(e.target.files)} />
            {photos.length > 0 && (
              <div className="srf-photo-grid">
                {photos.map(p => (
                  <div key={p.tempId} className={`srf-photo-thumb${p.error ? ' srf-photo-error' : ''}`} style={{ backgroundImage: `url(${p.objectUrl})` }}>
                    {p.uploading       && <div className="srf-photo-uploading">Uploading…</div>}
                    {p.showSuccessPill && <div className="srf-photo-success">Uploaded</div>}
                    {p.error           && <div className="srf-photo-uploading">Failed</div>}
                    <button className="srf-photo-remove" onClick={() => removePhoto(p.tempId)} type="button" aria-label="Remove photo">✕</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── SMS CONSENT ── */}
          <div className="srf-section">
            <div className="srf-section-title">Work Order SMS</div>
            {existingConsent.consented ? (
              <div className="srf-consent-done">
                ✓ You already consented to work-order SMS{existingConsent.consentedAt ? ` on ${new Date(existingConsent.consentedAt).toLocaleDateString()}` : ''}.
              </div>
            ) : (
              <div className="srf-consent-block">
                <label className="srf-consent-check">
                  <input type="checkbox" checked={consentChecked} onChange={e => setConsentChecked(e.target.checked)} />
                  <span>
                    I understand this service request may trigger a manual work order, and that I am requesting a service from Cutting Corners Gems.
                    I understand that if a work order is created, I must opt in to text-message notifications on my cell phone for updates about the work order.
                  </span>
                </label>
                <p className="srf-consent-note">
                  If you have never had a work order in your account before, you will always be contacted before Cutting Corners opens a work order.
                  Don't be worried about the checkbox — we need it to send you text-message notifications by law.
                </p>
              </div>
            )}
          </div>

          {/* ── SUBMIT ERROR ── */}
          {submitError && (
            <div ref={errorRef}>
              <ErrorBanner error={submitError}>
                <CloseButton onClick={clearError} />
              </ErrorBanner>
            </div>
          )}

        </div>{/* end nr-body */}

        <div className="nr-footer">
          <button className="nr-submit-btn" onClick={handleSubmit} type="button">
            {submitting ? 'Submitting...' : anyPhotoUploading ? 'Uploading photos...' : 'Submit Service Request →'}
          </button>
          <div className="nr-req-note">
            Fields marked <span style={{ color: 'var(--gold)' }}>REQUIRED</span> must be filled before submitting.
          </div>
        </div>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ACCOUNT SR DETAIL DRAWER
// ─────────────────────────────────────────────────────────────────────────────

export function ServiceRequestDrawer({
  open,
  sr,
  onClose,
}: {
  open:    boolean;
  sr:      ServiceRequestRow | null;
  onClose: () => void;
}) {
  const { elementRef, touchHandlers } = useSwipeToClose({ onClose });

  if (!sr) return null;

  const specs   = buildSpecRows(sr);
  const contact = buildContactRows(sr);
  const photos  = resolveSRPhotos(sr);
  const consentedAt = sr.workorder_sms_consent_at
    ? new Date(sr.workorder_sms_consent_at).toLocaleDateString()
    : null;
  const submitted = sr.created_at ? `${fmtDate(sr.created_at)} · ${fmtTime(sr.created_at)}` : '--';
  const source    = sr.wizard_result_id ? 'Created from Wizard Result' : 'Created from Service Request Form';

  return (
    <>
      <div className={`overlay${open ? ' open' : ''}`} onClick={onClose} />
      <div ref={elementRef} className={`shop-item-drawer${open ? ' open' : ''}`} {...touchHandlers}>
        <FirstTimeTips type="drawer-slide" show={open} />
        <div className="shop-item-handle" />
        <div className="shop-item-body">
          <div className="shop-item-header">
            <span className="shop-item-header-title">{sr.service_request_id.slice(0, 8)}</span>
            <CloseButton onClick={onClose} />
          </div>
          <div className="shop-item-scroll">
            <div className="shop-item-content">

              {/* Status badge */}
              <div style={{ marginBottom: '1.25rem' }}>
                <span style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 'clamp(0.625rem,2.6vw,0.6875rem)', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 10px', border: '0.5px solid var(--gold)', color: 'var(--gold)', borderRadius: 999 }}>
                  {sr.is_archived ? 'Archived' : (sr.status || 'Pending')}
                </span>
              </div>

              {/* Contact */}
              {contact.length > 0 && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <div className="shop-item-desc-label" style={{ marginBottom: '0.625rem' }}>Contact</div>
                  <div style={{ background: 'var(--bg-mob-card)', border: '0.5px solid var(--bdr2-mob)', borderRadius: 12, padding: 'clamp(0.625rem,3vw,0.875rem) clamp(0.75rem,3.5vw,1rem)' }}>
                    {contact.map((c, i) => (
                      <div key={c.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, padding: '6px 0', borderBottom: i === contact.length - 1 ? 'none' : '0.5px dashed var(--bdr2-mob)' }}>
                        <span style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 'clamp(0.5625rem,2.4vw,0.625rem)', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-mob-muted)', opacity: 0.75, minWidth: 70, flexShrink: 0, paddingTop: 2 }}>{c.label}</span>
                        <span style={{ fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(0.8125rem,3.5vw,0.9375rem)', color: 'var(--text-mob)', wordBreak: 'break-word', textAlign: 'right', flex: 1 }}>{c.val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Specs */}
              {specs.length > 0 && (
                <div className="shop-item-specs" style={{ marginBottom: '1.5rem', borderTop: '0.5px solid var(--bdr2-mob)' }}>
                  {specs.map(s => (
                    <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '0.5px solid var(--bdr2-mob)' }}>
                      <span style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 'clamp(0.625rem,2.6vw,0.6875rem)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-mob-muted)' }}>{s.label}</span>
                      <span style={{ fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(0.8125rem,3.6vw,0.9375rem)', color: 'var(--text-mob)' }}>{s.val}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Wizard result reference */}
              {sr.wizard_result_id && (
                <div className="shop-item-desc" style={{ marginTop: '1.5rem' }}>
                  <div className="shop-item-desc-label">Wizard Result</div>
                  <p style={{ color: 'var(--tile-feasib)', fontFamily: 'var(--font-mono-mob)', fontSize: 'clamp(0.8125rem,3.5vw,0.9375rem)' }}>{sr.wizard_result_id.slice(0, 8)}</p>
                </div>
              )}

              {/* Description */}
              {sr.description && (
                <div className="shop-item-desc" style={{ marginTop: '1.5rem' }}>
                  <div className="shop-item-desc-label">Description</div>
                  <p>&ldquo;{sr.description}&rdquo;</p>
                </div>
              )}

              {/* Photos */}
              {photos.length > 0 && (
                <div style={{ marginTop: '1.5rem' }}>
                  <div className="shop-item-desc-label" style={{ marginBottom: '0.625rem' }}>Photos</div>
                  <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(photos.length, 3)}, 1fr)`, gap: 'clamp(0.5rem,2.5vw,0.75rem)' }}>
                    {photos.map((url, i) => (
                      <a key={i} href={url} target="_blank" rel="noopener noreferrer" style={{ aspectRatio: '1/1', borderRadius: 12, border: '0.5px solid var(--bdr2-mob)', backgroundImage: `url(${url})`, backgroundSize: 'cover', backgroundPosition: 'center', display: 'block' }} aria-label={`Photo ${i + 1}`} />
                    ))}
                  </div>
                </div>
              )}

              {/* SMS consent */}
              {sr.workorder_sms_consent && (
                <div style={{ marginTop: '1.5rem', padding: 'clamp(0.625rem,3vw,0.875rem) clamp(0.75rem,3.5vw,1rem)', background: 'var(--bg-mob-card)', border: '0.5px solid var(--bdr2-mob)', borderRadius: 10, fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(0.8125rem,3.4vw,0.875rem)', color: 'var(--text-mob-muted)', lineHeight: 1.55 }}>
                  ✓ Work-order SMS consent recorded{consentedAt ? ` on ${consentedAt}` : ''}.
                </div>
              )}

              {/* Footer */}
              <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 'clamp(0.5625rem,2.4vw,0.625rem)', color: 'var(--text-mob-muted)', opacity: 0.6, marginTop: '2rem', lineHeight: 1.8, borderTop: '0.5px solid var(--bdr2-mob)', paddingTop: '1rem' }}>
                Submitted {submitted}<br />{source}
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN ARCHIVED SR DRAWER (with Recover button)
// ─────────────────────────────────────────────────────────────────────────────

export function AdminArchivedSRDrawer({
  open,
  sr,
  onRecover,
  onClose,
}: {
  open:      boolean;
  sr:        ServiceRequestRow | null;
  onRecover: () => void;
  onClose:   () => void;
}) {
  const { elementRef, touchHandlers } = useSwipeToClose({ onClose });

  if (!sr) return null;

  return (
    <>
      <div className={`overlay${open ? ' open' : ''}`} onClick={onClose} />
      <div ref={elementRef} className={`wo-drawer${open ? ' open' : ''}`} {...touchHandlers}>
        <div className="wo-handle" />
        <div className="wo-body">
          <div className="wo-topbar">
            <span style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '3px 10px', borderRadius: 999, background: 'rgba(127,127,127,0.12)', color: 'var(--text-mob-muted)' }}>Archived</span>
            <span style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 'clamp(0.8125rem,3.5vw,0.9375rem)', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-mob-muted)', flex: 1, marginLeft: 10 }}>{sr.service_type || 'Service Request'}</span>
            <CloseButton onClick={onClose} />
          </div>

          <div className="wo-scroll">
            <div className="wo-content">

              {/* Recover banner */}
              <div style={{ background: 'rgba(45,212,191,0.06)', border: '0.5px solid rgba(45,212,191,0.25)', borderRadius: 8, padding: '12px 14px', marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#2dd4bf', marginBottom: 3 }}>Archived by user</div>
                  <div style={{ fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(13px,3.4vw,14px)', color: 'var(--text-mob-muted)', lineHeight: 1.5 }}>Recover this service request to restore it to their active list.</div>
                </div>
                <button onClick={onRecover} className="wiz-btn-pill wiz-btn-pill-outline" style={{ fontSize: 11, color: '#2dd4bf', borderColor: 'rgba(45,212,191,0.4)', flexShrink: 0, padding: '8px 14px' }}>
                  Recover
                </button>
              </div>

              {/* Service type + date */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontFamily: 'var(--font-display-mob)', fontSize: 'clamp(1rem,4.5vw,1.125rem)', color: 'var(--gold)', marginBottom: 6 }}>{sr.service_type || 'Service Request'}</div>
                <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 10, color: 'var(--text-mob-muted)', opacity: 0.7 }}>
                  {sr.created_at ? `${fmtDate(sr.created_at)} · ${fmtTime(sr.created_at)}` : '--'}
                </div>
              </div>

              <div style={{ height: 1, background: 'var(--bdr2-mob)', margin: '12px 0 16px' }} />

              {/* Description */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontFamily: 'var(--font-mono-mob)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-mob-muted)', marginBottom: 8 }}>Description</div>
                <p style={{ fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(0.9375rem,4vw,1.0625rem)', color: 'var(--text-mob)', lineHeight: 1.7 }}>{sr.description}</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN EXPORT — ServiceRequestsPanel
// ─────────────────────────────────────────────────────────────────────────────

export default function ServiceRequestsPanel({
  session,
  accountUserId,
  actor = 'ACCOUNT',
  open,
  onClose,
  onSelectSR,
  onBack,
  onDashboard,
  profileName,
  profileEmail,
  profilePhone,
  profileAddress,
}: ServiceRequestsPanelProps) {

  const engine = actor === 'ADMIN'
    ? useAdminServiceRequests(session, accountUserId)
    : useAccountServiceRequests(session, accountUserId);

  const { elementRef: panelRef, touchHandlers: panelHandlers } = useSwipeDownToClose({ onClose });

  const [selectedArchivedSR, setSelectedArchivedSR] = useState<ServiceRequestRow | null>(null);

  const activeList   = filterActive(engine.serviceRequests);
  const archivedList = filterArchived(engine.serviceRequests);
  const unread       = countUnread(engine.serviceRequests);

  const handleArchive = async (id: string) => {
    if (!confirm('Archive this service request? It will move to the Archive tab.')) return;
    try { await engine.archiveSR(id); } catch { alert('Could not archive this request. Please try again.'); }
  };

  const handleRecover = async () => {
    if (!selectedArchivedSR) return;
    await engine.unarchiveSR(selectedArchivedSR);
    setSelectedArchivedSR(null);
  };

  const handleSelectActive = async (sr: ServiceRequestRow) => {
    if (actor === 'ADMIN') await engine.markSRRead(sr);
    onSelectSR?.(sr);
  };

  return (
    <>
      {/* ── LIST PANEL ── */}
      <div ref={panelRef} className={`slide-panel${open ? ' open' : ''}`}>
        <FirstTimeTips type="panel-down" show={open} />

        <div className="panel-header" {...panelHandlers}>
          <span className="panel-title">
            Service Requests{actor === 'ADMIN' && unread > 0 ? ` · ${unread} new` : ''}
          </span>
          <CloseButton onClick={onClose} />
        </div>

        {/* Admin nav pills */}
        {actor === 'ADMIN' && (onBack || onDashboard) && (
          <div className="sr-tab-bar" style={{ borderBottom: '0.5px solid var(--bdr2-mob)' }}>
            {onBack      && <button className="sr-tab" onClick={onBack}>← Users</button>}
            {onDashboard && <button className="sr-tab" onClick={onDashboard} style={{ marginLeft: 'auto' }}>Account Info</button>}
          </div>
        )}

        {/* Active / Archive tabs */}
        <div className="sr-tab-bar">
          <button className={`sr-tab${engine.activeTab === 'active' ? ' active' : ''}`} onClick={() => engine.setActiveTab('active')}>
            Active{activeList.length > 0 ? ` · ${activeList.length}` : ''}
          </button>
          <button className={`sr-tab${engine.activeTab === 'archive' ? ' active' : ''}`} onClick={() => engine.setActiveTab('archive')}>
            Archive{archivedList.length > 0 ? ` · ${archivedList.length}` : ''}
          </button>
        </div>

        {/* "+ New Request" — account side, active tab only */}
        {actor === 'ACCOUNT' && engine.activeTab === 'active' && (
          <>
            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: 'clamp(0.75rem,3.5vw,1rem) clamp(1rem,4.5vw,1.25rem) 0' }}>
              <button
                onClick={() => engine.setShowSRForm(true)}
                style={{ background: 'var(--gold)', border: '0.5px solid var(--border-mob)', borderRadius: 999, color: 'var(--text)', fontFamily: 'var(--font-ui-mob)', fontSize: 'clamp(13px,3.5vw,15px)', letterSpacing: '0.08em', padding: 'clamp(0.6rem,2.5vw,0.875rem) clamp(1.5rem,6vw,2rem)', cursor: 'pointer', transition: 'all 150ms ease' }}
              >
                + New Request
              </button>
            </div>
            <div style={{ height: '0.5px', background: 'var(--bdr2-mob)', margin: 'clamp(0.75rem,3.5vw,1rem) 0 0' }} />
          </>
        )}

        {/* List */}
        <div className="sr-list">
          {engine.activeTab === 'active' ? (
            activeList.length === 0
              ? <div className="sr-empty">No active service requests.<br />Create one from your wizard results or tap + New.</div>
              : activeList.map(sr => (
                <SwipeableSR
                  key={sr.service_request_id}
                  sr={sr}
                  onSelect={handleSelectActive}
                  onArchive={handleArchive}
                  showUnread={actor === 'ADMIN'}
                />
              ))
          ) : (
            archivedList.length === 0
              ? <div className="sr-empty">Nothing archived yet.</div>
              : archivedList.map(sr => (
                <ArchivedSRCard
                  key={sr.service_request_id}
                  sr={sr}
                  onTap={actor === 'ADMIN' ? setSelectedArchivedSR : (onSelectSR ?? (() => {}))}
                />
              ))
          )}
        </div>
      </div>

      {/* ── FORM ── */}
      {actor === 'ACCOUNT' && (
        <ServiceRequestForm
          open={engine.showSRForm}
          existingConsent={engine.existingConsent}
          srType={engine.srType}   setSrType={v => engine.setSrType(v)}
          srDesc={engine.srDesc}   setSrDesc={v => engine.setSrDesc(v)}
          onClose={() => engine.setShowSRForm(false)}
          onSubmit={engine.submitServiceRequest}
          submitting={engine.srSubmitting}
          submitError={engine.srSubmitError}
          clearError={engine.clearSRSubmitError}
          profileName={profileName}
          profileEmail={profileEmail}
          profilePhone={profilePhone}
          profileAddress={profileAddress}
          session={session}
        />
      )}

      {/* ── ADMIN ARCHIVED DRAWER ── */}
      {actor === 'ADMIN' && (
        <AdminArchivedSRDrawer
          open={!!selectedArchivedSR}
          sr={selectedArchivedSR}
          onRecover={handleRecover}
          onClose={() => setSelectedArchivedSR(null)}
        />
      )}
    </>
  );
}