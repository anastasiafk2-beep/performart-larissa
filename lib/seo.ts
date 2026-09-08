import type { Metadata } from "next";

export const SITE_NAME = "The performART – Larissa";
export const SITE_ALTERNATE_NAME = "The performART Larissa";
export const SITE_DESCRIPTION =
  "Ό,τι συμβαίνει στον πολιτισμό της Λάρισας: εκδηλώσεις, μουσική, κινηματογράφος, βιβλίο, συνεντεύξεις, φεστιβάλ και απόψεις.";
export const DEFAULT_OG_IMAGE = "/images/heroo.jpg";

function getSiteUrl() {
  const configuredUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    "performart-larissa.vercel.app";

  const urlWithProtocol = /^https?:\/\//i.test(configuredUrl)
    ? configuredUrl
    : `https://${configuredUrl}`;

  try {
    const url = new URL(urlWithProtocol);
    url.pathname = "/";
    url.search = "";
    url.hash = "";
    return url;
  } catch {
    return new URL("https://performart-larissa.vercel.app");
  }
}

export const SITE_URL = getSiteUrl();
export const ORGANIZATION_ID = `${SITE_URL.toString()}#organization`;
export const WEBSITE_ID = `${SITE_URL.toString()}#website`;

export function absoluteUrl(pathOrUrl: string) {
  return new URL(pathOrUrl, SITE_URL).toString();
}

export function toSeoDescription(
  value: string | undefined,
  fallback = SITE_DESCRIPTION,
  maxLength = 160,
) {
  const normalized = (value || fallback).replace(/\s+/g, " ").trim();

  if (normalized.length <= maxLength) return normalized;

  const shortened = normalized.slice(0, maxLength - 1);
  const lastSpace = shortened.lastIndexOf(" ");

  return `${shortened.slice(0, Math.max(lastSpace, maxLength - 25))}…`;
}

type PageMetadataOptions = {
  title: string;
  description?: string;
  path: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  noIndex?: boolean;
};

export function createPageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  imageAlt,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const seoDescription = toSeoDescription(description);
  const socialTitle =
    title.includes(SITE_NAME) || title.includes(SITE_ALTERNATE_NAME)
      ? title
      : `${title} | ${SITE_NAME}`;

  return {
    title: {
      absolute: socialTitle,
    },
    description: seoDescription,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: socialTitle,
      description: seoDescription,
      url: path,
      siteName: SITE_NAME,
      locale: "el_GR",
      type,
      publishedTime: type === "article" ? publishedTime : undefined,
      modifiedTime: type === "article" ? modifiedTime : undefined,
      authors: type === "article" ? authors : undefined,
      images: [
        {
          url: image,
          alt: imageAlt || title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: seoDescription,
      images: [image],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
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
  };
}

type BreadcrumbItem = {
  name: string;
  path: string;
};

export function createBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

type ArticleJsonLdOptions = {
  headline: string;
  description?: string;
  path: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
  section?: string;
};

export function createArticleJsonLd({
  headline,
  description,
  path,
  image,
  datePublished,
  dateModified,
  authorName,
  section,
}: ArticleJsonLdOptions) {
  const url = absoluteUrl(path);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    mainEntityOfPage: url,
    headline,
    description: toSeoDescription(description),
    image: image ? [absoluteUrl(image)] : [absoluteUrl(DEFAULT_OG_IMAGE)],
    datePublished,
    dateModified: dateModified || datePublished,
    inLanguage: "el-GR",
    articleSection: section,
    author: authorName
      ? {
          "@type": "Person",
          name: authorName,
        }
      : {
          "@id": ORGANIZATION_ID,
        },
    publisher: {
      "@id": ORGANIZATION_ID,
    },
    isPartOf: {
      "@id": WEBSITE_ID,
    },
  };
}

type EventJsonLdOptions = {
  name: string;
  description?: string;
  path: string;
  startDate?: string;
  endDate?: string;
  image?: string;
  venue?: string;
  locality?: string;
};

export function createEventJsonLd({
  name,
  description,
  path,
  startDate,
  endDate,
  image,
  venue,
  locality,
}: EventJsonLdOptions) {
  const url = absoluteUrl(path);

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    "@id": `${url}#event`,
    name,
    description: toSeoDescription(description),
    url,
    image: image ? [absoluteUrl(image)] : [absoluteUrl(DEFAULT_OG_IMAGE)],
    startDate,
    endDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: venue
      ? {
          "@type": "Place",
          name: venue,
          address: {
            "@type": "PostalAddress",
            addressLocality: locality || "Λάρισα",
            addressCountry: "GR",
          },
        }
      : undefined,
    mainEntityOfPage: url,
  };
}

export function eventDateTime(date: string | undefined, time?: string) {
  if (!date) return undefined;

  const normalizedTime = time?.match(/^\d{1,2}:\d{2}/)?.[0];

  return normalizedTime
    ? `${date}T${normalizedTime.padStart(5, "0")}:00`
    : date;
}
