'use client';

import { useState } from 'react';
import SVGTimeline from './SVGTimeline';

// Demo statements for the SVG timeline
const demoStatements = [
  {
    number: "01",
    content: "<p>This is statement 1. It represents the first filled shape in the SVG.</p>"
  },
  {
    number: "02",
    content: "<p>This is statement 2. It represents the second filled shape in the SVG.</p>"
  },
  {
    number: "03",
    content: "<p>This is statement 3. It represents the third filled shape in the SVG.</p>"
  },
  {
    number: "04",
    content: "<p>This is statement 4. It represents the fourth filled shape in the SVG.</p>"
  },
  {
    number: "05",
    content: "<p>This is statement 5. It represents the fifth filled shape in the SVG.</p>"
  },
  {
    number: "06",
    content: "<p>This is statement 6. It represents the sixth filled shape in the SVG.</p>"
  },
  {
    number: "07",
    content: "<p>This is statement 7. It represents the seventh filled shape in the SVG.</p>"
  },
  {
    number: "08",
    content: "<p>This is statement 8. It represents the eighth filled shape in the SVG.</p>"
  },
  {
    number: "09",
    content: "<p>This is statement 9. It represents the ninth filled shape in the SVG.</p>"
  }
];

export default function SVGTimelineDemo() {
  const [activeStatement, setActiveStatement] = useState<string>('');

  const handleStatementSelect = (statementNumber: string) => {
    setActiveStatement(statementNumber);
  };

  // Find the active statement content
  const activeStatementContent = demoStatements.find(
    s => s.number === activeStatement
  )?.content || '';

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">SVG Timeline Demo</h1>
      <p className="mb-6">
        This demo shows how the SVG timeline works. By default, the filled shapes are transparent with only the outline visible.
      </p>
      <ul className="list-disc ml-6 mb-6">
        <li>When you <strong>hover over</strong> a shape in the SVG, it will fill with dark gray.</li>
        <li>When you <strong>click</strong> a shape, it will fill with black and show the corresponding statement.</li>
        <li>You can also hover over or click the statement numbers on the right to highlight the corresponding shape.</li>
        <li>A number appears inside each section when hovered or active, to make the connection more clear.</li>
      </ul>
      
      <div className="mb-10">
        <SVGTimeline 
          onStatementSelect={handleStatementSelect}
          activeStatement={activeStatement}
        />
      </div>
      
      {activeStatement ? (
        <div className="prose max-w-none font-[family-name:var(--font-centaur)] text-xl border-t pt-4">
          <h2 className="text-2xl mb-2">Statement {parseInt(activeStatement)}</h2>
          <div dangerouslySetInnerHTML={{ __html: activeStatementContent }} />
        </div>
      ) : (
        <div className="prose max-w-none font-[family-name:var(--font-centaur)] text-xl border-t pt-4">
          <p>Select a section from the SVG or a statement number to view its content.</p>
        </div>
      )}
    </div>
  );
}