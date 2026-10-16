import { NextResponse, type NextRequest } from 'next/server';
import { unsealData } from 'iron-session';

// Lindungi /admin*: tanpa session admin -> lempar ke /login.
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (!pathname.startsWith('/admin')) return NextResponse.next();

  const raw = req.cookies.get('porto_admin_session')?.value;
  const secret = process.env.SESSION_SECRET || '';
  if (raw && secret.length >= 32) {
    try {
      const data = (await unsealData(raw, { password: secret })) as unknown as Record<string, unknown>;
      if (data && data.admin) return NextResponse.next();
    } catch {
      // cookie rusak/kadaluarsa -> redirect login
    }
  }

  const url = req.nextUrl.clone();
  url.pathname = '/login';
  url.searchParams.set('next', pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/admin/:path*'],
};
