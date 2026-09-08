import type { Metadata } from "next";
import { Geist, Manrope } from "next/font/google";

import "./globals.css";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import { Cormorant_Garamond } from "next/font/google";

import { Instrument_Serif, Source_Serif_4 } from "next/font/google";

import { Forum } from "next/font/google";
import ScrollToTop from "@/components/ScrollToTop";

import CookieConsent from "@/components/cookies/CookieConsent";

import BackgroundPattern from "@/components/background/BackgroundPattern";
import JsonLd from "@/components/seo/JsonLd";
import {
  DEFAULT_OG_IMAGE,
  ORGANIZATION_ID,
  SITE_ALTERNATE_NAME,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  WEBSITE_ID,
  absoluteUrl,
} from "@/lib/seo";

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-source-serif",
});


const forum = Forum({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-forum",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: SITE_URL,
  title: {
    default: `${SITE_NAME} | Πολιτισμός και Τέχνη`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: "/" }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Πολιτισμός και τέχνη",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "el_GR",
    url: "/",
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Πολιτισμός και Τέχνη`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1536,
        height: 1024,
        alt: `${SITE_NAME} — Πολιτισμός και τέχνη στη Λάρισα`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Πολιτισμός και Τέχνη`,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? {
        google: process.env.GOOGLE_SITE_VERIFICATION,
      }
    : undefined,
  icons: {
    icon: [{ url: "/logos/favicon.png", type: "image/png" }],
    apple: [{ url: "/logos/favicon.png", type: "image/png" }],
  },
};

const globalStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: SITE_NAME,
      alternateName: SITE_ALTERNATE_NAME,
      url: SITE_URL.toString(),
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/logos/logo-black.png"),
        width: 1536,
        height: 1024,
      },
      email: "performart.lar@gmail.com",
      areaServed: {
        "@type": "City",
        name: "Λάρισα",
      },
      sameAs: [
        "https://www.instagram.com/performart_larissa/",
        "https://www.tiktok.com/@performart_larissa",
      ],
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: SITE_URL.toString(),
      name: SITE_NAME,
      alternateName: SITE_ALTERNATE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: "el-GR",
      publisher: {
        "@id": ORGANIZATION_ID,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="el"
      className={`${geist.variable} ${manrope.variable} h-full scroll-smooth`}
    >
     <body className="relative min-h-screen bg-black text-white">

  <JsonLd data={globalStructuredData} />

  <BackgroundPattern />

  <div className="relative z-10">
    <Header />

    <main className="relative">
      <ScrollToTop />
      {children}
    </main>

    <Footer />
    <CookieConsent />
  </div>

</body>
    </html>
  );
}
