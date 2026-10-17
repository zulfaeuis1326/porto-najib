import { Metadata } from 'next';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import { getSkillsByCategory } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Skills - Najib',
  description: 'Daftar skill dan teknologi yang saya kuasai sebagai Full Stack Developer.',
};

export const revalidate = 60;

const categoryLabels = {
  frontend: 'Frontend Development',
  backend: 'Backend Development',
  tools: 'Tools & Platforms',
  other: 'Other Skills'
};

const levelLabels = {
  beginner: 'Pemula',
  intermediate: 'Menengah',
  advanced: 'Mahir',
  expert: 'Expert'
};

const levelColors = {
  beginner: 'bg-stone-200 dark:bg-stone-700',
  intermediate: 'bg-amber-200 dark:bg-amber-900',
  advanced: 'bg-teal-200 dark:bg-teal-900',
  expert: 'bg-orange-200 dark:bg-orange-900'
};

export default async function SkillsPage() {
  const skillsByCategory = await getSkillsByCategory();

  return (
    <div className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Reveal>
        <div className="text-center mb-16">
          <span className="eyebrow justify-center mb-3">Keahlian</span>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">Skills & Teknologi</h1>
          <p className="text-xl text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
            Berbagai teknologi dan tools yang saya gunakan dalam pengembangan aplikasi web
          </p>
        </div>
        </Reveal>

        {/* Skills by Category */}
        <div className="space-y-12">
          {Object.entries(skillsByCategory).map(([category, skills]) => (
            skills.length > 0 && (
              <Reveal key={category}>
              <div>
                <h2 className="text-2xl font-bold mb-6">
                  {categoryLabels[category as keyof typeof categoryLabels]}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {skills.map((skill) => (
                    <Card key={skill.id} className="p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{skill.icon}</span>
                          <div>
                            <h3 className="font-semibold text-lg">{skill.name}</h3>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-stone-600 dark:text-stone-400">
                            Level
                          </span>
                          <Badge className={levelColors[skill.level]}>
                            {levelLabels[skill.level]}
                          </Badge>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="w-full bg-stone-200 dark:bg-stone-700 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all ${
                              skill.level === 'expert' ? 'bg-orange-600 w-full' :
                              skill.level === 'advanced' ? 'bg-teal-600 w-3/4' :
                              skill.level === 'intermediate' ? 'bg-amber-500 w-1/2' :
                              'bg-stone-400 w-1/4'
                            }`}
                          />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
              </Reveal>
            )
          ))}
        </div>

        {/* Legend */}
        <Reveal>
        <Card className="p-6 mt-12">
          <h3 className="font-semibold mb-4">Level Keahlian:</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(levelLabels).map(([key, label]) => (
              <div key={key} className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded ${levelColors[key as keyof typeof levelColors]}`} />
                <span className="text-sm">{label}</span>
              </div>
            ))}
          </div>
        </Card>
        </Reveal>

        {/* CTA */}
        <Reveal>
        <div className="mt-12 text-center">
          <p className="text-lg text-stone-600 dark:text-stone-400 mb-6">
            Ingin tahu lebih detail tentang pengalaman saya dengan teknologi ini?
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button href="/about" size="lg">
              Lihat Pengalaman
            </Button>
            <Button href="/projects" variant="outline" size="lg">
              Lihat Proyek
            </Button>
          </div>
        </div>
        </Reveal>
      </div>
    </div>
  );
}
