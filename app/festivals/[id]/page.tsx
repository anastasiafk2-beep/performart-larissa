import Link from "next/link";
import { getFestivals } from "@/lib/festivals-data";
import Footer from "@/components/layout/Footer";

type FestivalPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function FestivalPage({
  params,
}: FestivalPageProps) {
  const { id } = await params;

const festivals = await getFestivals();

const festival = festivals.find(
  (item) => item.id === id
);

  if (!festival) {
    return (
      <main className="min-h-screen bg-white px-6 py-32 text-center">
        <h1 className="font-serif text-4xl">
          ΤΟ ΦΕΣΤΙΒΑΛ ΔΕΝ ΒΡΕΘΗΚΕ
        </h1>

        <Link
          href="/festivals"
          className="mt-8 inline-block border border-[#C2272D] px-5 py-2 text-xs uppercase tracking-[0.2em] text-[#C2272D]"
        >
          ← ΠΙΣΩ ΣΤΑ ΦΕΣΤΙΒΑΛ
        </Link>
      </main>
    );
  }

  return (
    <>
      <main
        className="festival-single-page relative min-h-screen overflow-hidden bg-white text-[#252321]"
        style={{
         
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Light overlay */}

      <div className="absolute inset-0 bg-white/70 pointer-events-none" />

     <div className="relative z-10">

        {/* ΠΙΣΩ ΣΤΑ ΦΕΣΤΙΒΑΛ */}
      
        
        <div className="festival-single-back px-6 pt-8 md:px-10">
          <Link
            href="/festivals"
             style={{
    position: "relative",
    top: "110px",
    left: "230px",
    zIndex: 20,
  }}
            className="
              inline-flex
              border
              border-[#C2272D]
              px-4
              py-2
              text-[14px]
              uppercase
              tracking-[0.2em]
              text-[#C2272D]
              transition
              hover:bg-[#C2272D]
              hover:text-white
              
            "
          >
            ← ΠΙΣΩ ΣΤΑ ΦΕΣΤΙΒΑΛ
          </Link>
          
        </div>

        {/* ΚΕΝΤΡΙΚΗ ΠΛΗΡΟΦΟΡΙΑ */}
        <section className="festival-single-main"
  style={{
    width: "90%",
    maxWidth: "1400px",
    marginLeft: "auto",
    marginRight: "auto",
    paddingLeft: "24px",
    paddingRight: "24px",
    paddingBottom: "80px",
    paddingTop: "30px",
    
  }}
>

          <div className="festival-single-header text-center">

            <p className="text-[15px] uppercase tracking-[0.3em] text-[#C2272D]">
              {festival.year}
            </p>

            <h1 className="mt-4 font-serif text-[40px] tracking-[0.08em] ">
              {festival.title}
            </h1>

            {festival.dates && (
              <p className="mt-5 text-[15px] uppercase tracking-[0.2em]">
                {festival.dates}
              </p>
            )}

            {festival.location && (
              <p className="mt-2 text-[13px] uppercase tracking-[0.2em] text-[#C2272D]">
                {festival.location}
              </p>
            )}

          </div>

<br></br>
<br></br>
         
         {/* ΦΩΤΟΓΡΑΦΙΑ + ΕΙΣΑΓΩΓΙΚΟ ΚΕΙΜΕΝΟ */}
<div className="festival-single-intro-grid mx-auto mt-14 grid w-full max-w-6xl grid-cols-1 items-start gap-16 md:grid-cols-[0.85fr_1.15fr]">

  {/* ΑΡΙΣΤΕΡΑ — ΦΩΤΟΓΡΑΦΙΑ */}
  {festival.image && (
    <div className="festival-single-image flex justify-center md:justify-start">
      <img
        src={festival.image}
        alt={festival.title}
        className="h-auto max-h-[75vh] w-full object-contain"
      />
    </div>
  )}

  {/* ΔΕΞΙΑ — ΚΕΙΜΕΝΟ */}
{(festival.quote || festival.intro || festival.lineup) && (
  <div className="festival-single-text pt-2 text-left">

   {festival.quote && (
  <div className="mb-10">
    <p className="font-serif text-4xl leading-tight tracking-wide text-[#252321]">
      «{festival.quote}»
    </p>

    <div className="mt-5 h-[0px] w-20 bg-[#C2272D]" />
  </div>
)}
<br></br>
  
    {festival.intro && (
  <div className="mb-12 space-y-5 text-[17px] leading-relaxed text-black/80">
    {festival.intro.split("\n\n").map((paragraph, index) => (
      <p key={index}>{paragraph}</p>
    ))}
  </div>
)}
<br></br>
{festival.lineup && festival.lineup.length > 0 && (
  <section className="mb-12">

    <h3 className="mb-6 text-[14px] uppercase tracking-[0.25em] text-[#C2272D]">
      LINE UP
    </h3>

    <div className="space-y-8">
      {festival.lineup.map((item, index) => (
        <div key={index}>

          <h4 className="mb-2 font-serif text-[20px] tracking-wide">
            {item.day} | {item.title}
          </h4>

          <p className="text-[16px] leading-relaxed text-black/80">
            {item.artists.join(" • ")}
          </p>

        </div>
      ))}
    </div>
<br></br>
  </section>
)}

{festival.activities && festival.activities.length > 0 && (
  <section className="mb-12">

    <h3 className="mb-5 text-[14px] uppercase tracking-[0.25em] text-[#C2272D]">
      ΠΑΡΑΛΛΗΛΕΣ ΔΡΑΣΤΗΡΙΟΤΗΤΕΣ
    </h3>

    <p className="text-[16px] leading-relaxed text-black/80">
      {festival.activities.join(" • ")}
    </p>
<br></br>
  </section>
)}

{festival.facilities && festival.facilities.length > 0 && (
  <section className="mb-12">

    <h3 className="mb-5 text-[14px] uppercase tracking-[0.25em] text-[#C2272D]">
      ΠΑΡΟΧΕΣ
    </h3>

    <p className="text-[16px] leading-relaxed text-black/80">
      {festival.facilities.join(" • ")}
    </p>

  </section>
)}

{festival.ticketInfo && (
  <section className="mb-12">

    <div className="whitespace-pre-line text-[16px] leading-relaxed text-black/80">
      {festival.ticketInfo}
    </div>

  </section>
)}

    <div className="space-y-6 text-[17px] leading-relaxed text-black/80">
      {festival.description
        .split("\n\n")
        .map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
    </div>

  </div>
)}

</div>


          {/* ΦΩΤΟΓΡΑΦΙΚΟ ΑΡΧΕΙΟ */}
          {festival.images.length > 0 && (
            <section className="festival-single-gallery mt-20">

              <div className="mb-8 flex items-center gap-5">
                <span className="h-px w-12 bg-[#C2272D]" />

               
              </div>


              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                {festival.images.map((image, index) => (
                  <div
                    key={`${image}-${index}`}
                    className="overflow-hidden"
                  >
                    <img
                      src={image}
                      alt={`${festival.title} - φωτογραφία ${index + 1}`}
                      className="
                        h-[320px]
                        w-full
                        object-cover
                        transition
                        duration-500
                        hover:scale-[1.02]
                      "
                    />
                  </div>
                ))}

              </div>

            </section>
          )}


          {/* ΕΠΙΣΤΡΟΦΗ */}
          <div className="mt-20 flex justify-center">

            

          </div>

        </section>
</div>

      {/* =========================================================
          MOBILE ONLY
          Το desktop παραμένει ακριβώς όπως είναι.
         ========================================================= */}
      <style>{`
        @media (max-width: 767px) {

          .festival-single-page {
            width: 100% !important;
            max-width: 100vw !important;
            min-width: 0 !important;
            overflow-x: hidden !important;
            box-sizing: border-box !important;
          }

          /* ΠΙΣΩ ΣΤΑ ΦΕΣΤΙΒΑΛ */
          .festival-single-page .festival-single-back {
            width: 100% !important;
            margin: 0 !important;
            padding: 145px 20px 0 !important;
            box-sizing: border-box !important;
          }

          .festival-single-page .festival-single-back a {
            position: static !important;
            display: inline-flex !important;

            margin: 0 !important;

            font-size: 9px !important;
            line-height: 1.4 !important;
            letter-spacing: 0.12em !important;

            white-space: nowrap !important;
          }

          /* ΚΥΡΙΟ SECTION */
          .festival-single-page .festival-single-main {
            width: 100% !important;
            max-width: 100% !important;

            margin: 0 !important;

            padding: 55px 20px 60px !important;
            box-sizing: border-box !important;
          }

          /* HEADER */
          .festival-single-page .festival-single-header {
            width: 100% !important;
            max-width: 100% !important;

            margin: 0 !important;
            padding: 0 !important;

            text-align: center !important;
          }

          .festival-single-page .festival-single-header p:first-child {
            margin: 0 !important;

            font-size: 10px !important;
            line-height: 1.3 !important;
            letter-spacing: 0.22em !important;
          }

          .festival-single-page .festival-single-header h1 {
            width: 100% !important;
            max-width: 100% !important;

            margin: 12px 0 0 !important;
            padding: 0 !important;

            font-size: clamp(28px, 8.5vw, 40px) !important;
            line-height: 1.08 !important;
            letter-spacing: 0.035em !important;

            text-align: center !important;
            overflow-wrap: break-word !important;
          }

          .festival-single-page .festival-single-header p:nth-of-type(2) {
            margin-top: 15px !important;

            font-size: 9px !important;
            line-height: 1.5 !important;
            letter-spacing: 0.12em !important;
          }

          .festival-single-page .festival-single-header p:nth-of-type(3) {
            margin-top: 6px !important;

            font-size: 8px !important;
            line-height: 1.5 !important;
            letter-spacing: 0.12em !important;
          }

          /* Αφαιρούμε μόνο τα τεχνητά desktop κενά */
          .festival-single-page .festival-single-main > br {
            display: none !important;
          }

          /* ΕΙΚΟΝΑ + ΚΕΙΜΕΝΟ */
          .festival-single-page .festival-single-intro-grid {
            width: 100% !important;
            max-width: 100% !important;

            margin: 40px 0 0 !important;
            padding: 0 !important;

            display: flex !important;
            flex-direction: column !important;

            gap: 32px !important;

            box-sizing: border-box !important;
          }

          .festival-single-page .festival-single-image {
            width: 100% !important;
            max-width: 100% !important;

            margin: 0 !important;
            padding: 0 !important;

            justify-content: center !important;

            box-sizing: border-box !important;
          }

          .festival-single-page .festival-single-image img {
            width: 100% !important;
            max-width: 100% !important;

            height: auto !important;
            max-height: none !important;

            object-fit: contain !important;
            display: block !important;
          }

          .festival-single-page .festival-single-text {
            width: 100% !important;
            max-width: 100% !important;
            min-width: 0 !important;

            margin: 0 !important;
            padding: 0 !important;

            text-align: left !important;
            box-sizing: border-box !important;
          }

          /* QUOTE */
          .festival-single-page .festival-single-text > div:first-child p {
            font-size: 24px !important;
            line-height: 1.25 !important;
            letter-spacing: 0.01em !important;
          }

          .festival-single-page .festival-single-text > div:first-child {
            margin-bottom: 24px !important;
          }

          .festival-single-page .festival-single-text > div:first-child + br {
            display: none !important;
          }

          /* INTRO */
          .festival-single-page .festival-single-text > div:nth-of-type(2) {
            margin-bottom: 30px !important;
          }

          .festival-single-page .festival-single-text > div:nth-of-type(2) p,
          .festival-single-page .festival-single-text > div:last-child p {
            font-size: 14px !important;
            line-height: 1.75 !important;
          }

          /* LINE UP / ACTIVITIES / FACILITIES */
          .festival-single-page .festival-single-text section {
            width: 100% !important;
            max-width: 100% !important;

            margin-bottom: 30px !important;
            padding: 0 !important;

            box-sizing: border-box !important;
          }

          .festival-single-page .festival-single-text section h3 {
            margin-bottom: 14px !important;

            font-size: 10px !important;
            line-height: 1.4 !important;
            letter-spacing: 0.18em !important;
          }

          .festival-single-page .festival-single-text section h4 {
            margin-bottom: 6px !important;

            font-size: 16px !important;
            line-height: 1.25 !important;
          }

          .festival-single-page .festival-single-text section p {
            font-size: 12px !important;
            line-height: 1.65 !important;
          }

          .festival-single-page .festival-single-text section > br {
            display: none !important;
          }

          /* TICKET INFO */
          .festival-single-page .festival-single-text .whitespace-pre-line {
            font-size: 13px !important;
            line-height: 1.7 !important;
          }

          /* GALLERY */
          .festival-single-page .festival-single-gallery {
            width: 100% !important;
            max-width: 100% !important;

            margin-top: 45px !important;
            padding: 0 !important;

            box-sizing: border-box !important;
          }

          .festival-single-page .festival-single-gallery .grid {
            width: 100% !important;
            max-width: 100% !important;

            display: grid !important;
            grid-template-columns: 1fr !important;

            gap: 12px !important;
          }

          .festival-single-page .festival-single-gallery img {
            width: 100% !important;
            height: auto !important;

            max-height: none !important;

            object-fit: cover !important;
          }

          /* FINAL RETURN */
          .festival-single-page .mt-20.flex.justify-center {
            margin-top: 45px !important;
          }
        }

        @media (max-width: 480px) {

          .festival-single-page .festival-single-main {
            padding-left: 18px !important;
            padding-right: 18px !important;
          }

          .festival-single-page .festival-single-back {
            padding-left: 18px !important;
            padding-right: 18px !important;
          }

          .festival-single-page .festival-single-header h1 {
            font-size: 27px !important;
          }

          .festival-single-page .festival-single-text > div:first-child p {
            font-size: 21px !important;
          }

          .festival-single-page .festival-single-text > div:nth-of-type(2) p,
          .festival-single-page .festival-single-text > div:last-child p {
            font-size: 13px !important;
          }
        }
      `}</style>

      </main>

    </>
  );
}