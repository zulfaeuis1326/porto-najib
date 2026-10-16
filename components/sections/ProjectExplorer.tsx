'use client';

import { useState } from 'react';
import { ExternalLink, Github, Search } from 'lucide-react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import SafeImage from '@/components/ui/SafeImage';
import type { Project } from '@/types';

export default function ProjectExplorer({ projects }: { projects: Project[] }) {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Get all unique tech stack
  const allTechStack = Array.from(
    new Set(projects.flatMap(p => p.techStack))
  ).sort();

  // Filter projects
  const filteredProjects = projects.filter(project => {
    const matchesTech = !selectedTech || project.techStack.includes(selectedTech);
    const matchesSearch = !searchQuery ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.summary.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTech && matchesSearch;
  });

  return (
    <>
      {/* Filters */}
      <Reveal>
      <div className="mb-8 space-y-4">
        {/* Search */}
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
          <input
            type="text"
            placeholder="Cari proyek..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-stone-300 dark:border-stone-600 rounded-lg bg-white dark:bg-stone-800 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        {/* Tech Filter */}
        <div className="flex flex-wrap gap-2 justify-center">
          <Button
            variant={selectedTech === null ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setSelectedTech(null)}
          >
            Semua
          </Button>
          {allTechStack.map((tech) => (
            <Button
              key={tech}
              variant={selectedTech === tech ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setSelectedTech(tech)}
            >
              {tech}
            </Button>
          ))}
        </div>
      </div>
      </Reveal>

      {/* Projects Count */}
      <p className="text-center text-stone-600 dark:text-stone-400 mb-8">
        Menampilkan {filteredProjects.length} proyek
      </p>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, i) => (
            <Reveal key={project.id} delay={(i % 3) * 90}>
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
                <h3 className="text-xl font-semibold mb-2">
                  {project.title}
                </h3>

                <p className="text-stone-600 dark:text-stone-400 text-sm mb-4 line-clamp-3">
                  {project.summary}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <Badge key={tech}>{tech}</Badge>
                  ))}
                  {project.techStack.length > 4 && (
                    <Badge>+{project.techStack.length - 4}</Badge>
                  )}
                </div>

                <div className="flex gap-3">
                  <Button
                    href={`/projects/${project.slug}`}
                    variant="primary"
                    size="sm"
                    className="flex-1"
                  >
                    Detail
                  </Button>

                  {project.demoUrl && (
                    <Button
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="outline"
                      size="sm"
                      className="shrink-0"
                      aria-label={`Demo ${project.title}`}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  )}

                  {project.repoUrl && (
                    <Button
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="outline"
                      size="sm"
                      className="shrink-0"
                      aria-label={`Kode sumber ${project.title}`}
                    >
                      <Github className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </Card>
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-stone-600 dark:text-stone-400">
            Tidak ada proyek yang cocok dengan filter Anda
          </p>
        </div>
      )}
    </>
  );
}
