// frontend/handlers/serviceRequestHandler.ts
//
// Reusable service request action handler.
// SR logic is duplicated across:
//   - useServiceRequest (account side: gate check, submit)
//   - useAdminUserServiceRequests (admin side: markRead, unarchive)
//
// This handler extracts the shared DB mutations.

import { supabase } from '../lib/supabase'
import { notifyAdmin } from './notificationHandler'

// ── Types ──────────────────────────────────────────────────────────────────

export interface SRGateCheckResult {
  allowed: boolean
  message: string
}

export interface SubmitSRParams {
  accountUserId: string
  serviceType: string
  description: string
  photoUrl?: string | null
}

// ── Gate check ─────────────────────────────────────────────────────────────

/**
 * Check if a user is allowed to submit a service request.
 * Requires phone on file + work order SMS opt-in.
 * Exact from useServiceRequest.openSRForm().
 */
export async function checkSRGate(userId: string): Promise<SRGateCheckResult> {
  const [{ data: prefs }, { data: profile }] = await Promise.all([
    supabase
      .from('user_sms_preferences')
      .select('opt_in_work_orders')
      .eq('user_id', userId)
      .single(),
    supabase
      .from('account_users')
      .select('phone')
      .eq('account_user_id', userId)
      .single(),
  ])

  if (!profile?.phone || !prefs?.opt_in_work_orders) {
    return {
      allowed: false,
      message:
        'To submit a service request you must have a phone number on file and work order SMS notifications enabled.',
    }
  }

  return { allowed: true, message: '' }
}

// ── Submit service request ─────────────────────────────────────────────────

/**
 * Insert a new service request and notify admin.
 * Exact from useServiceRequest.submitSR().
 */
export async function submitServiceRequest(params: SubmitSRParams): Promise<{ error: string | null }> {
  const { error } = await supabase.from('service_requests').insert({
    account_user_id: params.accountUserId,
    service_type: params.serviceType,
    description: params.description,
    photo_url: params.photoUrl ?? null,
  })

  if (error) return { error: error.message }

  await notifyAdmin({ event_type: 'service_requests', user_id: params.accountUserId })

  return { error: null }
}

// ── Admin: mark SR as read ─────────────────────────────────────────────────

/**
 * Mark a service request as read.
 * Exact from useAdminUserServiceRequests.markSRRead().
 */
export async function markSRRead(serviceRequestId: string): Promise<{ error: string | null }> {
  const { error } = await supabase
    .from('service_requests')
    .update({ is_read: true, read_at: new Date().toISOString() })
    .eq('service_request_id', serviceRequestId)

  return { error: error?.message ?? null }
}

// ── Admin: unarchive SR ────────────────────────────────────────────────────

/**
 * Recover an archived service request back to active.
 * Exact from useAdminUserServiceRequests.unarchiveSR().
 */
export async function unarchiveSR(serviceRequestId: string): Promise<{ error: string | null }> {
  const { error } = await supabase
    .from('service_requests')
    .update({ is_archived: false })
    .eq('service_request_id', serviceRequestId)

  return { error: error?.message ?? null }
}
