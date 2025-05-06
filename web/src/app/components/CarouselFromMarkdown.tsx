'use client';

import React from 'react';
import ImageCarousel from './ImageCarousel';

interface CarouselFromMarkdownProps {
  markdownContent: string;
  imagePaths: string[];
  alternativeText?: string[];
}

const CarouselFromMarkdown: React.FC<CarouselFromMarkdownProps> = ({ 
  markdownContent, 
  imagePaths,
  alternativeText
}) => {
  // If no image paths are provided, extract them from markdown content
  let images = [];

  if (imagePaths && imagePaths.length > 0) {
    // Use the provided image paths
    images = imagePaths.map((path, index) => {
      const alt = alternativeText && alternativeText[index] 
        ? alternativeText[index] 
        : `Image ${index + 1}`;
        
      return {
        src: path,
        alt
      };
    });
  } else {
    // Extract image paths from markdown content
    const imageRegex = /!\[(.*?)\]\((.*?)\)/g;
    let match;
    
    while ((match = imageRegex.exec(markdownContent)) !== null) {
      const alt: string = match[1] || `Image ${images.length + 1}`;
      let src = match[2];
      
      // Make sure the src has a leading slash if it doesn't already
      if (!src.startsWith('/')) {
        src = `/${src}`;
      }
      
      images.push({
        src,
        alt
      });
    }
  }
  
  if (images.length === 0) {
    return null;
  }
  
  return <ImageCarousel images={images} />;
};

export default CarouselFromMarkdown;