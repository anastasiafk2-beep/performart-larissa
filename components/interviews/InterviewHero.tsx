import { Alegreya, Spectral } from "next/font/google";

const alegreya = Alegreya({
  subsets: ["latin"],
  weight: ["400", "500"],
});

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["300", "400"],
});

export default function InterviewHero() {
  return (
    <section className=" z-10 text-white">

      <div className="mx-auto flex min-h-[70vh] max-w-[1100px] px-6 pt-32 pb-16 md:px-10">

        <div className="max-w-[900px] ">

          <p
            className={`${alegreya.className} mb-5 text-xs uppercase tracking-[0.35em] text-[#C13B3A] lg:text-[15px]`}
          >
            INTERVIEWS
          </p>
<br></br>
          <h1
            className={`${spectral.className} text-5xl uppercase tracking-[0.15em] text-black md:text-6xl lg:text-[55px]`}
          >
            ΣΥΝΕΝΤΕΥΞΕΙΣ
          </h1>

          <div/>
<br></br>
          <p
            className={`${alegreya.className} mx-auto mt-8 max-w-2xl text-lg italic leading-[1.9] text-black/80 md:text-xl`}
          >
            Κάθε συνέντευξη είναι μια συνάντηση ανθρώπων,
            <br />
            ιδεών και ιστοριών που φωτίζουν τον κόσμο.
           
          </p>

        </div>

      </div>

    </section>
  );
}