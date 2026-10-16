'use client';

import { usePathname } from 'next/navigation';

// Setiap pindah menu, konten di-mount ulang dengan key pathname
// sehingga animasi page-enter selalu terpicu (transisi antar halaman).
export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="page-enter">
      {children}
    </div>
  );
}
