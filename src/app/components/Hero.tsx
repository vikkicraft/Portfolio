import { useState, useRef } from 'react';
import { TetrisGrid } from './tetris/TetrisGrid';
import { TetrisTouchOverlay } from './tetris/TetrisTouchOverlay';

export function Hero() {
  const [tetrisKey, setTetrisKey] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  const handleReset = () => {
    setTetrisKey((prev) => prev + 1);
    setIsPaused(false);
  };

  const handleTogglePause = () => {
    setIsPaused((prev) => !prev);
  };

  return (
    <section ref={heroRef} className="min-h-screen flex flex-col pt-16 pb-8 bg-vc-light-bg dark:bg-vc-dark-bg relative overflow-hidden">
      {/* Tetris Grid Background */}
      <TetrisGrid key={tetrisKey} paused={isPaused} />
      <TetrisTouchOverlay heroRef={heroRef} />

      {/* Grid lines overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0"
        style={{
          zIndex: 0,
          bottom: '40px',
          backgroundImage:
            'linear-gradient(to right, var(--grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />
      
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-between px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center md:text-left max-w-4xl">
            <h1 className="text-3xl font-medium sm:text-4xl md:text-5xl lg:text-6xl mb-6 text-vc-light-text dark:text-vc-dark-text leading-snug sm:leading-snug md:leading-snug lg:leading-snug text-center">
              Solving UX like{" "}
              <span className="text-vc-secondary">Tetris</span>,{" "} Placing every piece with{" "}
              <span className="text-vc-primary">Purpose</span>.
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl">
              {/* Add your subtitle or description here */}
            </p>
          </div>
        </div>

        {/* Divider and bottom text */}
        <div className="w-full">
          {/* Text content */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <p className="text-[12px] text-gray-600 dark:text-gray-400 tracking-wide flex items-center gap-1.5">
              <button
                onClick={handleTogglePause}
                className="cursor-pointer hover:text-gray-900 dark:hover:text-gray-200 transition-colors bg-gray-200/50 dark:bg-gray-800/50 rounded p-1"
                aria-label={isPaused ? "Resume Tetris" : "Pause Tetris"}
                data-hover
              >
                {isPaused ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="6,4 20,12 6,20"/></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><rect x="7" y="5" width="3" height="14" rx="0.5"/><rect x="14" y="5" width="3" height="14" rx="0.5"/></svg>
                )}
              </button>
              <button
                onClick={handleReset}
                className="cursor-pointer hover:text-gray-900 dark:hover:text-gray-200 transition-colors bg-gray-200/50 dark:bg-gray-800/50 rounded p-1"
                aria-label="Reset Tetris"
                data-hover
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
              </button>
              TETRIS: <span className="hidden sm:inline">move your cursor to guide blocks • Click to rotate</span><span className="sm:hidden">drag to move • tap to rotate</span>
            </p>
            <a 
              href="https://www.linkedin.com/in/vikkicraft/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[12px] text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors tracking-wide flex items-center gap-1"
            >
              LINKEDIN
              <span className="text-base">↗</span>
            </a>
          </div>

          {/* Horizontal divider line */}
          <div className="w-full h-px bg-gray-300 dark:bg-gray-700 translate-y-[4px]"></div>
        </div>
      </div>
    </section>
  );
}