import { Alegreya, Spectral } from "next/font/google";

const alegreya = Alegreya({
  subsets: ["latin", "greek"],
  weight: ["400", "500"],
});

const spectral = Spectral({
  subsets: ["latin", "greek"],
  weight: ["300", "400"],
});

export default function CinemaHero() {
  return (
    <section
      className="
        relative
        overflow-hidden
      
      "
    >
      {/* Background */}

     

      {/* Overlay */}

      <div className="absolute inset-0 -z-10 " />

      <div
        className="
          mx-auto
          flex
          min-h-[40vh]
          max-w-[1900px]
          events-page
          px-20
          pt-60
          pb-44
        "
      >
        <div className="grid w-full max-w-[200px] grid-cols-[1fr_380px] gap-24">

{/* ΤΙΤΛΟΣ CINEMA */}
<div className="max-w-[900px] ">
<br></br>
<br></br>
<br></br>


  <div
    className={`${alegreya.className} mb-4 text-[15px] uppercase tracking-[0.35em] text-[#B32025]`}
  >
    CINEMA
  </div>
<br></br>
  <h1
            className={`${spectral.className} text-5xl uppercase tracking-[0.25em] text-black md:text-6xl lg:text-[57px]`}
  >
    ΣΙΝΕΜΑ
  </h1>

 
<br></br>
  <p
    className={`${alegreya.className}
      mt-6
      text-[14px]
      uppercase
      tracking-[0.28em]
      text-black
    `}
  >
    ΠΡΟΒΟΛΕΣ&nbsp;&nbsp;•&nbsp;&nbsp;ΠΡΟΓΡΑΜΜΑ&nbsp;&nbsp;•&nbsp;&nbsp;ΚΡΙΤΙΚΕΣ
  </p>

</div>

  

</div>
      </div>
    </section>
  );
}