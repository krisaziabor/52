import { Project } from "../data/projects";

interface ProjectListProps {
    projects: Project[];
}

const ProjectList = ({ projects }: ProjectListProps) => {
    // Format current date as "Month Day, Year"
    const lastUpdated = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Sort projects in descending order of id
    const sortedProjects = [...projects].sort((a, b) => b.id - a.id);

    return (
        <div className="w-full">
            {/* Last updated timestamp */}
            <div className="mb-4">
                <div className="text-sm text-gray-500 mb-4">Last updated: {lastUpdated}</div>
                <div className="border-t border-gray-200 mb-6"></div>
            </div>
            
            {sortedProjects.map((project, index) => (
                <div key={project.id}>
                    {index > 0 && <div className="border-t border-gray-200 my-6"></div>}
                    <div className="flex w-full gap-12 items-start">
                        <div className="font-[family-name:var(--font-semi-diatype)] text-9xl min-w-24">
                            {String(project.id).padStart(2, '0')}
                        </div>
                        <div className="flex-grow flex justify-end items-start gap-8">
                            <div className="w-1/3 flex-shrink-0">
                                <h3 className="text-xl font-medium line-clamp-1 font-[family-name:var(--font-glare)]">{project.name}</h3>
                                <p className="text-zinc-600 mt-1">{project.description}</p>
                            </div>
                            <div className="w-64 h-32 bg-gray-100 overflow-hidden flex-shrink-0">
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
                </div>
            ))}
        </div>
    );
};

export default ProjectList;
