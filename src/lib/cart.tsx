'use client';

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  color: string;
  tiles?: { name: string; color: string }[];
};

type CartContextValue = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  count: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo<CartContextValue>(() => ({
    items,
    addItem(item) {
      setItems((current) => {
        const existing = current.find((entry) => entry.id === item.id);
        if (existing) return current.map((entry) => entry.id === item.id ? { ...entry, quantity: entry.quantity + (item.quantity ?? 1) } : entry);
        return [...current, { ...item, quantity: item.quantity ?? 1 }];
      });
      setIsOpen(true);
    },
    removeItem(id) { setItems((current) => current.filter((item) => item.id !== id)); },
    updateQuantity(id, quantity) {
      setItems((current) => quantity <= 0 ? current.filter((item) => item.id !== id) : current.map((item) => item.id === id ? { ...item, quantity } : item));
    },
    clearCart() { setItems([]); },
    total: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    count: items.reduce((sum, item) => sum + item.quantity, 0),
    isOpen,
    setIsOpen,
  }), [isOpen, items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside CartProvider');
  return context;
}
