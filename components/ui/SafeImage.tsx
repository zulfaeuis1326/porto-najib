'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface SafeImageProps {
  src?: string | null;
  alt: string;
  className?: string;
  /** isi penuh kontainer induk (perlu parent position: relative) */
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  /** dipanggil saat gambar gagal dimuat (mis. untuk pratinjau di CMS) */
  onFail?: () => void;
}

// Hanya sumber yang benar-benar bisa dirender yang dilewatkan.
// Menolak string acak (mis. path Windows "C:\gambar.png") supaya tidak
// memicu error "Failed to parse src" dari next/image.
export function isRenderableImageSrc(src?: string | null): boolean {
  if (!src) return false;
  const s = String(src).trim();
  if (!s) return false;
  if (s.startsWith('/')) return true; // aset lokal di /public
  if (/^https?:\/\//i.test(s)) return true; // URL jauh
  if (/^data:image\//i.test(s)) return true; // data URL
  return false;
}

function Placeholder({ fill, className }: { fill?: boolean; className?: string }) {
  const base =
    'grid place-items-center bg-stone-100 text-stone-300 dark:bg-stone-800 dark:text-stone-600';
  return (
    <div
      className={
        fill
          ? `absolute inset-0 ${base} ${className || ''}`
          : `flex h-full w-full ${base} ${className || ''}`
      }
    >
      <ImageOff className="h-8 w-8" aria-hidden="true" />
      <span className="sr-only">Gambar tidak tersedia</span>
    </div>
  );
}

// Gambar yang tahan banting: aman terhadap src kosong/salah, gagal muat,
// SVG, dan data URL. Dipakai untuk konten yang diisi lewat CMS.
export default function SafeImage({
  src,
  alt,
  className = '',
  fill,
  width,
  height,
  sizes,
  priority,
  onFail,
}: SafeImageProps) {
  const [failed, setFailed] = useState(false);
  const s = src ? String(src).trim() : '';

  function fail() {
    setFailed(true);
    onFail?.();
  }

  if (!isRenderableImageSrc(s) || failed) {
    return <Placeholder fill={fill} className={className} />;
  }

  const isLocal = s.startsWith('/');
  const isInline = s.startsWith('data:') || /\.svg(\?|#|$)/i.test(s);

  // Aset lokal (/public) -> next/image, agar tetap dioptimalkan.
  // URL dari internet, data URL, dan SVG -> <img> biasa: browser memuat
  // langsung dari sumbernya, sehingga gambar tetap tampil walaupun situs
  // sumber memblokir optimizer gambar Next.js (penyebab "gambar tidak muncul").
  if (!isLocal || isInline) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        // Bila gambar sudah gagal SEBELUM React aktif (HTML dari server),
        // event error tidak akan pernah sampai ke React. Deteksi saat mount.
        ref={(el) => {
          if (el && el.complete && el.naturalWidth === 0) fail();
        }}
        src={s}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        className={`${fill ? 'absolute inset-0 h-full w-full' : ''} ${className}`.trim()}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onError={fail}
      />
    );
  }

  return (
    <Image
      src={s}
      alt={alt}
      fill={fill}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      sizes={sizes}
      priority={priority}
      className={className}
      onError={fail}
    />
  );
}
