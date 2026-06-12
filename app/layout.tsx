import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClientProviders } from "@/components/providers/ClientProviders";
import { Navigation, Footer } from "@/components/layout/Navigation";
import { ScrollBackground } from "@/components/three/ScrollBackground";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE } from "@/lib/constants";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: SITE.title,
  description: SITE.description,
  keywords: [
    "AI Engineer",
    "Full Stack Developer",
    "Machine Learning",
    "FinTech",
    "Product Builder",
    "Mayank Poojary",
    "Navi Mumbai",
    "LLM",
    "Agentic AI",
  ],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE.url,
    title: SITE.title,
    description: SITE.description,
    siteName: SITE.name,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark`}>
      <head>
        <JsonLd />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ClientProviders>
          <ScrollBackground />
          <Navigation />
          <main className="relative z-10">{children}</main>
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
