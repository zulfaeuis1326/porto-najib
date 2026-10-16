import Link from 'next/link';
import { Plus, Pencil } from 'lucide-react';
import { supabaseAdmin, isServiceConfigured } from '@/lib/supabase';
import DeleteButton from '@/components/admin/DeleteButton';
import DbNotice from '@/components/admin/DbNotice';
import PageHeader from '@/components/admin/PageHeader';
import SeedButton from '@/components/admin/SeedButton';
import { deleteExperience } from '@/lib/admin-actions';
import { btnPrimary, btnGhost, chip } from '@/components/admin/ui';

export const metadata = { title: 'Kelola Pengalaman', robots: { index: false, follow: false } };

interface Row {
  id: string;
  type: string;
  title: string;
  organization: string;
  start_date: string;
  end_date: string;
  current: boolean;
}

function period(start: string, end: string, current: boolean) {
  const from = start ? String(start).slice(0, 7) : '';
  if (current) return `${from} — sekarang`;
  const to = end ? String(end).slice(0, 7) : '';
  return from || to ? `${from} — ${to}` : '';
}

export default async function AdminExperiences() {
  if (!isServiceConfigured) return <DbNotice />;
  const { data } = await supabaseAdmin()
    .from('experiences')
    .select('id, type, title, organization, start_date, end_date, current')
    .order('sort_order')
    .order('start_date', { ascending: false });
  const items = (data || []) as Row[];

  return (
    <div>
      <PageHeader
        title="Pengalaman"
        description={`${items.length} riwayat kerja & pendidikan`}
        actions={
          <Link href="/admin/experiences/new" className={btnPrimary}>
            <Plus className="h-4 w-4" /> Tambah Pengalaman
          </Link>
        }
      />

      <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
        {items.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-sm text-stone-500">Belum ada pengalaman di database.</p>
            <p className="mt-1 text-xs text-stone-400">
              Tambah satu per satu, atau impor riwayat contoh sekaligus.
            </p>
            <SeedButton kind="experiences" />
          </div>
        ) : (
          <ul className="divide-y divide-stone-100">
            {items.map((e) => (
              <li key={e.id} className="flex items-center gap-4 px-4 py-3.5 sm:px-5">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-semibold text-stone-800">{e.title}</p>
                    <span className={chip}>{e.type === 'education' ? 'Pendidikan' : 'Kerja'}</span>
                  </div>
                  <p className="truncate text-xs text-stone-500">
                    {e.organization || 'Tanpa institusi'} · {period(e.start_date, e.end_date, e.current)}
                  </p>
                </div>
                <Link href={`/admin/experiences/${e.id}`} className={btnGhost}>
                  <Pencil className="h-3.5 w-3.5" /> Edit
                </Link>
                <DeleteButton label={e.title} onDelete={deleteExperience.bind(null, e.id)} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
