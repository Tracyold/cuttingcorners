// comp/admin/mobile/panels/users/hooks/useAdminUserServiceRequests.ts
// Direct extract from [id].tsx — markSRRead.
// Admin extras: unarchiveSR (recover archived SR for user), selectedArchivedSR for drawer.

import { useState } from 'react';
import { supabase } from '../../../../../../lib/supabase';

export function useAdminUserServiceRequests(
  setSR: (fn: (prev: any[]) => any[]) => void,
) {
  const [selectedArchivedSR, setSelectedArchivedSR] = useState<any>(null);

  // Exact from [id].tsx markSRRead()
  const markSRRead = async (item: any) => {
    await supabase.from('service_requests')
      .update({ is_read: true, read_at: new Date().toISOString() })
      .eq('service_request_id', item.service_request_id);
    setSR(prev =>
      prev.map(i => i.service_request_id === item.service_request_id ? { ...i, is_read: true } : i)
    );
  };

  // Admin only — recover an archived SR back to active
  const unarchiveSR = async (item: any) => {
    const { error } = await supabase
      .from('service_requests')
      .update({ is_archived: false })
      .eq('service_request_id', item.service_request_id);
    if (error) { console.error('Unarchive SR failed:', error.message); return; }
    setSR(prev =>
      prev.map(s => s.service_request_id === item.service_request_id ? { ...s, is_archived: false } : s)
    );
    setSelectedArchivedSR(null);
  };

  return {
    selectedArchivedSR, setSelectedArchivedSR,
    markSRRead,
    unarchiveSR,
  };
}