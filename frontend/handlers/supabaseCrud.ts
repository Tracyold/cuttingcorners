// frontend/handlers/supabaseCrud.ts
//
// Reusable Supabase CRUD handler.
// Every hook in the app does the same pattern: fetch rows, insert, update,
// delete, then setState. This handler centralises that so each hook can
// call one-liners instead of repeating try/catch + supabase calls.

import { supabase } from '../lib/supabase'

// ── Types ──────────────────────────────────────────────────────────────────

export interface FetchOptions {
  table: string
  select?: string
  filters?: Record<string, any>
  order?: { column: string; ascending?: boolean }
  limit?: number
  single?: boolean
}

export interface MutateOptions {
  table: string
  data: Record<string, any>
  filters?: Record<string, any>
}

export interface DeleteOptions {
  table: string
  filters: Record<string, any>
}

// ── Fetch ──────────────────────────────────────────────────────────────────

export async function fetchRows<T = any>(opts: FetchOptions): Promise<{ data: T | T[] | null; error: string | null }> {
  let query = supabase.from(opts.table).select(opts.select || '*')

  if (opts.filters) {
    for (const [col, val] of Object.entries(opts.filters)) {
      if (val === null) {
        query = query.is(col, null)
      } else if (typeof val === 'object' && val._op) {
        // Support special operators: { _op: 'neq', value: 'x' }
        if (val._op === 'neq') query = query.neq(col, val.value)
        else if (val._op === 'in') query = query.in(col, val.value)
        else if (val._op === 'not.is') query = query.not(col, 'is', val.value)
      } else {
        query = query.eq(col, val)
      }
    }
  }

  if (opts.order) {
    query = query.order(opts.order.column, { ascending: opts.order.ascending ?? false })
  }

  if (opts.limit) {
    query = query.limit(opts.limit)
  }

  if (opts.single) {
    const { data, error } = await query.single()
    return { data: data as T, error: error?.message ?? null }
  }

  const { data, error } = await query
  return { data: (data ?? []) as T[], error: error?.message ?? null }
}

// ── Insert ─────────────────────────────────────────────────────────────────

export async function insertRow(opts: MutateOptions): Promise<{ data: any; error: string | null }> {
  const { data, error } = await supabase
    .from(opts.table)
    .insert(opts.data)
    .select()
    .single()

  return { data, error: error?.message ?? null }
}

export async function insertRowRaw(opts: MutateOptions): Promise<{ error: string | null }> {
  const { error } = await supabase.from(opts.table).insert(opts.data)
  return { error: error?.message ?? null }
}

// ── Update ─────────────────────────────────────────────────────────────────

export async function updateRow(opts: MutateOptions): Promise<{ error: string | null }> {
  let query = supabase.from(opts.table).update(opts.data)

  if (opts.filters) {
    for (const [col, val] of Object.entries(opts.filters)) {
      query = query.eq(col, val)
    }
  }

  const { error } = await query
  return { error: error?.message ?? null }
}

// ── Upsert ─────────────────────────────────────────────────────────────────

export async function upsertRow(
  table: string,
  data: Record<string, any>,
  onConflict?: string,
): Promise<{ error: string | null }> {
  const { error } = await supabase
    .from(table)
    .upsert(data, onConflict ? { onConflict } : undefined)

  return { error: error?.message ?? null }
}

// ── Delete ─────────────────────────────────────────────────────────────────

export async function deleteRow(opts: DeleteOptions): Promise<{ error: string | null }> {
  let query = supabase.from(opts.table).delete()

  for (const [col, val] of Object.entries(opts.filters)) {
    query = query.eq(col, val)
  }

  const { error } = await query
  return { error: error?.message ?? null }
}

// ── RPC ────────────────────────────────────────────────────────────────────

export async function callRpc(fn: string, args: Record<string, any>): Promise<{ data: any; error: string | null }> {
  const { data, error } = await supabase.rpc(fn, args)
  return { data, error: error?.message ?? null }
}
