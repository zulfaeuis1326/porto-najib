/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

// Content Security Policy.
// Tujuan: membatasi dari mana skrip/gambar boleh dimuat, mematikan plugin,
// dan mencegah situs ini di-embed di iframe orang lain (clickjacking).
//
// Catatan: 'unsafe-inline' pada script-src masih diperlukan karena Next.js
// menyisipkan skrip bootstrap secara inline. Yang penting, skrip dari domain
// luar tetap diblokir total, begitu juga object/embed dan form ke luar situs.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isProd ? '' : " 'unsafe-eval'"}`,
  "style-src 'self' 'unsafe-inline'",
  // Gambar dari internet bebas (admin bisa menempel URL mana pun) + data URL
  // untuk gambar lokal yang dikompresi di browser.
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  `connect-src 'self' https://*.supabase.co${isProd ? '' : ' ws: wss:'}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isProd ? ['upgrade-insecure-requests'] : []),
].join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  // Jangan tebak-tebak tipe berkas (anti content sniffing).
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Tidak boleh di-embed di iframe (anti clickjacking) — pendamping CSP.
  { key: 'X-Frame-Options', value: 'DENY' },
  // Jangan kirim URL lengkap ke situs lain.
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Matikan fitur perangkat yang tidak dipakai.
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()',
  },
  // Paksa HTTPS selama 2 tahun (hanya dikirim saat produksi/HTTPS).
  ...(isProd
    ? [{ key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' }]
    : []),
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Jangan bocorkan versi Next.js, dan jangan kirim source map ke browser.
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  compress: true,
  reactStrictMode: true,

  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      // Izinkan gambar dari mana saja (http & https).
      // Catatan: SafeImage memuat URL luar langsung lewat <img>, jadi ini
      // hanya berlaku untuk gambar lokal yang dioptimalkan Next.js.
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: '**' },
    ],
  },

  async headers() {
    return [
      { source: '/(.*)', headers: securityHeaders },
      // Area admin & API tidak untuk diindeks mesin pencari.
      {
        source: '/admin/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        source: '/api/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
    ];
  },
};

module.exports = nextConfig;
