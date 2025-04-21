"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import SVGTimeline from "./SVGTimeline";

interface ArtistStatement {
  number: string;
  content: string;
  isComplete: boolean;
}

interface ArtistStatementsProps {
  artistNames: string[];
  artistsData: Record<string, ArtistStatement[]>;
}

export default function ArtistStatements({
  artistNames,
  artistsData,
}: ArtistStatementsProps) {
  const [activeArtist, setActiveArtist] = useState<string>("");
  const [activeStatement, setActiveStatement] = useState<string>("");
  const [autoplayActive, setAutoplayActive] = useState<boolean>(false);

  // Use a ref instead of state for the timer to avoid re-renders
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Track selected artist in mobile view
  const [mobileSelected, setMobileSelected] = useState<boolean>(false);

  // Use a flag to track if we've started autoplay for the current artist/statement
  const [hasStartedAutoplay, setHasStartedAutoplay] = useState<boolean>(false);

  // Find the selected artist's statements
  const activeArtistStatements = useMemo(
    () => artistsData[activeArtist] || [],
    [artistsData, activeArtist]
  );

  // Find the active statement content
  const activeStatementContent =
    activeArtistStatements.find((s) => s.number === activeStatement)?.content ||
    "";

  // Calculate reading time for a statement
  const calculateReadingTime = useCallback((content: string): number => {
    // Strip HTML tags to get just the text
    const plainText = content.replace(/<[^>]*>/g, "");

    // Count words (average reading speed is ~200-250 words per minute)
    const wordCount = plainText.split(/\s+/).length;

    // Calculate reading time in milliseconds (using 200 words per minute)
    // Add a 3 second minimum and 5 second buffer for transitions
    const readingTimeMs = Math.max(3000, (wordCount / 200) * 60 * 1000) + 5000;

    return readingTimeMs;
  }, []);

  // Advance to the next statement or artist
  const advanceAutoplay = useCallback(() => {
    if (!autoplayActive) return;

    // Clear any existing timers to prevent stacking
    if (autoplayTimerRef.current) {
      clearTimeout(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }

    // Reset autoplay flag to allow new scheduling
    setHasStartedAutoplay(false);

    let nextArtistIndex = 0;

    if (activeArtist) {
      const currentArtistIndex = artistNames.indexOf(activeArtist);
      const availableStatements =
        artistsData[activeArtist]?.filter((s) => s.isComplete) || [];

      // If no statement is active, select the first one
      if (!activeStatement && availableStatements.length > 0) {
        setActiveStatement(availableStatements[0].number);
        return; // Let the useEffect handle timing
      }

      // Find the current statement index
      const currentStatementIndex = availableStatements.findIndex(
        (s) => s.number === activeStatement
      );

      // Move to the next statement if available
      if (
        currentStatementIndex >= 0 &&
        currentStatementIndex < availableStatements.length - 1
      ) {
        const nextStatement =
          availableStatements[currentStatementIndex + 1].number;

        // Only set if it's different to avoid unnecessary re-renders
        if (nextStatement !== activeStatement) {
          setActiveStatement(nextStatement);
          return; // Let the useEffect handle timing
        }
      }

      // Move to the next artist
      nextArtistIndex = (currentArtistIndex + 1) % artistNames.length;
    } else if (artistNames.length > 0) {
      // Start with the first artist if none is selected
      nextArtistIndex = 0;
    } else {
      // No artists available
      return;
    }

    // Select the next artist
    const nextArtist = artistNames[nextArtistIndex];

    // Only set if it's different to avoid unnecessary re-renders
    if (nextArtist !== activeArtist) {
      setActiveArtist(nextArtist);
      setActiveStatement(""); // Reset statement when changing artists
    }
  }, [
    activeArtist,
    activeStatement,
    autoplayActive,
    artistNames,
    artistsData,
    setHasStartedAutoplay,
  ]);

  // Handle autoplay functionality
  const handleAutoplay = useCallback(() => {
    if (autoplayActive) {
      // Stop autoplay
      if (autoplayTimerRef.current) {
        clearTimeout(autoplayTimerRef.current);
        autoplayTimerRef.current = null;
      }
      setAutoplayActive(false);
      setHasStartedAutoplay(false);

      // Update UI text is now handled by React in the JSX
    } else {
      // Start autoplay
      setAutoplayActive(true);

      // Select first artist if none is selected
      if (!activeArtist && artistNames.length > 0) {
        setActiveArtist(artistNames[0]);
      } else {
        // If artist is already selected, start advancing
        setHasStartedAutoplay(false);
      }

      // Update UI text is now handled by React in the JSX
    }
  }, [activeArtist, artistNames, autoplayActive, setHasStartedAutoplay]);

  useEffect(() => {
    // Only listen for artist selection from the sidebar, no initialization
    const handleSidebarSelection = (event: CustomEvent) => {
      setActiveArtist(event.detail.name);
      setMobileSelected(true);

      // Reset active statement when artist changes
      setActiveStatement("");
    };

    document.addEventListener(
      "selectArtist",
      handleSidebarSelection as EventListener
    );

    // Listen for autoplay toggle click
    const autoplayToggle = document.getElementById("autoplay-toggle");
    if (autoplayToggle) {
      autoplayToggle.addEventListener("click", handleAutoplay);
    }

    return () => {
      document.removeEventListener(
        "selectArtist",
        handleSidebarSelection as EventListener
      );

      // Clean up autoplay toggle listener
      const autoplayToggle = document.getElementById("autoplay-toggle");
      if (autoplayToggle) {
        autoplayToggle.removeEventListener("click", handleAutoplay);
      }

      // Clean up any active autoplay timer
      if (autoplayTimerRef.current) {
        clearTimeout(autoplayTimerRef.current);
        autoplayTimerRef.current = null;
      }
    };
  }, [handleAutoplay]);

  // Effect to handle changes in active artist or statement
  useEffect(() => {
    // Skip this effect when autoplay is not active
    if (!autoplayActive) {
      setHasStartedAutoplay(false);
      return;
    }

    // Avoid infinite loops by using a flag to track if we've already started autoplay
    if (hasStartedAutoplay) return;

    // Clear existing timer if any
    if (autoplayTimerRef.current) {
      clearTimeout(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }

    // Start autoplay for the current artist/statement
    const startAutoplayForCurrent = () => {
      // If we have an active statement, calculate its reading time and schedule next advance
      if (activeStatement) {
        const statement = activeArtistStatements.find(
          (s) => s.number === activeStatement
        );
        if (statement && statement.isComplete) {
          const readingTime = calculateReadingTime(statement.content);
          autoplayTimerRef.current = setTimeout(() => {
            advanceAutoplay();
            setHasStartedAutoplay(false); // Reset flag for next advance
          }, readingTime);
          setHasStartedAutoplay(true);
        }
      }
      // If we have an active artist but no statement, start from the first statement
      else if (activeArtist) {
        autoplayTimerRef.current = setTimeout(() => {
          advanceAutoplay();
          setHasStartedAutoplay(false); // Reset flag for next advance
        }, 50);
        setHasStartedAutoplay(true);
      }
    };

    // Start autoplay
    if (!hasStartedAutoplay) {
      startAutoplayForCurrent();
    }

    // Cleanup function
    return () => {
      if (autoplayTimerRef.current) {
        clearTimeout(autoplayTimerRef.current);
        autoplayTimerRef.current = null;
      }
    };
  }, [
    activeArtist,
    activeStatement,
    autoplayActive,
    hasStartedAutoplay,
    activeArtistStatements,
    calculateReadingTime,
    advanceAutoplay,
  ]);

  // Handle artist name click
  const handleArtistClick = (name: string) => {
    setActiveArtist(name);
    setMobileSelected(true);

    // Reset active statement when artist changes
    setActiveStatement("");
  };

  // Handle statement selection from SVG timeline
  const handleSVGStatementSelect = (statementNumber: string) => {
    const statement = activeArtistStatements.find(
      (s) => s.number === statementNumber
    );
    if (statement && statement.isComplete) {
      setActiveStatement(statementNumber);
    }
  };

  return (
    <div>
      {/* Artist Selection */}
      <div className={`${mobileSelected ? "hidden" : "block"}`}>
        <ul className="font-[family-name:var(--font-elle-two)] text-4xl space-y-0 sm:hidden leading-none">
          {artistNames.map((name, index) => (
            <li
              key={index}
              className="cursor-pointer transition-all duration-200 -mt-2"
              onClick={() => handleArtistClick(name)}
            >
              <span className="block lowercase group">
                <span
                  className={`${activeArtist === name ? "hidden" : "block"}`}
                >
                  {name}
                </span>
                <span
                  className={`${
                    activeArtist === name ? "block" : "hidden"
                  } text-5xl`}
                >
                  {name}
                </span>
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-24 mb-6 sm:hidden">
          {/* <div className="flex justify-between items-center mb-4">
            <button 
              id="autoplay-toggle-mobile" 
              className="font-[family-name:var(--font-elle-two)] text-sm uppercase tracking-wide text-gray-700 cursor-pointer hover:text-black transition-colors duration-200"
              onClick={() => handleAutoplay()}
            >
              {autoplayActive ? 'AUTOPLAY ON' : 'AUTOPLAY OFF'}
            </button>
          </div> */}
          <h2
            className="font-[family-name:var(--font-elle-two)] text-xl uppercase tracking-wide text-gray-700 cursor-pointer hover:text-black transition-colors duration-200"
            id="title-reset-mobile"
            onClick={() => {
              setActiveArtist("");
              setMobileSelected(false);
            }}
          >
            No Idea If This Is Bad Or Not
          </h2>
        </div>
      </div>

      {/* Back button for mobile */}
      {mobileSelected && (
        <button
          className="text-lg mb-6 flex items-center sm:hidden font-[family-name:var(--font-centaur)]"
          onClick={() => setMobileSelected(false)}
        >
          ← Back to artists
        </button>
      )}

      {/* Artist Content */}
      <div className={`mb-6 ${!mobileSelected && "sm:block hidden"}`}>
        {activeArtist ? (
          <div className="flex flex-col">
            {/* Two-column layout: SVG Timeline on left, Statement content on right */}
            <div className="flex flex-col md:flex-row gap-10">
              {/* SVG Timeline column */}
              <div className="md:w-1/2">
                <SVGTimeline
                  onStatementSelect={handleSVGStatementSelect}
                  activeStatement={activeStatement}
                  availableStatements={activeArtistStatements
                    .filter((statement) => statement.isComplete)
                    .map((statement) => statement.number)}
                />
              </div>

              {/* Statement content column */}
              <div className="md:w-1/2">
                {/* Statement content */}
                {activeStatement ? (
                  <div className="statement-container prose max-w-none font-[family-name:var(--font-centaur)] text-xl [&>*]:text-xl leading-loose">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: activeStatementContent,
                      }}
                      className="space-y-6"
                    />
                  </div>
                ) : (
                  <div className="text-lg text-gray-500 font-[family-name:var(--font-centaur)]">
                    Select a statement number to view content
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="statement-container prose max-w-none font-[family-name:var(--font-centaur)] text-xl [&>*]:text-xl leading-loose">
            <div className="space-y-6">
              <p>
                4. No Idea If This Is Bad Or Not is the exhibit for the Junior
                Seminar class of Spring 2025.
              </p>

              <p>
                This exhibition is the culmination of the Spring 2025 Junior
                Seminar class&apos;s exploration into what it means to be an artist. As
                young artists, we are early in the process of defining our work
                and our relationship to it. Through writing weekly artist
                statements and creating new conceptual work, this class was an
                exercise in putting language to our artistic identities and in
                turn forming our identities using the tool of language.
              </p>
              
              <p>
                Elle Pérez, our professor, structured the curriculum around the
                perennial questions and dilemmas of being an artist, for instance,
                what it means to copy existing art in one&apos;s own work or the
                struggle with imposter syndrome. These questions became creative
                prompts, often involving wordplay: to photocopy images of our
                visual influences or to literally live as alter egos—imposters—for
                a day.
              </p>
              
              <p>
                This class stretched us. It took us out of our comfort
                zones (and sometimes into public bathrooms) and pushed us to
                really consider the conceptual foundations of our artwork.
                Assembled in this gallery is a collection of our favorite pieces
                from these exercises, representing a variety of mediums,
                approaches, and self-reflections.
              </p>

              <p>
                This microsite celebrates the tradition we shared this past
                semester – we hope you enjoy reading through our descriptions of
                ourselves.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}