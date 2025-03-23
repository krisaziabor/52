import Image from "next/image";
import React from "react";

export default function Footer() {
  return (
    <footer className="col-span-2 row-span-1 flex gap-[24px] flex-wrap items-center justify-center pb-8">
      <a
        className="flex items-center gap-2 hover:underline hover:underline-offset-4 font-[family-name:var(--font-glare)]"
        href="https://krisaziabor.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          aria-hidden
          src="/KAKA-logo.svg"
          alt="KAKA icon"
          width={16}
          height={16}
        />
        Kris Aziabor Dot Com →
      </a>
    </footer>
  );
}
