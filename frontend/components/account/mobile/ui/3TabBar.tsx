 <!-- Tab Bar -->

<div class="tab-bar" id="tab-bar">
  <div class="tab" id="menu-tab" onclick="openMenu()"><div class="tab-icon">☰</div><div class="tab-lbl">Menu</div></div>
  <div class="tab" style="position:relative" onclick="openPanel('chat')">
    <div class="tab-dot"></div>
    <div class="tab-icon" style="color:var(--gold)">✉</div>
    <div class="tab-lbl" style="color:var(--gold)">Chat</div>
  </div>
  <div class="tab" onclick="openPanel('invoices')"><div class="tab-icon">◈</div><div class="tab-lbl">Invoices</div></div>
  <div class="tab" onclick="toggleTheme()"><div class="tab-icon">◐</div><div class="tab-lbl">Theme</div></div>
</div>



// mobile/ui/3TabBar.tsx

interface TabBarProps {
  onMenuOpen:    () => void;
  onChatOpen:    () => void;
  onInvoices:    () => void;
  onThemeToggle: () => void;
  hasUnread:     boolean;
}

export default function TabBar3({
  onMenuOpen, onChatOpen, onInvoices, onThemeToggle, hasUnread
}: TabBarProps) {
  return (
    <div className="tab-bar" id="tab-bar">

      {/* Menu tab */}
      <div className="tab" onClick={onMenuOpen}>
        <div className="tab-icon">☰</div>
        <div className="tab-lbl">Menu</div>
      </div>

      {/* Chat tab -- gold when there are unread messages */}
      <div className="tab" style={{ position: 'relative' }} onClick={onChatOpen}>
        {hasUnread && <div className="tab-dot"></div>}
        <div className="tab-icon" style={{ color: hasUnread ? 'var(--gold)' : undefined }}>✉</div>
        <div className="tab-lbl" style={{ color: hasUnread ? 'var(--gold)' : undefined }}>Chat</div>
      </div>

      {/* Invoices tab */}
      <div className="tab" onClick={onInvoices}>
        <div className="tab-icon">◈</div>
        <div className="tab-lbl">Invoices</div>
      </div>

      {/* Theme toggle tab */}
      <div className="tab" onClick={onThemeToggle}>
        <div className="tab-icon">◐</div>
        <div className="tab-lbl">Theme</div>
      </div>

    </div>
  );
}
