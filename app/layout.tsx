import type { Metadata } from "next";
import { Inter, UnifrakturMaguntia } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const maguntia = UnifrakturMaguntia({ 
  weight: "400", 
  subsets: ["latin"],
  variable: "--font-serif" 
});

export const metadata: Metadata = {
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
      <body className={`${inter.variable} ${maguntia.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}