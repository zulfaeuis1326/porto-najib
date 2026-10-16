'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FolderKanban,
  Newspaper,
  User,
  Inbox,
  Sparkles,
  Briefcase,
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
      { href: '/admin/skills', label: 'Skill', icon: Sparkles },
      { href: '/admin/experiences', label: 'Pengalaman', icon: Briefcase },
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

// Daftar tautan sidebar (di atas panel gelap) dengan penanda halaman aktif.
export default function AdminNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  const isActive = (item: NavItem) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href);

  return (
    <nav className="space-y-6 px-3 py-4">
      {groups.map((group) => (
        <div key={group.title}>
          <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-stone-500">
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
                      ? 'bg-white/10 text-white'
                      : 'text-stone-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {active && (
                    <span className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-orange-500" />
                  )}
                  <Icon
                    className={`h-4 w-4 shrink-0 ${
                      active ? 'text-orange-400' : 'text-stone-500 group-hover:text-stone-300'
                    }`}
                  />
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
