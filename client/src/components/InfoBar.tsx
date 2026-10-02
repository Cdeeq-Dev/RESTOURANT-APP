import React from 'react';
import { Clock, PhoneCall, MapPin } from 'lucide-react';
import { RESTAURANT_INFO } from '../utils/constants.ts';

export const InfoBar: React.FC = () => {
  return (
    <section className="mb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Opening Hours */}
          <div className="glass-panel-subtle p-5 rounded-2xl flex items-center gap-4 hover:border-amber-500/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <Clock className="w-6 h-6 stroke-[1.75]" />
            </div>
            <div>
              <span className="block text-xs uppercase tracking-wider text-slate-400 font-semibold">Opening Hours</span>
              <span className="block text-sm font-medium text-slate-100">{RESTAURANT_INFO.openingHours}</span>
            </div>
          </div>

          {/* Room Order Phone */}
          <div className="glass-panel-subtle p-5 rounded-2xl flex items-center gap-4 hover:border-amber-500/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <PhoneCall className="w-6 h-6 stroke-[1.75]" />
            </div>
            <div>
              <span className="block text-xs uppercase tracking-wider text-slate-400 font-semibold">Room Service & Desk</span>
              <a href={`tel:${RESTAURANT_INFO.phone}`} className="block text-sm font-medium text-amber-300 hover:underline">
                {RESTAURANT_INFO.phone}
              </a>
            </div>
          </div>

          {/* Location */}
          <div className="glass-panel-subtle p-5 rounded-2xl flex items-center gap-4 hover:border-amber-500/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <MapPin className="w-6 h-6 stroke-[1.75]" />
            </div>
            <div>
              <span className="block text-xs uppercase tracking-wider text-slate-400 font-semibold">Hotel Location</span>
              <span className="block text-sm font-medium text-slate-100 line-clamp-1">{RESTAURANT_INFO.address}</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
