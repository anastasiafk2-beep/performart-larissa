import Link from "next/link";
import { festivals } from "@/content/festivals";
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

  const festival = festivals.find(
    (item) => item.id === id
  );

  if (!festival) {
    return (
      <main className="min-h-screen bg-[#FBF7F3] px-6 py-32 text-center">
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
        className="relative min-h-screen overflow-hidden bg-[#B5DED7] text-[#252321]"
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
      
        
        <div className="px-6 pt-8 md:px-10">
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
        <section
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

          <div className="text-center">

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
<div className="mx-auto mt-14 grid w-full max-w-6xl grid-cols-1 items-start gap-16 md:grid-cols-[0.85fr_1.15fr]">

  {/* ΑΡΙΣΤΕΡΑ — ΦΩΤΟΓΡΑΦΙΑ */}
  {festival.image && (
    <div className="flex justify-center md:justify-start">
      <img
        src={festival.image}
        alt={festival.title}
        className="h-auto max-h-[75vh] w-full object-contain"
      />
    </div>
  )}

  {/* ΔΕΞΙΑ — ΚΕΙΜΕΝΟ */}
{(festival.quote || festival.intro || festival.lineup) && (
  <div className="pt-2 text-left">

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
            <section className="mt-20">

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
      </main>

    </>
  );
}