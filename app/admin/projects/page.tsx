import Link from 'next/link';
import { Plus, Pencil, Star } from 'lucide-react';
import { supabaseAdmin, isServiceConfigured } from '@/lib/supabase';
import DeleteButton from '@/components/admin/DeleteButton';
import DbNotice from '@/components/admin/DbNotice';
import PageHeader from '@/components/admin/PageHeader';
import SafeImage from '@/components/ui/SafeImage';
import { deleteProject } from '@/lib/admin-actions';
import { btnPrimary, btnGhost, chip } from '@/components/admin/ui';

export const metadata = { title: 'Kelola Proyek', robots: { index: false, follow: false } };

interface Row {
  id: string;
  title: string;
  slug: string;
  cover_url: string;
  featured: boolean;
  created_at: string;
}

export default async function AdminProjects() {
  if (!isServiceConfigured) return <DbNotice />;
  const { data } = await supabaseAdmin()
    .from('projects')
    .select('id, title, slug, cover_url, featured, created_at')
    .order('sort_order')
    .order('created_at', { ascending: false });
  const projects = (data || []) as Row[];

  return (
    <div>
      <PageHeader
        title="Proyek"
        description={`${projects.length} proyek · ${projects.filter((p) => p.featured).length} unggulan`}
        actions={
          <Link href="/admin/projects/new" className={btnPrimary}>
            <Plus className="h-4 w-4" /> Tambah Proyek
          </Link>
        }
      />

      <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
        {projects.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-sm text-stone-500">Belum ada proyek.</p>
            <Link href="/admin/projects/new" className={`${btnPrimary} mt-4`}>
              <Plus className="h-4 w-4" /> Tambah proyek pertama
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-stone-100">
            {projects.map((p) => (
              <li key={p.id} className="flex items-center gap-4 px-4 py-3.5 sm:px-5">
                <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border border-stone-200 bg-stone-50">
                  <SafeImage src={p.cover_url} alt={p.title} fill className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-semibold text-stone-800">{p.title}</p>
                    {p.featured && (
                      <span className={chip}>
                        <Star className="h-3 w-3" /> Unggulan
                      </span>
                    )}
                  </div>
                  <p className="truncate text-xs text-stone-500">
                    /{p.slug} · {String(p.created_at).slice(0, 10)}
                  </p>
                </div>
                <Link href={`/admin/projects/${p.id}`} className={btnGhost}>
                  <Pencil className="h-3.5 w-3.5" /> Edit
                </Link>
                <DeleteButton label={p.title} onDelete={deleteProject.bind(null, p.id)} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
