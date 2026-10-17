import { NextResponse } from 'next/server';
import { supabaseAdmin, isServiceConfigured } from '@/lib/supabase';
import { getSession } from '@/lib/session';
import { rateLimit, tooMany } from '@/lib/rate-limit';

export const runtime = 'nodejs';

const BUCKET = 'media';
const MAX_BYTES = 6 * 1024 * 1024; // 6 MB

// Ekstensi ditentukan dari TIPE berkas (bukan nama kiriman pengguna), supaya
// tidak ada yang bisa menitipkan .html/.js lalu dieksekusi browser.
const ALLOWED_EXT: Record<string, string> = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'image/gif': '.gif',
  'image/svg+xml': '.svg',
  'image/avif': '.avif',
  'image/bmp': '.bmp',
  'application/pdf': '.pdf',
};

const EXT_FALLBACK: Record<string, string> = Object.fromEntries(
  Object.entries(ALLOWED_EXT).map(([mime, ext]) => [ext, mime])
);

function pickExt(name: string, type: string): string {
  if (ALLOWED_EXT[type]) return ALLOWED_EXT[type];
  // Tipe tidak dikenal → pakai ekstensi nama berkas, tapi hanya dari daftar putih.
  const m = /\.([a-z0-9]+)$/i.exec(name);
  const ext = m ? '.' + m[1].toLowerCase() : '';
  return EXT_FALLBACK[ext] ? ext : '';
}

// Unggah berkas dari perangkat admin ke Supabase Storage (bucket "media").
// Hanya admin yang login; pakai service role sehingga bypass RLS storage.
export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session.admin) {
      return NextResponse.json({ error: 'Tidak diizinkan. Silakan login ulang.' }, { status: 401 });
    }

    // Walau sudah login, batasi unggahan agar sesi yang bocor tidak bisa
    // dipakai membanjiri penyimpanan.
    const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'tanpa-ip';
    const rl = rateLimit(`upload:${ip}`, 60, 10 * 60 * 1000);
    if (!rl.ok) {
      return NextResponse.json({ error: tooMany(rl.retryAfter) }, { status: 429 });
    }
    if (!isServiceConfigured) {
      return NextResponse.json(
        { error: 'Supabase belum dikonfigurasi di server (SUPABASE_SERVICE_ROLE_KEY).' },
        { status: 400 }
      );
    }

    const form = await req.formData();
    const file = form.get('file');
    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'Berkas tidak ditemukan.' }, { status: 400 });
    }
    if (file.size <= 0) {
      return NextResponse.json({ error: 'Berkas kosong.' }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: 'Ukuran berkas maksimal 6 MB.' }, { status: 400 });
    }

    const type = (file.type || '').toLowerCase();
    const name = (file.name || 'file').toLowerCase();
    const ext = pickExt(name, type);
    // Tipe akhir yang dipakai = hasil daftar putih (dari MIME atau ekstensi).
    const resolvedType = ALLOWED_EXT[type] ? type : EXT_FALLBACK[ext] || type;
    const isImage = resolvedType.startsWith('image/');
    const isPdf = resolvedType === 'application/pdf';
    if (!isImage && !isPdf) {
      return NextResponse.json(
        { error: 'Hanya gambar (JPG, PNG, WebP, GIF, SVG) atau PDF.' },
        { status: 400 }
      );
    }

    const db = supabaseAdmin();

    // Pastikan bucket ada — kalau belum, buat otomatis (sekali saja).
    const { data: existing } = await db.storage.getBucket(BUCKET);
    if (!existing) {
      const { error: createErr } = await db.storage.createBucket(BUCKET, {
        public: true,
        fileSizeLimit: MAX_BYTES,
      });
      if (createErr && !/already exists/i.test(createErr.message)) {
        return NextResponse.json(
          { error: 'Gagal menyiapkan penyimpanan: ' + createErr.message },
          { status: 500 }
        );
      }
    }

    const path = `uploads/${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;
    const body = Buffer.from(await file.arrayBuffer());

    const { error: upErr } = await db.storage.from(BUCKET).upload(path, body, {
      contentType: resolvedType || 'application/octet-stream',
      upsert: false,
      cacheControl: '31536000',
    });
    if (upErr) {
      return NextResponse.json({ error: 'Gagal mengunggah: ' + upErr.message }, { status: 500 });
    }

    const { data: pub } = db.storage.from(BUCKET).getPublicUrl(path);
    return NextResponse.json({ url: pub.publicUrl });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'unknown';
    return NextResponse.json({ error: 'Terjadi kesalahan saat mengunggah: ' + msg }, { status: 500 });
  }
}
