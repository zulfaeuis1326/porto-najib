import Link from 'next/link';
import { LayoutDashboard, FolderKanban, Newspaper, User, Inbox, Globe, LogOut } from 'lucide-react';
import { logoutAction } from '@/lib/auth-actions';
import { getSession } from '@/lib/session';

const nav = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/projects', label: 'Proyek', icon: FolderKanban },
  { href: '/admin/articles', label: 'Artikel', icon: Newspaper },
  { href: '/admin/profile', label: 'Profil', icon: User },
  { href: '/admin/inbox', label: 'Pesan Masuk', icon: Inbox },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  const username = session.admin?.username || 'Admin';

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-stone-900 dark:bg-stone-950 dark:text-stone-100">
      {/* Sidebar: fixed, menempel kiri, tinggi penuh */}
      <aside className="fixed bottom-0 left-0 top-0 z-40 hidden w-60 flex-col border-r border-slate-200 bg-white md:flex dark:border-slate-800 dark:bg-slate-900">
        <div className="border-b border-slate-200 px-5 py-5 dark:border-slate-800">
          <p className="text-xs font-bold uppercase tracking-widest text-orange-600 dark:text-orange-400">
            Admin Panel
          </p>
          <p className="mt-1 truncate text-sm font-semibold">{username}</p>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {nav.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-orange-50 hover:text-orange-700 dark:text-slate-300 dark:hover:bg-orange-950 dark:hover:text-orange-300"
              >
                <Icon className="h-4 w-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="space-y-1 border-t border-slate-200 p-3 dark:border-slate-800">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <Globe className="h-4 w-4 shrink-0" />
            Lihat Situs
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950"
            >
              <LogOut className="h-4 w-4 shrink-0" />
              Keluar
            </button>
          </form>
        </div>
      </aside>

      {/* Mobile nav: sticky di atas */}
      <div className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur dark:border-slate-800 dark:bg-slate-900/95 md:hidden">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-xs font-bold uppercase tracking-widest text-orange-600 dark:text-orange-400">
            Admin · {username}
          </p>
          <form action={logoutAction}>
            <button type="submit" className="text-xs font-semibold text-red-600 dark:text-red-400">
              Keluar
            </button>
          </form>
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium dark:border-slate-700 dark:bg-slate-800"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/"
            className="whitespace-nowrap rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium dark:border-slate-700 dark:bg-slate-800"
          >
            Lihat Situs
          </Link>
        </div>
      </div>

      {/* Konten: offset tetap selebar sidebar */}
      <div className="md:pl-60">
        <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
