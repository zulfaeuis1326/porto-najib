'use client';

import { useFormState, useFormStatus } from 'react-dom';
import Link from 'next/link';
import type { Project } from '@/types';
import { saveProject } from '@/lib/admin-actions';
import MediaField from '@/components/admin/MediaField';
import MediaGalleryField from '@/components/admin/MediaGalleryField';
import { input, label, btnPrimary, btnOutline } from '@/components/admin/ui';

function SubmitButton({ isEdit }: { isEdit: boolean }) {
  const { pending } = useFormStatus();
  return (
    <div className="flex gap-3 border-t border-stone-100 pt-5">
      <button type="submit" disabled={pending} className={btnPrimary}>
        {pending ? 'Menyimpan…' : isEdit ? 'Simpan Perubahan' : 'Tambah Proyek'}
      </button>
      <Link href="/admin/projects" className={btnOutline}>
        Batal
      </Link>
    </div>
  );
}

export default function ProjectForm({ project }: { project?: Project | null }) {
  const [state, action] = useFormState(saveProject, null);
  const p = project || null;

  return (
    <form action={action} className="space-y-5 rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
      {p && <input type="hidden" name="id" value={p.id} />}

      <MediaField
        name="cover_url"
        label="Gambar Cover"
        defaultValue={p?.coverUrl || ''}
        kind="image"
        hint="JPG, PNG, WebP, atau SVG · maks 6 MB"
      />

      <MediaGalleryField
        name="images"
        label="Galeri (opsional)"
        defaultValue={p?.images || []}
        hint="Urutan gambar mengikuti urutan di sini."
      />

      <div className="grid grid-cols-1 gap-5 border-t border-stone-100 pt-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={label} htmlFor="pf-title">Judul *</label>
          <input id="pf-title" name="title" required defaultValue={p?.title || ''} placeholder="cth. E-Commerce Dashboard" className={input} />
        </div>
        <div>
          <label className={label} htmlFor="pf-slug">Slug (otomatis dari judul bila kosong)</label>
          <input id="pf-slug" name="slug" defaultValue={p?.slug || ''} placeholder="cth. ecommerce-dashboard" className={input} />
        </div>
        <div>
          <label className={label} htmlFor="pf-sort">Urutan tampil</label>
          <input id="pf-sort" name="sort_order" type="number" defaultValue={p?.sortOrder ?? 0} className={input} />
        </div>
        <div className="sm:col-span-2">
          <label className={label} htmlFor="pf-summary">Ringkasan *</label>
          <textarea id="pf-summary" name="summary" required rows={2} defaultValue={p?.summary || ''} className={input} />
        </div>
        <div className="sm:col-span-2">
          <label className={label} htmlFor="pf-desc">Deskripsi (markdown)</label>
          <textarea id="pf-desc" name="description" rows={8} defaultValue={p?.description || ''} className={`${input} font-mono text-[13px]`} />
        </div>
        <div className="sm:col-span-2">
          <label className={label} htmlFor="pf-tech">Tech stack (pisahkan koma)</label>
          <input id="pf-tech" name="tech_stack" defaultValue={(p?.techStack || []).join(', ')} placeholder="Next.js, TypeScript, Supabase" className={input} />
        </div>
        <div>
          <label className={label} htmlFor="pf-demo">URL Demo</label>
          <input id="pf-demo" name="demo_url" defaultValue={p?.demoUrl || ''} className={input} />
        </div>
        <div>
          <label className={label} htmlFor="pf-repo">URL Repo</label>
          <input id="pf-repo" name="repo_url" defaultValue={p?.repoUrl || ''} className={input} />
        </div>
        <div>
          <label className={label} htmlFor="pf-created">Tanggal</label>
          <input id="pf-created" name="created_at" type="date" defaultValue={(p?.createdAt || '').slice(0, 10)} className={input} />
        </div>
        <label className="flex cursor-pointer items-center gap-3 sm:col-span-2">
          <input type="checkbox" name="featured" defaultChecked={p?.featured} className="h-5 w-5 rounded accent-orange-600" />
          <span className="text-sm font-semibold text-stone-700">Tampilkan sebagai Proyek Unggulan</span>
        </label>
      </div>

      {state?.error && (
        <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {state.error}
        </div>
      )}

      <SubmitButton isEdit={Boolean(p)} />
    </form>
  );
}
