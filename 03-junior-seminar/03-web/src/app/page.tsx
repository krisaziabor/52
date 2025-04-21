'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function LandingPage() {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if device is mobile
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
    if (!isMobile) {
      router.push('/edgewood');
    }
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
      
      {/* Desktop: Enter button positioned at bottom right */}
      {!isMobile && (
        <div className="absolute bottom-8 right-8">
          <button 
            onClick={handleEnter}
            className="font-[family-name:var(--font-centaur)] text-xl md:text-2xl hover:text-gray-300 transition-colors duration-200 cursor-pointer"
          >
            Enter Edgewood Gallery
          </button>
        </div>
      )}
      
      {/* Mobile: Enter message and email option centered */}
      {isMobile && (
        <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center p-8 text-center">
          <p className="font-[family-name:var(--font-centaur)] text-xl mb-6">
            Enter Edgewood Gallery on desktop
          </p>
          <a 
            href="mailto:?subject=No%20Idea%20If%20This%20Is%20Good%20Or%20Not%20site%20(for%20desktop%20viewing)&body=Here's%20the%20website%20for%20the%20exhibit%3A%20%0Ahttps%3A%2F%2F395.krisaziabor.com%0A%0AWith%20lots%20of%20love%2C%20the%20Junior%20Seminar%20class"
            className="font-[family-name:var(--font-centaur)] text-lg hover:text-gray-300 transition-colors duration-200"
          >
            Email me the link for later
          </a>
        </div>
      )}
    </div>
  );
}