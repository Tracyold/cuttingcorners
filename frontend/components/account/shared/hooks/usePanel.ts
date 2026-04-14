import { useState, useCallback } from 'react'

// ── Panel names ────────────────────────────────────────────────────────────

export type PanelName =
  | 'dashboard'
  | 'chat'
  | 'workorders'
  | 'invoices'
  | 'wizard'
  | 'results'
  | 'servicerequests'
  | 'inquiries'
  | 'profile'
  | 'menu'
  | 'sms'
  | 'shop'

export type DrawerName =
  | 'workorder-detail'
  | 'invoice-detail'
  | 'result-detail'
  | 'servicerequest-detail'
  | 'shop-detail'

// ── Hook ───────────────────────────────────────────────────────────────────

export function usePanel() {
  const [activePanel,  setActivePanel]  = useState<PanelName | null>(null)
  const [activeDrawer, setActiveDrawer] = useState<DrawerName | null>(null)

  const openPanel  = useCallback((name: PanelName)  => setActivePanel(name),  [])
  const closePanel = useCallback(() => setActivePanel(null),  [])

  const openDrawer  = useCallback((name: DrawerName) => setActiveDrawer(name), [])
  const closeDrawer = useCallback(() => setActiveDrawer(null), [])

  const closeAll = useCallback(() => {
    setActivePanel(null)
    setActiveDrawer(null)
  }, [])

  return {
    activePanel,
    activeDrawer,
    openPanel,
    closePanel,
    openDrawer,
    closeDrawer,
    closeAll,
    isPanelOpen:  (name: PanelName)  => activePanel  === name,
    isDrawerOpen: (name: DrawerName) => activeDrawer === name,
  }
}