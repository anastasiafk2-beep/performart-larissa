import CinemaReviewCard from "./CinemaReviewCard";

const reviews = [
  {
    id: "the-devil-wears-prada",
    title: "THE DEVIL WEARS PRADA",
    movie: "",
    excerpt:
      "Η επιστροφή ενός iconic τίτλου που άφησε εποχή. Το sequel του The Devil Wears Prada φέρνει ξανά στη σκηνή τον λαμπερό αλλά σκληρό κόσμο της μόδας, με γνώριμο ρυθμό και έντονο déjà vu. Η Meryl Streep αποδεικνύει για άλλη μια φορά γιατί είναι απολαυστική ως Μιράντα Πρίστλι, όμως η ταινία μένει σε μια επιφανειακή σάτιρα που δεν τολμά να πάει πιο βαθιά. Στιλάτο, γρήγορο, ευχάριστο — αλλά τελικά πιο κοντά στη νοσταλγία παρά σε κάτι πραγματικά νέο. Μπορείς να την απολαύσεις στα Victoria Cinemas.",
    rating: "8/10",
    image: "/images/cinema/reviews/review-devil-wears-prada.png",
  },

 
];

export default function CinemaReviews() {
  return (
   <section
  className="relative mt-24 overflow-hidden bg-[#707BD4]/7 px-8 pt-20 pb-28 text-white"
  
>
  <div className="absolute inset-0" />

  <div className="relative z-10 mx-auto max-w-[1800px] translate-x-10">

        <div className="mb-16 flex items-end justify-between">

          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#C2272D]">
              Cinema
            </p>

            <h2 className="mt-3 font-serif text-5xl text-black">
              ΚΡΙΤΙΚΕΣ
            </h2>
          </div>

          <a
            href="/cinema/reviews"
            style={{
    padding: "8px 45px",
    transform: "translateX(-110px)",
  }}
            className="
  border
  !border-[#C2272D]
  !text-[#C2272D]
  px-6
  py-3
  text-xs
  uppercase
  tracking-[0.3em]
  transition
  hover:!bg-[#C2272D]
  hover:!text-white
            "
          >
            ΔΕΙΤΕ ΟΛΕΣ ΤΙΣ ΚΡΙΤΙΚΕΣ →
          </a>

        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
  style={{ marginTop: "40px", marginBottom: "60px" }}
>

          {reviews.map((review) => (
            <CinemaReviewCard
              key={review.id}
              {...review}
            />
          ))}

        </div>

      </div>

    </section>
  );
}