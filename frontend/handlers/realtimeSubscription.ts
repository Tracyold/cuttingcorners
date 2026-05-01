// frontend/handlers/realtimeSubscription.ts
//
// Reusable Supabase realtime subscription handler.
// Every data hook subscribes to postgres_changes with the same pattern:
//   1. Build a channel name
//   2. Listen for INSERT / UPDATE / DELETE on a table with a filter
//   3. Update local state via a setter
//   4. Return a cleanup function
//
// This handler wraps that pattern so hooks can subscribe in one call.

import { supabase } from '../lib/supabase'
import type { RealtimeChannel } from '@supabase/supabase-js'

// ── Types ──────────────────────────────────────────────────────────────────

export type RealtimeEvent = 'INSERT' | 'UPDATE' | 'DELETE' | '*'

export interface SubscriptionConfig {
  /** Unique channel name (e.g. 'user-wo-<uid>') */
  channelName: string
  /** Postgres table to listen on */
  table: string
  /** Optional filter string (e.g. 'account_user_id=eq.<uid>') */
  filter?: string
  /** Which events to listen for (default: '*') */
  event?: RealtimeEvent
  /** Callback when a matching event fires */
  onPayload: (payload: any) => void
}

export interface MultiSubscriptionConfig {
  channelName: string
  listeners: Array<{
    table: string
    event: RealtimeEvent
    filter?: string
    onPayload: (payload: any) => void
  }>
}

// ── Single table subscription ──────────────────────────────────────────────

export function subscribe(config: SubscriptionConfig): RealtimeChannel {
  const channel = supabase
    .channel(config.channelName)
    .on(
      'postgres_changes',
      {
        event: config.event || '*',
        schema: 'public',
        table: config.table,
        ...(config.filter ? { filter: config.filter } : {}),
      },
      config.onPayload,
    )
    .subscribe()

  return channel
}

// ── Multi-listener subscription (single channel, multiple tables) ──────────

export function subscribeMulti(config: MultiSubscriptionConfig): RealtimeChannel {
  let channel = supabase.channel(config.channelName)

  for (const listener of config.listeners) {
    channel = channel.on(
      'postgres_changes',
      {
        event: listener.event,
        schema: 'public',
        table: listener.table,
        ...(listener.filter ? { filter: listener.filter } : {}),
      },
      listener.onPayload,
    )
  }

  return channel.subscribe()
}

// ── Cleanup helper ─────────────────────────────────────────────────────────

export function unsubscribe(channel: RealtimeChannel | null): void {
  if (channel) supabase.removeChannel(channel)
}

// ── Common realtime state updaters ─────────────────────────────────────────
// These are the exact patterns used across useAccountInfo, useAdminUserDetail,
// etc. — extracted so hooks can pass them directly as onPayload callbacks.

/**
 * Creates an INSERT handler that prepends the new row to state.
 */
export function onInsertPrepend<T>(
  setter: (fn: (prev: T[]) => T[]) => void,
): (payload: any) => void {
  return (payload) => {
    setter((prev) => [payload.new as T, ...prev])
  }
}

/**
 * Creates an UPDATE handler that replaces the matching row in state.
 * @param idKey - The primary key column name to match on
 */
export function onUpdateReplace<T extends Record<string, any>>(
  setter: (fn: (prev: T[]) => T[]) => void,
  idKey: string,
): (payload: any) => void {
  return (payload) => {
    const updated = payload.new as T
    setter((prev) =>
      prev.map((item) => (item[idKey] === updated[idKey] ? updated : item)),
    )
  }
}

/**
 * Creates a DELETE handler that removes the matching row from state.
 * @param idKey - The primary key column name to match on
 */
export function onDeleteRemove<T extends Record<string, any>>(
  setter: (fn: (prev: T[]) => T[]) => void,
  idKey: string,
): (payload: any) => void {
  return (payload) => {
    const old = payload.old as T
    setter((prev) => prev.filter((item) => item[idKey] !== old[idKey]))
  }
}

/**
 * Creates a full CRUD handler (INSERT + UPDATE + DELETE) for a table.
 * Matches the exact pattern from useAccountInfo's service_requests channel.
 */
export function onCrudHandler<T extends Record<string, any>>(
  setter: (fn: (prev: T[]) => T[]) => void,
  idKey: string,
): (payload: any) => void {
  return (payload) => {
    if (payload.eventType === 'INSERT') {
      setter((prev) => [payload.new as T, ...prev])
    } else if (payload.eventType === 'UPDATE') {
      const updated = payload.new as T
      setter((prev) =>
        prev.map((item) => (item[idKey] === updated[idKey] ? updated : item)),
      )
    } else if (payload.eventType === 'DELETE') {
      const old = payload.old as T
      setter((prev) => prev.filter((item) => item[idKey] !== old[idKey]))
    }
  }
}
