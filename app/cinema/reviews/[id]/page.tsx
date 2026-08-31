import { notFound } from "next/navigation";

import { getCinemaReviews } from "@/lib/cinema-reviews-data";

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

export default async function ReviewPage({ params }: Props) {
  const { id } = await params;

  const localReview = reviews.find((item) => item.id === id);

  const sanityReviews = await getCinemaReviews();

  const sanityReview = sanityReviews.find(
    (item) => item.id === id
  );

  const review = localReview
    ? localReview
    : sanityReview
    ? {
        id: sanityReview.id,
        title: sanityReview.title,
        excerpt: sanityReview.excerpt,
        rating: sanityReview.rating,
        image: sanityReview.image || "",
      }
    : null;

  if (!review) {
    notFound();
  }

  return (
<main
  className="relative min-h-screen text-black"
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
  
      {/* ΠΙΣΩ */}
      <div
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
        <div>
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
        <div>
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