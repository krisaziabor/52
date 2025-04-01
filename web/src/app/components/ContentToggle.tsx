'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function ContentToggle() {
  const router = useRouter();
  const pathname = usePathname();
  
  const isOn52Page = pathname === '/52' || pathname.startsWith('/52/');
  
  const handleProductToggle = () => {
    if (isOn52Page) {
      router.push('/');
    }
  };
  
  const handle52Toggle = () => {
    if (!isOn52Page) {
      router.push('/52');
    }
  };

  return (
    <div className="flex items-center space-x-6 text-sm">
      <div 
        className="flex items-center space-x-2 cursor-pointer" 
        onClick={handleProductToggle}
      >
        <div 
          className={`w-4 h-4 border border-black ${!isOn52Page ? 'bg-black' : 'bg-transparent'} transition-colors`}
          aria-label="Product toggle"
        />
        <span className={`${!isOn52Page ? 'font-medium' : ''}`}>Product</span>
      </div>
      
      <div 
        className="flex items-center space-x-2 cursor-pointer" 
        onClick={handle52Toggle}
      >
        <div 
          className={`w-4 h-4 border border-black ${isOn52Page ? 'bg-black' : 'bg-transparent'} transition-colors`}
          aria-label="52 toggle"
        />
        <span className={`${isOn52Page ? 'font-medium' : ''}`}>52</span>
      </div>
    </div>
  );
}