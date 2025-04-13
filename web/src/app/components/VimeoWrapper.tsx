'use client';

import dynamic from 'next/dynamic';

// Dynamically import VimeoPlayer to ensure it only runs on client side
const VimeoPlayer = dynamic(() => import('./VimeoPlayer'), {
  ssr: false
});

interface VimeoWrapperProps {
  vimeoId: string;
  className?: string;
  play?: string;
  mute?: string;
}

export default function VimeoWrapper({ vimeoId, play, mute }: VimeoWrapperProps) {
  return <VimeoPlayer vimeoId={vimeoId} play={play} mute={mute} />;
}