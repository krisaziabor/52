import { promises as fs } from 'fs';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';
import ArtistStatements from '../components/ArtistStatements';

interface ArtistStatement {
  number: string;
  content: string;
  isComplete: boolean;
}

// Parse the Markdown content to extract statements
async function parseArtistMarkdown(fileContent: string): Promise<ArtistStatement[]> {
  const statements: ArtistStatement[] = [];
  const sections = fileContent.split(/^## /gm).slice(1); // Skip the title section
  
  for (const section of sections) {
    const [number, ...contentParts] = section.split('\n');
    const content = contentParts.join('\n').trim();
    const isComplete = content !== 'N/A';
    
    const processedContent = await remark()
      .use(html)
      .process(content);
    
    statements.push({
      number: number.trim(),
      content: processedContent.toString(),
      isComplete
    });
  }
  
  return statements;
}

export default async function EdgewoodPage() {
  // Get all artist files from the data directory
  const dataDirectory = path.join(process.cwd(), 'src/app/data');
  const filenames = await fs.readdir(dataDirectory);
  
  // Process all the artists and their statements
  const artistsData: Record<string, ArtistStatement[]> = {};
  
  for (const filename of filenames) {
    if (filename.endsWith('.md')) {
      const artistName = filename.replace('.md', '');
      const filePath = path.join(dataDirectory, filename);
      const fileContent = await fs.readFile(filePath, 'utf8');
      const statements = await parseArtistMarkdown(fileContent);
      artistsData[artistName] = statements;
    }
  }
  
  // Get artist names and sort them
  const artistNames = Object.keys(artistsData).sort();
  
  return (
    <div className="grid grid-rows-[20px_1fr_20px] min-h-screen p-4 pb-20 gap-6 sm:p-10 bg-white">
      <main className="row-start-2 flex">
        <div className="w-2/5 hidden sm:block overflow-hidden">
          <div>
            <ul className="font-[family-name:var(--font-elle-two)] text-6xl space-y-0 leading-none">
              {artistNames.map((name, index) => (
                <li 
                  key={index} 
                  data-artist-name={name}
                  className="cursor-pointer transition-all duration-200 group -mt-2 opacity-30 hover:opacity-[initial]"
                  data-active="false"
                >
                  <span className="block lowercase group-hover:text-7xl transition-all duration-200">{name}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-32 mb-1">
              {/* <div className="flex justify-between items-center mb-4">
                <button 
                  id="autoplay-toggle" 
                  className="font-[family-name:var(--font-elle-two)] text-sm uppercase tracking-wide text-gray-700 cursor-pointer hover:text-black transition-colors duration-200"
                >
                  AUTOPLAY OFF
                </button>
              </div> */}
              <h2 
                className="font-[family-name:var(--font-elle-two)] text-2xl uppercase tracking-wide text-gray-700 cursor-pointer hover:text-black transition-colors duration-200" 
                id="title-reset"
              >
                No Idea If This Is Good Or Not
              </h2>
            </div>
          </div>
        </div>
        
        <div className="w-full sm:w-3/5">
          <ArtistStatements artistNames={artistNames} artistsData={artistsData} />
        </div>
      </main>
    </div>
  );
}