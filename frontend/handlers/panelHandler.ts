// frontend/handlers/panelHandler.ts
//
// Reusable handler for bottom-slide panels.
// Cloned from inline patterns in:
//   - MobileAccount.tsx — panel open/close state management
//   - usePanel.ts — panel/drawer state hook
//   - 3ProfilePanel.tsx — slide-panel class pattern
//   - 3ChatPanel.tsx — slide-panel class pattern
//   - 3OrdersPanel.tsx — slide-panel class pattern
//   - 3InvoicesPanel.tsx — slide-panel class pattern
//   - AdminDashboardPanel.tsx — slide-panel class pattern
//   - useSwipeDownToClose — swipe down to close
//
// CSS classes used: slide-panel, panel-header, panel-title, panel-close
// Panels slide up from the bottom. Only one is open at a time.
//
// This handler provides pure functions for panel state logic.
// It does NOT manage React state — that stays in the components.

// ── Types ──────────────────────────────────────────────────────────────────

export type PanelName =
  | 'chat' | 'orders' | 'invoices' | 'servicereq'
  | 'inquiries' | 'wizard' | 'profile' | 'feasibility' | null

export interface PanelState {
  activePanel: PanelName
}

// ── Panel state helpers ────────────────────────────────────────────────────

/**
 * Create initial panel state.
 */
export function createPanelState(): PanelState {
  return { activePanel: null }
}

/**
 * Open a panel.
 * Exact from MobileAccount.tsx openPanel().
 */
export function openPanel(name: PanelName): PanelState {
  return { activePanel: name }
}

/**
 * Close the active panel.
 * Exact from MobileAccount.tsx closePanel().
 */
export function closePanel(): PanelState {
  return { activePanel: null }
}

/**
 * Check if a specific panel is open.
 * Exact from usePanel.ts isPanelOpen().
 */
export function isPanelOpen(state: PanelState, name: PanelName): boolean {
  return state.activePanel === name
}

// ── Panel CSS class builder ────────────────────────────────────────────────

/**
 * Build the className string for a slide-up panel.
 * Exact from 3ProfilePanel.tsx — slide-panel class pattern.
 */
export function buildPanelClassName(isOpen: boolean): string {
  return `slide-panel${isOpen ? ' open' : ''}`
}

// ── Menu drawer state ──────────────────────────────────────────────────────

/**
 * Build the className string for the menu drawer.
 * Exact from 3MenuDrawer.tsx — menu-drawer class pattern.
 */
export function buildMenuDrawerClassName(isOpen: boolean): string {
  return `menu-drawer${isOpen ? ' open' : ''}`
}

/**
 * Build the className string for the menu overlay.
 * Exact from 3MenuDrawer.tsx — menu-overlay class pattern.
 */
export function buildMenuOverlayClassName(isOpen: boolean): string {
  return `menu-overlay${isOpen ? ' open' : ''}`
}

// ── Navigation items ───────────────────────────────────────────────────────

/**
 * Panel navigation items for the menu drawer.
 * Exact from 3MenuDrawer.tsx — PANEL_ITEMS array.
 */
export const PANEL_ITEMS: { label: string; panel: PanelName; color?: string }[] = [
  { label: 'Dashboard',        panel: null },
  { label: 'Wizard',           panel: 'feasibility', color: 'var(--tile-feasib)' },
  { label: 'Messages',         panel: 'chat' },
  { label: 'Work Orders',      panel: 'orders' },
  { label: 'Invoices',         panel: 'invoices' },
  { label: 'Wizard Results',   panel: 'wizard' },
  { label: 'Service Requests', panel: 'servicereq' },
  { label: 'Inquiries',        panel: 'inquiries' },
  { label: 'Profile',          panel: 'profile' },
]
