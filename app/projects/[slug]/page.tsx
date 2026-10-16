import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink, Github, Calendar } from 'lucide-react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import { getProjects, getProjectBySlug } from '@/lib/content';
import { formatDate } from '@/lib/utils';

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

// Generate metadata
export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  
  if (!project) {
    return {
      title: 'Project Not Found'
    };
  }

  return {
    title: `${project.title} - Najib`,
    description: project.summary,
  };
}

// Generate static paths
export async function generateStaticParams() {
  return (await getProjects()).map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link href="/projects" className="inline-flex items-center gap-2 text-orange-600 dark:text-orange-400 hover:underline mb-8">
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Proyek
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">{project.title}</h1>
          <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400 mb-6">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(project.createdAt)}</span>
            </div>
          </div>
          
          <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
            {project.summary}
          </p>
        </div>

        {/* Cover Image */}
        <div className="relative h-[400px] rounded-2xl overflow-hidden mb-8">
          <Image
            src={project.coverUrl}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-4 mb-8">
          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
              <Button>
                <ExternalLink className="w-4 h-4 mr-2" />
                Live Demo
              </Button>
            </a>
          )}
          {project.repoUrl && (
            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline">
                <Github className="w-4 h-4 mr-2" />
                Source Code
              </Button>
            </a>
          )}
        </div>

        {/* Tech Stack */}
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <Badge key={tech} variant="info">{tech}</Badge>
            ))}
          </div>
        </Card>

        {/* Description */}
        <Card className="p-6 mb-8">
          <div 
            className="prose prose-slate dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ 
              __html: project.description.replace(/\n/g, '<br />') 
            }}
          />
        </Card>

        {/* Gallery */}
        {project.images.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.images.map((image, index) => (
                <div key={index} className="relative h-64 rounded-lg overflow-hidden">
                  <Image
                    src={image}
                    alt={`${project.title} screenshot ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Projects */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Proyek Lainnya</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {((await getProjects())
              .filter(p => p.id !== project.id)
              .slice(0, 2)).map((relatedProject) => (
                <Link key={relatedProject.id} href={`/projects/${relatedProject.slug}`}>
                  <Card hover>
                    <div className="relative h-40 rounded-t-lg overflow-hidden">
                      <Image
                        src={relatedProject.coverUrl}
                        alt={relatedProject.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-2">{relatedProject.title}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                        {relatedProject.summary}
                      </p>
                    </div>
                  </Card>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
