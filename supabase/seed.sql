-- ============================================================
-- Portfolio CMS — data awal (isi sama dengan konten situs saat ini)
-- Jalankan SETELAH schema.sql, sekali saja.
-- ============================================================

-- ===== Profil =====
INSERT INTO profiles (id, name, headline, bio, photo_url, cv_url, location, email, links)
VALUES (
  'main',
  'Najib',
  'Full Stack Developer & Technical Writer',
  'Saya seorang Full Stack Developer yang passionate dalam membangun aplikasi web modern dan berbagi pengetahuan melalui artikel teknis. Fokus saya adalah membuat solusi yang user-friendly dan mudah di-maintain.',
  '/images/profile.svg',
  '/cv/najib-cv.pdf',
  'Jakarta, Indonesia',
  'najib@example.com',
  '{"github":"https://github.com/najib","linkedin":"https://linkedin.com/in/najib","twitter":"https://twitter.com/najib","instagram":"https://instagram.com/najib"}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, headline = EXCLUDED.headline, bio = EXCLUDED.bio,
  photo_url = EXCLUDED.photo_url, cv_url = EXCLUDED.cv_url,
  location = EXCLUDED.location, email = EXCLUDED.email, links = EXCLUDED.links;

-- ===== Proyek =====
INSERT INTO projects (slug, title, summary, description, cover_url, images, tech_stack, demo_url, repo_url, featured, sort_order, created_at)
VALUES
(
  'ecommerce-dashboard',
  'E-Commerce Dashboard',
  'Dashboard admin untuk mengelola produk, pesanan, dan laporan penjualan dengan real-time analytics.',
  '## Overview
Dashboard admin lengkap untuk toko online dengan fitur-fitur:

- **Manajemen Produk**: CRUD produk dengan upload gambar multiple
- **Order Management**: Tracking pesanan dari pending hingga selesai
- **Analytics**: Grafik penjualan real-time dengan Chart.js
- **User Management**: Kelola customer dan admin

## Tantangan
Membuat real-time update tanpa membebani server. Solusinya menggunakan WebSocket untuk notifikasi dan polling ringan untuk data analytics.

## Hasil
Klien melaporkan efisiensi operasional meningkat 40% karena proses yang lebih streamlined.',
  '/images/project-ecommerce.svg',
  ARRAY['/images/project-ecommerce-2.svg','/images/project-ecommerce-3.svg','/images/project-ecommerce.svg'],
  ARRAY['Next.js','TypeScript','PostgreSQL','Prisma','TailwindCSS','Chart.js'],
  'https://ecommerce-demo.najib.dev',
  'https://github.com/najib/ecommerce-dashboard',
  true, 1, '2024-08-15'
),
(
  'task-management-app',
  'Task Management App',
  'Aplikasi manajemen tugas dengan fitur kolaborasi tim, drag-and-drop, dan notifikasi real-time.',
  '## Overview
Aplikasi task management mirip Trello/Asana untuk membantu tim mengelola proyek dengan lebih efisien.

- **Kanban Board**: Drag and drop cards antar kolom
- **Real-time Collaboration**: Multiple user bisa edit bersamaan
- **Labels & Priority**: Organisasi task dengan label dan prioritas
- **Comments & Attachments**: Diskusi langsung di task

## Tech Highlights
Menggunakan React DnD untuk drag-and-drop yang smooth, dan Supabase Realtime untuk kolaborasi multi-user.',
  '/images/project-task.svg',
  ARRAY['/images/project-task-2.svg','/images/project-task.svg'],
  ARRAY['React','Supabase','React DnD','TailwindCSS','Zustand'],
  'https://taskapp-demo.najib.dev',
  'https://github.com/najib/task-management',
  true, 2, '2024-06-20'
),
(
  'blog-platform',
  'Blog Platform',
  'Platform blogging dengan markdown editor, SEO optimization, dan analytics terintegrasi.',
  '## Overview
Platform blogging modern dengan fokus pada pengalaman menulis dan SEO.

- **Markdown Editor**: Editor dengan live preview
- **SEO Tools**: Auto-generate meta tags, sitemap, schema markup
- **Analytics**: Tracking views, popular posts, dan user engagement
- **Newsletter**: Integrasi dengan email service

## Why This Stack
Next.js untuk SEO-friendly rendering, MDX untuk konten dinamis dalam markdown.',
  '/images/project-blog.svg',
  ARRAY['/images/project-blog-2.svg','/images/project-blog.svg'],
  ARRAY['Next.js','MDX','MongoDB','TailwindCSS','Vercel'],
  'https://blog-demo.najib.dev',
  '',
  true, 3, '2024-05-10'
),
(
  'weather-app',
  'Weather App',
  'Aplikasi cuaca dengan forecast 7 hari, multiple locations, dan weather alerts.',
  '## Overview
Aplikasi cuaca yang menampilkan informasi detail dan forecast untuk berbagai lokasi.

- **Current Weather**: Suhu, humidity, wind speed
- **7-Day Forecast**: Prediksi cuaca seminggu ke depan
- **Multiple Locations**: Save favorite locations
- **Weather Alerts**: Notifikasi cuaca ekstrem

Menggunakan OpenWeatherMap API dan menampilkan data dengan visualisasi yang menarik.',
  '/images/project-weather.svg',
  ARRAY['/images/project-weather.svg'],
  ARRAY['React','OpenWeather API','TailwindCSS','React Query'],
  'https://weather-demo.najib.dev',
  'https://github.com/najib/weather-app',
  false, 4, '2024-03-15'
),
(
  'portfolio-cms',
  'Portfolio CMS',
  'Content Management System untuk portfolio dengan dashboard admin yang powerful.',
  '## Overview
CMS khusus untuk portfolio developer dengan fitur lengkap.

- **Project Management**: CRUD projects dengan image gallery
- **Blog System**: Artikel dengan markdown support
- **Skills & Experience**: Kelola CV data
- **Contact Form**: Inbox untuk pesan dari visitor

Stack modern dengan Supabase untuk backend yang cepat dan aman.',
  '/images/project-cms.svg',
  ARRAY['/images/project-cms.svg'],
  ARRAY['Next.js','TypeScript','Supabase','TailwindCSS'],
  '',
  '',
  false, 5, '2024-09-01'
)
ON CONFLICT (slug) DO NOTHING;

-- ===== Artikel =====
INSERT INTO articles (slug, title, excerpt, content, cover_url, category, tags, read_time, published_at)
VALUES
(
  'membangun-website-portfolio-nextjs-supabase',
  'Membangun Website Portfolio dengan Next.js dan Supabase',
  'Panduan lengkap membangun website portfolio modern dengan Next.js 14, TypeScript, dan Supabase sebagai backend.',
  '# Membangun Website Portfolio dengan Next.js dan Supabase

Dalam artikel ini, saya akan berbagi pengalaman membangun website portfolio lengkap dengan dashboard CMS.

## Tech Stack

- **Next.js 14**: Framework React dengan App Router
- **TypeScript**: Type safety untuk kode yang lebih aman
- **Supabase**: Backend-as-a-Service untuk database dan auth
- **TailwindCSS**: Styling yang cepat dan konsisten

## Arsitektur

Portfolio ini dibagi menjadi dua bagian:
1. Situs publik untuk menampilkan karya
2. Dashboard admin untuk mengelola konten',
  '/images/article-nextjs.svg',
  'Tutorial',
  ARRAY['Next.js','Supabase','TypeScript','Web Development'],
  8, '2024-09-15'
),
(
  'dark-mode-implementation-nextjs',
  'Dark Mode Implementation di Next.js',
  'Cara implementasi dark mode yang smooth di Next.js dengan TailwindCSS, termasuk persist user preference.',
  '# Dark Mode Implementation di Next.js

Dark mode sudah jadi fitur wajib di aplikasi modern. Berikut cara implementasinya...',
  '/images/article-darkmode.svg',
  'Tutorial',
  ARRAY['Next.js','TailwindCSS','Dark Mode'],
  5, '2024-08-20'
),
(
  'optimasi-performa-website',
  'Optimasi Performa Website: Panduan Praktis',
  'Tips dan trik mengoptimalkan performa website untuk mendapatkan skor Lighthouse yang sempurna.',
  '# Optimasi Performa Website

Performa website sangat penting untuk user experience dan SEO...',
  '/images/article-performance.svg',
  'Best Practices',
  ARRAY['Performance','Optimization','Web Development'],
  10, '2024-07-10'
),
(
  'supabase-vs-firebase',
  'Supabase vs Firebase: Mana yang Lebih Baik?',
  'Perbandingan mendalam antara Supabase dan Firebase dari perspektif developer, termasuk pro dan kontra masing-masing.',
  '# Supabase vs Firebase

Kedua platform ini populer untuk backend. Mari kita bandingkan...',
  '/images/article-comparison.svg',
  'Comparison',
  ARRAY['Supabase','Firebase','Backend'],
  12, '2024-06-05'
),
(
  'typescript-untuk-pemula',
  'TypeScript untuk Pemula: Getting Started',
  'Panduan memulai TypeScript dari nol, cocok untuk developer JavaScript yang ingin upgrade skill.',
  '# TypeScript untuk Pemula

TypeScript adalah superset dari JavaScript yang menambahkan type system...',
  '/images/article-typescript.svg',
  'Tutorial',
  ARRAY['TypeScript','JavaScript','Beginner'],
  15, '2024-05-01'
)
ON CONFLICT (slug) DO NOTHING;

-- ===== Skill =====
INSERT INTO skills (name, icon, category, level, sort_order)
VALUES
  ('React', '⚛️', 'frontend', 'advanced', 1),
  ('Next.js', '▲', 'frontend', 'advanced', 2),
  ('TypeScript', '📘', 'frontend', 'intermediate', 3),
  ('TailwindCSS', '🎨', 'frontend', 'advanced', 4),
  ('JavaScript', '📜', 'frontend', 'advanced', 5),
  ('HTML & CSS', '🌐', 'frontend', 'expert', 6),
  ('Node.js', '🟢', 'backend', 'intermediate', 7),
  ('PostgreSQL', '🐘', 'backend', 'intermediate', 8),
  ('Supabase', '⚡', 'backend', 'advanced', 9),
  ('Prisma', '🔷', 'backend', 'intermediate', 10),
  ('REST API', '🔌', 'backend', 'advanced', 11),
  ('MongoDB', '🍃', 'backend', 'intermediate', 12),
  ('Git & GitHub', '🔧', 'tools', 'advanced', 13),
  ('Vercel', '▲', 'tools', 'advanced', 14),
  ('VS Code', '💻', 'tools', 'expert', 15),
  ('Figma', '🎨', 'tools', 'intermediate', 16),
  ('Responsive Design', '📱', 'other', 'advanced', 17),
  ('SEO', '🔍', 'other', 'intermediate', 18);

-- ===== Pengalaman =====
INSERT INTO experiences (type, title, organization, start_date, end_date, description, current, sort_order)
VALUES
  ('work', 'Freelance Full Stack Developer', 'Self-Employed', '2023-01-01', NULL, 'Membangun aplikasi web custom untuk berbagai klien, dari e-commerce hingga dashboard analytics. Fokus pada Next.js, React, dan Supabase.', true, 1),
  ('work', 'Frontend Developer', 'PT Digital Startup Indonesia', '2021-06-01', '2022-12-31', 'Mengembangkan dan maintain aplikasi web dengan React dan TypeScript. Kolaborasi dengan tim designer dan backend developer untuk deliver fitur-fitur baru.', false, 2),
  ('work', 'Junior Web Developer', 'CV Tech Solutions', '2020-03-01', '2021-05-31', 'Membangun website company profile dan landing page untuk klien. Belajar best practices dalam web development dan version control dengan Git.', false, 3),
  ('education', 'S1 Teknik Informatika', 'Universitas Indonesia', '2016-08-01', '2020-07-31', 'Belajar fundamental computer science, algoritma, struktur data, dan web development. Tugas akhir tentang aplikasi mobile dengan React Native.', false, 4);
