'use server';

import { redirect } from 'next/navigation';
import { getSession, verifyAdminCredentials, isAuthConfigured } from './session';
import { rateLimit, clientIp, tooMany } from './rate-limit';

export interface ActionResult {
  error?: string;
  ok?: boolean;
}

// Batas percobaan login per IP: 8 kali per 10 menit.
// Melindungi dari brute force tanpa mengunci admin yang salah ketik sedikit.
const LOGIN_LIMIT = 8;
const LOGIN_WINDOW_MS = 10 * 60 * 1000;

export async function loginAction(_prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  if (!isAuthConfigured()) {
    return { error: 'Login admin belum dikonfigurasi. Isi ADMIN_USERNAME, ADMIN_PASSWORD, dan SESSION_SECRET di environment.' };
  }

  const rl = rateLimit(`login:${clientIp()}`, LOGIN_LIMIT, LOGIN_WINDOW_MS);
  if (!rl.ok) return { error: tooMany(rl.retryAfter) };

  const username = String(formData.get('username') || '');
  const password = String(formData.get('password') || '');
  if (!username || !password) {
    return { error: 'Username dan password wajib diisi.' };
  }
  if (!verifyAdminCredentials(username, password)) {
    // Pesan generik: jangan bocorkan mana yang salah.
    return { error: 'Username atau password salah.' };
  }
  const session = await getSession();
  session.admin = { username: username.trim(), loginAt: Date.now() };
  await session.save();
  redirect('/admin');
}

export async function logoutAction() {
  const session = await getSession();
  session.destroy();
  redirect('/');
}
