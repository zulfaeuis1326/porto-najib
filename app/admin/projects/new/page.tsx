import ProjectForm from '@/components/admin/ProjectForm';
import PageHeader from '@/components/admin/PageHeader';

export const metadata = { title: 'Tambah Proyek', robots: { index: false, follow: false } };

export default function NewProject() {
  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader title="Tambah Proyek" description="Isi detail proyek, unggah gambar, lalu simpan." />
      <ProjectForm />
    </div>
  );
}
