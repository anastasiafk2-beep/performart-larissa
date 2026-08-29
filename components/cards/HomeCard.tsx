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
        w-[470px]
        h-[170px]
        flex-col
        justify-between
        overflow-hidden
        border
        border-zinc-900
        bg-[#0b0b0b]
        p-6
        transition-all
        duration-500
        hover:-translate-y-1
        hover:border-red-600
        hover:shadow-[0_0_30px_rgba(220,38,38,.18)]
      "
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
    background: "rgba(6, 6, 6, 0.25)",
  }}
/>

      {/* Center */}
      <div className="relative z-10 flex flex-1 items-center justify-center">
        <Icon
          className="
            -translate-y-4
            h-8
            w-10
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
          pb-4
        "
      >
        <h3
          className="
            text-center
            text-base
            font-semibold
            uppercase
            tracking-[0.2em]
            text-white
          "
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