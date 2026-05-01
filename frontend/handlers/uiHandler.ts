// frontend/handlers/uiHandler.ts
//
// Reusable UI state handlers.
// Cloned from inline patterns in:
//   - MobileAccount.tsx — panel/drawer open/close, theme toggle, SMS consent flow
//   - usePanel.ts — panel/drawer state management
//   - MobileAccount.tsx — greeting, firstName, dateLabel, updateCount derivations
//
// This handler provides pure functions for UI state logic.
// It does NOT manage React state — that stays in the components.

// ── Types ──────────────────────────────────────────────────────────────────

export type PanelName =
  | 'chat' | 'orders' | 'invoices' | 'servicereq'
  | 'inquiries' | 'wizard' | 'profile' | 'feasibility' | null

export type DrawerName = 'workorder' | 'invoice' | 'servicereq' | 'shopitem' | null

// ── Theme toggle ───────────────────────────────────────────────────────────

/**
 * Toggle the data-theme attribute on <html> between dark and light.
 * Exact from MobileAccount.tsx toggleTheme().
 */
export function toggleTheme(): void {
  const html = document.documentElement
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
  html.setAttribute('data-theme', next)
}

/**
 * Get the current theme.
 */
export function getCurrentTheme(): 'dark' | 'light' {
  return (document.documentElement.getAttribute('data-theme') as 'dark' | 'light') || 'dark'
}

// ── Welcome block derivations ──────────────────────────────────────────────

/**
 * Get time-of-day greeting.
 * Exact from MobileAccount.tsx greeting derivation.
 */
export function getGreeting(): string {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 18) return 'Good afternoon'
  return 'Good evening'
}

/**
 * Get first name from profile.
 * Exact from MobileAccount.tsx firstName derivation.
 */
export function getFirstName(profile: any): string {
  return profile?.name?.split(' ')[0] || 'there'
}

/**
 * Get current date as a readable label.
 * Exact from MobileAccount.tsx dateLabel derivation.
 */
export function getDateLabel(): string {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric',
  })
}

/**
 * Get login timestamp string.
 * Exact from MobileAccount.tsx login-stamp rendering.
 */
export function getLoginStamp(): string {
  return `Signed in ${new Date().toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
  })} · ${new Date().toLocaleTimeString('en-US', {
    hour: 'numeric', minute: '2-digit', hour12: true,
  })}`
}

// ── Update count ───────────────────────────────────────────────────────────

/**
 * Count how many notification categories have something new.
 * Exact from MobileAccount.tsx updateCount derivation.
 */
export function getUpdateCount(
  chatThread: any,
  workOrders: any[],
  invoices: any[],
): number {
  return [
    !!chatThread?.account_has_unread,
    workOrders.some(w => w.status === 'CREATED' || w.status === 'ACCEPTED'),
    invoices.some(inv => !inv.paid_at),
  ].filter(Boolean).length
}

// ── Has open work order ────────────────────────────────────────────────────

/**
 * Check if user has an active work order.
 * Exact from MobileAccount.tsx hasOpenWorkOrder derivation.
 */
export function hasOpenWorkOrder(workOrders: any[]): boolean {
  return workOrders.some(
    w => w.status === 'CREATED' || w.status === 'ACCEPTED'
  )
}

// ── SMS consent flow ───────────────────────────────────────────────────────

/**
 * Determine if SMS toggle should show consent modal or toggle directly.
 * Exact from MobileAccount.tsx handleSmsClick() logic.
 * Returns true if consent modal should be shown (turning ON).
 */
export function shouldShowSmsConsent(smsPrefs: any, toggleCol: string): boolean {
  return !smsPrefs?.[toggleCol]
}

// ── Wizard → Service Request pre-fill ──────────────────────────────────────

/**
 * Build pre-fill data for a service request from a wizard result.
 * Exact from MobileAccount.tsx handleWizardServiceRequest().
 */
export function buildWizardServiceRequestPrefill(result: any): { type: string; desc: string } {
  const stone = [result.stone_variety, result.stone_species].filter(Boolean).join(' ')
  return {
    type: result.recommendation ?? '',
    desc:
      'Stone: ' + stone +
      '\nWizard Score: ' + Math.round(result.feasibility_percent) + '%' +
      '\nRecommendation: ' + result.recommendation,
  }
}
