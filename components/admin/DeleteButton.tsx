'use client';

import { useState } from 'react';
import { Trash2 } from 'lucide-react';

interface DeleteButtonProps {
  label: string;
  onDelete: () => Promise<{ error?: string } | void>;
}

// Tombol hapus dengan konfirmasi bawaan browser.
export default function DeleteButton({ label, onDelete }: DeleteButtonProps) {
  const [busy, setBusy] = useState(false);

  async function handleClick() {
    if (!confirm(`Hapus "${label}" secara permanen?`)) return;
    setBusy(true);
    const res = await onDelete();
    if (res && res.error) {
      alert('Gagal menghapus: ' + res.error);
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={busy}
      title={`Hapus ${label}`}
      className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50 dark:text-red-400 dark:hover:bg-red-950"
    >
      <Trash2 className="h-3.5 w-3.5" />
      {busy ? '...' : 'Hapus'}
    </button>
  );
}
