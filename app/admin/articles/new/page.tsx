import ArticleForm from '@/components/admin/ArticleForm';
import PageHeader from '@/components/admin/PageHeader';

export const metadata = { title: 'Tulis Artikel', robots: { index: false, follow: false } };

export default function NewArticle() {
  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader title="Tulis Artikel" description="Tulis tulisan baru, unggah cover, lalu terbitkan." />
      <ArticleForm />
    </div>
  );
}
