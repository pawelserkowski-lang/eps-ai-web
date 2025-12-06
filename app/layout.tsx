import type { Metadata } from "next";
import "./globals.css";
import { SanityLive } from "@/sanity/lib/live";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  title: "EPS AI Solutions",
  description: "Arcane Intelligence for the New Age",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-mono antialiased bg-cyber-black text-cyber-green">
        <div className="scanlines" />
        {children}
        <SanityLive />
      </body>
    </html>
  );
}
