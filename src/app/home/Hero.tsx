import { useState, useRef } from 'react';
import { TetrisGrid } from '../tetris/TetrisGrid';
import { TetrisTouchOverlay } from '../tetris/TetrisTouchOverlay';

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
    <section ref={heroRef} id="hero" className="min-h-screen md:min-h-screen flex flex-col pt-16 pb-8 bg-vc-light-bg dark:bg-vc-dark-bg relative overflow-hidden md:h-auto h-[100svh]">
      {/* Tetris Grid Background */}
      <TetrisGrid key={tetrisKey} paused={isPaused} />
      <TetrisTouchOverlay heroRef={heroRef} />
      
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-between px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center md:text-left max-w-4xl">
            {/* <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold sm:font-medium md:font-medium lg:font-medium mb-4 sm:mb-6 text-vc-light-text dark:text-vc-dark-text leading-tight sm:leading-snug md:leading-snug lg:leading-snug text-center">
              Solving UX like{" "}
              <span className="text-vc-secondary">Tetris</span>,{" "} Placing every piece with{" "}
              <span className="text-vc-primary">Purpose</span>.
            </h1> */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold sm:font-medium md:font-medium lg:font-medium mb-4 sm:mb-6 text-vc-light-text dark:text-vc-dark-text leading-tight sm:leading-snug md:leading-snug lg:leading-snug text-center">
            .
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl">
              {/* Add your subtitle or description here */}
            </p>
          </div>
        </div>

        {/* Divider and bottom text */}
        <div className="w-full">
          {/* Text content */}
          <div className="flex flex-row justify-between items-center gap-4 mb-4">
            <p className="text-[12px] text-gray-600 dark:text-gray-400 tracking-wide flex items-center gap-1.5 min-w-0">
              <button
                onClick={handleTogglePause}
                className="cursor-pointer hover:text-vc-primary dark:hover:text-vc-primary transition-colors bg-gray-200/50 dark:bg-gray-800/50 rounded p-1"
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
                className="cursor-pointer hover:text-vc-primary dark:hover:text-vc-primary transition-colors bg-gray-200/50 dark:bg-gray-800/50 rounded p-1"
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
              className="group text-[12px] text-gray-600 dark:text-gray-400 hover:text-vc-primary dark:hover:text-vc-primary transition-colors tracking-wide flex items-center gap-1 shrink-0"
            >
              LINKEDIN
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-200"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
            </a>
          </div>

          {/* Horizontal divider line */}
          <div className="w-full h-px bg-gray-300 dark:bg-gray-700 translate-y-[4px]"></div>
        </div>
      </div>
    </section>
  );
}