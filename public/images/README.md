# Gambar Portfolio (lokal, offline-friendly)

Semua gambar di-generate lokal via `node scripts/make-images.mjs`
(tidak lagi bergantung ke placehold.co, jadi situs tetap tampil penuh tanpa internet).

## Daftar file

- `profile.svg` — foto profil (placeholder inisial "N")
- `project-{ecommerce,task,blog,weather,cms}.svg` — cover tiap proyek
- `project-{ecommerce-2,ecommerce-3,task-2,blog-2}.svg` — gambar detail proyek
- `article-{nextjs,darkmode,performance,comparison,typescript}.svg` — cover artikel

## Ganti dengan foto asli

Taruh file asli di folder ini dengan nama yang sama (atau update path di
`data/profile.ts`, `data/projects.ts`, `data/articles.ts`):

```
public/images/
├── profile.jpg        <- foto profil asli (disarankan 500x500)
├── project-*.jpg      <- screenshot proyek asli (disarankan 800x600)
└── article-*.jpg      <- cover artikel asli (disarankan 800x600)
```

## CV

File `public/cv/najib-cv.pdf` adalah placeholder satu halaman.
Ganti dengan CV asli (nama file sama) agar tombol "Download CV" mengunduh CV yang benar.
