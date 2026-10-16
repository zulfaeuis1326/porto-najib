import Link from 'next/link';
import { Plus, Pencil } from 'lucide-react';
import { supabaseAdmin, isServiceConfigured } from '@/lib/supabase';
import DeleteButton from '@/components/admin/DeleteButton';
import DbNotice from '@/components/admin/DbNotice';
import PageHeader from '@/components/admin/PageHeader';
import SafeImage from '@/components/ui/SafeImage';
import { deleteArticle } from '@/lib/admin-actions';
import { btnPrimary, btnGhost } from '@/components/admin/ui';

export const metadata = { title: 'Kelola Artikel', robots: { index: false, follow: false } };

interface Row {
  id: string;
  title: string;
  slug: string;
  category: string;
  cover_url: string;
  published_at: string;
}

export default async function AdminArticles() {
  if (!isServiceConfigured) return <DbNotice />;
  const { data } = await supabaseAdmin()
    .from('articles')
    .select('id, title, slug, category, cover_url, published_at')
    .order('published_at', { ascending: false });
  const articles = (data || []) as Row[];

  return (
    <div>
      <PageHeader
        title="Artikel"
        description={`${articles.length} artikel terbit`}
        actions={
          <Link href="/admin/articles/new" className={btnPrimary}>
            <Plus className="h-4 w-4" /> Tulis Artikel
          </Link>
        }
      />

      <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
        {articles.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-sm text-stone-500">Belum ada artikel.</p>
            <Link href="/admin/articles/new" className={`${btnPrimary} mt-4`}>
              <Plus className="h-4 w-4" /> Tulis artikel pertama
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-stone-100">
            {articles.map((a) => (
              <li key={a.id} className="flex items-center gap-4 px-4 py-3.5 sm:px-5">
                <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border border-stone-200 bg-stone-50">
                  <SafeImage src={a.cover_url} alt={a.title} fill className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-stone-800">{a.title}</p>
                  <p className="truncate text-xs text-stone-500">
                    {a.category || 'Tanpa kategori'} · {String(a.published_at).slice(0, 10)}
                  </p>
                </div>
                <Link href={`/admin/articles/${a.id}`} className={btnGhost}>
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
