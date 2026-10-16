import Hero from '@/components/sections/Hero';
import FeaturedProjects from '@/components/sections/FeaturedProjects';
import LatestArticles from '@/components/sections/LatestArticles';
import Button from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';

// Beranda selalu menampilkan data terbaru dari CMS.
export const dynamic = 'force-dynamic';

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Featured Projects */}
      <FeaturedProjects />

      {/* Latest Articles */}
      <LatestArticles />

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-stone-900 dark:bg-orange-950 px-6 py-16 sm:px-16 text-center">
            <div className="dot-grid absolute inset-0" aria-hidden="true" />
            <div className="relative">
              <p className="eyebrow justify-center mb-4" style={{ color: '#fdba74' }}>Kolaborasi</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
                Mari Bekerja Sama
              </h2>
              <p className="text-lg text-stone-300 mb-8 max-w-2xl mx-auto">
                Punya proyek menarik atau butuh bantuan dalam web development?
                Saya siap membantu mewujudkan ide Anda menjadi kenyataan.
              </p>
              <Button
                href="/contact"
                size="lg"
                variant="secondary"
                className="!bg-orange-600 !text-white hover:!bg-orange-500 !border-0"
              >
                Hubungi Saya Sekarang
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
