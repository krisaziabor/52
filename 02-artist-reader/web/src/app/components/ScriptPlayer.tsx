'use client';

import React, { useEffect } from 'react';
import { useScript, Script } from '../context/ScriptContext';
import ElementRenderer from './ElementRenderer';

interface ScriptPlayerProps {
  script?: Script;
  className?: string;
  autoStart?: boolean;
}

const ScriptPlayer: React.FC<ScriptPlayerProps> = ({ 
  script: initialScript,
  className = '',
  autoStart = false
}) => {
  const { 
    script,
    setScript,
    visibleElements,
    currentSequenceIndex,
    nextSequence,
    previousSequence,
    resetSequence
  } = useScript();

  // Initialize script if provided as prop
  useEffect(() => {
    if (initialScript) {
      setScript(initialScript);
      
      if (autoStart) {
        // Start at the first sequence after a short delay
        setTimeout(() => {
          nextSequence();
        }, 500);
      }
    }
  }, [initialScript, setScript, autoStart, nextSequence]);

  if (!script) {
    return <div className="p-4 text-center">No script loaded</div>;
  }

  const totalSequences = script.sequences.length;
  const isFirstSequence = currentSequenceIndex <= 0;
  const isLastSequence = currentSequenceIndex >= totalSequences - 1;
  const hasStarted = currentSequenceIndex >= 0;

  // Find the visible elements based on their IDs
  const elementsToRender = script.elements.filter(el => 
    visibleElements.includes(el.id)
  );

  return (
    <div className={`script-player ${className}`}>
      <div className="script-content space-y-8 mb-8">
        {hasStarted ? (
          elementsToRender.map(element => (
            <ElementRenderer 
              key={element.id} 
              element={element} 
              className="mb-8"
            />
          ))
        ) : (
          <div className="text-center p-8 bg-gray-50 rounded-lg">
            <h2 className="text-2xl font-bold mb-2">{script.title}</h2>
            <p className="text-gray-600">Press 'Start' to begin</p>
          </div>
        )}
      </div>

      <div className="script-controls flex items-center justify-between bg-gray-100 p-4 rounded-lg">
        <div className="flex items-center space-x-4">
          <button
            onClick={resetSequence}
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!hasStarted}
          >
            Reset
          </button>

          <button
            onClick={previousSequence}
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isFirstSequence || !hasStarted}
          >
            Previous
          </button>

          <button
            onClick={nextSequence}
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLastSequence && hasStarted}
          >
            {hasStarted ? (isLastSequence ? 'End' : 'Next') : 'Start'}
          </button>
        </div>

        {hasStarted && (
          <div className="sequence-indicator text-sm text-gray-600">
            {currentSequenceIndex + 1} / {totalSequences}
          </div>
        )}
      </div>
    </div>
  );
};

export default ScriptPlayer;