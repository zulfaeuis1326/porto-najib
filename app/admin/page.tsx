import Link from 'next/link';
import {
  FolderKanban,
  Newspaper,
  Inbox,
  UserRound,
  Plus,
  ArrowRight,
  ArrowUpRight,
  type LucideIcon,
} from 'lucide-react';
import { supabaseAdmin, isServiceConfigured } from '@/lib/supabase';
import DbNotice from '@/components/admin/DbNotice';
import PageHeader from '@/components/admin/PageHeader';
import { btnPrimary, btnOutline } from '@/components/admin/ui';

export const metadata = { title: 'Dashboard Admin', robots: { index: false, follow: false } };

type Accent = 'orange' | 'emerald' | 'amber' | 'stone';

const accentClass: Record<Accent, { tile: string; dot: string }> = {
  orange: { tile: 'bg-orange-100 text-orange-600', dot: 'bg-orange-500' },
  emerald: { tile: 'bg-emerald-100 text-emerald-600', dot: 'bg-emerald-500' },
  amber: { tile: 'bg-amber-100 text-amber-600', dot: 'bg-amber-500' },
  stone: { tile: 'bg-stone-200 text-stone-700', dot: 'bg-stone-400' },
};

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  caption: string;
  href: string;
  accent: Accent;
}

function StatCard({ icon: Icon, label, value, caption, href, accent }: StatCardProps) {
  const a = accentClass[accent];
  return (
    <Link
      href={href}
      className="group flex flex-col justify-between rounded-2xl border border-stone-200 bg-white p-5 transition hover:border-stone-300 hover:shadow-md"
    >
      <div className="flex items-center justify-between">
        <span className={`grid h-11 w-11 place-items-center rounded-xl ${a.tile}`}>
          <Icon className="h-5 w-5" />
        </span>
        <ArrowUpRight className="h-4 w-4 text-stone-300 transition group-hover:text-stone-500" />
      </div>
      <div className="mt-5">
        <p className="text-3xl font-bold tabular-nums tracking-tight text-stone-900">{value}</p>
        <p className="mt-0.5 text-sm font-semibold text-stone-700">{label}</p>
        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-stone-500">
          <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${a.dot}`} />
          <span className="truncate">{caption}</span>
        </p>
      </div>
    </Link>
  );
}

function Panel({
  title,
  action,
  children,
}: {
  title: string;
  action?: { href: string; label: string };
  children: React.ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
      <div className="flex items-center justify-between border-b border-stone-100 px-5 py-4">
        <h2 className="text-sm font-bold text-stone-900">{title}</h2>
        {action && (
          <Link href={action.href} className="text-xs font-semibold text-orange-600 hover:underline">
            {action.label}
          </Link>
        )}
      </div>
      {children}
    </section>
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
  const articleCount = ((articlesRes.data || []) as Array<{ id: string }>).length;
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
      accent: 'orange',
    },
    {
      icon: Newspaper,
      label: 'Artikel',
      value: articleCount,
      caption: 'Tulisan terbit',
      href: '/admin/articles',
      accent: 'amber',
    },
    {
      icon: Inbox,
      label: 'Pesan Masuk',
      value: totalMessages,
      caption: unread > 0 ? `${unread} belum dibaca` : 'Semua sudah dibaca',
      href: '/admin/inbox',
      accent: 'emerald',
    },
    {
      icon: UserRound,
      label: 'Profil',
      value: profile?.name ? 'Terisi' : 'Kosong',
      caption: profile?.headline || 'Lengkapi data profil',
      href: '/admin/profile',
      accent: 'stone',
    },
  ];

  const today = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="space-y-7">
      <PageHeader
        eyebrow={today}
        title={`Halo, ${profile?.name || 'Admin'}`}
        description="Ini ringkasan konten dan aktivitas portfolio kamu."
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

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Panel title="Pesan Terbaru" action={{ href: '/admin/inbox', label: 'Buka inbox' }}>
            {recent.length === 0 ? (
              <p className="px-5 py-12 text-center text-sm text-stone-500">Belum ada pesan masuk.</p>
            ) : (
              <ul className="divide-y divide-stone-100">
                {recent.map((m) => (
                  <li key={m.id} className="flex items-center gap-4 px-5 py-3.5">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-stone-900 text-xs font-bold uppercase text-white">
                      {m.name.slice(0, 1)}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-stone-900">{m.name}</p>
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
          </Panel>
        </div>

        <div className="space-y-5">
          <section className="rounded-2xl border border-stone-200 bg-white p-5">
            <h2 className="text-sm font-bold text-stone-900">Status</h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center justify-between">
                <span className="text-stone-500">Database</span>
                <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-600">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" /> Terhubung
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-stone-500">Proyek publik</span>
                <span className="font-semibold tabular-nums text-stone-900">{projects.length}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-stone-500">Artikel publik</span>
                <span className="font-semibold tabular-nums text-stone-900">{articleCount}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-stone-500">Belum dibaca</span>
                <span className="font-semibold tabular-nums text-stone-900">{unread}</span>
              </li>
            </ul>
            <Link href="/" target="_blank" className={`${btnOutline} mt-5 w-full`}>
              Lihat situs publik <ArrowRight className="h-4 w-4" />
            </Link>
          </section>

          <section className="rounded-2xl border border-stone-200 bg-white p-5">
            <h2 className="text-sm font-bold text-stone-900">Aksi Cepat</h2>
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
