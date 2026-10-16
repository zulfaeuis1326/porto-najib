'use client';

import { useFormState, useFormStatus } from 'react-dom';
import Link from 'next/link';
import { saveExperience } from '@/lib/admin-actions';
import { input, label, btnPrimary, btnOutline } from '@/components/admin/ui';

export interface ExperienceInput {
  id: string;
  type: 'work' | 'education';
  title: string;
  organization: string;
  startDate: string;
  endDate?: string;
  description: string;
  current: boolean;
  sortOrder: number;
}

function SubmitButton({ isEdit }: { isEdit: boolean }) {
  const { pending } = useFormStatus();
  return (
    <div className="flex gap-3 border-t border-stone-100 pt-5">
      <button type="submit" disabled={pending} className={btnPrimary}>
        {pending ? 'Menyimpan…' : isEdit ? 'Simpan Perubahan' : 'Tambah Pengalaman'}
      </button>
      <Link href="/admin/experiences" className={btnOutline}>
        Batal
      </Link>
    </div>
  );
}

export default function ExperienceForm({ experience }: { experience?: ExperienceInput | null }) {
  const [state, action] = useFormState(saveExperience, null);
  const e = experience || null;

  return (
    <form action={action} className="space-y-5 rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
      {e && <input type="hidden" name="id" value={e.id} />}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="ex-type">Jenis</label>
          <select id="ex-type" name="type" defaultValue={e?.type || 'work'} className={input}>
            <option value="work">Pengalaman Kerja</option>
            <option value="education">Pendidikan</option>
          </select>
        </div>

        <div>
          <label className={label} htmlFor="ex-sort">Urutan tampil</label>
          <input id="ex-sort" name="sort_order" type="number" defaultValue={e?.sortOrder ?? 0} className={input} />
        </div>

        <div className="sm:col-span-2">
          <label className={label} htmlFor="ex-title">Posisi / Gelar *</label>
          <input
            id="ex-title"
            name="title"
            required
            defaultValue={e?.title || ''}
            placeholder="cth. Frontend Developer"
            className={input}
          />
        </div>

        <div className="sm:col-span-2">
          <label className={label} htmlFor="ex-org">Perusahaan / Institusi</label>
          <input
            id="ex-org"
            name="organization"
            defaultValue={e?.organization || ''}
            placeholder="cth. PT Digital Startup Indonesia"
            className={input}
          />
        </div>

        <div>
          <label className={label} htmlFor="ex-start">Mulai</label>
          <input id="ex-start" name="start_date" type="date" defaultValue={(e?.startDate || '').slice(0, 10)} className={input} />
        </div>

        <div>
          <label className={label} htmlFor="ex-end">Selesai</label>
          <input
            id="ex-end"
            name="end_date"
            type="date"
            defaultValue={(e?.endDate || '').slice(0, 10)}
            disabled={e?.current}
            className={input}
          />
        </div>

        <label className="flex cursor-pointer items-center gap-3 sm:col-span-2">
          <input type="checkbox" name="current" defaultChecked={e?.current} className="h-5 w-5 rounded accent-orange-600" />
          <span className="text-sm font-semibold text-stone-700">Masih berlangsung (sampai sekarang)</span>
        </label>

        <div className="sm:col-span-2">
          <label className={label} htmlFor="ex-desc">Deskripsi</label>
          <textarea id="ex-desc" name="description" rows={5} defaultValue={e?.description || ''} className={input} />
        </div>
      </div>

      {state?.error && (
        <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {state.error}
        </div>
      )}

      <SubmitButton isEdit={Boolean(e)} />
    </form>
  );
}
