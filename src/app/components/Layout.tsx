import { Outlet } from 'react-router';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function Layout() {
  return (
    <div className="min-h-screen bg-vc-light-bg dark:bg-vc-dark-bg">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}