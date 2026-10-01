import type { Metadata } from "next";

import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Πρόγραμμα κινηματογραφικών προβολών στη Λάρισα",
  description:
    "Δείτε το πρόγραμμα προβολών, τις ημερομηνίες και τις ώρες των ταινιών που παίζονται στη Λάρισα.",
  path: "/cinema/screenings",
  image: "/images/menu/cinema.png",
});

export default function CinemaScreeningsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
