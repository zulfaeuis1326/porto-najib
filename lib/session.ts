import { getIronSession, type IronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { timingSafeEqual } from 'crypto';

export interface AdminSessionData {
  admin?: { username: string; loginAt: number };
}

export const SESSION_COOKIE = 'porto_admin_session';

export function sessionOptions() {
  return {
    cookieName: SESSION_COOKIE,
    password: process.env.SESSION_SECRET || '',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: 'lax' as const,
      path: '/',
      maxAge: 7 * 24 * 3600, // 7 hari
    },
  };
}

export function isAuthConfigured() {
  return Boolean(
    process.env.SESSION_SECRET &&
      process.env.SESSION_SECRET.length >= 32 &&
      process.env.ADMIN_USERNAME &&
      process.env.ADMIN_PASSWORD
  );
}

export async function getSession(): Promise<IronSession<AdminSessionData>> {
  return getIronSession<AdminSessionData>(cookies(), sessionOptions());
}

// Pakai di awal setiap server action / halaman admin.
// Melempar {unauthorized:true} kalau belum login — tangkap di pemanggil.
export async function requireAdmin() {
  const session = await getSession();
  if (!session.admin) {
    const err = new Error('Unauthorized') as Error & { unauthorized?: boolean };
    err.unauthorized = true;
    throw err;
  }
  return session.admin;
}

function safeEqual(a: string, b: string) {
  const ba = Buffer.from(a, 'utf8');
  const bb = Buffer.from(b, 'utf8');
  if (ba.length !== bb.length) return false;
  return timingSafeEqual(ba, bb);
}

export function verifyAdminCredentials(username: string, password: string) {
  const u = process.env.ADMIN_USERNAME || '';
  const p = process.env.ADMIN_PASSWORD || '';
  if (!u || !p) return false;
  return safeEqual(username.trim(), u) && safeEqual(password, p);
}
