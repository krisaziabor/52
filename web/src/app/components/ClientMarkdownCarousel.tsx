'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const ImageCarousel = dynamic(() => import('./ImageCarousel'), { ssr: false });

interface ClientMarkdownCarouselProps {
  paths: string;
  alts?: string;
  showCaptions?: boolean;
  height?: number;
}

const ClientMarkdownCarousel: React.FC<ClientMarkdownCarouselProps> = ({ 
  paths, 
  alts,
  showCaptions = false,
  height = 400
}) => {
  // Parse image paths
  let imagePaths: string[] = [];
  if (paths) {
    // Check if the paths is wrapped in brackets
    if (paths.startsWith('[') && paths.endsWith(']')) {
      // Remove brackets and split by comma
      imagePaths = paths
        .substring(1, paths.length - 1)
        .split(',')
        .map(path => path.trim());
    } else {
      // Split by comma
      imagePaths = paths.split(',').map(path => path.trim());
    }
  }
  
  // Parse alt texts if provided
  let altTexts: string[] = [];
  if (alts) {
    // Check if the alts is wrapped in brackets
    if (alts.startsWith('[') && alts.endsWith(']')) {
      // Remove brackets and split by comma
      altTexts = alts
        .substring(1, alts.length - 1)
        .split(',')
        .map(alt => alt.trim());
    } else {
      // Split by comma
      altTexts = alts.split(',').map(alt => alt.trim());
    }
  }
  
  // Format paths to include /studies prefix if needed
  const formattedPaths = imagePaths.map(path => {
    // If the path is a relative path (starting with /), prefix it with /studies
    return path.startsWith('/') ? `/studies${path}` : path;
  });
  
  // Create images array for the carousel
  const images = formattedPaths.map((path, index) => {
    const alt = index < altTexts.length ? altTexts[index] : `Image ${index + 1}`;
    return {
      src: path,
      alt
    };
  });
  
  // Return null if no images
  if (images.length === 0) {
    return null;
  }
  
  return <ImageCarousel 
    images={images} 
    showCaptions={showCaptions} 
    height={height} 
  />;
};

export default ClientMarkdownCarousel;