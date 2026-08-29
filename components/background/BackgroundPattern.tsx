"use client";

import { usePathname } from "next/navigation";

export default function BackgroundPattern() {

  const pathname = usePathname();

const isHome = pathname === "/";
  
    if (isHome) {
  return null;
}
return (
  <div
    className="fixed inset-0 z-0 pointer-events-none"
    style={{
      backgroundImage: "url('/backgrounds/cinema-bg.png')",
      backgroundSize: "cover",
      backgroundPosition: "center top",
      backgroundAttachment: "fixed",
    }}
  >
      <div className="absolute inset-0 bg-white/80" />
    
    </div>
  );
}