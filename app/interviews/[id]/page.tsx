import Image from "next/image";
import Link from "next/link";
import { interviews } from "@/components/content/interviews";
import { Spectral, Alegreya } from "next/font/google";

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["300", "400"],
});

const alegreya = Alegreya({
  subsets: ["latin"],
  weight: ["400"],
});

type InterviewPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function InterviewPage({
  params,
}: InterviewPageProps) {
  const { id } = await params;

  const interview = interviews.find(
    (item) => item.id === id
  );

  if (!interview) {
    return (
      <main className="flex min-h-screen events-page bg-[#C8BCCB]">
        <div >
          <h1
            className={`${spectral.className} text-4xl`}
          >
            Η συνέντευξη δεν βρέθηκε
          </h1>

          <Link
            href="/interviews"
            className={`${alegreya.className} mt-8 inline-block border border-[#C13B3A] px-8 py-3 text-xs uppercase tracking-[0.25em]`}
         >
            ← ΠΙΣΩ ΣΤΙΣ ΣΥΝΕΝΤΕΥΞΕΙΣ
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main
      className="relative min-h-screen overflow-hidden bg-[#C8BCCB] text-[#2B2B2B]"
      style={{
        backgroundImage:
          "url('/backgrounds/cinema-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundAttachment: "fixed",
      }}
    >
      {/* OVERLAY */}
      <div className="pointer-events-none absolute inset-0 bg-[#C8BCCB]/95" />

      {/* ΠΕΡΙΕΧΟΜΕΝΟ */}
      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 py-24 md:px-10 lg:px-12"
      style={{
    position: "relative",
    left: "460px",
    top: "120px",
  }}>
        {/* ΕΠΙΣΤΡΟΦΗ */}
        <div className="mb-12">
          <Link
            href="/interviews"
            className={`${alegreya.className} inline-block border border-[#C13B3A] px-8 py-3 text-12 uppercase tracking-[0.25em] text-black transition hover:bg-[#C13B3A] hover:text-white`}
          style={{
    position: "relative",
    left: "-250px",
    top: "-15px",
  }}>
            ← ΠΙΣΩ ΣΤΙΣ ΣΥΝΕΝΤΕΥΞΕΙΣ
          </Link>
        </div>

        {/* ΗΜΕΡΟΜΗΝΙΑ */}
        <p
          className={`${alegreya.className} text-12 uppercase tracking-[0.35em] text-[#C13B3A]`}
        >
          {new Date(interview.date).toLocaleDateString(
            "el-GR"
          )}
        </p>

        {/* ΤΙΤΛΟΣ */}
        <h1
          className={`${spectral.className} mt-6 max-w-1xl text-4xl leading-tight text-black md:text-3xl lg:text-4xl`}
        >
          {interview.title}
        </h1>
<br></br>

        {/* ΦΩΤΟΓΡΑΦΙΑ */}
        {interview.image && (
          <div className="relative mx-auto mt-12 w-full max-w-[800px] overflow-hidden">
            <Image
              src={interview.image}
              alt={interview.title}
              width={1200}
              height={800}
              className="h-auto w-full object-cover"
            />
          </div>
        )}

    

        {/* ΠΕΡΙΕΧΟΜΕΝΟ ΣΥΝΕΝΤΕΥΞΗΣ */}
<div className="mx-auto mt-14 max-w-[850px]">

  {/* ΠΕΡΙΓΡΑΦΗ */}
  <p
    className={`${alegreya.className} text-xl leading-relaxed text-black/75`}
  >
    <br></br>
    {interview.description}
  </p>
<br></br>
  {/* VIDEO */}
  {interview.type === "video" && interview.youtubeId && (
    <div className="mt-12 aspect-video w-full overflow-hidden">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${interview.youtubeId}`}
        title={interview.title}
        className="h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )}

  {/* ΑΡΘΡΟ */}
  {interview.type === "article" && interview.url && (
    <div className="mt-12">
      <a
        href={interview.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`${alegreya.className} inline-block border border-[#C13B3A] px-8 py-4 text-sm uppercase tracking-[0.25em] text-black transition hover:bg-[#C13B3A] hover:text-white`}
        style={{
    position: "relative",
    left: "760px",
    top: "10px",
  }}
>
        ΔΙΑΒΑΣΤΕ ΤΟ ΑΡΘΡΟ →
      </a>
    </div>
  )}

</div>

       

      </div>
    </main>
  );
}