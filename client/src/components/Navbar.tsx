import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UtensilsCrossed, ShoppingBag, Menu, X, Calendar, Phone } from 'lucide-react';
import { RESTAURANT_INFO } from '../utils/constants.ts';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/#menu' },
    { name: 'Reservations', path: '/reservations' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="glass-nav sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <UtensilsCrossed className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-amber-400 transition-colors">
                {RESTAURANT_INFO.name}
              </span>
              <span className="block text-[10px] uppercase tracking-widest text-amber-400/80 font-semibold -mt-1">
                Luxury Dining & Suites
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive(link.path)
                    ? 'text-amber-400 bg-amber-500/10 border border-amber-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Action Icons (Cart & Book Table) */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              to="/reservations"
              className="glass-btn-secondary px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>Book Table</span>
            </Link>

            <Link
              to="/cart"
              className="relative p-2.5 rounded-xl bg-slate-900/80 border border-amber-500/20 text-slate-200 hover:text-amber-400 hover:border-amber-500/40 transition-all group"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-bold text-[11px] flex items-center justify-center shadow-md">
                0
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              to="/cart"
              className="relative p-2 rounded-lg bg-slate-900/80 border border-amber-500/20 text-slate-200"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] flex items-center justify-center">
                0
              </span>
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-t border-amber-500/20 px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-xl text-base font-medium transition-all ${
                  isActive(link.path)
                    ? 'text-amber-400 bg-amber-500/15 border border-amber-500/40'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
            <Link
              to="/reservations"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full glass-btn-primary py-3 rounded-xl text-center text-sm font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Reserve a Table</span>
            </Link>
            <a
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="w-full py-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-300 text-xs text-center flex items-center justify-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Room Order: {RESTAURANT_INFO.phone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
