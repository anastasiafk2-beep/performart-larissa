"use client";

import Image from "next/image";
import Link from "next/link";
import { interviews } from "@/components/content/interviews";
import { Spectral, Alegreya } from "next/font/google";

const spectral = Spectral({
  subsets: ["latin", "greek"],
  weight: ["300", "400"],
});

const alegreya = Alegreya({
  subsets: ["latin", "greek"],
  weight: ["400"],
});

export default function InterviewsArchivePage() {
  const sortedInterviews = [...interviews].sort(
    (a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (

    
    <main
      className=" min-h-screen overflow-hidden bg-[#C8BCCB] text-[#111111]"
      style={{
        backgroundImage: "url('/backgrounds/cinema-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundAttachment: "fixed",
      }}
    >
      {/* ελαφρύ overlay */}
      <div className="absolute inset-0 bg-[#D2C6D4]/95 pointer-events-none" />

      
      {/* ΠΕΡΙΕΧΟΜΕΝΟ */}
      <div className="relative bg-[#D2C6D4]/95 z-10 mx-auto flex w-full max-w-[1950px] flex-col items-center px-6 pt-40 pb-28 md:px-10 lg:px-12">
<br></br>
<br></br>

  {/* ΕΠΙΣΤΡΟΦΗ */}
       <div className="mt-8 flex relative -left-137 justify-start text-lg px-6"
       style={{
 
  padding: "25px 17px",
}}>

          <Link
            href="/interviews"
            className={`${alegreya.className} border border-[#C13B3A] px-8 py-3 text-xs uppercase tracking-[0.25em] text-black transition hover:bg-[#C13B3A] hover:text-white`}
          style={{
  fontSize: "14px",
  padding: "10px 17px",
}}>
            ← ΠΙΣΩ ΣΤΙΣ ΣΥΝΕΝΤΕΥΞΕΙΣ
          </Link>

        </div>

        {/* ΤΙΤΛΟΣ */}
        <header className="mb-20 ">

          <p
            className={`${alegreya.className} mb-4 text-[15px] uppercase tracking-[0.45em] text-[#C13B3A]`}
          >
            INTERVIEWS
          </p>
<br></br>
          <h1
            className={`${spectral.className} text-5xl uppercase tracking-[0.16em] text-black md:text-6xl lg:text-5xl`}
          >
            ΟΛΕΣ ΟΙ ΣΥΝΕΝΤΕΥΞΕΙΣ
          </h1>
<br></br>
          <div/>

          <br></br>
<br></br>
        </header>

        {/* GRID */}
        <section className="mx-auto grid w-full max-w-[1050px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
style={{ maxWidth: "1200px" }} >
          {sortedInterviews.map((interview) => (

            <Link
              key={interview.id}
              href={`/interviews/${interview.id}`}
              className="group block"
            >

              <article className="overflow-hidden border border-[#BBAEBD] bg-[#AFA0B2]"
style={{ maxWidth: "290px" }}
>
                {/* ΦΩΤΟΓΡΑΦΙΑ */}
                <div className="relative overflow-hidden bg-[#BBAEBD]">

                 {interview.image ? (
  <Image
    src={interview.image}
    alt={interview.title}
    width={800}
    height={500}
    className="block w-full h-auto object-cover"
  />
) : (
  <div className="flex aspect-[2/3] w-full items-center justify-center bg-[#AFA0B2]">
    <span className="text-[10px] tracking-[0.3em] text-white">
      INTERVIEW STORIES
    </span>
  </div>
)}
                  {/* hover overlay */}
                  <div className="absolute inset-0 bg-black/0 transition duration-500 group-hover:bg-black/15" />

                </div>

                {/* ΚΕΙΜΕΝΟ */}
                <div className="px-5 py-5">

                  <p
                    className={`${alegreya.className} text-[14px] uppercase tracking-[0.3em] text-red-800`}
                  style={{ paddingLeft: "14px", paddingRight: "24px" }}
                  >
                    {new Date(interview.date).toLocaleDateString("el-GR")}
                  </p>

                  <h2
                    className={`${spectral.className} mt-3 text-[17px] leading-tight text-black`}
                  style={{ paddingLeft: "12px", paddingRight: "24px" }}
                  >
                    {interview.title}
                  </h2>

                  <br></br>

                  <div
                    className={`${alegreya.className} mt-6 inline-block border-b border-[#C13B3A] pb-1 text-[13px] uppercase tracking-[0.25em] text-red-900 transition group-hover:text-[#C13B3A]`}
                  style={{ paddingLeft: "14px", paddingRight: "24px" }}
                  >
                    ΔΙΑΒΑΣΤΕ ΤΟ ΑΡΘΡΟ →
                  </div>

                </div>

              </article>

            </Link>

          ))}

        <br></br>

         

        </section>

      

      </div>
    </main>
  );
}