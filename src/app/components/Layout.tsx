import { Outlet } from 'react-router';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CustomCursor } from './CustomCursor';
import { SmoothScroll } from './SmoothScroll';

export function Layout() {
  return (
    <div className="relative min-h-screen bg-vc-light-bg dark:bg-vc-dark-bg">
      <SmoothScroll />
      {/* <CustomCursor /> */}
      <Navbar />
      <main className="relative">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}