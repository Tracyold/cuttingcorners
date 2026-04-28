// frontend/components/admin/hooks/useAdminProducts.ts
//
// Extracts all data fetching and actions from pages/admin/products.tsx.
// UI components (GIASection, ProductForm) stay in their own files.
// The page/panel imports this hook and passes values to those UI components.

import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';

// ── Shared helpers (used by hook + ProductForm auto-save) ─────────────────────
export const PRODUCT_TABS = ['active', 'drafts', 'inactive'] as const;
export type ProductTab = typeof PRODUCT_TABS[number];
export const PRODUCT_TAB_LABELS: Record<string, string> = {
  active: 'Live', drafts: 'Drafts', inactive: 'Inactive',
};

export const EMPTY_PRODUCT: Record<string, string> = {
  title: '', gem_type: '', color: '', shape: '', weight: '',
  origin: '', treatment: '', gia_report_number: '', gia_report_pdf_url: '',
  price_per_carat: '', total_price: '', description: '', photo_url: '',
};

export function genProductId() {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export async function upsertProduct(p: any, state: string) {
  return supabase.from('products').upsert({
    product_id:          p.product_id,
    title:               p.title || '',
    gem_type:            p.gem_type || null,
    color:               p.color || null,
    shape:               p.shape || null,
    weight:              p.weight ? parseFloat(p.weight) : null,
    origin:              p.origin || null,
    treatment:           p.treatment || null,
    gia_report_number:   p.gia_report_number || null,
    gia_report_pdf_url:  p.gia_report_pdf_url || null,
    price_per_carat:     p.price_per_carat ? parseFloat(p.price_per_carat) : null,
    total_price:         p.total_price ? parseFloat(p.total_price) : 0,
    description:         p.description || null,
    photo_url:           p.photo_url || null,
    product_state:       state,
  }, { onConflict: 'product_id' });
}

// ── Hook ──────────────────────────────────────────────────────────────────────
export interface AdminProductsData {
  tab:          ProductTab;
  products:     any[];
  filtered:     Record<string, any[]>;
  loading:      boolean;
  saving:       boolean;
  error:        string | null;
  showForm:     boolean;
  queue:        any[];
  curIdx:       number;
  setTab:       (t: ProductTab) => void;
  setCurIdx:    (i: number) => void;
  setQueue:     (q: any[]) => void;
  openAdd:      () => Promise<void>;
  openEdit:     (product: any) => void;
  updateCurrent:(updated: any) => void;
  addToQueue:   () => Promise<void>;
  saveDrafts:   () => Promise<void>;
  publishAll:   () => Promise<void>;
  publishOne:   (product: any) => Promise<void>;
  removeOne:    (product: any) => Promise<void>;
  closeForm:    () => void;
  loadProducts: () => Promise<void>;
}

export function useAdminProducts(): AdminProductsData {
  const [tab,      setTab]      = useState<ProductTab>('active');
  const [products, setProducts] = useState<any[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [saving,   setSaving]   = useState(false);
  const [error,    setError]    = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [queue,    setQueue]    = useState<any[]>([]);
  const [curIdx,   setCurIdx]   = useState(0);

  const filtered: Record<string, any[]> = {
    active:   products.filter(p => p.product_state === 'ACTIVE'),
    drafts:   products.filter(p => p.product_state === 'DRAFT'),
    inactive: products.filter(p => p.product_state === 'INACTIVE'),
  };

  const loadProducts = async () => {
    setLoading(true); setError(null);
    const { data, error: e } = await supabase
      .from('products').select('*').order('created_at', { ascending: false });
    if (e) setError(e.message); else setProducts(data || []);
    setLoading(false);
  };

  useEffect(() => { loadProducts(); }, []);

  const openAdd = async () => {
    const np = {
      ...EMPTY_PRODUCT,
      product_id: genProductId(),
      created_at: new Date().toISOString(),
      product_state: 'DRAFT',
      _saved: false,
    };
    const { error: e } = await supabase.from('products').insert({
      product_id: np.product_id, title: '', total_price: 0, product_state: 'DRAFT',
    });
    if (e) { setError(e.message); return; }
    setQueue([np]); setCurIdx(0);
    setProducts(prev => [np, ...prev]);
    setShowForm(true);
  };

  const openEdit = (product: any) => {
    setQueue([{ ...product, _saved: true }]);
    setCurIdx(0);
    setShowForm(true);
  };

  const updateCurrent = (updated: any) => {
    const nq = [...queue]; nq[curIdx] = updated; setQueue(nq);
    setProducts(prev => prev.map(p =>
      p.product_id === updated.product_id ? updated : p
    ));
  };

  const addToQueue = async () => {
    if (queue.length >= 10) return;
    const np = {
      ...EMPTY_PRODUCT,
      product_id: genProductId(),
      created_at: new Date().toISOString(),
      product_state: 'DRAFT',
      _saved: false,
    };
    const { error: e } = await supabase.from('products').insert({
      product_id: np.product_id, title: '', total_price: 0, product_state: 'DRAFT',
    });
    if (e) { setError(e.message); return; }
    const nq = [...queue, np]; setQueue(nq); setCurIdx(nq.length - 1);
    setProducts(prev => [np, ...prev]);
  };

  const saveDrafts = async () => {
    setSaving(true);
    for (const p of queue) {
      const { error: e } = await upsertProduct(p, 'DRAFT');
      if (e) { setError(e.message); setSaving(false); return; }
    }
    await loadProducts(); setSaving(false); setShowForm(false);
  };

  const publishAll = async () => {
    setSaving(true);
    for (const p of queue) {
      const { error: e } = await upsertProduct(p, 'ACTIVE');
      if (e) { setError(e.message); setSaving(false); return; }
    }
    await loadProducts(); setSaving(false); setShowForm(false); setTab('active');
  };

  const publishOne = async (product: any) => {
    const { error: e } = await upsertProduct(product, 'ACTIVE');
    if (e) { setError(e.message); return; }
    await loadProducts();
  };

  const removeOne = async (product: any) => {
    const { error: e } = await supabase
      .from('products').update({ product_state: 'INACTIVE' })
      .eq('product_id', product.product_id);
    if (e) { setError(e.message); return; }
    await loadProducts();
  };

  const closeForm = () => setShowForm(false);

  return {
    tab, products, filtered, loading, saving, error,
    showForm, queue, curIdx,
    setTab, setCurIdx, setQueue,
    openAdd, openEdit, updateCurrent, addToQueue,
    saveDrafts, publishAll, publishOne, removeOne,
    closeForm, loadProducts,
  };
}
