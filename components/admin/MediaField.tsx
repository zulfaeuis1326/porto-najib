'use client';

import { useRef, useState } from 'react';
import { Upload, Link2, Loader2, X, ImageIcon, FileText } from 'lucide-react';
import SafeImage from '@/components/ui/SafeImage';
import { fileToCompressedDataUrl } from '@/lib/local-image';

interface MediaFieldProps {
  /** nama field FormData (disimpan sebagai URL) */
  name: string;
  label: string;
  defaultValue?: string;
  /** filter berkas, mis. "image/*" atau "application/pdf,image/*" */
  accept?: string;
  /** tampilan pratinjau */
  kind?: 'image' | 'file';
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

// Kolom gambar/berkas: bisa unggah dari perangkat ATAU tempel URL.
export default function MediaField({
  name,
  label,
  defaultValue = '',
  accept = 'image/*',
  kind = 'image',
  hint,
}: MediaFieldProps) {
  const [value, setValue] = useState(defaultValue || '');
  const [mode, setMode] = useState<'upload' | 'url'>('upload');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFiles(files: FileList | null) {
    const file = files?.[0];
    if (!file) return;
    setBusy(true);
    setError('');
    setNotice('');
    try {
      const url = await uploadFile(file);
      setValue(url);
    } catch (e) {
      // Cadangan: simpan gambar langsung sebagai data URL (tanpa storage cloud).
      if (file.type.startsWith('image/')) {
        try {
          const dataUrl = await fileToCompressedDataUrl(file);
          setValue(dataUrl);
          setNotice('Tersimpan langsung ke database (penyimpanan cloud belum aktif).');
          return;
        } catch {
          /* lanjut ke pesan error di bawah */
        }
      }
      setError(e instanceof Error ? e.message : 'Gagal mengunggah.');
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  }

  return (
    <div>
      <label className="mb-1.5 block text-[13px] font-semibold text-stone-700">{label}</label>

      {/* Pratinjau */}
      <div className="mb-3 flex items-start gap-3">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-stone-200 bg-stone-50">
          {value ? (
            kind === 'image' ? (
              <SafeImage src={value} alt="Pratinjau" fill className="object-cover" />
            ) : (
              <div className="grid h-full w-full place-items-center text-stone-500">
                <FileText className="h-7 w-7" />
              </div>
            )
          ) : (
            <div className="grid h-full w-full place-items-center text-stone-300">
              <ImageIcon className="h-7 w-7" />
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-2 inline-flex rounded-lg border border-stone-200 bg-stone-50 p-0.5 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setMode('upload')}
              className={`rounded-md px-2.5 py-1 transition ${
                mode === 'upload' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500'
              }`}
            >
              Unggah
            </button>
            <button
              type="button"
              onClick={() => setMode('url')}
              className={`rounded-md px-2.5 py-1 transition ${
                mode === 'url' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500'
              }`}
            >
              Pakai URL
            </button>
          </div>

          {mode === 'upload' ? (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragging(false);
                handleFiles(e.dataTransfer.files);
              }}
              onClick={() => fileRef.current?.click()}
              className={`flex cursor-pointer items-center gap-3 rounded-xl border border-dashed px-3.5 py-3 text-sm transition ${
                dragging
                  ? 'border-orange-400 bg-orange-50'
                  : 'border-stone-300 bg-white hover:bg-stone-50'
              }`}
            >
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-orange-50 text-orange-600">
                {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
              </span>
              <span className="min-w-0">
                <span className="block font-semibold text-stone-800">
                  {busy ? 'Mengunggah…' : 'Pilih berkas dari perangkat'}
                </span>
                <span className="block text-xs text-stone-500">
                  {hint || 'atau tarik & lepas ke sini'}
                </span>
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 rounded-xl border border-stone-300 bg-white px-3 py-2">
              <Link2 className="h-4 w-4 shrink-0 text-stone-400" />
              <input
                type="url"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="https://… atau /images/berkas.svg"
                className="w-full bg-transparent text-sm outline-none placeholder:text-stone-400"
              />
            </div>
          )}

          {value && (
            <button
              type="button"
              onClick={() => setValue('')}
              className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-red-600 hover:underline"
            >
              <X className="h-3 w-3" /> Hapus berkas
            </button>
          )}
        </div>
      </div>

      <input ref={fileRef} type="file" accept={accept} className="hidden" onChange={(e) => handleFiles(e.target.files)} />
      <input type="hidden" name={name} value={value} />

      {notice && <p className="mt-1 text-xs font-medium text-amber-600">{notice}</p>}
      {error && <p className="mt-1 text-xs font-medium text-red-600">{error}</p>}
    </div>
  );
}
