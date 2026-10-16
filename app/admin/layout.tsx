import AdminShell from '@/components/admin/AdminShell';
import { getSession } from '@/lib/session';

export const metadata = {
  title: 'Admin - Portfolio Najib',
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  const username = session.admin?.username || 'Admin';

  return <AdminShell username={username}>{children}</AdminShell>;
}
