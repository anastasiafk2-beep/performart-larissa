import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface HomeCardProps {
  number: string;
  title: string;
  href: string;
  icon: LucideIcon;
  image: string;
  onClick?: () => void;
}

export default function HomeCard({
  number,
  title,
  href,
  icon: Icon,
  image,
  onClick,
}: HomeCardProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="
        group
        relative
        flex
        w-full min-[1900px]:w-[470px]
        h-[150px] sm:h-[160px] md:h-[170px]
        flex-col
        justify-between
        overflow-hidden
        border
        border-zinc-900
        bg-[#0b0b0b]
        p-4 sm:p-5 md:p-6
        transition-all
        duration-500
        hover:-translate-y-1
        hover:border-red-600
        hover:shadow-[0_0_30px_rgba(220,38,38,.18)]
      "
      style={{
        height: "clamp(120px, 32vw, 170px)",
        boxSizing: "border-box",
      }}
    >
      {/* Background */}
      <img
        src={image}
        alt={title}
        className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
          opacity-50
          transition-all
          duration-500
          group-hover:scale-105
        "
      />

      {/* Overlay */}
      <div
  className="absolute inset-0"
  style={{
    background: "rgba(3, 2, 2, 0.83)",
  }}
/>

      {/* Center */}
      <div className="relative z-10 flex flex-1 items-center justify-center">
        <Icon
          className="
            -translate-y-3 sm:-translate-y-4
            h-7 w-8 sm:h-8 sm:w-10
            text-white
            transition-all
            duration-500
            group-hover:scale-110
          "
        />
      </div>

      {/* Bottom */}
      <div
        className="
          relative
          z-10
          flex
          flex-col
          items-center
          pb-2 sm:pb-3 md:pb-4
        "
      >
        <h3
          className="
            text-center
            font-semibold
            uppercase
            tracking-[0.2em]
            text-white
          "
          style={{
            fontSize: "clamp(12px, 3.4vw, 16px)",
            lineHeight: 1.2,
          }}
        >
          {title}
        </h3>
      </div>

      {/* Border */}
      <div
        className="
          absolute
          inset-0
          border
          border-transparent
          transition-all
          duration-500
          group-hover:border-red-600
        "
      />
    </Link>
  );
}