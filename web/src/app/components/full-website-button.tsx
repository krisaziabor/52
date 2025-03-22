import Image from 'next/image';
import React from 'react';

export default function FullWebsiteButton() {
  return (
    <div>
      <a
        className="rounded-lg border border-solid border-black/[.08] transition-colors flex items-center justify-center gap-6 hover:bg-[#f2f2f2] hover:border-transparent font-medium text-sm sm:text-base h-14 w-14 sm:h-14 sm:w-auto px-0 sm:px-7 py-4 whitespace-nowrap"
        href="https://krisaziabor.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          className=""
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
