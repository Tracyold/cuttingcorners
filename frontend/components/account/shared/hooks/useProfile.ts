import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../../../../lib/supabase';

// account_users (subset accessed by this hook)
interface AccountProfile {
  account_user_id:        string;
  name:                   string;
  email:                  string;
  phone:                  string | null;
  shipping_address:       string | null;
  business_name:          string | null;
}

// user_sms_preferences (subset accessed by this hook)
interface SmsPrefs {
  user_id:               string | null;
  phone:                 string;
  opt_in_work_orders:    boolean | null;
  opt_in_tracking:       boolean | null;
  opt_in_chat:           boolean | null;
  opt_in_purchases:      boolean | null;
  opt_in_new_listings:   boolean | null;
}

type EditableProfileFields = Pick<
  AccountProfile,
  'name' | 'email' | 'phone' | 'shipping_address' | 'business_name'
>;

type ProfileUpdate = Partial<EditableProfileFields>;

export function useProfile(
  session: Session | null,
  profile: AccountProfile | null,
  setProfile: (p: AccountProfile) => void,
  setSmsPrefs: Dispatch<SetStateAction<SmsPrefs | null>>
) {
  const [editProfile, setEditProfile] = useState<AccountProfile | null>(null);
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileFlash, setProfileFlash] = useState(false);

  // Mirror original: initialize editProfile the moment profile loads from DB
  useEffect(() => {
    if (profile && editProfile === null) {
      setEditProfile({ ...profile });
    }
  }, [profile]);

  const saveProfile = async () => {
    if (!editProfile || !profile || !session) return;
    setProfileSaving(true);
    const updates: ProfileUpdate = {};
    if (editProfile.name !== profile.name) updates.name = editProfile.name;
    if (editProfile.email !== profile.email) updates.email = editProfile.email;
    if (editProfile.phone !== profile.phone) updates.phone = editProfile.phone;
    if (editProfile.shipping_address !== profile.shipping_address) updates.shipping_address = editProfile.shipping_address;
    if (editProfile.business_name !== profile.business_name) updates.business_name = editProfile.business_name;
    await supabase.from('account_users').update(updates).eq('account_user_id', session.user.id);
    if (updates.phone) await supabase.from('user_sms_preferences').update({ phone: updates.phone }).eq('user_id', session.user.id);
    setProfile({ ...profile, ...updates });
    setProfileSaving(false);
    setProfileFlash(true);
    setTimeout(() => setProfileFlash(false), 2000);
  };

  const hasProfileChanges = !!(editProfile && profile && (
    editProfile.name !== profile.name ||
    editProfile.email !== profile.email ||
    editProfile.phone !== profile.phone ||
    editProfile.shipping_address !== profile.shipping_address ||
    editProfile.business_name !== profile.business_name
  ));

  const toggleSms = async (col: string, val: boolean) => {
    if (!session) return;
    await supabase.from('user_sms_preferences').upsert(
      { user_id: session.user.id, phone: profile?.phone || '', [col]: val },
      { onConflict: 'user_id' }
    );
    setSmsPrefs((prev) => (prev ? { ...prev, [col]: val } : prev));
  };

  return {
    editProfile, setEditProfile,
    profileSaving, profileFlash,
    saveProfile, hasProfileChanges,
    toggleSms,
  };
}
