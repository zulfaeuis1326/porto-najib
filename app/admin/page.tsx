import Link from 'next/link';
import {
  FolderKanban,
  Newspaper,
  Inbox,
  UserRound,
  Plus,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import { supabaseAdmin, isServiceConfigured } from '@/lib/supabase';
import DbNotice from '@/components/admin/DbNotice';
import PageHeader from '@/components/admin/PageHeader';
import { btnPrimary, btnOutline } from '@/components/admin/ui';

export const metadata = { title: 'Dashboard Admin', robots: { index: false, follow: false } };

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  caption: string;
  href: string;
}

function StatCard({ icon: Icon, label, value, caption, href }: StatCardProps) {
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-2xl border border-stone-200 bg-white p-5 shadow-[0_1px_2px_rgba(28,25,23,0.05)] transition hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-md"
    >
      <div className="flex items-center justify-between">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-orange-50 text-orange-600">
          <Icon className="h-5 w-5" />
        </span>
        <ArrowRight className="h-4 w-4 text-stone-300 transition group-hover:translate-x-0.5 group-hover:text-orange-500" />
      </div>
      <p className="mt-4 text-3xl font-bold tabular-nums tracking-tight text-stone-900">{value}</p>
      <p className="text-sm font-semibold text-stone-700">{label}</p>
      <p className="mt-0.5 text-xs text-stone-500">{caption}</p>
    </Link>
  );
}

interface Msg {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

export default async function AdminDashboard() {
  if (!isServiceConfigured) {
    return (
      <div className="space-y-6">
        <PageHeader title="Dashboard" description="Ringkasan konten dan aktivitas portfolio." />
        <DbNotice />
      </div>
    );
  }

  const db = supabaseAdmin();
  const [projectsRes, articlesRes, messagesRes, unreadRes, recentRes, profileRes] = await Promise.all([
    db.from('projects').select('id, featured'),
    db.from('articles').select('id'),
    db.from('messages').select('id', { count: 'exact', head: true }),
    db.from('messages').select('id', { count: 'exact', head: true }).eq('is_read', false),
    db.from('messages').select('id, name, email, message, created_at').order('created_at', { ascending: false }).limit(6),
    db.from('profiles').select('name, headline').eq('id', 'main').maybeSingle(),
  ]);

  const projects = (projectsRes.data || []) as Array<{ id: string; featured: boolean }>;
  const articles = (articlesRes.data || []) as Array<{ id: string }>;
  const articleCount = articles.length;
  const featuredCount = projects.filter((p) => p.featured).length;
  const unread = unreadRes.count ?? 0;
  const totalMessages = messagesRes.count ?? 0;
  const recent = (recentRes.data || []) as Msg[];
  const profile = profileRes.data as { name?: string; headline?: string } | null;

  const stats: StatCardProps[] = [
    {
      icon: FolderKanban,
      label: 'Proyek',
      value: projects.length,
      caption: `${featuredCount} ditandai unggulan`,
      href: '/admin/projects',
    },
    {
      icon: Newspaper,
      label: 'Artikel',
      value: articleCount,
      caption: 'Tulisan yang terbit',
      href: '/admin/articles',
    },
    {
      icon: Inbox,
      label: 'Pesan Masuk',
      value: totalMessages,
      caption: unread > 0 ? `${unread} belum dibaca` : 'Semua sudah dibaca',
      href: '/admin/inbox',
    },
    {
      icon: UserRound,
      label: 'Profil',
      value: profile?.name ? 'Terisi' : 'Kosong',
      caption: profile?.headline || 'Lengkapi data profil',
      href: '/admin/profile',
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Halo, ${profile?.name || 'Admin'}`}
        description="Ringkasan konten dan aktivitas portfolio kamu."
        actions={
          <>
            <Link href="/admin/projects/new" className={btnPrimary}>
              <Plus className="h-4 w-4" /> Proyek
            </Link>
            <Link href="/admin/articles/new" className={btnOutline}>
              <Plus className="h-4 w-4" /> Artikel
            </Link>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Pesan terbaru */}
        <section className="lg:col-span-2 rounded-2xl border border-stone-200 bg-white shadow-[0_1px_2px_rgba(28,25,23,0.05)]">
          <div className="flex items-center justify-between border-b border-stone-100 px-5 py-4">
            <h2 className="flex items-center gap-2 text-sm font-bold text-stone-800">
              <Inbox className="h-4 w-4 text-orange-600" />
              Pesan Terbaru
            </h2>
            <Link href="/admin/inbox" className="text-xs font-semibold text-orange-600 hover:underline">
              Buka inbox
            </Link>
          </div>

          {recent.length === 0 ? (
            <p className="px-5 py-10 text-center text-sm text-stone-500">Belum ada pesan masuk.</p>
          ) : (
            <ul className="divide-y divide-stone-100">
              {recent.map((m) => (
                <li key={m.id} className="flex items-center gap-4 px-5 py-3.5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-stone-100 text-xs font-bold uppercase text-stone-600">
                    {m.name.slice(0, 1)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-stone-800">{m.name}</p>
                    <p className="truncate text-xs text-stone-500">{m.message}</p>
                  </div>
                  <span className="shrink-0 text-xs tabular-nums text-stone-400">
                    {m.created_at
                      ? new Date(m.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })
                      : ''}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Status & aksi cepat */}
        <div className="space-y-6">
          <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-[0_1px_2px_rgba(28,25,23,0.05)]">
            <h2 className="text-sm font-bold text-stone-800">Status Situs</h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center justify-between">
                <span className="text-stone-500">Database</span>
                <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-600">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" /> Terhubung
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-stone-500">Proyek publik</span>
                <span className="font-semibold tabular-nums text-stone-800">{projects.length}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-stone-500">Artikel publik</span>
                <span className="font-semibold tabular-nums text-stone-800">{articleCount}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-stone-500">Pesan belum dibaca</span>
                <span className="font-semibold tabular-nums text-stone-800">{unread}</span>
              </li>
            </ul>
            <Link
              href="/"
              target="_blank"
              className={`${btnOutline} mt-5 w-full`}
            >
              Lihat situs publik <ArrowRight className="h-4 w-4" />
            </Link>
          </section>

          <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-[0_1px_2px_rgba(28,25,23,0.05)]">
            <h2 className="text-sm font-bold text-stone-800">Aksi Cepat</h2>
            <div className="mt-3 space-y-2">
              {[
                { href: '/admin/projects/new', label: 'Tambah proyek baru' },
                { href: '/admin/articles/new', label: 'Tulis artikel' },
                { href: '/admin/profile', label: 'Perbarui profil' },
              ].map((a) => (
                <Link
                  key={a.href}
                  href={a.href}
                  className="flex items-center justify-between rounded-xl border border-stone-200 px-3.5 py-2.5 text-sm font-medium text-stone-700 transition hover:border-orange-300 hover:bg-orange-50"
                >
                  {a.label}
                  <ArrowRight className="h-4 w-4 text-stone-300" />
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
