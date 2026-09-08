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
              className="shrink-0 opacity-70 hover:opacity-100 transition-opacity duration-200"
              aria-label="LinkedIn"
            >
              {/* Light mode: black bg, white icon */}
              <svg className="block dark:hidden" xmlns="http://www.w3.org/2000/svg" height="26" viewBox="0 0 72 72" width="26"><g fill="none" fillRule="evenodd"><path d="M8,72 L64,72 C68.418278,72 72,68.418278 72,64 L72,8 C72,3.581722 68.418278,-8.11624501e-16 64,0 L8,0 C3.581722,8.11624501e-16 -5.41083001e-16,3.581722 0,8 L0,64 C5.41083001e-16,68.418278 3.581722,72 8,72 Z" fill="#000000"/><path d="M62,62 L51.315625,62 L51.315625,43.8021149 C51.315625,38.8127542 49.4197917,36.0245323 45.4707031,36.0245323 C41.1746094,36.0245323 38.9300781,38.9261103 38.9300781,43.8021149 L38.9300781,62 L28.6333333,62 L28.6333333,27.3333333 L38.9300781,27.3333333 L38.9300781,32.0029283 C38.9300781,32.0029283 42.0260417,26.2742151 49.3825521,26.2742151 C56.7356771,26.2742151 62,30.7644705 62,40.051212 L62,62 Z M16.349349,22.7940133 C12.8420573,22.7940133 10,19.9296567 10,16.3970067 C10,12.8643566 12.8420573,10 16.349349,10 C19.8566406,10 22.6970052,12.8643566 22.6970052,16.3970067 C22.6970052,19.9296567 19.8566406,22.7940133 16.349349,22.7940133 Z M11.0325521,62 L21.769401,62 L21.769401,27.3333333 L11.0325521,27.3333333 L11.0325521,62 Z" fill="#FFFFFF"/></g></svg>
              {/* Dark mode: white bg, black icon */}
              <svg className="hidden dark:block" xmlns="http://www.w3.org/2000/svg" height="26" viewBox="0 0 72 72" width="26"><g fill="none" fillRule="evenodd"><path d="M8,72 L64,72 C68.418278,72 72,68.418278 72,64 L72,8 C72,3.581722 68.418278,-8.11624501e-16 64,0 L8,0 C3.581722,8.11624501e-16 -5.41083001e-16,3.581722 0,8 L0,64 C5.41083001e-16,68.418278 3.581722,72 8,72 Z" fill="#FFFFFF"/><path d="M62,62 L51.315625,62 L51.315625,43.8021149 C51.315625,38.8127542 49.4197917,36.0245323 45.4707031,36.0245323 C41.1746094,36.0245323 38.9300781,38.9261103 38.9300781,43.8021149 L38.9300781,62 L28.6333333,62 L28.6333333,27.3333333 L38.9300781,27.3333333 L38.9300781,32.0029283 C38.9300781,32.0029283 42.0260417,26.2742151 49.3825521,26.2742151 C56.7356771,26.2742151 62,30.7644705 62,40.051212 L62,62 Z M16.349349,22.7940133 C12.8420573,22.7940133 10,19.9296567 10,16.3970067 C10,12.8643566 12.8420573,10 16.349349,10 C19.8566406,10 22.6970052,12.8643566 22.6970052,16.3970067 C22.6970052,19.9296567 19.8566406,22.7940133 16.349349,22.7940133 Z M11.0325521,62 L21.769401,62 L21.769401,27.3333333 L11.0325521,27.3333333 L11.0325521,62 Z" fill="#000000"/></g></svg>
            </a>
          </div>

          {/* Horizontal divider line */}
          <div className="w-full h-px bg-gray-300 dark:bg-gray-700 translate-y-[4px]"></div>
        </div>
      </div>
    </section>
  );
}