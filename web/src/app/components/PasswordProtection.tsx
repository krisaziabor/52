'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface PasswordProtectionProps {
  projectId: number;
  projectName: string;
}

const PasswordProtection: React.FC<PasswordProtectionProps> = ({ projectId, projectName }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  // Check if already authorized from localStorage
  useEffect(() => {
    const storedAuth = localStorage.getItem(`project_auth_${projectId}`);
    if (storedAuth === 'true') {
      setAuthorized(true);
    }
  }, [projectId]);

  // If already authorized, continue to content
  useEffect(() => {
    if (authorized) {
      router.refresh();
    }
  }, [authorized, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // For Fidelity case study (project ID 1), the password is "fidelity2024"
    const correctPassword = 'SakaGauff4!';
    
    if (password === correctPassword) {
      localStorage.setItem(`project_auth_${projectId}`, 'true');
      setAuthorized(true);
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  if (authorized) {
    return null; // Don't render anything if authorized
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link 
            href="/" 
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200 flex items-center group justify-center mb-6"
          >
            <span className="inline-block mr-2 transform group-hover:-translate-x-1 transition-transform duration-200 font-[family-name:var(--font-diatype-mono)]">←</span>
            <span className="font-[family-name:var(--font-glare)]">Back to projects</span>
          </Link>
          
          <h1 className="text-3xl font-[family-name:var(--font-glare)] mb-2">
            {projectName}
          </h1>
          <p className="text-gray-600 font-[family-name:var(--font-fragment-sans)]">
            This case study is protected by NDA. Please enter the password to view.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-[family-name:var(--font-diatype-mono)] text-gray-700 mb-1">
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 font-[family-name:var(--font-fragment-sans)]"
              placeholder="Enter password"
              required
            />
            {error && <p className="mt-2 text-red-500 text-sm font-[family-name:var(--font-fragment-sans)]">{error}</p>}
          </div>
          
          <button
            type="submit"
            className="w-full bg-black text-white py-2 px-4 font-[family-name:var(--font-diatype-mono)] hover:bg-gray-800 transition-colors"
          >
            ACCESS CASE STUDY
          </button>
        </form>
        
        <div className="mt-8 text-sm text-gray-500 font-[family-name:var(--font-fragment-sans)]">
          <p>If you need the password, please contact me directly.</p>
        </div>
      </div>
    </div>
  );
};

export default PasswordProtection;