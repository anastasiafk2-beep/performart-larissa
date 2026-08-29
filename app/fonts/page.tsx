import {
  DM_Serif_Display,
  Prata,
  Cormorant_Garamond,
  Libre_Caslon_Display,
  Lora,
  Crimson_Text,
  Spectral,
  Source_Serif_4,
  Alegreya,
  EB_Garamond,
  Noto_Serif,
} from "next/font/google";

const dm = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
});

const prata = Prata({
  subsets: ["latin"],
  weight: "400",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
});

const libre = Libre_Caslon_Display({
  subsets: ["latin"],
  weight: "400",
});

const lora = Lora({
  subsets: ["latin"],
});

const crimson = Crimson_Text({
  subsets: ["latin"],
  weight: ["400", "600"],
});

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["400", "500"],
});

const source = Source_Serif_4({
  subsets: ["latin", "greek"],
});

const alegreya = Alegreya({
  subsets: ["latin"],
});

const eb = EB_Garamond({
  subsets: ["latin", "greek"],
});

const noto = Noto_Serif({
  subsets: ["latin", "greek"],
});

const fonts = [
  { name: "DM Serif Display", font: dm },
  { name: "Prata", font: prata },
  { name: "Cormorant Garamond", font: cormorant },
  { name: "Libre Caslon Display", font: libre },
  { name: "Lora", font: lora },
  { name: "Crimson Text", font: crimson },
  { name: "Spectral", font: spectral },
  { name: "Source Serif 4", font: source },
  { name: "Alegreya", font: alegreya },
  { name: "EB Garamond", font: eb },
  { name: "Noto Serif", font: noto },
];

export default function FontsPage() {
  return (
    <main className="min-h-screen bg-[#090909] py-20">

      <div className="mx-auto max-w-7xl px-8">

        <h1 className="mb-20 text-center text-5xl font-light text-white">
          PerformArt Typography Test
        </h1>

        <div className="space-y-24">

          {fonts.map((item) => (
            <section
              key={item.name}
              className="border border-neutral-800 p-14"
            >
              <p className="mb-8 text-sm uppercase tracking-[0.3em] text-[#b9795c]">
                {item.name}
              </p>

              <div className={item.font.className}>

                <p className="italic text-[22px] text-[#b9795c]">
                  Ένα σημείωμα από τον
                </p>

                <h2 className="mt-6 text-[60px] uppercase tracking-[0.28em] text-[#f2f0ea]">
                  ΕΥΡΙΠΙΔΗ ΚΟΥΤΣΙΝΑ
                </h2>

                <div className="my-10 h-px w-24 bg-[#b9795c]" />

                <div className="max-w-3xl space-y-8 text-[23px] leading-[2] text-[#d6d2ca]">

                  <p>
                    Πάντα πίστευα πως πίσω από κάθε παράσταση,
                    κάθε τραγούδι και κάθε έργο τέχνης υπάρχει
                    μια ιστορία που αξίζει να ακουστεί.
                  </p>

                  <p>
                    Μέσα από συνεντεύξεις, παρουσιάσεις,
                    αφιερώματα και συνεργασίες με καλλιτέχνες,
                    στόχος μου είναι να αναδεικνύω όχι μόνο το
                    έργο τους αλλά και την ανθρώπινη πλευρά τους.
                  </p>

                </div>

              </div>

            </section>
          ))}

        </div>

      </div>

    </main>
  );
}