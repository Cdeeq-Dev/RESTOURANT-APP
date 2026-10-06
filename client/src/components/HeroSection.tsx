import React from 'react';
import { Link } from 'react-router-dom';
import { Utensils, Calendar, ShieldCheck, Clock, Sparkles, ChefHat, Star } from 'lucide-react';
import { RESTAURANT_INFO } from '../utils/constants.ts';
import heroImg from '../assets/hero.png';

export const HeroSection: React.FC = () => {
  const scrollToMenu = () => {
    const menuElement = document.getElementById('menu-section');
    if (menuElement) {
      menuElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-6 pb-8 md:pt-10 md:pb-12 overflow-hidden">
      {/* Ambient background glow elements */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="glass-panel p-6 sm:p-10 lg:p-12 rounded-3xl relative overflow-hidden">
          
          {/* Subtle top border glow line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* LEFT COLUMN (lg:col-span-7) */}
            <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-6">
              <div>
                {/* Small luxury label */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wider uppercase mb-5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Luxury In-Room Dining & Culinary Experience</span>
                </div>

                {/* Strong Headline */}
                <h1 className="font-serif text-3xl sm:text-5xl lg:text-5xl font-bold tracking-tight text-white leading-[1.15] mb-4">
                  Gourmet Dining, <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">
                    Delivered Straight
                  </span>{' '}
                  to Your Suite.
                </h1>

                {/* Short Description */}
                <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6 font-light max-w-xl">
                  {RESTAURANT_INFO.heroSubheadline} Explore our curated menu of fresh chef-crafted dishes, available for fast room delivery or private table reservations.
                </p>

                {/* Action CTAs */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <button
                    type="button"
                    onClick={scrollToMenu}
                    className="glass-btn-primary px-7 py-3.5 rounded-2xl text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-xl cursor-pointer"
                  >
                    <Utensils className="w-4 h-4 stroke-[2.5]" />
                    <span>Explore Menu</span>
                  </button>

                  <Link
                    to="/reservations"
                    className="glass-btn-secondary px-7 py-3.5 rounded-2xl text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2.5 text-center"
                  >
                    <Calendar className="w-4 h-4 text-amber-400" />
                    <span>Book a Table</span>
                  </Link>
                </div>
              </div>

              {/* Compact Trust / Service Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-slate-800/80">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-white">Fast In-Room</span>
                    <span className="block text-[11px] text-slate-400">30-45 Mins Delivery</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-white">Strict Quality</span>
                    <span className="block text-[11px] text-slate-400">Fresh & Hygienic</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                    <ChefHat className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-white">Master Chefs</span>
                    <span className="block text-[11px] text-slate-400">Artisanal Recipes</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN (lg:col-span-5) - Hero Visual */}
            <div className="lg:col-span-5 relative">
              {/* Glass Frame Container for Hero Image */}
              <div className="relative rounded-2xl overflow-hidden border border-amber-500/30 bg-slate-900/80 shadow-2xl group">
                <img
                  src={heroImg}
                  alt="Gourmet Dining at The Grand Horizon"
                  className="w-full h-[300px] sm:h-[380px] lg:h-[400px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Gradient overlays for glass depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/20" />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/40 via-transparent to-transparent lg:hidden" />

                {/* Floating Glass Star Badge (Top Right) */}
                <div className="absolute top-4 right-4 glass-panel-subtle px-3.5 py-2 rounded-xl flex items-center gap-2 border border-amber-500/30 shadow-lg backdrop-blur-md">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="text-xs font-bold text-white tracking-wide">5-Star Rated</span>
                </div>

                {/* Floating Glass Overlay (Bottom) */}
                <div className="absolute bottom-4 left-4 right-4 glass-panel p-3.5 rounded-xl border border-amber-500/30 flex items-center justify-between shadow-xl backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                      <Utensils className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-white">24/7 Room Service</span>
                      <span className="block text-[11px] text-amber-300/90">Served Fresh to Your Room</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-amber-500 text-slate-950 text-[10px] font-extrabold uppercase tracking-wider shrink-0">
                    Hot & Fresh
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
