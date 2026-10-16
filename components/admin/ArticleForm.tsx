'use client';

import { useFormState, useFormStatus } from 'react-dom';
import Link from 'next/link';
import type { Article } from '@/types';
import { saveArticle } from '@/lib/admin-actions';
import MediaField from '@/components/admin/MediaField';
import { input, label, btnPrimary, btnOutline } from '@/components/admin/ui';

function SubmitButton({ isEdit }: { isEdit: boolean }) {
  const { pending } = useFormStatus();
  return (
    <div className="flex gap-3 border-t border-stone-100 pt-5">
      <button type="submit" disabled={pending} className={btnPrimary}>
        {pending ? 'Menyimpan…' : isEdit ? 'Simpan Perubahan' : 'Tulis Artikel'}
      </button>
      <Link href="/admin/articles" className={btnOutline}>
        Batal
      </Link>
    </div>
  );
}

export default function ArticleForm({ article }: { article?: Article | null }) {
  const [state, action] = useFormState(saveArticle, null);
  const a = article || null;

  return (
    <form action={action} className="space-y-5 rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
      {a && <input type="hidden" name="id" value={a.id} />}

      <MediaField
        name="cover_url"
        label="Gambar Cover"
        defaultValue={a?.coverUrl || ''}
        kind="image"
        hint="JPG, PNG, WebP, atau SVG · maks 6 MB"
      />

      <div className="grid grid-cols-1 gap-5 border-t border-stone-100 pt-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={label} htmlFor="ar-title">Judul *</label>
          <input id="ar-title" name="title" required defaultValue={a?.title || ''} className={input} />
        </div>
        <div>
          <label className={label} htmlFor="ar-slug">Slug (otomatis dari judul bila kosong)</label>
          <input id="ar-slug" name="slug" defaultValue={a?.slug || ''} className={input} />
        </div>
        <div>
          <label className={label} htmlFor="ar-cat">Kategori</label>
          <input id="ar-cat" name="category" defaultValue={a?.category || ''} placeholder="cth. Tutorial" className={input} />
        </div>
        <div className="sm:col-span-2">
          <label className={label} htmlFor="ar-excerpt">Ringkasan *</label>
          <textarea id="ar-excerpt" name="excerpt" required rows={2} defaultValue={a?.excerpt || ''} className={input} />
        </div>
        <div className="sm:col-span-2">
          <label className={label} htmlFor="ar-content">Isi (markdown)</label>
          <textarea id="ar-content" name="content" rows={12} defaultValue={a?.content || ''} className={`${input} font-mono text-[13px]`} />
        </div>
        <div className="grid grid-cols-2 gap-4 sm:col-span-2">
          <div>
            <label className={label} htmlFor="ar-read">Menit baca</label>
            <input id="ar-read" name="read_time" type="number" min={1} defaultValue={a?.readTime ?? 5} className={input} />
          </div>
          <div>
            <label className={label} htmlFor="ar-pub">Tanggal</label>
            <input id="ar-pub" name="published_at" type="date" defaultValue={(a?.publishedAt || '').slice(0, 10)} className={input} />
          </div>
        </div>
        <div className="sm:col-span-2">
          <label className={label} htmlFor="ar-tags">Tag (pisahkan koma)</label>
          <input id="ar-tags" name="tags" defaultValue={(a?.tags || []).join(', ')} placeholder="Next.js, Tutorial" className={input} />
        </div>
      </div>

      {state?.error && (
        <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {state.error}
        </div>
      )}

      <SubmitButton isEdit={Boolean(a)} />
    </form>
  );
}
