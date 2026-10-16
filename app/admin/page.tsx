import Link from 'next/link';
import { FolderKanban, Newspaper, Inbox, User, ArrowRight, AlertTriangle } from 'lucide-react';
import { supabaseAdmin } from '@/lib/supabase';
import { isServiceConfigured } from '@/lib/supabase';

export const metadata = {
  title: 'Dashboard Admin',
  robots: { index: false, follow: false },
};

interface StatCardProps {
  label: string;
  value: number | string;
  href: string;
  accent: string;
}

function StatCard({ label, value, href, accent }: StatCardProps) {
  return (
    <Link
      href={href}
      className="group flex h-full min-h-[148px] flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800"
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
        <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${accent}`} />
      </div>
      <p className="mt-2 text-4xl font-bold tabular-nums tracking-tight">{value}</p>
      <p className="mt-auto inline-flex items-center gap-1 pt-3 text-sm font-medium text-orange-600 dark:text-orange-400">
        Kelola <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </p>
    </Link>
  );
}

export default async function AdminDashboard() {
  if (!isServiceConfigured) {
    return (
      <div className="rounded-2xl border border-yellow-300 bg-yellow-50 p-8 dark:border-yellow-900 dark:bg-yellow-950">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-yellow-600 dark:text-yellow-400" />
          <div>
            <h1 className="text-xl font-bold">Database belum tersambung</h1>
            <p className="mt-2 text-sm leading-relaxed">
              Isi <code>NEXT_PUBLIC_SUPABASE_URL</code>, <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code>, dan{' '}
              <code>SUPABASE_SERVICE_ROLE_KEY</code> di environment, lalu jalankan{' '}
              <code>supabase/schema.sql</code> + <code>supabase/seed.sql</code> di SQL Editor Supabase.
              Situs publik tetap tampil memakai data lokal sementara itu.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const db = supabaseAdmin();
  const [projects, articles, messages, unread] = await Promise.all([
    db.from('projects').select('id', { count: 'exact', head: true }),
    db.from('articles').select('id', { count: 'exact', head: true }),
    db.from('messages').select('id,name,email,message,created_at', { count: 'exact' }).order('created_at', { ascending: false }).limit(5),
    db.from('messages').select('id', { count: 'exact', head: true }).eq('is_read', false),
  ]);

  const recent = (messages.data || []) as Array<{ id: string; name: string; email: string; message: string; created_at: string }>;

  return (
    <div className="space-y-6">
      <div>
        <p className="eyebrow">Admin Panel</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-slate-600 dark:text-slate-400">Ringkasan konten portfolio kamu.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatCard label="Proyek" value={projects.count ?? 0} href="/admin/projects" accent="bg-orange-500" />
        <StatCard label="Artikel" value={articles.count ?? 0} href="/admin/articles" accent="bg-teal-500" />
        <StatCard label="Pesan Belum Dibaca" value={unread.count ?? 0} href="/admin/inbox" accent="bg-amber-500" />
        <StatCard label="Profil" value="1" href="/admin/profile" accent="bg-slate-400" />
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-lg font-bold">
            <Inbox className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            Pesan Terbaru
          </h2>
          <Link href="/admin/inbox" className="text-sm font-medium text-orange-600 hover:underline dark:text-orange-400">
            Buka inbox
          </Link>
        </div>
        {recent.length === 0 ? (
          <p className="py-6 text-center text-sm text-slate-500 dark:text-slate-400">
            Belum ada pesan masuk.
          </p>
        ) : (
          <ul className="divide-y divide-slate-100 dark:divide-slate-700">
            {recent.map((m) => (
              <li key={m.id} className="flex min-h-[64px] items-center justify-between gap-4 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{m.name} <span className="font-normal text-slate-500">· {m.email}</span></p>
                  <p className="truncate text-sm text-slate-600 dark:text-slate-400">{m.message}</p>
                </div>
                <span className="shrink-0 text-xs tabular-nums text-slate-400">
                  {new Date(m.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { icon: FolderKanban, title: 'Tambah Proyek', desc: 'Publikasikan karya baru', href: '/admin/projects/new' },
          { icon: Newspaper, title: 'Tulis Artikel', desc: 'Bagikan pengetahuan', href: '/admin/articles/new' },
          { icon: User, title: 'Edit Profil', desc: 'Nama, bio, foto, link', href: '/admin/profile' },
        ].map((a) => {
          const Icon = a.icon;
          return (
            <Link
              key={a.href}
              href={a.href}
              className="group flex h-full min-h-[132px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 p-6 text-center transition-all hover:border-orange-400 hover:bg-orange-50 dark:border-slate-600 dark:hover:border-orange-700 dark:hover:bg-orange-950"
            >
              <Icon className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              <p className="mt-2 font-semibold">{a.title}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{a.desc}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
