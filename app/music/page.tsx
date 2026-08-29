import { Alegreya, Spectral } from "next/font/google";

const alegreya = Alegreya({
  subsets: ["latin"],
  weight: ["400", "500"],
});

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["300", "400"],
});

export default function MusicPage() {
  return (
    <main
      className="min-h-screen bg-red-600 text-red-700"
      style={{
        backgroundImage: "url('/images/music/music-bg.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 " />

      {/* CONTENT */}
      <div className=" relative z-10 mx-auto min-h-screen max-w-[1400px] px-8 py-20 translate-x-[280px] translate-y-[120px]">

        {/* ========================= */}
        {/* ΤΙΤΛΟΣ */}
        {/* ========================= */}

       <div  >
          <div
            className={`${alegreya.className} mb-3 text-[13px] uppercase tracking-[0.45em] text-red-700`}
             ></div>
          ΜUSIC
          </div>
<br></br>
           <h1
            className={`${spectral.className} text-5xl uppercase tracking-[0.15em] text-white/90 md:text-6xl lg:text-[55px]`}
          >
            ΜΟΥΣΙΚΗ
          </h1>

           <br></br>
           <br></br>
        
        {/* ========================= */}
        {/* ΝΕΕΣ ΚΥΚΛΟΦΟΡΙΕΣ + ΚΑΛΛΙΤΕΧΝΕΣ */}
        {/* ========================= */}

        <section className="mt-20 grid grid-cols-1 gap-8 lg:grid-cols-2">


          {/* ========================= */}
          {/* ΝΕΕΣ ΚΥΚΛΟΦΟΡΙΕΣ */}
          {/* ========================= */}

          <div
            className="
              border
              border-[#E8C5C2]/90
              bg-white/70
              px-8
              py-8
            "
          >
<br></br>

            <h2
              className={`${alegreya.className}
                mb-10
                text-center
                text-[15px]
                uppercase
                tracking-[0.35em]
                text-red-800
              `}
            >
              ΝΕΕΣ ΚΥΚΛΟΦΟΡΙΕΣ
            </h2>
<br></br>

            <div className="grid grid-cols-3 gap-6">


              {/* ΚΥΚΛΟΦΟΡΙΑ 1 */}

              <div className="text-center">

                <div
                  className="
                    aspect-square
                    w-full
                    border
                    border-white/10
                    bg-white/5
                  "
                />

                <p
                  className={`${alegreya.className}
                    mt-4
                    text-[15px]
                    text-black
                  `}
                >
                  Τίτλος άλμπουμ
                </p>

                <p
                  className={`${alegreya.className}
                    mt-1
                    text-[12px]
                    text-black/60
                  `}
                >
                  Καλλιτέχνης
                </p>

                <p
                  className={`${alegreya.className}
                    mt-1
                    text-[14px]
                    text-red-700
                  `}
                >
                  2026
                </p>

              </div>


              {/* ΚΥΚΛΟΦΟΡΙΑ 2 */}

              <div className="text-center">

                <div
                  className="
                    aspect-square
                    w-full
                    border
                    border-white/10
                    bg-white/5
                  "
                />

                <p
                  className={`${alegreya.className}
                    mt-4
                    text-[15px]
                    text-black
                  `}
                >
                  Τίτλος άλμπουμ
                </p>

                <p
                  className={`${alegreya.className}
                    mt-1
                    text-[12px]
                    text-black/70
                  `}
                >
                  Καλλιτέχνης
                </p>

                <p
                  className={`${alegreya.className}
                    mt-1
                    text-[13px]
                    text-red-700
                  `}
                >
                  2026
                </p>

              </div>


              {/* ΚΥΚΛΟΦΟΡΙΑ 3 */}

              <div className="text-center">

                <div
                  className="
                    aspect-square
                    w-full
                    border
                    border-white/10
                    bg-white/5
                  "
                />

                <p
                  className={`${alegreya.className}
                    mt-4
                    text-[15px]
                    text-black
                  `}
                >
                  Τίτλος άλμπουμ
                </p>

                <p
                  className={`${alegreya.className}
                    mt-1
                    text-[12px]
                    text-black/70
                  `}
                >
                  Καλλιτέχνης
                </p>

                <p
                  className={`${alegreya.className}
                    mt-1
                    text-[13px]
                    text-red-700
                  `}
                >
                  2026
                </p>

              </div>

            </div>

<br></br>
            {/* BUTTON */}

            <div className="mt-10 text-center">

              <a
                href="#"
                className={`${alegreya.className}
                  inline-block
                  border
                  border-red-800
                  px-7
                  py-3
                  text-[12px]
                  uppercase
                  tracking-[0.35em]
                  text-black
                  transition-colors
                  hover:bg-red-900
                  hover:text-black
                `}
              >
                ΔΕΙΤΕ ΠΕΡΙΣΣΟΤΕΡΑ →
              </a>

            </div>
<br></br>
          </div>



          {/* ========================= */}
          {/* ΚΑΛΛΙΤΕΧΝΕΣ */}
          {/* ========================= */}

          <div
            className="
              border
              border-white/20
              bg-white/70
              px-8
              py-8
            "
          >

            <h2
              className={`${alegreya.className}
                mb-10
                text-center
                text-[15px]
                uppercase
                tracking-[0.35em]
                text-red-800
              `}
            >
              <br></br>
              ΚΑΛΛΙΤΕΧΝΕΣ
            </h2>


            <div className="grid grid-cols-3 gap-6">


              {/* ΚΑΛΛΙΤΕΧΝΗΣ 1 */}

              <div className="text-center">
<br></br>
<br></br>
<br></br>
                <div
                  className="
                    mx-auto
                    h-24
                    w-24
                    rounded-full
                    border
                    border-white/20
                    bg-white/5
                  "
                  
                />

                <p
                  className={`${alegreya.className}
                    mt-5
                    text-[15px]
                    text-black
                  `}
                  
                >
                  
                  Όνομα Καλλιτέχνη
                </p>

                <p
                  className={`${alegreya.className}
                    mt-2
                    text-[11px]
                    uppercase
                    tracking-[0.2em]
                    text-red-700
                  `}
                >
                  Είδος μουσικής
                </p>

              </div>


              {/* ΚΑΛΛΙΤΕΧΝΗΣ 2 */}

              <div className="text-center">
<br></br>
<br></br>
<br></br>
                <div
                  className="
                    mx-auto
                    h-24
                    w-24
                    rounded-full
                    border
                    border-white/20
                    bg-white/5
                  "
                />

                <p
                  className={`${alegreya.className}
                    mt-5
                    text-[15px]
                    text-black
                  `}
                >
                  Όνομα Καλλιτέχνη
                </p>

                <p
                  className={`${alegreya.className}
                    mt-2
                    text-[11px]
                    uppercase
                    tracking-[0.2em]
                    text-red-700
                  `}
                >
                  Είδος μουσικής
                </p>

              </div>


              {/* ΚΑΛΛΙΤΕΧΝΗΣ 3 */}

              <div className="text-center">
<br></br>
<br></br>
<br></br>
                <div
                  className="
                    mx-auto
                    h-24
                    w-24
                    rounded-full
                    border
                    border-white/20
                    bg-white/5
                  "
                />

                <p
                  className={`${alegreya.className}
                    mt-5
                    text-[15px]
                    text-black
                  `}
                >
                  Όνομα Καλλιτέχνη
                </p>

                <p
                  className={`${alegreya.className}
                    mt-2
                    text-[11px]
                    uppercase
                    tracking-[0.2em]
                    text-red-700
                  `}
                >
                  Είδος μουσικής
                </p>

              </div>

            </div>


            {/* BUTTON */}

            <div className="mt-10 text-center">
<br></br>
<br></br>
<br></br>
<br></br>

              <a
                href="#"
                className={`${alegreya.className}
                  inline-block
                  border
                  border-red-700
                  px-7
                  py-3
                  text-[12px]
                  uppercase
                  tracking-[0.35em]
                  text-black
                  transition-colors
                  hover:bg-red-900
                  hover:text-white
                `}
                
              >
                
                ΔΕΙΤΕ ΠΕΡΙΣΣΟΤΕΡΑ →
              </a>

            </div>

          </div>

        </section>



        {/* ========================= */}
        {/* ΚΑΤΩ ΜΗΝΥΜΑ */}
        {/* ========================= */}

        <section className="mt-20 pb-16 text-center">

          <p
            className={`${alegreya.className}
              text-[27px]
              italic
              leading-[1.6]
              text-white/70
            `}
            
          >
            <br></br>
            Η μουσική γράφεται ακόμη.
          </p>
<br></br>

          <div className="mt-8">

            <span
              className={`${alegreya.className}
                inline-block
                border
                border-white/30
                px-7
                py-3
                text-[16px]
                uppercase
                tracking-[0.35em]
                text-white/50
              `}
            >
              ΣΥΝΤΟΜΑ ΠΕΡΙΣΣΟΤΕΡΑ
            </span>

          </div>

        </section>

      </div>

    </main>
  );
}