import Link from 'next/link';
import { LayoutDashboard, FolderKanban, Newspaper, User, Inbox, Globe, LogOut } from 'lucide-react';
import { logoutAction } from '@/lib/auth-actions';
import { getSession } from '@/lib/session';

const nav = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/projects', label: 'Proyek', icon: FolderKanban, exact: false },
  { href: '/admin/articles', label: 'Artikel', icon: Newspaper, exact: false },
  { href: '/admin/profile', label: 'Profil', icon: User, exact: false },
  { href: '/admin/inbox', label: 'Pesan Masuk', icon: Inbox, exact: false },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  const username = session.admin?.username || 'Admin';

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#FAF7F2] text-stone-900 dark:bg-stone-950 dark:text-stone-100">
      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:px-8">
        {/* Sidebar */}
        <aside className="hidden w-60 shrink-0 md:block">
          <div className="sticky top-24 overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
            <div className="border-b border-slate-200 px-5 py-4 dark:border-slate-700">
              <p className="text-xs font-bold uppercase tracking-widest text-orange-600 dark:text-orange-400">
                Admin Panel
              </p>
              <p className="mt-1 truncate text-sm font-semibold">{username}</p>
            </div>
            <nav className="space-y-1 p-3">
              {nav.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-orange-50 hover:text-orange-700 dark:text-slate-300 dark:hover:bg-orange-950 dark:hover:text-orange-300"
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="space-y-1 border-t border-slate-200 p-3 dark:border-slate-700">
              <Link
                href="/"
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                <Globe className="h-4 w-4" />
                Lihat Situs
              </Link>
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950"
                >
                  <LogOut className="h-4 w-4" />
                  Keluar
                </button>
              </form>
            </div>
          </div>
        </aside>

        {/* Mobile top nav */}
        <div className="mb-2 flex gap-2 overflow-x-auto md:hidden">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium dark:border-slate-700 dark:bg-slate-800"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Content */}
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
