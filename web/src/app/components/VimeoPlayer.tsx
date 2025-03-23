'use client';

import React, { useState, useRef, useEffect } from 'react';

interface VimeoPlayerProps {
  vimeoId: string;
}

const VimeoPlayer: React.FC<VimeoPlayerProps> = ({ vimeoId }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const playerRef = useRef<HTMLIFrameElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  // Initialize player when the component mounts
  useEffect(() => {
    // Load Vimeo Player API
    const script = document.createElement('script');
    script.src = 'https://player.vimeo.com/api/player.js';
    script.async = true;
    script.onload = () => {
      setIsPlayerReady(true);
    };
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  // Post messages to the Vimeo iframe
  const postMessage = (action: string) => {
    if (!playerRef.current || !playerRef.current.contentWindow) return;
    
    const message = {
      method: action
    };
    
    playerRef.current.contentWindow.postMessage(JSON.stringify(message), '*');
  };

  // Handle play/pause
  const togglePlay = () => {
    if (!isPlayerReady) return;
    
    if (isPlaying) {
      postMessage('pause');
    } else {
      postMessage('play');
    }
    
    setIsPlaying(!isPlaying);
  };

  // Listen for messages from the iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        
        // Update play state based on player events
        if (data.event === 'play') {
          setIsPlaying(true);
        } else if (data.event === 'pause') {
          setIsPlaying(false);
        }
      } catch {
        // Not a JSON message or not from Vimeo
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <div className="vimeo-player-container my-8 relative" ref={playerContainerRef}>
      <div 
        className="aspect-w-16 aspect-h-9 w-full overflow-hidden bg-black rounded-lg"
        onClick={togglePlay}
      >
        <iframe
          ref={playerRef}
          src={`https://player.vimeo.com/video/${vimeoId}?background=1&autoplay=&controls=0&loop=1&transparent=0&dnt=1`}
          allow="autoplay; fullscreen; picture-in-picture"
          className="w-full h-full pointer-events-none"
          title="Vimeo video player"
        />
        {/* Removed Play/Pause overlay */}
      </div>
    </div>
  );
};

export default VimeoPlayer;