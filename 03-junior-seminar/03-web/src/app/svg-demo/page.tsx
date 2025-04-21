'use client';

import { useState } from 'react';
import SVGTimeline from '../components/SVGTimeline';

export default function SVGTimelineDemoPage() {
  const [activeStatement, setActiveStatement] = useState('');

  const handleStatementSelect = (statementNumber: string) => {
    setActiveStatement(statementNumber);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">SVG Timeline Demo</h1>
      <div className="w-full max-w-lg">
        <SVGTimeline 
          onStatementSelect={handleStatementSelect}
          activeStatement={activeStatement}
          availableStatements={['01', '02', '03', '04', '05', '06', '07', '08', '09']}
        />
      </div>
    </div>
  );
}