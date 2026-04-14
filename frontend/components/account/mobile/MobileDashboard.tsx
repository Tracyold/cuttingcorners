import { useState, useEffect, useRef } from 'react'
import { useDashboard }  from '../shared/1Dashboard'
import { formatMoney } from '../../../lib/utils'
import { supabase } from '../../../lib/supabase'
import type { PanelName } from '../shared/hooks/usePanel'

// ── Types ──────────────────────────────────────────────────────────────────

interface Product {
  product_id:        string
  title:             string
  total_price:       number
  gem_type:          string
  shape:             string
  weight:            number
  color:             string
  origin:            string
  treatment:         string
  description:       string
  photo_url:         string | null
  product_state:     string
  gia_report_number: string | null
}

function getPhotoUrl(photo_url: string | null): string | null {
  if (!photo_url) return null
  if (photo_url.startsWith('http')) return photo_url
  return supabase.storage.from('products').getPublicUrl(photo_url).data.publicUrl
}

// ── Props ──────────────────────────────────────────────────────────────────

interface Props {
  profile:             any
  workOrders:          any[]
  messages:            any[]
  chatThread:          any
  invoices:            any[]
  invoiceTotal:        number
  smsPrefs:            any
  latestWizardResult?: any
  onOpenPanel:         (name: PanelName) => void
  onOpenSms:           () => void
  onOpenShopItem:      (idx: number, item: any) => void
}

// ── Component ──────────────────────────────────────────────────────────────

export default function MobileDashboard({
  profile, workOrders, messages, chatThread,
  invoices, invoiceTotal, smsPrefs, latestWizardResult,
  onOpenPanel, onOpenSms, onOpenShopItem,
}: Props) {

  const dash = useDashboard({
    profile, workOrders, messages, chatThread,
    invoices, invoiceTotal, smsPrefs, latestWizardResult,
  })

  const [products, setProducts]         = useState<Product[]>([])
  const [hearted, setHearted]           = useState<Set<string>>(new Set())
  const [tappedShop, setTappedShop]     = useState<string | null>(null)
  const feedRef                     = useRef<HTMLDivElement>(null)
  const sentinelRef                 = useRef<HTMLDivElement>(null)
  const notifRef                    = useRef<HTMLDivElement>(null)

  // ── Fetch products ──
  useEffect(() => {
    supabase
      .from('products')
      .select('*')
      .eq('product_state', 'available')
      .order('created_at', { ascending: false })
      .then(({ data }) => { if (data) setProducts(data) })
  }, [])

  // ── Infinite scroll ──
  useEffect(() => {
    const sentinel = sentinelRef.current
    const feed     = feedRef.current
    const notif    = notifRef.current
    if (!sentinel || !feed || !notif) return

    const observer = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return

      const sep = document.createElement('div')
      sep.className = 'cycle-sep'
      sep.innerHTML = '<div class="cycle-sep-line"></div><div class="cycle-sep-dots">· · ·</div><div class="cycle-sep-line"></div>'
      feed.insertBefore(sep, sentinel)

      const clone = notif.cloneNode(true) as HTMLElement
      feed.insertBefore(clone, sentinel)
    }, { rootMargin: '400px' })

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  // ── Heart toggle (keyed by product_id) ──
  const toggleHeart = (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    setHearted(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  // ── Shop thumb tap (two-tap to open) ──
  const tapShopThumb = (product: Product) => {
    if (tappedShop === product.product_id) {
      onOpenShopItem(0, product)
      setTappedShop(null)
    } else {
      setTappedShop(product.product_id)
    }
  }

  const C = dash.colors

  return (
    <>
      <style>{`
        @keyframes mbPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.4;transform:scale(0.8)}}
        .feed{padding:22px 14px 120px;display:flex;flex-direction:column;gap:0}
        .welcome{padding:0 2px 22px;border-bottom:0.5px solid var(--bdr2);margin-bottom:22px}
        .welcome-name{font-family:var(--font-sig);font-size:32px;font-style:italic;color:var(--text);line-height:1.15;margin-bottom:5px}
        .welcome-meta{font-family:var(--font-mono);font-size:9px;letter-spacing:0.26em;text-transform:uppercase;color:var(--text-muted)}
        .welcome-meta span{color:var(--gold)}
        .tile{background:var(--bg-card);border:0.5px solid var(--bdr2);padding:18px 16px;cursor:pointer;position:relative;overflow:hidden;transition:border-color 280ms ease,transform 200ms ease;display:flex;flex-direction:column;min-height:140px;-webkit-tap-highlight-color:transparent}
        .tile::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:rgba(255,255,255,0.15);opacity:0;transition:opacity 300ms ease}
        .tile.lit::before{opacity:1}
        .tile.lit{border-color:rgba(255,255,255,0.22)}
        .tile.dim{opacity:0.6}
        .tile.dim:hover{opacity:0.85}
        .tile:hover{transform:translateY(-1px)}
        .tile:active{transform:scale(0.975)}
        .tile.wide{flex-direction:row;align-items:center;gap:16px;min-height:100px}
        .tile-row{display:grid;grid-template-columns:1fr 1fr;gap:8px}
        .t-badge{display:none;position:absolute;top:10px;right:10px;width:8px;height:8px;border-radius:50%;background:rgba(248,113,113,0.5)}
        .tile.lit .t-badge{display:inline-flex}
        .t-icon{font-size:28px;margin-bottom:10px;line-height:1}
        .t-label{font-family:var(--font-mono);font-size:8.5px;letter-spacing:0.24em;text-transform:uppercase;color:var(--text-muted);margin-bottom:5px}
        .t-main{font-family:var(--font-display);font-size:16px;line-height:1.3;color:var(--text);font-weight:400;letter-spacing:0.02em;transition:color 280ms ease}
        .t-sub{font-family:var(--font-ui);font-size:10.5px;color:var(--text-muted);margin-top:5px;line-height:1.5;letter-spacing:0.03em}
        .t-arrow{position:absolute;bottom:11px;right:13px;font-size:11px;color:var(--text-muted);opacity:0.3;transition:all 180ms ease}
        .tile:hover .t-arrow{opacity:0.75;transform:translateX(2px)}
        .tile.lit .t-arrow{color:var(--text-muted);opacity:0.6}
        .feed-block{display:flex;flex-direction:column;gap:8px;margin-bottom:8px}
        .fdiv{display:flex;align-items:center;gap:12px;padding:28px 2px 22px}
        .fdiv-line{flex:1;height:0.5px;background:var(--bdr2)}
        .fdiv-lbl{font-family:var(--font-mono);font-size:8.5px;letter-spacing:0.26em;text-transform:uppercase;color:var(--text-muted);white-space:nowrap;opacity:0.6}
        .cycle-sep{display:flex;align-items:center;gap:14px;padding:36px 2px 30px}
        .cycle-sep-line{flex:1;height:0.5px;background:var(--bdr2)}
        .cycle-sep-dots{font-family:var(--font-mono);font-size:8px;letter-spacing:0.32em;color:var(--text-muted);opacity:0.38;white-space:nowrap}
        .shop-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}
        .shop-thumb{background:var(--bg-card);border:0.5px solid var(--bdr2);position:relative;overflow:hidden;cursor:pointer;transition:all 240ms ease;aspect-ratio:3/4;display:flex;flex-direction:column}
        .shop-thumb:hover{transform:translateY(-2px)}
        .shop-img{flex:1;display:flex;align-items:center;justify-content:center;font-size:40px;background:var(--bg-deep)}
        .shop-info{padding:10px 11px 9px;border-top:0.5px solid var(--bdr2)}
        .shop-name{font-family:var(--font-display);font-size:12px;color:var(--text);letter-spacing:0.03em;margin-bottom:2px}
        .inv-overlay{position:absolute;inset:0;background:color-mix(in srgb,var(--gold) 55%,rgba(0,0,0,0.2));display:flex;flex-direction:column;align-items:center;justify-content:center;opacity:0;transition:opacity 220ms ease;padding:12px}
        .shop-thumb.tapped .inv-overlay{opacity:1}
        .inv-price{font-family:var(--font-mono);font-size:18px;font-weight:700;color:#fff;margin-bottom:4px}
        .inv-date{font-family:var(--font-ui);font-size:10px;letter-spacing:0.1em;color:rgba(255,255,255,0.7)}
        .inv-tap-hint{font-family:var(--font-ui);font-size:9px;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.5);margin-top:10px}
        .heart-btn{position:absolute;top:6px;right:7px;background:none;border:none;cursor:pointer;z-index:10;padding:0;-webkit-tap-highlight-color:transparent;display:flex;align-items:center;justify-content:center;outline:none}
        .heart-btn:active{transform:scale(1.2)}
        .heart-icon{font-size:22px;line-height:1;color:rgba(255,255,255,0.5);transition:color 80ms ease;user-select:none}
        .heart-btn.hearted .heart-icon{color:var(--gold)}
        .ring-wrap{position:relative;width:42px;height:42px;flex-shrink:0;margin-bottom:8px}
        .ring-num{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:var(--font-mono);font-size:10px;font-weight:700}
      `}</style>

      <div className="feed" ref={feedRef}>

        {/* ── Welcome ── */}
        <div className="welcome">
          <div className="welcome-name">{dash.greeting}, {dash.firstName}.</div>
          <div className="welcome-meta">
            {dash.dateLabel}
            {dash.updateCount > 0 && (
              <span> &nbsp;·&nbsp; {dash.updateCount} update{dash.updateCount > 1 ? 's' : ''}</span>
            )}
          </div>
        </div>

        {/* ── Notification tiles ── */}
        <div className="feed-block" ref={notifRef}>

          {/* Messages — wide lit */}
          <div
            className={`tile wide ${dash.hasNewMsg ? 'lit' : 'dim'}`}
            style={{ minHeight: 80, gap: 14, padding: '18px 16px' }}
            onClick={() => onOpenPanel('chat')}
          >
            <div className="t-badge" />
            <div style={{ fontSize: 24, flexShrink: 0, lineHeight: 1, color: 'rgba(255,255,255,0.85)' }}>✉︎</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              {dash.hasNewMsg && (
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 32, fontWeight: 700, color: `color-mix(in srgb,${C.chat} 70%,transparent)`, lineHeight: 1 }}>
                  {dash.unreadCount}
                </span>
              )}
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 15, color: 'var(--text)' }}>
                {dash.hasNewMsg ? 'new message' + (dash.unreadCount > 1 ? 's' : '') : 'Chat with the shop'}
              </span>
            </div>
          </div>

          {/* Work Orders + Invoices */}
          <div className="tile-row">
            <div
              className={`tile ${dash.woLit ? 'lit' : 'dim'}`}
              style={{ minHeight: 110, cursor: 'pointer', padding: '16px 14px', justifyContent: 'center' }}
              onClick={() => onOpenPanel('workorders')}
            >
              <div className="t-badge" />
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1 }}>
                <div style={{ fontSize: 22, lineHeight: 1, color: 'rgba(255,255,255,0.85)', flexShrink: 0 }}>⚙︎</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, color: 'var(--text)', lineHeight: 1.4 }}>
                  {dash.hasNewWO
                    ? <><span style={{ color: C.orders }}>New</span> work order</>
                    : dash.hasUpdatedWO
                    ? <>Status <strong>updated</strong></>
                    : dash.recentWO ? dash.recentWO.status : 'No orders'}
                </div>
              </div>
            </div>

            <div
              className={`tile dim`}
              style={{ minHeight: 110, cursor: 'pointer', flexDirection: 'row', alignItems: 'center', gap: 14, padding: '16px 14px' }}
              onClick={() => onOpenPanel('invoices')}
            >
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, color: 'var(--text)', flex: 1 }}>Invoices</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 38, fontWeight: 700, lineHeight: 1, color: 'rgba(90,90,90,0.6)', WebkitTextStroke: `1.5px ${C.invoice}` }}>
                {invoices.length}
              </div>
            </div>
          </div>

          {/* Feasibility */}
          {latestWizardResult && dash.wizPct !== null ? (
            <div
              className="tile dim wide"
              style={{ minHeight: 'auto', cursor: 'pointer', padding: '16px 16px', gap: 14 }}
              onClick={() => onOpenPanel('results')}
            >
              <div className="ring-wrap">
                {(() => { const { r, circ, offset } = dash.scoreRing(dash.wizPct!); return (
                  <svg width="42" height="42" viewBox="0 0 42 42">
                    <circle cx="21" cy="21" r={r} fill="none" stroke="var(--bdr2)" strokeWidth="2.5" />
                    <circle cx="21" cy="21" r={r} fill="none" stroke={C.feasib} strokeWidth="2.5"
                      strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" transform="rotate(-90 21 21)" />
                  </svg>
                )})()}
                <div className="ring-num" style={{ color: C.feasib }}>{dash.wizPct}%</div>
              </div>
              <div style={{ flex: 1 }}>
                <div className="t-label">Feasibility Result</div>
                <div className="t-main" style={{ color: C.feasib }}>{latestWizardResult.recommendation || 'See result'}</div>
                <div className="t-sub">
                  {[latestWizardResult.stone_variety, latestWizardResult.stone_species].filter(Boolean).join(' ')}
                  {latestWizardResult.weight_ct ? ` · ${latestWizardResult.weight_ct}ct` : ''}
                </div>
              </div>
            </div>
          ) : (
            <div
              className="tile dim wide"
              style={{ minHeight: 'auto', cursor: 'pointer', padding: '16px 16px', gap: 14 }}
              onClick={() => onOpenPanel('wizard')}
            >
              <div style={{ fontSize: 22, flexShrink: 0 }}>◇</div>
              <div style={{ flex: 1 }}>
                <div className="t-label">Feasibility Wizard</div>
                <div className="t-main">No results yet</div>
                <div className="t-sub">Take the cut feasibility wizard</div>
              </div>
            </div>
          )}

          {/* Inquiries + SMS */}
          <div className="tile-row">
            <div
              className="tile dim"
              style={{ minHeight: 110, cursor: 'pointer', padding: '16px 14px', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}
              onClick={() => onOpenPanel('inquiries')}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1 }}>
                <div style={{ fontSize: 22, lineHeight: 1, color: 'rgba(255,255,255,0.35)', flexShrink: 0 }}>◈</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, color: 'var(--text)' }}>Inquiries</div>
              </div>
            </div>

            <div
              className="tile dim"
              style={{ minHeight: 110, cursor: 'pointer', padding: '16px 14px', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}
              onClick={onOpenSms}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1 }}>
                <div style={{ fontSize: 22, lineHeight: 1, color: 'rgba(255,255,255,0.35)', flexShrink: 0 }}>◉</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, color: 'var(--text)' }}>SMS Alerts</div>
              </div>
            </div>
          </div>

          {/* Service Requests */}
          <div
            className="tile dim"
            style={{ minHeight: 0, padding: '18px 18px', flexDirection: 'row', alignItems: 'center', gap: 16, cursor: 'pointer' }}
            onClick={() => onOpenPanel('servicerequests')}
          >
            <div style={{ flex: 1 }}>
              <div className="t-label">Service Requests</div>
              <div className="t-sub">Submitted over your account history</div>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 48, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1, opacity: 0.15 }}>
              {workOrders.length}
            </div>
          </div>

          {/* Profile */}
          <div
            className="tile dim"
            style={{ minHeight: 0, padding: '13px 17px', flexDirection: 'row', alignItems: 'center', gap: 14, cursor: 'pointer' }}
            onClick={() => onOpenPanel('profile')}
          >
            <div style={{ fontSize: 24, flexShrink: 0, lineHeight: 1 }}>⚙︎</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, color: 'var(--text)' }}>Profile</div>
            </div>
          </div>

        </div>{/* /feed-block */}

        {/* ── Saved items ── */}
        <div className="fdiv">
          <div className="fdiv-line" />
          <div className="fdiv-lbl">Saved Items</div>
          <div className="fdiv-line" />
        </div>

        <div className="shop-grid">
          {products.filter(p => hearted.has(p.product_id)).map(p => (
            <ShopThumb
              key={p.product_id}
              product={p}
              tapped={tappedShop === p.product_id}
              hearted={hearted.has(p.product_id)}
              onTap={() => tapShopThumb(p)}
              onHeart={e => toggleHeart(e, p.product_id)}
            />
          ))}
          {Array.from(hearted).length === 0 && (
            <div style={{ gridColumn: '1/-1', fontFamily: 'var(--font-ui)', fontSize: 12, color: 'var(--text-muted)', textAlign: 'center', padding: '20px 0', fontStyle: 'italic', opacity: 0.7 }}>
              No saved items yet. Heart a gem from the shop.
            </div>
          )}
        </div>

        {/* ── From the shop ── */}
        <div className="fdiv">
          <div className="fdiv-line" />
          <div className="fdiv-lbl">From the Shop</div>
          <div className="fdiv-line" />
        </div>

        <div className="shop-grid">
          {products.map(p => (
            <ShopThumb
              key={p.product_id}
              product={p}
              tapped={tappedShop === p.product_id}
              hearted={hearted.has(p.product_id)}
              onTap={() => tapShopThumb(p)}
              onHeart={e => toggleHeart(e, p.product_id)}
            />
          ))}
        </div>

        {/* ── Infinite scroll sentinel ── */}
        <div ref={sentinelRef} style={{ height: 1 }} />

      </div>
    </>
  )
}

// ── ShopThumb sub-component ────────────────────────────────────────────────

function ShopThumb({ product, tapped, hearted, onTap, onHeart }: {
  product: Product
  tapped:  boolean
  hearted: boolean
  onTap:   () => void
  onHeart: (e: React.MouseEvent) => void
}) {
  const photoUrl = getPhotoUrl(product.photo_url)

  return (
    <div className={`shop-thumb ${tapped ? 'tapped' : ''}`} onClick={onTap}>
      <div className="shop-img">
        {photoUrl
          ? <img src={photoUrl} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : '💎'
        }
      </div>
      <button className={`heart-btn ${hearted ? 'hearted' : ''}`} onClick={onHeart}>
        <span className="heart-icon">{hearted ? '☻' : '☹︎'}</span>
      </button>
      <div className="inv-overlay">
        <div className="inv-price">{formatMoney(product.total_price)}</div>
        <div className="inv-date">{product.title}</div>
        <div className="inv-tap-hint">Tap again to view</div>
      </div>
      <div className="shop-info">
        <div className="shop-name">{product.title}</div>
      </div>
    </div>
  )
}