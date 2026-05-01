// frontend/handlers/drawerHandler.ts
//
// Reusable handler for right-slide drawers with z-index 10101.
// Cloned from inline patterns in:
//   - MobileAccount.tsx — drawer open/close state, drawerData management
//   - 3InvoiceDrawer.tsx — inv-drawer right-slide container
//   - 3WorkOrderDrawer.tsx — right-slide drawer
//   - 3ServiceRequestDrawer.tsx — right-slide drawer (z-index: 10101)
//   - 3ShopItemDrawer.tsx — right-slide drawer (z-index: 10101)
//   - 3MenuDrawer.tsx — menu-drawer bottom-slide
//   - useSwipeToClose — swipe right to close
//
// CSS classes used: inv-drawer, inv-drawer-handle, inv-drawer-body,
// inv-drawer-topbar, inv-drawer-close, overlay
// Z-index: 10101 (from MobileShell.css)
//
// This handler provides pure functions for drawer state logic.
// It does NOT manage React state — that stays in the components.

// ── Types ──────────────────────────────────────────────────────────────────

export type DrawerName = 'workorder' | 'invoice' | 'servicereq' | 'shopitem' | null

export interface DrawerState {
  activeDrawer: DrawerName
  drawerData: any
}

// ── Constants ──────────────────────────────────────────────────────────────

/**
 * Z-index for right-slide drawers.
 * Exact from MobileShell.css — inv-drawer, sr-drawer, shop-drawer.
 */
export const DRAWER_Z_INDEX = 10101

// ── Drawer state helpers ───────────────────────────────────────────────────

/**
 * Create initial drawer state.
 */
export function createDrawerState(): DrawerState {
  return { activeDrawer: null, drawerData: null }
}

/**
 * Open a drawer with optional data.
 * Exact from MobileAccount.tsx openDrawer().
 */
export function openDrawer(name: DrawerName, data?: any): DrawerState {
  return { activeDrawer: name, drawerData: data ?? null }
}

/**
 * Close the active drawer.
 * Exact from MobileAccount.tsx closeDrawer().
 */
export function closeDrawer(): DrawerState {
  return { activeDrawer: null, drawerData: null }
}

/**
 * Check if a specific drawer is open.
 */
export function isDrawerOpen(state: DrawerState, name: DrawerName): boolean {
  return state.activeDrawer === name
}

// ── Drawer CSS class builder ───────────────────────────────────────────────

/**
 * Build the className string for a right-slide drawer.
 * Exact from 3InvoiceDrawer.tsx — inv-drawer class pattern.
 */
export function buildDrawerClassName(baseClass: string, isOpen: boolean): string {
  return `${baseClass}${isOpen ? ' open' : ''}`
}

/**
 * Build the className string for the overlay behind a drawer.
 * Exact from 3InvoiceDrawer.tsx — overlay class pattern.
 */
export function buildOverlayClassName(isOpen: boolean): string {
  return `overlay${isOpen ? ' open' : ''}`
}

// ── Drawer inline style ───────────────────────────────────────────────────

/**
 * Build inline style for drawers that use z-index 10101.
 * Exact from 3ServiceRequestDrawer.tsx and 3ShopItemDrawer.tsx.
 */
export function getDrawerZIndexStyle(): React.CSSProperties {
  return { zIndex: DRAWER_Z_INDEX }
}
