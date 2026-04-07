import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mio Dios",
  description:
    "A mobile-first prototype for rhythm, release, and cosmic alignment.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full overflow-hidden antialiased`}>
      <body className="h-full min-h-0 overflow-hidden bg-slate-950 text-stone-100">
        {children}
      </body>
    </html>
  );
}
