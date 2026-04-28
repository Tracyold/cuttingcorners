// frontend/components/admin/hooks/useAdminDashboard.ts
//
// Extracts all data fetching and actions from pages/admin/dashboard.tsx.
// The page/panel imports this hook and passes the returned values to UI.

import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';

export interface AdminDashboardData {
  // Business info
  adminInfo:       any;
  editing:         Record<string, boolean>;
  editValues:      Record<string, string>;
  saving:          boolean;
  flash:           boolean;
  // Stats
  itemsSold:       number;
  shopRevenue:     number;
  woCompleted:     number;
  woRevenue:       number;
  // Notifications
  notifications:   any[];
  // SMS config
  smsConfig:       any;
  smsSaving:       boolean;
  smsFlash:        boolean;
  // Admin phones
  adminPhones:     any[];
  newPhone:        string;
  newLabel:        string;
  phoneAdding:     boolean;
  // Actions
  startEdit:       (field: string) => void;
  cancelEdit:      (field: string) => void;
  saveAll:         () => Promise<void>;
  markAllRead:     () => Promise<void>;
  markOneRead:     (id: string, userId: string | null, type: string) => Promise<void>;
  saveSmsToggle:   (field: string, value: boolean) => Promise<void>;
  addPhone:        () => Promise<void>;
  togglePhone:     (id: string, active: boolean) => Promise<void>;
  deletePhone:     (id: string) => Promise<void>;
  setNewPhone:     (v: string) => void;
  setNewLabel:     (v: string) => void;
  setEditValues:   (v: Record<string, string>) => void;
  hasDirty:        boolean;
}

export function useAdminDashboard(): AdminDashboardData {
  const [adminInfo,    setAdminInfo]    = useState<any>(null);
  const [editing,      setEditing]      = useState<Record<string, boolean>>({});
  const [editValues,   setEditValues]   = useState<Record<string, string>>({});
  const [saving,       setSaving]       = useState(false);
  const [flash,        setFlash]        = useState(false);
  const [itemsSold,    setItemsSold]    = useState(0);
  const [shopRevenue,  setShopRevenue]  = useState(0);
  const [woCompleted,  setWoCompleted]  = useState(0);
  const [woRevenue,    setWoRevenue]    = useState(0);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [smsConfig,    setSmsConfig]    = useState<any>(null);
  const [smsSaving,    setSmsSaving]   = useState(false);
  const [smsFlash,     setSmsFlash]    = useState(false);
  const [adminPhones,  setAdminPhones] = useState<any[]>([]);
  const [newPhone,     setNewPhone]    = useState('');
  const [newLabel,     setNewLabel]    = useState('');
  const [phoneAdding,  setPhoneAdding] = useState(false);

  useEffect(() => { loadAll(); }, []);

  async function loadAll() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const [
      { data: admin },
      { data: invoices },
      { data: wos },
      { data: notifs },
      { data: smsData },
      { data: phonesData },
    ] = await Promise.all([
      supabase.from('admin_users').select('*').eq('admin_user_id', session.user.id).single(),
      supabase.from('invoices').select('total_amount'),
      supabase.from('work_orders').select('estimated_price').eq('status', 'COMPLETED'),
      supabase.from('admin_notifications').select('*, account_users(name)').eq('read', false).order('created_at', { ascending: false }),
      supabase.from('admin_notification_config').select('*').limit(1).single(),
      supabase.from('admin_phones').select('*').order('created_at', { ascending: true }),
    ]);

    if (admin) setAdminInfo(admin);
    if (invoices) {
      setItemsSold(invoices.length);
      setShopRevenue(invoices.reduce((s: number, i: any) => s + Number(i.total_amount || 0), 0));
    }
    if (wos) {
      setWoCompleted(wos.length);
      setWoRevenue(wos.reduce((s: number, w: any) => s + Number(w.estimated_price || 0), 0));
    }
    setNotifications(notifs || []);
    if (smsData) setSmsConfig(smsData);
    setAdminPhones(phonesData || []);

    supabase.channel('admin-notifs-dash')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'admin_notifications' }, (payload) => {
        setNotifications(prev => [payload.new as any, ...prev]);
      })
      .subscribe();
  }

  const startEdit = (field: string) => {
    setEditing(p => ({ ...p, [field]: true }));
    setEditValues(p => ({ ...p, [field]: adminInfo?.[field] || '' }));
  };

  const cancelEdit = (field: string) => {
    setEditing(p => ({ ...p, [field]: false }));
  };

  const hasDirty = Object.keys(editing).some(k => editing[k]);

  const saveAll = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;
    setSaving(true);
    const updates: Record<string, string> = {};
    for (const [k, v] of Object.entries(editing)) {
      if (v) updates[k] = editValues[k] || '';
    }
    await supabase.from('admin_users').update(updates).eq('admin_user_id', session.user.id);
    setAdminInfo((prev: any) => ({ ...prev, ...updates }));
    setEditing({});
    setSaving(false);
    setFlash(true);
    setTimeout(() => setFlash(false), 2000);
  };

  const markAllRead = async () => {
    await supabase.from('admin_notifications').update({ read: true }).eq('read', false);
    setNotifications([]);
  };

  const markOneRead = async (id: string, userId: string | null, type: string) => {
    await supabase.from('admin_notifications').update({ read: true }).eq('id', id);
    setNotifications(prev => prev.filter(n => n.id !== id));
    if (type === 'guest_inquiries') {
      window.location.href = `/admin/users/${process.env.NEXT_PUBLIC_GUEST_ACCOUNT_USER_ID}`;
    } else if (userId) {
      window.location.href = `/admin/users/${userId}`;
    }
  };

  const saveSmsToggle = async (field: string, value: boolean) => {
    if (!smsConfig) return;
    setSmsSaving(true);
    await supabase.from('admin_notification_config').update({ [field]: value }).eq('id', smsConfig.id);
    setSmsConfig((prev: any) => ({ ...prev, [field]: value }));
    setSmsSaving(false);
    setSmsFlash(true);
    setTimeout(() => setSmsFlash(false), 2000);
  };

  const addPhone = async () => {
    if (!newPhone.trim()) return;
    setPhoneAdding(true);
    const { data } = await supabase.from('admin_phones').insert({
      phone: newPhone.trim(),
      label: newLabel.trim() || null,
      active: true,
    }).select().single();
    if (data) setAdminPhones(prev => [...prev, data]);
    setNewPhone(''); setNewLabel('');
    setPhoneAdding(false);
  };

  const togglePhone = async (id: string, active: boolean) => {
    await supabase.from('admin_phones').update({ active }).eq('id', id);
    setAdminPhones(prev => prev.map(p => p.id === id ? { ...p, active } : p));
  };

  const deletePhone = async (id: string) => {
    await supabase.from('admin_phones').delete().eq('id', id);
    setAdminPhones(prev => prev.filter(p => p.id !== id));
  };

  return {
    adminInfo, editing, editValues, saving, flash,
    itemsSold, shopRevenue, woCompleted, woRevenue,
    notifications, smsConfig, smsSaving, smsFlash,
    adminPhones, newPhone, newLabel, phoneAdding,
    startEdit, cancelEdit, saveAll,
    markAllRead, markOneRead,
    saveSmsToggle, addPhone, togglePhone, deletePhone,
    setNewPhone, setNewLabel, setEditValues,
    hasDirty,
  };
}
