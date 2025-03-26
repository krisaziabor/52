import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 font-[family-name:var(--font-glare)]">
        Project Not Found
      </h1>
      <p className="text-lg mb-8 text-gray-600 max-w-md">
        This project may be coming soon or doesn't exist.
      </p>
      <Link 
        href="/52" 
        className="font-medium text-blue-600 hover:text-blue-800 transition-colors flex items-center"
      >
        <span className="mr-2">←</span> Back to 52 projects
      </Link>
    </div>
  );
}