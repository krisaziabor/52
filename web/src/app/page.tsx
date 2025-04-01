'use client';

import Bio from "./components/Hero";
import ContentToggle from "./components/ContentToggle";
import ProjectList from "./components/ProjectList";
import { projects as productProjects } from "./data/product/projects";
import { ContentProvider } from "./context/ContentContext";
import { useEffect } from "react";
import { useContent } from "./context/ContentContext";

function ProductContent() {
  const { setContentType } = useContent();
  
  // Force content type to 'product' when on home page
  useEffect(() => {
    setContentType('product');
  }, [setContentType]);

  return (
    <div className="grid grid-rows-[auto_1fr] grid-cols-2 items-center justify-items-center min-h-screen p-4 pt-8 sm:p-8 md:pb-20 gap-12 md:gap-64 lg:p-20 font-[family-name:var(--font-fragment-sans)]">
      <div className="col-span-2 row-span-1 flex flex-row justify-between items-start w-full mb-6 sm:mb-0">
        <Bio />
      </div>
      <div className="col-span-2 row-span-1 w-full">
        <div className="flex items-center justify-between mb-4">
          <ContentToggle />
          <div className="text-sm text-gray-500">Last updated on 03/31</div>
        </div>
        <div className="border-t border-gray-200 mb-6"></div>
        <ProjectList projects={productProjects} />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <ContentProvider>
      <ProductContent />
    </ContentProvider>
  );
}
