'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { saveProfile } from '@/lib/admin-actions';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg bg-orange-600 px-6 py-2.5 font-semibold text-white transition-colors hover:bg-orange-700 disabled:opacity-60 dark:bg-orange-500 dark:text-stone-950 dark:hover:bg-orange-400"
    >
      {pending ? 'Menyimpan...' : 'Simpan Profil'}
    </button>
  );
}

const inputCls =
  'w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 transition-all focus:border-transparent focus:ring-2 focus:ring-orange-500 dark:border-slate-600 dark:bg-slate-800';
const labelCls = 'mb-1.5 block text-sm font-semibold';

interface ProfileFormProps {
  initial: {
    name: string;
    headline: string;
    bio: string;
    photo_url: string;
    cv_url: string;
    location: string;
    email: string;
    links: Record<string, string>;
  };
}

export default function ProfileForm({ initial }: ProfileFormProps) {
  const [state, action] = useFormState(saveProfile, null);

  return (
    <form action={action} className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800 sm:p-8">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className={labelCls} htmlFor="pr-name">Nama *</label>
          <input id="pr-name" name="name" required defaultValue={initial.name} className={inputCls} />
        </div>
        <div>
          <label className={labelCls} htmlFor="pr-headline">Headline</label>
          <input id="pr-headline" name="headline" defaultValue={initial.headline} className={inputCls} />
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls} htmlFor="pr-bio">Bio</label>
          <textarea id="pr-bio" name="bio" rows={4} defaultValue={initial.bio} className={inputCls} />
        </div>
        <div>
          <label className={labelCls} htmlFor="pr-photo">URL Foto</label>
          <input id="pr-photo" name="photo_url" defaultValue={initial.photo_url} className={inputCls} />
        </div>
        <div>
          <label className={labelCls} htmlFor="pr-cv">URL CV</label>
          <input id="pr-cv" name="cv_url" defaultValue={initial.cv_url} className={inputCls} />
        </div>
        <div>
          <label className={labelCls} htmlFor="pr-loc">Lokasi</label>
          <input id="pr-loc" name="location" defaultValue={initial.location} className={inputCls} />
        </div>
        <div>
          <label className={labelCls} htmlFor="pr-email">Email</label>
          <input id="pr-email" name="email" type="email" defaultValue={initial.email} className={inputCls} />
        </div>
        {(['github', 'linkedin', 'twitter', 'instagram'] as const).map((k) => (
          <div key={k}>
            <label className={labelCls} htmlFor={`pr-${k}`}>Link {k[0].toUpperCase() + k.slice(1)}</label>
            <input id={`pr-${k}`} name={`link_${k}`} defaultValue={initial.links[k] || ''} placeholder="https://..." className={inputCls} />
          </div>
        ))}
      </div>

      {state?.error && (
        <div role="alert" className="rounded-lg bg-red-100 p-4 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-400">
          {state.error}
        </div>
      )}
      {state?.ok && (
        <div role="status" className="rounded-lg bg-green-100 p-4 text-sm text-green-700 dark:bg-green-900/30 dark:text-green-400">
          Profil tersimpan. Perubahan tampil di situs publik.
        </div>
      )}

      <SubmitButton />
    </form>
  );
}
