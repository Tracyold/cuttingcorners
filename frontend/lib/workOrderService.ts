// lib/workOrderService.ts
// Pure async write helpers for the public.work_orders table.
// Drawers and panels import these instead of issuing inline supabase calls.

import { supabase } from './supabase';

export interface EditHistoryEntry {
  action: string;
  by:     string;
  at:     string;
}

export interface ReturnAddressTarget {
  work_order_id: string;
  edit_history:  EditHistoryEntry[];
}

export interface ReturnAddressProfile {
  name:  string | null;
  email: string | null;
  phone: string | null;
}

/**
 * Update a work order's return address (wo_shipping_address) and snapshot
 * the supplied profile onto wo_client_name/email/phone. Appends an
 * audit entry to edit_history.
 *
 * Schema: public.work_orders
 *   - wo_shipping_address text
 *   - wo_client_name      text
 *   - wo_client_email     text
 *   - wo_client_phone     text
 *   - edit_history        jsonb
 */
export async function updateWorkOrderReturnAddress(
  wo: ReturnAddressTarget,
  address: string,
  profile: ReturnAddressProfile | null,
): Promise<EditHistoryEntry[]> {
  const trimmed = address.trim();
  const log: EditHistoryEntry[] = [
    ...(Array.isArray(wo.edit_history) ? wo.edit_history : []),
    { action: 'Return address updated by user', by: 'user', at: new Date().toISOString() },
  ];
  await supabase
    .from('work_orders')
    .update({
      wo_shipping_address: trimmed,
      wo_client_name:  profile?.name  ?? null,
      wo_client_phone: profile?.phone ?? null,
      wo_client_email: profile?.email ?? null,
      edit_history: log,
    })
    .eq('work_order_id', wo.work_order_id);
  return log;
}
