import type { Metadata } from "next";

import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Νέες μουσικές κυκλοφορίες",
  description:
    "Νέα τραγούδια, άλμπουμ και μουσικές κυκλοφορίες από Έλληνες και διεθνείς καλλιτέχνες.",
  path: "/music/releases",
  image: "/images/menu/music.png",
});

export default function MusicReleasesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
