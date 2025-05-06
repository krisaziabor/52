'use client';

import React from 'react';
import ImageCarousel from './ImageCarousel';
import CarouselFromMarkdown from './CarouselFromMarkdown';

const UsageExample: React.FC = () => {
  // Example 1: Direct usage with image objects
  const images = [
    { src: '/52/01/01.jpg', alt: 'Example image 1' },
    { src: '/52/01/02.jpg', alt: 'Example image 2' },
    { src: '/52/01/03.jpg', alt: 'Example image 3' },
  ];

  // Example 2: Extracting from markdown
  const markdownExample = `
# Project Documentation

![First image](/52/01/04.jpg)
Some text here...

![Second image](/52/01/05.jpg)
More explanation...

![Third image](/52/01/06.jpg)
  `;

  // Example 3: Using with just paths
  const imagePaths = [
    '/52/01/07.jpg',
    '/52/01/08.jpg',
    '/52/01/09.jpg',
  ];

  const alts = [
    'Custom alt text 1',
    'Custom alt text 2',
    'Custom alt text 3',
  ];

  return (
    <div className="space-y-16 my-10">
      <div>
        <h2 className="text-2xl font-bold mb-4">Example 1: Direct Usage</h2>
        <p className="mb-4">Pass an array of image objects directly to the ImageCarousel component:</p>
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <pre className="whitespace-pre-wrap">
{`<ImageCarousel 
  images={[
    { src: '/52/01/01.jpg', alt: 'Example image 1' },
    { src: '/52/01/02.jpg', alt: 'Example image 2' },
    { src: '/52/01/03.jpg', alt: 'Example image 3' }
  ]} 
/>`}
          </pre>
        </div>
        <ImageCarousel images={images} />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Example 2: From Markdown Content</h2>
        <p className="mb-4">Extract images from markdown content automatically:</p>
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <pre className="whitespace-pre-wrap">
{`<CarouselFromMarkdown
  markdownContent={\`
# Project Documentation

![First image](/52/01/04.jpg)
Some text here...

![Second image](/52/01/05.jpg)
More explanation...

![Third image](/52/01/06.jpg)
  \`}
/>`}
          </pre>
        </div>
        <CarouselFromMarkdown markdownContent={markdownExample} />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Example 3: From Image Paths</h2>
        <p className="mb-4">Pass image paths and optional alt texts:</p>
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <pre className="whitespace-pre-wrap">
{`<CarouselFromMarkdown
  imagePaths={[
    '/52/01/07.jpg',
    '/52/01/08.jpg',
    '/52/01/09.jpg'
  ]}
  alternativeText={[
    'Custom alt text 1',
    'Custom alt text 2',
    'Custom alt text 3'
  ]}
/>`}
          </pre>
        </div>
        <CarouselFromMarkdown 
          imagePaths={imagePaths} 
          alternativeText={alts} 
        />
      </div>
    </div>
  );
};

export default UsageExample;