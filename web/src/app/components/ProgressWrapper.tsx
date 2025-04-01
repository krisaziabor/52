'use client';

import dynamic from 'next/dynamic';

// Dynamically import ProgressBar to ensure it only runs on client
const ProgressBar = dynamic(() => import('./ProgressBar'), { 
  ssr: false 
});

export default function ProgressWrapper() {
  return <ProgressBar />;
}