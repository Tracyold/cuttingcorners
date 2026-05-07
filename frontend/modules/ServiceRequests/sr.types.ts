// frontend/modules/ServiceRequests/sr.types.ts
//
// Pure TypeScript declarations for the service requests module.
// Zero imports. No React. No Supabase. No logic.

// ── Actor ─────────────────────────────────────────────────────────────────────

export type SRActor = 'ADMIN' | 'ACCOUNT';

// ── Database row shape ────────────────────────────────────────────────────────

export interface ServiceRequestRow {
  service_request_id:       string;
  created_at:               string;
  updated_at:               string;
  account_user_id:          string;
  description:              string;
  service_type:             string | null;
  subject:                  string | null;
  gem_type:                 string | null;
  gem_color:                string | null;
  shape:                    string | null;
  weight_ct:                number | null;
  dim_length_mm:            number | null;
  dim_width_mm:             number | null;
  dim_depth_mm:             number | null;
  quantity:                 number | null;
  photo_url:                string | null;
  photo_urls:               string[] | null;
  is_read:                  boolean;
  read_at:                  string | null;
  is_archived:              boolean;
  wizard_result_id:         string | null;
  contact_name:             string | null;
  contact_email:            string | null;
  contact_phone:            string | null;
  contact_address:          string | null;
  workorder_sms_consent:    boolean | null;
  workorder_sms_consent_at: string | null;
}

// ── Linked wizard result (joined via wizard_result_id) ────────────────────────

export interface SRWizardResult {
  id:                       string;
  stone_species:            string | null;
  stone_variety:            string | null;
  feasibility_percent:      number;
  recommendation:           string;
  weight_loss:              string;
  disclaimer1_confirmed_at: string | null;
}

// ── Custom fields row ─────────────────────────────────────────────────────────

export interface ServiceRequestCustomFieldRow {
  id:                 string;
  service_request_id: string;
  account_user_id:    string;
  label:              string;
  value:              string | null;
  sort_order:         number;
}

// ── Client-side only ──────────────────────────────────────────────────────────

export interface SRPhotoItem {
  tempId:          string;
  fileName:        string;
  objectUrl:       string;
  storagePath:     string | null;
  publicUrl:       string | null;
  uploading:       boolean;
  uploaded:        boolean;
  showSuccessPill: boolean;
  error:           string | null;
}

export interface SRCustomField {
  id:           string;
  label:        string;
  value:        string;
  editingLabel: boolean;
}

export interface SRExistingConsent {
  consented:   boolean;
  consentedAt: string | null;
}

// ── Processed service request — engine pre-computes all display flags ─────────

export interface SRProcessedServiceRequest {
  sr:         ServiceRequestRow;
  photos:     string[];
  specs:      SRSpecRow[];
  contact:    SRContactRow[];
  isUnread:   boolean;
  isArchived: boolean;
  dateLabel:  string;
}

// ── Drawer display shapes — pre-computed by helpers ──────────────────────────

export interface SRSpecRow {
  label: string;
  val:   string;
}

export interface SRContactRow {
  label: string;
  val:   string;
}

// ── Photo validation ──────────────────────────────────────────────────────────

export interface PhotoValidationResult {
  valid:  boolean;
  reason: string | null;
}

// ── Tab state ─────────────────────────────────────────────────────────────────

export type SRTab = 'active' | 'archive';

// ── Insert payloads ───────────────────────────────────────────────────────────

export interface ServiceRequestInsertPayload {
  account_user_id:          string;
  service_type:             string | null;
  description:              string;
  gem_type:                 string | null;
  gem_color:                string | null;
  shape:                    string | null;
  weight_ct:                number | null;
  dim_length_mm:            number | null;
  dim_width_mm:             number | null;
  dim_depth_mm:             number | null;
  quantity:                 number;
  photo_urls:               string[];
  contact_name:             string;
  contact_email:            string;
  contact_phone:            string;
  contact_address:          string;
  workorder_sms_consent:    boolean;
  workorder_sms_consent_at: string | null;
  is_archived:              false;
}

export interface ServiceRequestCustomFieldInsertPayload {
  service_request_id: string;
  account_user_id:    string;
  label:              string;
  value:              string | null;
  sort_order:         number;
}

// ── Notification payload ──────────────────────────────────────────────────────

export interface SRNotificationPayload {
  event_type: 'service_requests';
  user_id:    string;
}

// ── Constants ─────────────────────────────────────────────────────────────────

export const SR_PHOTO_BUCKET        = 'service-request-photos' as const;
export const SR_MAX_PHOTOS          = 3 as const;
export const SR_MAX_PHOTO_BYTES     = 26214400 as const;
export const SR_MAX_CUSTOM_FIELDS   = 2 as const;
export const SR_ACCEPTED_EXTENSIONS = ['png', 'jpg', 'jpeg', 'heic', 'webp'] as const;
export const SR_ACCEPTED_MIME_HINT  = '.png,.jpg,.jpeg,.heic,.webp,image/*' as const;

export const SERVICE_TYPES = [
  'Custom Rough Cut',
  'Re-Cut & Re-Polish',
  'Table Re-Polish',
  'Crown Re-Polish',
  'Pavilion Re-Polish',
  'Gemstone Material Cut Design',
  'Virtual Consultation',
] as const;

export type ServiceType = typeof SERVICE_TYPES[number];

export const SR_FORM_TOOLTIPS = {
  service: 'Optional. Selecting a service type is a rough hint — we finalize the scope after reviewing photos and details.',
  dims:    'If you\'re unsure, do not guess — leave blank and please include at least one photo of the stone next to a quarter for scale.',
  desc:    'All information is good information. Tell us a story — where did you get it? What do you want it to become? Any inclusions or cracks you\'ve noticed?',
  photos:  'Photos are the most helpful thing you can add. Include one next to a quarter for scale if possible. Up to 3, max 25MB each.',
} as const;