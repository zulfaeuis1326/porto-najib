import { MailOpen, Mail } from 'lucide-react';
import { supabaseAdmin, isServiceConfigured } from '@/lib/supabase';
import DeleteButton from '@/components/admin/DeleteButton';
import DbNotice from '@/components/admin/DbNotice';
import PageHeader from '@/components/admin/PageHeader';
import { setMessageRead, deleteMessage } from '@/lib/admin-actions';
import { btnGhost } from '@/components/admin/ui';

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
    <div>
      <PageHeader
        title="Pesan Masuk"
        description={`${messages.length} pesan${unread > 0 ? ` · ${unread} belum dibaca` : ''}`}
      />

      {messages.length === 0 ? (
        <div className="rounded-2xl border border-stone-200 bg-white p-12 text-center text-sm text-stone-500">
          Belum ada pesan masuk dari form kontak.
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`rounded-2xl border p-5 transition-colors ${
                m.is_read ? 'border-stone-200 bg-white' : 'border-orange-300 bg-orange-50/60'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="flex items-center gap-2 font-semibold text-stone-800">
                  {!m.is_read && <span className="h-2 w-2 rounded-full bg-orange-500" />}
                  {m.name}
                  <span className="font-normal text-stone-500">· {m.email}</span>
                </p>
                <span className="text-xs tabular-nums text-stone-400">
                  {m.created_at
                    ? new Date(m.created_at).toLocaleString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : ''}
                </span>
              </div>
              <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-stone-700">{m.message}</p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <form action={setMessageRead.bind(null, m.id, !m.is_read)}>
                  <button type="submit" className={btnGhost}>
                    {m.is_read ? <Mail className="h-3.5 w-3.5" /> : <MailOpen className="h-3.5 w-3.5" />}
                    {m.is_read ? 'Tandai belum dibaca' : 'Tandai dibaca'}
                  </button>
                </form>
                <a
                  href={`mailto:${m.email}?subject=Re: Pesan dari portfolio`}
                  className="inline-flex items-center rounded-lg px-2.5 py-1.5 text-xs font-medium text-orange-600 transition hover:bg-orange-100"
                >
                  Balas via email
                </a>
                <DeleteButton label={`pesan dari ${m.name}`} onDelete={deleteMessage.bind(null, m.id)} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
