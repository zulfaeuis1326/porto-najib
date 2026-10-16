import React from 'react';
import Link from 'next/link';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const baseStyles =
  'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

const variants: Record<Variant, string> = {
  primary:
    'bg-orange-600 text-white hover:bg-orange-700 active:bg-orange-800 dark:bg-orange-500 dark:hover:bg-orange-400 dark:text-stone-950',
  secondary:
    'bg-slate-200 text-slate-900 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600',
  outline:
    'border-2 border-orange-600 text-orange-700 hover:bg-orange-50 dark:border-orange-500 dark:text-orange-400 dark:hover:bg-orange-950',
  ghost: 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800',
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
