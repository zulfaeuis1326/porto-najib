'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Globe, LogOut, Menu, X } from 'lucide-react';
import AdminNav from './AdminNav';
import { logoutAction } from '@/lib/auth-actions';

interface AdminShellProps {
  username: string;
  children: React.ReactNode;
}

function Brand() {
  return (
    <Link href="/admin" className="flex items-center gap-3">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-orange-600 text-sm font-bold text-white shadow-sm">
        N
      </span>
      <span className="leading-tight">
        <span className="block text-sm font-bold text-white">Content Studio</span>
        <span className="block text-[11px] font-medium text-stone-400">Portfolio Najib</span>
      </span>
    </Link>
  );
}

function SidebarFooter({ username }: { username: string }) {
  return (
    <div className="space-y-1 border-t border-white/10 p-3">
      <Link
        href="/"
        target="_blank"
        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-stone-400 transition hover:bg-white/5 hover:text-white"
      >
        <Globe className="h-4 w-4 shrink-0" />
        Lihat situs
      </Link>
      <div className="flex items-center gap-3 rounded-xl px-3 py-2">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-orange-600 text-xs font-bold uppercase text-white">
          {username.slice(0, 1)}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-semibold text-white">{username}</span>
          <span className="block text-[11px] text-stone-400">Administrator</span>
        </span>
        <form action={logoutAction}>
          <button
            type="submit"
            title="Keluar"
            className="grid h-8 w-8 place-items-center rounded-lg text-stone-400 transition hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

// Kerangka dashboard: sidebar gelap menempel kiri (desktop) + drawer (mobile).
export default function AdminShell({ username, children }: AdminShellProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F4F3F0] text-stone-900">
      {/* Sidebar desktop */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col bg-stone-950 md:flex">
        <div className="flex h-16 shrink-0 items-center border-b border-white/10 px-5">
          <Brand />
        </div>
        <div className="flex-1 overflow-y-auto">
          <AdminNav />
        </div>
        <SidebarFooter username={username} />
      </aside>

      {/* Topbar mobile */}
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-white/10 bg-stone-950 px-4 md:hidden">
        <Brand />
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-xl border border-white/15 text-stone-200"
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </header>

      {/* Drawer mobile */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-stone-950/60" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 flex w-72 flex-col bg-stone-950 shadow-2xl">
            <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
              <Brand />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-lg text-stone-400"
                aria-label="Tutup"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <AdminNav onNavigate={() => setOpen(false)} />
            </div>
            <SidebarFooter username={username} />
          </div>
        </div>
      )}

      {/* Konten */}
      <div className="md:pl-64">
        <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-9 lg:px-10">
          {children}
        </main>
      </div>
    </div>
  );
}
