import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getOrderByOrderNumber } from '../services/orderService';
import type { OrderResponse, OrderStatus } from '../types/order';
import { formatNaira } from '../utils/formatCurrency';
import {
  CheckCircle2,
  Clock,
  Building,
  User,
  Package,
  Utensils,
  Copy,
  Check,
  AlertCircle,
  Loader2,
  ChefHat,
  Truck,
  Sparkles,
  ArrowLeft,
  XCircle,
} from 'lucide-react';

export const OrderTrackingPage: React.FC = () => {
  const { orderNumber } = useParams<{ orderNumber: string }>();

  const [order, setOrder] = useState<OrderResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!orderNumber) {
      setError('No order number provided.');
      setIsLoading(false);
      return;
    }

    let isMounted = true;
    setIsLoading(true);
    setError(null);

    getOrderByOrderNumber(orderNumber)
      .then((data) => {
        if (isMounted) {
          setOrder(data);
          setIsLoading(false);
        }
      })
      .catch((err: any) => {
        if (isMounted) {
          setError(err.message || 'Order not found.');
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [orderNumber]);

  const handleCopyOrderNumber = () => {
    if (order?.orderNumber) {
      navigator.clipboard.writeText(order.orderNumber);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  // Helper for Status UI text & badge
  const getStatusDetails = (status: OrderStatus) => {
    switch (status) {
      case 'PENDING':
        return { label: 'Pending', bg: 'bg-amber-500/15 border-amber-400/40 text-amber-300', icon: Clock };
      case 'CONFIRMED':
        return { label: 'Confirmed', bg: 'bg-blue-500/15 border-blue-400/40 text-blue-300', icon: CheckCircle2 };
      case 'PREPARING':
        return { label: 'Preparing', bg: 'bg-purple-500/15 border-purple-400/40 text-purple-300', icon: ChefHat };
      case 'ON_THE_WAY':
        return { label: 'On The Way', bg: 'bg-emerald-500/15 border-emerald-400/40 text-emerald-300', icon: Truck };
      case 'DELIVERED':
        return { label: 'Delivered', bg: 'bg-emerald-500/20 border-emerald-400 text-emerald-200', icon: CheckCircle2 };
      case 'CANCELLED':
        return { label: 'Cancelled', bg: 'bg-rose-500/15 border-rose-400/40 text-rose-300', icon: XCircle };
      default:
        return { label: status, bg: 'bg-slate-800 border-slate-700 text-slate-300', icon: Clock };
    }
  };

  // Helper for status progress steps
  const statusSteps: { key: OrderStatus; label: string; icon: any }[] = [
    { key: 'PENDING', label: 'Pending', icon: Clock },
    { key: 'CONFIRMED', label: 'Confirmed', icon: CheckCircle2 },
    { key: 'PREPARING', label: 'Preparing', icon: ChefHat },
    { key: 'ON_THE_WAY', label: 'On The Way', icon: Truck },
    { key: 'DELIVERED', label: 'Delivered', icon: CheckCircle2 },
  ];

  const getStepStatus = (stepKey: OrderStatus, currentStatus: OrderStatus) => {
    if (currentStatus === 'CANCELLED') return 'cancelled';
    const orderIndex = statusSteps.findIndex((s) => s.key === currentStatus);
    const stepIndex = statusSteps.findIndex((s) => s.key === stepKey);

    if (stepIndex < orderIndex) return 'completed';
    if (stepIndex === orderIndex) return 'active';
    return 'upcoming';
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="glass-panel p-12 rounded-3xl flex flex-col items-center justify-center space-y-4">
          <Loader2 className="w-10 h-10 text-amber-400 animate-spin" />
          <h2 className="font-serif text-2xl font-bold text-white">Fetching Order Details</h2>
          <p className="text-slate-400 text-xs">Retrieving order #{orderNumber} from database...</p>
        </div>
      </div>
    );
  }

  // Error / 404 State
  if (error || !order) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="glass-panel p-10 sm:p-14 rounded-3xl relative overflow-hidden">
          <div className="w-20 h-20 rounded-3xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mx-auto mb-6">
            <AlertCircle className="w-10 h-10" />
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-3">
            Order Not Found
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-md mx-auto mb-8 font-light leading-relaxed">
            {error || `We couldn't find an order matching "${orderNumber}". Please check the order number and try again.`}
          </p>

          <Link
            to="/"
            className="glass-btn-primary px-8 py-4 rounded-2xl text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2 shadow-xl"
          >
            <Utensils className="w-4 h-4" />
            <span>Return to Menu</span>
          </Link>
        </div>
      </div>
    );
  }

  const statusInfo = getStatusDetails(order.status);
  const StatusIcon = statusInfo.icon;
  const isRoomDelivery = order.orderType === 'ROOM_DELIVERY';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-14 space-y-8">
      
      {/* Top Banner: Success Header */}
      <div className="glass-panel p-6 sm:p-10 rounded-3xl text-center relative overflow-hidden space-y-4">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto shadow-xl">
          <CheckCircle2 className="w-10 h-10 stroke-[2]" />
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>Order Received</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
          Thank You for Your Order!
        </h1>

        <p className="text-slate-300 text-xs sm:text-sm max-w-lg mx-auto font-light leading-relaxed">
          Your room dining request has been saved and sent directly to our kitchen staff.
        </p>

        {/* Order Number Box with Copy */}
        <div className="pt-2">
          <div className="inline-flex items-center gap-3 bg-slate-900/90 border border-amber-500/30 px-5 py-3 rounded-2xl shadow-lg">
            <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Order No:</span>
            <span className="font-mono text-base sm:text-lg font-bold text-amber-400 select-all">
              {order.orderNumber}
            </span>
            <button
              type="button"
              onClick={handleCopyOrderNumber}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer flex items-center gap-1 text-xs"
              title="Copy Order Number"
            >
              {isCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-medium">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Order Status & Progress Tracker */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h2 className="font-serif text-xl font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-400" />
              <span>Order Status</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">Current order progress step</p>
          </div>

          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-bold uppercase tracking-wider ${statusInfo.bg}`}>
            <StatusIcon className="w-4 h-4" />
            <span>{statusInfo.label}</span>
          </div>
        </div>

        {/* Multi-step progress timeline */}
        {order.status !== 'CANCELLED' ? (
          <div className="py-4">
            <div className="grid grid-cols-5 gap-2 text-center relative">
              {statusSteps.map((step) => {
                const stepState = getStepStatus(step.key, order.status);
                const IconComponent = step.icon;

                return (
                  <div key={step.key} className="flex flex-col items-center space-y-2 z-10">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        stepState === 'completed'
                          ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                          : stepState === 'active'
                          ? 'bg-amber-400 text-slate-950 shadow-lg font-bold ring-4 ring-amber-400/20'
                          : 'bg-slate-900 border border-slate-800 text-slate-600'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <span
                      className={`text-[11px] font-semibold tracking-tight leading-tight ${
                        stepState === 'completed'
                          ? 'text-emerald-400'
                          : stepState === 'active'
                          ? 'text-amber-400 font-bold'
                          : 'text-slate-500'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs text-center">
            This order was cancelled. Please contact front desk if you require assistance.
          </div>
        )}
      </div>

      {/* Customer & Order Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Customer Information Panel */}
        <div className="glass-panel p-6 rounded-3xl space-y-4">
          <h3 className="font-serif text-lg font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
            <User className="w-4 h-4 text-amber-400" />
            <span>Customer Details</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Customer Name</span>
              <span className="font-semibold text-white">{order.customerName}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-400">Order Type</span>
              <span className="font-semibold text-amber-400 flex items-center gap-1">
                {isRoomDelivery ? <Building className="w-3.5 h-3.5" /> : <Package className="w-3.5 h-3.5" />}
                {isRoomDelivery ? 'Room Delivery' : 'Takeout'}
              </span>
            </div>

            {isRoomDelivery && (
              <div className="flex justify-between">
                <span className="text-slate-400">Room Number</span>
                <span className="font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                  Room {order.roomNumber}
                </span>
              </div>
            )}

            <div className="flex justify-between">
              <span className="text-slate-400">Order Placed</span>
              <span className="text-slate-300">{new Date(order.createdAt).toLocaleString()}</span>
            </div>

            {order.specialInstructions && (
              <div className="pt-2 border-t border-slate-800">
                <span className="text-slate-400 block mb-1">Special Instructions:</span>
                <p className="text-slate-300 italic bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                  "{order.specialInstructions}"
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Order Items & Server Calculated Total */}
        <div className="glass-panel p-6 rounded-3xl space-y-4">
          <h3 className="font-serif text-lg font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
            <Utensils className="w-4 h-4 text-amber-400" />
            <span>Items Ordered</span>
          </h3>

          <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
            {order.items.map((item) => {
              const lineTotalKobo = item.unitPrice * item.quantity;
              return (
                <div key={item.id} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start justify-between gap-3 text-xs">
                  <div className="space-y-0.5">
                    <div className="font-semibold text-white">{item.name}</div>
                    <div className="text-slate-400">
                      {item.quantity} × {formatNaira(item.unitPrice)}
                    </div>
                    {item.specialInstructions && (
                      <div className="text-[11px] text-amber-300/80 italic">
                        "{item.specialInstructions}"
                      </div>
                    )}
                  </div>
                  <div className="font-bold text-amber-400 shrink-0">
                    {formatNaira(lineTotalKobo)}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline">
            <span className="text-sm font-bold text-white">Total Amount</span>
            <span className="text-xl font-extrabold text-amber-400">
              {formatNaira(order.totalAmount)}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-amber-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Restaurant Menu</span>
        </Link>

        <Link
          to="/"
          className="glass-btn-primary px-6 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 shadow-xl"
        >
          <Utensils className="w-4 h-4" />
          <span>Place Another Order</span>
        </Link>
      </div>

    </div>
  );
};
