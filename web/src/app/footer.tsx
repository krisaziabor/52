import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="col-span-2 row-span-1 flex gap-[24px] flex-wrap items-center justify-center pb-8">
      <Link
        href="/"
        passHref
        className="flex items-center gap-2 hover:underline hover:underline-offset-4 font-[family-name:var(--font-glare)]"
      >
        <Image
          aria-hidden
          src="/52-logo.svg"
          alt="52 icon"
          width={16}
          height={16}
        />
        Home
      </Link>
      <Link
        href="https://krisaziabor.com"
        passHref
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
      >
        <Image
          aria-hidden
          src="/KAKA-logo.svg"
          alt="KAKA icon"
          width={16}
          height={16}
        />
        <span className="font-[family-name:var(--font-glare)]">Kris Aziabor Dot Com </span>
      </Link>
    </footer>
  );
}
