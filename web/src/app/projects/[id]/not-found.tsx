import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center font-[family-name:var(--font-fragment-sans)]">
      <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
      <p className="mb-8">Sorry, the project you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/">
        <a className="text-blue-500 hover:text-blue-700 transition-colors duration-200">
          ← Back to projects
        </a>
      </Link>
    </div>
  );
}
