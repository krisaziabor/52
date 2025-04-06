'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define script element types
export interface ScriptElement {
  id: string;
  type: 'text' | 'image' | 'video';
  content: string; // For text: the content; for image/video: the path or vimeoId
  metadata?: {
    title?: string;
    caption?: string;
    alt?: string; // for images
    [key: string]: any; // Allow for additional metadata
  };
}

// Define script interface
export interface Script {
  id: string;
  title: string;
  elements: ScriptElement[];
  sequences: number[][]; // Array of element ID arrays, representing display sequences
}

// Context interface
interface ScriptContextType {
  script: Script | null;
  currentSequenceIndex: number;
  visibleElements: string[]; // Array of element IDs currently visible
  setScript: (script: Script) => void;
  nextSequence: () => void;
  previousSequence: () => void;
  goToSequence: (index: number) => void;
  resetSequence: () => void;
}

// Create context with default values
const ScriptContext = createContext<ScriptContextType>({
  script: null,
  currentSequenceIndex: -1,
  visibleElements: [],
  setScript: () => {},
  nextSequence: () => {},
  previousSequence: () => {},
  goToSequence: () => {},
  resetSequence: () => {},
});

// Provider component
export function ScriptProvider({ children }: { children: ReactNode }) {
  const [script, setScriptState] = useState<Script | null>(null);
  const [currentSequenceIndex, setCurrentSequenceIndex] = useState<number>(-1);
  const [visibleElements, setVisibleElements] = useState<string[]>([]);

  // Set script
  const setScript = (newScript: Script) => {
    setScriptState(newScript);
    resetSequence();
  };

  // Reset to beginning
  const resetSequence = () => {
    setCurrentSequenceIndex(-1);
    setVisibleElements([]);
  };

  // Move to next sequence
  const nextSequence = () => {
    if (!script) return;
    
    if (currentSequenceIndex < script.sequences.length - 1) {
      const nextIndex = currentSequenceIndex + 1;
      const elementIds = script.sequences[nextIndex]
        .map(idx => script.elements[idx]?.id)
        .filter(Boolean) as string[];
      
      setCurrentSequenceIndex(nextIndex);
      setVisibleElements(elementIds);
    }
  };

  // Move to previous sequence
  const previousSequence = () => {
    if (!script || currentSequenceIndex <= 0) return;
    
    const prevIndex = currentSequenceIndex - 1;
    const elementIds = script.sequences[prevIndex]
      .map(idx => script.elements[idx]?.id)
      .filter(Boolean) as string[];
    
    setCurrentSequenceIndex(prevIndex);
    setVisibleElements(elementIds);
  };

  // Go to specific sequence
  const goToSequence = (index: number) => {
    if (!script || index < 0 || index >= script.sequences.length) return;
    
    const elementIds = script.sequences[index]
      .map(idx => script.elements[idx]?.id)
      .filter(Boolean) as string[];
    
    setCurrentSequenceIndex(index);
    setVisibleElements(elementIds);
  };

  return (
    <ScriptContext.Provider
      value={{
        script,
        currentSequenceIndex,
        visibleElements,
        setScript,
        nextSequence,
        previousSequence,
        goToSequence,
        resetSequence,
      }}
    >
      {children}
    </ScriptContext.Provider>
  );
}

// Custom hook to use the script context
export function useScript() {
  const context = useContext(ScriptContext);
  if (context === undefined) {
    throw new Error('useScript must be used within a ScriptProvider');
  }
  return context;
}