import { Project } from '@/types';

export const projectsData: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Dashboard',
    slug: 'ecommerce-dashboard',
    summary: 'Dashboard admin untuk mengelola produk, pesanan, dan laporan penjualan dengan real-time analytics.',
    description: `## Overview
Dashboard admin lengkap untuk toko online dengan fitur-fitur:

- **Manajemen Produk**: CRUD produk dengan upload gambar multiple
- **Order Management**: Tracking pesanan dari pending hingga selesai
- **Analytics**: Grafik penjualan real-time dengan Chart.js
- **User Management**: Kelola customer dan admin

## Tantangan
Membuat real-time update tanpa membebani server. Solusinya menggunakan WebSocket untuk notifikasi dan polling ringan untuk data analytics.

## Hasil
Klien melaporkan efisiensi operasional meningkat 40% karena proses yang lebih streamlined.`,
    coverUrl: '/images/project-ecommerce.svg',
    images: [
      '/images/project-ecommerce-2.svg',
      '/images/project-ecommerce-3.svg',
      '/images/project-ecommerce.svg'
    ],
    techStack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'TailwindCSS', 'Chart.js'],
    demoUrl: 'https://ecommerce-demo.najib.dev',
    repoUrl: 'https://github.com/najib/ecommerce-dashboard',
    featured: true,
    sortOrder: 1,
    createdAt: '2024-08-15'
  },
  {
    id: '2',
    title: 'Task Management App',
    slug: 'task-management-app',
    summary: 'Aplikasi manajemen tugas dengan fitur kolaborasi tim, drag-and-drop, dan notifikasi real-time.',
    description: `## Overview
Aplikasi task management mirip Trello/Asana untuk membantu tim mengelola proyek dengan lebih efisien.

- **Kanban Board**: Drag and drop cards antar kolom
- **Real-time Collaboration**: Multiple user bisa edit bersamaan
- **Labels & Priority**: Organisasi task dengan label dan prioritas
- **Comments & Attachments**: Diskusi langsung di task

## Tech Highlights
Menggunakan React DnD untuk drag-and-drop yang smooth, dan Supabase Realtime untuk kolaborasi multi-user.`,
    coverUrl: '/images/project-task.svg',
    images: [
      '/images/project-task-2.svg',
      '/images/project-task.svg'
    ],
    techStack: ['React', 'Supabase', 'React DnD', 'TailwindCSS', 'Zustand'],
    demoUrl: 'https://taskapp-demo.najib.dev',
    repoUrl: 'https://github.com/najib/task-management',
    featured: true,
    sortOrder: 2,
    createdAt: '2024-06-20'
  },
  {
    id: '3',
    title: 'Blog Platform',
    slug: 'blog-platform',
    summary: 'Platform blogging dengan markdown editor, SEO optimization, dan analytics terintegrasi.',
    description: `## Overview
Platform blogging modern dengan fokus pada pengalaman menulis dan SEO.

- **Markdown Editor**: Editor dengan live preview
- **SEO Tools**: Auto-generate meta tags, sitemap, schema markup
- **Analytics**: Tracking views, popular posts, dan user engagement
- **Newsletter**: Integrasi dengan email service

## Why This Stack
Next.js untuk SEO-friendly rendering, MDX untuk konten dinamis dalam markdown.`,
    coverUrl: '/images/project-blog.svg',
    images: [
      '/images/project-blog-2.svg',
      '/images/project-blog.svg'
    ],
    techStack: ['Next.js', 'MDX', 'MongoDB', 'TailwindCSS', 'Vercel'],
    demoUrl: 'https://blog-demo.najib.dev',
    featured: true,
    sortOrder: 3,
    createdAt: '2024-05-10'
  },
  {
    id: '4',
    title: 'Weather App',
    slug: 'weather-app',
    summary: 'Aplikasi cuaca dengan forecast 7 hari, multiple locations, dan weather alerts.',
    description: `## Overview
Aplikasi cuaca yang menampilkan informasi detail dan forecast untuk berbagai lokasi.

- **Current Weather**: Suhu, humidity, wind speed
- **7-Day Forecast**: Prediksi cuaca seminggu ke depan
- **Multiple Locations**: Save favorite locations
- **Weather Alerts**: Notifikasi cuaca ekstrem

Menggunakan OpenWeatherMap API dan menampilkan data dengan visualisasi yang menarik.`,
    coverUrl: '/images/project-weather.svg',
    images: ['/images/project-weather.svg'],
    techStack: ['React', 'OpenWeather API', 'TailwindCSS', 'React Query'],
    demoUrl: 'https://weather-demo.najib.dev',
    repoUrl: 'https://github.com/najib/weather-app',
    featured: false,
    sortOrder: 4,
    createdAt: '2024-03-15'
  },
  {
    id: '5',
    title: 'Portfolio CMS',
    slug: 'portfolio-cms',
    summary: 'Content Management System untuk portfolio dengan dashboard admin yang powerful.',
    description: `## Overview
CMS khusus untuk portfolio developer dengan fitur lengkap.

- **Project Management**: CRUD projects dengan image gallery
- **Blog System**: Artikel dengan markdown support
- **Skills & Experience**: Kelola CV data
- **Contact Form**: Inbox untuk pesan dari visitor

Stack modern dengan Supabase untuk backend yang cepat dan aman.`,
    coverUrl: '/images/project-cms.svg',
    images: ['/images/project-cms.svg'],
    techStack: ['Next.js', 'TypeScript', 'Supabase', 'TailwindCSS'],
    featured: false,
    sortOrder: 5,
    createdAt: '2024-09-01'
  }
];
