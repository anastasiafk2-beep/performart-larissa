import type { Metadata } from "next";

import CultureDarkTheme from "@/components/layout/CultureDarkTheme";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Βιβλίο — Παρουσιάσεις και προτάσεις",
  description:
    "Βιβλία, συγγραφείς, παρουσιάσεις και αναγνωστικές προτάσεις από το The performART – Larissa.",
  path: "/books",
  image: "/images/menu/book.png",
});

export default function BooksLayout({ children }: { children: React.ReactNode }) {
  return <CultureDarkTheme>{children}</CultureDarkTheme>;
}
