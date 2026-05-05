/**
 * SERVICE REQUESTS MODULE - DATA LAYER
 *
 * RULES:
 * - ONLY Supabase queries
 * - NO business logic
 * - NO validation
 * - Return raw data only
 */

import { supabase, withTimeout, TIMEOUT_MS } from '@/src/lib/supabase'
import type { ServiceRequest, CreateServiceRequestInput } from './service_requests.types'
import type { ID } from '@/src/types/common'

// ============================================================================
// READ OPERATIONS
// ============================================================================

export async function getServiceRequestsByUser(userId: ID): Promise<ServiceRequest[]> {
  const { data, error } = await withTimeout(
    supabase
      .from('service_requests')
      .select('*')
      .eq('account_user_id', userId)
      .order('created_at', { ascending: false }),
    TIMEOUT_MS.REQUEST,
    'getServiceRequestsByUser'
  )
  if (error) throw error
  return data as ServiceRequest[]
}

export async function getSmsOptInForUser(userId: ID): Promise<{
  phone: string | null
  opt_in_work_orders: boolean | null
} | null> {
  const { data, error } = await withTimeout(
    supabase
      .from('user_sms_preferences')
      .select('opt_in_work_orders')
      .eq('user_id', userId)
      .single(),
    TIMEOUT_MS.REQUEST,
    'getSmsOptInForUser'
  )
  if (error && error.code !== 'PGRST116') throw error

  if (!data) return null

  const prefs = data as { opt_in_work_orders: boolean | null }

  const { data: profile, error: profileError } = await withTimeout(
    supabase
      .from('account_users')
      .select('phone')
      .eq('account_user_id', userId)
      .single(),
    TIMEOUT_MS.REQUEST,
    'getUserPhone'
  )
  if (profileError && profileError.code !== 'PGRST116') throw profileError

  return {
    phone: (profile as { phone: string | null } | null)?.phone ?? null,
    opt_in_work_orders: prefs.opt_in_work_orders,
  }
}

// ============================================================================
// CREATE OPERATIONS
// ============================================================================

export async function insertServiceRequest(
  input: CreateServiceRequestInput
): Promise<ServiceRequest> {
  const { data, error } = await withTimeout(
    supabase
      .from('service_requests')
      .insert({
        account_user_id: input.account_user_id,
        service_type: input.service_type,
        description: input.description,
        photo_url: input.photo_url ?? null,
      })
      .select()
      .single(),
    TIMEOUT_MS.REQUEST,
    'insertServiceRequest'
  )
  if (error) throw error
  return data as ServiceRequest
}

// ============================================================================
// ADMIN NOTIFICATION
// ============================================================================

export async function notifyAdminOfServiceRequest(userId: ID): Promise<void> {
  await supabase.functions.invoke('send-admin-notification', {
    body: { event_type: 'service_requests', user_id: userId },
  })
}
