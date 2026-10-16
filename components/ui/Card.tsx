import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

// Kartu dasar: hangat, sudut lembut, garis tipis, tanpa gradien.
export default function Card({ children, className = '', hover = false }: CardProps) {
  const hoverStyles = hover
    ? 'hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg dark:hover:border-orange-900/60'
    : '';

  return (
    <div
      className={`rounded-2xl border border-stone-200/80 bg-white shadow-[0_1px_2px_rgba(28,25,23,0.05)] transition-all duration-300 dark:border-stone-800 dark:bg-stone-900 ${hoverStyles} ${className}`}
    >
      {children}
    </div>
  );
}
