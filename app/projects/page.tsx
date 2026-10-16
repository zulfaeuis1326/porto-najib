import type { Metadata } from 'next';
import Reveal from '@/components/ui/Reveal';
import ProjectExplorer from '@/components/sections/ProjectExplorer';
import { getProjects } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Proyek Saya - Najib',
  description: 'Daftar proyek yang telah dikerjakan: aplikasi web, dashboard, dan lainnya.',
};

// Selalu ambil dari CMS.
export const dynamic = 'force-dynamic';

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Reveal>
        <div className="text-center mb-12">
          <span className="eyebrow justify-center mb-3">Portofolio</span>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">Proyek Saya</h1>
          <p className="text-xl text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
            Berikut adalah beberapa proyek yang telah saya kerjakan,
            dari aplikasi web hingga dashboard management.
          </p>
        </div>
        </Reveal>

        <ProjectExplorer projects={projects} />
      </div>
    </div>
  );
}
