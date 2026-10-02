import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar.tsx';
import { Footer } from '../components/Footer.tsx';

export const RootLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative selection:bg-amber-500/30 selection:text-amber-200">
      {/* Fixed Ambient Background Gradient Layers */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black pointer-events-none -z-20" />
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="fixed bottom-10 right-10 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Glass Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Glass Footer */}
      <Footer />
    </div>
  );
};
