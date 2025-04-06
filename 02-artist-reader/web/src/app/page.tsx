'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  // Use useEffect to ensure client-side only execution
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-[family-name:var(--font-diatype)]">
      <div className="flex-grow"></div>
      
      <div className="p-8">
        <h1 className="text-3xl font-[family-name:var(--font-diatype-bold)] mb-6">Artist Reader</h1>
        
        <div className="flex flex-col gap-3">
          <button 
            className="text-gray-400 cursor-not-allowed text-left w-fit"
            disabled
          >
            Play
          </button>
          
          <button 
            className="text-gray-400 cursor-not-allowed text-left w-fit"
            disabled
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}
