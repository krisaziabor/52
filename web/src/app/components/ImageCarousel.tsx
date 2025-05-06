'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

// Import the ImageModal component
const ImageModal = dynamic(() => import('./ImageModal'), { ssr: false });

interface ImageCarouselProps {
  images: {
    src: string;
    alt: string;
  }[];
  transitionSpeed?: number; // in ms
  easingFunction?: string; // custom bezier function
  showCaptions?: boolean; // optional flag to show/hide captions
  height?: number; // fixed height in pixels
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ 
  images, 
  transitionSpeed = 300, 
  easingFunction = 'cubic-bezier(0.2, 0, 0.2, 1)',
  showCaptions = false,
  height = 400
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Calculate prev and next indices
  const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
  const nextIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
  
  // No images, return null
  if (!images || images.length === 0) return null;
  
  const currentImage = images[currentIndex];
  
  const goToPrevious = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
    
    // Reset animation state after transition
    setTimeout(() => {
      setIsAnimating(false);
    }, transitionSpeed);
  };
  
  const goToNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
    
    // Reset animation state after transition
    setTimeout(() => {
      setIsAnimating(false);
    }, transitionSpeed);
  };
  
  const goToImage = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    
    setIsAnimating(true);
    setCurrentIndex(index);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, transitionSpeed);
  };
  
  const openModal = (index: number) => {
    setModalIndex(index);
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  const goToModalPrevious = () => {
    setModalIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };
  
  const goToModalNext = () => {
    setModalIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="my-8" ref={carouselRef}>
      <div 
        className="relative overflow-hidden rounded-lg flex items-center justify-center" 
        style={{ height: `${height}px` }}
      >
        {/* Previous image (preview) */}
        {images.length > 1 && (
          <div 
            className="absolute left-0 top-0 bottom-0 w-[10%] overflow-hidden cursor-pointer"
            onClick={goToPrevious}
          >
            <div 
              className="absolute inset-0 bg-gradient-to-r from-white to-transparent z-10"
            ></div>
            <img 
              src={images[prevIndex].src} 
              alt={images[prevIndex].alt} 
              className="h-full w-full object-cover opacity-40"
              style={{
                transition: `all ${transitionSpeed}ms ${easingFunction}`,
                filter: 'blur(2px)'
              }}
            />
          </div>
        )}
        
        {/* Current image */}
        <div 
          className="absolute left-[10%] right-[10%] top-0 bottom-0 flex items-center justify-center overflow-hidden cursor-zoom-in"
          onClick={() => openModal(currentIndex)}
        >
          <img 
            src={currentImage.src} 
            alt={currentImage.alt} 
            className="h-full w-full object-contain"
            style={{
              transition: `all ${transitionSpeed}ms ${easingFunction}`,
              animation: isAnimating ? 'scaleIn 300ms ease-out' : ''
            }}
          />
        </div>
        
        {/* Next image (preview) */}
        {images.length > 1 && (
          <div 
            className="absolute right-0 top-0 bottom-0 w-[10%] overflow-hidden cursor-pointer"
            onClick={goToNext}
          >
            <div 
              className="absolute inset-0 bg-gradient-to-l from-white to-transparent z-10"
            ></div>
            <img 
              src={images[nextIndex].src} 
              alt={images[nextIndex].alt} 
              className="h-full w-full object-cover opacity-40"
              style={{
                transition: `all ${transitionSpeed}ms ${easingFunction}`,
                filter: 'blur(2px)'
              }}
            />
          </div>
        )}
      </div>
      
      {/* Image indicators */}
      {images.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-black' : 'bg-gray-300'
              }`}
              onClick={() => goToImage(index)}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
      
      {/* Optional caption */}
      {showCaptions && currentImage.alt && (
        <p className="text-sm text-gray-500 mt-2 text-center">{currentImage.alt}</p>
      )}
      
      {/* Enhanced modal with navigation */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md transition-all duration-300 ease-in-out cursor-zoom-out"
          onClick={closeModal}
          style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            opacity: 1,
            animation: 'fadeIn 300ms ease-in-out'
          }}
        >
          <img 
            src={images[modalIndex].src} 
            alt={images[modalIndex].alt} 
            className="max-h-[90vh] max-w-[90vw] object-contain"
            style={{
              transform: 'scale(1)',
              animation: 'scaleIn 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            }}
            onClick={(e) => e.stopPropagation()}
          />
          
          {/* Modal navigation buttons */}
          <button 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/70 rounded-full p-3 z-60"
            onClick={(e) => {
              e.stopPropagation();
              goToModalPrevious();
            }}
            aria-label="Previous image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          
          <button 
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/70 rounded-full p-3 z-60"
            onClick={(e) => {
              e.stopPropagation();
              goToModalNext();
            }}
            aria-label="Next image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
          
          {/* Image counter */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/70 px-3 py-1 rounded-full text-sm">
            {modalIndex + 1} / {images.length}
          </div>
          
          {/* Optional caption in modal */}
          {showCaptions && images[modalIndex].alt && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white/70 px-3 py-1 rounded-full text-sm max-w-[80%] truncate">
              {images[modalIndex].alt}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;