import { notFound } from 'next/navigation';
import SkillForm, { type SkillInput } from '@/components/admin/SkillForm';
import DbNotice from '@/components/admin/DbNotice';
import PageHeader from '@/components/admin/PageHeader';
import { supabaseAdmin, isServiceConfigured } from '@/lib/supabase';

export const metadata = { title: 'Edit Skill', robots: { index: false, follow: false } };

const CATEGORIES = ['frontend', 'backend', 'tools', 'other'];
const LEVELS = ['beginner', 'intermediate', 'advanced', 'expert'];

export default async function EditSkill({ params }: { params: { id: string } }) {
  if (!isServiceConfigured) return <DbNotice />;
  const { data } = await supabaseAdmin().from('skills').select('*').eq('id', params.id).maybeSingle();
  if (!data) notFound();

  const r = data as Record<string, unknown>;
  const category = String(r.category || 'other');
  const level = String(r.level || 'beginner');

  const skill: SkillInput = {
    id: String(r.id),
    name: String(r.name || ''),
    category: (CATEGORIES.includes(category) ? category : 'other') as SkillInput['category'],
    level: (LEVELS.includes(level) ? level : 'beginner') as SkillInput['level'],
    icon: String(r.icon || ''),
    sortOrder: Number(r.sort_order || 0),
  };

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader title="Edit Skill" description={skill.name} />
      <SkillForm skill={skill} />
    </div>
  );
}
