import ProfileForm from '@/components/admin/ProfileForm';
import DbNotice from '@/components/admin/DbNotice';
import PageHeader from '@/components/admin/PageHeader';
import { supabaseAdmin, isServiceConfigured } from '@/lib/supabase';

export const metadata = { title: 'Edit Profil', robots: { index: false, follow: false } };

export default async function AdminProfile() {
  if (!isServiceConfigured) return <DbNotice />;
  const { data } = await supabaseAdmin().from('profiles').select('*').eq('id', 'main').maybeSingle();
  const r = (data || {}) as Record<string, unknown>;
  const links = (r.links || {}) as Record<string, string>;

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        title="Profil"
        description="Nama, bio, foto, dan link yang tampil di situs publik."
      />
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
