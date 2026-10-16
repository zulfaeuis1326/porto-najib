import Link from 'next/link';
import { Plus, Pencil } from 'lucide-react';
import { supabaseAdmin, isServiceConfigured } from '@/lib/supabase';
import DeleteButton from '@/components/admin/DeleteButton';
import DbNotice from '@/components/admin/DbNotice';
import { deleteArticle } from '@/lib/admin-actions';

export const metadata = { title: 'Kelola Artikel', robots: { index: false, follow: false } };

export default async function AdminArticles() {
  if (!isServiceConfigured) return <DbNotice />;
  const db = supabaseAdmin();
  const { data } = await db.from('articles').select('*').order('published_at', { ascending: false });
  const articles = (data || []) as Array<{ id: string; title: string; slug: string; category: string; published_at: string }>;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="eyebrow">Admin Panel</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">Artikel ({articles.length})</h1>
        </div>
        <Link
          href="/admin/articles/new"
          className="inline-flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-700 dark:bg-orange-500 dark:text-stone-950 dark:hover:bg-orange-400"
        >
          <Plus className="h-4 w-4" /> Tulis Artikel
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
        {articles.length === 0 ? (
          <p className="p-8 text-center text-sm text-slate-500">Belum ada artikel. Tulis yang pertama.</p>
        ) : (
          <ul className="divide-y divide-slate-100 dark:divide-slate-700">
            {articles.map((a) => (
              <li key={a.id} className="flex items-center gap-3 px-5 py-4">
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">{a.title}</p>
                  <p className="truncate text-xs text-slate-500">
                    {a.category || 'Tanpa kategori'} · {String(a.published_at).slice(0, 10)}
                  </p>
                </div>
                <Link
                  href={`/admin/articles/${a.id}`}
                  className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
                >
                  <Pencil className="h-3.5 w-3.5" /> Edit
                </Link>
                <DeleteButton label={a.title} onDelete={deleteArticle.bind(null, a.id)} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
