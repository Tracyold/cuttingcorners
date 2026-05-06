import { useState, Dispatch, SetStateAction } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../../../../lib/supabase';

// service_requests row (full select('*'))
interface ServiceRequest {
  service_request_id: string;
  created_at:         string;
  account_user_id:    string;
  description:        string;
  photo_url:          string | null;
  is_read:            boolean;
  read_at:            string | null;
  updated_at:         string;
  subject:            string | null;
  service_type:       string | null;
  wizard_result_id:   string | null;
  is_archived:        boolean;
  gem_type:           string | null;
  gem_color:          string | null;
  weight_ct:          number | null;
  dim_length_mm:      number | null;
  photo_urls:         string[] | null;
}

// wizard_results (subset used by handleWizardServiceRequest)
interface WizardResultPrefill {
  id?:                  string;
  recommendation:       string;
  stone_variety:        string | null;
  stone_species:        string | null;
  feasibility_percent:  number;
  weight_loss:          string;
}

export function useServiceRequest(session: Session | null, setServiceRequests: Dispatch<SetStateAction<ServiceRequest[]>>) {
  const [showSRForm, setShowSRForm] = useState(false);
  const [srType, setSrType] = useState('');
  const [srDesc, setSrDesc] = useState('');
  const [srSubmitting, setSrSubmitting] = useState(false);
  const [srGateMsg, setSrGateMsg] = useState('');
  const [wizardPrefill, setWizardPrefill] = useState<WizardResultPrefill | null>(null);

  const openSRForm = async () => {
    if (!session) return;
    const { data: prefs } = await supabase.from('user_sms_preferences').select('opt_in_work_orders').eq('user_id', session.user.id).single();
    const { data: p } = await supabase.from('account_users').select('phone').eq('account_user_id', session.user.id).single();
    if (!p?.phone || !prefs?.opt_in_work_orders) {
      setSrGateMsg('To submit a service request you must have a phone number on file and work order SMS notifications enabled.');
      return;
    }
    setSrGateMsg('');
    setShowSRForm(true);
  };

  const submitSR = async () => {
    if (!session) return;
    if (!srType || !srDesc.trim()) return;
    setSrSubmitting(true);
    await supabase.from('service_requests').insert({
      account_user_id: session.user.id,
      service_type: srType,
      description: srDesc,
      photo_url: null,
    });
    await supabase.functions.invoke('send-admin-notification', {
      body: { event_type: 'service_requests', user_id: session.user.id },
    });
    setSrSubmitting(false);
    setShowSRForm(false);
    setSrType('');
    setSrDesc('');
    setWizardPrefill(null);
    const { data: sr } = await supabase.from('service_requests').select('*')
      .eq('account_user_id', session.user.id).order('created_at', { ascending: false });
    setServiceRequests((sr ?? []) as ServiceRequest[]);
  };

  const handleWizardServiceRequest = (
    result: WizardResultPrefill,
    setActiveTab: (tab: string) => void,
    setInquiryTab: (tab: 'inquiries' | 'service') => void
  ) => {
    setWizardPrefill(result);
    setActiveTab('inquiries');
    setInquiryTab('service');
    setShowSRForm(true);
    setSrType(result.recommendation ?? '');
    const stone = [result.stone_variety, result.stone_species].filter(Boolean).join(' ');
    setSrDesc(
      'Stone: ' + stone +
      '\nWizard Score: ' + Math.round(result.feasibility_percent) + '%' +
      '\nRecommendation: ' + result.recommendation +
      '\nWeight Loss Estimate: ' + result.weight_loss
    );
  };

  return {
    showSRForm, setShowSRForm,
    srType, setSrType,
    srDesc, setSrDesc,
    srSubmitting, srGateMsg,
    wizardPrefill,
    openSRForm, submitSR, handleWizardServiceRequest,
  };
}
