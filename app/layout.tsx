import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/components/layout/SiteChrome";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Najib - Full Stack Developer & Technical Writer",
  description: "Portfolio website Najib - Full Stack Developer yang passionate dalam membangun aplikasi web modern dan berbagi pengetahuan melalui artikel teknis.",
  keywords: ["portfolio", "full stack developer", "web development", "Next.js", "React"],
  authors: [{ name: "Najib" }],
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
      <body className={`${inter.className} bg-[#FAF7F2] text-stone-900 dark:bg-stone-950 dark:text-stone-100 antialiased`}>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
