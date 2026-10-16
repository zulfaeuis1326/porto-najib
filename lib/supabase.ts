import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

export const isSupabaseConfigured = Boolean(url && anonKey);
export const isServiceConfigured = Boolean(url && serviceKey);

// Client publik (anon key): hanya bisa SELECT konten + INSERT pesan,
// sesuai policy RLS. Aman dipakai di server component publik.
let publicClient: SupabaseClient | null = null;
export function supabasePublic(): SupabaseClient {
  if (!url || !anonKey) throw new Error('Supabase belum dikonfigurasi (NEXT_PUBLIC_SUPABASE_URL / ANON_KEY).');
  if (!publicClient) {
    publicClient = createClient(url, anonKey, { auth: { persistSession: false } });
  }
  return publicClient;
}

// Client admin (service role): bypass RLS. HANYA di server (actions / admin pages).
// Jangan pernah import ini di client component.
let adminClient: SupabaseClient | null = null;
export function supabaseAdmin(): SupabaseClient {
  if (!url || !serviceKey) throw new Error('SUPABASE_SERVICE_ROLE_KEY belum dikonfigurasi.');
  if (!adminClient) {
    adminClient = createClient(url, serviceKey, { auth: { persistSession: false } });
  }
  return adminClient;
}
