'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { supabaseAdmin } from './supabase';
import { requireAdmin } from './session';

// Kumpulkan nilai dari satu/lebih field (textarea baris, input koma, hidden ganda).
function toList(formData: FormData, name: string): string[] {
  const raw = formData
    .getAll(name)
    .flatMap((v) => String(v || '').split(/[\n,]+/))
    .map((s) => s.trim())
    .filter(Boolean);
  return Array.from(new Set(raw));
}

// Bersihkan URL: buang spasi, tanda kutip, dan path lokal Windows yang
// tidak bisa dirender di browser (sumber error "path url" di CMS).
function cleanUrl(v: FormDataEntryValue | null): string {
  let s = String(v || '').trim();
  if (!s) return '';
  if ((s.startsWith('`') && s.endsWith('`')) || (s.startsWith('"') && s.endsWith('"'))) {
    s = s.slice(1, -1).trim();
  }
  if (/^[a-zA-Z]:\\/.test(s) || s.includes('\\')) return '';
  return s;
}

function cleanImageList(formData: FormData, name: string): string[] {
  return toList(formData, name).map((u) => cleanUrl(u)).filter(Boolean);
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-');
}

function authed() {
  return requireAdmin().catch(() => redirect('/login'));
}

// Segarkan seluruh pohon rute publik setelah konten berubah.
function revalidateContent() {
  revalidatePath('/', 'layout');
}

// ---------- PROYEK ----------
export async function saveProject(prev: { error?: string } | null, formData: FormData) {
  await authed();
  const id = String(formData.get('id') || '');
  const title = String(formData.get('title') || '').trim();
  const slug = slugify(String(formData.get('slug') || '').trim() || title);
  if (!title || !slug) return { error: 'Judul dan slug wajib diisi.' };

  const row = {
    slug,
    title,
    summary: String(formData.get('summary') || '').trim(),
    description: String(formData.get('description') || '').trim(),
    cover_url: cleanUrl(formData.get('cover_url')),
    images: cleanImageList(formData, 'images'),
    tech_stack: toList(formData, 'tech_stack'),
    demo_url: cleanUrl(formData.get('demo_url')),
    repo_url: cleanUrl(formData.get('repo_url')),
    featured: formData.get('featured') === 'on',
    sort_order: Number(formData.get('sort_order') || 0) || 0,
    created_at: String(formData.get('created_at') || '') || new Date().toISOString().slice(0, 10),
  };

  const db = supabaseAdmin();
  const { error } = id
    ? await db.from('projects').update(row).eq('id', id)
    : await db.from('projects').insert(row);
  if (error) return { error: 'Gagal menyimpan: ' + error.message };
  revalidateContent();
  redirect('/admin/projects');
}

export async function deleteProject(id: string) {
  await authed();
  const { error } = await supabaseAdmin().from('projects').delete().eq('id', id);
  if (error) return { error: error.message };
  revalidateContent();
  return { ok: true };
}

// ---------- ARTIKEL ----------
export async function saveArticle(prev: { error?: string } | null, formData: FormData) {
  await authed();
  const id = String(formData.get('id') || '');
  const title = String(formData.get('title') || '').trim();
  const slug = slugify(String(formData.get('slug') || '').trim() || title);
  if (!title || !slug) return { error: 'Judul dan slug wajib diisi.' };

  const row = {
    slug,
    title,
    excerpt: String(formData.get('excerpt') || '').trim(),
    content: String(formData.get('content') || '').trim(),
    cover_url: cleanUrl(formData.get('cover_url')),
    category: String(formData.get('category') || '').trim(),
    tags: toList(formData, 'tags'),
    read_time: Number(formData.get('read_time') || 5) || 5,
    published_at: String(formData.get('published_at') || '') || new Date().toISOString().slice(0, 10),
  };

  const db = supabaseAdmin();
  const { error } = id
    ? await db.from('articles').update(row).eq('id', id)
    : await db.from('articles').insert(row);
  if (error) return { error: 'Gagal menyimpan: ' + error.message };
  revalidateContent();
  redirect('/admin/articles');
}

export async function deleteArticle(id: string) {
  await authed();
  const { error } = await supabaseAdmin().from('articles').delete().eq('id', id);
  if (error) return { error: error.message };
  revalidateContent();
  return { ok: true };
}

// ---------- PROFIL ----------
export async function saveProfile(prev: { error?: string } | null, formData: FormData) {
  await authed();
  const row = {
    id: 'main',
    name: String(formData.get('name') || '').trim(),
    headline: String(formData.get('headline') || '').trim(),
    bio: String(formData.get('bio') || '').trim(),
    photo_url: cleanUrl(formData.get('photo_url')),
    cv_url: cleanUrl(formData.get('cv_url')),
    location: String(formData.get('location') || '').trim(),
    email: String(formData.get('email') || '').trim(),
    links: {
      github: String(formData.get('link_github') || '').trim() || undefined,
      linkedin: String(formData.get('link_linkedin') || '').trim() || undefined,
      twitter: String(formData.get('link_twitter') || '').trim() || undefined,
      instagram: String(formData.get('link_instagram') || '').trim() || undefined,
    },
  };
  if (!row.name) return { error: 'Nama wajib diisi.' };
  const { error } = await supabaseAdmin().from('profiles').upsert(row);
  if (error) return { error: 'Gagal menyimpan: ' + error.message };
  revalidateContent();
  return { ok: true };
}

// ---------- PESAN MASUK ----------
export async function setMessageRead(id: string, read: boolean) {
  await authed();
  await supabaseAdmin().from('messages').update({ is_read: read }).eq('id', id);
  revalidatePath('/admin');
  revalidatePath('/admin/inbox');
}

export async function deleteMessage(id: string) {
  await authed();
  await supabaseAdmin().from('messages').delete().eq('id', id);
  revalidatePath('/admin');
  revalidatePath('/admin/inbox');
}

// ---------- FORM KONTAK PUBLIK (tanpa login) ----------
export async function submitMessage(prev: { error?: string; ok?: boolean } | null, formData: FormData) {
  const name = String(formData.get('name') || '').trim().slice(0, 100);
  const email = String(formData.get('email') || '').trim().slice(0, 150);
  const message = String(formData.get('message') || '').trim().slice(0, 5000);
  if (!name || !email || !message) return { error: 'Nama, email, dan pesan wajib diisi.' };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: 'Format email tidak valid.' };

  try {
    const { createClient } = await import('@supabase/supabase-js');
    const db = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
      { auth: { persistSession: false } }
    );
    const { error } = await db.from('messages').insert({ name, email, message });
    if (error) throw error;
    return { ok: true };
  } catch {
    return { error: 'Gagal mengirim pesan. Coba lagi nanti.' };
  }
}
