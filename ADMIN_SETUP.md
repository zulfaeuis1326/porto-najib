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
- Sesudah login, link itu berubah jadi **Dashboard**
- Dashboard (`/admin`): statistik konten + pesan terbaru + jalan pintas
- **Proyek** (`/admin/projects`): tambah / edit / hapus, centang Unggulan
- **Artikel** (`/admin/articles`): tulis / edit / hapus
- **Profil** (`/admin/profile`): nama, bio, foto, CV, link sosmed
- **Pesan Masuk** (`/admin/inbox`): pesan dari form kontak, tandai dibaca, balas via email, hapus
- Setiap simpan, halaman publik terkait otomatis di-refresh (revalidate)

## Catatan keamanan

- `SUPABASE_SERVICE_ROLE_KEY` dan `SESSION_SECRET` tidak pernah ke-commit (`.env.local` di-gitignore).
- RLS aktif: publik hanya bisa baca konten + kirim pesan. Tulis/hapus hanya lewat server admin.
- Kalau `SESSION_SECRET` diganti, semua sesi admin logout otomatis.
- Skill & pengalaman masih dari file `data/` (jarang berubah) — belum masuk CMS.
