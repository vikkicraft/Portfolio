import { Outlet } from "react-router";
import { CustomCursor } from "./CustomCursor";
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function Layout() {
  return (
    <div className="relative min-h-screen bg-vc-light-bg dark:bg-vc-dark-bg">
      {/* uncomment for unable cursor */}
      {/* <CustomCursor /> */}
      <Navbar />
      <main className="relative">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}