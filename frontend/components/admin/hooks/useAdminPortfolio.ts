// frontend/components/admin/hooks/useAdminPortfolio.ts
//
// All data fetching and actions for the portfolio admin panel.
// UI components import this hook — no direct Supabase calls in UI files.

import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';

// ── Shared helpers ────────────────────────────────────────────────────────────
export const PORTFOLIO_TABS = ['published', 'drafts', 'archived'] as const;
export type PortfolioTab = typeof PORTFOLIO_TABS[number];
export const PORTFOLIO_TAB_LABELS: Record<string, string> = {
  published: 'Published', drafts: 'Drafts', archived: 'Archived',
};

export const EMPTY_PHOTO: Record<string, any> = {
  photo_url: '', year: '', caption: '', description: '', sort_order: '',
};

export function genPhotoId() {
  return 'PPH-' + Date.now().toString(36).toUpperCase();
}

// ── Payload types ─────────────────────────────────────────────────────────────
export interface AddSinglePayload {
  photoUrl:    string;
  year:        string;
  caption:     string;
  description: string;
  publishLive: boolean;
}

export interface UpdateSinglePayload {
  portfolio_photo_id: string;
  photoUrl:    string;
  year:        string;
  caption:     string;
  description: string;
}

// ── Hook interface ────────────────────────────────────────────────────────────
export interface AdminPortfolioData {
  tab:              PortfolioTab;
  photos:           any[];
  filtered:         Record<string, any[]>;
  loading:          boolean;
  selectMode:       boolean;
  selected:         Set<string>;
  currentTabPhotos: any[];
  setTab:           (t: PortfolioTab) => void;
  setSelectMode:    (v: boolean) => void;
  setSelected:      (v: Set<string>) => void;
  loadPhotos:       () => Promise<void>;
  addSingle:        (payload: AddSinglePayload) => Promise<{ error?: string }>;
  updateSingle:     (payload: UpdateSinglePayload) => Promise<{ error?: string }>;
  publishOne:       (photo: any) => Promise<void>;
  unpublishOne:     (photo: any) => Promise<void>;
  archiveOne:       (id: string) => Promise<void>;
  toggleSelect:     (id: string, e: any) => void;
  bulkPublish:      () => Promise<void>;
  bulkUnpublish:    () => Promise<void>;
  bulkArchive:      () => Promise<void>;
  handleSortCommit: (photo: any, newOrder: number) => Promise<void>;
}

// ── Hook ──────────────────────────────────────────────────────────────────────
export function useAdminPortfolio(): AdminPortfolioData {
  const [tab,        setTab]        = useState<PortfolioTab>('published');
  const [photos,     setPhotos]     = useState<any[]>([]);
  const [loading,    setLoading]    = useState(true);
  const [selectMode, setSelectMode] = useState(false);
  const [selected,   setSelected]   = useState<Set<string>>(new Set());

  const filtered: Record<string, any[]> = {
    published: photos.filter(p =>  p.published && !p.archived),
    drafts:    photos.filter(p => !p.published && !p.archived),
    archived:  photos.filter(p =>  p.archived),
  };

  const currentTabPhotos = [...(filtered[tab] || [])].sort((a, b) => a.sort_order - b.sort_order);

  const loadPhotos = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('portfolio_photos').select('*').order('sort_order', { ascending: true });
    setPhotos(data || []);
    setLoading(false);
  };

  useEffect(() => { loadPhotos(); }, []);

  // ── Add single photo ──────────────────────────────────────────────────────
  const addSingle = async (payload: AddSinglePayload): Promise<{ error?: string }> => {
    try {
      const { data: existing } = await supabase
        .from('portfolio_photos')
        .select('sort_order')
        .order('sort_order', { ascending: false })
        .limit(1)
        .maybeSingle();

      const nextOrder = existing ? (existing.sort_order ?? 0) + 1 : 1;

      const { error: dbErr } = await supabase
        .from('portfolio_photos')
        .insert({
          photo_url:   payload.photoUrl   || null,
          year:        payload.year.trim(),
          caption:     payload.caption.trim()     || null,
          description: payload.description.trim() || null,
          sort_order:  nextOrder,
          published:   payload.publishLive,
          archived:    false,
        });

      if (dbErr) return { error: dbErr.message };
      await loadPhotos();
      setTab(payload.publishLive ? 'published' : 'drafts');
      return {};
    } catch (err: any) {
      return { error: err?.message ?? 'Unknown error' };
    }
  };

  // ── Update single photo ───────────────────────────────────────────────────
  const updateSingle = async (payload: UpdateSinglePayload): Promise<{ error?: string }> => {
    try {
      const { error: dbErr } = await supabase
        .from('portfolio_photos')
        .update({
          photo_url:   payload.photoUrl   || null,
          year:        payload.year.trim()        || null,
          caption:     payload.caption.trim()     || null,
          description: payload.description.trim() || null,
        })
        .eq('portfolio_photo_id', payload.portfolio_photo_id);

      if (dbErr) return { error: dbErr.message };
      await loadPhotos();
      return {};
    } catch (err: any) {
      return { error: err?.message ?? 'Unknown error' };
    }
  };

  // ── Publish / Unpublish ───────────────────────────────────────────────────
  const publishOne = async (photo: any) => {
    await supabase.from('portfolio_photos')
      .update({ published: true })
      .eq('portfolio_photo_id', photo.portfolio_photo_id);
    await loadPhotos();
  };

  const unpublishOne = async (photo: any) => {
    await supabase.from('portfolio_photos')
      .update({ published: false })
      .eq('portfolio_photo_id', photo.portfolio_photo_id);
    await loadPhotos();
  };

  // ── Archive ───────────────────────────────────────────────────────────────
  const archiveOne = async (id: string) => {
    await supabase.from('portfolio_photos')
      .update({ archived: true, published: false })
      .eq('portfolio_photo_id', id);
    await loadPhotos();
  };

  // ── Sort order ────────────────────────────────────────────────────────────
  const handleSortCommit = async (photo: any, newOrder: number) => {
    const conflict = photos.find(p =>
      p.sort_order === newOrder && p.portfolio_photo_id !== photo.portfolio_photo_id
    );
    if (conflict) {
      await supabase.from('portfolio_photos')
        .update({ sort_order: photo.sort_order })
        .eq('portfolio_photo_id', conflict.portfolio_photo_id);
    }
    await supabase.from('portfolio_photos')
      .update({ sort_order: newOrder })
      .eq('portfolio_photo_id', photo.portfolio_photo_id);
    await loadPhotos();
  };

  // ── Select / Bulk ─────────────────────────────────────────────────────────
  const toggleSelect = (id: string, e: any) => {
    e.stopPropagation();
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const bulkPublish = async () => {
    for (const id of selected)
      await supabase.from('portfolio_photos').update({ published: true }).eq('portfolio_photo_id', id);
    setSelected(new Set()); setSelectMode(false); await loadPhotos();
  };

  const bulkUnpublish = async () => {
    for (const id of selected)
      await supabase.from('portfolio_photos').update({ published: false }).eq('portfolio_photo_id', id);
    setSelected(new Set()); setSelectMode(false); await loadPhotos();
  };

  const bulkArchive = async () => {
    for (const id of selected)
      await supabase.from('portfolio_photos').update({ archived: true, published: false }).eq('portfolio_photo_id', id);
    setSelected(new Set()); setSelectMode(false); await loadPhotos();
  };

  return {
    tab, photos, filtered, loading,
    selectMode, selected, currentTabPhotos,
    setTab, setSelectMode, setSelected,
    loadPhotos,
    addSingle, updateSingle,
    publishOne, unpublishOne, archiveOne,
    toggleSelect, bulkPublish, bulkUnpublish, bulkArchive,
    handleSortCommit,
  };
}