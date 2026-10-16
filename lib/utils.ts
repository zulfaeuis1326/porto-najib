// Helper untuk menggabungkan className
export function cn(...inputs: string[]) {
  return inputs.filter(Boolean).join(' ');
}

// Format tanggal ke bahasa Indonesia
export function formatDate(date: string): string {
  const d = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  return d.toLocaleDateString('id-ID', options);
}

// Hitung durasi (untuk pengalaman)
export function calculateDuration(startDate: string, endDate?: string): string {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  
  const months = (end.getFullYear() - start.getFullYear()) * 12 + 
                 (end.getMonth() - start.getMonth());
  
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  
  if (years === 0) {
    return `${remainingMonths} bulan`;
  } else if (remainingMonths === 0) {
    return `${years} tahun`;
  } else {
    return `${years} tahun ${remainingMonths} bulan`;
  }
}

// Generate slug dari string
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
