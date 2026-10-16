'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FolderKanban,
  Newspaper,
  User,
  Inbox,
  type LucideIcon,
} from 'lucide-react';

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  exact?: boolean;
}

const groups: { title: string; items: NavItem[] }[] = [
  {
    title: 'Ringkasan',
    items: [{ href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true }],
  },
  {
    title: 'Konten',
    items: [
      { href: '/admin/projects', label: 'Proyek', icon: FolderKanban },
      { href: '/admin/articles', label: 'Artikel', icon: Newspaper },
    ],
  },
  {
    title: 'Interaksi',
    items: [{ href: '/admin/inbox', label: 'Pesan Masuk', icon: Inbox }],
  },
  {
    title: 'Pengaturan',
    items: [{ href: '/admin/profile', label: 'Profil', icon: User }],
  },
];

// Daftar tautan sidebar dengan penanda halaman aktif.
export default function AdminNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  const isActive = (item: NavItem) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href);

  return (
    <nav className="space-y-6 px-3 py-4">
      {groups.map((group) => (
        <div key={group.title}>
          <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-stone-400">
            {group.title}
          </p>
          <div className="space-y-1">
            {group.items.map((item) => {
              const Icon = item.icon;
              const active = isActive(item);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onNavigate}
                  className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                    active
                      ? 'bg-orange-50 text-orange-700'
                      : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                  }`}
                >
                  {active && (
                    <span className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-orange-600" />
                  )}
                  <Icon className={`h-4 w-4 shrink-0 ${active ? 'text-orange-600' : 'text-stone-400 group-hover:text-stone-600'}`} />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}
