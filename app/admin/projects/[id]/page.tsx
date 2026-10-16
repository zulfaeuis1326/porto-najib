import { notFound } from 'next/navigation';
import ProjectForm from '@/components/admin/ProjectForm';
import DbNotice from '@/components/admin/DbNotice';
import { supabaseAdmin, isServiceConfigured } from '@/lib/supabase';
import type { Project } from '@/types';

export const metadata = { title: 'Edit Proyek', robots: { index: false, follow: false } };

export default async function EditProject({ params }: { params: { id: string } }) {
  if (!isServiceConfigured) return <DbNotice />;
  const { data } = await supabaseAdmin().from('projects').select('*').eq('id', params.id).single();
  if (!data) notFound();
  const r = data as Record<string, unknown>;
  const project: Project = {
    id: String(r.id),
    title: String(r.title || ''),
    slug: String(r.slug || ''),
    summary: String(r.summary || ''),
    description: String(r.description || ''),
    coverUrl: String(r.cover_url || ''),
    images: Array.isArray(r.images) ? (r.images as string[]) : [],
    techStack: Array.isArray(r.tech_stack) ? (r.tech_stack as string[]) : [],
    demoUrl: String(r.demo_url || ''),
    repoUrl: String(r.repo_url || ''),
    featured: r.featured === true,
    sortOrder: Number(r.sort_order || 0),
    createdAt: String(r.created_at || '').slice(0, 10),
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <p className="eyebrow">Admin Panel</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">Edit Proyek</h1>
      </div>
      <ProjectForm project={project} />
    </div>
  );
}
