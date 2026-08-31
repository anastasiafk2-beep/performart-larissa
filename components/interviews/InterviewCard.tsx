import { Interview } from "@/components/content/interviews";
import { Spectral, Alegreya } from "next/font/google";
import ProtectedImage from "@/components/ProtectedImage";

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["300", "400"],
});

const alegreya = Alegreya({
  subsets: ["latin"],
  weight: ["400"],
});

type Props = {
  interview: Interview;
};



export default function InterviewCard({ interview }: Props) {

    console.log(interview.title, interview.image);

  return (
  
  <section className="relative overflow-hidden py-36 border-b border-white/10">
    <div
  className="
    absolute inset-0
    bg-[radial-gradient(circle_at_20%_50%,rgba(180,0,0,.05),transparent_45%),
        radial-gradient(circle_at_90%_50%,rgba(180,0,0,.04),transparent_40%)]
    pointer-events-none
  "
/>
    <div className="relative z-10 grid gap-45 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">

      {/* Αριστερά */}
      <div
  style={{
    marginLeft: "clamp(0px, 6vw, 120px)",
  }}
>
    <br></br>
    <br></br>
        <p
          className={`${alegreya.className}
          uppercase
          tracking-[0.3em]
          text-sm
          text-[#C13B3A]`}
        >
          {new Date(interview.date).toLocaleDateString("el-GR")}
        </p>
<br></br>

        <h2
          className={`${spectral.className}
          mt-6
          text-5
          text-[28px]
          
          leading-tight
          text-[#F3F0EA]`}
        >
          {interview.title}
        </h2>
<br></br>

        <p
          className={`${alegreya.className}
          mt-9
          text-xl
          leading-relaxed
          text-[#DDD7CF]`}
        >
        
          {interview.description}
        </p>
      </div>

      {/* Δεξιά */}
      <div
  style={{
    marginLeft: "clamp(0px, 6vw, 120px)",
  }}
>
    
   <br></br>
        {interview.type === "video" ? (
  <iframe
    src={`https://www.youtube.com/embed/${interview.youtubeId}`}
    title={interview.title}
    allowFullScreen
    className="aspect-video h-full w-full"
  />
) : (
  <div className="flex flex-col items-center gap-6">

  {interview.image && (
    <ProtectedImage
      src={interview.image}
      alt={interview.title}
      width={900}
      height={600}
      className="w-full rounded-xl"
    />
  )}

  <a
    href={interview.url}
    target="_blank"
    rel="noopener noreferrer"
    className="mt-9 inline-flex items-center justify-center px-9 py-3 text-base uppercase tracking-[0.18em] text-[#F3F0EA] transition duration-300 hover:bg-[#C13B3A] hover:text-white"
  >
    Διαβάστε το άρθρο →
  </a>

</div>
)}

      </div>
<br></br>
    </div>
  </section>



);

<style jsx>{`
  @media (max-width: 767px) {

    /* ================================
       MOBILE INTERVIEW CARD
       ================================ */

    section {
      width: 100% !important;
      max-width: 100% !important;
      overflow: hidden !important;

      padding: 40px 20px 50px !important;

      margin: 0 !important;
    }


    /* Κεντρικό περιεχόμενο */
    section > div:nth-child(2) {
      width: 100% !important;
      max-width: 100% !important;

      display: flex !important;
      flex-direction: column !important;

      gap: 30px !important;

      margin: 0 auto !important;

      transform: none !important;
    }


    /* ================================
       ΚΕΙΜΕΝΟ
       ================================ */

    section > div:nth-child(2) > div:first-child {

      width: 100% !important;
      max-width: 100% !important;

      margin-left: 0 !important;
      margin-right: 0 !important;

      padding: 0 !important;
    }


    section > div:nth-child(2) > div:first-child p {

      max-width: 100% !important;

      font-size: 14px !important;

      line-height: 1.5 !important;
    }


    section > div:nth-child(2) > div:first-child h2 {

      width: 100% !important;
      max-width: 100% !important;

      font-size: 25px !important;

      line-height: 1.12 !important;

      margin: 10px 0 !important;

      overflow-wrap: break-word !important;
    }


    /* ================================
       ΕΙΚΟΝΑ
       ================================ */

    section > div:nth-child(2) > div:last-child {

      width: 100% !important;
      max-width: 100% !important;

      margin-left: 0 !important;
      margin-right: 0 !important;

      padding: 0 !important;

      display: flex !important;
      flex-direction: column !important;
      align-items: center !important;
    }


    section > div:nth-child(2) > div:last-child img {

      display: block !important;

      width: 100% !important;
      max-width: 100% !important;

      height: auto !important;

      object-fit: contain !important;

      margin: 0 auto !important;

      border-radius: 0 !important;
    }


    /* ================================
       ΚΟΥΜΠΙ
       ================================ */

    section > div:nth-child(2) > div:last-child a {

      width: auto !important;

      min-width: 0 !important;

      margin: 20px auto 0 !important;

      padding: 9px 14px !important;

      font-size: 8px !important;

      line-height: 1 !important;
    }


    /* ================================
       VIDEO
       ================================ */

    section iframe {

      width: 100% !important;

      max-width: 100% !important;

      height: auto !important;

      aspect-ratio: 16 / 9 !important;
    }


    /* Κρύβουμε τα χειροκίνητα <br> μόνο στο mobile */
    section br {
      display: none !important;
    }

  }
`}</style>

}