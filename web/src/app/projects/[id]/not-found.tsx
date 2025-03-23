export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
      <p className="mb-8">Sorry, the project you're looking for doesn't exist.</p>
      <a href="/" className="text-blue-500 hover:text-blue-700 transition-colors duration-200">
        ← Back to projects
      </a>
    </div>
  );
}
