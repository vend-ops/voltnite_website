import type { Metadata } from "next";
import localFont from "next/font/local";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/constants";
import "./globals.css";

const inter = localFont({ src: "./fonts/inter-latin-wght-normal.woff2", variable: "--font-inter", display: "swap", weight: "100 900" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Voltnite | Intelligent Hardware & Software", template: "%s | Voltnite" },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "en_IN", url: SITE_URL, siteName: SITE_NAME, title: "Voltnite | Intelligent Hardware & Software", description: SITE_DESCRIPTION, images: [{ url: "/images/voltnite-controller-hero-branded.webp", width: 641, height: 348, alt: "Voltnite IoT controller reference illustration with the supplied brand logo" }] },
  twitter: { card: "summary_large_image" },
  icons: {
    icon: [
      { url: "/brand/voltnite-icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/voltnite-icon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/brand/voltnite-icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: { url: "/brand/voltnite-icon-180.png", sizes: "180x180", type: "image/png" },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-scroll-behavior="smooth" className={inter.variable}><body><a href="#main-content" className="skip-link">Skip to content</a><Header />{children}<Footer /></body></html>;
}
