// comp/admin/mobile/panels/users/hooks/useAdminUserWorkOrders.ts
// Direct extract from [id].tsx + WorkOrderDetailModal.tsx
// Owns ALL work order logic for both panel and drawer.
// Panels and drawers import this hook and use what they need.

import { useState } from 'react';
import { supabase } from '../../../../../../lib/supabase';

export function useAdminUserWorkOrders(
  id: string,
  setWO: (fn: (prev: any[]) => any[]) => void,
) {
  const [selectedWO,        setSelectedWO]        = useState<any>(null);
  const [showAddWO,         setShowAddWO]         = useState(false);
  const [editingWOAddr,     setEditingWOAddr]     = useState(false);
  const [woAdminAddrEdit,   setWoAdminAddrEdit]   = useState('');
  const [woClientAddrEdit,  setWoClientAddrEdit]  = useState('');

  const isGuest = id === process.env.NEXT_PUBLIC_GUEST_ACCOUNT_USER_ID;

  // Exact from WorkOrderDetailModal.tsx appendLog()
  const appendLog = (wo: any, action: string, by: string) => {
    const prev = Array.isArray(wo.edit_history) ? wo.edit_history : [];
    return [...prev, { action, by, at: new Date().toISOString() }];
  };

  // Exact from WorkOrderDetailModal.tsx confirmWO()
  const confirmWO = async (wo: any) => {
    const log = appendLog(wo, 'CONFIRMED by admin', 'admin');
    const { error } = await supabase
      .from('work_orders')
      .update({ status: 'CONFIRMED', confirmed_at: new Date().toISOString(), edit_history: log })
      .eq('work_order_id', wo.work_order_id);
    if (error) { console.error('Confirm WO error:', error.message); return; }
    await supabase.functions.invoke('send-user-notification', {
      body: { event_type: 'work_order_confirmed', work_order_id: wo.work_order_id, user_id: wo.account_user_id },
    }).catch(() => {});
    setWO(prev => prev.map(w => w.work_order_id === wo.work_order_id ? { ...w, status: 'CONFIRMED', confirmed_at: new Date().toISOString(), edit_history: log } : w));
    setSelectedWO((prev: any) => prev ? { ...prev, status: 'CONFIRMED', confirmed_at: new Date().toISOString(), edit_history: log } : prev);
  };

  // Exact from [id].tsx completeWO()
  const completeWO = async (wo: any) => {
    console.log('completeWO fired, status:', wo.status, 'id:', wo.work_order_id);
    const log = appendLog(wo, 'COMPLETE by admin', 'admin');
    const now = new Date().toISOString();
    const { error } = await supabase
      .from('work_orders')
      .update({ status: 'COMPLETE', completed_at: now, edit_history: log })
      .eq('work_order_id', wo.work_order_id);
    if (error) { console.error('Complete WO error:', error.message); alert('Error: ' + error.message); return; }
    setWO(prev => prev.map(w => w.work_order_id === wo.work_order_id ? { ...w, status: 'COMPLETE', completed_at: now, edit_history: log } : w));
    setSelectedWO((prev: any) => prev ? { ...prev, status: 'COMPLETE', completed_at: now, edit_history: log } : prev);
  };

  // Exact from [id].tsx cancelWO()
  const cancelWO = async (wo: any) => {
    const reason = prompt('Cancel reason:');
    if (!reason) return;
    const log = appendLog(wo, 'CANCELLED by admin: ' + reason, 'admin');
    const { error } = await supabase
      .from('work_orders')
      .update({ status: 'CANCELLED', cancelled_at: new Date().toISOString(), cancel_reason: reason, edit_history: log })
      .eq('work_order_id', wo.work_order_id);
    if (error) { console.error('Cancel WO error:', error.message); return; }
    setWO(prev => prev.map(w => w.work_order_id === wo.work_order_id ? { ...w, status: 'CANCELLED', edit_history: log } : w));
    setSelectedWO((prev: any) => prev ? { ...prev, status: 'CANCELLED', edit_history: log } : prev);
  };

  // Exact from WorkOrderDetailModal.tsx address save
  const saveAddresses = async (wo: any, session: any, adminInfo: any) => {
    const log = appendLog(wo, 'Addresses updated by admin', 'admin');
    await supabase.from('work_orders')
      .update({ wo_shipping_address: woClientAddrEdit.trim(), edit_history: log })
      .eq('work_order_id', wo.work_order_id);
    if (woAdminAddrEdit.trim() !== adminInfo?.address) {
      await supabase.from('admin_users')
        .update({ address: woAdminAddrEdit.trim() })
        .eq('admin_user_id', session?.user?.id);
    }
    setSelectedWO((prev: any) => ({ ...prev, wo_shipping_address: woClientAddrEdit.trim(), edit_history: log }));
    setWO(prev => prev.map(w => w.work_order_id === wo.work_order_id ? { ...w, wo_shipping_address: woClientAddrEdit.trim() } : w));
    setEditingWOAddr(false);
  };

  // Exact from WorkOrderDetailModal.tsx payment link onBlur
  const savePaymentLink = async (wo: any, link: string) => {
    const log = appendLog(wo, 'Payment link added', 'admin');
    await supabase.from('work_orders')
      .update({ stripe_payment_link: link.trim(), edit_history: log })
      .eq('work_order_id', wo.work_order_id);
    setSelectedWO((prev: any) => ({ ...prev, stripe_payment_link: link.trim(), edit_history: log }));
    setWO(prev => prev.map(w => w.work_order_id === wo.work_order_id ? { ...w, stripe_payment_link: link.trim() } : w));
  };

  // Exact from WorkOrderDetailModal.tsx paid outside site
  const markPaidOutside = async (wo: any) => {
    const log = appendLog(wo, 'Marked as paid outside site', 'admin');
    await supabase.from('work_orders')
      .update({ paid_outside_site: true, edit_history: log })
      .eq('work_order_id', wo.work_order_id);
    setSelectedWO((prev: any) => ({ ...prev, paid_outside_site: true, edit_history: log }));
    setWO(prev => prev.map(w => w.work_order_id === wo.work_order_id ? { ...w, paid_outside_site: true } : w));
  };

  const openAddressEdit = (wo: any, adminInfo: any) => {
    setEditingWOAddr(true);
    setWoClientAddrEdit(wo.wo_shipping_address || '');
    setWoAdminAddrEdit(adminInfo?.address || '');
  };

  const closeWO = () => {
    setSelectedWO(null);
    setEditingWOAddr(false);
  };

  return {
    selectedWO, setSelectedWO,
    showAddWO, setShowAddWO,
    editingWOAddr, setEditingWOAddr,
    woAdminAddrEdit, setWoAdminAddrEdit,
    woClientAddrEdit, setWoClientAddrEdit,
    isGuest,
    openAddressEdit,
    closeWO,
    confirmWO, completeWO, cancelWO,
    saveAddresses, savePaymentLink, markPaidOutside,
  };
}
