'use client';

import dynamic from 'next/dynamic';

// Import TableOfContents with dynamic import on client side
const TableOfContents = dynamic(() => import('./TableOfContents'), { ssr: false });

interface ClientTOCProps {
  projectId: string | number;
}

export default function ClientTOC({ projectId }: ClientTOCProps) {
  return <TableOfContents projectId={projectId} />;
}