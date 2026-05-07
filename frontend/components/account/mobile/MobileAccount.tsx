// components/account/mobile/MobileAccount.tsx
//
// Final mobile composition root.
// All data and types originate from the existing hooks and panel prop
// interfaces — this file holds only UI state (panel/drawer visibility +
// selection) and wires the panels and drawers together.

import { useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { WizardResult as FeasibilityWizardResult } from '@/components/account/mobile/tiles/3FeasibilityTile';
import type { WizardResult } from '../../../lib/wizardResultsService';
import type { PendingUpload } from '../shared/hooks/useChat';

import { useAuth }          from '../shared/hooks/useAuth';
import { useDeleteAccount } from '../shared/hooks/useDeleteAccount';

// ── UI components ──
import Nav3            from './ui/3Nav';
import TabBar3         from './ui/3TabBar';
import MenuDrawer3     from './ui/3MenuDrawer';
import SmsConsent3     from './ui/3SmsConsentModal';
import ShopFeed3       from './ui/3ShopFeed';
import ShopItemDrawer3 from './drawers/3ShopItemDrawer';

// ── Tiles ──
import MessagesTile3        from './tiles/3MessagesTile';
import WorkOrderTile3       from './tiles/3WorkOrderTile';
import InvoicesTile3        from './tiles/3InvoicesTile';
import FeasibilityTile3     from './tiles/3FeasibilityTile';
import InquiriesTile3       from './tiles/3InquiriesTile';
import SmsTile3             from './tiles/3SmsTile';
import ServiceRequestsTile3 from './tiles/3ServiceRequestsTile';
import ProfileTile3         from './tiles/3ProfileTile';
import FeedbackTile3        from './tiles/3FeedbackTile';

// ── Panels ──
import ChatPanel3           from './panels/3ChatPanel';
import OrdersPanel3         from './panels/3OrdersPanel';
import InvoicesPanel3       from './panels/3InvoicesPanel';
import ServiceRequestPanel3 from './panels/3ServiceRequestPanel';
import InquiriesPanel3      from './panels/3InquiriesPanel';
import WizardResultsPanel3  from './panels/3WizardResultsPanel';
import ProfilePanel3        from './panels/3ProfilePanel';
import FeasibilityPanel     from './panels/3FeasibilityPanel';

// ── Drawers ──
import WorkOrderDrawer3      from './drawers/3WorkOrderDrawer';
import InvoiceDrawer3        from './drawers/3InvoiceDrawer';
import ServiceRequestDrawer3 from './drawers/3ServiceRequestDrawer';

// ── Panel & drawer prop derivation ──
// Every prop type below is derived directly from the consuming component's
// public prop contract. We never invent a shape; we mirror what each panel
// and drawer already declares.
type OrdersPanelProps         = React.ComponentProps<typeof OrdersPanel3>;
type InvoicesPanelProps       = React.ComponentProps<typeof InvoicesPanel3>;
type ServiceRequestPanelProps = React.ComponentProps<typeof ServiceRequestPanel3>;
type InquiriesPanelProps      = React.ComponentProps<typeof InquiriesPanel3>;
type ChatPanelProps           = React.ComponentProps<typeof ChatPanel3>;
type ProfilePanelProps        = React.ComponentProps<typeof ProfilePanel3>;

type WorkOrderDrawerProps      = React.ComponentProps<typeof WorkOrderDrawer3>;
type InvoiceDrawerProps        = React.ComponentProps<typeof InvoiceDrawer3>;
type ServiceRequestDrawerProps = React.ComponentProps<typeof ServiceRequestDrawer3>;
type ShopItemDrawerProps       = React.ComponentProps<typeof ShopItemDrawer3>;
type SmsConsentProps           = React.ComponentProps<typeof SmsConsent3>;
type MenuDrawerProps           = React.ComponentProps<typeof MenuDrawer3>;

// Drawer-side row types are the wider/full shapes (drawer-required fields).
type FullWorkOrder      = NonNullable<WorkOrderDrawerProps['wo']>;
type FullInvoice        = InvoiceDrawerProps['invoice'];
type FullServiceRequest = ServiceRequestDrawerProps['sr'];
type FullShopItem       = NonNullable<ShopItemDrawerProps['item']>;

// MobileWorkOrder — the intersection that satisfies BOTH the panel contract
// (requires title) and the drawer contract (requires account_user_id for the
// acceptWO hook call). The hook's WorkOrderRow has all of these; pages/account.tsx
// passes the hook array, so the structural assignment compiles.
type MobileWorkOrder = FullWorkOrder & { account_user_id: string; title: string };

// MobileInvoice — the hook types line_items as `unknown` (JSONB column).
// We carry that through as `unknown` so pages/account.tsx can pass the hook
// array unmodified. Panel / drawer receive converted versions via helpers below.
type MobileInvoice = Omit<FullInvoice, 'line_items'> & { line_items: unknown };

// Items as the panels emit them in their onSelect* callbacks.
type OrdersPanelWorkOrder    = Parameters<OrdersPanelProps['onSelectWO']>[0];
type InvoicesPanelInvoice    = Parameters<InvoicesPanelProps['onSelectInvoice']>[0];
type ServiceRequestPanelItem = Parameters<ServiceRequestPanelProps['onSelectSR']>[0];

// Profile / SMS prefs / admin info shapes come from the panel contracts.
type ProfilePanelProfile         = NonNullable<ProfilePanelProps['profile']>;
type ProfilePanelSmsPrefs        = NonNullable<ProfilePanelProps['smsPrefs']>;
type ProfilePanelEditableProfile = Parameters<ProfilePanelProps['setEditProfile']>[0];
type ProfilePanelSmsToggle       = Parameters<ProfilePanelProps['onSmsToggle']>[0];
type ServiceRequestPanelProfile  = NonNullable<ServiceRequestPanelProps['profile']>;

type OrdersPanelAdminInfo = NonNullable<OrdersPanelProps['adminInfo']>;

// SmsConsent3 toggle descriptor.
type SmsConsentToggle = SmsConsentProps['toggle'];

// MenuDrawer3 navigation target — the canonical PanelName used by all panels.
type PanelName = Parameters<MenuDrawerProps['onNavigate']>[0];

// Right-side drawer visibility names. Local to this composition root.
type DrawerName = 'workorder' | 'invoice' | 'servicereq' | 'shopitem' | null;

// ── line_items bridge helpers ──
// The hook types line_items as `unknown` (JSONB). Both panel and drawer need
// concrete array shapes. These helpers do a safe runtime check, then use one
// bounded assertion to satisfy each consumer's declared interface.
// No `any` is introduced; the assertion is scoped to the specific array type.

function toPanelLineItems(v: unknown): InvoicesPanelInvoice['line_items'] {
  if (!Array.isArray(v)) return null;
  return v as InvoicesPanelInvoice['line_items'];
}

function toDrawerLineItems(v: unknown): FullInvoice['line_items'] {
  if (!Array.isArray(v)) return null;
  return v as FullInvoice['line_items'];
}

// ── Public props ──
// Wired from pages/account.tsx. Each list / value type is the upstream panel
// contract; pages/account.tsx already passes the matching hook output.
export interface MobileAccountProps {
  // Auth
  session:           Session | null;
  // Profile
  profile:           ProfilePanelProfile | null;
  editProfile:       ProfilePanelEditableProfile | null;
  smsPrefs:          ProfilePanelSmsPrefs | null;
  adminInfo:         OrdersPanelAdminInfo | null;
  profileSaving:     boolean;
  profileFlash:      boolean;
  hasProfileChanges: boolean;
  // Counts + lists
  invoiceCount:      number;
  invoiceTotal:      number;
  workOrders:        MobileWorkOrder[];
  invoices:          MobileInvoice[];
  inquiries:         InquiriesPanelProps['inquiries'];
  serviceRequests:   FullServiceRequest[];
  // Chat
  chatThread:        { account_has_unread: boolean } | null;
  messages:          ChatPanelProps['messages'];
  chatInput:         string;
  chatSending:       boolean;
  chatUploading:     boolean;
  chatError?:        string | null;
  clearChatError?:   () => void;
  pendingUploads?:   PendingUpload[];
  dismissPendingUpload?: (tempId: string) => void;
  chatEndRef:        React.RefObject<HTMLDivElement>;
  chatFileRef:       React.RefObject<HTMLInputElement>;
  // Wizard tile feed (FeasibilityTile3 only consumes the narrow tile type)
  latestWizardResult?: FeasibilityWizardResult;
  // Setters
  // useProfile's useState holds AccountProfile which includes account_user_id.
  // We require it here so the setter stays compatible with that state type.
  setEditProfile:    (v: ProfilePanelEditableProfile & { account_user_id: string }) => void;
  setChatInput:      (v: string) => void;
  // Actions
  saveProfile:       () => void;
  toggleSms:         (col: string, val: boolean) => void;
  acceptWO:          (wo: MobileWorkOrder) => void;
  sendChat:          () => void;
  openChatDrawer:    () => void;
  handleChatFile:    (e: React.ChangeEvent<HTMLInputElement>) => void;
  // Fallback refreshers for realtime-less tables.
  refreshInquiries:       () => Promise<void>;
  refreshServiceRequests: () => Promise<void>;
  deleteAccount:     (confirmText: string) => Promise<{ error?: string }>;
}

export default function MobileAccount(props: MobileAccountProps) {

  // ── Shared hooks ──
  const { signOut } = useAuth();
  const deleteHook  = useDeleteAccount(props.session);

  // ── Pull-throughs ──
  const inquiries       = props.inquiries;
  const serviceRequests = props.serviceRequests;
  const workOrders      = props.workOrders;
  const invoices        = props.invoices;
  const invoiceTotal    = props.invoiceTotal;
  const invoiceCount    = props.invoiceCount;

  // ── Panel state ──
  // Only one panel can be open at a time. Panels slide up from the bottom.
  const [activePanel, setActivePanel] = useState<PanelName>(null);

  // ── Drawer state ──
  // One slot per drawer type. The matching slot is filled when the user
  // selects an item from the corresponding panel; the drawer reads the slot
  // directly with the type the drawer already declares.
  const [activeDrawer,    setActiveDrawer]    = useState<DrawerName>(null);
  const [selectedWO,      setSelectedWO]      = useState<MobileWorkOrder | null>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<MobileInvoice | null>(null);
  const [selectedSR,      setSelectedSR]      = useState<FullServiceRequest | null>(null);
  const [selectedShopItem, setSelectedShopItem] = useState<FullShopItem | null>(null);

  // ── Menu state ──
  const [menuOpen, setMenuOpen] = useState(false);

  // ── SMS consent state ──
  // When a user taps an SMS toggle to enable it, we show a consent modal first.
  // pendingSmsConsent holds which toggle is waiting for confirmation.
  const [pendingSmsConsent, setPendingSmsConsent] = useState<SmsConsentToggle | null>(null);

  // ── Service Request form state (mobile) ──
  // Held here so the wizard-results flow can pre-fill the form before opening
  // the sheet (handleWizardServiceRequest). Submission, gate check, and
  // submitting-boolean all live inside ServiceRequestPanel3 itself.
  const [showSRForm, setShowSRForm] = useState(false);
  const [srType,     setSrType]     = useState('');
  const [srDesc,     setSrDesc]     = useState('');

  // ── Panel helpers ──
  const openPanel  = (name: PanelName) => setActivePanel(name);
  const closePanel = ()                => setActivePanel(null);

  // ── Drawer close ──
  const closeDrawer = () => {
    setActiveDrawer(null);
    setSelectedWO(null);
    setSelectedInvoice(null);
    setSelectedSR(null);
    setSelectedShopItem(null);
  };

  // ── Drawer-open handlers ──
  // Each callback receives the panel's narrow item shape and looks up the
  // corresponding full row in the source list by id, so the drawer always
  // gets the upstream row exactly as its prop contract requires.
  const handleSelectWO = (wo: OrdersPanelWorkOrder) => {
    const full = workOrders.find(w => w.work_order_id === wo.work_order_id);
    if (!full) return;
    setSelectedWO(full);
    setActiveDrawer('workorder');
  };
  const handleSelectInvoice = (inv: InvoicesPanelInvoice) => {
    const full = invoices.find(i => i.invoice_id === inv.invoice_id);
    if (!full) return;
    setSelectedInvoice(full);
    setActiveDrawer('invoice');
  };
  const handleSelectSR = (sr: ServiceRequestPanelItem) => {
    const full = serviceRequests.find(s => s.service_request_id === sr.service_request_id);
    if (!full) return;
    setSelectedSR(full);
    setActiveDrawer('servicereq');
  };
  const handleSelectShopItem = (item: FullShopItem) => {
    setSelectedShopItem(item);
    setActiveDrawer('shopitem');
  };

  // ── Accept WO helper ──
  // Looks up the full MobileWorkOrder by id so both panel and drawer callbacks
  // can resolve to the same typed value without narrowing casts.
  const handleAcceptWO = (wo: { work_order_id: string }) => {
    const full = workOrders.find(w => w.work_order_id === wo.work_order_id);
    if (full) props.acceptWO(full);
  };

  // ── SMS toggle handler ──
  // Turning OFF: call toggleSms directly (no consent needed).
  // Turning ON:  show consent modal first, then call toggleSms on confirm.
  const handleSmsClick = (toggle: ProfilePanelSmsToggle) => {
    const current = props.smsPrefs;
    const isOn = !!(current && (current as ProfilePanelSmsPrefs & Record<string, boolean | null | undefined>)[toggle.col]);
    if (isOn) {
      props.toggleSms(toggle.col, false);
    } else {
      setPendingSmsConsent(toggle);
    }
  };
  const handleSmsConfirm = () => {
    if (!pendingSmsConsent) return;
    props.toggleSms(pendingSmsConsent.col, true);
    setPendingSmsConsent(null);
  };

  // ── Theme toggle ──
  // Switches data-theme attribute on <html> between dark and light.
  // MobileShell.css has :root[data-theme="dark"] and :root[data-theme="light"] rules.
  const toggleTheme = () => {
    const html = document.documentElement;
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
  };

  // ── Wizard → Service Request pre-fill ──
  // Wizard results panel calls this on "Create Service Request".
  // We populate the form state, then flip showSRForm=true to open the sheet.
  // The ServiceRequestPanel3 sees the pre-filled values and lets the user
  // edit them before submitting.
  const handleWizardServiceRequest = (result: WizardResult) => {
    setSrType(result.recommendation ?? '');
    const stone = [result.stone_variety, result.stone_species].filter(Boolean).join(' ');
    setSrDesc(
      'Stone: ' + stone +
      '\nWizard Score: ' + Math.round(result.feasibility_percent) + '%' +
      '\nRecommendation: ' + result.recommendation
    );
    setShowSRForm(true);
  };

  // ── Derived values used in the welcome block ──
  const hour      = new Date().getHours();
  const greeting  = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  const firstName = props.profile?.name?.split(' ')[0] || 'there';
  const dateLabel = new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric',
  });
  // Count how many notification categories have something new
  const updateCount = [
    !!props.chatThread?.account_has_unread,
    workOrders.some(w => w.status === 'CREATED' || w.status === 'ACCEPTED'),
    invoices.some(inv => !inv.paid_at),
  ].filter(Boolean).length;

  // Whether the user has an active work order (needed by SMS consent modal)
  const hasOpenWorkOrder = workOrders.some(
    w => w.status === 'CREATED' || w.status === 'ACCEPTED'
  );

  // ── Wizard results for the feasibility tile ──
  const wizardResults = props.latestWizardResult ? [props.latestWizardResult] : [];

  return (
    // mobile-shell: the root container -- max-width 430px, centered, dark/light themed
    <div className="mobile-shell">

      {/* ── SMS Consent Modal ── */}
      {/* Appears above everything when user tries to enable an SMS toggle */}
      {pendingSmsConsent && (
        <SmsConsent3
          toggle={pendingSmsConsent}
          hasOpenWorkOrder={hasOpenWorkOrder}
          onConfirm={handleSmsConfirm}
          onCancel={() => setPendingSmsConsent(null)}
        />
      )}

      {/* ── Nav ── */}
      {/* Sticky top bar with CCG logo, theme toggle, hamburger */}
      <Nav3
        onMenuOpen={() => setMenuOpen(true)}
        onThemeToggle={toggleTheme}
      />

      {/* ── Feed ── */}
      {/* The main scrollable content area */}
      <div className="feed">

        {/* Welcome block -- greeting + date + update count */}
        <div className="welcome">
          <div className="welcome-name">{greeting}, {firstName}.</div>
          <div className="welcome-meta">
            {dateLabel}&nbsp;·&nbsp;
            {updateCount > 0 ? (
              <span>{updateCount} update{updateCount !== 1 ? 's' : ''}</span>
            ) : (
              <span style={{
                color: 'var(--text-mob-muted)' }}>All caught up</span>
            )}
          </div>
          {/* Login timestamp -- set dynamically */}
          <div
            id="login-stamp"
            style={{
              fontFamily: 'var(--font-mob-mono)', fontSize: '1vem',
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'var(--text-mob-muted)', marginTop: 6, opacity: 0.6,
            }}
          >
            {`Signed in ${new Date().toLocaleDateString('en-US', {
              weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
            })} · ${new Date().toLocaleTimeString('en-US', {
              hour: 'numeric', minute: '2-digit', hour12: true,
            })}`}
          </div>
        </div>

        {/* ── Notification tiles ── */}
        <div className="feed-block">

          {/* Messages tile -- full width, wide variant */}
          <MessagesTile3
            chatThread={props.chatThread}
            messages={props.messages}
            onClick={() => openPanel('chat')}
          />

          {/* Work Orders + Invoices -- two column row */}
          <div className="tile-row">
            <WorkOrderTile3
              workOrders={workOrders}
              onClick={() => openPanel('orders')}
            />
            <InvoicesTile3
              invoices={invoices}
              invoiceTotal={invoiceTotal}
              onClick={() => openPanel('invoices')}
            />
          </div>

          {/* Feasibility -- wide variant */}
          <FeasibilityTile3
            results={wizardResults}
            onClick={() => openPanel('wizard')}
          />

          {/* Inquiries + SMS -- two column row */}
          <div className="tile-row">
            <InquiriesTile3
              inquiries={inquiries}
              onClick={() => openPanel('inquiries')}
            />
            <SmsTile3
              smsPrefs={props.smsPrefs}
              onClick={() => openPanel('profile')}
            />
          </div>

          {/* Service Requests -- wide variant */}
          <ServiceRequestsTile3
            serviceRequests={serviceRequests}
            onClick={() => openPanel('servicereq')}
          />

          {/* Profile -- slim bar */}
          <ProfileTile3
            profile={props.profile}
            onClick={() => openPanel('profile')}
          />

          {/* Feedback tile -- star rating, self-contained */}
          <FeedbackTile3 session={props.session} />

        </div>{/* end feed-block */}

        {/* ── Shop feed ── */}
        <ShopFeed3
          session={props.session}
          onItemClick={handleSelectShopItem}
        />

      </div>{/* end feed */}

      {/* ── Tab bar ── */}
      <TabBar3
        onMenuOpen={() => setMenuOpen(true)}
        onChatOpen={() => openPanel('chat')}
        onInvoices={() => openPanel('invoices')}
        onThemeToggle={toggleTheme}
        hasUnread={!!props.chatThread?.account_has_unread}
      />

      {/* ── Panels ── */}

      <ChatPanel3
        open={activePanel === 'chat'}
        messages={props.messages}
        chatInput={props.chatInput}
        chatSending={props.chatSending}
        chatUploading={props.chatUploading}
        chatEndRef={props.chatEndRef}
        chatFileRef={props.chatFileRef}
        setChatInput={props.setChatInput}
        sendChat={props.sendChat}
        chatError={props.chatError}
        clearChatError={props.clearChatError}
        pendingUploads={props.pendingUploads}
        dismissPendingUpload={props.dismissPendingUpload}
        handleChatFile={props.handleChatFile}
        onClose={closePanel}
        onOpen={props.openChatDrawer}
      />

      <OrdersPanel3
        open={activePanel === 'orders'}
        workOrders={workOrders}
        adminInfo={props.adminInfo}
        profile={props.profile}
        onSelectWO={handleSelectWO}
        onAcceptWO={handleAcceptWO}
        onClose={closePanel}
      />

      <InvoicesPanel3
        open={activePanel === 'invoices'}
        invoices={invoices.map(inv => ({
          invoice_id:   inv.invoice_id,
          paid_at:      inv.paid_at,
          total_amount: inv.total_amount,
          line_items:   toPanelLineItems(inv.line_items),
        }))}
        onSelectInvoice={handleSelectInvoice}
        onClose={closePanel}
      />

      <ServiceRequestPanel3
        open={activePanel === 'servicereq'}
        serviceRequests={serviceRequests}
        session={props.session}
        profile={props.profile}
        onSelectSR={handleSelectSR}
        onClose={closePanel}
        refreshServiceRequests={props.refreshServiceRequests}
        showSRForm={showSRForm}
        setShowSRForm={setShowSRForm}
        srType={srType}
        setSrType={setSrType}
        srDesc={srDesc}
        setSrDesc={setSrDesc}
      />

      <InquiriesPanel3
        open={activePanel === 'inquiries'}
        inquiries={inquiries}
        onClose={closePanel}
        refreshInquiries={props.refreshInquiries}
      />

      <WizardResultsPanel3
        open={activePanel === 'wizard'}
        onClose={closePanel}
        onCreateServiceRequest={(result) => {
          handleWizardServiceRequest(result);
          openPanel('servicereq');
        }}
      />

      <FeasibilityPanel
        open={activePanel === 'feasibility'}
        onClose={closePanel}
      />

      <ProfilePanel3
        open={activePanel === 'profile'}
        profile={props.profile}
        editProfile={props.editProfile}
        smsPrefs={props.smsPrefs}
        profileSaving={props.profileSaving}
        profileFlash={props.profileFlash}
        hasProfileChanges={props.hasProfileChanges}
        invoiceCount={invoiceCount}
        invoiceTotal={invoiceTotal}
        hasOpenWorkOrder={hasOpenWorkOrder}
        setEditProfile={(v) => props.setEditProfile({ ...v, account_user_id: props.session?.user.id ?? '' })}
        saveProfile={props.saveProfile}
        onSmsToggle={handleSmsClick}
        onClose={closePanel}
        // Delete account logic
        showDeleteModal={deleteHook.showDeleteModal}
        setShowDeleteModal={deleteHook.setShowDeleteModal}
        deleteConfirmText={deleteHook.deleteConfirmText}
        setDeleteConfirmText={deleteHook.setDeleteConfirmText}
        deleteError={deleteHook.deleteError}
        deleting={deleteHook.deleting}
        onOpenDeleteModal={deleteHook.openDeleteModal}
        onDeleteAccount={deleteHook.deleteAccount}
      />

      {/* ── Drawers ── */}
      {/* Each drawer slides in from the right. Only one is open at a time.
          Each drawer reads its own typed selection slot. RENDERED LAST. */}

      <MenuDrawer3
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onNavigate={(panel) => { setMenuOpen(false); openPanel(panel); }}
        onSignOut={signOut}
      />

      <WorkOrderDrawer3
        open={activeDrawer === 'workorder'}
        wo={selectedWO}
        adminInfo={props.adminInfo}
        profile={props.profile}
        onAccept={handleAcceptWO}
        onClose={closeDrawer}
      />

      {selectedInvoice && (
        <InvoiceDrawer3
          open={activeDrawer === 'invoice'}
          invoice={{ ...selectedInvoice, line_items: toDrawerLineItems(selectedInvoice.line_items) }}
          profile={props.profile}
          adminInfo={props.adminInfo}
          onClose={closeDrawer}
        />
      )}

      {selectedSR && (
        <ServiceRequestDrawer3
          open={activeDrawer === 'servicereq'}
          sr={selectedSR}
          onClose={closeDrawer}
        />
      )}

      <ShopItemDrawer3
        open={activeDrawer === 'shopitem'}
        item={selectedShopItem}
        session={props.session}
        onClose={closeDrawer}
        refreshInquiries={props.refreshInquiries}
      />

    </div>
  );
}
