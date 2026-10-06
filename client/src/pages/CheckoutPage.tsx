import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatNaira } from '../utils/formatCurrency';
import { createOrder } from '../services/orderService';
import type { OrderType, CreateOrderPayload } from '../types/order';
import {
  ShoppingBag,
  ArrowLeft,
  Utensils,
  Building,
  User,
  Phone,
  MessageSquare,
  ShieldCheck,
  Loader2,
  AlertCircle,
  Package,
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { cart, clearCart, totalAmountKobo } = useCart();

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [orderType, setOrderType] = useState<OrderType>('ROOM_DELIVERY');
  const [roomNumber, setRoomNumber] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');

  const [errors, setErrors] = useState<{
    customerName?: string;
    phone?: string;
    roomNumber?: string;
    orderType?: string;
  }>({});

  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle Order Type Change
  const handleOrderTypeChange = (newType: OrderType) => {
    setOrderType(newType);
    if (newType === 'TAKEOUT') {
      // Cleanly clear room number and error when switching to TAKEOUT
      setRoomNumber('');
      setErrors((prev) => ({ ...prev, roomNumber: undefined }));
    }
  };

  // Frontend Validation
  const validateForm = (): boolean => {
    const newErrors: {
      customerName?: string;
      phone?: string;
      roomNumber?: string;
      orderType?: string;
    } = {};

    if (!customerName.trim()) {
      newErrors.customerName = 'Guest name is required';
    } else if (customerName.trim().length < 2) {
      newErrors.customerName = 'Guest name must be at least 2 characters';
    }

    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (phone.trim().length < 5) {
      newErrors.phone = 'Please enter a valid phone number (at least 5 digits)';
    }

    if (!orderType) {
      newErrors.orderType = 'Please select an order type';
    }

    if (orderType === 'ROOM_DELIVERY') {
      if (!roomNumber.trim()) {
        newErrors.roomNumber = 'Room number is required for Room Delivery';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (cart.length === 0) {
      setServerError('Your cart is empty. Please add dishes before placing an order.');
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const payload: CreateOrderPayload = {
        customerName: customerName.trim(),
        phone: phone.trim(),
        orderType,
        roomNumber: orderType === 'ROOM_DELIVERY' ? roomNumber.trim() : null,
        specialInstructions: specialInstructions.trim() || null,
        items: cart.map((item) => ({
          menuItemId: item.menuItemId,
          quantity: item.quantity,
          specialInstructions: item.specialInstructions ? item.specialInstructions.trim() : null,
        })),
      };

      const orderResult = await createOrder(payload);

      // Clear cart ONLY AFTER backend confirms success
      clearCart();

      // Navigate to order confirmation page
      navigate(`/order/${orderResult.orderNumber}`);
    } catch (err: any) {
      if (err.fieldErrors) {
        // Map backend field errors if present
        const mappedErrors: Record<string, string> = {};
        if (err.fieldErrors.customerName) mappedErrors.customerName = err.fieldErrors.customerName[0];
        if (err.fieldErrors.phone) mappedErrors.phone = err.fieldErrors.phone[0];
        if (err.fieldErrors.roomNumber) mappedErrors.roomNumber = err.fieldErrors.roomNumber[0];
        if (err.fieldErrors.orderType) mappedErrors.orderType = err.fieldErrors.orderType[0];
        setErrors((prev) => ({ ...prev, ...mappedErrors }));
      }
      setServerError(err.message || 'Failed to submit order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Empty Cart State
  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="glass-panel p-10 sm:p-14 rounded-3xl relative overflow-hidden">
          <div className="w-20 h-20 rounded-3xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mx-auto mb-6">
            <ShoppingBag className="w-10 h-10" />
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-3">
            Your Cart is Empty
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-md mx-auto mb-8 font-light leading-relaxed">
            You cannot proceed to checkout with an empty cart. Please browse our gourmet menu and add items to your order.
          </p>

          <Link
            to="/"
            className="glass-btn-primary px-8 py-4 rounded-2xl text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2 shadow-xl"
          >
            <Utensils className="w-4 h-4" />
            <span>Browse Menu</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-14">
      {/* Header with Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <Link
            to="/cart"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Cart</span>
          </Link>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Checkout & Room Delivery
          </h1>
        </div>
      </div>

      {/* Global Server Error Alert */}
      {serverError && (
        <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex items-start gap-3 shadow-lg">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold text-rose-200">Unable to place order</p>
            <p className="text-xs text-rose-300/90 mt-0.5">{serverError}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: DELIVERY DETAILS (7 cols) */}
        <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="font-serif text-xl font-bold text-white flex items-center gap-2">
              <Building className="w-5 h-5 text-amber-400" />
              <span>DELIVERY DETAILS</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Please enter your contact details and room number for delivery.
            </p>
          </div>

          {/* Customer Name */}
          <div className="space-y-1.5">
            <label htmlFor="customerName" className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
              Full Name <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <User className="w-4 h-4" />
              </div>
              <input
                id="customerName"
                type="text"
                value={customerName}
                onChange={(e) => {
                  setCustomerName(e.target.value);
                  if (errors.customerName) setErrors((prev) => ({ ...prev, customerName: undefined }));
                }}
                placeholder="e.g. Abubakar Sani"
                className={`w-full pl-10 pr-4 py-3 bg-slate-900/90 border ${
                  errors.customerName ? 'border-rose-500 focus:ring-rose-500/20' : 'border-slate-700/80 focus:border-amber-400 focus:ring-amber-400/20'
                } rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 transition-all`}
                required
              />
            </div>
            {errors.customerName && (
              <p className="text-xs text-rose-400 font-medium mt-1">{errors.customerName}</p>
            )}
          </div>

          {/* Phone Number */}
          <div className="space-y-1.5">
            <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
              Phone Number <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Phone className="w-4 h-4" />
              </div>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                }}
                placeholder="e.g. 08012345678"
                className={`w-full pl-10 pr-4 py-3 bg-slate-900/90 border ${
                  errors.phone ? 'border-rose-500 focus:ring-rose-500/20' : 'border-slate-700/80 focus:border-amber-400 focus:ring-amber-400/20'
                } rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 transition-all`}
                required
              />
            </div>
            {errors.phone && (
              <p className="text-xs text-rose-400 font-medium mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Order Type Selection */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
              Order Type <span className="text-rose-400">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleOrderTypeChange('ROOM_DELIVERY')}
                className={`p-3.5 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                  orderType === 'ROOM_DELIVERY'
                    ? 'bg-amber-500/15 border-amber-400 text-white shadow-md'
                    : 'bg-slate-900/60 border-slate-700/60 text-slate-300 hover:border-slate-600'
                }`}
              >
                <div className={`p-2 rounded-lg ${orderType === 'ROOM_DELIVERY' ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
                  <Building className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold">Room Delivery</div>
                  <div className="text-[11px] text-slate-400 font-normal">Delivered to room</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleOrderTypeChange('TAKEOUT')}
                className={`p-3.5 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                  orderType === 'TAKEOUT'
                    ? 'bg-amber-500/15 border-amber-400 text-white shadow-md'
                    : 'bg-slate-900/60 border-slate-700/60 text-slate-300 hover:border-slate-600'
                }`}
              >
                <div className={`p-2 rounded-lg ${orderType === 'TAKEOUT' ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
                  <Package className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold">Takeout</div>
                  <div className="text-[11px] text-slate-400 font-normal">Pickup at restaurant</div>
                </div>
              </button>
            </div>
            {errors.orderType && (
              <p className="text-xs text-rose-400 font-medium mt-1">{errors.orderType}</p>
            )}
          </div>

          {/* Room Number Field (Required for ROOM_DELIVERY) */}
          {orderType === 'ROOM_DELIVERY' && (
            <div className="space-y-1.5 transition-all">
              <label htmlFor="roomNumber" className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                Room Number <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Building className="w-4 h-4" />
                </div>
                <input
                  id="roomNumber"
                  type="text"
                  value={roomNumber}
                  onChange={(e) => {
                    setRoomNumber(e.target.value);
                    if (errors.roomNumber) setErrors((prev) => ({ ...prev, roomNumber: undefined }));
                  }}
                  placeholder="e.g. 204"
                  className={`w-full pl-10 pr-4 py-3 bg-slate-900/90 border ${
                    errors.roomNumber ? 'border-rose-500 focus:ring-rose-500/20' : 'border-slate-700/80 focus:border-amber-400 focus:ring-amber-400/20'
                  } rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 transition-all`}
                  required={orderType === 'ROOM_DELIVERY'}
                />
              </div>
              {errors.roomNumber && (
                <p className="text-xs text-rose-400 font-medium mt-1">{errors.roomNumber}</p>
              )}
            </div>
          )}

          {/* Special Instructions */}
          <div className="space-y-1.5">
            <label htmlFor="specialInstructions" className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
              Order Special Instructions <span className="text-slate-500 font-normal text-[11px] lowercase">(optional)</span>
            </label>
            <div className="relative">
              <div className="absolute top-3 left-3.5 pointer-events-none text-slate-500">
                <MessageSquare className="w-4 h-4" />
              </div>
              <textarea
                id="specialInstructions"
                rows={3}
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="e.g. Call when you arrive, please bring extra napkins"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-900/90 border border-slate-700/80 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none transition-all resize-none"
              />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: ORDER SUMMARY (5 cols) */}
        <div className="lg:col-span-5 glass-panel p-6 sm:p-8 rounded-3xl space-y-6 sticky top-28">
          <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
            <h2 className="font-serif text-xl font-bold text-white">ORDER SUMMARY</h2>
            <span className="text-xs font-semibold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2.5 py-1 rounded-full">
              {cart.length} {cart.length === 1 ? 'item' : 'items'}
            </span>
          </div>

          {/* Cart Item Line List */}
          <div className="space-y-3 max-h-64 overflow-y-auto pr-1 custom-scrollbar">
            {cart.map((item) => {
              const lineTotalKobo = item.price * item.quantity;
              return (
                <div key={item.id} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-start justify-between gap-3 text-xs">
                  <div className="space-y-1 min-w-0">
                    <div className="font-semibold text-white truncate">{item.name}</div>
                    <div className="text-slate-400 flex items-center gap-2">
                      <span>Qty: {item.quantity}</span>
                      <span>•</span>
                      <span>{formatNaira(item.price)} each</span>
                    </div>
                    {item.specialInstructions && (
                      <div className="text-[11px] text-amber-300/80 italic truncate">
                        "{item.specialInstructions}"
                      </div>
                    )}
                  </div>
                  <div className="font-bold text-amber-400 shrink-0 text-sm">
                    {formatNaira(lineTotalKobo)}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Total & Calculation Note */}
          <div className="pt-3 border-t border-slate-800 space-y-3">
            <div className="flex justify-between items-baseline">
              <span className="text-base font-bold text-white">Total</span>
              <span className="text-2xl font-extrabold text-amber-400">
                {formatNaira(totalAmountKobo)}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Prices are calculated securely on server using SQLite integer arithmetic.</span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full glass-btn-primary py-4 px-6 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                <span>Placing Order...</span>
              </>
            ) : (
              <span>Place Order</span>
            )}
          </button>
        </div>

      </form>
    </div>
  );
};
