// frontend/handlers/notificationHandler.ts
//
// Reusable notification handler for both admin and user-facing notifications.
// Covers: send-admin-notification, send-user-notification edge functions,
// admin_notifications table reads/marks, and unread count tracking.
//
// Used by: useAdminDashboard, useAdminUsers, useAdminUserWorkOrders,
// useAdminUserChat, useChat, useServiceRequest, shop.tsx inquiry/checkout flows.

import { supabase } from '../lib/supabase'

// ── Types ──────────────────────────────────────────────────────────────────

export interface NotifyAdminPayload {
  event_type: string
  user_id?: string
  work_order_id?: string
  thread_id?: string
  guest_name?: string
  [key: string]: any
}

export interface NotifyUserPayload {
  event_type: string
  user_id: string
  work_order_id?: string
  [key: string]: any
}

// ── Send notifications via edge functions ──────────────────────────────────

/**
 * Fire-and-forget admin notification.
 * Exact pattern from useChat, useServiceRequest, useAdminUserWorkOrders, shop.tsx.
 */
export async function notifyAdmin(payload: NotifyAdminPayload): Promise<void> {
  await supabase.functions
    .invoke('send-admin-notification', { body: payload })
    .catch(() => {})
}

/**
 * Fire-and-forget user notification.
 * Exact pattern from useAdminUserChat, useAdminUserWorkOrders.
 */
export async function notifyUser(payload: NotifyUserPayload): Promise<void> {
  await supabase.functions
    .invoke('send-user-notification', { body: payload })
    .catch(() => {})
}

// ── Admin notification reads ───────────────────────────────────────────────

/**
 * Mark all unread admin notifications as read.
 * Exact from useAdminDashboard markAllRead().
 */
export async function markAllNotificationsRead(): Promise<void> {
  await supabase
    .from('admin_notifications')
    .update({ read: true })
    .eq('read', false)
}

/**
 * Mark a single admin notification as read.
 * Exact from useAdminDashboard markOneRead().
 */
export async function markNotificationRead(id: string): Promise<void> {
  await supabase
    .from('admin_notifications')
    .update({ read: true })
    .eq('id', id)
}

/**
 * Fetch unread notification counts grouped by user_id.
 * Exact from useAdminUsers load().
 */
export async function getUnreadCountsByUser(): Promise<Record<string, number>> {
  const { data } = await supabase
    .from('admin_notifications')
    .select('user_id')
    .eq('read', false)

  const counts: Record<string, number> = {}
  if (data) {
    data.forEach((n) => {
      if (n.user_id) counts[n.user_id] = (counts[n.user_id] || 0) + 1
    })
  }
  return counts
}

/**
 * Fetch all unread admin notifications with account user name.
 * Exact from useAdminDashboard loadAll().
 */
export async function fetchUnreadNotifications(): Promise<any[]> {
  const { data } = await supabase
    .from('admin_notifications')
    .select('*, account_users(name)')
    .eq('read', false)
    .order('created_at', { ascending: false })

  return data || []
}
