'use client';

import { useFormState, useFormStatus } from 'react-dom';
import Link from 'next/link';
import type { Project } from '@/types';
import { saveProject } from '@/lib/admin-actions';

function SubmitButton({ isEdit }: { isEdit: boolean }) {
  const { pending } = useFormStatus();
  return (
    <div className="flex gap-3 pt-2">
      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-orange-600 px-6 py-2.5 font-semibold text-white transition-colors hover:bg-orange-700 disabled:opacity-60 dark:bg-orange-500 dark:text-stone-950 dark:hover:bg-orange-400"
      >
        {pending ? 'Menyimpan...' : isEdit ? 'Simpan Perubahan' : 'Tambah Proyek'}
      </button>
      <Link
        href="/admin/projects"
        className="rounded-lg border border-slate-300 px-6 py-2.5 font-semibold transition-colors hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-700"
      >
        Batal
      </Link>
    </div>
  );
}

const inputCls =
  'w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 transition-all focus:border-transparent focus:ring-2 focus:ring-orange-500 dark:border-slate-600 dark:bg-slate-800';
const labelCls = 'mb-1.5 block text-sm font-semibold';

export default function ProjectForm({ project }: { project?: Project | null }) {
  const [state, action] = useFormState(saveProject, null);
  const p = project || null;

  return (
    <form action={action} className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800 sm:p-8">
      {p && <input type="hidden" name="id" value={p.id} />}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={labelCls} htmlFor="pf-title">Judul *</label>
          <input id="pf-title" name="title" required defaultValue={p?.title || ''} placeholder="cth. E-Commerce Dashboard" className={inputCls} />
        </div>
        <div>
          <label className={labelCls} htmlFor="pf-slug">Slug (otomatis dari judul bila kosong)</label>
          <input id="pf-slug" name="slug" defaultValue={p?.slug || ''} placeholder="cth. ecommerce-dashboard" className={inputCls} />
        </div>
        <div>
          <label className={labelCls} htmlFor="pf-sort">Urutan tampil</label>
          <input id="pf-sort" name="sort_order" type="number" defaultValue={p?.sortOrder ?? 0} className={inputCls} />
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls} htmlFor="pf-summary">Ringkasan *</label>
          <textarea id="pf-summary" name="summary" required rows={2} defaultValue={p?.summary || ''} className={inputCls} />
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls} htmlFor="pf-desc">Deskripsi (markdown)</label>
          <textarea id="pf-desc" name="description" rows={8} defaultValue={p?.description || ''} className={`${inputCls} font-mono text-sm`} />
        </div>
        <div>
          <label className={labelCls} htmlFor="pf-cover">URL Cover</label>
          <input id="pf-cover" name="cover_url" defaultValue={p?.coverUrl || ''} placeholder="/images/project-x.svg" className={inputCls} />
        </div>
        <div>
          <label className={labelCls} htmlFor="pf-created">Tanggal</label>
          <input id="pf-created" name="created_at" type="date" defaultValue={(p?.createdAt || '').slice(0, 10)} className={inputCls} />
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls} htmlFor="pf-images">Galeri (satu URL per baris)</label>
          <textarea id="pf-images" name="images" rows={3} defaultValue={(p?.images || []).join('\n')} className={`${inputCls} font-mono text-sm`} />
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls} htmlFor="pf-tech">Tech stack (pisahkan koma)</label>
          <input id="pf-tech" name="tech_stack" defaultValue={(p?.techStack || []).join(', ')} placeholder="Next.js, TypeScript, Supabase" className={inputCls} />
        </div>
        <div>
          <label className={labelCls} htmlFor="pf-demo">URL Demo</label>
          <input id="pf-demo" name="demo_url" defaultValue={p?.demoUrl || ''} className={inputCls} />
        </div>
        <div>
          <label className={labelCls} htmlFor="pf-repo">URL Repo</label>
          <input id="pf-repo" name="repo_url" defaultValue={p?.repoUrl || ''} className={inputCls} />
        </div>
        <label className="flex cursor-pointer items-center gap-3 sm:col-span-2">
          <input type="checkbox" name="featured" defaultChecked={p?.featured} className="h-5 w-5 accent-orange-600" />
          <span className="text-sm font-semibold">Tampilkan sebagai Proyek Unggulan</span>
        </label>
      </div>

      {state?.error && (
        <div role="alert" className="rounded-lg bg-red-100 p-4 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-400">
          {state.error}
        </div>
      )}

      <SubmitButton isEdit={Boolean(p)} />
    </form>
  );
}
