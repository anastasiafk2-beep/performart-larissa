import type { Metadata } from "next";

import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Κριτικές κινηματογράφου",
  description:
    "Κριτικές ταινιών, κινηματογραφικές απόψεις και προτάσεις για όσα προβάλλονται στη μεγάλη οθόνη.",
  path: "/cinema/reviews",
  image: "/images/cinema/reviews/review-devil-wears-prada.png",
});

export default function CinemaReviewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
