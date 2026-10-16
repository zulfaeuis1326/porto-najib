import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Clock } from 'lucide-react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Reveal from '@/components/ui/Reveal';
import SafeImage from '@/components/ui/SafeImage';
import { getArticles } from '@/lib/content';
import { formatDate } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Artikel - Najib',
  description: 'Kumpulan artikel seputar web development: tutorial, best practices, dan perbandingan teknologi.',
};

// Selalu ambil dari CMS.
export const dynamic = 'force-dynamic';

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
        <div className="text-center mb-12">
          <span className="eyebrow justify-center mb-3">Blog</span>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">Semua Artikel</h1>
          <p className="text-xl text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
            Berbagi pengalaman dan pengetahuan seputar web development.
          </p>
        </div>
        </Reveal>

        {articles.length === 0 ? (
          <p className="py-12 text-center text-stone-500">Belum ada artikel.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, i) => (
              <Reveal key={article.id} delay={(i % 3) * 90}>
              <Link href={`/articles/${article.slug}`}>
                <Card hover className="group h-full">
                  <div className="relative h-48 rounded-t-lg overflow-hidden img-zoom">
                    <SafeImage src={article.coverUrl} alt={article.title} fill className="object-cover" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="info">{article.category || 'Artikel'}</Badge>
                      <div className="flex items-center gap-1 text-xs text-stone-500 dark:text-stone-400">
                        <Clock className="w-3 h-3" />
                        <span>{article.readTime} min</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 line-clamp-2">{article.title}</h3>
                    <p className="text-stone-600 dark:text-stone-400 text-sm mb-4 line-clamp-2">{article.excerpt}</p>
                    <div className="flex items-center gap-1 text-xs text-stone-500 dark:text-stone-400">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(article.publishedAt)}</span>
                    </div>
                  </div>
                </Card>
              </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
