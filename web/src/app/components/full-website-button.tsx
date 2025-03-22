import Image from 'next/image';
import React from 'react';

export default function FullWebsiteButton() {
  return (
    <div>
      <a
        className="rounded-lg border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center gap-6 hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-14 w-14 sm:h-14 sm:w-auto px-0 sm:px-7 py-4 whitespace-nowrap"
        href="https://krisaziabor.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          className="dark:invert"
          src="/KAKA-logo.svg"
          alt="KAKA logo"
          width={28}
          height={28}
        />
        <span className="hidden sm:inline">Visit full website</span>
      </a>
    </div>
  );
}
