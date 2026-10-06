import React from 'react';
import { Clock, PhoneCall, MapPin } from 'lucide-react';
import { RESTAURANT_INFO } from '../utils/constants.ts';

export const InfoBar: React.FC = () => {
  return (
    <section className="mb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Opening Hours */}
          <div className="glass-panel-subtle p-4 rounded-2xl flex items-center gap-4 hover:border-amber-500/40 transition-all border border-amber-500/20">
            <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400 shrink-0">
              <Clock className="w-5 h-5 stroke-[1.75]" />
            </div>
            <div className="min-w-0">
              <span className="block text-[11px] uppercase tracking-widest text-amber-400/90 font-bold mb-0.5">
                Opening Hours
              </span>
              <span className="block text-xs sm:text-sm font-semibold text-white truncate">
                {RESTAURANT_INFO.openingHours}
              </span>
            </div>
          </div>

          {/* Room Order Phone */}
          <div className="glass-panel-subtle p-4 rounded-2xl flex items-center gap-4 hover:border-amber-500/40 transition-all border border-amber-500/20">
            <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400 shrink-0">
              <PhoneCall className="w-5 h-5 stroke-[1.75]" />
            </div>
            <div className="min-w-0">
              <span className="block text-[11px] uppercase tracking-widest text-amber-400/90 font-bold mb-0.5">
                Room Service & Desk
              </span>
              <a href={`tel:${RESTAURANT_INFO.phone}`} className="block text-xs sm:text-sm font-semibold text-amber-300 hover:underline truncate">
                {RESTAURANT_INFO.phone}
              </a>
            </div>
          </div>

          {/* Location */}
          <div className="glass-panel-subtle p-4 rounded-2xl flex items-center gap-4 hover:border-amber-500/40 transition-all border border-amber-500/20">
            <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400 shrink-0">
              <MapPin className="w-5 h-5 stroke-[1.75]" />
            </div>
            <div className="min-w-0">
              <span className="block text-[11px] uppercase tracking-widest text-amber-400/90 font-bold mb-0.5">
                Hotel Location
              </span>
              <span className="block text-xs sm:text-sm font-semibold text-white truncate">
                {RESTAURANT_INFO.address}
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
