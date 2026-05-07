import { useMemo } from 'react'

// ── Types ──────────────────────────────────────────────────────────────────

export interface DashboardProfile {
  name: string
}

export interface DashboardWorkOrder {
  status: 'CREATED' | 'ACCEPTED' | 'COMPLETE' | 'CANCELLED' | 'CONFIRMED'
}

export interface DashboardMessage {
  actor: 'ADMIN' | 'ACCOUNT' | 'SYSTEM'
}

export interface DashboardChatThread {
  account_has_unread: boolean
}

export interface DashboardInvoice {
  paid_at: string | null
}

export interface DashboardSmsPrefs {
  opt_in_work_orders:  boolean | null
  opt_in_tracking:     boolean | null
  opt_in_chat:         boolean | null
  opt_in_purchases:    boolean | null
  opt_in_new_listings: boolean | null
}

export interface DashboardWizardResult {
  feasibility_percent: number
}

export interface DashboardInput {
  profile:             DashboardProfile | null
  workOrders:          DashboardWorkOrder[]
  messages:            DashboardMessage[]
  chatThread:          DashboardChatThread | null
  invoices:            DashboardInvoice[]
  invoiceTotal:        number
  smsPrefs:            DashboardSmsPrefs | null
  latestWizardResult?: DashboardWizardResult | null
}

export interface DashboardState {
  // Notification flags
  hasNewMsg:     boolean
  hasNewWO:      boolean
  hasUpdatedWO:  boolean
  hasUnpaidInv:  boolean
  woLit:         boolean
  invLit:        boolean
  unreadCount:   number
  updateCount:   number

  // Derived data
  recentWO:      DashboardWorkOrder | null
  recentInv:     DashboardInvoice | null
  wizPct:        number | null
  firstName:     string
  greeting:      string
  dateLabel:     string

  // Tile colors
  colors:        TileColors

  // Score ring
  scoreRing:     (pct: number) => ScoreRingValues
}

export interface TileColors {
  chat:    string
  orders:  string
  invoice: string
  feasib:  string
  sms:     string
  est:     string
}

export interface ScoreRingValues {
  r:      number
  circ:   number
  offset: number
}

// ── Constants ──────────────────────────────────────────────────────────────

export const TILE_COLORS: TileColors = {
  chat:    'var(--tile-chat,    #cfdd4e)',
  orders:  'var(--tile-orders,  #6ab0f5)',
  invoice: 'var(--tile-invoice, #86fc84)',
  feasib:  'var(--tile-feasib,  #4ec994)',
  sms:     'var(--tile-sms,     #fbc23c)',
  est:     'var(--tile-est,     #a679f9)',
}

export const BAND_COLORS: Record<string, string> = {
  '80-100': '#59efd8',
  '60-79':  '#38bdf8',
  '40-59':  '#a3e635',
  '18-39':  '#6ce7e1',
  '0-17':   '#f87171',
}

// ── Pure helpers ───────────────────────────────────────────────────────────

export function getGreeting(): string {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 18) return 'Good afternoon'
  return 'Good evening'
}

export function getFirstName(profile: DashboardProfile | null): string {
  return profile?.name?.split(' ')[0] || 'there'
}

export function getDateLabel(): string {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month:   'long',
    day:     'numeric',
  })
}

export function getScoreRing(pct: number): ScoreRingValues {
  const r    = 17
  const circ = 2 * Math.PI * r
  return { r, circ, offset: circ * (1 - pct / 100) }
}

export function getBandColor(band: string): string {
  return BAND_COLORS[band] ?? '#e7e5e4'
}

// ── Hook ───────────────────────────────────────────────────────────────────

export function useDashboard({
  profile,
  workOrders,
  messages,
  chatThread,
  invoices,
  invoiceTotal,
  smsPrefs,
  latestWizardResult,
}: DashboardInput): DashboardState {

  return useMemo(() => {
    // Notification flags
    const hasNewMsg    = !!chatThread?.account_has_unread
    const hasNewWO     = workOrders.some(w => w.status === 'CREATED')
    const hasUpdatedWO = workOrders.some(w => w.status === 'ACCEPTED')
    const hasUnpaidInv = invoices.some(inv => !inv.paid_at)
    const woLit        = hasNewWO || hasUpdatedWO
    const invLit       = hasUnpaidInv
    const unreadCount  = messages.filter(m => m.actor !== 'ACCOUNT').length
    const updateCount  = [hasNewMsg, woLit, invLit].filter(Boolean).length

    // Derived data
    const recentWO  = workOrders[0] ?? null
    const recentInv = invoices[0]   ?? null
    const wizPct    = latestWizardResult
      ? Math.round(latestWizardResult.feasibility_percent)
      : null

    return {
      hasNewMsg,
      hasNewWO,
      hasUpdatedWO,
      hasUnpaidInv,
      woLit,
      invLit,
      unreadCount,
      updateCount,
      recentWO,
      recentInv,
      wizPct,
      firstName:  getFirstName(profile),
      greeting:   getGreeting(),
      dateLabel:  getDateLabel(),
      colors:     TILE_COLORS,
      scoreRing:  getScoreRing,
    }
  }, [profile, workOrders, messages, chatThread, invoices, latestWizardResult])
}
