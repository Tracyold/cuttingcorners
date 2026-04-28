// frontend/components/admin/mobile/MobileAdminAccount.tsx
//
// ROOT COMPONENT for the mobile admin interface.
//
// What this file does:
//   1. Auth guard — redirects to /admin/login if not an admin
//   2. Manages which panel is open (one at a time, slide-up from bottom)
//   3. Renders a feed of four tap-to-open tiles
//   4. Renders the four panels: Dashboard, Products, Portfolio, Users
//
// CSS: reuses MobileShell.css (same variables, same slide-panel classes)
// Additional admin-specific styles injected via <style> tag below.

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../../lib/supabase';
import AdminDashboardPanel from './panels/AdminDashboardPanel';
import AdminProductsPanel  from './panels/AdminProductsPanel';
import AdminPortfolioPanel from './panels/AdminPortfolioPanel';
import AdminUsersPanel     from './panels/AdminUsersPanel';

type AdminPanel = 'dashboard' | 'products' | 'portfolio' | 'users' | null;

// ── Tile data ─────────────────────────────────────────────────────────────────
const TILES = [
  {
    id:      'dashboard' as AdminPanel,
    label:   'Dashboard',
    icon:    '⬡',
    sub:     'Stats · Notifications · Settings',
    color:   'var(--gold)',
  },
  {
    id:      'products' as AdminPanel,
    label:   'Products',
    icon:    '◈',
    sub:     'Live · Drafts · Inactive',
    color:   '#38bdf8',
  },
  {
    id:      'portfolio' as AdminPanel,
    label:   'Portfolio',
    icon:    '◻',
    sub:     'Published · Drafts · Archived',
    color:   '#4ec994',
  },
  {
    id:      'users' as AdminPanel,
    label:   'Users',
    icon:    '◯',
    sub:     'Active · Archived · Search',
    color:   '#a3e635',
  },
];

export default function MobileAdminAccount() {
  const router = useRouter();
  const [checking,     setChecking]     = useState(true);
  const [adminName,    setAdminName]    = useState('');
  const [activePanel,  setActivePanel]  = useState<AdminPanel>(null);

  // ── Auth guard ────────────────────────────────────────────────────────────
  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { router.replace('/admin/login'); return; }

      const { data: adminCheck } = await supabase
        .from('admin_users')
        .select('full_name')
        .eq('admin_user_id', session.user.id)
        .single();

      if (!adminCheck) {
        await supabase.auth.signOut();
        router.replace('/admin/login');
        return;
      }

      setAdminName(adminCheck.full_name || 'Admin');
      setChecking(false);
    })();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  if (checking) {
    return <div style={{ background: 'var(--bg-mob-deep)', height: '100dvh' }} />;
  }

  const hour     = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  const firstName = adminName.split(' ')[0] || 'Admin';
  const dateLabel = new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric',
  });

  return (
    <>
      <style>{adminMobileStyles}</style>

      <div className="mobile-shell">

        {/* ── Nav ── */}
        <div className="nav">
          <div style={{ fontFamily: 'var(--font-display-mob)', fontSize: 'clamp(0.9375rem,4vw,1.125rem)', color: 'var(--gold)', letterSpacing: '0.07em' }}>
            CCG · Admin
          </div>
          <button
            onClick={handleSignOut}
            style={{
              background: 'transparent', border: '0.5px solid var(--bdr2-mob)',
              color: 'var(--text-mob-muted)', borderRadius: 6,
              fontFamily: 'var(--font-mono-mob)', fontSize: 10,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              padding: '6px 12px', cursor: 'pointer',
            }}
          >
            Sign Out
          </button>
        </div>

        {/* ── Feed ── */}
        <div className="feed">

          {/* Welcome block */}
          <div className="welcome">
            <div className="welcome-name">{greeting}, {firstName}.</div>
            <div className="welcome-meta">{dateLabel}</div>
            <div style={{
              fontFamily: 'var(--font-mono-mob)', fontSize: 'clamp(0.5625rem,2.2vw,0.625rem)',
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'var(--text-mob-muted)', marginTop: 6, opacity: 0.6,
            }}>
              {`Signed in ${new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} · ${new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}`}
            </div>
          </div>

          {/* Tile grid */}
          <div className="feed-block">
            {TILES.map(tile => (
              <button
                key={tile.id}
                className="tile wide admin-tile"
                onClick={() => setActivePanel(tile.id)}
              >
                <div className="admin-tile-icon" style={{ color: tile.color }}>{tile.icon}</div>
                <div className="admin-tile-label">{tile.label}</div>
                <div className="admin-tile-sub">{tile.sub}</div>
                <div className="admin-tile-arrow" style={{ color: tile.color }}>→</div>
              </button>
            ))}

          </div>

        </div>{/* end feed */}

        {/* ── Panels ── */}
        <AdminDashboardPanel
          open={activePanel === 'dashboard'}
          onClose={() => setActivePanel(null)}
        />

        <AdminProductsPanel
          open={activePanel === 'products'}
          onClose={() => setActivePanel(null)}
        />

        <AdminPortfolioPanel
          open={activePanel === 'portfolio'}
          onClose={() => setActivePanel(null)}
        />

        <AdminUsersPanel
          open={activePanel === 'users'}
          onClose={() => setActivePanel(null)}
        />

      </div>
    </>
  );
}

// ── Admin-specific mobile styles ──────────────────────────────────────────────
// Scoped additions on top of MobileShell.css. No overrides — just new classes.
const adminMobileStyles = `
  .admin-tile {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: clamp(12px, 3.5vw, 16px);
    padding: clamp(16px, 4.5vw, 22px) clamp(1rem, 4.5vw, 1.25rem);
    text-align: left;
    cursor: pointer;
    border: 0.5px solid var(--bdr2-mob);
    background: var(--bg-mob-card);
    border-radius: 12px;
    transition: all 260ms cubic-bezier(0.4, 0, 0.2, 1);
    width: 100%;
  }

  .admin-tile:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.2);
  }

  .admin-tile:active {
    transform: scale(0.98);
  }

  .admin-tile-icon {
    font-size: clamp(1.5rem, 6vw, 2rem);
    flex-shrink: 0;
    line-height: 1;
  }

  .admin-tile-label {
    font-family: var(--font-ui-mob);
    font-size: clamp(1rem, 4.2vw, 1.125rem);
    font-weight: 600;
    color: var(--text-mob);
    line-height: 1.2;
  }

  .admin-tile-sub {
    font-family: var(--font-mono-mob);
    font-size: clamp(0.625rem, 2.5vw, 0.75rem);
    color: var(--text-mob-muted);
    letter-spacing: 0.08em;
    margin-top: 2px;
  }

  .admin-tile-arrow {
    margin-left: auto;
    font-size: 1.25rem;
    flex-shrink: 0;
    opacity: 0.7;
  }

  /* Stack icon + label + sub vertically on narrow screens */
  @media (max-width: 320px) {
    .admin-tile { flex-direction: column; align-items: flex-start; }
    .admin-tile-arrow { display: none; }
  }
`;