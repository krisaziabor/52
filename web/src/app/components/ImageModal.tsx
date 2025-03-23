'use client';

import React, { useEffect } from 'react';

interface ImageModalProps {
  src: string;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ src, alt, isOpen, onClose }) => {
  useEffect(() => {
    // Handle escape key to close modal
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    // Add event listener when modal is open
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
      // Add blur class to body when modal opens
      document.body.classList.add('modal-open');
    }
    
    // Cleanup event listener and remove blur class
    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.classList.remove('modal-open');
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md transition-all duration-300 ease-in-out cursor-zoom-out"
      onClick={onClose}
      style={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        opacity: 1,
        animation: 'fadeIn 300ms ease-in-out'
      }}
    >
      <img 
        src={src} 
        alt={alt} 
        className="max-h-[90vh] max-w-[90vw] object-contain"
        style={{
          transform: 'scale(1)',
          animation: 'scaleIn 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}
      />
    </div>
  );
};

export default ImageModal;