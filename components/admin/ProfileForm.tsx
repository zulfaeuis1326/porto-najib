'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { saveProfile } from '@/lib/admin-actions';
import MediaField from '@/components/admin/MediaField';
import { input, label, btnPrimary } from '@/components/admin/ui';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <div className="border-t border-stone-100 pt-5">
      <button type="submit" disabled={pending} className={btnPrimary}>
        {pending ? 'Menyimpan…' : 'Simpan Profil'}
      </button>
    </div>
  );
}

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
    <form action={action} className="space-y-5 rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <MediaField
            name="photo_url"
            label="Foto Profil"
            defaultValue={initial.photo_url}
            kind="image"
            hint="Foto persegi disarankan · maks 6 MB"
          />
        </div>
        <div className="sm:col-span-2">
          <MediaField
            name="cv_url"
            label="Berkas CV (PDF)"
            defaultValue={initial.cv_url}
            kind="file"
            accept="application/pdf"
            hint="Hanya PDF · maks 6 MB"
          />
        </div>

        <div className="border-t border-stone-100 pt-5">
          <label className={label} htmlFor="pr-name">Nama *</label>
          <input id="pr-name" name="name" required defaultValue={initial.name} className={input} />
        </div>
        <div className="border-t border-stone-100 pt-5">
          <label className={label} htmlFor="pr-headline">Headline</label>
          <input id="pr-headline" name="headline" defaultValue={initial.headline} className={input} />
        </div>
        <div className="sm:col-span-2">
          <label className={label} htmlFor="pr-bio">Bio</label>
          <textarea id="pr-bio" name="bio" rows={4} defaultValue={initial.bio} className={input} />
        </div>
        <div>
          <label className={label} htmlFor="pr-loc">Lokasi</label>
          <input id="pr-loc" name="location" defaultValue={initial.location} className={input} />
        </div>
        <div>
          <label className={label} htmlFor="pr-email">Email</label>
          <input id="pr-email" name="email" type="email" defaultValue={initial.email} className={input} />
        </div>
        {(['github', 'linkedin', 'twitter', 'instagram'] as const).map((k) => (
          <div key={k}>
            <label className={label} htmlFor={`pr-${k}`}>Link {k[0].toUpperCase() + k.slice(1)}</label>
            <input id={`pr-${k}`} name={`link_${k}`} defaultValue={initial.links[k] || ''} placeholder="https://..." className={input} />
          </div>
        ))}
      </div>

      {state?.error && (
        <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {state.error}
        </div>
      )}
      {state?.ok && (
        <div role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
          Profil tersimpan. Perubahan tampil di situs publik.
        </div>
      )}

      <SubmitButton />
    </form>
  );
}
