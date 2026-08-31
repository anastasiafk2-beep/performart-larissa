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
    <main className="min-h-screen events-page overflow-x-hidden bg-white text-[#2B2B2B]">
      <br />
      <br />
      <br />

      {/* =========================================================
          HERO
          ========================================================= */}

      <InterviewHero />

      {/* =========================================================
          DESKTOP — FEATURED INTERVIEW
          ========================================================= */}

      <section className="relative left-155 -top-90 z-10 hidden w-[110vw] -translate-x-1/2 px-4 pb-24 md:block md:px-8 lg:px-0">
        <div className="mx-auto w-full max-w-[1650px]">
          <div className="grid overflow-hidden border border-[#BBAEBD]/10 lg:grid-cols-2">

            {/* ΑΡΙΣΤΕΡΑ — ΚΕΙΜΕΝΟ */}

            <div
              className="flex flex-col justify-center bg-white md:p-14 lg:p-16"
              style={{ paddingLeft: "30px" }}
            >
              <p
                className={`${alegreya.className} mb-6 text-sm uppercase tracking-[0.3em] text-red-800`}
              >
                {new Date(featuredInterview.date).toLocaleDateString("el-GR")}
              </p>

              <br />

              <h2
                className={`${spectral.className} max-w-xl text-[30px] leading-tight text-black/90`}
              >
                {featuredInterview.title}
              </h2>

              <br />

              <p
                className={`${alegreya.className} mt-7 max-w-xl text-lg leading-relaxed text-black/70`}
              >
                {featuredInterview.description}
              </p>

              <br />

              <div className="mt-8">
                <Link
                  href={`/interviews/${featuredInterview.id}`}
                  className="inline-flex min-w-[230px] min-h-[50px] items-center justify-center border border-[#C13B3A] px-6 py-3 text-xs uppercase tracking-[0.25em] !text-black transition hover:bg-red-700 hover:!text-black"
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
  className="interviews-mobile-featured-link mt-6 inline-flex min-h-[42px] items-center justify-center px-0 py-2 text-[9px] uppercase tracking-[0.2em] !text-black"
>
              ΔΙΑΒΑΣΤΕ ΤΟ ΑΡΘΡΟ →
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

      <section className="relative left-190 -top-60 z-10 hidden w-[40vw] -translate-x-1/2 px-4 pb-24 md:block md:px-8 lg:px-0">
        <div className="mx-auto w-full max-w-[1500px]">

          {/* ΤΙΤΛΟΣ */}

          <div className="mb-12 flex gap-3">
            <h2
              className={`${spectral.className} whitespace-nowrap text-3xl uppercase tracking-[0.15em] text-black`}
            >
              ΠΡΟΣΦΑΤΕΣ ΣΥΝΕΝΤΕΥΞΕΙΣ
            </h2>
          </div>

          <br />

          {/* 3 ΚΑΡΤΕΣ */}

          <div className="mx-auto grid w-full max-w-[1050px] grid-cols-1 gap-6 md:grid-cols-3">

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

                  <br />

                  <h3
                    className={`${spectral.className} mt-4 text-[20px] leading-tight text-black`}
                  >
                    {interview.title}
                  </h3>

                  <br />

                  <p
                    className={`${alegreya.className} mt-4 line-clamp-3 text-base leading-relaxed text-black/70`}
                  >
                    {interview.description}
                  </p>

                  <br />

                  <Link
                    href={`/interviews/${interview.id}`}
                    className="mt-6 inline-block pb-2 text-xs uppercase tracking-[0.2em] !text-red-900 transition hover:!text-[#C13B3A]"
                  >
                    ΔΙΑΒΑΣΤΕ ΤΟ ΑΡΘΡΟ →
                  </Link>
                </div>

                <br />
              </article>
            ))}

          </div>

          <br />
          <br />

          {/* ΟΛΕΣ ΟΙ ΣΥΝΕΝΤΕΥΞΕΙΣ */}

          <div className="mt-16 flex">
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
                    ΔΙΑΒΑΣΤΕ ΤΟ ΑΡΘΡΟ →
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

      <style jsx>{`
       .interviews-mobile-recent {
  display: block !important;
  width: 100% !important;
  max-width: 100% !important;
  margin: 0 !important;
  padding: 80px 20px 110px 20px !important;
  background: #ffffff;
  box-sizing: border-box;
}

        .interviews-mobile-recent-inner {
          display: block;
          width: 100% !important;
          max-width: 390px !important;
          margin: 0 auto !important;
          padding: 0 !important;
          box-sizing: border-box;
        }

        .interviews-mobile-recent-title {
          display: block;
          width: 100% !important;
          margin: 0 0 32px 0 !important;
          padding: 0 !important;
          text-align: left !important;
          box-sizing: border-box;
        }

        .interviews-mobile-recent-title h2 {
          display: block;
          width: 100% !important;
          margin: 0 !important;
          padding: 0 !important;
          font-size: 21px !important;
          line-height: 1.02 !important;
          font-weight: 400 !important;
          letter-spacing: 0.055em !important;
          text-align: left !important;
          text-transform: uppercase;
          color: #000000 !important;
          box-sizing: border-box;
        }

        .interviews-mobile-cards {
          display: flex !important;
          flex-direction: column !important;
          width: 100% !important;
          max-width: 100% !important;
          margin: 0 !important;
          padding: 0 !important;
          gap: 36px !important;
          box-sizing: border-box;
        }

        .interviews-mobile-card {
          display: block !important;
          width: 100% !important;
          max-width: 100% !important;
          margin: 0 !important;
          padding: 0 !important;
          overflow: hidden !important;
          border: 1px solid #bbae bd !important;
          background: #ffffff !important;
          box-sizing: border-box;
        }

        .interviews-mobile-card-image {
          display: block !important;
          width: 100% !important;
          margin: 0 !important;
          padding: 0 !important;
          overflow: hidden !important;
          box-sizing: border-box;
        }

        .interviews-mobile-card-img {
          display: block !important;
          width: 100% !important;
          height: auto !important;
          max-width: 100% !important;
          margin: 0 !important;
          padding: 0 !important;
          object-fit: contain !important;
          box-sizing: border-box;
        }

        .interviews-mobile-card-empty-image {
          display: block;
          width: 100%;
          min-height: 220px;
          background: #ffffff;
        }

        .interviews-mobile-card-content {
          display: block !important;
          width: 100% !important;
          max-width: 100% !important;
          margin: 0 !important;
          padding: 18px 18px 20px 18px !important;
          box-sizing: border-box;
        }

        .interviews-mobile-card-content > p:first-child {
          display: block;
          margin: 0 !important;
          padding: 0 !important;
          font-size: 9px !important;
          line-height: 1.2 !important;
          letter-spacing: 0.22em !important;
          text-transform: uppercase;
          color: #991b1b !important;
        }

        .interviews-mobile-card-content h3 {
          display: block !important;
          width: 100% !important;
          margin: 10px 0 0 0 !important;
          padding: 0 !important;
          font-size: 16px !important;
          line-height: 1.12 !important;
          font-weight: 400 !important;
          letter-spacing: 0 !important;
          color: #000000 !important;
          box-sizing: border-box;
        }

        .interviews-mobile-card-content > p:nth-of-type(2) {
          display: block !important;
          width: 100% !important;
          margin: 12px 0 0 0 !important;
          padding: 0 !important;
          font-size: 13px !important;
          line-height: 1.45 !important;
          color: rgba(0, 0, 0, 0.7) !important;
          box-sizing: border-box;
        }

        .interviews-mobile-card-content a {
          display: inline-block !important;
          margin: 16px 0 0 0 !important;
          padding: 0 !important;
          font-size: 8px !important;
          line-height: 1.2 !important;
          letter-spacing: 0.2em !important;
          text-transform: uppercase;
          color: #7f1d1d !important;
          text-decoration: none !important;
        }

        .interviews-mobile-all {
          display: flex !important;
          width: 100% !important;
          max-width: 100% !important;
          margin: 58px 0 0 0 !important;
          padding: 0 !important;
          justify-content: center !important;
          box-sizing: border-box;
        }

        .interviews-mobile-all a {
          display: flex !important;
          width: 100% !important;
          min-height: 45px !important;
          margin: 0 !important;
          padding: 12px 16px !important;
          align-items: center !important;
          justify-content: center !important;
          box-sizing: border-box;
          background: #991b1b !important;
          color: #ffffff !important;
          text-decoration: none !important;
          font-family: inherit;
          font-size: 9px !important;
          line-height: 1.2 !important;
          letter-spacing: 0.2em !important;
          text-transform: uppercase;
          text-align: center !important;
        }

        @media (min-width: 768px) {
          .interviews-mobile-recent {
            display: none !important;
          }
        }

        @media (max-width: 767px) {
          .interviews-mobile-recent {
            display: block !important;
          }
        }

        @media (max-width: 380px) {
          .interviews-mobile-recent {
            padding-left: 16px !important;
            padding-right: 16px !important;
          }

          .interviews-mobile-recent-title h2 {
            font-size: 20px !important;
          }

          .interviews-mobile-card-content h3 {
            font-size: 17px !important;
          }
        }

                @media (max-width: 767px) {
          .interviews-mobile-featured-title {
            font-size: 21px !important;
            line-height: 1.12 !important;
            width: 100% !important;
            margin-top: 12px !important;
          }

          .interviews-mobile-featured + #mobile-recent-interviews {
            margin-top: 80px !important;
          }

@media (max-width: 767px) {
  .interviews-mobile-featured-link {
    border: none !important;
    outline: none !important;
    box-shadow: none !important;
    padding-left: 0 !important;
    padding-right: 0 !important;
    background: transparent !important;
  }
}

        }

      `}</style>
    </main>
  );
}