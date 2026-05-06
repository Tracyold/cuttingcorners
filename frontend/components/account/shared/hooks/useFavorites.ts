// frontend/components/account/shared/hooks/useFavorites.ts
//
// Persistent favorites backed by the `user_favorites` table.
// Optimistic UI: the local set updates immediately, then the DB write runs.
// If the DB write fails, the local change is reverted.
//
// When `session` is null (anonymous browsing, e.g. logged-out /shop page in
// the future), favorites fall back to an in-memory set that does not persist.

import { useCallback, useEffect, useRef, useState } from 'react';
import type { Session, PostgrestError } from '@supabase/supabase-js';
import { supabase } from '../../../../lib/supabase';

interface UserFavoriteRow {
  product_id: string;
}

export function useFavorites(session: Session | null) {
  const [favorites, setFavorites] = useState<Set<string>>(() => new Set());
  const [loading,   setLoading]   = useState(true);

  // Track the current user id so an in-flight request from a previous session
  // can't stomp on a new session's state.
  const userIdRef = useRef<string | null>(null);

  // ── Load from DB on login / session change ──
  useEffect(() => {
    const uid = session?.user?.id ?? null;
    userIdRef.current = uid;

    if (!uid) {
      // No session — fall back to empty in-memory state.
      setFavorites(new Set());
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    (async () => {
      const { data, error } = await supabase
        .from('user_favorites')
        .select('product_id')
        .eq('user_id', uid);

      // Guard: session may have changed between dispatch and response.
      if (cancelled || userIdRef.current !== uid) return;

      if (error) {
        console.error('useFavorites load error:', error);
        setFavorites(new Set());
      } else {
        const rows: UserFavoriteRow[] = data ?? [];
        setFavorites(new Set(rows.map(r => r.product_id)));
      }
      setLoading(false);
    })();

    return () => { cancelled = true; };
  }, [session]);

  // ── Toggle (optimistic) ──
  const toggleFavorite = useCallback(async (productId: string) => {
    const uid = userIdRef.current;

    // No-session path: in-memory only.
    if (!uid) {
      setFavorites(prev => {
        const next = new Set(prev);
        if (next.has(productId)) next.delete(productId);
        else next.add(productId);
        return next;
      });
      return;
    }

    // Decide based on the snapshot we had at click time.
    let wasFavorite = false;
    setFavorites(prev => {
      wasFavorite = prev.has(productId);
      const next = new Set(prev);
      if (wasFavorite) next.delete(productId);
      else next.add(productId);
      return next;
    });

    try {
      if (wasFavorite) {
        const { error } = await supabase
          .from('user_favorites')
          .delete()
          .eq('user_id', uid)
          .eq('product_id', productId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('user_favorites')
          .insert({ user_id: uid, product_id: productId });
        // Duplicate PK (23505) means the row already exists on the server — treat as success.
        if (error && (error as PostgrestError).code !== '23505') throw error;
      }
    } catch (err) {
      console.error('useFavorites toggle failed, reverting:', err);
      // Revert the optimistic change.
      setFavorites(prev => {
        const next = new Set(prev);
        if (wasFavorite) next.add(productId);
        else next.delete(productId);
        return next;
      });
    }
  }, []);

  const isFavorite = useCallback(
    (productId: string) => favorites.has(productId),
    [favorites]
  );

  return { favorites, toggleFavorite, isFavorite, loading };
}
