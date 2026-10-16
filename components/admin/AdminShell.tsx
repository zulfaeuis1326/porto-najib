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
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-orange-600 text-sm font-bold text-white">
        N
      </span>
      <span className="leading-tight">
        <span className="block text-sm font-bold text-stone-900">Content Studio</span>
        <span className="block text-[11px] font-medium text-stone-500">Portfolio Najib</span>
      </span>
    </Link>
  );
}

function SidebarFooter({ username }: { username: string }) {
  return (
    <div className="space-y-1 border-t border-stone-200 p-3">
      <Link
        href="/"
        target="_blank"
        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-stone-600 transition hover:bg-stone-100 hover:text-stone-900"
      >
        <Globe className="h-4 w-4 shrink-0 text-stone-400" />
        Lihat situs
      </Link>
      <div className="flex items-center gap-3 rounded-xl px-3 py-2">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-stone-900 text-xs font-bold uppercase text-white">
          {username.slice(0, 1)}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-semibold text-stone-800">{username}</span>
          <span className="block text-[11px] text-stone-500">Administrator</span>
        </span>
        <form action={logoutAction}>
          <button
            type="submit"
            title="Keluar"
            className="grid h-8 w-8 place-items-center rounded-lg text-stone-500 transition hover:bg-red-50 hover:text-red-600"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

// Kerangka dashboard admin: sidebar tetap menempel kiri (desktop) + drawer (mobile).
export default function AdminShell({ username, children }: AdminShellProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F7F6F3] text-stone-900">
      {/* Sidebar desktop */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-stone-200 bg-white md:flex">
        <div className="flex h-16 shrink-0 items-center border-b border-stone-200 px-5">
          <Brand />
        </div>
        <div className="flex-1 overflow-y-auto">
          <AdminNav />
        </div>
        <SidebarFooter username={username} />
      </aside>

      {/* Topbar mobile */}
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-stone-200 bg-white/95 px-4 backdrop-blur md:hidden">
        <Brand />
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-xl border border-stone-200 text-stone-700"
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </header>

      {/* Drawer mobile */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-stone-900/40" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 flex w-72 flex-col bg-white shadow-xl">
            <div className="flex h-16 items-center justify-between border-b border-stone-200 px-4">
              <Brand />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-lg text-stone-500"
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
        <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-10">
          {children}
        </main>
      </div>
    </div>
  );
}
