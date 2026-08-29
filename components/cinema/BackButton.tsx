"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="
        inline-flex
        items-center
        gap-3
        text-sm
        tracking-[0.18em]
        uppercase
        text-red-800
        transition
        hover:text-black
      "
    >
      <span className="text-lg">←</span>
      <span>ΠΙΣΩ</span>
    </button>
  );
}