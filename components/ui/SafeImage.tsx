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
    'grid place-items-center bg-stone-100 text-stone-300 dark:bg-slate-800 dark:text-slate-600';
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
}: SafeImageProps) {
  const [failed, setFailed] = useState(false);
  const s = src ? String(src).trim() : '';

  if (!isRenderableImageSrc(s) || failed) {
    return <Placeholder fill={fill} className={className} />;
  }

  const isInline = s.startsWith('data:') || /\.svg(\?|#|$)/i.test(s);

  if (isInline) {
    // SVG & data URL: biarkan browser memuat langsung (tanpa optimizer).
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={s}
        alt={alt}
        className={className}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onError={() => setFailed(true)}
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
      onError={() => setFailed(true)}
    />
  );
}
