import { useState, useEffect } from 'react';
import type { Session, RealtimeChannel } from '@supabase/supabase-js';
import { supabase } from '../../../../lib/supabase';

// ── Row types (per Supabase schema) ──────────────────────────────────────────

interface AccountProfile {
  account_user_id:        string;
  created_at:             string;
  name:                   string;
  email:                  string;
  phone:                  string | null;
  shipping_address:       string | null;
  status:                 'ACTIVE' | 'INACTIVE' | 'BANNED';
  updated_at:             string;
  business_name:          string | null;
  auth_user_id:           string | null;
  deleted_at:             string | null;
  deleted_reason:         string | null;
  wizard_terms_accepted:  boolean | null;
}

interface SmsPrefs {
  id:                  string;
  user_id:             string | null;
  phone:               string;
  opt_in_work_orders:  boolean | null;
  opt_in_tracking:     boolean | null;
  opt_in_chat:         boolean | null;
  opt_in_purchases:    boolean | null;
  opt_in_new_listings: boolean | null;
  created_at:          string | null;
}

interface InvoiceCountRow {
  invoice_id:   string;
  total_amount: number;
}

interface InvoiceRow {
  invoice_id:               string;
  created_at:               string;
  account_user_id:          string;
  stripe_session_id:        string;
  stripe_payment_intent_id: string | null;
  invoice_state:            'PAID' | 'ARCHIVED';
  paid_at:                  string;
  line_items:               unknown;
  total_amount:             number;
  account_snapshot:         unknown;
  admin_snapshot:           unknown;
  archived_at:              string | null;
  updated_at:               string;
}

interface EditHistoryEntry {
  action: string;
  by:     string;
  at:     string;
}

interface WorkOrderRow {
  work_order_id:        string;
  created_at:           string;
  account_user_id:      string;
  created_by_admin_id:  string;
  title:                string;
  description:          string;
  service_type:         string | null;
  gem_type:             string | null;
  estimated_price:      number | null;
  notes:                string | null;
  status:               'CREATED' | 'ACCEPTED' | 'COMPLETE' | 'CANCELLED' | 'CONFIRMED';
  accepted_at:          string | null;
  completed_at:         string | null;
  edit_history:         EditHistoryEntry[];
  updated_at:           string;
  cancelled_at:         string | null;
  cancel_reason:        string | null;
  estimated_turnaround: string | null;
  wo_shipping_address:  string | null;
  stripe_payment_link:  string | null;
  paid_outside_site:    boolean | null;
  confirmed_at:         string | null;
  wo_recipient_name:    string | null;
  wo_admin_name:        string | null;
  wo_admin_address:     string | null;
  wo_admin_phone:       string | null;
  wo_admin_email:       string | null;
  wo_client_name:       string | null;
  wo_client_phone:      string | null;
  wo_client_email:      string | null;
}

interface AdminInfo {
  business_name: string | null;
  full_name:     string | null;
  address:       string | null;
  phone:         string | null;
  contact_email: string | null;
}

interface InquiryProductJoin {
  title:       string;
  weight:      number | null;
  shape:       string | null;
  total_price: number;
}

interface InquiryRow {
  account_inquiry_id:  string;
  created_at:          string;
  account_user_id:     string;
  description:         string;
  photo_url:           string | null;
  is_read:             boolean;
  read_at:             string | null;
  updated_at:          string;
  product_id:          string | null;
  reply:               string | null;
  replied_at:          string | null;
  replied_by_admin_id: string | null;
  status:              string | null;
  is_archived:         boolean;
  products:            InquiryProductJoin | null;
}

interface ServiceRequestRow {
  service_request_id: string;
  created_at:         string;
  account_user_id:    string;
  description:        string;
  photo_url:          string | null;
  is_read:            boolean;
  read_at:            string | null;
  updated_at:         string;
  subject:            string | null;
  service_type:       string | null;
  wizard_result_id:   string | null;
  is_archived:        boolean;
  gem_type:           string | null;
  gem_color:          string | null;
  weight_ct:          number | null;
  dim_length_mm:      number | null;
  photo_urls:         string[] | null;
}

interface ChatThreadRow {
  chat_thread_id:       string;
  created_at:           string;
  account_user_id:      string;
  admin_has_unread:     boolean;
  account_has_unread:   boolean;
  last_message_at:      string | null;
  last_message_preview: string | null;
  updated_at:           string;
  auth_user_id:         string | null;
}

interface ChatMessageRow {
  chat_message_id: string;
  created_at:      string;
  chat_thread_id:  string;
  actor:           'ADMIN' | 'ACCOUNT' | 'SYSTEM';
  actor_id:        string;
  body:            string | null;
  attachment_url:  string | null;
  attachment_type: string | null;
}

interface WizardResultRow {
  id:                       string;
  user_id:                  string;
  created_at:               string;
  stone_species:            string | null;
  stone_variety:            string | null;
  stone_weight_ct:          string | null;
  stone_dimensions:         string | null;
  stone_cut:                string | null;
  feasibility_percent:      number;
  band:                     string;
  recommendation:           string;
  weight_loss:              string;
  positive_selections:      unknown;
  limiting_selections:      unknown;
  structural_selections:    unknown;
  correctable_selections:   unknown;
  raw_scores:               unknown;
  disclaimer1_confirmed_at: string | null;
  disclaimer2_confirmed_at: string | null;
  is_archived:              boolean;
  folder_id:                string | null;
}

export function useAccountData(session: Session | null) {
  const [profile, setProfile] = useState<AccountProfile | null>(null);
  const [smsPrefs, setSmsPrefs] = useState<SmsPrefs | null>(null);
  const [invoices, setInvoices] = useState<InvoiceRow[]>([]);
  const [invoiceCount, setInvoiceCount] = useState(0);
  const [invoiceTotal, setInvoiceTotal] = useState(0);
  const [workOrders, setWorkOrders] = useState<WorkOrderRow[]>([]);
  const [inquiries, setInquiries] = useState<InquiryRow[]>([]);
  const [serviceRequests, setServiceRequests] = useState<ServiceRequestRow[]>([]);
  const [adminInfo, setAdminInfo] = useState<AdminInfo | null>(null);
  const [chatThread, setChatThread] = useState<ChatThreadRow | null>(null);
  const [messages, setMessages] = useState<ChatMessageRow[]>([]);
  const [latestWizardResult, setLatestWizardResult] = useState<WizardResultRow | null>(null);
  const [loading, setLoading] = useState(true);

  // ── Manual refresh functions ──
  // These exist as fallbacks for when realtime events don't arrive (for example,
  // if realtime replication isn't enabled on a table at the supabase level, or
  // the WebSocket is reconnecting). Child components call these after performing
  // a write so the UI updates even if realtime misses.
  const refreshInquiries = async () => {
    if (!session) return;
    const { data } = await supabase
      .from('account_inquiries')
      .select(`*, products(title, weight, shape, total_price)`)
      .eq('account_user_id', session.user.id)
      .order('created_at', { ascending: false });
    if (data) setInquiries(data as InquiryRow[]);
  };

  const refreshServiceRequests = async () => {
    if (!session) return;
    const { data } = await supabase
      .from('service_requests')
      .select('*')
      .eq('account_user_id', session.user.id)
      .order('created_at', { ascending: false });
    if (data) setServiceRequests(data as ServiceRequestRow[]);
  };

  useEffect(() => {
    if (!session) return;
    const uid = session.user.id;
    let woChannel: RealtimeChannel | null = null;
    let chatChannel: RealtimeChannel | null = null;
    let srChannel: RealtimeChannel | null = null;
    let inqChannel: RealtimeChannel | null = null;

    async function loadAll() {
      const [
        { data: p },
        { data: prefs },
        { data: invs },
        { data: wo },
        { data: admin },
        { data: inq },
        { data: sr },
        { data: inv },
        { data: thread },
      ] = await Promise.all([
        supabase.from('account_users').select('*').eq('account_user_id', uid).single(),
        supabase.from('user_sms_preferences').select('*').eq('user_id', uid).single(),
        supabase.from('invoices').select('invoice_id, total_amount').eq('account_user_id', uid),
        supabase.from('work_orders').select('*').eq('account_user_id', uid).order('created_at', { ascending: false }),
        supabase.from('admin_users').select('business_name, full_name, address, phone, contact_email').single(),
        // ── Join products so inquiry cards show product name, weight, shape, price ──
        supabase
          .from('account_inquiries')
          .select(`
            *,
            products (
              title,
              weight,
              shape,
              total_price
            )
          `)
          .eq('account_user_id', uid)
          .order('created_at', { ascending: false }),
        supabase.from('service_requests').select('*').eq('account_user_id', uid).order('created_at', { ascending: false }),
        supabase.from('invoices').select('*').eq('account_user_id', uid).order('paid_at', { ascending: false }),
        supabase.from('chat_threads').select('*').eq('account_user_id', uid).single(),
      ]);

      setProfile((p as AccountProfile | null) ?? null);
      setSmsPrefs((prefs as SmsPrefs | null) ?? null);
      if (invs) {
        const counts = invs as InvoiceCountRow[];
        setInvoiceCount(counts.length);
        setInvoiceTotal(counts.reduce((s, i) => s + Number(i.total_amount || 0), 0));
      }
      setWorkOrders((wo as WorkOrderRow[]) || []);
      setAdminInfo((admin as AdminInfo | null) ?? null);
      setInquiries((inq as InquiryRow[]) || []);
      setServiceRequests((sr as ServiceRequestRow[]) || []);
      setInvoices((inv as InvoiceRow[]) || []);

      srChannel = supabase.channel('user-sr-' + uid)
        .on('postgres_changes', {
          event: '*', schema: 'public', table: 'service_requests',
          filter: `account_user_id=eq.${uid}`,
        }, (payload) => {
          if (payload.eventType === 'INSERT') {
            setServiceRequests(prev => [payload.new as ServiceRequestRow, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            const updated = payload.new as ServiceRequestRow;
            setServiceRequests(prev => prev.map(s =>
              s.service_request_id === updated.service_request_id ? updated : s
            ));
          } else if (payload.eventType === 'DELETE') {
            const removed = payload.old as Partial<ServiceRequestRow>;
            setServiceRequests(prev => prev.filter(s => s.service_request_id !== removed.service_request_id));
          }
        }).subscribe();

      setChatThread((thread as ChatThreadRow | null) ?? null);

      woChannel = supabase.channel('user-wo-' + uid)
        .on('postgres_changes', { event: '*', schema: 'public', table: 'work_orders', filter: `account_user_id=eq.${uid}` },
          (payload) => {
            if (payload.eventType === 'INSERT') setWorkOrders(prev => [payload.new as WorkOrderRow, ...prev]);
            else if (payload.eventType === 'UPDATE') setWorkOrders(prev => prev.map(w =>
              w.work_order_id === (payload.new as WorkOrderRow).work_order_id ? (payload.new as WorkOrderRow) : w));
          }).subscribe();

      // ── Realtime inquiries — new submissions + admin replies ──
      inqChannel = supabase.channel('user-inq-' + uid)
        .on('postgres_changes', {
          event: 'INSERT',
          schema: 'public',
          table: 'account_inquiries',
          filter: `account_user_id=eq.${uid}`,
        }, async () => {
          // Re-fetch with product join so new inquiry has full product info
          const { data: fresh } = await supabase
            .from('account_inquiries')
            .select(`*, products(title, weight, shape, total_price)`)
            .eq('account_user_id', uid)
            .order('created_at', { ascending: false });
          if (fresh) setInquiries(fresh as InquiryRow[]);
        })
        .on('postgres_changes', {
          event: 'UPDATE',
          schema: 'public',
          table: 'account_inquiries',
          filter: `account_user_id=eq.${uid}`,
        }, (payload) => {
          // Admin replied — update in place but KEEP the existing `products` join,
          // since payload.new only contains raw account_inquiries columns and would
          // otherwise wipe the product info off the card.
          const incoming = payload.new as Omit<InquiryRow, 'products'>;
          setInquiries(prev => prev.map(inq =>
            inq.account_inquiry_id === incoming.account_inquiry_id
              ? { ...inq, ...incoming, products: inq.products }
              : inq
          ));
        })
        .subscribe();

      if (thread) {
        const threadRow = thread as ChatThreadRow;
        const { data: msgs } = await supabase.from('chat_messages').select('*')
          .eq('chat_thread_id', threadRow.chat_thread_id).order('created_at', { ascending: true });
        setMessages(((msgs as ChatMessageRow[]) || []));
        if (typeof window !== 'undefined' && window.innerWidth >= 768) {
          await supabase.from('chat_threads').update({ account_has_unread: false }).eq('chat_thread_id', threadRow.chat_thread_id);
        }
        chatChannel = supabase.channel('user-chat-' + threadRow.chat_thread_id)
          .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chat_messages', filter: `chat_thread_id=eq.${threadRow.chat_thread_id}` },
            (payload) => {
              const newMsg = payload.new as ChatMessageRow;
              setMessages(prev => {
                const filtered = prev.filter(m => !m.chat_message_id.startsWith('opt-') || m.body !== newMsg.body);
                if (filtered.some(m => m.chat_message_id === newMsg.chat_message_id)) return filtered;
                return [...filtered, newMsg];
              });
            }).subscribe();
      }

      const { data: wiz } = await supabase.from('wizard_results').select('*')
        .eq('user_id', uid)
        .order('created_at', { ascending: false }).limit(1).maybeSingle();
      if (wiz) setLatestWizardResult(wiz as WizardResultRow);
      setLoading(false);
    }

    loadAll();
    return () => {
      if (woChannel) supabase.removeChannel(woChannel);
      if (chatChannel) supabase.removeChannel(chatChannel);
      if (srChannel) supabase.removeChannel(srChannel);
      if (inqChannel) supabase.removeChannel(inqChannel);
    };
  }, [session]);

  return {
    profile, setProfile,
    smsPrefs, setSmsPrefs,
    invoices, setInvoices,
    invoiceCount, invoiceTotal,
    workOrders, setWorkOrders,
    inquiries, setInquiries,
    serviceRequests, setServiceRequests,
    adminInfo,
    chatThread, setChatThread,
    messages, setMessages,
    latestWizardResult,
    loading,
    // Manual refresh callbacks for fallback when realtime misses.
    refreshInquiries,
    refreshServiceRequests,
  };
}
