// frontend/modules/ServiceRequests/sr.engine.ts
//
// All service request logic for both account and admin sides.
// Imports from sr.types.ts, sr.props.ts, sr.helpers.ts, and sr.supabase.ts only.
// No design. No CSS. No hardcoded strings. No direct Supabase calls.
//
// Auth is validated once at hook initialization via getAuthUserId.
// If session is invalid the hook throws before any state or Supabase
// call is attempted. The parent component is responsible for ensuring
// a valid session exists before mounting any component that uses this engine.
//
// Photo upload state and actions live here — not in the form render file.
// showSRForm, srType, srDesc are lifted here so the wizard results panel
// can prefill the form before opening it.

import { useState, useEffect, useRef, useCallback } from 'react';

import type {
  ServiceRequestRow,
  SRTab,
  SRActor,
  SRExistingConsent,
  SRPhotoItem,
} from './sr.types';
import { SR_MAX_PHOTOS } from './sr.types';
import type { ServiceRequestEngineOutput, SubmitSRPayload } from './sr.props';
import {
  generateUid,
  filterActive,
  filterArchived,
  validateSRPhoto,
  parseQuantity,
  parseDecimalOrNull,
  resolveContact,
  uploadedPhotoUrls,
  validCustomFields,
} from './sr.helpers';
import {
  Session,
  getAuthUserId,
  fetchServiceRequests,
  fetchExistingConsent,
  insertServiceRequest,
  insertCustomFields,
  archiveServiceRequest,
  unarchiveServiceRequest,
  markServiceRequestRead,
  upsertSmsConsent,
  uploadSRPhoto,
  getSRPhotoPublicUrl,
  deleteSRPhoto,
  buildSRStoragePath,
  notifyAdminSR,
} from './sr.supabase';

// ── Shared internal hook ──────────────────────────────────────────────────────

// Contains all logic shared between account and admin engines.
// Not exported — consumed only by useAccountServiceRequests and useAdminServiceRequests.
//
// Throws immediately if session is invalid. The parent component must
// guard against mounting this hook without a valid session.

function useServiceRequestsCore(
  session:       Session | null,
  accountUserId: string,
  actor:         SRActor,
): ServiceRequestEngineOutput {

  // ── Single auth check at initialization ──
  // If this throws, nothing below runs. No state, no Supabase calls.
  const authUserId = getAuthUserId(session);

  // ── List state ──
  const [serviceRequests,    setServiceRequests]    = useState<ServiceRequestRow[]>([]);
  const [activeTab,          setActiveTab]           = useState<SRTab>('active');

  // ── Consent state ──
  const [existingConsent,    setExistingConsent]     = useState<SRExistingConsent>({
    consented:   false,
    consentedAt: null,
  });

  // ── Form lifted state ──
  const [showSRForm,         setShowSRForm]          = useState(false);
  const [srType,             setSrType]              = useState('');
  const [srDesc,             setSrDesc]              = useState('');

  // ── Photo state ──
  const [photos,             setPhotos]              = useState<SRPhotoItem[]>([]);
  const photoFileRef = useRef<HTMLInputElement>(null);

  // ── Submit state ──
  const [srSubmitting,       setSrSubmitting]        = useState(false);
  const [srSubmitError,      setSrSubmitError]       = useState<string | null>(null);

  // ── Derived ──
  const anyPhotoUploading = photos.some(p => p.uploading);

  // ── Initial load ──────────────────────────────────────────────────────────

  useEffect(() => {
    let cancelled = false;
    fetchServiceRequests(accountUserId)
      .then(rows => { if (!cancelled) setServiceRequests(rows); })
      .catch(err => { if (!cancelled) console.error('SR fetch failed:', err); });
    return () => { cancelled = true; };
  }, [accountUserId]);

  // ── Consent fetch ─────────────────────────────────────────────────────────

  useEffect(() => {
    let cancelled = false;
    fetchExistingConsent(authUserId, accountUserId)
      .then(consent => { if (!cancelled) setExistingConsent(consent); })
      .catch(err => { console.warn('Consent fetch failed (non-blocking):', err); });
    return () => { cancelled = true; };
  }, [authUserId, accountUserId]);

  // ── Reset photo state when form closes ───────────────────────────────────

  useEffect(() => {
    if (!showSRForm) {
      setPhotos(prev => {
        prev.forEach(p => { try { URL.revokeObjectURL(p.objectUrl); } catch {} });
        return [];
      });
    }
  }, [showSRForm]);

  // ── Refresh ───────────────────────────────────────────────────────────────

  const refreshServiceRequests = useCallback(async (): Promise<void> => {
    try {
      const rows = await fetchServiceRequests(accountUserId);
      setServiceRequests(rows);
    } catch (err: unknown) {
      if (err instanceof Error) console.error('SR refresh failed:', err.message);
    }
  }, [accountUserId]);

  // ── Archive ───────────────────────────────────────────────────────────────

  const archiveSR = useCallback(async (id: string): Promise<void> => {
    const prev = serviceRequests.find(s => s.service_request_id === id);
    setServiceRequests(list =>
      list.map(s => s.service_request_id === id ? { ...s, is_archived: true } : s)
    );
    try {
      await archiveServiceRequest(id);
      await refreshServiceRequests();
    } catch (err: unknown) {
      setServiceRequests(list =>
        list.map(s =>
          s.service_request_id === id
            ? { ...s, is_archived: prev?.is_archived ?? false }
            : s
        )
      );
      if (err instanceof Error) console.error('Archive SR failed:', err.message);
      throw err;
    }
  }, [serviceRequests, refreshServiceRequests]);

  // ── Unarchive (admin only — no-op on account side) ────────────────────────

  const unarchiveSR = useCallback(async (sr: ServiceRequestRow): Promise<void> => {
    if (actor !== 'ADMIN') return;
    setServiceRequests(list =>
      list.map(s =>
        s.service_request_id === sr.service_request_id ? { ...s, is_archived: false } : s
      )
    );
    try {
      await unarchiveServiceRequest(sr.service_request_id);
    } catch (err: unknown) {
      setServiceRequests(list =>
        list.map(s =>
          s.service_request_id === sr.service_request_id ? { ...s, is_archived: true } : s
        )
      );
      if (err instanceof Error) console.error('Unarchive SR failed:', err.message);
      throw err;
    }
  }, [actor]);

  // ── Mark read (admin only — no-op on account side) ────────────────────────

  const markSRRead = useCallback(async (sr: ServiceRequestRow): Promise<void> => {
    if (actor !== 'ADMIN') return;
    setServiceRequests(list =>
      list.map(s =>
        s.service_request_id === sr.service_request_id ? { ...s, is_read: true } : s
      )
    );
    try {
      await markServiceRequestRead(sr.service_request_id);
    } catch (err: unknown) {
      if (err instanceof Error) console.error('Mark SR read failed:', err.message);
    }
  }, [actor]);

  // ── Photo upload ──────────────────────────────────────────────────────────

  const handlePhotoFiles = useCallback(async (files: FileList | null): Promise<void> => {
    if (!files) return;
    const remaining = SR_MAX_PHOTOS - photos.length;
    if (remaining <= 0) return;
    const toProcess = Array.from(files).slice(0, remaining);
    if (photoFileRef.current) photoFileRef.current.value = '';

    for (const file of toProcess) {
      const validation = validateSRPhoto(file);
      if (!validation.valid) {
        console.warn('Photo rejected:', validation.reason);
        continue;
      }

      const tempId      = generateUid();
      const objectUrl   = URL.createObjectURL(file);
      const ext         = (file.name.split('.').pop() ?? '').toLowerCase();
      const storagePath = buildSRStoragePath(authUserId, tempId, ext);

      setPhotos(prev => [...prev, {
        tempId,
        fileName:        file.name,
        objectUrl,
        storagePath,
        publicUrl:       null,
        uploading:       true,
        uploaded:        false,
        showSuccessPill: false,
        error:           null,
      }]);

      // Fire-and-forget per photo — each upload updates its own slot.
      (async () => {
        try {
          await uploadSRPhoto(storagePath, file);
          const publicUrl = getSRPhotoPublicUrl(storagePath);
          setPhotos(prev => prev.map(p => p.tempId === tempId
            ? { ...p, uploading: false, uploaded: true, publicUrl, showSuccessPill: true, error: null }
            : p
          ));
          setTimeout(() => {
            setPhotos(prev => prev.map(p =>
              p.tempId === tempId ? { ...p, showSuccessPill: false } : p
            ));
          }, 2000);
        } catch (err: unknown) {
          const msg = err instanceof Error ? err.message : 'Upload failed.';
          setPhotos(prev => prev.map(p =>
            p.tempId === tempId ? { ...p, uploading: false, error: msg } : p
          ));
        }
      })();
    }
  }, [photos, authUserId]);

  // ── Remove photo ──────────────────────────────────────────────────────────

  const removePhoto = useCallback(async (tempId: string): Promise<void> => {
    const target = photos.find(p => p.tempId === tempId);
    if (!target) return;
    try { URL.revokeObjectURL(target.objectUrl); } catch {}
    setPhotos(prev => prev.filter(p => p.tempId !== tempId));
    if (target.uploaded && target.storagePath) {
      await deleteSRPhoto(target.storagePath);
    }
  }, [photos]);

  // ── Submit ────────────────────────────────────────────────────────────────

  const submitServiceRequest = useCallback(async (payload: SubmitSRPayload): Promise<void> => {
    setSrSubmitError(null);

    if (!srDesc.trim()) {
      setSrSubmitError('Description is required.');
      return;
    }

    if (anyPhotoUploading) {
      setSrSubmitError('Please wait for photos to finish uploading.');
      return;
    }

    const {
      gemType, gemColor, shape,
      weightCt, dimL, dimW, dimD, quantity,
      customFields,
      contactName, contactEmail, contactPhone, contactAddress,
      consentChecked,
    } = payload;

    const now             = new Date().toISOString();
    const consentAtToStore = existingConsent.consented
      ? (existingConsent.consentedAt ?? now)
      : (consentChecked ? now : null);

    setSrSubmitting(true);
    try {
      const inserted = await insertServiceRequest({
        account_user_id:          accountUserId,
        service_type:             srType.trim()    || null,
        description:              srDesc.trim(),
        gem_type:                 gemType.trim()   || null,
        gem_color:                gemColor.trim()  || null,
        shape:                    shape.trim()     || null,
        weight_ct:                parseDecimalOrNull(weightCt),
        dim_length_mm:            parseDecimalOrNull(dimL),
        dim_width_mm:             parseDecimalOrNull(dimW),
        dim_depth_mm:             parseDecimalOrNull(dimD),
        quantity:                 parseQuantity(quantity),
        photo_urls:               uploadedPhotoUrls(photos),
        contact_name:             resolveContact(null, contactName),
        contact_email:            resolveContact(null, contactEmail),
        contact_phone:            resolveContact(null, contactPhone),
        contact_address:          resolveContact(null, contactAddress),
        workorder_sms_consent:    existingConsent.consented ? true : consentChecked,
        workorder_sms_consent_at: consentAtToStore,
        is_archived:              false,
      });

      // Custom fields — best-effort, non-blocking.
      const good = validCustomFields(customFields).map((cf, i) => ({
        service_request_id: inserted.service_request_id,
        account_user_id:    accountUserId,
        label:              cf.label.trim(),
        value:              cf.value.trim() || null,
        sort_order:         i,
      }));
      await insertCustomFields(good);

      // SMS consent upsert on first consent — best-effort.
      if (consentChecked && !existingConsent.consented) {
        await upsertSmsConsent(authUserId);
        setExistingConsent({ consented: true, consentedAt: now });
      }

      // Admin notification — best-effort.
      await notifyAdminSR({ event_type: 'service_requests', user_id: accountUserId });

      // Reset form state.
      setShowSRForm(false);
      setSrType('');
      setSrDesc('');

      // Refresh list.
      await refreshServiceRequests();

    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Could not submit. Please try again.';
      setSrSubmitError(msg);
      throw err;
    } finally {
      setSrSubmitting(false);
    }
  }, [
    srType, srDesc, photos, anyPhotoUploading,
    existingConsent, accountUserId, authUserId,
    refreshServiceRequests,
  ]);

  const clearSRSubmitError = useCallback(() => setSrSubmitError(null), []);
  const activeList   = filterActive(serviceRequests);
  const archivedList = filterArchived(serviceRequests);

  return {
    serviceRequests,
    activeList,
    archivedList,
    setServiceRequests,
    activeTab,
    setActiveTab,
    existingConsent,
    photos,
    handlePhotoFiles,
    removePhoto,
    anyPhotoUploading,
    photoFileRef,
    archiveSR,
    unarchiveSR,
    markSRRead,
    refreshServiceRequests,
    showSRForm,
    setShowSRForm,
    srType,
    setSrType,
    srDesc,
    setSrDesc,
    submitServiceRequest,
    srSubmitting,
    srSubmitError,
    clearSRSubmitError,
    actor,
  };
}

// ── Account engine ────────────────────────────────────────────────────────────

// Self-contained engine for the account-side panel.
// Actor is always ACCOUNT.
export function useAccountServiceRequests(
  session:       Session | null,
  accountUserId: string,
): ServiceRequestEngineOutput {
  return useServiceRequestsCore(session, accountUserId, 'ACCOUNT');
}

// ── Admin engine ──────────────────────────────────────────────────────────────

// Self-contained engine for the admin-side panel.
// Actor is always ADMIN.
// accountUserId scopes all queries to the specific user the admin is viewing.
export function useAdminServiceRequests(
  session:       Session | null,
  accountUserId: string,
): ServiceRequestEngineOutput {
  return useServiceRequestsCore(session, accountUserId, 'ADMIN');
}