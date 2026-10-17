import { headers } from 'next/headers';

// Pembatas laju (rate limiter) sederhana berbasis memori.
//
// CATATAN PENTING: di Vercel, tiap instance serverless punya memori sendiri,
// jadi ini bukan penghalang mutlak — fungsinya memperlambat percobaan
// beruntun (brute force login, spam form, penyalahgunaan upload) secara
// signifikan tanpa menambah layanan pihak ketiga.
type Entry = { count: number; resetAt: number };

const buckets = new Map<string, Entry>();

// Batasi ukuran peta agar tidak tumbuh tanpa batas di server yang hidup lama.
const MAX_KEYS = 5000;

export interface RateResult {
  ok: boolean;
  retryAfter: number; // detik
}

/**
 * Hitung satu percobaan untuk `key`.
 * @param key        pengenal unik (mis. `login:1.2.3.4`)
 * @param limit      jumlah percobaan yang diizinkan dalam satu jendela
 * @param windowMs   panjang jendela dalam milidetik
 */
export function rateLimit(key: string, limit: number, windowMs: number): RateResult {
  const now = Date.now();

  if (buckets.size > MAX_KEYS) {
    buckets.forEach((v, k) => {
      if (v.resetAt <= now) buckets.delete(k);
    });
    // Masih penuh? Kosongkan agar memori tidak bocor.
    if (buckets.size > MAX_KEYS) buckets.clear();
  }

  const entry = buckets.get(key);
  if (!entry || entry.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfter: 0 };
  }

  entry.count += 1;
  if (entry.count > limit) {
    return { ok: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  }
  return { ok: true, retryAfter: 0 };
}

/** Alamat IP pemanggil (di belakang proxy Vercel/Cloudflare). */
export function clientIp(): string {
  const h = headers();
  const forwarded = h.get('x-forwarded-for') || '';
  const first = forwarded.split(',')[0]?.trim();
  return first || h.get('x-real-ip') || h.get('cf-connecting-ip') || 'tanpa-ip';
}

/** Pesan kesalahan standar saat limit tercapai. */
export function tooMany(retryAfter: number): string {
  const menit = Math.max(1, Math.ceil(retryAfter / 60));
  return `Terlalu banyak percobaan. Coba lagi dalam ${menit} menit.`;
}
