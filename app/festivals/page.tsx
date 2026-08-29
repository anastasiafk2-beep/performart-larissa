import FestivalHero from "@/components/festivals/FestivalHero";
import FestivalSection from "@/components/festivals/FestivalSection";
import FestivalUpcomingCard from "@/components/festivals/FestivalUpcomingCard";
import { festivals } from "@/content/festivals/festivals";
import FestivalCalendar from "@/components/festivals/FestivalCalendar";


export default function FestivalsPage() {
  return (
      <main
      className=" overflow-hidden bg-[#B5DED7]/90"
     
    >
      {/* Light overlay */}

      <div className="absolute inset-0 bg-white/70 pointer-events-none" />

     <div className="relative z-10">

    <FestivalHero />

      <section className="mx-auto flex justify-center px-8 py-12">
  <div className="grid w-full max-w-[1300px] grid-cols-[700px_1fr] gap-20 items-center">

    {/* ΗΜΕΡΟΛΟΓΙΟ ΦΕΣΤΙΒΑΛ */}
    <div className="flex flex-col">
      <h2 className="font-serif mb-5 text-[20px] tracking-[0.18em]  text-[#C13B3A]">
        ΗΜΕΡΟΛΟΓΙΟ ΦΕΣΤΙΒΑΛ
      </h2>

      <FestivalCalendar />
    </div>

    {/* ΕΠΕΡΧΟΜΕΝΑ ΦΕΣΤΙΒΑΛ */}
<div className="flex flex-col">
  <div className="mb-6">
    
<br></br>
    <h2 className="mt-3 font-serif  text-4xl text-[20px] tracking-[0.08em] text-[#C13B3A]">
      ΕΠΕΡΧΟΜΕΝΑ ΦΕΣΤΙΒΑΛ
    </h2>
  </div>

<br></br>
  <div className="w-[95%] h-[280px] max-w-[600px] mx-auto grid grid-cols-1 gap-6 bg-black/3">
    {festivals
      .filter((festival) => festival.upcoming)
      .map((festival) => (
        <FestivalUpcomingCard
          key={festival.id}
          id={festival.id}
          title={festival.title}
          year={festival.year}
          dates={festival.dates}
          location={festival.location}
          description={festival.description}
            image={festival.image}

        />
      ))}
      
      
  </div>
  <br></br>
<br></br>
<br></br>
<br></br>
  <div className="mt-8">
    <a
      href="/festivals/archive"
        style={{
    padding: "6px 22px",
    minWidth: "220px",
    marginLeft: "100px",
    color: "#000000",
  }}
      className="border border-[#C13B3A] bg-white/10 px-8 py-3 uppercase tracking-[0.2em] text-black transition hover:bg-[#C13B3A] hover:text-black"
    
    >
      ΔΕΙΤΕ ΟΛΑ ΤΑ ΦΕΣΤΙΒΑΛ →
    </a>
  </div>
</div>

  </div>

</section>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>

{/* ΑΡΧΕΙΟ ΦΕΣΤΙΒΑΛ */}

<section className="mx-auto mt-40 flex w-full max-w-[1900px] flex-col items-center px-6">

  <div className="mb-16 text-center">
    <h2 className="font-[Spectral] w-full text-center text-4xl tracking-[0.18em] uppercase text-black">
      ΑΡΧΕΙΟ ΦΕΣΤΙΒΑΛ
    </h2>
<br></br>
<br></br>
    <div className="mx-auto mt-6 h-px w-32 bg-[#C13B3A]" />
  </div>
<div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-10 md:grid-cols-2">

 <FestivalSection
 id="anilio-park-festival"
  year="2025"
  title="ANILIO PARK FESTIVAL"
  description="..."
  images={festivals.find((festival) => festival.id === "anilio-park-festival")?.images ?? []}
/>

<FestivalSection
id="plastiras-lake-festival"
  year="2025"
  title="PLASTIRAS LAKE FESTIVAL"
  description="..."
  images={festivals.find((festival) => festival.id === "plastiras-lake-festival")?.images ?? []}
/>
<br></br>
</div>

</section>

     </div>
    </main>
  );
}