// frontend/components/admin/hooks/useAdminPortfolio.ts
//
// Extracts all data fetching and actions from pages/admin/portfolio.tsx.
// UI components (PhotoSection, SortBadge, PhotoForm) stay in their own files.

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

// ── Hook ──────────────────────────────────────────────────────────────────────
export interface AdminPortfolioData {
  tab:          PortfolioTab;
  photos:       any[];
  filtered:     Record<string, any[]>;
  loading:      boolean;
  showForm:     boolean;
  isEdit:       boolean;
  queue:        any[];
  curIdx:       number;
  selectMode:   boolean;
  selected:     Set<string>;
  setTab:       (t: PortfolioTab) => void;
  setCurIdx:    (i: number) => void;
  setQueue:     (q: any[]) => void;
  setSelectMode:(v: boolean) => void;
  setSelected:  (v: Set<string>) => void;
  openAdd:      () => void;
  openEdit:     (photo: any) => void;
  updateCurrent:(updated: any) => void;
  addToQueue:   () => void;
  saveDrafts:   () => Promise<void>;
  publishAll:   () => Promise<void>;
  archiveOne:   (id: string) => Promise<void>;
  toggleSelect: (id: string, e: any) => void;
  bulkPublish:  () => Promise<void>;
  bulkUnpublish:() => Promise<void>;
  bulkArchive:  () => Promise<void>;
  handleSortCommit: (photo: any, newOrder: number) => Promise<void>;
  closeForm:    () => void;
  loadPhotos:   () => Promise<void>;
  currentTabPhotos: any[];
}

export function useAdminPortfolio(): AdminPortfolioData {
  const [tab,        setTab]        = useState<PortfolioTab>('published');
  const [photos,     setPhotos]     = useState<any[]>([]);
  const [loading,    setLoading]    = useState(true);
  const [showForm,   setShowForm]   = useState(false);
  const [isEdit,     setIsEdit]     = useState(false);
  const [queue,      setQueue]      = useState<any[]>([]);
  const [curIdx,     setCurIdx]     = useState(0);
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

  const openAdd = () => {
    const maxOrder = photos.length > 0 ? Math.max(...photos.map(p => p.sort_order)) : 0;
    const np = {
      ...EMPTY_PHOTO,
      portfolio_photo_id: genPhotoId(),
      created_at: new Date().toISOString(),
      published: false, archived: false,
      sort_order: maxOrder + 1,
      _saved: false,
    };
    setQueue([np]); setCurIdx(0); setIsEdit(false); setShowForm(true);
  };

  const openEdit = (photo: any) => {
    if (selectMode) return;
    setQueue([{ ...photo, _saved: true }]);
    setCurIdx(0); setIsEdit(true); setShowForm(true);
  };

  const updateCurrent = (updated: any) => {
    const nq = [...queue]; nq[curIdx] = updated; setQueue(nq);
  };

  const addToQueue = () => {
    if (queue.length >= 10) return;
    const maxOrder = photos.length > 0 ? Math.max(...photos.map(p => p.sort_order)) : 0;
    const np = {
      ...EMPTY_PHOTO,
      portfolio_photo_id: genPhotoId(),
      created_at: new Date().toISOString(),
      published: false, archived: false,
      sort_order: maxOrder + queue.length + 1,
      _saved: false,
    };
    const nq = [...queue, np]; setQueue(nq); setCurIdx(nq.length - 1);
  };

  const saveDrafts = async () => {
    for (const q of queue) {
      const isNew = !q.portfolio_photo_id || q.portfolio_photo_id.startsWith('PPH-');
      const payload = {
        photo_url:   q.photo_url || '',
        year:        q.year || null,
        caption:     q.caption || null,
        description: q.description || null,
        sort_order:  q.sort_order ? parseInt(q.sort_order) : 0,
        published: false, archived: false,
      };
      if (isNew) await supabase.from('portfolio_photos').insert(payload);
      else       await supabase.from('portfolio_photos').update(payload).eq('portfolio_photo_id', q.portfolio_photo_id);
    }
    await loadPhotos(); setShowForm(false);
  };

  const publishAll = async () => {
    for (const q of queue) {
      const isNew = !q.portfolio_photo_id || q.portfolio_photo_id.startsWith('PPH-');
      const payload = {
        photo_url:   q.photo_url || '',
        year:        q.year || null,
        caption:     q.caption || null,
        description: q.description || null,
        sort_order:  q.sort_order ? parseInt(q.sort_order) : 0,
        published: true, archived: false,
      };
      if (isNew) await supabase.from('portfolio_photos').insert(payload);
      else       await supabase.from('portfolio_photos').update(payload).eq('portfolio_photo_id', q.portfolio_photo_id);
    }
    await loadPhotos(); setShowForm(false); setTab('published');
  };

  const archiveOne = async (id: string) => {
    await supabase.from('portfolio_photos')
      .update({ archived: true, published: false })
      .eq('portfolio_photo_id', id);
    await loadPhotos(); setShowForm(false);
  };

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

  const closeForm = () => setShowForm(false);

  return {
    tab, photos, filtered, loading,
    showForm, isEdit, queue, curIdx,
    selectMode, selected,
    setTab, setCurIdx, setQueue, setSelectMode, setSelected,
    openAdd, openEdit, updateCurrent, addToQueue,
    saveDrafts, publishAll, archiveOne,
    toggleSelect, bulkPublish, bulkUnpublish, bulkArchive,
    handleSortCommit, closeForm, loadPhotos,
    currentTabPhotos,
  };
}
