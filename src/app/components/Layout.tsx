import { Outlet } from 'react-router';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CustomCursor } from './CustomCursor';

export function Layout() {
  return (
    <div className="relative min-h-screen bg-vc-light-bg dark:bg-vc-dark-bg">
      
      // uncomment for unable cursor
      
      {/* <CustomCursor /> */}
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}