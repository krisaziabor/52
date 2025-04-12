'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

export default function SectionHeader() {
  const pathname = usePathname();
  const is52Section = pathname.startsWith('/52');
  
  return (
    <div className="flex items-center font-[family-name:var(--font-diatype-mono)] text-xs md:text-sm">
      {is52Section ? (
        <div className="flex items-center">
          <span className="hidden sm:inline">52 WEEKS, 52 PROJECTS</span>
          <span className="sm:hidden">52 PROJECTS</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="ml-2"
          >
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </div>
      ) : (
        <div className="flex items-center">
          <span>SELECTED PROJECTS</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="ml-2"
          >
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </div>
      )}
    </div>
  );
}