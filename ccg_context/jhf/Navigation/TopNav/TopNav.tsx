import { useState, useEffect } from ‘react’

// ── TopNav — Cutting Corners Gems ────────────────────────────
// Absolutely positioned so it overlays the hero section.
// Transitions from transparent to solid dark on scroll.
// Mobile: hamburger drawer.
// Desktop: horizontal links.
// Auth-aware: shows “Account” if session exists, “Login” if not.
// ─────────────────────────────────────────────────────────────

const NAV_LINKS = [
{ label: ‘Shop’,      href: ‘/shop’ },
{ label: ‘Portfolio’, href: ‘/portfolio’ },
]

const css = `
@import url(‘https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&family=Oranienbaum&display=swap’);

.tnav {
position: fixed;
top: 0; left: 0; right: 0;
z-index: 100;
height: 56px;
display: flex;
align-items: center;
justify-content: space-between;
padding: 0 28px;
transition: background 350ms ease, border-color 350ms ease, backdrop-filter 350ms ease;
border-bottom: 0.5px solid transparent;
}

.tnav.scrolled {
background: rgba(5,5,5,0.92);
backdrop-filter: blur(12px);
-webkit-backdrop-filter: blur(12px);
border-bottom-color: rgba(255,255,255,0.07);
}

.tnav-brand {
font-family: ‘Oranienbaum’, Georgia, serif;
font-size: 17px;
font-weight: 400;
color: #FAFAFA;
text-decoration: none;
letter-spacing: 0.04em;
white-space: nowrap;
transition: color 200ms ease;
}
.tnav-brand:hover { color: #d4af37; }

.tnav-links {
display: flex;
align-items: center;
gap: 32px;
}

.tnav-link {
font-family: ‘Montserrat’, sans-serif;
font-size: 10px;
font-weight: 500;
letter-spacing: 0.22em;
text-transform: uppercase;
color: rgba(255,255,255,0.6);
text-decoration: none;
transition: color 200ms ease;
position: relative;
}
.tnav-link::after {
content: ‘’;
position: absolute;
bottom: -3px; left: 0; right: 100%;
height: 0.5px;
background: #d4af37;
transition: right 220ms ease;
}
.tnav-link:hover { color: #FAFAFA; }
.tnav-link:hover::after { right: 0; }

.tnav-auth {
font-family: ‘Montserrat’, sans-serif;
font-size: 10px;
font-weight: 500;
letter-spacing: 0.22em;
text-transform: uppercase;
color: #d4af37;
text-decoration: none;
border: 0.5px solid rgba(212,175,55,0.45);
padding: 6px 14px;
transition: all 200ms ease;
}
.tnav-auth:hover {
background: rgba(212,175,55,0.08);
border-color: rgba(212,175,55,0.8);
color: #e5c84a;
}

/* hamburger */
.tnav-burger {
display: none;
flex-direction: column;
justify-content: center;
gap: 5px;
width: 36px;
height: 36px;
background: none;
border: 0.5px solid rgba(255,255,255,0.15);
cursor: pointer;
padding: 8px;
transition: border-color 200ms ease;
}
.tnav-burger:hover { border-color: rgba(212,175,55,0.5); }
.tnav-burger .bar {
width: 100%;
height: 1px;
background: rgba(255,255,255,0.75);
border-radius: 1px;
transition: all 280ms ease;
transform-origin: center;
}
.tnav-burger.open .bar:nth-child(1) { transform: translateY(6px) rotate(45deg); }
.tnav-burger.open .bar:nth-child(2) { opacity: 0; transform: scaleX(0); }
.tnav-burger.open .bar:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }

/* mobile drawer */
.tnav-drawer {
position: fixed;
top: 56px; left: 0; right: 0;
background: rgba(5,5,5,0.97);
backdrop-filter: blur(16px);
-webkit-backdrop-filter: blur(16px);
border-bottom: 0.5px solid rgba(255,255,255,0.07);
z-index: 99;
display: flex;
flex-direction: column;
padding: 20px 28px 28px;
gap: 0;
transform: translateY(-8px);
opacity: 0;
pointer-events: none;
transition: opacity 240ms ease, transform 240ms ease;
}
.tnav-drawer.open {
opacity: 1;
transform: translateY(0);
pointer-events: auto;
}
.tnav-drawer-link {
font-family: ‘Montserrat’, sans-serif;
font-size: 11px;
font-weight: 500;
letter-spacing: 0.24em;
text-transform: uppercase;
color: rgba(255,255,255,0.55);
text-decoration: none;
padding: 16px 0;
border-bottom: 0.5px solid rgba(255,255,255,0.06);
transition: color 180ms ease;
}
.tnav-drawer-link:hover { color: #FAFAFA; }
.tnav-drawer-link:last-child { border-bottom: none; }
.tnav-drawer-auth {
font-family: ‘Montserrat’, sans-serif;
font-size: 11px;
font-weight: 500;
letter-spacing: 0.24em;
text-transform: uppercase;
color: #d4af37;
text-decoration: none;
padding: 18px 0 4px;
margin-top: 4px;
transition: color 180ms ease;
}
.tnav-drawer-auth:hover { color: #e5c84a; }

@media (max-width: 767px) {
.tnav-links { display: none; }
.tnav-auth-desktop { display: none; }
.tnav-burger { display: flex; }
.tnav { padding: 0 18px; }
}
@media (min-width: 768px) {
.tnav-drawer { display: none !important; }
}
`

export default function TopNav() {
const [scrolled,    setScrolled]    = useState(false)
const [drawerOpen,  setDrawerOpen]  = useState(false)
const [authed,      setAuthed]      = useState(false)

// Scroll detection
useEffect(() => {
const onScroll = () => setScrolled(window.scrollY > 40)
window.addEventListener(‘scroll’, onScroll, { passive: true })
onScroll()
return () => window.removeEventListener(‘scroll’, onScroll)
}, [])

// Auth detection — check Supabase session
useEffect(() => {
async function checkAuth() {
try {
// Dynamic import so this nav works even if supabase isn’t configured yet
const { createClient } = await import(’@supabase/supabase-js’)
const supabase = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
const { data: { session } } = await supabase.auth.getSession()
setAuthed(!!session)

```
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => {
      setAuthed(!!s)
    })
    return () => subscription.unsubscribe()
  } catch {
    // Supabase not configured — default to logged out state
    setAuthed(false)
  }
}
checkAuth()
```

}, [])

// Close drawer on route change or outside click
useEffect(() => {
if (!drawerOpen) return
const close = (e: MouseEvent) => {
const target = e.target as HTMLElement
if (!target.closest(’.tnav’)) setDrawerOpen(false)
}
document.addEventListener(‘click’, close)
return () => document.removeEventListener(‘click’, close)
}, [drawerOpen])

const authHref  = authed ? ‘/account’ : ‘/login’
const authLabel = authed ? ‘Account’  : ‘Login’

return (
<>
<style dangerouslySetInnerHTML={{ __html: css }} />

```
  <nav className={`tnav${scrolled ? ' scrolled' : ''}`}>
    {/* Brand */}
    <a href="/" className="tnav-brand">Cutting Corners Gems</a>

    {/* Desktop links */}
    <div className="tnav-links">
      {NAV_LINKS.map(l => (
        <a key={l.href} href={l.href} className="tnav-link">{l.label}</a>
      ))}
      <a href={authHref} className="tnav-auth tnav-auth-desktop">{authLabel}</a>
    </div>

    {/* Mobile burger */}
    <button
      className={`tnav-burger${drawerOpen ? ' open' : ''}`}
      onClick={() => setDrawerOpen(p => !p)}
      aria-label="Toggle menu"
    >
      <span className="bar" />
      <span className="bar" />
      <span className="bar" />
    </button>
  </nav>

  {/* Mobile drawer */}
  <div className={`tnav-drawer${drawerOpen ? ' open' : ''}`}>
    {NAV_LINKS.map(l => (
      <a
        key={l.href}
        href={l.href}
        className="tnav-drawer-link"
        onClick={() => setDrawerOpen(false)}
      >
        {l.label}
      </a>
    ))}
    <a
      href={authHref}
      className="tnav-drawer-auth"
      onClick={() => setDrawerOpen(false)}
    >
      {authLabel}
    </a>
  </div>
</>
```

)
}
