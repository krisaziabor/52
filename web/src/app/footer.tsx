import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="flex flex-wrap justify-between items-center w-full py-6 sm:py-8 border-t border-gray-200">
      <Link 
        href="/" 
        className="font-[family-name:var(--font-diatype-mono)] text-xs sm:text-sm hover:underline hover:underline-offset-4"
      >
        KRIS ATTEH KOJO AZIABOR
      </Link>
      <div className="flex items-center gap-6 sm:gap-12 mt-2 sm:mt-0">
        <Link 
          href="#"
          className="flex items-center gap-1 text-xs sm:text-sm font-[family-name:var(--font-diatype-mono)] hover:underline hover:underline-offset-4"
        >
          Back to top 
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="12" 
            height="12" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="sm:w-3.5 sm:h-3.5"
          >
            <path d="m18 15-6-6-6 6"/>
          </svg>
        </Link>
        <div className="text-xs sm:text-sm font-[family-name:var(--font-diatype-mono)]">
          © KAKA Studios 2025
        </div>
      </div>
    </footer>
  );
}