// frontend/handlers/consentHandler.ts
//
// Reusable SMS consent state handler.
// The consent-check logic is inline in 3ServiceRequestPanel.tsx useEffect:
//   - Fetch user_sms_preferences.opt_in_work_orders
//   - If consented, find earliest service_request with workorder_sms_consent_at
//
// This handler extracts it so any component (mobile, desktop, admin)
// can check a user's consent state with one call.

import { supabase } from '../lib/supabase'

// ── Types ──────────────────────────────────────────────────────────────────

export interface ConsentState {
  consented:   boolean
  consentedAt: string | null
}

// ── Fetch existing consent state ───────────────────────────────────────────

/**
 * Check if a user has already consented to work-order SMS.
 * If yes, also find the earliest consent timestamp from their service requests.
 *
 * Exact from 3ServiceRequestPanel.tsx useEffect consent fetch.
 */
export async function fetchConsentState(userId: string): Promise<ConsentState> {
  const { data: prefs } = await supabase
    .from('user_sms_preferences')
    .select('opt_in_work_orders')
    .eq('user_id', userId)
    .maybeSingle()

  if (!prefs?.opt_in_work_orders) {
    return { consented: false, consentedAt: null }
  }

  // Find earliest consent timestamp
  const { data: firstSR } = await supabase
    .from('service_requests')
    .select('workorder_sms_consent_at')
    .eq('account_user_id', userId)
    .eq('workorder_sms_consent', true)
    .not('workorder_sms_consent_at', 'is', null)
    .order('workorder_sms_consent_at', { ascending: true })
    .limit(1)
    .maybeSingle()

  return {
    consented: true,
    consentedAt: firstSR?.workorder_sms_consent_at ?? null,
  }
}

// ── Record first-time consent ──────────────────────────────────────────────

/**
 * Upsert SMS preferences to record work-order consent.
 * Called after a user checks the consent box for the first time.
 *
 * Exact from ServiceRequestForm.tsx handleSubmit() SMS prefs upsert.
 */
export async function recordWorkOrderConsent(userId: string): Promise<{ error: string | null }> {
  const { error } = await supabase
    .from('user_sms_preferences')
    .upsert(
      { user_id: userId, opt_in_work_orders: true },
      { onConflict: 'user_id' },
    )

  return { error: error?.message ?? null }
}
