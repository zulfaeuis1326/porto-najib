import { Article } from '@/types';

export const articlesData: Article[] = [
  {
    id: '1',
    title: 'Membangun Website Portfolio dengan Next.js dan Supabase',
    slug: 'membangun-website-portfolio-nextjs-supabase',
    excerpt: 'Panduan lengkap membangun website portfolio modern dengan Next.js 14, TypeScript, dan Supabase sebagai backend.',
    content: `# Membangun Website Portfolio dengan Next.js dan Supabase

Dalam artikel ini, saya akan berbagi pengalaman membangun website portfolio lengkap dengan dashboard CMS.

## Tech Stack

- **Next.js 14**: Framework React dengan App Router
- **TypeScript**: Type safety untuk kode yang lebih aman
- **Supabase**: Backend-as-a-Service untuk database dan auth
- **TailwindCSS**: Styling yang cepat dan konsisten

## Arsitektur

Portfolio ini dibagi menjadi dua bagian:
1. Situs publik untuk menampilkan karya
2. Dashboard admin untuk mengelola konten

...`,
    coverUrl: '/images/article-nextjs.svg',
    category: 'Tutorial',
    tags: ['Next.js', 'Supabase', 'TypeScript', 'Web Development'],
    readTime: 8,
    publishedAt: '2024-09-15'
  },
  {
    id: '2',
    title: 'Dark Mode Implementation di Next.js',
    slug: 'dark-mode-implementation-nextjs',
    excerpt: 'Cara implementasi dark mode yang smooth di Next.js dengan TailwindCSS, termasuk persist user preference.',
    content: `# Dark Mode Implementation di Next.js

Dark mode sudah jadi fitur wajib di aplikasi modern. Berikut cara implementasinya...`,
    coverUrl: '/images/article-darkmode.svg',
    category: 'Tutorial',
    tags: ['Next.js', 'TailwindCSS', 'Dark Mode'],
    readTime: 5,
    publishedAt: '2024-08-20'
  },
  {
    id: '3',
    title: 'Optimasi Performa Website: Panduan Praktis',
    slug: 'optimasi-performa-website',
    excerpt: 'Tips dan trik mengoptimalkan performa website untuk mendapatkan skor Lighthouse yang sempurna.',
    content: `# Optimasi Performa Website

Performa website sangat penting untuk user experience dan SEO...`,
    coverUrl: '/images/article-performance.svg',
    category: 'Best Practices',
    tags: ['Performance', 'Optimization', 'Web Development'],
    readTime: 10,
    publishedAt: '2024-07-10'
  },
  {
    id: '4',
    title: 'Supabase vs Firebase: Mana yang Lebih Baik?',
    slug: 'supabase-vs-firebase',
    excerpt: 'Perbandingan mendalam antara Supabase dan Firebase dari perspektif developer, termasuk pro dan kontra masing-masing.',
    content: `# Supabase vs Firebase

Kedua platform ini populer untuk backend. Mari kita bandingkan...`,
    coverUrl: '/images/article-comparison.svg',
    category: 'Comparison',
    tags: ['Supabase', 'Firebase', 'Backend'],
    readTime: 12,
    publishedAt: '2024-06-05'
  },
  {
    id: '5',
    title: 'TypeScript untuk Pemula: Getting Started',
    slug: 'typescript-untuk-pemula',
    excerpt: 'Panduan memulai TypeScript dari nol, cocok untuk developer JavaScript yang ingin upgrade skill.',
    content: `# TypeScript untuk Pemula

TypeScript adalah superset dari JavaScript yang menambahkan type system...`,
    coverUrl: '/images/article-typescript.svg',
    category: 'Tutorial',
    tags: ['TypeScript', 'JavaScript', 'Beginner'],
    readTime: 15,
    publishedAt: '2024-05-01'
  }
];
