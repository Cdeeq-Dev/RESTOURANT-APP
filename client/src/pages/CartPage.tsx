import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.tsx';
import { formatNaira } from '../utils/formatCurrency.ts';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  ArrowRight,
  Utensils,
  AlertTriangle,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart, clearCart, totalAmountKobo, totalItemsCount } = useCart();
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleConfirmClear = () => {
    clearCart();
    setShowClearConfirm(false);
  };

  // Empty Cart State
  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="glass-panel p-10 sm:p-14 rounded-3xl relative overflow-hidden">
          <div className="w-20 h-20 rounded-3xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mx-auto mb-6">
            <ShoppingBag className="w-10 h-10" />
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Room Dining Order Empty</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-3">
            Your Order is Currently Empty
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-md mx-auto mb-8 font-light leading-relaxed">
            You haven't added any gourmet dishes to your room delivery order yet. Explore our menu to start ordering.
          </p>

          <Link
            to="/"
            className="glass-btn-primary px-8 py-4 rounded-2xl text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2 shadow-xl"
          >
            <Utensils className="w-4 h-4" />
            <span>Browse Gourmet Menu</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-14">
      {/* Page Title & Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest mb-1">
            <ShoppingBag className="w-4 h-4" />
            <span>Room Service Cart</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Your Dining Order ({totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'})
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowClearConfirm(true)}
            className="text-xs font-semibold text-rose-400 hover:text-rose-300 px-3.5 py-2 rounded-xl bg-rose-500/10 border border-rose-500/20 hover:border-rose-500/40 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Cart</span>
          </button>
        </div>
      </div>

      {/* Main Cart Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* LEFT COLUMN: Cart Line Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => {
            const lineTotalKobo = item.price * item.quantity;

            return (
              <div
                key={item.id}
                className="glass-card p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4 transition-all"
              >
                {/* Thumbnail Image / Fallback */}
                <div
                  onClick={() => navigate(`/menu/${item.slug}`)}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-slate-900 border border-slate-700/60 overflow-hidden shrink-0 flex items-center justify-center cursor-pointer group"
                >
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <div className="w-full h-full bg-amber-500/10 flex items-center justify-center text-amber-400">
                      <Utensils className="w-8 h-8 stroke-[1.5]" />
                    </div>
                  )}
                </div>

                {/* Info Details */}
                <div className="flex-grow space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3
                      onClick={() => navigate(`/menu/${item.slug}`)}
                      className="font-serif text-lg font-bold text-white hover:text-amber-400 transition-colors cursor-pointer line-clamp-1"
                    >
                      {item.name}
                    </h3>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="text-slate-400 hover:text-rose-400 p-1.5 rounded-lg hover:bg-rose-500/10 transition-colors sm:hidden"
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs text-slate-300">
                    Unit Price: <span className="font-semibold text-amber-400">{formatNaira(item.price)}</span>
                  </p>

                  {item.specialInstructions && (
                    <p className="text-xs text-amber-300/90 italic bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-md inline-block max-w-full truncate">
                      Note: "{item.specialInstructions}"
                    </p>
                  )}
                </div>

                {/* Quantity & Actions Column */}
                <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                  {/* Quantity Stepper */}
                  <div className="inline-flex items-center bg-slate-900/90 border border-amber-500/20 rounded-xl p-1">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      aria-label="Decrease quantity"
                      className="w-8 h-8 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-slate-200 hover:text-amber-400 disabled:opacity-40 transition-all cursor-pointer disabled:cursor-not-allowed"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>

                    <span className="w-9 text-center text-sm font-bold text-white">
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      disabled={item.quantity >= 20}
                      aria-label="Increase quantity"
                      className="w-8 h-8 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-slate-200 hover:text-amber-400 disabled:opacity-40 transition-all cursor-pointer disabled:cursor-not-allowed"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Line Total */}
                  <div className="text-right shrink-0">
                    <span className="block text-xs text-slate-400 uppercase tracking-wider font-semibold">Subtotal</span>
                    <span className="text-base font-extrabold text-amber-400">
                      {formatNaira(lineTotalKobo)}
                    </span>
                  </div>

                  {/* Desktop Remove Button */}
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="text-slate-400 hover:text-rose-400 p-2 rounded-xl hover:bg-rose-500/10 transition-colors hidden sm:block cursor-pointer"
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}

          <div className="pt-2">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-amber-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Add More Dishes to Order</span>
            </Link>
          </div>
        </div>

        {/* RIGHT COLUMN: Order Summary Box */}
        <div className="lg:col-span-1">
          <div className="glass-panel p-6 sm:p-7 rounded-3xl space-y-6 sticky top-28">
            <h2 className="font-serif text-xl font-bold text-white border-b border-slate-800 pb-3">
              Order Summary
            </h2>

            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex justify-between">
                <span>Total Items</span>
                <span className="font-semibold text-white">{totalItemsCount}</span>
              </div>

              <div className="flex justify-between">
                <span>Room Delivery</span>
                <span className="font-semibold text-emerald-400">FREE</span>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline">
                <span className="text-base font-bold text-white">Estimated Total</span>
                <span className="text-2xl font-extrabold text-amber-400">
                  {formatNaira(totalAmountKobo)}
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>Order prices calculated securely in server KOBO arithmetic before final submission.</span>
            </div>

            <button
              type="button"
              onClick={() => navigate('/checkout')}
              className="w-full glass-btn-primary py-4 px-6 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl cursor-pointer"
            >
              <span>Continue to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Confirmation Modal for Clear Cart */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="glass-panel p-7 rounded-3xl max-w-md w-full text-center space-y-4 shadow-2xl border-rose-500/30">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h3 className="font-serif text-xl font-bold text-white">Clear Entire Order?</h3>
            <p className="text-slate-300 text-xs leading-relaxed">
              Are you sure you want to remove all dishes from your cart? This action cannot be undone.
            </p>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowClearConfirm(false)}
                className="glass-btn-secondary px-5 py-2.5 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmClear}
                className="bg-rose-600 hover:bg-rose-500 text-white font-semibold px-5 py-2.5 rounded-xl text-xs transition-colors"
              >
                Clear Everything
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
