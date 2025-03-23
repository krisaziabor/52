'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';

// Import the ImageModal component
const ImageModal = dynamic(() => import('./ImageModal'), { ssr: false });

interface ZoomableImageProps {
  src: string;
  alt: string;
}

const ZoomableImage: React.FC<ZoomableImageProps> = ({ src, alt }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const toggleModal = () => setIsModalOpen(prev => !prev);
  
  return (
    <div className="my-8">
      <div className="relative overflow-hidden rounded-lg">
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-auto cursor-zoom-in"
          style={{
            transition: 'all 300ms cubic-bezier(0.2, 0, 0.2, 1)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.01)';
            e.currentTarget.style.filter = 'brightness(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.filter = 'brightness(1)';
          }}
          onClick={toggleModal}
        />
      </div>
      {alt && <p className="text-sm text-gray-500 mt-2">{alt}</p>}
      
      <ImageModal
        src={src}
        alt={alt}
        isOpen={isModalOpen}
        onClose={toggleModal}
      />
    </div>
  );
};

export default ZoomableImage;