import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { MenuItem } from '../types/menu.ts';
import { fetchMenuItemBySlug } from '../services/menuService.ts';
import { formatNaira } from '../utils/formatCurrency.ts';
import { useCart } from '../context/CartContext.tsx';
import {
  Utensils,
  Minus,
  Plus,
  ShoppingBag,
  ArrowLeft,
  Star,
  Sparkles,
  AlertCircle,
  RefreshCw,
  CheckCircle2,
} from 'lucide-react';

export const FoodDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { addToCart } = useCart();

  const [item, setItem] = useState<MenuItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [addedSuccess, setAddedSuccess] = useState(false);

  const loadFoodItem = useCallback(async () => {
    if (!slug) return;
    try {
      setLoading(true);
      setError(null);
      const data = await fetchMenuItemBySlug(slug);
      setItem(data);
    } catch (err: any) {
      console.error('Failed to load menu item by slug:', err);
      if (err.response?.status === 404) {
        setError('Dish not found in menu.');
      } else {
        setError(err.response?.data?.message || 'Could not load dish details. Please check your connection.');
      }
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    loadFoodItem();
  }, [loadFoodItem]);

  const handleDecreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => Math.min(20, prev + 1));
  };

  const handleAddToCart = () => {
    if (!item) return;

    addToCart({
      menuItemId: item.id,
      slug: item.slug,
      name: item.name,
      price: item.price,
      imageUrl: item.imageUrl,
      quantity,
      specialInstructions,
    });

    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
    }, 2500);
  };

  // Loading skeleton state
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="glass-panel p-6 sm:p-10 rounded-3xl animate-pulse grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="w-full h-72 sm:h-96 rounded-2xl bg-slate-800/60" />
          <div className="space-y-4 justify-between flex flex-col">
            <div className="space-y-3">
              <div className="w-24 h-6 rounded bg-slate-800/60" />
              <div className="w-3/4 h-8 rounded bg-slate-800/60" />
              <div className="w-1/3 h-6 rounded bg-slate-800/60" />
              <div className="w-full h-20 rounded bg-slate-800/40" />
            </div>
            <div className="w-full h-14 rounded-2xl bg-slate-800/60" />
          </div>
        </div>
      </div>
    );
  }

  // Error / Not Found State
  if (error || !item) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="glass-panel p-10 rounded-3xl">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mx-auto mb-4">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-white mb-2">Dish Not Available</h2>
          <p className="text-slate-300 text-sm mb-6 max-w-md mx-auto">
            {error || 'The requested meal could not be found.'}
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/"
              className="glass-btn-primary px-6 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Menu</span>
            </Link>
            {error && (
              <button
                type="button"
                onClick={loadFoodItem}
                className="glass-btn-secondary px-6 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4 text-amber-400" />
                <span>Retry</span>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  const calculatedTotalPriceKobo = item.price * quantity;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-14">
      {/* Top Navigation Back Link */}
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-amber-400 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Gourmet Menu</span>
        </Link>
      </div>

      {/* Main Glass Detail Layout */}
      <div className="glass-panel p-6 sm:p-10 rounded-3xl relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
          
          {/* LEFT: Food Image / Fallback Treatment */}
          <div className="relative w-full h-72 sm:h-96 md:h-[450px] rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-amber-950/40 border border-slate-700/50 flex items-center justify-center group shadow-2xl">
            {item.imageUrl ? (
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            ) : (
              /* Polished Fallback Graphic */
              <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.15)_0,transparent_70%)]" />
                <div className="w-24 h-24 rounded-3xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3 group-hover:scale-110 transition-transform">
                  <Utensils className="w-12 h-12 stroke-[1.5]" />
                </div>
                <span className="text-xs uppercase tracking-widest text-slate-300 font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Grand Horizon Culinary Specialty</span>
                </span>
              </div>
            )}

            {/* Badges Overlay */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
              {item.category && (
                <span className="px-3 py-1.5 rounded-lg bg-slate-950/80 backdrop-blur-md border border-amber-500/40 text-amber-300 text-xs font-semibold uppercase tracking-wider shadow-lg">
                  {item.category.name}
                </span>
              )}
              {item.isFeatured && (
                <span className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                  <Star className="w-3.5 h-3.5 fill-slate-950 stroke-slate-950" />
                  <span>Chef's Special</span>
                </span>
              )}
            </div>
          </div>

          {/* RIGHT: Meal Details & Room Ordering Controls */}
          <div className="flex flex-col justify-between h-full space-y-6">
            <div>
              {/* Category & Availability */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs uppercase font-semibold tracking-wider text-amber-400">
                  {item.category?.name || 'Gourmet Dish'}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Available for Room Delivery
                </span>
              </div>

              {/* Title & Price */}
              <h1 className="font-serif text-2xl sm:text-4xl font-bold text-white mb-3 tracking-tight">
                {item.name}
              </h1>

              <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 mb-5">
                {formatNaira(item.price)}
              </div>

              {/* Description */}
              <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed mb-6 border-b border-slate-800 pb-6">
                {item.description}
              </p>

              {/* Special Instructions Field */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="specialInstructions" className="block text-xs uppercase tracking-wider font-semibold text-slate-200">
                    Special Preparation Instructions
                  </label>
                  <span className="text-[11px] text-slate-400">
                    {specialInstructions.length} / 500
                  </span>
                </div>
                <textarea
                  id="specialInstructions"
                  rows={3}
                  maxLength={500}
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="e.g. No pepper, extra sauce, dressing on the side..."
                  className="w-full bg-slate-900/80 border border-slate-700/80 rounded-xl p-3.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all resize-none"
                />
              </div>

              {/* Quantity Selector */}
              <div className="mb-8">
                <span className="block text-xs uppercase tracking-wider font-semibold text-slate-200 mb-3">
                  Quantity (Max 20)
                </span>
                <div className="flex items-center gap-4">
                  <div className="inline-flex items-center bg-slate-900/90 border border-amber-500/30 rounded-2xl p-1 shadow-inner">
                    <button
                      type="button"
                      onClick={handleDecreaseQuantity}
                      disabled={quantity <= 1}
                      aria-label="Decrease quantity"
                      className="w-11 h-11 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-slate-200 hover:text-amber-400 hover:border-amber-500/50 disabled:opacity-40 disabled:hover:text-slate-200 disabled:hover:border-slate-700/60 transition-all cursor-pointer disabled:cursor-not-allowed"
                    >
                      <Minus className="w-4 h-4" />
                    </button>

                    <span className="w-14 text-center font-bold text-lg text-white">
                      {quantity}
                    </span>

                    <button
                      type="button"
                      onClick={handleIncreaseQuantity}
                      disabled={quantity >= 20}
                      aria-label="Increase quantity"
                      className="w-11 h-11 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-slate-200 hover:text-amber-400 hover:border-amber-500/50 disabled:opacity-40 disabled:hover:text-slate-200 disabled:hover:border-slate-700/60 transition-all cursor-pointer disabled:cursor-not-allowed"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <span className="text-xs text-slate-400 font-light">
                    Subtotal: <strong className="text-amber-400 font-bold">{formatNaira(calculatedTotalPriceKobo)}</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Add to Order Button */}
            <div>
              <button
                type="button"
                onClick={handleAddToCart}
                className={`w-full py-4 px-6 rounded-2xl text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-3 transition-all shadow-xl cursor-pointer ${
                  addedSuccess
                    ? 'bg-emerald-500 text-slate-950 shadow-emerald-500/20'
                    : 'glass-btn-primary'
                }`}
              >
                {addedSuccess ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                    <span>Added to Order!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5 stroke-[2.5]" />
                    <span>Add to Order • {formatNaira(calculatedTotalPriceKobo)}</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
