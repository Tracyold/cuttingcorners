// comp/admin/mobile/panels/users/hooks/useAdminUserInquiries.ts
// Direct extract from [id].tsx — openInquiry, markInqRead.
// Admin extras: unarchiveInquiry (recover archived items for user).
// Panels and drawers import this hook and use what they need.

import { useState } from 'react';
import { supabase } from '../../../../../../lib/supabase';

export function useAdminUserInquiries(
  id: string,
  setInquiries: (fn: (prev: any[]) => any[]) => void,
) {
  const [selectedInq,        setSelectedInq]        = useState<any>(null);
  const [selectedInqProduct, setSelectedInqProduct] = useState<any>(null);
  const [selectedArchivedInq, setSelectedArchivedInq] = useState<any>(null);

  const isGuest = id === process.env.NEXT_PUBLIC_GUEST_ACCOUNT_USER_ID;

  const productUrl = selectedInqProduct?.photo_url
    ? selectedInqProduct.photo_url.startsWith('http')
      ? selectedInqProduct.photo_url
      : `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/product-photos/${selectedInqProduct.photo_url}`
    : null;

  // Exact from [id].tsx openInquiry()
  const openInquiry = async (item: any) => {
    setSelectedInq(item);
    if (item.product_id) {
      const { data } = await supabase.from('products').select('*').eq('product_id', item.product_id).single();
      setSelectedInqProduct(data || null);
    } else {
      setSelectedInqProduct(null);
    }
  };

  // Exact from [id].tsx markInqRead()
  const markInqRead = async (item: any) => {
    await supabase.from('account_inquiries')
      .update({ is_read: true, read_at: new Date().toISOString() })
      .eq('account_inquiry_id', item.account_inquiry_id);
    setInquiries(prev =>
      prev.map(i => i.account_inquiry_id === item.account_inquiry_id ? { ...i, is_read: true } : i)
    );
  };

  const closeInquiry = () => {
    setSelectedInq(null);
    setSelectedInqProduct(null);
  };

  // Admin replies to an account inquiry — writes reply + replied_at
  // Displays immediately inside the user's inquiry card in 3InquiriesPanel
  const sendReply = async (item: any, replyText: string) => {
    if (!replyText.trim()) return;
    const now = new Date().toISOString();
    const { error } = await supabase
      .from('account_inquiries')
      .update({ reply: replyText.trim(), replied_at: now })
      .eq('account_inquiry_id', item.account_inquiry_id);
    if (error) { console.error('Reply failed:', error.message); return; }
    setInquiries(prev =>
      prev.map(i =>
        i.account_inquiry_id === item.account_inquiry_id
          ? { ...i, reply: replyText.trim(), replied_at: now }
          : i
      )
    );
    // Update selectedInq so the drawer reflects the new reply immediately
    setSelectedInq((prev: any) =>
      prev ? { ...prev, reply: replyText.trim(), replied_at: now } : prev
    );
  };

  // Admin only — recover an archived inquiry back to active
  const unarchiveInquiry = async (item: any) => {
    const { error } = await supabase
      .from('account_inquiries')
      .update({ is_archived: false })
      .eq('account_inquiry_id', item.account_inquiry_id);
    if (error) { console.error('Unarchive inquiry failed:', error.message); return; }
    setInquiries(prev =>
      prev.map(i => i.account_inquiry_id === item.account_inquiry_id ? { ...i, is_archived: false } : i)
    );
    setSelectedArchivedInq(null);
  };

  return {
    selectedInq, setSelectedInq,
    selectedInqProduct, setSelectedInqProduct,
    selectedArchivedInq, setSelectedArchivedInq,
    isGuest,
    productUrl,
    openInquiry,
    markInqRead,
    closeInquiry,
    sendReply,
    unarchiveInquiry,
  };
}