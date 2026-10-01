import type { Metadata } from "next";

import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Καλλιτέχνες της μουσικής",
  description:
    "Πρόσωπα και συγκροτήματα της μουσικής σκηνής, παρουσιάσεις και χρήσιμες πληροφορίες για το έργο τους.",
  path: "/music/artists",
  image: "/images/menu/music.png",
});

export default function MusicArtistsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
