'use client';

import React, { useState, useRef } from 'react';
import { Script } from '../context/ScriptContext';
import ElementRenderer from './ElementRenderer';

interface ScriptPlayerProps {
  script: Script;
  className?: string;
}

const ScriptPlayer: React.FC<ScriptPlayerProps> = ({ 
  script,
  className = ''
}) => {
  const [currentSequenceIndex, setCurrentSequenceIndex] = useState(0);
  const [cursorPosition, setCursorPosition] = useState<'left' | 'right'>('right');
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle mouse movement to determine cursor style
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const halfWidth = rect.width / 2;
    const relativeX = e.clientX - rect.left;
    
    // Only update state if position actually changes to prevent infinite loops
    const newPosition = relativeX < halfWidth ? 'left' : 'right';
    if (newPosition !== cursorPosition) {
      setCursorPosition(newPosition);
    }
  };

  // Navigation between sequences
  const handleClick = () => {
    if (cursorPosition === 'left' && currentSequenceIndex > 0) {
      setCurrentSequenceIndex(currentSequenceIndex - 1);
    } else if (cursorPosition === 'right' && currentSequenceIndex < script.sequences.length - 1) {
      setCurrentSequenceIndex(currentSequenceIndex + 1);
    }
  };

  // Set cursor styles based on position
  const cursorStyle = cursorPosition === 'left' ? 'cursor-w-resize' : 'cursor-e-resize';

  // Get current sequence and elements
  const currentSequence = script.sequences[currentSequenceIndex];
  const currentElements = currentSequence.map(idx => script.elements[idx]);

  return (
    <div 
      ref={containerRef}
      className={`script-player ${className} ${cursorStyle} min-h-screen w-full relative`}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    >
      <div className="grid grid-cols-3 min-h-screen w-full">
        {currentElements.map((element, index) => {
          // Place elements in the three grid columns
          return (
            <div 
              key={element.id}
              className={`flex flex-col justify-between relative p-8 h-full ${index < 2 ? 'border-r border-gray-100' : ''}`}
            >
              <ElementRenderer 
                element={element}
              />
              
              {/* Show artist name at the bottom of the element if present 
                  Only show in first column for a group of elements */}
              {element.metadata?.artist && index === 0 && (
                <div className="text-sm text-gray-600 font-[family-name:var(--font-diatype-mono)] pb-4">
                  {element.metadata.artist}
                </div>
              )}
            </div>
          );
        })}
        
        {/* Add empty columns if needed */}
        {[...Array(3 - currentElements.length)].map((_, index) => (
          <div 
            key={`empty-${index}`} 
            className={`${index < 2 - currentElements.length ? 'border-r border-gray-100' : ''}`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ScriptPlayer;