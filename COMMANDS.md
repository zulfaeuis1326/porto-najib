# Perintah untuk Menjalankan Portfolio

## 1. Fix PowerShell (Jika Error) - PILIH SALAH SATU:

### Opsi A: Ubah Execution Policy (Recommended)
# Buka PowerShell sebagai Administrator, lalu:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

### Opsi B: Gunakan CMD
# Buka Command Prompt (CMD) biasa, bukan PowerShell

### Opsi C: Gunakan Git Bash
# Jika punya Git terinstall, gunakan Git Bash

---

## 2. Install Dependencies
cd portfolio
npm install

---

## 3. Jalankan Development Server
npm run dev

---

## 4. Buka di Browser
http://localhost:3000

---

## Perintah Lainnya:

# Build untuk production
npm run build

# Start production server
npm start

# Jalankan linter
npm run lint

---

## Deploy ke Vercel:

# 1. Push ke GitHub
git init
git add .
git commit -m "Fase 1: Portfolio website"
git branch -M main
git remote add origin https://github.com/USERNAME/REPO-NAME.git
git push -u origin main

# 2. Buka vercel.com dan import repository

---

## Troubleshooting:

# Jika port 3000 sudah dipakai
npm run dev -- -p 3001

# Jika ada error module not found
npm install

# Clear cache jika ada masalah aneh
rm -rf .next
npm run dev

# Atau di Windows (PowerShell):
Remove-Item -Recurse -Force .next
npm run dev
