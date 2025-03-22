import Bio from "./components/bio";
import FullWebsiteButton from "./components/full-website-button";
import Footer from "./footer";
import ProjectList from "./components/ProjectList";
import { projects } from "./data/projects";

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr] grid-cols-2 items-center justify-items-center min-h-screen p-8 pb-20 gap-64 sm:p-20 font-[family-name:var(--font-fragment-sans)]">
      <div className="col-span-2 row-span-1 flex justify-between w-full">
        <Bio />
        <FullWebsiteButton />
      </div>
      <div className="col-span-2 row-span-1 w-full">
        <ProjectList projects={projects} />
      </div>
      <Footer />
    </div>
  );
}
