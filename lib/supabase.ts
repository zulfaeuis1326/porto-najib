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
