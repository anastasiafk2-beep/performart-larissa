import ProtectedImage from "@/components/ProtectedImage";
import Link from "next/link";
import { LucideIcon } from "lucide-react";

type Props = {
  image: string;
  href: string;
  title: string;
  number: string;
  icon: LucideIcon;
  onClick?: () => void;
};

export default function HomeCard({
  image,
  href,
  title,
  number,
  icon: Icon,
  onClick,
}: Props) {
  return (
    <Link
      href={href}
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick();
        }
      }}
      className="
        group
        relative
        h-[430px]
        overflow-hidden
        border
        border-zinc-800
      "
    >
<ProtectedImage
  src={image}
  alt={title}
  width={500}
  height={700}
  className="
    absolute
    inset-0
    z-0
    h-full
    w-full
    object-cover
    transition-all
    duration-700
    group-hover:scale-110
  "
/>

<div
  className="absolute inset-0 z-10"
  style={{
    background: "rgba(180, 0, 0, 0.30)",
  }}
/>

      {/* Border glow */}
      <div className="absolute inset-0 border border-white/10 group-hover:border-red-500 transition duration-500" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-between p-7">

        {/* Number */}
        <span className="text-sm text-white/70 tracking-[0.25em]">
          {number}
        </span>

        <div>
          {/* Icon */}
          <Icon
            size={34}
            className="mb-6 text-white transition group-hover:text-red-500"
          />

          {/* Red line */}
          <div className="h-[2px] w-8 bg-red-600 mb-5" />

          {/* Title */}
          <h3 className="text-white font-semibold tracking-[0.18em] text-xl uppercase">
            {title}
          </h3>

         
        </div>

      </div>
    </Link>
  );
}