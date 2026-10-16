import { AlertTriangle } from 'lucide-react';

// Ditampilkan halaman admin saat service role belum dikonfigurasi.
export default function DbNotice() {
  return (
    <div className="rounded-2xl border border-amber-300 bg-amber-50 p-8">
      <div className="flex items-start gap-3">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
        <div>
          <h1 className="text-lg font-bold text-amber-900">Database belum tersambung</h1>
          <p className="mt-2 text-sm leading-relaxed text-amber-800">
            Isi <code className="rounded bg-amber-100 px-1">NEXT_PUBLIC_SUPABASE_URL</code>,{' '}
            <code className="rounded bg-amber-100 px-1">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>, dan{' '}
            <code className="rounded bg-amber-100 px-1">SUPABASE_SERVICE_ROLE_KEY</code> di environment
            (Vercel: Settings → Environment Variables, untuk <strong>Production</strong>), lalu jalankan{' '}
            <code className="rounded bg-amber-100 px-1">supabase/schema.sql</code> +{' '}
            <code className="rounded bg-amber-100 px-1">supabase/seed.sql</code> di SQL Editor Supabase.
            Setelah mengubah environment, <strong>Redeploy</strong> wajib agar berlaku.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-amber-800">
            Bucket penyimpanan gambar (<code className="rounded bg-amber-100 px-1">media</code>) akan dibuat
            otomatis saat unggahan pertama — tidak perlu diatur manual.
          </p>
        </div>
      </div>
    </div>
  );
}
