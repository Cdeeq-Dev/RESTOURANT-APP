import React from 'react';
import { Link } from 'react-router-dom';
import { Utensils, Calendar, ShieldCheck, Clock, Sparkles } from 'lucide-react';
import { RESTAURANT_INFO } from '../utils/constants.ts';

export const HeroSection: React.FC = () => {
  const scrollToMenu = () => {
    const menuElement = document.getElementById('menu-section');
    if (menuElement) {
      menuElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden">
      {/* Ambient background glow elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="glass-panel p-8 md:p-14 rounded-3xl relative overflow-hidden">
          
          {/* Subtle decorative gold badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wider uppercase mb-6">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Luxury In-Room Dining Experience</span>
          </div>

          {/* Main Title & Lead Text */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-3xl leading-[1.15] mb-6">
            Restaurant dining, <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">
              delivered directly
            </span>{' '}
            to your suite.
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed mb-8 font-light">
            {RESTAURANT_INFO.heroSubheadline} Guests can browse our full menu, order fresh meals straight to their room, or reserve an exclusive dining table in seconds.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
            <button
              type="button"
              onClick={scrollToMenu}
              className="glass-btn-primary px-8 py-4 rounded-2xl text-base font-semibold uppercase tracking-wider flex items-center justify-center gap-3 shadow-xl cursor-pointer"
            >
              <Utensils className="w-5 h-5 stroke-[2.5]" />
              <span>Explore Menu</span>
            </button>

            <Link
              to="/reservations"
              className="glass-btn-secondary px-8 py-4 rounded-2xl text-base font-semibold uppercase tracking-wider flex items-center justify-center gap-3 text-center"
            >
              <Calendar className="w-5 h-5 text-amber-400" />
              <span>Book a Table</span>
            </Link>
          </div>

          {/* Highlights / Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-800/80">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Clock className="w-4 h-4" />
              </div>
              <span className="text-xs font-medium text-slate-300">Fast In-Room Delivery</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="text-xs font-medium text-slate-300">Strict Quality & Hygiene</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Utensils className="w-4 h-4" />
              </div>
              <span className="text-xs font-medium text-slate-300">Crafted by Master Chefs</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
