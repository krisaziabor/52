'use client';

import { useState, useEffect } from 'react';
import ArtistStatements from '../components/ArtistStatements';

interface ArtistStatement {
  number: string;
  content: string;
  isComplete: boolean;
}

export default function EdgewoodPage() {
  const [artistsData, setArtistsData] = useState<Record<string, ArtistStatement[]>>({});
  const [artistNames, setArtistNames] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    // Fetch the artist data
    async function fetchData() {
      try {
        const response = await fetch('/api/artists');
        const data = await response.json();
        setArtistsData(data.artistsData);
        setArtistNames(data.artistNames);
      } catch (error) {
        console.error('Error fetching artist data:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);
  
  // State for artist selection in React instead of DOM manipulation
  const [selectedArtist, setSelectedArtist] = useState<string>('');
  
  // Function to select an artist
  const handleArtistSelect = (name: string) => {
    setSelectedArtist(name);
    // Dispatch the event for the ArtistStatements component
    document.dispatchEvent(new CustomEvent('selectArtist', { detail: { name } }));
  };
  
  // Function to reset artist selection
  const handleReset = () => {
    setSelectedArtist('');
    document.dispatchEvent(new CustomEvent('selectArtist', { detail: { name: '' } }));
  };

  // Loading state
  if (loading) {
    return (
      <div className="grid grid-rows-[20px_1fr_20px] min-h-screen p-4 pb-20 gap-6 sm:p-10 bg-white">
        <main className="row-start-2 flex items-center justify-center">
          <p className="text-xl font-[family-name:var(--font-centaur)]">Loading artist statements...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] min-h-screen p-4 pb-20 gap-6 sm:p-10 bg-white">
      <main className="row-start-2 flex">
        <div className="w-2/5 hidden sm:block overflow-hidden">
          <div>
            <ul className="font-[family-name:var(--font-elle-two)] text-6xl space-y-0 leading-none">
              {artistNames.map((name, index) => (
                <li 
                  key={index} 
                  data-artist-name={name}
                  className={`cursor-pointer transition-all duration-200 group -mt-2 
                    ${selectedArtist === name ? 'opacity-100' : 'opacity-30'} 
                    hover:opacity-[initial]`}
                  data-active={selectedArtist === name ? "true" : "false"}
                  onClick={() => handleArtistSelect(name)}
                >
                  <span className={`block lowercase transition-all duration-200 
                    ${selectedArtist === name ? 'text-7xl' : ''} 
                    group-hover:text-7xl`}
                  >
                    {name}
                  </span>
                </li>
              ))}
            </ul>
            
            <div className="mt-32 mb-1">
              {/* <div className="flex justify-between items-center mb-4">
                <button 
                  id="autoplay-toggle" 
                  className="font-[family-name:var(--font-elle-two)] text-sm uppercase tracking-wide text-gray-700 cursor-pointer hover:text-black transition-colors duration-200"
                >
                  AUTOPLAY OFF
                </button>
              </div> */}
              <h2 
                className="font-[family-name:var(--font-elle-two)] text-2xl uppercase tracking-wide text-gray-700 cursor-pointer hover:text-black transition-colors duration-200" 
                id="title-reset"
                onClick={handleReset}
              >
                No Idea If This Is Bad Or Not
              </h2>
            </div>
          </div>
        </div>
        
        <div className="w-full sm:w-3/5">
          <ArtistStatements artistNames={artistNames} artistsData={artistsData} />
        </div>
      </main>
    </div>
  );
}