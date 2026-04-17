import { supabase } from '../../../lib/supabase'

// ── Types ──────────────────────────────────────────────────────────────────
export interface ShopProduct {
  product_id:    string
  title:         string
  total_price:   number | null
  photo_url:     string | null
  product_state: string | null
  created_at:    string
}

// ── Pure helpers ───────────────────────────────────────────────────────────
export function formatPrice(value: number | null | undefined): string {
  if (typeof value !== 'number' || Number.isNaN(value)) return 'Price on request'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

// ── Data fetching ──────────────────────────────────────────────────────────
export async function fetchAvailableProducts(page: number = 0, pageSize: number = 12): Promise<ShopProduct[]> {
  const from = page * pageSize
  const to = from + pageSize - 1

  const { data, error } = await supabase
    .from('products')
    .select('product_id, title, total_price, photo_url, product_state, created_at')
    .in('product_state', ['PUBLISHED', 'ACTIVE'])
    .order('created_at', { ascending: false })
    .range(from, to)

  if (error) {
    console.error('Failed to fetch shop products:', error)
    return []
  }
  return (data ?? []) as ShopProduct[]
}
