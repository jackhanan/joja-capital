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

const SITE_URL = "https://jojacapital.com";

export async function generateMetadata(): Promise<Metadata> {
  const { hero } = await getAllContent();
  const title = `${hero.companyName} | Commercial Real Estate Financing`;
  // Pulled from D1 (hero.subheading) rather than hardcoded, so it stays in
  // sync if that content is edited from /studio.
  const description = hero.subheading;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    icons: {
      icon: "/favicon.jpg",
    },
    openGraph: {
      title,
      description,
      url: "/",
      siteName: hero.companyName,
      type: "website",
      images: [{ url: "/joja-logo.png", width: 634, height: 282, alt: hero.companyName }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/joja-logo.png"],
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
