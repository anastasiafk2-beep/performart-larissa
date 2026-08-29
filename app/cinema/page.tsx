import CinemaCalendar from "@/components/cinema/CinemaCalendar";
import CinemaNowPlaying from "@/components/cinema/CinemaNowPlaying";
import CinemaHero from "@/components/cinema/CinemaHero";
import Footer from "@/components/layout/Footer";
import CinemaReviews from "@/components/cinema/CinemaReviews";

export default function CinemaPage() {
  return (
    <main
      className=" overflow-hidden bg-[#707BD4]/80"
     
    >
      {/* Light overlay */}

      <div className="absolute inset-0 bg-white/70 pointer-events-none" />

     <div className="relative z-10">

  <CinemaHero />

 <section className="mx-auto flex justify-center px-8 py-12">

  <div className="grid w-full max-w-[1300px] grid-cols-[700px_1fr] gap-20 items-center">

    {/* ΗΜΕΡΟΛΟΓΙΟ */}
    <div className="flex flex-col ">
      <h2 className="font-serif text-[17px] tracking-[6.2] text-[#B32025]">
        ΗΜΕΡΟΛΟΓΙΟ ΠΡΟΒΟΛΩΝ
      </h2>
<br></br>
      <CinemaCalendar />
    </div>

    {/* ΤΙ ΠΑΙΖΕΙ */}
    <div style={{ marginTop: "100px" }}>
      <CinemaNowPlaying />
    </div>
<br></br>
<br></br>
  </div>

</section>

  
       
<CinemaReviews />
      </div>
    </main>
  );
}