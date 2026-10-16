import { Metadata } from 'next';
import { Download, MapPin, Mail, Briefcase, GraduationCap } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Reveal from '@/components/ui/Reveal';
import SafeImage from '@/components/ui/SafeImage';
import { getProfile, getExperiencesByType } from '@/lib/content';
import { formatDate, calculateDuration } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Tentang Saya - Najib',
  description: 'Kenali lebih dekat tentang Najib, pengalaman kerja, pendidikan, dan perjalanan karir sebagai Full Stack Developer.',
};

export const dynamic = 'force-dynamic';

export default async function AboutPage() {
  const profileData = await getProfile();
  const { work, education } = await getExperiencesByType();

  return (
    <div className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Reveal>
        <div className="text-center mb-16">
          <span className="eyebrow justify-center mb-3">Profil</span>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">Tentang Saya</h1>
          <p className="text-xl text-stone-600 dark:text-stone-400">
            Kenali lebih dekat tentang perjalanan dan pengalaman saya
          </p>
        </div>
        </Reveal>

        {/* Profile Section */}
        <Reveal>
        <Card className="p-8 mb-12">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="relative w-48 h-48 rounded-2xl overflow-hidden flex-shrink-0 mx-auto md:mx-0">
              <SafeImage
                src={profileData.photoUrl}
                alt={profileData.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">{profileData.name}</h2>
              <p className="text-lg text-orange-600 dark:text-orange-400 mb-4">
                {profileData.headline}
              </p>
              
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-stone-600 dark:text-stone-400">
                  <MapPin className="w-4 h-4" />
                  <span>{profileData.location}</span>
                </div>
                <div className="flex items-center gap-2 text-stone-600 dark:text-stone-400">
                  <Mail className="w-4 h-4" />
                  <a href={`mailto:${profileData.email}`} className="hover:text-orange-600 dark:hover:text-orange-400">
                    {profileData.email}
                  </a>
                </div>
              </div>

              <p className="text-stone-600 dark:text-stone-400 mb-6 leading-relaxed">
                {profileData.bio}
              </p>

              <Button href={profileData.cvUrl} download>
                <Download className="w-4 h-4 mr-2" />
                Download CV
              </Button>
            </div>
          </div>
        </Card>
        </Reveal>

        {/* Work Experience */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Briefcase className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            <h2 className="text-2xl font-bold">Pengalaman Kerja</h2>
          </div>
          
          <div className="space-y-6">
            {work.map((exp, i) => (
              <Reveal key={exp.id} delay={Math.min(i, 2) * 90}>
              <Card className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-xl font-semibold">{exp.title}</h3>
                    <p className="text-orange-600 dark:text-orange-400">{exp.organization}</p>
                  </div>
                  {exp.current && (
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-medium rounded-full">
                      Saat ini
                    </span>
                  )}
                </div>
                
                <p className="text-sm text-stone-500 dark:text-stone-400 mb-3">
                  {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Sekarang'}
                  {' • '}
                  {calculateDuration(exp.startDate, exp.endDate)}
                </p>
                
                <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
                  {exp.description}
                </p>
              </Card>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Education */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <GraduationCap className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            <h2 className="text-2xl font-bold">Pendidikan</h2>
          </div>
          
          <div className="space-y-6">
            {education.map((exp) => (
              <Reveal key={exp.id}>
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-1">{exp.title}</h3>
                <p className="text-orange-600 dark:text-orange-400 mb-2">{exp.organization}</p>
                
                <p className="text-sm text-stone-500 dark:text-stone-400 mb-3">
                  {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Sekarang'}
                </p>
                
                <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
                  {exp.description}
                </p>
              </Card>
              </Reveal>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Reveal>
        <div className="mt-12 text-center">
          <p className="text-lg text-stone-600 dark:text-stone-400 mb-6">
            Tertarik untuk bekerja sama atau ingin tahu lebih lanjut?
          </p>
          <Button href="/contact" size="lg">Hubungi Saya</Button>
        </div>
        </Reveal>
      </div>
    </div>
  );
}
