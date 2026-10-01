import type { Metadata } from "next";

import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Αρχείο φεστιβάλ",
  description:
    "Ανακαλύψτε προηγούμενα φεστιβάλ, προγράμματα και στιγμές πολιτισμού από τη Λάρισα και τη Θεσσαλία.",
  path: "/festivals/archive",
  image: "/images/menu/festivals.png",
});

export default function FestivalsArchiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
