import { MailOpen, Mail, Trash2 } from 'lucide-react';
import { supabaseAdmin, isServiceConfigured } from '@/lib/supabase';
import DeleteButton from '@/components/admin/DeleteButton';
import DbNotice from '@/components/admin/DbNotice';
import { setMessageRead, deleteMessage } from '@/lib/admin-actions';

export const metadata = { title: 'Pesan Masuk', robots: { index: false, follow: false } };

interface Msg {
  id: string;
  name: string;
  email: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export default async function AdminInbox() {
  if (!isServiceConfigured) return <DbNotice />;
  const { data } = await supabaseAdmin().from('messages').select('*').order('created_at', { ascending: false });
  const messages = ((data || []) as Record<string, unknown>[]).map((r) => ({
    id: String(r.id),
    name: String(r.name || ''),
    email: String(r.email || ''),
    message: String(r.message || ''),
    is_read: r.is_read === true,
    created_at: String(r.created_at || ''),
  })) as Msg[];
  const unread = messages.filter((m) => !m.is_read).length;

  return (
    <div className="space-y-6">
      <div>
        <p className="eyebrow">Admin Panel</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Pesan Masuk ({messages.length}{unread > 0 ? ` · ${unread} belum dibaca` : ''})
        </h1>
      </div>

      {messages.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
          Belum ada pesan masuk dari form kontak.
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`rounded-2xl border p-5 transition-colors ${
                m.is_read
                  ? 'border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800'
                  : 'border-orange-300 bg-orange-50 dark:border-orange-900 dark:bg-orange-950/40'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-semibold">
                  {m.name} <span className="font-normal text-slate-500">· {m.email}</span>
                </p>
                <span className="text-xs text-slate-400">
                  {m.created_at ? new Date(m.created_at).toLocaleString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : ''}
                </span>
              </div>
              <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                {m.message}
              </p>
              <div className="mt-3 flex gap-2">
                <form action={setMessageRead.bind(null, m.id, !m.is_read)}>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
                  >
                    {m.is_read ? <Mail className="h-3.5 w-3.5" /> : <MailOpen className="h-3.5 w-3.5" />}
                    {m.is_read ? 'Tandai belum dibaca' : 'Tandai dibaca'}
                  </button>
                </form>
                <a
                  href={`mailto:${m.email}?subject=Re: Pesan dari portfolio`}
                  className="inline-flex items-center rounded-lg px-2.5 py-1.5 text-xs font-medium text-orange-600 transition-colors hover:bg-orange-50 dark:text-orange-400 dark:hover:bg-orange-950"
                >
                  Balas via email
                </a>
                <span className="inline-flex items-center">
                  <Trash2 className="hidden h-3.5 w-3.5" />
                  <DeleteButton label={`pesan dari ${m.name}`} onDelete={deleteMessage.bind(null, m.id)} />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
