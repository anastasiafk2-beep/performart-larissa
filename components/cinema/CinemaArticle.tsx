import { Alegreya, Spectral } from "next/font/google";

const alegreya = Alegreya({
  subsets: ["latin", "greek"],
  weight: ["400", "500"],
});

const spectral = Spectral({
  subsets: ["latin", "greek"],
  weight: ["300", "400"],
});

type Props = {
  year: string;
  title: string;
  subtitle: string;
  description: string[];
};

export default function CinemaArticle({
  year,
  title,
  subtitle,
  description,
}: Props) {
  return (
    
    <article className="flex-1 max-w-[660px]">
<br></br>
      <span
        className={`${alegreya.className}
          uppercase
          tracking-[0.45em]
          text-[#D7262F]
          text-[23px]
        `}
      >
        {year}
      </span>
      <br></br>
      <br></br>

      <h2
        className={`${spectral.className}
          mt-5
          text-[58px]
          leading-none
          uppercase
          tracking-[0.12em]
          text-[#202020]
        `}
      >
        {title}
      </h2>
<br></br>

      <h3
        className={`${alegreya.className}
          mt-8
          text-[25px]
          italic
          text-[#6A6A6A]
        `}
      >
        {subtitle}
      </h3>
<br></br>
<br></br>
      <div className="mt-16 space-y-10">

        {description.map((paragraph, index) => (

          <p
            key={index}
            className={`${alegreya.className}
              text-[21px]
              leading-[2.2]
              text-[#303030]
            `}
          >
            {paragraph}
          </p>

        ))}

      </div>

    </article>
  );
}