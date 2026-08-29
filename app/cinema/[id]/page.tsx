import { notFound } from "next/navigation";
import { movies } from "@/content/cinema/movies";
import BackButton from "@/components/cinema/BackButton";

type MoviePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function MoviePage({
  params,
}: MoviePageProps) {
  const { id } = await params;

  const movie = movies.find((movie) => movie.id === id);

  if (!movie) {
    notFound();
  }

  return (
    <main
  className="min-h-screen overflow-hidden bg-[#707BD4]/80"
>
  {/* Light overlay */}
  <div className="absolute inset-0 bg-white/70 pointer-events-none" />

  <div className="relative z-10">

      <section className="page-shell">
<div className="mb-5">
  <BackButton />
</div>
        <div className="grid grid-cols-1  gap-16 lg:grid-cols-[500px_1fr]">

          {/* POSTER */}
          <div>
            <img
  src={movie.poster}
  alt={movie.title}
  className="w-full rounded-sm object-cover shadow-lg"
/>
          </div>

          {/* ΠΛΗΡΟΦΟΡΙΕΣ */}
          <div className="max-w-3xl">

            <p className="text-xs uppercase tracking-[0.35em] text-[#C2272D]">
              Cinema
            </p>

            <h1 className="mt-4 font-serif text-5xl tracking-wide text-black">
              {movie.title}
            </h1>

            <p className="mt-4 text-lg text-black/80">
              {movie.location}
            </p>
<br></br>
            {/* ΠΕΡΙΓΡΑΦΗ */}
            <div className="mt-10 space-y-5">
              {movie.description.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-base leading-8 text-black/90"
                >
                  {paragraph}
                </p>
              ))}
            </div>
<br></br>
            {/* ΠΛΗΡΟΦΟΡΙΕΣ */}
            <div className="mt-10 border-t border-[#E9D8C8] pt-8">
<br></br>
              <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm text-red-900">

                <div>
                  <span className="text-black/70">
                    ΕΙΔΟΣ
                  </span>

                  <p className="mt-1">
                    {movie.genre}
                  </p>
                </div>

                <div>
                  <span className="text-black/70">
                    ΔΙΑΡΚΕΙΑ
                  </span>

                  <p className="mt-1">
                    {movie.duration}
                  </p>
                </div>

                <div>
                  <span className="text-black/70">
                    ΚΑΤΑΛΛΗΛΟΤΗΤΑ
                  </span>

                  <p className="mt-1">
                    {movie.rating}
                  </p>
                </div>

                <div>
                  <span className="text-black/70">
                    ΕΙΣΙΤΗΡΙΟ
                  </span>

                  <p className="mt-1">
                    {movie.ticket}
                  </p>
                </div>

              </div>

            </div>
<br></br>
<br></br>
            {/* ΠΡΟΒΟΛΕΣ */}
            <div className="mt-12">

              <h2 className="font-serif text-3xl text-black/85">
                ΠΡΟΒΟΛΕΣ
              </h2>

              <div className="mt-6 space-y-3">

                {movie.screenings.map((screening) => (
                  <div
                    key={`${screening.date}-${screening.time}`}
                    className="
                      flex
                      items-center
                      justify-between
                      border-b
                      border-black/10
                      py-4
                      text-sm
                    "
                  >
                    <span className="text-black">
                      {new Date(
                        `${screening.date}T12:00:00`
                      ).toLocaleDateString("el-GR", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                      })}
                    </span>

                    <span className="text-[#C2272D]">
                      {screening.time}
                    </span>
                  </div>
                ))}

              </div>

            </div>

          </div>

        </div>

      </section>
      
  </div>

    </main>
   
  );
}