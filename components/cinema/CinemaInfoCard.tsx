import {
  CalendarDays,
  Clock3,
  Film,
  BadgeInfo,
  Ticket,
} from "lucide-react";

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
  dates: string[];
  time: string;
  duration: string;
  genre: string;
  rating: string;
  ticket: string;
};

function Row({
  icon: Icon,
  title,
  value,
}: {
  icon: any;
  title: string;
  value: React.ReactNode;
}) {
  return (
    <div className="py-5 border-b border-[#ece5e5] last:border-none">

      <div className="flex items-start gap-3">

        <Icon
          className="mt-1 h-5 w-5 text-[#D7262F]"
        />
        <div>

          <h5
            className={`${alegreya.className}
            text-[16px]
            uppercase
            tracking-[0.02em]
            text-[#D7262F]
            `}
          >
            {title}
          </h5>
          <div
            className={`${alegreya.className}
            mt-2
            text-[18px]
            leading-8
            text-[#343434]
            `}
          >
            {value}
          </div>

        </div>

      </div>

    </div>
  );
}

export default function CinemaInfoCard({
  dates,
  time,
  duration,
  genre,
  rating,
  ticket,
}: Props) {
  return (

    <div
      className="
      mt-10
      p-10
      backdrop-blur-md
      "
    >
<br></br>
      <h3
        className={`${spectral.className}
        text-[17px]
        uppercase
        
        tracking-[0.12em]
        text-[#D7262F]
        `}
      >
        Πληροφορίες Προβολής
      </h3>
<br></br>
      <div className="mt-8">

        <Row
          icon={CalendarDays}
          title="Ημερομηνίες"
          value={dates.map((date) => (
            <div key={date}>{date}</div>
          ))}
        />

        <Row
          icon={Clock3}
          title="Ώρα Έναρξης"
          value={time}
        />

        <Row
          icon={Clock3}
          title="Διάρκεια"
          value={duration}
        />

        <Row
          icon={Film}
          title="Είδος"
          value={genre}
        />

        <Row
          icon={BadgeInfo}
          title="Καταλληλότητα"
          value={rating}
        />

        <Row
          icon={Ticket}
          title="Εισιτήριο"
          value={ticket}
        />

      </div>

    </div>

  );
}