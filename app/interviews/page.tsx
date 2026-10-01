"use client";

import { useState } from "react";
import InterviewHero from "@/components/interviews/InterviewHero";
import useInterviews from "@/hooks/useInterviews";
import { Spectral, Alegreya } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["300", "400"],
});

const alegreya = Alegreya({
  subsets: ["latin"],
  weight: ["400"],
});

export default function InterviewsPage() {
  const { interviews } = useInterviews();
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
    <main className="interviews-page min-h-screen events-page overflow-x-hidden bg-white text-[#2B2B2B]">
      <br />
      <br />
      <br />

      {/* =========================================================
          HERO
          ========================================================= */}

      <div className="interviews-hero">
  <InterviewHero />
</div>

      {/* =========================================================
          DESKTOP — FEATURED INTERVIEW
          ========================================================= */}

      <section className="interviews-featured-desktop relative z-10 hidden w-full -mt-32 pb-24 md:block">
        <div className="mx-auto w-full max-w-[900px]">
          <div className="interviews-featured-grid grid overflow-hidden border border-[#BBAEBD]/10 lg:grid-cols-[40%_60%]">

            {/* ΑΡΙΣΤΕΡΑ — ΚΕΙΜΕΝΟ */}

            <div className="interviews-featured-copy flex flex-col justify-center bg-white">
              <p
                className={`${alegreya.className} mb-6 text-sm uppercase tracking-[0.3em] text-red-800`}
              >
                {new Date(featuredInterview.date).toLocaleDateString("el-GR")}
              </p>

              <h2
                className={`${spectral.className} interviews-featured-title max-w-xl leading-tight text-black/90`}
              >
                {featuredInterview.title}
              </h2>

             

              <div className="interviews-featured-action">
                <Link
                  href={`/interviews/${featuredInterview.id}`}
                  className="inline-flex min-w-[200px] min-h-[30px] items-center justify-center border border-[#C13B3A] px-6 py-3 text-xs uppercase tracking-[0.25em] !text-white transition hover:bg-red-700 hover:!text-white"
                >
                  {featuredInterview.type === "video"
  ? "ΔΕΙΤΕ ΤΗ ΣΥΝΕΝΤΕΥΞΗ →"
  : "ΔΙΑΒΑΣΤΕ ΤΟ ΑΡΘΡΟ →"}
                </Link>
              </div>
            </div>

            {/* ΔΕΞΙΑ — ΕΙΚΟΝΑ */}

            <div className="interviews-featured-image relative bg-white">
              {featuredImage ? (
                <img
                  src={featuredImage}
                  alt={featuredInterview.title}
                  className="absolute inset-0 h-full w-full object-contain"
                />
              ) : (
                <div className="flex h-full min-h-[420px] items-center justify-center bg-white text-black">
                  <span className="text-sm uppercase tracking-[0.25em]">
                    Interview Stories
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* PREVIOUS */}

        <button
          type="button"
          onClick={previousInterview}
          aria-label="Προηγούμενη συνέντευξη"
          style={{ fontSize: "40px", lineHeight: "1" }}
          className="absolute left-[-55px] top-1/2 z-30 -translate-y-1/2 text-6xl text-[#C13B3A] transition-opacity hover:opacity-60"
        >
          ←
        </button>

        {/* NEXT */}

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

      {/* =========================================================
          MOBILE — FEATURED INTERVIEW
          ========================================================= */}

     <section className="interviews-mobile-featured block w-full bg-white px-5 pt-10 pb-32 md:hidden">
        <div className="mx-auto w-full max-w-[390px]">

          {/* IMAGE */}

          <div className="w-full overflow-hidden">
            {featuredImage ? (
              <img
                src={featuredImage}
                alt={featuredInterview.title}
                className="block h-auto w-full object-contain"
              />
            ) : (
              <div className="flex min-h-[250px] w-full items-center justify-center bg-white">
                <span className="text-sm uppercase tracking-[0.25em]">
                  Interview Stories
                </span>
              </div>
            )}
          </div>

          {/* TEXT */}

          <div className="w-full pt-7">
            <p
              className={`${alegreya.className} text-[10px] uppercase tracking-[0.25em] text-red-800`}
            >
              {new Date(featuredInterview.date).toLocaleDateString("el-GR")}
            </p>

            <h2
  className={`${spectral.className} interviews-mobile-featured-title mt-3 w-full leading-[1.12] text-black`}
>
          
              {featuredInterview.title}
            </h2>

            <p
              className={`${alegreya.className} mt-5 w-full text-[15px] leading-[1.5] text-black/70`}
            >
              {featuredInterview.description}
            </p>

            <Link
  href={`/interviews/${featuredInterview.id}`}
  className="interviews-mobile-featured-link mt-6 inline-flex min-h-[42px] items-center justify-center px-0 py-2 text-[9px] uppercase tracking-[0.2em] !text-white"
>
              {featuredInterview.type === "video"
  ? "ΔΕΙΤΕ ΤΗ ΣΥΝΕΝΤΕΥΞΗ →"
  : "ΔΙΑΒΑΣΤΕ ΤΟ ΑΡΘΡΟ →"}
            </Link>
          </div>

          {/* ARROWS */}

          <div className="mt-8 flex w-full items-center justify-between">
            <button
              type="button"
              onClick={previousInterview}
              aria-label="Προηγούμενη συνέντευξη"
              className="text-[28px] leading-none text-[#C13B3A]"
            >
              ←
            </button>

            <button
              type="button"
              onClick={nextInterview}
              aria-label="Επόμενη συνέντευξη"
              className="text-[28px] leading-none text-[#C13B3A]"
            >
              →
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================
          DESKTOP — RECENT INTERVIEWS
          ========================================================= */}

      <section className="interviews-recent-desktop relative z-10 hidden w-full pb-24 md:block">
        <div className="mx-auto w-full max-w-[1500px]">

          {/* ΤΙΤΛΟΣ */}

          <div className="interviews-recent-title flex gap-3">
            <h2
              className={`${spectral.className} uppercase tracking-[0.15em] text-black`}
            >
              ΠΡΟΣΦΑΤΕΣ ΣΥΝΕΝΤΕΥΞΕΙΣ
            </h2>
          </div>

          {/* 3 ΚΑΡΤΕΣ */}

          <div className="interviews-recent-grid mx-auto grid w-full grid-cols-1 md:grid-cols-3">

            {recentInterviews.map((interview) => (
              <article
                key={interview.id}
                className="group border border-[#BBAEBD] bg-white"
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
                    <div className="flex h-full items-center justify-center bg-white" />
                  )}
                </div>

                {/* ΚΕΙΜΕΝΟ */}

                <div className="interviews-recent-card-copy">
                  <p
                    className={`${alegreya.className} text-xs uppercase tracking-[0.25em] text-red-800`}
                  >
                    {new Date(interview.date).toLocaleDateString("el-GR")}
                  </p>

                  <h3
                    className={`${spectral.className} interviews-recent-card-title leading-tight text-black`}
                  >
                    {interview.title}
                  </h3>

                  <p
                    className={`${alegreya.className} interviews-recent-card-description line-clamp-3 leading-relaxed text-black/70`}
                  >
                    {interview.description}
                  </p>

                  <Link
                    href={`/interviews/${interview.id}`}
                    className="mt-6 inline-block pb-2 text-xs uppercase tracking-[0.2em] !text-[#C2272D] transition hover:!text-[#C13B3A]"
                  >
                    {featuredInterview.type === "video"
  ? "ΔΕΙΤΕ ΤΗ ΣΥΝΕΝΤΕΥΞΗ →"
  : "ΔΙΑΒΑΣΤΕ ΤΟ ΑΡΘΡΟ →"}
                  </Link>
                </div>

              </article>
            ))}

          </div>

          {/* ΟΛΕΣ ΟΙ ΣΥΝΕΝΤΕΥΞΕΙΣ */}

          <div className="interviews-recent-all flex">
            <Link
              href="/interviews/archive"
              className="inline-flex min-h-[50px] min-w-[330px] items-center justify-center border border-red-800 bg-red-800 px-6 py-3 text-xs uppercase tracking-[0.25em] !text-white transition hover:bg-white hover:!text-[#C13B3A]"
            >
              ΔΕΙΤΕ ΟΛΕΣ ΤΙΣ ΣΥΝΕΝΤΕΥΞΕΙΣ →
            </Link>
          </div>

        </div>
      </section>

      {/* =========================================================
          MOBILE — RECENT INTERVIEWS
          ========================================================= */}

      <section className="interviews-mobile-recent" id="mobile-recent-interviews">

        <div className="interviews-mobile-recent-inner">

          {/* ΤΙΤΛΟΣ */}

          <div className="interviews-mobile-recent-title">
            <h2 className={spectral.className}>
              ΠΡΟΣΦΑΤΕΣ
              <br />
              ΣΥΝΕΝΤΕΥΞΕΙΣ
            </h2>
          </div>

          {/* ΚΑΡΤΕΣ */}

          <div className="interviews-mobile-cards">

            {recentInterviews.map((interview) => (
              <article
                key={interview.id}
                className="interviews-mobile-card"
              >

                {/* IMAGE */}

                <div className="interviews-mobile-card-image">
                  {interview.image ? (
                    <Image
                      src={interview.image}
                      alt={interview.title}
                      width={1200}
                      height={800}
                      className="interviews-mobile-card-img"
                    />
                  ) : (
                    <div className="interviews-mobile-card-empty-image" />
                  )}
                </div>

                {/* CONTENT */}

                <div className="interviews-mobile-card-content">

                  <p className={alegreya.className}>
                    {new Date(interview.date).toLocaleDateString("el-GR")}
                  </p>

                  <h3 className={spectral.className}>
                    {interview.title}
                  </h3>

                  <p className={alegreya.className}>
                    {interview.description}
                  </p>

                  <Link
                    href={`/interviews/${interview.id}`}
                  >
                    {featuredInterview.type === "video"
  ? "ΔΕΙΤΕ ΤΗ ΣΥΝΕΝΤΕΥΞΗ →"
  : "ΔΙΑΒΑΣΤΕ ΤΟ ΑΡΘΡΟ →"}
                  </Link>

                </div>

              </article>
            ))}

          </div>

          {/* ALL INTERVIEWS */}

          <div className="interviews-mobile-all">
            <Link href="/interviews/archive">
              ΔΕΙΤΕ ΟΛΕΣ ΤΙΣ ΣΥΝΕΝΤΕΥΞΕΙΣ →
            </Link>
          </div>

        </div>
      </section>

      {/* =========================================================
          MOBILE CSS
          ========================================================= */}

      <style>{`
  @media (max-width: 767px) {

  .interviews-page.events-page {
  position: relative !important;
  left: 0 !important;
  right: auto !important;
  transform: none !important;

  width: 100% !important;
  max-width: 100% !important;
  min-width: 0 !important;

  margin-left: 0 !important;
  margin-right: 0 !important;
  padding-left: 0 !important;
  padding-right: 0 !important;

  box-sizing: border-box !important;
}

    /* =========================================
       ΟΛΗ Η MOBILE ΣΕΛΙΔΑ
       ========================================= */

    .interviews-page {
      width: 100% !important;
      max-width: 100% !important;
      overflow-x: hidden !important;
    }


    /* =========================================
       FEATURED INTERVIEW
       ========================================= */

    .interviews-page .interviews-mobile-featured {
      width: 100% !important;
      max-width: 100% !important;

      margin: 0 !important;
      padding: 20px 24px 70px !important;

      box-sizing: border-box !important;
    }

    .interviews-page .interviews-mobile-featured > div {
      width: 100% !important;
      max-width: 340px !important;

      margin: 0 auto !important;
      padding: 0 !important;

      transform: none !important;
    }


    /* featured εικόνα */

    .interviews-page .interviews-mobile-featured img {
      display: block !important;

      width: 100% !important;
      max-width: 340px !important;
      height: auto !important;

      margin: 0 auto !important;
    }


    /* featured κείμενο */

    .interviews-page .interviews-mobile-featured .w-full.pt-7 {
      width: 100% !important;
      padding-top: 20px !important;

      text-align: left !important;
    }

    .interviews-page .interviews-mobile-featured .w-full.pt-7 > p:first-child {
      margin: 0 0 10px !important;

      font-size: 9px !important;
      line-height: 1.2 !important;
      letter-spacing: 0.18em !important;
    }

    .interviews-page .interviews-mobile-featured-title {
      width: 100% !important;

      margin: 0 !important;

      font-size: 20px !important;
      line-height: 1.18 !important;
      letter-spacing: 0 !important;
    }

    .interviews-page .interviews-mobile-featured-title + p {
      width: 100% !important;

      margin-top: 14px !important;

      font-size: 13px !important;
      line-height: 1.5 !important;
    }

    .interviews-page .interviews-mobile-featured-link {
      min-height: 38px !important;

      margin-top: 18px !important;

      padding: 7px 0 !important;

      font-size: 8px !important;
      letter-spacing: 0.15em !important;
    }


    /* featured βελάκια */

    .interviews-page .interviews-mobile-featured .mt-8 {
      margin-top: 22px !important;
    }

    .interviews-page .interviews-mobile-featured button {
      font-size: 23px !important;
    }


    /* =========================================
       ΠΡΟΣΦΑΤΕΣ ΣΥΝΕΝΤΕΥΞΕΙΣ
       ========================================= */

    .interviews-page .interviews-mobile-recent {
      display: block !important;

      width: 100% !important;
      max-width: 100% !important;

      margin: 0 !important;
      padding: 55px 24px 80px !important;

      box-sizing: border-box !important;
    }

    .interviews-page .interviews-mobile-recent-inner {
      width: 100% !important;
      max-width: 340px !important;

      margin: 0 auto !important;
      padding: 0 !important;

      transform: none !important;
    }


    /* Τίτλος πρόσφατων */

    .interviews-page .interviews-mobile-recent-title {
      width: 100% !important;

      margin: 0 0 32px !important;

      text-align: left !important;
    }

    .interviews-page .interviews-mobile-recent-title h2 {
      width: 100% !important;

      margin: 0 !important;

      font-size: 21px !important;
      line-height: 1.12 !important;
      letter-spacing: 0.08em !important;

      text-align: left !important;
    }


    /* =========================================
       ΚΑΡΤΕΣ
       ========================================= */

    .interviews-page .interviews-mobile-cards {
      display: flex !important;
      flex-direction: column !important;

      width: 100% !important;

      gap: 28px !important;
    }

    .interviews-page .interviews-mobile-card {
      display: block !important;

      width: 100% !important;
      max-width: 340px !important;

      margin: 0 !important;
      padding: 0 !important;

      box-sizing: border-box !important;
    }


    /* εικόνα κάρτας */

    .interviews-page .interviews-mobile-card-image {
      width: 100% !important;
      max-width: 340px !important;

      margin: 0 !important;
      padding: 0 !important;

      overflow: hidden !important;
    }

    .interviews-page .interviews-mobile-card-img {
      display: block !important;

      width: 100% !important;
      max-width: 340px !important;
      height: auto !important;

      margin: 0 !important;
    }


    /* κείμενο κάρτας */

    .interviews-page .interviews-mobile-card-content {
      width: 100% !important;

      padding: 15px 0 0 !important;

      text-align: left !important;
    }

    .interviews-page .interviews-mobile-card-content > p:first-child {
      margin: 0 0 8px !important;

      font-size: 8px !important;
      line-height: 1.2 !important;
      letter-spacing: 0.16em !important;
    }

    .interviews-page .interviews-mobile-card-content h3 {
      width: 100% !important;

      margin: 0 !important;

      font-size: 18px !important;
      line-height: 1.2 !important;
    }

    .interviews-page .interviews-mobile-card-content h3 + p {
      width: 100% !important;

      margin: 11px 0 0 !important;

      font-size: 12px !important;
      line-height: 1.5 !important;
    }

    .interviews-page .interviews-mobile-card-content a {
      display: inline-block !important;

      margin-top: 15px !important;

      font-size: 8px !important;
      line-height: 1.2 !important;
      letter-spacing: 0.14em !important;
    }


    /* =========================================
       ΔΕΙΤΕ ΟΛΕΣ
       ========================================= */

    .interviews-page .interviews-mobile-all {
      display: flex !important;

      width: 100% !important;

      margin-top: 42px !important;

      justify-content: flex-start !important;
    }

    .interviews-page .interviews-mobile-all a {
      display: inline-flex !important;

      width: auto !important;
      min-height: 38px !important;

      padding: 9px 14px !important;

      align-items: center !important;
      justify-content: center !important;

      font-size: 8px !important;
      line-height: 1.2 !important;
      letter-spacing: 0.14em !important;
    }
  }

  @media (min-width: 768px) {
  .interviews-page .interviews-featured-title {
    font-size: 26px !important;
  }
}

  @media (min-width: 768px) {
    .interviews-mobile-featured,
    .interviews-mobile-recent {
      display: none !important;
    }
  }

  @media (min-width: 768px) {
  .interviews-page .interviews-featured-desktop {
    transform: translateY(-140px) !important;
  }
}

`}</style>
    </main>
  );
}
