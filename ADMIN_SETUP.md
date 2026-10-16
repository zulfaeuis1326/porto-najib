# Admin CMS & Login — Panduan Setup

Situs punya akun admin tunggal (kamu) + dashboard CMS yang tersambung ke Supabase.
Tanpa env yang diisi, situs tetap tampil memakai data lokal, tapi `/login` dan `/admin`
menampilkan peringatan konfigurasi.

## 1. Siapkan database (sekali saja)

1. Buka project Supabase → **SQL Editor** → **New query**
2. Paste isi `supabase/schema.sql` → **Run** (bikin tabel + RLS)
3. New query lagi → paste isi `supabase/seed.sql` → **Run** (isi data awal = konten situs saat ini)

## 2. Ambil kunci Supabase

- **Project Settings → Data API**:
  - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
  - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (RAHASIA, hanya di server)

## 3. Isi kredensial admin

Di environment (lokal: `.env.local`, Vercel: Settings → Environment Variables):

```
NEXT_PUBLIC_SUPABASE_URL=https://xyzcompany.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_xxx
SUPABASE_SERVICE_ROLE_KEY=sb_secret_xxx
ADMIN_USERNAME=admin
ADMIN_PASSWORD=<password-kuat-buatanmu>
SESSION_SECRET=<string-acak-min-32-karakter>
```

Generate secret: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

Contoh ada di `.env.example`.

## 4. Pakai

- Login: link kecil **Admin** di baris copyright footer → `/login`
- Sesudah login, link itu berubah menjadi **Dashboard**
- Dashboard (`/admin`): statistik konten, pesan terbaru, status situs, aksi cepat
- **Proyek** (`/admin/projects`): tambah / edit / hapus, unggah cover + galeri, tandai Unggulan
- **Artikel** (`/admin/articles`): tulis / edit / hapus, unggah cover
- **Profil** (`/admin/profile`): nama, bio, **unggah foto & CV (PDF)**, link sosmed
- **Pesan Masuk** (`/admin/inbox`): pesan dari form kontak, tandai dibaca, balas via email, hapus

### Unggah gambar & berkas

Setiap kolom gambar/berkas punya dua pilihan:
1. **Unggah** — pilih dari perangkat (atau tarik & lepas). Maks 6 MB, format JPG/PNG/WebP/GIF/SVG (PDF untuk CV).
2. **Pakai URL** — tempel tautan bila ingin memakai gambar dari luar.

Berkas diunggah ke **Supabase Storage** (bucket `media`, publik). Bucket dibuat
otomatis saat unggahan pertama — tidak perlu diatur manual.

### Konten dari database, bukan dummy

Seluruh halaman publik (beranda, proyek, artikel, tentang, keahlian, kontak) dibaca
langsung dari Supabase setiap kali dibuka. Jadi setiap perubahan tersimpan di CMS
langsung terlihat di situs — tidak ada data contoh yang "nyangkut".

> Catatan: isi `supabase/seed.sql` hanyalah contoh awal (Supabase, proyek, artikel
> contoh). Ganti semuanya lewat dashboard dengan kontenmu sendiri.

## 5. Lokal (opsional)

Supaya dev lokal juga memakai database (bukan data contoh), buat `.env.local`
(sama isinya seperti `.env.example`) lalu `npm run dev`.

## Catatan keamanan

- `SUPABASE_SERVICE_ROLE_KEY` dan `SESSION_SECRET` tidak pernah ke-commit (`.env.local` di-gitignore).
- RLS aktif: publik hanya bisa baca konten + kirim pesan. Tulis/hapus hanya lewat server admin.
- Unggahan hanya bisa dilakukan admin yang sudah login (dicek di server).
- Kalau `SESSION_SECRET` diganti, semua sesi admin logout otomatis.
- Skill & pengalaman masih dari file `data/` (jarang berubah) — belum masuk CMS.
