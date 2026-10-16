import { NextResponse } from 'next/server';
import { supabaseAdmin, isServiceConfigured } from '@/lib/supabase';
import { getSession } from '@/lib/session';

export const runtime = 'nodejs';

const BUCKET = 'media';
const MAX_BYTES = 6 * 1024 * 1024; // 6 MB

function pickExt(name: string, type: string): string {
  const m = /\.([a-z0-9]+)$/i.exec(name);
  if (m) return '.' + m[1].toLowerCase();
  if (type === 'image/jpeg') return '.jpg';
  if (type === 'image/png') return '.png';
  if (type === 'image/webp') return '.webp';
  if (type === 'image/gif') return '.gif';
  if (type === 'image/svg+xml') return '.svg';
  if (type === 'application/pdf') return '.pdf';
  return '';
}

// Unggah berkas dari perangkat admin ke Supabase Storage (bucket "media").
// Hanya admin yang login; pakai service role sehingga bypass RLS storage.
export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session.admin) {
      return NextResponse.json({ error: 'Tidak diizinkan. Silakan login ulang.' }, { status: 401 });
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
    const isImage = type.startsWith('image/');
    const isPdf = type === 'application/pdf' || name.endsWith('.pdf');
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

    const path = `uploads/${Date.now()}-${Math.random().toString(36).slice(2, 8)}${pickExt(name, type)}`;
    const body = Buffer.from(await file.arrayBuffer());

    const { error: upErr } = await db.storage.from(BUCKET).upload(path, body, {
      contentType: type || 'application/octet-stream',
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
