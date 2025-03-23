// components/CodeBlock.tsx
import React from 'react';
import { GeistMono } from 'geist/font/mono';
import { Highlight, themes } from 'prism-react-renderer';

interface CodeBlockProps {
  className?: string;
  children: React.ReactNode;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ className, children }) => {
  // Extract language from className (e.g., "language-javascript" -> "javascript")
  const language = className ? className.replace('language-', '') : '';
  
  // Get the code as string from children
  const code = children?.toString().trim() || '';
  
  return (
    <div className="relative my-6 overflow-hidden rounded-lg">
      {/* Language badge */}
      {language && (
        <div className="absolute right-3 top-3 z-10 rounded-md bg-gray-800 px-2 py-1 text-xs text-gray-300">
          {language}
        </div>
      )}
      
      {/* Code block with syntax highlighting */}
      <Highlight 
        theme={themes.vsDark} 
        code={code} 
        language={language || 'text'}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre 
            className={`${GeistMono.className} ${className} p-4 text-sm overflow-x-auto`}
            style={{ ...style, background: '#121212' }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                <span className="inline-block w-8 mr-4 text-right text-gray-500 select-none opacity-50">
                  {i + 1}
                </span>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
};

// For inline code styling
const InlineCode: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <code className={`${GeistMono.className} bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono`}>
    {children}
  </code>
);

export { CodeBlock, InlineCode };