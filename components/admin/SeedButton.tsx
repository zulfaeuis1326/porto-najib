'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { Download } from 'lucide-react';
import { importDefaultSkills, importDefaultExperiences } from '@/lib/admin-actions';
import { btnOutline } from '@/components/admin/ui';

function Btn() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={btnOutline}>
      <Download className="h-4 w-4" />
      {pending ? 'Mengimpor…' : 'Impor data contoh'}
    </button>
  );
}

// Tombol untuk mengisi tabel yang masih kosong dengan data contoh lokal.
export default function SeedButton({ kind }: { kind: 'skills' | 'experiences' }) {
  const action = kind === 'skills' ? importDefaultSkills : importDefaultExperiences;
  const [state, formAction] = useFormState(action, null);

  return (
    <form action={formAction} className="mt-4 flex flex-col items-center">
      <Btn />
      {state?.error && <p className="mt-2 text-xs text-red-600">{state.error}</p>}
    </form>
  );
}
