# Portfolio Website

Portfolio website modern dengan dashboard CMS, dibangun dengan Next.js 14, TypeScript, Tailwind CSS, dan Supabase.

## Fitur

- ✨ Design modern dan responsif
- 🌙 Dark/Light mode
- 📱 Mobile-first approach
- 🚀 Fast loading dengan Next.js App Router
- 🎨 Styling dengan Tailwind CSS
- 📝 Halaman Beranda, Tentang, Proyek, Skills, Kontak
- 🔍 Filter dan search pada proyek

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## Instalasi

1. Clone repository:
```bash
git clone <your-repo-url>
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Jalankan development server:
```bash
npm run dev
```

4. Buka browser dan akses `http://localhost:3000`

## Struktur Project

```
portfolio/
├── app/                    # Next.js App Router pages
├── components/            # Reusable components
│   ├── layout/           # Navbar, Footer
│   ├── sections/         # Hero, FeaturedProjects, dll
│   └── ui/               # Button, Card, Badge
├── data/                 # Data dummy (akan diganti dengan Supabase)
├── lib/                  # Utility functions
├── types/                # TypeScript types
└── public/               # Static assets
```

## Deployment ke Vercel

1. Push code ke GitHub
2. Import project di [Vercel](https://vercel.com)
3. Deploy!

## Fase Selanjutnya

- [ ] Fase 2: Integrasi Supabase + Dashboard Admin
- [ ] Fase 3: Sistem Artikel dengan Markdown
- [ ] Fase 4: Polish & Optimization

## Author

Najib - Full Stack Developer

## License

MIT
