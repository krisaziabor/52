import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Markdown from 'markdown-to-jsx';
import { Project, projects } from '../../data/projects';
import { InlineCode } from '@/app/components/CodeBlock';
import Link from 'next/link';
import ZoomableImage from '@/app/components/ZoomableImage';
import ClientTOC from '@/app/components/ClientTOC';

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
  params: Promise<{ id: string }> | { id: string };
}

// Get project data by ID
async function getProjectById(id: string | Promise<string>): Promise<Project | undefined> {
  const resolvedId = await Promise.resolve(id);
  return projects.find(project => project.id.toString() === resolvedId);
}

// Function to get the markdown content
async function getProjectContent(id: string) {
  // Projects are stored in folders named "01", "02", etc. (with leading zero)
  const resolvedID = await Promise.resolve(id);
  const paddedId = resolvedID.padStart(2, '0');
  const filePath = path.join(process.cwd(), 'src/app/data/projects', paddedId, 'study.md');
  
  try {
    console.log(`Attempting to read file at: ${filePath}`);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { content, data } = matter(fileContent);
    return { content, frontmatter: data };
  } catch (error) {
    console.error(`Error reading project file: ${error}`);
    return null;
  }
}

export async function generateStaticParams() {
  return projects.map(project => ({
    id: project.id.toString(),
  }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  // Resolve params before using
  
  const resolvedParams = await Promise.resolve(params);
  const id = typeof resolvedParams.id === 'string' ? resolvedParams.id : await resolvedParams.id;
  
  const project = await getProjectById(id);
  
  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }
  
  return {
    title: `${project.name} | 52 by KAKA`,
    description: project.description,
    openGraph: {
      title: `${project.name} | 52 by KAKA`,
      description: project.description,
      images: "/preview.jpg",
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  // Ensure params is fully resolved before using
  const resolvedParams = await Promise.resolve(params);
  const id = typeof resolvedParams.id === 'string' ? resolvedParams.id : await resolvedParams.id;


  const projectData = await getProjectContent(id);
  const project = await getProjectById(id);
  
  // Check if project doesn't exist or is marked as coming soon
  if (!project || project.comingSoon || !projectData) {
    notFound();
  }
  
  console.log("Project data loaded:", !!projectData);
  
  return (
    <div className="relative min-h-screen">
      {/* Back button on the far left - sticky */}
      <div className="fixed left-8 top-24 hidden lg:block z-10">
        <Link 
          href="/" 
          className="text-gray-400 hover:text-gray-700 transition-colors duration-200 flex items-center group"
        >
          <span className="text-xl inline-block mr-2 transform group-hover:-translate-x-1 transition-transform duration-200 font-[family-name:var(--font-diatype-mono)]">←</span>
          <span className="font-[family-name:var(--font-glare)] text-sm">
            {parseInt(project.id.toString()) < 10 ? `0${project.id}` : project.id}
          </span>
        </Link>
      </div>
      
      {/* Table of Contents */}
      <ClientTOC projectId={project.id} />
      
      {/* Main content with left-aligned text */}
      <div className="container mx-auto px-4 py-8 md:py-16 max-w-3xl">
        {/* Mobile back button (only visible on small/medium screens) */}
        <div className="mb-6 lg:hidden">
          <Link 
            href="/" 
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200 flex items-center group"
          >
            <span className="inline-block mr-2 transform group-hover:-translate-x-1 transition-transform duration-200 font-[family-name:var(--font-diatype-mono)]">←</span>
            <span className="font-[family-name:var(--font-glare)]">
              {parseInt(project.id.toString()) < 10 ? `0${project.id}` : project.id}
            </span>
          </Link>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-[family-name:var(--font-glare)] mb-8">
          {project.name}
        </h1>
      
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
}