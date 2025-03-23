import Link from "next/link";
import { Project } from "../data/projects";

interface ProjectListProps {
    projects: Project[];
}

const ProjectList = ({ projects }: ProjectListProps) => {

    // Sort projects in descending order of id
    const sortedProjects = [...projects].sort((a, b) => b.id - a.id);

    return (
        <div className="w-full">
            {/* Last updated timestamp */}
            <div className="mb-4">
                <div className="text-sm text-gray-500 mb-4">Last updated on 03/22</div>
                <div className="border-t border-gray-200 mb-6"></div>
            </div>
            
            {sortedProjects.map((project, index) => (
                <div key={project.id}>
                    {index > 0 && <div className="border-t border-gray-200 my-6"></div>}
                    {project.comingSoon ? (
                        <div className={`flex flex-col md:flex-row w-full items-start opacity-60`}>
                            <div className="flex justify-between items-center md:block mb-4 md:mb-0 w-full md:w-auto">
                                <div className="font-[family-name:var(--font-semi-diatype)] text-7xl md:text-9xl md:w-24 text-left md:text-right md:mr-24 text-gray-400">
                                    {String(project.id).padStart(2, '0')}
                                </div>
                                <div className="w-48 h-24 md:hidden bg-gray-100 overflow-hidden flex-shrink-0 ml-auto">
                                    {project.photos.length > 0 && (
                                        <div className="relative w-full h-full">
                                            <img 
                                                src={project.photos[0]} 
                                                alt={project.name} 
                                                className="w-full h-full object-cover filter grayscale"
                                            />
                                            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex-grow flex flex-col md:flex-row items-start justify-between gap-6 md:gap-4">
                                <div className="flex-grow flex flex-col justify-center md:h-32 mt-0">
                                    <div className="flex flex-col">
                                        <div className="flex items-center">
                                            <h3 className="text-xl font-medium line-clamp-1 font-[family-name:var(--font-fragment-sans)] text-gray-500">{project.name}</h3>
                                            <span className="ml-3 px-2 py-0.5 bg-gray-200 text-gray-500 text-xs font-[family-name:var(--font-diatype-mono)]">COMING NEXT WEEK</span>
                                        </div>
                                        <p className="text-gray-400 mt-1">{project.description}</p>
                                    </div>
                                </div>
                                <div className="hidden md:block md:w-64 md:h-32 bg-gray-100 overflow-hidden flex-shrink-0">
                                    {project.photos.length > 0 && (
                                        <div className="relative w-full h-full">
                                            <img 
                                                src={project.photos[0]} 
                                                alt={project.name} 
                                                className="w-full h-full object-cover filter grayscale"
                                            />
                                            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <Link href={`/projects/${project.id}`} className="group">
                            <div className="flex flex-col md:flex-row w-full items-start transition-opacity hover:opacity-80">
                                <div className="flex justify-between items-center md:block mb-4 md:mb-0 w-full md:w-auto">
                                    <div className="font-[family-name:var(--font-semi-diatype)] text-7xl md:text-9xl md:w-24 text-left md:text-right md:mr-24">
                                        {String(project.id).padStart(2, '0')}
                                    </div>
                                    <div className="w-48 h-24 md:hidden bg-gray-100 overflow-hidden flex-shrink-0 ml-auto">
                                        {project.photos.length > 0 && (
                                            <div className="relative w-full h-full">
                                                <img 
                                                    src={project.photos[0]} 
                                                    alt={project.name} 
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="flex-grow flex flex-col md:flex-row items-start justify-between gap-6 md:gap-4">
                                    <div className="flex-grow flex flex-col justify-center md:h-32 mt-0">
                                        <div className="flex flex-col">
                                            <h3 className="text-xl font-medium line-clamp-1 font-[family-name:var(--font-fragment-sans)] group-hover:underline">{project.name}</h3>
                                            <p className="text-gray-600 mt-1">{project.description}</p>
                                        </div>
                                    </div>
                                    <div className="hidden md:block md:w-64 md:h-32 bg-gray-100 overflow-hidden flex-shrink-0">
                                        {project.photos.length > 0 && (
                                            <div className="relative w-full h-full">
                                                <img 
                                                    src={project.photos[0]} 
                                                    alt={project.name} 
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ProjectList;
