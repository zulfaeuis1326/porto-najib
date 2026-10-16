import Link from 'next/link';
import { Plus, Pencil } from 'lucide-react';
import { supabaseAdmin, isServiceConfigured } from '@/lib/supabase';
import DeleteButton from '@/components/admin/DeleteButton';
import DbNotice from '@/components/admin/DbNotice';
import PageHeader from '@/components/admin/PageHeader';
import SeedButton from '@/components/admin/SeedButton';
import { deleteSkill } from '@/lib/admin-actions';
import { btnPrimary, btnGhost } from '@/components/admin/ui';

export const metadata = { title: 'Kelola Skill', robots: { index: false, follow: false } };

const categoryLabel: Record<string, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  tools: 'Tools & Platform',
  other: 'Lainnya',
};

const levelLabel: Record<string, string> = {
  beginner: 'Pemula',
  intermediate: 'Menengah',
  advanced: 'Mahir',
  expert: 'Expert',
};

interface Row {
  id: string;
  name: string;
  icon: string;
  category: string;
  level: string;
  sort_order: number;
}

export default async function AdminSkills() {
  if (!isServiceConfigured) return <DbNotice />;
  const { data } = await supabaseAdmin()
    .from('skills')
    .select('id, name, icon, category, level, sort_order')
    .order('sort_order')
    .order('name');
  const skills = (data || []) as Row[];

  return (
    <div>
      <PageHeader
        title="Skill"
        description={`${skills.length} skill tampil di halaman publik`}
        actions={
          <Link href="/admin/skills/new" className={btnPrimary}>
            <Plus className="h-4 w-4" /> Tambah Skill
          </Link>
        }
      />

      <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
        {skills.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-sm text-stone-500">Belum ada skill di database.</p>
            <p className="mt-1 text-xs text-stone-400">
              Tambah satu per satu, atau impor daftar contoh sekaligus.
            </p>
            <SeedButton kind="skills" />
          </div>
        ) : (
          <ul className="divide-y divide-stone-100">
            {skills.map((s) => (
              <li key={s.id} className="flex items-center gap-4 px-4 py-3.5 sm:px-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-stone-100 text-xl">
                  {s.icon || '•'}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-stone-800">{s.name}</p>
                  <p className="truncate text-xs text-stone-500">
                    {categoryLabel[s.category] || s.category} · {levelLabel[s.level] || s.level} ·
                    urutan {s.sort_order}
                  </p>
                </div>
                <Link href={`/admin/skills/${s.id}`} className={btnGhost}>
                  <Pencil className="h-3.5 w-3.5" /> Edit
                </Link>
                <DeleteButton label={s.name} onDelete={deleteSkill.bind(null, s.id)} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
