// lib/inquiryService.ts
// Pure async write helpers for the public.account_inquiries table.

import { supabase } from './supabase';

export interface SubmitInquiryParams {
  accountUserId: string;
  productId:     string;
  description:   string;
}

export interface SubmitInquiryResult {
  inquiryId: string | null;
  error:     string | null;
}

/**
 * Insert a new account inquiry. Caller is responsible for trimming inputs.
 *
 * Schema: public.account_inquiries
 *   - account_user_id uuid     NOT NULL
 *   - product_id      uuid     NULL
 *   - description     text     NOT NULL
 *   - status          text     NULL
 */
export async function submitInquiry(params: SubmitInquiryParams): Promise<SubmitInquiryResult> {
  const { data, error } = await supabase
    .from('account_inquiries')
    .insert({
      account_user_id: params.accountUserId,
      product_id:      params.productId,
      description:     params.description,
      status:          'pending',
    })
    .select('account_inquiry_id')
    .maybeSingle();

  if (error) {
    return { inquiryId: null, error: error.message || 'Could not send inquiry. Please try again.' };
  }
  return { inquiryId: data?.account_inquiry_id ?? null, error: null };
}
