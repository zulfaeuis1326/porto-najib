import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import Reveal from '../ui/Reveal';
import { getProfile } from '@/lib/content';

export default async function Hero() {
  const profileData = await getProfile();
  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <Reveal>
          <div className="space-y-6">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700 dark:border-orange-900 dark:bg-orange-950 dark:text-orange-300">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-500 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-600 dark:bg-orange-400" />
                </span>
                Terbuka untuk proyek freelance
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 dark:text-white">
                Halo, saya <span className="marker">Najib</span>
              </h1>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-stone-600 dark:text-stone-300">
                {profileData.headline}
              </h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl">
              {profileData.bio}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/projects">
                <Button size="lg">
                  Lihat Proyek
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  Hubungi Saya
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-4">
              <div>
                <p className="text-2xl font-bold text-stone-900 dark:text-white">3+</p>
                <p className="text-sm text-stone-500 dark:text-stone-400">Tahun pengalaman</p>
              </div>
              <div className="border-l border-stone-200 dark:border-stone-800 pl-8">
                <p className="text-2xl font-bold text-stone-900 dark:text-white">15+</p>
                <p className="text-sm text-stone-500 dark:text-stone-400">Proyek selesai</p>
              </div>
              <div className="border-l border-stone-200 dark:border-stone-800 pl-8">
                <p className="text-2xl font-bold text-stone-900 dark:text-white">20+</p>
                <p className="text-sm text-stone-500 dark:text-stone-400">Artikel ditulis</p>
              </div>
            </div>
          </div>
          </Reveal>

          {/* Image */}
          <Reveal delay={150}>
          <div className="relative">
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* Decorative elements */}
              <div className="absolute -top-6 -left-6 w-72 h-72 bg-orange-200 dark:bg-orange-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-60 animate-blob"></div>
              <div className="absolute -bottom-8 -right-4 w-72 h-72 bg-amber-200 dark:bg-amber-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-60 animate-blob animation-delay-2000"></div>
              <div className="absolute -bottom-4 -left-8 w-40 h-40 rounded-2xl bg-orange-600 dark:bg-orange-500 -z-0"></div>
              
              {/* Profile Image */}
              <div className="relative rounded-2xl overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl img-zoom">
                <Image
                  src={profileData.photoUrl}
                  alt={profileData.name}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>
          </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
