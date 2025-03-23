'use client';

import dynamic from 'next/dynamic';

// Dynamically import MobileProgressBar to ensure it only runs on client
const MobileProgressBar = dynamic(() => import('./MobileProgressBar'), { 
  ssr: false 
});

export default function MobileProgressWrapper() {
  return <MobileProgressBar />;
}