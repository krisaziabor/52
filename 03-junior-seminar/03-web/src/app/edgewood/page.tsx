'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
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
    <div className="grid grid-rows-[20px_1fr_20px] min-h-screen p-4 pb-20 gap-6 sm:p-10 bg-white relative">
      <Link 
        href="/"
        className="absolute top-4 left-4 z-50 font-[family-name:var(--font-centaur)] text-lg hover:underline"
      >
        ← Back to home
      </Link>
      
      {/* Mobile artist selector - only visible on small screens */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white shadow-lg border-t border-gray-200 p-3">
        <select 
          className="w-full px-3 py-2 text-lg font-[family-name:var(--font-elle-two)] rounded border border-gray-300"
          value={selectedArtist}
          onChange={(e) => handleArtistSelect(e.target.value)}
        >
          <option value="">No Idea If This Is Bad Or Not</option>
          {artistNames.map((name, index) => (
            <option key={index} value={name}>{name}</option>
          ))}
        </select>
      </div>
      
      <main className="row-start-2 flex">
        {/* Desktop sidebar - hidden on mobile */}
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
        
        {/* Main content area - full width on mobile */}
        <div className="w-full sm:w-3/5 pb-20 sm:pb-0">
          <ArtistStatements artistNames={artistNames} artistsData={artistsData} />
        </div>
      </main>
    </div>
  );
}