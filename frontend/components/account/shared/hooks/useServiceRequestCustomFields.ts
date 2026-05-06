// shared/hooks/useServiceRequestCustomFields.ts
// Fetch custom fields for a single service request when a drawer/panel opens.
// Schema: public.service_request_custom_fields
//   - id                 uuid
//   - service_request_id uuid (FK)
//   - label              text
//   - value              text NULL
//   - sort_order         int

import { useEffect, useState } from 'react';
import { supabase } from '../../../../lib/supabase';

export interface ServiceRequestCustomField {
  id:         string;
  label:      string;
  value:      string | null;
  sort_order: number;
}

export interface UseServiceRequestCustomFieldsResult {
  customFields: ServiceRequestCustomField[];
  loading:      boolean;
}

export function useServiceRequestCustomFields(
  serviceRequestId: string | null | undefined,
  enabled: boolean,
): UseServiceRequestCustomFieldsResult {
  const [customFields, setCustomFields] = useState<ServiceRequestCustomField[]>([]);
  const [loading,      setLoading]      = useState(false);

  useEffect(() => {
    if (!enabled || !serviceRequestId) {
      setCustomFields([]);
      return;
    }
    let cancelled = false;
    setLoading(true);
    (async () => {
      const { data, error } = await supabase
        .from('service_request_custom_fields')
        .select('id, label, value, sort_order')
        .eq('service_request_id', serviceRequestId)
        .order('sort_order', { ascending: true });
      if (cancelled) return;
      if (error) {
        console.warn('Custom fields fetch failed (non-blocking):', error);
        setCustomFields([]);
      } else {
        setCustomFields((data ?? []) as ServiceRequestCustomField[]);
      }
      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, [serviceRequestId, enabled]);

  return { customFields, loading };
}
