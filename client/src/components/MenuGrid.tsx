import React from 'react';
import type { MenuItem } from '../types/menu';
import { MenuItemCard } from './MenuItemCard';
import { AlertCircle, RefreshCw, UtensilsCrossed } from 'lucide-react';

interface MenuGridProps {
  items: MenuItem[];
  loading: boolean;
  error: string | null;
  onRetry: () => void;
  selectedCategoryName?: string;
}

export const MenuGrid: React.FC<MenuGridProps> = ({
  items,
  loading,
  error,
  onRetry,
  selectedCategoryName = 'Menu',
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div
            key={idx}
            className="glass-card rounded-2xl h-80 animate-pulse p-4 flex flex-col justify-between"
          >
            <div className="w-full h-44 rounded-xl bg-slate-800/60" />
            <div className="space-y-2 mt-4">
              <div className="w-3/4 h-5 rounded bg-slate-800/60" />
              <div className="w-full h-4 rounded bg-slate-800/40" />
            </div>
            <div className="w-1/2 h-4 rounded bg-slate-800/40 mt-4" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-panel p-10 rounded-3xl text-center my-8 max-w-xl mx-auto border-red-500/20">
        <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 mx-auto mb-4">
          <AlertCircle className="w-7 h-7" />
        </div>
        <h3 className="font-serif text-xl font-bold text-white mb-2">Unable to Load Menu Items</h3>
        <p className="text-slate-300 text-sm mb-6 max-w-md mx-auto">{error}</p>
        <button
          type="button"
          onClick={onRetry}
          className="glass-btn-primary px-6 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Try Again</span>
        </button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="glass-panel p-12 rounded-3xl text-center my-8 max-w-xl mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mx-auto mb-4">
          <UtensilsCrossed className="w-8 h-8" />
        </div>
        <h3 className="font-serif text-xl font-bold text-white mb-2">No Items Found</h3>
        <p className="text-slate-300 text-sm mb-4">
          There are currently no dishes available in the{' '}
          <span className="text-amber-400 font-semibold">{selectedCategoryName}</span> category.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map((item) => (
        <MenuItemCard key={item.id} item={item} />
      ))}
    </div>
  );
};
