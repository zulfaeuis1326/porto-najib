export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-orange-600 dark:text-orange-400 mb-4">
          404
        </h1>
        <h2 className="text-3xl font-semibold mb-4">
          Halaman Tidak Ditemukan
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto">
          Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
        </p>
        <a 
          href="/"
          className="inline-block px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
        >
          Kembali ke Beranda
        </a>
      </div>
    </div>
  );
}
