import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/components/layout/SiteChrome";
import { SITE_URL } from "@/lib/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Najib - Full Stack Developer & Technical Writer",
  description: "Portfolio website Najib - Full Stack Developer yang passionate dalam membangun aplikasi web modern dan berbagi pengetahuan melalui artikel teknis.",
  keywords: ["portfolio", "full stack developer", "web development", "Next.js", "React"],
  authors: [{ name: "Najib" }],
  robots: { index: true, follow: true },
  openGraph: {
    title: "Najib - Full Stack Developer",
    description: "Portfolio dan blog seputar web development",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${inter.variable} ${jakarta.variable} font-sans bg-[#FAF7F2] text-stone-900 dark:bg-stone-950 dark:text-stone-100 antialiased`}>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
