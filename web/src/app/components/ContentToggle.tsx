'use client';

import Image from 'next/image';
import React from 'react';
import { useContent } from '../context/ContentContext';
import { useRouter, usePathname } from 'next/navigation';

export default function ContentToggle() {
  const { contentType } = useContent();
  const router = useRouter();
  const pathname = usePathname();
  
  const handleToggle = () => {
    if (pathname === '/52' || pathname.startsWith('/52/')) {
      // Currently on 52 section, navigate to product (root)
      router.push('/');
    } else {
      // Currently on product section (root), navigate to 52
      router.push('/52');
    }
  };

  const isOn52Page = pathname === '/52' || pathname.startsWith('/52/');
  const displayedContentType = isOn52Page ? '52' : 'product';

  return (
    <button
      onClick={handleToggle}
      className="rounded-lg border border-solid border-black/[.08] transition-colors flex items-center justify-center gap-3 hover:bg-[#f2f2f2] hover:border-transparent font-medium text-sm sm:text-base h-14 w-14 sm:h-14 sm:w-auto px-0 sm:px-7 py-4 whitespace-nowrap"
      aria-label={`Switch to ${displayedContentType === 'product' ? '52' : 'product'} content`}
    >
      <Image
        src={displayedContentType === 'product' ? "/52-logo.svg" : "/KAKA-logo.svg"}
        alt={displayedContentType === 'product' ? "52 logo" : "KAKA logo"}
        width={28}
        height={28}
      />
      <span className="hidden sm:inline">
        {displayedContentType === 'product' ? 'Switch to 52' : 'Switch to Product'}
      </span>
    </button>
  );
}