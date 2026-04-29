// frontend/components/admin/users/hooks/useAdminUserInquiries.ts
//
// Extracted from pages/admin/users/[id].tsx — openInquiry + markInqRead.
// Receives setInquiries from useAdminUserDetail so state lives in one place.

import { useState } from 'react';
import { supabase } from '../../../../lib/supabase';

export interface AdminUserInquiriesData {
  selectedInq:           any;
  selectedInqProduct:    any;
  setSelectedInq:        (i: any) => void;
  setSelectedInqProduct: (p: any) => void;
  openInquiry:           (item: any) => Promise<void>;
  markInqRead:           (item: any) => Promise<void>;
}

export function useAdminUserInquiries(
  setInquiries: (fn: any) => void,
): AdminUserInquiriesData {
  const [selectedInq,        setSelectedInq]        = useState<any>(null);
  const [selectedInqProduct, setSelectedInqProduct] = useState<any>(null);

  // Exact logic from [id].tsx openInquiry()
  const openInquiry = async (item: any) => {
    setSelectedInq(item);
    if (item.product_id) {
      const { data } = await supabase
        .from('products').select('*')
        .eq('product_id', item.product_id).single();
      setSelectedInqProduct(data || null);
    } else {
      setSelectedInqProduct(null);
    }
  };

  // Exact logic from [id].tsx markInqRead()
  const markInqRead = async (item: any) => {
    await supabase
      .from('account_inquiries')
      .update({ is_read: true, read_at: new Date().toISOString() })
      .eq('account_inquiry_id', item.account_inquiry_id);
    setInquiries((prev: any[]) =>
      prev.map(i =>
        i.account_inquiry_id === item.account_inquiry_id
          ? { ...i, is_read: true }
          : i
      )
    );
  };

  return {
    selectedInq, selectedInqProduct,
    setSelectedInq, setSelectedInqProduct,
    openInquiry, markInqRead,
  };
}
