import ExperienceForm from '@/components/admin/ExperienceForm';
import PageHeader from '@/components/admin/PageHeader';

export const metadata = { title: 'Tambah Pengalaman', robots: { index: false, follow: false } };

export default function NewExperience() {
  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        title="Tambah Pengalaman"
        description="Riwayat kerja atau pendidikan yang tampil di halaman publik."
      />
      <ExperienceForm />
    </div>
  );
}
