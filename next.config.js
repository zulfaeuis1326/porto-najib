/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Izinkan gambar dari mana saja (http & https).
      // Catatan: SafeImage memuat URL luar langsung lewat <img>, jadi ini
      // hanya berlaku untuk gambar lokal yang dioptimalkan Next.js.
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: '**' },
    ],
  },
}

module.exports = nextConfig
