import Image from 'next/image';
import React from 'react';

export default function FullWebsiteButton() {
  return (
    <div>
      <a
        className="rounded-lg border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center gap-5 hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto whitespace-nowrap"
        href="https://krisaziabor.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          className="dark:invert"
          src="/KAKA-logo.svg"
          alt="KAKA logo"
          width={20}
          height={20}
        />
        Visit full website
      </a>
    </div>
  );
}
