'use client';

import React, { useState, useEffect, useRef } from 'react';

interface ProjectMetadataProps {
  metadata: Record<string, string | string[]>;
  showDate?: boolean;
}

const ProjectMetadata: React.FC<ProjectMetadataProps> = ({ metadata, showDate = false }) => {
  const [showSideMetadata, setShowSideMetadata] = useState(true);
  const mainMetadataRef = useRef<HTMLDivElement>(null);
  
  // Process metadata and group values by key
  const processedMetadata: Record<string, string[]> = {};
  
  Object.entries(metadata).forEach(([key, value]) => {
    // Skip id and title keys
    if (key === 'id' || key === 'title') return;
    
    // Initialize the array if it doesn't exist
    if (!processedMetadata[key]) {
      processedMetadata[key] = [];
    }
    
    // Add value(s) to the array, splitting any values containing commas
    if (Array.isArray(value)) {
      // For each array item, split by comma and trim whitespace
      value.forEach(item => {
        if (typeof item === 'string' && item.includes(',')) {
          const splitItems = item.split(',').map(part => part.trim());
          processedMetadata[key].push(...splitItems);
        } else {
          processedMetadata[key].push(item);
        }
      });
    } else if (typeof value === 'string') {
      // Split string value by comma and trim whitespace
      if (value.includes(',')) {
        const splitItems = value.split(',').map(part => part.trim());
        processedMetadata[key].push(...splitItems);
      } else {
        processedMetadata[key].push(value);
      }
    }
  });

  // Define column mappings
  const column1Keys = ['work', 'team', 'special thanks'];
  const column2Keys = ['discipline'];
  const column3Keys = ['tech stack'];
  
  // Define display names for keys (for custom labels)
  const displayNames: Record<string, string> = {
    'tech stack': 'tools & tech stack'
  };
  
  // Organize metadata by columns
  const columns = [
    { 
      id: 'column1', 
      items: Object.entries(processedMetadata)
        .filter(([key]) => column1Keys.includes(key))
        .map(([key, values]) => ({ key, values }))
        .sort((a, b) => column1Keys.indexOf(a.key) - column1Keys.indexOf(b.key))
    },
    { 
      id: 'column2', 
      items: Object.entries(processedMetadata)
        .filter(([key]) => column2Keys.includes(key))
        .map(([key, values]) => ({ key, values }))
    },
    { 
      id: 'column3', 
      items: Object.entries(processedMetadata)
        .filter(([key]) => column3Keys.includes(key))
        .map(([key, values]) => ({ key, values }))
    }
  ];

  // Scroll handler to show/hide side metadata
  useEffect(() => {
    const handleScroll = () => {
      if (mainMetadataRef.current) {
        const { top } = mainMetadataRef.current.getBoundingClientRect();
        
        // Show side metadata when main metadata is not in view
        // Balanced timing - fade begins when metadata is approaching the viewport
        const triggerPoint = window.innerHeight * 0.9;
        setShowSideMetadata(top > triggerPoint);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial scroll position
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Render metadata content for main display (in columns)
  const renderMainMetadataContent = () => (
    <>
      {columns.map((column) => (
        <div key={column.id}>
          {column.items.map((item) => (
            <div key={item.key} className="mb-4">
              <div className="font-[family-name:var(--font-diatype-mono)] text-gray-500 mb-1 uppercase tracking-wide text-xs">
                {displayNames[item.key] || item.key}
              </div>
              <div className="font-[family-name:var(--font-fragment-sans)]">
                {item.values.map((value, index) => (
                  <div key={index} className="leading-relaxed">{value}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </>
  );
  
  // Render metadata content for side panel (flat list)
  const renderSideMetadataContent = () => {
    // Get all metadata items across all columns
    const allItems = columns.flatMap(column => column.items);
    
    // Sort them in a specific order
    const orderedItems = [
      ...allItems.filter(item => item.key === 'work'),
      ...allItems.filter(item => item.key === 'team'),
      ...allItems.filter(item => item.key === 'special thanks'),
      ...allItems.filter(item => item.key === 'discipline'),
      ...allItems.filter(item => item.key === 'tech stack'),
    ];
    
    return (
      <>
        {orderedItems.map((item) => (
          <div key={item.key} className="mb-4">
            <div className="font-[family-name:var(--font-diatype-mono)] text-gray-500 mb-1 uppercase tracking-wide text-xs">
              {displayNames[item.key] || item.key}
            </div>
            <div className="font-[family-name:var(--font-fragment-sans)]">
              {item.values.map((value, index) => (
                <div key={index} className="leading-relaxed">{value}</div>
              ))}
            </div>
          </div>
        ))}
      </>
    );
  };

  return (
    <>
      {/* Main metadata (original position) - date is now displayed outside this component */}
      <div ref={mainMetadataRef} className="mb-8 text-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
        {renderMainMetadataContent()}
      </div>

      {/* Side metadata (right side when scrolled) */}
      <div 
        className={`fixed right-8 top-24 hidden xl:block z-20 w-64 p-5 border-l border-gray-200 bg-white/80
                  transition-all duration-300 transform ${showSideMetadata ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 pointer-events-none'}`}
      >
        <div className="text-xs grid grid-cols-1 gap-y-4 max-h-[80vh] overflow-y-auto pr-2">
          {/* Date at the top of side metadata as first item */}
          {showDate && (
            <div className="mb-4">
              <div className="font-[family-name:var(--font-diatype-mono)] text-gray-500 mb-1 uppercase tracking-wide text-xs">
                date
              </div>
              <div className="font-[family-name:var(--font-fragment-sans)]">
                <div className="leading-relaxed">{(metadata.date as string)}</div>
              </div>
            </div>
          )}
          
          {/* Rest of metadata items in a flat list */}
          {renderSideMetadataContent()}
        </div>
      </div>
    </>
  );
};

export default ProjectMetadata;
