import { supabasePublic, isSupabaseConfigured } from './supabase';
import type { Project, Article, Profile, Skill, Experience } from '@/types';
// Fallback lokal: dipakai saat Supabase belum dikonfigurasi (dev/build tanpa env),
// sehingga situs tetap tampil penuh dan build tidak pernah gagal karena DB.
import { projectsData } from '@/data/projects';
import { articlesData } from '@/data/articles';
import { profileData } from '@/data/profile';
import { skillsData } from '@/data/skills';
import { experiencesData } from '@/data/experiences';

type ProjectRow = Record<string, unknown>;
type ArticleRow = Record<string, unknown>;

const str = (v: unknown, fb = '') => (typeof v === 'string' ? v : fb);
const arr = (v: unknown): string[] => (Array.isArray(v) ? v.filter((x) => typeof x === 'string') : []);
const num = (v: unknown, fb = 0) => (typeof v === 'number' ? v : fb);
const bool = (v: unknown) => v === true;

function mapProject(r: ProjectRow): Project {
  return {
    id: str(r.id),
    title: str(r.title),
    slug: str(r.slug),
    summary: str(r.summary),
    description: str(r.description),
    coverUrl: str(r.cover_url),
    images: arr(r.images),
    techStack: arr(r.tech_stack),
    demoUrl: str(r.demo_url) || undefined,
    repoUrl: str(r.repo_url) || undefined,
    featured: bool(r.featured),
    sortOrder: num(r.sort_order),
    createdAt: str(r.created_at),
  };
}

function mapArticle(r: ArticleRow): Article {
  return {
    id: str(r.id),
    title: str(r.title),
    slug: str(r.slug),
    excerpt: str(r.excerpt),
    content: str(r.content),
    coverUrl: str(r.cover_url),
    category: str(r.category),
    tags: arr(r.tags),
    readTime: num(r.read_time),
    publishedAt: str(r.published_at),
  };
}

async function safeQuery<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  if (!isSupabaseConfigured) return fallback;
  try {
    return await fn();
  } catch {
    return fallback;
  }
}

export async function getProjects(): Promise<Project[]> {
  return safeQuery(async () => {
    const { data, error } = await supabasePublic()
      .from('projects')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false });
    if (error || !data) throw error || new Error('empty');
    return (data as ProjectRow[]).map(mapProject);
  }, projectsData);
}

export async function getFeaturedProjects(limit = 3): Promise<Project[]> {
  const all = await getProjects();
  return all.filter((p) => p.featured).slice(0, limit);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const all = await getProjects();
  return all.find((p) => p.slug === slug) || null;
}

export async function getProjectSlugs(): Promise<string[]> {
  const all = await getProjects();
  return all.map((p) => p.slug);
}

export async function getArticles(): Promise<Article[]> {
  return safeQuery(async () => {
    const { data, error } = await supabasePublic()
      .from('articles')
      .select('*')
      .order('published_at', { ascending: false });
    if (error || !data) throw error || new Error('empty');
    return (data as ArticleRow[]).map(mapArticle);
  }, articlesData);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const all = await getArticles();
  return all.find((a) => a.slug === slug) || null;
}

export async function getArticleSlugs(): Promise<string[]> {
  const all = await getArticles();
  return all.map((a) => a.slug);
}

export async function getProfile(): Promise<Profile> {
  return safeQuery(async () => {
    const { data, error } = await supabasePublic()
      .from('profiles')
      .select('*')
      .eq('id', 'main')
      .single();
    if (error || !data) throw error || new Error('empty');
    const r = data as Record<string, unknown>;
    const links = (r.links || {}) as Record<string, string>;
    return {
      name: str(r.name),
      headline: str(r.headline),
      bio: str(r.bio),
      photoUrl: str(r.photo_url),
      cvUrl: str(r.cv_url),
      location: str(r.location),
      email: str(r.email),
      links: {
        github: links.github,
        linkedin: links.linkedin,
        twitter: links.twitter,
        instagram: links.instagram,
      },
    };
  }, profileData);
}

export async function getSkills(): Promise<Skill[]> {
  return safeQuery(async () => {
    const { data, error } = await supabasePublic()
      .from('skills')
      .select('*')
      .order('sort_order', { ascending: true });
    if (error || !data) throw error || new Error('empty');
    return (data as Record<string, unknown>[]).map((r) => ({
      id: str(r.id),
      name: str(r.name),
      category: (['frontend', 'backend', 'tools', 'other'] as const).includes(r.category as never)
        ? (r.category as Skill['category'])
        : 'other',
      level: (['beginner', 'intermediate', 'advanced', 'expert'] as const).includes(r.level as never)
        ? (r.level as Skill['level'])
        : 'beginner',
      icon: str(r.icon) || undefined,
    }));
  }, skillsData);
}

export async function getSkillsByCategory() {
  const skills = await getSkills();
  return {
    frontend: skills.filter((s) => s.category === 'frontend'),
    backend: skills.filter((s) => s.category === 'backend'),
    tools: skills.filter((s) => s.category === 'tools'),
    other: skills.filter((s) => s.category === 'other'),
  };
}

export async function getExperiences(): Promise<Experience[]> {
  return safeQuery(async () => {
    const { data, error } = await supabasePublic()
      .from('experiences')
      .select('*')
      .order('sort_order', { ascending: true });
    if (error || !data) throw error || new Error('empty');
    return (data as Record<string, unknown>[]).map((r) => ({
      id: str(r.id),
      type: r.type === 'education' ? 'education' : 'work',
      title: str(r.title),
      organization: str(r.organization),
      startDate: str(r.start_date),
      endDate: str(r.end_date) || undefined,
      description: str(r.description),
      current: bool(r.current),
    }));
  }, experiencesData);
}

export async function getExperiencesByType() {
  const all = await getExperiences();
  return {
    work: all.filter((e) => e.type === 'work'),
    education: all.filter((e) => e.type === 'education'),
  };
}

// Angka nyata untuk beranda (bukan statistik hardcode).
export async function getStats() {
  const [projects, articles, skills] = await Promise.all([getProjects(), getArticles(), getSkills()]);
  return {
    projects: projects.length,
    articles: articles.length,
    skills: skills.length,
  };
}
