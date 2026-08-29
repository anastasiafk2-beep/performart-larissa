"use client";

import Link from "next/link";
import ProtectedImage from "@/components/ProtectedImage";

import {
  FaInstagram,
  FaFacebookF,
  FaTiktok,
} from "react-icons/fa";

import {
  HiOutlineEnvelope,
  HiOutlinePhone,
} from "react-icons/hi2";

const socialLinks = [
  {
    name: "Instagram",
    icon: FaInstagram,
    href: "https://www.instagram.com/performart_larissa?igsh=dm92c3YxYnd3Ymdk&utm_source=qr",
  },
  {
    name: "Facebook",
    icon: FaFacebookF,
    href: "https://www.facebook.com/share/1LNa7jmHzy/?mibextid=wwXIfr",
  },
  {
    name: "TikTok",
    icon: FaTiktok,
    href: "https://www.tiktok.com/@performart_larissa?_r=1&_t=ZN-9857txAuBoE",
  },
];

export default function Footer() {
  return (
    <footer
  className="relative overflow-hidden"
  style={{
   
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>

      <div className="absolute inset-0 bg-red-900">

  <div className="absolute inset-0 bg-black/40" />
</div>

      <div className="h-8" />

      <div className="relative mx-auto max-w-9xl  px-6 lg:px-10 pt-28 pb-20">
      {/* Main Footer */}

<div className="grid grid-cols-1 lg:grid-cols-2 gap-y-12 lg:gap-y-0 pt-8">

  {/* CONTACT */}

   <div className="flex flex-col items-center border-b lg:border-b-0 lg:border-r border-white/10 px-8 lg:px-12 py-20 lg:py-24">
  <div className="mb-8 flex items-center gap-4">
    <span className="h-px w-8 bg-red-600" />
    <h3 className="text-[17px] font-bold uppercase tracking-[0.45em] text-white/80">
      ΕΠΙΚΟΙΝΩΝΙΑ
    </h3>
  </div>
<div className="h-10" />
  <div className="space-y-10">
    <a
  href="mailto:info@performartlarissa.gr"
  className="group flex items-center justify-center gap-5 text-zinc-400 transition hover:text-white"
>
  <HiOutlineEnvelope
    size={22}
    className="text-white transition group-hover:text-red-600"
  />
  <span className="text-white">
   performart.lar@gmail.com
  </span>
</a>
<div className="h-8" />
    <a
  href="tel:+306991234567"
  className="group flex items-center  justify-center gap-5 text-zinc-400 transition hover:text-white"
>
  <HiOutlinePhone
    size={22}
    className="text-white transition group-hover:text-red-600"
  />
  <span className="text-white">
    +30 697 7948210
  </span>
</a>
  </div>
</div>

  {/* SOCIAL */}

  <div className="flex flex-col items-center border-b lg:border-b-0 lg:border-r border-white/10 px-8 lg:px-12 py-20 lg:py-24">
  <div className="mb-8 flex items-center gap-4">
    <span className="h-px w-8 bg-red-600" />
    <h3 className="text-[17px] font-bold uppercase tracking-[0.45em] text-white/80">
      FOLLOW US
    </h3>
  </div>
<div className="h-8" />
  <div className="space-y-6">
    {socialLinks.map((item) => {
      const Icon = item.icon;

      return (
        <Link
          key={item.name}
          href={item.href}
          target="_blank"
          className="group flex items-center justify-center gap-5 text-zinc-400 hover:text-white transition"
        ><div className="h-12" />
          <Icon size={22} className="group-hover:scale-110 transition" />
          <span className="text-lg">{item.name}</span>
        </Link>
      );
    })}
  </div>
</div>

</div>

{/* COPYRIGHT */}

<div className="py-8">

  <div className="h-8" />

  <p className="text-center text-[11px] uppercase tracking-[0.45em] text-zinc-300">
    
    
    © 2026 THE PERFORMART LARISSA

    
  </p>
<br></br>
</div>

</div>
</footer>
);
}