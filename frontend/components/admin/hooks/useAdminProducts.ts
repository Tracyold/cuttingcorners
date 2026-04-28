// frontend/components/admin/hooks/useAdminProducts.ts
//
// Pure data + actions for the products admin panel.
// No UI state (no showForm, no queue, no curIdx) — those live in the panel.
// No CSS classes referenced anywhere in this file.

import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';

// ── Shared constants ──────────────────────────────────────────────────────────
export const PRODUCT_TABS = ['active', 'drafts', 'inactive'] as const;
export type ProductTab = typeof PRODUCT_TABS[number];

export const PRODUCT_TAB_LABELS: Record<ProductTab, string> = {
  active:   'Live',
  drafts:   'Drafts',
  inactive: 'Inactive',
};

export const EMPTY_PRODUCT: Record<string, string> = {
  title: '', gem_type: '', color: '', shape: '', weight: '',
  origin: '', treatment: '', gia_report_number: '', gia_report_pdf_url: '',
  price_per_carat: '', total_price: '', description: '', photo_url: '',
};

// ── Shared helpers (exported so ProductForm auto-save can import) ─────────────
export function genProductId(): string {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export async function upsertProduct(p: any, state: string) {
  return supabase.from('products').upsert({
    product_id:         p.product_id,
    title:              p.title               || '',
    gem_type:           p.gem_type            || null,
    color:              p.color               || null,
    shape:              p.shape               || null,
    weight:             p.weight              ? parseFloat(p.weight)          : null,
    origin:             p.origin              || null,
    treatment:          p.treatment           || null,
    gia_report_number:  p.gia_report_number   || null,
    gia_report_pdf_url: p.gia_report_pdf_url  || null,
    price_per_carat:    p.price_per_carat     ? parseFloat(p.price_per_carat) : null,
    total_price:        p.total_price         ? parseFloat(p.total_price)     : 0,
    description:        p.description         || null,
    photo_url:          p.photo_url           || null,
    product_state:      state,
  }, { onConflict: 'product_id' });
}

// ── Hook interface ────────────────────────────────────────────────────────────
export interface AdminProductsData {
  products:      any[];
  filtered:      Record<ProductTab, any[]>;
  loading:       boolean;
  error:         string | null;
  loadProducts:  () => Promise<void>;
  createDraft:   (product_id: string) => Promise<{ error?: string }>;
  saveDraft:     (product: any) => Promise<{ error?: string }>;
  publishOne:    (product: any) => Promise<{ error?: string }>;
  saveAndPublish:(products: any[]) => Promise<{ error?: string }>;
  removeOne:     (product: any) => Promise<{ error?: string }>;
}

// ── Hook ──────────────────────────────────────────────────────────────────────
export function useAdminProducts(): AdminProductsData {
  const [products, setProducts] = useState<any[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState<string | null>(null);

  const filtered: Record<ProductTab, any[]> = {
    active:   products.filter(p => p.product_state === 'ACTIVE'),
    drafts:   products.filter(p => p.product_state === 'DRAFT'),
    inactive: products.filter(p => p.product_state === 'INACTIVE'),
  };

  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    const { data, error: e } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    if (e) setError(e.message);
    else setProducts(data || []);
    setLoading(false);
  };

  useEffect(() => { loadProducts(); }, []);

  // Create an empty draft row in DB — called when user opens the add form
  const createDraft = async (product_id: string): Promise<{ error?: string }> => {
    const { error: e } = await supabase.from('products').insert({
      product_id, title: '', total_price: 0, product_state: 'DRAFT',
    });
    if (e) { setError(e.message); return { error: e.message }; }
    await loadProducts();
    return {};
  };

  // Save a single product as DRAFT
  const saveDraft = async (product: any): Promise<{ error?: string }> => {
    const { error: e } = (await upsertProduct(product, 'DRAFT')).error
      ? { error: (await upsertProduct(product, 'DRAFT')).error }
      : { error: null };
    if (e) { setError(String(e)); return { error: String(e) }; }
    await loadProducts();
    return {};
  };

  // Publish a single product to ACTIVE
  const publishOne = async (product: any): Promise<{ error?: string }> => {
    const { error: e } = await upsertProduct(product, 'ACTIVE');
    if (e) { setError(e.message); return { error: e.message }; }
    await loadProducts();
    return {};
  };

  // Save + publish a batch (queue flow from the add form)
  const saveAndPublish = async (prods: any[]): Promise<{ error?: string }> => {
    for (const p of prods) {
      const { error: e } = await upsertProduct(p, 'ACTIVE');
      if (e) { setError(e.message); return { error: e.message }; }
    }
    await loadProducts();
    return {};
  };

  // Move to INACTIVE
  const removeOne = async (product: any): Promise<{ error?: string }> => {
    const { error: e } = await supabase
      .from('products')
      .update({ product_state: 'INACTIVE' })
      .eq('product_id', product.product_id);
    if (e) { setError(e.message); return { error: e.message }; }
    await loadProducts();
    return {};
  };

  return {
    products, filtered, loading, error,
    loadProducts,
    createDraft, saveDraft, publishOne, saveAndPublish, removeOne,
  };
}