'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ContentType = 'product' | '52';

interface ContentContextType {
  contentType: ContentType;
  setContentType: (type: ContentType) => void;
  toggleContentType: () => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Default to 'product' per requirements
  const [contentType, setContentType] = useState<ContentType>('product');

  // Load from localStorage on mount (if available)
  useEffect(() => {
    try {
      const savedType = localStorage.getItem('contentType');
      if (savedType === 'product' || savedType === '52') {
        setContentType(savedType);
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  // Save to localStorage when changed
  useEffect(() => {
    try {
      localStorage.setItem('contentType', contentType);
    } catch {
      // Ignore localStorage errors
    }
  }, [contentType]);

  const toggleContentType = () => {
    setContentType(prevType => prevType === 'product' ? '52' : 'product');
  };

  return (
    <ContentContext.Provider value={{ contentType, setContentType, toggleContentType }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = (): ContentContextType => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};