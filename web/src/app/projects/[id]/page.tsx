import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Markdown from 'markdown-to-jsx';
import { Project } from '../../data/projects';
import { projects as productProjects } from '../../data/product/projects';
import { InlineCode } from '@/app/components/CodeBlock';
import Link from 'next/link';
import ZoomableImage from '@/app/components/ZoomableImage';
import ClientTOC from '@/app/components/ClientTOC';
import ProgressWrapper from '@/app/components/ProgressWrapper';
import VimeoWrapper from '@/app/components/VimeoWrapper';
import ProjectMetadata from '@/app/components/ProjectMetadata';

// Custom Markdown components
const MarkdownImage = ({ alt, src }: { alt?: string; src?: string }) => {
  if (!src) return null;
  
  // If the source is a relative path (starting with /), prefix it with /studies
  const imageSrc = src.startsWith('/') ? `/studies${src}` : src;
  
  return (
    <ZoomableImage
      src={imageSrc}
      alt={alt || ''}
    />
  );
};


interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

// Get project data by ID from product projects
async function getProjectById(id: string): Promise<Project | undefined> {
  return productProjects.find(project => project.id.toString() === id);
}

// Function to get the markdown content
async function getProjectContent(id: string) {
  // Projects are stored in folders named "01", "02", etc. (with leading zero)
  const paddedId = id.padStart(2, '0');
  
  // Try first from product folder
  const productPath = path.join(process.cwd(), 'src/app/data/product/projects', paddedId, 'study.md');
  
  try {
    console.log(`Attempting to read file at: ${productPath}`);
    const fileContent = fs.readFileSync(productPath, 'utf8');
    const { content, data } = matter(fileContent);
    return { content, frontmatter: data, source: 'product' };
  } catch (error) {
    // If file not found, try the legacy path
    try {
      const legacyPath = path.join(process.cwd(), 'src/app/data/projects', paddedId, 'study.md');
      console.log(`Attempting to read file at legacy path: ${legacyPath}`);
      const fileContent = fs.readFileSync(legacyPath, 'utf8');
      const { content, data } = matter(fileContent);
      return { content, frontmatter: data, source: 'legacy' };
    } catch (legacyError) {
      console.error(`Error reading project file: ${error}`);
      console.error(`Error reading legacy project file: ${legacyError}`);
      return null;
    }
  }
}

export async function generateStaticParams() {
  return productProjects.map(project => ({
    id: project.id.toString(),
  }));
}

export async function generateMetadata(props: ProjectPageProps) {
  // Await params before accessing properties
  const params = await props.params;
  const id = params.id;
  
  const project = await getProjectById(id);
  
  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }
  
  return {
    title: `${project.name} | Kris Aziabor`,
    description: project.description,
    openGraph: {
      title: `${project.name} | Kris Aziabor`,
      description: project.description,
      images: "/preview.jpg",
    },
  };
}

import ProjectContentWrapper from '@/app/components/ProjectContentWrapper';

export default async function ProjectPage(props: ProjectPageProps) {
  // Await params before accessing properties
  const params = await props.params;
  const id = params.id;
  
  const project = await getProjectById(id);
  const projectData = await getProjectContent(id);
  
  // Check if project doesn't exist or is marked as coming soon
  if (!project || project.comingSoon || !projectData) {
    notFound();
  }
  
  console.log("Project data loaded:", !!projectData);
  
  const content = (
      <div className="relative min-h-screen">
        {/* Progress Bar */}
        <ProgressWrapper />
        
        {/* Back button on the far left - sticky */}
        <div className="fixed left-8 top-24 hidden lg:block z-10">
          <Link 
            href="/" 
            className="text-gray-400 hover:text-gray-700 transition-colors duration-200 flex items-center group"
          >
            <span className="text-xl inline-block transform group-hover:-translate-x-1 transition-transform duration-200 font-[family-name:var(--font-diatype-mono)]">←</span>
          </Link>
        </div>
        
        {/* Table of Contents */}
        <ClientTOC projectId={project.id} />
        
        {/* Main content with left-aligned text */}
        <div className="container mx-auto px-4 py-8 md:py-16 max-w-3xl lg:pl-24">
          {/* Mobile back button (only visible on small/medium screens) */}
          <div className="mb-6 lg:hidden">
            <Link 
              href="/" 
              className="text-gray-500 hover:text-gray-700 transition-colors duration-200 flex items-center group"
            >
              <span className="inline-block transform group-hover:-translate-x-1 transition-transform duration-200 font-[family-name:var(--font-diatype-mono)]">←</span>
            </Link>
          </div>
          
          {/* Display date for product projects if available */}
          {projectData.source === 'product' && projectData.frontmatter && projectData.frontmatter.date && (
            <div className="mb-2 font-[family-name:var(--font-diatype-mono)] tracking-widest text-xs uppercase text-gray-600 font-medium">
              {(projectData.frontmatter.date as string).toUpperCase()}
            </div>
          )}
          
          <h1 className="text-4xl md:text-5xl font-[family-name:var(--font-glare)] mb-6">
            {project.name}
          </h1>
          
          {/* Display metadata only for product projects */}
          {projectData.source === 'product' && projectData.frontmatter && (
            <ProjectMetadata metadata={projectData.frontmatter} showDate={true} />
          )}
        
        <div className="prose prose-lg max-w-none">
          <Markdown
            options={{
              overrides: {
                img: {
                  component: MarkdownImage,
                },
                pre: {
                  props: {
                    className: 'bg-gray-50 p-4 rounded-lg overflow-auto',
                  },
                },
                code: {
                  component: InlineCode,
                },
                VimeoPlayer: {
                  component: ({ id }: { id: string }) => (
                    <VimeoWrapper vimeoId={id} />
                  ),
                },
                p: {
                  props: {
                    className: 'my-4 font-[family-name:var(--font-fragment-sans)]',
                  },
                },
                h2: {
                  component: ({ children, ...props }) => {
                    // Convert heading text to ID (slugify)
                    const id = children?.toString()
                      .toLowerCase()
                      .replace(/\s+/g, '-') // Replace spaces with -
                      .replace(/[^\w-]+/g, '') // Remove all non-word chars
                      .replace(/--+/g, '-') // Replace multiple - with single -
                      .replace(/^-+/, '') // Trim - from start of text
                      .replace(/-+$/, '') || ''; // Trim - from end of text
                    
                    return (
                      <h2 
                        id={id}
                        className="text-2xl mt-8 mb-4 font-[family-name:var(--font-glare)] scroll-mt-24"
                        {...props}
                      >
                        {children}
                      </h2>
                    );
                  },
                  props: {
                    className: 'text-2xl mt-8 mb-4 font-[family-name:var(--font-glare)]',
                  },
                },
                h3: {
                  component: ({ children, ...props }) => {
                    const id = children?.toString()
                      .toLowerCase()
                      .replace(/\s+/g, '-')
                      .replace(/[^\w-]+/g, '')
                      .replace(/--+/g, '-')
                      .replace(/^-+/, '')
                      .replace(/-+$/, '') || '';
                    
                    return (
                      <h3 
                        id={id}
                        className="text-xl mt-6 mb-3 font-[family-name:var(--font-glare)] scroll-mt-24"
                        {...props}
                      >
                        {children}
                      </h3>
                    );
                  },
                  props: {
                    className: 'text-xl mt-6 mb-3 font-[family-name:var(--font-glare)]',
                  },
                },
                h4: {
                  component: ({ children, ...props }) => {
                    const id = children?.toString()
                      .toLowerCase()
                      .replace(/\s+/g, '-')
                      .replace(/[^\w-]+/g, '')
                      .replace(/--+/g, '-')
                      .replace(/^-+/, '')
                      .replace(/-+$/, '') || '';
                    
                    return (
                      <h4 
                        id={id}
                        className="text-lg mt-5 mb-2 font-[family-name:var(--font-glare)] scroll-mt-24"
                        {...props}
                      >
                        {children}
                      </h4>
                    );
                  },
                  props: {
                    className: 'text-lg mt-5 mb-2 font-[family-name:var(--font-glare)]',
                  },
                },
                h5: {
                  component: ({ children, ...props }) => {
                    const id = children?.toString()
                      .toLowerCase()
                      .replace(/\s+/g, '-')
                      .replace(/[^\w-]+/g, '')
                      .replace(/--+/g, '-')
                      .replace(/^-+/, '')
                      .replace(/-+$/, '') || '';
                    
                    return (
                      <h5 
                        id={id}
                        className="text-base mt-4 mb-2 font-[family-name:var(--font-glare)] scroll-mt-24"
                        {...props}
                      >
                        {children}
                      </h5>
                    );
                  },
                  props: {
                    className: 'text-base mt-4 mb-2 font-[family-name:var(--font-glare)]',
                  },
                },
                a: {
                  props: {
                    className: 'font-[family-name:var(--font-fragment-sans)] text-blue-600 hover:underline',
                    target: '_blank',
                    rel: 'noopener noreferrer',
                  },
                },
              },
            }}
          >
            {projectData.content}
          </Markdown>
        </div>
        </div>
      </div>
  );
  
  // Wrap content with the password protection component
  return (
    <ProjectContentWrapper project={project}>
      {content}
    </ProjectContentWrapper>
  );
}