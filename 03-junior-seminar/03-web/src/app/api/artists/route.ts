import { promises as fs } from 'fs';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';
import { NextResponse } from 'next/server';

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
    
    // Ensure consistent statement number format - pad to 2 digits if needed
    let formattedNumber = number.trim();
    // If it's a plain number (no leading zeros), pad it to maintain consistency
    if (/^\d$/.test(formattedNumber)) {
      formattedNumber = formattedNumber.padStart(2, '0');
    }
    
    statements.push({
      number: formattedNumber,
      content: processedContent.toString(),
      isComplete
    });
  }
  
  return statements;
}

export async function GET() {
  try {
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
    
    return NextResponse.json({ artistsData, artistNames });
  } catch (error) {
    console.error('Error processing artist data:', error);
    return NextResponse.json(
      { error: 'Failed to process artist data' },
      { status: 500 }
    );
  }
}