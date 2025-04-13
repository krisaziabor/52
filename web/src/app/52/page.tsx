"use client";

import Bio from "../components/Hero";
import Navbar from "../components/Navbar";
import SectionHeader from "../components/SectionHeader";
import ProjectList from "../components/ProjectList";
import { projects as fiftyTwoProjects } from "../data/52/projects";
import { ContentProvider } from "../context/ContentContext";
import { useEffect } from "react";
import { useContent } from "../context/ContentContext";
import Footer from "../footer";

function FiftyTwoContent() {
  const { setContentType } = useContent();

  // Force content type to '52' when on this page
  useEffect(() => {
    setContentType("52");
  }, [setContentType]);

  return (
    <>
      <div className="grid grid-rows-[auto_1fr] grid-cols-2 items-center justify-items-center min-h-screen p-4 pt-8 sm:p-8 md:pb-20 gap-12 md:gap-64 lg:p-20 font-[family-name:var(--font-fragment-sans)]">
        <div className="col-span-2 row-span-1 flex flex-col w-full mb-6 sm:mb-0">
          <Navbar />
          <div className="mt-2 md:mt-4">
            <Bio />
          </div>
        </div>
        <div className="col-span-2 row-span-1 w-full">
          <div className="flex items-center justify-between mb-4">
            <SectionHeader />
            <div className="text-sm text-gray-500">Last updated on 04/12</div>
          </div>
          <div className="border-t border-gray-200 mb-6"></div>
          <ProjectList projects={fiftyTwoProjects} />
        </div>
      </div>
      <div className="px-4 sm:px-8 lg:px-20">
        <Footer />
      </div>
    </>
  );
}

export default function FiftyTwoPage() {
  return (
    <ContentProvider>
      <FiftyTwoContent />
    </ContentProvider>
  );
}
