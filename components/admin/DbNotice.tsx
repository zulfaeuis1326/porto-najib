import { AlertTriangle } from 'lucide-react';

// Ditampilkan halaman admin saat service role belum dikonfigurasi.
export default function DbNotice() {
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
          </p>
        </div>
      </div>
    </div>
  );
}
