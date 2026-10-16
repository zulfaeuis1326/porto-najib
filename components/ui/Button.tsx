import React from 'react';
import Link from 'next/link';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const baseStyles =
  'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

const variants: Record<Variant, string> = {
  primary:
    'bg-orange-600 text-white shadow-sm hover:bg-orange-700 hover:shadow active:bg-orange-800 dark:bg-orange-500 dark:hover:bg-orange-400 dark:text-stone-950',
  secondary:
    'bg-stone-900 text-white hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white',
  outline:
    'border border-stone-300 bg-white text-stone-800 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700 dark:border-stone-700 dark:bg-transparent dark:text-stone-200 dark:hover:border-orange-800 dark:hover:bg-stone-900 dark:hover:text-orange-300',
  ghost:
    'text-stone-600 hover:bg-stone-100 hover:text-stone-900 dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-white',
};

const sizes: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

/** Tombol yang bertindak sebagai tautan (navigasi / unduhan). */
interface LinkProps extends CommonProps {
  href: string;
  target?: string;
  rel?: string;
  download?: boolean | string;
  prefetch?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

/** Tombol aksi biasa: submit form atau aksi di dalam halaman. */
type ActionProps = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> & {
    href?: undefined;
  };

export type ButtonProps = LinkProps | ActionProps;

/**
 * PENTING: jangan bungkus <Button> dengan <Link>/<a>.
 * <button> di dalam <a> adalah HTML tidak valid dan membuat klik TIDAK
 * menavigasi. Kirim `href` ke <Button> untuk navigasi.
 */
export default function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', className = '', children } = props;
  const cls = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (typeof (props as LinkProps).href === 'string') {
    const { href, target, rel, download, prefetch, onClick } = props as LinkProps;
    return (
      <Link
        href={href}
        target={target}
        rel={rel}
        download={download}
        prefetch={prefetch}
        onClick={onClick}
        className={cls}
      >
        {children}
      </Link>
    );
  }

  const rest = { ...(props as unknown as Record<string, unknown>) };
  delete rest.variant;
  delete rest.size;
  delete rest.className;
  delete rest.children;

  return (
    <button className={cls} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
