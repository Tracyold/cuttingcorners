// frontend/components/admin/hooks/useAdminUsers.ts
//
// Extracts all data fetching and actions from pages/admin/users/index.tsx.

import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';

export type UsersTab = 'active' | 'archived';

export interface AdminUsersData {
  users:         any[];
  archivedUsers: any[];
  guestUser:     any;
  loading:       boolean;
  search:        string;
  sortField:     string;
  sortDir:       'asc' | 'desc';
  unreadCounts:  Record<string, number>;
  activeTab:     UsersTab;
  restoring:     string | null;
  restoreMsg:    string;
  sorted:        any[];
  guestUnread:   number;
  setSearch:     (v: string) => void;
  setActiveTab:  (t: UsersTab) => void;
  handleSort:    (field: string) => void;
  restoreAccount:(userId: string) => Promise<void>;
  load:          () => Promise<void>;
}

export function useAdminUsers(): AdminUsersData {
  const [users,         setUsers]         = useState<any[]>([]);
  const [archivedUsers, setArchivedUsers] = useState<any[]>([]);
  const [guestUser,     setGuestUser]     = useState<any>(null);
  const [loading,       setLoading]       = useState(true);
  const [search,        setSearch]        = useState('');
  const [sortField,     setSortField]     = useState('created_at');
  const [sortDir,       setSortDir]       = useState<'asc' | 'desc'>('desc');
  const [unreadCounts,  setUnreadCounts]  = useState<Record<string, number>>({});
  const [activeTab,     setActiveTab]     = useState<UsersTab>('active');
  const [restoring,     setRestoring]     = useState<string | null>(null);
  const [restoreMsg,    setRestoreMsg]    = useState('');

  useEffect(() => { load(); }, []);

  const load = async () => {
    const guestId = process.env.NEXT_PUBLIC_GUEST_ACCOUNT_USER_ID;

    if (guestId) {
      const { data: g } = await supabase
        .from('account_users').select('*')
        .eq('account_user_id', guestId).single();
      setGuestUser(g);
    }

    const { data } = await supabase
      .from('account_users').select('*')
      .neq('account_user_id', guestId || '')
      .is('deleted_at', null)
      .order('created_at', { ascending: false });
    setUsers(data || []);

    const { data: archived } = await supabase
      .from('account_users').select('*')
      .neq('account_user_id', guestId || '')
      .not('deleted_at', 'is', null)
      .order('deleted_at', { ascending: false });
    setArchivedUsers(archived || []);

    const { data: notifs } = await supabase
      .from('admin_notifications').select('user_id').eq('read', false);
    if (notifs) {
      const counts: Record<string, number> = {};
      notifs.forEach(n => { if (n.user_id) counts[n.user_id] = (counts[n.user_id] || 0) + 1; });
      setUnreadCounts(counts);
    }

    setLoading(false);

    supabase.channel('user-list-notifs')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'admin_notifications' },
        (payload: any) => {
          const uid = payload.new?.user_id;
          if (uid) setUnreadCounts(prev => ({ ...prev, [uid]: (prev[uid] || 0) + 1 }));
        })
      .subscribe();
  };

  const restoreAccount = async (userId: string) => {
    setRestoring(userId);
    setRestoreMsg('');
    const { error } = await supabase.rpc('restore_account', { user_id: userId });
    if (error) {
      setRestoreMsg('Restore failed: ' + error.message);
    } else {
      setRestoreMsg('Account restored successfully.');
      const guestId = process.env.NEXT_PUBLIC_GUEST_ACCOUNT_USER_ID || '';
      const { data: active } = await supabase.from('account_users').select('*')
        .neq('account_user_id', guestId).is('deleted_at', null)
        .order('created_at', { ascending: false });
      setUsers(active || []);
      const { data: arch } = await supabase.from('account_users').select('*')
        .neq('account_user_id', guestId).not('deleted_at', 'is', null)
        .order('deleted_at', { ascending: false });
      setArchivedUsers(arch || []);
    }
    setRestoring(null);
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      if (sortDir === 'asc') setSortDir('desc');
      else { setSortField('created_at'); setSortDir('desc'); }
    } else { setSortField(field); setSortDir('asc'); }
  };

  const sourceList = activeTab === 'active' ? users : archivedUsers;
  const filtered = sourceList.filter(u => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      (u.name  || '').toLowerCase().includes(q) ||
      (u.email || '').toLowerCase().includes(q) ||
      (u.phone || '').toLowerCase().includes(q)
    );
  });

  const sorted = [...filtered].sort((a, b) => {
    const av = a[sortField] || ''; const bv = b[sortField] || '';
    const cmp = av < bv ? -1 : av > bv ? 1 : 0;
    return sortDir === 'asc' ? cmp : -cmp;
  });

  const guestId    = process.env.NEXT_PUBLIC_GUEST_ACCOUNT_USER_ID || '';
  const guestUnread = unreadCounts[guestId] || 0;

  return {
    users, archivedUsers, guestUser, loading,
    search, sortField, sortDir,
    unreadCounts, activeTab, restoring, restoreMsg,
    sorted, guestUnread,
    setSearch, setActiveTab, handleSort,
    restoreAccount, load,
  };
}
