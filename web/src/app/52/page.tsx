'use client';

import Bio from "../components/Hero";
import ContentToggle from "../components/ContentToggle";
import ProjectList from "../components/ProjectList";
import { projects as fiftyTwoProjects } from "../data/52/projects";
import { ContentProvider } from "../context/ContentContext";
import { useEffect } from "react";
import { useContent } from "../context/ContentContext";

function FiftyTwoContent() {
  const { setContentType } = useContent();
  
  // Force content type to '52' when on this page
  useEffect(() => {
    setContentType('52');
  }, [setContentType]);

  return (
    <div className="grid grid-rows-[auto_1fr] grid-cols-2 items-center justify-items-center min-h-screen p-4 pt-8 sm:p-8 md:pb-20 gap-12 md:gap-64 lg:p-20 font-[family-name:var(--font-fragment-sans)]">
      <div className="col-span-2 row-span-1 flex flex-row justify-between items-start w-full mb-6 sm:mb-0">
        <Bio />
        <div className="flex flex-row gap-4">
          <ContentToggle />
        </div>
      </div>
      <div className="col-span-2 row-span-1 w-full">
        <ProjectList projects={fiftyTwoProjects} />
      </div>
    </div>
  );
}

export default function FiftyTwoPage() {
  return (
    <ContentProvider>
      <FiftyTwoContent />
    </ContentProvider>
  );
}