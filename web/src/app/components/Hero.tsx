'use client';

import Image from 'next/image';
import React from 'react';
import { useContent } from '../context/ContentContext';

export default function Bio() {
  const { contentType } = useContent();

  const content52 = (
    <>
      <Image
        className=""
        src="/52-logo.svg"
        alt="52 logo"
        width={180}
        height={38}
        priority
      />
      <div className="flex flex-col w-full sm:w-1/2 gap-4 text-sm sm:text-base text-foreground">
        <p>
          A site dedicated to my efforts to become a person of habit and someone who has traditions for themselves. 
        </p>
        <p>A home for the excitement I always have for brand new projects. </p>
        <p>An archive of my weekly creations for the next 52.</p>
      </div>
    </>
  );

  const contentProduct = (
    <>
      <Image
        className=""
        src="/KAKA-logo.svg"
        alt="KAKA logo"
        width={180}
        height={38}
        priority
      />
      <div className="flex flex-col w-full sm:w-1/2 gap-4 text-sm sm:text-base text-foreground">
        <p>
          A collection of product case studies and design projects by Kris Aziabor.
        </p>
        <p>Exploring the intersection of design, technology, and human experience.</p>
      </div>
    </>
  );

  return (
    <div className="flex flex-col gap-8">
      {contentType === '52' ? content52 : contentProduct}
    </div>
  );
}
