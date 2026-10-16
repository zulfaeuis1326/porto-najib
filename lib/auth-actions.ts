'use server';

import { redirect } from 'next/navigation';
import { getSession, verifyAdminCredentials, isAuthConfigured } from './session';

export interface ActionResult {
  error?: string;
  ok?: boolean;
}

export async function loginAction(_prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  if (!isAuthConfigured()) {
    return { error: 'Login admin belum dikonfigurasi. Isi ADMIN_USERNAME, ADMIN_PASSWORD, dan SESSION_SECRET di environment.' };
  }
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
