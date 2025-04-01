'use client';

import React, { useState, useEffect } from 'react';

type Heading = {
  id: string;
  text: string;
  level: number;
};

interface TableOfContentsProps {
  projectId?: string | number; // Made optional since it's not used
}

const TableOfContents: React.FC<TableOfContentsProps> = () => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  // Extract headings from the page
  useEffect(() => {
    const extractHeadings = () => {
      const headingElements = Array.from(document.querySelectorAll('h2, h3, h4, h5, h6'))
        .filter(element => element.id); // Only include headings with IDs

      const headingData = headingElements.map(element => ({
        id: element.id,
        text: element.textContent || '',
        level: parseInt(element.tagName.substring(1)) // H2 = 2, H3 = 3, etc.
      }));

      setHeadings(headingData);
    };

    extractHeadings();

    // Update active heading based on scroll position
    const handleScroll = () => {
      const headingElements = Array.from(document.querySelectorAll('h2, h3, h4, h5, h6'))
        .filter(element => element.id);
      
      // Find the heading that's currently in view
      for (let i = headingElements.length - 1; i >= 0; i--) {
        const element = headingElements[i];
        const rect = element.getBoundingClientRect();
        
        if (rect.top <= 150) { // Adjust this value based on your layout
          setActiveId(element.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to heading when TOC item is clicked
  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100, // Adjust for any fixed headers
        behavior: 'smooth'
      });
      setActiveId(id);
    }
  };

  // Skip rendering if no headings found
  if (headings.length === 0) {
    return null;
  }

  return (
    <div className="fixed left-8 top-48 hidden lg:block overflow-y-auto max-h-[60vh] z-10 w-56 lg:pr-8 xl:pr-4">
      <nav className="toc text-xs font-[family-name:var(--font-fragment-sans)]" aria-label="Table of contents">
        <ul className="space-y-1 text-gray-500">
          {headings.map(heading => (
            <li 
              key={heading.id}
              style={{ paddingLeft: `${(heading.level - 2) * 8}px` }}
              className={`hover:text-gray-800 transition-colors duration-200 ${
                activeId === heading.id ? 'text-gray-900 font-medium' : ''
              }`}
            >
              <button
                onClick={() => scrollToHeading(heading.id)}
                className="text-left block py-1 line-clamp-1"
              >
                {heading.text}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default TableOfContents;