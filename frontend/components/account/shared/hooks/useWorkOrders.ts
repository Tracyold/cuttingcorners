import { useState, Dispatch, SetStateAction } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../../../../lib/supabase';

type WorkOrderStatus = 'CREATED' | 'ACCEPTED' | 'COMPLETE' | 'CANCELLED' | 'CONFIRMED';

interface EditHistoryEntry {
  action: string;
  by:     string;
  at:     string;
}

// work_orders (subset accessed by this hook)
interface WorkOrder {
  work_order_id:       string;
  account_user_id:     string;
  status:              WorkOrderStatus;
  accepted_at:         string | null;
  edit_history:        EditHistoryEntry[];
  wo_shipping_address: string | null;
}

export function useWorkOrders(session: Session | null, setWorkOrders: Dispatch<SetStateAction<WorkOrder[]>>) {
  const [selectedWO, setSelectedWO] = useState<WorkOrder | null>(null);
  const [showAddressEdit, setShowAddressEdit] = useState(false);
  const [tempAddress, setTempAddress] = useState('');
  const [addressConfirmed, setAddressConfirmed] = useState(false);

  const acceptWO = async (wo: WorkOrder) => {
    if (!session) return;
    const log: EditHistoryEntry[] = [
      ...(Array.isArray(wo.edit_history) ? wo.edit_history : []),
      { action: 'ACCEPTED by user', by: 'user', at: new Date().toISOString() },
    ];
    await supabase.from('work_orders')
      .update({ status: 'ACCEPTED', accepted_at: new Date().toISOString(), edit_history: log })
      .eq('work_order_id', wo.work_order_id)
      .eq('account_user_id', session.user.id);
    await supabase.functions.invoke('send-admin-notification', {
      body: { event_type: 'work_orders', work_order_id: wo.work_order_id },
    });
    setWorkOrders((prev) => prev.map(w =>
      w.work_order_id === wo.work_order_id
        ? { ...w, status: 'ACCEPTED', accepted_at: new Date().toISOString(), edit_history: log }
        : w
    ));
    setSelectedWO((prev) =>
      prev ? { ...prev, status: 'ACCEPTED', accepted_at: new Date().toISOString(), edit_history: log } : prev
    );
  };


  const updateShippingAddress = async (wo: WorkOrder, address: string) => {
    const log: EditHistoryEntry[] = [
      ...(Array.isArray(wo.edit_history) ? wo.edit_history : []),
      { action: 'Return address updated by user', by: 'user', at: new Date().toISOString() },
    ];
    await supabase.from('work_orders')
      .update({ wo_shipping_address: address.trim(), edit_history: log })
      .eq('work_order_id', wo.work_order_id);
    setSelectedWO((prev) =>
      prev ? { ...prev, wo_shipping_address: address.trim(), edit_history: log } : prev
    );
    setWorkOrders((prev) => prev.map(w =>
      w.work_order_id === wo.work_order_id
        ? { ...w, wo_shipping_address: address.trim(), edit_history: log }
        : w
    ));
  };

  const openWODetail = (wo: WorkOrder) => setSelectedWO(wo);

  return {
    selectedWO, setSelectedWO,
    showAddressEdit, setShowAddressEdit,
    tempAddress, setTempAddress,
    addressConfirmed, setAddressConfirmed,
    acceptWO, openWODetail, updateShippingAddress,
  };
}
