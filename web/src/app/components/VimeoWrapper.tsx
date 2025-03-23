'use client';

import dynamic from 'next/dynamic';

// Dynamically import VimeoPlayer to ensure it only runs on client side
const VimeoPlayer = dynamic(() => import('./VimeoPlayer'), {
  ssr: false
});

interface VimeoWrapperProps {
  vimeoId: string;
}

export default function VimeoWrapper({ vimeoId }: VimeoWrapperProps) {
  return <VimeoPlayer vimeoId={vimeoId} />;
}