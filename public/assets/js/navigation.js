/* ═══════════════════════════════════════════════════
   aQuaStock Pro — navigation.js
   Routing antar halaman, sidebar drawer & sinkronisasi tab aktif
   ═══════════════════════════════════════════════════ */
const pageTitles = {
  dashboard: 'Dashboard', items: 'Barang', in: 'Barang Masuk',
  out: 'Barang Keluar', po: 'Purchase Order', return: 'Retur',
  suppliers: 'Supplier', customers: 'Customer', cash: 'Kas & Keuangan',
  debt: 'Hutang & Piutang', report: 'Laporan', users: 'Kelola User',
  audit: 'Audit Log', notif: 'Notifikasi', backup: 'Backup', settings: 'Settings'
};

let activeBottomTab = 'dashboard';

/* Peta id halaman → nama file */
const PAGE_FILES = {
  dashboard: 'index.html', items: 'items.html', in: 'in.html', out: 'out.html',
  po: 'po.html', return: 'return.html', suppliers: 'suppliers.html',
  customers: 'customers.html', cash: 'cash.html', debt: 'debt.html',
  report: 'report.html', users: 'users.html', audit: 'audit.html',
  notif: 'notif.html', backup: 'backup.html', settings: 'settings.html'
};

/* Tab yang tersedia di bottom nav */
const BOTTOM_TABS = ['dashboard', 'items', 'in', 'out'];

/* Tentukan id halaman dari file yang sedang dibuka */
function currentPageId() {
  const file = (window.location.pathname.split('/').pop() || 'index.html');
  if (file === '' || file === 'index.html') return 'dashboard';
  return file.replace(/\.html$/, '');
}

/* Set status aktif (sidebar + bottom nav + breadcrumb) sesuai halaman saat ini */
function syncActiveState() {
  const pageId = currentPageId();

  const bc = document.getElementById('breadcrumb');
  if (bc && pageTitles[pageId]) bc.textContent = pageTitles[pageId];

  document.querySelectorAll('.menu-item').forEach(function(m) {
    const match = m.getAttribute('onclick') && m.getAttribute('onclick').match(/'([a-z]+)'/);
    const isActive = !!match && match[1] === pageId;
    m.classList.toggle('active', isActive);
    m.setAttribute('aria-current', isActive ? 'page' : 'false');
  });

  const tabToActivate = BOTTOM_TABS.indexOf(pageId) !== -1 ? pageId : 'menu';
  document.querySelectorAll('.bottom-nav-item').forEach(function(b) {
    const isActive = b.dataset.tab === tabToActivate;
    b.classList.toggle('active', isActive);
    if (isActive) b.setAttribute('aria-current', 'page');
    else b.removeAttribute('aria-current');
  });
  activeBottomTab = tabToActivate;
}

/* Navigasi: multi-page → arahkan ke file halaman tujuan */
function showPage(pageId, element) {
  const file = PAGE_FILES[pageId] || (pageId + '.html');
  window.location.href = './' + file;
}

function bottomNavTap(tab, event) {
  if (tab === 'menu') { openMenuDrawer(event); return; }
  showPage(tab);
}

function openMenuDrawer(event) {
  const aside = document.querySelector('aside');
  if (!aside) return;

  if (aside.classList.contains('open')) {
    closeSidebar();
    return;
  }

  document.querySelectorAll('.bottom-nav-item').forEach(function(item) {
    item.classList.remove('active');
  });
  if (event && event.currentTarget) event.currentTarget.classList.add('active');
  aside.classList.add('open');
}

function toggleSidebar() {
  const aside = document.querySelector('aside');
  if (!aside) return;
  aside.classList.toggle('open');
}

function closeSidebar() {
  const aside = document.querySelector('aside');
  if (aside) aside.classList.remove('open');

  document.querySelectorAll('.bottom-nav-item').forEach(function(b) {
    b.classList.remove('active');
    b.removeAttribute('aria-current');
  });
  const target = document.querySelector('.bottom-nav-item[data-tab="' + activeBottomTab + '"]');
  if (target) {
    target.classList.add('active');
    target.setAttribute('aria-current', 'page');
  }
}

/* ═══════════════════════════════════════════════
   EVENT SIDEBAR (menu-item & area gelap)
   ═══════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', function() {
  // Event menu sidebar — HANYA SATU tempat
  document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', function() {
      const match = this.getAttribute('onclick')?.match(/'(\w+)'/);
      if (!match) return;
      const tab = match[1];
      activeBottomTab = tab;
      document.querySelectorAll('.bottom-nav-item').forEach(b => {
        const isActive = b.dataset.tab === tab;
        b.classList.toggle('active', isActive);
        if (isActive) b.setAttribute('aria-current', 'page');
        else b.removeAttribute('aria-current');
      });
      if (window.innerWidth <= MOBILE_BREAKPOINT) closeSidebar();
    });
  });

  // Tap area gelap di luar sidebar
  const aside = document.querySelector('aside');
  if (aside) {
    aside.addEventListener('click', function(e) {
      if (e.target === aside) closeSidebar();
    });
  }
  // Sinkronkan tab aktif dengan halaman yang sedang dibuka
  syncActiveState();
});
