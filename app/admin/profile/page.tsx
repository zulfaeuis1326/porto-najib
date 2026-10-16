import ProfileForm from '@/components/admin/ProfileForm';
import DbNotice from '@/components/admin/DbNotice';
import { supabaseAdmin, isServiceConfigured } from '@/lib/supabase';

export const metadata = { title: 'Edit Profil', robots: { index: false, follow: false } };

export default async function AdminProfile() {
  if (!isServiceConfigured) return <DbNotice />;
  const { data } = await supabaseAdmin().from('profiles').select('*').eq('id', 'main').single();
  const r = (data || {}) as Record<string, unknown>;
  const links = (r.links || {}) as Record<string, string>;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <p className="eyebrow">Admin Panel</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">Profil</h1>
        <p className="mt-1 text-slate-600 dark:text-slate-400">Nama, bio, foto, dan link yang tampil di situs.</p>
      </div>
      <ProfileForm
        initial={{
          name: String(r.name || ''),
          headline: String(r.headline || ''),
          bio: String(r.bio || ''),
          photo_url: String(r.photo_url || ''),
          cv_url: String(r.cv_url || ''),
          location: String(r.location || ''),
          email: String(r.email || ''),
          links,
        }}
      />
    </div>
  );
}
