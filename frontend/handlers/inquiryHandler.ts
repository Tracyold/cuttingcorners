// frontend/handlers/inquiryHandler.ts
//
// Reusable inquiry action handler.
// Inquiry logic is duplicated across:
//   - shop.tsx (guest + account inquiry submission)
//   - useAdminUserInquiries (admin: open, markRead, reply, unarchive)
//   - 1InquiryList.ts (submitInquiryReply)
//
// This handler extracts the shared DB mutations.

import { supabase } from '../lib/supabase'
import { notifyAdmin } from './notificationHandler'

// ── Types ──────────────────────────────────────────────────────────────────

export interface AccountInquiryParams {
  accountUserId: string
  description: string
  productId: string
  photoUrl?: string | null
}

export interface GuestInquiryParams {
  name: string
  email: string
  phone: string
  shippingAddress: string
  description: string
  productId: string
  photoUrl?: string | null
}

export interface InquiryReplyParams {
  inquiryId: string
  reply: string
  adminId: string
}

// ── Account inquiry submission ─────────────────────────────────────────────

/**
 * Submit an inquiry from an authenticated account user.
 * Exact from shop.tsx handleInquiryDescSubmit() (isRealUser branch).
 */
export async function submitAccountInquiry(params: AccountInquiryParams): Promise<{ error: string | null }> {
  const { error } = await supabase.from('account_inquiries').insert({
    account_user_id: params.accountUserId,
    description: params.description,
    product_id: params.productId,
    photo_url: params.photoUrl ?? null,
  })

  if (error) return { error: error.message }

  await notifyAdmin({ event_type: 'account_inquiries', user_id: params.accountUserId })

  return { error: null }
}

// ── Guest inquiry submission ───────────────────────────────────────────────

/**
 * Submit an inquiry from a guest (not logged in).
 * Exact from shop.tsx handleInquiryDescSubmit() (guest branch).
 */
export async function submitGuestInquiry(params: GuestInquiryParams): Promise<{ error: string | null }> {
  const { error } = await supabase.from('guest_inquiries').insert({
    name: params.name,
    email: params.email,
    phone: params.phone,
    shipping_address: params.shippingAddress,
    description: params.description,
    product_id: params.productId,
    photo_url: params.photoUrl ?? null,
  })

  if (error) return { error: error.message }

  await notifyAdmin({ event_type: 'guest_inquiries', guest_name: params.name })

  return { error: null }
}

// ── Admin: mark inquiry as read ────────────────────────────────────────────

/**
 * Mark an account inquiry as read.
 * Exact from useAdminUserInquiries.markInqRead().
 */
export async function markInquiryRead(inquiryId: string): Promise<{ error: string | null }> {
  const { error } = await supabase
    .from('account_inquiries')
    .update({ is_read: true, read_at: new Date().toISOString() })
    .eq('account_inquiry_id', inquiryId)

  return { error: error?.message ?? null }
}

// ── Admin: reply to inquiry ────────────────────────────────────────────────

/**
 * Admin replies to an account inquiry.
 * Exact from useAdminUserInquiries.sendReply() and 1InquiryList.submitInquiryReply().
 */
export async function replyToInquiry(params: InquiryReplyParams): Promise<{ error: string | null; repliedAt: string }> {
  const now = new Date().toISOString()

  const { error } = await supabase
    .from('account_inquiries')
    .update({
      reply: params.reply.trim(),
      replied_at: now,
      replied_by_admin_id: params.adminId,
      status: 'replied',
    })
    .eq('account_inquiry_id', params.inquiryId)

  return { error: error?.message ?? null, repliedAt: now }
}

// ── Admin: unarchive inquiry ───────────────────────────────────────────────

/**
 * Recover an archived inquiry back to active.
 * Exact from useAdminUserInquiries.unarchiveInquiry().
 */
export async function unarchiveInquiry(inquiryId: string): Promise<{ error: string | null }> {
  const { error } = await supabase
    .from('account_inquiries')
    .update({ is_archived: false })
    .eq('account_inquiry_id', inquiryId)

  return { error: error?.message ?? null }
}

// ── Fetch inquiry with product join ────────────────────────────────────────

/**
 * Fetch product details for an inquiry.
 * Exact from useAdminUserInquiries.openInquiry().
 */
export async function fetchInquiryProduct(productId: string): Promise<any | null> {
  const { data } = await supabase
    .from('products')
    .select('*')
    .eq('product_id', productId)
    .single()

  return data || null
}
