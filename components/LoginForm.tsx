'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { loginAction, type ActionResult } from '@/lib/auth-actions';

const initialState: ActionResult = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-lg bg-orange-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-orange-700 disabled:opacity-60 dark:bg-orange-500 dark:text-stone-950 dark:hover:bg-orange-400"
    >
      {pending ? 'Memeriksa...' : 'Masuk Dashboard'}
    </button>
  );
}

export default function LoginForm() {
  const [state, action] = useFormState(loginAction, initialState);

  return (
    <form action={action} className="space-y-5">
      <div>
        <label htmlFor="username" className="mb-2 block text-sm font-medium">
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          required
          placeholder="Username admin"
          className="w-full rounded-lg border border-stone-300 bg-white px-4 py-2.5 transition-all focus:border-transparent focus:ring-2 focus:ring-orange-500 dark:border-stone-600 dark:bg-stone-800"
        />
      </div>
      <div>
        <label htmlFor="password" className="mb-2 block text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          placeholder="Password admin"
          className="w-full rounded-lg border border-stone-300 bg-white px-4 py-2.5 transition-all focus:border-transparent focus:ring-2 focus:ring-orange-500 dark:border-stone-600 dark:bg-stone-800"
        />
      </div>

      {state?.error && (
        <div role="alert" className="rounded-lg bg-red-100 p-4 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-400">
          {state.error}
        </div>
      )}

      <SubmitButton />
    </form>
  );
}
