'use client';

import React from 'react';
import Image from 'next/image';
import { ScriptElement } from '../context/ScriptContext';
import VimeoWrapper from './VimeoWrapper';

interface ElementRendererProps {
  element: ScriptElement;
  className?: string;
}

const ElementRenderer: React.FC<ElementRendererProps> = ({ element, className = '' }) => {
  switch (element.type) {
    case 'text':
      return (
        <div className={`text-element ${className}`}>
          {element.metadata?.title && (
            <h2 className="text-xl font-bold mb-2">{element.metadata.title}</h2>
          )}
          <div className="prose max-w-none">
            {element.content.split('\n').map((paragraph, i) => (
              <p key={i} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      );
      
    case 'image':
      return (
        <figure className={`image-element ${className}`}>
          <div className="relative w-full aspect-auto">
            <img
              src={element.content}
              alt={element.metadata?.alt || ''}
              className="w-full h-auto"
            />
          </div>
          {element.metadata?.caption && (
            <figcaption className="text-sm mt-2 italic text-gray-600">
              {element.metadata.caption}
            </figcaption>
          )}
        </figure>
      );
      
    case 'video':
      return (
        <div className={`video-element ${className}`}>
          {element.metadata?.title && (
            <h2 className="text-xl font-bold mb-2">{element.metadata.title}</h2>
          )}
          <VimeoWrapper vimeoId={element.content} />
          {element.metadata?.caption && (
            <p className="text-sm mt-2 italic text-gray-600">
              {element.metadata.caption}
            </p>
          )}
        </div>
      );
      
    default:
      return <div>Unknown element type</div>;
  }
};

export default ElementRenderer;