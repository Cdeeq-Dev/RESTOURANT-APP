import React, { useEffect, useState, useCallback } from 'react';
import { HeroSection } from '../components/HeroSection';
import { InfoBar } from '../components/InfoBar';
import { FeaturedSection } from '../components/FeaturedSection';
import { CategoryFilter } from '../components/CategoryFilter';
import { MenuGrid } from '../components/MenuGrid';
import type { Category } from '../types/category';
import type { MenuItem } from '../types/menu';
import { fetchCategories } from '../services/categoryService';
import { fetchMenuItems } from '../services/menuService';
import { Utensils } from 'lucide-react';

export const HomePage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string>('all');
  
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingMenu, setLoadingMenu] = useState(true);
  const [errorMenu, setErrorMenu] = useState<string | null>(null);

  // Load categories on mount
  useEffect(() => {
    let isMounted = true;
    async function loadCategories() {
      try {
        setLoadingCategories(true);
        const data = await fetchCategories();
        if (isMounted) setCategories(data);
      } catch (err) {
        console.error('Failed to load categories:', err);
      } finally {
        if (isMounted) setLoadingCategories(false);
      }
    }
    loadCategories();
    return () => {
      isMounted = false;
    };
  }, []);

  // Load menu items when category changes
  const loadMenu = useCallback(async (categorySlug: string) => {
    try {
      setLoadingMenu(true);
      setErrorMenu(null);
      const data = await fetchMenuItems(categorySlug);
      setMenuItems(data);
    } catch (err: any) {
      console.error('Failed to load menu items:', err);
      setErrorMenu(
        err.response?.data?.message || 'Could not connect to the restaurant server. Please check your connection.'
      );
    } finally {
      setLoadingMenu(false);
    }
  }, []);

  useEffect(() => {
    loadMenu(selectedCategorySlug);
  }, [selectedCategorySlug, loadMenu]);

  const handleSelectCategory = (slug: string) => {
    setSelectedCategorySlug(slug);
  };

  const selectedCategoryObj = categories.find((c) => c.slug === selectedCategorySlug);
  const selectedCategoryName = selectedCategorySlug === 'all' ? 'All Menu' : selectedCategoryObj?.name || selectedCategorySlug;

  return (
    <div className="pb-12">
      {/* Hero Section */}
      <HeroSection />

      {/* Restaurant Info Bar */}
      <InfoBar />

      <div id="menu-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Chef's Picks / Featured Dishes */}
        <FeaturedSection />

        {/* Menu Header & Category Selection */}
        <div className="mb-6 pt-6 border-t border-slate-800/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest mb-1">
                <Utensils className="w-4 h-4" />
                <span>Culinary Offerings</span>
              </div>
              <h2 className="font-serif text-3xl font-bold text-white tracking-tight">
                Explore Our Gourmet Menu
              </h2>
            </div>
            <p className="text-slate-400 text-xs font-light max-w-sm">
              Freshly prepared dishes delivered directly to your room or table.
            </p>
          </div>

          {/* Category Filter Chips */}
          <CategoryFilter
            categories={categories}
            selectedCategorySlug={selectedCategorySlug}
            onSelectCategory={handleSelectCategory}
            loading={loadingCategories}
          />
        </div>

        {/* Menu Items Grid */}
        <MenuGrid
          items={menuItems}
          loading={loadingMenu}
          error={errorMenu}
          onRetry={() => loadMenu(selectedCategorySlug)}
          selectedCategoryName={selectedCategoryName}
        />
      </div>
    </div>
  );
};
