import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Reveal from '../ui/Reveal';
import SafeImage from '../ui/SafeImage';
import SectionHeader from '../ui/SectionHeader';
import { getFeaturedProjects } from '@/lib/content';

export default async function FeaturedProjects() {
  const featuredProjects = (await getFeaturedProjects()).slice(0, 3);

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Reveal>
        <SectionHeader
          eyebrow="Portofolio"
          title="Proyek Unggulan"
          description="Beberapa proyek yang telah saya kerjakan dengan hasil yang memuaskan"
        />
        </Reveal>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProjects.map((project, i) => (
            <Reveal key={project.id} delay={(i % 3) * 100}>
            <Link href={`/projects/${project.slug}`}>
              <Card hover className="group h-full">
                <div className="relative h-48 rounded-t-lg overflow-hidden img-zoom">
                  <SafeImage
                    src={project.coverUrl}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-2">
                    {project.summary}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.slice(0, 3).map((tech) => (
                      <Badge key={tech}>{tech}</Badge>
                    ))}
                    {project.techStack.length > 3 && (
                      <Badge>+{project.techStack.length - 3}</Badge>
                    )}
                  </div>
                </div>
              </Card>
            </Link>
            </Reveal>
          ))}
        </div>

        {/* View All Button */}
        <Reveal>
        <div className="text-center">
          <Button href="/projects" variant="outline" size="lg">
            Lihat Semua Proyek
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
        </Reveal>
      </div>
    </section>
  );
}
