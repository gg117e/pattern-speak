import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Inter, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const notoSansJp = Noto_Sans_JP({ subsets: ["latin"], variable: "--font-noto-sans-jp", display: "swap" });

export const metadata: Metadata = {
  title: "Pattern Speak",
  description: "TOEIC 600 learners' English speaking pattern practice app"
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className={`${inter.variable} ${notoSansJp.variable}`}>
      <body className="font-sans">
        <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-4 pb-8 pt-4 sm:px-6">
          <header className="mb-5 flex items-center justify-between gap-3 rounded-lg border border-line bg-white/80 px-4 py-3 shadow-soft backdrop-blur">
            <Link href="/" className="focus-ring rounded-md text-base font-bold text-ink sm:text-lg">Pattern Speak</Link>
            <nav className="flex items-center gap-1 text-sm font-semibold sm:gap-2">
              <Link className="focus-ring rounded-md px-2 py-2 text-ink/75 hover:text-ink" href="/practice">Practice</Link>
              <Link className="focus-ring rounded-md px-2 py-2 text-ink/75 hover:text-ink" href="/vocab">Vocab</Link>
              <Link className="focus-ring rounded-md px-2 py-2 text-ink/75 hover:text-ink" href="/review">Review</Link>
              <Link className="focus-ring rounded-md px-2 py-2 text-ink/75 hover:text-ink" href="/stats">Stats</Link>
            </nav>
          </header>
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
