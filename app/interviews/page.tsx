"use client";

import { useState } from "react";
import InterviewHero from "@/components/interviews/InterviewHero";
import { interviews } from "@/components/content/interviews";
import { Spectral, Alegreya } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const spectral = Spectral({
  subsets: ["latin", "greek"],
  weight: ["300", "400"],
});

const alegreya = Alegreya({
  subsets: ["latin", "greek"],
  weight: ["400"],
});

export default function InterviewsPage() {
  const sortedInterviews = [...interviews].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const [featuredIndex, setFeaturedIndex] = useState(() => {
  const index = sortedInterviews.findIndex(
    (interview) => interview.id === "karyofyllia-karampeti"
  );

  return index >= 0 ? index : 0;
});

const featuredInterview =
  sortedInterviews[featuredIndex] || sortedInterviews[0];

  const featuredImage =
  featuredInterview.image ||
  (featuredInterview.youtubeId
    ? `https://img.youtube.com/vi/${featuredInterview.youtubeId}/hqdefault.jpg`
    : null);

const previousInterview = () => {
  setFeaturedIndex((current) =>
    current === 0 ? sortedInterviews.length - 1 : current - 1
  );
};

const nextInterview = () => {
  setFeaturedIndex((current) =>
    current === sortedInterviews.length - 1 ? 0 : current + 1
  );
};

  const recentInterviews = sortedInterviews
    .filter((interview) => interview.id !== featuredInterview.id)
    .slice(0, 3);

  return (
   <main
  className=" min-h-screen events-page overflow-hidden bg-[#C8BCCB]/80 text-[#2B2B2B]"
  
>
    <br></br>
    <br></br>
    <br></br>
   
      {/* HERO */}
      <InterviewHero />

      {/* FEATURED INTERVIEW */}
      <section className="relative left-155 -top-90 z-10 w-[110vw] -translate-x-1/2 px-4 pb-24 md:px-8 lg:px-0">
  <div className="mx-auto w-full max-w-[1650px]">

          <div className=" grid overflow-hidden border border-[#BBAEBD]/10 lg:grid-cols-2">

            {/* ΑΡΙΣΤΕΡΑ — ΚΕΙΜΕΝΟ */}
           <div
  className="flex flex-col justify-center bg-[#BBAEBD] md:p-14 lg:p-16"
  style={{ paddingLeft: "30px" }}
>

              <p
                className={`${alegreya.className} mb-6 text-sm uppercase tracking-[0.3em] text-red-800`}
              >
                {new Date(featuredInterview.date).toLocaleDateString("el-GR")}
              </p>
<br></br>
              <h2
                className={`${spectral.className} max-w-xl text-[30px] leading-tight text-black/90 `}
              >
                {featuredInterview.title}
              </h2>
<br></br>
              <p
                className={`${alegreya.className} mt-7 max-w-xl text-lg leading-relaxed text-black/70`}
              >
                {featuredInterview.description}
              </p>
<br></br>
              <div className="mt-8">
                <Link
                  href={`/interviews/${featuredInterview.id}`}
               className="inline-flex min-w-[230px] min-h-[50px] items-center justify-center border border-[#C13B3A] px-6 py-3 text-xs uppercase tracking-[0.25em] !text-black transition hover:bg-[#C13B3A] hover:!text-black"
                >
                  ΔΙΑΒΑΣΤΕ ΤΟ ΑΡΘΡΟ →
                </Link>
                
              </div>

            </div>

            {/* ΔΕΞΙΑ — ΕΙΚΟΝΑ */}
            <div className="relative min-h-[400px] bg-white">

              {featuredImage ? (
  <img
    src={featuredImage}
    alt={featuredInterview.title}
    className="absolute inset-0 h-full w-full object-cover"
  />
) : (
  <div className="flex h-full min-h-[420px] items-center justify-center bg-[#eee] text-black">
    <span className="text-sm uppercase tracking-[0.25em]">
      Interview Stories
    </span>
  </div>
)}

            </div>

          </div>

        </div>
                <button
          type="button"
          onClick={previousInterview}
          aria-label="Προηγούμενη συνέντευξη"
          style={{ fontSize: "40px", lineHeight: "1" }}
          className="absolute left-[-55px] top-1/2 z-30 -translate-y-1/2 text-6xl text-[#C13B3A] transition-opacity hover:opacity-60"
        >
          ←
        </button>

        <button
          type="button"
          onClick={nextInterview}
          aria-label="Επόμενη συνέντευξη"
          style={{ fontSize: "40px", lineHeight: "1" }}
          className="absolute right-[-55px] top-1/2 z-30 -translate-y-1/2 text-6xl text-[#C13B3A] transition-opacity hover:opacity-60"
        >
          →
        </button>
      </section>


      {/* ΠΡΟΣΦΑΤΕΣ ΣΥΝΕΝΤΕΥΞΕΙΣ */}
      <section className="relative left-190 -top-60 z-10 w-[40vw] -translate-x-1/2 px-4 pb-24 md:px-8 lg:px-0">
  <div className="mx-auto w-full max-w-[1500px]">

          {/* ΤΙΤΛΟΣ */}
          <div className="mb-12 flex gap-3">

            <h2
              className={`${spectral.className}  whitespace-nowrap text-3xl text-black uppercase tracking-[0.15em]`}
            >
              ΠΡΟΣΦΑΤΕΣ ΣΥΝΕΝΤΕΥΞΕΙΣ
            </h2>

          
          </div>
          
<br></br>

          {/* 3 ΚΑΡΤΕΣ */}
          <div className="mx-auto grid w-full max-w-[1050px] grid-cols-1 gap-6 md:grid-cols-3">

            {recentInterviews.map((interview) => (

              <article
                key={interview.id}
                className="group border border-[#BBAEBD] bg-[#AFA0B2]"
              >

                {/* ΕΙΚΟΝΑ */}
                <div className="relative aspect-[5/3] overflow-hidden">

                  {interview.image ? (
                    <Image
                      src={interview.image}
                      alt={interview.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-[#222]">
                     
                    </div>
                  )}

                </div>


                {/* ΚΕΙΜΕΝΟ */}
                <div
  style={{
    paddingLeft: "20px",
    paddingRight: "15px",
    paddingTop: "14px",
    paddingBottom: "14px",
  }}
>

                  <p
                    className={`${alegreya.className} text-xs uppercase tracking-[0.25em] text-red-800`}
                  >
                    {new Date(interview.date).toLocaleDateString("el-GR")}
                  </p>
<br></br>
                  <h3
                    className={`${spectral.className} mt-4 text-[20px] text-black leading-tight`}
                  >
                    {interview.title}
                  </h3>
<br></br>
                  <p
                    className={`${alegreya.className} mt-4 line-clamp-3 text-base leading-relaxed text-black/70`}
                  >
                    {interview.description}
                  </p>
<br></br>
                  <Link
                    href={`/interviews/${interview.id}`}
                    className="mt-6 inline-block pb-2 text-xs uppercase tracking-[0.2em] !text-red-900 transition hover:!text-[#C13B3A]"
                  >
                    ΔΙΑΒΑΣΤΕ ΤΟ ΑΡΘΡΟ →
                  </Link>

                </div>
<br></br>
              </article>

            ))}

          </div>

<br></br>
<br></br>
          {/* ΟΛΕΣ ΟΙ ΣΥΝΕΝΤΕΥΞΕΙΣ */}
          <div className="mt-16 flex ">

            <Link
                  href="/interviews/archive"
               className="inline-flex min-w-[330px] min-h-[50px] items-center justify-center border border-red-800 bg-red-800 px-6 py-3 text-xs uppercase tracking-[0.25em] !text-white transition hover:bg-white hover:!text-[#C13B3A]"
                >
              ΔΕΙΤΕ ΟΛΕΣ ΤΙΣ ΣΥΝΕΝΤΕΥΞΕΙΣ →
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}