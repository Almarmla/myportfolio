import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import { profile } from "@/data/profile";
import {
  siteDescription,
  siteName,
  siteOgImage,
  siteTitle,
  siteUrl,
} from "@/lib/site";
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
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${profile.name}`,
  },
  description: siteDescription,
  applicationName: siteName,
  authors: [{ name: profile.name }],
  creator: profile.name,
  keywords: [
    profile.name,
    "IT student",
    "software developer",
    "web developer",
    profile.location,
    "Masvingo Polytechnic",
    "portfolio",
    "community software",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName,
    title: siteTitle,
    description: siteDescription,
    images: [siteOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [siteOgImage],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <a
            href="#main-content"
            className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition-transform focus:translate-y-0 focus:outline-2 focus:outline-offset-2 focus:outline-emerald-600"
          >
            Skip to content
          </a>
          {children}
          <Footer />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
