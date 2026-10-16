interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'center' | 'left';
}

// Kepala seksi konsisten: label kecil aksen + judul besar + deskripsi.
export default function SectionHeader({ eyebrow, title, description, align = 'center' }: SectionHeaderProps) {
  const alignCls = align === 'center' ? 'text-center mx-auto items-center' : 'text-left items-start';
  return (
    <div className={`flex flex-col gap-3 mb-12 max-w-2xl ${alignCls}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">{title}</h2>
      {description && (
        <p className="text-lg text-stone-600 dark:text-stone-400">{description}</p>
      )}
    </div>
  );
}
