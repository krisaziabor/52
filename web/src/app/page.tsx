import Bio from "./components/Hero";
import FullWebsiteButton from "./components/FullWebsiteButton";
import ProjectList from "./components/ProjectList";
import { projects } from "./data/projects";

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr] grid-cols-2 items-center justify-items-center min-h-screen p-4 pt-8 sm:p-8 md:pb-20 gap-12 md:gap-64 lg:p-20 font-[family-name:var(--font-fragment-sans)]">
      <div className="col-span-2 row-span-1 flex flex-row justify-between items-start w-full mb-6 sm:mb-0">
        <Bio />
        <FullWebsiteButton />
      </div>
      <div className="col-span-2 row-span-1 w-full">
        <ProjectList projects={projects} />
      </div>
    </div>
  );
}
