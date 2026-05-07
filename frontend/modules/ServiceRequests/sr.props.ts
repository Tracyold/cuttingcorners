// frontend/modules/ServiceRequests/sr.props.ts
//
// All handoff interfaces for the service requests module.
// Imports from sr.types.ts and React only.
// No Supabase. No logic. No design.
// These are the contracts between the engine and the render layer.

import type { Dispatch, SetStateAction, RefObject } from 'react';
import type {
  ServiceRequestRow,
  SRTab,
  SRActor,
  SRExistingConsent,
  SRPhotoItem,
  SRCustomField,
  SRSpecRow,
  SRContactRow,
} from './sr.types';

// ── Engine output ─────────────────────────────────────────────────────────────

// Everything both useAccountServiceRequests and useAdminServiceRequests return.
export interface ServiceRequestEngineOutput {

  // ── List ──
  serviceRequests:    ServiceRequestRow[];
  setServiceRequests: Dispatch<SetStateAction<ServiceRequestRow[]>>;
  activeList:ServiceRequestRow[];
  archivedList: ServiceRequestRow[];

  // ── Tab ──
  activeTab:    SRTab;
  setActiveTab: Dispatch<SetStateAction<SRTab>>;

  // ── Consent ──
  existingConsent: SRExistingConsent;

  // ── Photos — engine owns all upload state and actions ──
  photos:            SRPhotoItem[];
  handlePhotoFiles:  (files: FileList | null) => Promise<void>;
  removePhoto:       (tempId: string) => Promise<void>;
  anyPhotoUploading: boolean;
  photoFileRef:      RefObject<HTMLInputElement>;

  // ── Actions ──
  archiveSR:              (id: string) => Promise<void>;
  unarchiveSR:            (sr: ServiceRequestRow) => Promise<void>;
  markSRRead:             (sr: ServiceRequestRow) => Promise<void>;
  refreshServiceRequests: () => Promise<void>;

  // ── Form open state — lifted so wizard results panel can prefill + open ──
  showSRForm:    boolean;
  setShowSRForm: Dispatch<SetStateAction<boolean>>;

  // ── Form fields — lifted for wizard prefill ──
  srType:    string;
  setSrType: Dispatch<SetStateAction<string>>;
  srDesc:    string;
  setSrDesc: Dispatch<SetStateAction<string>>;

  // ── Submit ──
  submitServiceRequest: (payload: SubmitSRPayload) => Promise<void>;
  srSubmitting:         boolean;
  srSubmitError:        string | null;
  clearSRSubmitError:   () => void;

  // ── Actor ──
  actor: SRActor;
}

// ── Submit payload ────────────────────────────────────────────────────────────

// Transient form fields collected before calling submitServiceRequest.
// srType and srDesc are NOT here — engine holds them as lifted state.
// photos are NOT here — engine holds them in photos state.
export interface SubmitSRPayload {
  gemType:        string;
  gemColor:       string;
  shape:          string;
  weightCt:       string;
  dimL:           string;
  dimW:           string;
  dimD:           string;
  quantity:       string;
  customFields:   SRCustomField[];
  contactName:    string;
  contactEmail:   string;
  contactPhone:   string;
  contactAddress: string;
  consentChecked: boolean;
}

// ── Panel props ───────────────────────────────────────────────────────────────

export interface ServiceRequestPanelProps extends ServiceRequestEngineOutput {
  open:       boolean;
  onClose:    () => void;
  onSelectSR: (sr: ServiceRequestRow) => void;
  // Admin-only nav callbacks — undefined on account side
  onBack?:      () => void;
  onDashboard?: () => void;
}

// ── Form props ────────────────────────────────────────────────────────────────

export interface ServiceRequestFormProps {
  open:              boolean;
  existingConsent:   SRExistingConsent;
  srType:            string;
  setSrType:         Dispatch<SetStateAction<string>>;
  srDesc:            string;
  setSrDesc:         Dispatch<SetStateAction<string>>;
  photos:            SRPhotoItem[];
  handlePhotoFiles:  (files: FileList | null) => Promise<void>;
  removePhoto:       (tempId: string) => Promise<void>;
  anyPhotoUploading: boolean;
  photoFileRef:      RefObject<HTMLInputElement>;
  onClose:           () => void;
  onSubmit:          (payload: SubmitSRPayload) => Promise<void>;
  submitting:        boolean;
  submitError:       string | null;
  clearError:        () => void;
  // Profile data for contact prefill
  profileName?:    string | null;
  profileEmail?:   string | null;
  profilePhone?:   string | null;
  profileAddress?: string | null;
}

// ── Account SR detail drawer props ────────────────────────────────────────────

export interface ServiceRequestDrawerProps {
  open:    boolean;
  sr:      ServiceRequestRow | null;
  onClose: () => void;
}

// ── Admin archived SR drawer props ────────────────────────────────────────────

export interface AdminArchivedSRDrawerProps {
  open:      boolean;
  sr:        ServiceRequestRow | null;
  onRecover: () => void;
  onClose:   () => void;
}

// ── Swipeable active SR card props ────────────────────────────────────────────

export interface SwipeableSRCardProps {
  sr:         ServiceRequestRow;
  onSelect:   (sr: ServiceRequestRow) => void;
  onArchive:  (id: string) => void;
  showUnread: boolean;
}

// ── Archived SR card props ────────────────────────────────────────────────────

export interface ArchivedSRCardProps {
  sr:    ServiceRequestRow;
  onTap: (sr: ServiceRequestRow) => void;
}

// ── Tab bar props ─────────────────────────────────────────────────────────────

export interface SRTabBarProps {
  activeTab:    SRTab;
  activeCount:  number;
  archiveCount: number;
  onSelect:     (tab: SRTab) => void;
}

// ── Tile props ────────────────────────────────────────────────────────────────

export interface ServiceRequestTileProps {
  serviceRequests: ServiceRequestRow[];
  onClick:         () => void;
}

// ── SR detail spec block props ────────────────────────────────────────────────

export interface SRSpecBlockProps {
  specs: SRSpecRow[];
}

// ── SR detail contact block props ─────────────────────────────────────────────

export interface SRContactBlockProps {
  contact: SRContactRow[];
}

// ── SR detail photo grid props ────────────────────────────────────────────────

export interface SRPhotoGridProps {
  photos: string[];
}

// ── SR status badge props ─────────────────────────────────────────────────────

export interface SRStatusBadgeProps {
  isArchived: boolean;
  isRead:     boolean;
}