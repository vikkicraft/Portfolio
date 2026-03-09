import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { Hero } from './Hero';
import { MyWork } from './MyWork';
import { About } from './About';
import { Skills } from './Skills';
import { Gallery } from './Gallery';

export function Home() {
  const location = useLocation();

  useEffect(() => {
    // If navigating back with a hash (from navbar on project page), scroll to that section
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 50);
      }
      return;
    }

    // Restore saved scroll position when returning from project page
    const savedY = sessionStorage.getItem('homeScrollY');
    if (savedY) {
      window.scrollTo({ top: parseInt(savedY, 10), behavior: 'instant' });
      sessionStorage.removeItem('homeScrollY');
    }
  }, [location]);

  return (
    <>
      <Hero />
      <MyWork />
      <About />
      <Skills />
      <Gallery />
    </>
  );
}