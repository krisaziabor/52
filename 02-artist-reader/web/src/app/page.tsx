'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import mdScript from './scripts/md-script';

// Dynamically import the ScriptPlayer to prevent SSR issues
const ScriptPlayer = dynamic(() => import('./components/ScriptPlayer'), { ssr: false });

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Use useEffect to ensure client-side only execution
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-[family-name:var(--font-diatype)]">
      {isPlaying && mounted ? (
        <ScriptPlayer 
          script={mdScript}
        />
      ) : (
        <>
          <div className="flex-grow"></div>
          
          <div className="p-8">
            <h1 className="text-3xl font-[family-name:var(--font-diatype-bold)] mb-6">Artist Reader</h1>
            
            <div className="flex flex-col gap-3">
              <button 
                className="text-left w-fit hover:text-black"
                onClick={() => setIsPlaying(true)}
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
        </>
      )}
    </div>
  );
}
