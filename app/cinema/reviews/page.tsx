import CinemaReviewArchiveCard from "@/components/cinema/CinemaReviewArchiveCard";

const reviews = [
  {
    id: "the-devil-wears-prada",
    movie: "THE DEVIL WEARS PRADA",
    excerpt:
      "Η επιστροφή ενός iconic τίτλου που άφησε εποχή. Το sequel του The Devil Wears Prada φέρνει ξανά στη σκηνή τον λαμπερό αλλά σκληρό κόσμο της μόδας.",
    rating: "8/10",
    image: "/images/cinema/reviews/review-devil-wears-prada.png",
  },
];

export default function CinemaReviewsPage() {
  return (
<main
  className="relative min-h-screen overflow-hidden bg-[#DCDDF2] text-black"
  style={{
    backgroundImage: "url('/backgrounds/cinema-bg.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
  }}
>
  <div className="absolute inset-0 bg-[#DCDDF2] pointer-events-none" />

  <div className="relative z-10">

      {/* HEADER */}
      <section className="mx-auto w-full max-w-[1200px] px-6 pt-20 md:px-10 md:pt-28"
      style={{
    position: "relative",
    left: "260px",
    top: "60px",
  }}>
<br></br>
        <div>

          <p className="text-[13px] uppercase tracking-[0.35em] text-red-700">
            CINEMA
          </p>

          <div
  style={{
    width: "25%",
    marginLeft: "80%",
    position: "relative",
    top: "120px",
    marginBottom: "0px",
  }}
>
  <a
    href="/cinema"
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      color: "#252321",
      textDecoration: "none",
      fontSize: "15px",
      letterSpacing: "0.16em",
      textTransform: "uppercase",
    }}
  >
    ← ΠΙΣΩ ΣΤΟ CINEMA
  </a>
</div>

          <h1 className="mt-3 font-serif text-4xl tracking-[0.08em] md:text-5xl">
            ΟΛΕΣ ΟΙ ΚΡΙΤΙΚΕΣ
          </h1>

          <div/>





          
<br></br>
          <p className="mt-4 text-[12px] uppercase tracking-[0.22em] text-black/50">
            ΑΝΑΚΑΛΥΨΤΕ ΤΙΣ ΚΙΝΗΜΑΤΟΓΡΑΦΙΚΕΣ ΜΑΣ ΚΡΙΤΙΚΕΣ
          </p>

        </div>
<br></br>




       

      </section>


      {/* ΚΡΙΤΙΚΕΣ */}
      <section
  className="w-full max-w-[1200px] px-6 pb-24 md:px-10"
  style={{
    position: "relative",
    left: "260px",
    top: "100px",
  }}
>

        <div className="mb-8 flex items-end justify-between border-b border-black/10 pb-4">

          <div>
            

            <h2 className="mt-2 font-serif text-black/80 text-2xl">
              ΚΡΙΤΙΚΕΣ
            </h2>
          </div>

          <p className="hidden text-[12px] uppercase tracking-[0.2em] text-black/40 md:block">
            ΟΛΕΣ ΟΙ ΚΡΙΤΙΚΕΣ
          </p>

        </div>


        {/* GRID */}
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {reviews.map((review) => (
            <CinemaReviewArchiveCard
              key={review.id}
              {...review}
            />
          ))}

        </div>

      </section>
</div>
    </main>
  );
}