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

// Tautan "halaman" Google Drive tidak pernah tampil sebagai gambar.
// Ubah otomatis ke tautan gambar langsungnya.
function normalizeImageUrl(s: string): string {
  const drive = s.match(
    /drive\.google\.com\/(?:file\/d\/([^/?#]+)|(?:open|uc)\?(?:[^#]*&)?id=([^&#]+))/i
  );
  if (drive) {
    const id = drive[1] || drive[2];
    if (id) return `https://lh3.googleusercontent.com/d/${id}`;
  }
  return s;
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
  return normalizeImageUrl(s);
}

// Galeri dikirim sebagai banyak nilai (satu URL per input), jadi JANGAN
// dipecah dengan koma — banyak URL gambar mengandung koma.
function cleanImageList(formData: FormData, name: string): string[] {
  return formData
    .getAll(name)
    .map((v) => cleanUrl(v))
    .filter(Boolean);
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

// ---------- SKILL ----------
const SKILL_CATEGORIES = ['frontend', 'backend', 'tools', 'other'];
const SKILL_LEVELS = ['beginner', 'intermediate', 'advanced', 'expert'];

export async function saveSkill(prev: { error?: string } | null, formData: FormData) {
  await authed();
  const id = String(formData.get('id') || '');
  const name = String(formData.get('name') || '').trim();
  if (!name) return { error: 'Nama skill wajib diisi.' };
  const category = String(formData.get('category') || 'other');
  const level = String(formData.get('level') || 'beginner');

  const row = {
    name,
    category: SKILL_CATEGORIES.includes(category) ? category : 'other',
    level: SKILL_LEVELS.includes(level) ? level : 'beginner',
    icon: String(formData.get('icon') || '').trim(),
    sort_order: Number(formData.get('sort_order') || 0) || 0,
  };

  const db = supabaseAdmin();
  const { error } = id
    ? await db.from('skills').update(row).eq('id', id)
    : await db.from('skills').insert(row);
  if (error) return { error: 'Gagal menyimpan: ' + error.message };
  revalidateContent();
  redirect('/admin/skills');
}

export async function deleteSkill(id: string) {
  await authed();
  const { error } = await supabaseAdmin().from('skills').delete().eq('id', id);
  if (error) return { error: error.message };
  revalidateContent();
  return { ok: true };
}

// Masukkan daftar skill contoh (data/skills.ts) ke database.
export async function importDefaultSkills() {
  await authed();
  const { skillsData } = await import('@/data/skills');
  const rows = skillsData.map((s, i) => ({
    name: s.name,
    category: s.category,
    level: s.level,
    icon: s.icon || '',
    sort_order: i,
  }));
  const { error } = await supabaseAdmin().from('skills').insert(rows);
  if (error) return { error: 'Gagal mengimpor: ' + error.message };
  revalidateContent();
  return { ok: true };
}

// ---------- PENGALAMAN ----------
export async function saveExperience(prev: { error?: string } | null, formData: FormData) {
  await authed();
  const id = String(formData.get('id') || '');
  const title = String(formData.get('title') || '').trim();
  if (!title) return { error: 'Judul wajib diisi.' };
  const type = String(formData.get('type') || 'work');
  const current = formData.get('current') === 'on';

  const row = {
    type: type === 'education' ? 'education' : 'work',
    title,
    organization: String(formData.get('organization') || '').trim(),
    start_date: String(formData.get('start_date') || '') || null,
    end_date: current ? null : String(formData.get('end_date') || '') || null,
    description: String(formData.get('description') || '').trim(),
    current,
    sort_order: Number(formData.get('sort_order') || 0) || 0,
  };

  const db = supabaseAdmin();
  const { error } = id
    ? await db.from('experiences').update(row).eq('id', id)
    : await db.from('experiences').insert(row);
  if (error) return { error: 'Gagal menyimpan: ' + error.message };
  revalidateContent();
  redirect('/admin/experiences');
}

export async function deleteExperience(id: string) {
  await authed();
  const { error } = await supabaseAdmin().from('experiences').delete().eq('id', id);
  if (error) return { error: error.message };
  revalidateContent();
  return { ok: true };
}

// Masukkan daftar pengalaman contoh (data/experiences.ts) ke database.
export async function importDefaultExperiences() {
  await authed();
  const { experiencesData } = await import('@/data/experiences');
  const rows = experiencesData.map((e, i) => ({
    type: e.type,
    title: e.title,
    organization: e.organization,
    start_date: e.startDate || null,
    end_date: e.current ? null : e.endDate || null,
    description: e.description,
    current: e.current,
    sort_order: i,
  }));
  const { error } = await supabaseAdmin().from('experiences').insert(rows);
  if (error) return { error: 'Gagal mengimpor: ' + error.message };
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
    const { supabaseUrl, supabaseAnonKey } = await import('./supabase');
    const db = createClient(supabaseUrl || '', supabaseAnonKey || '', {
      auth: { persistSession: false },
    });
    const { error } = await db.from('messages').insert({ name, email, message });
    if (error) throw error;
    return { ok: true };
  } catch {
    return { error: 'Gagal mengirim pesan. Coba lagi nanti.' };
  }
}
