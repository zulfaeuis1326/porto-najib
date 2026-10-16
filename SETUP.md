# Panduan Setup dan Menjalankan Portfolio - Fase 1

## Problem: PowerShell Execution Policy

Jika mendapat error saat menjalankan npm, ikuti salah satu solusi berikut:

### Solusi 1: Ubah Execution Policy (Recommended)

1. Buka PowerShell sebagai Administrator
2. Jalankan command:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```
3. Ketik `Y` untuk konfirmasi

### Solusi 2: Gunakan CMD (Command Prompt)

Gunakan CMD biasa, bukan PowerShell.

### Solusi 3: Gunakan Git Bash

Jika punya Git terinstall, gunakan Git Bash.

---

## Langkah Setup

### 1. Install Dependencies

Buka terminal (CMD/PowerShell/Git Bash) di folder `portfolio`:

```bash
npm install
```

Tunggu sampai semua package terinstall (±2-5 menit tergantung internet).

### 2. Jalankan Development Server

```bash
npm run dev
```

### 3. Buka Browser

Akses: `http://localhost:3000`

---

## Struktur yang Sudah Dibuat

✅ **Halaman Publik:**
- `/` - Beranda (Hero + Featured Projects + Latest Articles)
- `/about` - Tentang (Bio, Pengalaman, Pendidikan)
- `/projects` - Daftar Proyek (dengan filter & search)
- `/projects/[slug]` - Detail Proyek
- `/skills` - Skills (grouped by category)
- `/contact` - Kontak (form + info)

✅ **Komponen:**
- Navbar (responsive + mobile menu)
- Footer (links + social media)
- Button, Card, Badge (reusable UI)
- ThemeToggle (dark/light mode)
- ContactForm (siap untuk integrasi API)

✅ **Data:**
- Profile data dummy
- 5 Projects dummy
- 5 Articles dummy
- 18 Skills dummy
- 4 Experiences dummy

✅ **Features:**
- ✨ Dark/Light mode (persistent)
- 📱 Fully responsive
- 🎨 Modern design dengan Tailwind
- 🔍 Search & filter projects
- 🖼️ Placeholder images (dari placehold.co)

---

## Testing Checklist - Fase 1

Setelah `npm run dev` berjalan, cek hal berikut:

### Desktop (Browser biasa)
- [ ] Navbar muncul dan semua link bekerja
- [ ] Hero section tampil dengan teks dan foto placeholder
- [ ] Featured Projects muncul (3 proyek)
- [ ] Latest Articles muncil (3 artikel)
- [ ] Footer muncul dengan links
- [ ] Dark/light mode toggle bekerja
- [ ] Klik tombol "Lihat Proyek" masuk ke halaman Projects
- [ ] Di halaman Projects, filter tech stack bekerja
- [ ] Search box berfungsi
- [ ] Klik project masuk ke detail page
- [ ] Halaman About menampilkan pengalaman & pendidikan
- [ ] Halaman Skills menampilkan skill grouped by category
- [ ] Halaman Contact form bisa diisi (belum nyimpan ke DB)

### Mobile (Resize browser ke ukuran HP)
- [ ] Hamburger menu muncul
- [ ] Menu mobile bisa dibuka/ditutup
- [ ] Semua halaman responsive
- [ ] Gambar tidak overflow
- [ ] Text tetap readable

### Dark Mode
- [ ] Toggle dark mode bekerja
- [ ] Warna berubah smooth
- [ ] Setelah refresh, tema tersimpan
- [ ] Semua halaman support dark mode

---

## Error Umum & Solusinya

### 1. "Cannot find module 'next'"
**Solusi:** Jalankan `npm install` lagi

### 2. "Port 3000 already in use"
**Solusi:** 
- Tutup aplikasi lain yang pakai port 3000
- Atau jalankan dengan port lain: `npm run dev -- -p 3001`

### 3. Images tidak muncul
**Solusi:** 
- Pastikan koneksi internet aktif (pakai placeholder dari placehold.co)
- Cek console browser (F12) untuk error

### 4. Dark mode tidak tersimpan
**Solusi:** 
- Cek localStorage di browser tidak di-disable
- Gunakan browser modern (Chrome, Firefox, Edge)

### 5. Build error saat `npm run build`
**Solusi:**
- Pastikan semua file ada
- Jalankan `npm install` lagi
- Cek tidak ada typo di import statements

---

## Deploy ke Vercel (Opsional - setelah testing lokal OK)

### Persiapan
1. Push code ke GitHub:
```bash
git init
git add .
git commit -m "Fase 1: Portfolio public site"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### Deploy
1. Buka [vercel.com](https://vercel.com)
2. Sign up/Login dengan GitHub
3. Klik "New Project"
4. Pilih repository portfolio kamu
5. Klik "Deploy"
6. Tunggu ±2 menit
7. Akses URL yang diberikan (misal: `your-portfolio.vercel.app`)

---

## Next Steps

Setelah Fase 1 selesai dan berjalan dengan baik:

✅ **Fase 1 SELESAI** - Situs publik statis dengan data dummy

🚀 **Fase 2 Berikutnya:**
- Setup Supabase (database & auth)
- Buat tabel untuk projects, skills, articles, dll
- Buat halaman login admin
- Buat dashboard admin dengan CRUD
- Ganti data dummy dengan data dari database

**Jangan lanjut ke Fase 2 sebelum Fase 1 benar-benar jalan dan sudah di-deploy!**

---

## Bantuan

Jika ada error atau stuck:
1. Screenshot error yang muncul
2. Cek console browser (F12 > Console tab)
3. Cek terminal untuk error message
4. Tanya dengan menyertakan error message lengkap
