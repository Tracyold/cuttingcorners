// frontend/components/admin/users/hooks/useAdminUserWorkOrders.ts
//
// Extracted from pages/admin/users/[id].tsx — appendLog, completeWO, cancelWO.
// Receives setWO from useAdminUserDetail so state lives in one place.
// Admin-only actions: complete and cancel. User-side accept lives in useWorkOrders.

import { useState } from 'react';
import { supabase } from '../../../../lib/supabase';

export interface AdminUserWorkOrdersData {
  selectedWO:    any;
  showAddWO:     boolean;
  setSelectedWO: (wo: any) => void;
  setShowAddWO:  (v: boolean) => void;
  completeWO:    (wo: any) => Promise<void>;
  cancelWO:      (wo: any) => Promise<void>;
}

export function useAdminUserWorkOrders(
  setWO: (fn: any) => void,
): AdminUserWorkOrdersData {
  const [selectedWO, setSelectedWO] = useState<any>(null);
  const [showAddWO,  setShowAddWO]  = useState(false);

  // Exact logic from [id].tsx appendLog()
  const appendLog = (wo: any, action: string, by: string) => {
    const prev = Array.isArray(wo.edit_history) ? wo.edit_history : [];
    return [...prev, { action, by, at: new Date().toISOString() }];
  };

  // Exact logic from [id].tsx completeWO()
  const completeWO = async (wo: any) => {
    console.log('completeWO fired, status:', wo.status, 'id:', wo.work_order_id);
    const log = appendLog(wo, 'COMPLETE by admin', 'admin');
    const now = new Date().toISOString();
    const { error } = await supabase
      .from('work_orders')
      .update({ status: 'COMPLETE', completed_at: now, edit_history: log })
      .eq('work_order_id', wo.work_order_id);
    if (error) {
      console.error('Complete WO error:', error.message);
      alert('Error: ' + error.message);
      return;
    }
    setWO((prev: any[]) =>
      prev.map(w =>
        w.work_order_id === wo.work_order_id
          ? { ...w, status: 'COMPLETE', completed_at: now, edit_history: log }
          : w
      )
    );
    setSelectedWO((prev: any) =>
      prev ? { ...prev, status: 'COMPLETE', completed_at: now, edit_history: log } : prev
    );
  };

  // Exact logic from [id].tsx cancelWO()
  const cancelWO = async (wo: any) => {
    const reason = prompt('Cancel reason:');
    if (!reason) return;
    const log = appendLog(wo, 'CANCELLED by admin: ' + reason, 'admin');
    const { error } = await supabase
      .from('work_orders')
      .update({
        status: 'CANCELLED',
        cancelled_at: new Date().toISOString(),
        cancel_reason: reason,
        edit_history: log,
      })
      .eq('work_order_id', wo.work_order_id);
    if (error) {
      console.error('Cancel WO error:', error.message);
      return;
    }
    setWO((prev: any[]) =>
      prev.map(w =>
        w.work_order_id === wo.work_order_id
          ? { ...w, status: 'CANCELLED', edit_history: log }
          : w
      )
    );
    setSelectedWO((prev: any) =>
      prev ? { ...prev, status: 'CANCELLED', edit_history: log } : prev
    );
  };

  return {
    selectedWO, showAddWO,
    setSelectedWO, setShowAddWO,
    completeWO, cancelWO,
  };
}
