// comp/admin/mobile/panels/users/hooks/useAdminUserDetail.ts
// Direct extract of loadAll() from [id].tsx — all data, all setters, realtime.

import { useState, useEffect } from 'react';
import { supabase } from '../../../../../../lib/supabase';

export function useAdminUserDetail(id: string | undefined, session: any) {
  const [user,            setUser]           = useState<any>(null);
  const [adminInfo,       setAdminInfo]      = useState<any>(null);
  const [inquiries,       setInquiries]      = useState<any[]>([]);
  const [guestInquiries,  setGuestInquiries] = useState<any[]>([]);
  const [serviceRequests, setSR]             = useState<any[]>([]);
  const [workOrders,      setWO]             = useState<any[]>([]);
  const [invoices,        setInvoices]       = useState<any[]>([]);
  const [chatThread,      setChatThread]     = useState<any>(null);
  const [messages,        setMessages]       = useState<any[]>([]);
  const [woCount,         setWoCount]        = useState(0);
  const [invTotal,        setInvTotal]       = useState(0);
  const [inqCount,        setInqCount]       = useState(0);
  const [srCount,         setSrCount]        = useState(0);

  useEffect(() => {
    if (!id || !session) return;
    let channel: any = null;

    async function loadAll() {
      const uid = id as string;

      const { data: u } = await supabase.from('account_users').select('*').eq('account_user_id', uid).single();
      setUser(u);

      const { data: admin } = await supabase.from('admin_users').select('*').single();
      setAdminInfo(admin);

      const { data: inq } = await supabase.from('account_inquiries').select('*').eq('account_user_id', uid).order('created_at', { ascending: false });
      setInquiries(inq || []);
      setInqCount(inq?.length || 0);

      const guestId = process.env.NEXT_PUBLIC_GUEST_ACCOUNT_USER_ID;
      if (uid === guestId) {
        const { data: gInq } = await supabase.from('guest_inquiries').select('*').order('created_at', { ascending: false });
        setGuestInquiries(gInq || []);
        setInqCount((gInq?.length || 0) + (inq?.length || 0));
      }

      const { data: sr } = await supabase.from('service_requests').select('*, wizard_results(*)').eq('account_user_id', uid).order('created_at', { ascending: false });
      setSR(sr || []);
      setSrCount(sr?.length || 0);

      const { data: wo } = await supabase.from('work_orders').select('*').eq('account_user_id', uid).order('created_at', { ascending: false });
      setWO(wo || []);
      setWoCount(wo?.length || 0);

      const { data: inv } = await supabase.from('invoices').select('*').eq('account_user_id', uid).order('paid_at', { ascending: false });
      setInvoices(inv || []);
      setInvTotal(inv?.reduce((s: number, i: any) => s + Number(i.total_amount || 0), 0) || 0);

      const { data: thread } = await supabase.from('chat_threads').select('*').eq('account_user_id', uid).single();
      setChatThread(thread);

      if (thread) {
        const { data: msgs } = await supabase.from('chat_messages').select('*').eq('chat_thread_id', thread.chat_thread_id).order('created_at', { ascending: true });
        setMessages(msgs || []);

        channel = supabase.channel('admin-chat-' + thread.chat_thread_id)
          .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chat_messages', filter: `chat_thread_id=eq.${thread.chat_thread_id}` },
            (payload) => {
              const newMsg = payload.new as any;
              setMessages(prev => {
                const filtered = prev.filter(m => !m.chat_message_id.startsWith('opt-') || m.body !== newMsg.body);
                if (filtered.some(m => m.chat_message_id === newMsg.chat_message_id)) return filtered;
                return [...filtered, newMsg];
              });
            })
          .subscribe();
      }
    }

    loadAll();
    return () => { if (channel) supabase.removeChannel(channel); };
  }, [id, session]);

  return {
    user, setUser,
    adminInfo,
    inquiries, setInquiries,
    guestInquiries,
    serviceRequests, setSR,
    workOrders, setWO,
    invoices,
    chatThread,
    messages, setMessages,
    woCount, setWoCount,
    invTotal,
    inqCount,
    srCount,
  };
}