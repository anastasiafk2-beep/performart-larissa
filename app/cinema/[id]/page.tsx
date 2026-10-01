import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BackButton from "@/components/cinema/BackButton";
import JsonLd from "@/components/seo/JsonLd";
import { getCinemaMovies } from "@/lib/cinema-data";
import {
  ORGANIZATION_ID,
  absoluteUrl,
  createBreadcrumbJsonLd,
  createPageMetadata,
  eventDateTime,
  toSeoDescription,
} from "@/lib/seo";

type MoviePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({
  params,
}: MoviePageProps): Promise<Metadata> {
  const { id } = await params;
  const movie = (await getCinemaMovies()).find((item) => item.id === id);
  const path = `/cinema/${encodeURIComponent(id)}`;

  if (!movie) {
    return createPageMetadata({
      title: "Η ταινία δεν βρέθηκε",
      description: "Η σελίδα ταινίας που ζητήσατε δεν είναι διαθέσιμη.",
      path,
      noIndex: true,
    });
  }

  return createPageMetadata({
    title: `${movie.title} — Προβολές στη Λάρισα`,
    description: movie.description.join(" "),
    path,
    image: movie.poster,
    imageAlt: `Αφίσα της ταινίας ${movie.title}`,
  });
}

export default async function MoviePage({
  params,
}: MoviePageProps) {
  const { id } = await params;

  const movies = await getCinemaMovies();
  const movie = movies.find((movie) => movie.id === id);

  if (!movie) {
    notFound();
  }

  const path = `/cinema/${encodeURIComponent(movie.id)}`;
  const movieId = `${absoluteUrl(path)}#movie`;
  const movieStructuredData = {
    "@context": "https://schema.org",
    "@type": "Movie",
    "@id": movieId,
    name: movie.title,
    description: toSeoDescription(movie.description.join(" ")),
    url: absoluteUrl(path),
    image: absoluteUrl(movie.poster),
    genre: movie.genre,
    contentRating: movie.rating !== "—" ? movie.rating : undefined,
    inLanguage: "el-GR",
    publisher: { "@id": ORGANIZATION_ID },
  };

  const screeningsStructuredData = movie.screenings.map((screening, index) => ({
    "@context": "https://schema.org",
    "@type": "ScreeningEvent",
    "@id": `${absoluteUrl(path)}#screening-${index + 1}`,
    name: `${movie.title} — Προβολή`,
    startDate: eventDateTime(screening.date, screening.time),
    url: absoluteUrl(path),
    workPresented: { "@id": movieId },
    location: {
      "@type": "Place",
      name: screening.venue || movie.location,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Λάρισα",
        addressCountry: "GR",
      },
    },
  }));

  return (
    <main
  className="cinema-detail-page min-h-screen overflow-hidden bg-white"
>
  <JsonLd
    data={[
      movieStructuredData,
      ...screeningsStructuredData,
      createBreadcrumbJsonLd([
        { name: "Αρχική", path: "/" },
        { name: "Σινεμά", path: "/cinema" },
        { name: movie.title, path },
      ]),
    ]}
  />
  {/* Light overlay */}
  <div className="absolute inset-0 bg-white pointer-events-none" />

  <div className="relative z-10">

      <section className="page-shell cinema-detail-shell">
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
              <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm text-[#C2272D]">

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
