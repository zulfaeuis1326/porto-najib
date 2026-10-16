import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// Bersihkan nilai environment: buang spasi dan tanda kutip yang sering ikut
// tersalin saat menempel dari dashboard.
function cleanEnv(v: string | undefined): string {
  let s = (v || '').trim();
  if (!s) return '';
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    s = s.slice(1, -1).trim();
  }
  return s;
}

// PENTING: sebagian orang menempel "REST endpoint" (…/rest/v1) dari dashboard
// Supabase ke NEXT_PUBLIC_SUPABASE_URL. Akibatnya supabase-js menggandakan path
// (…/rest/v1/rest/v1/…) dan SEMUA request gagal dengan
// PGRST125 "Invalid path specified in request URL" → data tidak terbaca dan
// form gagal menyimpan. Di sini URL dinormalisasi agar tetap benar.
export function normalizeSupabaseUrl(raw: string | undefined): string {
  let s = cleanEnv(raw);
  if (!s) return '';
  if (!/^https?:\/\//i.test(s)) s = 'https://' + s;
  // buang path layanan Supabase (rest / storage / auth / realtime / functions)
  s = s.replace(/\/(rest|storage|auth|realtime|functions)\/v1\/?$/i, '');
  // buang garis miring di akhir
  s = s.replace(/\/+$/, '');
  return s;
}

export const supabaseUrl = normalizeSupabaseUrl(process.env.NEXT_PUBLIC_SUPABASE_URL);
export const supabaseAnonKey = cleanEnv(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
export const supabaseServiceKey = cleanEnv(process.env.SUPABASE_SERVICE_ROLE_KEY);

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);
export const isServiceConfigured = Boolean(supabaseUrl && supabaseServiceKey);

// Client publik (anon key): hanya bisa SELECT konten + INSERT pesan,
// sesuai policy RLS. Aman dipakai di server component publik.
let publicClient: SupabaseClient | null = null;
export function supabasePublic(): SupabaseClient {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase belum dikonfigurasi (NEXT_PUBLIC_SUPABASE_URL / ANON_KEY).');
  }
  if (!publicClient) {
    publicClient = createClient(supabaseUrl, supabaseAnonKey, { auth: { persistSession: false } });
  }
  return publicClient;
}

// Client admin (service role): bypass RLS. HANYA di server (actions / admin pages).
// Jangan pernah import ini di client component.
let adminClient: SupabaseClient | null = null;
export function supabaseAdmin(): SupabaseClient {
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY belum dikonfigurasi.');
  }
  if (!adminClient) {
    adminClient = createClient(supabaseUrl, supabaseServiceKey, { auth: { persistSession: false } });
  }
  return adminClient;
}

// ---------- DIAGNOSTIK ----------
// Membaca "role" dari isi kunci Supabase agar mudah tahu apakah
// SUPABASE_SERVICE_ROLE_KEY benar-benar kunci service_role.
export function keyRole(key: string): string {
  if (!key) return '(kosong)';
  if (key.startsWith('sb_publishable_')) return 'anon';
  if (key.startsWith('sb_secret_')) return 'service_role';
  const parts = key.split('.');
  if (parts.length === 3) {
    try {
      const b64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
      const json = Buffer.from(b64, 'base64').toString('utf8');
      const payload = JSON.parse(json) as { role?: string };
      if (payload.role) return payload.role;
      return '(tanpa role)';
    } catch {
      return '(tidak terbaca)';
    }
  }
  return '(format tidak dikenal)';
}

export function supabaseDiagnostics() {
  const serviceRole = keyRole(supabaseServiceKey);
  return {
    url: supabaseUrl,
    urlLooksValid: /^https:\/\/[a-z0-9-]+\.supabase\.(co|in)$/i.test(supabaseUrl),
    hasAnon: Boolean(supabaseAnonKey),
    hasService: Boolean(supabaseServiceKey),
    anonRole: keyRole(supabaseAnonKey),
    serviceRole,
    // Penyebab paling umum error "permission denied for table ..."
    serviceKeyWrong:
      Boolean(supabaseServiceKey) &&
      (supabaseServiceKey === supabaseAnonKey || serviceRole === 'anon'),
  };
}
