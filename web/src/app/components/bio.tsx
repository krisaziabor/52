import Image from 'next/image';
import React from 'react';

export default function Bio() {
  return (
    <div className="grid gap-8">
      <Image
        className="dark:invert"
        src="/52-logo.svg"
        alt="52 logo"
        width={180}
        height={38}
        priority
      />
      <div className="flex flex-col w-1/2 gap-4 text-sm sm:text-base text-foreground/80">
        <p>
          A site dedicated to my efforts of becoming a person of habit and
          someone who has traditions for themself.
        </p>
        <p>A home for the excitement I always have for freshly new projects.</p>
        <p>An archive of my weekly creations for the next 52.</p>
      </div>
    </div>
  );
}
