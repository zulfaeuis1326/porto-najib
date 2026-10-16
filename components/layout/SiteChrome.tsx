'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';

// Kerangka situs publik: Navbar + Footer hanya di halaman publik.
// Halaman /login dan /admin/* tampil bersih tanpa navigasi landing.
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const bare = pathname === '/login' || pathname.startsWith('/admin');

  if (bare) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
