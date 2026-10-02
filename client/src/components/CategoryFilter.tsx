import React from 'react';
import type { Category } from '../types/category';
import { Utensils, Coffee, Pizza, Cake, Beer, Beef, Sparkles } from 'lucide-react';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategorySlug: string;
  onSelectCategory: (slug: string) => void;
  loading?: boolean;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategorySlug,
  onSelectCategory,
  loading = false,
}) => {
  const getCategoryIcon = (slug: string) => {
    switch (slug.toLowerCase()) {
      case 'breakfast':
        return <Coffee className="w-4 h-4" />;
      case 'main-dishes':
        return <Beef className="w-4 h-4" />;
      case 'burgers-sandwiches':
        return <Utensils className="w-4 h-4" />;
      case 'pizza':
        return <Pizza className="w-4 h-4" />;
      case 'drinks':
        return <Beer className="w-4 h-4" />;
      case 'desserts':
        return <Cake className="w-4 h-4" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <div className="w-full mb-8">
      <div className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 scrollbar-none no-scrollbar">
        {/* 'All' Category Chip */}
        <button
          type="button"
          onClick={() => onSelectCategory('all')}
          className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase flex items-center gap-2.5 shrink-0 transition-all cursor-pointer ${
            selectedCategorySlug === 'all'
              ? 'glass-chip-active'
              : 'glass-chip text-slate-300 hover:text-white'
          }`}
        >
          <Utensils className="w-4 h-4" />
          <span>All Menu</span>
        </button>

        {/* Loading skeleton chips */}
        {loading && categories.length === 0 ? (
          Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="w-28 h-9 rounded-full bg-slate-800/60 animate-pulse shrink-0 border border-slate-700/40"
            />
          ))
        ) : (
          categories.map((category) => {
            const isSelected = selectedCategorySlug === category.slug;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => onSelectCategory(category.slug)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase flex items-center gap-2.5 shrink-0 transition-all cursor-pointer ${
                  isSelected
                    ? 'glass-chip-active'
                    : 'glass-chip text-slate-300 hover:text-white'
                }`}
              >
                {getCategoryIcon(category.slug)}
                <span>{category.name}</span>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};
