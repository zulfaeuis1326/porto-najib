'use client';

import { useFormState, useFormStatus } from 'react-dom';
import Link from 'next/link';
import type { Article } from '@/types';
import { saveArticle } from '@/lib/admin-actions';

function SubmitButton({ isEdit }: { isEdit: boolean }) {
  const { pending } = useFormStatus();
  return (
    <div className="flex gap-3 pt-2">
      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-orange-600 px-6 py-2.5 font-semibold text-white transition-colors hover:bg-orange-700 disabled:opacity-60 dark:bg-orange-500 dark:text-stone-950 dark:hover:bg-orange-400"
      >
        {pending ? 'Menyimpan...' : isEdit ? 'Simpan Perubahan' : 'Tambah Artikel'}
      </button>
      <Link
        href="/admin/articles"
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

export default function ArticleForm({ article }: { article?: Article | null }) {
  const [state, action] = useFormState(saveArticle, null);
  const a = article || null;

  return (
    <form action={action} className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800 sm:p-8">
      {a && <input type="hidden" name="id" value={a.id} />}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={labelCls} htmlFor="ar-title">Judul *</label>
          <input id="ar-title" name="title" required defaultValue={a?.title || ''} className={inputCls} />
        </div>
        <div>
          <label className={labelCls} htmlFor="ar-slug">Slug (otomatis dari judul bila kosong)</label>
          <input id="ar-slug" name="slug" defaultValue={a?.slug || ''} className={inputCls} />
        </div>
        <div>
          <label className={labelCls} htmlFor="ar-cat">Kategori</label>
          <input id="ar-cat" name="category" defaultValue={a?.category || ''} placeholder="cth. Tutorial" className={inputCls} />
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls} htmlFor="ar-excerpt">Ringkasan *</label>
          <textarea id="ar-excerpt" name="excerpt" required rows={2} defaultValue={a?.excerpt || ''} className={inputCls} />
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls} htmlFor="ar-content">Isi (markdown)</label>
          <textarea id="ar-content" name="content" rows={12} defaultValue={a?.content || ''} className={`${inputCls} font-mono text-sm`} />
        </div>
        <div>
          <label className={labelCls} htmlFor="ar-cover">URL Cover</label>
          <input id="ar-cover" name="cover_url" defaultValue={a?.coverUrl || ''} placeholder="/images/article-x.svg" className={inputCls} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls} htmlFor="ar-read">Menit baca</label>
            <input id="ar-read" name="read_time" type="number" min={1} defaultValue={a?.readTime ?? 5} className={inputCls} />
          </div>
          <div>
            <label className={labelCls} htmlFor="ar-pub">Tanggal</label>
            <input id="ar-pub" name="published_at" type="date" defaultValue={(a?.publishedAt || '').slice(0, 10)} className={inputCls} />
          </div>
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls} htmlFor="ar-tags">Tag (pisahkan koma)</label>
          <input id="ar-tags" name="tags" defaultValue={(a?.tags || []).join(', ')} placeholder="Next.js, Tutorial" className={inputCls} />
        </div>
      </div>

      {state?.error && (
        <div role="alert" className="rounded-lg bg-red-100 p-4 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-400">
          {state.error}
        </div>
      )}

      <SubmitButton isEdit={Boolean(a)} />
    </form>
  );
}
