'use client';

import { useRef, useState } from 'react';
import { Upload, Link2, Loader2, X, Plus, ArrowLeft, ArrowRight } from 'lucide-react';
import SafeImage from '@/components/ui/SafeImage';

interface MediaGalleryFieldProps {
  /** nama field FormData — dikirim sebagai banyak nilai (getAll) */
  name: string;
  label: string;
  defaultValue?: string[];
  hint?: string;
}

async function uploadFile(file: File): Promise<string> {
  const fd = new FormData();
  fd.append('file', file);
  const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
  const json = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
  if (!res.ok || !json.url) throw new Error(json.error || 'Gagal mengunggah berkas.');
  return json.url;
}

// Galeri gambar: unggah beberapa berkas sekaligus atau tambah lewat URL.
export default function MediaGalleryField({
  name,
  label,
  defaultValue = [],
  hint,
}: MediaGalleryFieldProps) {
  const [items, setItems] = useState<string[]>(defaultValue.filter(Boolean));
  const [url, setUrl] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  function addUrl() {
    const v = url.trim();
    if (!v) return;
    setItems((prev) => [...prev, v]);
    setUrl('');
  }

  function removeAt(i: number) {
    setItems((prev) => prev.filter((_, idx) => idx !== i));
  }

  function move(i: number, dir: -1 | 1) {
    setItems((prev) => {
      const next = [...prev];
      const j = i + dir;
      if (j < 0 || j >= next.length) return prev;
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  }

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setBusy(true);
    setError('');
    try {
      const urls: string[] = [];
      for (const file of Array.from(files)) {
        urls.push(await uploadFile(file));
      }
      setItems((prev) => [...prev, ...urls]);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Gagal mengunggah.');
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  }

  return (
    <div>
      <label className="mb-1.5 block text-[13px] font-semibold text-stone-700">{label}</label>

      {items.length > 0 && (
        <div className="mb-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {items.map((src, i) => (
            <div key={`${src}-${i}`} className="group relative overflow-hidden rounded-xl border border-stone-200 bg-stone-50">
              <div className="relative aspect-[4/3]">
                <SafeImage src={src} alt={`Galeri ${i + 1}`} fill className="object-cover" />
              </div>
              <div className="absolute inset-x-0 top-0 flex justify-between p-1.5">
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => move(i, -1)}
                    disabled={i === 0}
                    className="grid h-6 w-6 place-items-center rounded-md bg-white/90 text-stone-600 shadow-sm disabled:opacity-30"
                    title="Geser kiri"
                  >
                    <ArrowLeft className="h-3 w-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => move(i, 1)}
                    disabled={i === items.length - 1}
                    className="grid h-6 w-6 place-items-center rounded-md bg-white/90 text-stone-600 shadow-sm disabled:opacity-30"
                    title="Geser kanan"
                  >
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => removeAt(i)}
                  className="grid h-6 w-6 place-items-center rounded-md bg-white/90 text-red-600 shadow-sm"
                  title="Hapus"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={busy}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-dashed border-stone-300 bg-white px-3.5 py-2.5 text-sm font-semibold text-stone-700 transition hover:bg-stone-50 disabled:opacity-60"
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          {busy ? 'Mengunggah…' : 'Unggah gambar'}
        </button>
        <div className="flex flex-1 items-center gap-2 rounded-xl border border-stone-300 bg-white px-3 py-2">
          <Link2 className="h-4 w-4 shrink-0 text-stone-400" />
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addUrl();
              }
            }}
            placeholder="Tambah dari URL…"
            className="w-full bg-transparent text-sm outline-none placeholder:text-stone-400"
          />
          <button
            type="button"
            onClick={addUrl}
            className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-stone-100 px-2 py-1 text-xs font-semibold text-stone-700 hover:bg-stone-200"
          >
            <Plus className="h-3 w-3" /> Tambah
          </button>
        </div>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      {items.map((src, i) => (
        <input key={`hidden-${src}-${i}`} type="hidden" name={name} value={src} />
      ))}

      {hint && <p className="mt-1.5 text-xs text-stone-500">{hint}</p>}
      {error && <p className="mt-1 text-xs font-medium text-red-600">{error}</p>}
    </div>
  );
}
