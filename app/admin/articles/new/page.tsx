import ArticleForm from '@/components/admin/ArticleForm';

export const metadata = { title: 'Tulis Artikel', robots: { index: false, follow: false } };

export default function NewArticle() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <p className="eyebrow">Admin Panel</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">Tulis Artikel</h1>
      </div>
      <ArticleForm />
    </div>
  );
}
