// frontend/modules/ServiceRequests/service-requests.supabase.ts
//
// Every Supabase communication for the service requests module.
// No React. No hooks. Pure async functions only.
// Each function does exactly one thing.

import { supabase } from '../../lib/supabase';
import type { Session } from '@supabase/supabase-js';
export type { Session };

import type {
  ServiceRequestRow,
  ServiceRequestCustomFieldRow,
  ServiceRequestInsertPayload,
  ServiceRequestCustomFieldInsertPayload,
  SRNotificationPayload,
  SRWizardResult,
  SRExistingConsent,
} from './sr.types';
import { SR_PHOTO_BUCKET } from './sr.types';

// ── Auth guard ────────────────────────────────────────────────────────────────

// Validates the session and returns the auth user ID.
// Throws if the session is missing or invalid — nothing else runs.
export function getAuthUserId(session: Session | null): string {
  if (!session?.user?.id) {
    throw new Error('No active session. Please log in again.');
  }
  return session.user.id;
}

// ── Fetch ─────────────────────────────────────────────────────────────────────

export async function fetchServiceRequests(
  accountUserId: string
): Promise<ServiceRequestRow[]> {
  const { data, error } = await supabase
    .from('service_requests')
    .select('*')
    .eq('account_user_id', accountUserId)
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as ServiceRequestRow[];
}

export async function fetchCustomFields(
  serviceRequestId: string
): Promise<ServiceRequestCustomFieldRow[]> {
  const { data, error } = await supabase
    .from('service_request_custom_fields')
    .select('id, label, value, sort_order, service_request_id, account_user_id')
    .eq('service_request_id', serviceRequestId)
    .order('sort_order', { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []) as ServiceRequestCustomFieldRow[];
}

export async function fetchExistingConsent(
  authUserId: string,
  accountUserId: string
): Promise<SRExistingConsent> {
      const { data: prefs } = await supabase
    .from('user_sms_preferences')
    .select('opt_in_work_orders')
    .eq('user_id', authUserId)
    .maybeSingle();

  if (!prefs?.opt_in_work_orders) {
    return { consented: false, consentedAt: null };
  }

  const { data: firstSR } = await supabase
    .from('service_requests')
    .select('workorder_sms_consent_at')
    .eq('account_user_id', accountUserId)
    .eq('workorder_sms_consent', true)
    .not('workorder_sms_consent_at', 'is', null)
    .order('workorder_sms_consent_at', { ascending: true })
    .limit(1)
    .maybeSingle();

  return {
    consented:   true,
    consentedAt: firstSR?.workorder_sms_consent_at ?? null,
  };
}

// Fetches the wizard result linked to an SR, if any.
export async function fetchLinkedWizardResult(
  wizardResultId: string
): Promise<SRWizardResult | null> {
  const { data, error } = await supabase
    .from('wizard_results')
    .select('id, stone_species, stone_variety, feasibility_percent, recommendation, weight_loss, disclaimer1_confirmed_at')
    .eq('id', wizardResultId)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data as SRWizardResult | null;
}

// ── Insert ────────────────────────────────────────────────────────────────────

export async function insertServiceRequest(
  payload: ServiceRequestInsertPayload
): Promise<{ service_request_id: string }> {
  const { data, error } = await supabase
    .from('service_requests')
    .insert(payload)
    .select('service_request_id')
    .maybeSingle();
  if (error || !data?.service_request_id) {
    throw new Error(error?.message ?? 'Service request insert returned no ID.');
  }
  return data as { service_request_id: string };
}

export async function insertCustomFields(
  fields: ServiceRequestCustomFieldInsertPayload[]
): Promise<void> {
  if (fields.length === 0) return;
  const { error } = await supabase
    .from('service_request_custom_fields')
    .insert(fields);
  // Non-blocking — log but do not throw.
  if (error) console.warn('Custom fields insert failed (non-blocking):', error);
}

// ── Update ────────────────────────────────────────────────────────────────────

export async function archiveServiceRequest(id: string): Promise<void> {
  const { error } = await supabase
    .from('service_requests')
    .update({ is_archived: true })
    .eq('service_request_id', id);
  if (error) throw new Error(error.message);
}

export async function unarchiveServiceRequest(id: string): Promise<void> {
  const { error } = await supabase
    .from('service_requests')
    .update({ is_archived: false })
    .eq('service_request_id', id);
  if (error) throw new Error(error.message);
}

export async function markServiceRequestRead(id: string): Promise<void> {
  const { error } = await supabase
    .from('service_requests')
    .update({ is_read: true, read_at: new Date().toISOString() })
    .eq('service_request_id', id);
  if (error) throw new Error(error.message);
}

// ── SMS prefs ─────────────────────────────────────────────────────────────────

export async function upsertSmsConsent(authUserId: string): Promise<void> {
  const { error } = await supabase
    .from('user_sms_preferences')
    .upsert(
      { user_id: authUserId, opt_in_work_orders: true },
      { onConflict: 'user_id' }
    );
  if (error) console.warn('SMS prefs upsert failed (non-blocking):', error);
}

// ── Storage ───────────────────────────────────────────────────────────────────

export function buildSRStoragePath(authUserId: string, tempId: string, ext: string): string {
  return `${authUserId}/${tempId}.${ext}`;
}

export async function uploadSRPhoto(
  storagePath: string,
  file: File
): Promise<void> {
  const uploadRace = Promise.race([
    supabase.storage
      .from(SR_PHOTO_BUCKET)
      .upload(storagePath, file, { cacheControl: '3600', upsert: false }),
    new Promise<{ data: null; error: { message: string } }>(resolve =>
      setTimeout(
        () => resolve({ data: null, error: { message: 'Upload timed out after 60 seconds. Please try again.' } }),
        60_000
      )
    ),
  ]);

  const result = await uploadRace;
  const upErr = (result as { error?: { message: string } | null }).error;
  if (upErr) throw new Error(upErr.message ?? 'Upload failed.');
}

export function getSRPhotoPublicUrl(storagePath: string): string | null {
  try {
    const { data } = supabase.storage
      .from(SR_PHOTO_BUCKET)
      .getPublicUrl(storagePath);
    return data?.publicUrl ?? null;
  } catch {
    return null;
  }
}

export async function deleteSRPhoto(storagePath: string): Promise<void> {
  try {
    await supabase.storage.from(SR_PHOTO_BUCKET).remove([storagePath]);
  } catch (e) {
    console.warn('Photo storage removal failed (non-blocking):', e);
  }
}

// ── Notifications ─────────────────────────────────────────────────────────────

// Errors are swallowed — notification failure never breaks the submit flow.
export async function notifyAdminSR(payload: SRNotificationPayload): Promise<void> {
  await supabase.functions
    .invoke('send-admin-notification', { body: payload })
    .catch(() => {});
}