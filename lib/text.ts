// Ubah teks biasa menjadi HTML yang aman.
// PENTING: escape dulu, baru baris baru dijadikan <br />.
// Isi artikel/proyek berasal dari CMS — tanpa escape, konten bisa menyisipkan
// <script> atau atribut onerror (XSS tersimpan).

const ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

export function escapeHtml(input: unknown): string {
  return String(input ?? '').replace(/[&<>"']/g, (c) => ESCAPES[c]);
}

export function textToHtml(input: unknown): string {
  return escapeHtml(input).replace(/\r\n|\r|\n/g, '<br />');
}
