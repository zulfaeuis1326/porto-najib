'use client';

import { useFormState, useFormStatus } from 'react-dom';
import Link from 'next/link';
import { saveSkill } from '@/lib/admin-actions';
import { input, label, btnPrimary, btnOutline } from '@/components/admin/ui';

export interface SkillInput {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'tools' | 'other';
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  icon?: string;
  sortOrder: number;
}

function SubmitButton({ isEdit }: { isEdit: boolean }) {
  const { pending } = useFormStatus();
  return (
    <div className="flex gap-3 border-t border-stone-100 pt-5">
      <button type="submit" disabled={pending} className={btnPrimary}>
        {pending ? 'Menyimpan…' : isEdit ? 'Simpan Perubahan' : 'Tambah Skill'}
      </button>
      <Link href="/admin/skills" className={btnOutline}>
        Batal
      </Link>
    </div>
  );
}

export default function SkillForm({ skill }: { skill?: SkillInput | null }) {
  const [state, action] = useFormState(saveSkill, null);
  const s = skill || null;

  return (
    <form action={action} className="space-y-5 rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
      {s && <input type="hidden" name="id" value={s.id} />}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={label} htmlFor="sk-name">Nama skill *</label>
          <input
            id="sk-name"
            name="name"
            required
            defaultValue={s?.name || ''}
            placeholder="cth. Next.js"
            className={input}
          />
        </div>

        <div>
          <label className={label} htmlFor="sk-category">Kategori</label>
          <select id="sk-category" name="category" defaultValue={s?.category || 'frontend'} className={input}>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="tools">Tools &amp; Platform</option>
            <option value="other">Lainnya</option>
          </select>
        </div>

        <div>
          <label className={label} htmlFor="sk-level">Level</label>
          <select id="sk-level" name="level" defaultValue={s?.level || 'intermediate'} className={input}>
            <option value="beginner">Pemula</option>
            <option value="intermediate">Menengah</option>
            <option value="advanced">Mahir</option>
            <option value="expert">Expert</option>
          </select>
        </div>

        <div>
          <label className={label} htmlFor="sk-icon">Ikon (emoji, opsional)</label>
          <input id="sk-icon" name="icon" defaultValue={s?.icon || ''} placeholder="cth. ⚛️" className={input} />
        </div>

        <div>
          <label className={label} htmlFor="sk-sort">Urutan tampil</label>
          <input id="sk-sort" name="sort_order" type="number" defaultValue={s?.sortOrder ?? 0} className={input} />
        </div>
      </div>

      {state?.error && (
        <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {state.error}
        </div>
      )}

      <SubmitButton isEdit={Boolean(s)} />
    </form>
  );
}
