import ProjectForm from '@/components/admin/ProjectForm';

export const metadata = { title: 'Tambah Proyek', robots: { index: false, follow: false } };

export default function NewProject() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <p className="eyebrow">Admin Panel</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">Tambah Proyek</h1>
      </div>
      <ProjectForm />
    </div>
  );
}
