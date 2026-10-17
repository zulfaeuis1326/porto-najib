// Alamat kanonis situs. Dipakai untuk metadata, robots, dan sitemap.
// Bisa ditimpa lewat NEXT_PUBLIC_SITE_URL tanpa perlu ubah kode.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://najib-xi.vercel.app'
).replace(/\/+$/, '');
