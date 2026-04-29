// comp/admin/mobile/panels/users/hooks/useAdminUserDashboard.ts
// Extract from [id].tsx — dashboard tab data + showEditUser state.
// Owns: user, woCount, invTotal, inqCount, srCount, showEditUser.
// Panel imports this hook only — no need to also call useAdminUserDetail.

import { useState, useEffect } from 'react';
import { supabase } from '../../../../../../lib/supabase';

export function useAdminUserDashboard(id: string | undefined, session: any) {
  const [user,         setUser]        = useState<any>(null);
  const [woCount,      setWoCount]     = useState(0);
  const [invTotal,     setInvTotal]    = useState(0);
  const [inqCount,     setInqCount]    = useState(0);
  const [srCount,      setSrCount]     = useState(0);
  const [showEditUser, setShowEditUser] = useState(false);

  useEffect(() => {
    if (!id || !session) return;

    async function loadDashboard() {
      const uid = id as string;

      // Exact from [id].tsx loadAll() — user + adminInfo + counts
      const { data: u } = await supabase
        .from('account_users').select('*')
        .eq('account_user_id', uid).single();
      setUser(u);

      const { data: wo } = await supabase
        .from('work_orders').select('work_order_id')
        .eq('account_user_id', uid);
      setWoCount(wo?.length || 0);

      const { data: inv } = await supabase
        .from('invoices').select('total_amount')
        .eq('account_user_id', uid);
      setInvTotal(inv?.reduce((s: number, i: any) => s + Number(i.total_amount || 0), 0) || 0);

      const { data: inq } = await supabase
        .from('account_inquiries').select('account_inquiry_id')
        .eq('account_user_id', uid);
      let total = inq?.length || 0;

      const guestId = process.env.NEXT_PUBLIC_GUEST_ACCOUNT_USER_ID;
      if (uid === guestId) {
        const { data: gInq } = await supabase
          .from('guest_inquiries').select('guest_inquiry_id');
        total += gInq?.length || 0;
      }
      setInqCount(total);

      const { data: sr } = await supabase
        .from('service_requests').select('service_request_id')
        .eq('account_user_id', uid);
      setSrCount(sr?.length || 0);
    }

    loadDashboard();
  }, [id, session]);

  return {
    user, setUser,
    woCount,
    invTotal,
    inqCount,
    srCount,
    showEditUser, setShowEditUser,
  };
}