import SkillForm from '@/components/admin/SkillForm';
import PageHeader from '@/components/admin/PageHeader';

export const metadata = { title: 'Tambah Skill', robots: { index: false, follow: false } };

export default function NewSkill() {
  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader title="Tambah Skill" description="Isi nama, kategori, dan level skill lalu simpan." />
      <SkillForm />
    </div>
  );
}
