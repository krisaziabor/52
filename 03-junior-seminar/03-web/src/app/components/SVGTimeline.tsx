'use client';

import { useState } from 'react';

interface SVGTimelineProps {
  onStatementSelect: (statementNumber: string) => void;
  activeStatement: string;
  availableStatements?: string[]; // Array of statement numbers that are available
}

export default function SVGTimeline({ onStatementSelect, activeStatement, availableStatements = [] }: SVGTimelineProps) {
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);
  
  // Define our 9 clickable sections in the SVG with their IDs - updated for v4 SVG
  const sections = [
    { id: "section1", statementNumber: "01", path: "M751.521 312.68L722.021 304.9C722.021 304.9 713.701 330.48 747.941 343.2C747.941 343.2 719.081 340.26 709.801 374.02L783.661 387.22L790.501 354.94C790.501 354.94 821.321 361.3 816.421 394.56C816.421 394.56 827.161 360.04 855.781 367.76L862.041 369.54" },
    { id: "section2", statementNumber: "02", path: "M558.84 343L783 387V392.5L557.5 350.5L558.84 343Z" },
    { id: "section3", statementNumber: "03", path: "M811.871 749.91L793 746.5L835 540L853 437L860.5 385.5L863 359.5L863.5 333L876.5 320L880.5 320.5L880 347L877 374L870.5 428L854 535.5L811.871 749.91Z" },
    { id: "section4", statementNumber: "04", path: "M793.629 747.09L811.5 750.5L758 995L701.5 1238L694.5 1263L684.5 1238L793.629 747.09Z" },
    { id: "section5", statementNumber: "05", path: "M465.5 744L515 753.5L504 808L455 796.5L465.5 744Z" },
    { id: "section6", statementNumber: "06", path: "M494.179 1054.34L498.419 1027.4L467.839 1022.54L462.699 1047.38L494.179 1054.34Z" },
    { id: "section7", statementNumber: "07", path: "M484.759 1136.46L467.239 1132.46L462.699 1153.96L480.559 1158.08" },
    { id: "section8", statementNumber: "08", path: "M464.5 1211L600 1235.5L595.5 1256.5L460.5 1229.5L464.5 1211Z" },
    { id: "section9", statementNumber: "09", path: "M694.339 1268.16L682.279 1271.28L674.339 1315.18C674.339 1315.18 636.799 1304.6 640.499 1260.18C640.499 1260.18 637.159 1301.14 588.699 1298.06L598.679 1250.04" },
  ];

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Numbered circles 1-9 at the top */}
      <div className="flex justify-center gap-4 mb-4">
        {sections.map((section, index) => {
          const isAvailable = availableStatements.includes(section.statementNumber);
          
          return (
            <button
              key={section.id}
              className={`
                w-10 h-10 rounded-full inline-flex items-center justify-center
                font-[family-name:var(--font-centaur)] text-lg leading-none
                border-2 transition-all duration-200
                pt-0.5 text-center
                ${activeStatement === section.statementNumber ? 
                  'bg-black text-white border-black' : 
                  isAvailable ? 'border-gray-300 hover:bg-gray-100' : 'border-gray-200 text-gray-300 cursor-not-allowed'}
              `}
              onMouseEnter={() => {
                if (isAvailable) {
                  setHoveredElement(section.id);
                }
              }}
              onMouseLeave={() => {
                if (isAvailable) {
                  setHoveredElement(null);
                }
              }}
              onClick={() => {
                if (isAvailable) {
                  onStatementSelect(section.statementNumber);
                }
              }}
              disabled={!isAvailable}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
      
      {/* SVG Timeline - larger */}
      <div className="relative w-full">
        <svg 
          width="100%" 
          height="auto" 
          viewBox="0 0 1224 1584" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="max-w-full"
        >
          {/* Base SVG - all non-interactive elements - updated for v4 */}
          <path d="M876.28 319.36L881.04 319.98C881.04 503.7 694.44 1265.68 694.44 1265.68L694 1264.42L683.74 1237.8C683.74 1237.8 871.1 434.86 862.92 332.5L876.26 319.38H876.28V319.36Z" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10"/>
          <path d="M812 750C793.409 745.939 793 746 793 746" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10"/>
          <path d="M874.901 312.68V317.68L847.82 330.22L751.521 312.68L734.98 285.1L736.98 279.58L874.901 312.68Z" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10"/>
          <path d="M410.881 1028L389.341 1024.04L364.301 1212.98L384.521 1215.18L410.881 1028Z" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10"/>
          <path d="M368.8 1213.48L345.74 1326.56L438.46 1344.26L461.18 1230.64L596 1257.5L601 1235L446.4 1206.78L460.6 1134.56L441.14 1128.88L579.12 430.74" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10"/>
          <path d="M465.58 743.8L515.26 753.88L520.4 754.58" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10"/>
          <path d="M454.961 796.9L504.541 808.06" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10"/>
          <path d="M709.799 374L532.599 337.96C532.599 337.96 381.399 972.36 397.979 1024.02" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10"/>
          <path d="M464.74 1009.42H470.46L574.74 477.22" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10"/>
          <path d="M456.061 1157.66L479.661 1162.74L506.901 1022.54L463.641 1015.04" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10"/>
          <path d="M494 1088.9H486.92L492.06 1059.18L461.48 1054.34L448.16 1123.68L485.92 1130.5" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10"/>
          <path d="M441.139 1128.88L397.979 1119.6C397.579 1059.18 530.719 427.14 530.719 427.14L578.179 435.46" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10"/>
          <path d="M783.639 387.22L782.779 392.54L720.959 380.52L716.999 407.6L708.419 405.52L713.499 379.06L557.299 350L556.599 349.88L551.399 374.06L543.859 372.24L548.899 347.06L535.979 344.54C535.979 344.54 500.919 481.06 499.019 495.84C497.119 510.62 402.139 939.92 400.699 1004.86C400.699 1004.86 400.819 1009.54 401.999 1026.34" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10"/>
          <path d="M556.6 349.88L558.02 343.5" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10"/>

          {/* Interactive sections - will highlight on hover/active */}
          {sections.map((section) => {
            const isActive = activeStatement === section.statementNumber;
            const isHovered = hoveredElement === section.id;
            const isAvailable = availableStatements.includes(section.statementNumber);
            
            // Create a highlight effect with a slightly larger path for better visibility
            return (
              <g key={section.id}>
                {/* Highlight effect when active or hovered */}
                {(isActive || isHovered) && isAvailable && (
                  <path
                    d={section.path}
                    fill="none"
                    stroke={isActive ? "#B1DCFD" : "#D1EAFF"}
                    strokeWidth="5"
                    strokeMiterlimit="10"
                    className="animate-pulse"
                  />
                )}
                {/* The actual interactive path */}
                <path
                  d={section.path}
                  fill={
                    !isAvailable ? "#E5E5E5" : // Grey fill for unavailable statements
                    isActive ? "#000000" : 
                    isHovered ? "#4A4A4A" : 
                    "transparent"
                  }
                  stroke={isAvailable ? "#231F20" : "#BDBDBD"} // Lighter stroke for unavailable statements
                  strokeWidth="2"
                  strokeMiterlimit="10"
                  className={`transition-colors duration-200 ${isAvailable ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                  onMouseEnter={() => {
                    if (isAvailable) {
                      setHoveredElement(section.id);
                    }
                  }}
                  onMouseLeave={() => {
                    if (isAvailable) {
                      setHoveredElement(null);
                    }
                  }}
                  onClick={() => {
                    if (isAvailable) {
                      onStatementSelect(section.statementNumber);
                    }
                  }}
                />
                
                {/* No labels on hover - removed as requested */}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}