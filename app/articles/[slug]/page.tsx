import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import Reveal from '@/components/ui/Reveal';
import SafeImage from '@/components/ui/SafeImage';
import { getArticleBySlug, getArticles } from '@/lib/content';
import { formatDate } from '@/lib/utils';

export const dynamic = 'force-dynamic';

interface ArticlePageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);
  if (!article) return { title: 'Artikel Tidak Ditemukan' };
  return { title: `${article.title} - Najib`, description: article.excerpt };
}

export default async function ArticleDetailPage({ params }: ArticlePageProps) {
  const article = await getArticleBySlug(params.slug);
  if (!article) notFound();

  const others = (await getArticles()).filter((a) => a.slug !== article.slug).slice(0, 2);

  return (
    <div className="py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <Link href="/articles" className="inline-flex items-center gap-2 text-orange-600 dark:text-orange-400 hover:underline mb-8">
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Artikel
          </Link>
        </Reveal>

        <Reveal>
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge variant="info">{article.category || 'Artikel'}</Badge>
              <span className="inline-flex items-center gap-1 text-xs text-stone-500 dark:text-stone-400">
                <Calendar className="w-3 h-3" /> {formatDate(article.publishedAt)}
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-stone-500 dark:text-stone-400">
                <Clock className="w-3 h-3" /> {article.readTime} min baca
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">{article.title}</h1>
            <p className="text-xl text-stone-600 dark:text-stone-400 leading-relaxed">{article.excerpt}</p>
          </div>
        </Reveal>

        <Reveal>
          <div className="relative h-[320px] sm:h-[400px] rounded-2xl overflow-hidden mb-8 img-zoom">
            <SafeImage src={article.coverUrl} alt={article.title} fill className="object-cover" />
          </div>
        </Reveal>

        <Reveal>
          <Card className="p-6 sm:p-8 mb-8">
            <div
              className="prose prose-slate dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br />') }}
            />
          </Card>
        </Reveal>

        {article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-12">
            {article.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        )}

        {others.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Artikel Lainnya</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {others.map((o) => (
                <Link key={o.id} href={`/articles/${o.slug}`}>
                  <Card hover className="group h-full">
                    <div className="relative h-40 rounded-t-lg overflow-hidden img-zoom">
                      <SafeImage src={o.coverUrl} alt={o.title} fill className="object-cover" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-2 line-clamp-1">{o.title}</h3>
                      <p className="text-sm text-stone-600 dark:text-stone-400 line-clamp-2">{o.excerpt}</p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
