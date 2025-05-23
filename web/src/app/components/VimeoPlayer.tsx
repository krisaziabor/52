'use client';

import React, { useState, useRef, useEffect } from 'react';

interface VimeoPlayerProps {
  vimeoId: string;
  play?: string;
  mute?: string;
}

const VimeoPlayer: React.FC<VimeoPlayerProps> = ({ vimeoId, play, mute }) => {
  const [isPlaying, setIsPlaying] = useState(false); // Default to not playing until visible
  const [isMuted, setIsMuted] = useState(true); // Default to muted
  const [isVisible, setIsVisible] = useState(false);
  const showPlayButton = play !== "disabled";
  const showMuteButton = mute !== "disabled";
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

    // Attempt to pause any videos immediately, even before API loads
    const initialPauseTimeout = setTimeout(() => {
      if (playerRef.current && playerRef.current.contentWindow) {
        playerRef.current.contentWindow.postMessage(
          JSON.stringify({ method: 'pause' }), 
          '*'
        );
      }
    }, 100);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      clearTimeout(initialPauseTimeout);
    };
  }, []);

  // Post messages to the Vimeo iframe
  const postMessage = (action: string, value?: unknown) => {
    if (!playerRef.current || !playerRef.current.contentWindow) return;
    
    const message: { method: string; value?: unknown } = {
      method: action
    };
    
    if (value !== undefined) {
      message.value = value;
    }
    
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

  // Handle restart
  const restartVideo = () => {
    if (!isPlayerReady) return;
    postMessage('setCurrentTime', 0);
    if (!isPlaying) {
      postMessage('play');
      setIsPlaying(true);
    }
  };

  // Handle mute/unmute
  const toggleMute = () => {
    if (!isPlayerReady) return;
    
    if (isMuted) {
      postMessage('setVolume', 1.0);
    } else {
      postMessage('setVolume', 0);
    }
    
    setIsMuted(!isMuted);
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
        } else if (data.event === 'volumechange') {
          // Volume is between 0 and 1
          setIsMuted(data.data && data.data.volume === 0);
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

  // Set initial muted state and ensure video is paused on load
  useEffect(() => {
    if (isPlayerReady) {
      postMessage('setVolume', 0); // Start muted by default
      postMessage('pause'); // Ensure video starts paused
    }
  }, [isPlayerReady]);
  
  // Setup intersection observer to detect when video is visible
  useEffect(() => {
    if (!playerContainerRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
      },
      { 
        threshold: 0.6,  // Trigger when 60% of the video is visible
        rootMargin: "-10% 0px" // Adds a margin to further delay activation
      }
    );
    
    observer.observe(playerContainerRef.current);
    
    return () => {
      if (playerContainerRef.current) {
        observer.unobserve(playerContainerRef.current);
      }
    };
  }, []);
  
  // Control video playback based on visibility
  useEffect(() => {
    if (!isPlayerReady) return;
    
    if (isVisible) {
      postMessage('play');
      setIsPlaying(true);
    } else {
      postMessage('pause');
      setIsPlaying(false);
    }
  }, [isVisible, isPlayerReady]);

  return (
    <div className="vimeo-player-container my-8 relative" ref={playerContainerRef}>
      <div 
        className="aspect-w-16 aspect-h-9 w-full overflow-hidden bg-black rounded-lg relative cursor-pointer"
        onClick={togglePlay}
      >
        <iframe
          ref={playerRef}
          src={`https://player.vimeo.com/video/${vimeoId}?background=1&autoplay=0&autopause=0&controls=0&loop=1&transparent=0&dnt=1&muted=1`}
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
          className="w-full h-full pointer-events-none"
          title="Vimeo video player"
        />
        {/* Overlay for better UX when clicking to play/pause */}
        <div className="absolute inset-0 bg-transparent"></div>
      </div>
      
      {/* Control bar */}
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          {showPlayButton && (
            <button 
              onClick={togglePlay}
              className="text-sm hover:underline focus:outline-none transition-all font-[family-name:var(--font-diatype-mono)] uppercase tracking-wide"
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              {isPlaying ? "Pause" : "Play"}
            </button>
          )}
          
          {showPlayButton && showMuteButton && (
            <span className="text-sm text-gray-300 font-[family-name:var(--font-diatype-mono)]">|</span>
          )}
          
          {showMuteButton && (
            <button
              onClick={toggleMute}
              className="text-sm hover:underline focus:outline-none transition-all font-[family-name:var(--font-diatype-mono)] uppercase tracking-wide"
              aria-label={isMuted ? "Unmute video" : "Mute video"}
            >
              {isMuted ? "Unmute" : "Mute"}
            </button>
          )}
        </div>
        <button
          onClick={restartVideo}
          className="text-sm hover:underline focus:outline-none transition-all font-[family-name:var(--font-diatype-mono)] uppercase tracking-wide"
          aria-label="Restart video"
        >
          Restart
        </button>
      </div>
    </div>
  );
};

export default VimeoPlayer;