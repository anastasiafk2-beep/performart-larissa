import CinemaPoster from "./CinemaPoster";
import CinemaInfoCard from "./CinemaInfoCard";
import CinemaArticle from "./CinemaArticle";

type CinemaEventProps = {
  year: string;
  title: string;
  subtitle: string;
  description: string[];
  dates: string[];
  time: string;
  duration: string;
  genre: string;
  rating: string;
  ticket: string;
  image: string;
};

export default function CinemaEvent({
  year,
  title,
  subtitle,
  description,
  dates,
  time,
  duration,
  genre,
  rating,
  ticket,
  image,
}: CinemaEventProps) {
  return (
    <section
  id={title.toLowerCase().replace(/\s+/g, "-")}
  className="
    relative
    overflow-hidden
    py-32
  "
>
      {/* Decorative background */}

      <div className="absolute inset-0 -z-10 " />

      <div
        className="
          absolute
          left-0
          top-0
          -z-10
          h-full
          w-[35%]
          bg-[radial-gradient(circle_at_top_left,rgba(215,38,47,0.10),transparent_65%)]
        "
      />

      <div
        className="
          absolute
          right-0
          bottom-0
          -z-10
          h-full
          w-[35%]
          bg-[radial-gradient(circle_at_bottom_right,rgba(215,38,47,0.08),transparent_65%)]
        "
      />
<br></br>
      <div
  style={{
    marginLeft: "300px",
    
  }}
  className="flex
  items-start
    gap-40"
>
        {/* LEFT */}

        <div
  className="
    w-[350px]
    shrink-0
    rounded-[30px]
    border border-[#E9D8C8]
    bg-white/90
    shadow-xl
    overflow-hidden
  "
>

  <CinemaPoster
    image={image}
    title={title}
  />

  <CinemaInfoCard
    dates={dates}
    time={time}
    duration={duration}
    genre={genre}
    rating={rating}
    ticket={ticket}
  />

</div>

        {/* RIGHT */}

        <CinemaArticle
        
          year={year}
          title={title}
          subtitle={subtitle}
          description={description}
        />

      </div>

    </section>
  );
}