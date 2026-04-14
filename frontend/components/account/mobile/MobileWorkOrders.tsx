import { useState, useRef } from 'react'
import { supabase } from '../../../lib/supabase'
import { formatMoney, fmtDate, fmtTime } from '../../../lib/utils'
import {
  getDetailRows,
  getActivityLog,
  handleConfirmAddress,
  handleCloseModal,
  handleEditAddress,
} from '../shared/1WorkOrderDetail'
import { getFormattedDate } from '../shared/1WorkOrderList'

// ── Status config ──────────────────────────────────────────────────────────

const STATUS: Record<string, { bg: string; color: string; bar: string }> = {
  CREATED:    { bg: 'rgba(207,221,78,0.12)',   color: 'var(--gold)',       bar: 'var(--gold)'       },
  ACCEPTED:   { bg: 'rgba(45,212,191,0.12)',   color: '#2dd4bf',           bar: '#2dd4bf'           },
  'IN PROGRESS':{ bg: 'rgba(106,176,245,0.12)',color: 'var(--tile-orders)',bar: 'var(--tile-orders)'},
  COMPLETED:  { bg: 'rgba(78,201,148,0.12)',   color: 'var(--tile-feasib)',bar: 'var(--tile-feasib)'},
  CONFIRMED:  { bg: 'rgba(120,80,200,0.12)',   color: '#a78bfa',           bar: '#a78bfa'           },
  CANCELLED:  { bg: 'rgba(248,113,113,0.12)',  color: '#f87171',           bar: '#f87171'           },
}

function statusStyle(s: string) {
  return STATUS[s] ?? STATUS['CREATED']
}

// ── Props ──────────────────────────────────────────────────────────────────

interface Props {
  isOpen:             boolean
  onClose:            () => void
  workOrders:         any[]
  adminInfo:          any
  profile:            any
  selectedWO:         any
  showAddressEdit:    boolean
  tempAddress:        string
  addressConfirmed:   boolean
  setWorkOrders:      (fn: any) => void
  onSelectWO:         (wo: any) => void
  onAcceptWO:         (wo: any) => void
  setSelectedWO:      (fn: any) => void
  setShowAddressEdit: (v: boolean) => void
  setTempAddress:     (v: string) => void
  setAddressConfirmed:(v: boolean) => void
}

// ── Component ──────────────────────────────────────────────────────────────

export default function MobileWorkOrders({
  isOpen, onClose,
  workOrders, adminInfo, profile,
  selectedWO, showAddressEdit, tempAddress, addressConfirmed,
  setWorkOrders, onSelectWO, onAcceptWO,
  setSelectedWO, setShowAddressEdit, setTempAddress, setAddressConfirmed,
}: Props) {

  const [drawerOpen,      setDrawerOpen]      = useState(false)
  const [altShipping,     setAltShipping]     = useState(false)
  const [altName,         setAltName]         = useState('')
  const [altAddress,      setAltAddress]      = useState('')
  const [altSaved,        setAltSaved]        = useState(false)
  const drawerRef                   = useRef<HTMLDivElement>(null)

  // ── Drag to close drawer ──
  const dragRef   = useRef<{ startX: number; dragging: boolean }>({ startX: 0, dragging: false })

  const onDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX
    dragRef.current = { startX: x, dragging: false }
  }

  const onDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    const x  = 'touches' in e ? e.touches[0].clientX : e.clientX
    const dx = x - dragRef.current.startX
    if (!dragRef.current.dragging && Math.abs(dx) > 6) dragRef.current.dragging = true
    if (dragRef.current.dragging && dx > 0 && drawerRef.current) {
      drawerRef.current.style.transform = `translateX(${dx}px)`
    }
  }

  const onDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    const x  = 'changedTouches' in e ? e.changedTouches[0].clientX : e.clientX
    const dx = x - dragRef.current.startX
    if (drawerRef.current) drawerRef.current.style.transform = ''
    if (dragRef.current.dragging && dx > 80) closeDrawer()
    dragRef.current.dragging = false
  }

  const openDrawer = (wo: any) => {
    onSelectWO(wo)
    setAltShipping(false)
    setAltName('')
    setAltAddress('')
    setAltSaved(false)
    setDrawerOpen(true)
  }

  const saveAltShipping = async () => {
    if (!altName.trim() || !altAddress.trim() || !selectedWO) return
    const log = [
      ...(Array.isArray(selectedWO.edit_history) ? selectedWO.edit_history : []),
      { action: 'Alternate shipping address added by user', by: 'user', at: new Date().toISOString() },
    ]
    await supabase
      .from('work_orders')
      .update({
        wo_recipient_name:    altName.trim(),
        wo_shipping_address:  altAddress.trim(),
        edit_history:         log,
      })
      .eq('work_order_id', selectedWO.work_order_id)

    setSelectedWO((prev: any) => ({
      ...prev,
      wo_recipient_name:   altName.trim(),
      wo_shipping_address: altAddress.trim(),
      edit_history:        log,
    }))
    setWorkOrders((prev: any[]) =>
      prev.map(w => w.work_order_id === selectedWO.work_order_id
        ? { ...w, wo_recipient_name: altName.trim(), wo_shipping_address: altAddress.trim(), edit_history: log }
        : w
      )
    )
    setAltSaved(true)
    setAltShipping(false)
  }

  const closeDrawer = () => {
    setDrawerOpen(false)
    handleCloseModal(setSelectedWO, setShowAddressEdit, setAddressConfirmed)
  }


  return (
    <>
      <style>{`
        .slide-panel{position:fixed;left:0;right:0;max-width:430px;margin:0 auto;top:0;bottom:62px;z-index:105;background:var(--bg);display:flex;flex-direction:column;transform:translateY(100%);transition:transform 420ms cubic-bezier(0.16,1,0.3,1)}
        .slide-panel.open{transform:translateY(0)}
        .panel-header{display:flex;align-items:center;justify-content:space-between;padding:14px 18px;background:var(--bg-deep);border-bottom:0.5px solid var(--bdr2);flex-shrink:0}
        .panel-title{font-family:var(--font-mono);font-size:10px;letter-spacing:0.24em;text-transform:uppercase;color:var(--text-muted)}
        .panel-close{background:none;border:none;color:var(--text-muted);font-size:16px;cursor:pointer;padding:2px 6px}
        .orders-list{padding:16px;display:flex;flex-direction:column;gap:10px;overflow-y:auto;flex:1}
        .order-tile{background:var(--bg-card);border:0.5px solid var(--bdr2);padding:16px;cursor:pointer;position:relative;transition:all 200ms ease}
        .order-status{display:inline-flex;padding:2px 8px;font-family:var(--font-mono);font-size:8.5px;letter-spacing:0.15em;text-transform:uppercase;margin-bottom:8px}
        .order-title{font-family:var(--font-display);font-size:16px;color:var(--text);margin-bottom:4px}
        .order-meta{font-family:var(--font-ui);font-size:11px;color:var(--text-muted)}
        .order-price{font-family:var(--font-mono);font-size:17px;color:#30b162;margin-top:6px}
        .order-accept{background:var(--gold);color:var(--bg-deep);border:none;padding:8px 16px;font-family:var(--font-mono);font-size:9px;letter-spacing:0.18em;text-transform:uppercase;cursor:pointer;margin-top:10px;transition:opacity 180ms ease}
        .order-accept:hover{opacity:0.85}
        .wo-drawer{position:fixed;inset:0;z-index:500;transform:translateX(100%);transition:transform 380ms cubic-bezier(0.16,1,0.3,1);display:flex}
        .wo-drawer.open{transform:translateX(0);box-shadow:-12px 0 40px rgba(0,0,0,0.45)}
        .wo-handle{width:32px;background:transparent;display:flex;align-items:center;justify-content:center;cursor:grab;flex-shrink:0}
        .wo-body{flex:1;background:var(--bg);display:flex;flex-direction:column;overflow:hidden}
        .wo-topbar{display:flex;align-items:center;justify-content:space-between;padding:13px 16px;border-bottom:0.5px solid var(--border);flex-shrink:0;gap:10px}
        .wo-status-badge{font-family:var(--font-mono);font-size:8px;letter-spacing:0.18em;text-transform:uppercase;padding:3px 10px;flex-shrink:0}
        .wo-close{background:none;border:0.5px solid var(--border);color:var(--text-muted);width:30px;height:30px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:14px;border-radius:50%;transition:all 160ms ease}
        .wo-close:hover{border-color:var(--text);color:var(--text)}
        .wo-scroll{flex:1;overflow-y:auto}
        .wo-content{padding:20px 18px}
        .wo-section-label{font-family:var(--font-mono);font-size:8.5px;letter-spacing:0.22em;text-transform:uppercase;color:var(--text-muted);margin-bottom:10px;display:flex;align-items:center;justify-content:space-between}
        .wo-field{margin-bottom:10px}
        .wo-field-label{font-family:var(--font-mono);font-size:8px;letter-spacing:0.18em;text-transform:uppercase;color:var(--text-muted);margin-bottom:3px;display:block}
        .wo-field-val{font-family:var(--font-ui);font-size:13px;color:var(--text);line-height:1.5}
        .wo-field-input{width:100%;background:transparent;border:none;border-bottom:0.5px solid var(--gold);color:var(--text);font-family:var(--font-ui);font-size:13px;padding:4px 0;outline:none}
        .wo-edit-btn{font-family:var(--font-mono);font-size:8px;letter-spacing:0.16em;text-transform:uppercase;color:var(--gold);background:none;border:0.5px solid var(--gold);padding:3px 10px;cursor:pointer;transition:all 160ms ease}
        .wo-edit-btn:hover{background:var(--gold);color:var(--bg-deep)}
        .wo-log-entry{position:relative;padding:12px 14px 12px 38px;margin-bottom:6px;border:0.5px solid var(--border);background:var(--bg-card)}
        .wo-log-entry::before{content:'';position:absolute;left:14px;top:50%;transform:translateY(-50%);width:7px;height:7px;border-radius:50%;background:var(--border)}
        .wo-log-entry.admin::before{background:var(--tile-orders)}
        .wo-log-entry.user::before{background:var(--gold)}
        .wo-log-stamp{font-family:var(--font-mono);font-size:8.5px;letter-spacing:0.1em;color:var(--text-muted);margin-bottom:4px;display:flex;align-items:center;gap:8px}
        .wo-log-who{font-weight:700;color:var(--text)}
        .wo-log-change{font-family:var(--font-ui);font-size:12px;color:var(--text);line-height:1.5}
        .wo-log-detail{font-family:var(--font-mono);font-size:10px;color:var(--text-muted);margin-top:3px}
        .wo-accept-btn{width:100%;background:var(--gold);color:var(--bg-deep);border:none;padding:14px;font-family:var(--font-mono);font-size:10px;letter-spacing:0.2em;text-transform:uppercase;cursor:pointer;transition:opacity 180ms ease;margin-bottom:8px}
        .wo-accept-btn:hover{opacity:0.85}
        .wo-header{margin-bottom:20px;padding-bottom:18px;border-bottom:0.5px solid var(--border)}
        .wo-shop-name{font-family:var(--font-display);font-size:18px;color:var(--text);letter-spacing:0.02em;margin-bottom:2px}
        .wo-shop-addr{font-family:var(--font-ui);font-size:11px;color:var(--text-muted);line-height:1.6}
        .wo-specs{margin-bottom:20px;padding-bottom:18px;border-bottom:0.5px solid var(--border)}
        .wo-spec-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
        .wo-desc{font-family:var(--font-ui);font-size:12px;color:var(--text-muted);line-height:1.7;margin-top:8px}
        .wo-client{margin-bottom:20px;padding-bottom:18px;border-bottom:0.5px solid var(--border)}
        .wo-log{margin-bottom:24px}
      `}</style>

      {/* ── Panel ── */}
      <div className={`slide-panel ${isOpen ? 'open' : ''}`}>
        <div className="panel-header">
          <span className="panel-title">Work Orders</span>
          <button className="panel-close" onClick={onClose}>✕</button>
        </div>

        <div className="orders-list">
          {workOrders.length === 0 && (
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: 'var(--text-muted)', textAlign: 'center', padding: '40px 0', fontStyle: 'italic', opacity: 0.6 }}>
              No work orders yet.
            </p>
          )}
          {workOrders.map(wo => {
            const s = statusStyle(wo.status)
            return (
              <div
                key={wo.work_order_id}
                className="order-tile"
                style={{ borderLeft: `3px solid ${s.bar}` }}
                onClick={() => openDrawer(wo)}
              >
                <div className="order-status" style={{ background: s.bg, color: s.color }}>
                  {wo.status}
                </div>
                <div className="order-title">{wo.title}</div>
                <div className="order-meta">
                  #{String(wo.work_order_id).slice(-4)} · {getFormattedDate(wo)}
                </div>
                {wo.estimated_price && (
                  <div className="order-price">{formatMoney(wo.estimated_price)}</div>
                )}
                {wo.status === 'CREATED' && (
                  <button
                    className="order-accept"
                    onClick={e => { e.stopPropagation(); onAcceptWO(wo) }}
                  >
                    Accept Work Order
                  </button>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Detail Drawer ── */}
      <div
        ref={drawerRef}
        className={`wo-drawer ${drawerOpen ? 'open' : ''}`}
        onMouseDown={onDragStart}
        onMouseMove={onDragMove}
        onMouseUp={onDragEnd}
        onTouchStart={onDragStart}
        onTouchMove={onDragMove}
        onTouchEnd={onDragEnd}
      >
        <div className="wo-handle" />
        <div className="wo-body">
          {selectedWO && (() => {
            const s    = statusStyle(selectedWO.status)
            const rows = getDetailRows(selectedWO)
            const log  = getActivityLog(selectedWO)

            return (
              <>
                {/* Topbar */}
                <div className="wo-topbar" style={{ borderLeft: `3px solid ${s.bar}` }}>
                  <span className="wo-status-badge" style={{ background: s.bg, color: s.color }}>
                    {selectedWO.status}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-muted)', flex: 1 }}>
                    #{String(selectedWO.work_order_id).slice(-4)}
                  </span>
                  <button className="wo-close" onClick={closeDrawer}>✕</button>
                </div>

                <div className="wo-scroll">
                  <div className="wo-content">

                    {/* Shop address (send to) */}
                    {adminInfo && (
                      <div className="wo-header">
                        <div className="wo-shop-name">Cutting Corners Gems</div>
                        <div className="wo-shop-addr">
                          Send your stone to:<br />
                          <strong style={{ color: 'var(--text)' }}>{adminInfo.business_name}</strong><br />
                          {adminInfo.address}<br />
                          {adminInfo.contact_email}<br />
                          {adminInfo.phone}
                        </div>
                      </div>
                    )}

                    {/* Client info */}
                    {profile && (
                      <div className="wo-client">
                        <div className="wo-section-label">
                          Client Information
                          {selectedWO.status === 'CREATED' && (
                            <button
                              className="wo-edit-btn"
                              onClick={() => handleEditAddress(selectedWO, profile, setTempAddress, setShowAddressEdit)}
                            >
                              Edit Address
                            </button>
                          )}
                        </div>

                        {/* Read-only fields from profile */}
                        {[
                          { label: 'Name',  val: profile.name  },
                          { label: 'Email', val: profile.email },
                          { label: 'Phone', val: profile.phone },
                        ].map(f => (
                          <div className="wo-field" key={f.label}>
                            <label className="wo-field-label">{f.label}</label>
                            <div className="wo-field-val">{f.val}</div>
                          </div>
                        ))}

                        {/* Address — editable, saves to wo_shipping_address only */}
                        <div className="wo-field">
                          <label className="wo-field-label">
                            Return Address
                            {selectedWO.wo_shipping_address && selectedWO.wo_shipping_address !== profile.shipping_address && (
                              <span style={{ color: 'var(--gold)', marginLeft: 8, fontSize: 8, opacity: 0.8 }}>
                                {selectedWO.wo_recipient_name ? `· shipping to ${selectedWO.wo_recipient_name}` : '· custom for this order'}
                              </span>
                            )}
                          </label>
                          <div className="wo-field-val">
                            {selectedWO.wo_recipient_name && (
                              <div style={{ color: 'var(--gold)', marginBottom: 2 }}>{selectedWO.wo_recipient_name}</div>
                            )}
                            {selectedWO.wo_shipping_address || profile.shipping_address || 'No address on file'}
                          </div>
                        </div>

                        {/* Different shipping address */}
                        {selectedWO.status === 'CREATED' && !altSaved && (
                          <div style={{ marginTop: 10 }}>
                            {!altShipping ? (
                              <button
                                onClick={() => setAltShipping(true)}
                                style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: '0.5px dashed var(--bdr2)', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '8px 14px', cursor: 'pointer', width: '100%', justifyContent: 'center', transition: 'all 160ms ease' }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold)' }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--bdr2)'; e.currentTarget.style.color = 'var(--text-muted)' }}
                              >
                                <span style={{ fontSize: 14, lineHeight: 1 }}>+</span> Different Shipping Address
                              </button>
                            ) : (
                              <div style={{ background: 'var(--bg-card)', border: '0.5px solid var(--bdr2)', borderLeft: '2px solid var(--gold)', padding: 14 }}>
                                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12 }}>
                                  Alternate Recipient
                                </div>
                                <p style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: 'var(--text-muted)', marginBottom: 12, lineHeight: 1.6 }}>
                                  Enter the name and address of the person receiving the stone. This applies to this work order only.
                                </p>
                                <div style={{ marginBottom: 10 }}>
                                  <label style={{ fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: 5 }}>Recipient Name</label>
                                  <input
                                    value={altName}
                                    onChange={e => setAltName(e.target.value)}
                                    placeholder="Full name of recipient"
                                    style={{ width: '100%', background: 'var(--bg)', border: '0.5px solid var(--bdr2)', color: 'var(--text)', fontFamily: 'var(--font-ui)', fontSize: 13, padding: '9px 12px', outline: 'none', marginBottom: 8, transition: 'border-color 150ms ease' }}
                                    onFocus={e => e.currentTarget.style.borderColor = 'var(--gold)'}
                                    onBlur={e => e.currentTarget.style.borderColor = 'var(--bdr2)'}
                                  />
                                </div>
                                <div style={{ marginBottom: 12 }}>
                                  <label style={{ fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: 5 }}>Shipping Address</label>
                                  <input
                                    value={altAddress}
                                    onChange={e => setAltAddress(e.target.value)}
                                    placeholder="Full shipping address"
                                    style={{ width: '100%', background: 'var(--bg)', border: '0.5px solid var(--bdr2)', color: 'var(--text)', fontFamily: 'var(--font-ui)', fontSize: 13, padding: '9px 12px', outline: 'none', transition: 'border-color 150ms ease' }}
                                    onFocus={e => e.currentTarget.style.borderColor = 'var(--gold)'}
                                    onBlur={e => e.currentTarget.style.borderColor = 'var(--bdr2)'}
                                  />
                                </div>
                                <div style={{ display: 'flex', gap: 8 }}>
                                  <button
                                    onClick={saveAltShipping}
                                    disabled={!altName.trim() || !altAddress.trim()}
                                    style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', background: 'var(--gold)', color: 'var(--bg-deep)', border: 'none', padding: '10px 16px', cursor: 'pointer', opacity: !altName.trim() || !altAddress.trim() ? 0.4 : 1, transition: 'opacity 160ms ease' }}
                                  >
                                    Save
                                  </button>
                                  <button
                                    onClick={() => { setAltShipping(false); setAltName(''); setAltAddress('') }}
                                    style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', background: 'none', border: '0.5px solid var(--bdr2)', color: 'var(--text-muted)', padding: '10px 16px', cursor: 'pointer' }}
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {altSaved && (
                          <p style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: 'var(--tile-feasib)', marginTop: 8 }}>
                            ✓ Alternate shipping address saved.
                          </p>
                        )}

                        {/* Address edit */}
                        {showAddressEdit && selectedWO.status === 'CREATED' && (
                          <div style={{ background: 'var(--bg-card)', border: '0.5px solid var(--border)', padding: 14, marginTop: 10 }}>
                            {!addressConfirmed ? (
                              <>
                                <p style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: 'var(--text-muted)', marginBottom: 10, lineHeight: 1.6 }}>
                                  This change applies to this work order only.
                                </p>
                                <input
                                  value={tempAddress}
                                  onChange={e => setTempAddress(e.target.value)}
                                  placeholder="Enter address for this work order..."
                                  style={{ width: '100%', background: 'var(--bg-card)', border: '0.5px solid var(--border)', padding: '10px 12px', color: 'var(--text)', fontFamily: 'var(--font-ui)', fontSize: 13, outline: 'none', marginBottom: 10 }}
                                />
                                <div style={{ display: 'flex', gap: 8 }}>
                                  <button
                                    onClick={() => handleConfirmAddress(tempAddress, selectedWO, setSelectedWO, setWorkOrders, setAddressConfirmed)}
                                    style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', background: 'var(--gold)', color: 'var(--bg)', border: 'none', padding: '10px 16px', cursor: 'pointer' }}
                                  >
                                    Confirm
                                  </button>
                                  <button
                                    onClick={() => setShowAddressEdit(false)}
                                    style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', background: 'none', border: '0.5px solid var(--border)', color: 'var(--text-muted)', padding: '10px 16px', cursor: 'pointer' }}
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </>
                            ) : (
                              <p style={{ fontFamily: 'var(--font-ui)', fontSize: 13, color: 'var(--tile-feasib)' }}>✓ Address updated for this work order.</p>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Stone & service specs */}
                    <div className="wo-specs">
                      <div className="wo-section-label">Stone &amp; Service</div>
                      <div className="wo-spec-grid">
                        {rows.map(r => (
                          <div className="wo-field" key={r.label}>
                            <label className="wo-field-label">{r.label}</label>
                            <div className="wo-field-val">{r.val}</div>
                          </div>
                        ))}
                      </div>
                      {selectedWO.description && (
                        <div className="wo-desc">{selectedWO.description}</div>
                      )}
                    </div>

                    {/* Price */}
                    {selectedWO.estimated_price && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: 16, background: 'var(--bg-card)', border: '0.5px solid var(--border)', marginBottom: 20 }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Quoted Price</span>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 22, color: 'var(--tile-feasib)' }}>{formatMoney(selectedWO.estimated_price)}</span>
                      </div>
                    )}

                    {/* Stripe payment link */}
                    {selectedWO.status === 'COMPLETED' && selectedWO.stripe_payment_link && (
                      <div style={{ marginBottom: 20, padding: 16, background: 'var(--gold)' }}>
                        <a
                          href={selectedWO.stripe_payment_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--bg)', textDecoration: 'none' }}
                        >
                          Pay Now →
                        </a>
                      </div>
                    )}
                    {selectedWO.status === 'COMPLETED' && selectedWO.paid_outside_site && (
                      <div style={{ marginBottom: 20, padding: 14, background: 'rgba(207,221,78,0.06)', border: '0.5px solid var(--border)' }}>
                        <span style={{ fontFamily: 'var(--font-ui)', fontSize: 13, color: 'var(--gold)' }}>✓ Payment received — thank you!</span>
                      </div>
                    )}

                    {/* Accept button */}
                    {selectedWO.status === 'CREATED' && (
                      <button
                        className="wo-accept-btn"
                        onClick={() => { onAcceptWO(selectedWO); closeDrawer() }}
                      >
                        Accept Work Order
                      </button>
                    )}

                    {/* Activity log */}
                    {log.length > 0 && (
                      <div className="wo-log">
                        <div className="wo-section-label">Change History</div>
                        {log.map((entry, i) => (
                          <div key={i} className={`wo-log-entry ${entry.by}`}>
                            <div className="wo-log-stamp">
                              <span className="wo-log-who">{entry.by === 'admin' ? 'Michael' : 'You'}</span>
                              <span>{fmtDate(entry.at)} · {fmtTime(entry.at)}</span>
                            </div>
                            <div className="wo-log-change">{entry.action}</div>
                          </div>
                        ))}
                      </div>
                    )}

                  </div>
                </div>
              </>
            )
          })()}
        </div>
      </div>
    </>
  )
}