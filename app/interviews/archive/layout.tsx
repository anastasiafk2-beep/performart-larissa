import type { Metadata } from "next";

import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Αρχείο συνεντεύξεων",
  description:
    "Όλες οι συνεντεύξεις του The performART – Larissa με καλλιτέχνες, δημιουργούς και ανθρώπους του πολιτισμού.",
  path: "/interviews/archive",
  image: "/images/menu/interviews.png",
});

export default function InterviewsArchiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
