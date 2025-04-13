'use client';

import Link from "next/link";
import Image from "next/image";
import { useContent } from "../context/ContentContext";
import { usePathname } from "next/navigation";
import { Project as ProjectType } from "../data/projects";
import { projects as productProjects } from "../data/product/projects";
import { projects as fiftyTwoProjects } from "../data/52/projects";
import { useState } from "react";

interface ProjectListProps {
    projects?: ProjectType[]; // Make optional since we'll get from context
}

const ProjectList = ({ projects: propProjects }: ProjectListProps) => {
    const { contentType } = useContent();
    const pathname = usePathname();
    const is52Route = pathname.startsWith('/52');
    const [hoveredProject, setHoveredProject] = useState<ProjectType | null>(null);
    
    // Use the projects from props if provided, otherwise get from the appropriate source
    const projects = propProjects || (contentType === '52' ? fiftyTwoProjects : productProjects);

    // Sort projects in descending order of id
    const sortedProjects = [...projects].sort((a, b) => b.id - a.id);

    // Determine the base project URL path based on whether we're on the 52 route
    const getProjectUrl = (projectId: number) => {
        return is52Route ? `/52/projects/${projectId}` : `/projects/${projectId}`;
    };

    // Desktop layout with split container
    const renderDesktopLayout = () => {
        return (
            <div className="hidden md:flex w-full">
                {/* Left half - Project list */}
                <div className="w-1/2 pr-8">
                    {sortedProjects.map((project, index) => (
                        <div key={project.id}>
                            {index > 0 && <div className="border-t border-gray-200 my-6"></div>}
                            {project.comingSoon ? (
                                <div 
                                    className="flex flex-row w-full items-start opacity-60"
                                    onMouseEnter={() => setHoveredProject({...project, comingSoon: true})}
                                    onMouseLeave={() => setHoveredProject(null)}
                                >
                                    <div className="block mb-0 w-auto">
                                        <div className="font-[family-name:var(--font-semi-diatype)] text-9xl w-24 text-right mr-24 text-gray-400">
                                            {String(project.id).padStart(2, '0')}
                                        </div>
                                    </div>
                                    <div className="flex-grow">
                                        <div className="flex flex-col h-32 justify-center">
                                            <div className="flex items-center">
                                                <h3 className="text-xl font-medium line-clamp-1 font-[family-name:var(--font-fragment-sans)] text-gray-500">{project.name}</h3>
                                            </div>
                                            <p className="text-gray-400 mt-1">{project.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <Link 
                                    href={getProjectUrl(project.id)} 
                                    className="group"
                                    onMouseEnter={() => setHoveredProject(project)}
                                    onMouseLeave={() => setHoveredProject(null)}
                                >
                                    <div className="flex flex-row w-full items-start transition-all duration-300 opacity-60 hover:opacity-100 filter grayscale hover:grayscale-0">
                                        <div className="block mb-0 w-auto">
                                            <div className="font-[family-name:var(--font-semi-diatype)] text-9xl w-24 text-right mr-24">
                                                {String(project.id).padStart(2, '0')}
                                            </div>
                                        </div>
                                        <div className="flex-grow">
                                            <div className="flex flex-col h-32 justify-center">
                                                <h3 className="text-xl font-medium line-clamp-1 font-[family-name:var(--font-fragment-sans)] group-hover:underline">{project.name}</h3>
                                                <p className="text-gray-600 mt-1">{project.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )}
                        </div>
                    ))}
                </div>
                
                {/* Right half - Image display */}
                <div className="w-1/2 pl-8 sticky top-20">
                    <div 
                        className="w-full bg-gray-100 overflow-hidden flex-shrink-0 aspect-[7/5]"
                    >
                        {hoveredProject ? (
                            hoveredProject.comingSoon ? (
                                <div className="flex flex-col items-center justify-center w-full h-full text-center px-6">
                                    <div className="text-gray-400 text-sm font-[family-name:var(--font-diatype-mono)]">
                                        COOKING SOMETHING YOU WILL LOVE
                                    </div>
                                    <div className="text-gray-400 text-sm font-[family-name:var(--font-diatype-mono)] mt-2">
                                        COME BACK SOON {'<3'}
                                    </div>
                                </div>
                            ) : (
                                <div className="relative w-full h-full">
                                    <Image 
                                        src={hoveredProject.photos[0]} 
                                        alt={hoveredProject.name}
                                        fill
                                        sizes="50vw"
                                        priority
                                        className="object-contain transition-opacity duration-300"
                                        style={{ imageRendering: 'crisp-edges' }}
                                    />
                                </div>
                            )
                        ) : (
                            <div className="flex items-center justify-center w-full h-full text-gray-400 text-sm font-[family-name:var(--font-diatype-mono)]">
                                HOVER OVER A CASE STUDY
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    // Mobile layout (unchanged)
    const renderMobileLayout = () => {
        return (
            <div className="w-full md:hidden">
                {sortedProjects.map((project, index) => (
                    <div key={project.id}>
                        {index > 0 && <div className="border-t border-gray-200 my-6"></div>}
                        {project.comingSoon ? (
                            <div className="flex flex-col w-full items-start opacity-60">
                                <div className="flex justify-between items-center mb-4 w-full">
                                    <div className="font-[family-name:var(--font-semi-diatype)] text-7xl text-left text-gray-400">
                                        {String(project.id).padStart(2, '0')}
                                    </div>
                                    <div className="w-48 aspect-[7/5] bg-gray-100 overflow-hidden flex-shrink-0 ml-auto flex items-center justify-center">
                                        <div className="text-gray-400 text-xs font-[family-name:var(--font-diatype-mono)]">
                                            COMING SOON
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-grow flex flex-col items-start gap-6">
                                    <div className="flex-grow flex flex-col mt-0">
                                        <div className="flex flex-col">
                                            <div className="flex items-center">
                                                <h3 className="text-xl font-medium line-clamp-1 font-[family-name:var(--font-fragment-sans)] text-gray-500">{project.name}</h3>
                                            </div>
                                            <p className="text-gray-400 mt-1">{project.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Link href={getProjectUrl(project.id)} className="group">
                                <div className="flex flex-col w-full items-start transition-all duration-300">
                                    <div className="flex justify-between items-center mb-4 w-full">
                                        <div className="font-[family-name:var(--font-semi-diatype)] text-7xl text-left">
                                            {String(project.id).padStart(2, '0')}
                                        </div>
                                        <div className="w-48 aspect-[7/5] bg-gray-100 overflow-hidden flex-shrink-0 ml-auto">
                                            {project.photos.length > 0 && (
                                                <div className="relative w-full h-full">
                                                    <Image 
                                                        src={project.photos[0]} 
                                                        alt={project.name} 
                                                        fill
                                                        sizes="(max-width: 768px) 25vw, 50vw"
                                                        className="object-contain"
                                                        priority
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex-grow flex flex-col items-start gap-6">
                                        <div className="flex-grow flex flex-col mt-0">
                                            <div className="flex flex-col">
                                                <h3 className="text-xl font-medium line-clamp-1 font-[family-name:var(--font-fragment-sans)] group-hover:underline">{project.name}</h3>
                                                <p className="text-gray-600 mt-1">{project.description}</p>
                                            </div>
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

    return (
        <>
            {renderDesktopLayout()}
            {renderMobileLayout()}
        </>
    );
};

export default ProjectList;
