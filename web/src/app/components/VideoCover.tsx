'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import VimeoPlayer to ensure it only runs on client side
const VimeoPlayer = dynamic(() => import('./VimeoPlayer'), {
  ssr: false
});

interface VideoCoverProps {
  vimeoId: string;
  className?: string;
}

const VideoCover: React.FC<VideoCoverProps> = ({ vimeoId, className }) => {
  return (
    <div className={`w-full ${className || ''}`}>
      <VimeoPlayer
        vimeoId={vimeoId}
        play="disabled" // No play button
        mute="disabled" // No mute button - video will always play muted
      />
    </div>
  );
};

export default VideoCover;