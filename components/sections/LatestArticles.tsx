import Link from 'next/link';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Reveal from '../ui/Reveal';
import SafeImage from '../ui/SafeImage';
import SectionHeader from '../ui/SectionHeader';
import { getArticles } from '@/lib/content';
import { formatDate } from '@/lib/utils';

export default async function LatestArticles() {
  const latestArticles = (await getArticles()).slice(0, 3);

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Reveal>
        <SectionHeader
          eyebrow="Blog"
          title="Artikel Terbaru"
          description="Berbagi pengalaman dan pengetahuan seputar web development"
        />
        </Reveal>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {latestArticles.map((article, i) => (
            <Reveal key={article.id} delay={(i % 3) * 100}>
            <Link href={`/articles/${article.slug}`}>
              <Card hover className="group h-full">
                <div className="relative h-48 rounded-t-lg overflow-hidden img-zoom">
                  <SafeImage
                    src={article.coverUrl}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="info">{article.category}</Badge>
                    <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                      <Clock className="w-3 h-3" />
                      <span>{article.readTime} min</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2 line-clamp-2">
                    {article.title}
                  </h3>
                  
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(article.publishedAt)}</span>
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
          <Button href="/articles" variant="outline" size="lg">
            Lihat Semua Artikel
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
        </Reveal>
      </div>
    </section>
  );
}
