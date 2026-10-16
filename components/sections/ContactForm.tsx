'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { Send } from 'lucide-react';
import { submitMessage } from '@/lib/admin-actions';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex w-full items-center justify-center rounded-lg bg-orange-600 px-6 py-3 text-lg font-medium text-white transition-all duration-200 hover:bg-orange-700 disabled:opacity-50 dark:bg-orange-500 dark:text-stone-950 dark:hover:bg-orange-400"
    >
      {pending ? (
        'Mengirim...'
      ) : (
        <>
          Kirim Pesan
          <Send className="ml-2 w-5 h-5" />
        </>
      )}
    </button>
  );
}

export default function ContactForm() {
  const [state, action] = useFormState(submitMessage, null);

  return (
    <form action={action} className="space-y-6">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Nama
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          maxLength={100}
          className="w-full px-4 py-2 border border-stone-300 dark:border-stone-600 rounded-lg bg-white dark:bg-stone-800 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
          placeholder="Nama Anda"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          maxLength={150}
          className="w-full px-4 py-2 border border-stone-300 dark:border-stone-600 rounded-lg bg-white dark:bg-stone-800 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
          placeholder="email@example.com"
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Pesan
        </label>
        <textarea
          id="message"
          name="message"
          required
          maxLength={5000}
          rows={5}
          className="w-full px-4 py-2 border border-stone-300 dark:border-stone-600 rounded-lg bg-white dark:bg-stone-800 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
          placeholder="Tulis pesan Anda di sini..."
        />
      </div>

      {/* Submit Button */}
      <SubmitButton />

      {/* Status Messages */}
      {state?.ok && (
        <div className="p-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg text-sm">
          ✓ Pesan berhasil dikirim! Saya akan segera membalas.
        </div>
      )}
      {state?.error && (
        <div className="p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg text-sm">
          ✗ {state.error}
        </div>
      )}
    </form>
  );
}
