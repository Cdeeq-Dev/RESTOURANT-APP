import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: string; // unique cart line id
  menuItemId: string;
  slug: string;
  name: string;
  price: number; // integer KOBO (1 NGN = 100 kobo)
  imageUrl: string | null;
  quantity: number;
  specialInstructions: string;
}

export interface AddToCartInput {
  menuItemId: string;
  slug: string;
  name: string;
  price: number;
  imageUrl: string | null;
  quantity: number;
  specialInstructions?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (input: AddToCartInput) => void;
  updateQuantity: (cartItemId: string, newQuantity: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  totalItemsCount: number;
  totalAmountKobo: number;
}

const CART_STORAGE_KEY = 'hotel_restaurant_cart';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed.filter(
            (item) =>
              item &&
              typeof item.menuItemId === 'string' &&
              typeof item.quantity === 'number' &&
              typeof item.price === 'number'
          );
        }
      }
    } catch (e) {
      console.error('Failed to load cart from localStorage:', e);
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage:', e);
    }
  }, [cart]);

  const addToCart = (input: AddToCartInput) => {
    const instructions = (input.specialInstructions || '').trim();
    const qtyToAdd = Math.max(1, Math.min(20, input.quantity));

    setCart((prevCart) => {
      // Find item with same menuItemId AND same normalized specialInstructions
      const existingIndex = prevCart.findIndex(
        (item) =>
          item.menuItemId === input.menuItemId &&
          item.specialInstructions.toLowerCase() === instructions.toLowerCase()
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        const existing = updated[existingIndex];
        const newQty = Math.min(20, existing.quantity + qtyToAdd);
        updated[existingIndex] = {
          ...existing,
          quantity: newQty,
        };
        return updated;
      } else {
        const newItem: CartItem = {
          id: `${input.menuItemId}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
          menuItemId: input.menuItemId,
          slug: input.slug,
          name: input.name,
          price: input.price,
          imageUrl: input.imageUrl,
          quantity: qtyToAdd,
          specialInstructions: instructions,
        };
        return [...prevCart, newItem];
      }
    });
  };

  const updateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    const clampedQty = Math.min(20, newQuantity);

    setCart((prevCart) =>
      prevCart.map((item) => (item.id === cartItemId ? { ...item, quantity: clampedQty } : item))
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== cartItemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmountKobo = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItemsCount,
        totalAmountKobo,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
