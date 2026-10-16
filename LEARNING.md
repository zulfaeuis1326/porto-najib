# 3 Konsep Penting yang Dipelajari di Fase 1

## 1. Next.js App Router & File-Based Routing

### Apa itu?
Next.js menggunakan **struktur folder sebagai routing**. Artinya, nama folder dan file di dalam folder `app/` otomatis jadi URL website.

### Contoh:
```
app/
├── page.tsx           → http://localhost:3000/
├── about/
│   └── page.tsx      → http://localhost:3000/about
├── projects/
│   ├── page.tsx      → http://localhost:3000/projects
│   └── [slug]/
│       └── page.tsx  → http://localhost:3000/projects/ecommerce-dashboard
```

### Kenapa Penting?
- **Lebih mudah**: Tidak perlu setup routing manual
- **Otomatis**: Bikin folder baru = route baru
- **Dynamic routes**: `[slug]` artinya parameter dinamis (bisa berubah)

### Analogi:
Seperti struktur folder di komputer. Folder `Documents/Foto/Liburan` sama dengan URL `website.com/documents/foto/liburan`.

---

## 2. Component-Based Architecture (React/Next.js)

### Apa itu?
Website dipecah jadi **komponen-komponen kecil yang reusable** (bisa dipakai berulang).

### Contoh di Project Ini:
```tsx
// Komponen Button bisa dipakai di mana saja
<Button variant="primary">Kirim</Button>
<Button variant="outline">Batal</Button>

// Komponen Card bisa dipakai untuk project, article, dll
<Card hover>
  <h3>Judul</h3>
  <p>Deskripsi...</p>
</Card>
```

### Kenapa Penting?
- **DRY (Don't Repeat Yourself)**: Tulis sekali, pakai berkali-kali
- **Maintainable**: Ubah 1 komponen, semua yang pakai ikut berubah
- **Konsisten**: Design sama di seluruh website

### Analogi:
Seperti LEGO blocks. Punya balok-balok kecil (Button, Card, Badge), tinggal disusun jadi bangunan besar (halaman website).

---

## 3. TypeScript & Type Safety

### Apa itu?
TypeScript adalah JavaScript dengan **tipe data yang jelas**. Kita harus definisikan dulu data apa yang boleh masuk.

### Contoh:
```typescript
// Tanpa TypeScript (JavaScript biasa)
function greet(name) {
  return "Hello " + name;
}
greet(123); // Bisa jalan tapi aneh!

// Dengan TypeScript
function greet(name: string) {
  return "Hello " + name;
}
greet(123); // ❌ Error! Harus string
greet("Najib"); // ✅ OK
```

### Di Project Ini:
```typescript
// File types/index.ts
export interface Project {
  id: string;
  title: string;
  slug: string;
  techStack: string[];
  // ... dll
}

// Sekarang TypeScript bisa cek otomatis
const project: Project = {
  id: "1",
  title: "My App",
  // Kalau lupa field, langsung error!
}
```

### Kenapa Penting?
- **Catch errors lebih cepat**: Sebelum running, sudah ketahuan salah
- **Autocomplete**: VS Code bisa suggest property yang tersedia
- **Dokumentasi otomatis**: Lihat interface langsung tahu apa saja fieldnya

### Analogi:
Seperti form yang ada validasinya. Kalau isi email harus format email, kalau isi angka harus number. TypeScript = validasi otomatis di kode.

---

## Bonus: Konsep Penting Lainnya

### 4. Tailwind CSS - Utility-First CSS
```tsx
// Daripada bikin class CSS sendiri:
<button className="my-blue-button">Click</button>

// Tailwind pakai utility classes:
<button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
  Click
</button>
```
**Keuntungan**: Cepat, konsisten, no naming confusion

### 5. Props & Children di React
```tsx
// Komponen menerima data dari luar (props)
function Card({ title, children }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <div>{children}</div>
    </div>
  );
}

// Cara pakai:
<Card title="Hello">
  <p>Ini isi card</p>
</Card>
```

### 6. Client vs Server Component
```tsx
'use client'; // Kalau pakai useState, onClick, dll

// Kalau tidak pakai, default = Server Component (lebih cepat)
```

---

## Latihan Pemahaman

Coba jawab pertanyaan ini (jawaban ada di code yang sudah dibuat):

1. **Routing**: Kalau mau bikin halaman `/blog`, folder apa yang harus dibuat?
2. **Component**: Komponen apa yang dipakai untuk tombol di website ini?
3. **TypeScript**: Apa saja field wajib di interface `Project`?
4. **Props**: Di komponen `Button`, apa saja props yang bisa dikasih?
5. **Tailwind**: Class apa yang bikin background biru dan text putih?

### Jawaban:
1. `app/blog/page.tsx`
2. `<Button>` dari `components/ui/Button.tsx`
3. id, title, slug, summary, description, coverUrl, images, techStack, featured, sortOrder, createdAt
4. variant, size, children, className, dan semua HTML button attributes
5. `bg-blue-600 text-white`

---

## Tips Belajar

1. **Baca kode pelan-pelan**: Mulai dari `app/page.tsx` (Homepage), trace componentnya
2. **Ubah sesuatu**: Ganti warna, text, tambah button - lihat hasilnya
3. **Console.log is your friend**: Taruh `console.log(data)` untuk lihat isi variabel
4. **Baca error dengan teliti**: Error message Next.js cukup jelas, biasanya kasih tau file dan line mana yang salah
5. **Docs adalah teman**: 
   - Next.js: https://nextjs.org/docs
   - Tailwind: https://tailwindcss.com/docs
   - TypeScript: https://www.typescriptlang.org/docs

## Persiapan Fase 2

Di Fase 2 nanti kita akan belajar:
- **Database** (Supabase/PostgreSQL)
- **Authentication** (Login admin)
- **API Routes** (CRUD operations)
- **Server Actions** (Next.js 14 feature)
- **Row Level Security** (Database security)

Tapi fokus dulu Fase 1 sampai benar-benar paham! 🚀
