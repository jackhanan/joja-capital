import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { getAllContent } from "@/lib/content";

export const runtime = "edge";
export const dynamic = "force-dynamic";

const headlineFont = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-headline",
  display: "swap",
});

const bodyFont = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const { hero } = await getAllContent();
  return {
    title: `${hero.companyName} | ${hero.tagline}`,
    description: hero.subheading,
    icons: {
      icon: "/favicon.jpeg",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${headlineFont.variable} ${bodyFont.variable} antialiased bg-white text-slate-900 font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
