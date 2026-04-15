interface NavProps {
  onMenuOpen:    () => void;
  onThemeToggle: () => void;
}

export default function Nav3({ onMenuOpen, onThemeToggle }: NavProps) {
  return (
    <>

     
<!-- Nav -->

<nav class="nav">
  <div class="nav-logo">CCG <em>·</em> Account</div>
  <div class="nav-right">
    <button class="icon-btn" onclick="toggleTheme()">◐</button>
    <button class="icon-btn lg" onclick="openSiteMenu()">☰</button>
  </div>
</nav>

<!-- Site nav dropdown -->

<div class="site-menu-overlay" id="site-menu-overlay" onclick="closeSiteMenu()"></div>
<div class="site-menu-dropdown" id="site-menu-dropdown">
  <a class="site-menu-item" href="#">Home</a>
  <a class="site-menu-item" href="#">Shop</a>
  <a class="site-menu-item" href="#">Portfolio</a>
  <a class="site-menu-item" href="#">Sign In / Sign Out</a>
</div>

<!-- Overlay -->

<div class="overlay" id="ov" style="display:none"></div>

<!-- Account Drawer -->

<div class="drawer" id="dr" style="display:none">
  <div class="dr-head">
    <span class="dr-name">Tracy O.</span>
    <button class="dr-close" onclick="closeDrawer()">✕</button>
  </div>
  <div class="dr-links">
    <div class="dr-item active"><div class="dr-dot" style="background:var(--gold)"></div><span class="dr-lbl">Dashboard</span></div>
    <div class="dr-item"><div class="dr-dot" style="background:var(--tile-chat)"></div><span class="dr-lbl">Messages</span><span class="dr-badge" style="background:color-mix(in srgb,var(--tile-chat) 14%,transparent);color:var(--tile-chat)">3</span></div>
    <div class="dr-item"><div class="dr-dot" style="background:var(--tile-orders)"></div><span class="dr-lbl">Work Orders</span><span class="dr-badge" style="background:color-mix(in srgb,var(--tile-orders) 14%,transparent);color:var(--tile-orders)">1</span></div>
    <div class="dr-item"><div class="dr-dot" style="background:var(--tile-invoice)"></div><span class="dr-lbl">Invoices</span></div>
    <div class="dr-item"><div class="dr-dot" style="background:var(--tile-feasib)"></div><span class="dr-lbl">Feasibility</span></div>
    <div class="dr-item"><div class="dr-dot" style="background:var(--tile-est)"></div><span class="dr-lbl">Inquiries</span></div>
    <div class="dr-item"><div class="dr-dot" style="background:#888"></div><span class="dr-lbl">Profile</span></div>
  </div>
  <div class="dr-foot">
    <a class="dr-exit" href="#">← Exit Account</a>
    <button class="dr-foot-btn">Sign Out</button>

 <nav className="nav">
        <div className="nav-logo">CCG <em>·</em> Account</div>
        <div className="nav-right">
          <button className="icon-btn" onClick={onThemeToggle}>◐</button>
          <button className="icon-btn lg" onClick={onMenuOpen}>☰</button>
        </div>
      </nav>
    </>
  );
}
 </div>
</div>


