import Link from 'next/link';
import { redirect } from 'next/navigation';
import Reveal from '@/components/ui/Reveal';
import LoginForm from '@/components/LoginForm';
import { isAuthConfigured, getSession } from '@/lib/session';

export const metadata = {
  title: 'Login Admin - Najib',
  description: 'Masuk ke dashboard admin portfolio.',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function LoginPage() {
  try {
    const session = await getSession();
    if (session.admin) redirect('/admin');
  } catch {
    // abaikan -> tampilkan form
  }
  const configured = isAuthConfigured();

  return (
    <div className="grid min-h-[calc(100vh-4rem)] place-items-center px-4 py-16 sm:px-6">
      <Reveal className="w-full max-w-md">
        <div className="rounded-2xl border border-stone-200 bg-white p-8 shadow-xl dark:border-stone-700 dark:bg-stone-800">
          <div className="mb-8 text-center">
            <span className="eyebrow justify-center">Admin</span>
            <h1 className="mt-3 text-3xl font-bold tracking-tight">Selamat datang kembali</h1>
            <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
              Masuk untuk mengelola konten portfolio.
            </p>
          </div>

          {configured ? (
            <LoginForm />
          ) : (
            <div role="alert" className="rounded-lg bg-yellow-100 p-4 text-sm text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
              Login admin belum dikonfigurasi di server ini. Isi <code>ADMIN_USERNAME</code>,{' '}
              <code>ADMIN_PASSWORD</code>, dan <code>SESSION_SECRET</code> di environment variables,
              lalu deploy ulang.
            </div>
          )}

          <div className="mt-6 text-center text-sm">
            <Link href="/" className="text-stone-500 hover:text-orange-600 dark:text-stone-400 dark:hover:text-orange-400">
              ← Kembali ke situs
            </Link>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
