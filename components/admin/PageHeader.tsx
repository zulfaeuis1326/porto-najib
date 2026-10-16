import type { ReactNode } from 'react';

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}

// Kepala halaman admin yang konsisten di semua halaman.
export default function PageHeader({ eyebrow = 'Admin Panel', title, description, actions }: PageHeaderProps) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-orange-600">{eyebrow}</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-stone-900">{title}</h1>
        {description && <p className="mt-1.5 text-sm text-stone-500">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}
