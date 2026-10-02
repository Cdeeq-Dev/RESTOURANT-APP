import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { MenuItem } from '../types/menu';
import { formatNaira } from '../utils/formatCurrency';
import { Utensils, Star, ArrowRight, Sparkles } from 'lucide-react';

interface MenuItemCardProps {
  item: MenuItem;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({ item }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/menu/${item.slug}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="glass-card rounded-2xl overflow-hidden flex flex-col h-full group cursor-pointer relative"
    >
      {/* Category & Featured Badges */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        {item.category && (
          <span className="px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md border border-amber-500/30 text-amber-300 text-[11px] font-semibold tracking-wider uppercase shadow-md">
            {item.category.name}
          </span>
        )}
        {item.isFeatured && (
          <span className="px-2.5 py-1 rounded-md bg-amber-500 text-slate-950 text-[11px] font-bold tracking-wider uppercase flex items-center gap-1 shadow-md">
            <Star className="w-3 h-3 fill-slate-950 stroke-slate-950" />
            <span>Chef's Choice</span>
          </span>
        )}
      </div>

      {/* Image / Fallback Container */}
      <div className="relative w-full h-48 sm:h-52 bg-gradient-to-br from-slate-900 via-slate-800 to-amber-950/30 overflow-hidden flex items-center justify-center">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          /* Polished Luxury Fallback Graphic when imageUrl is null */
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.12)_0,transparent_70%)]" />
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-2 group-hover:scale-110 transition-transform">
              <Utensils className="w-8 h-8 stroke-[1.5]" />
            </div>
            <span className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Gourmet Specialty</span>
            </span>
          </div>
        )}

        {/* Ambient Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
        <div>
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-serif text-lg font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
              {item.name}
            </h3>
            {/* Price Badge in Nigerian Naira */}
            <span className="text-base font-extrabold text-amber-400 font-sans shrink-0">
              {formatNaira(item.price)}
            </span>
          </div>

          <p className="text-slate-300 text-xs font-light leading-relaxed line-clamp-2">
            {item.description}
          </p>
        </div>

        {/* Card Footer Actions */}
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Available for Delivery
          </span>

          <button
            type="button"
            className="text-xs font-semibold text-amber-400 group-hover:text-amber-300 flex items-center gap-1 transition-all"
            aria-label={`View details for ${item.name}`}
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
