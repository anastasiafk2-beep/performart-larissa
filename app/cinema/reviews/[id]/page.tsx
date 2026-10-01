import ContentView from "@/components/analytics/ContentView";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import JsonLd from "@/components/seo/JsonLd";
import { getCinemaReviews } from "@/lib/cinema-reviews-data";
import {
  ORGANIZATION_ID,
  absoluteUrl,
  createBreadcrumbJsonLd,
  createPageMetadata,
} from "@/lib/seo";

const reviews = [
  {
    id: "the-devil-wears-prada",
    title: "THE DEVIL WEARS PRADA",
    excerpt:
      "Η επιστροφή ενός iconic τίτλου που άφησε εποχή. Το sequel του The Devil Wears Prada φέρνει ξανά στη σκηνή τον λαμπερό αλλά σκληρό κόσμο της μόδας, με γνώριμο ρυθμό και έντονο déjà vu. Η Meryl Streep αποδεικνύει για άλλη μια φορά γιατί είναι απολαυστική ως Μιράντα Πρίστλι, όμως η ταινία μένει σε μια επιφανειακή σάτιρα που δεν τολμά να πάει πιο βαθιά. Στιλάτο, γρήγορο, ευχάριστο — αλλά τελικά πιο κοντά στη νοσταλγία παρά σε κάτι πραγματικά νέο. Μπορείς να την απολαύσεις στα Victoria Cinemas.",
    rating: "8/10",
    image: "/images/cinema/reviews/review-devil-wears-prada.png",
  },
];

type Props = {
  params: Promise<{
    id: string;
  }>;
};

async function getReview(id: string) {
  const localReview = reviews.find((item) => item.id === id);

  if (localReview) return localReview;

  const sanityReview = (await getCinemaReviews()).find((item) => item.id === id);

  return sanityReview
    ? {
        id: sanityReview.id,
        title: sanityReview.title,
        excerpt: sanityReview.excerpt,
        rating: sanityReview.rating,
        image: sanityReview.image || "",
        createdAt: sanityReview.createdAt,
      }
    : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const review = await getReview(id);
  const path = `/cinema/reviews/${encodeURIComponent(id)}`;

  if (!review) {
    return createPageMetadata({
      title: "Η κριτική δεν βρέθηκε",
      description: "Η κριτική κινηματογράφου που ζητήσατε δεν είναι διαθέσιμη.",
      path,
      noIndex: true,
    });
  }

  return createPageMetadata({
    title: `Κριτική: ${review.title}`,
    description: review.excerpt,
    path,
    image: review.image || undefined,
    imageAlt: review.title,
    type: "article",
    publishedTime: "createdAt" in review ? review.createdAt : undefined,
  });
}

export default async function ReviewPage({ params }: Props) {
  const { id } = await params;
  const review = await getReview(id);

  if (!review) {
    notFound();
  }

  const path = `/cinema/reviews/${encodeURIComponent(review.id)}`;
  const ratingValue = Number.parseFloat(review.rating.replace(",", "."));
  const reviewStructuredData = {
    "@context": "https://schema.org",
    "@type": "Review",
    "@id": `${absoluteUrl(path)}#review`,
    name: `Κριτική: ${review.title}`,
    reviewBody: review.excerpt,
    url: absoluteUrl(path),
    image: review.image ? absoluteUrl(review.image) : undefined,
    datePublished: "createdAt" in review ? review.createdAt : undefined,
    inLanguage: "el-GR",
    author: { "@id": ORGANIZATION_ID },
    publisher: { "@id": ORGANIZATION_ID },
    itemReviewed: {
      "@type": "Movie",
      name: review.title,
    },
    reviewRating: Number.isFinite(ratingValue)
      ? {
          "@type": "Rating",
          ratingValue,
          bestRating: 10,
          worstRating: 1,
        }
      : undefined,
  };

  return (
<main
  className="cinema-review-detail-page relative min-h-screen text-black"
  style={{
    padding: "120px 6vw 100px",
    backgroundColor: "#fdfdfd",
   
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    backgroundBlendMode: "multiply",
  }}
>
      <ContentView event="article_view" contentId={review.id} params={{ content_title: review.title, content_type: "cinema_review" }} />
      <JsonLd
        data={[
          reviewStructuredData,
          createBreadcrumbJsonLd([
            { name: "Αρχική", path: "/" },
            { name: "Σινεμά", path: "/cinema" },
            { name: "Κριτικές", path: "/cinema/reviews" },
            { name: review.title, path },
          ]),
        ]}
      />
  
      {/* ΠΙΣΩ */}
      <div
        className="cinema-review-detail-back"
        style={{
          width: "70%",
          marginLeft: "15%",
          marginBottom: "50px",
          position: "relative",
zIndex: 1,
        }}
      >
        <a
          href="/cinema/reviews"
          className="editorial-back-button"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            color: "#C2272D",
            textDecoration: "none",
            fontSize: "16px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          ← ΠΙΣΩ ΣΤΙΣ ΚΡΙΤΙΚΕΣ
        </a>
      </div>

      {/* ΚΥΡΙΟ ΠΕΡΙΕΧΟΜΕΝΟ */}
      <div
        className="cinema-review-detail-content"
        style={{
          width: "70%",
          marginLeft: "15%",
          position: "relative",
zIndex: 1,
          display: "grid",
          gridTemplateColumns: "0.8fr 1.2fr",
          gap: "70px",
          alignItems: "start",
        }}
      >
        {/* ΕΙΚΟΝΑ */}
        <div className="cinema-review-detail-image">
          <img
            src={review.image}
            alt={review.title}
            style={{
              width: "100%",
              display: "block",
              objectFit: "cover",
            }}
          />
        </div>

        {/* ΚΕΙΜΕΝΟ */}
        <div className="cinema-review-detail-copy">
          <p
            style={{
              margin: 0,
              color: "#C2272D",
              fontSize: "13px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
            }}
          >
            ΚΡΙΤΙΚΗ
          </p>

          <h1
            style={{
              marginTop: "20px",
              marginBottom: "30px",
              fontFamily: "Georgia, serif",
              fontSize: "52px",
              fontWeight: 400,
              lineHeight: 1.08,
            }}
          >
            {review.title}
          </h1>

          <div
            style={{
              width: "55px",
              height: "1px",
              backgroundColor: "#C2272D",
              marginBottom: "35px",
            }}
          />

          <p
            style={{
              margin: 0,
              maxWidth: "700px",
              fontSize: "17px",
              lineHeight: 1.9,
            }}
          >
            {review.excerpt}
          </p>

          <div
            style={{
              marginTop: "50px",
              paddingTop: "20px",
              borderTop: "1px solid #D8CEC5",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              maxWidth: "700px",
            }}
          >
            <span
              style={{
                fontSize: "12px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
              }}
            >
              ΒΑΘΜΟΛΟΓΙΑ
            </span>

            <span
              style={{
                color: "#C2272D",
                fontSize: "20px",
              }}
            >
              {review.rating}
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
