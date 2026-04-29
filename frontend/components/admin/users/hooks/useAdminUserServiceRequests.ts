// frontend/components/admin/users/hooks/useAdminUserServiceRequests.ts
//
// Extracted from pages/admin/users/[id].tsx — markSRRead.
// Receives setSR from useAdminUserDetail so state lives in one place.

import { supabase } from '../../../../lib/supabase';

export interface AdminUserServiceRequestsData {
  markSRRead: (item: any) => Promise<void>;
}

export function useAdminUserServiceRequests(
  setSR: (fn: any) => void,
): AdminUserServiceRequestsData {

  // Exact logic from [id].tsx markSRRead()
  const markSRRead = async (item: any) => {
    await supabase
      .from('service_requests')
      .update({ is_read: true, read_at: new Date().toISOString() })
      .eq('service_request_id', item.service_request_id);
    setSR((prev: any[]) =>
      prev.map(i =>
        i.service_request_id === item.service_request_id
          ? { ...i, is_read: true }
          : i
      )
    );
  };

  return { markSRRead };
}
