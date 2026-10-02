import React from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed, Phone, Mail, MapPin, Clock, Heart } from 'lucide-react';
import { RESTAURANT_INFO } from '../utils/constants.ts';

const currentYear = new Date().getFullYear();

export const Footer: React.FC = () => {
  return (
    <footer className="glass-panel border-t border-amber-500/20 mt-20 pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-bold shadow-md">
                <UtensilsCrossed className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="font-serif text-xl font-bold text-white tracking-tight">
                {RESTAURANT_INFO.name}
              </span>
            </Link>
            <p className="text-slate-400 text-xs font-light leading-relaxed">
              {RESTAURANT_INFO.tagline}. Bringing luxury dining directly to hotel guest rooms and private tables.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-amber-500/20 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <Link to="/" className="hover:text-amber-400 transition-colors">Home & Full Menu</Link>
              </li>
              <li>
                <Link to="/reservations" className="hover:text-amber-400 transition-colors">Table Reservations</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-amber-400 transition-colors">Contact & Guest Services</Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-amber-400 transition-colors">Cart & Order Summary</Link>
              </li>
            </ul>
          </div>

          {/* Service Hours */}
          <div>
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-amber-500/20 pb-2">
              Service Hours
            </h4>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-semibold text-slate-200">Dining Room</span>
                  <span>{RESTAURANT_INFO.openingHours}</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <UtensilsCrossed className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-semibold text-slate-200">Room Service</span>
                  <span>{RESTAURANT_INFO.roomServiceHours}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-amber-500/20 pb-2">
              Hotel Dining Desk
            </h4>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${RESTAURANT_INFO.phone}`} className="hover:text-amber-300">
                  {RESTAURANT_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`mailto:${RESTAURANT_INFO.email}`} className="hover:text-amber-300">
                  {RESTAURANT_INFO.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{RESTAURANT_INFO.address}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-4">
          <p>© {currentYear} {RESTAURANT_INFO.name}. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Crafted with <Heart className="w-3 h-3 text-amber-500 fill-amber-500" /> for In-Room Dining Excellence
          </p>
        </div>
      </div>
    </footer>
  );
};
