# Lalo YTD — Sales AI PWA

PWA Sales Assistant dengan Firebase Firestore + Gemini AI.

## File Structure
```
sales-ai-pwa/
├── index.html      ← Aplikasi utama
├── manifest.json   ← PWA manifest
├── sw.js           ← Service worker (offline support)
└── README.md
```

## Deploy ke GitHub Pages

### Langkah 1 — Upload ke GitHub
1. Buka **github.com** → Login akun `kanja999`
2. Klik **"New repository"**
3. Nama repo: `lalo-ytd` (atau nama lain)
4. Set ke **Public**
5. Klik **"Create repository"**

### Langkah 2 — Upload Files
1. Di halaman repo baru, klik **"uploading an existing file"**
2. Upload ketiga file: `index.html`, `manifest.json`, `sw.js`
3. Klik **"Commit changes"**

### Langkah 3 — Aktifkan GitHub Pages
1. Di repo → klik **Settings**
2. Scroll ke **"Pages"** (menu kiri)
3. Source: **Deploy from a branch**
4. Branch: **main** → folder: **/ (root)**
5. Klik **Save**

### Langkah 4 — Akses App
Setelah ~2 menit, app bisa diakses di:
```
https://kanja999.github.io/lalo-ytd/
```

## Catatan Penting

### Firestore Rules
Pastikan Firestore Rules mengizinkan read:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read: if true;  // Untuk testing
      allow write: if false;
    }
  }
}
```

### Ikon PWA
Untuk ikon app yang muncul saat install, tambahkan file:
- `icon-192.png` (192×192 px)  
- `icon-512.png` (512×512 px)

Bisa buat di: **favicon.io** atau **realfavicongenerator.net**

## Fitur App
- 📊 **Dashboard** — Stats + Top outlet & produk per bulan
- 🏪 **Outlet** — List semua outlet + search
- 📦 **Produk** — Ranking produk + search  
- 🤖 **AI Chat** — Tanya jawab data sales pakai Gemini AI
- 📱 **Installable** — Bisa install ke homescreen Android/iOS
