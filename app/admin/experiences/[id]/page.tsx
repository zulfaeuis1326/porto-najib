import { notFound } from 'next/navigation';
import ExperienceForm, { type ExperienceInput } from '@/components/admin/ExperienceForm';
import DbNotice from '@/components/admin/DbNotice';
import PageHeader from '@/components/admin/PageHeader';
import { supabaseAdmin, isServiceConfigured } from '@/lib/supabase';

export const metadata = { title: 'Edit Pengalaman', robots: { index: false, follow: false } };

export default async function EditExperience({ params }: { params: { id: string } }) {
  if (!isServiceConfigured) return <DbNotice />;
  const { data } = await supabaseAdmin().from('experiences').select('*').eq('id', params.id).maybeSingle();
  if (!data) notFound();

  const r = data as Record<string, unknown>;
  const experience: ExperienceInput = {
    id: String(r.id),
    type: r.type === 'education' ? 'education' : 'work',
    title: String(r.title || ''),
    organization: String(r.organization || ''),
    startDate: String(r.start_date || ''),
    endDate: String(r.end_date || ''),
    description: String(r.description || ''),
    current: r.current === true,
    sortOrder: Number(r.sort_order || 0),
  };

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader title="Edit Pengalaman" description={experience.title} />
      <ExperienceForm experience={experience} />
    </div>
  );
}
