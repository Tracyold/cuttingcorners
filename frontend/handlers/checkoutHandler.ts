// frontend/handlers/checkoutHandler.ts
//
// Reusable checkout / purchase flow handler.
// Extracted from shop.tsx handleBuyClick() + handleCheckout().
// The shop page has inline logic for building the checkout payload,
// calling the API, and redirecting. This handler makes it reusable
// for any future purchase surface (account shop tab, mobile shop, etc).

import { supabase } from '../lib/supabase'

// ── Types ──────────────────────────────────────────────────────────────────

export interface BuyerInfo {
  name: string
  email: string
  phone: string
  shippingAddress: string
  businessName: string | null
}

export interface AdminSnapshot {
  businessName: string | null
  fullName: string | null
  address: string | null
  phone: string | null
  contactEmail: string | null
}

export interface CheckoutProduct {
  product_id: string
  title: string
  gem_type: string | null
  shape: string | null
  weight: number | null
  color: string | null
  origin: string | null
  treatment: string | null
  description: string | null
  price_per_carat: number | null
  total_price: number
  gia_report_number: string | null
  gia_report_pdf_url: string | null
  photo_url: string | null
}

export interface CheckoutResult {
  url?: string
  error?: string
}

// ── Fetch admin info for invoice preview ───────────────────────────────────

/**
 * Fetch admin business info for the invoice preview.
 * Exact from shop.tsx handleBuyClick().
 */
export async function fetchAdminInfo(): Promise<any | null> {
  const { data } = await supabase
    .from('admin_users')
    .select('business_name, full_name, address, phone, contact_email')
    .single()

  return data
}

// ── Build buyer info ───────────────────────────────────────────────────────

/**
 * Build buyer info from either a session user or guest info.
 * Exact from shop.tsx buyerInfo derivation.
 */
export function buildBuyerInfo(
  accountUser: any | null,
  guestInfo: { name: string; email: string; phone: string; address: string } | null,
): BuyerInfo {
  if (accountUser) {
    return {
      name: accountUser.name || '',
      email: accountUser.email || '',
      phone: accountUser.phone || '',
      shippingAddress: accountUser.shipping_address || '',
      businessName: accountUser.business_name || null,
    }
  }

  if (guestInfo) {
    return {
      name: guestInfo.name,
      email: guestInfo.email,
      phone: guestInfo.phone,
      shippingAddress: guestInfo.address,
      businessName: null,
    }
  }

  return { name: '', email: '', phone: '', shippingAddress: '', businessName: null }
}

// ── Build admin snapshot ───────────────────────────────────────────────────

/**
 * Build admin snapshot from fetched admin info.
 * Exact from shop.tsx handleCheckout().
 */
export function buildAdminSnapshot(adminInfo: any | null): AdminSnapshot {
  if (!adminInfo) return { businessName: null, fullName: null, address: null, phone: null, contactEmail: null }

  return {
    businessName: adminInfo.business_name,
    fullName: adminInfo.full_name,
    address: adminInfo.address,
    phone: adminInfo.phone,
    contactEmail: adminInfo.contact_email,
  }
}

// ── Build line item snapshot ───────────────────────────────────────────────

/**
 * Build a frozen line item from a product for the checkout payload.
 * Exact from shop.tsx handleCheckout() line_items array.
 */
export function buildLineItem(product: CheckoutProduct): CheckoutProduct {
  return {
    product_id: product.product_id,
    title: product.title,
    gem_type: product.gem_type,
    shape: product.shape,
    weight: product.weight,
    color: product.color,
    origin: product.origin,
    treatment: product.treatment,
    description: product.description,
    price_per_carat: product.price_per_carat,
    total_price: product.total_price,
    gia_report_number: product.gia_report_number,
    gia_report_pdf_url: product.gia_report_pdf_url,
    photo_url: product.photo_url,
  }
}

// ── Create checkout session ────────────────────────────────────────────────

/**
 * Call the checkout API to create a Stripe session and return the redirect URL.
 * Exact from shop.tsx handleCheckout().
 */
export async function createCheckoutSession(params: {
  product: CheckoutProduct
  isGuest: boolean
  guestInfo?: { name: string; email: string; phone: string; address: string } | null
  accountUserId?: string
  adminSnapshot: AdminSnapshot
  buyerInfo: BuyerInfo
}): Promise<CheckoutResult> {
  const { product, isGuest, guestInfo, accountUserId, adminSnapshot, buyerInfo } = params

  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || ''
    const res = await fetch(`${backendUrl}/api/checkout/create-session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        product_id: product.product_id,
        guest: isGuest,
        guest_info: isGuest ? guestInfo : undefined,
        account_user_id: accountUserId,
        admin_snapshot: adminSnapshot,
        account_snapshot: buyerInfo,
        line_items: [buildLineItem(product)],
      }),
    })

    const data = await res.json()

    if (data.url) {
      return { url: data.url }
    }

    return { error: data.error || 'Checkout failed' }
  } catch (e: any) {
    return { error: e.message || 'Checkout error' }
  }
}
