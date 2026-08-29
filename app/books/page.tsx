import { Alegreya, Spectral } from "next/font/google";

const alegreya = Alegreya({
  subsets: ["latin", "greek"],
  weight: ["400", "500"],
});

const spectral = Spectral({
  subsets: ["latin", "greek"],
  weight: ["300", "400"],
});

export default function BooksPage() {
  return (
    <main
      className=" min-h-screen  bg-[#CFC0AE]/90 text-[#171717]"
      
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/40" />

      <div className="relative z-10 mx-auto min-h-screen max-w-[1300px] px-8 py-20 translate-x-[370px] translate-y-[110px]">

        {/* ΤΙΤΛΟΣ */}
        <div >
          <div
            className={`${alegreya.className} mb-3 text-[13px] uppercase tracking-[0.45em] text-red-700`}
          >
            BOOK
          </div>

          <h1
            className={`${spectral.className} text-[58px] uppercase tracking-[0.22em] text-black`}
          >
            ΒΙΒΛΙΟ
          </h1>
<br></br>
          <div className="mx-auto mt-6 h-px w-16 bg-white" />
        </div>

        {/* ΒΙΒΛΙΟ ΤΗΣ ΕΒΔΟΜΑΔΑΣ */}
        <section className="mt-20">


          {/* ΚΕΝΤΡΙΚΟ ΠΛΑΙΣΙΟ */}
          <div className="mx-auto max-w-[1050px] border border-black/20 bg-white/5 backdrop-blur-[2px]">

            <div className="grid min-h-[430px] grid-cols-2">

              {/* ΘΕΣΗ ΕΞΩΦΥΛΛΟΥ */}
              <div className="flex items-center justify-center border-r border-black/15 p-12">
                <div className="flex h-[330px] w-[230px] items-center justify-center border border-black/20 bg-white/5">
                  <span
                    className={`${alegreya.className} text-center text-xs uppercase tracking-[0.3em] text-black`}
                  >
                    ΕΞΩΦΥΛΛΟ
                    <br />
                    ΒΙΒΛΙΟΥ
                  </span>
                </div>
              </div>

              {/* ΠΛΗΡΟΦΟΡΙΕΣ ΒΙΒΛΙΟΥ */}
              <div className="flex flex-col justify-center px-14 py-12">

                <div
                  className={`${alegreya.className} text-[12px] uppercase tracking-[0.4em] text-red-700`}
                >
                  ΒΙΒΛΙΟ ΤΗΣ ΕΒΔΟΜΑΔΑΣ
                </div>

                <h2
                  className={`${spectral.className} mt-5 text-[42px] leading-tight text-black`}
                >
                  Τίτλος βιβλίου
                </h2>

                <div />

                <p
                  className={`${alegreya.className} mt-5 text-[20px] text-black`}
                >
                  Συγγραφέας
                </p>
<br></br>
                <p
                  className={`${alegreya.className} mt-8 max-w-[500px] text-[17px] leading-[1.9] text-black/65`}
                >
                  Εδώ θα μπει αργότερα μια σύντομη παρουσίαση
                  του βιβλίου της εβδομάδας.
                </p>
<br></br>
<br></br>
                <div className="mt-10">
                  <button
                    className={`${alegreya.className} border border-red-700 px-8 py-3 text-[12px] uppercase tracking-[0.35em] text-black transition-colors duration-300 hover:bg-red-900 hover:text-white`}
                  >
                    ΠΕΡΙΣΣΟΤΕΡΑ →
                  </button>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ΚΑΤΩ ΜΗΝΥΜΑ */}
        <section className="mt-24 ">
<br></br>
          <div className="mx-auto h-px w-12 " />

          <p
            className={`${alegreya.className} mt-8 text-[25px] italic leading-[1.6] text-black`}
          >
            Οι σελίδες γράφονται ακόμη.
          </p>
<br></br>
          <div className="mt-10">
            <span
              className={`${alegreya.className} inline-block border border-red/800 px-8 py-3 text-[12px] uppercase tracking-[0.4em] text-red-800`}
            >
              ΣΥΝΤΟΜΑ ΠΕΡΙΣΣΟΤΕΡΑ
            </span>
          </div>

        </section>

      </div>
    </main>
  );
}