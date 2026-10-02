import React, { useEffect, useState } from 'react';
import type { MenuItem } from '../types/menu';
import { fetchFeaturedMenuItems } from '../services/menuService';
import { MenuItemCard } from './MenuItemCard';
import { Award, Sparkles } from 'lucide-react';

export const FeaturedSection: React.FC = () => {
  const [featuredItems, setFeaturedItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadFeatured() {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchFeaturedMenuItems();
        if (isMounted) {
          setFeaturedItems(data);
        }
      } catch (err) {
        console.error('Failed to load featured menu items:', err);
        if (isMounted) setError(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadFeatured();
    return () => {
      isMounted = false;
    };
  }, []);

  if (error || (!loading && featuredItems.length === 0)) {
    return null;
  }

  return (
    <section className="mb-16 relative">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs uppercase font-bold tracking-widest mb-1">
            <Award className="w-4 h-4" />
            <span>Chef's Choice</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Featured Culinary Creations
          </h2>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Handcrafted Specials</span>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl h-80 animate-pulse p-4 flex flex-col justify-between"
            >
              <div className="w-full h-44 rounded-xl bg-slate-800/60" />
              <div className="space-y-2 mt-4">
                <div className="w-2/3 h-5 rounded bg-slate-800/60" />
                <div className="w-full h-4 rounded bg-slate-800/40" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredItems.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
};
