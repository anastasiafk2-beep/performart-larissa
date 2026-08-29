import type { Metadata } from "next";
import { Geist, Manrope } from "next/font/google";

import "./globals.css";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import { Cormorant_Garamond } from "next/font/google";

import { Instrument_Serif, Source_Serif_4 } from "next/font/google";

import { Forum } from "next/font/google";
import ScrollToTop from "@/components/ScrollToTop";

import BackgroundPattern from "@/components/background/BackgroundPattern";

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
  subsets: ["latin", "greek"],
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
  title: {
    default: "The PerformArt Larissa",
    template: "%s | The PerformArt Larissa",
  },
  description:
    "Ό,τι συμβαίνει στον πολιτισμό της Λάρισας. Εκδηλώσεις, συνεντεύξεις, αφιερώματα, φεστιβάλ και πολιτιστικές δράσεις.",
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

  <BackgroundPattern variant="cinema" />

  <div className="relative z-10">
    <Header />

    <main className="relative min-h-screen">
      <ScrollToTop />
      {children}
    </main>

    <Footer />
  </div>

</body>
    </html>
  );
}