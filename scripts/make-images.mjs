// Generate placeholder lokal: cover SVG + CV PDF minimal.
// Jalankan: node scripts/make-images.mjs
import { writeFileSync, mkdirSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
mkdirSync(join(root, 'public', 'images'), { recursive: true });
mkdirSync(join(root, 'public', 'cv'), { recursive: true });

function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Darken hex color by factor 0..1
function shade(hex, f) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.round(((n >> 16) & 255) * f);
  const g = Math.round(((n >> 8) & 255) * f);
  const b = Math.round((n & 255) * f);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

function coverSVG({ w, h, bg, label, sub }) {
  const dark = shade(bg, 0.72);
  const fs = Math.round(w * 0.062);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${bg}"/>
      <stop offset="1" stop-color="${dark}"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>
  <circle cx="${Math.round(w * 0.85)}" cy="${Math.round(h * 0.12)}" r="${Math.round(w * 0.28)}" fill="#ffffff" opacity="0.08"/>
  <circle cx="${Math.round(w * 0.08)}" cy="${Math.round(h * 0.95)}" r="${Math.round(w * 0.2)}" fill="#ffffff" opacity="0.06"/>
  <rect x="0" y="${h - 6}" width="${w}" height="6" fill="#ffffff" opacity="0.35"/>
  <text x="${w / 2}" y="${h / 2 - 6}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="${fs}" font-weight="bold" fill="#ffffff">${esc(label)}</text>
  <text x="${w / 2}" y="${h / 2 + fs * 0.75}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="${Math.round(fs * 0.42)}" fill="#ffffff" opacity="0.75">${esc(sub)}</text>
</svg>
`;
}

const covers = [
  // [file, w, h, bg, label, sub]
  ['profile.svg', 500, 500, '#3b82f6', 'N', 'Najib'],
  ['project-ecommerce.svg', 800, 600, '#3b82f6', 'E-Commerce Dashboard', 'portfolio project'],
  ['project-ecommerce-2.svg', 800, 600, '#3b82f6', 'Dashboard View', 'portfolio project'],
  ['project-ecommerce-3.svg', 800, 600, '#3b82f6', 'Products Page', 'portfolio project'],
  ['project-task.svg', 800, 600, '#8b5cf6', 'Task Management', 'portfolio project'],
  ['project-task-2.svg', 800, 600, '#8b5cf6', 'Kanban Board', 'portfolio project'],
  ['project-blog.svg', 800, 600, '#ec4899', 'Blog Platform', 'portfolio project'],
  ['project-blog-2.svg', 800, 600, '#ec4899', 'Article View', 'portfolio project'],
  ['project-weather.svg', 800, 600, '#10b981', 'Weather App', 'portfolio project'],
  ['project-cms.svg', 800, 600, '#f59e0b', 'Portfolio CMS', 'portfolio project'],
  ['article-nextjs.svg', 800, 600, '#3b82f6', 'Next.js Tutorial', 'artikel'],
  ['article-darkmode.svg', 800, 600, '#1e293b', 'Dark Mode', 'artikel'],
  ['article-performance.svg', 800, 600, '#10b981', 'Performance', 'artikel'],
  ['article-comparison.svg', 800, 600, '#ec4899', 'Comparison', 'artikel'],
  ['article-typescript.svg', 800, 600, '#3178c6', 'TypeScript', 'artikel'],
];

for (const [file, w, h, bg, label, sub] of covers) {
  writeFileSync(join(root, 'public', 'images', file), coverSVG({ w, h, bg, label, sub }));
  console.log('wrote public/images/' + file);
}

// ---- CV PDF minimal (1 halaman, Helvetica) ----
function buildPdf(lines) {
  // lines: [{text, size, gap}]
  let y = 770;
  let content = 'BT\n';
  for (const { text, size, gap, bold } of lines) {
    const t = text.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
    content += `/F${bold ? 'B' : '1'} ${size} Tf 72 ${y} Td (${t}) Tj\n`;
    y -= gap;
  }
  content += 'ET\n';

  const objs = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /FB 6 0 R >> >> >>',
    `<< /Length ${Buffer.byteLength(content, 'latin1')} >>\nstream\n${content}endstream`,
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>',
  ];

  let out = '%PDF-1.4\n';
  const offsets = [0];
  objs.forEach((body, i) => {
    offsets.push(Buffer.byteLength(out, 'latin1'));
    out += `${i + 1} 0 obj\n${body}\nendobj\n`;
  });
  const xrefPos = Buffer.byteLength(out, 'latin1');
  out += `xref\n0 ${objs.length + 1}\n`;
  out += '0000000000 65535 f \n';
  for (let i = 1; i <= objs.length; i++) {
    out += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
  }
  out += `trailer\n<< /Size ${objs.length + 1} /Root 1 0 R >>\nstartxref\n${xrefPos}\n%%EOF`;
  return out;
}

const cv = buildPdf([
  { text: 'Najib', size: 26, gap: 34, bold: true },
  { text: 'Full Stack Developer & Technical Writer', size: 13, gap: 26, bold: false },
  { text: 'Jakarta, Indonesia | najib@example.com', size: 11, gap: 30, bold: false },
  { text: 'Ringkasan', size: 15, gap: 22, bold: true },
  { text: 'Full Stack Developer yang fokus membangun aplikasi web modern', size: 11, gap: 16, bold: false },
  { text: 'dengan Next.js, TypeScript, dan Supabase.', size: 11, gap: 28, bold: false },
  { text: 'Keahlian', size: 15, gap: 22, bold: true },
  { text: 'Next.js - React - TypeScript - TailwindCSS - Supabase - PostgreSQL', size: 11, gap: 28, bold: false },
  { text: 'Pengalaman', size: 15, gap: 22, bold: true },
  { text: 'Frontend Developer - membangun company profile dan landing page.', size: 11, gap: 16, bold: false },
  { text: 'Full Stack Developer - dashboard admin dan aplikasi realtime.', size: 11, gap: 16, bold: false },
]);

const pdfPath = join(root, 'public', 'cv', 'najib-cv.pdf');
writeFileSync(pdfPath, cv, 'latin1');
console.log('wrote public/cv/najib-cv.pdf');

// ---- Validasi PDF: cek xref offsets menunjuk ke objek yang benar ----
const buf = readFileSync(pdfPath, 'latin1');
const startxref = Number(buf.slice(buf.lastIndexOf('startxref') + 9).trim().split('\n')[0]);
const xrefSection = buf.slice(startxref);
const entryLines = xrefSection.split('\n').slice(2); // lewati "xref" dan "0 N"
let ok = true;
for (let i = 1; i <= 6; i++) {
  // entryLines[0] = objek bebas "0", jadi objek N ada di indeks N
  const off = Number(entryLines[i].slice(0, 10));
  const at = buf.slice(off, off + 20);
  if (!at.startsWith(`${i} 0 obj`)) {
    console.error(`INVALID xref entry ${i}: offset ${off} -> ${JSON.stringify(at)}`);
    ok = false;
  }
}
if (!buf.trimEnd().endsWith('%%EOF')) {
  console.error('INVALID: missing %%EOF');
  ok = false;
}
console.log(ok ? 'PDF valid: semua xref entry benar + %%EOF OK' : 'PDF INVALID');
if (!ok) process.exit(1);
