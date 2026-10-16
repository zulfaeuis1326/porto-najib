// Utilitas sisi-klien: mengubah berkas gambar menjadi data URL yang dikompresi.
// Dipakai sebagai CADANGAN bila penyimpanan cloud (Supabase Storage) belum
// aktif, supaya admin tetap bisa memasang foto dari perangkat.

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => resolve(String(fr.result || ''));
    fr.onerror = () => reject(new Error('Gagal membaca berkas.'));
    fr.readAsDataURL(file);
  });
}

function loadImageEl(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Gagal memuat gambar.'));
    img.src = src;
  });
}

/**
 * Kompres gambar menjadi data URL JPEG agar cukup kecil untuk disimpan di
 * database. SVG dikembalikan apa adanya (tidak perlu dikompresi).
 */
export async function fileToCompressedDataUrl(
  file: File,
  maxSize = 1400,
  quality = 0.85
): Promise<string> {
  if (!file.type.startsWith('image/')) {
    throw new Error('Bukan berkas gambar.');
  }

  const original = await readAsDataUrl(file);
  if (file.type === 'image/svg+xml') return original;

  const img = await loadImageEl(original);
  const w = img.naturalWidth || img.width;
  const h = img.naturalHeight || img.height;
  const scale = Math.min(1, maxSize / Math.max(w, h));
  const outW = Math.max(1, Math.round(w * scale));
  const outH = Math.max(1, Math.round(h * scale));

  const canvas = document.createElement('canvas');
  canvas.width = outW;
  canvas.height = outH;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Kanvas tidak didukung browser ini.');
  ctx.drawImage(img, 0, 0, outW, outH);

  return canvas.toDataURL('image/jpeg', quality);
}
