'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import ExhibitSVG from '../components/ExhibitSVG';

// Polyfill for Intersection Observer API for older browsers
const setupIntersectionObserverPolyfill = () => {
  if (!('IntersectionObserver' in window)) {
    import('intersection-observer');
  }
};

interface ArtistStatement {
  number: string;
  content: string;
  isComplete: boolean;
}

interface StatementWithArtist {
  artist: string;
  number: string;
  content: string;
}

export default function ExhibitMode() {
  const [artistsData, setArtistsData] = useState<Record<string, ArtistStatement[]>>({});
  const [artistNames, setArtistNames] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentArtistIndex, setCurrentArtistIndex] = useState<number>(0);
  const [activeArtist, setActiveArtist] = useState<string>('');
  const [activeStatementNumber, setActiveStatementNumber] = useState<string>('');
  const [isAutoScrolling, setIsAutoScrolling] = useState<boolean>(false);
  const [isAtEnd, setIsAtEnd] = useState<boolean>(false);
  
  // Use refs for observer elements and scrollable container
  const statementRefs = useRef<HTMLDivElement[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Flatten artist statements for continuous scroll
  const flattenedStatements = useCallback((): StatementWithArtist[] => {
    const statements: StatementWithArtist[] = [];
    
    // Sort artist names first to ensure consistent ordering
    const sortedArtistNames = [...artistNames].sort();
    
    sortedArtistNames.forEach((artist) => {
      if (artistsData[artist]) {
        // Sort statements by number, ensuring consistent parsing of statement numbers
        const artistStatements = artistsData[artist]
          .filter(statement => statement.isComplete)
          .sort((a, b) => {
            // Remove leading zeros and parse as integer for reliable comparison
            const numA = parseInt(a.number.replace(/^0+/, ''));
            const numB = parseInt(b.number.replace(/^0+/, ''));
            return numA - numB;
          });
        
        artistStatements.forEach(statement => {
          statements.push({
            artist,
            number: statement.number,
            content: statement.content
          });
        });
      }
    });
    
    return statements;
  }, [artistsData, artistNames]);
  
  useEffect(() => {
    // Fetch the artist data
    async function fetchData() {
      try {
        const response = await fetch('/api/artists');
        const data = await response.json();
        setArtistsData(data.artistsData);
        setArtistNames(data.artistNames);
        if (data.artistNames.length > 0) {
          setActiveArtist(data.artistNames[0]);
        }
      } catch (error) {
        console.error('Error fetching artist data:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);
  
  useEffect(() => {
    if (artistNames.length > 0 && !activeArtist) {
      setActiveArtist(artistNames[0]);
    }
  }, [artistNames, activeArtist]);
  
  // Set up Intersection Observer
  useEffect(() => {
    // Initialize the polyfill
    setupIntersectionObserverPolyfill();
    
    // Make sure refs are populated before setting up the observer
    const statements = flattenedStatements();
    if (!statementRefs.current.length || statements.length === 0) return;
    
    // Track the last update time to prevent too-frequent updates
    let lastUpdateTime = 0;
    const updateThrottleMs = 500; // Only update every 500ms to prevent flickering
    
    // Create an observer for each statement section
    const observer = new IntersectionObserver((entries) => {
      // Only process if we're not auto-scrolling or if enough time has passed since the last update
      const now = Date.now();
      if (isAutoScrolling && now - lastUpdateTime < updateThrottleMs) {
        return;
      }
      
      // Find the most visible entry with a higher threshold for changes
      let bestEntry = null;
      let maxRatio = 0.3; // Require at least 30% visibility to switch
      
      for (const entry of entries) {
        if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio;
          bestEntry = entry;
        }
      }
      
      // If we have a most visible entry, use it
      if (bestEntry && bestEntry.target instanceof HTMLElement) {
        const element = bestEntry.target;
        const artistIndex = element.dataset.artistIndex;
        const artistName = element.dataset.artistName;
        const statementNumber = element.dataset.statementNumber;
        
        if (artistIndex && artistName && statementNumber) {
          // Only update if different from current values
          const newIndex = parseInt(artistIndex);
          const shouldUpdate = 
            newIndex !== currentArtistIndex || 
            artistName !== activeArtist || 
            statementNumber !== activeStatementNumber;
            
          if (shouldUpdate) {
            setCurrentArtistIndex(newIndex);
            setActiveArtist(artistName);
            setActiveStatementNumber(statementNumber);
            lastUpdateTime = now;
          }
        }
      }
    }, {
      rootMargin: '-35% 0px -35% 0px', // More aggressive rootMargin for stability
      threshold: [0.4, 0.6, 0.8] // Higher thresholds for better detection
    });
    
    // Capture current refs to avoid issues with cleanup function
    const currentRefs = statementRefs.current.filter(ref => ref !== null && ref !== undefined);
    
    // Observe each statement section
    for (const ref of currentRefs) {
      if (ref) observer.observe(ref);
    }
    
    return () => {
      // Use captured refs in cleanup
      for (const ref of currentRefs) {
        if (ref) observer.unobserve(ref);
      }
    };
  }, [activeArtist, activeStatementNumber, currentArtistIndex, flattenedStatements, isAutoScrolling]);
  
  // Initialize the refs array once statements are available
  const setRefs = useCallback((el: HTMLDivElement | null, index: number) => {
    if (el) {
      statementRefs.current[index] = el;
    }
  }, []);
  
  // Handle restart function - scrolls back to top and resets end state
  const handleRestart = useCallback(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      // Scroll back to top
      container.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      // Reset the end state
      setIsAtEnd(false);
    }
  }, []);

  // Handle play/pause toggle from the ExhibitSVG component
  const handlePlayToggle = useCallback((isPlaying: boolean) => {
    console.log(`Auto-scrolling ${isPlaying ? 'started' : 'stopped'}`);
    
    // Reset end state when starting to play
    if (isPlaying) {
      setIsAtEnd(false);
    }
    
    // If we're stopping, just return
    if (!isPlaying) {
      setIsAutoScrolling(false);
      return;
    }
    
    // Make sure we're not at the bottom when starting
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const isAtBottom = 
        container.scrollHeight - container.scrollTop <= container.clientHeight + 100;
      
      if (isAtBottom) {
        // Scroll back to top - first use manual scrollTop for Safari compatibility
        container.scrollTop = 0;
        
        // Small delay before starting auto-scroll to ensure the scroll position is reset
        setTimeout(() => {
          setIsAutoScrolling(true);
        }, 100);
      } else {
        // Start auto-scrolling immediately if we're not at the bottom
        setIsAutoScrolling(true);
      }
    } else {
      // Fallback in case the container ref isn't available
      setIsAutoScrolling(true);
    }
  }, []);
  
  // Auto-scrolling effect with browser detection
  useEffect(() => {
    if (!isAutoScrolling || !scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    let animationFrameId: number;
    let lastTimestamp: number;
    let intervalId: NodeJS.Timeout | null = null;
    
    // Detect browser and adjust settings accordingly
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    const isIE = typeof document !== 'undefined' && 'documentMode' in document;
    const isEdgeLegacy = !isIE && typeof window !== 'undefined' && !!(window as Window & { StyleMedia?: unknown }).StyleMedia;
    
    // Adjust scroll speed based on browser
    let pixelsPerSecond = 15; // Default: 15 pixels per second for Chrome and others
    
    if (isSafari || isIE || isEdgeLegacy) {
      // Safari and IE/Edge tend to have different timing characteristics
      pixelsPerSecond = 12; // Slightly slower for Safari/IE/Edge
    } else if (isFirefox) {
      pixelsPerSecond = 18; // Slightly faster for Firefox
    }
    
    // Use interval as fallback for Safari and older browsers that may have inconsistent rAF timing
    if (isSafari || isIE || isEdgeLegacy) {
      // For Safari and older browsers, use setInterval as a more reliable fallback
      intervalId = setInterval(() => {
        // Simple time-based scrolling for Safari and older browsers
        // Safari needs a direct scroll value rather than incremental scrollBy
        if (isSafari) {
          // For Safari: set absolute scroll position instead of relative
          const newScrollTop = container.scrollTop + (pixelsPerSecond / 60);
          container.scrollTop = newScrollTop;
        } else {
          // For older IE/Edge: use scrollBy
          container.scrollBy(0, pixelsPerSecond / 60); // ~60fps equivalent
        }
        
        // Check if we've reached the bottom
        const isAtBottom = 
          container.scrollHeight - container.scrollTop <= container.clientHeight + 20;
        
        if (isAtBottom) {
          // We've reached the bottom, stop auto-scrolling and set end state
          if (intervalId) clearInterval(intervalId);
          setIsAutoScrolling(false);
          setIsAtEnd(true);
        }
      }, 16); // ~60fps
    } else {
      // For modern browsers, use requestAnimationFrame for smoother scrolling
      // Create a smooth scrolling animation using timestamps for frame rate independence
      const scrollStep = (timestamp: number) => {
        if (!lastTimestamp) lastTimestamp = timestamp;
        
        // Calculate time elapsed since last frame
        const elapsed = timestamp - lastTimestamp;
        lastTimestamp = timestamp;
        
        // Use a min/max to prevent extreme values during tab switches or other delays
        const cappedElapsed = Math.min(Math.max(elapsed, 1), 100);
        
        // Calculate how many pixels to scroll based on elapsed time
        const pixelsToScroll = (pixelsPerSecond * cappedElapsed) / 1000;
        
        // Check if we've reached the bottom
        const isAtBottom = 
          container.scrollHeight - container.scrollTop <= container.clientHeight + 20;
        
        if (isAtBottom) {
          // We've reached the bottom, stop auto-scrolling and set end state
          setIsAutoScrolling(false);
          setIsAtEnd(true);
          return;
        }
        
        // Continue scrolling
        container.scrollBy(0, pixelsToScroll);
        
        // Check if the component is still mounted before continuing
        if (scrollContainerRef.current) {
          animationFrameId = requestAnimationFrame(scrollStep);
        }
      };
      
      // Start the animation
      animationFrameId = requestAnimationFrame(scrollStep);
    }
    
    // Clean up
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isAutoScrolling]);
  
  // Handle loading state
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-white text-black">
        <p className="text-xl font-[family-name:var(--font-centaur)]">Loading artist statements...</p>
      </div>
    );
  }
  
  const statements = flattenedStatements();
  
  return (
    <div className="min-h-screen bg-white text-black">
      <Link 
        href="/"
        className="fixed top-4 left-4 z-50 font-[family-name:var(--font-centaur)] text-lg hover:underline"
      >
        ← Back to home
      </Link>
      
      {/* Mobile controls - fixed at bottom of screen */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white shadow-lg border-t border-gray-200 p-3 flex justify-center items-center">
        <button 
          className="font-[family-name:var(--font-elle-two)] text-base uppercase tracking-wide mx-3 py-2 px-5 border border-gray-300 rounded"
          onClick={() => handlePlayToggle(!isAutoScrolling)}
        >
          {isAutoScrolling ? 'PAUSE' : 'PLAY'}
        </button>
        
        {isAtEnd && (
          <button 
            className="font-[family-name:var(--font-elle-two)] text-base uppercase tracking-wide mx-3 py-2 px-5 border border-gray-300 rounded"
            onClick={handleRestart}
          >
            RESTART
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
        {/* Fixed SVG and artist name on the left (desktop) */}
        <div className="hidden md:flex md:flex-col md:sticky md:top-0 md:h-screen p-8">
          <div className="flex-grow flex flex-col justify-center items-center">
            <div className="flex items-baseline gap-4 mb-8">
              <h2 className="font-[family-name:var(--font-elle-two)] text-6xl lowercase">
                {activeArtist}
              </h2>
              <span className="font-[family-name:var(--font-centaur)] text-4xl">
                {activeStatementNumber}
              </span>
            </div>
            <div className="w-full max-w-lg">
              <ExhibitSVG 
                artistName={activeArtist}
                statementNumber={activeStatementNumber}
                onPlayToggle={handlePlayToggle}
                isAtEnd={isAtEnd}
                onRestart={handleRestart}
              />
            </div>
          </div>
        </div>
        
        {/* Scrollable statements on the right */}
        <div ref={scrollContainerRef} className="relative overflow-y-auto h-screen pb-16 md:pb-0">
          {/* Sticky header that extends beyond the visible area */}
          <div className="sticky top-0 z-10 bg-white pt-12 pb-6 px-4 sm:px-8">
            <h1 className="font-[family-name:var(--font-elle-two)] text-3xl sm:text-4xl md:text-5xl mb-0 uppercase tracking-wide">
              No Idea If This Is Bad Or Not
            </h1>
          </div>
          {/* Content container with padding */}
          <div className="p-4 sm:p-8 pt-6">
          
          {statements.map((statement, index) => {
            // Create a unique artist index - we need to get the unique sorted artists
            const uniqueArtists = [...new Set(statements.map(s => s.artist))].sort();
            const artistIndex = uniqueArtists.indexOf(statement.artist);
            
            return (
              <div 
                key={`${statement.artist}-${statement.number}`}
                ref={(el) => setRefs(el, index)}
                data-artist-index={artistIndex}
                data-artist-name={statement.artist}
                data-statement-number={statement.number}
                className="mb-32 md:mb-40 scroll-mt-16" // Adjusted margin for mobile
                id={`statement-${statement.artist}-${statement.number}`}
              >
                {/* Show artist name for mobile */}
                <div className="md:hidden mb-8">
                  <div className="flex items-baseline gap-4 mb-4">
                    <h2 className="font-[family-name:var(--font-elle-two)] text-3xl sm:text-4xl lowercase">
                      {statement.artist}
                    </h2>
                    <span className="font-[family-name:var(--font-centaur)] text-2xl sm:text-3xl">
                      {statement.number}
                    </span>
                  </div>
                  {/* SVG container with better sizing for mobile */}
                  <div className="max-w-[70%] mx-auto mb-6">
                    <ExhibitSVG 
                      artistName={statement.artist}
                      statementNumber={statement.number}
                      onPlayToggle={handlePlayToggle}
                      isAtEnd={isAtEnd}
                      onRestart={handleRestart}
                    />
                  </div>
                </div>
                
                {/* Statement content with improved line spacing and responsive text size */}
                <div 
                  className="prose max-w-none font-[family-name:var(--font-centaur)] text-lg sm:text-xl [&>*]:text-lg sm:[&>*]:text-xl leading-loose [&>p]:mb-6 sm:[&>p]:mb-8"
                  dangerouslySetInnerHTML={{ __html: statement.content }}
                />
              </div>
            );
          })}
          </div>
        </div>
      </div>
    </div>
  );
}