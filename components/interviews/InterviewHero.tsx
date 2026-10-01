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
    <section className="interviews-hero z-10 text-white">

      <div className="interviews-hero-container mx-auto flex min-h-[70vh] max-w-[1100px] px-6 pt-32 pb-16 md:px-10">

        <div className="interviews-hero-title max-w-[900px]">

          <p
            className={`${alegreya.className} mb-5 text-xs uppercase tracking-[0.35em] text-red-600 lg:text-[15px]`}
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
            className={`${alegreya.className} mx-auto mt-8 max-w-2xl text-lg italic leading-[1.9] text-black/90 md:text-xl`}
          >
            Κάθε συνέντευξη είναι μια συνάντηση ανθρώπων,
            <br />
            ιδεών και ιστοριών που φωτίζουν τον κόσμο.
           
          </p>

        </div>

      </div>

       <style jsx>{`
  @media (max-width: 767px) {
    .interviews-hero {
      width: 100% !important;
      max-width: 100% !important;
      min-width: 0 !important;
      margin: 0 !important;
      padding: 0 !important;
      overflow: hidden !important;
      box-sizing: border-box !important;
      
    }

    .interviews-hero-container {
      width: 100% !important;
      max-width: 100% !important;
      min-width: 0 !important;

      min-height: 0 !important;

      margin: 0 !important;
      padding: 115px 20px 45px !important;

      display: block !important;

      box-sizing: border-box !important;
    }

    .interviews-hero-title {
      width: 100% !important;
      max-width: 100% !important;
      min-width: 0 !important;

      margin: 0 !important;
      padding: 0 !important;

      text-align: center !important;

      box-sizing: border-box !important;

      transform: translateX(20px) !important;
    }

    .interviews-hero-title p:first-child {
      width: 100% !important;
      margin: 0 0 18px !important;

      font-size: 9px !important;
      line-height: 1.2 !important;
      letter-spacing: 0.28em !important;

      text-align: center !important;
    }

    .interviews-hero-title h1 {
      width: 100% !important;
      max-width: 100% !important;

      margin: 0 !important;
      padding: 0 !important;

      font-size: 28px !important;
      line-height: 1.1 !important;
      letter-spacing: 0 !important;

      text-align: center !important;
      white-space: nowrap !important;
    }

    .interviews-hero-title h1 + div + p {
      width: 100% !important;
      max-width: 330px !important;

      margin: 25px auto 0 !important;
      padding: 0 !important;

      font-size: 12px !important;
      line-height: 1.55 !important;

      text-align: center !important;
    }

    .interviews-hero br {
      display: none !important;
    }
  }
`}</style>
       

    </section>
  );
}
  