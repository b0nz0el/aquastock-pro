# aQuaStock Pro 🐠

**aQuaStock Pro** adalah sistem manajemen stok (inventory) untuk peralatan
aquarium. Aplikasi mencakup pencatatan barang, transaksi barang masuk & keluar,
purchase order, retur, data supplier & customer, kas & keuangan, hutang/piutang,
laporan, kelola user, audit log, notifikasi, backup, dan pengaturan.

Versi **3.0.0** — frontend statis (HTML + CSS + Vanilla JS) yang siap
dihubungkan ke backend.

## ✨ Fitur

- 🔐 Login + splash screen, dengan toast notifikasi
- 📊 Dashboard: kartu statistik (angka beranimasi) + grafik Chart.js
- 📦 16 modul: Barang, Barang Masuk, Barang Keluar, Purchase Order, Retur,
  Supplier, Customer, Kas & Keuangan, Hutang & Piutang, Laporan, Kelola User,
  Audit Log, Notifikasi, Backup, Settings
- 🔎 Pencarian global + shortcut ⌘K / Ctrl+K
- ☑️ Bulk selection (pilih banyak baris → bar aksi massal)
- 📱 Responsive penuh (mobile 390px → tablet 1024px → desktop 1440px),
  bottom navigation di mobile
- ♿ Aksesibilitas: `skip-link`, `aria-label`, `role`, `:focus-visible`
- 🎞️ Animasi yang menghormati `prefers-reduced-motion`

## 📁 Struktur Folder

```
aquastock/
├── public/                     # Root web (di-serve ke browser)
│   ├── index.html              # Redirect ke login
│   ├── login.html              # Halaman login
│   ├── 404.html                # Halaman error
│   │
│   ├── dashboard/              # 16 halaman aplikasi
│   │   ├── index.html          # Dashboard
│   │   ├── items.html          # Barang
│   │   ├── in.html             # Barang Masuk
│   │   ├── out.html            # Barang Keluar
│   │   ├── po.html             # Purchase Order
│   │   ├── return.html         # Retur
│   │   ├── suppliers.html      # Supplier
│   │   ├── customers.html      # Customer
│   │   ├── cash.html           # Kas & Keuangan
│   │   ├── debt.html           # Hutang & Piutang
│   │   ├── report.html         # Laporan
│   │   ├── users.html          # Kelola User
│   │   ├── audit.html          # Audit Log
│   │   ├── notif.html          # Notifikasi
│   │   ├── backup.html         # Backup
│   │   └── settings.html       # Settings
│   │
│   └── assets/
│       ├── css/
│       │   ├── main.css        # Reset, :root, typography, scrollbar, aksesibilitas
│       │   ├── components.css  # Card, badge, button, toast, skeleton, menu-item
│       │   ├── layout.css      # Page transition, aside, bottom-nav
│       │   ├── pages.css       # Style spesifik halaman (chart-container)
│       │   ├── responsive.css  # Semua @media + prefers-reduced-motion
│       │   └── login.css       # Style khusus halaman login
│       ├── js/
│       │   ├── utils.js        # showToast, parse/animate angka
│       │   ├── navigation.js   # showPage, sidebar, sinkronisasi tab aktif
│       │   ├── charts.js       # Konfigurasi Chart.js
│       │   ├── animations.js   # animateActivePage, prefersReducedMotion
│       │   ├── app.js          # Init, tabel→card, bulk selection, ⌘K
│       │   ├── api.js          # Wrapper fetch (placeholder backend)
│       │   └── login.js        # Logika halaman login
│       ├── images/
│       │   ├── logo.svg
│       │   └── favicon.ico
│       └── fonts/              # (kosong, untuk font kustom)
│
├── server/                     # (kosong — backend nanti)
├── database/                   # (kosong — skema/migrasi nanti)
├── tests/                      # (kosong — testing nanti)
├── docs/
│   └── README.md               # Catatan dokumentasi & keputusan refactor
├── scripts/
│   ├── backup.sh               # Backup aplikasi ke tar.gz
│   └── deploy.sh               # Deploy placeholder (netlify/vercel/rsync)
│
├── .env.example
├── .gitignore
├── package.json
├── tailwind.config.js          # Opsional (Tailwind saat ini via CDN)
└── README.md
```

## ▶️ Cara Menjalankan

Aplikasi ini statis — cukup serve folder `public/`. Pilih salah satu:

**Python (paling simpel, tanpa install apa pun):**
```bash
python3 -m http.server 8000 --directory public
# lalu buka http://localhost:8000
```

**Node.js (via `serve`):**
```bash
npx serve public
# atau dengan port eksplisit:
npx serve public --listen 8000
```

**Lewat `package.json`:**
```bash
npm start        # sama dengan: npx serve public
npm run dev      # sama dengan: npx serve public --listen 8000
```

**PHP (alternatif):**
```bash
php -S localhost:8000 -t public
```

> ⚠️ Jangan buka file HTML langsung lewat `file://` — aset relatif & CDN bisa
> diblokir browser. Selalu jalankan lewat server lokal di atas.

**Alur:** `public/index.html` → redirect ke `login.html` → setelah login →
`dashboard/index.html`. Perpindahan antar modul memakai multi-page
(`showPage()` mengarahkan ke file halaman tujuan).

## 🧰 Tech Stack

| Teknologi | Keterangan |
|---|---|
| **HTML5** | Struktur halaman (16 dashboard + login + 404) |
| **CSS3** | Dipecah per-tanggungjawab (main, components, layout, pages, responsive, login) |
| **Vanilla JavaScript (ES6+)** | Tanpa framework / bundler |
| **Tailwind CSS (CDN)** | Utility classes via `cdn.tailwindcss.com` |
| **Chart.js (CDN)** | Grafik penjualan, channel, & laporan |
| **Lucide (CDN)** | Ikon SVG |
| **Python / Node `serve` / PHP** | Untuk menjalankan server lokal |

## 📄 License

Proyek ini didistribusikan di bawah **MIT License**.

## 👤 Author

**Mr David**


