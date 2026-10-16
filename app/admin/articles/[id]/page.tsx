import { notFound } from 'next/navigation';
import ArticleForm from '@/components/admin/ArticleForm';
import DbNotice from '@/components/admin/DbNotice';
import { supabaseAdmin, isServiceConfigured } from '@/lib/supabase';
import type { Article } from '@/types';

export const metadata = { title: 'Edit Artikel', robots: { index: false, follow: false } };

export default async function EditArticle({ params }: { params: { id: string } }) {
  if (!isServiceConfigured) return <DbNotice />;
  const { data } = await supabaseAdmin().from('articles').select('*').eq('id', params.id).single();
  if (!data) notFound();
  const r = data as Record<string, unknown>;
  const article: Article = {
    id: String(r.id),
    title: String(r.title || ''),
    slug: String(r.slug || ''),
    excerpt: String(r.excerpt || ''),
    content: String(r.content || ''),
    coverUrl: String(r.cover_url || ''),
    category: String(r.category || ''),
    tags: Array.isArray(r.tags) ? (r.tags as string[]) : [],
    readTime: Number(r.read_time || 5),
    publishedAt: String(r.published_at || '').slice(0, 10),
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <p className="eyebrow">Admin Panel</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">Edit Artikel</h1>
      </div>
      <ArticleForm article={article} />
    </div>
  );
}
