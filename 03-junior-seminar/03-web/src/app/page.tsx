'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function LandingPage() {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if device is mobile (for responsive layout only)
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check on initial load
    checkIfMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);
  
  const handleEnter = () => {
    router.push('/edgewood');
  };
  
  const handleExhibitMode = () => {
    router.push('/exhibit-mode');
  };
  
  return (
    <div className="min-h-screen flex flex-col relative bg-black text-white landing-page">
      {/* Main content left-aligned */}
      <div className="flex-grow flex items-center p-4 md:pl-24">
        <div className="max-w-4xl w-full">
          <h1 className="font-[family-name:var(--font-elle-two)] text-4xl md:text-5xl mb-8 text-center md:text-left uppercase tracking-wide leading-tight">
            No Idea If This Is Bad Or Not
          </h1>
          
          {/* SVG with white strokes */}
          <div className="w-full max-w-md mx-auto md:mx-0 md:max-w-sm">
            <Image
              src="/svg-white.svg"
              alt="Edgewood diagram"
              width={600}
              height={750}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
      </div>
      
      {/* Desktop: Navigation buttons positioned at bottom right */}
      {!isMobile && (
        <div className="absolute bottom-8 right-8 flex flex-col gap-4 items-end">
          <button 
            onClick={handleExhibitMode}
            className="font-[family-name:var(--font-centaur)] text-xl md:text-2xl hover:text-gray-300 transition-colors duration-200 cursor-pointer"
          >
            Exhibit Mode
          </button>
          <button 
            onClick={handleEnter}
            className="font-[family-name:var(--font-centaur)] text-xl md:text-2xl hover:text-gray-300 transition-colors duration-200 cursor-pointer"
          >
            Enter Edgewood Gallery
          </button>
        </div>
      )}
      
      {/* Mobile: Navigation buttons centered at bottom */}
      {isMobile && (
        <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center p-8 text-center gap-4">
          <button 
            onClick={handleExhibitMode}
            className="font-[family-name:var(--font-centaur)] text-xl text-gray-500 opacity-60 cursor-not-allowed"
            disabled
          >
            Exhibit Mode (Desktop Only)
          </button>
          <button 
            onClick={handleEnter}
            className="font-[family-name:var(--font-centaur)] text-xl hover:text-gray-300 transition-colors duration-200 cursor-pointer"
          >
            Enter Edgewood Gallery
          </button>
        </div>
      )}
    </div>
  );
}